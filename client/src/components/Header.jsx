import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);

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
          <li>
            <Link to="/" className="text-slate-700 hover:underline cursor-pointer">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-slate-700 hover:underline cursor-pointer">
              About
            </Link>
          </li>
          <li>
            <Link to="/profile">
              {currentUser ? (
                <img className="rounded-full h-9 w-9 object-cover" src={currentUser.avatar} alt="profile" />
              ) : (
                <span className="text-slate-700 hover:underline cursor-pointer">Signup</span>
              )}
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="bg-stone-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
