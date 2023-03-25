import { useState } from "react";
import axios from "axios";

import Loader from "../components/Loader";

import "../css/login.css";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";
import GNavBar from "../components/GNavBar";
function AddCriminal({ title, api }) {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);

  const addUser = (e) => {
    e.preventDefault();
    setLoader(true);


    const data = user

    axios
      .post(`${api}/user/signup`, data)
      .then((res) => {
        setUser({
          firstName: "",
          lastName: "",
          role: "",
          phone: "",
          address: "",
          username: "",
          password: "",
          gender: "",
        });
        setLoader(false);
        alert("New User added successfully");
      })
      .catch((err) => {
        alert("oops! error while submitting form \n please try again");
        setLoader(false);
        setUser({
          firstName: "",
          lastName: "",
          role: "",
          phone: "",
          address: "",
          username: "",
          password: "",
          gender: "",
        });
      });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      { loader && <Loader/> }
      <GNavBar />
      <section className="background-radial-gradient"
               style={{
                 backgroundImage: "url('https://bit.ly/3XF2Z1x')",
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "center",
                 backgroundSize: "cover"
               }}
      >
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="row gx-lg-5 align-items-center mb-5">

            <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: 10}}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
                Crime Report <br/>
                <span style={{color: "hsl(218, 81%, 75%"}}>Management System</span>
              </h1>
              <p className="mb-4 opacity-70 text-white  p-3 rounded-2"
                 style={{background: "rgba(0,0,0,0.5)"}}
              >
                This is a tool or process that enables individuals to report criminal incidents to
                the appropriate authorities. Such systems can be
                designed to operate via various channels, including phone, email, online portals, or mobile apps
              </p>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">

                  <form onSubmit={addUser}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="firstName" name="firstName" className="form-control"  onChange={handleChange} value={ user.firstName ? user.firstName: "" } />
                            <label className="form-label" htmlFor="firstName">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="lastName" name="lastName" className="form-control"  onChange={handleChange} value={ user.lastName ? user.lastName: "" } />
                            <label className="form-label" htmlFor="lastName">Last name</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="username"name="username" className="form-control"  onChange={handleChange} value={ user.username ? user.username: "" } />
                            <label className="form-label" htmlFor="username" >Username</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="password" id="password" name="password" className="form-control"  onChange={handleChange} value={ user.password ? user.password: "" } />
                            <label className="form-label" htmlFor="password">Password</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                           <select className="form-select form-control" id="role" name="role" onChange={handleChange} value={ user.role ? user.role: "" }  >
                             <option value="">select role</option>
                              <option value="security">Security</option>
                             <option value="user">User</option>
                           </select>
                            <label className="form-label" htmlFor="role">Role</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <select className="form-select form-control" id="gender" name="gender" onChange={handleChange} value={ user.gender ? user.gender: "" } >
                              <option value="">select gender</option>
                              <option value="female">Female</option>
                              <option value="male">Male</option>
                            </select>
                            <label className="form-label" htmlFor="gender">Gender</label>
                          </div>
                        </div>
                      </div>

                    <div className="form-outline mb-4">
                      <input type="text" id="phone" name="phone" className="form-control" onChange={handleChange} value={ user.phone ? user.phone: "" } />
                      <label className="form-label" htmlFor="phone">Phone</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="" id="address" name="address" className="form-control" onChange={handleChange} value={ user.address ? user.address: "" } />
                      <label className="form-label" htmlFor="address">Address</label>
                    </div>


                    <button type="submit" className="btn btn-primary btn-block mb-4 shadow">
                      Register
                    </button>
                    <Link to="/login" className="d-block">Already a user login</Link>
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

export default AddCriminal;
