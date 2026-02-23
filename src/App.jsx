import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import BookingSection from './components/BookingSection';
import MyAppointments from './components/MyAppointments'; 
import AdminDashboard from './app/admin/dashboard/page'; 
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        localStorage.removeItem('user');
      }
    }
    setInitializing(false);
  }, []); 

  
  if (initializing) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
              element={user ? <MyAppointments user={user} /> : <Navigate to="/" />}
            />

            
            <Route
              path="/admin/dashboard"
              element={
                (user?.role === 'admin' || user?.email === 'futbrasss@gmail.com') 
                ? <AdminDashboard /> 
                : <Navigate to="/" />
              }
            />

            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;