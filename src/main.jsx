import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dinosaurs from './components/Dinosaurs';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dinosaurs />
  </StrictMode>,
);
