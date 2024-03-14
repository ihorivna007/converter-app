import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [action, setAction] = useState('buy');
  const [inputValue, setInputValue] = useState('1');

  const [actualRates, setActualRates] = useState({
    'bidPrice': null,
    'askPrice': null
  });

  const getExchangeRate = async () => {
    try {
      const response = await axios.get(
        'https://api.binance.com/api/v3/ticker/bookTicker', {
          params: {
            symbol: 'ETHUSDT'
          }
        }
      );

      setActualRates({
        'bidPrice': response.data.bidPrice,
        'askPrice': response.data.askPrice,
      });
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  function handleActionChange() {
    setAction(prevAction => {
      return prevAction === 'buy' ? 'sell' : 'buy';
    });
  }

  function handleInputValueChange(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;

    if (!isNaN(+value)) {
      if (value.length > 1 && value.charAt(0) === '0' && value.charAt(1) !== '.') {
        value = value.slice(1);
      }

      setInputValue((prevValue) => prevValue = value);
    }
  }

  function getResult() {
    const { bidPrice, askPrice } = actualRates;

    if (!bidPrice || !askPrice) {
      return <small>Calculating...</small>;
    }
  
    const rate = action === 'buy' ? askPrice : bidPrice;
    const value = +inputValue;

    return (value * rate).toFixed(2);
  }

  return (
    <div className="App">
      <header>
        <h1>Ethereum calculator</h1>
      </header>
      <main>
        <div className="field">
          <span>Action:</span>
          <label className="toggle">
            <input
              type="checkbox"
              className="toggle__input"
              id="toggle__input"
              hidden
              onChange={handleActionChange}
            />
            <span className="toggle__display" hidden>
              <span className="toggle__label toggle__label--sell">Sell</span>
              <span className="toggle__label toggle__label--buy">Buy</span>
            </span>
          </label>
        </div>

        <div className="field">
          <label htmlFor="initialAmount">ETH amount:</label>
          <input
            className="field__data"
            type="text"
            inputMode="decimal"
            name="initialAmount"
            id="initialAmount"
            value={inputValue}
            onChange={handleInputValueChange}
          />
        </div>

        <div className="field">
          <span>USDT amount:</span>
          <span className="field__data">{getResult()}</span>
        </div>
      </main>
    </div>
  );
}

export default App;
