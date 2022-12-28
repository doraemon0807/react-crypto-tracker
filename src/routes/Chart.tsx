import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";

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

interface ChartProps {
  coinId: string;
}

function Chart() {
  const coinId = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(`${coinId}`),
    {
      refetchInterval: 5000,
    }
  );

  interface IohlcvData {}

  return (
    <div>
      {isLoading ? (
        "Loading chart...."
      ) : (
        <ApexChart
          series={
            [
              {
                type: "candlestick",
                name: "price",
                data: data?.map((price) => {
                  return {
                    x: price.time_close * 1000,
                    y: [
                      parseInt(price.open),
                      parseInt(price.high),
                      parseInt(price.low),
                      parseInt(price.close),
                    ],
                    description: ["Open", "High", "Low", "Close"],
                  };
                }),
              },
            ] as any
          }
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 400,
              width: 400,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
            },

            tooltip: {
              custom: function ({ seriesIndex, dataPointIndex, w }) {
                const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
                const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
                return `<div>
                  <div>Open: ${o}</div>
                  <div>High: ${h}</div>
                  <div>Low: ${l}</div>
                  <div>Close: ${c}</div>
                  </div>`;
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
