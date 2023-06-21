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


import './App.css';
import React from 'react'//, {useState}
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TransactionPage from './TransactionSim';
import {HomePage} from './Home';

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage/>} />    
            <Route path='transactions' element={<TransactionPage/>} />
          </Routes>
        </BrowserRouter>
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
