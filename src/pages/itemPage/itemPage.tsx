import React, { useState, useEffect } from "react";
import { useNavigation, useParams, Link } from "react-router-dom";
import { getById } from "../../api";
import { IItem } from '../../interfaces';
import './itemPage.css';

/*title, location, photographer's
name, description, keywords, date*/

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
    return <div className="itemPage_wrapper">
        <Link className="itemPage_backLink" to='/'>back</Link>
        {/*item: {params?.['id']*/}
        <div>
            <h3>
                {item?.data?.[0]?.title}
            </h3>
            <div className="itemPage_line">
                <span className="itemPage_span">location:</span> <span>{item?.data?.[0]?.location}</span>
            </div>
            <div className="itemPage_line">
                <span className="itemPage_span">date:</span> {item?.data?.[0]?.date_created}
            </div>
            <div className="itemPage_line">
                <span className="itemPage_span">photographer:</span> {item?.data?.[0]?.photographer}
            </div>
            <div className="itemPage_line">
                <span className="itemPage_span">keywords: </span>
                <ul className="itemPage_keywords">
                    {item?.data?.[0]?.keywords?.map(word=>{
                        return <li>{word}</li>
                    })}
                </ul>
            </div>
            
            <div className="itemPage_description" dangerouslySetInnerHTML={{__html: item?.data?.[0]?.description}}>
                {/*item?.data?.[0]?.description*/}
            </div>
            {<img className="itemPage_image" src={item?.links?.[0]?.href}></img>}
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
