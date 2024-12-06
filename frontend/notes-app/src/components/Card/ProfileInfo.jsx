import React from 'react'
import { getinitials } from '../../utils/helper'
const ProfileInfo = ({userInfo,onlogout}) => {

  return (
    <div className='flex items-center gap-3'>
      <div className='rounded-full bg-slate-100 w-12 h-12 flex items-center justify-center text-black text-l font-medium'>{getinitials(userInfo?.fullname)}</div>
      <div>
        <p className='text-l font-medium'>{userInfo?.fullname}</p>
        <button onClick={onlogout} className=' text-slate-400 underline'>Logout</button>
      </div>
    </div>
  )
}
export default ProfileInfo