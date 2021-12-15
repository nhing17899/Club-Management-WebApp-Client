import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Box from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@material-ui/core';


import './index.css'


const isRequired = (
    <p
        style={{
            display: 'inline',
            color: 'red',
        }}
    >
        *
    </p>
);

const styles = theme => (
    {
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1),
                minWidth: 230,
            }
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 230,
        },
        smMargin: {
            margin: theme.spacing(2),
        }
    }
)

const AddEventModal = () => {

    const [eventName, setEventName] = useState("");
    const [content, setContent] = useState("");
    const [teamInCharge, setTeamInCharge] = useState("Tech");
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
      });

    const handleSave = () => {

        const start = date.startDate.toISOString();
        const end = date.startDate.toISOString();
        console.log(start)
        console.log(end)
        var data = {
            eventName: eventName,
            content: content,
            teamInCharge: teamInCharge,
            startDate: start,
            endDate: end,
        }

        var config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        //  console.log(data)
        axios.post('http://localhost:16656/api/Event', data, config)
            .then(function (response) {
                console.log(response.data);
                window.location = "/event";
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                }
            }}
        >
            <Form style={{
                textAlign: "left", 
                marginRight: "100px",
                marginLeft: "100px",
                }}
            >
                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                       Event Name {isRequired}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            style={{ backgroundColor: '#FFFFFF' }}
                            type="text"
                            placeholder="Name"
                            onChange={(e) => {
                                setEventName(e.target.value);
                            }
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                        Content {isRequired}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            style={{ backgroundColor: '#FFFFFF' }}
                            type="text"
                            placeholder="Content"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Col>
                </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3">
                <Row className="mb-3">
                  <Form.Label column sm={2}>
                    Start Date {isRequired}
                  </Form.Label>
                  <Col sm={10}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      onChange={(newValue) => {
                        setDate({
                          ...date,
                          startDate: newValue,
                        });
                      }}
                      value={date.startDate}
                      renderInput={(params) => (
                        <TextField  hiddenLabel fullWidth variant="filled" size="small"{...params} />
                      )}
                      size="small"
                    />
                    </LocalizationProvider>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Row className="mb-3">
                  <Form.Label column sm={2}>
                    End Date {isRequired}
                  </Form.Label>
                  <Col sm={10}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      onChange={(newValue) => {
                        setDate({
                          ...date,
                          endDate: newValue,
                        });
                      }}
                      value={date.endDate}
                      renderInput={(params) => (
                        <TextField  hiddenLabel fullWidth variant="filled" size="small"{...params} />
                      )}
                    />
                    </LocalizationProvider>
                  </Col>
                </Row>
              </Form.Group>
   
            {/* <Form.Group
              as={Row}
              className="mb-3"
            >
              <Form.Label column sm={1}>
                Create by {isRequired}
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                style={{backgroundColor: '#E8E8E8'}}
                  type="text"
                  placeholder="Create by"
                  onChange={(e) => setOwner(e.target.value)}
                />
              </Col>
            </Form.Group> */}

            </Row>

                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                        Team In Charge {isRequired}
                    </Form.Label>

                    <Col sm={10}>
                        <Form.Select
                            required
                            onChange={(e) => setTeamInCharge(e.target.value)}
                            value={teamInCharge}
                            style={{ backgroundColor: '#FFFFFF' }}>
                            <option value="Tech">Tech</option>
                            <option value="Media">Media</option>
                            <option value="HR">HR</option>
                            <option value="Whole Team">Whole Team</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

            </Form>

            <Button
                size="small"
                className="saveBtn"
                onClick={() => handleSave()}
            >
                Save
            </Button>
        </Box>
    );
};
export default (AddEventModal);