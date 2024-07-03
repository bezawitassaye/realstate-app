/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItems = ({ lising }) => { 
    if (!lising) return null;// Note the prop name should match the destructured prop name
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${lising._id}`}>
        <img
          src={lising.imageUrls[0]}
          alt="Listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">{lising.name}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">{lising.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{lising.description}</p>
          <p>
            {lising.Offer ? lising.discountPrice.toLocaleString('en-US') : lising.regularPrice.toLocaleString('en-US')}
            {lising.type === "Rent" && " / month"}
          </p>
          <div className="flex gap-4">
            <div>
              {lising.bedrooms > 1 ? `${lising.bedrooms} beds` : `${lising.bedrooms} bed`}
            </div>
            <div>
              {lising.bathrooms > 1 ? `${lising.bathrooms} baths` : `${lising.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItems;
