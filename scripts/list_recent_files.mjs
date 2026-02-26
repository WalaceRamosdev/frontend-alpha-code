import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('.');
const stats = files.map(f => {
    const s = fs.statSync(f);
    return { name: f, mtime: s.mtime };
}).sort((a, b) => b.mtime - a.mtime);

stats.slice(0, 30).forEach(s => {
    console.log(`${s.mtime.toISOString()} | ${s.name}`);
});
