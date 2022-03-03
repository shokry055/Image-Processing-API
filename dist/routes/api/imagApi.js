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
const express_1 = __importDefault(require("express")); // load express server
const file_1 = __importDefault(require("./../../src/file")); // load file system
const validate = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // if image is exists
    if (!(yield file_1.default.isImageAvailable(query.filename))) {
        const availableImageNames = (yield file_1.default.getAvailbeFiles()).join(', ');
        return `there is no image as you requested please select one of : ${availableImageNames}.`;
    }
    if (!query.width && !query.height) {
        return null; // get full image size
    }
    // if width is vaild int
    const width = parseInt(query.width || '');
    if (Number.isNaN(width) || width < 1) {
        return "please choose a number for width";
    }
    // if height is vaild int
    const height = parseInt(query.height || '');
    if (Number.isNaN(height) || height < 1) {
        return "please choose a number for height.";
    }
    return null;
});
const imagApi = express_1.default.Router();
imagApi.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const validationMessage = yield validate(request.query);
    if (validationMessage) {
        response.send(validationMessage);
        return;
    }
    let error = '';
    if (!(yield file_1.default.isThumbAvailable(request.query))) {
        error = yield file_1.default.createThumb(request.query);
    }
    if (error) {
        response.send(error);
        return;
    }
    const path = yield file_1.default.getImagePath(request.query);
    if (path) {
        response.sendFile(path);
    }
    else {
        response.send('error');
    }
}));
exports.default = imagApi;
