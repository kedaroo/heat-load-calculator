import './Footer.css'

export default function Footer() {
    return (
        <footer>
            <div className="container-footer">
                <p className="text-center">stay connected!</p>
                <ul className="socials-list">
                    <li className="socials-list-item">
                        <a href="https://twitter.com/KedarBasutkar" target="_blank">
                            <i className="fa-brands fa-twitter social-icon"></i>
                        </a>
                    </li>
                    <li className="socials-list-item">
                        <a href="https://github.com/kedaroo" target="_blank">
                            <i className="fa-brands fa-github social-icon"></i>
                        </a>
                    </li>
                    <li className="socials-list-item">
                        <a href="https://www.linkedin.com/in/kedar-basutkar-67b30a216/" target="_blank">
                            <i className="fa-brands fa-linkedin-in social-icon"></i>
                        </a>
                    </li>
                </ul>
                <div className="footer-list">
                    <p className="footer-name">
                        <a href="index.html">kedar basutkar</a>
                    </p>
                    <p className="copyright-text">© 2022 kedar basutkar. all rights reserved</p>
                </div>
                <table>
                    <tr>
                        <td className="color1"></td>
                        <td className="color2"></td>
                        <td className="color3"></td>
                        <td className="color4"></td>
                    </tr>
                </table>
            </div>
        </footer>    
    )
}