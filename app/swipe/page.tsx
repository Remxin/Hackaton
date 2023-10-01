'use client'
import React, { useState } from 'react'

// framer-motion
import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

// cards
import StudyPathCard from './StudyPathCard'

// hook
import { useStudyPath } from '@/hooks/useStudyPath'

// router
import { redirect } from 'next/navigation'

// preferences
import UserPreferences from '@/utilities/userPreferences'
const userPreferences = new UserPreferences()


export default function SwipePage() {

  const { data, loading, error, dispatch } = useStudyPath()
  const [isDragged, setIsDragged] = useState(false)
  const [dragPoint, setDragPoint] = useState<null | number>(null)
  const { x } = useMousePosition()

  if (error === "User not authenticated") return redirect("/")


  function acceptStudyPath(mouseXPos: number | null, dragAnchor: number | null) {
    if (!mouseXPos || !dragAnchor) return

    // getting next study path
    dispatch.getNext()
    setIsDragged(false)
    setDragPoint(null)

  }

  return (
    <div className='w-full h-full bg-gray-300 flex items-center justify-center'>
        <div className='h-[95%] w-[600px] bg-gray-200 flex items-center just-center p-0 pl-5 pr-5 rounded-md'>
            <motion.div
            className={`w-full h-[95%] bg-white relative z-10 rounded-md ${isDragged ? "opacity-80" : ""}`}
            drag
            dragConstraints={{
                top: 0,
                bottom: 0,
                left: 10,
                right: 10
            }}
            onDragStart={() => {
              setIsDragged(true)
              setDragPoint(x)
            }}
         
            onDragEnd={() => {
              acceptStudyPath(x, dragPoint)
            }}
          
            >
              {/* @ts-ignore */}
                <StudyPathCard loading={loading} error={error} data={data[0]}/>
            </motion.div>
        </div>


      {isDragged && !error ? <>
        {/* @ts-ignore */}
        <div className={`fixed w-[50%] h-screen bg-red-200 ${dragPoint > x ? "opacity-80" : "opacity-30"} left-0 border flex justify-center items-center font-bold text-[50px] z-20 transition-opacity`}>
          {/* @ts-ignore */}
          {dragPoint > x ? <p className='opacity-100'>I dont like it 👎</p> : null}
        </div>
        {/* @ts-ignore */}
        <div className={`fixed w-[50%] h-screen bg-green-200 ${dragPoint < x ? "opacity-80" : "opacity-30"} right-0 flex justify-center items-center font-bold text-[50px] z-20 transition-opacity`}>
          {/* @ts-ignore */}
          {dragPoint < x ? <p className='blur-0'>I like it 👍</p> : null}
        </div>
        <div></div>
      </> : null}
    </div>
  )
}

