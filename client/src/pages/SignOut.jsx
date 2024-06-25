import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignOut = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const changehandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };

    const onRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5019/api/user/register", data);
            if (response.data.success){
              navigate("/signin");
            }
           
            console.log(response.data); // Assuming response.data contains success and message
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center mt-28">
            <div className="bg-amber-100 p-8 rounded shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={onRegister}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input onChange={changehandler} value={data.username} type="text" id="username" name="username" className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" onChange={changehandler} value={data.email} autoComplete="email" className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input  placeholder="***********" onChange={changehandler} value={data.password} type="password" id="password" name="password" autoComplete="current-password" className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-black placeholder-xl" required />
                        </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Sign Up</button>
                    </div>
                </form>
                <div className="text-center">
                    <span className="text-sm text-gray-600">Or sign up with</span>
                    <button className="mt-2 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Login with Google</button>
                </div>
                <div className="flex gap-2 mt-5">
                    <p>Have an account? 
                        <Link to="/signin">
                            <span className="text-blue-700">Sign in</span>
                        </Link>
                    </p>  
                </div>
            </div>
        </div>
    );
}

export default SignOut;
