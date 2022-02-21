import express from 'express'; // load express server
import File from './../../src/file'; // load file system
interface imageData {
  filename?: string;
  width?: string;
  height?: string;
}
/**
 * Validate query.
 * @param {imageData} query Query object passed by express.
 * @return {null|string} Null if valid or error message.
 */
 const validate = async (query: imageData): Promise<null | string> => {
  // if image is exists
  if (!(await File.isImageAvailable(query.filename))) {
    const availableImageNames: string = (
      await File.getAvailbeFiles()
    ).join(', ');
    return `there is no image as you requested please select one of : ${availableImageNames}.`;
  }
  if (!query.width && !query.height) {
    return null; // get full size no dimintions requested
  }
  // if width is vaild int
  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "please choose a number for width";
  }
  // if height is vaild int
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "please choose a number for height.";
  }
  return null;
};
const imagApi: express.Router = express.Router();
imagApi.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    // Check whether request can be worked with
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }
    let error: null | string = '';
    // Create thumbnail if not yet available
    if (!(await File.isThumbAvailable(request.query))) {
      error = await File.createThumb(request.query);
    }
    // if is there error 
    if (error) {
      response.send(error);
      return;
    }
    // get and view image
    const path: null | string = await File.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('error');
    }
  }
);
export default imagApi;