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

export function GetTimeValues(SelectedDay, SelectedTime, ApiDate) // ApiDate specifies if the user wants an API date or a usable date
{
    let date = new Date();

    let dateDay;
    let dateMonth;
    let dateYear;
    let formattedDate;
    let dateArray;
    // We get dateMonth before setting dateDay to its integer value as you cant get the month from the integer value
    dateDay = new Date(date.setDate(date.getDate() + (SelectedDay - 1)))
    dateMonth = dateDay.getMonth() + 1;
    dateYear = dateDay.getFullYear();
    dateDay = dateDay.getDate();

    if(dateDay < 10){dateDay = '0' + dateDay};
    if(dateMonth < 10){dateMonth = '0' + dateMonth};

    if(ApiDate)
    {
        formattedDate = dateDay + "-" + dateMonth + "-" + dateYear + `${SelectedTime}:00`;
    } else {
        formattedDate = dateDay + "." + dateMonth + "." + dateYear;
    }
    
    dateArray = {dateDay, dateMonth, dateYear, formattedDate}

    return dateArray;
}