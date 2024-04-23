import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className='flex flex-col h-screen text-white'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
