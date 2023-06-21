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
                <TransactionBlock/>
                <TransactionBlock/>
                <TransactionBlock/>
            </ul>
        </div>
    </main>
    <footer>
        <h2>Footer</h2>
    </footer>
</div>
  );
}

function TransactionBlock()
{
    return(
        <li className="transactionblock">
            Transaction = {TransactionChecker()}
        </li>
    )
}

function TransactionChecker()
{
  const [sentence, setSentence] = useState(null);

    /*
    useEffect(() => {
        // Function to generate a dynamic sentence
        const generateSentence = () => {
            const finalSentence = sentence === null ? "Waiting To Fetch..." : 
            sentence.user + " has payed a total of " + sentence.price + " to " + sentence.entity;
        // Generate your dynamic sentence here
        //const finalSentence2 = 'This is a dynamic sentence: ' + new Date().toLocaleTimeString();
        setSentence(finalSentence);
        };
        
        // Call the function initially
        LogRequest();
        generateSentence();
        
        // Update the sentence every second
        const intervalId = setInterval(generateSentence, 1000);
        
        // Clean up the interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    */

  function LogRequest ()
  {
    console.log('fetching...');
    fetch('/api/log')
    .then(Response => Response.json())
    .then(data => {
      console.log("Data = " , data);
      console.log(data.transaction.user, data.transaction.price, data.transaction.entity);
      //displayString = DisplayLog(data);
      //setSentence({user: data.transaction.user,price: data.transaction.price, entity: data.transaction.entity});
      setSentence([data.transaction.user,data.transaction.price,data.transaction.entity])
    })
    .catch(err => {
      console.log(err);
    });
  }

  

  return (sentence);
}

export default TransactionPage;
