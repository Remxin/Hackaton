import React from 'react'

// react icons
import { AiFillCloseCircle } from "react-icons/ai"

type componentProps = {
  loading: boolean,
  error: string
}

const StudyPathCard = ({ loading, error }: componentProps) => {

  if (error) return (
    <div className='w-full h-full flex items-center flex-col p-20'>
    <div className='w-56 h-[40%] rounded-md'>
      <p className="text-[100px] block text-red-600 text-center w-full"><AiFillCloseCircle className="text-center w-full"/></p>
    </div>
    <div className='w-full h-[60%] pt-16'>
      <div className='w-full h-10 rounded-md text-red-500 text-center text-lg'>{error}</div>
      <div className='w-[80%] h-10 rounded-md mt-5'></div>
    </div>
  </div>
  )
  if (loading) return (

    <div className='w-full h-full flex items-center flex-col p-20'>
      <div className='w-56 h-[40%] animate-waving-div bg-[#ddd] rounded-md'></div>
      <div className='w-full h-[60%] pt-16'>
        <div className='w-[80%] h-10 animate-waving-div2 bg-[#ddd] rounded-md'></div>
        <div className='w-[80%] h-10 animate-waving-div3 bg-[#ddd] rounded-md mt-5'></div>
      </div>
    </div>
  )
  
  return (
    <div>
      <div className='w-full h-full flex items-center flex-col p-20'>
      <div className='w-56 h-[40%] rounded-md'></div>
      <div className='w-full h-[60%] pt-16'>
        <div className='w-[80%] h-10 rounded-md'></div>
        <div className='w-[80%] h-10 rounded-md mt-5'></div>
      </div>
    </div>
    </div>
  )
}

export default StudyPathCard