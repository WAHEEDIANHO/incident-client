import {Link, useLocation, useParams} from "react-router-dom";

// import Navbar from "./components/Navbar";
import AddIncident from "./views/AddIncident";
import IncidentDetail from "./views/IncidentDetail";
import StaffReport from "./views/StaffReport";
import IncidentReport from "./views/IncidentReport";
import UserProfile from "./views/UserProfile";
// import Footer from "./components/Footer";
import ChangePassword from "./views/ChangePassword";
import About from "./views/About";

import "./css/layout.css"
import Dashboard from "./views/Dashboard";

function Layout({ api, email }) {
  const { pathname } = useLocation();
  const { id } = useParams();

  const render = () => {
    let page;
    switch (pathname) {
      case "/dashboard":
        page = <Dashboard api={api} />;
        break;

      // Criminal route
      case "/dashboard/add-incident":
        page = <AddIncident api={api} />;
        break;

      case "/dashboard/incidents":
        page = <IncidentReport api={api} />;
        break;

      case `/dashboard/incident/${id}`:
        page = <IncidentDetail api={api} id={id} />;
        break;

      case `/dashboard/users`:
        page = <StaffReport api={api} id={id} />;
        break;

      case `/dashboard/user/${id}`:
      page = <UserProfile api={api} id={id} />;
      break;

      case "/dashboard/user_report":
        page = <StaffReport api={api} />;
        break;

      case "/dashboard/change_password":
        page = <ChangePassword api={api} email={email} />;
        break;

      // case "/about":
      //   page = <About api={api} email={email} />;
      //   break;

      default:
        page = (
          <h2 className="text-danger text-center">
            Oops!!! There is nothing here: 404!
          </h2>
        );
        break;
    }

    return page;
  };

  const showNavbar = (e, toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId);


    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {

      // show navbar
      nav.classList.toggle('show')
      // change icon
      toggle.classList.toggle('bx-x')
      // add padding to body
      bodypd.classList.toggle('body-pd')
      // add padding to header
      headerpd.classList.toggle('body-pd')
    }
  }

  //Link
  function colorLink(e) {
    // e.preventDefault()
    // e.stopPropagation()
    const linkColor = document.querySelectorAll('.nav_link')
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active'))
      e.currentTarget.classList.add('active')
    }
  }

  return (
    <section className="body">
      <header className="header" id="header">
        <div className="header_toggle">
          <i className='bx bx-menu' id="header-toggle" onClick={(e) =>
              showNavbar(e,'header-toggle', 'nav-bar', 'body-pd', 'header')}>
          </i>
        </div>
        <div className="header_img"><img src="https://i.imgur.com/hczKIze.jpg" alt="" /></div>
      </header>
      <div className="l-navbar bg-success" id="nav-bar">
        <nav className="nav">
          <div>
            <Link href="/dashboard" className="nav_logo bg-success">
              <i className='bx bx-file nav_logo-icon'></i>
              <span className="nav_logo-name fw-bold">CRS</span>
            </Link>
            <div className="nav_list">
              <Link to="/dashboard" className="nav_link active" onClick={colorLink}>
                <i className='bx bx-grid-alt nav_icon'></i>
                <span className="nav_name">Dashboard</span>
              </Link>
              <Link to="/dashboard/add-incident" className="nav_link" onClick={colorLink}>
                <i className='bx bx-plus nav_icon'></i>
                <span className="nav_name">Add Incident</span>
              </Link>
              <Link to="/dashboard/incidents" className="nav_link" onClick={colorLink}>
                <i className='bx bx-folder nav_icon'></i>
                <span className="nav_name">Incidents</span>
              </Link>
              { sessionStorage.getItem("role") !== "user" && <Link to="/dashboard/users" className="nav_link" onClick={colorLink}>
                <i className='bx bx-folder nav_icon'></i>
                <span className="nav_name">Users</span>
              </Link>}
              {/*<Link to="/dashboard/change_password" className="nav_link" onClick={colorLink}>*/}
              {/*  <i className='bx bx-reset nav_icon'></i>*/}
              {/*  <span className="nav_name">Change Password</span>*/}
              {/*</Link>*/}
            </div>
          </div>
          <Link to="/logout" className="nav_link" onClick={colorLink}>
            <i className='bx bx-log-out nav_icon'></i>
            <span className="nav_name">SignOut</span>
          </Link>
        </nav>
      </div>
      <div className="height-100 pt-4">
        {render()}
      </div>
    </section>
  );
}

export default Layout;
