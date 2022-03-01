const express = require("express");
const app = express();
const mysql = require('mysql');
const conn = require("./config/conn.json");

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

app.get("/", (req, res) => {
    res.send("Hello World");
});

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

app.listen(3000, () => console.log("### Start API Server ###"));