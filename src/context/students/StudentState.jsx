import react from "react";
import StudentContext from "./studentContext";

const StudentState = (props)=>{

    const host = "http://localhost:5000"
    const studentsInitial = []

    const [students, setStudents] = useState(studentsInitial);

    //Get all Students
  const getStudents = async () => {
    //API CALL

    const response = await fetch(`${host}/api/student/fetchallstudents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const json = await response.json();
    setStudents(json);
  };

  //Add a Student
  const addStudent = async (Child, School, Contact, Address, License) => {
    //TODO API CALL

    const response = await fetch(`${host}/api/student/addstudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Child, School, Contact, Address, License}),
    });
    const student = await response.json(); 
    setNotes(students.concat(student));
  };


   //Delete a Student
   const deleteStudent = async (id) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/student/deletestudent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const json =  response.json();
    const newStudents = students.filter((student)=>{return student._id !== id})
    setStudents(newStudents);

  };


  //Edit a Student
  const editStudent = async (Child, School, Contact, Address, License)=>{
    //API CALL
    const response = await fetch(`${host}/api/student/updatestudent/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Child, School, Contact, Address, License}),
    });
    const json = await response.json;
    console.log(json);

    //Logic to edit in client.
    
    let newStudents = JSON.parse(JSON.stringify(students));
   for (let index = 0; index < newStudents.length; index++) {
    const element = newStudents[index];
    if(element._id === id){
      newStudents[index].Child =  Child;
      newStudents[index].School = School;
      newNotes[index].Contact = Contact;
      newNotes[index].Address = Address;
      newNotes[index].License = License;
      break;
    };
   }
   setStudents(newStudents);
  };


    return (
        <StudentContext.provider value={{ students,setStudents, addStudent, deleteStudent, editStudent, getStudents}}>
            (props.children)
        </StudentContext.provider>
    )
}


export default StudentState;