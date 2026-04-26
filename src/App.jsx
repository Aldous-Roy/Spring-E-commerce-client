import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'white',
            color: '#333',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '4px',
            border: '1px solid #eee'
          },
        }}
      />
    </Router>
  );
}

export default App;
