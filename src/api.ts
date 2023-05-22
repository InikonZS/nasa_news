const apiRoot = 'https://images-api.nasa.gov';

export function search(query:string, page: number, yearStart?: number, yearEnd?: number){
    console.log(yearStart, yearEnd);
    const years = (yearStart && yearEnd) ? `&year_start=${yearStart}&year_end=${yearEnd}` : '';
    return fetch(`${apiRoot}/search?page_size=10&q=${query}&page=${page}${years}`).then(res => res.json());
}

export function getById(id: string){
    return fetch(`${apiRoot}/search?nasa_id=${id}`).then(res => res.json()).then(res=>res?.collection?.items?.[0]);
}