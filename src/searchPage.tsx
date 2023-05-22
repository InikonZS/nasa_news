import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "./api";
import { IItem } from "./interfaces";
import { SearchItem } from './searchItem';
import './searchForm.css';
import { useAppDispatch, useAppSelector } from "./store";
import { getData } from "./store";

export function MainPage(){
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);
    //const [results, setResults] = useState<any>();    
    const [yearStartInput, setYearStartInput] = useState<null | number>();
    const [yearEndInput, setYearEndInput] = useState<null | number>();
    const [yearStart, setYearStart] = useState<null | number>();
    const [yearEnd, setYearEnd] = useState<null | number>();
    const results = useAppSelector((state=>state.search.value));
    //console.log('results ', results);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        /*search(searchQuery, page, yearStart, yearEnd).then((response)=>{
            setResults(response.collection);
            console.log(response);
        });*/
        dispatch(getData({searchQuery, page, yearStart, yearEnd}));
    }, [searchQuery, page, yearStart, yearEnd]);


    return (<>
        <div className="search_wrapper">
            <div className="search_props">
                <div className="search_query">
                    <input className="search_input" type="text" onChange={(e)=>{
                        setSearchInput(e.target.value);
                    }}/>
                </div>
                <div className="search_years">
                    <label htmlFor='year-start'>publication year from </label>
                    <input className="search_yearInput" id='year-start' type="text" onChange={(e)=>{
                        console.log(Number.parseInt(e.target.value));
                        setYearStartInput(Number.parseInt(e.target.value));
                    }}/>

                    <label htmlFor='year-end'>to </label>
                    <input className="search_yearInput" id='year-end' type="text" onChange={(e)=>{
                        setYearEndInput(Number.parseInt(e.target.value));
                    }}/>  
                </div>
            </div>

            <button className="search_button" onClick={()=>{
                setSearchQuery(searchInput);
                setYearEnd(yearEndInput);
                setYearStart(yearStartInput);
            }}>search</button>
        </div>
            <div>
                {
                    (()=>{
                        if (results && Array.isArray(results.items)){
                            return results.items.map((item: IItem)=>{
                                return <SearchItem item={item} ></SearchItem>
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
        
    </>)
}