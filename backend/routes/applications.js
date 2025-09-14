import { Router } from 'express';
const router = Router();

// simple in-memory store for applications
let applications = []; // { id, eventId, name, phone, status, createdAt }

router.post('/:eventId/apply', (req,res)=>{
  const { eventId } = req.params;
  const { name, phone } = req.body;
  if(!name || !phone) return res.status(400).json({ message: 'name & phone required' });
  const id = String(Date.now());
  const app = { id, eventId, name, phone, status: 'applied', createdAt: new Date() };
  applications.push(app);
  res.json({ application: app });
});

router.get('/event/:eventId', (req,res)=>{
  const list = applications.filter(a=> a.eventId === req.params.eventId);
  res.json({ applications: list });
});

router.get('/', (_req,res)=> res.json({ applications }));

// Manager accept (simple toggle)
router.post('/:id/accept', (req,res)=>{
  const app = applications.find(a=> a.id === req.params.id);
  if(!app) return res.status(404).json({ message: 'not found' });
  app.status = 'accepted';
  res.json({ application: app });
});

export default router;
