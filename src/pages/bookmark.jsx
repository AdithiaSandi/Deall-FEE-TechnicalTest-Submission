import React from "react";
import NavbarUser from "../components/navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const Bookmark = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));

  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getCategories();
  }, []);

  const handleUnFav = (index) => {
    let user = [];
    let data = JSON.parse(localStorage.getItem("data") || "[]");
    user = data;
    user.splice(index, 1);
    setData(user);
    localStorage.setItem("data", JSON.stringify(user));
  };

  return (
    <div>
      <NavbarUser />
      <Container
        className="mt-5"
        style={{ fontFamily: "Roboto", color: "#1c1a4e" }}
      >
        {data.map((item, index) => {
          return (
            <Row className="mb-5 shadow-sm border-light border rounded border-3 border-opacity-50 pt-3 pb-3">
              <Col>
                <Container>
                  <Row>
                    <Col xl={4} className="border-end">
                      <Image
                        src={item.cover_url}
                        style={{ maxHeight: "500px" }}
                        className="rounded border shadow-sm"
                      />
                      <Button
                        variant="danger"
                        className="mt-3 mb-3 shadow-sm"
                        onClick={() => handleUnFav(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                    <Col xl={8}>
                      <h3>
                        <u>{item.title}</u>
                      </h3>
                      <Container fluid className="m-0 p-0">
                        <Row>
                          <Col>
                            <h4>
                              By :{" "}
                              {item.authors.map((auth, index) => {
                                return index !== item.authors.length - 1
                                  ? auth + ", "
                                  : auth;
                              })}
                            </h4>
                          </Col>
                          <Col>
                            <h5>
                              {categories.map((cat) =>
                                cat.id == item.category_id ? cat.name : null
                              )}
                            </h5>
                          </Col>
                          <Col>
                            <p>Audio Length : {item.audio_length} seconds</p>
                          </Col>
                        </Row>
                      </Container>
                      <p className="text-turncate">{item.description}</p>
                      <p>
                        <b>Sections :</b>
                      </p>
                      <Container>
                        {item.sections.map((data) => {
                          return (
                            <Row>
                              <Col sm={4} className="text-turncate">
                                <b>{data.title}</b>
                              </Col>
                              <Col sm={8} className="text-turncate">
                                {data.content}
                              </Col>
                            </Row>
                          );
                        })}
                      </Container>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
};

export default Bookmark;
