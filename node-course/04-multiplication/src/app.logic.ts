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
    for (let i = 1; i < limit+1; i++){
        const result = base*i
        table += `${base} x ${i} = ${result}\n`
    }
    return table
}

const tableHeader = header()
const tableContent = multiplier(limit, base)

const output = tableHeader + tableContent
const outputPath = `outputs`

fs.mkdirSync(outputPath, {recursive: true})
fs.writeFile(`${outputPath}/tabla-5.txt`, output, (error) => {
    if(error) throw 'Error at creating file.'
})
if (yarg.s == true) console.log(output)
console.log('File created!')