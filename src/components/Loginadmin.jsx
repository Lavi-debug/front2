// import React, { useState } from 'react';
// import Admin from './Admin';
// import Admincopy from './Admincopy';

// const Loginadmin = () => {
//     const host = "http://localhost:5000";
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission
    
//         try {
//             const response = await fetch(`${host}/api/auth/getuser/${username}`);
//             const data = await response.json();
//             console.log('API Response:', data); // Log the entire response for debugging
    
//             if (response.ok) {
//                 // Check if user exists and compare passwords
//                 if (data.user && data.user.password === password) {
//                     setIsAuthenticated(true); // User is authenticated
//                     setError(''); // Clear any previous error messages
//                 } else {
//                     setError('Incorrect password.'); // Incorrect password
//                 }
//             } else {
//                 setError(data.message); // User not found or other error
//             }
//         } catch (err) {
//             console.error('Error during login:', err);
//             setError('Server error, please try again later.');
//         }
//     };

//     return (
//         <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
//             {!isAuthenticated ? (
//                <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//                <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//                  <h1>Welcome Admin</h1>
//                </div>
//                <div className=''>
//                <form onSubmit={handleSubmit} className="max-w-md mx-auto" >
//                         <div className="relative z-0 w-full mb-5 group">
//                             <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//                             <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">username</label>
//                         </div>
//                         <div className="relative z-0 w-full mb-5 group">
//                             <input value={password} onChange={(e) => setPassword(e.target.value)}  type="text" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
//                             <label htmlFor="license" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
//                         </div>
                        
//                         <button type="password" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//                       </form> 
//                </div>
//              </div> 
             
//             ) : (
//                 <Admin /> // Render Admin component if authenticated
//             )}
//         </div>
//     );
// };

// export default Loginadmin;



// import React, { useState } from 'react';
// import Admin from './Admin';

// const Loginadmin = () => {
//     const host = "http://localhost:5000";
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission

//         try {
//             const response = await fetch(`${host}/api/auth/getuser/${username}`);
//             const data = await response.json();
//             console.log('API Response:', data); // Log the response for debugging

//             if (response.ok) {
//                 // Check if user exists and compare passwords
//                 if (data.user && data.user.password === password) {
//                     setIsAuthenticated(true); // Set to true if authenticated
//                     setError(''); // Clear any error messages
//                 } else {
//                     setError('Incorrect password or username.'); // Set error if incorrect
//                 }
//             } else {
//                 setError('User not found.'); // Set error if user not found
//             }
//         } catch (err) {
//             console.error('Error during login:', err);
//             setError('Server error, please try again later.');
//         }
//     };

//     return (
//         <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
//             {!isAuthenticated ? (
//                 <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//                     <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//                         <h1>Welcome Admin</h1>
//                     </div>
//                     <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//                         <div className="relative z-0 w-full mb-5 group">
//                             <input
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 type="text"
//                                 name="username"
//                                 id="username"
//                                 className="block py-2.5 px-0 w-full bg-gray-200 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                                 placeholder=" "
//                                 required
//                             />
//                             <label htmlFor="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:scale-75">
//                                 Username
//                             </label>
//                         </div>
//                         <div className="relative z-0 w-full mb-5 group">
//                             <input
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type="text"
//                                 name="password"
//                                 id="password"
//                                 className="block py-2.5 px-0 w-full bg-gray-200 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                                 placeholder=" "
//                                 required
//                             />
//                             <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:scale-75">
//                                 Password
//                             </label>
//                         </div>
                        
//                         <button
//                             type="submit"
//                             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
//                             Submit
//                         </button>
//                     </form>
//                     {error && <p className="text-red-600 text-center mt-4">{error}</p>}
//                 </div>
//             ) : (
//                 <Admin /> // Render Admin component if authenticated
//             )}
//         </div>
//     );
// };

// export default Loginadmin;



// 

// import React, { useState } from 'react';
// import Admin from './Admin';

// const Loginadmin = () => {
//     const host = "https://logi-52ys.onrender.com";
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission

//         try {
//             const response = await fetch(`${host}/api/auth/getuser/${username}`);
//             const data = await response.json();
//             console.log('API Response:', data); // Log the response for debugging

//             if (response.ok && data.user) {
//                 // Check if the user exists and compare passwords
//                 if (data.user.password === password) {
//                     setIsAuthenticated(true); // Set to true if authenticated
//                     setError(''); // Clear any error messages
//                 } else {
//                     setError('Incorrect password. Please try again.'); // Set error if password is incorrect
//                 }
//             } else {
//                 setError('Username not found. Please check your credentials.'); // Set error if user not found
//             }
//         } catch (err) {
//             console.error('Error during login:', err);
//             setError('Server error, please try again later.');
//         }
//     };

//     const handleReload = () => {
//         window.location.reload(); // Reload the page
//     };

//     return (
//         <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
//             {!isAuthenticated ? (
//                 <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
//                     <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
//                         <h1>Welcome Admin</h1>
//                     </div>
//                     <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//                         <div className="relative z-0 w-full mb-5 group">
//                             <input
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 type="text"
//                                 name="username"
//                                 id="username"
//                                 className="block py-2.5 px-0 w-full bg-gray-200 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                                 placeholder=" "
//                                 required
//                             />
//                             <label htmlFor="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:scale-75">
//                                 Username
//                             </label>
//                         </div>
//                         <div className="relative z-0 w-full mb-5 group">
//                             <input
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 type="text"
//                                 name="password"
//                                 id="password"
//                                 className="block py-2.5 px-0 w-full bg-gray-200 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                                 placeholder=" "
//                                 required
//                             />
//                             <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:scale-75">
//                                 Password
//                             </label>
//                         </div>
                        
//                         <button
//                             type="submit"
//                             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
//                             Submit
//                         </button>
//                     </form>
//                     {error && <p className="text-red-600 text-center mt-4">{error}</p>}
//                 </div>
//             ) : (
//                 <div className="authenticated-container">
//                     <Admin />
//                     <div className="flex justify-center mt-4">
//                         <button
//                             onClick={handleReload}
//                             className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">
//                             Reload Page
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Loginadmin;


import React, { useState, useEffect } from 'react';
import Admin from './Admin';

const Loginadmin = () => {
    const host = "https://logi-1.onrender.com";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check local storage for authentication status on load
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch(`${host}/api/auth/getuser/${username}`);
            const data = await response.json();
            console.log('API Response:', data); // Log the response for debugging

            if (response.ok && data.user) {
                // Check if the user exists and compare passwords
                if (data.user.password === password) {
                    setIsAuthenticated(true); // Set to true if authenticated
                    localStorage.setItem('isAuthenticated', 'true'); // Store auth status in local storage
                    setError(''); // Clear any error messages
                } else {
                    setError('Incorrect password. Please try again.'); // Set error if password is incorrect
                }
            } else {
                setError('Username not found. Please check your credentials.'); // Set error if user not found
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('Server error, please try again later.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); // Clear auth status from local storage
        setIsAuthenticated(false); // Reset authentication state
    };

    return (
        <div className="login-container flex items-center justify-center min-h-screen bg-[#b5c2ca] p-4">
            {!isAuthenticated ? (
                <div className="login-container w-[90%] md:w-[60%] lg:w-[40%] h-auto md:h-[60%] lg:h-[36%] p-5 md:p-8 border-2 border-black rounded-2xl bg-gray-200">
                    <div className="hdng text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-center">
                        <h1>Welcome Admin</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                name="username"
                                id="username"
                                className="block py-2.5 px-0 w-full bg-gray-200 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label htmlFor="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:scale-75">
                                Username
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="text"
                                name="password"
                                id="password"
                                className="block py-2.5 px-0 w-full bg-gray-200 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:scale-75">
                                Password
                            </label>
                        </div>
                        
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
                            Submit
                        </button>
                    </form>
                    {error && <p className="text-red-600 text-center mt-4">{error}</p>}
                </div>
            ) : (
              
                    <Admin onLogout={handleLogout}/>
                
            )}
        </div>
    );
};

export default Loginadmin;
