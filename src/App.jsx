import { Dashboard, Email, Home } from "./Pages"
import { CopyAccountDetails, Footer, Navbar } from "./components"
import { Routes, Route } from "react-router-dom"
import { createContext, useState } from "react"
export const AccountDetails = createContext()

function App() {

  const [userAccountDetails, setUserAccountDetails] = useState('')
  // console.log(userAccountDetails)

  const [confirmModal, setConfirmModal] = useState(false)

  const handleConfirmButtonFalse = () => {
    setConfirmModal(false)
  }

  const handleConfirmButtonTrue = () => {
    setConfirmModal(true)
  }

  return (
    <AccountDetails.Provider value={{ userAccountDetails, setUserAccountDetails, confirmModal, handleConfirmButtonTrue, handleConfirmButtonFalse }}>
      <div className=" flex flex-col max-w-[1300px] w-[90%] h-screen mx-auto justify-between items-center">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email" element={<Email />} />
          <Route path="/account" element={<CopyAccountDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </AccountDetails.Provider>
  )
}
export default App