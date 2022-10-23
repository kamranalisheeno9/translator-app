import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./translator.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const API = " http://localhost:8000/annotations";

const Translator = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    check();
    fetch(API)
      .then(async (res) => {
        return await res.json();
      })
      .then((db) => {
        setData(db);
      });
  }, []);
  const check =  () => {
   setOutput(count);
  };
  return (
    <Container fluid>
      <Row className="justify-content-between main-box">
        <Col md={6} className="input-box">
          <Container fluid className="input-div">
            <h4>
              {" "}
              Input
             
            </h4>
            <textarea
              type="text"
              className="full_height_Width"
              placeholder="Input Here"
              onChange={(e) => setCount(e.target.value)}
            />
          </Container>
        </Col>
        <Col md={6} className="translated-box">
          <Container fluid className="input-div">
            <h4>Translate</h4>
            <Container className="full_height_Width output-normal">
              {data.map((val, id) => {
                const WordsAdded = output.slice(val.start, val.end + 1);
                return (
                  <>
                    {output === "" ? (
                      ""
                    ) : (
                      <div
                        className={
                          val.start === 0 && val.end === 7 ? "output-div" : "other-div"
                        }
                      >
                        <p className="text">
                          {" "}
                          <p id={id}>{WordsAdded}</p>
                        </p>
                        <p className="category">{val.label}</p>
                      </div>
                    )}
                  </>
                );
              })}
            </Container>
          </Container>
        </Col>
        <Button className="translate-btn" onClick={() => check()}>
          Translate
        </Button>
      </Row>
    </Container>
  );
};

export default Translator;
