import express from 'express';
import fs from 'fs'
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './app/app.js';
import { htmlTemplate } from './htmlTemp.js';

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

// Path: "/"
// Return the html page for selecting the rollback version
app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  res.set("Content-Type", "text/html");
  res.send(htmlTemplate(app));
});

// Path: "/history"
// Fetch the history.json file content
app.get('/history', (req, res) => {
  const historyFile = path.resolve('../history.json');
  fs.readFile(historyFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    console.log(data)
    return res.send(data);
  });
});

// const clearTargetDirectory = (targetDirectory) => {
//   const files = fs.readdirSync(targetDirectory);
//   for (const file of files) {
//     fs.unlinkSync(path.join(targetDirectory, file));
//   }
// };

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (exists && isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    // Remove all the files in the target directory (js, css, media) before copying
    if (src.endsWith('js') || src.endsWith('css') || src.endsWith('media')) {
      try {
        // List all the files and directories in the target directory
        const files = fs.readdirSync(dest);

        for (const file of files) {
          const filePath = path.join(dest, file);

          // Check if the item is a file
          if (fs.statSync(filePath).isFile()) {
            // Delete the file
            fs.unlinkSync(filePath);
            console.log(`Deleted file: ${filePath}`);
          }
        }
      } catch (err) {
        console.error(`An error occurred: ${err}`);
      }
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Path: "/rollback"
// Return the html page for selecting the rollback version
app.get('/rollback', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  const id = req.query['id'];
  const history = JSON.parse(fs.readFileSync(path.resolve('../history.json'), 'utf-8'));

  const targetDirectory = path.resolve('../quick_rollback_client/build');
  const sourceDirectory = path.resolve(`../quick_rollback_client/history/${history.list.find(item => item.id === id).buildDirname}`);
  // clearTargetDirectory(targetDirectory);
  copyRecursiveSync(sourceDirectory, targetDirectory);
  return res.status(200).send('Rollback successfully');
});

app.listen(3001, () => {
  console.log('server is running at port 3001');
})
