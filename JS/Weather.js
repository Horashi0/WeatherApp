    require('dotenv').config();
const prompt = require('prompt-sync')();

const forecastUrl = "https://horashio.co.uk:5000/forecast?q=";
const today = new Date();
var maxDate = new Date(today);

// number is referring to day + 1. day_1 is tomorrow
var day_1 = new Date(today);
var day_2 = new Date(today);
var day_3 = new Date(today);
var day_4 = new Date(today);

var number = 1;

maxDate.setDate(today.getDate() + 4);

// setting days to dates
day_1.setDate(today.getDate() + 1);
day_2.setDate(today.getDate() + 2);
day_3.setDate(today.getDate() + 3);
day_4.setDate(today.getDate() + 4);

maxDate = maxDate.toISOString().slice(0, 10);
day_1 = day_1.toISOString().slice(0, 10);
day_2 = day_2.toISOString().slice(0, 10);
day_3 = day_3.toISOString().slice(0, 10);
day_4 = day_4.toISOString().slice(0, 10);

const forecastDays = [day_1, day_2, day_3, day_4];
const forecastTimes = [];

var city = prompt("Please input a city: ");
var capitalisedCity = city.charAt(0).toUpperCase() + city.slice(1);
const url = `${forecastUrl}${capitalisedCity}`;
const axios = require('axios');

function getWeather() {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

getWeather()
    .then(data => {
        // Data returns list of forecasts
        /*for (let i = 0; i < data.list.length; i++) {
            // Iterating through lists
            let forecast = data.list[i];
            //console.log(i, forecast)
            if (forecast.dt_txt.includes(maxDate)) {
                // Once max date is found then break for loop by setting i to control variable
                i = data.list.length;
            }

        }*/
        console.log(`1: ${day_1}\n2: ${day_2}\n3: ${day_3}\n4: ${day_4}\n`)

        var userInputDay = prompt("Please input day number: ");
        const userInputIndexDays = parseInt(userInputDay) - 1;

        if (userInputIndexDays >= 0 && userInputIndexDays < forecastDays.length) {
            const selectedDay = forecastDays[userInputIndexDays];
            
            //filteredForecastDay holds dt_txt timestamp for day and time
            const filteredForecastDay = data.list.filter(forecast => {
                // Cleaning data to have valid values
                const forecastDate = forecast.dt_txt.slice(0, 10);
                const forecastTime = forecast.dt_txt.slice(11, 16);
                return forecastDate == selectedDay && (forecastTime == "09:00" || forecastTime == "12:00" || forecastTime == "15:00" || forecastTime == "18:00" || forecastTime == "21:00")
            })
            filteredForecastDay.forEach(forecast => {
                console.log(number, forecast.dt_txt)
                number = number + 1;
                forecastTimes.push(forecast.dt_txt)
            })
            console.log("")

            var userInputTime = prompt("Please input time number: ");
            const userInputIndexTimes = parseInt(userInputTime) - 1
            const selectedTime = forecastTimes[userInputIndexTimes]

            //Dont need to slice forecastTime as we already know what time we want
            const filteredForecastTime = data.list.filter(forecast => {
                const forecastDate = forecast.dt_txt.slice(0, 10);
                const forecastTime = forecast.dt_txt;
                return forecastDate == selectedDay && forecastTime == selectedTime
            })

            filteredForecastTime.forEach(weatherData => {
                temp_celsius = weatherData.main.temp
                temp_celsius_feels_like = weatherData.main.feels_like
                clouds = weatherData.weather[0].description
                wind_speed = weatherData.wind.speed
                place = weatherData.name
                identification = weatherData.id
                timezone = weatherData.timezone
                humidity = weatherData.main.humidity
                Time_id = new Date((
                    weatherData.dt) * 1000).toString()
                precipitation = weatherData.pop
                console.log(`\nWeather in ${capitalisedCity} at ${Time_id}`)
                console.log(`Temperature in ${capitalisedCity}: ${temp_celsius}°C`)
                console.log(`Temperature in ${capitalisedCity} feels like: ${temp_celsius_feels_like}°C`)
                console.log(`Wind speed in ${capitalisedCity}: ${wind_speed}m/s`)
                console.log(`General Weather in ${capitalisedCity}: ${clouds}`)
                console.log(`Chance of rain in ${capitalisedCity}: ${precipitation * 100}%`)
            })
        } else {
            console.log("Invalid input")
        }
    })
    .catch(error => {
        console.log("Error: " + error.message);
    });