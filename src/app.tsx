import React, { useEffect, useState } from 'react';
import {getById, search} from './api';
import {
    createBrowserRouter,
    Link,
    RouterProvider,
    useNavigation,
    useParams,
} from "react-router-dom";
import "./style.css";
  
interface IItemData{
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

interface IItemLink{
    href: string,
    rel: string,
    render: string  
}

interface IItem{
    data: IItemData[],
    href: string,
    links: IItemLink[]
}

export function App(){
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage />,
        },
        {
            path: "/item/:id",
            element: <ItemPage />
        }
    ]);
    return <RouterProvider router={router} />
}

export function ItemPage(){
    const navigation = useNavigation();
    const params = useParams();
    console.log(navigation, params);
    const [item, setItem] = useState<IItem>();
    const [resources, setResources] = useState<Array<string>>();
    useEffect(()=>{
        getById(params?.['id']).then((response)=>{
            setItem(response);
        });
    }, [params?.['id']]);

    useEffect(()=>{
        item?.href && fetch(item.href).then(res=> res.json()).then((res)=>{
            setResources(res);
        });
    }, [item]);
    return <div>
        <Link to='/'>back</Link>
        item: {params?.['id']}
        <div>
            <h3>
                {item?.data?.[0]?.title}
            </h3>
            <div>
                {item?.data?.[0]?.description}
            </div>
            {<img src={item?.links?.[0]?.href}></img>}
        </div>
        <div>
            {resources && resources.map(it=>{
                if (it.endsWith('mp4') || it.endsWith('avi') || it.endsWith('webm') || it.endsWith('ogv')){
                    return <div>
                        it: 
                        <video controls={true} src={it}></video>
                    </div>
                } else if (it.endsWith('jpg') || it.endsWith('jpeg') || it.endsWith('png')){
                    return <img src=''></img>
                } else if (it.endsWith('m4a') || it.endsWith('mp3')){
                    return <div>
                        it:
                        <audio controls={true} src={it}></audio>
                    </div>
                } else {
                    return <div>
                        resource: 
                        <a href={it}>{it}</a>
                    </div>
                }
            })}
        </div>
    </div>
}

export function MainPage(){
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);
    const [results, setResults] = useState<any>();    
    const [yearStartInput, setYearStartInput] = useState<null | number>();
    const [yearEndInput, setYearEndInput] = useState<null | number>();
    const [yearStart, setYearStart] = useState<null | number>();
    const [yearEnd, setYearEnd] = useState<null | number>();
    useEffect(()=>{
        search(searchQuery, page, yearStart, yearEnd).then((response)=>{
            setResults(response.collection);
            console.log(response);
        });
    }, [searchQuery, page, yearStart, yearEnd]);


    return (<>
        <div>
            <input type="text" onChange={(e)=>{
                setSearchInput(e.target.value);
            }}/>
            <label htmlFor='year-start'>from year</label>
            <input id='year-start' type="text" onChange={(e)=>{
                console.log(Number.parseInt(e.target.value));
                setYearStartInput(Number.parseInt(e.target.value));
            }}/>

            <label htmlFor='year-end'>to year</label>
            <input id='year-end' type="text" onChange={(e)=>{
                setYearEndInput(Number.parseInt(e.target.value));
            }}/>
            <button onClick={()=>{
                setSearchQuery(searchInput);
                setYearEnd(yearEndInput);
                setYearStart(yearStartInput);
            }}>search</button>
            <div>
                {
                    (()=>{
                        if (results && Array.isArray(results.items)){
                            return results.items.map((item: IItem)=>{
                                return (
                                    <div>
                                        <h3>
                                            {item?.data?.[0]?.title}
                                        </h3>
                                        <div>
                                            {item?.data?.[0]?.description?.slice?.(0, 100)}
                                        </div>
                                        <Link to={`/item/${item?.data?.[0]?.nasa_id}`}>open</Link>
                                        {/*<img src={item?.links?.[0]?.href}></img>*/}
                                    </div>
                                )
                            })
                        } else {
                            return 'no results'
                        }
                    })()
                }
            </div>
            <div>
                {   <>
                    <div>total {
                       Math.ceil((results?.metadata.total_hits || 0) / 100)
                    }</div>
                    {new Array(Math.ceil((results?.metadata?.total_hits || 0) / 100)).fill(null).map((_, index)=>{
                        return <button onClick={()=>{
                            setPage(index + 1);
                        }}>
                            {index + 1}
                        </button>
                    })}
                    </>
                }
            </div>
        </div>
    </>)
}