import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
    const [HistoryData, setHistoryData] = useState([]);

    useEffect(() => {
        axios.get("http://3.35.14.224/api/history").then((response) => {
            if (response.data.success) {
                // console.log(response.data.data);
                setHistoryData([...response.data.data].reverse());
            } else {
                alert("데이터 로딩 실패");
            }
        });
    }, []);

    const renderHistory = HistoryData.map((row, index) => {
        let color = "black";
        if (row.outcome === "lose") {
            color = "red";
        }
        return (
            <tr
                key={index}
            >
                <td style={{ padding: "1rem" }}>{row.id}</td>
                <td style={{ padding: "1rem" }}>{row.position}</td>
                <td style={{ padding: "1rem" }}>{row.date}</td>
                <td style={{ padding: "1rem", textAlign: "end" }}>
                    {row.price.toFixed(2)}
                </td>
                <td style={{ padding: "1rem", textAlign: "end" }}>
                    {row.balance.toFixed(2)}
                </td>
                <td style={{ padding: "1rem", textAlign: "end", color: color, fontSize: "0.8rem" }}>
                    {row.profit.toFixed(2)}
                    <br />({row.ror.toFixed(2)} %)
                </td>
                <td style={{ padding: "1rem", textAlign: "end", fontSize: "0.8rem" }}>
                    {row.totalProfit.toFixed(2)}
                    <br />({row.hpr.toFixed(2)} %)
                </td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
                <th>#</th>
                <th>포지션</th>
                <th>시간</th>
                <th>가격</th>
                <th>자산</th>
                <th>수익</th>
                <th>누적 수익</th>
            </thead>
            {renderHistory}
        </table>
    );
};

export default History;
