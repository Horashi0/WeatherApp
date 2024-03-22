import * as weather from "./weather.js";
import * as time from "./time.js";
import * as date from "./date.js";
import * as format from "./format.js";


function WeatherDisplay() {
    const forecast = "https://horashio.co.uk:5000/forecast?q=Boston";
    const current = "https://horashio.co.uk:5000/current?q=Boston";
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let offsetArray = 0;
    let selectedDay, selectedTime, disableArrows, dateArray, valueArray;

    // Setting variables to default so API can make call, Selected day is integer, SelectedTime is the text displayed on button
    selectedDay = 1;
    selectedTime = "Now";
    disableArrows = 0;
    dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);

    SetupWebsite(selectedDay, selectedTime, dateArray["selectedDate"], dateArray, dayNames, current, forecast, offsetArray, valueArray, disableArrows);
   
    

    document.addEventListener("DOMContentLoaded", function() {
        const TopButtons = document.querySelectorAll('.TopButton');
        
    
        TopButtons.forEach(function(listen) {
            listen.addEventListener("click", function() {
                //UpdateTopButtons(selectedDay, selectedTime, dateArray, dayNames, current, forecast, offsetArray, listen);
                selectedDay = listen.className.split(" ")[1].slice(12);
                dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);
                date.DateBar(selectedDay, dayNames, dateArray['formattedDate']);
                time.TimeBar(selectedDay, selectedTime, offsetArray, disableArrows, 1);
                
              
                time.TimeBar(selectedDay, selectedTime, offsetArray, disableArrows, 1);

                ApiRequest(selectedDay, selectedTime, current, forecast);
                format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"], offsetArray);
            });
        });
    
        
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        const BottomButtons = document.querySelectorAll('.BottomButton');
        let timeArray = [0, 3, 6, 9, 12, 15, 18, 21];

        let timeHour = new Date().getHours();
        let roundedTime, indexValue, validArray;
        // If time is 03:00 etc then the next time shows as the current time so this prevents it by adding one
        // We define roundedTime after running this if statement because other wise roundedTime equals our current time if its 00:14, if so we add an hour on which causes roundedTime to go to 03:00
        if (timeHour % 3 == 0) {
            timeHour += 1;
        }
    
        roundedTime = Math.ceil(timeHour/3.0) * 3;
        console.log(roundedTime);
        indexValue = timeArray.indexOf(roundedTime);
        validArray = timeArray.slice(indexValue);

        let upperValue = time.UpperArray(validArray);

        BottomButtons.forEach(function(listen) {
            listen.addEventListener("click", function() { 
                let dateArray, timeHours;

                timeHours = 0;
                dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);
                console.log(selectedTime);
                if(listen.className != "BottomButton BottomBarLeftArrow" && listen.className != "BottomButton BottomBarRightArrow") {
                    selectedTime = listen.textContent;
                    format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"], offsetArray);
                    ApiRequest(selectedDay, selectedTime, current, forecast);
                }

                if (listen.className == "BottomButton BottomBarLeftArrow") {
                    if (timeHour + 3 <= (validArray[offsetArray])) {
                        offsetArray -= 1;
                        // Make sure to make offsetArray equal to return of function as its vital to preserve the value of offsetArray
                        time.TimeBar(selectedDay, selectedTime, offsetArray, disableArrows, 0);
                        format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"], offsetArray);
                    } 
                    
                    
                }
                if (listen.className == "BottomButton BottomBarRightArrow") {   
                    if(offsetArray + 1 < upperValue / 2) {
                        offsetArray += 1;
                        time.TimeBar(selectedDay, selectedTime, offsetArray, disableArrows, 0);
                        format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"], offsetArray);
                    } 
                }                   
            });
        });
    });
}
WeatherDisplay();


function SetupWebsite(selectedDay, selectedTime, selectedDate, dateArray, dayNames, current, forecast, offsetArray, valueArray, disableArrows) {
    date.DateBar(selectedDay, dayNames, dateArray['formattedDate']);
    valueArray = time.TimeBar(selectedDay, selectedTime, offsetArray, disableArrows, 0);
    ApiRequest(selectedDay, selectedTime, current, forecast);
    format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"], offsetArray);
    return valueArray;
}

function ApiRequest(selectedDay, selectedTime, current, forecast) {
    // If values are default then get current weather, else get forecasted weather with formattted date
    if (selectedDay == 1 && selectedTime == "Now") {
        weather.Weather(format.GetTimeValues(selectedDay, selectedTime, 1), current, 1);
    } else {
        weather.Weather(format.GetTimeValues(selectedDay, selectedTime, 1)["formattedDate"], forecast, 0);
    }
}

/*function UpdateTopButtons(selectedDay, selectedTime, dateArray, dayNames, current, forecast, offsetArray, listen)
{
    selectedDay = listen.className.split(" ")[1].slice(12);
    dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);

    date.DateBar(selectedDay, dayNames, dateArray['formattedDate'],);
    ApiRequest(selectedDay, selectedTime, current, forecast);
    time.TimeBar(selectedDay, offsetArray, dateArray["formattedDate"]);
    
    format.ColourDateTime(selectedDay, selectedTime, dateArray["selectedDate"]);
}*/