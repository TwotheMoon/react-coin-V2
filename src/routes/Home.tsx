import { Link } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { CoinInterface } from "../interface/Coin";
import { getCoinList, tokenImgUrl } from "../common/api/axios";
import { Button, CircularProgress, Switch } from "@mui/material";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { ethBalanceAtom, themeSelectAtom } from "../store/Atom";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";

const Section = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0px 20px;
`;
const Header = styled.header<{marginTop?:string}>`
  margin-top: ${props => props.marginTop ? props.marginTop : "0px"};
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 30px;
  color: ${props => props.theme.accentColor};
`;
const CoinList = styled.ul`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;

  @media screen and (max-width: 900px){
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 700px){
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px){
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
const CoinLogo = styled.img`
  width: 30px;
`;
const Coin = styled.li`
  background-color: ${props => props.theme.innerBoxColor};
  color: ${props => props.theme.textColor};
  max-width: 300px;
  padding: 20px 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition-duration: 0.3s;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover{
    color: ${props => props.theme.accentColor}
  }

  @media screen and (max-width: 600px){
    width: 100%;
    margin: 0 auto;
  }
`;
const IndicatorWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  span{
    color: ${props => props.theme.textColor};
    font-size: 0.8em;
    font-weight: bold;
  }
`;
const WalletBtn = styled(Button)``;

declare global {
  interface Window {
    ethereum?: any;
  }
}

function Home() {
  const {isLoading, data} = useQuery<CoinInterface[]>(["allCoins"], getCoinList);
  const [mode, setMode] = useRecoilState<string>(themeSelectAtom);
  const {account, active, activate, chainId} = useWeb3React();
  const [balance, setBalance] = useRecoilState(ethBalanceAtom);
  const injected = new InjectedConnector({supportedChainIds: [1]});
  

  const connectMM = async () => {
    try {
      await activate(injected);
      if(typeof window.ethereum !== "undefined"){
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          const balance = await web3.eth.getBalance(accounts[0]);
          const etherBalance =  web3.utils.fromWei(balance, 'ether');
          const parsedETH = Number(etherBalance).toFixed(4);

          console.log(etherBalance);
          setBalance(parsedETH);
        } catch (error) {
          
        }
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  function shortAddress(account:string | undefined | null) {
    const result = `${account?.slice(0, 4)}...${account?.slice(account?.length - 4)}`;
  return result;
  };

  const handleNetworkChanged = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params:[{ chainId: "0x1" }]
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

  const MaterialUISwitch = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    marginTop: 10,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  useEffect(() => {
    window.ethereum?.on('networkChanged', handleNetworkChanged);
    return () => {
      window.ethereum?.removeListener('networkChanged', handleNetworkChanged);
    };
  })

  return(
    <Section>
      <Header>
        <Title>Popular Tokens</Title>
        <MaterialUISwitch checked={mode === "dark" ? true : false} onClick={() => setMode((prev) => prev === "dark" ? "light" : "dark")}/>
      </Header>
      <BtnWrap>
        {!active && chainId !== 1 ? 
          <span>메타마스크 지갑이 있으신가요?</span>
          :
          <span>Balance: ~ {balance} ETH</span>
         }

        <WalletBtn 
          onClick={() => connectMM()} 
          variant={`${active ? "contained" : "outlined"}`} 
          size="small" 
          color="warning"
        >
        {!active ? "Connect Wallet" : chainId !== 1 ? "Worng Chain" :  shortAddress(account)}
        </WalletBtn>
      </BtnWrap>
      {isLoading ? 
        <IndicatorWrap>
          <CircularProgress />
        </IndicatorWrap>
          :
        <CoinList>
            {data?.slice(0, 5).map(coin => (
              <Link to={`/detail/${coin.id}`}>
                <Coin key={coin.id}>
                  <CoinLogo src={`${tokenImgUrl}${coin.symbol.toLocaleLowerCase()}`} />
                  {coin.name}
                </Coin>
              </Link>
            ))}
        </CoinList>
      }
      <Header marginTop="80px">
        <Title>Other Tokens</Title>
      </Header>
      {isLoading ?
        <IndicatorWrap>
          <CircularProgress />
        </IndicatorWrap> 
        :
        <CoinList>
            {data?.slice(6, 15).map(coin => (
              <Link to={`/detail/${coin.id}`}>
                <Coin key={coin.id}>
                  <CoinLogo src={`${tokenImgUrl}${coin.symbol.toLocaleLowerCase()}`} />
                  {coin.name}
                </Coin>
              </Link>
            ))}
        </CoinList>
       }
    </Section>
  )
}

export default Home;