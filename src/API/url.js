export const requestOptions = function(raw = "", method = 'POST'){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: method,
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
      
    return requestOptions
}

export const url = function(){
    return 'http://192.168.217.183:8000/'
}

export const djangoFetch = (_url = '', _options = '', _method = 'GET', _body = '') => {
    const serverURL = 'http://192.168.217.183:8000';
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: _method,
        headers: myHeaders,
        body: _method=='GET'? null : _body,
        redirect: 'follow'
    };

    return fetch(serverURL  +_url + _options, requestOptions).catch((e) => console.error(e));
}