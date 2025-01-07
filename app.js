const express = require('express');
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  const dirPath = path.join(__dirname, 'public', 'mod');
  const files = fs.readdirSync(dirPath).map(file => ({
    name: file,
    size: (fs.statSync(path.join(dirPath, file)).size / 1024).toFixed(2) + ' KB',
  }));
  res.render('index', { files });
});

app.get('/download-all', (req, res) => {
  const zip = new AdmZip();
  const dirPath = path.join(__dirname, 'public', 'mod');

  fs.readdirSync(dirPath).forEach(file => {
    zip.addLocalFile(path.join(dirPath, file));
  });

  const zipPath = path.join(__dirname, 'public', 'mod.zip');
  zip.writeZip(zipPath);

  res.download(zipPath, 'TokyoMC-Mods.zip', err => {
    if (err) {
      console.error(err);
    }
    fs.unlinkSync(zipPath); 
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://mods.tokyomc.fun`);
});
