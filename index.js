var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")
var prompt = require('prompt-sync')();

const app=express()

app.use((require("body-parser")).json())
app.use(express.static('public'))
app.use((require("body-parser")).urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connecting to Dtabase"))
db.once('open',()=> console.log("connected to Database"))

app.post("sign_up",(req,res) => {
    var name= req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("record inserted succesfully")
    })
    return res.redirect('signup_succesful.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000") 