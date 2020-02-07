/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/www/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../platform/lib/data/Dependent.js":
/*!*****************************************!*\
  !*** ../platform/lib/data/Dependent.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __importDefault(__webpack_require__(/*! ./State */ "../platform/lib/data/State.js"));
class Dependent extends State_1.default {
    static watched(key) {
        throw new Error(`${this.name}.watched must be overriden`);
    }
}
exports.default = Dependent;
Dependent.store = "dependent";


/***/ }),

/***/ "../platform/lib/data/Entity.js":
/*!**************************************!*\
  !*** ../platform/lib/data/Entity.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(__webpack_require__(/*! ./Model */ "../platform/lib/data/Model.js"));
const Key_1 = __importDefault(__webpack_require__(/*! ./Key */ "../platform/lib/data/Key.js"));
const schema = __importStar(__webpack_require__(/*! ./schema */ "../platform/lib/data/schema/index.js"));
const common_1 = __webpack_require__(/*! ../utility/common */ "../platform/lib/utility/common.js");
const Patch_1 = __webpack_require__(/*! ./Patch */ "../platform/lib/data/Patch.js");
const Store_1 = __importDefault(__webpack_require__(/*! ./Store */ "../platform/lib/data/Store.js"));
let Entity = class Entity extends Model_1.default {
    /**
     * Gets the key.id value.
     */
    get id() {
        var _a, _b;
        return _b = (_a = this.key) === null || _a === void 0 ? void 0 : _a.id, (_b !== null && _b !== void 0 ? _b : null);
    }
    /**
     * Sets the key.id value. Only valid during construction.
     */
    set id(value) {
        if (this.key != null) {
            throw new Error("Key and id are immutable after construction");
        }
        this.key = Key_1.default.create(this.constructor, value);
    }
    //  creates this Entity by patching it into the default store
    create(store = Store_1.default.default) {
        store.patch(this.key, this);
        return this;
    }
    //  deletes this Entity from the default store
    delete(store = Store_1.default.default) {
        store.delete(this.key);
        return null;
    }
    patch(value, descendant = this) {
        let store = Store_1.default.default;
        let path = common_1.getPath(this, descendant);
        if (path == null) {
            throw new Error("descendant not contained within this entity");
        }
        let patch = Patch_1.createPatch(path, value);
        store.patch(this.key, patch);
        return store.get(this.key);
    }
};
Entity.additionalProperties = {};
__decorate([
    Model_1.default.property(schema.key, {
        required: true,
        validate(value) {
            if (value.type !== this.constructor)
                return `key is of wrong type: ${value.schema.name}, expected: ${this.constructor.name}`;
        },
        id: "."
    })
], Entity.prototype, "key", void 0);
Entity = __decorate([
    Model_1.default.class()
], Entity);
exports.default = Entity;


/***/ }),

/***/ "../platform/lib/data/JSONPointer.js":
/*!*******************************************!*\
  !*** ../platform/lib/data/JSONPointer.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Patch_1 = __webpack_require__(/*! ./Patch */ "../platform/lib/data/Patch.js");
const clonePatch_1 = __importDefault(__webpack_require__(/*! ../utility/clonePatch */ "../platform/lib/utility/clonePatch.js"));
function unescape(sequence) {
    return sequence === "~0" ? "~" : "/";
}
function decode(step) {
    return step.replace(/~[01]/g, unescape);
}
function escape(sequence) {
    return sequence === "~" ? "~0" : "~1";
}
function encode(step) {
    return typeof step === "number" ? step : step.replace(/[~\/]/g, escape);
}
const emptyArray = Object.freeze([]);
function parse(jsonPointer) {
    if (jsonPointer == null || jsonPointer.length === 0) {
        return emptyArray;
    }
    let steps = jsonPointer.split("/").map(decode);
    if (steps[0] === "") {
        steps.shift();
    }
    return steps;
}
exports.parse = parse;
function stringify(pointer) {
    return pointer.length === 0 ? "" : "/" + pointer.map(encode).join("/");
}
exports.stringify = stringify;
function get(document, pointer = emptyArray) {
    let value = document;
    for (let i = 0; value != null && i < pointer.length; i++) {
        value = value[pointer[i]];
    }
    return value;
}
exports.get = get;
function set(document, pointer = emptyArray, value) {
    if (pointer.length === 0) {
        return value;
    }
    let target = document;
    for (let i = 0; target != null && i < pointer.length - 1; i++) {
        target = target[pointer[i]];
    }
    if (target != null) {
        let lastStep = pointer[pointer.length - 1];
        if (value == null) {
            delete target[lastStep];
        }
        else {
            target[lastStep] = value;
        }
    }
    return document;
}
exports.set = set;
function patch(document, pointer = emptyArray, value) {
    return pointer.length === 0 ? value : clonePatch_1.default(document, Patch_1.createPatch(pointer, value));
}
exports.patch = patch;


/***/ }),

/***/ "../platform/lib/data/Key.js":
/*!***********************************!*\
  !*** ../platform/lib/data/Key.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(__webpack_require__(/*! ./Model */ "../platform/lib/data/Model.js"));
const Namespace_1 = __webpack_require__(/*! ./Namespace */ "../platform/lib/data/Namespace.js");
const common_1 = __webpack_require__(/*! ../utility/common */ "../platform/lib/utility/common.js");
const defaultNamespace_1 = __importDefault(__webpack_require__(/*! ./defaultNamespace */ "../platform/lib/data/defaultNamespace.js"));
const JSONPointer = __importStar(__webpack_require__(/*! ./JSONPointer */ "../platform/lib/data/JSONPointer.js"));
const Patch_1 = __webpack_require__(/*! ./Patch */ "../platform/lib/data/Patch.js");
const guid_1 = __importDefault(__webpack_require__(/*! ../utility/guid */ "../platform/lib/utility/guid.js"));
const emptyQuery = Object.freeze({});
function match(regex, map, text) {
    let result = regex.exec(text);
    if (result == null) {
        return null;
    }
    let object = {};
    for (let key in map) {
        let index = map[key];
        let value = result[index];
        if (value != null) {
            object[key] = value;
        }
    }
    return object;
}
//                  (parent                    )     (type      )   (id       )       (query )
const keyRegex = /^((([^\/\?#]+\/[^\/\?#]+\/?)+)\/)?(([^\/\?#]+)(\/([^\/\?#]*))?)?(\?(.*))?$/i;
const keyMap = {
    parent: 2,
    type: 5,
    id: 7,
    query: 9
};
function parse(key) {
    let result = match(keyRegex, keyMap, key);
    if (result == null) {
        throw new Error(`Invalid key: ${key}`);
    }
    let { query } = result;
    if (query) {
        if (query[0] === "{") {
            try {
                result.query = JSON.parse(query);
            }
            catch (e) {
                throw new Error(`Invalid key query: ${key}, ${e}`);
            }
        }
        else {
            result.query = { path: JSONPointer.parse(query) };
        }
    }
    return result;
}
function stringify(steps) {
    let buffer = [];
    for (let step of steps) {
        if (Array.isArray(step)) {
            // ?path/to/a/field => { path: ["path", "to", "a", "field"] }
            step = { pointer: step };
        }
        if (common_1.isPlainObject(step)) {
            //  query
            buffer.push("?", JSON.stringify(step));
        }
        else if (step != null) {
            if (buffer.length > 0) {
                buffer.push("/");
            }
            if (Model_1.default.isSchema(step)) {
                buffer.push(step.name);
            }
            else {
                buffer.push(step.toString());
            }
        }
    }
    return buffer.join("");
}
class Key {
    constructor(parent = null, schema = null, id = null, query = null, string = stringify([parent, schema, id, query])) {
        // if parent is missing
        if (!Model_1.default.isSchema(schema)) {
            throw new Error("Type is not a valid model class: " + schema);
        }
        this.parent = parent;
        this.schema = schema;
        this.type = Model_1.default.isClass(schema) ? schema : null;
        this.id = id;
        this.query = query != null ? query : emptyQuery;
        this.string = string;
        this.path = this.schema.name;
        if (this.id) {
            this.path += "/" + this.id;
        }
        if (this.parent) {
            this.path = this.parent.path + "/" + this.path;
        }
        Object.freeze(this);
    }
    static isProbablyModelKey(value) {
        if (value == null)
            return false;
        let slashes = 0;
        let slashCode = "/".charCodeAt(0);
        for (let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) === slashCode)
                slashes++;
        }
        return (slashes % 2 === 1) && keyRegex.test(value);
    }
    static isSearchKey(value) {
        return value instanceof Key && value.id == null;
    }
    static isModelKey(value) {
        return value instanceof Key && value.id != null;
    }
    static create(...args) {
        let parent = null;
        let schema = null;
        let id = null;
        let query = null;
        let i = 0;
        if (Key.isModelKey(args[i])) {
            parent = args[i++];
        }
        if (Model_1.default.isSchema(args[i])) {
            schema = args[i++];
        }
        else {
            throw new Error("Type is not a valid model class: " + args[i]);
        }
        if (args[i] == null) {
            id = guid_1.default();
        }
        if (typeof args[i] === "string") {
            id = args[i++];
        }
        if (common_1.isPlainObject(args[i])) {
            query = args[i++];
        }
        if (Array.isArray(args[i])) {
            query = { path: args[i++] };
        }
        return new Key(parent, schema, id, query);
    }
    static parse(...steps) {
        //  get namespace, possibly consuming first step
        let namespace;
        let first = steps[0];
        if (Namespace_1.isNamespace(first)) {
            namespace = first;
            steps.shift();
        }
        else {
            namespace = defaultNamespace_1.default;
        }
        //  get the text of the key
        let text = stringify(steps);
        //  parse it
        let props = parse(text);
        //  pull out the properties
        let parent = null;
        let type;
        let id = null;
        let query = null;
        if (props.type) {
            let foundType = namespace[props.type];
            if (foundType == null) {
                // console.log({ props, text, steps, namespace })
                throw new Error(`Type not found in namespace: ${props.type}. Did you forget @Model.register()`);
            }
            type = foundType;
        }
        else {
            throw new Error("Type is required");
        }
        if (props.parent) {
            parent = Key.parse(namespace, props.parent);
        }
        if (props.query) {
            //  TODO: Really should completely normalize query
            //  so that equivalent queries always match string format
            if (props.query && common_1.isEmptyObject(props.query.where)) {
                delete props.query.where;
            }
            query = common_1.deepFreeze(props.query);
        }
        if (props.id) {
            id = props.id;
        }
        return new Key(parent, type, id, query);
    }
    get(model) {
        return JSONPointer.get(model, this.query.path);
    }
    patch(modelOrValue, value) {
        if (arguments.length == 1) {
            return Patch_1.createPatch(this.query.path, modelOrValue);
        }
        else {
            return JSONPointer.patch(modelOrValue, this.query.path, value);
        }
    }
    isPossibleMatch(key) {
        return this.type === key.type
            && (this.parent && this.parent.string) === (key.parent && key.parent.string);
    }
    toString() {
        return this.string;
    }
    toJSON() {
        return this.string;
    }
}
exports.default = Key;
Key.regex = keyRegex;


/***/ }),

/***/ "../platform/lib/data/Model.js":
/*!*************************************!*\
  !*** ../platform/lib/data/Model.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(__webpack_require__(/*! ./schema/validate */ "../platform/lib/data/schema/validate.js"));
const Serializer = __importStar(__webpack_require__(/*! ./Serializer */ "../platform/lib/data/Serializer.js"));
/**
 * Base class for validated, immutable, objects.
 */
class Model {
    constructor(...propertiesArray) {
        let definedProperties = this.constructor.properties;
        for (let properties of propertiesArray) {
            for (let name in properties) {
                let value = properties[name];
                let definedProperty = definedProperties[name];
                if (definedProperty && definedProperty.coerce != null) {
                    value = definedProperty.coerce.call(this, value);
                }
                if (Model.ValidateAndFreezeOnConstruction) {
                    Object.freeze(value);
                }
                if (definedProperty == null || definedProperty.default != /* deliberately untruthy */ value) {
                    this[name] = value;
                }
            }
        }
        if (Model.ValidateAndFreezeOnConstruction) {
            this.validate();
            Object.freeze(this);
        }
    }
    static isClass(value) {
        return typeof value === "function" && value.name && value.properties != null;
    }
    static isSchema(value) {
        return value != null && typeof value.name === "string" && typeof value.store === "string";
    }
    validate() {
        let errors = validate_1.default(this.constructor, this, this, [this.constructor.name]);
        if (errors.length > 0) {
            throw new Error(errors.join(",\n"));
        }
    }
    //  Model class decorator 
    static class(...values) {
        return function (target) {
            //  register this Model for serialization
            Model.serializer.register(target.name, target);
            //  copy all schema properties to it.
            Object.assign(target, ...values);
            return target;
        };
    }
    //  Model property decorator
    static property(...values) {
        let value = Object.assign({}, ...values);
        // infer type from value if present
        if (value.default && !value.type) {
            value.type = typeof value.default;
        }
        return function (target, propertyName) {
            // overwrite the name in a local copy of the value.
            // we don't change it in the passed in values objects as they may
            // be reused as schema args for different properties
            value = Object.assign({}, value, { name: propertyName });
            // ensure properties are extended from prototype class properties
            if (!target.constructor.hasOwnProperty("properties"))
                target.constructor.properties = Object.create(target.__proto__.constructor.properties);
            let properties = target.constructor.properties;
            if (properties == null) {
                throw new Error(`${target.constructor.name} is missing a properties object to contain schema definition for ${propertyName}`);
            }
            if (value.hasOwnProperty("default")) {
                target[propertyName] = Object.freeze(value.default);
            }
            properties[propertyName] = value;
        };
    }
    static get serializer() {
        return Serializer.default.default;
    }
}
exports.default = Model;
Model.store = "session";
Model.properties = {};
Model.ValidateAndFreezeOnConstruction = true; //typeof window !== "undefined"
Object.freeze(Model.properties);


/***/ }),

/***/ "../platform/lib/data/Namespace.js":
/*!*****************************************!*\
  !*** ../platform/lib/data/Namespace.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(__webpack_require__(/*! ./Model */ "../platform/lib/data/Model.js"));
function isNamespace(value) {
    for (let name in value) {
        if (Model_1.default.isClass(value[name])) {
            return true;
        }
    }
    return false;
}
exports.isNamespace = isNamespace;


/***/ }),

/***/ "../platform/lib/data/Patch.js":
/*!*************************************!*\
  !*** ../platform/lib/data/Patch.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createPatch(path, object) {
    if (path == null || path.length === 0) {
        return object;
    }
    return createPatch(path.slice(0, -1), { [path[path.length - 1]]: object });
}
exports.createPatch = createPatch;


/***/ }),

/***/ "../platform/lib/data/Query.js":
/*!*************************************!*\
  !*** ../platform/lib/data/Query.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! ../utility/common */ "../platform/lib/utility/common.js");
const functions_1 = __webpack_require__(/*! ./schema/functions */ "../platform/lib/data/schema/functions.js");
const ops = {
    "!=": (a, b) => a != b,
    "=": (a, b) => a == b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
};
function getPathValue(object, path) {
    if (path != null && object != null) {
        for (const step of path) {
            object = object[step];
            if (object == null) {
                break;
            }
        }
    }
    return object;
}
exports.getPathValue = getPathValue;
function createPredicate(query) {
    return function (model) {
        let where = query.where;
        if (where != null) {
            for (let name in where) {
                let value = where[name];
                if (common_1.isPlainObject(value)) {
                    for (let op in value) {
                        if (!ops[op](model[name], value[op]))
                            return false;
                    }
                }
                else {
                    if (!ops["="](model[name], value))
                        return false;
                }
            }
        }
        return true;
    };
}
exports.createPredicate = createPredicate;
function compare(a, b) {
    if (a === b)
        return 0;
    if (a == null)
        return -1;
    if (b == null)
        return 1;
    if (a.constructor !== b.constructor) {
        a = a.constructor.name;
        b = b.constructor.name;
    }
    return a < b ? -1 : +1;
}
function createSortCompareFunction(query) {
    return (a, b) => {
        if (query.sort) {
            for (let sort of query.sort) {
                for (let property in sort) {
                    let direction = sort[property];
                    let order = compare(functions_1.getValue(a, property), functions_1.getValue(b, property));
                    if (order !== 0) {
                        return direction ? order : -order;
                    }
                }
            }
        }
        return 0;
    };
}
exports.createSortCompareFunction = createSortCompareFunction;
function isQuery(value) {
    return common_1.isPlainObject(value) && (value.offset || value.limit || value.where || value.sort);
}
exports.isQuery = isQuery;


/***/ }),

/***/ "../platform/lib/data/Serializer.js":
/*!******************************************!*\
  !*** ../platform/lib/data/Serializer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultNamespace_1 = __importDefault(__webpack_require__(/*! ./defaultNamespace */ "../platform/lib/data/defaultNamespace.js"));
// function pretraverse(key, object, visitor) {
//     for (let childKey in object) {
//         let value = object[childKey]
//         if (value && typeof value === "object") {
//             let change = pretraverse(childKey, value, visitor)
//             if (value !== change) {
//                 object[childKey] = change
//             }
//         }
//     }
//     object = visitor(key, object)
//     return object
// }
function getId(constructor) {
    var _a;
    return _a = constructor.id, (_a !== null && _a !== void 0 ? _a : constructor.name);
}
exports.typeKey = "";
exports.countKey = "$";
//  we are not using the JSON replacer or reviver because our minimal traversal is more efficent
//  when parsing and we need a custom traversal when stringifying
class Serializer {
    constructor(namespace = {}, options = {}) {
        this.namespace = namespace;
        this.indent = options.indent || 0;
        this.parse = this.parse.bind(this);
        this.stringify = this.stringify.bind(this);
    }
    parse(text) {
        let { namespace } = this;
        // this pretraversal revive function is much faster than using the built in JSON.parse reviver
        let root = typeof text === "object" ? text : JSON.parse(text);
        function pretraverse(key, object) {
            let typeName = object[exports.typeKey];
            let childCount = object[exports.countKey] || 0;
            if (typeName == null || childCount > 0) {
                for (let childKey in object) {
                    let value = object[childKey];
                    if (value && typeof value === "object") {
                        let change = pretraverse(childKey, value);
                        if (value !== change) {
                            object[childKey] = change;
                        }
                    }
                }
            }
            if (typeName) {
                delete object[exports.typeKey];
                delete object[exports.countKey];
                let modelConstructor = namespace[typeName];
                if (modelConstructor == null) {
                    console.log("********************************************");
                    console.log(Object.keys(namespace).join(" : "));
                    console.log("********************************************");
                    throw new Error(`Class not found in namespace: ${typeName}`);
                }
                if (modelConstructor.parse) {
                    object = modelConstructor.parse(object);
                }
                else {
                    object = new modelConstructor(object);
                }
            }
            return object;
        }
        if (root != null && typeof root === "object") {
            root = pretraverse("", root);
        }
        return root;
    }
    stringify(root) {
        root = this.toJSON(root);
        return JSON.stringify(root, null, this.indent > 0 ? this.indent : undefined);
    }
    toJSON(root) {
        let { namespace } = this;
        let encodedTypeCount = 0;
        function pretraverse(key, object) {
            if (object.toJSON) {
                return object.toJSON();
            }
            // we CAN NOT mutate the input object so we will copy it
            let output = Array.isArray(object) ? object.slice(0) : { ...object };
            let initialTypeCount = encodedTypeCount;
            for (let childKey in object) {
                let value = object[childKey];
                if (value && typeof value === "object") {
                    output[childKey] = pretraverse(childKey, value);
                }
            }
            let id = getId(object.constructor);
            if (object != null && typeof object === "object" && namespace.hasOwnProperty(id)) {
                let encodedChildrenCount = encodedTypeCount - initialTypeCount;
                encodedTypeCount++;
                let modelConstructor = object.constructor;
                output = { [exports.typeKey]: getId(modelConstructor), ...output };
                if (encodedChildrenCount > 0) {
                    output[exports.countKey] = 1;
                }
            }
            return output;
        }
        if (root != null && typeof root === "object") {
            root = pretraverse("", root);
        }
        return root;
    }
    register(name, type) {
        this.namespace[name] = type;
    }
}
exports.default = Serializer;
Serializer.default = new Serializer(defaultNamespace_1.default);


/***/ }),

/***/ "../platform/lib/data/State.js":
/*!*************************************!*\
  !*** ../platform/lib/data/State.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(__webpack_require__(/*! ./Model */ "../platform/lib/data/Model.js"));
/**
 * State represents any Model which will always have a default value.
 * When
 */
class State extends Model_1.default {
    get isDefault() {
        //  the real reason this property is here is so that the compiler will distinguish
        //  Model from State. Otherwise the overloaded methods on IStateSource.peek and get
        //  will treat all Model instances as if they are State instances.
        return this === this.constructor._default;
    }
    static get default() {
        if (this._default == null)
            this._default = new this();
        return this._default;
    }
}
exports.default = State;


/***/ }),

/***/ "../platform/lib/data/Store.js":
/*!*************************************!*\
  !*** ../platform/lib/data/Store.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Key_1 = __importDefault(__webpack_require__(/*! ./Key */ "../platform/lib/data/Key.js"));
/**
 * Store is the low level asynchronous model saving and loading interface.
 */
class Store {
    peek(key) {
        return this.get(key, true);
    }
    delete(key) {
        if (Key_1.default.isSearchKey(key)) {
            key = this.get(key);
            if (key == null) {
                throw new Error("Could not get keys to delete");
            }
        }
        if (Array.isArray(key)) {
            for (let k of key) {
                this.patch(k, null);
            }
        }
        else {
            this.patch(key, null);
        }
    }
    list(key, peek) {
        let items = [];
        let keys = this.get(key, peek);
        if (keys == null) {
            return undefined;
        }
        for (let itemKey of keys) {
            let item = this.get(itemKey, peek);
            if (item != null) {
                items.push(item);
            }
        }
        return items;
    }
    watchListener(key) {
        let value = this.peek(key);
        if (value === undefined) {
            value = null;
        }
        let watchers = this.watchers.get(key.string);
        if (watchers != null) {
            for (let watcher of watchers.values()) {
                let value = this.peek(key);
                if (value === undefined) {
                    value = null;
                }
                watcher(value != null ? value : null);
            }
        }
    }
    watch(key, callback) {
        if (this.watchers == null) {
            this.watchers = new Map();
            this.addWriteListener(this.watchListener.bind(this));
        }
        let keyWatchers = this.watchers.get(key.string);
        if (keyWatchers == null) {
            this.watchers.set(key.string, keyWatchers = new Set());
        }
        keyWatchers.add(callback);
        let value = this.peek(key);
        if (value !== undefined) {
            callback(value);
        }
        return () => {
            keyWatchers.delete(callback);
        };
    }
    static get default() {
        return Store._default;
    }
    static set default(value) {
        Store._default = value;
    }
}
exports.default = Store;


/***/ }),

/***/ "../platform/lib/data/Structure.js":
/*!*****************************************!*\
  !*** ../platform/lib/data/Structure.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serializer_1 = __importDefault(__webpack_require__(/*! ./Serializer */ "../platform/lib/data/Serializer.js"));
class Structure {
    static parse(properties) {
        return Object.assign(Object.create(this.prototype), properties);
    }
    //  Structure class decorator 
    static class(properties) {
        return function (target) {
            var _a, _b;
            //  register this Model for serialization
            Serializer_1.default.default.register((_b = (_a = properties) === null || _a === void 0 ? void 0 : _a.id, (_b !== null && _b !== void 0 ? _b : target.name)), target);
            return target;
        };
    }
}
exports.default = Structure;


/***/ }),

/***/ "../platform/lib/data/defaultNamespace.js":
/*!************************************************!*\
  !*** ../platform/lib/data/defaultNamespace.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const defaultNamespace = {};
exports.default = defaultNamespace;


/***/ }),

/***/ "../platform/lib/data/schema/functions.js":
/*!************************************************!*\
  !*** ../platform/lib/data/schema/functions.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getSubSchemaInternal(schema, property) {
    if (schema != null && property != null) {
        if (Array.isArray(property)) {
            for (let step of property) {
                schema = getSubSchemaInternal(schema, step);
                if (schema == null) {
                    break;
                }
            }
            return schema;
        }
        else {
            if (schema.properties) {
                let subSchema = schema.properties[property];
                if (subSchema) {
                    return subSchema;
                }
            }
            if (schema.additionalProperties) {
                return schema.additionalProperties;
            }
            if (schema.items) {
                if (Array.isArray(schema.items)) {
                    let subSchema = schema.items[property];
                    if (subSchema) {
                        return subSchema;
                    }
                }
                else {
                    return schema.items;
                }
            }
        }
    }
    return undefined;
}
function getSubSchema(schema, property) {
    property = getArrayIfPropertyIsDotDelimitedPath(property);
    return getSubSchemaInternal(schema, property);
}
exports.getSubSchema = getSubSchema;
function getValueInternal(object, property) {
    if (object == null || property == null) {
        return undefined;
    }
    if (Array.isArray(property)) {
        for (let step of property) {
            object = object[step];
            if (object == null) {
                break;
            }
        }
        return object;
    }
    else {
        return object[property];
    }
}
function getArrayIfPropertyIsDotDelimitedPath(property) {
    if (typeof property === "string") {
        if (property.indexOf(".") >= 0) {
            property = property.split(".");
        }
    }
    return property;
}
function getValue(object, property) {
    property = getArrayIfPropertyIsDotDelimitedPath(property);
    return getValueInternal(object, property);
}
exports.getValue = getValue;


/***/ }),

/***/ "../platform/lib/data/schema/index.js":
/*!********************************************!*\
  !*** ../platform/lib/data/schema/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./schemas */ "../platform/lib/data/schema/schemas.js"));
__export(__webpack_require__(/*! ./validate */ "../platform/lib/data/schema/validate.js"));
__export(__webpack_require__(/*! ./functions */ "../platform/lib/data/schema/functions.js"));


/***/ }),

/***/ "../platform/lib/data/schema/schemas.js":
/*!**********************************************!*\
  !*** ../platform/lib/data/schema/schemas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Key_1 = __importDefault(__webpack_require__(/*! ../Key */ "../platform/lib/data/Key.js"));
const Input_1 = __importDefault(__webpack_require__(/*! ../../ui/html/components/Input */ "../platform/lib/ui/html/components/Input.js"));
const phone_1 = __webpack_require__(/*! ../../utility/phone */ "../platform/lib/utility/phone.js");
function renderInput(c, props, type) {
    let { id, schema, value, oncancel, onconfirm } = props;
    let { name, required, validate, validateFailMessage } = schema;
    let inputProperties = {
        type,
        id,
        name,
        required,
        validate,
        validateFailMessage,
        oncancel,
        onconfirm,
        autocomplete: false
    };
    if (props.value) {
        inputProperties.value = value;
    }
    if (props.focus) {
        inputProperties.autofocus = true;
    }
    if (props.select) {
        inputProperties.autoselect = true;
    }
    if (schema.description || schema.patternDescription) {
        inputProperties.title = schema.description || schema.patternDescription;
    }
    if (schema.pattern) {
        inputProperties.pattern = schema.pattern.source;
    }
    Input_1.default(inputProperties);
}
exports.object = {
    type: "object"
};
exports.array = {
    type: "array"
};
exports.boolean = {
    type: "boolean"
};
exports.string = {
    type: "string",
    createInput(c, props) {
        renderInput(c, props, "text");
    },
    coerce(value) {
        return `${value}`.trim();
    }
};
exports.number = {
    type: "number",
    createInput(c, props) {
        renderInput(c, props, "number");
    }
};
exports.integer = {
    type: "number",
    createInput(c, props) {
        renderInput(c, props, "number");
    }
};
exports.name = {
    ...exports.string,
    title: "Name"
};
exports.password = {
    ...exports.string,
    title: "Password",
    createInput(c, props) {
        renderInput(c, props, "password");
    }
};
exports.phone = {
    ...exports.string,
    format: "phone",
    pattern: /\+\d \(\d{3}\) \d{3}-\d{4}/,
    minLength: 8,
    maxLength: 20,
    createInput(c, props) {
        renderInput(c, props, "tel");
    },
    coerce: phone_1.formatPhoneNumberUSA
};
exports.date = {
    ...exports.string,
    format: "date",
    pattern: /^\d{4}-(0[1-9]|10|11|12)-(0[1-9]|[1-2][0-9]|30|31)$/,
    createInput(c, props) {
        renderInput(c, props, "date");
    }
};
exports.datetime = {
    ...exports.number,
    format: "date-time",
    // pattern: /^\d{4}-(0[1-9]|10|11|12)-(0[1-9]|[1-2][0-9]|30|31)T(([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-9][0-9](\.[0-9]{1,3}Z?)?)|24:00:00$/,
    coerce(value) {
        if (typeof value === "string") {
            value = Date.parse(value);
        }
        return value;
    },
    createInput(c, props) {
        renderInput(c, props, "datetime-local");
    }
};
exports.email = {
    ...exports.string,
    title: "Email",
    format: "email",
    pattern: /^[^@]+@[^@\.]+(\.[^@\.]+)+$/,
    patternDescription: "name@address.com",
    maxLength: 200,
    createInput(c, props) {
        renderInput(c, props, "email");
    }
};
exports.key = {
    format: "key",
    type: Key_1.default,
    pattern: Key_1.default.regex,
    coerce(value) {
        if (typeof value === "string") {
            value = Key_1.default.parse(value);
        }
        return value;
    }
};


/***/ }),

/***/ "../platform/lib/data/schema/validate.js":
/*!***********************************************!*\
  !*** ../platform/lib/data/schema/validate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = __webpack_require__(/*! ./functions */ "../platform/lib/data/schema/functions.js");
function isValidType(type, value) {
    if (typeof type === "string") {
        let actualType = typeof value;
        switch (type) {
            case "array": return Array.isArray(value);
            case "integer": return actualType === "number" && Number.isInteger(value);
            case "null": return value == null;
            default: return actualType === type;
        }
    }
    else {
        return type === value.constructor;
    }
}
function isValidPattern(pattern, value) {
    let regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;
    let result = regex.exec(value);
    if (!result || result[0].length !== value.length)
        return false;
    return true;
}
function validate(schema, value, root = value, path = [], errors = []) {
    let { type, properties, format, pattern, required = false } = schema;
    let { minimum, maximum, minLength, maxLength, minItems, maxItems } = schema;
    if (value === undefined) {
        if (required)
            errors.push(`${path.join(".")} is required`);
    }
    else {
        if (schema.validate) {
            let result = schema.validate.call(root, value);
            let success = result === undefined || result === true;
            if (!success) {
                let message = typeof result === "string" ? result : `${path.join(".")} failed custom validate`;
                errors.push(message);
            }
        }
        if (schema.not && validate(schema.not, value, root, path).length === 0)
            errors.push(`${path.join(".")} matched a not schema`);
        if (schema.allOf)
            throw new Error("Schema.allOf is not implemented");
        if (schema.anyOf)
            throw new Error("Schema.anyOf is not implemented yet");
        if (type != null) {
            if (Array.isArray(type)) {
                let valid = false;
                for (let item of type) {
                    if (isValidType(item, value)) {
                        valid = true;
                        break;
                    }
                }
                if (!valid) {
                    errors.push(`${path.join(".")} is not valid type: ${type.join('|')}`);
                }
            }
            else if (!isValidType(type, value)) {
                errors.push(`${path.join(".")} is not valid type: ${type}`);
            }
        }
        if (value != null) {
            if (properties) {
                //  iterate each property in the definition
                for (let key in properties) {
                    let propertySchema = properties[key] || schema.additionalProperties;
                    path.push(key);
                    if (propertySchema) {
                        validate(propertySchema, value[key], root, path, errors);
                    }
                    path.pop();
                }
                //  iterate each property in the value
                for (let key in value) {
                    let propertySchema = properties[key];
                    if (propertySchema)
                        continue; // we already tested this
                    propertySchema = schema.additionalProperties;
                    path.push(key);
                    if (!propertySchema) {
                        errors.push(`additional properties are not allowed: (${path.join(".")})`);
                    }
                    else {
                        validate(propertySchema, value[key], root, path, errors);
                    }
                    path.pop();
                }
            }
            if (schema.const && schema.const !== value)
                errors.push(`${path.join(".")} (${value}) is not required value: ${schema.const}`);
            if (schema.enum && !schema.enum.includes(value))
                errors.push(`${path.join(".")} (${value}) is not a member of enum.`);
            if (typeof value === "number") {
                if (minimum !== undefined && value < minimum)
                    errors.push(`${path.join(".")} (${value}) is less than minimum: ${minimum}`);
                if (maximum !== undefined && value > maximum)
                    errors.push(`${path.join(".")} (${value}) is greater than: ${maximum}`);
            }
            else if (typeof value === "string") {
                if (pattern && !isValidPattern(pattern, value))
                    errors.push(`${path.join(".")} (${value}) is not valid pattern: ${pattern}`);
                if (minLength !== undefined && value.length < minLength)
                    errors.push(`${path.join(".")} (${value}) is shorter than: ${minLength}`);
                if (maxLength !== undefined && value.length > maxLength)
                    errors.push(`${path.join(".")} (${value}) is longer than: ${maxLength}`);
            }
            else if (Array.isArray(value)) {
                if (minItems !== undefined && value.length < minItems)
                    errors.push(`${path.join(".")} (${value}) contains fewer items than: ${minItems}`);
                if (maxItems !== undefined && value.length > maxItems)
                    errors.push(`${path.join(".")} (${value}) contains more items than: ${maxItems}`);
                if (schema.items || schema.additionalItems) {
                    for (let i = 0; i < value.length; i++) {
                        let itemSchema = functions_1.getSubSchema(schema, i);
                        path.push(String(i));
                        if (itemSchema) {
                            validate(itemSchema, value[i], root, path, errors);
                        }
                        else {
                            //  in a restriction beyond spec, we require a valid schema for additionalItems
                            //  if items array is specified
                            errors.push(`${path.join(".")} does not allow additional items`);
                        }
                        path.pop();
                    }
                }
            }
        }
    }
    return errors;
}
exports.default = validate;


/***/ }),

/***/ "../platform/lib/data/stores/CompositeStore.js":
/*!*****************************************************!*\
  !*** ../platform/lib/data/stores/CompositeStore.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = __importDefault(__webpack_require__(/*! ../Store */ "../platform/lib/data/Store.js"));
/**
 * Base class for ModelSource implementations.
 * Also can serve as a simple in memory model source.
 */
class CompositeStore extends Store_1.default {
    constructor(stores) {
        super();
        this.stores = stores;
    }
    getStore(key) {
        let store = this.stores[key.schema.store || "memory"];
        if (store == null)
            throw new Error(`Store not found: ${name}`);
        return store;
    }
    addReadListener(listener) {
        for (let name in this.stores)
            this.stores[name].addReadListener(listener);
    }
    removeReadListener(listener) {
        for (let name in this.stores)
            this.stores[name].removeReadListener(listener);
    }
    addWriteListener(listener) {
        for (let name in this.stores)
            this.stores[name].addWriteListener(listener);
    }
    removeWriteListener(listener) {
        for (let name in this.stores)
            this.stores[name].removeWriteListener(listener);
    }
    get(key, peek = false) {
        return this.getStore(key).get(key, peek);
    }
    ensureWatched(key) {
        return this.getStore(key).ensureWatched(key);
    }
    removeWatched(key) {
        return this.getStore(key).removeWatched(key);
    }
    patch(key, value) {
        this.getStore(key).patch(key, value);
    }
}
exports.default = CompositeStore;


/***/ }),

/***/ "../platform/lib/data/stores/DefaultStore.js":
/*!***************************************************!*\
  !*** ../platform/lib/data/stores/DefaultStore.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompositeStore_1 = __importDefault(__webpack_require__(/*! ./CompositeStore */ "../platform/lib/data/stores/CompositeStore.js"));
const LocalStore_1 = __importDefault(__webpack_require__(/*! ./LocalStore */ "../platform/lib/data/stores/LocalStore.js"));
const MemoryStore_1 = __importDefault(__webpack_require__(/*! ./MemoryStore */ "../platform/lib/data/stores/MemoryStore.js"));
const SessionStore_1 = __importDefault(__webpack_require__(/*! ./SessionStore */ "../platform/lib/data/stores/SessionStore.js"));
const HashStore_1 = __importDefault(__webpack_require__(/*! ./HashStore */ "../platform/lib/data/stores/HashStore.js"));
const ServerStore_1 = __importDefault(__webpack_require__(/*! ./ServerStore */ "../platform/lib/data/stores/ServerStore.js"));
const DependentStore_1 = __importDefault(__webpack_require__(/*! ./DependentStore */ "../platform/lib/data/stores/DependentStore.js"));
exports.stores = {
    local: global.localStorage ? new LocalStore_1.default() : new MemoryStore_1.default(),
    session: global.sessionStorage ? new SessionStore_1.default() : new MemoryStore_1.default(),
    hash: global.location ? new HashStore_1.default() : new MemoryStore_1.default(),
    memory: new MemoryStore_1.default(),
    dependent: new DependentStore_1.default(),
    server: global.fetch ? new ServerStore_1.default() : new MemoryStore_1.default(),
};
function create(config) {
    const newStores = Object.assign({}, exports.stores, config);
    return Object.assign(new CompositeStore_1.default(newStores), newStores);
}
exports.create = create;
// export default interface DefaultStore extends Store {
//     stores: { [name: string]: Store }
//     local: Store
//     session: Store
//     memory: Store
//     hash: Store
//     server: Store
//     dependent: Store
// }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../glass-chess/node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../platform/lib/data/stores/DependentStore.js":
/*!*****************************************************!*\
  !*** ../platform/lib/data/stores/DependentStore.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MemoryStore_1 = __importDefault(__webpack_require__(/*! ./MemoryStore */ "../platform/lib/data/stores/MemoryStore.js"));
class DependentStore extends MemoryStore_1.default {
    ensureWatched(key) {
        let newlyWatched = super.ensureWatched(key);
        if (newlyWatched) {
            let type = key.type;
            type.watched(key);
        }
        return newlyWatched;
    }
}
exports.default = DependentStore;


/***/ }),

/***/ "../platform/lib/data/stores/HashStore.js":
/*!************************************************!*\
  !*** ../platform/lib/data/stores/HashStore.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(__webpack_require__(/*! ../Model */ "../platform/lib/data/Model.js"));
const LocalStore_1 = __importDefault(__webpack_require__(/*! ./LocalStore */ "../platform/lib/data/stores/LocalStore.js"));
class HashStorage {
    constructor() {
        this.keys = null;
        this.hash = this.getHash();
    }
    getKeys() {
        if (!this.keys)
            this.keys = Object.keys(this.hash);
        return this.keys;
    }
    getHash() {
        try {
            let hash = location.hash.slice(1).trim();
            if (hash.length > 0)
                return JSON.parse(decodeURIComponent(hash));
        }
        catch (e) {
            console.warn(e);
        }
        return {};
    }
    updateHash() {
        location.hash = JSON.stringify(this.hash);
        this.keys = null; // invalidate keys
    }
    get length() {
        return this.getKeys().length;
    }
    key(index) {
        return this.getKeys()[index];
    }
    getItem(key) { return this.hash[key]; }
    setItem(key, value) {
        this.hash[key] = value;
        this.updateHash();
    }
    removeItem(key) {
        delete this.hash[key];
        this.updateHash();
    }
    clear() {
        this.hash = {};
        this.updateHash();
    }
}
class HashStore extends LocalStore_1.default {
    constructor(serializer = Model_1.default.serializer) {
        super(new HashStorage(), serializer);
    }
}
exports.default = HashStore;


/***/ }),

/***/ "../platform/lib/data/stores/LocalStore.js":
/*!*************************************************!*\
  !*** ../platform/lib/data/stores/LocalStore.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Key_1 = __importDefault(__webpack_require__(/*! ../Key */ "../platform/lib/data/Key.js"));
const MemoryStore_1 = __importDefault(__webpack_require__(/*! ./MemoryStore */ "../platform/lib/data/stores/MemoryStore.js"));
const Serializer_1 = __importDefault(__webpack_require__(/*! ../Serializer */ "../platform/lib/data/Serializer.js"));
//  local stores extend memory stores and then operate as a write-through cache
//  we DO NOT watch the localStorage object in realtime.
class LocalStore extends MemoryStore_1.default {
    constructor(storage = localStorage, serializer = Serializer_1.default.default) {
        super();
        this.loaded = new Set();
        this.serializer = serializer;
        this.storage = storage;
    }
    ensureLoaded(key) {
        let checkLoadedKey = Key_1.default.isSearchKey(key) ? key.schema : key.string;
        if (!this.loaded.has(checkLoadedKey)) {
            this.loaded.add(checkLoadedKey);
            if (Key_1.default.isModelKey(key)) {
                let value = this.storage.getItem(key.string);
                if (value != null) {
                    let model = this.serializer.parse(value);
                    this.setValue(key, model);
                }
            }
            else {
                let filter = key.schema.name + "/";
                // iterate all keys and try to load values
                for (let i = 0; i < this.storage.length; i++) {
                    let keyString = this.storage.key(i);
                    if (keyString !== null && keyString.startsWith(filter) && Key_1.default.isProbablyModelKey(keyString)) {
                        try {
                            let modelKey = Key_1.default.parse(this.serializer.namespace, keyString);
                            this.ensureLoaded(modelKey);
                        }
                        catch (e) {
                            // console.warn(e)
                            console.warn(`Deleting invalid key (${keyString})`);
                            // storage.removeItem(keyString)
                        }
                    }
                }
            }
        }
    }
    get(key, peek = false) {
        this.ensureLoaded(key);
        return super.get(key, peek);
    }
    setValue(key, value) {
        let changed = super.setValue(key, value);
        // we only store model keys in local storage, never query keys
        if (changed && Key_1.default.isModelKey(key)) {
            if (value != null) {
                if (key.type != null && value.constructor !== key.type)
                    value = new key.type(value);
                this.storage.setItem(key.string, this.serializer.stringify(value));
            }
            else {
                this.storage.removeItem(key.string);
            }
        }
        return changed;
    }
}
exports.default = LocalStore;


/***/ }),

/***/ "../platform/lib/data/stores/MemoryStore.js":
/*!**************************************************!*\
  !*** ../platform/lib/data/stores/MemoryStore.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Key_1 = __importDefault(__webpack_require__(/*! ../Key */ "../platform/lib/data/Key.js"));
const clonePatch_1 = __importDefault(__webpack_require__(/*! ../../utility/clonePatch */ "../platform/lib/utility/clonePatch.js"));
const Store_1 = __importDefault(__webpack_require__(/*! ../Store */ "../platform/lib/data/Store.js"));
const Table_1 = __importDefault(__webpack_require__(/*! ./Table */ "../platform/lib/data/stores/Table.js"));
const validate_1 = __importDefault(__webpack_require__(/*! ../schema/validate */ "../platform/lib/data/schema/validate.js"));
/**
 * Base class for ModelSource implementations.
 * Also can serve as a simple in memory model source.
 */
class MemoryStore extends Store_1.default {
    constructor() {
        super(...arguments);
        this.tables = new Map();
        this.keys = new Map();
        this.values = new Map();
        this.writeListeners = new Set();
        this.readListeners = new Set();
        this.watched = new Set();
    }
    getTable(key) {
        let table = this.tables.get(key.string);
        if (table == null) {
            table = new Table_1.default(key);
            for (let modelKey of this.keys.values()) {
                if (Key_1.default.isModelKey(modelKey)) {
                    if (key.isPossibleMatch(modelKey)) {
                        let model = this.peek(modelKey);
                        if (model == null)
                            throw new Error(`Model is missing for key: ${modelKey}`);
                        table.update(modelKey, model);
                    }
                }
            }
            this.tables.set(key.string, table);
        }
        return table;
    }
    addReadListener(listener) {
        this.readListeners.add(listener);
    }
    removeReadListener(listener) {
        this.readListeners.delete(listener);
    }
    addWriteListener(listener) {
        this.writeListeners.add(listener);
    }
    removeWriteListener(listener) {
        this.writeListeners.delete(listener);
    }
    get(key, peek = false) {
        // if it's a query make sure we have the corresponding table tracking changes
        if (!peek) {
            this.notify(key, this.readListeners);
            this.ensureWatched(key);
        }
        let value = this.values.get(key.string);
        // if a ModelClass provides a default value we return that when no value is present.
        if (value == null) {
            // if it's a query key not explicitly cached then we create it.
            if (Key_1.default.isSearchKey(key)) {
                return this.getTable(key).getKeys(this);
            }
            value = key.schema.default || value;
        }
        return value;
    }
    ensureWatched(key) {
        if (this.watched.has(key.string))
            return false;
        this.watched.add(key.string);
        return true;
    }
    removeWatched(key) {
        return this.watched.delete(key.string);
    }
    patch(key, value) {
        if (!Key_1.default.isModelKey(key))
            throw new Error("Invalid EntityKey: " + key);
        let newValue = clonePatch_1.default(this.get(key, true), value);
        if (key.type == null && value != null) {
            // if the key has a type then that validates on construction
            // otherwise we need to validate the value here.
            let errors = validate_1.default(key.schema, value);
            if (errors.length > 0) {
                throw new Error(`validation of ${key.string} failed:\n${errors.join("\n")}`);
            }
        }
        this.setValue(key, newValue);
    }
    setValue(key, value) {
        let currentValue = this.values.get(key.string);
        if (value === currentValue) {
            return false;
        }
        if (Key_1.default.isModelKey(key)) {
            if (value != null && key.type != null && value.constructor !== key.type) {
                value = new key.type(value);
            }
            if (!this.keys.has(key.string)) {
                this.keys.set(key.string, key);
            }
            for (let table of this.tables.values()) {
                if (table.update(key, value)) {
                    this.notify(table.key, this.writeListeners);
                }
            }
        }
        this.values.set(key.string, value);
        this.notify(key, this.writeListeners);
        return true;
    }
    notify(key, listeners) {
        for (let listener of listeners)
            listener(key);
    }
}
exports.default = MemoryStore;


/***/ }),

/***/ "../platform/lib/data/stores/ServerStore.js":
/*!**************************************************!*\
  !*** ../platform/lib/data/stores/ServerStore.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Key_1 = __importDefault(__webpack_require__(/*! ../Key */ "../platform/lib/data/Key.js"));
const MemoryStore_1 = __importDefault(__webpack_require__(/*! ./MemoryStore */ "../platform/lib/data/stores/MemoryStore.js"));
const Model_1 = __importDefault(__webpack_require__(/*! ../Model */ "../platform/lib/data/Model.js"));
const invoke_1 = __importDefault(__webpack_require__(/*! ../../server/invoke */ "../platform/lib/server/invoke.js"));
//  Query results
//      limit ? -> cache results
//      else -> just store values
class ServerStore extends MemoryStore_1.default {
    constructor(path = "/api/data", serializer = Model_1.default.serializer) {
        super();
        this.path = path;
        this.serializer = serializer;
    }
    ensureWatched(key) {
        if (!super.ensureWatched(key)) {
            return false;
        }
        let handleEntities = (entities) => {
            // now... do we store individual query results, or entire result sets?
            // for now let's just store the whole value till we can analyze
            for (let entity of entities) {
                this.watched.add(entity.key.string);
                super.setValue(entity.key, entity);
            }
            if (Key_1.default.isSearchKey(key) && key.query != null && key.query.limit != null) {
                let keys = entities.map(entity => entity.key);
                super.setValue(key, keys);
            }
            if (Key_1.default.isModelKey(key) && entities.length == 0) {
                super.setValue(key, null);
            }
        };
        console.log(`ensureLoaded ${key}`);
        if (Key_1.default.isSearchKey(key)) {
            const rowDelimiter = "\n";
            let url = `${this.path}/query/${key}`;
            let xhr = new XMLHttpRequest();
            let read = 0;
            let entities = [];
            let tryRead = () => {
                let text = xhr.responseText;
                let rowEnd = text.lastIndexOf(rowDelimiter);
                // console.log('tryRead', {rowEnd})
                if (rowEnd > 0) {
                    // console.log("next", { read, rowEnd })
                    let unread = text.slice(read, rowEnd);
                    if (unread.length > 0) {
                        read = rowEnd;
                        let serializedRows = unread.trim().split(rowDelimiter);
                        entities.push(...serializedRows.map(raw => Model_1.default.serializer.parse(raw)));
                        // console.log("Deserialize: " + serializedRows.length)
                    }
                }
            };
            xhr.onprogress = tryRead;
            xhr.onload = () => {
                tryRead();
                handleEntities(entities);
            };
            xhr.open("GET", url);
            xhr.responseType = "text";
            xhr.send();
        }
        else {
            invoke_1.default(`${this.path}/get`, [key.toString()]).then(result => {
                let entities = result[0];
                handleEntities(entities);
            }, reason => {
                console.log("Invoke get error", reason);
            });
        }
        return true;
    }
    setValue(key, value) {
        let changed = super.setValue(key, value);
        // we only store model keys in local storage, never query keys
        if (changed && Key_1.default.isModelKey(key)) {
            // mark this entity as watched
            this.watched.add(key.toString());
            if (value != null) {
                if (key.type != null && value.constructor !== key.type) {
                    value = new key.type(value);
                }
            }
            else {
                throw new Error("No deleting yet");
            }
            invoke_1.default(`${this.path}/patch`, { [key.toString()]: value }).then(result => {
                console.log("patch?", result);
            }, reason => {
                console.log("Invoke patch error", reason);
            });
        }
        return changed;
    }
}
exports.default = ServerStore;


/***/ }),

/***/ "../platform/lib/data/stores/SessionStore.js":
/*!***************************************************!*\
  !*** ../platform/lib/data/stores/SessionStore.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStore_1 = __importDefault(__webpack_require__(/*! ./LocalStore */ "../platform/lib/data/stores/LocalStore.js"));
class SessionStore extends LocalStore_1.default {
    constructor(serializer) {
        super(sessionStorage, serializer);
    }
}
exports.default = SessionStore;


/***/ }),

/***/ "../platform/lib/data/stores/Table.js":
/*!********************************************!*\
  !*** ../platform/lib/data/stores/Table.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = __webpack_require__(/*! ../Query */ "../platform/lib/data/Query.js");
class Table {
    constructor(key) {
        this.keys = new Map();
        this.cachedKeys = null;
        this.key = key;
        this.filter = Query_1.createPredicate(key.query);
    }
    invalidateCachedKeys() {
        this.cachedKeys = null;
    }
    getKeyIterator() {
        return this.keys.values();
    }
    createSortedKeys(store) {
        if (this.key.query.sort == null || this.key.query.sort.length === 0)
            return Array.from(this.getKeyIterator());
        //  get value for each key
        let values = [];
        let valueToKeyMap = new Map();
        for (let key of this.getKeyIterator()) {
            let value = store.peek(key);
            if (value) {
                values.push(value);
                valueToKeyMap.set(value, key);
            }
        }
        //  sort values
        values.sort(Query_1.createSortCompareFunction(this.key.query));
        //  convert back to keys and return
        return values.map(t => valueToKeyMap.get(t));
    }
    getKeys(store) {
        if (this.cachedKeys == null)
            this.cachedKeys = this.createSortedKeys(store);
        return this.cachedKeys;
    }
    update(key, record) {
        if (record != null) {
            if (this.key.isPossibleMatch(key) && this.filter(record)) {
                if (!this.keys.has(key.string)) {
                    this.invalidateCachedKeys();
                    this.keys.set(key.string, key);
                    return true;
                }
            }
            else {
                record = null;
            }
        }
        if (record == null && this.keys.has(key.string)) {
            this.invalidateCachedKeys();
            this.keys.delete(key.string);
            return true;
        }
        return false;
    }
}
exports.default = Table;


/***/ }),

/***/ "../platform/lib/model/FocusState.js":
/*!*******************************************!*\
  !*** ../platform/lib/model/FocusState.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FocusState_1;
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(__webpack_require__(/*! ../data/Model */ "../platform/lib/data/Model.js"));
const Key_1 = __importDefault(__webpack_require__(/*! ../data/Key */ "../platform/lib/data/Key.js"));
const State_1 = __importDefault(__webpack_require__(/*! ../data/State */ "../platform/lib/data/State.js"));
let FocusState = FocusState_1 = class FocusState extends State_1.default {
};
FocusState.key = Key_1.default.create(FocusState_1, "0");
__decorate([
    Model_1.default.property({ type: "string", default: "" })
], FocusState.prototype, "id", void 0);
__decorate([
    Model_1.default.property({ type: "integer", default: 0 })
], FocusState.prototype, "start", void 0);
__decorate([
    Model_1.default.property({ type: "integer", default: 0 })
], FocusState.prototype, "end", void 0);
__decorate([
    Model_1.default.property({ enum: ["forward", "backward", "none"], default: "none" })
], FocusState.prototype, "direction", void 0);
FocusState = FocusState_1 = __decorate([
    Model_1.default.class()
], FocusState);
exports.default = FocusState;


/***/ }),

/***/ "../platform/lib/model/Identity.js":
/*!*****************************************!*\
  !*** ../platform/lib/model/Identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var Identity_1;
Object.defineProperty(exports, "__esModule", { value: true });
const schema = __importStar(__webpack_require__(/*! ../data/schema */ "../platform/lib/data/schema/index.js"));
const Key_1 = __importDefault(__webpack_require__(/*! ../data/Key */ "../platform/lib/data/Key.js"));
const Store_1 = __importDefault(__webpack_require__(/*! ../data/Store */ "../platform/lib/data/Store.js"));
const Model_1 = __importDefault(__webpack_require__(/*! ../data/Model */ "../platform/lib/data/Model.js"));
const common_1 = __webpack_require__(/*! ../utility/common */ "../platform/lib/utility/common.js");
const User_1 = __importDefault(__webpack_require__(/*! ./User */ "../platform/lib/model/User.js"));
const sessionKey = Key_1.default.create({ name: "AccessToken_session", store: "session", type: "string" }, "singleton");
const localKey = Key_1.default.create({ name: "AccessToken_local", store: "local", type: "string" }, "singleton");
const tokenToIdentity = common_1.memoize((token) => {
    const [header, message, signature] = token.split(".");
    return new Identity(JSON.parse(atob(message)), { token });
});
/**
 * This model represents the parsed body of our access tokens.
 * Use the static get/set functions to store or retrieve.
 */
let Identity = Identity_1 = class Identity extends Model_1.default {
    getUserKey(userClass = User_1.default) {
        return Key_1.default.create(userClass, this.email);
    }
    get initials() {
        return this.name.split(" ").map(name => name[0]).join("").toUpperCase();
    }
    static get() {
        const sessionToken = Store_1.default.default.get(sessionKey);
        const localToken = Store_1.default.default.get(localKey);
        const token = sessionToken || localToken;
        return token != null ? tokenToIdentity(token) : null;
    }
    static set(token, remember = false) {
        Store_1.default.default.patch(sessionKey, remember ? token : null);
        Store_1.default.default.patch(localKey, remember ? null : token);
    }
    static revoke() {
        Identity_1.set(null);
    }
};
__decorate([
    Model_1.default.property(schema.number)
], Identity.prototype, "exp", void 0);
__decorate([
    Model_1.default.property(schema.datetime)
], Identity.prototype, "issued", void 0);
__decorate([
    Model_1.default.property(schema.name)
], Identity.prototype, "name", void 0);
__decorate([
    Model_1.default.property(schema.email)
], Identity.prototype, "email", void 0);
__decorate([
    Model_1.default.property(schema.string)
], Identity.prototype, "token", void 0);
Identity = Identity_1 = __decorate([
    Model_1.default.class()
], Identity);
exports.default = Identity;


/***/ }),

/***/ "../platform/lib/model/User.js":
/*!*************************************!*\
  !*** ../platform/lib/model/User.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const schema = __importStar(__webpack_require__(/*! ../data/schema */ "../platform/lib/data/schema/index.js"));
const Entity_1 = __importDefault(__webpack_require__(/*! ../data/Entity */ "../platform/lib/data/Entity.js"));
const Key_1 = __importDefault(__webpack_require__(/*! ../data/Key */ "../platform/lib/data/Key.js"));
let User = class User extends Entity_1.default {
    get email() { return this.key.id; }
};
__decorate([
    Entity_1.default.property(schema.name, { title: "Name", minLength: 1, maxLength: 100, required: true })
], User.prototype, "name", void 0);
__decorate([
    Entity_1.default.property(schema.email, { title: "Email", required: true })
], User.prototype, "email", null);
__decorate([
    Entity_1.default.property(schema.phone, { title: "Mobile", required: true })
], User.prototype, "mobile", void 0);
__decorate([
    Entity_1.default.property(schema.string, { maxLength: 500 })
], User.prototype, "passwordHash", void 0);
User = __decorate([
    Entity_1.default.class()
], User);
exports.default = User;
const sessionKey = Key_1.default.create({ name: "User.sessionKey", store: "session", type: "string" }, "singleton");
const localKey = Key_1.default.create({ name: "User.localKey", store: "local", type: "string" }, "singleton");


/***/ }),

/***/ "../platform/lib/server/invoke.js":
/*!****************************************!*\
  !*** ../platform/lib/server/invoke.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(__webpack_require__(/*! ../data/Model */ "../platform/lib/data/Model.js"));
const Identity_1 = __importDefault(__webpack_require__(/*! ../model/Identity */ "../platform/lib/model/Identity.js"));
//  invokes a server side remote api function
async function invoke(path, input) {
    let identity = Identity_1.default.get();
    let headers = {
        "Content-Type": "application/json; charset=utf-8"
    };
    if (identity) {
        headers.token = identity.token;
    }
    let result = await fetch(path, {
        method: "POST",
        headers,
        body: Model_1.default.serializer.stringify(input)
    });
    return Model_1.default.serializer.parse(await result.text());
}
exports.default = invoke;


/***/ }),

/***/ "../platform/lib/ui/Context.js":
/*!*************************************!*\
  !*** ../platform/lib/ui/Context.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import DefaultStore from "../data/stores/DefaultStore"
const Store_1 = __importDefault(__webpack_require__(/*! ../data/Store */ "../platform/lib/data/Store.js"));
const localize_1 = __importDefault(__webpack_require__(/*! ./localize */ "../platform/lib/ui/localize.js"));
const bindComponentToDom_1 = __importDefault(__webpack_require__(/*! ./html/bindComponentToDom */ "../platform/lib/ui/html/bindComponentToDom.js"));
const SoundContext_1 = __importDefault(__webpack_require__(/*! ./sound/SoundContext */ "../platform/lib/ui/sound/SoundContext.js"));
const functions_1 = __webpack_require__(/*! ./html/functions */ "../platform/lib/ui/html/functions.js");
function quickPropertyEquals(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null || typeof a !== "object" || a.constructor !== b.constructor)
        return false;
    if (Array.isArray(a)) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false;
        }
    }
    else {
        for (let name in a) {
            if (a[name] !== b[name])
                return false;
        }
        for (let name in b) {
            if (a[name] !== b[name])
                return false;
        }
    }
    return true;
}
class Context {
    constructor(root = document.body) {
        this.renderStack = [];
        this.store = Store_1.default.default;
        this.sound = new SoundContext_1.default();
        this.localize = localize_1.default;
        this.recycled = 0;
        this.created = 0;
        this.removed = 0;
        this.skipped = 0;
        this.createdComponents = 0;
        this.removedComponents = 0;
        this.postRenderCallbacks = new Set();
        this.isRendering = false;
        this.elements = [root, null];
        if (root.ownerDocument == null) {
            throw new Error("Node is not in a document");
        }
        this.document = root.ownerDocument;
        // bind some of the members likely to be used without this.
        this.begin = this.begin.bind(this);
        this.text = this.text.bind(this);
        this.end = this.end.bind(this);
        this.empty = this.empty.bind(this);
        this.render = this.render.bind(this);
    }
    ////////////////////////////////////////////////////////////////////////////////
    //  BEGIN STATS
    ////////////////////////////////////////////////////////////////////////////////
    resetStats() {
        this.recycled = 0;
        this.created = 0;
        this.removed = 0;
        this.skipped = 0;
        this.createdComponents = 0;
        this.removedComponents = 0;
    }
    ////////////////////////////////////////////////////////////////////////////////
    //  END STATS
    ////////////////////////////////////////////////////////////////////////////////
    begin(factory, properties) {
        if (!this.isRendering)
            throw new Error("Invalid attempt to render without beginRender / endRender");
        // let factory = isNodeClass(classOrFactory) ? classOrFactory.getFactory() : classOrFactory
        // we recycle nodes if they come from the same factory
        const maybeRecycle = this.insertBefore;
        let node = maybeRecycle != null && maybeRecycle.factory === factory ? maybeRecycle : null;
        if (node == null) {
            //  create a new node
            this.created++;
            node = factory.create(this);
            node.factory = factory;
            this.insert(node);
        }
        else {
            //  recycle a previous node
            this.recycled++;
            this.disposeOfAnyComponents(node);
        }
        factory.setProperties(node, properties);
        this.push(node);
        return node;
    }
    end(factory) {
        if (factory != null) {
            if (this.parentNode.factory !== factory) {
                throw new Error("Begin and end node factories do not match");
            }
        }
        //  remove any remaining children following the insert after
        let remove;
        while (remove = this.insertBefore) {
            this.disposeOfAnyComponents(remove, true);
            this.removed++;
            this.parentNode.removeChild(remove);
        }
        this.pop();
    }
    /**
     * Begins and ends a new node optionally containing content.
     * @param factory
     * @param propertiesOrContent
     * @param content
     */
    empty(factory, propertiesOrContent, content) {
        let node;
        if (typeof propertiesOrContent === "string") {
            node = this.begin(factory);
            this.text(propertiesOrContent);
        }
        else {
            node = this.begin(factory, propertiesOrContent);
            if (content != null) {
                this.text(content);
            }
        }
        this.end(factory);
        return node;
    }
    text(content) {
        let textFactory = this.parentNode.factory.text;
        if (textFactory == null) {
            throw new Error("Cannot add text content to current node.");
        }
        let node = this.begin(textFactory, content);
        this.end(textFactory);
        return node;
    }
    get component() {
        return this.renderStack[this.renderStack.length - 1];
    }
    disposeOfAnyComponents(node, deep = false) {
        for (let component = node.component; component != null; component = component.next) {
            if (component) {
                this.removedComponents++;
            }
            // recursively search for and dispose of any descendant components
            if (deep) {
                for (let child = node.firstChild; child != null; child = child.nextSibling) {
                    this.disposeOfAnyComponents(child, deep);
                }
            }
            if (component.dispose) {
                component.dispose();
            }
            if (this.onDispose) {
                this.onDispose(component);
            }
            component.node = null;
            delete node.component;
        }
    }
    //  need a way to request a notification after normal rendering
    requestAnimationFrame(callback) {
        if (this.isRendering) {
            this.postRenderCallbacks.add(callback);
        }
        else {
            window.requestAnimationFrame(callback);
        }
    }
    static get current() {
        return Context.currentStack[Context.currentStack.length - 1];
    }
    beginRender(parentNode, insertAfterNode = null) {
        Context.currentStack.push(this);
        this.isRendering = true;
        this.elements[0] = parentNode;
        this.elements[1] = insertAfterNode;
        this.elements.length = 2;
    }
    endRender() {
        this.isRendering = false;
        Context.currentStack.pop();
    }
    rerender(components, time) {
        for (let component of components) {
            let node = component.node;
            // if the node or parentNode is null then this component has already been disposed
            if (node != null) {
                let rootComponent = node.component;
                if (rootComponent != null) {
                    // reset the stack so we can re-render over the previous node
                    this.beginRender(node.parentNode, node.previousSibling);
                    this.render(rootComponent.render, rootComponent.properties, true);
                    this.endRender();
                }
            }
        }
        if (this.postRenderCallbacks.size > 0) {
            for (let callback of this.postRenderCallbacks) {
                callback(time);
            }
            this.postRenderCallbacks.clear();
        }
    }
    render(type, properties, forceRenderBecauseStateChanged = false) {
        if (!this.isRendering)
            throw new Error("Invalid attempt to render without beginRender / endRender");
        let parentNode = this.parentNode;
        let insertAfter = this.insertAfter;
        let insertBefore = this.insertBefore;
        let previousComponent = insertBefore && insertBefore.component;
        if (!forceRenderBecauseStateChanged && previousComponent && previousComponent.render === type && quickPropertyEquals(previousComponent.properties, properties)) {
            //  early exit... just skip node
            this.skipped++;
            this.insertAfter = insertBefore;
        }
        else {
            this.createdComponents++;
            //  create new Component
            let component = { render: type, properties, node: null };
            this.renderStack.push(component);
            let maybeDispose = component.render(this, properties);
            if (maybeDispose) {
                if (typeof maybeDispose === "object") {
                    maybeDispose = functions_1.bindEventListeners(maybeDispose);
                }
                if (typeof maybeDispose !== "function") {
                    throw new Error("Component render functions can only return a dispose function or nothing");
                }
                component.dispose = maybeDispose;
            }
            this.renderStack.pop();
            let firstNode = (insertAfter ? insertAfter.nextSibling : parentNode.firstChild);
            if (firstNode == null || insertAfter === this.insertAfter)
                throw new Error(`Component must render one node: ${type.toString()}`);
            if (firstNode.component != null) {
                //  nested components
                //  child components are first but we want most ancestral component on top
                //  so we replace component on node
                component.next = firstNode.component;
            }
            firstNode.component = component;
            component.node = firstNode;
            let lastNode = this.insertAfter;
            if (lastNode !== firstNode)
                throw new Error("Component cannot render more than one node");
        }
        return this.insertAfter;
    }
    push(element) {
        this.insertAfter = element;
        this.elements.push(element, null);
    }
    pop() { this.elements.length -= 2; }
    get parentNode() { return this.elements[this.elements.length - 2]; }
    insert(node) {
        this.parentNode.insertBefore(node, this.insertBefore);
        return node;
    }
    get insertAfter() { return this.elements[this.elements.length - 1]; }
    set insertAfter(element) { this.elements[this.elements.length - 1] = element; }
    get insertBefore() {
        let insertAfter = this.insertAfter;
        let insertBefore = insertAfter != null ? insertAfter.nextSibling : this.parentNode.firstChild;
        return insertBefore;
    }
    get lastNode() { return this.insertAfter; }
    static bind(render, arg, container = document.body) {
        if (container == null) {
            throw new Error("document.body must be defined before calling this function");
        }
        bindComponentToDom_1.default(container, render, arg);
    }
    static component(render) {
        return (properties) => {
            return Context.current.render(render, properties);
        };
    }
}
exports.default = Context;
Context.currentStack = [];
/**
 * Alternative way to convert a render function to a component function.
 * Javascript doesn't yet have a standard proposal for function declarators though.
 * So this is not useful yet.
 */
exports.component = Context.component;


/***/ }),

/***/ "../platform/lib/ui/html/HtmlElementFactory.js":
/*!*****************************************************!*\
  !*** ../platform/lib/ui/html/HtmlElementFactory.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = __importDefault(__webpack_require__(/*! ../Context */ "../platform/lib/ui/Context.js"));
const HtmlTextNodeFactory_1 = __importDefault(__webpack_require__(/*! ./HtmlTextNodeFactory */ "../platform/lib/ui/html/HtmlTextNodeFactory.js"));
const ignoreProperties = { content: true };
function HtmlElementFactory(tagName, namespaceOrAttributes) {
    let attributes = null;
    let namespace = null;
    if (typeof namespaceOrAttributes === "string") {
        namespace = namespaceOrAttributes;
    }
    else {
        attributes = namespaceOrAttributes;
    }
    function isAttribute(name, value, previousValue) {
        if (typeof value === "function" || typeof previousValue === "function") {
            return false;
        }
        return attributes == null || attributes[name] === true;
    }
    let factory = {
        text: HtmlTextNodeFactory_1.default.instance,
        create(c) {
            if (namespace) {
                return c.document.createElementNS(namespace, tagName);
            }
            else {
                return c.document.createElement(tagName);
            }
        },
        setProperties(node, properties = null) {
            const previousProperties = node.properties;
            if (properties != null) {
                for (let name in properties) {
                    if (!ignoreProperties[name]) {
                        let value = properties[name];
                        let previousValue = previousProperties != null ? previousProperties[name] : undefined;
                        if (previousValue != value /* != on purpose */) {
                            if (isAttribute(name, value, previousValue)) {
                                if (value != null) {
                                    node.setAttribute(name, value);
                                }
                                else {
                                    node.removeAttribute(name);
                                }
                            }
                            else {
                                node[name] = value;
                            }
                        }
                    }
                }
            }
            if (previousProperties != null) {
                for (let name in previousProperties) {
                    if (!ignoreProperties[name]) {
                        let previousValue = previousProperties[name];
                        if (properties == null || !properties.hasOwnProperty(name)) {
                            let value = properties != null ? properties[name] : undefined;
                            if (isAttribute(name, value, previousValue)) {
                                node.removeAttribute(name);
                            }
                            else {
                                node[name] = null;
                            }
                        }
                    }
                }
            }
            node.properties = properties;
        },
        dispose(node) {
        },
        toString() {
            return `HtmlNodeFactory(${tagName})`;
        }
    };
    function renderElement(properties) {
        let c = Context_1.default.current;
        let content = null;
        if (typeof properties !== "object") {
            content = properties;
            properties = null;
        }
        else if (properties) {
            content = properties["content"];
        }
        let element = c.begin(factory, properties);
        if (typeof content === "function") {
            content(c);
        }
        else if (typeof content === "string") {
            c.text(content);
        }
        else if (content != null) {
            throw new Error(`Unsupported content type: ${content}`);
        }
        c.end(factory);
        // return element as unknown as HTMLElement
        return element;
    }
    return Object.assign(renderElement, factory);
}
exports.default = HtmlElementFactory;


/***/ }),

/***/ "../platform/lib/ui/html/HtmlTextNodeFactory.js":
/*!******************************************************!*\
  !*** ../platform/lib/ui/html/HtmlTextNodeFactory.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HtmlTextNodeFactory {
    constructor() {
    }
    create(c) {
        return c.document.createTextNode("");
    }
    setProperties(node, properties) {
        properties = properties != null ? properties.toString() : "";
        const previousProperties = node.properties;
        if (properties !== previousProperties) {
            node.textContent = properties;
        }
        node.properties = properties;
    }
    dispose(node) {
    }
    toString() {
        return `HtmlTextNodeFactory`;
    }
}
exports.default = HtmlTextNodeFactory;
HtmlTextNodeFactory.instance = new HtmlTextNodeFactory();


/***/ }),

/***/ "../platform/lib/ui/html/bindComponentToDom.js":
/*!*****************************************************!*\
  !*** ../platform/lib/ui/html/bindComponentToDom.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = __importDefault(__webpack_require__(/*! ../../data/Store */ "../platform/lib/data/Store.js"));
const Context_1 = __importDefault(__webpack_require__(/*! ../Context */ "../platform/lib/ui/Context.js"));
const DependencyTracker_1 = __importDefault(__webpack_require__(/*! ../../utility/DependencyTracker */ "../platform/lib/utility/DependencyTracker.js"));
function bindComponentToDom(container, componentType, componentProperties, store) {
    var _a, _b;
    if (store == null) {
        store = Store_1.default.default;
        if (store == null) {
            //  there is a circular dependency somewhere.
            //  between Store -> Key -> Model -> Store
            //  have not been able to remove it without losing State typing.
            //  so we're still importing this one with require.
            Store_1.default.default = store = __webpack_require__(/*! ../../data/stores/DefaultStore */ "../platform/lib/data/stores/DefaultStore.js").create();
        }
    }
    let pendingRenders = new Set();
    function render(time) {
        let start = performance.now();
        let count = pendingRenders.size;
        // reset stats
        context.resetStats();
        context.rerender(pendingRenders, time);
        pendingRenders.clear();
        let finish = performance.now();
        let delta = finish - start;
        //  using debug so that by default it's not visible
        //  if you want to see it you have to enable "verbose" in the browser console settings
        console.debug(`${delta.toFixed(2)} ms: Update ${count}, Skipped: ${context.skipped}, Reused: ${context.recycled}, Removed: ${context.removed}, Added: ${context.created}`);
    }
    function queueRender(components) {
        if (components.size === 0) {
            return;
        }
        let alreadyQueued = pendingRenders.size > 0;
        for (let component of components) {
            pendingRenders.add(component);
        }
        if (!alreadyQueued) {
            requestAnimationFrame(render);
        }
    }
    //  create dependency tracker to track which components are dependent upon which keys
    let dependencies = new DependencyTracker_1.default();
    //  listen to writes on the low level store
    function writeListener(key) {
        queueRender(dependencies.getDependents(key.string));
    }
    function readListener(key) {
        if (context.component) {
            dependencies.add(context.component, key.string);
        }
    }
    (_a = store) === null || _a === void 0 ? void 0 : _a.addWriteListener(writeListener);
    (_b = store) === null || _b === void 0 ? void 0 : _b.addReadListener(readListener);
    let context = new Context_1.default(container);
    context.onDispose = (component) => {
        dependencies.remove(component);
    };
    // now render our main component
    context.beginRender(container);
    context.render(componentType, componentProperties);
    context.endRender();
    //  return a function which can be used to unbind this
    return () => {
        var _a, _b;
        (_a = store) === null || _a === void 0 ? void 0 : _a.removeWriteListener(writeListener);
        (_b = store) === null || _b === void 0 ? void 0 : _b.removeReadListener(readListener);
    };
}
exports.default = bindComponentToDom;


/***/ }),

/***/ "../platform/lib/ui/html/components/Input.js":
/*!***************************************************!*\
  !*** ../platform/lib/ui/html/components/Input.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = __importDefault(__webpack_require__(/*! ../../Context */ "../platform/lib/ui/Context.js"));
const Model_1 = __importDefault(__webpack_require__(/*! ../../../data/Model */ "../platform/lib/data/Model.js"));
const Key_1 = __importDefault(__webpack_require__(/*! ../../../data/Key */ "../platform/lib/data/Key.js"));
const FocusState_1 = __importDefault(__webpack_require__(/*! ../../../model/FocusState */ "../platform/lib/model/FocusState.js"));
const State_1 = __importDefault(__webpack_require__(/*! ../../../data/State */ "../platform/lib/data/State.js"));
const functions_1 = __webpack_require__(/*! ../../../ui/html/functions */ "../platform/lib/ui/html/functions.js");
const html = __importStar(__webpack_require__(/*! ../ */ "../platform/lib/ui/html/index.js"));
const canSelect = {
    text: true,
    textarea: true,
    password: true,
    url: true,
    search: true
};
let InputState = class InputState extends State_1.default {
};
__decorate([
    Model_1.default.property({ type: "string", default: "" })
], InputState.prototype, "value", void 0);
InputState = __decorate([
    Model_1.default.class()
], InputState);
exports.InputState = InputState;
exports.default = Context_1.default.component((c, p) => {
    let { id, value, type = "text", name, title, class: className, style, pattern, autocomplete, autoselect, placeholder, required, validateFailMessage: string, onkeyup, onclick, onfocus, oninput, onchange, onkeydown, onkeypress, onconfirm, oncancel } = p;
    let key = Key_1.default.create(InputState, id);
    let focusState = c.store.peek(FocusState_1.default.key);
    let inputState = c.store.peek(key);
    if (value == null) {
        value = inputState.value;
    }
    function saveState(input) {
        c.store.patch(FocusState_1.default.key, { id, start: input.selectionStart, end: input.selectionEnd, direction: input.selectionDirection });
        c.store.patch(key, { value: input.value });
    }
    function maybeRestoreStateOnFocus(input) {
        if (focusState.id === id && canSelect[type]) {
            input.selectionStart = focusState.start;
            input.selectionEnd = focusState.end;
            input.selectionDirection = focusState.direction;
        }
        c.store.patch(FocusState_1.default.key, { id });
    }
    let props = {
        type: type === "textarea" ? undefined : type,
        id, value, name, title, class: className,
        style, pattern, autocomplete, placeholder, required,
        autofocus: focusState.id === id,
        onkeydown(e) {
            if (onkeydown) {
                onkeydown.call(this, e);
            }
            if (e.key === "Enter") {
                if (onconfirm) {
                    onconfirm.call(this, e);
                }
            }
            if (e.key === "Escape") {
                if (oncancel) {
                    oncancel.call(this, e);
                }
            }
        },
        onkeypress,
        onchange,
        oninput(e) {
            if (oninput) {
                oninput.call(this, e);
            }
            if (validate) {
                validate();
            }
        },
        onclick(e) {
            saveState(this);
            if (onclick) {
                onclick.call(this, e);
            }
        },
        onkeyup(e) {
            saveState(this);
            if (onkeyup) {
                onkeyup.call(this, e);
            }
        },
        onfocus(e) {
            maybeRestoreStateOnFocus(this);
            if (onfocus) {
                onfocus.call(this, e);
            }
        }
    };
    if (p.pattern) {
        props.pattern = p.pattern;
    }
    if (p.autocomplete != null) {
        props.autocomplete = p.autocomplete ? "on" : "off";
    }
    let element;
    if (type === "textarea") {
        element = c.begin(html.textarea, props);
        if (value != null) {
            c.text(value);
        }
        c.end(html.textarea);
    }
    else {
        element = c.empty(html.input, props);
    }
    if (p.autofocus && element.focus) {
        element.focus();
    }
    if (p.autoselect && element.select) {
        element.select();
    }
    let validate = p.validate ? function () {
        let form = functions_1.getAncestorForm(element);
        if (form) {
            let formValues = functions_1.getFormValues(form);
            let value = element.value;
            let valid = p.validate.call(formValues, value, form);
            console.log('form onchange validate: ' + valid);
            element.setCustomValidity(valid
                ? ""
                : (p.validateFailMessage || "Failed custom validation"));
        }
    } : null;
    // validate on render in case we are reloading the page, because then change won't be called
    if (validate) {
        validate();
        //  we also have to listen to other form change events
        //  since our validation may depend on them, such as in password confirm
        let form = functions_1.getAncestorForm(element);
        if (form) {
            form.addEventListener("input", (e) => {
                console.log("form.input", e);
            });
            form.addEventListener("change", (e) => {
                console.log("form.change", e);
            });
            form.addEventListener("change", validate);
            return () => form.removeEventListener("change", validate);
        }
    }
    else {
        return;
    }
});


/***/ }),

/***/ "../platform/lib/ui/html/functions.js":
/*!********************************************!*\
  !*** ../platform/lib/ui/html/functions.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(__webpack_require__(/*! ../math/Vector2 */ "../platform/lib/ui/math/Vector2.js"));
const Context_1 = __importDefault(__webpack_require__(/*! ../Context */ "../platform/lib/ui/Context.js"));
function getClientPosition(element) {
    let bounds = element.getClientRects()[0];
    return new Vector2_1.default(bounds.left, bounds.top);
}
exports.getClientPosition = getClientPosition;
function getPosition(e, element = e.target) {
    let bounds = element.getClientRects()[0];
    return new Vector2_1.default(e.clientX - bounds.left, e.clientY - bounds.top);
}
exports.getPosition = getPosition;
function isAncestorOrSelf(self, possibleAncestor) {
    for (let node = self; node != null; node = node.parentNode) {
        if (node === possibleAncestor) {
            return true;
        }
    }
    return false;
}
exports.isAncestorOrSelf = isAncestorOrSelf;
function getAncestor(element, predicate) {
    for (let ancestor = element.parentElement; ancestor != null; ancestor = ancestor.parentElement) {
        if (predicate(ancestor)) {
            return ancestor;
        }
    }
    return null;
}
exports.getAncestor = getAncestor;
function getFormValues(element) {
    let values = {};
    // TODO: improve this to query from some class indicator of field
    for (let input of element.querySelectorAll("input")) {
        values[input.name] = input.value;
    }
    return values;
}
exports.getFormValues = getFormValues;
function isForm(element) {
    return element instanceof HTMLFormElement;
}
function getAncestorForm(element) {
    return getAncestor(element, isForm);
}
exports.getAncestorForm = getAncestorForm;
function getEventListenerTarget(name) {
    if (name === "window") {
        return window;
    }
    if (name === "document") {
        return window.document;
    }
    if (name === "body") {
        return window.document.body;
    }
    if (name === "this") {
        return Context_1.default.current.lastNode;
    }
    if (name === "parent") {
        return Context_1.default.current.lastNode.parentNode;
    }
    let element = document.querySelector(name);
    if (element == null) {
        throw new Error(`Query element not found: ${name}`);
    }
    return element;
}
function bindEventListenersInternal(listeners, add = true, boundTargets = {}) {
    for (let targetName in listeners) {
        let target = boundTargets[targetName];
        if (target == null) {
            target = boundTargets[targetName] = getEventListenerTarget(targetName);
        }
        let targetEventListeners = listeners[targetName];
        for (let eventName in targetEventListeners) {
            let eventListener = targetEventListeners[eventName];
            target[add ? "addEventListener" : "removeEventListener"](eventName, eventListener);
        }
    }
    return boundTargets;
}
/**
 * Adds all of the event listeners to their respective elements
 * and returns a function which will unbind them all.
 */
function bindEventListeners(listeners) {
    let boundTargets = bindEventListenersInternal(listeners, true);
    return () => {
        bindEventListenersInternal(listeners, false, boundTargets);
    };
}
exports.bindEventListeners = bindEventListeners;


/***/ }),

/***/ "../platform/lib/ui/html/index.js":
/*!****************************************!*\
  !*** ../platform/lib/ui/html/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlElementFactory_1 = __importDefault(__webpack_require__(/*! ./HtmlElementFactory */ "../platform/lib/ui/html/HtmlElementFactory.js"));
const defaultAttributes = { class: true, type: true };
function factory(tag, attributes = defaultAttributes) {
    return HtmlElementFactory_1.default(tag, attributes);
}
exports.h1 = factory("h1");
exports.h2 = factory("h2");
exports.h3 = factory("h3");
exports.h4 = factory("h4");
exports.h5 = factory("h5");
exports.h6 = factory("h6");
exports.hr = factory("hr");
exports.p = factory("p");
exports.ol = factory("ol");
exports.ul = factory("ul");
exports.li = factory("li");
exports.dl = factory("dl");
exports.dt = factory("dt");
exports.dd = factory("dd");
exports.div = factory("div");
exports.span = factory("span");
exports.footer = factory("footer");
exports.header = factory("header");
exports.a = factory("a");
exports.img = factory("img");
exports.label = factory("label");
exports.button = factory("button");
exports.form = factory("form");
exports.input = factory("input", {
    ...defaultAttributes,
    pattern: true,
    placeholder: true,
    maxlength: true,
    minlength: true,
    readonly: true,
    size: true,
    spellcheck: true
});
exports.select = factory("select");
exports.option = factory("option");
exports.style = factory("style");
exports.textarea = factory("textarea");
exports.canvas = factory("canvas");
exports.iframe = factory("iframe");


/***/ }),

/***/ "../platform/lib/ui/input/WindowSize.js":
/*!**********************************************!*\
  !*** ../platform/lib/ui/input/WindowSize.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WindowSize_1;
Object.defineProperty(exports, "__esModule", { value: true });
const Dependent_1 = __importDefault(__webpack_require__(/*! ../../data/Dependent */ "../platform/lib/data/Dependent.js"));
const State_1 = __importDefault(__webpack_require__(/*! ../../data/State */ "../platform/lib/data/State.js"));
const Key_1 = __importDefault(__webpack_require__(/*! ../../data/Key */ "../platform/lib/data/Key.js"));
const Store_1 = __importDefault(__webpack_require__(/*! ../../data/Store */ "../platform/lib/data/Store.js"));
const functions_1 = __webpack_require__(/*! ../html/functions */ "../platform/lib/ui/html/functions.js");
let WindowSize = WindowSize_1 = class WindowSize extends Dependent_1.default {
    static watched(key) {
        function update() {
            Store_1.default.default.patch(WindowSize_1.key, { width: window.innerWidth, height: window.innerHeight });
        }
        update();
        return functions_1.bindEventListeners({
            window: {
                resize() {
                    update();
                }
            }
        });
    }
};
WindowSize.key = Key_1.default.create(WindowSize_1, "singleton");
__decorate([
    State_1.default.property({ type: 'integer' })
], WindowSize.prototype, "width", void 0);
__decorate([
    State_1.default.property({ type: 'integer' })
], WindowSize.prototype, "height", void 0);
WindowSize = WindowSize_1 = __decorate([
    State_1.default.class()
], WindowSize);
exports.default = WindowSize;


/***/ }),

/***/ "../platform/lib/ui/localize.js":
/*!**************************************!*\
  !*** ../platform/lib/ui/localize.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function localize(literals, ...args) {
    let result = [];
    for (let i = 0; i < literals.length; i++) {
        result.push(literals[i]);
        if (args[i] !== undefined)
            result.push(args[i]);
    }
    return result.join("");
}
exports.default = localize;


/***/ }),

/***/ "../platform/lib/ui/math/Plane.js":
/*!****************************************!*\
  !*** ../platform/lib/ui/math/Plane.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __importDefault(__webpack_require__(/*! ./Vector3 */ "../platform/lib/ui/math/Vector3.js"));
const _1 = __webpack_require__(/*! . */ "../platform/lib/ui/math/index.js");
/**
 * A Plane is represented by a normal vector
 * and a distance from the origin to the closest point on the plane.
 */
class Plane {
    constructor(normal, distance) {
        this.normal = normal;
        this.distance = distance;
    }
    getClosestPointToOrigin() {
        return new Vector3_1.default(this.normal.x * this.distance, this.normal.y * this.distance, this.normal.z * this.distance);
    }
    intersects(shape) {
        let point = this.getClosestPointToOrigin();
        let max = shape.support(this.normal);
        let min = shape.support(this.normal.negate());
        let pMax = max.subtract(point);
        let pMin = min.subtract(point);
        let maxDist = this.normal.dot(pMax);
        let minDist = this.normal.dot(pMin);
        return Math.sign(maxDist) != Math.sign(minDist);
    }
    intersectsCapsule(capsule) {
        return this.intersects(capsule);
    }
    getClosestPoint(line) {
        let point = this.getClosestPointToOrigin();
        let ap = point.subtract(line.a);
        let distance = ap.dot(this.normal);
        if (_1.equivalent(distance, 0))
            return line.a;
        let heading = line.b.subtract(line.a);
        let speed = heading.dot(this.normal);
        if (_1.equivalent(speed, 0))
            return line.a.subtract(this.normal.projection(line.a));
        let dt = distance / speed;
        return line.getPosition(dt);
    }
}
exports.default = Plane;


/***/ }),

/***/ "../platform/lib/ui/math/Rectangle.js":
/*!********************************************!*\
  !*** ../platform/lib/ui/math/Rectangle.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = __importDefault(__webpack_require__(/*! ./Vector2 */ "../platform/lib/ui/math/Vector2.js"));
const Vector3_1 = __importDefault(__webpack_require__(/*! ./Vector3 */ "../platform/lib/ui/math/Vector3.js"));
const Plane_1 = __importDefault(__webpack_require__(/*! ./Plane */ "../platform/lib/ui/math/Plane.js"));
const _1 = __webpack_require__(/*! . */ "../platform/lib/ui/math/index.js");
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    get top() { return this.y; }
    get left() { return this.x; }
    get bottom() { return this.y + this.height; }
    get right() { return this.x + this.width; }
    get topLeft() { return new Vector2_1.default(this.x, this.y); }
    get bottomRight() { return new Vector2_1.default(this.right, this.bottom); }
    get topRight() { return new Vector2_1.default(this.right, this.bottom); }
    get bottomLeft() { return new Vector2_1.default(this.left, this.bottom); }
    contains(x, y) {
        return x >= this.left && x <= this.right
            && y >= this.top && y <= this.bottom;
    }
    containsPoint(point) {
        return this.contains(point.x, point.y);
    }
    add(b) {
        if (!b || b.isZero) {
            return this;
        }
        return new Rectangle(this.x - b.left, this.y - b.top, this.width + b.left + b.right, this.height + b.top + b.bottom);
    }
    subtract(b) {
        if (!b || b.isZero) {
            return this;
        }
        return new Rectangle(this.x + b.left, this.y + b.top, this.width - b.left - b.right, this.height - b.top - b.bottom);
    }
    intersectsCapsule(capsule) {
        //  TODO: Fix this shit
        let line = capsule.line();
        let pointInRect = this.getClosestPoint(line);
        let alpha = line.getAlpha(pointInRect);
        let radius = capsule.getRadius(alpha);
        let pointInLine = line.getPosition(alpha);
        return pointInRect.subtract(pointInLine).length() <= (radius + _1.epsilon) ? pointInRect : null;
        // let dx = Math.min(Math.abs(pointInRect.x - this.left), Math.abs(pointInRect.x - this.right))
        // let dy = Math.min(Math.abs(pointInRect.y - this.top), Math.abs(pointInRect.y - this.bottom))
        // return (radius * radius) <= (dx * dx + dy * dy) ? pointInRect : null
    }
    intersectsLine(line) {
        let point = this.getPlane().getClosestPoint(line);
        return this.containsPoint(point);
    }
    /**
     * Returns the closest point to the line which lies within this bounding shape.
     * If multiple points intersect the line the point closest to 'a' is preferred.
     */
    getClosestPoint(line) {
        let point = this.getPlane().getClosestPoint(line);
        if (this.containsPoint(point)) {
            return point;
        }
        let x = _1.clamp(point.x, this.left, this.right);
        let y = _1.clamp(point.y, this.top, this.bottom);
        return new Vector3_1.default(x, y, 0);
    }
    /**
     * Returns the plane this Rectangle lies on.
     * The plane intersects the origin and the normal is in the positive z direction.
     */
    getPlane() {
        return new Plane_1.default(new Vector3_1.default(0, 0, 1), 0);
    }
    combine(b) {
        if (b === this || this.containsRectangle(b)) {
            return this;
        }
        if (b.containsRectangle(this)) {
            return b;
        }
        let left = Math.min(this.left, b.left);
        let right = Math.max(this.right, b.right);
        let top = Math.min(this.top, b.top);
        let bottom = Math.max(this.bottom, b.bottom);
        return new Rectangle(left, top, right - left, bottom - top);
    }
    containsRectangle(b) {
        return this.contains(b.left, b.top) && this.contains(b.right, b.bottom);
    }
    static getBounds(rectangles) {
        if (rectangles.length === 0) {
            return Rectangle.empty;
        }
        let result = rectangles[0];
        for (let i = 1; i < rectangles.length; i++) {
            result = result.combine(rectangles[i]);
        }
        return result;
    }
}
exports.default = Rectangle;
Rectangle.empty = Object.freeze(new Rectangle(0, 0, 0, 0));


/***/ }),

/***/ "../platform/lib/ui/math/Vector2.js":
/*!******************************************!*\
  !*** ../platform/lib/ui/math/Vector2.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Vector2_1;
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __importDefault(__webpack_require__(/*! ./Vector3 */ "../platform/lib/ui/math/Vector3.js"));
const _1 = __webpack_require__(/*! . */ "../platform/lib/ui/math/index.js");
const Rectangle_1 = __importDefault(__webpack_require__(/*! ./Rectangle */ "../platform/lib/ui/math/Rectangle.js"));
const Structure_1 = __importDefault(__webpack_require__(/*! ../../data/Structure */ "../platform/lib/data/Structure.js"));
let Vector2 = Vector2_1 = class Vector2 extends Structure_1.default {
    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    add(v) {
        return new Vector2_1(this.x + v.x, this.y + v.y);
    }
    subtract(v) {
        return new Vector2_1(this.x - v.x, this.y - v.y);
    }
    multiply(v) {
        return new Vector2_1(this.x * v.x, this.y * v.y);
    }
    scale(f) {
        return new Vector2_1(this.x * f, this.y * f);
    }
    negate() {
        return new Vector2_1(-this.x, -this.y);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return new Vector3_1.default(0, 0, this.x * v.y - this.y * v.x);
    }
    lerp(v, alpha) {
        return new Vector2_1(this.x + alpha * (v.x - this.x), this.y + alpha * (v.y - this.y));
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.hypot(this.x, this.y);
    }
    normalize() {
        let invLength = 1 / this.length();
        return new Vector2_1(this.x * invLength, this.y * invLength);
    }
    equals(v) {
        return this.x === v.x && this.y === v.y;
    }
    equivalent(v) {
        return _1.equivalent(this.x, v.x)
            && _1.equivalent(this.y, v.y);
    }
    static getBounds(points) {
        if (points.length == 0) {
            return new Rectangle_1.default(0, 0, 0, 0);
        }
        let minX, maxX, minY, maxY;
        for (let { x, y } of points) {
            if (minX == null) {
                minX = maxX = x;
                minY = maxY = y;
            }
            else {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        }
        return new Rectangle_1.default(minX, minY, maxX - minX, maxY - minY);
    }
    writeTo(array, index) {
        array[index + 0] = this.x;
        array[index + 1] = this.y;
    }
    toArray() {
        return [this.x, this.y];
    }
    toFloat32Array() {
        return new Float32Array(this.toArray());
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
};
Vector2.zero = Object.freeze(new Vector2_1(0, 0));
Vector2 = Vector2_1 = __decorate([
    Structure_1.default.class()
], Vector2);
exports.default = Vector2;


/***/ }),

/***/ "../platform/lib/ui/math/Vector3.js":
/*!******************************************!*\
  !*** ../platform/lib/ui/math/Vector3.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Vector3_1;
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(/*! . */ "../platform/lib/ui/math/index.js");
const Structure_1 = __importDefault(__webpack_require__(/*! ../../data/Structure */ "../platform/lib/data/Structure.js"));
let Vector3 = Vector3_1 = class Vector3 extends Structure_1.default {
    constructor(x = 0, y = 0, z = 0) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
    static add(vectors) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (let v of vectors) {
            x += v.x;
            y += v.y;
            z += v.z;
        }
        return new Vector3_1(x, y, z);
    }
    add(v) {
        return new Vector3_1(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    subtract(v) {
        return new Vector3_1(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    multiply(v) {
        return new Vector3_1(this.x * v.x, this.y * v.y, this.z * v.z);
    }
    scale(f) {
        return new Vector3_1(this.x * f, this.y * f, this.z * f);
    }
    negate() {
        return new Vector3_1(-this.x, -this.y, -this.z);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        return new Vector3_1(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }
    equivalent(v) {
        return _1.equivalent(this.x, v.x)
            && _1.equivalent(this.y, v.y)
            && _1.equivalent(this.z, v.z);
    }
    lerp(v, alpha) {
        return new Vector3_1(this.x + alpha * (v.x - this.x), this.y + alpha * (v.y - this.y), this.z + alpha * (v.z - this.z));
    }
    projection(v) {
        return this.scale(v.dot(this) / this.lengthSquared());
    }
    rejection(v) {
        // return v.subtract( this.parallelComponent(v) )
        let s = v.dot(this) / this.lengthSquared();
        return new Vector3_1(v.x - this.x * s, v.y - this.y * s, v.z - this.z * s);
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
        return Math.hypot(this.x, this.y, this.z);
    }
    normalize() {
        let invLength = 1 / this.length();
        return new Vector3_1(this.x * invLength, this.y * invLength, this.z * invLength);
    }
    translate(v) {
        return this.add(v);
    }
    transform(m) {
        let { x, y, z } = this;
        let w = m.m03 * x + m.m13 * y + m.m23 * z + m.m33;
        w = w || 1.0;
        return new Vector3_1((m.m00 * x + m.m10 * y + m.m20 * z + m.m30) / w, (m.m01 * x + m.m11 * y + m.m21 * z + m.m31) / w, (m.m02 * x + m.m12 * y + m.m22 * z + m.m32) / w);
    }
    static random(radius) {
        let u = Math.random();
        let v = Math.random();
        let theta = 2 * Math.PI * u;
        let phi = Math.acos(2 * v - 1);
        return new Vector3_1(Math.sin(theta) * Math.cos(phi) * radius, Math.sin(theta) * Math.sin(phi) * radius, Math.cos(theta) * radius);
    }
    // https://www.habrador.com/tutorials/interpolation/1-catmull-rom-splines/
    // //Returns a position between 4 Vector3 with Catmull-Rom spline algorithm
    // //http://www.iquilezles.org/www/articles/minispline/minispline.htm
    // Vector3 GetCatmullRomPosition(float t, Vector3 p0, Vector3 p1, Vector3 p2, Vector3 p3)
    // {
    // 	//The coefficients of the cubic polynomial (except the 0.5f * which I added later for performance)
    // 	Vector3 a = 2f * p1;
    // 	Vector3 b = p2 - p0;
    // 	Vector3 c = 2f * p0 - 5f * p1 + 4f * p2 - p3;
    // 	Vector3 d = -p0 + 3f * p1 - 3f * p2 + p3;
    // 	//The cubic polynomial: a + b * t + c * t^2 + d * t^3
    // 	Vector3 pos = 0.5f * (a + (b * t) + (c * t * t) + (d * t * t * t));
    // 	return pos;
    // }
    writeTo(array, index) {
        array[index + 0] = this.x;
        array[index + 1] = this.y;
        array[index + 2] = this.z;
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
    toFloat32Array() {
        return new Float32Array(this.toArray());
    }
    toString() {
        return `(${this.x},${this.y},${this.z})`;
    }
};
Vector3.zero = new Vector3_1(0, 0, 0);
Vector3 = Vector3_1 = __decorate([
    Structure_1.default.class()
], Vector3);
exports.default = Vector3;


/***/ }),

/***/ "../platform/lib/ui/math/index.js":
/*!****************************************!*\
  !*** ../platform/lib/ui/math/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.epsilon = 0.000001;
function equivalent(a, b) {
    return Math.abs(a - b) <= exports.epsilon * Math.max(1, Math.abs(a), Math.abs(b));
}
exports.equivalent = equivalent;
function clamp(value, min = 0, max = 1) {
    return value < min ? min : value > max ? max : value;
}
exports.clamp = clamp;
function lerp(a, b, alpha = 0.5) {
    if (typeof a === "number") {
        return a * (1 - alpha) + b * alpha;
    }
    return a.lerp(b, alpha);
}
exports.lerp = lerp;
function easeInOutCubic(x) {
    return x ** 2 * 3 - x ** 3 * 2;
}
exports.easeInOutCubic = easeInOutCubic;
// Source: https://en.wikipedia.org/wiki/Xorshift
function randomNumberGenerator(seed = Number.MAX_SAFE_INTEGER) {
    let x = seed;
    let coef = 1 / (1 << 31);
    return function random(min = 0, max = 1) {
        x ^= x << 13;
        x ^= x >> 7;
        x ^= x << 17;
        let r = Math.abs(x * coef);
        return min + r * (max - min);
    };
}
exports.randomNumberGenerator = randomNumberGenerator;


/***/ }),

/***/ "../platform/lib/ui/sound/SoundContext.js":
/*!************************************************!*\
  !*** ../platform/lib/ui/sound/SoundContext.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SoundContext {
    constructor() {
        this.cache = new Map();
    }
    play(url, properties) {
        let stack = this.cache.get(url);
        if (stack == null) {
            this.cache.set(url, stack = []);
        }
        let audio = stack.pop();
        if (audio == null) {
            stack.push(audio = new Audio(url));
            audio.onended = (e) => {
                // when the audio ends push it back onto the stack
                stack.push(audio);
            };
        }
        Object.assign(audio, properties);
        audio.play();
    }
}
exports.default = SoundContext;


/***/ }),

/***/ "../platform/lib/utility/DependencyTracker.js":
/*!****************************************************!*\
  !*** ../platform/lib/utility/DependencyTracker.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const empty = new Set();
/**
 * Efficiently tracks dependency relationships between objects.
 * It has close to O(1) performance on add, remove and get.
 */
class DependencyTracker {
    constructor() {
        this.dependeesToDependents = new Map();
        this.dependentsToDependees = new Map();
    }
    add(dependent, dependee) {
        let dependents = this.dependeesToDependents.get(dependee);
        if (dependents == null)
            this.dependeesToDependents.set(dependee, dependents = new Set());
        dependents.add(dependent);
        let dependees = this.dependentsToDependees.get(dependent);
        if (dependees == null)
            this.dependentsToDependees.set(dependent, dependees = new Set());
        dependees.add(dependee);
    }
    remove(dependent) {
        let dependees = this.dependentsToDependees.get(dependent);
        if (dependees != null) {
            for (let dependee of dependees) {
                let dependents = this.dependeesToDependents.get(dependee);
                if (dependents != null) {
                    dependents.delete(dependent);
                    if (dependents.size === 0)
                        this.dependeesToDependents.delete(dependee);
                }
            }
        }
        this.dependentsToDependees.delete(dependent);
    }
    getDependents(dependee) {
        return this.dependeesToDependents.get(dependee) || empty;
    }
    getDependees(dependent) {
        return this.dependentsToDependees.get(dependent) || empty;
    }
}
exports.default = DependencyTracker;


/***/ }),

/***/ "../platform/lib/utility/clonePatch.js":
/*!*********************************************!*\
  !*** ../platform/lib/utility/clonePatch.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! ./common */ "../platform/lib/utility/common.js");
//  shallow clone, doesn't preserve type
function clone(value) {
    if (common_1.isPrimitive(value)) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.slice(0);
    }
    return Object.assign({}, value);
}
function clonePatch(target, patch) {
    if (!common_1.isPlainObject(patch)) {
        return patch;
    }
    if (common_1.isEmptyObject(patch)) {
        return target;
    }
    if (common_1.isPrimitive(target)) {
        target = {};
    }
    let cloneValues = clone(target);
    for (let property in patch) {
        let newValue = clonePatch(target[property], patch[property]);
        if (newValue != null) {
            cloneValues[property] = newValue;
        }
        else {
            delete cloneValues[property];
        }
    }
    if (Array.isArray(target) || common_1.isPlainObject(target)) {
        return cloneValues;
    }
    return new target.constructor(cloneValues);
}
exports.default = clonePatch;


/***/ }),

/***/ "../platform/lib/utility/common.js":
/*!*****************************************!*\
  !*** ../platform/lib/utility/common.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isPrimitive(value) {
    return value == null || typeof value !== "object";
}
exports.isPrimitive = isPrimitive;
function isPlainObject(value) {
    return value != null && value.constructor === Object;
}
exports.isPlainObject = isPlainObject;
function isEmptyObject(value) {
    for (let property in value) {
        return false;
    }
    return true;
}
exports.isEmptyObject = isEmptyObject;
function deepFreeze(value) {
    if (!isPrimitive(value)) {
        for (let property in value) {
            deepFreeze(value[property]);
        }
        Object.freeze(value);
    }
    return value;
}
exports.deepFreeze = deepFreeze;
//  maps an objects values to a new object similar to array.map
function map(collection, convert) {
    if (Array.isArray(collection))
        return collection.map(convert);
    let result = {};
    for (let name in collection) {
        result[name] = convert(collection[name], name);
    }
    return result;
}
exports.map = map;
function memoize(fn, cache = new Map()) {
    return function (arg) {
        let result = cache.get(arg);
        if (result === undefined) {
            cache.set(arg, result = fn.apply(this, arguments));
        }
        return result;
    };
}
exports.memoize = memoize;
function getPath(ancestor, descendant) {
    if (ancestor === descendant) {
        return [];
    }
    if (ancestor && typeof ancestor === "object") {
        for (let name in ancestor) {
            let child = ancestor[name];
            let path = getPath(child, descendant);
            if (path != null) {
                return [name, ...path];
            }
        }
    }
    return null;
}
exports.getPath = getPath;
function traverse(value, schema, callback, ancestors = [], path = []) {
    callback(value, schema, ancestors, path);
    // traverse any children.
    if (value != null && typeof value === "object") {
        if (Array.isArray(value)) {
            if (schema.items) {
                ancestors.push(value);
                for (let i = 0; i < value.length; i++) {
                    let itemSchema = Array.isArray(schema.items) ? (schema.items[i] || schema.additionalItems) : schema.items;
                    if (itemSchema) {
                        path.push(i);
                        traverse(value[i], itemSchema, callback, ancestors, path);
                        path.pop();
                    }
                }
                ancestors.pop();
            }
        }
        else {
            ancestors.push(value);
            for (let name in value) {
                let propertySchema = schema.properties && schema.properties[name] || schema.additionalProperties && schema.additionalProperties;
                if (propertySchema) {
                    path.push(name);
                    traverse(value[name], propertySchema, callback, ancestors, path);
                    path.pop();
                }
            }
            // also traverse any schema properties that we didn't get in 
            if (schema.properties) {
                for (let name in schema.properties) {
                    if (!value.hasOwnProperty(name)) {
                        let propertySchema = schema.properties[name];
                        if (propertySchema) {
                            path.push(name);
                            traverse(value[name], propertySchema, callback, ancestors, path);
                            path.pop();
                        }
                    }
                }
            }
            ancestors.pop();
        }
    }
}
exports.traverse = traverse;
function argmax(values, func) {
    if (values.length == 0)
        throw new Error("Values must be non-empty.");
    let indexOfMax = 0;
    let max = func(values[0]);
    for (let i = 1; i < values.length; i++) {
        let value = func(values[i]);
        if (value > max) {
            indexOfMax = i;
            max = value;
        }
    }
    return {
        index: indexOfMax,
        value: max,
        argument: values[indexOfMax]
    };
}
exports.argmax = argmax;


/***/ }),

/***/ "../platform/lib/utility/guid.js":
/*!***************************************!*\
  !*** ../platform/lib/utility/guid.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let buffer = new Uint8Array(16);
function guid() {
    let array = Array(20);
    window.crypto.getRandomValues(buffer);
    for (let i = 0; i < buffer.length; i++) {
        let string = buffer[i].toString(16);
        if (string.length < 2)
            array.push("0");
        array.push(string);
        if (i === 4 || i === 6 || i === 8 || i === 10)
            array.push("-");
    }
    return array.join("");
}
exports.format = /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i;
exports.default = guid;


/***/ }),

/***/ "../platform/lib/utility/phone.js":
/*!****************************************!*\
  !*** ../platform/lib/utility/phone.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function formatPhoneES164(phone) {
    return phone.replace(/[\(\) -]/g, "");
}
exports.formatPhoneES164 = formatPhoneES164;
function formatPhoneNumberUSA(phone) {
    let n = [];
    for (let i = 0; i < phone.length; i++) {
        let char = phone[i];
        if (/[0-9]/.test(char)) {
            n.push(char);
        }
    }
    if (n.length === 10) {
        n.unshift("1");
    }
    if (n.length !== 11) {
        return phone;
    }
    return `+${n[0]} (${n[1]}${n[2]}${n[3]}) ${n[4]}${n[5]}${n[6]}-${n[7]}${n[8]}${n[9]}${n[10]}`;
}
exports.formatPhoneNumberUSA = formatPhoneNumberUSA;


/***/ }),

/***/ "./lib/engine/Color.js":
/*!*****************************!*\
  !*** ./lib/engine/Color.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color;
(function (Color) {
    Color[Color["White"] = 0] = "White";
    Color[Color["Black"] = 1] = "Black";
})(Color = exports.Color || (exports.Color = {}));


/***/ }),

/***/ "./lib/engine/Engine.js":
/*!******************************!*\
  !*** ./lib/engine/Engine.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = __webpack_require__(/*! ./Type */ "./lib/engine/Type.js");
const Color_1 = __webpack_require__(/*! ./Color */ "./lib/engine/Color.js");
const Piece_1 = __importDefault(__webpack_require__(/*! ./Piece */ "./lib/engine/Piece.js"));
const Position_1 = __importDefault(__webpack_require__(/*! ./Position */ "./lib/engine/Position.js"));
const Move_1 = __importDefault(__webpack_require__(/*! ./Move */ "./lib/engine/Move.js"));
const common_1 = __webpack_require__(/*! ./common */ "./lib/engine/common.js");
const pieceValues_1 = __importDefault(__webpack_require__(/*! ./pieceValues */ "./lib/engine/pieceValues.js"));
const Pos = Position_1.default.create;
const posX = Position_1.default.get.x;
const posY = Position_1.default.get.y;
const EMPTY = Piece_1.default.create(0, 0, 0);
var Ternary;
(function (Ternary) {
    Ternary[Ternary["always"] = 0] = "always";
    Ternary[Ternary["never"] = 1] = "never";
    Ternary[Ternary["either"] = 2] = "either";
})(Ternary || (Ternary = {}));
class Engine {
    constructor() {
        try {
            window.engine = this;
        }
        catch (e) { }
        this.clear();
    }
    clear() {
        this.pieces = new Uint8Array(64);
        this.ids = new Uint8Array(64);
        for (let i = 0; i < 64; i++)
            this.ids[i] = i;
        this.turn = Color_1.Color.White;
        this.netMaterialValue = 0;
        this.history = [];
    }
    standardSetup() {
        for (let x = 0; x < 8; x++) {
            let type = Piece_1.default.get.type(common_1.charToPiece("rnbqkbnr"[x]));
            this.pieces[Pos(x, 0)] = Piece_1.default.create(type, Color_1.Color.Black, 0);
            this.pieces[Pos(x, 1)] = Piece_1.default.create(Type_1.Type.Pawn, Color_1.Color.Black, 0);
            this.pieces[Pos(x, 7)] = Piece_1.default.create(type, Color_1.Color.White, 0);
            this.pieces[Pos(x, 6)] = Piece_1.default.create(Type_1.Type.Pawn, Color_1.Color.White, 0);
        }
        return this;
    }
    static parseBoard(board) {
        let rows = board.split("\n")
            .filter((row) => row.length > 0) // Remove empty lines.
            .map((row) => row.replace(/ /g, "") // Remove whitespace.
            .split("") // Convert to char array.
            .map(common_1.charToPiece));
        let engine = new Engine();
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                engine.pieces[Pos(x, y)] = rows[y][x];
            }
        }
        return engine;
    }
    prettyString(moves) {
        let positions = moves ? moves.map((move) => Move_1.default.get.to(move)) : [];
        let result = [];
        for (let y = 0; y < 8; y++) {
            let row = [];
            for (let x = 0; x < 8; x++) {
                let char;
                if (positions.indexOf(Position_1.default.create(x, y)) > -1)
                    char = "#";
                else
                    char = common_1.pieceToChar(this.pieces[Pos(x, y)]);
                row.push(char + " ");
            }
            result.push(row.join(""));
        }
        return result.join("\n");
    }
    static compareBoards(a, b) {
        let format = (x) => (x.split("\n")
            .map((x) => x.trim())
            .filter((x) => x.length > 0)).join("\n");
        return format(a) === format(b);
    }
    positionString() {
        let parts = new Array(24);
        let i = 0;
        for (let y = 0; y < 8; y++)
            for (let x = 0; x < 8; x += 3)
                parts[i++] = String.fromCharCode((this.pieces[Pos(x, y)] << 10) |
                    (this.pieces[Pos(x + 1, y)] << 5) |
                    (this.pieces[Pos(x + 2, y)] || 0));
        return parts.join("");
    }
    toString() {
        let parts = new Array();
        for (let move of this.history)
            parts.push(String.fromCharCode(Move_1.default.set.firstMove(Move_1.default.set.captured(move, 0), 0)));
        return parts.join("");
    }
    static fromString(movesString) {
        let engine = new Engine();
        engine.standardSetup();
        for (let i = 0; i < movesString.length; i++)
            engine.doMove(movesString.charCodeAt(i));
        return engine;
    }
    static fromHistory(moves) {
        let engine = new Engine();
        engine.standardSetup();
        for (let move of moves)
            engine.doMove(move);
        return engine;
    }
    // Move Generation
    slide(from, dx, dy, max, color, selfCaptures, captures, moves) {
        let count = 0;
        let x = posX(from);
        let y = posY(from);
        for (let i = 1; i <= max; i++) {
            x += dx;
            y += dy;
            if (x < 0 || x >= 8 || y < 0 || y >= 8)
                break;
            let to = Pos(x, y);
            let obstacle = this.pieces[to];
            let move = Move_1.default.create(to, from, obstacle, 0);
            if (Piece_1.default.get.type(obstacle) !== Type_1.Type.Empty) {
                if (captures !== Ternary.never && Piece_1.default.get.color(obstacle) !== color) {
                    moves.push(move);
                    return ++count;
                }
                break;
            }
            else if (captures !== Ternary.always) {
                moves.push(move);
                ++count;
            }
        }
        return count;
    }
    slideCardinals(pos, max, color, selfCaptures, captures, moves) {
        this.slide(pos, 1, 0, max, color, selfCaptures, captures, moves);
        this.slide(pos, -1, 0, max, color, selfCaptures, captures, moves);
        this.slide(pos, 0, -1, max, color, selfCaptures, captures, moves);
        this.slide(pos, 0, 1, max, color, selfCaptures, captures, moves);
    }
    slideDiagonals(pos, max, color, selfCaptures, captures, moves) {
        this.slide(pos, 1, 1, max, color, selfCaptures, captures, moves);
        this.slide(pos, -1, 1, max, color, selfCaptures, captures, moves);
        this.slide(pos, 1, -1, max, color, selfCaptures, captures, moves);
        this.slide(pos, -1, -1, max, color, selfCaptures, captures, moves);
    }
    generateMoves(pos, type, color, moved, selfCaptures, captures) {
        let moves = [];
        switch (type) {
            case Type_1.Type.Pawn: {
                let dy = color == Color_1.Color.White ? -1 : 1;
                this.slide(pos, 0, dy, moved ? 1 : 2, color, selfCaptures, Ternary.never, moves);
                this.slide(pos, -1, dy, 1, color, selfCaptures, Ternary.always, moves);
                this.slide(pos, 1, dy, 1, color, selfCaptures, Ternary.always, moves);
                if ((Position_1.default.get.y(pos) == 6 && color == Color_1.Color.Black) ||
                    (Position_1.default.get.y(pos) == 1 && color == Color_1.Color.White)) {
                    for (let i = 0; i < moves.length; i++)
                        moves[i] = Move_1.default.set.promotion(moves[i], 1);
                }
                break;
            }
            case Type_1.Type.Knight: {
                // QI, +x, +y
                this.slide(pos, 2, 1, 1, color, selfCaptures, captures, moves);
                this.slide(pos, 1, 2, 1, color, selfCaptures, captures, moves);
                // QII, -x, +y
                this.slide(pos, -2, 1, 1, color, selfCaptures, captures, moves);
                this.slide(pos, -1, 2, 1, color, selfCaptures, captures, moves);
                // QIII, -x, -y
                this.slide(pos, -2, -1, 1, color, selfCaptures, captures, moves);
                this.slide(pos, -1, -2, 1, color, selfCaptures, captures, moves);
                // QIV, +x, -y
                this.slide(pos, 2, -1, 1, color, selfCaptures, captures, moves);
                this.slide(pos, 1, -2, 1, color, selfCaptures, captures, moves);
                break;
            }
            case Type_1.Type.Bishop: {
                this.slideDiagonals(pos, 7, color, selfCaptures, captures, moves);
                break;
            }
            case Type_1.Type.Rook: {
                this.slideCardinals(pos, 7, color, selfCaptures, captures, moves);
                break;
            }
            case Type_1.Type.Queen: {
                this.slideDiagonals(pos, 7, color, selfCaptures, captures, moves);
                this.slideCardinals(pos, 7, color, selfCaptures, captures, moves);
                break;
            }
            case Type_1.Type.King: {
                this.slideDiagonals(pos, 1, color, selfCaptures, captures, moves);
                this.slideCardinals(pos, 1, color, selfCaptures, captures, moves);
                if (!moved) {
                    if (this.canCastle(pos, color, -1))
                        moves.push(Move_1.default.create(Pos(2, posY(pos)), pos, 0, 1));
                    if (this.canCastle(pos, color, 1))
                        moves.push(Move_1.default.create(Pos(6, posY(pos)), pos, 0, 1));
                }
                break;
            }
        }
        return moves;
    }
    canCastle(pos, color, dx) {
        return this.rookVisible(pos, color, dx) && !this.passesThroughCheck(pos, color, dx);
    }
    rookVisible(pos, color, dx) {
        let x = posX(pos);
        let y = posY(pos);
        while (x >= 0 && x <= 7) {
            x += dx;
            let piece = this.pieces[Pos(x, y)];
            let type = Piece_1.default.get.type(piece);
            if (type != Type_1.Type.Empty)
                return type === Type_1.Type.Rook && !Piece_1.default.get.moved(piece) && Piece_1.default.get.color(piece) === color;
        }
        return false;
    }
    passesThroughCheck(pos, color, dx) {
        let x = posX(pos);
        let y = posY(pos);
        for (let i = 0; i < 2; i++)
            if (!this.isSafe(Pos(x + i * dx, y), color))
                return true;
        return false;
    }
    tryCastle(to, from, undo) {
        let dx = posX(to) - posX(from);
        if (Math.abs(dx) < 2)
            return;
        let y = posY(to);
        let rookFrom = Pos(dx > 0 ? 7 : 0, y);
        let rookTo = Pos(posX(to) - Math.sign(dx), y);
        if (undo) {
            let rook = this.pieces[rookTo];
            this.pieces[rookFrom] = Piece_1.default.set.moved(rook, 0);
            this.pieces[rookTo] = EMPTY;
            this.swapIds(rookFrom, rookTo);
        }
        else {
            let rook = this.pieces[rookFrom];
            this.pieces[rookFrom] = EMPTY;
            this.pieces[rookTo] = Piece_1.default.set.moved(rook, 1);
            this.swapIds(rookFrom, rookTo);
        }
    }
    setPiece(pos, piece) {
        let captured = this.pieces[pos];
        this.netMaterialValue -= pieceValues_1.default[Piece_1.default.get.type(captured)] * (Piece_1.default.get.color(captured) == Color_1.Color.White ? 1 : -1);
        this.netMaterialValue += pieceValues_1.default[Piece_1.default.get.type(piece)] * (Piece_1.default.get.color(piece) == Color_1.Color.White ? 1 : -1);
        this.pieces[pos] = piece;
    }
    swapIds(p, q) {
        let tmp = this.ids[p];
        this.ids[p] = this.ids[q];
        this.ids[q] = tmp;
    }
    doMove(move) {
        this.history.push(move);
        let from = Move_1.default.get.from(move);
        let to = Move_1.default.get.to(move);
        let piece = Piece_1.default.set.moved(this.pieces[from], 1);
        if (Move_1.default.get.promotion(move))
            piece = Piece_1.default.set.type(piece, Type_1.Type.Queen);
        this.setPiece(from, EMPTY);
        this.setPiece(to, piece);
        this.turn = (this.turn + 1) % 2;
        this.swapIds(to, from);
        if (Piece_1.default.get.type(piece) === Type_1.Type.King)
            this.tryCastle(to, from, false);
    }
    undoMove() {
        let move = this.history.pop();
        let from = Move_1.default.get.from(move);
        let to = Move_1.default.get.to(move);
        let piece = Piece_1.default.set.moved(this.pieces[to], Move_1.default.get.firstMove(move) ? 0 : 1);
        if (Move_1.default.get.promotion(move))
            piece = Piece_1.default.set.type(piece, Type_1.Type.Pawn);
        this.setPiece(from, piece);
        this.setPiece(to, Move_1.default.get.captured(move));
        this.turn = (this.turn + 1) % 2;
        this.swapIds(to, from);
        if (Piece_1.default.get.type(piece) === Type_1.Type.King)
            this.tryCastle(to, from, true);
    }
    generateMovesAt(pos, selfCaptures = false) {
        let piece = this.pieces[pos];
        let moves = this.generateMoves(pos, Piece_1.default.get.type(piece), Piece_1.default.get.color(piece), Piece_1.default.get.moved(piece), selfCaptures, Ternary.either);
        if (!Piece_1.default.get.moved(piece))
            for (let i = 0; i < moves.length; i++)
                moves[i] = Move_1.default.set.firstMove(moves[i], 1);
        return moves;
    }
    generateSafeMovesAt(pos) {
        let piece = this.pieces[pos];
        let color = Piece_1.default.get.color(piece);
        return this.filterByKingSafety(color, this.generateMovesAt(pos));
    }
    // This can be slow because it is only used by filterByKingSafetly.
    kingPos(turn) {
        for (let i = 0; i < 64; i++) {
            let p = this.pieces[i];
            if (Piece_1.default.get.type(p) === Type_1.Type.King && Piece_1.default.get.color(p) === turn)
                return i;
        }
        return null;
        // throw new Error(`Missing ${turn} king.`)
    }
    // This can be slow because it's not used in the search algorithm.
    // Because of the piece value of the king, this check would be redundant.
    filterByKingSafety(turn, moves) {
        let result = [];
        for (let move of moves) {
            this.doMove(move);
            let kingPos = this.kingPos(turn);
            if (kingPos == null || this.isSafe(kingPos, turn))
                result.push(move);
            this.undoMove();
        }
        return result;
    }
    // Capturing moves are direction reversible so it's OK to scan from the friendly piece to the enemy pieces.
    // If we do this for each type, we can be sure no pieces threaten our piece.
    // If we can 'capture' them, they can capture us.
    isSafe(pos, color) {
        for (let type = Type_1.Type.Pawn; type <= Type_1.Type.King; type++) {
            let moves = this.generateMoves(pos, type, color, 1, false, Ternary.always);
            for (let move of moves) {
                let piece = this.pieces[Move_1.default.get.to(move)];
                if (Piece_1.default.get.type(piece) === type)
                    return false;
            }
        }
        return true;
    }
    allMoves(safe = false) {
        let moves = [];
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let pos = Pos(x, y);
                let piece = this.pieces[pos];
                if (Piece_1.default.get.color(piece) !== this.turn || Piece_1.default.get.type(piece) === Type_1.Type.Empty)
                    continue;
                let _moves = safe ? this.generateSafeMovesAt(pos) : this.generateMovesAt(pos);
                for (let move of _moves)
                    moves.push(move);
            }
        }
        return moves;
    }
    inCheck(turn = this.turn) {
        let pos = this.kingPos(turn);
        return (pos === null) ? false : !this.isSafe(pos, turn);
    }
    inMate() {
        return this.allMoves(true).length === 0;
    }
}
exports.Engine = Engine;


/***/ }),

/***/ "./lib/engine/Move.js":
/*!****************************!*\
  !*** ./lib/engine/Move.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitfield_1 = __importDefault(__webpack_require__(/*! ./bitfield */ "./lib/engine/bitfield.js"));
exports.default = bitfield_1.default([
    ["to", 6],
    ["from", 6],
    ["captured", 5],
    ["firstMove", 1],
    ["promotion", 1]
]);


/***/ }),

/***/ "./lib/engine/Piece.js":
/*!*****************************!*\
  !*** ./lib/engine/Piece.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitfield_1 = __importDefault(__webpack_require__(/*! ./bitfield */ "./lib/engine/bitfield.js"));
let s = bitfield_1.default([
    ["type", 3],
    ["color", 1],
    ["moved", 1]
]);
exports.default = s;


/***/ }),

/***/ "./lib/engine/Position.js":
/*!********************************!*\
  !*** ./lib/engine/Position.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitfield_1 = __importDefault(__webpack_require__(/*! ./bitfield */ "./lib/engine/bitfield.js"));
let s = bitfield_1.default([
    ["x", 3],
    ["y", 3]
]);
exports.default = s;


/***/ }),

/***/ "./lib/engine/Type.js":
/*!****************************!*\
  !*** ./lib/engine/Type.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type[Type["Empty"] = 0] = "Empty";
    Type[Type["Pawn"] = 1] = "Pawn";
    Type[Type["Knight"] = 2] = "Knight";
    Type[Type["Bishop"] = 3] = "Bishop";
    Type[Type["Rook"] = 4] = "Rook";
    Type[Type["Queen"] = 5] = "Queen";
    Type[Type["King"] = 6] = "King";
})(Type = exports.Type || (exports.Type = {}));


/***/ }),

/***/ "./lib/engine/bitfield.js":
/*!********************************!*\
  !*** ./lib/engine/bitfield.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mask = (width) => (1 << width) - 1;
function propertiesWithShift(properties) {
    let shift = 0;
    let result = [];
    for (let [name, width] of properties) {
        result.push([name, width, shift]);
        shift += width;
    }
    return result;
}
function fromArguments(properties) {
    let names = properties.map((component) => component[0]);
    let parts = properties.map(([name, width, shift]) => `(${name} << ${shift})`);
    let result = new Function(...names, "return " + parts.join(" | "));
    return result;
}
function fromObject(properties) {
    let parts = properties.map(([name, width, shift]) => `(object.${name} << ${shift})`);
    let result = new Function("object", "return " + parts.join(" | "));
    return result;
}
function toObject(properties) {
    let parts = properties.map(([name, width, shift]) => `${name}: (struct >> ${shift}) & ${mask(width)}`);
    let result = new Function("struct", `return { ${parts.join(" , ")} }`);
    return result;
}
function struct(properties) {
    let bitCount = properties.map((component) => component[1]).reduce((x, y) => x + y);
    if (bitCount > 32)
        throw new Error("Components don't fit 32 bit number.");
    let _properties = propertiesWithShift(properties);
    let get = {};
    let set = {};
    for (let [name, width, shift] of _properties) {
        let getMask = mask(width);
        get[name] = (struct) => (struct >> shift) & getMask;
        let setMask = ~(getMask << shift); // Used to clear components bits.
        set[name] = (struct, value) => (struct & setMask) | ((value & getMask) << shift);
    }
    return { create: fromArguments(_properties), toObject: toObject(_properties), fromObject: fromObject(_properties), get, set };
}
exports.default = struct;


/***/ }),

/***/ "./lib/engine/common.js":
/*!******************************!*\
  !*** ./lib/engine/common.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __webpack_require__(/*! ./Color */ "./lib/engine/Color.js");
const Piece_1 = __importDefault(__webpack_require__(/*! ./Piece */ "./lib/engine/Piece.js"));
const pieceToCharStr = ".pnbrqk";
function pieceToChar(piece) {
    let char = pieceToCharStr[Piece_1.default.get.type(piece)];
    return Piece_1.default.get.color(piece) === Color_1.Color.Black ? char : char.toUpperCase();
}
exports.pieceToChar = pieceToChar;
function charToPiece(char) {
    let type = pieceToCharStr.indexOf(char.toLowerCase());
    let color = (char === char.toLowerCase()) ? Color_1.Color.Black : Color_1.Color.White;
    return Piece_1.default.create(type, color, 0);
}
exports.charToPiece = charToPiece;
exports.default = { pieceToChar, charToPiece };


/***/ }),

/***/ "./lib/engine/pieceValues.js":
/*!***********************************!*\
  !*** ./lib/engine/pieceValues.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    0,
    1,
    3,
    3,
    5,
    9,
    99999 // King
];


/***/ }),

/***/ "./lib/engine/search.js":
/*!******************************!*\
  !*** ./lib/engine/search.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Position_1 = __importDefault(__webpack_require__(/*! ./Position */ "./lib/engine/Position.js"));
const Piece_1 = __importDefault(__webpack_require__(/*! ./Piece */ "./lib/engine/Piece.js"));
const Move_1 = __importDefault(__webpack_require__(/*! ./Move */ "./lib/engine/Move.js"));
const pieceValues_1 = __importDefault(__webpack_require__(/*! ./pieceValues */ "./lib/engine/pieceValues.js"));
const Type_1 = __webpack_require__(/*! ./Type */ "./lib/engine/Type.js");
const Color_1 = __webpack_require__(/*! ./Color */ "./lib/engine/Color.js");
const Pos = Position_1.default.create;
const MAX_VALUE = Number.MAX_SAFE_INTEGER; // Infinity
function default_1(engine, options = {}) {
    options = Object.assign({ depth: 40, rootCall: true, maxSeconds: 5 }, options);
    let startTime = Date.now();
    let endTime = startTime + options.maxSeconds * 1000;
    let evaluations = 0;
    let cache = options.cache || new Map();
    const heuristic = (useFast) => {
        evaluations++;
        const config = {
            material: 10,
            control: 5,
            threat: 1,
            threateningPieces: 1,
            development: 5,
            support: 5
        };
        if (engine.inCheck() && engine.inMate())
            return engine.turn == Color_1.Color.White ? -MAX_VALUE : MAX_VALUE;
        if (useFast)
            return engine.netMaterialValue * config.material;
        if (engine.inMate())
            return 0;
        let control = 0;
        let threat = 0;
        let threateningPieces = 0;
        let development = 0;
        let support = 0;
        const edgeDistance = (pos) => {
            let xDist = 3.5 - Math.abs(Position_1.default.get.x(pos) - 3.5);
            let yDist = 3.5 - Math.abs(Position_1.default.get.y(pos) - 3.5);
            return xDist + yDist;
        };
        for (let pos = 0; pos < 64; pos++) {
            let piece = engine.pieces[pos];
            let type = Piece_1.default.get.type(piece);
            if (type === Type_1.Type.Empty)
                continue;
            let invPieceValue = 1 / pieceValues_1.default[type];
            let color = Piece_1.default.get.color(piece);
            let valueSign = color === Color_1.Color.White ? 1 : -1;
            development += edgeDistance(pos) * invPieceValue * valueSign;
            if (type === Type_1.Type.Pawn) {
                let pawnDevelopment = (color == Color_1.Color.White) ? 7 - Position_1.default.get.y(pos) : Position_1.default.get.y(pos);
                development += Math.max(8, 1.5 ** pawnDevelopment) * valueSign;
            }
            let threatening = false;
            for (let move of engine.generateMovesAt(pos, true)) {
                let capturedType = Piece_1.default.get.type(Move_1.default.get.captured(move));
                let capturedColor = Piece_1.default.get.color(Move_1.default.get.captured(move));
                let captured = capturedType !== Type_1.Type.Empty;
                if (captured && capturedColor == color) {
                    support += valueSign * invPieceValue / pieceValues_1.default[capturedType];
                }
                else {
                    let to = Move_1.default.get.to(move);
                    control += (1 + edgeDistance(to) * invPieceValue) * valueSign;
                    if (captured) {
                        threatening = true;
                        let value = capturedType == Type_1.Type.King ? 10 : pieceValues_1.default[capturedType] * invPieceValue;
                        threat += valueSign * value;
                    }
                }
            }
            if (threatening)
                threateningPieces += valueSign;
        }
        return engine.netMaterialValue * config.material
            + control * config.control
            + threat * config.threat
            + threateningPieces * config.threateningPieces
            + development * config.development
            + support * config.support;
    };
    const search = (depth = 0, rootCall = true, alpha = options.alpha || -MAX_VALUE, beta = options.beta || MAX_VALUE) => {
        let turn = engine.turn;
        let valueSign = (engine.turn === Color_1.Color.White) ? 1 : -1;
        let positionString = engine.positionString() + depth + "," + turn;
        if (!rootCall && cache.has(positionString))
            return cache.get(positionString);
        let pairs = engine.allMoves(true).map((move) => {
            engine.doMove(move);
            let h = heuristic(depth < 3);
            engine.undoMove();
            return [move, h];
        });
        pairs.sort((a, b) => ((b[1] - a[1]) * valueSign));
        let best = null;
        let bestValue = -MAX_VALUE * valueSign;
        let cutoff = false;
        for (let [move, h] of pairs) {
            if (Date.now() > endTime)
                break;
            let value = 0;
            engine.doMove(move);
            value = depth == 1 ? h : search(depth - 1, false, alpha, beta);
            // The advanced heuristic is too slow to use on leaves so instead it's evaluated on the parent.
            if (depth == 3)
                value += heuristic(false);
            if (best === null || value * valueSign > bestValue * valueSign) {
                best = move;
                bestValue = value;
                if (turn === Color_1.Color.White)
                    alpha = Math.max(alpha, bestValue);
                else
                    beta = Math.min(beta, bestValue);
                cutoff = (alpha >= beta);
            }
            engine.undoMove();
            if (cutoff)
                break;
        }
        cache.set(positionString, bestValue);
        return rootCall ? [best, bestValue] : bestValue;
    };
    let result, resultValue, depthReached;
    for (let d = 3; d <= options.depth; d++) {
        let _ = search(d);
        if (Date.now() > endTime)
            break;
        [result, resultValue] = _;
        depthReached = d;
    }
    if (options.rootCall) {
        let dt = (Date.now() - startTime);
        let addCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let evalsPerMs = (evaluations / dt).toString().split(".")[0];
        console.log(`${addCommas(evaluations)} evals | ${addCommas(dt)} ms | ${addCommas(evalsPerMs)} evals/ms | depth ${depthReached} reached`);
    }
    return options.rootCall ? result : resultValue;
}
exports.default = default_1;


/***/ }),

/***/ "./lib/model/Game.js":
/*!***************************!*\
  !*** ./lib/model/Game.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(__webpack_require__(/*! @glas/platform/data/Model */ "../platform/lib/data/Model.js"));
const Entity_1 = __importDefault(__webpack_require__(/*! @glas/platform/data/Entity */ "../platform/lib/data/Entity.js"));
const Engine_1 = __webpack_require__(/*! ../engine/Engine */ "./lib/engine/Engine.js");
const Store_1 = __importDefault(__webpack_require__(/*! @glas/platform/data/Store */ "../platform/lib/data/Store.js"));
let Game = class Game extends Entity_1.default {
    doMove(move) {
        let history = this.history.slice();
        history.push(move);
        Store_1.default.default.patch(this.key, { history, undos: [] });
    }
    undoMove() {
        let history = this.history.slice();
        let undos = this.undos.slice();
        let undo = history.pop();
        if (undo != null)
            undos.push(undo);
        Store_1.default.default.patch(this.key, { history, undos });
    }
    redoMove() {
        let history = this.history.slice();
        let undos = this.undos.slice();
        let redo = undos.pop();
        if (redo != null)
            history.push(redo);
        Store_1.default.default.patch(this.key, { history, undos });
    }
    get engine() {
        return Engine_1.Engine.fromHistory(this.history);
    }
};
// static readonly store = "server"
Game.store = "local";
__decorate([
    Model_1.default.property({
        type: "array",
        items: {
            type: "number"
        },
        default: []
    })
], Game.prototype, "history", void 0);
__decorate([
    Model_1.default.property({
        type: "array",
        items: {
            type: "number"
        },
        default: []
    })
], Game.prototype, "undos", void 0);
Game = __decorate([
    Model_1.default.class()
], Game);
exports.default = Game;


/***/ }),

/***/ "./lib/www/index.js":
/*!**************************!*\
  !*** ./lib/www/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AppState_1;
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = __importDefault(__webpack_require__(/*! @glas/platform/ui/Context */ "../platform/lib/ui/Context.js"));
const Key_1 = __importDefault(__webpack_require__(/*! @glas/platform/data/Key */ "../platform/lib/data/Key.js"));
const html_1 = __webpack_require__(/*! @glas/platform/ui/html */ "../platform/lib/ui/html/index.js");
const Model_1 = __importDefault(__webpack_require__(/*! @glas/platform/data/Model */ "../platform/lib/data/Model.js"));
const State_1 = __importDefault(__webpack_require__(/*! @glas/platform/data/State */ "../platform/lib/data/State.js"));
const invoke_1 = __importDefault(__webpack_require__(/*! @glas/platform/server/invoke */ "../platform/lib/server/invoke.js"));
const WindowSize_1 = __importDefault(__webpack_require__(/*! @glas/platform/ui/input/WindowSize */ "../platform/lib/ui/input/WindowSize.js"));
const Engine_1 = __webpack_require__(/*! ../engine/Engine */ "./lib/engine/Engine.js");
const Position_1 = __importDefault(__webpack_require__(/*! ../engine/Position */ "./lib/engine/Position.js"));
const Piece_1 = __importDefault(__webpack_require__(/*! ../engine/Piece */ "./lib/engine/Piece.js"));
const Type_1 = __webpack_require__(/*! ../engine/Type */ "./lib/engine/Type.js");
const Color_1 = __webpack_require__(/*! ../engine/Color */ "./lib/engine/Color.js");
const Move_1 = __importDefault(__webpack_require__(/*! ../engine/Move */ "./lib/engine/Move.js"));
const Game_1 = __importDefault(__webpack_require__(/*! ../model/Game */ "./lib/model/Game.js"));
const search_1 = __importDefault(__webpack_require__(/*! ../engine/search */ "./lib/engine/search.js"));
const Store_1 = __importDefault(__webpack_require__(/*! @glas/platform/data/Store */ "../platform/lib/data/Store.js"));
const pieces_1 = __importDefault(__webpack_require__(/*! ./pieces */ "./lib/www/pieces/index.js"));
const WHITE = "darkseagreen";
const BLACK = "seagreen";
const OUTLINE = "#256F46";
let AppState = AppState_1 = class AppState extends State_1.default {
};
AppState.store = "memory";
AppState.key = Key_1.default.create(AppState_1, "0");
__decorate([
    Model_1.default.property({ type: "number", default: -1 })
], AppState.prototype, "selectX", void 0);
__decorate([
    Model_1.default.property({ type: "number", default: -1 })
], AppState.prototype, "selectY", void 0);
__decorate([
    Model_1.default.property({ type: "number", default: -1 })
], AppState.prototype, "hoverX", void 0);
__decorate([
    Model_1.default.property({ type: "number", default: -1 })
], AppState.prototype, "hoverY", void 0);
__decorate([
    Model_1.default.property({ type: "boolean", default: false })
], AppState.prototype, "rotate", void 0);
__decorate([
    Model_1.default.property({ type: "boolean", default: false })
], AppState.prototype, "debug", void 0);
__decorate([
    Model_1.default.property({ type: "boolean", default: false })
], AppState.prototype, "thinking", void 0);
AppState = AppState_1 = __decorate([
    Model_1.default.class()
], AppState);
// TODO: Fix the search api. It broke after porting to the new glass.
var LOCAL_AI = true;
function think(gameKey) {
    let game = Store_1.default.default.get(gameKey);
    let engine = game.engine;
    if (engine.inMate())
        return;
    Store_1.default.default.patch(AppState.key, { selectX: -1, selectY: -1, thinking: true });
    let finish = move => {
        if (typeof move == "number")
            game.doMove(move);
        Store_1.default.default.patch(AppState.key, { selectX: -1, selectY: -1, thinking: false });
    };
    if (LOCAL_AI)
        setTimeout(() => finish(search_1.default(engine)), 100);
    else
        invoke_1.default("/api/search", { position: engine.toString() }).then(move => finish(move));
}
function getSortedPieces(engine) {
    let result = [];
    for (let p = 0; p < 64; p++) {
        let piece = engine.pieces[p];
        result.push({ position: p, piece, id: engine.ids[p] });
    }
    return result.sort((p, q) => p.id - q.id);
}
const board = Context_1.default.component(function board(c, properties) {
    let store = Store_1.default.default;
    let appState = store.get(AppState.key);
    let { selectX, selectY } = appState;
    let { gameKey } = properties;
    let game = store.get(gameKey);
    let engine = game.engine;
    let selectPos = Position_1.default.create(selectX, selectY);
    let moves = engine.generateSafeMovesAt(selectPos);
    let selection = {};
    for (let move of moves)
        selection[Move_1.default.get.to(move)] = move;
    let rotate = appState.rotate;
    html_1.div({
        class: "Board" + (rotate ? " Rotated" : ""),
        content: () => {
            // Squares
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    let pos = Position_1.default.create(x, y);
                    let piece = Piece_1.default.toObject(engine.pieces[pos]);
                    let move = selection[pos];
                    let highlighted = move !== undefined;
                    let selected = x == selectX && y == selectY;
                    let color = (x + y) % 2 == 0 ? WHITE : BLACK;
                    html_1.div({
                        class: `Square ${highlighted ? "Square_highlighted" : ""}`,
                        style: `
                                left: ${x * 100 / 8}%;
                                top: ${y * 100 / 8}%;
                                background: ${color}; `,
                        onclick() {
                            if (selected) {
                                store.patch(AppState.key, { selectX: -1, selectY: -1 });
                            }
                            else if (highlighted && !appState.thinking) {
                                game.doMove(move);
                                store.patch(AppState.key, { selectX: -1, selectY: -1 });
                                // think(gameKey)
                            }
                            else {
                                if (piece.color === engine.turn || appState.debug)
                                    store.patch(AppState.key, { selectX: x, selectY: y });
                            }
                        }
                    });
                }
            }
            // Pieces
            let pieces = getSortedPieces(engine);
            for (let guiPiece of pieces) {
                let piece = Piece_1.default.toObject(guiPiece.piece);
                let { x, y } = Position_1.default.toObject(guiPiece.position);
                let colorName = Color_1.Color[piece.color];
                let typeName = Type_1.Type[piece.type];
                let pieceName = colorName.toLowerCase() + typeName;
                let highlighted = selection[guiPiece.position] !== undefined;
                let selected = x == selectX && y == selectY;
                html_1.div({
                    class: "Square",
                    style: `
                            left: ${x * 100 / 8}%;
                            top: ${y * 100 / 8}%;
                            opacity: ${piece.type == Type_1.Type.Empty ? 0 : 1};
                            transition: all 0.25s ease-in-out;
                            z-index: ${piece.type == Type_1.Type.Knight ? 3 : 2};
                            pointer-events: none`,
                    content: () => {
                        if (piece.type != Type_1.Type.Empty) {
                            html_1.img({
                                src: pieces_1.default[pieceName],
                                class: `Piece ${(selected || highlighted) ? "Piece_highlighted" : ""} ${rotate ? " Rotated" : ""}`,
                                draggable: false
                            });
                        }
                    }
                });
            }
        }
    });
});
Context_1.default.bind(c => {
    let store = Store_1.default.default;
    let appState = store.get(AppState.key);
    let windowSize = c.store.get(WindowSize_1.default.key);
    const gameKey = Key_1.default.create(Game_1.default, "0");
    let w = window;
    if (!w.load) {
        w.load = (s) => {
            let engine = Engine_1.Engine.fromString(s);
            store.patch(gameKey, { history: engine.history, undos: [] });
            store.patch(AppState.key, { selectX: -1, selectY: -1 });
        };
    }
    let boardWidth = Math.min((windowSize.height - 124), windowSize.width);
    html_1.div({
        class: "Game",
        style: `
            display: grid;
            grid-template-columns: auto ${boardWidth}px auto;
            grid-template-rows: 80px ${boardWidth}px 40px;`,
        content() {
            html_1.style(`
                .Game {
                    width: 100vw;
                    height: 100vh;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    user-select: none;
                    background: #262626;
                    color: white;
                }

                .Board {
                    position: relative;
                    grid-column: 2 / 2;
                    grid-row: 2 / 2;
                    background: white;
                    overflow: hidden;
                    border-radius: 8px;
                    box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.1);
                    transition: transform .5s ease-in-out;
                }

                .Rotated {
                    transform:rotate(180deg);
                }

                .Square {
                    position: absolute;
                    width: calc(100% / 8);
                    height: calc(100% / 8);
                    display: flex;
                }

                .Square_highlighted {
                    filter: saturate(125%) brightness(130%);
                    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
                    z-index: 1;
                    margin-left: 1.5px;
                    margin-top: 1.5px;
                    outline: ${OUTLINE} 3px solid;
                    width: calc(100% / 8 - 3px);
                    height: calc(100% / 8 - 3px);
                }

                .Piece {
                    flex-grow: 1;
                    transition: transform .7s ease-in-out;
                }

                .Piece_highlighted {
                    filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5));
                }
            `);
            html_1.div({ style: "grid-column: 2 / 2", content: () => html_1.h1("Glass Chess") });
            let game = store.get(gameKey);
            if (!game) {
                if (Game_1.default.store != "server" || game === null)
                    store.patch(gameKey, new Game_1.default({ key: gameKey }));
                html_1.div({ style: "padding: 4px; grid-column: 2 / 2; grid-row: 2 / 2", content: "Loading game..." });
            }
            else {
                let engine = game.engine;
                let check = engine.inCheck();
                let mate = engine.inMate();
                board({ gameKey });
                html_1.div({
                    style: "display: flex; padding: 8px; height: 20pt; grid-column: 2 / 2; grid-row: 3 / 3",
                    content: () => {
                        if (!mate)
                            html_1.span(`Turn: ${Color_1.Color[engine.turn]}${check ? ", Check" : ""}`);
                        else
                            html_1.span(check ? "Checkmate!" : "Stalemate!");
                        html_1.div({ style: "flex-grow: 1" });
                        html_1.button({
                            onclick: () => store.patch(AppState.key, { rotate: !appState.rotate }),
                            content: "Rotate"
                        });
                        html_1.button({
                            disabled: appState.thinking || (game.history.length < 1 && game.undos.length < 1),
                            onclick() {
                                if (confirm("Reset game?")) {
                                    store.patch(gameKey, { history: [], undos: [] });
                                    store.patch(AppState.key, { selectX: -1, selectY: -1 });
                                }
                            },
                            content: "Reset"
                        });
                        html_1.button({
                            disabled: appState.thinking || game.history.length < 1,
                            onclick() {
                                game.undoMove();
                                store.patch(AppState.key, { selectX: -1, selectY: -1 });
                            },
                            content: "Undo"
                        });
                        html_1.button({
                            disabled: appState.thinking || game.undos.length < 1,
                            onclick() {
                                game.redoMove();
                                store.patch(AppState.key, { selectX: -1, selectY: -1 });
                            },
                            content: "Redo"
                        });
                        html_1.button({
                            disabled: mate || appState.thinking,
                            onclick: () => think(gameKey),
                            content: appState.thinking ? "Thinking..." : "Think"
                        });
                    }
                });
                if (check && mate && engine.history.length <= 10) {
                    html_1.iframe({
                        style: "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 4",
                        width: 560, height: 315, src: "https://www.youtube.com/embed/0xKBsYVCdDk?autoplay=1",
                        frameborder: "0", allow: "autoplay; picture-in-picture"
                    });
                }
            }
        }
    });
});


/***/ }),

/***/ "./lib/www/pieces/blackBishop.svg":
/*!****************************************!*\
  !*** ./lib/www/pieces/blackBishop.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "df256cb41e62c8d8190ba1efbb0441b8.svg";

/***/ }),

/***/ "./lib/www/pieces/blackKing.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/blackKing.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a98c8b076fced614be051a0894b30a3a.svg";

/***/ }),

/***/ "./lib/www/pieces/blackKnight.svg":
/*!****************************************!*\
  !*** ./lib/www/pieces/blackKnight.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c66000332c1e4320badc73c4960f5278.svg";

/***/ }),

/***/ "./lib/www/pieces/blackPawn.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/blackPawn.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1b9cc35c3399f765cd9e22153e40cf1e.svg";

/***/ }),

/***/ "./lib/www/pieces/blackQueen.svg":
/*!***************************************!*\
  !*** ./lib/www/pieces/blackQueen.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5ee93cfca3a889f3426afca8d910d5e8.svg";

/***/ }),

/***/ "./lib/www/pieces/blackRook.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/blackRook.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f4c02b9b7b14ee9d5484bd1a420df1b9.svg";

/***/ }),

/***/ "./lib/www/pieces/index.js":
/*!*********************************!*\
  !*** ./lib/www/pieces/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blackBishop_svg_1 = __importDefault(__webpack_require__(/*! ./blackBishop.svg */ "./lib/www/pieces/blackBishop.svg"));
const blackKing_svg_1 = __importDefault(__webpack_require__(/*! ./blackKing.svg */ "./lib/www/pieces/blackKing.svg"));
const blackKnight_svg_1 = __importDefault(__webpack_require__(/*! ./blackKnight.svg */ "./lib/www/pieces/blackKnight.svg"));
const blackPawn_svg_1 = __importDefault(__webpack_require__(/*! ./blackPawn.svg */ "./lib/www/pieces/blackPawn.svg"));
const blackQueen_svg_1 = __importDefault(__webpack_require__(/*! ./blackQueen.svg */ "./lib/www/pieces/blackQueen.svg"));
const blackRook_svg_1 = __importDefault(__webpack_require__(/*! ./blackRook.svg */ "./lib/www/pieces/blackRook.svg"));
const whiteBishop_svg_1 = __importDefault(__webpack_require__(/*! ./whiteBishop.svg */ "./lib/www/pieces/whiteBishop.svg"));
const whiteKing_svg_1 = __importDefault(__webpack_require__(/*! ./whiteKing.svg */ "./lib/www/pieces/whiteKing.svg"));
const whiteKnight_svg_1 = __importDefault(__webpack_require__(/*! ./whiteKnight.svg */ "./lib/www/pieces/whiteKnight.svg"));
const whitePawn_svg_1 = __importDefault(__webpack_require__(/*! ./whitePawn.svg */ "./lib/www/pieces/whitePawn.svg"));
const whiteQueen_svg_1 = __importDefault(__webpack_require__(/*! ./whiteQueen.svg */ "./lib/www/pieces/whiteQueen.svg"));
const whiteRook_svg_1 = __importDefault(__webpack_require__(/*! ./whiteRook.svg */ "./lib/www/pieces/whiteRook.svg"));
exports.default = {
    blackBishop: blackBishop_svg_1.default,
    blackKing: blackKing_svg_1.default,
    blackKnight: blackKnight_svg_1.default,
    blackPawn: blackPawn_svg_1.default,
    blackQueen: blackQueen_svg_1.default,
    blackRook: blackRook_svg_1.default,
    whiteBishop: whiteBishop_svg_1.default,
    whiteKing: whiteKing_svg_1.default,
    whiteKnight: whiteKnight_svg_1.default,
    whitePawn: whitePawn_svg_1.default,
    whiteRook: whiteRook_svg_1.default,
    whiteQueen: whiteQueen_svg_1.default
};


/***/ }),

/***/ "./lib/www/pieces/whiteBishop.svg":
/*!****************************************!*\
  !*** ./lib/www/pieces/whiteBishop.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "25fd55d032c3cc0aeb15b89ffdfd01ce.svg";

/***/ }),

/***/ "./lib/www/pieces/whiteKing.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/whiteKing.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "29d92e646e03b815f8160d5bb2e56343.svg";

/***/ }),

/***/ "./lib/www/pieces/whiteKnight.svg":
/*!****************************************!*\
  !*** ./lib/www/pieces/whiteKnight.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a2c477d2f050bb0dea697a776a8f17fc.svg";

/***/ }),

/***/ "./lib/www/pieces/whitePawn.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/whitePawn.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9d8cff0861080140dd480aa1efe52134.svg";

/***/ }),

/***/ "./lib/www/pieces/whiteQueen.svg":
/*!***************************************!*\
  !*** ./lib/www/pieces/whiteQueen.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2b51c5914fd5dbfc67fa4bb90a598509.svg";

/***/ }),

/***/ "./lib/www/pieces/whiteRook.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/whiteRook.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8a34e84060da1a54eb39ba8575e3f86f.svg";

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=index.pack.js.map