// import React, { useState } from 'react';
// import Driver from './Driver';

// const Logindriver = () => {
//   const [license, setLicense] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const host = "http://localhost:5000"; // Define your backend host

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (license) {
//       try {
//         // Check if the license exists in the auth endpoint
//         const authResponse = await fetch(`${host}/api/auth/${license}`);
        
//         // Check if the license exists in the Student endpoint
//         const studentResponse = await fetch(`${host}/api/student/${license}`);

//         // If none of the responses are OK, display error
//         if (!authResponse.ok && !studentResponse.ok) {
//           setErrorMessage("Wrong Credentials");
//           setIsLoggedIn(false);
//           return;
//         }

//         // If everything is valid, log in
//         setIsLoggedIn(true);
//         setErrorMessage(""); // Clear any previous error message
//       } catch (error) {
//         console.error("Error during login:", error);
//         setErrorMessage("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (

// <>
//   <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
//     {!isLoggedIn ? (
//       <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//       <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//         <h1>Welcome Driver</h1>
//       </div>
//       <div className=''>
//       <form onSubmit={handleLogin} className="max-w-md mx-auto">
//       <div className="relative z-0 w-full mb-6 group">
//         <input
//           value={license}
//           onChange={(e) => setLicense(e.target.value)}
//           type="text"
//           name="license"
//           id="license"
//           className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//           placeholder=" "
//           required
//         />
//         <label
//           htmlFor="license"
//           className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
//         >
//           License
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center md:w-auto"
//       >
//         Submit
//       </button>
//     </form>
//       </div>
//     </div>
//     ) : (
//       <Driver license={license} />
//     )}
//   </div>
// </>

//   );
// };

// export default Logindriver;



// import React, { useState } from 'react';
// import Driver from './Driver';

// const Logindriver = () => {
//   const [license, setLicense] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const host = "http://localhost:5000"; // Define your backend host

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (license) {
//       try {
//         // Check if the license exists in the auth endpoint
//         const authResponse = await fetch(`${host}/api/auth/${license}`);
        
//         // Check if the license exists in the Student endpoint
//         const studentResponse = await fetch(`${host}/api/student/${license}`);

//         // If none of the responses are OK, display error
//         if (!authResponse.ok && !studentResponse.ok) {
//           setErrorMessage("Wrong credentials. Please check the license.");
//           setIsLoggedIn(false);
//           return;
//         }

//         // If everything is valid, log in
//         setIsLoggedIn(true);
//         setErrorMessage(""); // Clear any previous error message
//       } catch (error) {
//         console.error("Error during login:", error);
//         setErrorMessage("Something went wrong. Please try again.");
//       }
//     } else {
//       setErrorMessage("License field cannot be empty."); // Prompt for missing input
//     }
//   };

//   return (
//     <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
//       {!isLoggedIn ? (
//         <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//           <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//             <h1>Welcome Driver</h1>
//           </div>
//           <form onSubmit={handleLogin} className="max-w-md mx-auto">
//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 value={license}
//                 onChange={(e) => setLicense(e.target.value)}
//                 type="text"
//                 name="license"
//                 id="license"
//                 className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="license"
//                 className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
//               >
//                 License
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center md:w-auto"
//             >
//               Submit
//             </button>
//           </form>
//           {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
//         </div>
//       ) : (
//         <Driver license={license} />
//       )}
//     </div>
//   );
// };

// export default Logindriver;


// import React, { useState } from 'react';
// import Driver from './Driver';

// const Logindriver = () => {
//   const [license, setLicense] = useState('');
//   const [password, setPassword] = useState(''); // New state for password
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const host = "http://localhost:5000"; // Define your backend host

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (license && password) {
//       try {
//         // Fetch all cars
//         const carsResponse = await fetch(`${host}/api/auth/fetchallcars`);
//         const carsData = await carsResponse.json(); // Get the cars data from the response

//         if (!carsResponse.ok) {
//           setErrorMessage("Error fetching car data. Please try again.");
//           setIsLoggedIn(false);
//           return;
//         }

//         // Find the car that matches the entered license
//         const car = carsData.find(car => car.License === license);

//         if (!car) {
//           setErrorMessage("Car not found. Please check the license.");
//           setIsLoggedIn(false);
//           return;
//         }

//         // Match the entered password with the password in the found car data
//         if (car.Password !== password) {
//           setErrorMessage("Wrong credentials. Please check the license and password.");
//           setIsLoggedIn(false);
//           return;
//         }

//         // If everything is valid, log in
//         setIsLoggedIn(true);
//         setErrorMessage(""); // Clear any previous error message
//       } catch (error) {
//         console.error("Error during login:", error);
//         setErrorMessage("Something went wrong. Please try again.");
//       }
//     } else {
//       setErrorMessage("Both fields are required.");
//     }
//   };

//   return (
//     <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
//       {!isLoggedIn ? (
//         <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//           <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//             <h1>Welcome Driver</h1>
//           </div>
//           <form onSubmit={handleLogin} className="max-w-md mx-auto">
//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 value={license}
//                 onChange={(e) => setLicense(e.target.value)}
//                 type="text"
//                 name="license"
//                 id="license"
//                 className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="license"
//                 className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
//               >
//                 License
//               </label>
//             </div>

//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="text"  // Changed to password type for security
//                 name="password"
//                 id="password"
//                 className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="password"
//                 className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
//               >
//                 Password
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center md:w-auto"
//             >
//               Submit
//             </button>
//           </form>

//           {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
//         </div>
//       ) : (
//         <Driver license={license} />
//       )}
//     </div>
//   );
// };

// export default Logindriver;




// import React, { useState, useEffect } from "react";
// import Driver from "./Driver";

// const Logindriver = () => {
//   const [license, setLicense] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const host = "http://localhost:5000"; // Define your backend host

//   // Check login status on component mount
//   useEffect(() => {
//     const savedLoginStatus = localStorage.getItem("isDriverLoggedIn") === "true";
//     const savedLicense = localStorage.getItem("driverLicense");

//     if (savedLoginStatus && savedLicense) {
//       setIsLoggedIn(true);
//       setLicense(savedLicense);
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (license && password) {
//       try {
//         // Fetch all cars
//         const carsResponse = await fetch(`${host}/api/auth/fetchallcars`);
//         const carsData = await carsResponse.json();

//         if (!carsResponse.ok) {
//           setErrorMessage("Error fetching car data. Please try again.");
//           return;
//         }

//         // Find the car that matches the entered license
//         const car = carsData.find((car) => car.License === license);

//         if (!car) {
//           setErrorMessage("Car not found. Please check the license.");
//           return;
//         }

//         // Match the entered password
//         if (car.Password !== password) {
//           setErrorMessage("Wrong credentials. Please check the license and password.");
//           return;
//         }

//         // If valid, log in and save to localStorage
//         setIsLoggedIn(true);
//         setErrorMessage("");
//         localStorage.setItem("isDriverLoggedIn", "true");
//         localStorage.setItem("driverLicense", license);
//       } catch (error) {
//         console.error("Error during login:", error);
//         setErrorMessage("Something went wrong. Please try again.");
//       }
//     } else {
//       setErrorMessage("Both fields are required.");
//     }
//   };

//   const handleLogout = () => {
//     // Clear localStorage and state
//     localStorage.removeItem("isDriverLoggedIn");
//     localStorage.removeItem("driverLicense");
//     setIsLoggedIn(false);
//     setLicense("");
//   };

//   return (
//     <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
//       {!isLoggedIn ? (
//         <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//           <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//             <h1>Welcome Driver</h1>
//           </div>
//           <form onSubmit={handleLogin} className="max-w-md mx-auto">
//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 value={license}
//                 onChange={(e) => setLicense(e.target.value)}
//                 type="text"
//                 name="license"
//                 id="license"
//                 className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="license"
//                 className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
//               >
//                 License
//               </label>
//             </div>

//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="text"
//                 name="password"
//                 id="password"
//                 className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="password"
//                 className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
//               >
//                 Password
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center md:w-auto"
//             >
//               Submit
//             </button>
//           </form>

//           {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
//         </div>
//       ) : (
//         <Driver license={license} onLogout={handleLogout} />
//       )}
//     </div>
//   );
// };

// export default Logindriver;



// import React, { useState } from 'react';
// import Driver from './Driver';

// const Logindriver = () => {
//   const [license, setLicense] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const host = "http://localhost:5000";

//   const updateStatus = async (status) => {
//     try {
//       const response = await fetch(`${host}/api/auth/updatestatus/${license}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ Status: status }),
//       });

//       if (!response.ok) {
//         console.error("Failed to update status");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (license && password) {
//       try {
//         const carsResponse = await fetch(`${host}/api/auth/fetchallcars`);
//         const carsData = await carsResponse.json();

//         if (!carsResponse.ok) {
//           setErrorMessage("Error fetching car data. Please try again.");
//           setIsLoggedIn(false);
//           return;
//         }

//         const car = carsData.find((car) => car.License === license);

//         if (!car) {
//           setErrorMessage("Car not found. Please check the license.");
//           setIsLoggedIn(false);
//           return;
//         }

//         if (car.Password !== password) {
//           setErrorMessage("Wrong credentials. Please check the license and password.");
//           setIsLoggedIn(false);
//           return;
//         }

//         setIsLoggedIn(true);
//         setErrorMessage("");

//         // Update status to online
//         await updateStatus("online");
//       } catch (error) {
//         console.error("Error during login:", error);
//         setErrorMessage("Something went wrong. Please try again.");
//       }
//     } else {
//       setErrorMessage("Both fields are required.");
//     }
//   };

//   const handleLogout = async () => {
//     setIsLoggedIn(false);

//     // Update status to offline
//     await updateStatus("offline");
//   };

//   return (
//     <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
//       {!isLoggedIn ? (
//         <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//           <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//             <h1>Welcome Driver</h1>
//           </div>
//           <form onSubmit={handleLogin} className="max-w-md mx-auto">
//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 value={license}
//                 onChange={(e) => setLicense(e.target.value)}
//                 type="text"
//                 name="license"
//                 id="license"
//                 className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="license"
//                 className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
//               >
//                 License
//               </label>
//             </div>
//             <div className="relative z-0 w-full mb-6 group">
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="text"
//                 name="password"
//                 id="password"
//                 className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="password"
//                 className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
//               >
//                 Password
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center md:w-auto"
//             >
//               Submit
//             </button>
//           </form>
//           {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
//         </div>
//       ) : (
//         <div>
//           <Driver license={license} onLogout={handleLogout} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Logindriver;



import React, { useState, useEffect } from 'react';
import Driver from './Driver';

const Logindriver = () => {
  const [license, setLicense] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const host = "https://logi-52ys.onrender.com";

  useEffect(() => {
    // Check localStorage to persist login state
    const storedLicense = localStorage.getItem('license');
    if (storedLicense) {
      setLicense(storedLicense);
      setIsLoggedIn(true);
    }
  }, []);

  const updateStatus = async (status) => {
    try {
      const response = await fetch(`${host}/api/auth/updatestatus/${license}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Status: status }),
      });

      if (!response.ok) {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (license && password) {
      try {
        const carsResponse = await fetch(`${host}/api/auth/fetchallcars`);
        const carsData = await carsResponse.json();

        if (!carsResponse.ok) {
          setErrorMessage("Error fetching car data. Please try again.");
          setIsLoggedIn(false);
          return;
        }

        const car = carsData.find((car) => car.License === license);

        if (!car) {
          setErrorMessage("Car not found. Please check the license.");
          setIsLoggedIn(false);
          return;
        }

        if (car.Password !== password) {
          setErrorMessage("Wrong credentials. Please check the license and password.");
          setIsLoggedIn(false);
          return;
        }

        setIsLoggedIn(true);
        setErrorMessage("");

        // Store license in localStorage
        localStorage.setItem('license', license);

        // Update status to online
        await updateStatus("online");
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("Something went wrong. Please try again.");
      }
    } else {
      setErrorMessage("Both fields are required.");
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);

    // Clear localStorage
    localStorage.removeItem('license');

    // Update status to offline
    await updateStatus("offline");
  };

  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
      {!isLoggedIn ? (
        <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
          <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
            <h1>Welcome Driver</h1>
          </div>
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                type="text"
                name="license"
                id="license"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="license"
                className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
              >
                License
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                name="password"
                id="password"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center md:w-auto"
            >
              Submit
            </button>
          </form>
          {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <Driver license={license} onLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default Logindriver;
