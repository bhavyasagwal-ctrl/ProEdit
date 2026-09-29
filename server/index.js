import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'ProEdit' });
});

app.get('/project', (req, res) => {
  res.json({
    name: 'Untitled Project',
    fps: 30,
    resolution: '1920x1080',
    duration: 0,
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uploadDir = path.resolve('uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const originalName = req.file.originalname;
  const finalPath = path.join(uploadDir, originalName);

  fs.renameSync(req.file.path, finalPath);

  res.json({
    id: Date.now().toString(),
    name: originalName,
    type: req.file.mimetype,
    path: `/uploads/${encodeURIComponent(originalName)}`,
    size: req.file.size,
  });
});

app.post('/export', (req, res) => {
  const { projectName, format } = req.body || {};
  res.json({
    status: 'queued',
    projectName: projectName || 'Untitled Project',
    format: format || 'mp4',
    message: 'Export job created successfully.',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ProEdit backend running on http://localhost:${port}`);
});
