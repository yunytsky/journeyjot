import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import './App.css'
import Journeys from "./views/Journeys";
import Auth from "./views/Auth";
import AppLayout from "./layouts/AppLayout";
import Journey from "./views/Journey";
import NotFound from "./views/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./views/Main";
import AddJourney from "./views/AddJourney";
import EditJourney from "./views/EditJourney";
import Map from "./views/Map";
import Statistics from "./views/Statistics";
import GetPremium from "./views/GetPremium";
import PaymentSuccess from "./views/PaymentSuccess";
import PaymentFailure from "./views/PaymentFailure";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout/>}>
        <Route index element={<Main/>}/>
        <Route path="auth" element={<Auth/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="journeys" element={<Journeys/>}/>
          <Route path="journeys/:id" element={<Journey/>}/>
          <Route path="journeys/:id/edit" element={<EditJourney/>}/>
          <Route path="journeys/add" element={<AddJourney/>}/>
          <Route path="map" element={<Map/>}/>
          <Route path="statistics" element={<Statistics/>}/>
          <Route path="get-premium">
            <Route index element={<GetPremium/>}/>
            <Route path="success" element={<PaymentSuccess/>}/>
            <Route path="failed" element={<PaymentFailure/>}/>

          </Route>
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
