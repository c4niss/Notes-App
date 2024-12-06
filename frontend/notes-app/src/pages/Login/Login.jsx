import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error,setError] = React.useState(null)

  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError(null);

    try {
      const response = await axiosInstance.post('/login',{
        email:email,
        password:password
      })
      console.log(response)
      if(response.data && response.data.accestoken){
        localStorage.setItem('token',response.data.accestoken)
        navigate('/dashboard')
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{ 
        setError('Something went wrong')
      }
    }
  };
  return <>
    <Navbar />
     
    <div className='flex justify-center items-center mt-28'>
      <div className='w-96 rounded border bg-white py-10 px-7'>
      <form onSubmit={handleLogin}>
        <h4 className='text-xl font-medium mb-3 '>Login</h4>
        <input 
        className="input-box"
        type="text" 
        placeholder="Email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)}} />
        <PasswordInput value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder={'Password'}/>

        {error && <p className='text-red-600 text-sm pb-1'>{error}</p>}

        <button type='submit' className='btn-primary'>Login</button>
        <p className=' text-sm text-center mt-4'>Not registred yet?{' '}
          <Link to={'/signup'} className=' font-medium text-primary underline'>Create an account</Link>
        </p>
      </form>
      </div>
    </div>
  </>
}

export default Login

