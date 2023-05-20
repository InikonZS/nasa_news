import React, { useEffect, useState } from 'react';
import {search} from './api';

export function App(){
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