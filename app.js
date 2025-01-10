const express = require('express');
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));

const getFiles = (dirPath) => {
  return fs.readdirSync(dirPath).map(file => ({
    name: file,
    size: (fs.statSync(path.join(dirPath, file)).size / 1024).toFixed(2) + ' KB',
  }));
};

app.get('/', (req, res) => {
  const dirPath = path.join(__dirname, 'public', 'mod', 'new');
  const files = fs.readdirSync(dirPath).map(file => ({
    name: file,
    size: (fs.statSync(path.join(dirPath, file)).size / 1024).toFixed(2) + ' KB',
  }));
  res.render('index', { files });
});

app.get('/mods', (req, res) => {
  const dirPath = path.join(__dirname, 'public', 'mod');
  const files = getFiles(dirPath);
  res.render('download', { files, type: 'mods', title: 'Download All Mods' });
});

app.get('/mods/new', (req, res) => {
  const dirPath = path.join(__dirname, 'public', 'mod', 'new');
  const files = getFiles(dirPath);
  res.render('download', { files, type: 'new-mods', title: 'New Upload Mods' });
});

app.get('/download-all/:type', (req, res) => {
  const { type } = req.params;
  const dirPath = type === 'new-mods'
    ? path.join(__dirname, 'public', 'mod', 'new')
    : path.join(__dirname, 'public', 'mod');

  const zip = new AdmZip();
  fs.readdirSync(dirPath).forEach(file => {
    zip.addLocalFile(path.join(dirPath, file));
  });

  const zipPath = path.join(__dirname, `public/${type}-mods.zip`);
  zip.writeZip(zipPath);

  res.download(zipPath, `${type}-mods.zip`, err => {
    if (err) {
      console.error(err);
    }
    fs.unlinkSync(zipPath);
  });
});

app.get('/download/:type/:fileName', (req, res) => {
  const { type, fileName } = req.params;
  const dirPath = type === 'new-mods'
    ? path.join(__dirname, 'public', 'mod', 'new')
    : path.join(__dirname, 'public', 'mod');

  const filePath = path.join(dirPath, fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName, err => {
      if (err) {
        console.error(err);
        res.status(500).send('Error downloading the file.');
      }
    });
  } else {
    res.status(404).send('File not found.');
  }
});


app.get('/store', (req, res) => {
  res.render('store');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
