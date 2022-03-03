import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
	const [HistoryData, setHistoryData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://coin-trading-bot.xyz/api/history`)
            .then((response) => {
                if (response.data.success) {
                    // console.log(response.data.data);
                    setHistoryData([...response.data.data].reverse());
                } else {
                    alert("데이터 로딩 실패");
                }
            });
    }, []);

	const renderHistory = HistoryData.map((row, index) => {
        return (
            <div 
				key={index} 
				style={{
					padding: "1rem"
				}
			}>
				<div>{row.date}</div>
				{/* <div>가격: {row.price} USDT</div> */}
				<div>자산: {row.balance} USDT</div>
				<div>수익률: {Math.round((row.balance - 100) * 100) / 100} %</div>
			</div>
        );
    });

    return (
		<div>
			{renderHistory}
		</div>
	);
};

export default History;
