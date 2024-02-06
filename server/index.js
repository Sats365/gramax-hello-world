import express from "express";
import fs from "fs";

const app = express();
const port = 3000;
const filePath = "./dist/bundle.js";

app.get("/plugin", (req, res) => {
	fs.readFile(filePath, (err, data) => {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.end("Internal Server Error");
		} else {
			res.setHeader("Content-Type", "application/javascript");
			res.send(data);
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
