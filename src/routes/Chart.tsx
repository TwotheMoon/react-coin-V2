import { useQuery } from "react-query";
import { CoinChartData, CoinIdProps } from "../interface/Coin";
import { getCoinChart } from "../common/api/axios";
import ApexCharts from "react-apexcharts";


function Chart({ coinId }: CoinIdProps) {
    const { isLoading, data } = useQuery<CoinChartData[]>(["coinChart", coinId], () => getCoinChart(coinId!));

    const chartData = data?.map((list:CoinChartData) => {
      return {
        x: new Date(list.time_close * 1000) ,
        y: [Number(list.open), Number(list.high), Number(list.low), Number(list.close)]
      };
    });

    return (
        <div>
            {isLoading ? ("Loading chart..."
            ) : (
              
                <ApexCharts 
                  type="candlestick"
                  series={[
                    {
                      name: "Price",
                      data: chartData as unknown as number[]
                    },
                  ]}
                  options={{
                    theme: {
                      mode: "dark",
                    },
                    chart: {
                      height: 300,
                      width: 500,
                      toolbar: {
                        show: false,
                      },
                      background: "transparent",
                    },
                    xaxis: {
                      axisBorder: { show: true },
                      axisTicks: { show: true },
                      labels: { show: true },
                      type: "datetime",
                      categories: data?.map((price) => price.time_close),
                    }, 
                    yaxis:{
                      show: false,
                    },
                  }}
                 />
            )}
        </div>
    );
}

export default Chart;