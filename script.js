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
// just a commit test
//##################################################################################
const token = "14df45e6-40b1-4d94-bce2-0535fcdb1c42"
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://api.cts-strasbourg.eu/v1/siri/2.0/stoppoints-discovery"

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
getStopNames()

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
