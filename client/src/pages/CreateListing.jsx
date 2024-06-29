import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import axios from "axios";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate =  useNavigate()  
  const {currentUser} = useSelector(state => state.user)
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name:"",
    description:"",
    address:"",
    type:"Rent",
    bedrooms:1,
    bathrooms:1,
    regularPrice:50,
    discountPrice:50,
    Offer:false,
    Parking:false,
    Furnished:false,

  });

  console.log(formData); // Check if formData.imageUrls is updated correctly

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    setFiles(Array.from(fileList)); // Update files state with selected files
  };

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

  const handleRemoveImage=(index)=>{
    setFormData({
        ...formData,imageUrls:formData.imageUrls.filter((url,i)=> i !== index),
    })
  }
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
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send formData to backend using Axios
      const response = await axios.post(
        "http://localhost:5019/api/list/create",
        { ...formData, userRef: currentUser._id } // Include formData and userRef
      );
      navigate(`/listing/${response.data.listing._id}`)
      console.log("Response from backend:", response.data);
      // Handle success scenario
    } catch (error) {
      console.error("Error creating listing:", error);
      // Handle error scenario
    }
  };
 

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>

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
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
