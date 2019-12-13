import json
import requests
r = requests.get("https://api.cts-strasbourg.eu/v1/siri/2.0/lines-discovery",auth=("14df45e6-40b1-4d94-bce2-0535fcdb1c42",""))
r = r.text
r = json.loads(r)
r = r["LinesDelivery"]["AnnotatedLineRef"]
LineNames = []
LineRef = {}
for i in r:
    LineRef[i["LineRef"]] = i["LineName"]
js = json.dumps(LineRef)
f = open("nouveau document texte.txt","w")
f.write(js)