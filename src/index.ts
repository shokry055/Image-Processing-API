import express from 'express'
import imageRoute from './../routes/index'
import File from './file'
const imageApp: express.Application = express()
const imagePort = 3000 
imageApp.use(imageRoute)
imageApp.listen(imagePort, async (): Promise<void> => {
    // wait to file creation in thumbnails folder
    await File.createThumbPath()
    const url_serve = `http://localhost:${imagePort}`
    console.log(`listining at ${url_serve} ...`)
})