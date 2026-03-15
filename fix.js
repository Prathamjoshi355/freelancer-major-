const fs = require('fs');
const path = require('path');
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) walkDir(dirPath, callback);
        else callback(dirPath);
    });
}
walkDir('src', function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let replaced = content.replace(/from\s+["'](?:@?(?:\.\.\/)+|\.\/)(components|lib|hooks|context|styles)([^"']*)["']/g, 'from "@/$1$2"');
        if (content !== replaced) {
            fs.writeFileSync(filePath, replaced);
            console.log('Fixed', filePath);
        }
    }
});
