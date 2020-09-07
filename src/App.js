import React from 'react';
import './App.css';
import { ErrorDialog } from './views/common/ErrorDialog';
import { AuthRoute } from './routes';




function App() {
  return (
    <div className="App">
      <ErrorDialog/>
      <AuthRoute/>
    </div>
  );
}

export default App;
