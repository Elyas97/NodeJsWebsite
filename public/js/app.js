
console.log('client side javascript file')
const btn=document.getElementsByClassName("btn")[0];

const input=document.getElementById('inputs');
const output=document.getElementsByClassName('col-2')[1];
 function getWeather(){
    if(input.value){
        fetch('/weather?adress='+input.value).then((response)=>{
            response.json().then((data)=>{
                console.log(data)
                
                if(data.error){
                    alert(data.error)
                }else{
                    output.style.display="block"
                output.innerHTML=`<h1> Result </h1> <div class="result"><h2>Country: +${data.data.location.country}<h2>
                <ul>                <li>Region: ${data.data.location.region}</li>

                <li>Latitude: ${data.data.location.lat}</li>
                <li>Longitude: ${data.data.location.lon}</li>
                <li>Temperture: ${data.data.current.temperature}Celsius</li>
                <li>Weather: ${data.data.current.weather_descriptions[0]}</li>

                </ul>
                </div>`;
                }
            })
        })
    }
}
btn.addEventListener('click',getWeather)