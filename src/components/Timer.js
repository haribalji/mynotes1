import React, { useEffect, useState } from 'react';


export default function Timer({setstop,questionnumber}) {
    const [timer,setTimer]=useState(30);

    useEffect(()=>{
        if(timer===0) return setstop(true);
        const interval=setInterval(()=>{
            setTimer(prev=>prev-1);

        },1000);

        return()=>clearInterval(interval);

    },[setstop,timer])

    useEffect(()=>{
        setTimer(30);
    },[questionnumber]);
  return timer;



   
  
}
