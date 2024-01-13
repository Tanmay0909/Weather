const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html")
})
app.post("/",function(req,res){
  console.log(req.body.CityName);
  const query=req.body.CityName
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=23e7f1f1e5c7ffc9b0f6fe902b7a6c77&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp
      //const icon=weatherData.weather[0].icon
      //const imageURL="http://openweathermap.org/img/wn" + icon + "@2x.png"
      res.write("<h1> The temperature in "+query+" is "+temp+" degree celcius </h1>")
      //res.write("<img src=" + imageURL + ">")
  })
})
})




app.listen(9000,function(){
  console.log("Server 9000 running");
})
