import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
	const [HistoryData, setHistoryData] = useState({});

    useEffect(() => {
        axios
            .get(`http://3.35.14.224/api/history`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data);
                    setHistoryData(response.data);
                } else {
                    alert("데이터 로딩 실패");
                }
            });
    }, []);

    return (
		<div>
			hi!
		</div>
	);
};

export default History;
