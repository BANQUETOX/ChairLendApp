export default function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <a
                        href="https://felipeportfolio.on.fleek.co/"
                        target="_blank"
                        className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
                    >
                        <img
                            className="bi"
                            width="50"
                            height="50"
                            src="/chair.png"
                        ></img>
                    </a>
                    <span className="mb-3 mb-md-0 text-muted">
                        &copy; 2023 BANQUETA
                    </span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3">
                        <a
                            className="text-muted"
                            target="_blank"
                            href="https://twitter.com/BANQUETOX"
                        >
                            <img
                                className="bi"
                                width="50"
                                height="50"
                                src="/twitter.png"
                            ></img>
                        </a>
                    </li>
                    <li className="ms-3">
                        <div className="text-muted" href="#">
                            <img
                                className="bi"
                                width="50"
                                height="50"
                                src="/discord.png"
                            ></img>
                            <span className="mb-3 mb-md-0 text-muted">
                                BΛПQЦΣƬΛ#5439
                            </span>
                        </div>
                    </li>
                    <li className="ms-3">
                        <a
                            className="text-muted"
                            target="_blank"
                            href="https://github.com/BANQUETOX/ChairLendApp"
                        >
                            <img
                                className="bi"
                                width="50"
                                height="50"
                                src="/github.png"
                            ></img>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}
