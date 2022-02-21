import { promises as fs } from 'fs' // load file system
import path from 'path' // use path
import resizeImage from './image-handel' // load image-handel
interface ImageQuery {
    filename?: string
    width?: string
    height?: string
}
export default class File {
    // Default paths
    static imagesFullPath = path.resolve(__dirname, '../assets/images/fullSize')
    static imagesThumbPath = path.resolve(
        __dirname,
        '../assets/images/thumbnails'
    )
    /**
     * Determine image path.
     * @param {ImageQuery} params Parameters.
     * @param {string} [params.filename] Filename.
     * @param {string} [params.width] Desired width.
     * @param {string} [params.height] Desired height.
     * @return {null|string} Path, if image available, else null.
     */
    static async getImagePath(params: ImageQuery): Promise<null | string> {
        if (!params.filename) {
            return null
        }
        // create file name and check if width and height is empty : return full size
        const filePath: string =
            params.width && params.height
                ? path.resolve(
                      File.imagesThumbPath,
                      `${params.filename}-${params.width}x${params.height}.jpg`
                  )
                : path.resolve(File.imagesFullPath, `${params.filename}.jpg`)
        // check if file exists
        try {
            await fs.access(filePath)
            return filePath
        } catch {
            return null
        }
    }
    /**
     * Check if an image is available.
     * @param {string} [filename=''] Filename (without file extension).
     * @return {boolean} True if image is available, else false.
     */
    static async isImageAvailable(filename = ''): Promise<boolean> {
        if (!filename) {
            return false // exite prosses
        }
        return (await File.getAvailbeFiles()).includes(filename)
    }
    /**
     * Retrieve available image names.
     * @return {string[]} Available image names (without file extension).
     */
    static async getAvailbeFiles(): Promise<string[]> {
        try {
            return (await fs.readdir(File.imagesFullPath)).map(
                (filename: string): string => filename.split('.')[0]
            ) // Cut extension
        } catch {
            return []
        }
    }
    /**
     * check if thumbnail is availble.
     * @param {ImageQuery} params Parameters.
     * @param {string} [params.filename] Filename.
     * @param {string} [params.width] Desired width.
     * @param {string} [params.height] Desired height.
     * @return {boolean} True, if thumb is available, else false.
     */
    static async isThumbAvailable(params: ImageQuery): Promise<boolean> {
        if (!params.filename || !params.width || !params.height) {
            return false // exite prosses
        }
        // resolving path
        const filePath: string = path.resolve(
            File.imagesThumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
        )
        try {
            await fs.access(filePath)
            return true
        } catch {
            return false
        }
    }

    /**
     * Create thumbnails path.
     */
    static async createThumbPath(): Promise<void> {
        try {
            await fs.access(File.imagesThumbPath)
            // thumbnails is already availble
        } catch {
            fs.mkdir(File.imagesThumbPath)
        }
    }
    /**
     * Create thumbnail file.
     * @param {ImageQuery} params Parameters.
     * @param {string} [params.filename] Filename.
     * @param {string} [params.width] Desired width.
     * @param {string} [params.height] Desired height.
     * @return {null|string} Error message or null.
     */
    static async createThumb(params: ImageQuery): Promise<null | string> {
        if (!params.filename || !params.width || !params.height) {
            return null
        }
        const filePathFull: string = path.resolve(
            File.imagesFullPath,
            `${params.filename}.jpg`
        )
        const filePathThumb: string = path.resolve(
            File.imagesThumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
        )
        console.log(`Creating Thumbnail ${filePathThumb}`)
        // create thumbnail from selected image ( image-handel.ts )
        return await resizeImage({
            source: filePathFull,
            target: filePathThumb,
            width: parseInt(params.width),
            height: parseInt(params.height),
        })
    }
}
