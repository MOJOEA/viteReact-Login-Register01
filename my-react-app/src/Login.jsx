import './App.css';
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sha256 } from 'js-sha256'

const API_URL = 'https://69df62c9d6de26e119294a16.mockapi.io/api/v1/todo/users'

function Login() {
  const [useremail, setUserEmail] = useState('')
  const [userpassword, setUserPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    if (e) e.preventDefault()
    try {
      if (!useremail || !userpassword) {
        setErrorMessage('Please fill in all fields')
        return
      }

      const hashedPassword = sha256(userpassword)
      const response = await axios.get(API_URL)
            const user = response.data.find(u => 
        u.email === useremail && u.password === hashedPassword
      )

      if (user) {
        setErrorMessage('Successfully logged in')
        localStorage.setItem('user_name', user.name)
        localStorage.setItem('user_email', user.email)
        localStorage.setItem('user_id', user.id)
        setTimeout(() => {
          navigate('/profile')
        }, 1000)
      } else {
        setErrorMessage('email or password is incorrect')
      }
    } catch (error) {
      setErrorMessage('server error, please try again')
    }
  }

  async function handleHashAllPasswords() {
    try {
      setErrorMessage('Hashing all passwords...')
      const response = await axios.get(API_URL)
      const users = response.data

      for (const user of users) {
        if (user.password.length !== 64) {
          const newHashedPassword = sha256(user.password)
          await axios.put(`${API_URL}/${user.id}`, {
            password: newHashedPassword
          })
        }
      }
      setErrorMessage('All passwords hashed successfully!')
    } catch (error) {
      setErrorMessage('Error during hashing process')
    }
  }

  const handleTest = () => {
    setUserEmail('Riley_Gottlieb83@yahoo.com')
    setUserPassword('DbYNnRjffRMTDYO')
    setErrorMessage('Test data loaded')
  }

  return (
    <div className="min-h-screen bg-white text-black">

      <div className="w-full flex justify-center mt-8 px-4">
        <div className="w-full max-w-[500px] shadow-[0_0_30px_#ccc] border rounded-[25px] overflow-hidden mb-10">
          <div className="w-full bg-gray-900 p-3">
            <h1 className="text-white text-center text-[18px] font-bold">Login (Encrypted)</h1>
          </div>

          <form onSubmit={handleLogin} className="p-6 flex flex-col">
            <input 
              type="email" 
              placeholder="Email"
              className="border border-gray-300 rounded-md w-full h-[35px] mb-4 pl-2 text-black"
              value={useremail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <input 
              type="password" 
              placeholder="Password"
              className="border border-gray-300 rounded-md w-full h-[35px] mb-4 pl-2 text-black"
              value={userpassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            {errorMessage && (
              <div className={`border rounded-lg flex justify-center p-2 mt-2 font-medium
                ${errorMessage.includes("Successfully") 
                  ? "bg-green-100 border-green-700 text-green-700" 
                  : errorMessage.includes("All passwords hashed successfully!") || errorMessage.includes("Test data loaded")
                  ? "bg-amber-100 border-amber-700 text-amber-700" 
                  : "bg-red-100 border-red-700 text-red-700"
                }`}
              >
                {errorMessage}
              </div>
            )}


            <div className="flex gap-3 mt-6 flex-wrap justify-center">
              <button type="submit" className="bg-gray-900 text-white rounded-md px-6 py-2 text-[14px]">
                Login
              </button>
              
              <button type="button" onClick={handleTest} className="bg-amber-500 text-white rounded-md px-6 py-2 text-[14px]">
                Test User
              </button>

              <button type="button" onClick={handleHashAllPasswords} className="bg-red-600 text-white rounded-md px-6 py-2 text-[14px]">
                Encrypt All Passwords
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
