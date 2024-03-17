import fs from 'fs'

export interface SaveFileUseCase{
    execute: (options: SaveFileOptions) => boolean
}

export interface SaveFileOptions{
    fileContent  : string;
    fileDestination? : string;
    fileName?    : string;
}

export class SaveFile implements SaveFileUseCase{
    constructor(
        /**
         *  repository: StorageRepository
         */
    ){}

    execute({ fileContent, fileDestination = 'outputs', fileName = 'multiplication-table'}: SaveFileOptions): boolean {
        try {
            fs.mkdirSync(fileDestination, {recursive: true})
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent );
            console.log('File created!')    
            return true     
        } catch (error) {
            console.error(error)
            return false
        }
    }
}