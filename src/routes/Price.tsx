import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const PriceBoxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  text-align: center;
  margin: 5px 0px;
`;

const PriceBoxGridHeader = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const PriceBoxTitle = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`;

const PriceBoxData = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

function Price() {
  const coinId = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(`${coinId}`),
    {
      refetchInterval: 5000,
    }
  );
  const highest = data?.reduce((prev, curr) => {
    return curr.high > prev.high ? curr : prev;
  });

  const lowest = data?.reduce((prev, curr) => {
    return curr.low < prev.low ? curr : prev;
  });

  const percentage = (prev: any, curr: any) => {
    return (((parseInt(curr) - parseInt(prev)) * 100) / parseInt(curr)).toFixed(
      2
    );
  };

  const percentageRecord = (record: any, curr: any) => {
    return (
      ((parseInt(record) - parseInt(curr)) * 100) /
      parseInt(curr)
    ).toFixed(2);
  };

  return (
    <div>
      {isLoading ? (
        "Loading price info..."
      ) : (
        <Container>
          <PriceBoxTitle>Latest</PriceBoxTitle>
          <PriceBox>
            <PriceBoxGrid>
              <PriceBoxGridHeader>As of date: </PriceBoxGridHeader>
              <span>
                {data
                  ? new Date(
                      data[data.length - 1].time_close * 1000
                    ).toDateString()
                  : "N/A"}
              </span>
            </PriceBoxGrid>
            <PriceBoxGrid>
              <PriceBoxGridHeader>Close: </PriceBoxGridHeader>
              <PriceBoxData>
                <span>${data ? data[data.length - 1].close : "N/A"}</span>
                <span
                  style={
                    (data
                      ? percentage(
                          data[data.length - 2].close,
                          data[data.length - 1].close
                        )
                      : 0) < 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {data
                    ? percentage(
                        data[data.length - 2].close,
                        data[data.length - 1].close
                      )
                    : "N/A"}
                  %
                </span>
              </PriceBoxData>
            </PriceBoxGrid>
            <PriceBoxGrid>
              <PriceBoxGridHeader>High: </PriceBoxGridHeader>
              <PriceBoxData>
                <span>${data ? data[data.length - 1].high : "N/A"}</span>
                <span
                  style={
                    (data
                      ? percentage(
                          data[data.length - 2].high,
                          data[data.length - 1].high
                        )
                      : 0) < 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {data
                    ? percentage(
                        data[data.length - 2].high,
                        data[data.length - 1].high
                      )
                    : "N/A"}
                  %
                </span>
              </PriceBoxData>
            </PriceBoxGrid>
            <PriceBoxGrid>
              <PriceBoxGridHeader>Low: </PriceBoxGridHeader>
              <PriceBoxData>
                <span>${data ? data[data.length - 1].low : "N/A"}</span>
                <span
                  style={
                    (data
                      ? percentage(
                          data[data.length - 2].low,
                          data[data.length - 1].low
                        )
                      : 0) < 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {data
                    ? percentage(
                        data[data.length - 2].low,
                        data[data.length - 1].low
                      )
                    : "N/A"}
                  %
                </span>
              </PriceBoxData>
            </PriceBoxGrid>
            <PriceBoxGrid>
              <PriceBoxGridHeader>Open: </PriceBoxGridHeader>
              <PriceBoxData>
                <span>${data ? data[data.length - 1].open : "N/A"}</span>
                <span
                  style={
                    (data
                      ? percentage(
                          data[data.length - 2].open,
                          data[data.length - 1].open
                        )
                      : 0) < 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {data
                    ? percentage(
                        data[data.length - 2].open,
                        data[data.length - 1].open
                      )
                    : "N/A"}
                  %
                </span>
              </PriceBoxData>
            </PriceBoxGrid>
          </PriceBox>
          <PriceBoxTitle>Monthly Records</PriceBoxTitle>
          <PriceBox>
            <PriceBoxGrid>
              <PriceBoxGridHeader>Lowest: </PriceBoxGridHeader>
              <PriceBoxData>
                <span>${lowest?.low}</span>
                <span
                  style={
                    (lowest && data
                      ? percentageRecord(
                          lowest.low,
                          data[data.length - 1].close
                        )
                      : 0) < 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {lowest && data
                    ? percentageRecord(lowest.low, data[data.length - 1].close)
                    : "N/A"}
                  %
                </span>
              </PriceBoxData>
            </PriceBoxGrid>
            <PriceBoxGrid>
              <PriceBoxGridHeader>Highest:</PriceBoxGridHeader>
              <PriceBoxData>
                <span>${highest?.high}</span>
                <span
                  style={
                    (highest && data
                      ? percentageRecord(
                          highest.high,
                          data[data.length - 1].close
                        )
                      : 0) < 0
                      ? { color: "red" }
                      : { color: "green" }
                  }
                >
                  {highest && data
                    ? percentageRecord(
                        highest.high,
                        data[data.length - 1].close
                      )
                    : "N/A"}
                  %
                </span>
              </PriceBoxData>
            </PriceBoxGrid>
          </PriceBox>
        </Container>
      )}
    </div>
  );
}

export default Price;
