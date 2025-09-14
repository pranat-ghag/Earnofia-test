import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const SideLink = ({to, label})=>{
  const { pathname } = useLocation();
  const active = pathname === to;
  return <Link to={to} className={active?'active nav-link':''}><span className='ms-2'>{label}</span></Link>;
};

export default function Shell({children}){
  const location = useLocation();
  return (
    <div className="d-lg-flex">
      <motion.aside initial={{x:-40, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.5}} className="side p-3 d-none d-lg-block">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="rounded-circle bg-danger" style={{width:10,height:10}}></div>
          <strong>Earnofia</strong>
        </div>
        <nav className="d-flex flex-column gap-1">
          <SideLink to="/" label="Home" />
          <SideLink to="/explore" label="Explore" />
          <SideLink to="/my-events" label="My Applications" />
        </nav>
        <div className="mt-auto small text-muted p-2">© Earnofia</div>
      </motion.aside>

      <div className="content flex-grow-1">
        <Navbar bg="dark" variant="dark" className="d-lg-none">
          <Container><Navbar.Brand as={Link} to="/">Earnofia</Navbar.Brand><Nav className="ms-auto"><Nav.Link as={Link} to="/explore">Explore</Nav.Link></Nav></Container>
        </Navbar>
        <main style={{minHeight:'70vh'}}>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}} transition={{duration:0.35}}>
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="border-top border-1 border-secondary mt-5 py-4">
          <Container className="d-flex justify-content-between">
            <div>© {new Date().getFullYear()} Earnofia</div>
            <div className="small">Built for promoters & managers</div>
          </Container>
        </footer>
      </div>
    </div>
  );
}
