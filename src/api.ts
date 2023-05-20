const apiRoot = 'https://images-api.nasa.gov';

export function search(query:string){
    return fetch(`${apiRoot}/search?q=${query}`).then(res => res.json());
}