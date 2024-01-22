import {Outlet, Link} from "react-router-dom"


// not logged in --> Home, FAQ, Contact us, About us, Sign up, Log in 
// logged in --> reservations (home), FAQ, contact us, about us, My account


const NotLoggedInLayout = () => {
    return (
        <>
        <nav>
            <ul>
                <li>
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to = "/faq">FAQ</Link>
                </li>
                <li>
                    <Link to = "/contact">Contact Us</Link>
                </li>
                <li>
                    <Link to = "/about">About Us</Link>
                </li>
                <li>
                    <Link to = "/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to = "/login">Log In</Link>
                </li>
            </ul>
        </nav>
        
        <Outlet/>

        </>
    )
};

export default NotLoggedInLayout;