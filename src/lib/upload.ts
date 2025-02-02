import path from 'node:path'
import crypto from 'node:crypto'
import multer from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export const uploadConfig = {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const filemame = `${fileHash}-${file.originalname}`

      return callback(null, filemame)
    },
  }),
}
