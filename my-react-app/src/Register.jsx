import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { sha256 } from 'js-sha256'

const API_URL = 'https://69df62c9d6de26e119294a16.mockapi.io/api/v1/todo/users'

function Register() {
  const [fullname, setFullname] = useState('')
  const [useremail, setUserEmail] = useState('')
  const [userpassword, setUserPassword] = useState('')
  const [userphone, setUserPhone] = useState('')
  const [usergroup, setUserGroup] = useState('')
  
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    
    if (!fullname || !useremail || !userpassword || !userphone || !usergroup) {
      setErrorMessage('Please fill in all fields')
      return
    }

    try {
      const hashedPassword = sha256(userpassword)

      const newUser = {
        createdAt: new Date().toISOString(),
        name: fullname,
        avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/33.jpg", // default avatar
        phone: userphone,
        group: usergroup,
        isFavorite: false,
        password: hashedPassword,
        email: useremail
      }

      await axios.post(API_URL, newUser)
      
      setErrorMessage('Successfully registered')
      setTimeout(() => navigate('/login'), 2000)

    } catch (error) {
      setErrorMessage('Registration failed, try again')
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">

      <div className="w-full flex justify-center mt-4 px-4">
        <div className="w-full max-w-[500px] shadow-[0_0_30px_#ccc] border rounded-[25px] overflow-hidden mb-10">
          <div className="w-full bg-gray-900 p-3">
            <h1 className="text-white text-center text-[18px] font-bold">Register</h1>
          </div>

          <form onSubmit={handleRegister} className="p-6 flex flex-col space-y-3">
            <div>
              <label className="text-black text-[12px] font-semibold ml-1">Full Name</label>
              <input type="text" className="border border-gray-300 rounded-md w-full h-[35px] pl-2 text-black text-[14px]"
                value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>

            <div>
              <label className="text-black text-[12px] font-semibold ml-1">Email</label>
              <input type="email" className="border border-gray-300 rounded-md w-full h-[35px] pl-2 text-black text-[14px]"
                value={useremail} onChange={(e) => setUserEmail(e.target.value)} />
            </div>

            <div>
              <label className="text-black text-[12px] font-semibold ml-1">Password</label>
              <input type="password" className="border border-gray-300 rounded-md w-full h-[35px] pl-2 text-black text-[14px]"
                value={userpassword} onChange={(e) => setUserPassword(e.target.value)} />
            </div>

            <div>
              <label className="text-black text-[12px] font-semibold ml-1">Phone</label>
              <input type="text" className="border border-gray-300 rounded-md w-full h-[35px] pl-2 text-black text-[14px]"
                value={userphone} onChange={(e) => setUserPhone(e.target.value)} />
            </div>

            <div>
              <label className="text-black text-[12px] font-semibold ml-1">Group</label>
              <input type="text" className="border border-gray-300 rounded-md w-full h-[35px] pl-2 text-black text-[14px]"
                value={usergroup} onChange={(e) => setUserGroup(e.target.value)} />
            </div>

            {errorMessage && (
              <div className={`border rounded-lg flex justify-center p-2 mt-2 font-medium
                ${errorMessage.includes("Successfully") ? "bg-green-100 border-green-700 text-green-700" : "bg-red-100 border-red-700 text-red-700"}`}
              >
                {errorMessage}
              </div>
            )}

            <div className="flex justify-center pt-4">
              <button type="submit" className="bg-gray-900 text-white rounded-md px-10 py-2 text-[14px] hover:bg-blue-600 transition">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
