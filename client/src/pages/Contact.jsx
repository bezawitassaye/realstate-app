/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Contact = ({ formData }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  {console.log(formData.userRef,"here")}
  const [message,setmessage]=useState("")

  const onChange = (e)=>{
    setmessage(e.target.value)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5019/api/user/${formData.userRef}`);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error
      }
    };

    fetchUser();
  }, [formData.userRef]);

  if (loading) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      {user && (
        <div className=''>
            <p>Contact <span className='font-semibold'>{user.username}</span>
            for
            <span className='font-semibold'>
                {formData.name.toLowerCase()}
               
            </span>
            </p>
            <textarea name='message' placeholder='enter your message' id="message" rows={2} value={message} onChange={onChange}></textarea>
              
           <Link to={`mailto:${user.email}?subject=Regarding ${formData.name}&body=${message}`}
             className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
           >
            send
              
           </Link>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
};

export default Contact;
