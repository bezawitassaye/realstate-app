// ListingDetail.js
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

import { useNavigate } from 'react-router-dom';

const ListingDetail = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [listing, setListing] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const navigate=useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState(undefined); // Track loading state

  useEffect(() => {
    fetchListing(id);
  }, [id]);

  const fetchListing = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.get(`http://localhost:5019/api/list/fech/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setListing(response.data.listing);
      setFormData(response.data.listing);
      setLoading(false); // Update loading state
    } catch (error) {
      console.error('Fetch listing error:', error);
      // Handle error scenario
    }
  };

  const handlechange = (e) => {
   
    if (e.target.id === "Sell" || e.target.id === "Rent") {
        setFormData({
            ...formData,
            type: e.target.id
        });
    }

    if (e.target.id === "Parking" || e.target.id === "Furnished" || e.target.id === "Offer") {
        setFormData({
            ...formData,
            [e.target.id]: e.target.checked
        });
    }

    if(e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea"){
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.put(
        `http://localhost:5019/api/list/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(formData)
      console.log('Listing updated successfully:', response.data.listing);
      navigate(`/listing/${listing._id}`)
      // Optionally update local state or handle success
    } catch (error) {
      console.error('Update listing error:', error);
      // Handle error scenario
    }
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader component
  }
  const handleRemoveImage=(index)=>{
    setFormData({
        ...formData,imageUrls:formData.imageUrls.filter((url,i)=> i !== index),
    })
  }
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: [...prevFormData.imageUrls, ...urls],
          }));
        })
        .catch((error) => {
          console.error("Error uploading images:", error);
          // Handle error scenario
        });
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name; // Ensure proper concatenation of timestamp
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    setFiles(Array.from(fileList)); // Update files state with selected files
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Listing Detail</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="name"
            id="name"
            minLength={10}
            maxLength={62}
            required
            onChange={handlechange}
            value={formData.name}
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="address"
            id="address"
            minLength={10}
            maxLength={62}
            required
            onChange={handlechange}
            value={formData.address}
          />

          <textarea
            className="border p-3 rounded-lg"
            type="text"
            placeholder="description"
            id="description"
            minLength={10}
            maxLength={62}
            required
            onChange={handlechange}
            value={formData.description}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="Sell"
               className="w-5"
               onChange={handlechange}
               checked={formData.type === "Sell"}
                />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Rent" className="w-5" 
              onChange={handlechange}
              checked={formData.type === "Rent"} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
            <input
                type="checkbox"
                id="Parking"
                className="w-5"
                checked={formData.Parking}
                onChange={handlechange}
            />
            <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
            <input
                type="checkbox"
                id="Furnished"
                className="w-5"
                checked={formData.Furnished}
                onChange={handlechange}
            />
            <span>Furnished</span>
            </div>
            <div className="flex gap-2">
            <input
                type="checkbox"
                id="Offer"
                className="w-5"
                checked={formData.Offer}
                onChange={handlechange}
            />
            <span>Offer</span>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handlechange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
               
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handlechange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min={50}
                  max={10000000}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handlechange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={50}
                  max={10000000}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handlechange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p>Images:</p>
          <span>The first image will be the cover (max 6)</span>

          <div className="flex gap-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="p-3 border border-gray-300 rounded w-full"
              id="images"
              accept="image/*"
              multiple
            />

            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          {formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>(
            <div key={index} className="flex justify-between p-3 border items-center">
                
                 < img key={index} src={url} alt="Listing image" className="w-40 h-40 object-contain rounded-lg" />
                 <button type="button" onClick={ () => handleRemoveImage(index)} className="p-3
                 text-red-700 rounded-lg uppercase hover:opacity-75" >
                    Delete

                 </button>
            </div>

          ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            
          
          Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListingDetail;
