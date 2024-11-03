import React, { useState, useEffect, useRef } from "react"

const sample = () => {
    const host = "http://localhost:5000";
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const toggleStudentModal = () => setIsStudentModalOpen(!isStudentModalOpen);
    const [isCarModalOpen, setIsCarModalOpen] = useState(false);
    const toggleCarModal = () => setIsCarModalOpen(!isCarModalOpen);
    const [isDriverExpanded, setIsDriverExpanded] = useState(false);
    const [isChildExpanded, setIsChildExpanded] = useState(false);
    const [isAdcrExpanded, setIsAdcrExpanded] = useState(false);
    const [isAdchldExpanded, setIsAdchldExpanded] = useState(false);
    const [isOrangeExpanded, setIsOrangeExpanded] = useState(false);
    const [carForm, setCarForm] = useState({ carName: '', License: '', Seats: '', driverName: '', driverCont: '', Password: '' });
    const [studentForm, setStudentForm] = useState({ Child: '', School: '', Contact: '', Address: '', License: '' });
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({ eChild: '', eSchool: '', eContact: '', eAddress: '', eLicense: '' });
    const [car, setCar] = useState({ ecarName: '', eSeats: '', eLicense: '', edriverName: '', edriverCont: '', ePassword: '' });
    const [cars, setCars] = useState([]);
    const ref = useRef(null);
    const carref = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        // Load the Google Maps script
        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => resolve();
                document.body.appendChild(script);
            });
        };

        const initMap = () => {
            // Create a new map instance
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 }, // Default center coordinates
                zoom: 8, // Default zoom level
            });
        };

        const googleMapsAPIKey = "AIzaSyCtz_FAqLXK9qpsWlAFJJwh0PdEd5icXTc"; // Replace with your API key
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}`)
            .then(() => {
                initMap();
            })
            .catch((error) => {
                console.error("Error loading Google Maps script", error);
            });
    }, []);

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

    const handleCarChange = (e) => {
        const { id, value } = e.target;
        setCarForm((carForm) => ({
            ...carForm,
            [id]: value
        }));
    };

    const handleStudentChange = (e) => {
        const { id, value } = e.target;
        setStudentForm((studentForm) => ({
            ...studentForm,
            [id]: value
        }));
    };

    // Fetch all students
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


    const handleStudentSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        console.log("Submitting student data:", studentForm); // Log form data for debugging

        try {
            await addStudent(
                studentForm.Child,
                studentForm.School,
                studentForm.Contact,
                studentForm.Address,
                studentForm.License
            ); // Call addStudent function
            setStudentForm({ Child: "", School: "", Contact: "", Address: "", License: "" }); // Clear form fields
        } catch (error) {
            console.error("Error adding student:", error); // Log any errors that occur
        }
    };

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

    const handleCarSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        console.log("Submitting car data:", carForm); // Log form data for debugging

        try {
            await addCar(
                carForm.carName,
                carForm.Seats,
                carForm.License,
                carForm.driverName,
                carForm.driverCont,
                carForm.Password
            ); // Call addCar function
            setCarForm({ carName: "", License: "", Seats: "", driverName: "", driverCont: "", Password: "" }); // Clear form fields
        } catch (error) {
            console.error("Error adding car:", error); // Log any errors that occur
        }
    };

    // const deleteStudent = (studentId) => {
    //     // Remove the student from state
    //     console.log(studentId)
    //     const updatedStudents = students.filter(student => student.id !== studentId);
    //     setStudents(updatedStudents);

    //     // Optional: Make an API call to delete the student from the database
    //     fetch(`${host}/api/student/deletestudent/${studentId}`, {
    //         method: 'DELETE',
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Failed to delete student');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Student deleted successfully:', data);
    //     })
    //     .catch(error => {
    //         console.error('Error deleting student:', error);
    //     });
    // };

    const deleteStudent = async (studentId) => {
        try {
            // Make an API call to delete the student from the database
            const response = await fetch(`${host}/api/student/deletestudent/${studentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            // Remove the student from state only after successful deletion
            const updatedStudents = students.filter(student => student.id !== studentId);
            setStudents(updatedStudents);
            console.log('Student deleted successfully');
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const deleteCar = (carId) => {
        // Remove the car from state
        const updatedCars = cars.filter(car => car.id !== carId);
        setCars(updatedCars);

        // Make an API call to delete the car from the database
        fetch(`${host}/api/auth/deletecar/${carId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete car');
                }
                return response.json();
            })
            .then(data => {
                console.log('Car deleted successfully:', data);
            })
            .catch(error => {
                console.error('Error deleting car:', error);
            });
    };


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
        e.preventDefault()
    }

    const updateStudent = async (student) => {
        // Open the modal first
        ref.current.click();
        console.log(student);

        // Prepare the data to be sent
        setStudent({ id: student._id, eChild: student.Child, eSchool: student.School, eContact: student.Contact, eAddress: student.Address, eLicense: student.License })
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
            if (element._id === id) {
                newStudents[index].Child = Child;
                newStudents[index].School = School;
                newStudents[index].Contact = Contact;
                newStudents[index].Address = Address;
                newStudents[index].License = License;
                break;
            };
        }
        setStudents(newStudents);
    }

    //   const handleeCarChange = (e) => {
    //     const { id, value } = e.target;
    //     setCar((car) => ({
    //         ...car,
    //         [id]: value
    //     }));
    // };

    // const handleeCarSubmit = (e) => {
    //     console.log("updating car")
    //     editCar(car.id, car.ecarName, car.eSeats, car.eLicense, car.edriverName, car.edriverCont, car.ePassword)
    //     e.preventDefault()
    // }

    const handleeCarChange = (e) => {
        const { id, value } = e.target;
        console.log(`Changing ${id} to ${value}`); // Log the changes
        setCar((prevCar) => ({
            ...prevCar,
            [id]: value,
        }));
    };

    // Handler for Car Form Submit
    const handleeCarSubmit = (e) => {
        console.log('Car Form Submitted');
        editCar(car.id, car.ecarName, car.eSeats, car.eLicense, car.edriverName, car.edriverCont, car.ePassword)
        toggleCarModal();
        e.preventDefault();
    };

    const updateCar = async (car) => {

        carref.current.click();
        console.log(car);

        // Prepare the data to be sent
        setCar({ id: car._id, ecarName: car.carName, eSeats: car.Seats, eLicense: car.License, edriverName: car.driverName, edriverCont: car.driverCont, ePassword: car.Password })
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
            if (element._id === id) {
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
    }

    useEffect(() => {
        getStudents();
    }, []);

    useEffect(() => {
        getCars();
    }, [])


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
                    <div className="fd bg-[#b5c2ca] h-[100%] w-[100%] rounded-2xl mt-[10px] border-[2px] border-[black]">
                        <div ref={mapRef} className="map bg-blue-200 h-[54%] w-full rounded-tl-[12px] rounded-tr-[12px] mb-[2px]">
                            {/* Map will be displayed here */}
                        </div>
                        <div className="srch bg-white h-[45.5%] w-full px-[5%] py-[2%] rounded-bl-[12px] rounded-br-[12px] overflow-y-auto scrollbar-hidden">
                            <div className="optconta">
                                {cars.map((car) => (
                                    <div key={car.id} className='flex items-center mb-[10px] hover:bg-gray-50'>
                                        <div className="log">
                                            <div className="tt bg-red-400 w-[36px] h-[36px] rounded-[50px]"></div>
                                        </div>
                                        <div className="drvrnm text-[14px] font-semibold pl-[18px] pr-[30px] w-[25%] text-black">
                                            <h1>{car.driverName}</h1>
                                        </div>
                                        <div className="std text-[14px] font-semibold w-[25%] text-black">
                                            <h1>{car.carName}</h1>
                                        </div>
                                        <div className="stst w-[52%] flex justify-end pr-[10px]">
                                            <div className='text-[14px] font-semibold text-black'>
                                                <h1>{car.License}</h1>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right w-[60%] py-2 pr-2">
                    <div className="allst bg-[#b5c2ca] h-[53%] w-full mt-[5px] mb-[4px] rounded-2xl flex relative">

                        {/* Car div */}

                        <div
                            className={`cardata ${isDriverExpanded ? 'w-full absolute' : 'w-[44%] relative'} h-full transition-all duration-500 mr-[6px] overflow-y-auto scrollbar-hidden bg-white`}
                            onClick={!isDriverExpanded ? handleDriverExpand : undefined}
                            style={{ zIndex: isDriverExpanded ? 10 : 'auto' }}
                        >
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
                                    {/* <tbody>
                                {cars.map((car) => (
                                        <tr key={car.id} className="hover:bg-gray-50">
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                <div className="w-[100px]">{car.carName}</div>
                                            </td>
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                <div className="w-[100px]">{car.License}</div>
                                            </td>
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-[100px] break-words">
                                                <div className="w-[100px]">{car.Seats}</div>
                                            </td>
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                <div className="w-[100px]">{car.driverName}</div>
                                            </td>
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                <div className="w-[100px]">{car.driverCont}</div>
                                            </td>
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                <div className="w-[100px]">{car.Password}</div>
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
                                                    <div className="mr-[10px]" onClick={() => deleteCar(car._id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/vlnvqvew.json"
                                                            trigger="hover"
                                                            style={{ "width": "20px", "height": "20px" }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}

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
                                                        <div className="w-[100px]">{car.License}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b font-semibold text-[12px] w-[100px] break-words">
                                                        <div className="w-[100px]">{car.Seats}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                        <div className="w-[100px]">{car.driverName}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                        <div className="w-[100px]">{car.driverCont}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b font-semibold text-[12px] w-[150px] break-words">
                                                        <div className="w-[100px]">{car.Password}</div>
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
                                                            <div className="mr-[10px]" onClick={() => deleteCar(car._id)}>
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
                            ) : (
                                <table className="w-full h-full text-sm text-left text-gray-500 border-collapse table-fixed">
                                    <thead className="bg-gray-100 w-full">
                                        <tr className="w-full">
                                            <th className="px-6 py-3 border-b w-1/3">
                                                <div>Car Name</div>
                                            </th>
                                            <th className="px-6 py-3 border-b w-1/3">Driver</th>
                                            <th className="px-6 py-3 border-b w-1/3">Contact</th>
                                        </tr>
                                    </thead>
                                    {/* <tbody>
                                    {cars.map((car) => (
                                        <tr key={car.id} className="hover:bg-gray-50">
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-1/3">{car.carName}</td>
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-1/3">{car.driverName}</td>
                                            <td className="px-5 py-3 border-b font-semibold text-[12px] w-1/3">{car.driverCont}</td>
                                        </tr>
                                    ))}
                                </tbody> */}

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
                            className={`chlddata ${isChildExpanded ? 'w-full absolute right-0' : 'w-[56%] relative'} h-full transition-all duration-500 overflow-y-auto scrollbar-hidden bg-white`}
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
                                <table className="w-full h-full text-sm text-left text-gray-800 border-collapse table-fixed">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Student</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">School</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Parents Cont.</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Address</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Status</th>
                                            <th className="px-6 py-3 border-b border-gray-300 w-1/4">Edit</th>
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
                                                    <td className="px-5 py-3 border-b border-gray-300 font-semibold text-[12px] w-1/4 break-words">
                                                        <div className="w-full">{student._id}</div>
                                                    </td>
                                                    <td className="px-5 py-3 border-b font-semibold text-[12px] break-words">
                                                        <div className="flex">
                                                            <div className="mr-[10px]" onClick={() => updateStudent(student)}>
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/oqaajvyl.json"
                                                                    trigger="hover"
                                                                    style={{ "width": "20px", "height": "20px" }}
                                                                ></lord-icon>
                                                            </div>
                                                            <div className="mr-[10px]" onClick={() => deleteStudent(student._id)}>
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
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="px-5 py-3 text-center font-semibold text-gray-500">
                                                    No students added yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

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
                        </div>
                    </div>
                    <div className="add bg-[#b5c2ca] h-[42%] w-full rounded-2xl flex">
                        {/* Adcr Div */}
                        <div
                            className={`adcr bg-white ${isAdcrExpanded ? 'w-full mr-0 rounded-tr-2xl rounded-br-2xl px-[8%] py-[24px] relative' : isAdchldExpanded || isOrangeExpanded ? 'w-0' : 'w-[55%] mr-2 px-[16px] py-[24px]'} h-full rounded-tl-2xl rounded-bl-2xl transition-all duration-500 ease-in-out overflow-y-auto scrollbar-hidden `}
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
                                    <form onSubmit={handleCarSubmit}>
                                        <div className="">
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleCarChange} value={carForm.carName} id="carName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Car" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleCarChange} value={carForm.License} id="License" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="License" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleCarChange} value={carForm.Seats} id="Seats" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Seats" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleCarChange} value={carForm.driverName} id="driverName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Driver" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleCarChange} value={carForm.driverCont} id="driverCont" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Driver-Contact" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleCarChange} value={carForm.Password} id="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                                            </div>
                                        </div>

                                        <div className='flex justify-center mt-[6px]' onClick={handleCarSubmit}>
                                            <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Save
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className='mb-[10%] ml-[41%]'><h1 className='text-[18px] font-bold'>Add Car</h1> </div>
                                    <form>
                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div>
                                                <input type="text" id="Car-Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Car" required />
                                            </div>
                                            <div>
                                                <input type="text" id="License No." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="License" required />
                                            </div>
                                            <div>
                                                <input type="text" id="Driver" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Driver" required />
                                            </div>
                                            <div>
                                                <input type="text" id="Contact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact" required />
                                            </div>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* Adchld Div */}
                        <div
                            className={`adchld bg-white ${isAdchldExpanded ? 'w-full rounded-tl-2xl rounded-bl-2xl px-[8%] py-[24px] relative' : isAdcrExpanded || isOrangeExpanded ? 'w-0' : 'w-[55%] px-[16px] py-[24px]'} h-full rounded-tr-2xl rounded-br-2xl transition-all duration-500 ease-in-out overflow-y-auto scrollbar-hidden`}
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
                                    <form onSubmit={handleStudentSubmit}>
                                        <div className="">
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleStudentChange} value={studentForm.Child} id="Child" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Child" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleStudentChange} value={studentForm.School} id="School" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="School" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleStudentChange} value={studentForm.Contact} id="Contact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Parents-Cotact" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleStudentChange} value={studentForm.Address} id="Address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required />
                                            </div>
                                            <div className='mb-[12px]'>
                                                <input type="text" onChange={handleStudentChange} value={studentForm.License} id="License" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bus (License No.)" required />
                                            </div>

                                        </div>

                                        <div className='flex justify-center mt-[6px]'>
                                            <button type="submit" onClick={handleStudentSubmit} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Save
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className='mb-[10%] ml-[41%]'><h1 className='text-[18px] font-bold'>Add Child</h1> </div>
                                    <form>
                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div>
                                                <input type="text" id="Child" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Child" required />
                                            </div>
                                            <div>
                                                <input type="text" id="School" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="School" required />
                                            </div>
                                            <div>
                                                <input type="text" id="Parents-Cotact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Parents-Cotact" required />
                                            </div>
                                            <div>
                                                <input type="text" id="Parents-Email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Parents-Email" required />
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

export default sample;

