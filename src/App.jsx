//import Link from react router dom
import { Link } from "react-router-dom";

//import routes
import Routes from './routes';

export default function App() {

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-danger bg-gradient" data-bs-theme="dark">
          <div className="container justify-content-center">
            <Link to="/" className="navbar-brand">SINAR LESTARI ELEKTRONIK</Link>
           <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-4 mb-lg-0 justify-content-center">
                <li className="nav-item ">
                  <Link to="/product" className="nav-link active" aria-current="page">Product</Link>
                </li>
                <li className="nav-item">
                  <Link to="/product" className="nav-link active" aria-current="page">Users</Link>
                </li>
              </ul>
            </div> 
          </div>
        </nav>
      </div>


      <Routes />

    </>
  )
  
}