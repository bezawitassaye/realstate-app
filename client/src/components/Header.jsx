import {FaSearch} from "react-icons/fa"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
const Header = () => {
  const {currentUser}= useSelector(state=>state.user)
  {console.log(currentUser)}
  return (
    <header className="bg-amber-100 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to="/">
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    <span className="text-slate-500">Sahand</span>
                    <span className="text-slate-700">Estate</span>

                </h1>
            </Link>
            
             <ul className="flex gap-4 items-center">
                <Link to="/">
                   <li className="sm:inline text-slate-700 hover:underline cursor-pointer"> Home</li>
                </Link>
                <Link to="/about">
                  <li className="sm:inline text-slate-700 hover:underline cursor-pointer"> About</li>

                </Link>

                <Link to="/profile">
                
                    {currentUser?(
                      
                    <img  className="rounded-full h-9 w-9 object-cover" src={currentUser.user.avatar} alt="profile"/> 
                    ):(
                      <li className="sm:inline text-slate-700 hover:underline cursor-pointer"> Signup</li>
                  
                    )}
               
                </Link>
               
             </ul>
            <form  className="bg-stone-100 p-3 rounded-lg flex items-center">
                    <input type="text" placeholder="Search..."
                      className="bg-transparent focus:outline-none w-24 sm:w-64"/>
                     <FaSearch className="text-slate-600"/>
                 </form>

        </div>

    </header>
  )
}

export default Header