const Forecast = "https://horashio.co.uk:5000/forecast?q=Boston";
const Current = "https://horashio.co.uk:5000/current?q=Boston";

const DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var OffsetValue = 0;

//Defaults to Today and Now so it can load weather information on startup
var SelectedDay = 1;
var PreviousSelectedDay = 1;
var SelectedTime = "Now";
var PreviousSelectectedTime = "Now";
var DisableArrows = 0;

var SelectedDate;
var SelectedMonth;
var DayIndex;

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
function DateBar(dateDay, dateMonth)
{
    let content;
    let textNode;
    let dateDisplay = document.querySelector('.DisplayDate');
    let dayDisplay = document.querySelector('.DisplayDay');

    const date = new Date();
    let dd = dateDay;
    let mm = dateMonth;
    const yyyy = date.getFullYear();

    if(dd < 10){dd = '0' + dd};
    if(mm < 10){ mm = '0' + mm};

    const formattedDate = dd + "." + mm + "." + yyyy;

    for(var i = 1; i <= 6; i++)
    {   
        let dateTemp = new Date();
        let day = new Date(dateTemp.setDate(dateTemp.getDate() + (i - 1)));
        day = day.getDate();

        let button = document.querySelector('.TopBarButton' + i);
        button.innerHTML = ""; 
        if(i == 1) {
            content = "Today";
        } else if(i == 2) {
            content = "Tomorrow";
        } else if (i == 3) {
            content = OrdinalSuffix(day);
        } else if (i == 4) {
            content = OrdinalSuffix(day);
        } else if (i == 5) {
            content = OrdinalSuffix(day);
        } else if (i == 6) {
            content = OrdinalSuffix(day);
        }
        
        textNode = document.createTextNode(content);
        button.appendChild(textNode);
    }

    dateDisplay.innerHTML = "";
    dayDisplay.innerHTML = "";

    textNode = document.createTextNode(formattedDate);
    dateDisplay.appendChild(textNode);

    textNode = document.createTextNode(DayNames[DayIndex]);
    dayDisplay.appendChild(textNode);
}

function TimeBar(newClass, oldClass)
{
    let previousButton;
    let time = new Date().getHours();
    for(var i = 1; i <= 5; i++)
    {
        let button = document.querySelector('.BottomBarButton' + i);
        // Display block makes sure all elements are showing before adding content as some elements are hidden if they have no value due to day overrun
        button.style.cssText = "display: block;";
        // If time is 03:00 etc then the next time shows as the current time so this prevents it by adding one
        if(time % 3 == 0)
        {
            time += 1;
        }

        // Prevents day lapping
        if(OffsetValue >= 12)
        {
            OffsetValue -= 3;
        }

        let roundedTime = Math.ceil(time/3.0) * 3;
        let content;
        let textNode;

        button.innerHTML = ""; 
        if(SelectedDay == 1)
        {
            if(i == 1 && OffsetValue == 0) {
                content = "Now";
                button.style.cssText = `color: grey;`;
            } else if(i == 2) {
                content = FormatTime(roundedTime + OffsetValue);
            } else if (i == 3) {
                content = FormatTime(roundedTime + 3 + OffsetValue);
            } else if (i == 4) {
                content = FormatTime(roundedTime + 6 + OffsetValue);
            } else if (i == 5) {
                content = FormatTime(roundedTime + 9 + OffsetValue);
            } else {
                content = FormatTime(roundedTime + OffsetValue - 3)
            }

            // If content is 00:00 and it isnt the first time, then we know the time bar is leaking over to the next day so we disable arrows
            if(content == "00:00" && button != ".BottomBarButton1")
            {
                content = "";
                DisableArrows = 1;
            }

            // This then makes any time after 00:00 also empty 
            if(DisableArrows == 1)
            {
                content = "";
            }
        }
        else
        {
            DisableArrows = 0;
            roundedTime = 0;
            if(i == 1) {
                content = FormatTime(roundedTime + OffsetValue);
            } else if(i == 2) {
                content = FormatTime(roundedTime + OffsetValue + 3);
            } else if (i == 3) {
                content = FormatTime(roundedTime + OffsetValue + 6);
            } else if (i == 4) {
                content = FormatTime(roundedTime + OffsetValue + 9);
            } else if (i == 5) {
                content = FormatTime(roundedTime + OffsetValue + 12);
            }
        }

        // This allows time to stay greyed out when changing day
        if(SelectedTime == content || button.textContent == SelectedTime)
        {
            button.style.cssText = `color: grey;`;
            
        }

        if(content == PreviousSelectectedTime && !newClass.includes("Arrow"))
        {
            button.style.cssText = `color: white;`;
        }
            
        
        textNode = document.createTextNode(content);
        button.appendChild(textNode);

        // When content hits 00:00 it gets removed due to it not being in the same day anymore, this if satement hides the element so the time is still spread evenly
        if(button.innerHTML.trim() == "")
        {
            button.style.cssText = "display: none;";
        }
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
    let day;
    let dateMonth;
    let dateDay;

    BottomButtons.forEach(function(listen)
    {
        
        listen.addEventListener("click", function()
        { 
            //console.log(listen.className);
            //console.log(listen.textContent);

            // Due to a logic bug occasionally Now is still higlighted grey so this makes sure that doesnt happen
            if (listen.textContent != "Now" && SelectedDay == 1) {
                // Reset color of "Now" button
                document.querySelector(".BottomBarButton1").style.cssText = `color: white;`;
            }

            newClass = listen.className.split(" ");
            newClass = newClass[1]; 

            // Prevents SelectedTime being updated so when using arrows the time stays highlighted
            if(newClass != "BottomBarLeftArrow" && newClass != "BottomBarRightArrow")
            {
                PreviousSelectectedTime = SelectedTime;
                SelectedTime = listen.textContent;
                if(PreviousSelectedDay != SelectedDay && PreviousSelectectedTime == "Now")
                {
                    PreviousSelectectedTime = SelectedTime;
                }
                console.log(PreviousSelectectedTime);
                console.log(SelectedTime);
            }
    
            // Prevents error for when it tries to remove the colour off of an old class which doesnt exist 
            if(typeof oldClass !== 'undefined')
            {
                if(oldClass != newClass && newClass != "BottomBarLeftArrow" && newClass != "BottomBarRightArrow")
                {
                    button = document.querySelector(`.${oldClass}`);
                    button.style.cssText = `color: white;`;
                }
            } else {
                button = document.querySelector(".BottomBarButton1");
                button.style.cssText = `color: white;`;
            }
        
            button = document.querySelector(`.${newClass}`);
            if(newClass != "BottomBarRightArrow" && newClass != "BottomBarLeftArrow")
            {
                button.style.cssText = `color: grey;`;
            }
           
            oldClass = newClass;
            
            if(listen.className == "BottomButton BottomBarRightArrow")
            {
                if(DisableArrows == 0)
                {
                    OffsetValue += 3;
                    TimeBar(newClass, oldClass);
                }
                
            }
            else if(listen.className == "BottomButton BottomBarLeftArrow")
            {
                if(DisableArrows == 0)
                {
                    if(time <= (time + OffsetValue - 3))
                    {
                        OffsetValue -= 3;
                        TimeBar(newClass, oldClass);
                    }   
                }
            }
            Weather();
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
    let errorValue;
    let dateDay;
    let dateMonth;
    let dateYear;

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
            } else {
                button = document.querySelector(".TopBarButton1");
                button.style.cssText = `color: white;`;
            }

            button = document.querySelector(`.${newClass}`); 

            if(newClass != "BottomBarRightArrow" && newClass != "BottomBarLeftArrow")
            {
                button.style.cssText = `color: grey;`;
            }

            oldClass = newClass;
            
            DayIndex = newClass.slice(12);
            PreviousSelectedDay = SelectedDay;
            SelectedDay = DayIndex;

            // dateDay sets date to + 1 which means when you click it again it increments again, this line resets the value every time so incrementation doesnt happen
            date = new Date();
            dateMonth = new Date().getMonth();

            for(let i = 0; i < 7; i++)
            {
                if(DayIndex == i) {
                    DayIndex = day + (i - 1);
                    dateDay = new Date(date.setDate(date.getDate() + (i - 1)))
                    dateMonth = dateDay.getMonth() + 1;
                    dateDay = dateDay.getDate();
                    break;
                }
            }
            
            SelectedDate = new Date();
            SelectedMonth = new Date().getMonth();

            SelectedDate = dateDay;
            SelectedMonth = dateMonth;

            if(DayIndex > 6)
            {
                // DayNames starts at 0 with sunday, meaning if DayIndex goes over 6 (end of array) it needs to take 7 off to get its valid DayIndex

                // e.g. Today is saturday which is index 6, 5 days in the future is thursday which 6 + 5 = 11, 11 - 7 = 4, 4 equals thursday
                errorValue = DayIndex - 7;
                DayIndex = errorValue;
            }


            DateBar(DayIndex, dateDay, dateMonth);            
            if(SelectedDay != PreviousSelectedDay)
            {
                if(SelectedDay == 1)
                {
                    OffsetValue = 0;
                    TimeBar();   
                }
                else 
                {
                    TimeBar();
                }
                         
            }
            Weather();
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

function ConvertKelvin(kelvin)
{
    kelvin = kelvin - 273.15;
    return Math.round(kelvin, 0);
}

function Weather()
{
    var url;
    var textNode;
    var tempDisplay = document.querySelector(".DisplayTemperature");
    
    const yyyy = new Date().getFullYear();
    let dd = SelectedDate;
    let mm = SelectedMonth;

    if(dd < 10){dd = '0' + dd};
    if(mm < 10){ mm = '0' + mm};
    const formattedString = yyyy + "-" + mm + "-" + dd + ` ${SelectedTime}:00`;
    if(SelectedTime == "Now")
    {
        url = Current;
    } else {
        url = Forecast;
    }

    GetWeather(url)
        .then(data => {
            if(url == Forecast)
            {
                const filteredData = data.list.filter(forecast => {
                    // Cleaning data to have valid values
                    const forecastDate = forecast.dt_txt;
                    return forecastDate == formattedString;
                })  
                console.log(filteredData);
            } else {
                /*temp_celsius = ConvertKelvin(data.main.temp);
                textNode = document.createTextNode(temp_celsius + "°");
                tempDisplay.appendChild(textNode);*/
                console.log(data);
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
    let button;

    DateBar(day, date, month);
    TimeBar();
    

    button = document.querySelector(".TopBarButton1");
    button.style.cssText = `color: grey;`;
    button.click(); // Click event due to the fact the program doesnt know what day is selected unlesss a button is pressed
    
    button = document.querySelector(".BottomBarButton1");
    button.style.cssText = `color: grey;`;

    Weather();
}

window.onload =  function()
{
    WeatherDisplay();
}