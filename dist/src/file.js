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
const fs_1 = require("fs"); // load file system
const path_1 = __importDefault(require("path")); // use path
const image_handel_1 = __importDefault(require("./image-handel")); // load image-handel
class File {
    /**
     * Determine image path.
     * @param {ImageQuery} params Parameters.
     * @param {string} [params.filename] Filename.
     * @param {string} [params.width] Desired width.
     * @param {string} [params.height] Desired height.
     * @return {null|string} Path, if image available, else null.
     */
    static getImagePath(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename) {
                return null;
            }
            // create file name and check if width and height is empty : return full size
            const filePath = params.width && params.height
                ? path_1.default.resolve(File.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`)
                : path_1.default.resolve(File.imagesFullPath, `${params.filename}.jpg`);
            // check if file exists
            try {
                yield fs_1.promises.access(filePath);
                return filePath;
            }
            catch (_a) {
                return null;
            }
        });
    }
    /**
     * Check if an image is available.
     * @param {string} [filename=''] Filename (without file extension).
     * @return {boolean} True if image is available, else false.
     */
    static isImageAvailable(filename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                return false; // exite prosses
            }
            return (yield File.getAvailbeFiles()).includes(filename);
        });
    }
    /**
     * Retrieve available image names.
     * @return {string[]} Available image names (without file extension).
     */
    static getAvailbeFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield fs_1.promises.readdir(File.imagesFullPath)).map((filename) => filename.split('.')[0]); // Cut extension
            }
            catch (_a) {
                return [];
            }
        });
    }
    /**
     * check if thumbnail is availble.
     * @param {ImageQuery} params Parameters.
     * @param {string} [params.filename] Filename.
     * @param {string} [params.width] Desired width.
     * @param {string} [params.height] Desired height.
     * @return {boolean} True, if thumb is available, else false.
     */
    static isThumbAvailable(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename || !params.width || !params.height) {
                return false; // exite prosses
            }
            // resolving path
            const filePath = path_1.default.resolve(File.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
            try {
                yield fs_1.promises.access(filePath);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    /**
     * Create thumbnails path.
     */
    static createThumbPath() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(File.imagesThumbPath);
                // thumbnails is already availble
            }
            catch (_a) {
                fs_1.promises.mkdir(File.imagesThumbPath);
            }
        });
    }
    /**
     * Create thumbnail file.
     * @param {ImageQuery} params Parameters.
     * @param {string} [params.filename] Filename.
     * @param {string} [params.width] Desired width.
     * @param {string} [params.height] Desired height.
     * @return {null|string} Error message or null.
     */
    static createThumb(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename || !params.width || !params.height) {
                return null;
            }
            const filePathFull = path_1.default.resolve(File.imagesFullPath, `${params.filename}.jpg`);
            const filePathThumb = path_1.default.resolve(File.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
            console.log(`Creating Thumbnail ${filePathThumb}`);
            // create thumbnail from selected image ( image-handel.ts )
            return yield (0, image_handel_1.default)({
                source: filePathFull,
                target: filePathThumb,
                width: parseInt(params.width),
                height: parseInt(params.height),
            });
        });
    }
}
exports.default = File;
// Default paths
File.imagesFullPath = path_1.default.resolve(__dirname, '../assets/images/fullSize');
File.imagesThumbPath = path_1.default.resolve(__dirname, '../assets/images/thumbnails');
