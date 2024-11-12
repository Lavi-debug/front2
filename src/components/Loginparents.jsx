// import React, { useState, useEffect } from 'react';
// import Parentscopy from './Parentscopy';
// import Parents from './Parents';

// const Loginparents = () => {
//   const [contact, setContact] = useState('');
//   const [license, setLicense] = useState('');
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showParents, setShowParents] = useState(false);

//   const host = "http://localhost:5000";

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

//   useEffect(() => {
//     fetchAllStudents();
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Filter students by license and contact
//     const foundStudents = students.filter(student =>
//       student.License === license && student.Contact === contact
//     );

//     if (foundStudents.length > 0) {
//       setFilteredStudents(foundStudents);
//       setShowParents(true);
//       setErrorMessage(''); // Clear error message
//     } else {
//       setErrorMessage('Please check the values, or the student might not exist.');
//       setFilteredStudents([]);
//       setShowParents(false); // Hide Parentscopy component
//     }
//   };

//   return (
//     // <>
//     // <div className="flex flex-col items-center justify-center h-screen bg-white">
//     //   {!showParents ? (
//     //     <div className="login-container w-[40%] h-[50%] p-[20px] border-[2px] border-black rounded-[10px] bg-gray-200">
//     //       <div className="hdng text-[25px] font-semibold mb-[28px]"><h1>Welcome Parents</h1></div>
//     //       <div className=''>
//     //         <form onSubmit={handleLogin} class="max-w-md mx-auto" >
//     //           <div class="relative z-0 w-full mb-5 group">
//     //               <input value={contact} onChange={(e) => setContact(e.target.value)} type="text" name="contact" id="contact" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//     //               <label for="contact" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
//     //           </div>
//     //           <div class="relative z-0 w-full mb-5 group">
//     //               <input value={license} onChange={(e) => setLicense(e.target.value)} type="text" name="license" id="license" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//     //               <label for="license" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
//     //           </div>

//     //           <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//     //         </form>
//     //       </div>
//     //     </div>
//     //   ) : (
//     //     <Parentscopy license={license} contact={contact}/>
//     //   )}
//     // </div>
//     // </>
//     <>
//       <div className="flex flex-col items-center justify-center h-screen bg-[#b5c2ca]">
//         {!showParents ? (
//           <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//             <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//               <h1>Welcome Parents</h1>
//             </div>
//             <div className=''>
//               <form onSubmit={handleLogin} className="max-w-md mx-auto">
//                 <div className="relative z-0 w-full mb-5 group">
//                   <input
//                     value={contact}
//                     onChange={(e) => setContact(e.target.value)}
//                     type="text"
//                     name="contact"
//                     id="contact"
//                     className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                     placeholder=" "
//                     required
//                   />
//                   <label
//                     htmlFor="contact"
//                     className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
//                     Contact no
//                   </label>
//                 </div>
//                 <div className="relative z-0 w-full mb-5 group">
//                   <input
//                     value={license}
//                     onChange={(e) => setLicense(e.target.value)}
//                     type="text"
//                     name="license"
//                     id="license"
//                     className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                     placeholder=" "
//                     required
//                   />
//                   <label
//                     htmlFor="license"
//                     className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
//                     Bus no.
//                   </label>
//                 </div>

//                 <button
//                   type="submit"
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center md:w-auto">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <Parents license={license} contact={contact} />
//         )}
//       </div>
//     </>

//   );
// };

// export default Loginparents;



// import React, { useState, useEffect } from 'react';
// import Parents from './Parents';

// const Loginparents = () => {
//   const [contact, setContact] = useState('');
//   const [license, setLicense] = useState('');
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showParents, setShowParents] = useState(false);

//   const host = "http://localhost:5000";

//   useEffect(() => {
//     const fetchAllStudents = async () => {
//       try {
//         const response = await fetch(`${host}/api/student/fetchallstudents`);
//         if (!response.ok) throw new Error("Failed to fetch students");
        
//         const data = await response.json();
//         setStudents(data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchAllStudents();
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const foundStudents = students.filter(student =>
//       student.License === license && student.Contact === contact
//     );

//     if (foundStudents.length > 0) {
//       setFilteredStudents(foundStudents);
//       setShowParents(true);
//       setErrorMessage('');
//     } else {
//       setErrorMessage('Invalid details. Please check the contact and bus number.');
//       setFilteredStudents([]);
//       setShowParents(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#b5c2ca]">
//       {!showParents ? (
//         <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//           <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">Welcome Parents</h1>
//           <form onSubmit={handleLogin} className="max-w-md mx-auto">
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 value={contact}
//                 onChange={(e) => setContact(e.target.value)}
//                 type="text"
//                 id="contact"
//                 className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="contact"
//                 className="absolute text-sm text-black transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
//                 Contact No
//               </label>
//             </div>
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 value={license}
//                 onChange={(e) => setLicense(e.target.value)}
//                 type="text"
//                 id="license"
//                 className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="license"
//                 className="absolute text-sm text-black transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
//                 Bus No.
//               </label>
//             </div>
//             {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
//             <button
//               type="submit"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
//               Submit
//             </button>
//           </form>
//         </div>
//       ) : (
//         <Parents license={license} contact={contact} />
//       )}
//     </div>
//   );
// };
 
// export default Loginparents;

import React, { useState, useEffect } from 'react';
import Parents from './Parents';

const Loginparents = () => {
  const [contact, setContact] = useState('');
  const [license, setLicense] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showParents, setShowParents] = useState(false);

  const host = "http://localhost:5000";

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await fetch(`${host}/api/student/fetchallstudents`);
        if (!response.ok) throw new Error("Failed to fetch students");
        
        const data = await response.json();
        console.log("Fetched students:", data); // Log fetched data to check structure
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchAllStudents();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedLicense = license.trim();
    const trimmedContact = contact.trim();

    const foundStudents = students.filter(student =>
      student.License === trimmedLicense && student.Contact === trimmedContact
    );

    if (foundStudents.length > 0) {
      setFilteredStudents(foundStudents);
      setShowParents(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid details. Please check the contact and bus number.');
      setFilteredStudents([]);
      setShowParents(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#b5c2ca]">
      {!showParents ? (
        <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">Welcome Parents</h1>
          <form onSubmit={handleLogin} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="text"
                id="contact"
                className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="contact"
                className="absolute text-sm text-black transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
                Contact No
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                type="text"
                id="license"
                className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="license"
                className="absolute text-sm text-black transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100">
                Bus No.
              </label>
            </div>
            {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <Parents license={license} contact={contact} />
      )}
    </div>
  );
};

export default Loginparents;
