import {Request, Response} from 'express'
import multer from 'multer'
import fs from 'fs'
import { generateRandomUploadPath } from '../helpers/generateRandomString'
import { mkdirIfNotExists, unlinkDir } from '../helpers/manageUploadDir'
import {gimme} from 'gimme-the-song'
import {FileCreated, File, Result} from '../types'

export const find = (req: Request, res: Response) => {
    const pathDir = generateRandomUploadPath()
    const upload = multer().any()

    upload(req, res, (err: any) => {
        if(err) return responseError(err)
        mkdirIfNotExists(pathDir)

        // @ts-ignore
        const writersPromises = req.files.map((file: File) => new Promise(resolve => writeFile(pathDir, file, resolve)))

        Promise.all<FileCreated>(writersPromises).then(filesCreated => {
            const resultsPromises = filesCreated.map(file => new Promise(resolve => handleGimme(file, resolve)))
            Promise.all(resultsPromises).then(results => {
                res.send({results})
                unlinkDir(pathDir)
            }).catch(responseError)
        }).catch(responseError)
    })

    const responseError = (err: NodeJS.ErrnoException) => {
        console.error(err)
        return res.status(500).json({status: "error"})
    }

    const writeFile = (path: string, file: File, callback: (fileCreated: FileCreated) => void) => {
        fs.writeFile(`${path}${file.fieldname}`, file.buffer, {encoding: "ascii"}, (err => {
            if(err){
                responseError(err)
            }
            callback({file, path: `${path}${file.fieldname}` || null})
        }))
    }
    
    const handleGimme = (file: FileCreated, callback: (result: Result) => void) => {
        gimme(file.path || '', {}, (gimmeResult) => {
            callback({file: file.file, track: gimmeResult?.track || null})
        })
    }
}