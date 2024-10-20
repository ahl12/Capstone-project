import { useState } from "react";
import "./InputFormStyling.css";

export function StockInputForm() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [qty, setQty] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [stockList, setStockList] = useState([]);
//UseEffect will be here

  function handleAddStockClick() {
     fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=NVGF86KB0NV1WCDE`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const currentEarnings =
          Number(qty) * Number(data["Global Quote"]["05. price"]);
        const previousEarnings = Number(qty) * Number(purchasePrice);
        const profitLoss = currentEarnings - previousEarnings;

        const newStock = {
          stockSymbol: stockSymbol,
          qty: qty,
          purchasePrice: purchasePrice,
          currentPrice: data["Global Quote"]["05. price"],
          profitLoss: profitLoss,
        };

        // Create a new array by spreading the existing stockList and adding the new stock
        setStockList((prevStockList) => [...prevStockList, newStock]);
      }
    ).catch(
      error => console.log("Error Encountered!!!"));
  }
  // console.log(stockList);

  return (
    <div>
      <div className="inputField">
        <input
          id="stockSymbol"
          type="text"
          placeholder="Stock Symbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />

        <input
          id="qty"
          type="number"
          placeholder="Quantity"
          value={qty}
          min="0"
          onChange={(e) => setQty(e.target.value)}
        />

        <input
          id="purchasePrice"
          type="number"
          placeholder="Purchase Price (USD)"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />

        <button onClick={handleAddStockClick} type="submit">
          Add Stock
        </button>
      </div>

      <div>
        {stockList.map((stockDetails) => {
          return (
            <div>
              <h3>Stock Symbol : {stockDetails.stockSymbol}</h3>
              <p>Quantity: {stockDetails.qty}</p>
              <p>Purchase Price: {stockDetails.purchasePrice}</p>
              <p>Current Price: {stockDetails.currentPrice}</p>
              <p>Profit/Loss: {stockDetails.profitLoss}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
