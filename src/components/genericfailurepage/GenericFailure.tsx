import {Container} from "react-bootstrap";
import {useGenericFailureAuthProps} from "../../hooks/useGenericFailureAuthProps.ts";

export default function GenericFailure() {
    const props = useGenericFailureAuthProps();

    return (
        <>
            <Container className="m-5">Ooops... something went wrong 😔</Container>
            <Container className="m-5">{props.errorMessage}</Container>
        </>
    )
}