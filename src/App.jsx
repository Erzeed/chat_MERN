import { Route, Routes } from "react-router-dom"
import { Chat, Login, Register } from "./pages"

function App() {
  

  return (
    <Routes>
      <Route path="/*" element={<Chat />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
  )
}

export default App
