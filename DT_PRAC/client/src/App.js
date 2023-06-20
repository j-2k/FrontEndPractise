/*import { response } from 'express';
import React, {useEffect, useState} from 'react'

function App()
{
  const [backendLog, setBackendLog] = useState([{   }]);

  useEffect(() => {
    fetch("/api/log").then(response => response.json())
    .then(data => {setBackendLog(data)})
  }, [])

  return(
    <div>
    Test 123
    </div>
  )
}

export default App
*/

import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.<br></br>
          <button onClick={LogRequest}>Get Request</button><br></br>
          <button onClick={GetTransaction}>Get Transaction</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function LogRequest ()
{
  console.log('fetching...');
  fetch('/api/log')
  .then(Response => Response.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
}

function GetTransaction()
{
    console.log('fetching transaction...')
    
}

export default App;
