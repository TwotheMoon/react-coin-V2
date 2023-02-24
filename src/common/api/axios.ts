import axios from "axios";

export const tokenImgUrl = "https://coinicons-api.vercel.app/api/icon/";

export const customAxios = axios.create({
  baseURL: "https://api.coinpaprika.com/v1",
  headers: {
    "Content-Type": "application/json",
  }
});

customAxios.interceptors.request.use(
  function (config){
    return config;

  },
  function(error){

  return Promise.reject(error);
  }
);

export const getCoinList = async () => {
  return await customAxios.get("/coins").then(res => res.data);
}

export const getCoinDetail = async (coinId:string) => {
  return await customAxios.get(`/coins/${coinId}`).then(res => res.data);
}

export const getCoinPrice = async (coinId:string) => {
  return await customAxios.get(`/tickers/${coinId}`).then(res => res.data);
}

export const getCoinChart = async (coinId:string) => {
  return await axios.get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(res => res.data);
}