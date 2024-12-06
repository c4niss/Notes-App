import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
  return (
    <div className='flex items-center justify-between bg-transparent text-sm border-[1.5px] border-gray-300 rounded py-3 px-5 mb-3 outline-none'>
        <input 
        className='outline-none  bg-transparent'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={isShowPassword ? 'text' : 'password'}/>

     
        {isShowPassword ? 
        <FaRegEye 
        size={20} 
        className='text-primary cursor-pointer'
        onClick={toggleShowPassword}/> :
        <FaRegEyeSlash 
        size={20}
        className='text-gray-400 cursor-pointer'
        onClick={toggleShowPassword}/>
    }
    </div>

  )
}

export default PasswordInput