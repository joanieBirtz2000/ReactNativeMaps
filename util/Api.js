export const getApi = async () => {
    return fetch('https://my-json-server.typicode.com/frederic-s-f/252-cities/cities')
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
};