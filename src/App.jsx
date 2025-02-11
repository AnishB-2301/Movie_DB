import React from 'react'
import LandingPage from './components/LandingPage.jsx'
import MovieDetails from './components/MovieDetails.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />          
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App