
export const fetchQuery = (url,headers,then, error = (error) => {console.error(error)}) => {
    fetch(url, headers)
        .then(response => response.json())
        .then(then)
        .catch(error);
}