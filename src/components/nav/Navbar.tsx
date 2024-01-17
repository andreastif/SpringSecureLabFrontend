import {useNavbarAuthProps} from "../../hooks/useNavbarAuthProps.ts";
import {useEffect, useRef, useState} from "react";
import WAVES from 'vanta/dist/vanta.waves.min.js';
import './Navbar.css'
import {Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"





export default function Navbar() {

    const props = useNavbarAuthProps();

    const [vantaEffect, setVantaEffect] = useState<any>(0)
    const vantaRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(WAVES({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                color: 0x537757,
                scale: 1.00,
                scaleMobile: 1.00
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    return (
        <div className="vanta shadow" ref={vantaRef}>
            <Nav className="p-5">
                {!props.isLoggedIn && (
                    <LinkContainer to="/login">
                        <Nav.Link className="navbar-text-style">Login</Nav.Link>
                    </LinkContainer>
                )}
                {props.isLoggedIn && (
                    <LinkContainer to="/logout">
                        <Nav.Link className="navbar-text-style">Logout</Nav.Link>
                    </LinkContainer>
                )}
                {!props.isLoggedIn && (
                    <LinkContainer to="/register">
                        <Nav.Link className="navbar-text-style">Register</Nav.Link>
                    </LinkContainer>
                )}
            </Nav>
            <div className="nav-banner">Spring Security Lab</div>
        </div>
    );



}