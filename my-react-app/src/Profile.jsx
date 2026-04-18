import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://69df62c9d6de26e119294a16.mockapi.io/api/v1/todo/users';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/${localStorage.getItem('user_id')}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!userData) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      
      <div className="flex justify-center mt-10 p-4">
        <div className="w-full max-w-md bg-white shadow-2xl border rounded-[25px] overflow-hidden">
          
          <div className="bg-gray-900 h-32 flex justify-center items-end">
            <img 
              src={userData.avatar} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white translate-y-12 bg-white"
            />
          </div>

          <div className="pt-16 pb-8 px-8 flex flex-col items-center">
            <p className="text-gray-900 text-2xl">{userData.name}</p>
            <div className="w-full space-y-4 text-sm mt-10">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-gray-600">Email:</span>
                <span>{userData.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-gray-600">Phone:</span>
                <span>{userData.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-gray-600">ID:</span>
                <span>{userData.id}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-gray-600">Favorite:</span>
                <span>{userData.isFavorite ? "⭐ Yes" : "No"}</span>
              </div>
              <div className="flex justify-between border-b pb-2 overflow-hidden">
                <span className="font-bold text-gray-600 shrink-0 mr-2">Hashed Pass:</span>
                <span className="truncate italic text-gray-400" title={userData.password}>
                  {userData.password}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-600">Created:</span>
                <span>{new Date(userData.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate(-1)}
              className="mt-8 bg-gray-900 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
