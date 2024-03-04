import * as weather from "./weather.js";
import * as time from "./time.js";
import * as date from "./date.js";
import * as format from "./format.js";


function WeatherDisplay()
{
    const forecast = "https://horashio.co.uk:5000/forecast?q=Boston";
    const current = "https://horashio.co.uk:5000/current?q=Boston";
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var offsetValue = 0;

    let selectedDay, selectedDate, selectedTime, dateArray;
    // Setting variables to default so API can make call, Selected day is integer, SelectedTime is the text displayed on button
    selectedDay = 1;
    selectedTime = "Now";
    dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);

    date.DateBar(dayNames, dateArray['formattedDate']);
    time.TimeBar(selectedDay, offsetValue);
    ApiRequest(selectedDay, selectedTime, current, forecast);

    format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"]);

    document.addEventListener("DOMContentLoaded", function() {
        const TopButtons = document.querySelectorAll('.TopButton');
        

        TopButtons.forEach(function(listen)
        {
            listen.addEventListener("click", function()
            { 
                console.log("aaaaaaa");
            });
        });

        
    });

    document.addEventListener("DOMContentLoaded", function() {
        const BottomButtons = document.querySelectorAll('.BottomButton');

        BottomButtons.forEach(function(listen)
            {
                listen.addEventListener("click", function()
                { 
            
                });
            });
    });
    
    

}

function ApiRequest(selectedDay, selectedTime, current, forecast)
{
    // If values are default then get current weather, else get forecasted weather with formattted date
    if(selectedDay == 1 && selectedTime == "Now")
    {
        weather.Weather(format.GetTimeValues(selectedDay, selectedTime, 1), current, 1);
    } else {
        weather.Weather(format.GetTimeValues(selectedDay, selectedTime, 1), forecast, 0);
    }
}

window.onload =  function()
{
    WeatherDisplay();
}