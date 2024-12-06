import React from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosinstance'

const AddEditNotes = ({noteData, type, getallnotes,onClose,ShowToastMsg}) => {
    const [title,settitle] = React.useState(noteData?.title || '')
    const [content,setcontent] = React.useState(noteData?.content || '')
    const [ispinned,setispinned] = React.useState(false)
    const [tags,setTags] = React.useState(noteData?.tags || [])
    const [error,setError] = React.useState(null)


    

    const handleaddnote =()=>{
        if(!title){
            setError('please enter a valid title')
            return
        }
        if(!content){
            setError('please enter a valid content')
            return
        }
        setError(null)
        if(type ==='edit'){
            EditNotes()
        }
        else{
            AddNewNote()
        }
    }

    const AddNewNote = async () =>{
        try {
            const response = await axiosInstance.post('/add-note',{
                title,
                content,
                tags
            })

            if(response.data && response.data.note){
                ShowToastMsg("note added successfully","add")
                getallnotes()
                onClose()
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
        }
    }

    const EditNotes = async ()=>{
        const noteId = noteData._id
        try {
            const response = await axiosInstance.put('/edit-note/'+noteId,{
                title,
                content,
                tags
            })
            if(response.data && response.data.note){
                ShowToastMsg("note edited successfully","edit")
                getallnotes()
                onClose()
            }
        } catch (error) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.data.message)
            }
        }
    }
  return (
    <div className='relative'>
        <button  className='w-10 h-10 rounded-full bg-slate-100 flex justify-center items-center -right-3 -top-3 absolute hover:bg-slate-200' onClick={onClose}>
            <MdClose className='text-slate-600 text-2xl'/>
        </button>
        <div className=' flex flex-col gap-2'>
            <label className='input-label'>TITLE</label>
            <input 
            type='text'
            className='text-xl text-slate-900 outline-none'
            placeholder='Go To Gym At 7PM'
            value={title}
            onChange={(e)=>(settitle(e.target.value))}
            />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
            <label className='input-label'>CONTENT</label>
            <textarea 
            type='text'
            className='text-xl text-slate-900 outline-none bg-slate-50'
            placeholder='content'
            rows={10}
            value={content}
            onChange={(e)=>(setcontent(e.target.value))}/>
        </div>
        <div className='mt-4'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>
        {error && <p className='text-red-600 text-xs pb-1 pt-4'>{error}</p>}
        <button className='btn-primary mt-4 p-3 ' onClick={handleaddnote}>
            {type === 'edit' ? "Update Note" : "Add Note"}
        </button>
    </div>
  )
}

export default AddEditNotes