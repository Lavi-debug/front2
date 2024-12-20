import './App.css';
import './custom.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import Test from './components/Test';
import Driver from './components/Driver';
import Parents from './components/Parents';
import Sample from './components/sample';
import Admincopy from './components/Admincopy';
import Logindriver from './components/Logindriver';
import Loginadmin from './components/Loginadmin';
import Parentscopy from './components/Parentscopy';
import Loginparents from './components/Loginparents';
import Students from './components/Students';
import Loginstudent from './components/Loginstudent';
import useScreenWakeLock from './components/useScreenWakeLock';

function App() {
  // useScreenWakeLock();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginadmin />} />
        <Route path="/Driver" element={<Logindriver />} />
        <Route path="/Parents" element={<Loginparents />} />
        <Route path="/Students" element={<Loginstudent />} />

        {/* <Route path="/Students" element={<Students />} /> */}
        {/* <Route path="/Parentscopy" element={<Parentscopy />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <Route path="/test" element={<Test />} /> */}
        {/* <Route path="/driver" element={<Driver />} /> */}
        {/* <Route path="/admincopy" element={<Admincopy />} /> */}
        {/* <Route path="/sample" element={<Sample />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
