import crypto from 'crypto'

export const generateRandomString = (length: number) => {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const generateRandomUploadPath = () => process.env.PATH_UPLOAD+crypto.randomFillSync(Buffer.alloc(10)).toString('hex')+Date.now().toString()+'/'