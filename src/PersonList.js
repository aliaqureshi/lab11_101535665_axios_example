
import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Container, Spinner, Alert } from "react-bootstrap";

class PersonList extends Component {
  state = {
    persons: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((res) => {
        console.log(res.data);
        this.setState({
          persons: res.data.results,
          loading: false
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: "Unable to load users.",
          loading: false
        });
      });
  }

  render() {
    const { persons, loading, error } = this.state;

    return (
      <Container className="mt-4">
        <h1 className="text-center bg-success text-white p-3">
          User List
        </h1>

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {persons.map((person) => (
          <Card
            key={person.login.uuid}
            className="mb-3 text-white"
            style={{ backgroundColor: "#17a2b8" }}
          >
            <Card.Body>
              <div className="d-flex flex-wrap gap-4 align-items-start">
                <div className="text-center">
                  <img
                    src={person.picture.large}
                    alt="User"
                    className="rounded-circle mb-2"
                  />
                  <br />
                  <Button variant="primary" size="sm">
                    Details
                  </Button>
                </div>

                <div>
                  <p><strong>User Name:</strong> {person.login.username}</p>
                  <p><strong>Gender:</strong> {person.gender}</p>
                  <p>
                    <strong>Full Name:</strong>{" "}
                    {person.name.title} {person.name.first} {person.name.last}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {person.location.street.number}{" "}
                    {person.location.street.name},{" "}
                    {person.location.city},{" "}
                    {person.location.country}
                  </p>
                  <p><strong>Email:</strong> {person.email}</p>
                  <p><strong>Date of Birth:</strong> {person.dob.date.substring(0, 10)}</p>
                  <p><strong>Registered Date:</strong> {person.registered.date.substring(0, 10)}</p>
                  <p><strong>Phone:</strong> {person.phone}</p>
                  <p><strong>Cell:</strong> {person.cell}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    );
  }
}

export default PersonList;
