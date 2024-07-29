// 01
const express = require("express")
const app = express();

const hbs = require("hbs")
app.set("view engine" , "hbs")
const path = require("path")

const publicDirectory = path.join(__dirname , "../public")
app.use(express.static(publicDirectory))

// 02
const port = process.env.PORT || 3000

// 03
app.get("/" ,(req , res)=>{
    res.render("index")
})

const geocode = require("./tools/geocode");
const foreCast = require("./tools/forecast");
app.get("/weather" , (req , res)=>{
    const addr = req.query.address
    if(!addr) { return res.send("You must provide address")}
    geocode(addr , (error , data)=>{
        if(error) { return res.send({error})}
        foreCast(data.longtitude , data.latitude , (error , foreCastData)=>{
            if(error) { return res.send({error})}
            res.send({
                forcast : foreCastData,
                location : addr,
                latitude: data.latitude,
                longitude: data.longtitude 
            }) 
        })
    })
})

app.get("*" , (req , res)=>{
    res.send("404 Page Not Found")
})
//04
app.listen(port ,()=>{console.log(`You are listening on port ${port}`)})
