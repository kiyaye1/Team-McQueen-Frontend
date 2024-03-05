import SearchResult from "./SearchResult";
import MapComponent from "./MapComponent";

function MapResults({search}) {
    const isSearch = search
    if(isSearch) {
        return (
        <>
            <section class = "grid grid-cols-8 gap-8">
            <div class = "col-span-3">
                <div class = "grid grid-cols-1 gap-4">
                <SearchResult station = "GyroGoGo Northwest" price = "25" distance = "0.3" address = "The Mall at Greece Ridge, Somerworth Dr, Rochester, NY"/>
                <SearchResult station = "GyroGoGo Northeast" price = "25" distance = "1.2" address = "Town Center of Webster, Webster, NY"/>
                <SearchResult station = "GyroGoGo Center City" price = "25" distance = "3" address = "Genesee Crossroads Garage, 69 Andrews St, Rochester, NY "/>
                <SearchResult station = "GyroGoGo Southeast" price = "25" distance = "4" address = "Perinton Square Mall, Fairport, NY"/>
                <SearchResult station = "GyroGoGo Airport" price = "25" distance = "4.3" address = "Paul Rd at Scottsville Rd, Rochester, NY"/>
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