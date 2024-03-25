import * as format from "./format.js";
import * as date from "./date.js";
export function UpperArray(validArray) {
    let upperValue;
    for (let i = 0; i < 8; ++i) {
        if (validArray[i])
        {
            upperValue = i;
        }
    }
    return upperValue;
}

let offsetIndex = 0;
let SelectedTime;

export function TimeBar(selectedDay, selectedTime, className, classText, dayNames) {
    SelectedTime = selectedTime;
    let time = new Date().getHours();

    if (className == "BottomButton BottomBarRightArrow") {  
        offsetIndex++;
    } else if(className == "BottomButton BottomBarLeftArrow") {  
        if(offsetIndex != 0) {
            offsetIndex--;
        }
    } else if(SelectedTime != classText) {
        SelectedTime = classText;
    } 

    let startTime = time;
    let timeArray = new Array();
    timeArray.push(["Now", 0])
    let i = 1;

    for(let hoursPassed = startTime; hoursPassed <= 120 + startTime; ++hoursPassed) {
        if (hoursPassed % 3 == 0) {
            let hour = hoursPassed % 24;
            let day = (hoursPassed / 24) | 0;
            timeArray.push([hour, day]);
            ++i;
        }
    }
    
    if (typeof(SelectedTime) === "undefined") {
        console.log(SelectedTime)
        SelectedTime = timeArray[0][0];
        console.log(SelectedTime)
    }

    for (let i = 0; i < 5; ++i) {
        let BottomButton = "BottomBarButton" + (i + 1); 
        BottomButton = document.querySelector(`.${BottomButton}`);
        if (Number.isInteger(timeArray[offsetIndex + i][0])) {
            BottomButton.textContent = format.FormatTime(timeArray[offsetIndex + i][0]); 
        } else {
            BottomButton.textContent = timeArray[offsetIndex + i][0];
        }   
    }

    for (let i = 1; i < timeArray.length; ++i) {
        if (format.FormatTime(timeArray[i][0]) == SelectedTime) {
            selectedDay = (timeArray[i][1]) + 1;
            break;
        }
        
    }
    let dateArray = format.GetTimeValues(selectedDay, SelectedTime, 0)
    format.ColourDateTime(SelectedTime, dateArray["selectedDate"])
}   