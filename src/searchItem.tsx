import React from "react";
import { Link } from "react-router-dom";
import { IItem } from "./interfaces";
import './searchItem.css'

export function SearchItem({item}: {item: IItem} ){
    return <div className="searchItem_wrapper">
        <div className="searchItem_imageWrapper">
            {<img className="searchItem_image" src={item?.links?.[0]?.href}></img>}    
        </div>
        <div className="searchItem_text">
            <div>
                <h3 className="searchItem_header">
                    {item?.data?.[0]?.title}
                </h3>
                <div>
                    {item?.data?.[0]?.description?.slice?.(0, 100)}
                </div>
            </div>
            <Link className="searchItem_openLink" to={`/item/${item?.data?.[0]?.nasa_id}`}>open</Link>  
        </div>                  
    </div>
}