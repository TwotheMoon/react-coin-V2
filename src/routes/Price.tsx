import styled from "styled-components";
import { PropsquotesData } from "../interface/Coin";

const PriceWrapper = styled.div<{isPositive? : Boolean}>`
    height: 40px;
    border-radius: 10px;
    background-color: white;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-top: 20px;
    span:nth-child(1){
        margin-left: 20px;
        font-size: 13px;
    }
    span:nth-child(2){
        margin-right: 40px;
        color: ${(props) => props.isPositive ? "lightgreen" : "red"};
    }
`;

function Price(props: PropsquotesData){
  
  function checkPositive(value: number | undefined){
    if(value) {
      return value > 0;
    }
  }

  return(
    <>
      <PriceWrapper isPositive={checkPositive(props?.priceData?.price) === true}>
          <span>Price:</span>
          <span>$ {props?.priceData?.price.toFixed(2)}</span>
      </PriceWrapper>
      <PriceWrapper isPositive={checkPositive(props?.priceData?.market_cap_change_24h) === true}>
          <span>Market change 24h:</span>
          <span>{props?.priceData?.market_cap_change_24h.toFixed(2)} %</span>
      </PriceWrapper>
      <PriceWrapper isPositive={checkPositive(props?.priceData?.percent_change_30m) === true}>
          <span>Percent Change (30m):</span>
          <span>{props?.priceData?.percent_change_30m.toFixed(2)} %</span>
      </PriceWrapper>
      <PriceWrapper isPositive={checkPositive(props?.priceData?.percent_change_1h) === true}>
          <span>Percent Change (1h):</span>
          <span>{props?.priceData?.percent_change_1h.toFixed(2)} %</span>
      </PriceWrapper>
      <PriceWrapper isPositive={checkPositive(props?.priceData?.percent_change_12h) === true}>
          <span>Percent Change (12h):</span>
          <span>{props?.priceData?.percent_change_12h.toFixed(2)} %</span>
      </PriceWrapper>
      <PriceWrapper isPositive={checkPositive(props?.priceData?.percent_change_24h) === true}>
          <span>Percent Change (24h):</span>
          <span>{props?.priceData?.percent_change_24h.toFixed(2)} %</span>
      </PriceWrapper>
    </>
  )
}

export default Price;