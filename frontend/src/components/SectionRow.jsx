import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity:0, y:12 },
  visible: { opacity:1, y:0 }
};

export default function SectionRow({title, items}){
  return (
    <section className="mt-4">
      <div className="section-title">
        <h5 className="m-0">{title}</h5>
        <Link to="/explore" className="text-decoration-none">See all ›</Link>
      </div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {items.map((item, idx) => (
          <Col key={item._id}>
            <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={cardVariants} transition={{duration:0.4, delay: idx*0.05}}>
              <Link to={`/events/${item._id}`} className="text-decoration-none text-light">
                <img src={`http://localhost:5000${item.poster}`} alt={item.title} className="event-img" />
                <div className="mt-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{item.title}</strong>
                    <Badge bg="" className="badge-soft">{item.category}</Badge>
                  </div>
                  <div className="small text-muted">{item.location} • ₹{item.pay}</div>
                </div>
              </Link>
            </motion.div>
          </Col>
        ))}
      </Row>
    </section>
  );
}
