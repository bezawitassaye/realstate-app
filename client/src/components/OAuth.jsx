// OAuth.jsx
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import axios from "axios"; // Import Axios

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleOnClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // Make API call using Axios
      const response = await axios.post("http://localhost:5019/api/user/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      // Handle response
      if (response.status === 200) {
        navigate("/");
        dispatch(signInSuccess(response.data.user));
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Could not sign in with Google:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleOnClick}
      type="button"
      className="mt-2 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
    >
      Login with Google
    </button>
  );
};

export default OAuth;
