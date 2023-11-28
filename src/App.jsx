import "./index.scss";
import { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState(localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : []);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket))
  }, [basket])

  async function GetFetch() {
    try {
      const res = await fetch("https://northwind.vercel.app/api/products");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    GetFetch();
  }, []);


  function AddBasket(item) {
    const elementIndex = basket.findIndex((x) => x.id === item.id)
    if (elementIndex !== -1) {
      const newBasket = [...basket]
      newBasket[elementIndex].count++
      setBasket(newBasket)
    }
    else {
      setBasket([...basket, { ...item, count: 1 }]);
    }
  }
  function RemoveBasket(id) {
    setBasket(basket.filter((x) => x.id !== id));
  }
  function setCountValue(isCount, item) {
    const elementIndex = basket.findIndex((x) => x.id === item.id)
    const newBasket = [...basket]
    if (isCount) {
      newBasket[elementIndex].count++
      setBasket(newBasket)
    }
    else {
      if (newBasket[elementIndex].count > 0) {
        newBasket[elementIndex].count--
        setBasket(newBasket)
      }
    }
  }
  return (
    <>
      <h1 className="title">React Basket</h1>
      <h2 className="title">Baskets</h2>
      <div className="basket-cards cards" >
        {basket.map((x) => (
          <ul className="basket-card card">
            <li>{x.id}</li>
            <li>{x.name}</li>
            <li>Count:{x.count}</li>
            <button className="btn" onClick={() => setCountValue(true, x)}>+</button>
            <button className="btn" onClick={() => setCountValue(false, x)}>-</button>
            <button className="btn" onClick={() => RemoveBasket(x.id)}>Remove</button>
          </ul>
        ))}
      </div>
      <h2 className="title">Products</h2>
      <div className="product-cards cards" >
        {data.map((x) => (
          <ul className="product-card card">
            <li>{x.id}</li>
            <li>{x.name}</li>
            <button className="btn" onClick={() => AddBasket(x)}>Add Basket</button>
          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
