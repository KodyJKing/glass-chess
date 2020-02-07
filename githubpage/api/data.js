"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webServer = __importStar(require("../../server/webServer"));
const Key_1 = __importDefault(require("../../data/Key"));
const Entity_1 = __importDefault(require("../../data/Entity"));
const clonePatch_1 = __importDefault(require("../../utility/clonePatch"));
const Serializer_1 = __importDefault(require("../../data/Serializer"));
const database = webServer.instance.database;
function sendError(error, res, status = 500) {
    console.log(`api/data/query streaming error`, error);
    return res.status(status).send("streaming error");
}
function getKeys(keyStrings) {
    return keyStrings.map(k => {
        return Array.isArray(k) ? getKeys(k) : Key_1.default.parse(database.namespace, k);
    });
}
//  create: entities, each is assigned a new key?
async function create(batch) {
    throw new Error("not implemented");
}
exports.create = create;
async function set(batch) {
    return await put(batch, false);
}
exports.set = set;
async function patch(batch) {
    return await put(batch, true);
}
exports.patch = patch;
const batchLimit = 500;
function splitBatchToSmallBatchesUnderLimit(batch) {
    let currentBatchSize = 0;
    let batches = [{}];
    for (let key in batch) {
        if (currentBatchSize === batchLimit) {
            batches.push({});
            currentBatchSize = 0;
        }
        batches[batches.length - 1][key] = batch[key];
        currentBatchSize++;
    }
    return batches;
}
async function put(batch, patch) {
    let batches = splitBatchToSmallBatchesUnderLimit(batch);
    let results = await Promise.all(batches.map(b => putLimited(b, patch)));
    let mergedResult = Object.assign({}, ...results);
    return mergedResult;
}
async function putLimited(batch, patch) {
    let keys = getKeys(Object.keys(batch));
    if (keys.length > batchLimit) {
        throw new Error(`Batch exceeded ${batchLimit} row limit: ${keys.length}`);
    }
    for (let key of keys) {
        if (!Key_1.default.isModelKey(key)) {
            throw new Error(`Invalid model key: ${key}`);
        }
    }
    let response = {};
    let newEntities = [];
    let entities = patch ? await database.all(keys) : null;
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let patch = batch[key.toString()];
        let entity = entities != null ? entities[i][0] : null;
        if (entity != null) {
            // no deletion yet.
            if (patch == null) {
                throw new Error("No deletion yet");
            }
            entity = clonePatch_1.default(entity, patch);
        }
        else if (patch != null) {
            // make sure patch is a full instance
            entity = patch instanceof Entity_1.default ? patch : new key.type({ key, ...patch });
        }
        newEntities.push(entity);
        response[key.toString()] = patch == null ? null : entity;
    }
    await database.put(newEntities);
    return response;
}
async function get(keyStrings) {
    const keys = getKeys(keyStrings);
    return await database.all(keys);
}
exports.get = get;
function query(req, res) {
    let keyString = req.body;
    let key;
    try {
        key = Key_1.default.parse(database.namespace, keyString);
    }
    catch (e) {
        return res.status(400).send(`Invalid Key: ${keyString}`);
    }
    if (!Key_1.default.isSearchKey(key)) {
        return res.status(400).send(`Not a query key: ${key}`);
    }
    res.type("text/plain");
    try {
        database.raw(key, (row) => {
            if (row != null) {
                res.write(row);
                res.write("\n");
            }
            else {
                res.end();
            }
        }, (e) => sendError(e, res));
    }
    catch (e) {
        sendError(e, res);
    }
}
exports.query = query;
const dataRegex = /^data:([^;]+);(base64+),(.*)$/i;
function addQuery(path, req) {
    let index = req.url.indexOf("?");
    return index < 0 ? path : path + decodeURIComponent(req.url.slice(index));
}
async function default_1(req, res) {
    var _a;
    let thisPath = "/data/";
    let path = addQuery(req.path.slice(req.path.indexOf(thisPath) + thisPath.length), req);
    console.log("+++++++++++++++++++", { path, namespace: database.namespace });
    let key = Key_1.default.parse(database.namespace, path);
    try {
        if (req.method === "GET") {
            let [result] = await database.all([key]);
            if (Key_1.default.isModelKey(key)) {
                result = (_a = result[0], (_a !== null && _a !== void 0 ? _a : null));
            }
            // get the sub result if the key specifies a path
            result = key.get(result);
            // IF the result is a data url then we stream it directly as content
            const dataUrl = dataRegex.exec(result);
            if (dataUrl != null) {
                let [, type, encoding, encoded] = dataUrl;
                let buffer = new Buffer(encoded, encoding);
                res.type(type).send(buffer);
            }
            else {
                res.json(result);
            }
        }
        else if (req.method === "POST" || req.method === "PUT") {
            let value;
            if (req.method === "POST") {
                //  json body
                value = new Serializer_1.default(database.namespace).parse(JSON.stringify(req.body));
            }
            else {
                //  uploading binary file
                let contentType = req.headers["content-type"];
                let encoding = "base64";
                let encoded = req.body.toString(encoding);
                value = `data:${contentType};${encoding},${encoded}`;
            }
            let applyPatch = key.patch(value);
            console.log("applyPatch------", applyPatch);
            // IF the user
            let result = await patch({ [key.toString()]: applyPatch });
            res.json({});
        }
        else {
            sendError(`Method not supported: ${req.method}`, res);
        }
    }
    catch (e) {
        sendError(e, res);
    }
}
exports.default = default_1;
