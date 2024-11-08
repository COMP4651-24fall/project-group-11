import React from 'react'
import './filter_result.css'
import { Divider } from '@mui/material';

export const SearchList=({results=[]})=>{
    return(
        <div className='list'>
            {
                results.map((result, id)=>{
                    return(
                        <div key={id} className ="column">
                            <div className ="row">
                                {result.title}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}