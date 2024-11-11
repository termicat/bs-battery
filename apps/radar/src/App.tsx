import "./App.css";
import { lazy } from "react";

const Home = lazy(() => import("./views/Home"));

function App() {
  return <Home></Home>;
}

export default App;
