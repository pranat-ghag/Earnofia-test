import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import eventsRouter from './routes/events.js';
import applicationsRouter from './routes/applications.js';
import proofsRouter from './routes/proofs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.get('/', (_req,res)=> res.json({ok:true, name:'Earnofia API'}));
app.use('/api/events', eventsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/proofs', proofsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('API on http://localhost:'+PORT));
