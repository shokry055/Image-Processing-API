//load express
import express from 'express'
//load index route
import imageRoute from './../routes/index'
//load file
import File from './file'
const imageApp: express.Application = express()
const imagePort = 3000 // defualt port for listening : 3000
//make app uses route
imageApp.use(imageRoute)
imageApp.listen(imagePort, async (): Promise<void> => {
    // wait to file creation in thumbnails folder
    await File.createThumbPath()
    const url = `\x1b[2mhttp://localhost:${imagePort}\x1b[0m`
    console.log(`open this ${url} to view the image processing app  ...`)
})
export default imageApp
