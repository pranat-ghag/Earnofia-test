import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ProofUpload from '../components/ProofUpload';
import { useParams } from 'react-router-dom';

export default function GroupPage(){
  const { id } = useParams();
  const [proofs, setProofs] = useState([]);
  const base = process.env.REACT_APP_API || 'http://localhost:5000';

  useEffect(()=>{ (async ()=>{ const { data } = await axios.get(base + '/api/proofs/event/' + id); setProofs(data.proofs || []); })(); },[id]);

  return (
    <Container className="py-4">
      <h3>Event Group — Proofs</h3>
      <Row>
        <Col md={6}><ProofUpload eventId={id} /></Col>
        <Col md={6}>
          <div className="d-flex flex-column gap-2">
            {proofs.map(p=> (
              <Card key={p.id} className="p-2"><div className="d-flex gap-2"><img src={p.fileUrl} style={{width:120,height:80,objectFit:'cover'}} alt='' /><div><strong>{p.name}</strong><div className="small text-muted">{p.status}</div></div></div></Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
