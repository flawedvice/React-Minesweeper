import React from 'react';
import './App.css';
import Counter from './Components/Counter';
import Board from './Components/Board';

function App() {
  return (
    <div className="App">
      <Counter bombsLeft={10} time={60}/>
      <Board rows={5} bombs={10}/>
    </div>
  );
}

export default App;
