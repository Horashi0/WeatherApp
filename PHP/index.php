<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="../CSS/index.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="../JS/index.js"></script>
    </head>
    <body>
    <header>
        <a href="index.php"><h1 class="LogoHeader">WeatherApp</h1></a>
        <a href="#"><h1 class="Contact">Contact</h1></a>
        <a href="#"><h1 class="Account">Account</h1></a>
        <button class="hamburger">
            <!-- material icons https://material.io/resources/icons/ -->
            <i class="menuIcon material-icons" onclick="display();">menu</i>
            <i class="closeIcon material-icons" onclick="hide();">close</i>
        </button>
    </header>

    <div class="searchBox">
        <div class="inputBox">
            <input class="inputField" type="text" placeholder="Please type here .... ">
        </div>
    </div>
    
    <div class="Map">
    
    </div>
    <div class="Weather">
        <div class="box box1"></div>
        <div class="box box2"></div>
        <div class="box box3"></div>
        <div class="box box4"></div>
        <div class="box box5"></div>
        <div class="box box6"></div>
    </div>
    </body>
</html>