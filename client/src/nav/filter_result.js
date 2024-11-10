import React from 'react'
import './filter_result.css'
import { Divider } from '@mui/material';
import { NavLink,Link,useNavigate } from 'react-router-dom';

export const SearchList=({results=[]})=>{
    const navigate = useNavigate();
    const redirect=(id)=>{
        navigate('/product/'+ id)
    }
    return(
        <div className='list'>
            {
               results.map((result)=>{
                    return(
                        
                        <div key={result.product_id} className ="column" >
                            
                            <div className ="row">
                                <a href={`/product/${result.product_id}`}>{result.title}</a>
                            </div>
                           
                            
                        </div>
                        
                    )
                })
            }
        </div>
    )
}