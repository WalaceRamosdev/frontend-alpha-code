import fs from 'fs';

function readFileRobust(path) {
    if (!fs.existsSync(path)) return null;
    const buffer = fs.readFileSync(path);
    if (buffer[0] === 0xff && buffer[1] === 0xfe) return buffer.toString('utf16le');
    return buffer.toString('utf8').replace(/^\uFEFF/, '');
}

const content = readFileRobust('records_output.txt');
if (content) {
    const lines = content.split('\n');
    lines.forEach((line, i) => {
        console.log(`Line ${i}: ${JSON.stringify(line)}`);
    });
}
