const token = "14df45e6-40b1-4d94-bce2-0535fcdb1c42"
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');
headers.append('Authorization', 'Basic ' + btoa(token + ":" + "password"));
let nameCode = {}
let stopnames = []
let cts = {
    method: "GET",
    headers: headers,
    mode : "cors"
}
const url = "https://api.cts-strasbourg.eu/v1/siri/2.0/estimated-timetable?LineRef=2"
fetch(proxyurl+url,cts).then(response=>response.json())
.then(json=>json.ServiceDelivery.EstimatedTimetableDelivery[0].EstimatedJourneyVersionFrame[0].EstimatedVehicleJourney[0].EstimatedCalls)
.then(function(array){
  array.forEach(function(element){
    document.getElementById('paragraphe').innerHTML = document.getElementById('paragraphe').innerHTML +"</br>" + element.StopPointName
  })
})
//.then(json=>console.log(json.ServiceDelivery.EstimatedTimetableDelivery[0].EstimatedJourneyVersionFrame))
﻿
