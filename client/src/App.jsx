import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import './App.css'
import Journeys from "./views/Journeys";
import Auth from "./views/Auth";
import AppLayout from "./layouts/AppLayout";
import Journey from "./views/Journey";
import NotFound from "./views/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./views/Main";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout/>}>
        <Route index element={<Main/>}/>
        <Route path="auth" element={<Auth/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="journeys" element={<Journeys/>}/>
          <Route path="journey/:id" element={<Journey/>}/>
        </Route>

      <Route path="*" element={<NotFound/>}/> 
    </Route>
    
  )
)

const App = () => {
  return (
    <div className="App bg-light" style={{minHeight: "100vh"}}>
      <RouterProvider router={router}/>
    </div>
  )
}
export default App
