import React, { useState, useEffect } from "react";
import { IItem } from "../../interfaces";
import { SearchItem } from './searchItem';
import './searchForm.css';
import { useAppDispatch, useAppSelector } from "../../store";
import { getData } from "../../store";

export function MainPage(){
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1); 
    const [yearStartInput, setYearStartInput] = useState<null | number>();
    const [yearEndInput, setYearEndInput] = useState<null | number>();
    const results = useAppSelector((state=>state.search.value));
    const query = useAppSelector(state=> state.search.query);
    console.log('query ', query);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if (query){
            setSearchInput(query.searchQuery);
            setYearStartInput(query.yearStart);
            setYearEndInput(query.yearEnd);
            setPage(query.page);
        }
    }, []);
    useEffect(()=>{
        dispatch(getData({searchQuery:query?.searchQuery || '', page: query?.page || 1, yearStart: query?.yearStart, yearEnd: query?.yearEnd}));
    }, []);

    return (<div>
        <div className="search_wrapper">
            <div className="search_props">
                <div className="search_query">
                    <input value={searchInput} placeholder="input search request" className="search_input" type="text" onChange={(e)=>{
                        setSearchInput(e.target.value);
                    }}/>
                </div>
                <div className="search_years">
                    <label htmlFor='year-start'>publication year from </label>
                    <input value={yearStartInput} className="search_yearInput" id='year-start' type="text" onChange={(e)=>{
                        console.log(Number.parseInt(e.target.value));
                        setYearStartInput(Number.parseInt(e.target.value));
                    }}/>

                    <label htmlFor='year-end'>to </label>
                    <input value={yearEndInput} className="search_yearInput" id='year-end' type="text" onChange={(e)=>{
                        setYearEndInput(Number.parseInt(e.target.value));
                    }}/>  
                </div>
            </div>

            <button className="search_button" onClick={()=>{
                dispatch(getData({searchQuery:searchInput, page, yearStart: yearStartInput, yearEnd: yearEndInput}));
            }}>search</button>
        </div>
            <div className="searchResults_wrapper">
                {
                    (()=>{
                        if (results && Array.isArray(results.items)){
                            return results.items.map((item: IItem)=>{
                                return <SearchItem item={item} ></SearchItem>
                            })
                        } else {
                            return <div className="searchResults_no">no results</div>
                        }
                    })()
                }
            </div>
            <div>
                {   <>
                    {/*<div>total {
                       Math.ceil((results?.metadata.total_hits || 0) / 100)
                    }</div>*/}
                    {new Array(Math.ceil((results?.metadata?.total_hits || 0) / 100)).fill(null).map((_, index)=>{
                        return <button onClick={()=>{
                            dispatch(getData({searchQuery:searchInput, page: index + 1, yearStart: yearStartInput, yearEnd: yearEndInput}));
                            //setPage(index + 1);
                        }}>
                            {index + 1}
                        </button>
                    })}
                    </>
                }
            </div>
        
    </div>)
}