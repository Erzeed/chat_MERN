import { Route, Routes } from "react-router-dom"
import { Chat, Login, Register } from "./pages"
import { UserContext, UserContextProvider } from "./context/userContext"
import { useContext } from "react"

function App() {
  const {id} = useContext(UserContext);

  if(id) {
    return (
      <Routes>
        <Route path="/*" element={<Chat />}/>
      </Routes>
    )
  }

  return (
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
  )
}

export default App
