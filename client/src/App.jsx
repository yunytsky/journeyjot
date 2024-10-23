import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import './App.css'
import Journeys from "./views/Journeys";
import Auth from "./views/Auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">

      <Route path="/">
        <Route index element={<Journeys/>}/>
        <Route path="auth" element={<Auth/>}/>

        {/* <Route index element={<Landmark/>}/> */}

    

        {/* <Route element={<ProtectedRoute/>}>
        </Route> */}

      </Route>

      {/* <Route path="*" element={<NotFound/>}/> */} 
    </Route>
    
  )
)

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}
export default App
