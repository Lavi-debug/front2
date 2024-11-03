// import React, { useState, useEffect, useRef } from "react"

// const Test = () => {
//     const host = "http://localhost:5000";
//     const [cars, setCars] = useState([]);
//     const mapRef = useRef(null);

//     useEffect(() => {
//         const initMap = () => {
//             // Create a new map instance
//             const map = new window.google.maps.Map(mapRef.current, {
//                 center: { lat: -34.397, lng: 150.644 }, // Default center coordinates
//                 zoom: 8, // Default zoom level
//             });
//         };

//         // Check if the Google Maps script has loaded
//         if (window.google && window.google.maps) {
//             initMap();
//         } else {
//             console.error("Google Maps script not loaded");
//         }
//     }, []);

//     const getCars = async () => {
//         try {
//             const response = await fetch(`${host}/api/auth/fetchallcars`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             });
    
//             // Check if the response is ok (status in the range 200-299)
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
    
//             const json = await response.json();
    
//             // Check if there are no cars in the response
//             if (!json || json.length === 0) {
//                 throw new Error("No cars found.");
//             }
    
//             setCars(json);
//             console.log(json);
//         } catch (error) {
//             console.error("Error fetching cars:", error.message);
//         }
//     };

//     useEffect(()=>{
//         getCars();
//     }, [])


//     return (
//         <div className='flex bg-[#b5c2ca] w-full h-screen p-12'>

//             <div className="main w-full flex">
//                 <div className="left h-[94%] bg-[#b5c2ca] w-[40%] rounded-2xl mr-[4px]">
//                     <div className="fd bg-[#b5c2ca] h-[100%] w-[100%] rounded-2xl mt-[10px] border-[2px] border-[black]">
//                         <div className="map bg-blue-200 h-[54%] w-full rounded-tl-[12px] rounded-tr-[12px] mb-[2px]" ref={mapRef}>
//                             {/* Map will appear here */}
//                         </div>
//                         <div className="srch bg-white h-[45.5%] w-full px-[5%] py-[2%] rounded-bl-[12px] rounded-br-[12px] overflow-y-auto scrollbar-hidden">
//                             <div className="optconta">
//                                 {cars.map((car) => (
//                                 <div key={car.id} className='flex items-center mb-[10px] hover:bg-gray-50'>
//                                     <div className="log">
//                                         <div className="tt bg-red-400 w-[36px] h-[36px] rounded-[50px]"></div>
//                                     </div>
//                                     <div className="drvrnm text-[14px] font-semibold pl-[18px] pr-[30px] w-[25%] text-black">
//                                         <h1>{car.driverName}</h1>
//                                     </div>
//                                     <div className="std text-[14px] font-semibold w-[25%] text-black">
//                                         <h1>{car.driverCont}</h1>
//                                     </div>
//                                     <div className="stst w-[52%] flex justify-end pr-[10px]">
//                                         <div className='text-[14px] font-semibold text-black'>
//                                             <h1>{car.License}</h1>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//             </div>
//         </div>
//     );
// };

// export default Test;




// import React, { useState, useEffect, useRef } from "react"

// const Test = () => {
//     const host = "http://localhost:5000";
//     const [cars, setCars] = useState([]);
//     const mapRef = useRef(null);

//     useEffect(() => {
//         const initMap = () => {
//             // Create a new map instance
//             const map = new window.google.maps.Map(mapRef.current, {
//                 center: { lat: -34.397, lng: 150.644 }, // Default center coordinates
//                 zoom: 8, // Default zoom level
//             });
//         };

//         // Check if the Google Maps script has loaded
//         if (window.google && window.google.maps) {
//             initMap();
//         } else {
//             console.error("Google Maps script not loaded");
//         }
//     }, []);

//     const getCars = async () => {
//         try {
//             const response = await fetch(`${host}/api/auth/fetchallcars`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             });
    
//             // Check if the response is ok (status in the range 200-299)
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
    
//             const json = await response.json();
    
//             // Check if there are no cars in the response
//             if (!json || json.length === 0) {
//                 throw new Error("No cars found.");
//             }
    
//             setCars(json);
//             console.log(json);
//         } catch (error) {
//             console.error("Error fetching cars:", error.message);
//         }
//     };

//     useEffect(() => {
//         getCars();
//     }, [])

//     return (
//         <div className='flex bg-[#b5c2ca] w-full h-screen p-12'>
//             <div className="main w-full flex">
//                 <div className="left h-[94%] bg-[#b5c2ca] w-[40%] rounded-2xl mr-[4px]">
//                     <div className="fd bg-[#b5c2ca] h-[100%] w-[100%] rounded-2xl mt-[10px] border-[2px] border-[black]">
//                         <div className="map bg-blue-200 h-[54%] w-full rounded-tl-[12px] rounded-tr-[12px] mb-[2px]" ref={mapRef}>
//                             {/* Map will appear here */}
//                         </div>
//                         <div className="srch bg-white h-[45.5%] w-full px-[5%] py-[2%] rounded-bl-[12px] rounded-br-[12px] overflow-y-auto scrollbar-hidden">
//                             <div className="optconta">
//                             {cars.map((car) => {
//     const coords = car.Coords || null; // Default to null if Coords is undefined
//     const lat = coords ? coords.lat : "No coordinates available"; // Check if coords is defined
//     const lng = coords ? coords.lng : ""; // Display nothing if coords is not defined

//     return (
//         <div key={car.id} className='flex items-center mb-[10px] hover:bg-gray-50'>
//             <div className="log">
//                 <div className="tt bg-red-400 w-[36px] h-[36px] rounded-[50px]"></div>
//             </div>
//             <div className="drvrnm text-[14px] font-semibold pl-[18px] pr-[30px] w-[25%] text-black">
//                 <h1>{car.driverName}</h1>
//             </div>
//             <div className="std text-[14px] font-semibold w-[25%] text-black">
//                 <h1>{typeof lat === 'string' ? lat : `${lat}, ${lng}`}</h1> {/* Display message or lat/lng */}
//             </div>
//             <div className="stst w-[52%] flex justify-end pr-[10px]">
//                 <div className='text-[14px] font-semibold text-black'>
//                     <h1>{car.License}</h1>
//                 </div>
//             </div>
//         </div>
//     );
// })}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Test;


import React, { useState, useEffect, useRef } from "react";

const Test = () => {
    const host = "http://localhost:5000";
    const [cars, setCars] = useState([]);
    const [mapCoords, setMapCoords] = useState({ lat: -34.397, lng: 150.644 });
    const [alertMessage, setAlertMessage] = useState(""); // For custom alert message
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        const initMap = () => {
            mapInstance.current = new window.google.maps.Map(mapRef.current, {
                center: mapCoords,
                zoom: 8,
            });
        };

        if (window.google && window.google.maps) {
            initMap();
        } else {
            console.error("Google Maps script not loaded");
        }
    }, []);

    const getCars = async () => {
        try {
            const response = await fetch(`${host}/api/auth/fetchallcars`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();

            if (!json || json.length === 0) {
                throw new Error("No cars found.");
            }

            setCars(json);
            console.log(json);
        } catch (error) {
            console.error("Error fetching cars:", error.message);
        }
    };

    useEffect(() => {
        getCars();
    }, []);

    const handleCarClick = (car) => {
        const coords = car.Coords;

        if (coords && coords.lat && coords.lng) {
            setMapCoords({ lat: coords.lat, lng: coords.lng });
            if (mapInstance.current) {
                mapInstance.current.setCenter({ lat: coords.lat, lng: coords.lng });
            }
        } else {
            // Set custom alert message if coordinates are missing or empty
            setAlertMessage("Coordinates are not available yet. Please log in to the driver page to get coordinates.");
        }
    };

    // Function to close the alert
    const closeAlert = () => {
        setAlertMessage("");
    };

    return (
        <div className='flex bg-[#b5c2ca] w-full h-screen p-12'>
            <div className="main w-full flex">
                <div className="left h-[94%] bg-[#b5c2ca] w-[40%] rounded-2xl mr-[4px]">
                    <div className="fd bg-[#b5c2ca] h-[100%] w-[100%] rounded-2xl mt-[10px] border-[2px] border-[black]">
                        <div className="map bg-blue-200 h-[54%] w-full rounded-tl-[12px] rounded-tr-[12px] mb-[2px]" ref={mapRef}>
                            {/* Map will appear here */}
                        </div>
                        <div className="srch bg-white h-[45.5%] w-full px-[5%] py-[2%] rounded-bl-[12px] rounded-br-[12px] overflow-y-auto scrollbar-hidden">
                            <div className="optconta">
                                {cars.map((car) => {
                                    const coords = car.Coords || null;
                                    const lat = coords ? coords.lat : "No coordinates available";
                                    const lng = coords ? coords.lng : "";

                                    return (
                                        <div key={car.id} className='relative'>
                                            <div
                                                className='flex items-center mb-[10px] hover:bg-gray-50 cursor-pointer'
                                                onClick={() => handleCarClick(car)}
                                            >
                                                <div className="log">
                                                    <div className="tt bg-red-400 w-[36px] h-[36px] rounded-[50px]"></div>
                                                </div>
                                                <div className="drvrnm text-[14px] font-semibold pl-[18px] pr-[30px] w-[25%] text-black">
                                                    <h1>{car.driverName}</h1>
                                                </div>
                                                <div className="std text-[14px] font-semibold w-[25%] text-black">
                                                    <h1>{typeof lat === 'string' ? lat : `${lat}, ${lng}`}</h1>
                                                </div>
                                                <div className="stst w-[52%] flex justify-end pr-[10px]">
                                                    <div className='text-[14px] font-semibold text-black'>
                                                        <h1>{car.License}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Alert */}
            {alertMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p>{alertMessage}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={closeAlert}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Test;
