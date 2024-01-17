import {useExpiryPopupAuthProps} from "../../hooks/useExpiryPopupAuthProps.ts";
import {Button, Container} from "react-bootstrap";
import React, { useEffect, useState} from "react";
import moment from "moment";
import {get} from "../../hooks/useAxios.ts";

export default function ExpiryPopup() {
    const props = useExpiryPopupAuthProps();

    const [time, setTime] = useState<string | null>("00:00");


    const handleLogout = async () => {
        try {
            const response = await get("members/logout");

            if (response.status !== 200)  {
                console.log("Placeholder -> This should send an error ticket to backend")
            }

            window.location.href = "/home";

        } catch (error) {
            window.location.href = "/home";
        }
    }

    const handleOnStayLoggedInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const expiryDate = props.sessionExpiryTime?.getDate();
            const remainingTime = expiryDate ?? -1 - now; //~ foo ? foo : bar
            if (remainingTime > 0) {
                setTime(moment.utc(remainingTime).format("mm:ss"));
            } else {
                handleLogout();
                clearInterval(interval); // Stop the interval when time is up
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [props.sessionExpiryTime]);

    return (
        <>
            <Container className="m-2">
                <h1>
                    Your session is about to expire in {time}, do you want to extend your
                    session?
                </h1>
                <Button
                    className="me-2 mt-2"
                    onClick={handleOnStayLoggedInClick}
                >
                    Keep me logged in
                </Button>
                <Button
                    className="me-2 mt-2"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Container>
        </>
    )
}