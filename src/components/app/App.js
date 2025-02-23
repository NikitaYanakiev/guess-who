import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import CategoryGame from "../sections/categoryGame/categoryGame";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:categoryName" element={<CategoryGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
