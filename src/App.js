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
import RootLayout from "./components/RootLayout";
import Message from "./pages/Message";
import SettingPage from "./pages/SettingPage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route path="/" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/pechal" element={<RootLayout/>}>
              <Route index element={<Home/>}></Route>
              <Route path="message" element={<Message/>}></Route>
              <Route path="notification" element={<NotificationPage/>}></Route>
              <Route path="setting" element={<SettingPage/>}></Route>
          </Route>
      </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
