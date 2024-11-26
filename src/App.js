import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import WrapperLogOut from "./comonents/WrapperLogOut";
import Login from "./pages/login/Login";
import Characters from "./pages/characters/Characters";
import Wrapper from "./comonents/Wrapper";
import PreviewCharacter from "./pages/characters/PreviewCharacter";
import Favorites from "./pages/favorites/Favorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<WrapperLogOut />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<Wrapper />}>
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<PreviewCharacter />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
