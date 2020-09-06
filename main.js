//function to call the weather api and get data
function weatherBalloon( latitude , longitude ) {
    var key = '01a025a4ce6291369284b53bc3f0d61f';
    var long = longitude;
    var lat = latitude;
    
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&appid='+ key)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      //console.log(data);
      extractWeather(data);
      
    })
    
    
}

    
   
//initial function that loads while loading window
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(call);
        updateDate();
        
      } else { 
        console.log("Browser doesn't support geolocation")
      }
}
    
    
//function to get geolocation
function call(position) {
    weatherBalloon(position.coords.latitude,position.coords.longitude);
}
    

//function to extract data from api data and update in html
function extractWeather(data){
        var place = document.getElementById("place");
        var degree = document.getElementById("deg");
        var description = document.getElementById("des");
        var weatherIcons = document.getElementById("icon");
        var imgLink = "http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png";
        place.innerHTML = data.name+','+data.sys.country;
        degree.innerHTML = Math.round(parseFloat(data.main.temp)-273.15) ;
        description.innerHTML = data.weather[0].description.toUpperCase();
        weatherIcons.src =  imgLink;
        
        
        

}

//function to update date
function updateDate(){
    var date = document.getElementById("todayDate");
    var today = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    date.innerHTML = today.getDate()+' '+month[today.getMonth()]+' '+today.getFullYear();
    

    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);

    var time = document.getElementById("pTime");
    time.innerHTML = h+":"+m+" IST";
    
    var t = setTimeout(updateDate, 500);
}

//function to check the time and change the digit
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}



//function to change the celsius to fahrenhait

function fahrenhait(){
  
  var deg = document.getElementById("degTemp");
  var state = deg.getAttribute("data-state");
  if(state === "cel")
  {
    var cels = parseInt( document.getElementById("deg").innerHTML);
    var fahren = Math.round(parseFloat(cels*(9/5))+32);
    document.getElementById("deg").innerHTML = fahren;
    deg.setAttribute("data-state","far");
    document.getElementById("degType").innerHTML="&#8457;";
  }
  else{
    var fars = parseInt( document.getElementById("deg").innerHTML);
    var cel = Math.round(parseFloat((fars-32)*(5/9)));
    document.getElementById("deg").innerHTML = cel;
    deg.setAttribute("data-state","cel");
    document.getElementById("degType").innerHTML="&#8451;";

  }
  
  //console.log(state);
}


  
