import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shell from './components/Shell';
import Home from './pages/Home';
import Explore from './pages/Explore';
import EventDetail from './pages/EventDetail';
import MyEvents from './pages/MyEvents';
import GroupPage from './pages/GroupPage';
export default function App(){
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/events/:id" element={<EventDetail/>} />
            <Route path="/my-events" element={<MyEvents/>} />
            <Route path="/group/:id" element={<GroupPage/>} />
      </Routes>
    </Shell>
  );
}
