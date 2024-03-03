export function TimeBar(selectedDay)
{
    let time = new Date().getHours();
    let roundedTime = Math.ceil(time/3.0) * 3;
    let content;
    let textNode;
    
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

        button.innerHTML = ""; 
        if(selectedDay == 1)
        {
            if(i == 1 && OffsetValue == 0) {

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
            
        
        textNode = document.createTextNode(content);
        button.appendChild(textNode);

        // When content hits 00:00 it gets removed due to it not being in the same day anymore, this if satement hides the element so the time is still spread evenly
        if(button.innerHTML.trim() == "")
        {
            button.style.cssText = "display: none;";
        }
    }
   
}