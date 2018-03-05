window.onload = async function getData(){

    let weather = await fetchData('http://api.apixu.com/v1/forecast.json?key=0dd543a8039545aca6594651182202&q=Stockholm,Sweden&days=6');


    // Creates a shitload of img elements
    let imgCurr = document.createElement('IMG');
    let imgDay1 = document.createElement('IMG');
    let imgDay2 = document.createElement('IMG');
    let imgDay3 = document.createElement('IMG');
    let imgDay4 = document.createElement('IMG');
    let imgDay5 = document.createElement('IMG');
    
    // set attribute src to each new img element using images hosted by API
    imgCurr.setAttribute("src", `http:${weather.current.condition.icon}`);
    imgDay1.setAttribute("src", `http:${weather.forecast.forecastday[1].day.condition.icon}`);
    imgDay2.setAttribute("src", `http:${weather.forecast.forecastday[2].day.condition.icon}`);
    imgDay3.setAttribute("src", `http:${weather.forecast.forecastday[3].day.condition.icon}`);
    imgDay4.setAttribute("src", `http:${weather.forecast.forecastday[4].day.condition.icon}`);
    imgDay5.setAttribute("src", `http:${weather.forecast.forecastday[5].day.condition.icon}`);
    
    // Get the current temp
    let tempCurr = weather.current.temp_c;

    // Get the average temp of the coming 5 days
    let tempDay1 = weather.forecast.forecastday[1].day.avgtemp_c;
    let tempDay2 = weather.forecast.forecastday[2].day.avgtemp_c;
    let tempDay3 = weather.forecast.forecastday[3].day.avgtemp_c;
    let tempDay4 = weather.forecast.forecastday[4].day.avgtemp_c;
    let tempDay5 = weather.forecast.forecastday[5].day.avgtemp_c;

    // Create a shitload of p elements
    let myTextTagCurr =  document.createElement('p');
    let myTextTag1 = document.createElement('p');
    let myTextTag2 = document.createElement('p');                  
    let myTextTag3 = document.createElement('p');
    let myTextTag4 = document.createElement('p');
    let myTextTag5 = document.createElement('p');

    // Add temperature and day name using DateJS
    let textDayCurr = document.createTextNode(Math.round(tempCurr) + ' ' + Date.today().getDayName());
    let textDay1 = document.createTextNode(Math.round(tempDay1) + ' ' + Date.today().add(1).days().getDayName());
    let textDay2 = document.createTextNode(Math.round(tempDay2) + ' ' + Date.today().add(2).days().getDayName());
    let textDay3 = document.createTextNode(Math.round(tempDay3) + ' ' + Date.today().add(3).days().getDayName());
    let textDay4 = document.createTextNode(Math.round(tempDay4) + ' ' + Date.today().add(4).days().getDayName());
    let textDay5 = document.createTextNode(Math.round(tempDay5) + ' ' + Date.today().add(5).days().getDayName());

    // Lets add the above text to each text element
    myTextTagCurr.appendChild(textDayCurr);
    myTextTag1.appendChild(textDay1);
    myTextTag2.appendChild(textDay2);
    myTextTag3.appendChild(textDay3);
    myTextTag4.appendChild(textDay4);
    myTextTag5.appendChild(textDay5);
    
    // And finally dive into the append party... 
    document.getElementById("weatherCard").appendChild(myTextTagCurr);
    document.getElementById("weatherCard").appendChild(imgCurr);
    document.getElementById("forecastCard1").appendChild(myTextTag1);
    document.getElementById("forecastCard1").appendChild(imgDay1);
    document.getElementById("forecastCard2").appendChild(myTextTag2);
    document.getElementById("forecastCard2").appendChild(imgDay2);
    document.getElementById("forecastCard3").appendChild(myTextTag3);
    document.getElementById("forecastCard3").appendChild(imgDay3);
    document.getElementById("forecastCard4").appendChild(myTextTag4);
    document.getElementById("forecastCard4").appendChild(imgDay4);
    document.getElementById("forecastCard5").appendChild(myTextTag5);
    document.getElementById("forecastCard5").appendChild(imgDay5);

};

async function fetchData(url) {
    
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
}