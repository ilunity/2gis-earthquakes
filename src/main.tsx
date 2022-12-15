import React from 'react';
import ReactDOM from 'react-dom/client';
import './normilize.css';
import { App } from './components/App';
import { MapProvider } from './components/MapProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <MapProvider>
    <App/>
  </MapProvider>,
);

