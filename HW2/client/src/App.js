import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [studentid, setStudentid] = useState("");
  const [grade, setGrade] = useState(0);
  const [name, setName] = useState("");
  const [groupposition, setGroupposition] = useState("");
  const [groupid, setGroupid] = useState(0);

  const [newstudentid, setNewstudentid] = useState("");

  const [projectList, setProjectList] = useState([]);

  const addProject = () => {
    Axios.post("http://localhost:3001/create", {
      studentid: studentid,
      grade: grade,
      name: name,
      groupposition: groupposition,
      groupid: groupid,
    }).then(() => {
      setProjectList([
        ...projectList,
        {
          studentid: studentid,
          grade: grade,
          name: name,
          groupposition: groupposition,
          groupid: groupid,
        },
      ]);
    });
  };

  const getProject = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setProjectList(response.data);
    });
  };

  const updateProject = (id) => {
    
    Axios.put("http://localhost:3001/update", { studentid: newstudentid, id: id }).then(
      (response) => {
        setProjectList(
          projectList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  studentid: newstudentid,
                  grade: val.grade,
                  name: val.name,
                  groupposition: val.groupposition,
                  groupid: val.groupid,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteProject = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setProjectList(
        projectList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Student ID:</label>
        <input
          type="text"
          onChange={(event) => {
            setStudentid(event.target.value);
          }}
        />
        <label>Grade:</label>
        <input
          type="number"
          onChange={(event) => {
            setGrade(event.target.value);
          }}
        />
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Group Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setGroupposition(event.target.value);
          }}
        />
        <label>Group ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setGroupid(event.target.value);
          }}
        />
        <button onClick={addProject}>Add Project</button>
      </div>
      <div className="projects">
        <button onClick={getProject}>Show Project</button>

        {projectList.map((val, key) => {
          return (
            <div className="project">
              <div>
                <h3>Studentid: {val.studentid}</h3>
                <h3>Grade: {val.grade}</h3>
                <h3>Name: {val.name}</h3>
                <h3>Groupposition: {val.Groupposition}</h3>
                <h3>Groupid: {val.groupid}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewstudentid(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateProject(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteProject(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
