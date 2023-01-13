export const requestOptions = function(raw = ""){
    var myHeaders = new Headers();
    if (!JSON.parse(window.localStorage.getItem('fromLocal'))) {
    // From MongoDB cloud
        myHeaders.append("Content-Type", "application/{{CONTENT_TYPE}}");
        myHeaders.append("Access-Control-Request-Headers", "*");
        myHeaders.append("api-key", "p4ys6trtqQgRhGraItZr6pDdA15TQB7Ch9mtWErYmsuzMSFs7a9djw7nChAFBeE1");
        myHeaders.append("Accept", "application/{{CONTENT_TYPE}}");
    }
    else{
        myHeaders.append("Content-Type", "application/json");
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
      
    return requestOptions
}

export const url = function(){
    if (!JSON.parse(window.localStorage.getItem('fromLocal'))) {
    // From MongoDB cloud
       return 'https://data.mongodb-api.com/app/data-ykwug/endpoint/data/v1/action/aggregate'
    } else{
        return 'http://127.0.0.1:8000/query/'
    }
}