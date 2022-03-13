const express = require("express");
const app = express();
const path = require("path");
const mysql = require('mysql');
const conn = require("./config/conn.json");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const db_info = {
    host: conn.host,
    port: conn.port,
    user: conn.user,
    password: conn.password,
    database: conn.database
};

const db = mysql.createConnection(db_info);
db.connect();

// app.use(express.static("client/build"));

// app.get("/", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
// });

app.get("/api/history", (req, res) => {
	const query = "SELECT * FROM history";
	db.query(query, (err, rows, fields) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({
			success: true,
			data: rows
		})
	});
})

app.get("/api/chart", (req, res) => {
	const query = "SELECT * FROM history";
	db.query(query, (err, rows, fields) => {
		if (err) return res.json({ success: false, err });
		const startBalance = rows[0].balance;
		const startPrice = rows[0].price;
		let newRow = { date: [], ror: [], buyandhold: [] };
		rows.map((row, index) => {
			newRow.date[index] = row.date;
			newRow.ror[index] = (row.balance - startBalance) / startBalance * 100;
			newRow.buyandhold[index] = (row.price - startPrice) / startPrice * 100;
		});
		return res.status(200).send({
			success: true,
			data: newRow
		})
	});
})

app.listen(80, () => console.log("### Start API Server ###"));