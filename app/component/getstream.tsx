"use client"
import {use} from 'react'
export  function GetStream({stream}:{
    stream:Promise<{title:string}[]>
}) {
    const allStream=use(stream)

    return <div className='w-full border'>
        <ul>
            {allStream.map((stream, idx) => (
                <li key={idx}>{stream.title}</li>
            ))}
        </ul>
            
    </div>
}