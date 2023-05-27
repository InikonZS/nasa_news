import React, { useState, useEffect } from "react";
import { IItem } from "../../interfaces";
import { SearchItem } from './searchItem';
import './searchForm.css';
import { useAppDispatch, useAppSelector } from "../../store";
import { getData } from "../../store";

export function MainPage(){
    const [searchInput, setSearchInput] = useState('');
    //const [page, setPage] = useState(1); 
    const [yearStartInput, setYearStartInput] = useState<null | number>();
    const [yearEndInput, setYearEndInput] = useState<null | number>();
    const results = useAppSelector((state=>state.search.value));
    const query = useAppSelector(state=> state.search.query);
    console.log('query ', query);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        const h = ()=>{
            const isBottom = document.documentElement.scrollTop == document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (isBottom){
                console.log(isBottom);
            }
        }
        document.addEventListener('scroll', h);
        return  ()=>{
            document.removeEventListener('scroll', h);
        }
    });
    useEffect(()=>{
        if (query){
            setSearchInput(query.searchQuery);
            setYearStartInput(query.yearStart);
            setYearEndInput(query.yearEnd);
            //setPage(query.page);
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
                dispatch(getData({searchQuery:searchInput, page:query?.page || 1, yearStart: yearStartInput, yearEnd: yearEndInput}));
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
            {
            (results && Array.isArray(results.items)) && <div className="pagination_wrapper">
                {   <>
                    {/*<div>total {
                       Math.ceil((results?.metadata.total_hits || 0) / 100)
                    }</div>*/}
                    {/*new Array(Math.ceil((results?.metadata?.total_hits || 10000) / 100)).fill(null).map((_, index)=>{
                        return <button className={"pagination_button"+ ((index+1) == page?'pagination_button_active':'') } onClick={()=>{
                            dispatch(getData({searchQuery:searchInput, page: index + 1, yearStart: yearStartInput, yearEnd: yearEndInput}));
                            //setPage(index + 1);
                        }}>
                            {index + 1}
                        </button>
                    })*/}
                    {<>
                        <button className="pagination_button" onClick={()=>{
                            if ((query.page || 1)>1){
                                dispatch(getData({searchQuery:searchInput, page: (query?.page || 1) - 1, yearStart: yearStartInput, yearEnd: yearEndInput}));
                            }
                        }}>{(query?.page || 1) - 1}</button>
                        <div className="pagination_center">
                            <input className="pagination_input" value={(query?.page || 1)} />
                            <div>/</div>
                            <div className="pagination_total">{Math.ceil((results?.metadata?.total_hits || 10000) / 10)}</div> 
                        </div>
                        
                        <button className="pagination_button" onClick={()=>{
                            if ((query.page || 1) < Math.ceil((results?.metadata?.total_hits || 10000) / 10)){
                                dispatch(getData({searchQuery:searchInput, page: (query?.page || 1) + 1, yearStart: yearStartInput, yearEnd: yearEndInput}));
                            }
                        }}>{(query?.page || 1) + 1}</button>
                    </>
                    }
                    </>
                }
            </div>
            }
        
    </div>)
}