import { Route, Routes } from 'react-router-dom'
import './App.css'
import OpciPodaci from './pages/OpciPodaci/OpciPodaci'
import Donacije from './pages/Donacije/Donacije'
import Obavijesti from './pages/Obavijesti/Obavijesti'
import PopisZivotinja from './pages/PopisZivotinja/PopisZivotinja'
import UnosNoveZivotinje from './pages/UnosNoveZivotinje/UnosNoveZivotinje'
import Login from './pages/Login/Login'
import Registracija from './pages/Registracija/Registracija'
import Navigacija from './components/Navigacija/Navigacija'
import Footer from './components/Footer/Footer'
// import userContext from './context/userContext'
import { useState } from 'react'
// import AuthProvider from './context/AuthProvider'
import UserContext, {UserProvider} from './context/userContext'

function App() {

  const [user,setUser] = useState(false)
  const handleUserChange = (e) => {
    setUser(e.target.checked)
  }

  return (
    <UserProvider>
    <div className="App">
      {/* <userContext.Provider value={user} > */}
      {/* <AuthProvider> */}
      <UserContext.Consumer>
          {({ isAdmin }) => ( // Dobivanje isAdmin vrijednosti iz konteksta
            <>
      <Navigacija action={handleUserChange} isAdmin ={isAdmin}/>
      
      <div className="pages">
      <Routes>
        <Route path="/" element={<OpciPodaci />} />
        <Route path="/donacije" element={<Donacije />} />
        <Route path="/obavijesti" element={<Obavijesti />} />
        <Route path="/zivotinje" element={<PopisZivotinja />} />
        <Route path="/unosnovezivotinje" element={isAdmin ? <UnosNoveZivotinje /> : <p>Niste ovlašteni za ovu pristup stranici</p>} />
        <Route path="/login" element={<Login /> } />
        <Route path="/registracija" element={<Registracija /> } />
      </Routes>
      </div>

      <div className="footer">
        <Footer />
        </div>
            </>
          )}
        </UserContext.Consumer>
    </div>
    </UserProvider>
  )
}

export default App