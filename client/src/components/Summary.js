import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
	const [Data, setData] = useState({});
	
	useEffect(() => {
        axios.get("http://3.35.14.224/api/history").then((response) => {
            if (response.data.success) {
                // console.log(response.data.data);
                setData([...response.data.data].reverse());
            } else {
                alert("데이터 로딩 실패");
            }
        });
    }, []);

  return (
	<div>
		<div>
			<div>총 자산</div>
			<div>100000000 USDT</div>
		</div>
		<table>
			<tr>
				<td>투자</td>
				<td>$140</td>
			</tr>
			<tr>
				<td>원금</td>
				<td>$100</td>
			</tr>
			<tr>
				<td>총 수익</td>
				<td>$40</td>
			</tr>
		</table>
	</div>
  );
}

export default Summary