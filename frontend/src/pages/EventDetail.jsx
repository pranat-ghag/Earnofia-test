import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';

export default function EventDetail() {
  const nav = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const base = process.env.REACT_APP_API || 'http://localhost:5000';

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(base + '/api/events/' + id);
      setEvent(data.event);
    })();
  }, [id]);

  if (!event) return <Container className="py-4">Loading...</Container>;

  const apply = async () => {
    const name = prompt('Enter your name');
    const phone = prompt('Enter your phone');
    if (!name || !phone) return toast.error('Name and phone required');
    try {
      await axios.post(base + '/api/applications/' + id + '/apply', { name, phone });
      toast.success('Applied successfully');
      nav('/my-events');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Apply failed');
    }
  };

  return (
    <Container className="py-4 event-detail">
      <Row className="g-4">
        <Col md={7}>
          <motion.img
            whileHover={{ scale: 1.03 }}
            src={`http://localhost:5000${event.poster}`}
            alt={event.title}
            className="w-100 rounded shadow-sm"
            style={{ maxHeight: 420, objectFit: 'cover' }}
          />
          <motion.h3 className="mt-3">{event.title}</motion.h3>
          <div className="text-muted">{event.location} • {new Date(event.date).toLocaleString()}</div>

          <motion.div
            className="mt-3 p-3 rounded bg-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h6>📖 Description</h6>
            <p>{event.description || 'No description provided.'}</p>
          </motion.div>
        </Col>

        <Col md={5}>
          <motion.div
            className="p-3 rounded border shadow-sm bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <strong className="fs-4 text-danger">₹{event.pay}</strong>
              <Badge className="badge-soft">{event.category}</Badge>
            </div>
            <div className="small text-muted mt-1">Needed: {event.slotsNeeded} promoters</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-danger w-100 mt-3"
              onClick={apply}
            >
              Apply Now
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-3 small text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            After acceptance, you’ll join the event group for updates & proof uploads.
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
