const apiRoot = 'https://images-api.nasa.gov';

export function search(query:string, page: number){
    return fetch(`${apiRoot}/search?q=${query}&page=${page}`).then(res => res.json());
}

export function getById(id: string){
    return fetch(`${apiRoot}/search?nasa_id=${id}`).then(res => res.json()).then(res=>res?.collection?.items?.[0]);
}