import './App.css';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import Coin from './Coin';

function App() {

  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('');

   useEffect(()=>{
     Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
     .then((Response)=>{
       console.log(Response.data);
       setCoins(Response.data);
     })
     .catch((err)=>{
       console.log(err)
     })
   },[])

   const handleChange = e =>{
     setSearch(e.target.value)
   }

   const filteredCoins = coins.filter(coin=>
     coin.name.toLowerCase().includes(search.toLowerCase())
   )



  return (
    
    <div className="coin-App">
    <div className="coin-search">
      <h1 className="coin-text">Search A Currency</h1>
      <form>
      <input type="text" className="coin-input" onChange={handleChange} placeholder="Search Currency"/>
      </form>
    </div>
    {filteredCoins.map(coin => {
      return (
        <Coin 
        key ={coin.id} 
        name={coin.name} 
        image={coin.image}
        symbol={coin.symbol}
        marketCap={coin.market_cap}
        price={coin.current_price} 
        priceChange={coin.price_change_percentage_24h}
        volume={coin.total_volume}
        />
      )
    })}

    </div>

  );
}

export default App;
