import { departmentDBType, studyPathDBType } from '@/types/dbModels'
import React from 'react'

// react icons
import { AiFillCloseCircle } from "react-icons/ai"

// components
import LazyImage from '@/components/lazyImage/LazyImage'

type componentProps = {
  loading: boolean,
  error: string,
  data: Required<studyPathDBType>
  department: Required<departmentDBType>
}

const StudyPathCard = ({ loading, error, data }: componentProps) => {
  if (error) return (
    <div className='w-full h-full flex items-center flex-col p-20'>
      <div className='w-56 h-[40%] rounded-md'>
        <p className="text-[100px] block text-red-600 text-center w-full"><AiFillCloseCircle className="text-center w-full" /></p>
      </div>
      <div className='w-full h-[60%] pt-16'>
        <div className='w-full h-10 rounded-md text-red-500 text-center text-lg'>{error}</div>
        <div className='w-[80%] h-10 rounded-md mt-5'></div>
      </div>
    </div>
  )
  if (loading || !data) return (

    <div className='w-full h-full flex items-center flex-col p-20'>
      <div className='w-56 h-[40%] animate-waving-div bg-[#ddd] rounded-md'></div>
      <div className='w-full h-[60%] pt-16'>
        <div className='w-[80%] h-10 animate-waving-div2 bg-[#ddd] rounded-md'></div>
        <div className='w-[80%] h-10 animate-waving-div3 bg-[#ddd] rounded-md mt-5'></div>
      </div>
    </div>
  )

  console.log(data);

  return (
    <div>
      <div className='w-full h-full flex items-center flex-col '>
        <div className='w-56 h-[40%] rounded-md'>

          <LazyImage uuid={data.department.universityId} width={600} height={600} divClass='rouded-md w-full h-full absolute top-0 left-0' />
        </div>
        <div className='w-full h-[30%] bg-white z-10 p-8 absolute bottom-0 opacity-90'>
          <div className='w-full h-10 rounded-md text-black font-bold text-[20px] overflow-hidden text-ellipsis whitespace-nowrap'>{data.name}</div>
          <div className='w-full h-10 rounded-md text-gray-600 text-md'>{data.department.name}</div>
          <div className='w-full h-10 rounded-md text-gray-500 text-sm'>{data.department.university?.name}</div>
          <div className='w-full h-10  text-[10px] rounded-md mt-5 overflow-hidden text-ellipsis text-black whitespace-nowrap'>{data.description}</div>
        </div>
      </div>
    </div>
  )
}

export default StudyPathCard