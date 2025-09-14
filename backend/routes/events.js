import { Router } from 'express';
const router = Router();

// In-memory sample data (replace with Mongo later)
const sample = [
  { _id:'1', title:'Brand Promo Ambassadors', poster:'/uploads/hero1.jpg', location:'Mumbai', date:'2025-09-25T10:00:00Z', pay:1500, slotsNeeded:25, tags:['sampling','FMCG'], category:'Event' },
  { _id:'2', title:'Concert Entry Volunteers', poster:'/uploads/hero1.jpg', location:'Pune', date:'2025-10-01T18:00:00Z', pay:1200, slotsNeeded:40, tags:['concert','evening'], category:'Event' },
  { _id:'3', title:'Retail Store Promoter (Weekend)', poster:'/uploads/hero3.jpg', location:'Navi Mumbai', date:'2025-09-28T11:00:00Z', pay:900, slotsNeeded:12, tags:['retail','weekend'], category:'Part-time' },
  { _id:'4', title:'Food Fest Cashier/Support', poster:'/uploads/hero4.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },
  { _id:'5', title:'Food Fest Cashier/Support', poster:'/uploads/food_3.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },
  { _id:'6', title:'Food Fest Cashier/Support', poster:'/uploads/food_11.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },
  { _id:'7', title:'Food Fest Cashier/Support', poster:'/uploads/food_10.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },
  { _id:'8', title:'Food Fest Cashier/Support', poster:'/uploads/food_9.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },
  { _id:'9', title:'Food Fest Cashier/Support', poster:'/uploads/food_6.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },
    { _id:'5', title:'Food Fest Cashier/Support', poster:'/uploads/food_3.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },
  { _id:'5', title:'Food Fest Cashier/Support', poster:'/uploads/food_3.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },
  { _id:'5', title:'Food Fest Cashier/Support', poster:'/uploads/food_3.jpg', location:'Thane', date:'2025-10-03T10:00:00Z', pay:1100, slotsNeeded:18, tags:['festival','cashier'], category:'Event' },


];

// GET /api/events/explore?q=keyword
router.get('/explore', (req,res)=>{
  const q = (req.query.q||'').toLowerCase();
  const items = !q ? sample : sample.filter(e=> (e.title+' '+e.location+' '+e.tags.join(' ')).toLowerCase().includes(q));
  res.json({events: items});
});

// GET /api/events/:id
router.get('/:id', (req,res)=>{
  const item = sample.find(e=> e._id === req.params.id);
  res.json({event:item});
});

export default router;
