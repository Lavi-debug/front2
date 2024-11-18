// import React, { useState, useEffect, useRef } from 'react';

// const Parents = ({ license, contact }) => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]); // New state for filtered students
//   const [matchedCar, setMatchedCar] = useState({
//     coords: {
//       lat: 28.2599333, // Default latitude
//       lng: 77.412615,   // Default longitude
//     },
//   });
//   const host = "https://logi-8ty2.onrender.com";
//   const mapRef = useRef(null);  // Ref for the map container
//   const mapInstance = useRef(null); // Ref for the map instance
//   const markerRef = useRef(null); // Ref for the map marker

//   // Fetch all students
//   const fetchAllStudents = async () => {
//     try {
//       const response = await fetch(`${host}/api/student/fetchallstudents`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch students");
//       }
//       const data = await response.json();
//       setStudents(data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   // Fetch car data and update coordinates
//   const fetchCarData = async () => {
//     try {
//       const response = await fetch(`${host}/api/auth/fetchallcars`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch car data");
//       }
//       const cars = await response.json();

//       // Find the car that matches the license number
//       const matchedCarData = cars.find((car) => car.License === license);
//       if (matchedCarData && matchedCarData.Coords) {
//         setMatchedCar({ coords: matchedCarData.Coords });
//         // console.log("this are car's coords", matchedCar.coords);
//         console.log(matchedCar);
//       } else {
//         console.error("No car found with the specified license number");
//       }
//     } catch (error) {
//       console.error("Error fetching car data:", error);
//     }
//   };

//   // Initialize the map
//   const initializeMap = () => {
//     if (!mapInstance.current) {
//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         center: matchedCar.coords,
//         zoom: 17,
//       });
//       console.log(matchedCar.coords);
//       markerRef.current = new window.google.maps.Marker({
//         position: matchedCar.coords,
//         map: mapInstance.current,
//       });
//     }
//   };


//   // Add this useEffect to log the matchedCar state whenever it updates
//   useEffect(() => {
//     console.log("Updated coordinates:", matchedCar.coords);
//   }, [matchedCar]);

//   // Update map center smoothly
//   useEffect(() => {
//     if (mapInstance.current) {
//       mapInstance.current.panTo(matchedCar.coords); // Smoothly pan to the new coordinates
//       markerRef.current.setPosition(matchedCar.coords); // Move the marker to new coordinates
//     }
//   }, [matchedCar.coords]);

//   // Effect to filter students based on contact number
//   useEffect(() => {
//     const filterStudents = () => {
//       const filtered = students.filter((student) => student.Contact === contact);
//       setFilteredStudents(filtered);
//     };

//     filterStudents();
//   }, [students, contact]); // Run the effect whenever students or contact changes

//   useEffect(() => {
//     // Fetch initial data
//     fetchAllStudents();
//     fetchCarData();
//     initializeMap();

//     // Set interval to fetch students every 2 seconds
//     const studentInterval = setInterval(fetchAllStudents, 2000); // Fetch students every 2 seconds
//     const carInterval = setInterval(fetchCarData, 2000); // Fetch car coordinates every 2 seconds

//     return () => {
//       clearInterval(studentInterval); // Cleanup on unmount
//       clearInterval(carInterval); // Cleanup on unmount
//     };
//   }, []); // Empty dependency array means this runs once on mount

//   return (

//     <>
//       <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//         <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
//           <div
//             className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
//             ref={mapRef}
//             style={{ height: '100%', width: '100%' }}
//           ></div>

//           <div className="list flex-grow h-[40%]">
//             <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
//               <div className="w-full text-xs md:text-sm text-gray-500">
//                 <div className="flex bg-gray-50 text-gray-700 uppercase text-center font-semibold">

//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">Student</div>
//                   </div>

//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">School</div>
//                   </div>

//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">Status</div>
//                   </div>

//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">Time</div>
//                   </div>

//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">Residence</div>
//                   </div>

//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">Pt.Contact</div>
//                   </div>
                  
//                 </div>

//                 {filteredStudents.map((student, index) => (
//                   <div key={student.id} className={`flex ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>

//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                       <div className="w-[100px] break-words text-center">{student.Child}</div>
//                     </div>

//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
//                       <div className="w-[100px] break-words text-center">{student.School}</div>
//                     </div>

//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
//                       <div className="w-[100px] border border-gray-300 rounded py-1 break-words text-center">
//                         <h1 className="text-[10px] md:text-xs font-medium">{student.Status}</h1>
//                       </div>
//                     </div>

//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
//                       <div className="w-[120px] text-center">{student.Time}</div>
//                     </div>
                    
//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
//                       <div className="w-[100px] break-words text-center">{student.Address}</div>
//                     </div>
                    
//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
//                       <div className="w-[100px] break-words text-center">{student.Contact}</div>
//                     </div>
                    
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Parents;


// import React, { useState, useEffect, useRef } from 'react';

// const Parents = ({ license, contact }) => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [matchedCar, setMatchedCar] = useState({
//     coords: {
//       lat: 28.2599333,
//       lng: 77.412615,
//     },
//   });
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [statusTimes, setStatusTimes] = useState({});
//   const host = "https://logi-8ty2.onrender.com";
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markerRef = useRef(null);

//   const fetchAllStudents = async () => {
//     try {
//       const response = await fetch(`${host}/api/student/fetchallstudents`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch students");
//       }
//       const data = await response.json();
//       setStudents(data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   const fetchCarData = async () => {
//     try {
//       const response = await fetch(`${host}/api/auth/fetchallcars`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch car data");
//       }
//       const cars = await response.json();
//       const matchedCarData = cars.find((car) => car.License === license);
//       if (matchedCarData && matchedCarData.Coords) {
//         setMatchedCar({ coords: matchedCarData.Coords });
//       } else {
//         console.error("No car found with the specified license number");
//       }
//     } catch (error) {
//       console.error("Error fetching car data:", error);
//     }
//   };

//   const initializeMap = () => {
//     if (!mapInstance.current) {
//       mapInstance.current = new window.google.maps.Map(mapRef.current, {
//         center: matchedCar.coords,
//         zoom: 17,
//       });
//       markerRef.current = new window.google.maps.Marker({
//         position: matchedCar.coords,
//         map: mapInstance.current,
//       });
//     }
//   };

//   useEffect(() => {
//     console.log("Updated coordinates:", matchedCar.coords);
//   }, [matchedCar]);

//   useEffect(() => {
//     if (mapInstance.current) {
//       mapInstance.current.panTo(matchedCar.coords);
//       markerRef.current.setPosition(matchedCar.coords);
//     }
//   }, [matchedCar.coords]);

//   useEffect(() => {
//     const filterStudents = () => {
//       const filtered = students.filter((student) => student.Contact === contact);
//       setFilteredStudents(filtered);
//     };
//     filterStudents();
//   }, [students, contact]);

//   useEffect(() => {
//     fetchAllStudents();
//     fetchCarData();
//     initializeMap();

//     const studentInterval = setInterval(fetchAllStudents, 2000);
//     const carInterval = setInterval(fetchCarData, 2000);

//     return () => {
//       clearInterval(studentInterval);
//       clearInterval(carInterval);
//     };
//   }, []);

//   const openModal = (student) => {
//     setSelectedStudent(student);

//     if (!statusTimes[student.id]) {
//       setStatusTimes((prev) => ({
//         ...prev,
//         [student.id]: {
//           atHome: null,
//           toSchool: null,
//           atSchool: null,
//           toHome: null,
//         },
//       }));
//     }
//   };

//   const closeModal = () => setSelectedStudent(null);

//   const updateStatusTime = (status) => {
//     if (selectedStudent) {
//       const currentTime = new Date().toLocaleTimeString();
//       setStatusTimes((prev) => ({
//         ...prev,
//         [selectedStudent.id]: {
//           ...prev[selectedStudent.id],
//           [status]: currentTime,
//         },
//       }));
//     }
//   };

//   return (
//     <>
//       <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//         <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
//           <div
//             className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
//             ref={mapRef}
//             style={{ height: '100%', width: '100%' }}
//           ></div>

//           <div className="list flex-grow h-[40%]">
//             <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
//               <div className="w-full text-xs md:text-sm text-gray-500">
//                 <div className="flex bg-gray-50 text-gray-700 uppercase text-center font-semibold">
//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">Student</div>
//                   </div>
//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">School</div>
//                   </div>
//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">Status</div>
//                   </div>
//                   <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                     <div className="w-[100px] break-words text-center">Time</div>
//                   </div>
//                 </div>

//                 {filteredStudents.map((student, index) => (
//                   <div key={student.id} className={`flex ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
//                       <div className="w-[100px] break-words text-center">{student.Child}</div>
//                     </div>
//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
//                       <div className="w-[100px] break-words text-center">{student.School}</div>
//                     </div>
//                     <div
//                       className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center"
//                       onClick={() => openModal(student)}
//                     >
//                       <div className="w-[100px] border border-gray-300 rounded py-1 break-words text-center cursor-pointer">
//                         <h1 className="text-[10px] md:text-xs font-medium">{student.Status}</h1>
//                       </div>
//                     </div>
//                     <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
//                       <div className="w-[120px] text-center">{student.Time}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {selectedStudent && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg w-[300px]">
//             <h2 className="text-lg font-bold mb-4">Status Times for {selectedStudent.Child}</h2>
//             <div className="space-y-2">
//               {["AtHome", "ToSchool", "AtSchool", "ToHome"].map((status) => (
//                 <div
//                   key={status}
//                   className="flex justify-between items-center"
//                   onClick={() => updateStatusTime(status)}
//                 >
//                   <span>{status}</span>
//                   <span>{statusTimes[selectedStudent.id]?.[status] || "No time recorded"}</span>
//                 </div>
//               ))}
//             </div>
//             <button
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Parents;



import React, { useState, useEffect, useRef } from 'react';

const Parents = ({ license, contact }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [matchedCar, setMatchedCar] = useState({
    coords: {
      lat: 28.2599333,
      lng: 77.412615,
    },
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const host = "https://logi-52ys.onrender.com";
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  const fetchAllStudents = async () => {
    try {
      const response = await fetch(`${host}/api/student/fetchallstudents`);
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

//   const fetchStatusHistory = async (id) => {
//     try {
//         const response = await fetch(`${host}/api/student/getStatusHistory/${id}`, {
//             method: "GET",
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log(`Status history for student ID ${id}:`, data.history);
//     } catch (error) {
//         console.error(`Failed to fetch status history for student ID ${id}:`, error.message);
//     }
// };

// const handleChildClick = async (id) => {
//   try {
//     const response = await fetchStatusHistory(id); // Fetch the history using the function
//     if (response) {
//       setModalData(response); // Update modal data state
//       setModalOpen(true);     // Open the modal
//     }
//   } catch (error) {
//     console.error("Error fetching history:", error.message);
//   }
// };


const fetchStatusHistory = async (id) => {
  try {
    const response = await fetch(`${host}/api/student/getStatusHistory/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.history; // Return the fetched history
  } catch (error) {
    console.error(`Failed to fetch status history for student ID ${id}:`, error.message);
    return []; // Return an empty array on failure
  }
};

const handleChildClick = async (id) => {
  try {
    const history = await fetchStatusHistory(id); // Fetch the history
    setModalData(history); // Update modal data state
    setModalOpen(true); // Open the modal
  } catch (error) {
    console.error("Error fetching history:", error.message);
  }
};

  const fetchCarData = async () => {
    try {
      const response = await fetch(`${host}/api/auth/fetchallcars`);
      if (!response.ok) {
        throw new Error("Failed to fetch car data");
      }
      const cars = await response.json();
      const matchedCarData = cars.find((car) => car.License === license);
      if (matchedCarData && matchedCarData.Coords) {
        setMatchedCar({ coords: matchedCarData.Coords });
      } else {
        console.error("No car found with the specified license number");
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const initializeMap = () => {
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: matchedCar.coords,
        zoom: 17,
      });
      markerRef.current = new window.google.maps.Marker({
        position: matchedCar.coords,
        map: mapInstance.current,
      });
    }
  };

  useEffect(() => {
    console.log("Updated coordinates:", matchedCar.coords);
  }, [matchedCar]);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.panTo(matchedCar.coords);
      markerRef.current.setPosition(matchedCar.coords);
    }
  }, [matchedCar.coords]);

  useEffect(() => {
    const filterStudents = () => {
      const filtered = students.filter((student) => student.Contact === contact);
      setFilteredStudents(filtered);
    };
    filterStudents();
  }, [students, contact]);

  useEffect(() => {
    fetchAllStudents();
    fetchCarData();
    initializeMap();

    const studentInterval = setInterval(fetchAllStudents, 2000);
    const carInterval = setInterval(fetchCarData, 2000);

    return () => {
      clearInterval(studentInterval);
      clearInterval(carInterval);
    };
  }, []);

  const openModal = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => setSelectedStudent(null);
  const closehistoryModal = () => setModalOpen(false);

  return (
    <>
      <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
        <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
          <div
            className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
            ref={mapRef}
            style={{ height: '100%', width: '100%' }}
          ></div>

          <div className="list flex-grow h-[40%]">
            <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
              <div className="w-full text-xs md:text-sm text-gray-500">
                <div className="flex bg-gray-50 text-gray-700 uppercase text-center font-semibold">
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">Student</div>
                  </div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">School</div>
                  </div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">Status</div>
                  </div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">Time</div>
                  </div>
                </div>

                {/* {filteredStudents.map((student, index) => (
                  <div key={student.id} className={`flex ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                      <div className="w-[100px] break-words text-center">{student.Child}</div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[100px] break-words text-center">{student.School}</div>
                    </div>
                    <div
                      className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center"
                      onClick={() => openModal(student)}
                    >
                      <div className="w-[100px] border border-gray-300 rounded py-1 break-words text-center cursor-pointer">
                        <h1 className="text-[10px] md:text-xs font-medium">{student.Status}</h1>
                      </div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[120px] text-center">{student.Time}</div>
                    </div>
                  </div>
                ))} */}
                {filteredStudents.map((student, index) => (
                  <div key={student.id} className={`flex ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                      <div className="w-[100px] break-words text-center"  onClick={() => handleChildClick(student.id)}>{student.Child}</div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[100px] break-words text-center">{student.School}</div>
                    </div>
                    <div
                      className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center"
                      onClick={() => openModal(student)}
                    >
                      <div className="w-[100px] border border-gray-300 rounded py-1 break-words text-center cursor-pointer">
                        <h1 className="text-[10px] md:text-xs font-medium">{student.Status}</h1>
                      </div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[120px] text-center">{student.Time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[300px]">
            <h2 className="text-lg font-bold mb-4">Status for {selectedStudent.Child}</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>At Home:</span>
                <span>{selectedStudent.AtHome}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>To School:</span>
                <span>{selectedStudent.ToSchool}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>At School:</span>
                <span>{selectedStudent.AtSchool}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>To Home:</span>
                <span>{selectedStudent.ToHome}</span>
              </div>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

    {/* {modalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-lg font-bold mb-4">Status History</h2>
          <div className="space-y-2">
            {modalData.map((record, index) => (
              <div key={index} className="p-2 border rounded-md">
                <p><strong>Status:</strong> {record.Status}</p>
                <p><strong>Time:</strong> {record.Time}</p>
              </div>
            ))}
          </div>
          <button
            onClick={closehistoryModal}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    )} */}

    {modalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <h2 className="text-lg font-bold mb-4">Status History</h2>
          <div className="overflow-auto max-h-96">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{record.Status}</td>
                    <td className="border border-gray-300 px-4 py-2">{record.Time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={closehistoryModal}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    )}

    </>
  );
};

export default Parents;
