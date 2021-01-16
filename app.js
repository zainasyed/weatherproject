const express= require("express");
const https = require("https");
const bodyParser  = require ("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.get( "/",function(req,res){
  res.sendFile(__dirname + "/index.html" );
});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "1b63e63b8a6fc8f68c054562265ccd80";
  const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
    console.log(data);
  const weatherData =  JSON.parse(data);
  const temp = weatherData.main.temp;
  const des = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
  res.write("<p>The weather is currently" + des+ "</p>");
  res.write("<h1>The temperature in " + query+ " is " + temp +" degrees celcius</h1>");
  res.write("<img src="+imageUrl+">");
  res.send();
})




});

});

app.listen(3000, function(){
  console.log("server running on port 3000");
});
