import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Keepscreenon from './Keepscreenon';
import video from './video.mp4'

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const filteredStudents = students.filter((student) =>
    student.Child.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  const busIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512.427 512.427" xml:space="preserve">
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
  </svg>`;


  useEffect(() => {
    if (isMapReady && mapRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 17,
      });
      const newMarker = new window.google.maps.Marker({
        position: mapInstanceRef.current.getCenter(),
        map: mapInstanceRef.current,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(busIcon)}`,
          scaledSize: new google.maps.Size(32, 32), // Adjust size as needed
        },
      });
      
      setMarker(newMarker);
      // getCurrentLocation(); // Uncomment to get current location
      // mimicMovement(); // Comment/uncomment to switch between movement functions
    }
  }, [isMapReady]);


//current location

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
  useEffect(() => {
    const videoElement = document.getElementById("keep-awake-video");
    videoElement
      .play()
      .catch((error) => console.error("Failed to play the video:", error));
  }, []);

  return (
    <>
      {/* <Keepscreenon/> */}
      <video
        id="keep-awake-video"
        src={video} // Replace with your video file path
        loop
        muted
        playsInline
        style={{ width: "100%", maxWidth: "400px" }} // Adjust size as needed
      ></video>
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
                // <table className="w-full text-xs md:text-sm lg:text-base text-left rtl:text-right text-gray-500">
                //   <thead className="text-xs md:text-sm lg:text-base text-gray-700 uppercase bg-gray-50">
                //     <tr>
                //       <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
                //         Student
                //       </th>
                //       <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
                //         School
                //       </th>
                //       <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
                //         Residence
                //       </th>
                //       <th scope="col" className="px-3 md:px-6 py-2 md:py-3 lg:px-8 lg:py-4 sticky top-0 bg-gray-50">
                //         Pt. Contact
                //       </th>
                //       <th scope="col" className="px-3 md:pl-6 pr-[20px] md:pr-[40px] py-2 md:py-3 lg:py-4 sticky top-0 bg-gray-50">
                //         Status
                //       </th>
                //     </tr>
                //   </thead>
                //   <tbody>
                //     {students.map((student) => (
                //       <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                //         <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base" onClick={() => handleChildClick(student.id)}>
                //           {student.Child}
                //         </td>
                //         <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
                //           {student.School}
                //         </td>
                //         <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
                //           {student.Address}
                //         </td>
                //         <td className="px-3 md:px-6 py-2 md:py-4 w-1/4 break-words text-xs md:text-sm lg:text-base">
                //           {student.Contact}
                //         </td>
                //         <td className="px-3 md:pl-6 pr-[20px] md:pr-[40px] py-2 md:py-4">
                //           <select
                //             className="border rounded-md w-[80px] md:w-[100px] lg:w-[120px] h-8 md:h-9 lg:h-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm lg:text-base"
                //             onChange={(e) => handleStatusChange(student.id, e)}
                //             value={student.Status}
                //           >
                //             <option value="ToSchool">To School</option>
                //             <option value="AtSchool">At School</option>
                //             <option value="ToHome">To Home</option>
                //             <option value="AtHome">At Home</option>
                //           </select>
                //         </td>
                //       </tr>
                //     ))}
                //   </tbody>
                // </table>

                <div>
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search by student name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className=" p-2 border rounded-md w-full md:w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Table */}
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
                    {filteredStudents.map((student) => (
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
              </div>
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
