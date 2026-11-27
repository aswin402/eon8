import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { loadPagesIndex } from './lib/pages/pageContent';

// Start finding out which pages were edited in the admin while the page code loads.
void loadPagesIndex();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
