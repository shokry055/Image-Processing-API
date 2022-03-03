"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./../routes/index"));
const file_1 = __importDefault(require("./file"));
const imageApp = (0, express_1.default)();
const imagePort = 3000;
imageApp.use(index_1.default);
imageApp.listen(imagePort, () => __awaiter(void 0, void 0, void 0, function* () {
    // wait to file creation in thumbnails folder
    yield file_1.default.createThumbPath();
    const url_serve = `http://localhost:${imagePort}`;
    console.log(`listining at ${url_serve} ...`);
}));
/*export default imageApp
*/ 
