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
                <MyComponent/>
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

<TransactionBlock/>
<TransactionBlock/>
*/
                
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
      console.log(data.transaction.user, data.transaction.price, data.transaction.entity);
      setSentence([data.transaction.user,data.transaction.price,data.transaction.entity])
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (sentence);
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

    }, [testB]);
  
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
