export const url = {
    API: 'http://127.0.0.1:8000/'
};


export function GetData() {
    const response = {}
    fetch('http://127.0.0.1:8000/battery/query=1')
        .then((json) => {
            this.response = json
        })
        .catch((error) => {
            console.log(error)
        });
    return response

}

