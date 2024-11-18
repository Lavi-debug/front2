import React, { useState, useEffect, useRef } from "react"

const Admin = () => {
    const host = "https://logi-52ys.onrender.com"; //http://localhost:5000
    const mapRef = useRef(null);
    const markerRef = useRef(null); // Create a ref for the marker+-
    const mapInstance = useRef(null);
    const [showCoordsMessage, setShowCoordsMessage] = useState(false);
    const [mapCoords, setMapCoords] = useState({ lat: -34.397, lng: 150.644 }); // Default coordinates

    const carref = useRef(null);
    const [isCarModalOpen, setIsCarModalOpen] = useState(false);
    const toggleCarModal = () => setIsCarModalOpen(!isCarModalOpen);

    const ref = useRef(null);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const toggleStudentModal = () => setIsStudentModalOpen(!isStudentModalOpen);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState([]);

    const [isDriverExpanded, setIsDriverExpanded] = useState(false);
    const [isAdcrExpanded, setIsAdcrExpanded] = useState(false);
    const [selectedCarLicense, setSelectedCarLicense] = useState(null); // Track the selected car's license

    const [isChildExpanded, setIsChildExpanded] = useState(false);
    const [isAdchldExpanded, setIsAdchldExpanded] = useState(false);
    const [alertMessage, setAlertMessage] = useState(""); // For custom alert message
    const [isOrangeExpanded, setIsOrangeExpanded] = useState(false);

    const [carForm, setCarForm] = useState({ carName: '', License: '', Seats: '', driverName: '', driverCont: '', Password: '' });

    const [studentForm, setStudentForm] = useState({ Child: '', School: '', Contact: '', Address: '', License: '' });

    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({ eChild: '', eSchool: '', eContact: '', eAddress: '', eLicense: '' });

    const [car, setCar] = useState({ ecarName: '', eSeats: '', eLicense: '', edriverName: '', edriverCont: '', ePassword: '' });
    const [cars, setCars] = useState([]);



//Functions:


//Map related all functions
    useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: mapCoords,
                zoom: 17,
            });

            // Create a marker and store it in the ref
            markerRef.current = new window.google.maps.Marker({
                position: mapCoords,
                map: map,
                title: "Car Location", // Optional title
            });
        };

        if (window.google && window.google.maps) {
            initMap();
        } else {
            console.error("Google Maps script not loaded");
        }
    }, []); // Only run on initial mount

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

    useEffect(() => {
        // Update marker position and map center when mapCoords changes
        if (markerRef.current) {
            markerRef.current.setPosition(mapCoords);
            const map = markerRef.current.getMap(); // Get the map from the marker
            map.setCenter(mapCoords); // Update the map center to the new coordinates
        }
    }, [mapCoords]);




// All Car coordinates fetching functions
    const getCarDetails = async (license) => {
        try {
            // Fetch coordinates by license
            const response = await fetch(`${host}/api/auth/getcoordslicense/${license}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { Coords } = await response.json(); // Destructure the Coords from the response
            console.log("Car Coordinates:", Coords); // Log the coordinates

            // Ensure Coords has the correct format
            if (Coords && typeof Coords.lat === 'number' && typeof Coords.lng === 'number') {
                // Update map coordinates with the clicked car's coordinates
                setMapCoords(Coords);
                setSelectedCarLicense(license); // Set the selected car's license
            } else {
                // Show a custom alert for unavailable coordinates
                showAlert("Coordinates are not available for this car. Please Login at driver page with this license to get coords");
                setSelectedCarLicense(null); // Reset selected car license if no coordinates
            }
        } catch (error) {
            console.error("Error fetching car coordinates:", error.message);
            showAlert("An error occurred while fetching car coordinates.");
        }
    };
    
    useEffect(() => {
        let intervalId;

        const fetchCoordinates = async () => {
            if (selectedCarLicense) {
                try {
                    const response = await fetch(`${host}/api/auth/getcoordslicense/${selectedCarLicense}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const { Coords } = await response.json(); // Destructure the Coords from the response
                    if (Coords && typeof Coords.lat === 'number' && typeof Coords.lng === 'number') {
                        // Update map coordinates with the fetched coordinates
                        setMapCoords(Coords);
                    } else {
                        // If no coordinates are available, clear the interval and reset selected license
                        clearInterval(intervalId);
                        setSelectedCarLicense(null);
                    }
                } catch (error) {
                    console.error("Error fetching car coordinates:", error.message);
                }
            }
        };

        if (selectedCarLicense) {
            fetchCoordinates(); // Initial fetch for the selected car's coordinates
            intervalId = setInterval(fetchCoordinates, 2000); // Set interval for every 2 seconds
        }

        return () => {
            clearInterval(intervalId); // Cleanup interval on component unmount or license change
        };
    }, [selectedCarLicense]); // Depend on selectedCarLicense




//All functions which edit car and students

    //Students:
    const handleeStudentChange = (e) => {
        const { id, value } = e.target;
        setStudent((student) => ({
            ...student,
            [id]: value
        }));
    };

    const handleeStudentSubmit = (e) => {
        console.log("updating student")
        editStudent(student.id, student.eChild, student.eSchool, student.eContact, student.eAddress, student.eLicense)
        toggleStudentModal();
        e.preventDefault()
    };

    const editStudent = async (id, Child, School, Contact, Address, License) => {
        //API CALL
        const response = await fetch(`${host}/api/student/updatestudent/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Child, School, Contact, Address, License }),
        });
        const json = await response.json;
        console.log(json);

        //Logic to edit in client.

        let newStudents = JSON.parse(JSON.stringify(students));
        for (let index = 0; index < newStudents.length; index++) {
            const element = newStudents[index];
            if (element.id === id) {
                newStudents[index].Child = Child;
                newStudents[index].School = School;
                newStudents[index].Contact = Contact;
                newStudents[index].Address = Address;
                newStudents[index].License = License;
                break;
            };
        }
        setStudents(newStudents);
    };

    const updateStudent = async (student) => {
        // Open the modal first
        ref.current.click();
        console.log(student);

        // Prepare the data to be sent
        setStudent({ id: student.id, eChild: student.Child, eSchool: student.School, eContact: student.Contact, eAddress: student.Address, eLicense: student.License })
    };


    //Cars:
    const handleeCarChange = (e) => {
        const { id, value } = e.target;
        console.log(`Changing ${id} to ${value}`); // Log the changes
        setCar((prevCar) => ({
            ...prevCar,
            [id]: value,
        }));
    };

    const handleeCarSubmit = (e) => {
        console.log('Car Form Submitted');
        editCar(car.id, car.ecarName, car.eSeats, car.eLicense, car.edriverName, car.edriverCont, car.ePassword)
        toggleCarModal();
        e.preventDefault();
    };

    const editCar = async (id, carName, Seats, License, driverName, driverCont, Password) => {
        //API CALL
        const response = await fetch(`${host}/api/auth/updatecar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ carName, Seats, License, driverName, driverCont, Password }),
        });
        const json = await response.json;
        console.log(json);

        //Logic to edit in client.

        let newCars = JSON.parse(JSON.stringify(cars));
        for (let index = 0; index < newCars.length; index++) {
            const element = newCars[index];
            if (element.id === id) {
                newCars[index].carName = carName;
                newCars[index].Seats = Seats;
                newCars[index].License = License;
                newCars[index].driverName = driverName;
                newCars[index].driverCont = driverCont;
                newCars[index].Password = Password;
                break;
            };
        }
        setCars(newCars);
    };

    const updateCar = async (car) => {

        carref.current.click();
        console.log(car);

        // Prepare the data to be sent
        setCar({ id: car.id, ecarName: car.carName, eSeats: car.Seats, eLicense: car.License, edriverName: car.driverName, edriverCont: car.driverCont, ePassword: car.Password })
    };

    const handleDriverExpand = () => {
        setIsDriverExpanded(!isDriverExpanded);
        if (isChildExpanded) setIsChildExpanded(false);
    };

    const handleChildExpand = () => {
        setIsChildExpanded(!isChildExpanded);
        if (isDriverExpanded) setIsDriverExpanded(false);
    };

    const handleAdcrExpand = () => {
        setIsAdcrExpanded(!isAdcrExpanded);
        if (isAdchldExpanded) setIsAdchldExpanded(false);
        if (isOrangeExpanded) setIsOrangeExpanded(false);
    };

    const handleAdchldExpand = () => {
        setIsAdchldExpanded(!isAdchldExpanded);
        if (isAdcrExpanded) setIsAdcrExpanded(false);
        if (isOrangeExpanded) setIsOrangeExpanded(false);
    };



//All function to handle forms to add new student and car
    
    //Student:
    const handleStudentChange = (e) => {
        const { id, value } = e.target;
        setStudentForm((studentForm) => ({
            ...studentForm,
            [id]: value
        }));
    };

    const handleStudentSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        console.log("Submitting student data:", studentForm); // Log form data for debugging

        try {
            // Call the addStudent function to add the new student
            await addStudent(
                studentForm.Child,
                studentForm.School,
                studentForm.Contact,
                studentForm.Address,
                studentForm.License
            );

            console.log("student added successfully");

            // After successfully adding the car, fetch the updated list of cars
            const response = await fetch(`${host}/api/student/fetchallstudents`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch updated student list');
            }

            const newStudents = await response.json(); // Parse the response data

            // Update the state with the new list of cars
            setStudents(newStudents);

            // Clear form fields
            setStudentForm({ Child: "", School: "", Contact: "", Address: "", License: "" });
        } catch (error) {
            console.error("Error adding student or fetching updated list:", error); // Log any errors that occur
        }
    };
    

    //Car:
    const handleCarChange = (e) => {
        const { id, value } = e.target;
        setCarForm((carForm) => ({
            ...carForm,
            [id]: value
        }));
    };

    const handleCarSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        console.log("Submitting car data:", carForm); // Log form data for debugging

        try {
            // Call the addCar function to add the new car
            await addCar(
                carForm.carName,
                carForm.Seats,
                carForm.License,
                carForm.driverName,
                carForm.driverCont,
                carForm.Password
            );

            console.log("Car added successfully");

            // After successfully adding the car, fetch the updated list of cars
            const response = await fetch(`${host}/api/auth/fetchallcars`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to fetch updated car list');
            }

            const newCars = await response.json(); // Parse the response data

            // Update the state with the new list of cars
            setCars(newCars);

            // Clear form fields
            setCarForm({ carName: "", License: "", Seats: "", driverName: "", driverCont: "", Password: "" });

        } catch (error) {
            console.error("Error adding car or fetching updated list:", error); // Log any errors that occur
        }
    };


//Functions to add new student and car from handle functions

    //Student
    const addStudent = async (Child, School, Contact, Address, License) => {
        const response = await fetch(`${host}/api/student/addstudent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Child, School, Contact, Address, License }),
        });

        // Handle response
        if (!response.ok) {
            throw new Error('Failed to add student'); // Throw error if response is not OK
        }

        const student = await response.json();
        setStudents((students) => [...students, student]); // Update the state with the new student
    };

    //Car
    const addCar = async (carName, Seats, License, driverName, driverCont, Password) => {
        const response = await fetch(`${host}/api/auth/createcar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ carName, Seats, License, driverName, driverCont, Password }),
        });

        // Handle response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to add car: ${errorData.error || response.statusText}`);
        }

        const car = await response.json();
        setCars((prevCars) => [...prevCars, car]); // Update the state with the new car
    };



// Functions to fetch all students and cars

    //Student:
    const getStudents = async () => {
        try {
            const response = await fetch(`${host}/api/student/fetchallstudents`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await response.json();
            setStudents(json);
            console.log(json)
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    //Car:
    const getCars = async () => {
        try {
            const response = await fetch(`${host}/api/auth/fetchallcars`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();

            // Check if there are no cars in the response
            if (!json || json.length === 0) {
                throw new Error("No cars found.");
            }

            setCars(json);
            console.log(json);
        } catch (error) {
            console.error("Error fetching cars:", error.message);
        }
    };


    

// Functions to delete student and car

    //Student
    const deleteStudent = async (studentId) => {
        try {
            // Make an API call to delete the student from the database
            const response = await fetch(`${host}/api/student/deletestudent/${studentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            console.log('Student deleted successfully');

            // After successful deletion, fetch the updated list of students
            const fetchResponse = await fetch(`${host}/api/student/fetchallstudents`, {
                method: 'GET',
            });

            if (!fetchResponse.ok) {
                throw new Error('Failed to fetch updated student list');
            }

            const updatedStudents = await fetchResponse.json();

            // Update the state with the new list of students
            setStudents(updatedStudents);

        } catch (error) {
            console.error('Error deleting student or fetching updated list:', error);
        }
    };

    //Car
    const deleteCar = async (carId) => {
        try {
            // Make an API call to delete the student from the database
            const response = await fetch(`${host}/api/auth/deletecar/${carId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            console.log('Car deleted successfully');

            // After successful deletion, fetch the updated list of students
            const fetchResponse = await fetch(`${host}/api/auth/fetchallcars`, {
                method: 'GET',
            });

            if (!fetchResponse.ok) {
                throw new Error('Failed to fetch updated car list');
            }

            const updatedCars = await fetchResponse.json();

            // Update the state with the new list of students
            setCars(updatedCars);

        } catch (error) {
            console.error('Error deleting car or fetching updated list:', error);
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

    const closehistoryModal = () => setModalOpen(false);




    const handleStatusChange = (studentId, event) => {
        const newStatus = event.target.value;
        updateStudentStatus(studentId, newStatus);
        updateModal(studentId, newStatus);
        addHistory(studentId, newStatus);
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
    



//Functions to handle Alert

    //Function to show the alert
    const showAlert = (message) => {
        setAlertMessage(message);
    };

    //Function to close the alert
    const closeAlert = () => {
        setAlertMessage("");
    };



//Useeffects that will run as soon as page loads 

    //To fetch all students
    useEffect(() => {
        getStudents();
    }, []);

    //To fetch all cars
    useEffect(() => {
        getCars();
    }, [])

    useEffect(() => {
        // Run getCars once when the component mounts
        getCars();
    
        // Set up the interval to run getCars every 2 seconds (2000 milliseconds)
        const intervalId = setInterval(() => {
          getCars();
        }, 2000);
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
      }, []); // Empty dependency array ensures this effect runs only once


      const [searchQuery, setSearchQuery] = useState("");

      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
      };
    
      const filteredStudents = students.filter((student) =>
        student.Child.toLowerCase().includes(searchQuery)
      );
    
     
      
      const filteredCars = cars.filter((car) =>
        car.driverName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      

    

//Ui part

    return (
        <div className='flex bg-[#b5c2ca] w-full h-screen p-12'>


            <div className="studentmodal">
                <button
                    onClick={toggleStudentModal}
                    ref={ref} className=" hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    Toggle modal
                </button>

                {/* Main modal */}
                {isStudentModalOpen && (
                    <div
                        id="static-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-2xl">
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Update student</h3>
                                    <button
                                        type="button"
                                        onClick={toggleStudentModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                {/* Modal body */}

                                <form onSubmit={handleeStudentSubmit}>
                                    <div className="">
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeStudentChange} value={student.eChild} id="eChild" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Child" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeStudentChange} value={student.eSchool} id="eSchool" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="School" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeStudentChange} value={student.eContact} id="eContact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Parents-Cotact" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeStudentChange} value={student.eAddress} id="eAddress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeStudentChange} value={student.eLicense} id="eLicense" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bus (License No.)" required />
                                        </div>

                                    </div>

                                    <div className='flex justify-center mt-[6px]'>
                                        <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Save
                                            </span>
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="cartmodal">
                <button
                    onClick={toggleCarModal}
                    ref={carref} className=" hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    Toggle modal
                </button>

                {/* Main modal*/}
                {isCarModalOpen && (
                    <div
                        id="static-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                    >
                        <div className="relative p-4 w-full max-w-2xl">
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Update car</h3>
                                    <button
                                        type="button"
                                        onClick={toggleCarModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                {/* Modal body */}

                                <form onSubmit={handleeCarSubmit}>
                                    <div className="">
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeCarChange} value={car.ecarName} id="ecarName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Car" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeCarChange} value={car.eLicense} id="eLicense" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="License" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeCarChange} value={car.eSeats} id="eSeats" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Seats" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeCarChange} value={car.edriverName} id="edriverName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Driver" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeCarChange} value={car.edriverCont} id="edriverCont" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Driver-Contact" required />
                                        </div>
                                        <div className='mb-[12px]'>
                                            <input type="text" onChange={handleeCarChange} value={car.ePassword} id="ePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                                        </div>
                                    </div>

                                    <div className='flex justify-center mt-[6px]'>
                                        <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Save
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="main w-full flex">
                <div className="left h-[94%] bg-[#b5c2ca] w-[40%] rounded-2xl mr-[4px]">
                    <div className="fd bg-[#b5c2ca] h-[100%] w-[100%] rounded-2xl mt-[10px] border-[1px] border-[black]">
                        <div className="map bg-blue-200 h-[54%] w-full rounded-tl-[12px] rounded-tr-[12px] mb-[2px]" ref={mapRef}>
                            {/* Map will appear here */}
                        </div>

                        <div className="srch bg-white h-[45.5%] w-full rounded-bl-[12px] rounded-br-[12px] overflow-y-auto scrollbar-hidden">
                            <table className="w-full h-full text-sm text-left text-gray-800 border-collapse table-fixed">
                                <thead className="bg-gray-100">
                                    <tr className="bg-gray-200">
                                        <th className="px-6 py-3 border-b border-gray-300 w-1/4">Driver Name</th>
                                        <th className="px-6 py-3 border-b border-gray-300 w-1/4">Car Name</th>
                                        <th className="px-6 py-3 border-b border-gray-300 w-1/4">License</th>
                                        <th className="px-6 py-3 border-b border-gray-300 w-1/4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.map((car) => {
                                        const coords = car.Coords || { lat: "N/A", lng: "N/A" };

                                        return (
                                            <tr key={car.id} className="hover:bg-gray-200" onClick={() => getCarDetails(car.License)}>
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                    <div className="w-full">{car.driverName}</div>
                                                </td>
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                    <div className="w-full">{car.carName}</div>
                                                </td>
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                    <div className="w-full">{car.License}</div>
                                                </td>
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                    <div className="flex items-center">
                                                    <span
                                                        className={`w-3 h-3 rounded-full mr-2 ${
                                                        car.Status === "online" ? "bg-green-500" : "bg-gray-400"
                                                        }`}
                                                    ></span>
                                                    <span>{car.Status}</span>
                                                    </div>
                                                </td>
                                             </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
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


                <div className="right w-[60%] py-2 pr-2">
                    <div className="allst bg-[#b5c2ca] h-[53%] w-full mt-[5px] mb-[6px] rounded-2xl flex relative">

                        {/* Car div */}
                        <div
                            className={`cardata ${isDriverExpanded ? 'w-full absolute rounded-[12px]' : 'w-[44%] relative'} h-full transition-all duration-500 mr-[4px] overflow-y-auto scrollbar-hidden bg-white rounded-[12px] border-[1px] border-black`}
                            onClick={!isDriverExpanded ? handleDriverExpand : undefined}
                            style={{ zIndex: isDriverExpanded ? 10 : 'auto' }}>
                            {isDriverExpanded && (
                                <span
                                    className="absolute top-[-4px] right-2 text-[22px] font-bold text-black cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDriverExpand();
                                    }}
                                    role="button"
                                    aria-label="Close"
                                >
                                    &times;
                                </span>
                            )}
                            {isDriverExpanded ? (

                                <div>
                                    <div className="">
                                        <input
                                            type="text"
                                            placeholder="Search by driver name"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-[15px] py-[10px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <table className="w-full h-full text-sm text-left text-gray-500 border-collapse">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 border-b"><h1>Car Name</h1></th>
                                                <th className="px-6 py-3 border-b"><h1>License</h1></th>
                                                <th className="px-6 py-3 border-b"><h1>Seats</h1></th>
                                                <th className="px-6 py-3 border-b"><h1>Driver</h1></th>
                                                <th className="px-6 py-3 border-b"><h1>Contact</h1></th>
                                                <th className="px-6 py-3 border-b"><h1>Password</h1></th>
                                                <th className="px-6 py-3 border-b"><h1>Edit</h1></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCars.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="px-5 py-3 text-center font-semibold text-red-500">
                                                        No cars match the search criteria.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredCars.map((car) => (
                                                    <tr key={car.id} className="hover:bg-gray-50">
                                                        <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                            <div className="w-[96px]">{car.carName}</div>
                                                        </td>
                                                        <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                            <div className="w-[96px]">{car.License}</div>
                                                        </td>
                                                        <td className="px-5 py-3 border-b font-semibold text-[12px] w-[100px] break-words">
                                                            <div className="w-[96px]">{car.Seats}</div>
                                                        </td>
                                                        <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                            <div className="w-[96px]">{car.driverName}</div>
                                                        </td>
                                                        <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                            <div className="w-[96px]">{car.driverCont}</div>
                                                        </td>
                                                        <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                            <div className="w-[96px]">{car.Password}</div>
                                                        </td>
                                                        <td className="px-5 py-3 border-b font-semibold text-[12px] break-words">
                                                            <div className="flex">
                                                                <div className="mr-[10px]" onClick={() => updateCar(car)}>
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/oqaajvyl.json"
                                                                        trigger="hover"
                                                                        style={{ "width": "20px", "height": "20px" }}
                                                                    ></lord-icon>
                                                                </div>
                                                                <div className="mr-[10px]" onClick={() => deleteCar(car.id)}>
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/vlnvqvew.json"
                                                                        trigger="hover"
                                                                        style={{ "width": "20px", "height": "20px" }}
                                                                    ></lord-icon>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <table className="w-full h-full text-sm text-left text-gray-500 border-collapse table-fixed rounded-tl-[12px] rounded-tr-[12px]">
                                    <thead className="bg-gray-100 w-full">
                                        <tr className="w-full">
                                            <th className="px-6 py-3 border-b w-1/3"><div>Car Name</div></th>
                                            <th className="px-6 py-3 border-b w-1/3">Driver</th>
                                            <th className="px-6 py-3 border-b w-1/3">Contact</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cars.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="px-5 py-3 text-center font-semibold text-red-500">
                                                    No cars assigned yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            cars.map((car) => (
                                                <tr key={car.id} className="hover:bg-gray-50">
                                                    <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                        <div className="w-[100px]">{car.carName}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                        <div className="w-[100px]">{car.driverName}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                        <div className="w-[100px]">{car.driverCont}</div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>


                        {/* Children div */}
                        <div
                            className={`chlddata ${isChildExpanded ? 'w-full absolute right-0' : 'w-[56%] relative'} h-full transition-all duration-500 overflow-y-auto overflow-x-auto scrollbar-hidden bg-white rounded-[12px] border-[1px] border-black`}
                            onClick={!isChildExpanded ? handleChildExpand : undefined}
                            style={{ zIndex: isChildExpanded ? 10 : 'auto' }}
                        >
                            {isChildExpanded && (
                                <span
                                    className="absolute top-[-4px] right-2 text-[22px] font-bold text-black cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleChildExpand();
                                    }}
                                    role="button"
                                    aria-label="Close"
                                >
                                    &times;
                                </span>
                            )}
                            {isChildExpanded ? (
                                
                                <div>
                                    <div className="">
                                        <input
                                        type="text"
                                        placeholder="Search by student name..."
                                        className="w-full pl-[15px] py-[10px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        />
                                    </div>

                                    
                                    <table className="w-full h-full text-sm text-left text-gray-800 border-collapse table-fixed">
                                        <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Student</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">School</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Parents Cont.</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">License</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Address</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Edit Stat</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Edit</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-200">
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                <div className="w-[120px]" onClick={() => handleChildClick(student.id)}>
                                                    {student.Child}
                                                </div>
                                                </td>
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                <div className="w-[120px]">{student.School || "N/A"}</div>
                                                </td>
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                <div className="w-[120px]">{student.Contact || "N/A"}</div>
                                                </td>
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                <div className="w-[120px]">{student.License || "N/A"}</div>
                                                </td>
                                                <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                <div className="w-[120px]">{student.Address || "N/A"}</div>
                                                </td>
                                                <td className="px-3 md:pl-[1.9rem] pr-[20px] md:pr-[40px] py-2 md:py-4">
                                                <select
                                                    className="border rounded-md w-[80px] md:w-[100px] lg:w-[77px] h-8 md:h-9 lg:h-10 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm lg:text-base"
                                                    onChange={(e) => handleStatusChange(student.id, e)}
                                                    value={student.Status}
                                                >
                                                    <option value="ToSchool">To School</option>
                                                    <option value="AtSchool">At School</option>
                                                    <option value="ToHome">To Home</option>
                                                    <option value="AtHome">At Home</option>
                                                </select>
                                                </td>
                                                <td className="pl-5 pr-[5.25rem] py-3 border-b font-semibold text-[12px] break-words">
                                                <div className="flex justify-center">
                                                    <div className="mr-[10px]" onClick={() => updateStudent(student)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/oqaajvyl.json"
                                                        trigger="hover"
                                                        style={{ width: "20px", height: "20px" }}
                                                    ></lord-icon>
                                                    </div>
                                                    <div className="mr-[10px]" onClick={() => deleteStudent(student.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/vlnvqvew.json"
                                                        trigger="hover"
                                                        style={{ width: "20px", height: "20px" }}
                                                    ></lord-icon>
                                                    </div>
                                                </div>
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                            <td colSpan="7" className="text-center py-3">
                                                No students found.
                                            </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                            ) : (
                                <table className="w-full h-full text-sm text-left text-gray-500 border-collapse table-fixed">
                                    <thead className="bg-gray-100 w-full">
                                        <tr>
                                            <th className="px-6 py-3 border-b w-1/4">Student</th>
                                            <th className="px-6 py-3 border-b w-1/4">School</th>
                                            <th className="px-6 py-3 border-b w-1/4">Parents Cont.</th>
                                            <th className="px-6 py-3 border-b w-1/4">Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.length > 0 ? (
                                            students.map((student) => (
                                                <tr key={student.id} className="hover:bg-gray-200">
                                                    <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                        <div className="w-full">{student.Child}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                        <div className="w-full">{student.School || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                        <div className="w-full">{student.Contact || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                        <div className="w-full">{student.Address || 'N/A'}</div>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="px-5 py-3 text-center font-semibold text-gray-500">
                                                    No students added yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
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
                        </div>

                    </div>

                    {/* Add div */}
                    <div className="add bg-[#b5c2ca] h-[41.5%] w-full rounded-2xl flex">

                        {/* Adcr Div */}
                        <div
                            className={`adcr bg-white ${isAdcrExpanded ? 'w-full mr-0 rounded-tr-2xl rounded-br-2xl px-[2%] py-[24px] relative' : isAdchldExpanded || isOrangeExpanded ? 'w-0 border-none' : 'w-[55%] mr-[4px] px-[16px] py-[24px]'} h-full rounded-tl-2xl rounded-bl-2xl transition-all duration-500 ease-in-out overflow-y-auto scrollbar-hidden rounded-[12px] border-[1px] border-black`}
                            onClick={isAdcrExpanded ? undefined : handleAdcrExpand}
                        >
                            {isAdcrExpanded ? (
                                <>
                                    <span
                                        className="absolute top-[9px] left-[13px] text-[22px] font-bold text-black cursor-pointer"
                                        onClick={handleAdcrExpand}
                                        role="button"
                                        aria-label="Close"
                                    >
                                        &times;
                                    </span>

                                    <div className='mb-[4%] flex justify-center'><h1 className='text-[18px] font-bold'>Add Car</h1> </div>
                                    <form onSubmit={handleCarSubmit} className="max-w-[48rem] mx-auto">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="floating_email" onChange={handleCarChange} value={carForm.carName} id="carName" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="carName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CarName</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="License" onChange={handleCarChange} value={carForm.License} id="License" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="License" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">License</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="repeat_password" onChange={handleCarChange} value={carForm.Seats} id="Seats" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="Seats" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Seats</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="driverName" onChange={handleCarChange} value={carForm.driverName} id="driverName" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="driverName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Driver</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="driverCont" onChange={handleCarChange} value={carForm.driverCont} id="driverCont" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="driverCont" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DriverCont</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="Password" onChange={handleCarChange} value={carForm.Password} id="Password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="Password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                        </div>

                                        <div className='flex justify-center mt-[6px]' >
                                            <button type="submit" onClick={handleCarSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className='mb-[10%] ml-[41%]'><h1 className='text-[18px] font-bold'>Add Car</h1> </div>
                                    <form>
                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="floating_email" onChange={handleCarChange} value={carForm.carName} id="carName" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="carName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CarName</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="License" onChange={handleCarChange} value={carForm.License} id="License" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="License" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">License</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="repeat_password" onChange={handleCarChange} value={carForm.Seats} id="Seats" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="Seats" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Seats</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="driverName" onChange={handleCarChange} value={carForm.driverName} id="driverName" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="driverName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Driver</label>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* Adchld Div */}
                        <div
                            className={`adchld bg-white ${isAdchldExpanded ? 'w-full rounded-tl-2xl rounded-bl-2xl px-[8%] py-[24px] relative' : isAdcrExpanded || isOrangeExpanded ? 'w-0 border-none' : 'w-[55%] px-[16px] py-[24px]'} h-full rounded-tr-2xl rounded-br-2xl transition-all duration-500 ease-in-out overflow-y-auto scrollbar-hidden rounded-[12px] border-[1px] border-black`}
                            onClick={isAdchldExpanded ? undefined : handleAdchldExpand}
                        >
                            {isAdchldExpanded ? (
                                <>
                                    <span
                                        className="absolute top-[9px] left-[13px] text-[22px] font-bold text-black cursor-pointer"
                                        onClick={handleAdchldExpand}
                                        role="button"
                                        aria-label="Close"
                                    >
                                        &times;
                                    </span>
                                    <div className='mb-[4%] flex justify-center'><h1 className='text-[18px] font-bold'>Add Child</h1> </div>
                                    <form onSubmit={handleStudentSubmit} className="max-w-[48rem] mx-auto">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="Child" onChange={handleStudentChange} value={studentForm.Child} id="Child" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="Child" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Child</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="School" onChange={handleStudentChange} value={studentForm.School} id="School" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="School" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">School</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="Contact" onChange={handleStudentChange} value={studentForm.Contact} id="Contact" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="Contact" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="Address" onChange={handleStudentChange} value={studentForm.Address} id="Address" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="Address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" name="License" onChange={handleStudentChange} value={studentForm.License} id="License" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                            <label htmlFor="License" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">License</label>
                                        </div>


                                        <div className='flex justify-center mt-[6px]'>
                                            <button type="submit" onClick={handleStudentSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className='mb-[10%] ml-[41%]'><h1 className='text-[18px] font-bold'>Add Child</h1> </div>
                                    <form>
                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="Child" onChange={handleStudentChange} value={studentForm.Child} id="Child" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="Child" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Child</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="School" onChange={handleStudentChange} value={studentForm.School} id="School" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="School" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">School</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="Contact" onChange={handleStudentChange} value={studentForm.Contact} id="Contact" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="Contact" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input type="text" name="Address" onChange={handleStudentChange} value={studentForm.Address} id="Address" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="Address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
