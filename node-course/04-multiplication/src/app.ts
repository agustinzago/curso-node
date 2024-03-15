import { error } from 'console';
import fs from 'fs'

const header = (): string => {
    return '============================\n' +
           '        Tabla del 5\n'   + 
           '============================\n';
}

const multiplier = (num: number): string => {
    let table = '';
    for (let i = 1; i < num+1; i++){
        const result = 5*i
        table += `5 x ${i} = ${result}\n`
    }
    return table
}

const tableHeader = header()
const tableContent = multiplier(10)

const output = tableHeader + tableContent
console.log(output)

// fs.appendFile('outputs/tabla5.txt',
//     output)

const outputPath = `outputs/`

fs.mkdirSync(outputPath, {recursive: true})
fs.writeFile(`${outputPath}/tabla-5.txt`, output, (error) => {
    if (error) {
        console.error(error)
    }
})
