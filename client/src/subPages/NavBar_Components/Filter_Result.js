import React from 'react'
import './Filter_Result.css'

export const SearchList=({results=[]})=>{
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