import "../css/home.css"
import {Link} from "react-router-dom";
import GNavBar from "../components/GNavBar";
import Footer from "../components/Footer";


function Home () {


    return (
        <>
            <header className="intro vw-100">
                <div className="overlay"></div>
                <GNavBar />
                <div className="into-title">
                    <h1 className="text-white"></h1>
                    <p className="text-white">Is there any issues/violence around you</p>
                    <Link to="/report-incident" className="btn bg-success">Report an Incident</Link>
                </div>

            </header>
            <Footer />
        </>
    )
}

export default Home;
