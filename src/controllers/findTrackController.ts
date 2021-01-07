import {Request, Response} from 'express'
import multer from 'multer'
import fs from 'fs'
import { generateRandomString, generateRandomUploadPath } from '../helpers/generateRandomString'
import { mkdirIfNotExists, unlinkDir } from '../helpers/manageUploadDir'
import {gimme} from 'gimme-the-song'
import {FileCreated, Result, MulterFile} from '../types'

export const find = (req: Request, res: Response) => {
    const pathDir = generateRandomUploadPath()
    const upload = multer().any()

    upload(req, res, (err: any) => {
        if(err) return responseError(err)
        mkdirIfNotExists(pathDir)
        
        // @ts-ignore
        const writersPromises = req.files.map(
            (file: MulterFile) => 
                new Promise(resolve => writeFile(pathDir, file, resolve)
            ))
        

        Promise.all<FileCreated>(writersPromises).then(filesCreated => {
            const resultsPromises = filesCreated.map(file => new Promise(resolve => handleGimme(file, resolve)))
            Promise.all(resultsPromises).then(results => {
                res.send({results})
                unlinkDir(pathDir)
            }).catch(responseError)
        }).catch(responseError)

    })

    const responseError = (err: NodeJS.ErrnoException) => {
        return res.status(500).json({status: "error"})
    }

    const writeFile = (path: string, file: MulterFile, callback: (fileCreated: FileCreated) => void) => {
        const filePath = `${path}${generateRandomString(16)}`
        
        fs.writeFile(filePath, file.buffer, {encoding: "ascii"}, (err => {
            if(err){
                responseError(err)
            }
            callback({file, path: filePath || null})
        }))
    }

    const handleGimme = (file: FileCreated, callback: (result: Result) => void) => {
        gimme(file.path || '', {}, (gimmeResult) => {
            callback({file: file.file, track: gimmeResult?.track || null})
        })
    }
}