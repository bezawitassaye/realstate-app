import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
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

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="name"
            id="name"
            minLength={10}
            maxLength={62}
            required
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="address"
            id="address"
            minLength={10}
            maxLength={62}
            required
          />

          <textarea
            className="border p-3 rounded-lg"
            type="text"
            placeholder="description"
            id="description"
            minLength={10}
            maxLength={62}
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="Sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Offer" className="w-5" />
              <span>Offer</span>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
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
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
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
