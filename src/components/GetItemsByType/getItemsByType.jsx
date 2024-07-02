import React from 'react'
import { useParams } from 'react-router-dom'
import Items from '../Items';

const GetItemsByType = () => {

    const {itemType} = useParams();
    console.log(itemType)



  return (
    <div><Items itemType={itemType}/></div>
  )
}

export default GetItemsByType