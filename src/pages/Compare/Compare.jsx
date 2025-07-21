import React, { useContext, useState } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { useMediaQuery } from 'react-responsive';
import './Compare.css';

export const Compare = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const coin1 = allCoins.find(c => c.name.toLowerCase() === input1.toLowerCase());
  const coin2 = allCoins.find(c => c.name.toLowerCase() === input2.toLowerCase());

  const infoRows = [
    {
      label: 'Crypto Market Rank',
      get: coin => coin ? coin.market_cap_rank : '--',
    },
    {
      label: 'Current Price',
      get: coin => coin ? `${currency.symbol} ${coin.current_price?.toLocaleString()}` : '--',
    },
    !isMobile && {
      label: 'Market Cap',
      get: coin => coin ? `${currency.symbol} ${coin.market_cap?.toLocaleString()}` : '--',
    },
    {
      label: '24 Hour High',
      get: coin => coin ? `${currency.symbol} ${coin.high_24h?.toLocaleString()}` : '--',
    },
    {
      label: '24 Hour Low',
      get: coin => coin ? `${currency.symbol} ${coin.low_24h?.toLocaleString()}` : '--',
    },
    {
      label: '24H Change',
      get: coin => coin ? `${Math.floor(coin.price_change_percentage_24h * 100) / 100}%` : '--',
      color: coin => coin && coin.price_change_percentage_24h > 0 ? '#00d515' : '#ff4646',
    },
  ].filter(Boolean);

  return (
    <div className="compare-page">
      <div className="compare-searches">
        <div className="compare-search-form">
          <input
            list="coinlist1"
            value={input1}
            onChange={e => setInput1(e.target.value)}
            placeholder="Search first coin..."
            required
          />
          <datalist id="coinlist1">
            {allCoins.map((coin, idx) => (
              <option key={idx} value={coin.name} />
            ))}
          </datalist>
        </div>
        <div className="compare-search-form">
          <input
            list="coinlist2"
            value={input2}
            onChange={e => setInput2(e.target.value)}
            placeholder="Search second coin..."
            required
          />
          <datalist id="coinlist2">
            {allCoins.map((coin, idx) => (
              <option key={idx} value={coin.name} />
            ))}
          </datalist>
        </div>
      </div>
      <div className="compare-table-wrapper">
        <div className="compare-table">
          <div className="compare-table-header">
            <div className="compare-table-label"></div>
            <div className="compare-table-coin">
              {coin1 && (
                <div className="coin-name">
                  <img src={coin1.image} alt={coin1.name} />
                  <p><b>{coin1.name} ({coin1.symbol.toUpperCase()})</b></p>
                </div>
              )}
            </div>
            <div className="compare-table-coin">
              {coin2 && (
                <div className="coin-name">
                  <img src={coin2.image} alt={coin2.name} />
                  <p><b>{coin2.name} ({coin2.symbol.toUpperCase()})</b></p>
                </div>
              )}
            </div>
          </div>
          {infoRows.map((row, idx) => (
            <div className="compare-table-row" key={idx}>
              <div className="compare-table-label">{row.label}</div>
              <div className="compare-table-value" style={row.color ? { color: row.color(coin1) } : {}}>{row.get(coin1)}</div>
              <div className="compare-table-value" style={row.color ? { color: row.color(coin2) } : {}}>{row.get(coin2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
