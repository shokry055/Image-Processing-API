"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagApi_1 = __importDefault(require("./api/imagApi"));
const imageRoute = express_1.default.Router();
imageRoute.use('/api/imagApi', imagApi_1.default);
imageRoute.get('/', (request, response) => {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send('<h2>welcome to my image p API</h2> \
       <h5>please use folowing urls to test<h5> \
       <ul> \
       <li><a href="/api/imagApi?filename=image1">/api/imagApi?filename=image1</a></li> \
       <li><a href="/api/imagApi?filename=image1&width=100&height=100">/api/imagApi?filename=image1&width=100&height=100</a></li> \
       <li><a href="/api/imagApi?filename=image2">/api/imagApi?filename=image2</a></li> \
       <li><a href="/api/imagApi?filename=image2&width=100&height=100">/api/imagApi?filename=image2&width=100&height=100</a></li> \
       <li><a href="/api/imagApi?filename=image3">/api/imagApi?filename=image3</a></li> \
       <li><a href="/api/imagApi?filename=image3&width=100&height=100">/api/imagApi?filename=image3&width=100&height=100</a></li> \
       <li><a href="/api/imagApi?filename=image4">/api/imagApi?filename=image4</a></li> \
       <li><a href="/api/imagApi?filename=image4&width=100&height=100">/api/imagApi?filename=image4&width=100&height=100</a></li> \
       </ul> \
       </p>');
});
exports.default = imageRoute;
