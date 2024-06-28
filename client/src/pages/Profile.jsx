// Profile.js

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { deleeteUserFailure, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess,SignoutUserSuccess ,SignuotUserFailure} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage();
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error('Upload Error:', error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.put(
        'http://localhost:5019/api/user/update',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      dispatch(updateUserSuccess(response.data.user)); // Dispatch success action
      // Optionally, update any local state or UI based on success
     

    } catch (error) {
      console.error('Update user error:', error);
      dispatch(updateUserFailure(error.message)); // Dispatch failure action
      // Handle error scenario
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  
      const response = await axios.delete('http://localhost:5019/api/user/delete', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Assuming you want to handle success and update UI or local state accordinglyal
      if(response.data.success===false){
        dispatch(deleeteUserFailure(response.data))
      }
      console.log('User deleted successfully:', response.data.message);
      navigate("/")
      localStorage.removeItem('token');
      // Dispatch action to update Redux state
      dispatch(deleteUserSuccess(response.data)); // Set currentUser to null or empty after deletion
  
      // Optionally, update local state or UI to reflect account deletion
  
    } catch (error) {
      console.error('Delete user error:', error);
      dispatch(deleeteUserFailure(error.message))
      // Handle error scenario
    }
  };
  
  const handleSignOut = async () => {
    try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        await axios.post(
            'http://localhost:5019/api/user/signout',
            {}, // Empty body or any required data for signout API
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        localStorage.removeItem('token'); // Clear token from localStorage
        dispatch(SignoutUserSuccess()); // Dispatch sign-out success action or handle as needed
        navigate("/"); // Redirect to home page or login after sign-out

    } catch (error) {
        console.error('Sign-out error:', error);
        dispatch(SignuotUserFailure(error.message)); // Dispatch sign-out failure action
        // Handle error scenario
    }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          onChange={handleFileInputChange}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {
            fileUploadError ? (
              <span className='text-red-700'>Error Image upload(image must be less than 2 mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-yellow-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
            ) : (
              ""
            )
          }
        </p>
        <input
          type='text'
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg m-3 outline-none'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg m-3 outline-none'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg m-3 outline-none'
          onChange={handleChange}
        />
        <button
          type='submit'
          className='bg-blue-700 text-white mt-2 p-3 rounded-lg uppercase text-center 
        hover:opacity-95'>
          Update
        </button>
        <Link className='bg-red-700 text-white mt-2 p-3 rounded-lg uppercase text-center 
        hover:opacity-95' to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
            
      </div>
    </div>
  );
};

export default Profile;
