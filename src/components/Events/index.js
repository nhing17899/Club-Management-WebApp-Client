import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from "@material-ui/core/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Modal } from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from './Carousel';

import './index.css';

const {SearchBar} = Search;

const columns = [
    {
      dataField: 'id',
      text: 'Event ID',
      sort: true,
    },
    {
      dataField: 'eventName',
      text: 'Event Name',
      sort: true,
    },
    {
      dataField: 'content',
      text: 'Content',
      sort: true,
    },
    {
      dataField: 'startDate',
      text: 'Start Date',
      sort: true,
    },
    {
      dataField: 'endDate',
      text: 'End Date',
      sort: true,
    
    },
    {
      dataField: 'teamInCharge',
      text: 'In Charge',
      sort: true,
  
    },
  ];

const EventPage = (props) => {
    const [key, setKey] = useState("event");
    const [data, setData] = useState([]);
    const [toDelete, setToDelete] = useState([]);
    const [show, setShow] = useState(false);



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
        if (toDelete.includes(row.id)) {
            setToDelete(toDelete.filter(userId => userId !== row.id))
        }
        else {
            setToDelete((preVal) => [...preVal, row.id]);
        }
        console.log(toDelete)
        },
        onSelectAll: (isSelectAll, rows, e) => {
        if (isSelectAll) {
        rows.map(row => {
            if (toDelete.includes(row.id)) {
                setToDelete(toDelete.filter(userId => userId !== row.id))
            }
            else {
            setToDelete((preVal) => [...preVal, row.id]);
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
        axios.delete(`http://localhost:16656/api/Event/${toDelete[i]}`, config)
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
        const res = await axios.get('http://localhost:16656/api/Event')
        setData(res.data);      
    }, []);


      // create new employee
    function handleCreate () {
        window.location = "/add-event";
    }

    return (
      <div className="mainSection" style={{overflow: "auto"}}>
        <h2 className="mb-0">Events</h2>
        {/* <Carousel/> */}
        <Button bsprefix="addNewBtn" className="addNewBtn" onClick={() => handleCreate() }>
          New Event
        </Button>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => {setKey(k); setToDelete([])}}
          className="mb-3"
        >
          {/* Supervisor Tab*/}
          <Tab eventKey="event" title="Event">
          <ToolkitProvider
              keyField="id"
              data={data}
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

        </Tabs>
        {/* Delete Modal*/}
        <Modal style={{top: "300px"}} show={show} onHide={handleClose}>
           <Modal.Body>
            Are you sure you want to delete event(s) with ID(s)
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

export default EventPage;