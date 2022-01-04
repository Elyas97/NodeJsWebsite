const request=require('request');
function getGeo(adress ,callback){
const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+adress+"+.json?access_token=pk.eyJ1IjoiaWx5YWFza293IiwiYSI6ImNreHc0a2U4YjFzbnIycG1wenljbGJrdWgifQ.DQ63M-rFVTxXVBZ4aONIqw"
request({url:url,json:true},(error,response)=>{
if(error){
    callback("Not available",undefined)
}else if(response.body.features.length==0){
    callback("No infomation from ur search",undefined)
}else{
    const latitude=response.body.features[0].center[1]
    const longtidue=response.body.features[0].center[0]
    const data={
        latitude:latitude,
        longtidue:longtidue
    }
    callback(undefined,data)

}
})


}
module.exports={
    getGeo:getGeo
}