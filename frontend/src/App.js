import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          {/* route protection */}              
            <Route path="/" element={user? <UserHome /> : <Navigate to='/login'/>} />
            <Route path="/admin" element={user ? <Home /> : <Navigate to='/login'/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" 
              element={!user? <Login /> :
              <Navigate to={user.role === 'admin'? '/admin' : '/'}/>} />
          </Routes>
        
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
