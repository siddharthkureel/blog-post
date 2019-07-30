import React from 'react';
import { Link } from 'react-router-dom';
const FooterNav = () => {
    return (
        <footer className="footer footer-distributed">

            <div className="footer-right">
                <a target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/siddharthkureel"><i className="fa fa-facebook"></i></a>
                <a target='_blank' rel="noopener noreferrer" href="https://github.com/siddharthkureel"><i className="fa fa-github"></i></a>
                <a target='_blank' rel="noopener noreferrer" href="https://www.linkedin.com/in/siddharth-kureel-972818129/"><i className="fa fa-linkedin"></i></a>

            </div>

            <div className="footer-left">

                <p className="footer-links">
                    <Link to='/home' >HOME</Link>

                    <Link to='/'>POST</Link>

                    <Link to='/signin' >SIGNIN</Link>

                    <Link to='/register'>REGISTER</Link>

                </p>

                <p>POSTSQUARE &copy; 2019</p>
            </div>

        </footer>
    )
}

export default FooterNav