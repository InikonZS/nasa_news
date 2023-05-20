import React, { useEffect, useState } from 'react';
import {search} from './api';
import {
    createBrowserRouter,
    Link,
    RouterProvider,
    useNavigation,
    useParams,
} from "react-router-dom";
import "./style.css";
  
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
    return <div>
        <Link to='/'>back</Link>
        item: {params?.['id']}
    </div>
}

export function MainPage(){
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState<any>();
    useEffect(()=>{
        search(searchQuery).then((response)=>{
            setResults(response.collection);
            console.log(response);
        });
    }, [searchQuery]);
    return (<>
        <div>
            <input type="text" onChange={(e)=>{
                setSearchInput(e.target.value);
            }}/>
            <button onClick={()=>{
                setSearchQuery(searchInput);
            }}>search</button>
            <div>
                {
                    (()=>{
                        if (results && Array.isArray(results.items)){
                            return results.items.map((item: any)=>{
                                return (
                                    <div>
                                        <h3>
                                            {item?.data?.[0]?.title}
                                        </h3>
                                        <div>
                                            {item?.data?.[0]?.description}
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
        </div>
    </>)
}