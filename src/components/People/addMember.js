import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Box from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
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

const AddMemberModal = () => {

    const [fullName, setFullName] = useState("");
    const [clubId, setClubId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [classVNUK, setClassVNUK] = useState("");
    const [departmentId, setDepartmentId] = useState("tech");
    const [role, setRole] = useState("member");

    const handleSave = () => {
        var data = {
            clubId: clubId,
            fullName: fullName,
            email: email,
            mobile: phoneNumber,
            studentId: studentId,
            departmentId: departmentId,
            classVNUK: classVNUK,
            role: role
        }
        // if (clubId.length === 0) {
        //     return;
        // }
        // console.log(data)
        var config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        //  console.log(data)
        axios.post('http://localhost:16656/api/DCandidate', data, config)
            .then(function (response) {
                console.log(response.data);
                window.location = "/people";
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
                        Name {isRequired}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            style={{ backgroundColor: '#FFFFFF' }}
                            type="text"
                            placeholder="Name"
                            onChange={(e) => {
                                setFullName(e.target.value);
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
                        ID {isRequired}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            style={{ backgroundColor: '#FFFFFF' }}
                            type="text"
                            placeholder="ID"
                            onChange={(e) => setClubId(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                        Email {isRequired}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            style={{ backgroundColor: '#FFFFFF' }}
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                        Phone number {isRequired}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            style={{ backgroundColor: '#FFFFFF' }}
                            type="text"
                            placeholder="Phone Number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                        Student ID {isRequired}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            style={{ backgroundColor: '#FFFFFF' }}
                            type="text"
                            placeholder="Student ID"
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                        Class {isRequired}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            style={{ backgroundColor: '#FFFFFF' }}
                            type="text"
                            placeholder="Class"
                            onChange={(e) => setClassVNUK(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                        Department ID {isRequired}
                    </Form.Label>

                    <Col sm={10}>
                        <Form.Select
                            required
                            onChange={(e) => setDepartmentId(e.target.value)}
                            value={departmentId}
                            style={{ backgroundColor: '#FFFFFF' }}>
                            <option value="tech">Tech</option>
                            <option value="media">Media</option>
                            <option value="HR">HR</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    className="mb-3"
                >
                    <Form.Label column sm={2}>
                        Role {isRequired}
                    </Form.Label>

                    <Col sm={10}>
                        <Form.Select
                            required
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            style={{ backgroundColor: '#FFFFFF' }}>
                            <option value="member">Member</option>
                            <option value="leader">Team Leader</option>
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
export default (AddMemberModal);