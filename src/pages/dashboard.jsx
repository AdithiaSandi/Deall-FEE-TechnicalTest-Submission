import React from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import Navbar from "../components/navbar";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState();
  const [id, setId] = useState();
  let fav = [];
  let page = 0;
  let size = 10;
  const getCategories = async () => {
    await axios
      .get(
        "https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getBooks = async (e) => {
    e.preventDefault();
    setId(e.target.id);
    await axios
      .get(
        `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${parseInt(
          e.target.id
        )}&page=${page}&size=${size}`
      )
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <Container fluid className="mt-5" id="categories-button">
        <Row className="text-center ps-5 pe-5">
          {categories.map((items) => {
            return (
              <Col className="md" key={items.id}>
                <Button
                  variant="primary"
                  size="sm"
                  className="shadow mt-3"
                  style={{ fontFamily: "Roboto" }}
                  id={items.id}
                  onClick={(e) => getBooks(e)}
                >
                  {items.name}
                </Button>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Container
        fluid
        className="mt-5 border-top border-5 border-primary"
        style={{ fontFamily: "Roboto" }}
      >
        <Row className="mt-3">
          <Col md={2}></Col>
          <Col md={8}>
            <h2 style={{ color: `#1c1a4e` }}>
              Showing :{" "}
              {id !== undefined
                ? categories[categories.findIndex((items) => items.id == id)]
                    .name
                : "none"}
            </h2>
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row className="mt-3">
          <Col
            className="border border-light rounded-2"
            style={{ fontFamily: "Roboto" }}
          >
            {books === undefined ? (
              <mark className="text-center bg-warning">
                Pilih Kategori Di Atas
              </mark>
            ) : (
              <Container fluid>
                <Row className="justify-content-center">
                  {books.map((items) => {
                    return (
                      <Card
                        style={{ width: "20rem", maxHeight: "700px" }}
                        className="m-3 shadow border-0 text-wrap text-break"
                      >
                        <Card.Img variant="top" src={items.cover_url} />
                        <Card.Body className="text-break">
                          <Card.Title className="text-truncate">
                            {items.title}
                          </Card.Title>
                          <Card.Text
                            className="overflow-auto"
                            style={{ maxHeight: "120px" }}
                          >
                            <b>
                              By :{" "}
                              {items.authors.map((item, index) => {
                                return index !== items.authors.length - 1
                                  ? item + ", "
                                  : item;
                              })}
                            </b>
                            <br></br>
                            {items.description}
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
