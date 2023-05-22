export interface IItemData{
    center: string,
    date_created: string,
    description: string,
    keywords: string[],
    location: string,
    media_type: string,
    nasa_id: string,
    photographer: string,
    title: string
}

export interface IItemLink{
    href: string,
    rel: string,
    render: string  
}

export interface IItem{
    data: IItemData[],
    href: string,
    links: IItemLink[]
}

export interface ISearchQuery{
    searchQuery: string,
    page: number,
    yearStart: number,
    yearEnd: number
}