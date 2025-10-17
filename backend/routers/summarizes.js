const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Configure Multer to store uploaded files in the "uploads" folder
// const upload = multer({ dest: '/uploads' });
// const upload = multer({ dest: path.join(__dirname, '../uploads') });
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// POST endpoint to handle file uploads and summarization
router.post('/', upload.single('document'), (req, res) => {
  console.log("ji")
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const filePath = req.file.path; // File storage path
console.log(filePath)
  // Spawn the Python process to run summarizer.py with the uploaded file path as argument 
  const pyProc = spawn('python', ['summarizer.py', filePath]);
  
  let output = '';
  pyProc.stdout.on('data', (data) => {
    output += data.toString();
  });

  pyProc.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pyProc.on('close', (code) => {
    // Delete the file after processing to avoid storage accumulation
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${filePath}`, err);
      } else {
        console.log(`Deleted file: ${filePath}`);
      }
    });

    if (code !== 0) {
      return res.status(500).json({ error: 'Error processing file.' });
    }
    try {
      const result = JSON.parse(output);
      res.json(result);
      console.log(result)
    } catch (err) {
      res.status(500).json({ error: 'Error parsing output from Python script.' });
    }
  });
});

module.exports = router;
