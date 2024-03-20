import { useNavigate } from "react-router-dom";

function SearchResult({searchQuery, station, price, address, distance}) {
    const navigate = useNavigate()

    return (
      <>
      <div 
        onClick = {
          () => navigate('/reservation-details', 
                  {state: {
                    searchQuery: {searchQuery}, 
                    station: {station}, 
                    price: {price}}
                  })
        } 
        class = "border border-border px-4 py-8 rounded-lg hover:bg-gray5"
      >

        <div class = "grid grid-cols-4">
            <div class = "col-span-3">
                <h1 class = "text-card-title pb-2"> {station}</h1>
                <p class = "text-sm text-body-copy">{address}</p>
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