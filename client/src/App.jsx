import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">

      <Route path="/" element={<AppLayout/>}>
        {/* <Route index element={<Main/>}/> */}
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
