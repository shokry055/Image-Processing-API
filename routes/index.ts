import express from 'express';
import imagApi from './api/imagApi';
const imageRoute: express.Router = express.Router();
imageRoute.use('/api/imagApi', imagApi);
imageRoute.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send(
      '<h1>image processing api</h1> \
      <p>Listening at \
      <code><a href="/api/imagApi">/api/imagApi</a></code> \
       for queries containing at least a valid filename. Optionally use both width and height to set the size...</p> \
       <p>Examples: \
       <ul> \
       <li><a href="/api/imagApi?filename=image1">/api/imagApi?filename=image1</a></li> \
       <li><a href="/api/imagApi?filename=image1&width=100&height=100">/api/imagApi?filename=image1&width=100&height=100</a></li> \
       </ul> \
       </p>'
    );
  }
);
export default imageRoute;