let form = document.getElementById("form1")
let address = document.getElementById("address")
let parag = document.getElementById("parag")
let details = document.getElementById("details")
let country = document.getElementById("country")
let latitude = document.getElementById("latitude")
let longitude = document.getElementById("longitude")
let forecast = document.getElementById("forecast")

form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    console.log(address.value);
    weatherFunction();
    form.reset();
})

let weatherFunction = async()=>{

    try {
        const res = await fetch("http://localhost:3000/weather?address="+address.value);
        const data = await res.json();
        console.log(data);
        country.innerText = "Country is : ";
        forecast.innerText = "ForeCast is : ";
        latitude.innerText = "Latitude is : "; 
        longitude.innerText = "Longitude is : ";
        country.style.visibility ="hidden";
        latitude.style.visibility ="hidden";
        longitude.style.visibility ="hidden";
        forecast.style.visibility ="hidden";
    
        if(data.error){
            parag.style.display = "none";
            country.style.visibility = "visible";
            country.innerText = "ERROR : " + data.error
            latitude.style.visibility ="hidden";
            longitude.style.visibility ="hidden";
            forecast.style.visibility ="hidden";
        }
        else {
            var countryName = document.createElement("span");
            countryName.innerText = data.location;
            countryName.style.color = "red";

            var forecastStatus = document.createElement("span");
            forecastStatus.innerText = data.forcast;
            forecastStatus.style.color = "red";

            var latitudeData = document.createElement("span");
            latitudeData.innerText = data.latitude;
            latitudeData.style.color = "red";

            var longitudeData = document.createElement("span");
            longitudeData.innerText = data.longitude;
            longitudeData.style.color = "red"; 

            country.appendChild(countryName);
            parag.style.display = "none";
            country.style.visibility = "visible";
            setTimeout(() => {
                latitude.appendChild(latitudeData);
                latitude.style.visibility = "visible";
                  setTimeout(() => {
                    longitude.appendChild(longitudeData);
                    longitude.style.visibility = "visible";
                      setTimeout(() => {
                        forecast.appendChild(forecastStatus);
                        forecast.style.visibility = "visible";
                      }, 1000); 
                   }, 1000); 
            }, 1000); 
        }
    }
    catch(e){ console.log(e)}
}
