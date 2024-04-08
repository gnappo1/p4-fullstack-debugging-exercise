// 📚 Review With Students:
    // Request response cycle
    //Note: This was build using v5 of react-router-dom
import { Outlet, useNavigate } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import {useEffect, useState} from 'react'
import Header from './components/navigation/Header'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [productions, setProductions] = useState([])
  const [production_edit, setProductionEdit] = useState(false)
  const navigate = useNavigate()

  //5.✅ GET Productions
  useEffect(() => {
    fetch('/productions')
    .then(resp => {
      if (resp.status === 201) {
        return resp.json().then(setProductions)
      }
      return resp.json().then(error => toast.error(error))
    })
    .catch(err => console.log(err))
  }, []);

  // 6.✅ navigate to client/src/components/ProductionForm.js

  const addProduction = (production) => setProductions(production)
  const updateProduction = (updated_production) => setProductions(productions => productions.map(production =>{
    if(production.id === updated_production.id){
      return updated_production
    } else {
      return production
    }
  } ))
  const deleteProduction = (deleted_production) => setProductions(productions => productions.filter((production) => production.id === deleted_production.id) )

  const handleEdit = (production) => {
    setProductionEdit(production)
    navigate(`/productions/${production.id}/edit`)
  }

  return (
    <>
      <GlobalStyle />
      <Header handleEdit={handleEdit}/>
      <div><Toaster /></div>
      <Outlet context={{ addProduction, updateProduction, deleteProduction, productions, production_edit, handleEdit }} />
    </>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
    body{
      background-color: black; 
      color:white;
    }
    `
