import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './TransactionSim.css';

function TransactionPage() {
  return (    
<div>
    <header>
    </header>
    <nav>
        <div>
        <h1>Transactions Page</h1>
            <ul>
            <li>Transactions Simulator by Juma</li>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>About</li>
            <li>FAQ</li>
            </ul>
        </div>
    </nav>
    <main>
        <RunOneTime/>
        <div >
            <ul >
                <TransactionsArray/>
            </ul>
        </div>
    </main>
    <footer>
    </footer>
</div>
  );
}

/*
<MyComponent/>
<TransactionBlock/>
<TransactionBlock/>
*/

const TransactionsArray = () => {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(addItem, 1000); // Call myFunction every 1 second
    
    return () => {
      clearInterval(intervalId); // Cleanup: Clear the interval when the component unmounts
    };
  }, []);

  const addItem = () => {
    setItemData(prevData  => {
      if (prevData.length >= 6) {
        // If the array has reached the limit, remove the first element
        prevData.shift();
      }

      const newItem = Math.random(); // Generate a new item value
      return [...prevData, newItem]; // Add the new item to the end of the array
    });
  };

  //div
  //<button onClick={addItem}>Add Item</button>
  return (
    <div>
      {itemData.map((index) => (
        <TransactionChecker key={index}/>
      ))}
    </div>
  );
};




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
            <li className='usertxt'> <p>User: {sentence[1]} </p> </li>
            <li className='spenttxt'> <p>Spent: {sentence[2]}</p> </li>
            <li className='entitytxt'> <p>Entity: {sentence[3]}</p> </li>
        </ul>
        </li>);
    }
    

    /*
    if(sentence === null)
    {
        return (null);
    }
    else
    {
        return(sentence);
    }
    */
}

function RunOneTime() {
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
