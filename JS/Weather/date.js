import * as format from "./format.js";

export function DateBar(selectedDay, dayNames, formattedDate)
{
    let content, textNode, day, dayIndex, errorValue;

    let dayDisplay = document.querySelector('.DisplayDay');
    let dateDisplay = document.querySelector('.DisplayDate');
    
    for(var i = 1; i <= 6; i++)
    {   
        day = new Date(new Date().setDate(new Date().getDate() + (i - 1)));
        day = day.getDate();

        let button = document.querySelector('.TopBarButton' + i);
        button.innerHTML = ""; 
        
        if(i == 1) {
            content = "Today";
        } else if(i == 2) {
            content = "Tomorrow";
        } else if (i == 3) {
            content = format.OrdinalSuffix(day);
        } else if (i == 4) {
            content = format.OrdinalSuffix(day);
        } else if (i == 5) {
            content = format.OrdinalSuffix(day);
        } else if (i == 6) {
            content = format.OrdinalSuffix(day);
        }
        
        textNode = document.createTextNode(content);
        button.appendChild(textNode);
    }

    dayDisplay.innerHTML = "";
    dateDisplay.innerHTML = "";
    
    dayIndex = selectedDay;
    day = new Date().getDay();

    for(let i = 0; i < 7; ++i)
    {
        if(dayIndex == i)
        {
            dayIndex = day + (i - 1);
            if(dayIndex > 6)
            {
                // DayNames starts at 0 with sunday, meaning if DayIndex goes over 6 (end of array) it needs to take 7 off to get its valid DayIndex
                // e.g. Today is saturday which is index 6, 5 days in the future is thursday which 6 + 5 = 11, 11 - 7 = 4, 4 equals thursday
                errorValue = dayIndex - 7;
                dayIndex = errorValue;
            }
            break;
        }
    }
    
    textNode = document.createTextNode(dayNames[dayIndex]);
    dayDisplay.appendChild(textNode);

    textNode = document.createTextNode(formattedDate);
    dateDisplay.appendChild(textNode);

}

export function UpdateSelectedDay(className)
{
    className = className.split(" ");
    className = className[1];

    return className;
}