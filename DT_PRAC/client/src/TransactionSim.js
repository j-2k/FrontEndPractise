import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './TransactionSim.css';

function TransactionPage() {
  return (    
<div>
    <header>
        <h2>Header</h2> 
    </header>
    <nav>
        <div>
        <h1>Transactions Page</h1>
            <ul>
            <li>test0</li>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>test2</li>
            <li>test3</li>
            </ul>
        </div>
    </nav>
    <main>
        <h2>Main</h2>
        <div >
            <ul >
                <TransactionChecker/>
            </ul>
        </div>
    </main>
    <footer>
        <h2>Footer</h2>
    </footer>
</div>
  );
}

/*
<MyComponent/>
<TransactionBlock/>
<TransactionBlock/>
*/

function TransactionChecker()
{
    let testB = false;//guard for running once??? why is it running twice without the guard
    const [sentence, setSentence] = useState(null);

    
    useEffect(() => {        
        if (!testB) {
            LogRequest();
            testB=true;
        }
        // Call the function initially

    }, []);
    

  function LogRequest ()
  {
    console.log('fetching...');
    fetch('/api/log')
    .then(Response => Response.json())
    .then(data => {
      console.log("Data = " , data);
      console.log(data.transaction.num,data.transaction.user, data.transaction.price, data.transaction.entity);
      setSentence([data.transaction.num,data.transaction.user,data.transaction.price,data.transaction.entity])
    })
    .catch(err => {
      console.log(err);
    });
  } 

  //return (sentence);
    if(sentence === null)
    {
        return (<li className="transactionblock">Fetching...</li>);
    }
    else
    {
        return(<li className="transactionblock">
        #{sentence[0]}
        <ul className='ult'>
            <li className='usertxt'> User: {sentence[1]}</li>
            <li className='spenttxt'> Spent: {sentence[2]} </li>
            <li className='entitytxt'> Entity: {sentence[3]} </li>
        </ul>
        </li>);
    }
}


function MyComponent() {
    let testB = false;
    console.log('Component rendering'); // Log when component renders
    useEffect(() => {
      // Function to run once
      if(!testB)
      {
        myFunction();
        testB = true;
      }

    }, []);
  
    const myFunction = () => {
      // Logic to be executed once
      console.log('Effect running'); // Log when effect runs
    };
  
    return (
      // JSX for your component
      <div>
        {/* Component content */}
      </div>
    );
  }

export default TransactionPage;
