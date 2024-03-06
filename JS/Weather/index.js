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
    let selectedDay, selectedTime, disableArrows, dateArray, valueArray;

    // Setting variables to default so API can make call, Selected day is integer, SelectedTime is the text displayed on button
    selectedDay = 1;
    selectedTime = "Now";
    disableArrows = 0;
    dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);

    valueArray = SetupWebsite(selectedDay, selectedTime, dateArray["selectedDate"], dateArray, dayNames, current, forecast, offsetValue, valueArray, disableArrows);
    offsetValue = valueArray["offsetValue"];
    disableArrows = valueArray["disableArrows"];
    

    document.addEventListener("DOMContentLoaded", function() {
        const TopButtons = document.querySelectorAll('.TopButton');
        
    
        TopButtons.forEach(function(listen)
        {
            listen.addEventListener("click", function()
            {
                //UpdateTopButtons(selectedDay, selectedTime, dateArray, dayNames, current, forecast, offsetValue, listen);
                selectedDay = listen.className.split(" ")[1].slice(12);
                dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);
                date.DateBar(selectedDay, dayNames, dateArray['formattedDate']);
                valueArray = time.TimeBar(selectedDay, selectedTime, offsetValue, disableArrows, 1);
                selectedTime = valueArray["selectedTime"];
                offsetValue = valueArray["offsetValue"];
                disableArrows = valueArray["disableArrows"];
                time.TimeBar(selectedDay, selectedTime, offsetValue, disableArrows, 1);

                ApiRequest(selectedDay, selectedTime, current, forecast);
                format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"]);
            });
        });
    
        
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        const BottomButtons = document.querySelectorAll('.BottomButton');
    
        BottomButtons.forEach(function(listen)
        {
            listen.addEventListener("click", function()
            { 
                let dateArray, timeHours;

                timeHours = new Date().getHours();
                dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);

                if(listen.className != "BottomButton BottomBarLeftArrow" && listen.className != "BottomButton BottomBarRightArrow")
                {
                    selectedTime = listen.textContent;
                    format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"]);
                    ApiRequest(selectedDay, selectedTime, current, forecast);
                }

                if(listen.className == "BottomButton BottomBarLeftArrow")
                {
                    if(timeHours <= (timeHours + offsetValue - 3))
                    {
                        offsetValue -= 3;
                        // Make sure to make offsetValue equal to return of function as its vital to preserve the value of offsetValue
                        valueArray = time.TimeBar(selectedDay, selectedTime, offsetValue, disableArrows, 0);
                        offsetValue = valueArray["offsetValue"];
                        disableArrows = valueArray["disableArrows"];
                        time.TimeBar(selectedDay, selectedTime, offsetValue, disableArrows, 1);
                        format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"]);
                    }
                }
                if(listen.className == "BottomButton BottomBarRightArrow")
                {
                    if(disableArrows == 0)
                    {
                        offsetValue += 3;
                        valueArray = time.TimeBar(selectedDay, selectedTime, offsetValue, disableArrows, 0);
                        offsetValue = valueArray["offsetValue"];
                        disableArrows = valueArray["disableArrows"];
                        time.TimeBar(selectedDay, selectedTime, offsetValue, disableArrows, 1);
                        format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"]);
                    }                    
                }                   
            });
        });
    });
}
WeatherDisplay();


function SetupWebsite(selectedDay, selectedTime, selectedDate, dateArray, dayNames, current, forecast, offsetValue, valueArray, disableArrows)
{
    date.DateBar(selectedDay, dayNames, dateArray['formattedDate']);
    valueArray = time.TimeBar(selectedDay, selectedTime, offsetValue, disableArrows, 0);
    ApiRequest(selectedDay, selectedTime, current, forecast);
    format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"]);
    return valueArray;
}

function ApiRequest(selectedDay, selectedTime, current, forecast)
{
    // If values are default then get current weather, else get forecasted weather with formattted date
    if(selectedDay == 1 && selectedTime == "Now")
    {
        weather.Weather(format.GetTimeValues(selectedDay, selectedTime, 1), current, 1);
    } else {
        weather.Weather(format.GetTimeValues(selectedDay, selectedTime, 1)["formattedDate"], forecast, 0);
    }
}

/*function UpdateTopButtons(selectedDay, selectedTime, dateArray, dayNames, current, forecast, offsetValue, listen)
{
    selectedDay = listen.className.split(" ")[1].slice(12);
    dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);

    date.DateBar(selectedDay, dayNames, dateArray['formattedDate'],);
    ApiRequest(selectedDay, selectedTime, current, forecast);
    time.TimeBar(selectedDay, offsetValue, dateArray["formattedDate"]);
    
    format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"]);
}*/