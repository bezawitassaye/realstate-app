/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const ListingItems = ({ lising }) => { 
  const [liked, setLiked] = useState(false);

  if (!lising) return null;

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      
      <Link to={`/listing/${lising._id}`} className="relative">

        {/* ❤️ Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // stops navigation
            setLiked(!liked);
          }}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-10"
        >
          <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
        </button>

        <img
          src={lising.imageUrls[0]}
          alt="Listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
        />

        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {lising.name}
          </p>

          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">
              {lising.address}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {lising.description}
          </p>

          <p className="font-semibold text-slate-800">
            $
            {lising.Offer
              ? lising.discountPrice.toLocaleString("en-US")
              : lising.regularPrice.toLocaleString("en-US")}
            {lising.type === "Rent" && " / month"}
          </p>

          <div className="flex gap-4 text-sm text-gray-700">
            <div>
              {lising.bedrooms > 1
                ? `${lising.bedrooms} beds`
                : `${lising.bedrooms} bed`}
            </div>
            <div>
              {lising.bathrooms > 1
                ? `${lising.bathrooms} baths`
                : `${lising.bathrooms} bath`}
            </div>
          </div>
        </div>

      </Link>
    </div>
  );
};

export default ListingItems;
