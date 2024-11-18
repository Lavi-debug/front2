//THIS CODE TAKES CURRENT LOCATION EVERY 2 SECONDS

// import React, { useState, useEffect, useRef } from 'react';

// const Driver = ({ license }) => {
//   const host = "http://localhost:5000";
//   const [students, setStudents] = useState([]);
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null); // Store the map instance here
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


// const updateStudentStatus = async (studentId, newStatus) => {
//   try {
//       // Format the current date as "Date, Month, Time"
//       const now = new Date();
//       const options = {
//           day: 'numeric',
//           month: 'long',
//           hour: 'numeric',
//           minute: 'numeric',
//           hour12: true,
//       };
//       const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now); // e.g., "30 October, 10:30 AM"
      
//       // Log the details before making the request
//       console.log("Triggering updateStudentStatus function");
//       console.log("Student ID:", studentId);
//       console.log("New Status:", newStatus);
//       console.log("Formatted Time:", formattedTime);

//       const response = await fetch(`${host}/api/student/updatestatus/${studentId}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ Status: newStatus, Time: formattedTime }), // Include the formatted time in the request
//       });

//       // Check if response is successful
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);

//       console.log("Status update sent successfully to the endpoint");

//       // Update the local state with the new status and time
//       setStudents((prev) =>
//           prev.map((student) =>
//               student.id === studentId ? { ...student, Status: newStatus, Time: formattedTime } : student
//           )
//       );

//       console.log("Local state updated with new status and time");

//   } catch (error) {
//       console.error("Error updating student status:", error.message);
//   }
// };


// const updateModal = async (studentId, status) => {
//   try {
//       const now = new Date();
//       const options = {
//         day: 'numeric',
//         month: 'long',
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//     }; // Capture the exact time when the function is called
//       const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
//       const response = await fetch(`http://localhost:5000/api/student/updateStudentStatus/${studentId}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//               Status: status,
//               Time: formattedTime // Send the captured current time
//           })
//       });

//       const data = await response.json();

//       if (response.ok) {
//           console.log(`Student status updated successfully: ${data.message}`);
//           // You can update your UI here if needed
//       } else {
//           console.error(`Error: ${data.error}`);
//       }
//   } catch (error) {
//       console.error("Error updating student status:", error);
//   }
// };





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
//       mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 37.7749, lng: -122.4194 },
//         zoom: 17,
//       });
//       const newMarker = new window.google.maps.Marker({
//         position: mapInstanceRef.current.getCenter(),
//         map: mapInstanceRef.current
//       });
//       setMarker(newMarker);
//       getCurrentLocation(); // Uncomment to get current location
//       // mimicMovement(); // Comment/uncomment to switch between movement functions
//     }
//   }, [isMapReady]);


//   //vurrent location
//   const getCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             const coords = { lat: latitude, lng: longitude };
//             console.log("Current Location:", coords); // Log current location
//             setCurrentLocation(coords); // Update current location
//             if (marker) {
//                 marker.setPosition(coords); // Move the marker to the current location
//                 mapInstanceRef.current.setCenter(coords); // Center the map on the current location
//                 updateCarCoords(coords); // Update coordinates in the database
//             }
//         },
//         (error) => {
//             console.error("Error getting current location:", error.message);
//         }
//     );
// };


// //generate random coords
//   const getRandomLocation = () => {
//     const lat = 37.7749 + (Math.random() - 0.5) * 0.01;
//     const lng = -122.4194 + (Math.random() - 0.5) * 0.01;
//     return { lat, lng };
//   };


//   //,imic movement
//   const mimicMovement = () => {
//     const randomLoc = getRandomLocation();
//     setCurrentLocation(randomLoc);
//     if (marker) {
//       marker.setPosition(randomLoc);
//       mapInstanceRef.current.setCenter(randomLoc);
//       updateCarCoords(randomLoc);
//     }
//   };

//   useEffect(() => {
//     if (currentLocation && marker) marker.setPosition(currentLocation);
//   }, [currentLocation, marker]);

//   useEffect(() => {
//     fetchStudents();
//   }, [license]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       getCurrentLocation(); // Uncomment to use actual location
//       // mimicMovement(); // Comment/uncomment to switch between movement functions
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [marker]);

//   const handleStatusChange = (studentId, event) => {
//     const newStatus = event.target.value;
//     updateStudentStatus(studentId, newStatus);
//     updateModal(studentId, newStatus);
//   };

//   return (
   
//     <>
//  <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//     <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
//       <div className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg" ref={mapRef}></div>

//       <div className="qrcont h-[40px] p-[10px]">
//         <div className='flex gap-2'>
//           <div className="qrcd w-[20px] h-[20px] bg-blue-400"></div>
//           <div><h1>QR</h1></div>
//         </div>
//       </div>
      
//       <div className="list flex-grow h-[40%] w-full">
//         <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
//           {students.length === 0 ? (
//             <div className="text-center p-4 text-red-600 font-semibold">
//               No students assigned to this bus.
//             </div>
//           ) : (
//             <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500">
//               <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Student</th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">School</th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Residence</th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Pt.Contact</th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student) => (
//                   <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Child}</div></td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.School}</div></td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Address}</div></td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Contact}</div></td>
//                     <td className="px-3 md:pl-6 pr-[40px] py-2 md:py-4">
//                       <select
//                         className="border rounded-md w-[100px] md:w-32 h-8 md:h-9 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm"
//                         onChange={(e) => handleStatusChange(student.id, e)}
//                         value={student.Status}
//                       >
//                         <option value="ToSchool">To School</option>
//                         <option value="AtSchool">At School</option>
//                         <option value="ToHome">To Home</option>
//                         <option value="AtHome">At Home</option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </>
//   );
// };

// export default Driver;














// import React, { useState, useEffect, useRef } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// const Driver = ({ license, onLogout }) => {
//   const host = "http://localhost:5000";
//   const [students, setStudents] = useState([]);
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const [isMapReady, setIsMapReady] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [marker, setMarker] = useState(null);
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const [modalOpen, setModalOpen] = React.useState(false);
//   const [modalData, setModalData] = React.useState([]);
//   const scannerRef = useRef(null);


//   const fetchStudents = async () => {
//     try {
//       const response = await fetch(`${host}/api/student/${license}`);
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
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

//   const updateModal = async (studentId, status) => {
//     try {
//         const now = new Date();
//         const options = {
//           day: 'numeric',
//           month: 'long',
//           hour: 'numeric',
//           minute: 'numeric',
//           hour12: true,
//       }; // Capture the exact time when the function is called
//         const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
//         const response = await fetch(`http://localhost:5000/api/student/updateStudentStatus/${studentId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 Status: status,
//                 Time: formattedTime // Send the captured current time
//             })
//         });
  
//         const data = await response.json();
  
//         if (response.ok) {
//             console.log(`Student status updated successfully: ${data.message}`);
//             // You can update your UI here if needed
//         } else {
//             console.error(`Error: ${data.error}`);
//         }
//     } catch (error) {
//         console.error("Error updating student status:", error);
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
//       mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 37.7749, lng: -122.4194 },
//         zoom: 17,
//       });
//       const newMarker = new window.google.maps.Marker({
//         position: mapInstanceRef.current.getCenter(),
//         map: mapInstanceRef.current
//       });
//       setMarker(newMarker);
//       getCurrentLocation(); // Uncomment to get current location
//       // mimicMovement(); // Comment/uncomment to switch between movement functions
//     }
//   }, [isMapReady]);


// //vurrent location
//   const getCurrentLocation = () => {
//   navigator.geolocation.getCurrentPosition(
//       (position) => {
//           const { latitude, longitude } = position.coords;
//           const coords = { lat: latitude, lng: longitude };
//           // console.log("Current Location:", coords); // Log current location
//           setCurrentLocation(coords); // Update current location
//           if (marker) {
//               marker.setPosition(coords); // Move the marker to the current location
//               mapInstanceRef.current.setCenter(coords); // Center the map on the current location
//               updateCarCoords(coords); // Update coordinates in the database
//           }
//       },
//       (error) => {
//           console.error("Error getting current location:", error.message);
//       }
//   );
//   };


// //generate random coords
//   const getRandomLocation = () => {
//     const lat = 37.7749 + (Math.random() - 0.5) * 0.01;
//     const lng = -122.4194 + (Math.random() - 0.5) * 0.01;
//     return { lat, lng };
//   };


// //,imic movement
//   const mimicMovement = () => {
//     const randomLoc = getRandomLocation();
//     setCurrentLocation(randomLoc);
//     if (marker) {
//       marker.setPosition(randomLoc);
//       mapInstanceRef.current.setCenter(randomLoc);
//       updateCarCoords(randomLoc);
//     }
//   };

//   useEffect(() => {
//     if (currentLocation && marker) marker.setPosition(currentLocation);
//   }, [currentLocation, marker]);

//   useEffect(() => {
//   fetchStudents();
//   }, [license]);

//   useEffect(() => {
//   const interval = setInterval(() => {
//     getCurrentLocation(); // Uncomment to use actual location
//     // mimicMovement(); // Comment/uncomment to switch between movement functions
//   }, 2000);

//   return () => clearInterval(interval);
//   }, [marker]);

//   const handleStatusChange = (studentId, event) => {
//   const newStatus = event.target.value;
//   updateStudentStatus(studentId, newStatus);
//   updateModal(studentId, newStatus);
//   addHistory(studentId, newStatus);
//   };
//   const qrStatusUpdate = (studentId, status) => {
//   updateStudentStatus(studentId, status);
//   updateModal(studentId, status);
//   addHistory(studentId, status);
//   };

//   const updateStudentStatus = async (studentId, newStatus) => {
//     try {
//       const now = new Date();
//       const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
//       const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
      
//       const response = await fetch(`${host}/api/student/updatestatus/${studentId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ Status: newStatus, Time: formattedTime }),
//       });
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
//       setStudents((prev) =>
//         prev.map((student) =>
//           student.id === studentId ? { ...student, Status: newStatus, Time: formattedTime } : student
//         )
//       );
//     } catch (error) {
//       console.error("Error updating student status:", error.message);
//     }
//   };


//   const addHistory = async (studentId, newStatus) => {
//     try {
//       const now = new Date();
      
//       // Format the time for display (e.g., "November 15, 2024 2:30 PM")
//       const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
//       const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
      
//       // Get the standard format for database storage (e.g., "2024-11-15 14:30:00")
//       const standardTime = now.toISOString().slice(0, 19).replace('T', ' '); // Remove the milliseconds part and replace 'T' with space
  
//       const response = await fetch(`${host}/api/student/addStatusHistory/${studentId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ Status: newStatus, Time: formattedTime, Current: standardTime }),
//       });
      
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
//     } catch (error) {
//       console.error("Error adding student history:", error.message);
//     }
//   };
  

//   const handleQRClick = () => setIsScannerOpen(true);

//   const handleScanSuccess = (decodedText) => {
//     try {
//       // console.log(decodedText, "this is qr data")
//       const { studentId, status } = JSON.parse(decodedText); 
//       const parsedData = JSON.parse(decodedText); 
//       console.log(parsedData)
//       // console.log(studentId, status, "this is data being sent to function")
//       // updateStudentStatus(studentId, status);
//       qrStatusUpdate(parsedData.studentId, parsedData.status);
//       setIsScannerOpen(false);
//     } catch (error) {
//       console.error("Error parsing QR data:", error);
//     }
//   };

//   const handleScanFailure = (error) => console.warn("QR scanning failed:", error);

//   useEffect(() => {
//     if (isScannerOpen) {
//       const html5QrcodeScanner = new Html5QrcodeScanner('reader', { 
//         qrbox: {
//             width: 250,
//             height: 250,
//         },  
//         fps: 20,
//     });


//     html5QrcodeScanner.render(handleScanSuccess, handleScanFailure);

//       return () => html5QrcodeScanner.clear(); // Clean up scanner on unmount or close
//     }
//   }, [isScannerOpen]);

//   const fetchStatusHistory = async (id) => {
//     try {
//       const response = await fetch(`${host}/api/student/getStatusHistory/${id}`, {
//         method: "GET",
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       return data.history; // Return the fetched history
//     } catch (error) {
//       console.error(`Failed to fetch status history for student ID ${id}:`, error.message);
//       return []; // Return an empty array on failure
//     }
//   };
  
//   const handleChildClick = async (id) => {
//     try {
//       const history = await fetchStatusHistory(id); // Fetch the history
//       setModalData(history); // Update modal data state
//       setModalOpen(true); // Open the modal
//     } catch (error) {
//       console.error("Error fetching history:", error.message);
//     }
//   };
//   const closehistoryModal = () => setModalOpen(false);

//   return (
//     <>
//   <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//     <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
//       <div
//         className="map w-full h-[50vh] md:h-[60%] lg:h-[70%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
//         ref={mapRef}
//       ></div>

//       <div className="qrcont h-[40px] p-2 md:p-4 flex items-center">
//         <div className="flex gap-2 items-center w-1/2">
//           <div className="qrcd w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10  cursor-pointer rounded" onClick={handleQRClick}>
//           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M80-680v-200h200v80H160v120H80Zm0 600v-200h80v120h120v80H80Zm600 0v-80h120v-120h80v200H680Zm120-600v-120H680v-80h200v200h-80ZM700-260h60v60h-60v-60Zm0-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm120-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm240-320v240H520v-240h240ZM440-440v240H200v-240h240Zm0-320v240H200v-240h240Zm-60 500v-120H260v120h120Zm0-320v-120H260v120h120Zm320 0v-120H580v120h120Z"/></svg>
//           </div>
//         </div>
//         <div className='w-1/2 flex items-center justify-end'>
//           <button onClick={onLogout} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center ">Log Out</button>
//         </div>
//       </div>

//       <div className="list flex-grow h-[30vh] md:h-[35%] lg:h-[40%] w-full">
//         <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
//           {students.length === 0 ? (
//             <div className="text-center p-4 text-red-600 font-semibold">
//               No students assigned to this bus.
//             </div>
//           ) : (
//             <table className="w-full text-xs md:text-sm lg:text-base text-left rtl:text-right text-gray-500">
//               <thead className="text-xs md:text-sm lg:text-base text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
//                     Student
//                   </th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
//                     School
//                   </th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
//                     Residence
//                   </th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
//                     Pt. Contact
//                   </th>
//                   <th scope="col" className="px-3 md:pl-6 pr-[20px] md:pr-[40px] py-2 md:py-3 lg:py-4 sticky top-0 bg-gray-50">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student) => (
//                   <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base" onClick={() => handleChildClick(student.id)}>
//                       {student.Child}
//                     </td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
//                       {student.School}
//                     </td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
//                       {student.Address}
//                     </td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
//                       {student.Contact}
//                     </td>
//                     <td className="px-3 md:pl-6 pr-[20px] md:pr-[40px] py-2 md:py-4">
//                       <select
//                         className="border rounded-md w-[80px] md:w-[100px] lg:w-[120px] h-8 md:h-9 lg:h-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm lg:text-base"
//                         onChange={(e) => handleStatusChange(student.id, e)}
//                         value={student.Status}
//                       >
//                         <option value="ToSchool">To School</option>
//                         <option value="AtSchool">At School</option>
//                         <option value="ToHome">To Home</option>
//                         <option value="AtHome">At Home</option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>

//   {isScannerOpen && (
//     <div className="absolute top-10 w-full md:w-[80%] lg:w-[600px] md:h-[300px] lg:h-[540px] flex justify-center">
//       <div className="modal bg-white p-4 rounded-md shadow-lg w-full">
//         <div id="reader" className="w-full"></div>
//         <button
//           onClick={() => setIsScannerOpen(false)}
//           className="mt-4 p-2 w-full md:w-auto bg-red-500 text-white rounded"
//         >
//           Close Scanner
//         </button>
//       </div>
//     </div>
//   )}


// {modalOpen && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
//           <h2 className="text-lg font-bold mb-4">Status History</h2>
//           <div className="overflow-auto max-h-96">
//             <table className="w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
//                   <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {modalData.map((record, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="border border-gray-300 px-4 py-2">{record.Status}</td>
//                     <td className="border border-gray-300 px-4 py-2">{record.Time}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <button
//             onClick={closehistoryModal}
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     )}
// </>

//   );
// };

// export default Driver;




// import React, { useState, useEffect, useRef } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";

// const Driver = ({ license, onLogout }) => {
//   const host = "http://localhost:5000";
//   const [students, setStudents] = useState([]);
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const [isMapReady, setIsMapReady] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [marker, setMarker] = useState(null);
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState([]);
//   const watchIdRef = useRef(null);

//   const fetchStudents = async () => {
//     try {
//       const response = await fetch(`${host}/api/student/${license}`);
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
//       const data = await response.json();
//       setStudents(data);
//     } catch (error) {
//       console.error("Error fetching students:", error.message);
//     }
//   };

//   const updateCarCoords = async (coords) => {
//     try {
//       const response = await fetch(`${host}/api/auth/updatecoords/${license}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ Coords: coords }),
//       });
//       if (!response.ok) throw new Error(`Server error: ${response.status}`);
//     } catch (error) {
//       console.error("Error updating car coordinates:", error.message);
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
//       mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 37.7749, lng: -122.4194 },
//         zoom: 17,
//       });
//       const newMarker = new window.google.maps.Marker({
//         position: mapInstanceRef.current.getCenter(),
//         map: mapInstanceRef.current,
//       });
//       setMarker(newMarker);
//     }
//   }, [isMapReady]);

//   const startWatchingLocation = () => {
//     if (navigator.geolocation) {
//       watchIdRef.current = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const coords = { lat: latitude, lng: longitude };
//           setCurrentLocation(coords);
//           if (marker) {
//             marker.setPosition(coords);
//             mapInstanceRef.current.setCenter(coords);
//             updateCarCoords(coords);
//           }
//         },
//         (error) => {
//           console.error("Error watching location:", error.message);
//         },
//         {
//           enableHighAccuracy: true,
//           maximumAge: 0,
//           timeout: 5000,
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const stopWatchingLocation = () => {
//     if (watchIdRef.current !== null) {
//       navigator.geolocation.clearWatch(watchIdRef.current);
//       watchIdRef.current = null;
//     }
//   };

//   useEffect(() => {
//     startWatchingLocation();
//     return () => stopWatchingLocation();
//   }, [marker]);

//   useEffect(() => {
//     fetchStudents();
//   }, [license]);

//   const handleQRClick = () => setIsScannerOpen(true);

//   const handleScanSuccess = (decodedText) => {
//     try {
//       const parsedData = JSON.parse(decodedText);
//       const { studentId, status } = parsedData;
//       updateStudentStatus(studentId, status);
//       addHistory(studentId, status);
//       setIsScannerOpen(false);
//     } catch (error) {
//       console.error("Error parsing QR data:", error);
//     }
//   };

//   const handleScanFailure = (error) => console.warn("QR scanning failed:", error);

//   useEffect(() => {
//     if (isScannerOpen) {
//       const html5QrcodeScanner = new Html5QrcodeScanner("reader", {
//         qrbox: {
//           width: 250,
//           height: 250,
//         },
//         fps: 20,
//       });

//       html5QrcodeScanner.render(handleScanSuccess, handleScanFailure);

//       return () => html5QrcodeScanner.clear(); // Clean up scanner on unmount or close
//     }
//   }, [isScannerOpen]);

//   const fetchStatusHistory = async (id) => {
//     try {
//       const response = await fetch(`${host}/api/student/getStatusHistory/${id}`);
//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();
//       return data.history;
//     } catch (error) {
//       console.error(`Failed to fetch status history for student ID ${id}:`, error.message);
//       return [];
//     }
//   };

//   const handleChildClick = async (id) => {
//     try {
//       const history = await fetchStatusHistory(id);
//       setModalData(history);
//       setModalOpen(true);
//     } catch (error) {
//       console.error("Error fetching history:", error.message);
//     }
//   };

//   const closeHistoryModal = () => setModalOpen(false);

//   const handleStatusChange = (studentId, event) => {
//     const newStatus = event.target.value;
//     updateStudentStatus(studentId, newStatus);
//     updateModal(studentId, newStatus);
//     addHistory(studentId, newStatus);
//     };
//     const qrStatusUpdate = (studentId, status) => {
//     updateStudentStatus(studentId, status);
//     updateModal(studentId, status);
//     addHistory(studentId, status);
//     };
  
//     const updateStudentStatus = async (studentId, newStatus) => {
//       try {
//         const now = new Date();
//         const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
//         const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
        
//         const response = await fetch(`${host}/api/student/updatestatus/${studentId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ Status: newStatus, Time: formattedTime }),
//         });
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
        
//         setStudents((prev) =>
//           prev.map((student) =>
//             student.id === studentId ? { ...student, Status: newStatus, Time: formattedTime } : student
//           )
//         );
//       } catch (error) {
//         console.error("Error updating student status:", error.message);
//       }
//     };

//   return (
//     <>
//   <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//     <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
//       <div
//         className="map w-full h-[50vh] md:h-[60%] lg:h-[70%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
//         ref={mapRef}
//       ></div>

//       <div className="qrcont h-[40px] p-2 md:p-4 flex items-center">
//         <div className="flex gap-2 items-center w-1/2">
//           <div className="qrcd w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10  cursor-pointer rounded" onClick={handleQRClick}>
//           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M80-680v-200h200v80H160v120H80Zm0 600v-200h80v120h120v80H80Zm600 0v-80h120v-120h80v200H680Zm120-600v-120H680v-80h200v200h-80ZM700-260h60v60h-60v-60Zm0-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm120-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm240-320v240H520v-240h240ZM440-440v240H200v-240h240Zm0-320v240H200v-240h240Zm-60 500v-120H260v120h120Zm0-320v-120H260v120h120Zm320 0v-120H580v120h120Z"/></svg>
//           </div>
//         </div>
//         <div className='w-1/2 flex items-center justify-end'>
//           <button onClick={onLogout} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center ">Log Out</button>
//         </div>
//       </div>

//       <div className="list flex-grow h-[30vh] md:h-[35%] lg:h-[40%] w-full">
//         <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
//           {students.length === 0 ? (
//             <div className="text-center p-4 text-red-600 font-semibold">
//               No students assigned to this bus.
//             </div>
//           ) : (
//             <table className="w-full text-xs md:text-sm lg:text-base text-left rtl:text-right text-gray-500">
//               <thead className="text-xs md:text-sm lg:text-base text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
//                     Student
//                   </th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
//                     School
//                   </th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
//                     Residence
//                   </th>
//                   <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
//                     Pt. Contact
//                   </th>
//                   <th scope="col" className="px-3 md:pl-6 pr-[20px] md:pr-[40px] py-2 md:py-3 lg:py-4 sticky top-0 bg-gray-50">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student) => (
//                   <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base" onClick={() => handleChildClick(student.id)}>
//                       {student.Child}
//                     </td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
//                       {student.School}
//                     </td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
//                       {student.Address}
//                     </td>
//                     <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
//                       {student.Contact}
//                     </td>
//                     <td className="px-3 md:pl-6 pr-[20px] md:pr-[40px] py-2 md:py-4">
//                       <select
//                         className="border rounded-md w-[80px] md:w-[100px] lg:w-[120px] h-8 md:h-9 lg:h-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm lg:text-base"
//                         onChange={(e) => handleStatusChange(student.id, e)}
//                         value={student.Status}
//                       >
//                         <option value="ToSchool">To School</option>
//                         <option value="AtSchool">At School</option>
//                         <option value="ToHome">To Home</option>
//                         <option value="AtHome">At Home</option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>

//   {isScannerOpen && (
//     <div className="absolute top-10 w-full md:w-[80%] lg:w-[600px] md:h-[300px] lg:h-[540px] flex justify-center">
//       <div className="modal bg-white p-4 rounded-md shadow-lg w-full">
//         <div id="reader" className="w-full"></div>
//         <button
//           onClick={() => setIsScannerOpen(false)}
//           className="mt-4 p-2 w-full md:w-auto bg-red-500 text-white rounded"
//         >
//           Close Scanner
//         </button>
//       </div>
//     </div>
//   )}


// {modalOpen && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
//           <h2 className="text-lg font-bold mb-4">Status History</h2>
//           <div className="overflow-auto max-h-96">
//             <table className="w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
//                   <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {modalData.map((record, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="border border-gray-300 px-4 py-2">{record.Status}</td>
//                     <td className="border border-gray-300 px-4 py-2">{record.Time}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <button
//             onClick={closehistoryModal}
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     )}
// </>

//   );
// };

// export default Driver;



import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Driver = ({ license, onLogout }) => {
  const host = "https://logi-52ys.onrender.com";
  const [students, setStudents] = useState([]);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);
  const watchIdRef = useRef(null);
  const scannerRef = useRef(null);


  const fetchStudents = async () => {
    try {
      const response = await fetch(`${host}/api/student/${license}`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
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

  const updateModal = async (studentId, status) => {
    try {
        const now = new Date();
        const options = {
          day: 'numeric',
          month: 'long',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
      }; // Capture the exact time when the function is called
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
        const response = await fetch(`http://localhost:5000/api/student/updateStudentStatus/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Status: status,
                Time: formattedTime // Send the captured current time
            })
        });
  
        const data = await response.json();
  
        if (response.ok) {
            console.log(`Student status updated successfully: ${data.message}`);
            // You can update your UI here if needed
        } else {
            console.error(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error("Error updating student status:", error);
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
      // getCurrentLocation(); // Uncomment to get current location
      // mimicMovement(); // Comment/uncomment to switch between movement functions
    }
  }, [isMapReady]);


//current location

//   const getCurrentLocation = () => {
//   navigator.geolocation.getCurrentPosition(
//       (position) => {
//           const { latitude, longitude } = position.coords;
//           const coords = { lat: latitude, lng: longitude };
//           // console.log("Current Location:", coords); // Log current location
//           setCurrentLocation(coords); // Update current location
//           if (marker) {
//               marker.setPosition(coords); // Move the marker to the current location
//               mapInstanceRef.current.setCenter(coords); // Center the map on the current location
//               updateCarCoords(coords); // Update coordinates in the database
//           }
//       },
//       (error) => {
//           console.error("Error getting current location:", error.message);
//       }
//   );
//   };

const startWatchingLocation = () => {
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = { lat: latitude, lng: longitude };
          setCurrentLocation(coords);
          if (marker) {
            marker.setPosition(coords);
            mapInstanceRef.current.setCenter(coords);
            updateCarCoords(coords);
          }
        },
        (error) => {
          console.error("Error watching location:", error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

const stopWatchingLocation = () => {
if (watchIdRef.current !== null) {
    navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
}
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

//   useEffect(() => {
//     if (currentLocation && marker) marker.setPosition(currentLocation);
//   }, [currentLocation, marker]);

useEffect(() => {
    startWatchingLocation();
    return () => stopWatchingLocation();
  }, [marker]);


  useEffect(() => {
  fetchStudents();
  }, [license]);

  // useEffect(() => {
  // const interval = setInterval(() => {
  //   getCurrentLocation(); // Uncomment to use actual location
  //   // mimicMovement(); // Comment/uncomment to switch between movement functions
  // }, 2000);

  // return () => clearInterval(interval);
  // }, [marker]);

  const handleStatusChange = (studentId, event) => {
  const newStatus = event.target.value;
  updateStudentStatus(studentId, newStatus);
  updateModal(studentId, newStatus);
  addHistory(studentId, newStatus);
  };
  const qrStatusUpdate = (studentId, status) => {
  updateStudentStatus(studentId, status);
  updateModal(studentId, status);
  addHistory(studentId, status);
  };

  const updateStudentStatus = async (studentId, newStatus) => {
    try {
      const now = new Date();
      const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
      
      const response = await fetch(`${host}/api/student/updatestatus/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Status: newStatus, Time: formattedTime }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId ? { ...student, Status: newStatus, Time: formattedTime } : student
        )
      );
    } catch (error) {
      console.error("Error updating student status:", error.message);
    }
  };


  const addHistory = async (studentId, newStatus) => {
    try {
      const now = new Date();
      
      // Format the time for display (e.g., "November 15, 2024 2:30 PM")
      const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = new Intl.DateTimeFormat('en-US', options).format(now);
      
      // Get the standard format for database storage (e.g., "2024-11-15 14:30:00")
      const standardTime = now.toISOString().slice(0, 19).replace('T', ' '); // Remove the milliseconds part and replace 'T' with space
  
      const response = await fetch(`${host}/api/student/addStatusHistory/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Status: newStatus, Time: formattedTime, Current: standardTime }),
      });
      
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
    } catch (error) {
      console.error("Error adding student history:", error.message);
    }
  };
  

  const handleQRClick = () => setIsScannerOpen(true);

  const handleScanSuccess = (decodedText) => {
    try {
      // console.log(decodedText, "this is qr data")
      const { studentId, status } = JSON.parse(decodedText); 
      const parsedData = JSON.parse(decodedText); 
      console.log(parsedData)
      // console.log(studentId, status, "this is data being sent to function")
      // updateStudentStatus(studentId, status);
      qrStatusUpdate(parsedData.studentId, parsedData.status);
      setIsScannerOpen(false);
    } catch (error) {
      console.error("Error parsing QR data:", error);
    }
  };

  const handleScanFailure = (error) => console.warn("QR scanning failed:", error);

  useEffect(() => {
    if (isScannerOpen) {
      const html5QrcodeScanner = new Html5QrcodeScanner('reader', { 
        qrbox: {
            width: 250,
            height: 250,
        },  
        fps: 20,
    });


    html5QrcodeScanner.render(handleScanSuccess, handleScanFailure);

      return () => html5QrcodeScanner.clear(); // Clean up scanner on unmount or close
    }
  }, [isScannerOpen]);

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

  const closehistoryModal = () => setModalOpen(false);

  return (
    <>
  <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
    <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
      <div
        className="map w-full h-[50vh] md:h-[60%] lg:h-[70%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
        ref={mapRef}
      ></div>

      <div className="qrcont h-[40px] p-2 md:p-4 flex items-center">
        <div className="flex gap-2 items-center w-1/2">
          <div className="qrcd w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10  cursor-pointer rounded" onClick={handleQRClick}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M80-680v-200h200v80H160v120H80Zm0 600v-200h80v120h120v80H80Zm600 0v-80h120v-120h80v200H680Zm120-600v-120H680v-80h200v200h-80ZM700-260h60v60h-60v-60Zm0-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm120-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm240-320v240H520v-240h240ZM440-440v240H200v-240h240Zm0-320v240H200v-240h240Zm-60 500v-120H260v120h120Zm0-320v-120H260v120h120Zm320 0v-120H580v120h120Z"/></svg>
          </div>
        </div>
        <div className='w-1/2 flex items-center justify-end'>
          <button onClick={onLogout} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center ">Log Out</button>
        </div>
      </div>

      <div className="list flex-grow h-[30vh] md:h-[35%] lg:h-[40%] w-full">
        <div className="relative shadow-md rounded-bl-lg rounded-br-lg h-full overflow-y-auto scrollbar-hidden">
          {students.length === 0 ? (
            <div className="text-center p-4 text-red-600 font-semibold">
              No students assigned to this bus.
            </div>
          ) : (
            <table className="w-full text-xs md:text-sm lg:text-base text-left rtl:text-right text-gray-500">
              <thead className="text-xs md:text-sm lg:text-base text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
                    Student
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
                    School
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
                    Residence
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
                    Pt. Contact
                  </th>
                  <th scope="col" className="px-3 md:pl-6 pr-[20px] md:pr-[40px] py-2 md:py-3 lg:py-4 sticky top-0 bg-gray-50">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base" onClick={() => handleChildClick(student.id)}>
                      {student.Child}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
                      {student.School}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
                      {student.Address}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
                      {student.Contact}
                    </td>
                    <td className="px-3 md:pl-6 pr-[20px] md:pr-[40px] py-2 md:py-4">
                      <select
                        className="border rounded-md w-[80px] md:w-[100px] lg:w-[120px] h-8 md:h-9 lg:h-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm lg:text-base"
                        onChange={(e) => handleStatusChange(student.id, e)}
                        value={student.Status}
                      >
                        <option value="ToSchool">To School</option>
                        <option value="AtSchool">At School</option>
                        <option value="ToHome">To Home</option>
                        <option value="AtHome">At Home</option>
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

  {isScannerOpen && (
    <div className="absolute top-10 w-full md:w-[80%] lg:w-[600px] md:h-[300px] lg:h-[540px] flex justify-center">
      <div className="modal bg-white p-4 rounded-md shadow-lg w-full">
        <div id="reader" className="w-full"></div>
        <button
          onClick={() => setIsScannerOpen(false)}
          className="mt-4 p-2 w-full md:w-auto bg-red-500 text-white rounded"
        >
          Close Scanner
        </button>
      </div>
    </div>
  )}


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

export default Driver;


















// THIS CODE USES WATCHPOSITION TO CONTINUOSLY MONITOR POSITION 

// import React, { useState, useEffect, useRef } from 'react';

// const Driver = ({ license }) => {
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

// export default Driver;
