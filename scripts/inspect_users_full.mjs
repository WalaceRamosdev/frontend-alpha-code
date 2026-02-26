import fs from 'fs';

function r(p) {
    if (!fs.existsSync(p)) return null;
    const b = fs.readFileSync(p);
    let s;
    if (b[0] === 0xff && b[1] === 0xfe) s = b.toString('utf16le');
    else if (b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf) s = b.toString('utf8').slice(1);
    else s = b.toString('utf8');
    if (s.startsWith('\uFEFF')) s = s.slice(1);
    return s.trim();
}

const c = r('users_list.json');
if (c) {
    try {
        const d = JSON.parse(c);
        console.log('--- ALL USER DATA ---');
        console.log(JSON.stringify(d, null, 2));
    } catch (e) {
        console.log('Parse error');
    }
}
