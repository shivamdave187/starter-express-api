const express = require('express')
const app = express()

var requests_obj = [];

app.get('/', (req, res) => {
    if(typeof req.query.clkurl == "string"){
        var base64string = req.query.clkurl;
        var bufferObj = Buffer.from(base64string, "base64");
        var decodedString = bufferObj.toString("utf8");
        requests_obj.push(decodedString);
        
        res.send("Done");
    }else{    
        res.send("Not Done");
    }
})

app.get("/results", (req,res) => {
    res.send(JSON.stringify(requests_obj));
})

app.get("/results_clear", (req, res) => {
    requests_obj = {};
    res.send("Cleared! The current object is "+JSON.stringify(requests_obj));
})

app.listen(process.env.PORT || 3000)
