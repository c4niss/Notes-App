import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Card/NoteCard'
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal'
import moment from 'moment'
import TagInput from '../../components/Input/TagInput';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import Nonoteimg from '../../assets/images/search-no-result-data-document-260nw-2289755639.webp'
const Home = () => {
  const [openAddEditModal, setOpnAddEditModal]= useState({
    isShown:false,
    type:"add",
    data:{},
  })
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "delete",
  });
  const [allNotes, setAllNotes] = useState([])
  const [userInfo,setUserInfo] = useState(null)
  const [isSearch, setIsSearch] = useState(false)
  const navigate = useNavigate()

  const onSearch = async(query) => {
    try {
      const response = await axiosInstance.get('/search-notes', {
        params:{query}
      });
      console.log(response);
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
};
const handleClearSearch = () => {
  setIsSearch(false);
  getallnotes();
}

  const updateispinned = async (notedata) => {
    const noteId = notedata._id
    try {
      const response = await axiosInstance.put('/update-note-pinned/' + noteId,{
          "isPinned":true
      })

      if(response.data && response.data.note){
          ShowToastMsg("note updated successfully","edit")
          getallnotes()
      }
  } catch (error) {
    console.log(error)
  }
  }
  const handeledit = (notedetails) => {
    console.log("Editing note:", notedetails); // Debug
    setOpnAddEditModal({
      isShown: true,
      type: "edit", 
      data: notedetails,
    });
  };

  const ShowToastMsg = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    })
  }
  const handelCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "add",
    })
  }

  const getuser = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);  // Log any errors
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };
  const getallnotes = async ()=>{
    
    try {
      const response = await axiosInstance.get('/get-all-notes')
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log(error) 
    }
  }
  const deletenote = async (data) => {
    try {
      const noteId = data._id
      const response = await axiosInstance.delete('/delete-note/' + noteId)
      if (response.data && response.data.note) {
        getallnotes()
        ShowToastMsg("note deleted successfully", "delete")
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
  useEffect(()=>{
    getallnotes()
    getuser()
    console.log(allNotes)
    return () =>{}
  },[])
  

  return (
    <div>
      <Navbar userInfo={userInfo} onSearch={onSearch} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto '>
        {allNotes.length > 0 ? <div className='grid grid-cols-3 gap-4 mt-8'>
        {allNotes.map((item)=>{
         return <NoteCard 
          key={item._id}
          title={item.title}
          content={item.content}
          date={moment(item.createdOn).format("DD-MM-YYYY")}
          tags={item.tags}
          isPinned={item.isPinned}
          onEdit={() => handeledit(item)}
          onDelete={() => deletenote(item)}
          onpinned={() => updateispinned(item)}
        />
        })}
        </div> : <EmptyCard imgsrc={Nonoteimg} message={isSearch ? `No notes matching ur search` : `start creating your first note! click the "Add" button to jot down your
          thoughts, ideas, and reminders. let's get started!`} />}
      </div>
      
      
      <button className='absolute w-16 h-16  right-10 bottom-10 flex items-center justify-center bg-primary hover:bg-blue-600 rounded-2xl ' onClick={()=>{
        setOpnAddEditModal({
          isShown:true,
          type:"add",
          data:null
        })
      }}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
  isOpen={openAddEditModal.isShown}
  onRequestClose={() =>
    setOpnAddEditModal({
      isShown: false,
      type: "add",
      data: null,
    })
  }
  style={{
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  }}
  contentLabel=""
  className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
>
  <AddEditNotes
    type={openAddEditModal.type}
    noteData={openAddEditModal.data}
    onClose={() =>
      setOpnAddEditModal({
        isShown: false,
        type: "add",
        data: null,
      })
    }
    getallnotes={getallnotes}
    ShowToastMsg={ShowToastMsg}
  />
</Modal>
<Toast 
  isShown={showToastMsg.isShown}
  message={showToastMsg.message}
  type={showToastMsg.type}
  onClose={handelCloseToast}
 />
    </div>
  )
}

export default Home
