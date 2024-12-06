import React from 'react'
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const NoteCard = ({
    title,
    content,
    date,
    tags,
    ispinned,
    onEdit,
    onDelete,
    onpinned
}) => {
  return (
    <div className='flex flex-col py-4 px-4 border rounded hover:shadow-xl m-3'>
        <div className='flex justify-between items-start'>
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-slate-500 text-xs'>{date}</span>
            </div>
            <MdOutlinePushPin 
                className={`icon-btn ${ispinned ? 'text-primary' : 'text-slate-400'}`} 
                onClick={onpinned}
            />
        </div>
        <p className='text-xs text-slate-600 mt-2'>{content.slice(0, 50)}</p>
        <div className='flex justify-between items-center'>
            <div className='text-xs text-slate-500'>{tags}</div>
            <div className='flex gap-2'>
                <MdCreate className={'icon-btn hover:text-green-600'} onClick={onEdit} />
                <MdDelete className={'icon-btn hover:text-red-500'} onClick={onDelete} />
            </div>
        </div>
    </div>
  )
}

export default NoteCard;
