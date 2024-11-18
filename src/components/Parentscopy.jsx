import React, { useState, useEffect, useRef } from 'react';

const Parentscopy = ({ license, contact }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // New state for filtered students
  const [matchedCar, setMatchedCar] = useState({
    coords: {
      lat: 28.2599333, // Default latitude
      lng: 77.412615,   // Default longitude
    },
  });
  const host = "http://localhost:5000";
  const mapRef = useRef(null);  // Ref for the map container
  const mapInstance = useRef(null); // Ref for the map instance
  const markerRef = useRef(null); // Ref for the map marker

  // Fetch all students
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

  // Fetch car data and update coordinates
  const fetchCarData = async () => {
    try {
      const response = await fetch(`${host}/api/auth/fetchallcars`);
      if (!response.ok) {
        throw new Error("Failed to fetch car data");
      }
      const cars = await response.json();

      // Find the car that matches the license number
      const matchedCarData = cars.find((car) => car.License === license);
      if (matchedCarData && matchedCarData.Coords) {
        setMatchedCar({ coords: matchedCarData.Coords });
        // console.log("this are car's coords", matchedCar.coords);
        console.log(matchedCar);
      } else {
        console.error("No car found with the specified license number");
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  // Initialize the map
  const initializeMap = () => {
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: matchedCar.coords,
        zoom: 17,
      });
      console.log(matchedCar.coords);
      markerRef.current = new window.google.maps.Marker({
        position: matchedCar.coords,
        map: mapInstance.current,
      });
    }
  };


  // Add this useEffect to log the matchedCar state whenever it updates
  useEffect(() => {
    console.log("Updated coordinates:", matchedCar.coords);
  }, [matchedCar]);

  // Update map center smoothly
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.panTo(matchedCar.coords); // Smoothly pan to the new coordinates
      markerRef.current.setPosition(matchedCar.coords); // Move the marker to new coordinates
    }
  }, [matchedCar.coords]);

  // Effect to filter students based on contact number
  useEffect(() => {
    const filterStudents = () => {
      const filtered = students.filter((student) => student.Contact === contact);
      setFilteredStudents(filtered);
    };

    filterStudents();
  }, [students, contact]); // Run the effect whenever students or contact changes

  useEffect(() => {
    // Fetch initial data
    fetchAllStudents();
    fetchCarData();
    initializeMap();

    // Set interval to fetch students every 2 seconds
    const studentInterval = setInterval(fetchAllStudents, 2000); // Fetch students every 2 seconds
    const carInterval = setInterval(fetchCarData, 2000); // Fetch car coordinates every 2 seconds

    return () => {
      clearInterval(studentInterval); // Cleanup on unmount
      clearInterval(carInterval); // Cleanup on unmount
    };
  }, []); // Empty dependency array means this runs once on mount

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
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-3">Student</div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-3">School</div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-3">Residence</div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-3">Pt.Contact</div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-3">Status</div>
                  <div className="w-1/4 px-2 py-3 md:px-6 md:py-3">Time</div>
                </div>

                {filteredStudents.map((student, index) => (
                  <div key={student.id} className={`flex ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center text-gray-900 font-medium">
                      <div className="w-[100px] break-words text-center">{student.Child}</div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[100px] break-words text-center">{student.School}</div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[100px] break-words text-center">{student.Address}</div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[100px] break-words text-center">{student.Contact}</div>
                    </div>
                    <div className="w-1/4 px-2 py-3 md:px-6 md:py-4 flex justify-center items-center">
                      <div className="w-[100px] border border-gray-300 rounded py-1 break-words text-center">
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
    </>
  );
}

export default Parentscopy;

