import React from 'react'

const EmptyCard = ({imgsrc,message}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <img src={imgsrc} alt='No Notes' className='w-60'/>
        <p className='w-1/2 text-slate-700 text-sm text-center leading-7 mt-5 font-medium'>{message}</p>
    </div>
  )
}

export default EmptyCard