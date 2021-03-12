import React, { useEffect, useState } from "react"
import { isEmpty, size } from "lodash"
import { deleteDocument, getCollection, addDocument } from "./actions"

function App () {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editmode, setEditmode] = useState(false)
  const [id, setId] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    (async ()=>{
      const result = await getCollection("tasks")
      if(result.statusResponse){
        setTasks(result.data)
      }

    })()

  }, [])

  const validForm = ()=>{

    let isValid = true
    setError(null)

    if(isEmpty(task)){
      setError("Campo vacio llena pelaverga")
      isValid=false
      return isValid
    }
  }

  const addTask = async (e) =>{
    e.preventDefault()

    if(!validForm()){
      return
    }

    const result = await addDocument("tasks", {name: task })
    if(!result.statusResponse){
      setError(result.error)
      return
    }
     
     setTasks([...tasks, {id: result.data.id, name: task}])
     setTask("")

  }

  const saveTask = async (e) =>{
    e.preventDefault()
    if(isEmpty(task)){
      console.log("error de task vacio")
      return
    }

    const editedTask = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTask)
    setEditmode(false)
    setTask("")
    setId("")

  }

  const deleteTask = async(id) =>{
    const result = await deleteDocument("tasks", id)
    if(!result.statusResponse){
      setError(result.error)
      return
    }

    const filteredTask = tasks.filter(task => task.id !== id)
    setTasks(filteredTask)
  }

  const editTask = (id)=>{
    setTask(id.name)
    setEditmode(true)
    setId(id)
  }

  return(

    <div className="container mt-5">
        <h1>Tarea</h1>
        <hr/>
      <div className="row">

          <div className="col-8">
            <h4 className="text-center">Lista de Tareas</h4>
          { 
            size(tasks)  === 0 ?(
              <li className="list-group-item">Tareas no encontradas</li>
            ):(
            <ul className="list-group">
             { 

              tasks.map((task)=>(
              <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button 
                    className="btn btn btn-danger float-right mx-2"
                    onClick={()=> deleteTask(task.id)}>Eliminar</button>
                  <button className="btn btn btn-warning float-right"
                  onClick={()=> editTask(task.id)}>Editar</button>
              </li>

              ))
             
             }
            </ul>
            )
          }
          </div>

          <div className="col-4">
            <h4 className="text-center">{editmode ? "Modificar Tarea" : "Agregar Tarea"}</h4>
            <form onSubmit={editmode ? "saveTask" : addTask}>
              {
                error && <span className="text-danger mb-2">{error}</span>
              }
              <input
              type="text"
              className="form-control mb-2"
              placeholder="ingresa la Tarea"
              onChange={(text)=> setTask(text.target.value)}
              value={task}
              />
              <button className={editmode ? "btn btn btn-warning btn-block" : "btn btn btn-dark btn-block"}
              type="submit">{editmode ? "Guardar Tarea" : "Agregar Tarea"}</button>
            </form>
          </div>

      </div>

    </div>

  )

}

export default App