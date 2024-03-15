"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const header = () => {
    return '============================\n' +
        '        Tabla del 5\n' +
        '============================\n';
};
const multiplier = (num) => {
    let table = '';
    for (let i = 1; i < num + 1; i++) {
        const result = 5 * i;
        table += `5 x ${i} = ${result}\n`;
    }
    return table;
};
const tableHeader = header();
const tableContent = multiplier(10);
const output = tableHeader + tableContent;
console.log(output);
// fs.appendFile('outputs/tabla5.txt',
//     output)
const outputPath = `outputs/`;
fs_1.default.mkdirSync(outputPath, { recursive: true });
fs_1.default.writeFile(`${outputPath}/tabla-5.txt`, output, (error) => {
    if (error) {
        console.error(error);
    }
});
