import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './styles/Variables.css';
import './styles/Global.css';
import './styles/Navbar.css';
import './styles/Hero.css';
import './styles/Problem.css';
import './styles/HowItWorks.css';
import './styles/ProductPreview.css';
import './styles/EarlyAccess.css';
import './styles/Footer.css';
import './styles/Animations.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);