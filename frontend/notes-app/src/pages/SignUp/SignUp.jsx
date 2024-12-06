import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
const SignUp = () => {
  const [password, setPassword] = React.useState('')
  const [error,setError] = React.useState(null)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const navigate = useNavigate()
  const handlesignup = async (event) => {
    event.preventDefault();
    if(!name){
      setError('please enter a valid name')
      return
    }
    if(!validateEmail(email)){
      setError('please enter a valid email')
      return
    }
    if(!password || password.length < 8){
      setError('Password must be at least 8 characters')
    }

    try {
      const response = await axiosInstance.post('/create-account',{
        fullname:name,
        email:email,
        password:password
      })
      
      if(response.data && response.data.accestoken){
        localStorage.setItem('token',response.data.accestoken)
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.response &&error.response.data &&error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError('something went wrong')
      }

    }
  }

  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center mt-28'>
      <div className='w-96 rounded border bg-white py-10 px-7'>
      <form onSubmit={handlesignup}>
        <h4 className='text-xl font-medium mb-3 '>SignUp</h4>
        <input 
        className="input-box"
        type="text" 
        placeholder="Name"
        value={name}
        onChange={(e) => {setName(e.target.value)}} />

        <input 
        className="input-box"
        type="text" 
        placeholder="Email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)}} />
        
        <PasswordInput value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder={'Password'}/>
        {error && <p className='text-red-600 text-sm pb-2'>{error}</p>}

<button type='submit' className='btn-primary'>Sign Up</button>
<p className=' text-sm text-center mt-4'>Already have an account?{' '}
  <Link to={'/login'} className=' font-medium text-primary underline'>Login</Link>
</p>
      </form>
      </div>
      </div>
    </div>
  )
}

export default SignUp