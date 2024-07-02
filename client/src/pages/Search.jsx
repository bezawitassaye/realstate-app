

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap">
                        Search Term
                    </label>
                    <input type="text" id="searchTerm"
                      placeholder="Search..."
                      className="border rounded-lg p-3 w-full"
                    />

                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label > Type:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="all" className="w-5" />
                        <span>Rent & Sale</span>

                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="Rent" className="w-5" />
                        <span>Rent </span>

                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="Sale" className="w-5" />
                        <span> Sale</span>

                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="Offer" className="w-5" />
                        <span>Offer</span>

                    </div>

                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label > Amenities:</label>
                    
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="Parking" className="w-5" />
                        <span> Parking</span>

                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="Furnished" className="w-5" />
                        <span>Furnished</span>

                    </div>

                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="">Sort:</label>
                    <select id="sort_order" className="border rounded-lg p-3">
                       <option>Price hign to low</option>
                       <option >PPrice low to high</option>
                       <option >Latest</option>
                       <option >Oldest</option>
                    </select>

                </div>
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase 
                hover:opacity-95">Search</button>
            </form>
        </div>
        <div>
            <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">Listing results:</h1>
        </div>
    </div>
  )
}

export default Search