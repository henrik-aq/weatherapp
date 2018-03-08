/************************************************************************
 * This was an assignment during the JavaScript 2 course at Nackademin. *
 * I have made some changes mainly to test new techniques we            *
 * learn in class.                                                      *
 *                                                                      *
 * For now, this app use HTML5 Geoposition, async/await, DateJS.        *
 * I'd like to add a search bar, add more API-data, try out a           *
 * new API, make my own icons....                                       *
 ************************************************************************/

window.onload = function () { navigator.geolocation.getCurrentPosition(success);}

async function getData(pos){

    let weather = await fetchData(`http://api.apixu.com/v1/forecast.json?key=0dd543a8039545aca6594651182202&q=${pos}&days=6`);
    

    // This creates the current weather card
    let imgCurr = document.createElement('IMG');
    let myTextTagCurr =  document.createElement('p');
    let myTextTagTempCurr = document.createElement('p');
    let textDayTempCurr = document.createTextNode(Math.round(weather.current.temp_c));
    let textDayCurr = document.createTextNode(Date.today().getDayName());

    imgCurr.setAttribute("src", `http:${weather.current.condition.icon}`);
    myTextTagCurr.appendChild(textDayCurr);
    myTextTagTempCurr.appendChild(textDayTempCurr);
    document.getElementById("weatherCard").appendChild(imgCurr);
    document.getElementById("weatherCard").appendChild(myTextTagTempCurr);
    document.getElementById("weatherCard").appendChild(myTextTagCurr);
    
    // This creates the 5 forecast cards
    let imgDay = [];
    let textDay = [];
    let textTemp = [];
    let myTextTag = [];
    let myTextTagTemp = [];

    for (let i = 1; i < 6; i++) {
      imgDay[i] = document.createElement("IMG");
      imgDay[i].setAttribute("src", `http:${weather.forecast.forecastday[i].day.condition.icon}`);
      myTextTag[i] = document.createElement('p');
      myTextTagTemp[i] = document.createElement('p');
      textDay[i] = document.createTextNode(Date.today().add(i).days().getDayName());
      textTemp[i] = document.createTextNode('Max: ' + Math.round(weather.forecast.forecastday[i].day.maxtemp_c) + ' Min: ' + Math.round(weather.forecast.forecastday[i].day.mintemp_c) );
      myTextTag[i].appendChild(textDay[i]);
      myTextTagTemp[i].appendChild(textTemp[i]);
      document.getElementById(`forecastCard${[i]}`).appendChild(imgDay[i]);
      document.getElementById(`forecastCard${[i]}`).appendChild(myTextTagTemp[i]);
      document.getElementById(`forecastCard${[i]}`).appendChild(myTextTag[i]);
    }
};

async function fetchData(url) {
    
    var promise = await fetch(url);
    var data = await promise.json();
    return data;
}

function success(pos) {
    var crd = pos.coords;
    var position = crd.latitude + ',' + crd.longitude;
    getData(position);
  }