import * as format from "./format.js";

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


export function TimeBar(selectedDay, selectedTime, offsetArray, disableArrows, dayChange) {
    //let time = new Date().getHours();
    let time = 0;
    let timeArray, validArray, indexValue, roundedTime, upperValue;

    timeArray = [0, 3, 6, 9, 12, 15, 18, 21];

    // If time is 03:00 etc then the next time shows as the current time so this prevents it by adding one
    // We define roundedTime after running this if statement because other wise roundedTime equals our current time if its 00:14, if so we add an hour on which causes roundedTime to go to 03:00
    if (time % 3 == 0) {
        time += 1;
    }
    
    roundedTime = Math.ceil(time/3.0) * 3;
    console.log(roundedTime);
    indexValue = timeArray.indexOf(roundedTime);
    validArray = timeArray.slice(indexValue);
    
    
    upperValue = UpperArray(validArray);
    console.log("UpperValue: ",upperValue);
    for (let i = 0; i < 5; ++i) {
        let BottomButton = "BottomBarButton" + (i + 1); 
        BottomButton = document.querySelector(`.${BottomButton}`);
        console.log("OffsetArray", offsetArray);
        //if(validArray[i + offsetArray] >= 0 && validArray[i + offsetArray] <= 21)
        //if ((i + offsetArray) >= 0 && (i + offsetArray) <= upperValue)
        //if (validArray[i + offsetArray])
        if(time <= (validArray[offsetArray]) && validArray[offsetArray] <= 21 && offsetArray < upperValue / 2) {
            BottomButton.textContent = format.FormatTime(validArray[i + offsetArray]);
        }
    }
}