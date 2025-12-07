
import {useState,useEffect} from "react";

export function uselocalStorage<T>(key:string,intitalValue:T):[T,(value:T) => void ]{
    const [value,setValue] = useState(()=>{
        const storedValue = localStorage.getItem(key);
        return storedValue? JSON.parse(storedValue):intitalValue;
    });

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[key,setValue]);

  return [value,setValue]  
};