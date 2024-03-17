import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

export interface RunOptions {
    base       : number;
    limit      : number;
    show       : boolean;
    name       : string;
    destination: string;
}

export class ServerApp {
    static run({ base, limit, show, name, destination }: RunOptions){
        console.log('Server running...')
        const table      = new CreateTable().execute({base, limit})
        const wasCreated = new SaveFile().execute({ fileContent: table, fileName: name, fileDestination: destination })
        if (show) console.log(table)
        wasCreated
            ? console.log('File created')
            : console.error('Error at creating file.')
    }
}