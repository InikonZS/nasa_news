const apiRoot = 'https://images-api.nasa.gov';

export function search(query:string, page: number){
    return fetch(`${apiRoot}/search?q=${query}&page=${page}`).then(res => res.json());
}