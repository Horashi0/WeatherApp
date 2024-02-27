const forecast = "https://horashio.co.uk:5000/forecast?q=Boston";
const current = "https://horashio.co.uk:5000/current?q=Boston";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var offsetValue = 0;

// Start of generic JS for hamburger menu etc
function Display()
{
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.closeIcon').style.display = 'inline';
        document.querySelector('.menuIcon').style.display = 'none';
    });
    DisplayMenus();
}

function Hide()
{
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.closeIcon').style.display = 'none';
        document.querySelector('.menuIcon').style.display = 'inline';
    });
    HideMenus();
}

function DisplayMenus()
{
    let contact = document.querySelector('.Contact');
    let account = document.querySelector('.Account');
   
    contact.style.cssText = `
        display: inline;   
        
        position: absolute;
        right: 20px;
        top: 70px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 30px;
    
        color: #F5F2F8;
    `

    account.style.cssText = `
        display: inline;   
        
        position: absolute;
        right: 20px;
        top: 140px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-size: 30px;
    
        color: #F5F2F8;
    `
}

function HideMenus()
{
    let contact = document.querySelector('.Contact').style.display = 'none';
    let account = document.querySelector('.Account').style.display = 'none';
}
// End of generic JS for website

// Start of JS for WeatherDisplay controls e.g. Date control
function DateBar(dayIndex, dateDay, dateMonth)
{
    let content;
    let textNode;
    let dateDisplay = document.querySelector('.DisplayDate');
    let dayDisplay = document.querySelector('.DisplayDay');

    const date = new Date();

    let day = date.getDay();
    let dd = dateDay;
    let mm = dateMonth;
    const yyyy = date.getFullYear();

    if(dd < 10){dd = '0' + dd};
    if(mm < 10){ mm = '0' + mm};

    const formattedDate = dd + "." + mm + "." + yyyy;

    for(var i = 1; i <= 6; i++)
    {
        let button = document.querySelector('.TopBarButton' + i);
        button.innerHTML = ""; 
        if(i == 1) {
            content = "Today";
        } else if(i == 2) {
            content = "Tomorrow";
        } else if (i == 3) {
            content = OrdinalSuffix(day + (i - 1));
        } else if (i == 4) {
            content = OrdinalSuffix(day + (i - 1));
        } else if (i == 5) {
            content = OrdinalSuffix(day + (i - 1));
        } else if (i == 6) {
            content = OrdinalSuffix(day + (i - 1)); 
        }
        
        textNode = document.createTextNode(content);
        button.appendChild(textNode);
    }

    dateDisplay.innerHTML = "";
    dayDisplay.innerHTML = "";

    textNode = document.createTextNode(formattedDate);
    dateDisplay.appendChild(textNode);

    textNode = document.createTextNode(dayNames[dayIndex]);
    dayDisplay.appendChild(textNode);
}

function TimeBar()
{
    let time = new Date().getHours();
    for(var i = 1; i <= 5; i++)
    {
        let button = document.querySelector('.BottomBarButton' + i);
        
        // If time is 03:00 etc then the next time shows as the current time so this prevents it by adding one
        if(time % 3 == 0)
        {
            time += 1;
        }

        // Prevents day lapping
        if(offsetValue >= 12)
        {
            offsetValue = 0;
        }

        let roundedTime = Math.ceil(time/3.0) * 3;
        let content;
        let textNode;

        button.innerHTML = ""; 

        if(i == 1 && offsetValue == 0) {
            content = "Now";
        } else if(i == 2) {
            content = FormatTime(roundedTime + offsetValue);
        } else if (i == 3) {
            content = FormatTime(roundedTime + 3 + offsetValue);
        } else if (i == 4) {
            content = FormatTime(roundedTime + 6 + offsetValue);
        } else if (i == 5) {
            content = FormatTime(roundedTime + 9 + offsetValue);
        } else {
            content = FormatTime(roundedTime + offsetValue - 3)
        }
        
        textNode = document.createTextNode(content);
        button.appendChild(textNode);
    }
   
}

// Start of formatting JS section
function FormatTime(content)
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

function OrdinalSuffix(number) // Formats day with its suffix's
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
// End of formatting JS section

document.addEventListener("DOMContentLoaded", function() {
    const BottomButtons = document.querySelectorAll('.BottomButton');
    let time = new Date().getHours();

    let button;
    let newClass;
    let oldClass;

    BottomButtons.forEach(function(listen)
    {
        
        listen.addEventListener("click", function()
        { 
            //console.log(listen.className);
            //console.log(listen.textContent);

            newClass = listen.className.split(" ");
            newClass = newClass[1]; 

            // Prevents error for when it tries to remove the colour off of an old class which doesnt exist 
            if(typeof oldClass !== 'undefined')
            {
                if(oldClass != newClass)
                {
                    button = document.querySelector(`.${oldClass}`);
                    button.style.cssText = `color: white;`;
                }
            }
        
            button = document.querySelector(`.${newClass}`);
            button.style.cssText = `color: grey;`;
            oldClass = newClass;

            if(listen.className == "BottomButton BottomBarRightArrow")
            {
                offsetValue += 3;
                TimeBar();
            }
            if(listen.className == "BottomButton BottomBarLeftArrow")
            {
                if(time <= (time + offsetValue - 3))
                {
                    offsetValue -= 3;
                    TimeBar();
                }   
            }
        });
    });  
    
  
});
document.addEventListener("DOMContentLoaded", function() {
    const TopButtons = document.querySelectorAll('.TopButton');
    let date = new Date();
    let day = new Date().getDay();

    let button;
    let newClass;
    let oldClass;
    let dayIndex;
    let errorValue;
    let dateDay;
    let dateMonth;

    TopButtons.forEach(function(listen)
    {
        listen.addEventListener("click", function()
        { 
            //console.log(listen.className);
            //console.log(listen.textContent);

            newClass = listen.className.split(" ");
            newClass = newClass[1]; 

            // Prevents error for when it tries to remove the colour off of an old class which doesnt exist 
            if(typeof oldClass !== 'undefined')
            {
                if(oldClass != newClass)
                {
                    button = document.querySelector(`.${oldClass}`);
                    button.style.cssText = `color: white;`;
                }
            }
        
            button = document.querySelector(`.${newClass}`);
            button.style.cssText = `color: grey;`;
            oldClass = newClass;
            
            if(listen.className == "TopButton TopBarButton1")
            {
                Weather(current, 0);
            }
            dayIndex = newClass.slice(12);
            
            // dateDay sets date to + 1 which means when you click it again it increments again, this line resets the value every time so incrementation doesnt happen
            date = new Date();
            dateMonth = new Date().getMonth();
            
            if(dayIndex == 1) {
                dayIndex = day;
                dateDay = date.getDate();
                dateMonth = dateMonth + 1;
            } else if(dayIndex == 2) {
                dayIndex = day + 1;
                dateDay = new Date(date.setDate(date.getDate() + 1))
                dateMonth = dateDay.getMonth() + 1;
                dateDay = dateDay.getDate(); 
            } else if(dayIndex == 3) {
                dayIndex = day + 2;
                dateDay = new Date(date.setDate(date.getDate() + 2))
                dateMonth = dateDay.getMonth() + 1;
                dateDay = dateDay.getDate();
            } else if(dayIndex == 4) {
                dayIndex = day + 3;
                dateDay = new Date(date.setDate(date.getDate() + 3))
                dateMonth = dateDay.getMonth() + 1;
                dateDay = dateDay.getDate();
            } else if(dayIndex == 5) {
                dayIndex = day + 4;
                dateDay = new Date(date.setDate(date.getDate() + 4))
                dateMonth = dateDay.getMonth() + 1;
                dateDay = dateDay.getDate();
            } else if(dayIndex == 6) {
                dayIndex = day + 5;
                dateDay = new Date(date.setDate(date.getDate() + 5))
                dateMonth = dateDay.getMonth() + 1;
                dateDay = dateDay.getDate();
            }
            
            if(dayIndex > 6)
            {
                // DayNames starts at 0 with sunday, meaning if dayIndex goes over 6 (end of array) it needs to take 7 off to get its valid dayIndex

                // e.g. Today is saturday which is index 6, 5 days in the future is thursday which 6 + 5 = 11, 11 - 7 = 4, 4 equals thursday
                errorValue = dayIndex - 7;
                dayIndex = errorValue;
            }


            DateBar(dayIndex, dateDay, dateMonth);
        });
    });   
});
// Back end code for getting weather data from API
function GetWeather(url)
{
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            })
    })
}

function Weather(url, selectedDay)
{
    GetWeather(url)
        .then(data => {
            if(selectedDay == 0)
            {
                console.log(data);
            }
            else {
                selectedDay--;
            }
        })
        .catch(error => {
            console.log("Error: " + error.message);
        })
}


// Start of JS initialisation
function WeatherDisplay()
{
    let day = new Date().getDay();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    TimeBar();
    DateBar(day, date, month);
}

window.onload =  function()
{
    WeatherDisplay();
}