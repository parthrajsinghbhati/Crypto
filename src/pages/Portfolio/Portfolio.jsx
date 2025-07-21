import React, { useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

const STATIC_PORTFOLIO = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', quantity: 0.5 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'eth', quantity: 2 },
  { id: 'solana', name: 'Solana', symbol: 'sol', quantity: 10 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'doge', quantity: 1000 },
  { id: 'cardano', name: 'Cardano', symbol: 'ada', quantity: 500 },
];

export const Portfolio = () => {
  const { allCoins, currency, user } = useContext(CoinContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const coinMap = React.useMemo(() => {
    const map = {};
    allCoins.forEach(coin => {
      map[coin.id] = coin;
    });
    return map;
  }, [allCoins]);

  const portfolioWithLive = STATIC_PORTFOLIO.map(holding => {
    const coin = coinMap[holding.id] || {};
    const price = coin.current_price || 0;
    const value = price * holding.quantity;
    const changePct = coin.price_change_percentage_24h || 0;
    const changeValue = value * (changePct / 100);
    return {
      ...holding,
      image: coin.image,
      price,
      value,
      changePct,
      changeValue,
    };
  });

  const totalValue = portfolioWithLive.reduce((sum, h) => sum + h.value, 0);
  const totalChange = portfolioWithLive.reduce((sum, h) => sum + h.changeValue, 0);
  const totalChangePct = totalValue ? (totalChange / totalValue) * 100 : 0;

  return (
    <div className="portfolio-container">
      <h2>Your Crypto Portfolio</h2>
      <div className="portfolio-cards screenshot-style horizontal-cards">
        {portfolioWithLive.map(holding => (
          <div className="portfolio-card screenshot-card" key={holding.id}>
            <div className="portfolio-card-header screenshot-header">
              {holding.image && <img src={holding.image} alt={holding.name} className="portfolio-card-logo screenshot-logo" />}
              <span className="portfolio-card-coin screenshot-name">{holding.name}</span>
            </div>
            <div className="portfolio-card-label">Quantity:</div>
            <div className="portfolio-card-qty">{holding.quantity} {holding.symbol.toUpperCase()}</div>
            <div className="portfolio-card-label">Current Price:</div>
            <div className="portfolio-card-price screenshot-price">{currency.symbol}{holding.price.toLocaleString()}</div>
            <div className="portfolio-card-label">Current Value:</div>
            <div className="portfolio-card-value">{currency.symbol}{holding.value.toLocaleString()}</div>
            <div className="portfolio-card-label">24h Change:</div>
            <div className="portfolio-card-badges screenshot-badges">
              <span className={`screenshot-badge ${holding.changeValue >= 0 ? 'badge-green' : 'badge-red'}`}>{holding.changeValue >= 0 ? '+' : ''}{currency.symbol}{holding.changeValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
              <span className={`screenshot-badge ${holding.changePct >= 0 ? 'badge-green' : 'badge-red'}`}>{holding.changePct >= 0 ? '+' : ''}{holding.changePct.toLocaleString(undefined, {maximumFractionDigits: 2})}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="portfolio-total screenshot-total">
        <div>Total Value: {currency.symbol}{totalValue.toLocaleString()}</div>
        <div>24h Change: <span className={totalChange >= 0 ? 'badge-green' : 'badge-red'} style={{padding:'2px 10px', borderRadius:'12px'}}>{totalChange >= 0 ? '+' : ''}{currency.symbol}{totalChange.toLocaleString(undefined, {maximumFractionDigits: 2})} ({totalChangePct >= 0 ? '+' : ''}{totalChangePct.toLocaleString(undefined, {maximumFractionDigits: 2})}%)</span></div>
      </div>
    </div>
  );
};
