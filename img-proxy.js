
const fs = require("fs");
const request = require("request");
const express = require("express");
const app = express();
const port = 5555;
const host = "http://node2.oyunfor.com:"+port;

app.get("/getir", function(req,res){
	res.sendFile(__dirname+"/"+req.query.src);
});

app.get("/resimgetir", function(req, res){
	if (req.query.src){
		var src = req.query.src;
		var sonSplit = src.split("/")[src.split("/").length-1];

		fs.exists(sonSplit, function(s){
			console.log(s);
			if (s!=true){
				request(src).pipe(fs.createWriteStream(sonSplit)).on("close", function(){
					fs.exists(sonSplit, function(s){
						if (s==true){
							console.log(s);
							res.send({status:"basarili", src:host+"/getir?src="+sonSplit});
						}
						else{
							res.send({status: "hata"});
						}
					})
					
				});
			}
			else{
				res.send({status: "zatenvar"});
			}
		});

	}
	
});

app.listen(port , function(){
	console.log("<<- HTTP PORT "+port+" Dinlemede ->>");
});

