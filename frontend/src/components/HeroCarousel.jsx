import React from 'react';
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function HeroCarousel(){
  const slides=[
    {img:'http://localhost:5000/uploads/hero1.jpg',title:'Post, hire, done.',text:'Create a job in 60s — reach verified promoters now.'},
    {img:'http://localhost:5000/uploads/hero2.jpg',title:'Earn with Earnofia',text:'Pick gigs near you with transparent pay & timing.'},
    {img:'http://localhost:5000/uploads/hero3.jpg',title:'Proofs & payouts',text:'GPS-tagged proofs, clean dashboards, quick reviews.'}
  ];
  return (
    <div className="hero-card shadow-sm">
      <Carousel interval={4000} indicators={true} controls={false}>
      {slides.map((s,i)=> (
        <Carousel.Item key={i}>
          <div style={{height:320, backgroundImage:`url(${s.img})`, backgroundSize:'cover', backgroundPosition:'center'}} />
          <Carousel.Caption>
            <motion.h3 initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.2}}>{s.title}</motion.h3>
            <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.35}}>{s.text}</motion.p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      </Carousel>
    </div>
  );
}
