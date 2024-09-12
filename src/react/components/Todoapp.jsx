import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import todoActioncreater from '../../redux/action'

const Todoapp = () => {

  const dispatch=useDispatch()
  const data=useSelector(state=>state)

  useEffect(()=>{
    dispatch(todoActioncreater())
  },[])
  console.log(data)
  return (
    
    <div>
      Todoapp 
    </div>
  )
}

export default Todoapp
