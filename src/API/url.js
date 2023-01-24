export const requestOptions = function(raw = ""){
    var myHeaders = new Headers();
    if (!JSON.parse(window.localStorage.getItem('fromLocal'))) {
    // From MongoDB cloud
        myHeaders.append("Content-Type", "application/json");
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
        return 'http://192.168.217.183:8000/query/'
    } else{
        return 'http://127.0.0.1:8000/query/'
    }
}
