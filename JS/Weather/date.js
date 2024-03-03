import * as format from "./format.js";

export function DateBar(dayNames, formattedDate)
{
    let content;
    let textNode;
    let day;

    let dateDisplay = document.querySelector('.DisplayDate');
    let dayDisplay = document.querySelector('.DisplayDay');

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

    dateDisplay.innerHTML = "";
    dayDisplay.innerHTML = "";

    textNode = document.createTextNode(formattedDate);
    dateDisplay.appendChild(textNode);

    /*
    textNode = document.createTextNode(dayNames[dayIndex]);
    dayDisplay.appendChild(textNode);
    */
}

export function UpdateSelectedDay(className)
{
    className = className.split(" ");
    className = className[1];

    return className;
}