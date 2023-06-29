 import  React, {useState,useEffect, Fragment} from 'react'
 import Table from 'react-bootstrap/Table';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import Button from 'react-bootstrap/Button';
 import Modal from 'react-bootstrap/Modal';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Container from 'react-bootstrap/Container';
 import axios from "axios";
 import { ToastContainer, toast  } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

 
 const CRUD = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name,setName] = useState('')
    const [age,setAge] = useState('')
    const [isActive,setIsActive] = useState(0)

    const [editID,setEditId] = useState('');
    const [editname,setEditName] = useState('')
    const [editage,setEditAge] = useState('')
    const [editisActive,setEditIsActive] = useState(0)

    const empdata = [
       
     ]

    const [data,setData] = useState([]);

    

    useEffect(()=>{
        getData();
    },[])

    const getData = () =>{
        axios.get('https://localhost:7266/api/Employee')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handelEdit = (id) =>{
       // alert(id);
       handleShow();
    }

    const handelDelete = (id) =>{
        if(window.confirm("Are You sure to delete!") == true){
            alert(id);
        }
        
    }

    const handleUpdate = () =>{

    }

    const handleSave = () =>{

        const url = 'https://localhost:7266/api/Employee';

        const data = {

            
            "name": name,
            "age": age,
            "isActive": isActive
        }

        axios.post(url,data)
        .then((result)=>{
            getData();
            clear();
            toast.success('Employee has been added -_-');
        })
    }

    const clear = () =>{

        setName('');
        setAge('');
        setIsActive(0);

        setEditId('');
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
    }

    const handelActiveChange = (e) =>{

        if(e.target.checked)
        {
            setIsActive(1);

        }
        else 
        {
            setIsActive(0);
        }
        
    }

    const handeEditlActiveChange = (e) =>{

        if(e.target.checked)
        {
            setEditIsActive(1);

        }
        else 
        {
            setEditIsActive(0);
        }
        
    }

   return (
     <Fragment>
        <br></br>
        <ToastContainer/>
        <Container>
            <Row>
                <Col>
                <input type="text" className="form-control" placeholder="Enter Name"
                value={name} onChange={(e)=> setName(e.target.value)} />
                </Col>
                <Col>
                <input type="text" className="form-control" placeholder="Enter Age"
                value={age} onChange={(e)=> setAge(e.target.value)} />
                </Col>
                <Col>
                <input type="checkbox"
                checked={isActive === 1 ? true : false}
                onChange={(e)=> handelActiveChange(e)} value={isActive} />
                <label>isActive</label>
                </Col>
                <Col>
                <Button className="btn btn-primary" onClick={()=>handleSave()}>Submit</Button> 
                </Col>
            </Row>
        </Container>
       <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>isActive</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                data && data.length> 0 ?
                data.map((item, index)=>{
                    return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.isActive}</td>
                        <td colSpan={2}>
                            <button className="btn btn-primary" onClick={()=> handelEdit(item.id)}>Edit</button> &nbsp;
                            <button className="btn btn-danger" onClick={()=> handelDelete(item.id)}>Delete</button>
                            
                        </td>
                    </tr>  
                    )
                })
                :
                'Loading...' //we can use any tpe of msg
            }
           
          </tbody>

        </Table>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title >Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>
            <Row>
            <Col>
                <input type="text" className="form-control" placeholder="Enter Name"
                value={editname} onChange={(e)=> setEditName(e.target.value)} />
                </Col>
                <Col>
                <input type="text" className="form-control" placeholder="Enter Age"
                value={editage} onChange={(e)=> setEditAge(e.target.value)} />
                </Col>
                <Col>
                <input type="checkbox"
                checked={editisActive === 1 ? true : false}
                onChange={(e)=> handeEditlActiveChange(e)} value={editisActive} />
                <label>isActive</label>
                </Col>
                
            </Row>
        </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>

     </Fragment>
   )
 }
 
 export default CRUD;
 