import express from 'express';
import imagApi from './api/imagApi';
const imageRoute: express.Router = express.Router();
imageRoute.use('/api/imagApi', imagApi);
imageRoute.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.send(
      '<h2>welcome to my image p API</h2> \
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
       </p>'
    );
  }
);
export default imageRoute;