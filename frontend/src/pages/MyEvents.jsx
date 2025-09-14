import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MyEvents(){
  const [apps, setApps] = useState([]);
  useEffect(()=>{ (async ()=>{ const base = process.env.REACT_APP_API||'http://localhost:5000'; const { data } = await axios.get(base + '/api/applications'); setApps(data.applications || []); })(); },[]);
  return (
    <Container className="py-4">
      <h3>My Applications (public demo)</h3>
      <Row className="g-3 mt-3">
        {apps.map(a=> (
          <Col key={a.id} md={6}>
            <Card className="p-3">
              <div className="d-flex justify-content-between">
                <div><strong>{a.name}</strong><div className="small text-muted">Event ID: {a.eventId}</div></div>
                <div className="text-end"><div className="text-muted">{new Date(a.createdAt).toLocaleString()}</div><div className="badge bg-secondary">{a.status}</div></div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
