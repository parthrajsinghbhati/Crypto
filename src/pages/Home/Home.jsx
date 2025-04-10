import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {

    const {allCoins, currency} = useContext(CoinContext);
    const [displayCoins, setDisplayCoins] = useState([]);

    useEffect(() => {
        setDisplayCoins(allCoins);
    },[allCoins])

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>Welcome to the world's largest cryptocurrency price tracker, where you can explore real-time market data and analyse trends across thousands of digital assets.</p>
        <form>
          <input type="text" placeholder="Search crypto..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{textAlign:'center'}}>24H Change</p>
            <p className="market-cap">Market Cap</p>
        </div>
        {
            displayCoins.slice(0, 10).map((coin,index) => (
                <div className="table-layout" key={index}>
                    <p>{coin.market_cap_rank}</p>
                    <div>
                        <img src={coin.image} alt='' />
                        <p>{coin.name + ' - ' +coin.symbol}</p>
                    </div>
                    <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
                    <p className={coin.price_change_percentage_24h>0 ? 'green' : 'red'}>{Math.floor(coin.price_change_percentage_24h*100)/100}</p>
                    <p className="market-cap">{currency.symbol} {coin.market_cap.toLocaleString()}</p>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default Home;
