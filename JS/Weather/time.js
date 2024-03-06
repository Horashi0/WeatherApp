import * as format from "./format.js";

export function TimeBar(selectedDay, selectedTime, offsetValue, disableArrows, dayChange)
{
    let time = new Date().getHours();  
    let valueArray, controlSelectedTime;
    controlSelectedTime = 0;
    // If time is 03:00 etc then the next time shows as the current time so this prevents it by adding one
    // We define roundedTime after running this if statement because other wise roundedTime equals our current time if its 00:14, if so we add an hour on which causes roundedTime to go to 03:00
    if(time % 3 == 0)
    {
        time += 1;
    }

    let roundedTime = Math.ceil(time/3.0) * 3;
    for(var i = 1; i <= 5; i++)
    {
        let button = document.querySelector('.BottomBarButton' + i);
        let content, textNode;
        // Display block makes sure all elements are showing before adding content as some elements are hidden if they have no value due to day overrun
        button.style.display = "block";
    
        // Prevents day lapping
        if(offsetValue >= 12)
        {
            offsetValue -= 3;
        }
        button.innerHTML = ""; 
        if(selectedDay == 1)
        {
            if(i == 1 && offsetValue == 0) {
                content = "Now";
            } else if(i == 2) {
                content = format.FormatTime(roundedTime + offsetValue);
            } else if (i == 3) {
                content = format.FormatTime(roundedTime + 3 + offsetValue);
            } else if (i == 4) {
                content = format.FormatTime(roundedTime + 6 + offsetValue);
            } else if (i == 5) {
                content = format.FormatTime(roundedTime + 9 + offsetValue);
            } else {
                content = format.FormatTime(roundedTime + offsetValue - 3)
            }
            // If content is 00:00 and it isnt the first time, then we know the time bar is leaking over to the next day so we disable arrows
            if(content == "00:00" && i != 1)
            {
                content = "";
                disableArrows = 1;
            }

            // This then makes any time after 00:00 also empty 
            if(disableArrows == 1 && i != 1)
            {
                content = "";
            }
        }
        else
        {
            disableArrows = 0;
            roundedTime = 0;
            if(i == 1) {
                content = format.FormatTime(roundedTime + offsetValue);
            } else if(i == 2) {
                content = format.FormatTime(roundedTime + offsetValue + 3);
            } else if (i == 3) {
                content = format.FormatTime(roundedTime + offsetValue + 6);
            } else if (i == 4) {
                content = format.FormatTime(roundedTime + offsetValue + 9);
            } else if (i == 5) {
                content = format.FormatTime(roundedTime + offsetValue + 12);
            }
        }
        
        textNode = document.createTextNode(content);
        button.appendChild(textNode);

        // When content hits 00:00 it gets removed due to it not being in the same day anymore, this if satement hides the element so the time is still spread evenly
        if(button.textContent == "")
        {
            button.style.display = "none";
        }

        if(dayChange == 1)
        {
            if(button.textContent == selectedTime + offsetValue)
            {
                controlSelectedTime = 1;
            } else if(i == 5 && controlSelectedTime == 0)
            {
                if(selectedDay == 1)
                {
                    console.log(selectedTime);
                    selectedTime = "Now";
                    offsetValue = 0;
                } else {
                    selectedTime = "00:00";
                    offsetValue = 0;
                }    
            } 
        }
    }
    valueArray = {selectedTime, offsetValue, disableArrows};
    return valueArray;
}