import React, { useState } from 'react'//, {useState}
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TransTemp from './DynamicComponent'

function HomePage() {
  return (
      <div className="App">
              <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>Home Page</h1>
              {/* Add content specific to your About page */}
              Welcome to my home page check the other pages below<br></br>
             <Link to='/transactions'> Transactions </Link>
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

  const AutoFetch = () => {
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

  const finalSentence = sentence === null ? "Waiting To Fetch..." : 
  sentence.user + " has payed a total of " + sentence.price + " to " + sentence.entity;

  return (
    <p>
    <button onClick={handleClick}>Click To Fetch API Log</button><br></br>
    <button onClick={AutoFetch}>Toggle Auto Fetch</button><br></br>
    {finalSentence}
    </p>
  );
}

export {TransactionComponent, HomePage}
