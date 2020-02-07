"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const webServer = __importStar(require("../../server/webServer"));
function config() {
    var _a, _b;
    return _b = (_a = webServer.instance.package.firebase) === null || _a === void 0 ? void 0 : _a.webConfig, (_b !== null && _b !== void 0 ? _b : {});
}
exports.config = config;
