import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    searchTerm: "",
    type: "all",
    Parking: false,
    Furnished: false,
    Offer: false,
    sort: "createdAt",
    order: "desc"
  });
  const [listings, setListings] = useState([]);
  console.log(listings)
  const handlechange = (e) => {
    if (e.target.id === "all" || e.target.id === "Rent" || e.target.id === "Sell") {
      setData({ ...data, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setData({ ...data, searchTerm: e.target.value });
    }

    if (e.target.id === "Parking" || e.target.id === "Furnished" || e.target.id === "Offer") {
      setData({ ...data, [e.target.id]: e.target.checked });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";

      setData({ ...data, sort, order });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("Parking");
    const furnishedFromUrl = urlParams.get("Furnished");
    const offerFromUrl = urlParams.get("Offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    setData({
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      Parking: parkingFromUrl === "true",
      Furnished: furnishedFromUrl === "true",
      Offer: offerFromUrl === "true",
      sort: sortFromUrl || "createdAt",
      order: orderFromUrl || "desc"
    });

    const fetchingListings = async () => {
      try {
        const searchQuery = urlParams.toString();
        const response = await axios.get(`http://localhost:5019/api/list/get?${searchQuery}`);
        setListings(response.data);
        console.log("success");
        console.log(response)
      } catch (error) {
        console.error(error);
        
      }
    };

    fetchingListings();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", data.searchTerm);
    urlParams.set("type", data.type);
    urlParams.set("Parking", data.Parking.toString());
    urlParams.set("Furnished", data.Furnished.toString());
    urlParams.set("Offer", data.Offer.toString());
    urlParams.set("sort", data.sort);
    urlParams.set("order", data.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={data.searchTerm}
              onChange={handlechange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={data.type === "all"}
                onChange={handlechange}
              />
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Rent"
                className="w-5"
                checked={data.type === "Rent"}
                onChange={handlechange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Sell"
                className="w-5"
                checked={data.type === "Sell"}
                onChange={handlechange}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Offer"
                className="w-5"
                checked={data.Offer}
                onChange={handlechange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Parking"
                className="w-5"
                checked={data.Parking}
                onChange={handlechange}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="Furnished"
                className="w-5"
                checked={data.Furnished}
                onChange={handlechange}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort_order">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handlechange}
              defaultValue={`${data.sort}_${data.order}`}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-col w-full p-7">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">Listing results:</h1>
        {listings.length > 0 ? (
          <ul>
            {listings.map((listing) => (
              <li key={listing._id}>
                <p>Name: {listing.name}</p>
                <p>Type: {listing.type}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
