import React from 'react'
import { FaSearch } from "react-icons/fa";
import {IoMdClose} from "react-icons/io"
const SearchBar = ({value, onChange, handlesearch, onclearsearch}) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
        <input 
        type='text'
        value={value}
        placeholder='Search Notes'
        onChange={onChange}
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        />
        {value && <IoMdClose className='text-slate-400 cursor-pointer hover:text-black mr-3' onClick={onclearsearch}/>}
        <FaSearch className='text-slate-400 cursor-pointer hover:text-black' onClick={handlesearch}/>
    </div>
  )
}

export default SearchBar