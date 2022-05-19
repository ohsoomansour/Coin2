const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) =>
  response.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
  response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
  response.json()
  );
}

/* #4.12 historical OHLC: https://api.coinpaprika.com/#tag/Coins/paths/~1coins~1{coin_id}~1ohlcv~1historical/get  
Date.now()=1634998541091 의미는 1970년 1월1일 00:00:00(UTC)을 기점으로 'milliseconds'로 표시 >Date.now()/1000 
  Math.floor(1.9): '1' vs Math.ceil(1.9): '2'
*/
export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() /1000);
  const startDate = endDate - 60*60*24*14 

  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}

export function fetchCoinHistory2(coinId: string) {
  const endDate = Math.floor(Date.now() /1000);
  const startDate = endDate 

  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}