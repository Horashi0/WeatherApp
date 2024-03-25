import * as weather from "./weather.js";
import * as time from "./time.js";
import * as date from "./date.js";
import * as format from "./format.js";


function WeatherDisplay() {
    const forecast = "https://horashio.co.uk:5000/forecast?q=Boston";
    const current = "https://horashio.co.uk:5000/current?q=Boston";
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
 
    let selectedDay, selectedTime,dateArray, temp;

    // Setting variables to default so API can make call, Selected day is integer, SelectedTime is the text displayed on button
    selectedDay = 1;
    dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);

    SetupWebsite(selectedDay, selectedTime, dateArray["selectedDate"], dateArray, dayNames, current, forecast);

    document.addEventListener("DOMContentLoaded", function() {
        const TopButtons = document.querySelectorAll('.TopButton');
        
    
        TopButtons.forEach(function(listen) {
            listen.addEventListener("click", function() {
                //UpdateTopButtons(selectedDay, selectedTime, dateArray, dayNames, current, forecast, offsetArray, listen);
                temp = listen.className.split(" ");
                selectedDay = temp[1].slice(12);
                console.log(selectedDay);
                dateArray = format.GetTimeValues(selectedDay, selectedTime, 0);
                date.DateBar(selectedDay, dayNames, dateArray['formattedDate']);
                time.TimeBar(selectedDay, selectedTime, listen.className, listen.textContent,dayNames);
                ApiRequest(selectedDay, selectedTime, current, forecast);

            });
        });
    
        
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        const BottomButtons = document.querySelectorAll('.BottomButton');

        // If time is 03:00 etc then the next time shows as the current time so this prevents it by adding one
        // We define roundedTime after running this if statement because other wise roundedTime equals our current time if its 00:14, if so we add an hour on which causes roundedTime to go to 03:00
     


        BottomButtons.forEach(function(listen) {
            listen.addEventListener("click", function() { 

                if (listen.className == "BottomButton BottomBarLeftArrow") {
                    time.TimeBar(selectedDay, selectedTime, listen.className, listen.textContent,dayNames);
                } else if (listen.className == "BottomButton BottomBarRightArrow") {   
                    time.TimeBar(selectedDay, selectedTime, listen.className, listen.textContent,dayNames);
                }  else {
                    time.TimeBar(selectedDay, selectedTime, listen.className, listen.textContent,dayNames);
                }                 
            });
        });
    });
}
WeatherDisplay();


function SetupWebsite(selectedDay, selectedTime, selectedDate, dateArray, dayNames, current, forecast) {
    date.DateBar(selectedDay, dayNames, dateArray['formattedDate']);
    time.TimeBar(selectedDay, selectedTime, dayNames);
    ApiRequest(selectedDay, selectedTime, current, forecast);
}

function ApiRequest(selectedDay, selectedTime, current, forecast) {
    // If values are default then get current weather, else get forecasted weather with formattted date
    if (selectedDay == 1 && selectedTime == "Now") {
        weather.Weather(format.GetTimeValues(selectedDay, selectedTime, 1), current, 1);
    } else {
        weather.Weather(format.GetTimeValues(selectedDay, selectedTime, 1)["formattedDate"], forecast, 0);
    }
}
