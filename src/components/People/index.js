import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from "@material-ui/core/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Modal } from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';

import './index.css';

const {SearchBar} = Search;

const columns = [
    {
      dataField: 'clubId',
      text: 'Club ID',
      sort: true,
    },
    {
      dataField: 'fullName',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'role',
      text: 'Role',
      sort: true,
    },
    {
      dataField: 'classVNUK',
      text: 'Class',
      sort: true,
    },
    {
      dataField: 'mobile',
      text: 'Phone',
      sort: true,
    
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
  
    },
    {
        dataField: 'studentId',
        text: 'Student ID',
        sort: true,
    
    },
  ];

const PeoplePage = (props) => {
    const [key, setKey] = useState('tech');
    const [data, setData] = useState([]);
    const [toDelete, setToDelete] = useState([]);
    const [show, setShow] = useState(false);
    const [dataTech, setDataTech] = useState([]);
    const [dataMedia, setDataMedia] = useState([]);
    const [dataHR, setDataHR] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => {
      if (toDelete.length !== 0) {
        setShow(true);
      }
    }
    // handle selecting rows and deleting employee
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {   
        console.log(e)
        if (toDelete.includes(row.clubId)) {
            setToDelete(toDelete.filter(userId => userId !== row.clubId))
        }
        else {
            setToDelete((preVal) => [...preVal, row.clubId]);
        }
        console.log(toDelete)
        },
        onSelectAll: (isSelectAll, rows, e) => {
        if (isSelectAll) {
        rows.map(row => {
            if (toDelete.includes(row.clubId)) {
                setToDelete(toDelete.filter(userId => userId !== row.clubId))
            }
            else {
            setToDelete((preVal) => [...preVal, row.clubId]);
            }
            });
        }
        else {
            setToDelete([])
        }
        },
        classes: 'selection-row',
    };

    // delete member
    function deleteEmployee() {
      const config = {
        headers: {
          "Content-type": "application/json",
      },
      }
      for (let i = 0; i < toDelete.length; i++) {
        axios.delete(`http://localhost:16656/api/DCandidate/${toDelete[i]}`, config)
        .then((response) => {
          console.log(response); 
        })
        .catch((error) => {
          console.log(error)
        })
      }
      setToDelete([]);
      handleClose();
      window.location.reload();
    }

    // use effect
    // display members
    useEffect(async () => {
        // get data
        const res1 = await axios.get('http://localhost:16656/api/DCandidate/dep/tech')
        setDataTech(res1.data);      
        const res2 = await axios.get('http://localhost:16656/api/DCandidate/dep/media')  
        setDataMedia(res2.data);    
        const res3 = await axios.get('http://localhost:16656/api/DCandidate/dep/hr')  
        setDataHR(res3.data);    
    }, []);


      // create new employee
    function handleCreate () {
        window.location = "/add-member";
    }

    return (
      <div className="mainSection" style={{overflow: "auto"}}>
        <h2 className="mb-0">Members</h2>
        <Button bsprefix="addNewBtn" className="addNewBtn" onClick={() => handleCreate() }>
          New Member
        </Button>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => {setKey(k); setToDelete([])}}
          className="mb-3"
        >
          {/* Supervisor Tab*/}
          <Tab eventKey="tech" title="Tech">
          <ToolkitProvider
              keyField="clubId"
              data={dataTech}
              columns={columns}
              columnToggle
              search
            >
              {(props) => (        
                <div   
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Container className="containerStyle">
                      <i className="fas fa-search"></i>{' '}
                      <SearchBar
                        className="searchBar"
                        {...props.searchProps}
                      />
                      <Button bsprefix="deleteBtn" className="deleteBtn" onClick={handleShow}>Delete</Button>
                    </Container>
                    <Container className="containerStyle">
                      <BootstrapTable KeyField="studentId" selectRow={ selectRow } {...props.baseProps}/>
                    </Container>
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </Tab>
          
          {/* Employee Tab*/}
          <Tab eventKey="media" title="Media">
            <ToolkitProvider
              keyField="clubId"
              data={dataMedia}
              columns={columns}
              columnToggle
              search
            >
              {(props) => (        
                <div   
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                  
                    <Container className="containerStyle">
                      <i className="fas fa-search"></i>{' '}
                      <SearchBar
                        className="searchBar"
                        {...props.searchProps}
                      />
                      <Button bsprefix="deleteBtn" className="deleteBtn" onClick={handleShow}>Delete</Button>
                    </Container>
                    <Container className="containerStyle">
                      <BootstrapTable KeyField="User_ID" selectRow={ selectRow } {...props.baseProps}/>
                    </Container>
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </Tab>
          {/* Employee Tab*/}
          <Tab eventKey="hr" title="HR">
            <ToolkitProvider
              keyField="clubId"
              data={dataHR}
              columns={columns}
              columnToggle
              search
            >
              {(props) => (        
                <div   
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                  
                    <Container className="containerStyle">
                      <i className="fas fa-search"></i>{' '}
                      <SearchBar
                        className="searchBar"
                        {...props.searchProps}
                      />
                      <Button bsprefix="deleteBtn" className="deleteBtn" onClick={handleShow}>Delete</Button>
                    </Container>
                    <Container className="containerStyle">
                      <BootstrapTable KeyField="User_ID" selectRow={ selectRow } {...props.baseProps}/>
                    </Container>
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </Tab>

        </Tabs>
        {/* Delete Modal*/}
        <Modal style={{top: "300px"}} show={show} onHide={handleClose}>
           <Modal.Body>
            Are you sure you want to delete student(s) with ID(s)
            {toDelete.map((id) => {
              return (
                <p>{id}</p>
              )
            })}
           
           </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" bsprefix="modalDeleteBtn" className="modalDeleteBtn" onClick={deleteEmployee}>
               Delete
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>

           </Modal.Footer>
         </Modal>

      </div>
    )
}

export default PeoplePage;