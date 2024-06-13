import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/myWeb/index";
import { Auth } from "./pages/auth/index";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
