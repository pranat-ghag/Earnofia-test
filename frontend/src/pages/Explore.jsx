import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Explore(){
  const [q,setQ]=useState(''); const [items,setItems]=useState([]);
  const base = process.env.REACT_APP_API || 'http://localhost:5000';
  const search = async(e)=>{ e?.preventDefault(); const {data}=await axios.get(base+'/api/events/explore',{params:{q}}); setItems(data.events||[]); };
  useEffect(()=>{ search(); },[]);
  return (
    <Container className="py-3">
      <h4 className="mb-3">Explore</h4>
      <Form onSubmit={search} className="mb-3">
        <Row className="g-2">
          <Col md={10}><Form.Control value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title, location, tag..." /></Col>
          <Col md={2}><button className="btn btn-danger w-100">Search</button></Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {items.map(it=> (
          <Col key={it._id}>
            <Link to={'/events/'+it._id} className="text-decoration-none text-light">
              <img src={`http://localhost:5000${it.poster}`} alt={it.title} className="event-img" />
              <div className="mt-2"><strong>{it.title}</strong><div className="small text-muted">{it.location} • ₹{it.pay}</div></div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
