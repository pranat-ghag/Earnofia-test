import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import HeroCarousel from '../components/HeroCarousel';
import SectionRow from '../components/SectionRow';

export default function Home(){
  const [events,setEvents]=useState([]);
  useEffect(()=>{ (async()=>{
    const base = process.env.REACT_APP_API || 'http://localhost:5000';
    const { data } = await axios.get(base+'/api/events/explore');
    setEvents(data.events||[]);
  })(); },[]);

  return (
    <Container className="py-3">
      <div className="d-flex align-items-center top-tabs mb-3">
        <a href="#" className="active">Gigs</a>
        <a href="#">Events</a>
        <a href="#">Jobs</a>
        <a href="#">Nearby</a>
      </div>
      <HeroCarousel/>
      <SectionRow title="Trending this week" items={events.slice(0,4)} />
      <SectionRow title="Happening near you" items={events.slice().reverse()} />
      <section className="mt-4 p-4 rounded" style={{background:'linear-gradient(135deg,#1f2937,#0b1220)'}}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <h4 className="m-0">List your job on Earnofia</h4>
            <div className="text-muted">Reach verified promoters. Pay with confidence.</div>
          </div>
          <a className="btn btn-danger px-4" href="/create">Create Post</a>
        </div>
      </section>
    </Container>
  );
}
