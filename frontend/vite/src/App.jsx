import React from "react";
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
 export default App;