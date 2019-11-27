function doubleCut(list){
    let l = []
    list.forEach(function(element){
        if(l.includes(element)){}
        else{
            l.push(element)
        }
    })
    return l;
}

function addFav(arg){
    favoris.push(arg)
    localStorage.setItem("favoris",favoris)
}


// just a commit test
// localStorage
//##################################################################################
const token = "14df45e6-40b1-4d94-bce2-0535fcdb1c42"
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://api.cts-strasbourg.eu/v1/siri/2.0/stoppoints-discovery"
let favoris = ["174"]

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

let getStopNames = async function(){
    let data = await fetch(proxyurl+url,cts).then(response=>response.json()).then(function(response){
        response.StopPointsDelivery.AnnotatedStopPointRef.forEach(function(element){
            stopnames.push(element.StopName)
            nameCode[element.StopName]=element.Extension.LogicalStopCode
        })
        datalist = document.getElementById('stopnames')
        stopnames = doubleCut(stopnames)
        stopnames.forEach(function(element){
            datalist.innerHTML = datalist.innerHTML+'<option value=\"'+element+'\"></option>'
        })
    })
}

let fetchSchedules = async function(arg){
    let data = await fetch(proxyurl + "https://api.cts-strasbourg.eu/v1/siri/2.0/stop-monitoring?MonitoringRef="+arg+"&MonitoringRef=" ,cts)
    return data
}

function SetSchedules(json){
  var d = new Date();
  let actualTime = new Date()
  let actualSecond = actualTime.getHours()*3600 + actualTime.getMinutes()*60
  let array = json.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit
  let list = []
  array.forEach(function(element){
    let data = element.MonitoredVehicleJourney
    let ExpectedArrivalTime = data.MonitoredCall.ExpectedArrivalTime.split("T")[1].split("+")[0].split(":")
    let hours = ExpectedArrivalTime[0]
    hours = Number(hours)
    let minutes = ExpectedArrivalTime[1]
    minutes = Number(minutes)
    let seconds = hours*3600+minutes*60
    let secondDif = seconds - actualSecond
    minutesRemaining = String(Math.trunc(secondDif/60))+"'";
    ExpectedArrivalTime = ExpectedArrivalTime[0]+":"+ExpectedArrivalTime[1]
    list.push(data.LineRef+" - "+data.DestinationName+": "+ExpectedArrivalTime + " - " + minutesRemaining)
  })
  return list
}

let StopMonitor = async function(arg){
  let data = await fetchSchedules(arg).then(response=>response.json()).then(json=>SetSchedules(json))
  return data
}
getStopNames()
StopMonitor("174").then(response=>console.log(response))


let home = document.getElementById('favBut')
let homeBut = document.getElementById('fav')
let other1 = document.getElementById('other1')
let other1But = document.getElementById('other1But')
let other2 = document.getElementById('other2')
let other2But = document.getElementById('other2But')
const buttons = [home,other1,other2]
const favInner ="<button type=\"button\" id=\"fav\" onclick=\"homeF()\"><i class=\"fas fa-star\" id=\"favBut\"></i></button><button type=\"button\" id=\"other1\" onclick=\"other1F()\"><i class=\"far fa-star\" id=\"other1But\"></i></button><button type=\"button\" id=\"other2\" onclick=\"other2F()\"><i class=\"far fa-star\" id=\"other2But\"></i></button>"
const other1Inner = "<button type=\"button\" id=\"fav\" onclick=\"homeF()\"><i class=\"far fa-star\" id=\"favBut\"></i></button><button type=\"button\" id=\"other1\" onclick=\"other1F()\"><i class=\"fas fa-star\" id=\"other1But\"></i></button><button type=\"button\" id=\"other2\" onclick=\"other2F()\"><i class=\"far fa-star\" id=\"other2But\"></i></button>"
const other2Inner = "<button type=\"button\" id=\"fav\" onclick=\"homeF()\"><i class=\"far fa-star\" id=\"favBut\"></i></button><button type=\"button\" id=\"other1\" onclick=\"other1F()\"><i class=\"far fa-star\" id=\"other1But\"></i></button><button type=\"button\" id=\"other2\" onclick=\"other2F()\"><i class=\"fas fa-star\" id=\"other2But\"></i>"

function homeF(){
    document.getElementById("bottom").innerHTML = favInner
}
function other1F(){
  document.getElementById("bottom").innerHTML = other1Inner
}
function other2F(){
  document.getElementById("bottom").innerHTML = other2Inner
}






/*.then(response=>response.json())
.then(json=>json.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit)
.then(function(array){
  let list = []
  array.forEach(function(element){
    let data = element.MonitoredVehicleJourney
    let ExpectedArrivalTime = data.MonitoredCall.ExpectedArrivalTime.split("T")[1].split("+")[0].split(":")
    let hours = ExpectedArrivalTime[0]
    hours = Number(hours)
    let minutes = ExpectedArrivalTime[1]
    minutes = Number(minutes)
    let seconds = hours*3600+minutes*60
    let secondDif = seconds - actualSecond
    minutesRemaining = String(Math.trunc(secondDif/60))+"'";
    ExpectedArrivalTime = ExpectedArrivalTime[0]+":"+ExpectedArrivalTime[1]
    list.push(data.LineRef+" - "+data.DestinationName+": "+ExpectedArrivalTime + " - " + minutesRemaining)
  })
  return list
})*/
