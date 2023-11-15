// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRoute from './routes/UserRoute';
import StaffRoute from "./routes/StaffRoute";
import AdminRoute from "./routes/AdminRoute";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/*' element={<UserRoute />} />
        <Route exact path='/staff/*' element={<StaffRoute />} />
        <Route exact path='/admin/*' element={<AdminRoute />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;

