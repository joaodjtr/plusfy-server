import fs from 'fs'
import path from 'path'

export const mkdirIfNotExists = (pathDir: string) => {
    if(!fs.existsSync(pathDir)) fs.mkdirSync(pathDir, {recursive: true})
}

export const unlinkDir = (pathDir: string) => {
    if(pathDir != "/" && pathDir && fs.existsSync(pathDir)){
        fs.readdirSync(pathDir).forEach((file) => {
            const currentPath = path.join(pathDir, file)
            if (fs.lstatSync(currentPath).isDirectory()) {
              return unlinkDir(currentPath)
            }
              fs.unlinkSync(currentPath)
          })
          fs.rmdirSync(pathDir)
    }
}