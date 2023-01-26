import Registration from "./pages/Registration"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
          <Route path="/" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
      </>
    )
  )
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
