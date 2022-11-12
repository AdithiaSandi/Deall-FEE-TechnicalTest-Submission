import React from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import NavbarUser from "../components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Pagination,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState();
  const [base, setBase] = useState();
  const [id, setId] = useState();
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [maxpage, setMaxPage] = useState();


  //////////////////////// PAGE CHANGER /////////////////////////////
  const handleChange = async (e, p) => {
    setPage(p);
    await axios
      .get(
        `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${parseInt(
          id
        )}&page=${p - 1}&size=${size}`
      )
      .then((response) => {
        setBooks(response.data);
        setBase(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //////////////////////// BOOKS CATEGORIES REQUEST ///////////////////////
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


  ///////////////////////// BOOKS REQUEST //////////////////////////
  const getBooks = async (e) => {
    e.preventDefault();
    setPage(1);
    setId(e.target.id);
    await axios
      .get(
        `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${parseInt(
          e.target.id
        )}&page=${0}&size=${size}`
      )
      .then((response) => {
        setBooks(response.data);
        setBase(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });

    await axios
      .get(
        `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${parseInt(
          e.target.id
        )}`
      )
      .then((response) => {
        setMaxPage(Math.ceil(response.data.length / size));
      });
  };

  useEffect(() => {
    getCategories();
  }, []);


  ///////////////////////// BOOKMARK ///////////////////////////////
  const handleFav = (item) => {
    let user = [];
    let data = JSON.parse(localStorage.getItem("data") || "[]");
    user = data;

    if (user.every((obj) => obj.id !== item.id)) {
      user.push(item);
    } else {
      alert("Already Bookmarked");
    }
    localStorage.setItem("data", JSON.stringify(user));
  };


  ////////////////////// PAGE SIZE CHANGER //////////////////////
  const handleSize = async (e) => {
    setSize(e.target.value);
    // setPage(1);
    await axios
      .get(
        `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${parseInt(
          id
        )}&page=${page - 1}&size=${e.target.value}`
      )
      .then((response) => {
        setBooks(response.data);
        setBase(response.data);
      });

    await axios
      .get(
        `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${parseInt(
          id
        )}`
      )
      .then((response) => {
        setMaxPage(Math.ceil(response.data.length / e.target.value));
      });
  };


  //////////////////// SEARCH INPUT HANDLER /////////////////
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
    let temp = [];
    if (e.target.value == "" || option == null) {
      temp = base;
    } else {
      base.forEach((item, index) => {
        if (option == "title") {
          if (item.title.toLowerCase().includes(e.target.value.toLowerCase())) {
            temp.push(item);
          }
        } else if (option == "authors") {
          for (let i = 0; i < item.authors.length; i++) {
            if (
              item.authors[i]
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            ) {
              temp.push(item);
              break;
            }
          }
        }
      });
    }
    setBooks(temp);
  };

  ///////////////// SEARCH OPTION ////////////////////////
  const [option, setOption] = useState();
  const handleOption = (e, value) => {
    setOption(value);

    let temp = [];
    if (input == "" || value == null) {
      temp = base;
    } else {
      base.forEach((item, index) => {
        if (value == "title") {
          if (item.title.toLowerCase().includes(input.toLowerCase())) {
            temp.push(item);
          }
        } else if (value == "authors") {
          for (let i = 0; i < item.authors.length; i++) {
            if (item.authors[i].toLowerCase().includes(input.toLowerCase())) {
              temp.push(item);
              break;
            }
          }
        }
      });
    }
    setBooks(temp);
  };

  return (
    <div>
      <NavbarUser />
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
      <Container className="mt-5" style={{ fontFamily: "Roboto" }} fluid>
        <Container className="border-top border-primary border-5">
          <Row className="mt-3 pt-3">
            <Col md={2}></Col>
            <Col md={8}>
              <h2 style={{ color: `#1c1a4e` }}>
                Showing :{" "}
                <mark className="bg-primary text-white">
                  {id !== undefined
                    ? categories[
                        categories.findIndex((items) => items.id == id)
                      ].name
                    : "none"}
                </mark>
              </h2>
            </Col>
            <Col md={2}></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              {books == undefined ? null : (
                <>
                  <Col>
                    <TextField
                      id="outlined-search"
                      label="Search field"
                      type="search"
                      onChange={(e) => handleInput(e)}
                      fullWidth
                    />
                  </Col>
                  <Col className="mt-3 mb-3">
                    <Container className="justify-content-center">
                      <Row className="justify-content-center text-center">
                        <Col>
                          <b>By : </b>
                          <ToggleButtonGroup
                            color="primary"
                            value={option}
                            exclusive
                            onChange={handleOption}
                            aria-label="Platform"
                          >
                            <ToggleButton value="title">Title</ToggleButton>
                            <ToggleButton value="authors">
                              Author(s)
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </>
              )}
            </Col>
          </Row>
          <Container>
            <Row>
              <Col></Col>
              {books == undefined ? null : (
                <>
                  <Col>
                    <Pagination
                      count={maxpage}
                      page={page}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Size
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={size}
                        label="Size"
                        onChange={(e) => handleSize(e)}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </Container>
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
                        style={{
                          width: "20rem",
                          maxHeight: "700px",
                          color: `#1c1a4e`,
                        }}
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
                          <Button
                            variant="primary"
                            onClick={() => handleFav(items)}
                          >
                            Add Favourite
                          </Button>
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
