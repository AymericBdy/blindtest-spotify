import React from "react"
import ReactDOM from "react-dom"
import "./global.css"
import App from "./App"
import Login from "./Login"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route path="/staff" component={StaffPage} /> */}
        <Route exact path="/blindtest-spotify" element={<App />} />
        <Route exact path="/blindtest-spotify/login" element={<Login />} />
        <Route element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
