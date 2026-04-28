const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\HP\\.gemini\\antigravity\\brain\\afc5612a-4487-4c61-8d99-121eb7e198a4\\clinica_system_tech_mockup_1777331726656.png";
const dest = "c:\\Users\\HP\\Documents\\projetos pessoais\\projeto alpha code\\public\\assets\\clinica_system_tech_mockup.png";

try {
    fs.copyFileSync(src, dest);
    console.log('File copied successfully to ' + dest);
} catch (err) {
    console.error('Error copying file:', err);
}
