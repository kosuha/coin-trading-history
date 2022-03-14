import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexChart from "react-apexcharts";

const ChartData = () => {
    const [Data, setData] = useState({});
    // const [RorData, setRorData] = useState([]);
    // const [buyandholdData, setBuyandholdData] = useState([]);

    useEffect(() => {
        axios.get("http://3.35.14.224/api/chart").then((response) => {
            if (response.data.success) {
                setData(response.data.data);
            } else {
                alert("데이터 로딩 실패");
            }
        });
    }, []);

    return (
        <div>
            <ApexChart
                type="line"
                series={[
                    {
                        name: "수익률",
                        data: Data.ror,
                    },
                    {
                        name: "Buy & Hold",
                        data: Data.buyandhold,
                    },
                ]}
                options={{
                    theme: {
                        mode: "light",
                    },
                    colors: ["#4CAF50", "#008FFB"],
                    chart: {
                        toolbar: {
                            show: false,
							tools: {
								zoom: false,
								zoomin: false,
								zoomout: false
							}
                        },
                        background: "transparent",
                    },
                    stroke: {
                        curve: "smooth",
                        width: 2.5,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                        labels: { show: false },
                        type: "datetime",
                        categories: Data.date,
                    },
                }}
            />
        </div>
    );
};

export default ChartData;
