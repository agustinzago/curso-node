import { CreateTable } from '../domain/use-cases/create-table.use-case';

interface RunOptions {
    base: number;
    limit: number;
    show: boolean;
}



export class ServerApp {
    static run({ base, limit, show }: RunOptions){
        console.log('Server running...')
        const table = new CreateTable().execute({base, limit})
        if( show ) console.log(table)
    }
}