import React from 'react'
import './filter_result.css'
import { Divider } from '@mui/material';
export const SearchList=({results=[]})=>{
    
    return(
        
        <div className='list'>
            {
                results.map((result,id)=>{
                    return(
                        
                        <div key={id} className ="column">
                            <Divider sx={{ bgcolor: "black" }} />
                            {result.id}
                            <Divider sx={{ bgcolor: "black" }} />
                            
                        </div>
                        
                        
                    )
                })
            }
        </div>
    )

}