import fs from 'fs';

const files = ['users_data.json', 'users_list.json', 'records_output.txt', 'records_utf8.txt', 'audit_logs.json'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`--- START OF ${file} ---`);
        console.log(fs.readFileSync(file, 'utf8'));
        console.log(`--- END OF ${file} ---`);
    } else {
        console.log(`File ${file} does not exist.`);
    }
});
