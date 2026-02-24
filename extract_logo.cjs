const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public/assets/logo3d.svg');
if (fs.existsSync(svgPath)) {
    const svg = fs.readFileSync(svgPath, 'utf8');
    const match = svg.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
    if (match) {
        fs.writeFileSync(path.join(__dirname, 'public/assets/logo3d_extracted.png'), Buffer.from(match[1], 'base64'));
        console.log('Successfully extracted public/assets/logo3d_extracted.png');
    } else {
        console.log('Base64 PNG not found in SVG');
    }
} else {
    console.log('SVG not found at ' + svgPath);
}
