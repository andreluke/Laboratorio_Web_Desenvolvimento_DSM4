import React, { useState, ChangeEvent, MouseEvent } from "react";
import "./App.css";

type Currency = "USD" | "EUR" | "BRL" | "ARS" | "JPY";

const App: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<Currency>("USD");
  const [toCurrency, setToCurrency] = useState<Currency>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [historicConverted, setHistoricConverted] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value as Currency);
  };

  const handleToCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value as Currency);
  };

  const handleConvert = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    
    e.preventDefault();
  

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue < 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/4949fa4b58365ac77fd218fe/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.conversion_rates[toCurrency];

      if (rate) {
        const result = (amountValue * rate).toFixed(2);
        setConvertedAmount(result);
        const conversionRecord = `${amountValue} ${fromCurrency} = ${result} ${toCurrency}`;
        setHistoricConverted((prevHistory) => [
          ...prevHistory,
          conversionRecord,
        ]);
      } else {
        alert("Não foi possível obter a taxa de conversão.");
      }
    } catch (error) {
      alert("Ocorreu um erro ao buscar a taxa de câmbio.");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="App">
      <h1>Conversor de Moedas</h1>
      <form>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Digite o valor"
        />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="BRL">BRL</option>
          <option value="ARS">ARS</option>
          <option value="JPY">JPY</option>
        </select>
        <span>para</span>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
          <option value="ARS">ARS</option>
          <option value="JPY">JPY</option>
        </select>
        <button type="button" onClick={handleConvert}>
          Converter
        </button>
      </form>
      {loading && (
        <h1>Carregando</h1>
      )}
      {convertedAmount && (
        <h2>
          {amount} {fromCurrency} é igual a {convertedAmount} {toCurrency}
        </h2>
      )}
      <ul>
        <summary>Histórico</summary>
        {historicConverted.map((record, index) => (
          <li key={index}>{record}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
