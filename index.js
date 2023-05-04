const express = require('express')
const app = express()

var requests_obj = [];

app.get('/', (req, res) => {
    if(typeof req.query.clkurl == "string" && typeof req.query.ip == "string"){
        var current_request_arr = [];
        
        var base64string = req.query.clkurl;
        var bufferObj = Buffer.from(base64string, "base64");
        var decodedString = bufferObj.toString("utf8");
        
        var time_now = new Date().getTime();
        
        current_request_arr.push(req.query.ip);
        current_request_arr.push(time_now);
        current_request_arr.push(decodedString);
        
        requests_obj.push(current_request_arr);
        
        res.send("Done");
    }else{    
        res.send("Not Done");
    }
})

app.get("/results", (req,res) => {
    res.send(JSON.stringify(requests_obj));
})

app.get("/results_clear", (req, res) => {
    requests_obj = [];
    res.send("Cleared! The current object is "+JSON.stringify(requests_obj));
})

app.listen(process.env.PORT || 3000)
