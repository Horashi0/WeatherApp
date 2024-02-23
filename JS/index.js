const forecast = "https://horashio.co.uk:5000/forecast?q=Boston";
const current = "https://horashio.co.uk:5000/current?q=Boston";

/*var offsetValue = 0;*/

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
        var date = new Date().getDate();
        var content;
        var textNode;
        if(i == 1)
        {
            content = "Today";
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
        var roundedTime = Math.ceil(time/3.0) * 3;
        var content;
        var textNode;

        if(i == 1) {
            content = "Now";
        } else if(i == 2) {
            content = roundedTime;
        } else if (i == 3) {
            content = roundedTime + 3;
        } else if (i == 4) {
            content = roundedTime + 6;
        } else if (i == 5) {
            content = roundedTime + 9;
        }
        
        textNode = document.createTextNode(content);
        box.appendChild(textNode);
    }
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
/*
document.addEventListener("DOMContentLoaded", function() {
    const boxButtons = document.querySelectorAll('.BottomBox');

    boxButtons.forEach(function(listen)
    {
        listen.addEventListener("click", function()
        { 
            //console.log(listen.className);
            //console.log(listen.textContent);
            if(listen.className == "BottomBox BottomBarRightArrow")
            {
                zoffsetValue =+ 3;
                timeBar();
            }
            f(listen.className == "BottomBox BottomBarLeftArrow")
            {
                offsetValue =- 3;
                timeBar;
            }
        });
    });    
});
*/

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
