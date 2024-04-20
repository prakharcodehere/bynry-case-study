
import './App.css';
import UserInterface from './components/UserInterface/UserInterface';

import Database from './data/database';

function App() {
  return (
    <div className="App">
 <UserInterface database={Database}/>

    </div>
  );
}

export default App;
