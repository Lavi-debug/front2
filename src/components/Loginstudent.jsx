// import React, { useState, useEffect } from 'react';
// import Students from './Students';

// const Loginstudent = () => {
//   const [contact, setContact] = useState('');
//   const [license, setLicense] = useState('');
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showParents, setShowParents] = useState(false);

//   const host = "https://logi-52ys.onrender.com";

//   useEffect(() => {
//     const fetchAllStudents = async () => {
//       try {
//         const response = await fetch(`${host}/api/student/fetchallstudents`);
//         if (!response.ok) throw new Error("Failed to fetch students");
        
//         const data = await response.json();
//         console.log("Fetched students:", data); // Log fetched data to check structure
//         setStudents(data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchAllStudents();
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const trimmedLicense = license.trim();
//     const trimmedContact = contact.trim();

//     const foundStudents = students.filter(student =>
//       student.License === trimmedLicense && student.Contact === trimmedContact
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
//           <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">Welcome Student</h1>
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
//         <Students license={license} contact={contact} />
//       )}
//     </div>
//   );
// };

// export default Loginstudent;


import React, { useState, useEffect } from 'react';
import Students from './Students';

const Loginstudent = () => {
  const [contact, setContact] = useState('');
  const [license, setLicense] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showParents, setShowParents] = useState(false);

  const host = "https://logi-xslb.onrender.com";

  // Check localStorage for persisted login state
  useEffect(() => {
    const storedContact = localStorage.getItem('Scontact');
    const storedLicense = localStorage.getItem('Slicense');

    if (storedContact && storedLicense) {
      setContact(storedContact);
      setLicense(storedLicense);
      setShowParents(true); // Automatically show the Students component
    }
  }, []);

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
      localStorage.setItem('Scontact', trimmedContact); // Persist contact
      localStorage.setItem('Slicense', trimmedLicense); // Persist license
    } else {
      setErrorMessage('Invalid details. Please check the contact and bus number.');
      setFilteredStudents([]);
      setShowParents(false);
    }
  };

  const handleLogout = () => {
    setShowParents(false);
    setContact('');
    setLicense('');
    localStorage.removeItem('Scontact'); // Clear contact from localStorage
    localStorage.removeItem('Slicense'); // Clear license from localStorage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#b5c2ca]">
      {!showParents ? (
        <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">Welcome Student</h1>
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
        <Students license={license} contact={contact} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Loginstudent;
