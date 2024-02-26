const forecast = "https://horashio.co.uk:5000/forecast?q=Boston";
const current = "https://horashio.co.uk:5000/current?q=Boston";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var offsetValue = 0;

function display()
{
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.closeIcon').style.display = 'inline';
        document.querySelector('.menuIcon').style.display = 'none';
    });
    displayMenus();
}

function hide()
{
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.closeIcon').style.display = 'none';
        document.querySelector('.menuIcon').style.display = 'inline';
    });
    hideMenus();
}

function displayMenus()
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

function hideMenus()
{
    let contact = document.querySelector('.Contact').style.display = 'none';
    let account = document.querySelector('.Account').style.display = 'none';
}

window.onload =  function()
{
    dateBar();
    timeBar();
}


function dateBar()
{
    for(var i = 1; i <= 6; i++)
    {
        var box = document.querySelector('.TopBarBox' + i);
        var dayBox = document.querySelector('.Day');
        dayBox.style.cssText = "font-size: 30px;";
        var date = new Date().getDate();
        var day = new Date().getDay();
        var content;
        var textNode;
        if(i == 1) {
            content = "Today";

            textNode = document.createTextNode(dayNames[day]);
            dayBox.appendChild(textNode);
        } else if(i == 2) {
            content = "Tomorrow";
        } else if (i == 3) {
            content = ordinalSuffix(date + 2);
        } else if (i == 4) {
            content = ordinalSuffix(date + 3);
        } else if (i == 5) {
            content = ordinalSuffix(date + 4);
        } else if (i == 6) {
            content = ordinalSuffix(date + 5);
        }
        textNode = document.createTextNode(content);
        box.appendChild(textNode);

        
    }
}

function timeBar()
{
    for(var i = 1; i <= 5; i++)
    {
        var box = document.querySelector('.BottomBarBox' + i);
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
            console.log(offsetValue);
        }

        var roundedTime = Math.ceil(time/3.0) * 3;
        var content;
        var textNode;

        box.innerHTML = ""; 

        if(i == 1 && offsetValue == 0) {
            content = "Now";
        } else if(i == 2) {
            content = formatTime(roundedTime + offsetValue);
        } else if (i == 3) {
            content = formatTime(roundedTime + 3 + offsetValue);
        } else if (i == 4) {
            content = formatTime(roundedTime + 6 + offsetValue);
        } else if (i == 5) {
            content = formatTime(roundedTime + 9 + offsetValue);
        } else {
            content = formatTime(roundedTime + offsetValue - 3)
        }
        
        textNode = document.createTextNode(content);
        box.appendChild(textNode);
    }
}

function formatTime(content)
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



function ordinalSuffix(number)
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

document.addEventListener("DOMContentLoaded", function() {
        const boxButtons = document.querySelectorAll('.TopBox');

        boxButtons.forEach(function(listen)
        {
            listen.addEventListener("click", function()
            { 
                console.log(listen.className);
                //console.log(listen.textContent);
                if(listen.className == "TopBox TopBarBox1")
                {
                    weather(current, 0);
                }
            });
        });    
});

document.addEventListener("DOMContentLoaded", function() {
    const boxButtons = document.querySelectorAll('.BottomBox');

    boxButtons.forEach(function(listen)
    {
        
        listen.addEventListener("click", function()
        { 
            console.log(listen.className);
            //console.log(listen.textContent);
            if(listen.className == "BottomBox BottomBarRightArrow")
            {
                offsetValue += 3;
                timeBar();
            }
            if(listen.className == "BottomBox BottomBarLeftArrow")
            {
                offsetValue -= 3;
                timeBar();
            }
        });
    });    
});


function getWeather(url)
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

function weather(url, selectedDay)
{
    getWeather(url)
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
