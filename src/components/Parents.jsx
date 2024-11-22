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

const Parents = ({ license, contact, onLogout}) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [driverContact, setDriverContact] = useState('');
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
  const [License, setLicense] = useState(license);
  

  const filteredList = filteredStudents.filter((student) =>
    student.Child.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  

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

  // const fetchCarData = async () => {
  //   try {
  //     const response = await fetch(`${host}/api/auth/fetchallcars`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch car data");
  //     }
  //     const cars = await response.json();
  //     const matchedCarData = cars.find((car) => car.License === License);
  //     if (matchedCarData && matchedCarData.Coords) {
  //       setMatchedCar({ coords: matchedCarData.Coords });
  //     } else {
  //       console.error("No car found with the specified license number");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching car data:", error);
  //   }
  // };

  const fetchCarData = async (license) => {
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
  

  // const initializeMap = () => {
  //   if (!mapInstance.current) {
  //     mapInstance.current = new window.google.maps.Map(mapRef.current, {
  //       center: matchedCar.coords,
  //       zoom: 17,
  //     });
  //     markerRef.current = new window.google.maps.Marker({
  //       position: matchedCar.coords,
  //       map: mapInstance.current,
  //     });
  //   }
  // };

  const initializeMap = () => {
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: matchedCar.coords,
        zoom: 17,
      });
  
      const svgIcon = {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.427 512.427" xml:space="preserve">
          <g transform="translate(1 1)">
            <g>
              <path style="fill:#FFE100;" d="M35.053,221.293h-20.48c-3.413,0-6.827-3.413-6.827-6.827v-53.76c0-4.267,3.413-7.68,6.827-7.68
                H34.2c4.267,0,7.68,3.413,7.68,6.827v53.76C41.88,217.88,38.467,221.293,35.053,221.293"/>
              <path style="fill:#FFE100;" d="M475.373,221.293H495c4.267,0,6.827-3.413,6.827-6.827v-53.76c0-4.267-3.413-6.827-6.827-6.827
                h-19.627c-4.267,0-6.827,3.413-6.827,6.827v53.76C468.547,217.88,471.96,221.293,475.373,221.293"/>
              <path style="fill:#FFE100;" d="M93.08,67.693v42.667h324.267V67.693C348.227-11.667,162.2-11.667,93.08,67.693"/>
            </g>
            <path style="fill:#FFFFFF;" d="M67.48,110.36h25.6V67.693C127.213,27.587,191.213,7.96,255.213,7.96
              c-74.24,0-147.627,19.627-187.733,59.733V110.36z"/>
            <path style="fill:#FFA800;" d="M255.213,7.96c64,0,128,19.627,162.133,59.733v42.667h25.6V67.693
              C402.84,27.587,329.453,7.96,255.213,7.96"/>
            <path style="fill:#63D3FD;" d="M122.947,289.56h265.387c11.093,0,21.333,4.267,29.867,11.093V110.36H93.08v190.293
              C101.613,293.827,111.853,289.56,122.947,289.56"/>
            <path style="fill:#FFFFFF;" d="M93.08,110.36h-25.6v190.293c7.68-5.12,16.213-8.533,25.6-10.24V110.36z"/>
            <path style="fill:#3DB9F9;" d="M417.347,110.36v180.053c9.387,1.707,17.92,5.12,25.6,10.24V110.36H417.347z"/>
            <path style="fill:#FFE100;" d="M390.04,289.56H120.387c-29.013,0-52.907,26.453-52.907,59.733v51.2h375.467v-51.2
              C442.947,316.013,419.053,289.56,390.04,289.56"/>
            <path style="fill:#FFFFFF;" d="M120.387,289.56h-18.773c-33.28,0-59.733,26.453-59.733,59.733v51.2h25.6v-51.2
              C67.48,316.013,91.373,289.56,120.387,289.56"/>
            <path style="fill:#FFA800;" d="M408.813,289.56H390.04c29.013,0,52.907,26.453,52.907,59.733v51.2h25.6v-51.2
              C468.547,316.013,442.093,289.56,408.813,289.56"/>
            <g>
              <path style="fill:#63D3FD;" d="M84.547,366.36h68.267v-42.667H84.547V366.36z"/>
              <path style="fill:#63D3FD;" d="M357.613,366.36h68.267v-42.667h-68.267V366.36z"/>
            </g>
            <path style="fill:#FFE100;" d="M110.147,502.893h-8.533c-14.507,0-25.6-11.093-25.6-25.6V443.16h59.733v34.133
              C135.747,491.8,124.653,502.893,110.147,502.893"/>
            <path style="fill:#FFFFFF;" d="M76.013,477.293V443.16h-25.6v34.133c0,14.507,11.093,25.6,25.6,25.6h25.6
              C87.107,502.893,76.013,491.8,76.013,477.293"/>
            <path style="fill:#FFE100;" d="M391.747,502.893h8.533c14.507,0,25.6-11.093,25.6-25.6V443.16h-59.733v34.133
              C366.147,491.8,377.24,502.893,391.747,502.893"/>
            <path style="fill:#FFA800;" d="M425.88,477.293V443.16h25.6v34.133c0,14.507-11.093,25.6-25.6,25.6h-25.6
              C414.787,502.893,425.88,491.8,425.88,477.293"/>
            <path style="fill:#FFE100;" d="M460.013,443.16h-409.6c-9.387,0-17.067-7.68-17.067-17.067v-17.067
              c0-9.387,7.68-17.067,17.067-17.067h409.6c9.387,0,17.067,7.68,17.067,17.067v17.067C477.08,435.48,469.4,443.16,460.013,443.16"/>
            <path style="fill:#FFA800;" d="M485.613,391.96h-25.6c9.387,0,17.067,7.68,17.067,17.067v17.067c0,9.387-7.68,17.067-17.067,17.067
              h25.6c9.387,0,17.067-7.68,17.067-17.067v-17.067C502.68,399.64,495,391.96,485.613,391.96"/>
            <path style="fill:#FFFFFF;" d="M33.347,426.093v-17.067c0-9.387,7.68-17.067,17.067-17.067h-25.6
              c-9.387,0-17.067,7.68-17.067,17.067v17.067c0,9.387,7.68,17.067,17.067,17.067h25.6C41.027,443.16,33.347,435.48,33.347,426.093"
              />
            <path d="M67.48,195.693h-25.6c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h25.6
              c5.12,0,8.533,3.413,8.533,8.533C76.013,192.28,72.6,195.693,67.48,195.693z"/>
            <path d="M35.053,229.827h-20.48c-8.533,0-15.36-6.827-15.36-15.36v-53.76c0-8.533,6.827-15.36,15.36-15.36H34.2
              c8.533,0,15.36,6.827,15.36,15.36v53.76C50.413,223,43.587,229.827,35.053,229.827z M16.28,212.76h17.067v-51.2H16.28V212.76z"/>
            <path d="M468.547,195.693h-25.6c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h25.6
              c5.12,0,8.533,3.413,8.533,8.533C477.08,192.28,473.667,195.693,468.547,195.693z"/>
            <path d="M495.853,229.827h-19.627c-8.533,0-15.36-6.827-15.36-15.36v-53.76c0-8.533,6.827-15.36,15.36-15.36h19.627
              c8.533,0,15.36,6.827,15.36,15.36v53.76C511.213,223,504.387,229.827,495.853,229.827z M477.08,212.76h17.067v-51.2H477.08V212.76z
              "/>
            <path d="M110.147,511.427H76.013c-18.773,0-34.133-15.36-34.133-34.133v-42.667h102.4v42.667
              C144.28,496.067,128.92,511.427,110.147,511.427z M58.947,451.693v25.6c0,9.387,7.68,17.067,17.067,17.067h34.133
              c9.387,0,17.067-7.68,17.067-17.067v-25.6H58.947z"/>
            <path d="M425.88,511.427h-34.133c-18.773,0-34.133-15.36-34.133-34.133v-42.667h102.4v42.667
              C460.013,496.067,444.653,511.427,425.88,511.427z M374.68,451.693v25.6c0,9.387,7.68,17.067,17.067,17.067h34.133
              c9.387,0,17.067-7.68,17.067-17.067v-25.6H374.68z"/>
            <path d="M485.613,451.693h-460.8c-14.507,0-25.6-11.093-25.6-25.6v-8.533c0-14.507,11.093-25.6,25.6-25.6h460.8
              c14.507,0,25.6,11.093,25.6,25.6v8.533C511.213,440.6,500.12,451.693,485.613,451.693z M24.813,409.027
              c-5.12,0-8.533,3.413-8.533,8.533v8.533c0,5.12,3.413,8.533,8.533,8.533h460.8c5.12,0,8.533-3.413,8.533-8.533v-8.533
              c0-5.12-3.413-8.533-8.533-8.533H24.813z"/>
            <path d="M152.813,374.893H84.547c-5.12,0-8.533-3.413-8.533-8.533v-42.667c0-5.12,3.413-8.533,8.533-8.533h68.267
              c5.12,0,8.533,3.413,8.533,8.533v42.667C161.347,371.48,157.933,374.893,152.813,374.893z M93.08,357.827h51.2v-25.6h-51.2V357.827
              z"/>
            <path d="M425.88,374.893h-68.267c-5.12,0-8.533-3.413-8.533-8.533v-42.667c0-5.12,3.413-8.533,8.533-8.533h68.267
              c5.12,0,8.533,3.413,8.533,8.533v42.667C434.413,371.48,431,374.893,425.88,374.893z M366.147,357.827h51.2v-25.6h-51.2V357.827z"
              />
            <path d="M477.08,409.027H33.347v-59.733c0-37.547,30.72-68.267,68.267-68.267h307.2c37.547,0,68.267,30.72,68.267,68.267V409.027z
              M50.413,391.96h409.6v-42.667c0-28.16-23.04-51.2-51.2-51.2h-307.2c-28.16,0-51.2,23.04-51.2,51.2V391.96z"/>
            <path d="M314.947,366.36H195.48c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h119.467c5.12,0,8.533,3.413,8.533,8.533
              S320.067,366.36,314.947,366.36z"/>
            <path d="M297.88,332.227h-85.333c-5.12,0-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533h85.333
              c5.12,0,8.533,3.413,8.533,8.533C306.413,328.813,303,332.227,297.88,332.227z"/>
            <path d="M297.88,67.693h-85.333c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h85.333c5.12,0,8.533,3.413,8.533,8.533
              S303,67.693,297.88,67.693z"/>
            <path d="M442.947,118.893H67.48c-5.12,0-8.533-3.413-8.533-8.533V67.693c0-2.56,0.853-4.267,2.56-5.973
              c83.627-83.627,304.64-83.627,387.413,0c1.707,1.707,2.56,3.413,2.56,5.973v42.667C451.48,115.48,448.067,118.893,442.947,118.893z
              M76.013,101.827h358.4v-30.72c-77.653-73.387-280.747-73.387-358.4,0V101.827z"/>
            <path d="M442.947,309.187c-1.707,0-3.413-0.853-5.12-1.707c-8.533-5.973-18.773-9.387-29.013-9.387h-307.2
              c-10.24,0-20.48,3.413-29.013,9.387c-2.56,1.707-5.973,1.707-8.533,0.853c-2.56-0.853-5.12-5.12-5.12-7.68V110.36
              c0-5.12,3.413-8.533,8.533-8.533h375.467c5.12,0,8.533,3.413,8.533,8.533v190.293c0,3.413-1.707,5.973-4.267,7.68
              C445.507,308.333,444.653,309.187,442.947,309.187z M101.613,281.027h307.2c8.533,0,17.92,1.707,25.6,5.12V118.893h-358.4v167.253
              C83.693,282.733,93.08,281.027,101.613,281.027z"/>
            <rect x="246.68" y="111.213" width="17.067" height="178.347"/>
            <path d="M118.68,298.093c-1.707,0-3.413-0.853-5.12-1.707c-3.413-2.56-4.267-8.533-1.707-11.947l76.8-102.4
              c2.56-3.413,8.533-4.267,11.947-1.707c3.413,2.56,4.267,8.533,1.707,11.947l-76.8,102.4
              C123.8,297.24,121.24,298.093,118.68,298.093z"/>
            <path d="M152.813,246.893c-5.12,0-8.533-3.413-8.533-8.533v-34.133c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533
              v34.133C161.347,243.48,157.933,246.893,152.813,246.893z"/>
            <path d="M306.413,298.093c-1.707,0-3.413-0.853-5.12-1.707c-3.413-2.56-4.267-8.533-1.707-11.947l76.8-102.4
              c2.56-3.413,8.533-4.267,11.947-1.707s4.267,8.533,1.707,11.947l-76.8,102.4C311.533,297.24,308.973,298.093,306.413,298.093z"/>
            <path d="M340.547,246.893c-5.12,0-8.533-3.413-8.533-8.533v-34.133c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533
              v34.133C349.08,243.48,345.667,246.893,340.547,246.893z"/>
          </g>
        </svg>`),
        scaledSize: new window.google.maps.Size(35, 35), // Adjust size as needed
      };
  
      markerRef.current = new window.google.maps.Marker({
        position: matchedCar.coords,
        map: mapInstance.current,
        icon: svgIcon, // Use the custom SVG icon
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

  // useEffect(() => {
  //   fetchAllStudents();
  //   fetchCarData(License);
  //   initializeMap();

  //   const studentInterval = setInterval(fetchAllStudents, 2000);
  //   const carInterval = setInterval(fetchCarData(License), 2000);

  //   return () => {
  //     clearInterval(studentInterval);
  //     clearInterval(carInterval);
  //   };
  // }, []);

  useEffect(() => {
    fetchAllStudents();
    fetchCarData(License); // Initial fetch with the correct license
    initializeMap();
  
    const studentInterval = setInterval(() => {
      fetchAllStudents();
    }, 2000);
  
    const carInterval = setInterval(() => {
      if (License) {
        fetchCarData(License).catch((err) => console.error("Error fetching car data:", err));
      } else {
        console.error("License is not set, skipping fetchCarData");
      }
    }, 2000);
  
    return () => {
      clearInterval(studentInterval);
      clearInterval(carInterval);
    };
  }, [License]); // Re-run when License changes
  

  
  
  const openModal = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => setSelectedStudent(null);
  const closehistoryModal = () => setModalOpen(false);


  useEffect(() => {
    const fetchCarDataByLicense = (licenseNumber) => {
      const url = `${host}/api/auth/${licenseNumber}`; // Replace `host` with your actual API URL

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {  // Check if the response contains at least one car
            const driverCont = data[0].driverCont; // Access the driverCont from the first object in the array
            setDriverContact(driverCont); // Save the driverCont in the state
          } else {
            console.log("No car data found for this license.");
          }
        })
        .catch((error) => {
          console.error("Error fetching car data:", error.message);
        });
    };

    // Call the fetch function on page load
    fetchCarDataByLicense(license);
  }, [license]); // Dependency array to call the function when the license number changes


//   const getCarDetails = async (license) => {
//     try {
//         // Fetch coordinates by license
//         const response = await fetch(`${host}/api/auth/getcoordslicense/${license}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const { Coords } = await response.json(); // Destructure the Coords from the response
//         console.log("Car Coordinates:", Coords); // Log the coordinates

//         // Ensure Coords has the correct format
//         if (Coords && typeof Coords.lat === 'number' && typeof Coords.lng === 'number') {
//             // Update map coordinates with the clicked car's coordinates
//              setMatchedCar(Coords);
//              setSelectedStudentLicense(license); // Set the selected car's license
//             console.log(Coords)
//         } else {
//             // Show a custom alert for unavailable coordinates
//             showAlert("Coordinates are not available for this car. Please Login at driver page with this license to get coords");
//             setSelectedStudentLicense(null); // Reset selected car license if no coordinates
//         }
//     } catch (error) {
//         console.error("Error fetching car coordinates:", error.message);
//         showAlert("An error occurred while fetching car coordinates.");
//     }
// };

// useEffect(() => {
//   let intervalId;

//   const fetchCoordinates = async () => {
//       if (selectedStudentLicense) {
//           try {
//               const response = await fetch(`${host}/api/auth/getcoordslicense/${selectedStudentLicense}`, {
//                   method: "GET",
//                   headers: {
//                       "Content-Type": "application/json",
//                   },
//               });

//               if (!response.ok) {
//                   throw new Error(`HTTP error! status: ${response.status}`);
//               }

//               const { Coords } = await response.json(); // Destructure the Coords from the response
//               if (Coords && typeof Coords.lat === 'number' && typeof Coords.lng === 'number') {
//                   // Update map coordinates with the fetched coordinates
//                   setMatchedCar(Coords);
//               } else {
//                   // If no coordinates are available, clear the interval and reset selected license
//                   clearInterval(intervalId);
//                   setSelectedStudentLicense(null);
//               }
//           } catch (error) {
//               console.error("Error fetching car coordinates:", error.message);
//           }
//       }
//   };

//   if (selectedStudentLicense) {
//       fetchCoordinates(); // Initial fetch for the selected car's coordinates
//       intervalId = setInterval(fetchCoordinates, 2000); // Set interval for every 2 seconds
//   }

//   return () => {
//       clearInterval(intervalId); // Cleanup interval on component unmount or license change
//   };
// }, [selectedStudentLicense]); // Depend on selectedCarLicense



// const getCarDetails = async (license) => {
//   try {
//     // Make an API call to fetch coordinates using fetch
//     const response = await fetch(`${host}/api/auth/getcoordslicense/${license}`, {
//       method: 'GET',  // Explicitly defining the method as GET (optional since GET is default)
//       headers: {
//         'Content-Type': 'application/json',  // Specify the content type if necessary
//       },
//     });

//     // Check if the response is OK (status code 200)
//     if (!response.ok) {
//       throw new Error('Car not found or there was an error with the request');
//     }

//     const data = await response.json();  // Parse JSON from the response

//     if (data && data.Coords) {
//       // setMatchedCar(data.Coords); // Update the state with the coordinates
//       setMatchedCar({ coords: data.Coords });
//       setLicense(license)
//       console.log('Car Coordinates:', data.Coords); // Log for debugging
//     } else {
//       alert('No coordinates found for this car.');
//     }
//   } catch (error) {
//     console.error('Error fetching car details:', error.message);
//     alert('An error occurred while fetching car details.');
//   }
// };




const updateLicense = (license) => {
  setLicense(license);
};

  
  

  return (
    <>
      <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
        <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
          <div
            className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
            ref={mapRef}
            style={{ height: '100%', width: '100%' }}
          ></div>

          <div className="lgot h-[40px] p-2 md:p-4 flex items-center justify-end">
          <div className='w-1/2 flex items-center justify-start'>
              <h1 className='mr-[6px] font-semibold'>Driver Contact:</h1>
              <h1 className=' font-semibold'>{driverContact}</h1>
            </div>
            <div className='w-1/2 flex items-center justify-end'>
              <button onClick={onLogout} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center ">Log Out</button>
            </div>
            
          </div>

          <div className="list flex-grow h-[40%]">
            <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
              
              {/* <div className="w-full text-xs md:text-sm text-gray-500">
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
              </div> */}

              <div className="w-full text-xs md:text-sm text-gray-500">
                {/* Search Bar */}
                <div className="">
                  <input
                    type="text"
                    placeholder="Search by student name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border rounded-md w-full md:w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Table Header */}
                <div className="flex bg-gray-50 text-gray-700 uppercase text-center font-semibold">
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">Student</div>
                  </div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">School</div>
                  </div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">Track</div>
                  </div>
                  
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">Status</div>
                  </div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                    <div className="w-[100px] break-words text-center">Time</div>
                  </div>
                </div>

                {/* Table Rows */}
                {filteredList.map((student, index) => (
                  <div key={student.id} className={`flex ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                      <div className="w-[100px] break-words text-center" onClick={() => handleChildClick(student.id)}>
                        {student.Child}
                      </div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[100px] break-words text-center">{student.School}</div>
                    </div>
                    <div className="track w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center" >
                      <div className="w-[100px] border border-gray-300 rounded py-1 break-words text-center cursor-pointer" onClick={() => updateLicense(student.License)}>
                        <h1 className="text-[10px] md:text-xs font-medium">Track</h1>
                      </div>
                    </div>
                    
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center" onClick={() => openModal(student)}>
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
