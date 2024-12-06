import React, { useEffect } from 'react'
import { LuCheck } from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'
const Toast = ({isShown, message, type, onClose}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose()
    },3000)
    return () => {
      clearTimeout(timeoutId)
    }
  },[onClose])
  return (
    <div className={`absolute top-[90px] right-6 transition-all duration-300 ${
    isShown ? 'opacity-100' : 'opacity-0'} `}>
      <div className={`min-w-52 bg-white rounded-md border shadow-2xl after:w-[5px] after:h-full ${
        type === 'delete' ? 'after:bg-red-500' : 'after:bg-green-500'} after:absolute after:left-0 after:top-0`}>
      <div className='flex items-center gap-2 py-2 px-4'>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${type === 'add' ? 'bg-green-100' : 'bg-red-100'}`}>
          {type === 'delete' ? <MdDeleteOutline className='text-red-500' /> : <LuCheck className='text-green-500'/>}
       </div>
       <p className='text-sm text-slate-800'>{message}</p>
      </div>
      </div>
    </div>
  )
}

export default Toast