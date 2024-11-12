// import React, { useState, useEffect, useRef } from 'react';

// const Students = ({ license, contact }) => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [matchedCar, setMatchedCar] = useState({
//     coords: {
//       lat: 28.2599333,
//       lng: 77.412615,
//     },
//   });
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const host = "http://localhost:5000";
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
// ;

//   return (
//     <>
//       <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//         <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
//           <div
//             className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
//             ref={mapRef}
//             style={{ height: '100%', width: '100%' }}
//           ></div>

//           <div className="select flex-grow h-[40%]">
            
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };

// export default Students;


// import React, { useState, useEffect, useRef } from 'react';
// import QRCode from 'react-qr-code';

// const Students = ({ license, contact, studentId }) => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [matchedCar, setMatchedCar] = useState({
//     coords: {
//       lat: 28.2599333,
//       lng: 77.412615,
//     },
//   });
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [qrCodeValue, setQrCodeValue] = useState('');
  
//   const host = "http://localhost:5000";
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markerRef = useRef(null);

//   const statuses = ['To Home', 'To School', 'At Home', 'At School'];

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

//   const handleStatusChange = (event) => {
//     const status = event.target.value;
//     setSelectedStatus(status);

//     // Generate QR code with the selected status and student ID
//     if (status) {
//       const qrData = `${studentId}:${status}`;
//       setQrCodeValue(qrData); // Update QR code value
//     }
//   };

//   return (
//     <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//       <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
        
//         <div
//           className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
//           ref={mapRef}
//           style={{ height: '100%', width: '100%' }}
//         ></div>

//         {/* Select Box for Status */}
//         <div className="select flex-grow h-[40%] p-4">
//           <label htmlFor="status" className="block text-lg font-semibold mb-2">
//             Select Status:
//           </label>
//           <select
//             id="status"
//             className="w-full p-2 border rounded-lg"
//             value={selectedStatus}
//             onChange={handleStatusChange}
//           >
//             <option value="">Select a status</option>
//             {statuses.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>

//           {/* QR Code Generation */}
//           {qrCodeValue && (
//             <div className="mt-4">
//               <h2 className="text-lg font-semibold mb-2">Generated QR Code:</h2>
//               <QRCode value={qrCodeValue} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Students;




// import React, { useState, useEffect, useRef } from 'react';
// import QRCode from 'react-qr-code';

// const Students = ({ license, contact, studentId }) => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [matchedCar, setMatchedCar] = useState({
//     coords: {
//       lat: 28.2599333,
//       lng: 77.412615,
//     },
//   });
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [qrCodeValue, setQrCodeValue] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  
//   const host = "http://localhost:5000";
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markerRef = useRef(null);

//   const statuses = ['To Home', 'To School', 'At Home', 'At School'];

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

//   const handleStatusChange = (event) => {
//     const status = event.target.value;
//     setSelectedStatus(status);

//     // Generate QR code with the selected status and student ID
//     if (status) {
//       const qrData = `${studentId}:${status}`;
//       setQrCodeValue(qrData); // Update QR code value
//       setIsModalOpen(true); // Open the modal when QR code is generated
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };

//   return (
//     <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//       <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
        
//         <div
//           className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
//           ref={mapRef}
//           style={{ height: '100%', width: '100%' }}
//         ></div>

//         {/* Select Box for Status */}
//         <div className="select flex-grow h-[40%] p-4">
//           <label htmlFor="status" className="block text-lg font-semibold mb-2">
//             Select Status:
//           </label>
//           <select
//             id="status"
//             className="w-full p-2 border rounded-lg"
//             value={selectedStatus}
//             onChange={handleStatusChange}
//           >
//             <option value="">Select a status</option>
//             {statuses.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* QR Code Modal */}
//       {isModalOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
//           <div className="bg-white p-4 md:p-8 rounded-lg max-w-xs md:max-w-md lg:max-w-lg w-full">
//             <h2 className="text-xl font-semibold mb-4">Generated QR Code</h2>
//             <QRCode value={qrCodeValue} />
//             <button
//               onClick={closeModal}
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Students;






import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';

const Students = ({ license, contact}) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [matchedCar, setMatchedCar] = useState({
    coords: {
      lat: 28.2599333,
      lng: 77.412615,
    },
  });
  const [selectedStatus, setSelectedStatus] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  
  const host = "http://localhost:5000";
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  const statuses = ['ToHome', 'ToSchool', 'AtHome', 'AtSchool'];

  // Function to fetch students based on contact number
  const fetchStudentsByContact = async () => {
    try {
      const response = await fetch(`${host}/api/student/contact/${contact}`);
      if (!response.ok) {
        throw new Error("Failed to fetch students by contact");
      }
      const data = await response.json();
      console.log(data)
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students by contact:", error);
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
    fetchStudentsByContact();
    fetchCarData();
    initializeMap();

    const studentInterval = setInterval(fetchStudentsByContact, 2000);
    const carInterval = setInterval(fetchCarData, 2000);

    return () => {
      clearInterval(studentInterval);
      clearInterval(carInterval);
    };
  }, [contact]); // Adding contact as dependency to refetch when it changes

  const handleStatusChange = (event, studentId) => {
    const status = event.target.value;
    setSelectedStatus(status);
  
    // Generate QR code with the selected status and student ID
    if (status) {
      // const qrData = `${studentId}, ${status}`;
      const qrData = JSON.stringify({ studentId, status });


      setQrCodeValue(qrData); // Update QR code value
      setIsModalOpen(true); // Open the modal when QR code is generated
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
    {/* <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
      <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
        
        <div
          className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
          ref={mapRef}
          style={{ height: '100%', width: '100%' }}
        ></div>

       
        <div className="list flex-grow h-[40%] overflow-y-auto scrollbar-hidden">
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
                    <label htmlFor="status" className="block text-lg font-semibold mb-2">
                    </label>
                    <select
                        id="status"
                        className="border rounded-md w-[100px] md:w-32 h-8 md:h-9 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm"
                        value={selectedStatus}
                    onChange={(e) => handleStatusChange(e, student.id)} 
                    >
                        <option value="">Select a status</option>
                        {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                        ))}
                    </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-4 md:p-8 rounded-lg max-w-xs md:max-w-md lg:max-w-lg w-full flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Generated QR Code</h2>
            <QRCode value={qrCodeValue} />
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div> */}
    
    <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
  <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
    
    {/* Map Section */}
    <div className="map w-full h-[60vh] md:h-[55%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg" ref={mapRef}></div>

    {/* Student Table Section */}
    <div className="list flex-grow h-[40%] w-full overflow-y-auto scrollbar-hidden">
      <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Student</th>
            <th className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">School</th>
            <th className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Residence</th>
            <th className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Pt.Contact</th>
            <th className="px-3 md:pl-6 pr-3 md:pr-6 py-2 md:py-4 sticky top-0 bg-gray-50 w-1/4">Status</th>
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
                  id="status"
                  className="border rounded-md w-[100px] md:w-32 h-8 md:h-9 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm"
                  value={selectedStatus}
              onChange={(e) => handleStatusChange(e, student.id)} 
              >
                  <option value="">Select a status</option>
                  {statuses.map((status) => (
                  <option key={status} value={status}>
                      {status}
                  </option>
                  ))}
              </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* QR Code Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10 p-4">
      <div className="bg-white p-4 md:p-8 rounded-lg max-w-sm md:max-w-md lg:max-w-lg w-full flex flex-col items-center">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">Generated QR Code</h2>
        <QRCode value={qrCodeValue} className="w-full max-w-[200px] md:max-w-[300px] lg:max-w-[350px]" />
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full md:w-auto"
        >
          Close
        </button>
      </div>
    </div>
  )}
</div>
</>

  );
};

export default Students;





// const Students = ({ license, contact }) => {
//     const [students, setStudents] = useState([]);
//     const [filteredStudents, setFilteredStudents] = useState([]);
//     const [matchedCar, setMatchedCar] = useState({
//       coords: {
//         lat: 28.2599333,
//         lng: 77.412615,
//       },
//     });
//     const [selectedStatus, setSelectedStatus] = useState('');
//     const [qrCodeValue, setQrCodeValue] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    
//     const host = "http://localhost:5000";
//     const mapRef = useRef(null);
//     const mapInstance = useRef(null);
//     const markerRef = useRef(null);
  
//     const statuses = ['To Home', 'To School', 'At Home', 'At School'];
  
//     // Function to fetch students based on contact number
//     const fetchStudentsByContact = async () => {
//       try {
//         const response = await fetch(`${host}/api/student/contact/${contact}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch students by contact");
//         }
//         const data = await response.json();
//         console.log(data)
//         setStudents(data);
//       } catch (error) {
//         console.error("Error fetching students by contact:", error);
//       }
//     };
  
//     const fetchCarData = async () => {
//       try {
//         const response = await fetch(`${host}/api/auth/fetchallcars`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch car data");
//         }
//         const cars = await response.json();
//         const matchedCarData = cars.find((car) => car.License === license);
//         if (matchedCarData && matchedCarData.Coords) {
//           setMatchedCar({ coords: matchedCarData.Coords });
//         } else {
//           console.error("No car found with the specified license number");
//         }
//       } catch (error) {
//         console.error("Error fetching car data:", error);
//       }
//     };
  
//     const initializeMap = () => {
//       if (!mapInstance.current) {
//         mapInstance.current = new window.google.maps.Map(mapRef.current, {
//           center: matchedCar.coords,
//           zoom: 17,
//         });
//         markerRef.current = new window.google.maps.Marker({
//           position: matchedCar.coords,
//           map: mapInstance.current,
//         });
//       }
//     };
  
//     useEffect(() => {
//       console.log("Updated coordinates:", matchedCar.coords);
//     }, [matchedCar]);
  
//     useEffect(() => {
//       if (mapInstance.current) {
//         mapInstance.current.panTo(matchedCar.coords);
//         markerRef.current.setPosition(matchedCar.coords);
//       }
//     }, [matchedCar.coords]);
  
//     useEffect(() => {
//       const filterStudents = () => {
//         const filtered = students.filter((student) => student.Contact === contact);
//         setFilteredStudents(filtered);
//       };
//       filterStudents();
//     }, [students, contact]);
  
//     useEffect(() => {
//       fetchStudentsByContact();
//       fetchCarData();
//       initializeMap();
  
//       const studentInterval = setInterval(fetchStudentsByContact, 2000);
//       const carInterval = setInterval(fetchCarData, 2000);
  
//       return () => {
//         clearInterval(studentInterval);
//         clearInterval(carInterval);
//       };
//     }, [contact]); // Adding contact as dependency to refetch when it changes
  
//     const handleStatusChange = (event, studentId) => {
//       const status = event.target.value;
//       setSelectedStatus(status);
  
//       // Generate QR code with the selected status and student ID
//       if (status) {
//         const qrData = `${studentId}:${status}`;
//         setQrCodeValue(qrData); // Update QR code value
//         setIsModalOpen(true); // Open the modal when QR code is generated
//       }
//     };
  
//     const closeModal = () => {
//       setIsModalOpen(false); // Close the modal
//     };
  
//     return (
//       <div className="main h-screen w-screen flex justify-center items-center bg-[#b5c2ca]">
//         <div className="mainn w-full h-full md:w-[90%] md:h-[90%] lg:w-[88%] lg:h-[88%] bg-gray-100 flex flex-col p-1 pb-2 rounded-lg border-[1px] border-black">
          
//           <div
//             className="map w-full h-[60%] bg-blue-300 mb-1 rounded-tr-lg rounded-tl-lg"
//             ref={mapRef}
//             style={{ height: '100%', width: '100%' }}
//           ></div>
  
//           {/* Select Box for Status */}
//           <div className="list flex-grow h-[40%] overflow-y-auto scrollbar-hidden">
//           <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500">
//                 <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Student</th>
//                     <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">School</th>
//                     <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Residence</th>
//                     <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Pt.Contact</th>
//                     <th scope="col" className="px-3 md:px-6 py-2 md:py-3 sticky top-0 bg-gray-50 w-1/4">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
//                       <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Child}</div></td>
//                       <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.School}</div></td>
//                       <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Address}</div></td>
//                       <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words"><div className="w-[120px]">{student.Contact}</div></td>
//                       <td className="px-3 md:pl-6 pr-[40px] py-2 md:py-4">
//                       <label htmlFor="status" className="block text-lg font-semibold mb-2">
//                       </label>
//                       <select
//                           id="status"
//                           className="border rounded-md w-[100px] md:w-32 h-8 md:h-9 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm"
//                           value={selectedStatus}
//                           onChange={(e) => handleStatusChange(e, student.id)} // Pass student ID here
//                       >
//                           <option value="">Select a status</option>
//                           {statuses.map((status) => (
//                           <option key={status} value={status}>
//                               {status}
//                           </option>
//                           ))}
//                       </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//           </div>
//         </div>
  
//         {/* QR Code Modal */}
//         {isModalOpen && (
//           <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
//             <div className="bg-white p-4 md:p-8 rounded-lg max-w-xs md:max-w-md lg:max-w-lg w-full flex flex-col items-center">
//               <h2 className="text-xl font-semibold mb-4">Generated QR Code</h2>
//               <QRCode value={qrCodeValue} />
//               <button
//                 onClick={closeModal}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   export default Students;
  