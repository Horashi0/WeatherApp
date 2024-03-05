function GetWeather(url)
{
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
    })
}

export function ConvertKelvin(kelvin)
{
    kelvin = kelvin - 273.15;
    return Math.round(kelvin, 0);
}

export function Weather(formattedDate, url, current)
{
    GetWeather(url)
        .then(data => {
            if(current == 1)
            {   
                 /*temp_celsius = ConvertKelvin(data.main.temp);
                textNode = document.createTextNode(temp_celsius + "°");
                tempDisplay.appendChild(textNode);*/
                console.log(data);
            } else {
                const filteredData = data.list.filter(forecast => {
                    // Cleaning data to have valid values
                    const forecastDate = forecast.dt_txt;
                    return forecastDate == formattedDate;
                })  
                //console.log(data);
                console.log(filteredData);
            }
        })
        .catch(error => {
            console.log("Error: " + error.message);
        })
}