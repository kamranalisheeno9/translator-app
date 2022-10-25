import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./translator.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

// JSON API Call 

const API = " http://localhost:8000/annotations";

const Translator = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const [output, setOutput] = useState("");

// Fetching Data

useEffect(() => {
    getOutput();
    fetch(API)
      .then(async (res) => {
        return await res.json();
      })
      .then((db) => {
        setData(db);
      });
  }, []);

// Setting output call

  const getOutput =  () => {
   setOutput(count);
   console.log(output)
  //  console.log(count)
  };
  
  return (
    // Main Container

    <Container fluid className="main-box">

    {/* Input and Output Div Start */}

      <Row className="justify-content-center row-comp ">
        <Col sm={6} md={5} xl={4} className="input-box">
          <Container fluid className="input-div">
            <h4>
              {" "}
              Process Input
             
            </h4>

            {/* Textarea as in process input */}
            
            <textarea
              type="text"
              className="full_height_Width"
              placeholder="Input Here"
              onChange={(e) => setCount(e.target.value)}
            />
          </Container>
        </Col>
        <Col sm={6} md={5} xl={4} className="translated-box">

          <Container fluid className="input-div">
            <h4>Processed</h4>

          {/* Output Container */}

            <Container className="full_height_Width output-normal">
          
              {/* Mapping of data from API and applying condition to filter word that matches character of start and end. */}
          
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
      </Row>

    {/* Input and Output Div End */}

        <Button className="translate-btn" onClick={() => getOutput()}>
          Process
        </Button>
    </Container>
  );
};

export default Translator;
