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
    let time = new Date().getHours();
    let startTime = time;
    let timeArray = new Array();
    let i = 1;
    

    let temp;
    timeArray.push(["Now", 0])

    for(let hoursPassed = startTime; hoursPassed <= 120 + startTime; ++hoursPassed) {
        if (hoursPassed % 3 == 0) {
            let hour = hoursPassed % 24;
            let day = (hoursPassed / 24) | 0;
            timeArray.push([hour, day]);
            ++i;
        }
    }

    if (className == "BottomButton BottomBarRightArrow") {  
        offsetIndex++;
    } else if(className == "BottomButton BottomBarLeftArrow") {  
        if(offsetIndex != 0) {
            offsetIndex--;
        }
    } else if(SelectedTime != classText) {
        temp = className.split(" ");
        SelectedTime = temp[1].slice(15);
        SelectedTime = parseInt(SelectedTime);
        SelectedTime += parseInt(offsetIndex);
        SelectedTime--;
    } 


    
    if (typeof(SelectedTime) === "undefined") {
        SelectedTime = 0;
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
    
    selectedDay = timeArray[SelectedTime][1] + 1;
    let dateArray = format.GetTimeValues(selectedDay, SelectedTime, 0)

    format.ColourDateTime(SelectedTime, dateArray["selectedDate"], selectedDay,timeArray, offsetIndex)
}   