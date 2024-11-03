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



import React, { useState } from 'react';
import Driver from './Driver';

const Logindriver = () => {
  const [license, setLicense] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const host = "https://tracker-backend-qk96.onrender.com"; // Define your backend host

  const handleLogin = async (e) => {
    e.preventDefault();
    if (license) {
      try {
        // Check if the license exists in the auth endpoint
        const authResponse = await fetch(`${host}/api/auth/${license}`);
        
        // Check if the license exists in the Student endpoint
        const studentResponse = await fetch(`${host}/api/student/${license}`);

        // If none of the responses are OK, display error
        if (!authResponse.ok && !studentResponse.ok) {
          setErrorMessage("Wrong credentials. Please check the license.");
          setIsLoggedIn(false);
          return;
        }

        // If everything is valid, log in
        setIsLoggedIn(true);
        setErrorMessage(""); // Clear any previous error message
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("Something went wrong. Please try again.");
      }
    } else {
      setErrorMessage("License field cannot be empty."); // Prompt for missing input
    }
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
        <Driver license={license} />
      )}
    </div>
  );
};

export default Logindriver;
