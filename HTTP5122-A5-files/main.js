window.onload = onLoadFn;

function onLoadFn() {

    let btnTorontoCountry = document.getElementById("Toronto");
    let btnDubaiCountry=document.getElementById("Yourtown");
    let locationElement = document.getElementById("error");
    let temperature = document.getElementById("temperature");
    let conditions = document.getElementById("conditions");
    let location = document.getElementById("location");
    let output = document.getElementById("output");
    let feels = document.getElementById("feels");
    let wind = document.getElementById("wind");
    let icon=document.getElementById("icon");


    btnTorontoCountry.addEventListener("click", function () { 
        GetValues("Toronto");

    });
    btnDubaiCountry.addEventListener("click", function () { 
        GetValues("Dubai");

    });

        // getting the API Key Value
        async function getAPIKey() {
            try {
                const response = await fetch("/api-key.txt");
                if (!response.ok) {
                    output.style.display="none";
                    throw new Error(`Response status: ${response.status}`);
                }
                const apiKey = await response.text();
                // console.log(apiKey)
                return apiKey;
            } catch (e) {
                locationElement.innerHTML = e;
            }
        }

        
        // Function to get the value for any city depending on the param.
        async function GetValues(city) {
            try {
                const apiKeyValue = await getAPIKey();
                // console.log(apiKeyValue)
                // console.log(getDataCountryValue)
                // console.log(getDataCityValue)
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyValue}`
                );
                // console.log(response)
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const responseData = await response.json();
                // console.log(responseData)
                // locationElement.innerHTML = responseData.sys.country + "  " + responseData.name;

                
                output.style.display="block";
                
                // convert Kelvin to Celsius
                // reflection for the temp
                temperature.innerHTML =
                `${Math.round(responseData.main.temp- 273.15)}°C`;
                // console.log(responseData.main.feels_like- 273.15)
                // console.log(responseData.wind.speed)
                // reflection for the feels like 
                feels.innerHTML =
                    `${Math.round(responseData.main.feels_like - 273.15)}°C`;
                
                // reflection for the wind speed
                wind.innerHTML =
                `${responseData.wind.speed}k/h`;

                // I can do here the conditions not with the city, can do it with the conditions cloud or sunny
                if (city === "Dubai") {
                    
                    icon.innerHTML=`<img src="/images/sunny-svgrepo-com.svg" alt="">`
                } else {
                    icon.innerHTML=`<img src="/images/cloud.svg" alt="">`
                    
                }
                location.innerHTML = city;
                
                let condition = responseData.weather;
                // console.log(responseData.weather)
                for (let i = 0; i < condition.length; i++) {
                    let conditionArray = [];
                    conditionArray.push(condition[i]);
                    // console.log(conditionArray[0].description)
                    conditions.innerHTML = conditionArray[0].description.charAt(0).toUpperCase() + conditionArray[0].description.slice(1) + ".";
                }

                return responseData;
            } catch (e) {
                locationElement.innerHTML = e;
            }
        }
};