//THIS CODE TAKES CURRENT LOCATION EVERY 2 SECONDS

import React, { useState, useEffect, useRef } from 'react';

const Drivercopy = ({ license }) => {
  const host = "http://localhost:5000";
  const [students, setStudents] = useState([]);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // Store the map instance here
  const [isMapReady, setIsMapReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [marker, setMarker] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${host}/api/student/${license}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const updateCarCoords = async (coords) => {
    try {
      const response = await fetch(`${host}/api/auth/updatecoords/${license}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Coords: coords }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
    } catch (error) {
      console.error("Error updating car coordinates:", error.message);
    }
  };

const updateStudentStatus = async (studentId, newStatus) => {
  try {
      // Format the current date as "Date, Month, Time"
      const now = new Date();
      const options = {
          day: 'numeric',
          month: 'long',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
      };
      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now); // e.g., "30 October, 10:30 AM"

      const response = await fetch(`${host}/api/student/updatestatus/${studentId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Status: newStatus, Time: formattedTime }), // Include the formatted time in the request
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      // Update the local state with the new status and time
      setStudents((prev) =>
          prev.map((student) =>
              student.id === studentId ? { ...student, Status: newStatus, Time: formattedTime } : student
          )
      );
  } catch (error) {
      console.error("Error updating student status:", error.message);
  }
};



  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
        script.async = true;
        script.onerror = () => console.error("Error loading Google Maps API");
        script.onload = () => setIsMapReady(true);
        document.body.appendChild(script);
      } else {
        setIsMapReady(true);
      }
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (isMapReady && mapRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 17,
      });
      const newMarker = new window.google.maps.Marker({
        position: mapInstanceRef.current.getCenter(),
        map: mapInstanceRef.current
      });
      setMarker(newMarker);
      getCurrentLocation(); // Uncomment to get current location
      // mimicMovement(); // Comment/uncomment to switch between movement functions
    }
  }, [isMapReady]);


  //vurrent location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const coords = { lat: latitude, lng: longitude };
            console.log("Current Location:", coords); // Log current location
            setCurrentLocation(coords); // Update current location
            if (marker) {
                marker.setPosition(coords); // Move the marker to the current location
                mapInstanceRef.current.setCenter(coords); // Center the map on the current location
                updateCarCoords(coords); // Update coordinates in the database
            }
        },
        (error) => {
            console.error("Error getting current location:", error.message);
        }
    );
};


//generate random coords
  const getRandomLocation = () => {
    const lat = 37.7749 + (Math.random() - 0.5) * 0.01;
    const lng = -122.4194 + (Math.random() - 0.5) * 0.01;
    return { lat, lng };
  };


  //,imic movement
  const mimicMovement = () => {
    const randomLoc = getRandomLocation();
    setCurrentLocation(randomLoc);
    if (marker) {
      marker.setPosition(randomLoc);
      mapInstanceRef.current.setCenter(randomLoc);
      updateCarCoords(randomLoc);
    }
  };

  useEffect(() => {
    if (currentLocation && marker) marker.setPosition(currentLocation);
  }, [currentLocation, marker]);

  useEffect(() => {
    fetchStudents();
  }, [license]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation(); // Uncomment to use actual location
      // mimicMovement(); // Comment/uncomment to switch between movement functions
    }, 2000);

    return () => clearInterval(interval);
  }, [marker]);

  const handleStatusChange = (studentId, event) => {
    const newStatus = event.target.value;
    updateStudentStatus(studentId, newStatus);
  };

  return (
   
    <>
 <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
    <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
      <div className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg" ref={mapRef}></div>
      
      <div className="list flex-grow h-[40%] w-full">
        <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
          {students.length === 0 ? (
            <div className="text-center p-4 text-red-600 font-semibold">
              No students assigned to this bus.
            </div>
          ) : (
            <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Student</th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">School</th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Residence</th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Pt.Contact</th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Child}</div></td>
                    <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.School}</div></td>
                    <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Address}</div></td>
                    <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Contact}</div></td>
                    <td className="px-3 md:pl-6 pr-[40px] py-2 md:py-4">
                      <select
                        className="border rounded-md w-[100px] md:w-32 h-8 md:h-9 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm"
                        onChange={(e) => handleStatusChange(student.id, e)}
                        value={student.Status}
                      >
                        <option value="To school">To School</option>
                        <option value="At school">At School</option>
                        <option value="To home">To Home</option>
                        <option value="At home">At Home</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  </div>
</>
  );
};

export default Drivercopy;












// THIS CODE USES WATCHPOSITION TO CONTINUOSLY MONITOR POSITION 

// import React, { useState, useEffect, useRef } from 'react';

// const Drivercopy = ({ license }) => {
//   const host = "http://localhost:5000";
//   const [students, setStudents] = useState([]);
//   const mapRef = useRef(null);
//   const [isMapReady, setIsMapReady] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [marker, setMarker] = useState(null);

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch(`${host}/api/student/${license}`);
//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }
//       const data = await response.json();
//       setStudents(data);
//     } catch (error) {
//       console.error("Error fetching students:", error.message);
//     }
//   };

//   const updateCarCoords = async (coords) => {
//     try {
//       const response = await fetch(`${host}/api/auth/updatecoords/${license}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ Coords: coords }),
//       });
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
//     } catch (error) {
//       console.error("Error updating car coordinates:", error.message);
//     }
//   };

//   const updateStudentStatus = async (studentId, newStatus) => {
//     try {
//       const response = await fetch(`${host}/api/student/updatestatus/${studentId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ Status: newStatus }),
//       });
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
//       setStudents((prev) => 
//         prev.map((student) => 
//           student._id === studentId ? { ...student, Status: newStatus } : student
//         )
//       );
//     } catch (error) {
//       console.error("Error updating student status:", error.message);
//     }
//   };

//   useEffect(() => {
//     const loadGoogleMaps = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
//         script.async = true;
//         script.onerror = () => console.error("Error loading Google Maps API");
//         script.onload = () => setIsMapReady(true);
//         document.body.appendChild(script);
//       } else {
//         setIsMapReady(true);
//       }
//     };

//     loadGoogleMaps();
//   }, []);

//   useEffect(() => {
//     if (isMapReady && mapRef.current) {
//       const mapInstance = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 37.7749, lng: -122.4194 },
//         zoom: 12,
//       });
//       const newMarker = new window.google.maps.Marker({ position: mapInstance.getCenter(), map: mapInstance });
//       setMarker(newMarker);
//       // mimicMovement(mapInstance); // Start mimicking movement
//     }
//   }, [isMapReady]);

//   const getRandomLocation = () => {
//     const lat = 37.7749 + (Math.random() - 0.5) * 0.01;
//     const lng = -122.4194 + (Math.random() - 0.5) * 0.01;
//     return { lat, lng };
//   };

//   // const mimicMovement = () => {
//   //   const randomLoc = getRandomLocation();
//   //   setCurrentLocation(randomLoc);
//   //   if (marker) {
//   //     marker.setPosition(randomLoc);
//   //     updateCarCoords(randomLoc);
//   //   }
//   // };

//   useEffect(() => {
//     if (currentLocation && marker) marker.setPosition(currentLocation);
//   }, [currentLocation, marker]);

//   useEffect(() => {
//     fetchStudents();
//   }, [license]);

//   // Using watchPosition for real-time location tracking
//   useEffect(() => {
//     let watchId;
//     if (navigator.geolocation) {
//       watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const loc = { lat: latitude, lng: longitude };
//           setCurrentLocation(loc);
//           if (mapRef.current && marker) {
//             mapRef.current.setCenter(loc);
//             marker.setPosition(loc);
//           }
//           updateCarCoords(loc);
//         },
//         (error) => console.error("Error getting location:", error.message),
//         { enableHighAccuracy: true, maximumAge: 0 }
//       );
//     }
//     return () => {
//       if (watchId) navigator.geolocation.clearWatch(watchId);
//     };
//   }, [marker]);

//   const handleStatusChange = (studentId, event) => {
//     const newStatus = event.target.value;
//     updateStudentStatus(studentId, newStatus);
//   };

//   return (
//     <div className='main h-[100vh] w-[100vw] flex justify-center items-center bg-[#b5c2ca]'>
//       <div className="mainn w-[88%] h-[88%] bg-gray-100 flex flex-col p-[2px] pb-[3px] rounded-[12px]">
//         <div className="map w-[100%] h-[60%] bg-blue-300 mb-[2px] rounded-tr-[12px] rounded-tl-[12px]" ref={mapRef}></div>
        
//         <div className="list flex-grow h-[40%]">
//           <div className="relative shadow-md rounded-bl-[12px] rounded-br-[12px] h-full overflow-y-auto scrollbar-hidden">
//             {students.length === 0 ? (
//               <div className="text-center p-4 text-red-600 font-semibold">
//                 No students assigned to this bus.
//               </div>
//             ) : (
//               <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50">Student</th>
//                     <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50">School</th>
//                     <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50">Residence</th>
//                     <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50">Pt.Contact</th>
//                     <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr key={student._id} className="bg-white border-b hover:bg-gray-50">
//                       <td className="px-6 py-4">{student.Name}</td>
//                       <td className="px-6 py-4">{student.School}</td>
//                       <td className="px-6 py-4">{student.Residence}</td>
//                       <td className="px-6 py-4">{student.Contact}</td>
//                       <td className="px-6 py-4">
//                         <select
//                           className="border rounded-md w-32 h-9 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           onChange={(e) => handleStatusChange(student._id, e)}
//                           value={student.Status}
//                         >
//                           <option value="to school">To School</option>
//                           <option value="at school">At School</option>
//                           <option value="to home">To Home</option>
//                           <option value="at home">At Home</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Drivercopy;
