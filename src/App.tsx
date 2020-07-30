import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Posts from './app/pages/home';
import './tailwind.output.css';
import './App.css';

function App(): JSX.Element {
  useEffect(() => {
    const validityTime = 1000 * 60 * 2;
    localStorage.setItem('readItValidtyTime', validityTime.toString());
  }, []);
  return (
    <main className="App">
      <BrowserRouter>
        <Route path="/" exact component={Posts} />
      </BrowserRouter>
    </main>
  );
}

export default App;
