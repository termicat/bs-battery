import "./App.css";
import { lazy } from "react";

const Home = lazy(() => import("./views/Home"));
const Minicharts = lazy(() => import("./views/Minicharts"));

function App() {
  if (window.location.search.includes("minicharts")) {
    return <Minicharts></Minicharts>;
  }
  return <Home></Home>;
}

export default App;
