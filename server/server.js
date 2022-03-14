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

app.get("/api/history", (req, res) => {
	const query = "SELECT * FROM history";
	db.query(query, (err, rows, fields) => {
		if (err) return res.json({ success: false, err });
		
		const startBalance = rows[0].balance;

		rows.map((row, index) => {
			row.totalProfit = row.balance - startBalance;
			row.hpr = Math.round(row.totalProfit / startBalance * 100 * 100) / 100;

			if (index != 0) {
				row.profit = row.balance - rows[index - 1].balance;
				row.ror = Math.round(row.profit / rows[index - 1].balance * 100 * 100) / 100;
				
				if (index % 2 == 1) {
					row.position = "short";
				} else {
					row.position = "long";
				}

				if (row.ror > 0) {
					row.outcome = "win";
				} else if (row.ror < 0) {
					row.outcome = "lose";
				} else {
					row.outcome = "draw";
				}
			} else {
				row.profit = 0;
				row.outcome = "draw";
				row.ror = 0;
				row.position = "long";
			}
		});

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
			newRow.ror[index] = Math.floor((row.balance - startBalance) / startBalance * 100 * 100) / 100;
			newRow.buyandhold[index] = Math.floor((row.price - startPrice) / startPrice * 100 * 100) / 100;
		});
		return res.status(200).send({
			success: true,
			data: newRow
		})
	});
})

app.listen(80, () => console.log("### Start API Server ###"));