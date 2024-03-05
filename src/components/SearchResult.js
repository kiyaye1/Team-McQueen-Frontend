function SearchResult({station, price, address, distance}) {
    return (
      <>
      <div class = "border px-4 py-8 rounded-lg">

        <div class = "grid grid-cols-4">
            <div class = "col-span-3">
                <h1 class = "text-card-title pb-2"> {station}</h1>
                <p class = "text-sm">{address}</p>
            </div>
            <div class = "col-span-1 text-right text-teal-secondary font-bold">
                <p>${price}</p>
                <p>{distance} miles</p>
            </div>
            
        </div>
      </div>
      </>
  
    );
  }
  
  export default SearchResult;