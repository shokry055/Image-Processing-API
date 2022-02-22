# Image Processing API
 Image Processing API project

### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server will listen on port 3000:

#### all instructions
http://localhost:3000/

#### resize images
http://localhost:3000/api/imagApi

Expected query arguments are:
- filename: Available filenames are: image1 - 6 
- width: numerical pixel value > 0
- height: numerical pixel value > 0

#### Example 1
http://localhost:3000/api/imagApi
will display not to images names

#### Example 2
http://localhost:3000/api/imagApi?filename=image1
get image1 full image.

#### Example 3
http://localhost:3000/api/imagApi?filename=image1&width=200&height=200
resize image1 to 200x200 .

### other details
- Images source is `assets/images/fullSize`.
- thumbnails distnation is `assets/images/thumbnails`