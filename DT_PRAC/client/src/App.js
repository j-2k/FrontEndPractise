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
import React, { useState, useEffect } from 'react'//, {useState}
import TransTemp from './DynamicComponent'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.<br></br>
          {
          //<button onClick={LogRequest}>Get Request</button><br></br>
          //<button onClick={GetTransaction}>Get Current Transaction Log</button>
          }
        </p>
        {
          //displayString
        }
        Testing Components
        <TransactionComponent/>
        <TransTemp/>
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

function TransactionComponent()
{
  const [sentence, setSentence] = useState(null);
  /*useEffect(() => {
    // Function to generate a dynamic sentence
    const generateSentence = () => {
      // Generate your dynamic sentence here
      const dynamicSentence = details;
      setSentence(dynamicSentence);
    };
  }, []);
  */

  const handleClick = () => {
    // Handle button click event
    console.log('Button clicked!');
    LogRequest();

  };

  function LogRequest ()
  {
    console.log('fetching...');
    fetch('/api/log')
    .then(Response => Response.json())
    .then(data => {
      console.log("Data = " , data);
      console.log(data.transaction.user, data.transaction.price, data.transaction.entity);
      //displayString = DisplayLog(data);
      setSentence({user: data.transaction.user,price: data.transaction.price, entity: data.transaction.entity});
    })
    .catch(err => {
      console.log(err);
    });
  }

  const finalSentence = sentence === null ? "Waiting To Fetch..." : sentence.user + sentence.price + sentence.entity;

  return (
    <p>
    <button onClick={handleClick}>Click To Fetch API Log</button><br></br>
    {finalSentence}
    </p>
  );
}


/*
let displayString = DisplayLog(null);
function DisplayLog(logs)
{
  //const {user, price, entity} = props.transaction;
  //console.log(user + " Testing Transaction ");
  
  console.log(logs + " Testing Transaction ");

  if(logs === null)
  {
    console.log("NULL");
    return 'Loading...';
  }
  else
  {
    console.log('Customer ' + logs.transaction.user + ' payed ' + logs.transaction.price + "AED to entity " + logs.transaction.entity);
    return 'Customer ' + logs.transaction.user + ' payed ' + logs.transaction.price + "AED to entity " + logs.transaction.entity;
  }
  
  //return 'Hello';
}

function GetTransaction()
{
  console.log("Test Get Transaction");
  console.log(displayString);
}
*/

export default App;
