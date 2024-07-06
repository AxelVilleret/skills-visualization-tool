const fetchData = async () => {
    var backendUrl = process.env.REACT_APP_BACKEND_URL;
    if (!backendUrl) {
        backendUrl = process.env.PUBLIC_URL + "/data/data.json";
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    //if the token is not present, the fetch will fail
    if (!token && process.env.REACT_APP_BACKEND_URL) {
        throw new Error("Token is not present");
    }
    const response = await fetch(backendUrl, {  headers: { 'Authorization': `Bearer ${token}` } })
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
};

export { fetchData };