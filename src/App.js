import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import axios from 'axios';


class App extends React.Component{

  getLocationData =(event)=>{
    event.preventDefault();

   let cityName= event.target.city.value;
  //  console.log(cityName);

  let URL=`https://us1.locationiq.com/v1/search.php?key=pk.7e55b9ea04992ecce29708d7192e908b&q=${cityName}&format=json`;

  let locResult = axios.get(URL);  // send req to locationIQ API


  }



  render(){
    return(
      <>
<h1>
  City Explorer
</h1>

<Form onSubmit={this.getLocationData}>
  <Row className="align-items-center">
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
        Name
      </Form.Label>
      <Form.Control id="inlineFormInputName" placeholder="Enter City" name='city' />
    </Col>
    <Col xs="auto" className="my-1">
      <Button type="submit">Get Location</Button>
    </Col>
  </Row>
</Form>
      </>
    )
  }
}

export default App;