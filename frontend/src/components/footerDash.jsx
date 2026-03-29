
import '../styles/footerdash.css';

export default function FooterDash(){
    const currentYear = new Date().getFullYear();
    return(
        <div className="footer-dash">
            <p> &copy; {currentYear} Chama Track. All Right reserved</p>
        </div>
    )
}