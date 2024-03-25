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
let SelectedDay;

export function TimeBar(selectedDay, selectedTime, className, classText, dayNames, dayChange) {
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
    if(dayChange == 0) {
        if (className == "BottomButton BottomBarRightArrow") {  
            if(offsetIndex != 30) {
                offsetIndex++;
            }
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
    console.log(timeArray);
    if (dayChange == 1) {
        for (let i = 0; i < 35; ++i) {
            if (timeArray[i][1] == parseInt(selectedDay - 1)) {
                let oldSelectedTime = 0;
                SelectedTime = i;
                offsetIndex = SelectedTime - oldSelectedTime;
                console.log(offsetIndex);

                for (let i = 0; i < 5; ++i) {
                    let BottomButton = "BottomBarButton" + (i + 1); 
                    BottomButton = document.querySelector(`.${BottomButton}`);
                    if (Number.isInteger(timeArray[offsetIndex + i][0])) {
                        BottomButton.textContent = format.FormatTime(timeArray[offsetIndex + i][0]); 
                    } else {
                        BottomButton.textContent = timeArray[offsetIndex + i][0];
                    }
                }


                break;
            }
        }

        
        let dateArray = format.GetTimeValues(selectedDay, SelectedTime, 0);
        date.DateBar(selectedDay, dayNames, dateArray["formattedDate"]);
        format.ColourDateTime(SelectedTime, dateArray["selectedDate"], selectedDay,timeArray, offsetIndex);
        return;
    } else {
        SelectedDay = timeArray[SelectedTime][1] + 1;
        let dateArray = format.GetTimeValues(SelectedDay, SelectedTime, 0)
        date.DateBar(SelectedDay, dayNames, dateArray["formattedDate"]);
        format.ColourDateTime(SelectedTime, dateArray["selectedDate"], SelectedDay,timeArray, offsetIndex)  
    }   
}

    