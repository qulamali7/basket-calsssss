import "./index.scss";
import { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    GetAdminFetch();
  }, []);

  function AddBasket(item) {
    const elementIndex=basket.findIndex((x)=>x.id===item.id)
    if (elementIndex!==-1) {
      const newbasket=[...basket]
      
    }
    if (condition) {
      
    }
    
    setBasket([...basket, item]);
  }
  function RemoveBasket(item) {
    setBasket([...basket, item]);
  }
  console.log(basket);

  async function GetAdminFetch() {
    try {
      const res = await fetch("https://northwind.vercel.app/api/products");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="App">
      <h1>Umumi hisse</h1>
      <div>
        <h3>Basket</h3>
        <div style={{ border: "1px solid black" }}>
          {basket.map((x) => (
            <ul>
              <li>{x.id}</li>
              <li>{x.name}</li>
              <li>
                sayi {count}{" "}
                <button onClick={() => setCount(count + 1)}>+</button>
                <button onClick={() => setCount(count - 1)}>-</button>
              </li>
              <button onClick={RemoveBasket}>Remove</button>
            </ul>
          ))}
          
        </div>
      </div>
      <div>
        {data.map((x) => (
          <ul>
            <li>{x.id}</li>
            <li>{x.name}</li>
            <button onClick={() => AddBasket(x)}>Add Basket</button>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
