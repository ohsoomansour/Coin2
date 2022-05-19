import { useQuery } from "react-query";
import { useTheme } from "styled-components";
import { fetchCoinHistory2 } from "../api";
import styled from "styled-components";


/*※https://heropy.blog/2018/11/24/css-flexible-box/
  ▶컨테이너의 주축 justify-content
  ▶아이템의 주 축 flex-direction: row(열) 또는 column (행); 
  ▶아이템의 여러 줄 묶음(줄 바꿈)을 설정: wrap(여러 줄) 또는 nowrap(일렬)
*/
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 480px;
  margin: 0 auto; 
  `;

const Overview = styled.div`
  display: flex;
  min-width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 10px;
`;


interface PriceProps {
  coinId: string;
}


interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;

}


function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv2", coinId],
    () => fetchCoinHistory2(coinId),
    {
      refetchInterval: 10000,
    }
  );


  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <Container>
          <Overview>
            <span>High:</span>
            <span>${data?.map((price) => price.high.toFixed(3))}</span>
          </Overview>
          <Overview>
            <span>Low:</span>
            <span>${data?.map((price) => price.low.toFixed(3))}</span>
          </Overview>
          <Overview>
            <span>Open:</span>
            <span>${data?.map((price) => price.open.toFixed(3))}</span>
          </Overview>
          <Overview>
            <span>Close:</span>
            <span>${data?.map((price) => price.close.toFixed(3))}</span>
          </Overview>
        </Container>



      )}
    </div>

  );
}

export default Price; 