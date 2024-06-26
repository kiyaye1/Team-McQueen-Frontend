import MapComponent from "./MapComponent";
import { useNavigate } from "react-router-dom";

function MapResults({search, result, searchQuery}) {
    const navigate = useNavigate()
    const reservationResult = result.reservationResult
    const isSearch = search

    console.log(result)

    function getStationName(startID) {
        switch(startID) {
            case 1: return "Northwest";
            case 2: return "Northeast";
            case 3: return "Center City";
            case 4: return "Southeast";
            case 5: return "Airport";
            default: return "Northwest"
        }
    }

    if(isSearch) {
        return (
        <>
            <section class = "grid grid-cols-8 gap-8">
            <div class = "col-span-3">
                <div class = "grid grid-cols-1 gap-4">
                {/* Reservation Result Card */}
                {reservationResult?.map((data, key) => {
                    if(data.carsAvailable.length > 0) {
                        return(
                            <div key = {key}
                                onClick = {
                                () => navigate('/reservation-details', 
                                    {state: {
                                        result: {data},
                                        search: {searchQuery}
                                    } })
                                } 
                                class = "border border-border px-4 py-8 rounded-lg hover:bg-gray5"
                            >
            
                                <div class = "grid grid-cols-4">
                                    <div class = "col-span-3">
                                        <h1 class = "text-card-title pb-2">{getStationName(data.stationID)}</h1>
                                        <p class = "text-sm text-body-copy">{data.streetAddress + " " + data.city}</p>
                                        <p class = "text-sm text-body-copy">{data.carsAvailable.length} cars available</p>
                                    </div>
                                    <div class = "col-span-1 text-right text-teal-secondary font-bold">
                                        <p>{data.costPerHour} per hour</p>
                                        <p>Total Cost: ${data.cost ? data.cost : "0"}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        ); 
                    } else {
                        return (
                            <div class = "pl-8">
                                No Cars Available at this location and time.
                            </div>
                        );
                    }
                })}

                </div>
            </div>

            <div class = "col-span-5 rounded-lg">
                <MapComponent/>
            </div>
            </section>
        </>
        );
    } 
    return (
        <section class = "grid grid-cols-8 gap-8">
            <div class = "col-span-8 rounded-lg">
                <MapComponent/>
            </div>
        </section>
    );
}

export default MapResults;
