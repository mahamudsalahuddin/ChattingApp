import Registration from "./pages/Registration"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
          <Route path="/" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
      </>
    )
  )
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
