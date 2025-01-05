const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/students", (req, res) =>{
    fs.readFile("./db.json", "utf-8", (err, data) =>{
        if(err){
            res.status(404).send("somthing went wong", err);
        }
        else{
            let parsedData = JSON.parse(data);
            res.send(parsedData.students)
        }
    });
})

app.get("/classes", (req, res) =>{
    fs.readFile("./db.json", "utf-8", (err, data) =>{
        if(err){
            res.status(404).send("somthing went wong", err);
        }
        else{
            let parsedData = JSON.parse(data);
            res.send(parsedData.classes)
        }
    });
})

app.get("/enrollment", (req, res) =>{
    fs.readFile("./db.json", "utf-8", (err, data) =>{
        if(err){
            res.status(404).send("somthing went wong", err);
        }
        else{
            let parsedData = JSON.parse(data);
            res.send(parsedData.enrollment)
        }
    });
})

app.post("/students", (req, res) =>{
    let data = fs.readFileSync("./db.json", "utf-8");
    console.log(data)
    let parsedData = JSON.parse(data);
    parsedData.students.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(parsedData, null, 2));
    res.status(200).send("Data Recieved Successfully!")
})

app.post("/classes", (req, res) =>{
    let data = fs.readFileSync("./db.json", "utf-8");
    console.log(data)
    let parsedData = JSON.parse(data);
    parsedData.classes.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(parsedData, null, 2));
    res.status(200).send("Data Recieved Successfully!")
})

app.post("/enrollment", (req, res) =>{
    let data = fs.readFileSync("./db.json", "utf-8");
    console.log(data)
    let parsedData = JSON.parse(data);
    parsedData.enrollment.push(req.body);
    fs.writeFileSync("./db.json", JSON.stringify(parsedData, null, 2));
    res.status(200).send("Data Recieved Successfully!")
})



app.use((req, res) =>{
    res.status(404).send("error: data not found!")
})

app.listen(3000, () =>{
    console.log("server is running on http://localhost:3000")
})