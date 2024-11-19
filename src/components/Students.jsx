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

const Students = ({ license, contact, onLogout}) => {
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
  
  const host = "https://logi-52ys.onrender.com";
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

    <div className="lgot h-[40px] p-2 md:p-4 flex items-center justify-end">
      <div className='w-1/2 flex items-center justify-end'>
        <button onClick={onLogout} className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center ">Log Out</button>
      </div>
    </div>

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
  