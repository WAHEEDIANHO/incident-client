import { useState, useEffect } from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import axios from "axios";

import "../css/login.css";
import GNavBar from "../components/GNavBar";
import Footer from "../components/Footer";
function Login({ api, setUser }) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [iserror, setIserror] = useState(false);

  useEffect((_) => {
    if (pathname === "/logout" && sessionStorage.getItem("cms_token")) {
      sessionStorage.clear();
      return navigate("/");
    } else if (pathname === "/logout" && !sessionStorage.getItem("cms_token"))
      return navigate("/");

    if (sessionStorage.getItem("cms_token") && pathname === "/")
      return navigate("/dashboard");
  });

  const submit = async (e) => {
    e.preventDefault();

    // navigate("/dashboard")

    // validation

    if (login.username === "") {
      document.querySelector("#username").classList.add("error");
      return;
    } else if (login.password === "") {
      document.querySelector("#password").classList.add("error");
      return;
    }

    try {
      let { data } = await axios.post(`${api}/user/login`, login);
      sessionStorage.setItem("cms_token", data.token);
      sessionStorage.setItem("cms_id", data._id);
      sessionStorage.setItem("role", data.role);
      setUser(true, data._id);
    } catch (err) {
      setLogin({ username: "", password: "" });
      setIserror(true);
    }

    if (sessionStorage.getItem("cms_token")) {
      return navigate("/dashboard");
    }
  };

  return (

      <>
        <GNavBar />
       {/*Section: Design Block -->*/}
        <section className="background-radial-gradient overflow-hidden vh-100"
          style={{
            backgroundImage: "url('https://bit.ly/3XF2Z1x')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
        }}
        >
          <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: 10}}>
                <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
                  Crime Report <br />
                  <span style={{color: "hsl(218, 81%, 75%"}}>Management System</span>
                </h1>
                <p className="mb-4 opacity-70 text-white  p-3 rounded-2"
                  style={{background: "rgba(0,0,0,0.5)"}}
                >
                  The aim of these systems is to encourage members of the public to report crimes promptly, accurately, and efficiently.
                  By doing so, law enforcement agencies can respond more effectively to criminal activities, prevent future incidents,
                  and ensure public safety.
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                <div className="card bg-glass">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form>

                      {iserror ? (
                            <h5 className="fw-normal mb-3 pb-3 text-danger">
                              Invalid credential
                            </h5>
                        ) : null
                      }
                      <div className="form-outline mb-4">
                        <input type="email" id="username" className="form-control" onChange={e => setLogin({...login, username: e.target.value})} />
                        <label className="form-label" htmlFor="username">Email address</label>
                      </div>

                        <div className="form-outline mb-4">
                          <input type="password" id="password" className="form-control" onChange={e => setLogin({...login, password: e.target.value})} />
                          <label className="form-label" htmlFor="password">Password</label>
                        </div>


                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={submit} >
                          Login
                        </button>
                        <Link to="/signup" className="d-block">Register to become a user</Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>

  );
}

export default Login;
