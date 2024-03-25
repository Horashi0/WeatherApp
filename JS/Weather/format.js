import { ConvertKelvin } from "./weather.js";

export function FormatTime(content)
{
    // Corrects error so instead of time being 27:00 it is 03:00
    let errorAmount = 0;
    let string = "";

    if(content >= 24)
    {
        errorAmount = content - 24;
        content = 0 + errorAmount;
    }

    if(content < 12)
    {
        string = string + "0" + content + ":00";
    }

    if(content >= 12)
    {
        string = content + ":00";
    }

    return string;
}

export function OrdinalSuffix(number) // Formats day with its suffix's
{
    if(number === 1 || number === 21 || number === 31) {
        return number + "st";
    } else if (number === 2 || number === 22) {
        return number + "nd";
    } else if (number === 3 || number === 23) {
        return number + "rd";
    } else {
        return number + "th";
    }
}

export function GetTimeValues(selectedDay, selectedTime, apiDate) { // ApiDate specifies if the user wants an API date or a usable date

    let date = new Date();

    let dateDay;
    let dateMonth;
    let dateYear;
    let formattedDate;
    let dateArray;
    let selectedDate;
    // We get dateMonth before setting dateDay to its integer value as you cant get the month from the integer value
    dateDay = new Date(date.setDate(date.getDate() + (selectedDay - 1)))
    dateMonth = dateDay.getMonth() + 1;
    dateYear = dateDay.getFullYear();
    dateDay = dateDay.getDate();

    if (selectedDay == 1) {
        selectedDate = "Today";
    } else if (selectedDay == 2) {
        selectedDate = "Tomorrow";
    } else {
        selectedDate = OrdinalSuffix(dateDay);
    }

    if (dateDay < 10){dateDay = '0' + dateDay};
    if (dateMonth < 10){dateMonth = '0' + dateMonth};

    //Function allows a return of either readable values or a return of values valid for use with an API
    if(apiDate) {
        formattedDate = dateYear + "-" + dateMonth + "-" + dateDay + ` ${selectedTime}:00`;
    } else {
        formattedDate = dateDay + "." + dateMonth + "." + dateYear;
    }

    dateArray = {dateDay, dateMonth, dateYear, formattedDate, selectedDate}
    return dateArray;
}

export function ColourDateTime(selectedTime, selectedDate, selectedDay, timeArray, offsetIndex, buttonNumber) {
    let ButtonList = ["TopBarButton", "BottomBarButton", "BottomBarLeftArrow", "BottomBarRightArrow"]

    for(let i = 0; i < 6; ++i) {
        let TopButton;
        let BottomButton;
        // Bottom bar only has 5 buttons but TopBar has 6 buttons which is why we have to set the for loop to 6 times
        if(i < 5) { 
            TopButton = ButtonList[0] + (i + 1); 
            TopButton = document.querySelector(`.${TopButton}`);

            if(TopButton.textContent == selectedDate) {
                TopButton.style.color = "grey";
                for (let x = i + 1; x < 5; ++x) {
                    TopButton = ButtonList[0] + (x + 1); 
                    TopButton = document.querySelector(`.${TopButton}`);

                    TopButton.style.color = "white";
                }
            } else {
                TopButton.style.color = "white";
            }
        }
        if(i < 5) { 
            BottomButton = ButtonList[1] + (i + 1);
            BottomButton = document.querySelector(`.${BottomButton}`);

            if(BottomButton.textContent == ButtonList[2] || BottomButton.textContent == ButtonList[3]) {
                break;
            }

            if(selectedTime == 0) {
                if(BottomButton.textContent == timeArray[selectedTime][0] && i + offsetIndex == selectedTime) {
                    BottomButton.style.color = "grey";
                    for (let x = i + 1; x < 5; ++x) {
                        BottomButton = ButtonList[1] + (x + 1);
                        BottomButton = document.querySelector(`.${BottomButton}`);

                        BottomButton.style.color = "white";
                    }
                    break;
                } else {
                    BottomButton.style.color = "white";
                }
                
            } else if(selectedTime != 0) {
                if(BottomButton.textContent == FormatTime(timeArray[selectedTime][0]) && i + offsetIndex == selectedTime) {
                    BottomButton.style.color = "grey";
                    for (let x = i + 1; x < 5; ++x) {
                        BottomButton = ButtonList[1] + (x + 1);
                        BottomButton = document.querySelector(`.${BottomButton}`);

                        BottomButton.style.color = "white";
                    }
                   
                } else {
                    BottomButton.style.color = "white";
                }
            }
            } 
        
    }

}