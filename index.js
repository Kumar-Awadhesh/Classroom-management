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

app.put("/students/:id", (req, res) =>{
    try{
        let studentId = parseInt(req.params.id);
        let data = fs.readFileSync("./db.json", "utf-8");
        let parsedData = JSON.parse(data);
        console.log(parsedData.students)

        if(!Array.isArray(parsedData.students)){
            return res.status(500).send("array not found")
        }

        const studentIndex = parsedData.students.findIndex(student => student.id === studentId)

        if(studentIndex === -1){
            res.status(404).send("student not found!")
        }
        parsedData.students[studentIndex] = {...parsedData.students[studentIndex], ...req.body}

        fs.writeFileSync("./db.json", JSON.stringify(parsedData, null, 2));
        res.status(200).send("Student Data Updated Successully!")
    } catch(err){
        res.status(500).send({error: "somthing went wrong", detail: err.message});
    }
})

app.put("/classes/:id", (req, res) =>{
    try{
        let classId = parseInt(req.params.id);
        let data = fs.readFileSync("./db.json", "utf-8");
        let parsedData = JSON.parse(data);
        console.log(parsedData.classes)

        if(!Array.isArray(parsedData.classes)){
            return res.status(500).send("array not found")
        }

        const classIndex = parsedData.classes.findIndex(clas => clas.id === classId)

        if(classIndex === -1){
            res.status(404).send("student not found!")
        }
        parsedData.classes[classIndex] = {...parsedData.classes[classIndex], ...req.body}

        fs.writeFileSync("./db.json", JSON.stringify(parsedData, null, 2));
        res.status(200).send("Student Data Updated Successully!")
    } catch(err){
        res.status(500).send({error: "somthing went wrong", detail: err.message});
    }
})

app.put("/enrollment/:id", (req, res) =>{
    try{
        let enrollmentId = parseInt(req.params.id);
        let data = fs.readFileSync("./db.json", "utf-8");
        let parsedData = JSON.parse(data);
        console.log(parsedData.enrollment)

        if(!Array.isArray(parsedData.enrollment)){
            return res.status(500).send("array not found")
        }

        const enrollmentIndex = parsedData.enrollment.findIndex(enrollments => enrollments.id === enrollmentId)

        if(enrollmentIndex === -1){
            res.status(404).send("student not found!")
        }
        parsedData.enrollment[enrollmentIndex] = {...parsedData.enrollment[enrollmentIndex], ...req.body}

        fs.writeFileSync("./db.json", JSON.stringify(parsedData, null, 2));
        res.status(200).send("Student Data Updated Successully!")
    } catch(err){
        res.status(500).send({error: "somthing went wrong", detail: err.message});
    }
})

app.use((req, res) =>{
    res.status(404).send("error: data not found!")
})

app.listen(3000, () =>{
    console.log("server is running on http://localhost:3000")
})