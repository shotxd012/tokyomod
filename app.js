const express = require('express');
const axios = require('axios');
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
  const dirPath = path.join(__dirname, 'public', 'newmods');
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
  const dirPath = path.join(__dirname, 'public', 'newmods');
  const files = getFiles(dirPath);
  res.render('download', { files, type: 'new-mods', title: 'New Upload Mods' });
});

app.get('/download-all/:type', (req, res) => {
  const { type } = req.params;
  const dirPath = type === 'new-mods'
    ? path.join(__dirname, 'public', 'newmods')
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
    ? path.join(__dirname, 'public', 'newmods')
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

app.get('/guides', (req, res) => {
  res.render('guides');
});

app.get('/rules', (req, res) => {
  res.render('rules');
});


// api admin only page

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Admin Performance Overview Route
app.get('/admin/performance/overview', async (req, res) => {
    try {
        const response = await axios.get('http://modded.tokyomc.fun:23999/v1/performanceOverview?server=tokyo%20modded');
        const data = response.data;
        console.log('Performance Data:', data);
        res.render('overview', { data });
    } catch (error) {
        console.error('Error fetching performance data:', error);
        res.status(500).send('Error fetching performance data');
    }
});

// Graph Route
app.get('/admin/performance/graph', async (req, res) => {
    try {
        const response = await axios.get('http://modded.tokyomc.fun:23999/v1/graph?type=optimizedPerformance&server=tokyo%20modded');
        const graphData = response.data;
        console.log('Graph Data:', graphData);
        res.render('graph', { graphData });
    } catch (error) {
        console.error('Error fetching graph data:', error);
        res.status(500).send('Error fetching graph data');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
