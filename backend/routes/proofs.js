import { Router } from 'express';
import multer from 'multer';
import path from 'path';
const router = Router();

const UPLOAD_DIR = 'uploads';
const storage = multer.diskStorage({
  destination: (req,file,cb)=> cb(null, UPLOAD_DIR),
  filename: (req,file,cb)=> cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 6 * 1024 * 1024 } });

let proofs = []; // { id, eventId, name, fileUrl, gps, status, createdAt }

router.post('/:eventId', upload.single('proof'), (req,res)=>{
  const { eventId } = req.params;
  const name = req.body.name || 'Unknown';
  if(!req.file) return res.status(400).json({ message: 'No file' });
  const fileUrl = `/uploads/${req.file.filename}`;
  const id = String(Date.now());
  const p = { id, eventId, name, fileUrl, gps: null, status: 'submitted', createdAt: new Date() };
  proofs.push(p);
  res.json({ proof: p });
});

router.get('/event/:eventId', (req,res)=>{
  const list = proofs.filter(p=> p.eventId === req.params.eventId);
  res.json({ proofs: list });
});

router.patch('/:id', (req,res)=>{
  const proof = proofs.find(p=> p.id === req.params.id);
  if(!proof) return res.status(404).json({ message: 'Not found' });
  const { status } = req.body;
  if(status) proof.status = status;
  res.json({ proof });
});

export default router;
