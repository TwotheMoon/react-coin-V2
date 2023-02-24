import {BrowserRouter, Routes, Route} from "react-router-dom";
import CoinDetail from "./CoinDetail";
import Home from "./Home";

function Router(){

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/detail/:coinId/*" element={<CoinDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;