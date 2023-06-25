 import  React, {useState,useEffect, Fragment} from 'react'
 
 const CRUD = () => {

    const empdata = [
        {
            id : 1,
            name : 'kamal',
            age : 26,
            isActive : 1
        },
        {
            id : 2,
            name : 'amal',
            age : 29,
            isActive : 0
        },
        {
            id : 3,
            name : 'kumara',
            age : 36,
            isActive : 1
        }
    ]

    const [data,setData] = useEffect([]);

    useEffect(()=>{
        setData(empdata);
    },[])

   return (
     <Fragment>
        
     </Fragment>
   )
 }
 
 export default CRUD;
 