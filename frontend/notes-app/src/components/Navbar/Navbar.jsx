import React from 'react'
import ProfileInfo from '../Card/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../search/SearchBar'
const Navbar = ({userInfo, onSearch, handleClearSearch}) => {
  const [searchQuery, setSearchQuery] = React.useState('')

  const navigate = useNavigate
  const onlogout = () => {
    localStorage.clear()
    navigate("/login")
  }
  const handlesearch = () => {
    if(searchQuery){
      console.log(searchQuery)
      onSearch(searchQuery)
    }
  }
  const onclearsearch = () => {
    setSearchQuery('');
    handleClearSearch();
  }
  return (
    <div className='flex bg-white justify-between items-center px-6 py-4 drop-shadow-md'>
      <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
      <SearchBar 
      value={searchQuery} 
      onChange={({target}) =>{
        setSearchQuery(target.value)
      }}
      handlesearch={handlesearch}
      onclearsearch={onclearsearch}
       />
      <ProfileInfo userInfo={userInfo} onlogout={onlogout} />
    </div>
  )
}

export default Navbar