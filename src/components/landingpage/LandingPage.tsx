import { Container } from "react-bootstrap";

export default function LandingPage() {
  return (
    <>
      <Container className="m-4">
        <h1 className="h1 ">Welcome</h1>
        <p>This is a React, Typescript and Java Spring Boot project.</p>
        <p>
          You'll find the backend of the application, <a href="https://github.com/andreastif/SpringSecureLab">here</a>.
        </p>
      </Container>
    </>
  );
}
