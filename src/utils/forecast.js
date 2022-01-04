const request=require('request');
const forecast=(latitude,longtitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=2d5e835051ce2a9de607f1b959f7f8c5&query=" + latitude + "," +longtitude + "&units=m";
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect",undefined)
        }else if(response.body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,response.body)
        }
    
    })

}
module.exports=forecast;