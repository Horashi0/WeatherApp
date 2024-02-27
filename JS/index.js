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
function DateBar()
{
    let content;
    let textNode;
    let dayDisplay = document.querySelector('.DisplayDay');
    let dateDisplay = document.querySelector('.DisplayDate');

    const date = new Date();

    var day = date.getDay();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    if(dd < 10){dd = '0' + dd};
    if(mm < 10){ mm = '0' + mm};

    const formattedDate = dd + "." + mm + "." + yyyy;

    for(var i = 1; i <= 6; i++)
    {
        let button = document.querySelector('.TopBarButton' + i);

        if(i == 1) {
            content = "Today";

            textNode = document.createTextNode(dayNames[day]);
            dayDisplay.appendChild(textNode);
            
            textNode = document.createTextNode(formattedDate);
            dateDisplay.appendChild(textNode);
        } else if(i == 2) {
            content = "Tomorrow";
        } else if (i == 3) {
            content = OrdinalSuffix(day + 2);
        } else if (i == 4) {
            content = OrdinalSuffix(day + 3);
        } else if (i == 5) {
            content = OrdinalSuffix(day + 4);
        } else if (i == 6) {
            content = OrdinalSuffix(day + 5);
        }
        
        textNode = document.createTextNode(content);
        button.appendChild(textNode);
    }
}

function TimeBar()
{
    for(var i = 1; i <= 5; i++)
    {
        var box = document.querySelector('.BottomBarButton' + i);
        var time = new Date().getHours();

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

        var roundedTime = Math.ceil(time/3.0) * 3;
        var content;
        var textNode;

        box.innerHTML = ""; 

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
        box.appendChild(textNode);
    }
}

// Start of formatting JS section
function FormatTime(content)
{
    // Corrects error so instead of time being 27:00 it is 03:00
    var errorAmount = 0;
    var string = "";

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
    var time = new Date().getHours();

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

    let button;
    let newClass;
    let oldClass;
    
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
    TimeBar();
    DateBar();
}

window.onload =  function()
{
    WeatherDisplay();
}