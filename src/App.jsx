import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/RVs/Home";
import About from "./pages/RVs/About";
import Layout from "./components/Layout";
import RVs from "./pages/RVs/RVs";
import RVdetails from "./pages/RVs/RVdetails";
import Dashboard from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import HostLayout from "./components/HostLayout";
import HostRVs from "./pages/host/HostRVs";
import HostRvDetails from "./pages/host/HostRvDetails";
import Description from "./pages/host/Description";
import Photos from "./pages/host/Photos";
import PageNotFound from "./pages/404/PageNotFound";
import Login from "./pages/login/Login";
import AuthRequired from "./components/AuthRequired";
import SignUp from "./pages/login/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="rvs" element={<RVs />} />
            <Route path="rvs/:id" element={<RVdetails />} />
            <Route path="login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route element={<AuthRequired />}>
              <Route path="host" element={<HostLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="hostRVs" element={<HostRVs />} />
                <Route path="hostRVs/:id" element={<HostRvDetails />}>
                  <Route index element={<Description />} />
                  <Route path="photos" element={<Photos />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
