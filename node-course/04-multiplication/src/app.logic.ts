import { error } from 'console';
import fs from 'fs'
import { yarg } from './config/plugins/yargs.plugin';

const base = yarg.b;
const limit = yarg.l;

const header = (): string => {
    return '============================\n' +
           `        Tabla del ${base}\n`   + 
           '============================\n';
}

const multiplier = (limit: number, base:number): string => {
    let table = '';

    return table
}

const tableHeader = header()
const tableContent = multiplier(limit, base)

const output = tableHeader + tableContent


