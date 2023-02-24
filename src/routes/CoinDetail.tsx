import { Route, Routes, useLocation, useParams } from "react-router";
import styled from "styled-components";
import { CircularProgress, Switch } from "@mui/material";
import { CoinDetailData, CoinPriceData } from "../interface/Coin";
import { getCoinDetail, getCoinPrice } from "../common/api/axios";
import { Link } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRecoilState } from "recoil";
import { themeSelectAtom } from "../store/Atom";



const Section = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.header<{marginTop?:string}>`
  width: 500px;
  margin-top: ${props => props.marginTop ? props.marginTop : "0px"};
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    width: 100% !important;
  }
`;
const Title = styled.h1`
  font-size: 30px;
  color: ${props => props.theme.accentColor};
`;
const IndicatorWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const OuterBox = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.innerBoxColor};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.textColor};
`;
const Taps = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px; 
`;
const Tap = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: "black";
  background-color: ${(props) => props.theme.accentColor};
  opacity: ${(props) => props.isActive ? 0.5 : 1};
`;
const BackBtn = styled.div`
  cursor: pointer;
`;




function CoinDetail(){
  const { coinId } = useParams();
  const { pathname } = useLocation();
  const [mode, setMode] = useRecoilState<string>(themeSelectAtom);

  const {isLoading: detailLoading, data: detailData} = useQuery<CoinDetailData>(["coinDetail", coinId], () => getCoinDetail(coinId!));
  const {isLoading: priceLoading, data: priceData} = useQuery<CoinPriceData>(["coinPrice", coinId], () => getCoinPrice(coinId!));

  const MaterialUISwitch = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
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

  return (
    <Section>
      <Header>
        <BackBtn>
          <Link to={`/`}>
            <ArrowBackIosIcon color="warning" />
          </Link>
        </BackBtn>
        <Title>{detailData?.name || "..."}</Title>
        <MaterialUISwitch checked={mode === "dark" ? true : false} onClick={() => setMode((prev) => prev === "dark" ? "light" : "dark")}/>
      </Header>
      <OuterBox>
        {detailLoading && priceLoading ? 
          <IndicatorWrap>
            <CircularProgress />
          </IndicatorWrap>
          :
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{detailData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>{detailData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{priceData?.quotes.USD.price.toFixed(2)}</span>
              </OverviewItem>
            </Overview>
            <Description>{detailData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply: </span>
                <span>{priceData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{priceData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Taps>
              <Link to={`/detail/${coinId}/chart`}>
                <Tap isActive={pathname !== `/detail/${coinId}/chart`}>
                  Chart
                </Tap>
              </Link>
              <Link to={`/detail/${coinId}/price`}>
                <Tap isActive={pathname !== `/detail/${coinId}/price`}>
                  Price
                </Tap>
              </Link>
            </Taps>

            <Routes>
              <Route path={`chart`} element={<Chart coinId={coinId} />} />
              <Route path={`price`} element={<Price priceData={priceData?.quotes.USD} />} />
            </Routes>
          </>
        }
      </OuterBox>
    </Section>
  )
}

export default CoinDetail;