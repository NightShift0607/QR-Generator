import express from "express";
import qr from "qr-image";
import bodyParser from "body-parser";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req,res) => {
    res.render(__dirname + "/views/main.ejs");
});


app.post("/qr", (req, res) => {
    var url = req.body.url;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('public/images/qr_image.png'));
    res.render(__dirname + "/views/img.ejs");
});


app.listen(port, () => {
    console.log(`Server running on ${port}`);
})