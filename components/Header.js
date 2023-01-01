import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom header">
                <img
                    src="/Logo.png"
                    className="bi me-2 d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
                    width="250"
                    height="90"
                ></img>

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <ConnectButton />
                    </li>
                </ul>
            </header>
        </div>
    )
}
