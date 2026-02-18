import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import BookingSection from './components/BookingSection';
import MyAppointments from './components/MyAppointments'; 
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }
  }, []); 

  return (
    <Router>
      <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
        <Navbar user={user} setUser={setUser} />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div className="animate-in fade-in duration-700">
                  <section id="home"><Hero /></section>
                  <section id="about"><About /></section>
                  <section id="service"><Services /></section>
                  <section id="contact"><Contact /></section>
                </div>
              }
            />

            <Route
              path="/agendar"
              element={
                <div className="pt-16 md:pt-24 lg:pt-32 animate-in slide-in-from-bottom-4 duration-500">
                  <BookingSection user={user} onOpenAuth={() => {}} />
                </div>
              }
            />

            
            <Route
              path="/my-appointments"
              element={<MyAppointments user={user} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;