import XLogo from "./XLogo"

export default () => {
    return (
        <footer>
            <p>© 2025 Enerplaz. All rights reserved.</p>
            <p>Follow us on social media: </p>
            <div>
                <a href="https://facebook.com/enerplaz" target="_blank">
                    <ion-icon name="logo-facebook"></ion-icon></a>
                <a href="https://x.com/enerplaz" target="_blank" className="x-logo">
                    <XLogo/>
                </a> 
                <a href="https://instagram.com/enerplazenergy" target="_blank">
                    <ion-icon name="logo-instagram"></ion-icon></a>
                <a href="https://tiktok.com/enerplaz" target="_blank">
                <ion-icon name="logo-tiktok"></ion-icon></a>
            </div>
        </footer>
    )
}