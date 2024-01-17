import '@fortawesome/fontawesome-free/css/all.min.css';


export default function footer() {

    return (
        <>
            <footer className="bg-body-tertiary text-center page-footer ">
                <div className="container p-3">
                        <a
                            data-mdb-ripple-init={true}
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor:  "#dd4b39"}}
                            href="mailto:andreas.tiflidis@gmail.com"
                            role="button"
                        ><i className="fab fa-google"></i
                        ></a>

                        <a
                            data-mdb-ripple-init={true}
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor:  "#0082ca"}}
                            href="https://linkedin.com/in/andreas-tiflidis-470208128"
                            role="button"
                        ><i className="fab fa-linkedin-in"></i
                        ></a>
                        <a
                            data-mdb-ripple-init={true}
                            className="btn text-white btn-floating m-1 "
                            style={{backgroundColor:  "#333333"}}
                            href="https://github.com/andreastif"
                            role="button"
                        ><i className="fab fa-github"></i
                        ></a>

                </div>
            </footer>
        </>
    )
}