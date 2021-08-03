import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import './App.css';


class App extends React.Component{

  constructor(props){
    super(props);

    this.state={
     displayName :'',
     lat :'',
     lon :'',
     showMap:false,
     errMsg: 'Unable to geocode',
     displayErr:false,
     city:'',
     weatherStrings: [],
     weatherError: false,
     weatherText: "",

    }
  }

  getLocationData = async(event)=>{
    event.preventDefault();

   let cityName= event.target.cityN.value;
  //  console.log(cityName);

  let URL=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${cityName}&format=json`;

  try{
     
  let locResult = await axios.get(URL);  // send req to locationIQ API
  // console.log(locResult.data[0].display_name, locResult.data[0].type);
   
   this.setState({
     displayName : locResult.data[0].display_name,
     lat : locResult.data[0].lat,
     lon: locResult.data[0].lon,
     showMap: true,
 
   })
  }

  catch{
    this.setState({
      // displayMap:false,
      displayErr:true,

    })
  }
  this.getWeather();
};
////////////////////////////////=====lab 7=============================== 
getWeather = async () =>{

// http://localhost:3001/weather?lat= &lon= &searchQuery=amman
let URL= `http://localhost:3001/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${this.state.city}`;

let weatherData= await axios.get(URL);

let arrayOfStrings = weatherData.data.map((element) => {
  return `The Date is : ${element.date} and the description is : ${element.description}`;
});

try{
  this.setState({
    weather: weatherData.data,
    weatherStrings: arrayOfStrings,
  });
}

catch (err) {
  console.log(err);
      this.setState({
        weatherError: true,
        weatherText: "There is an Error",
      });
}

};
/////////////////////////
  render(){
    return(
      <>
      <div>
<h1>
  City Explorer
</h1>

<h5>
  where would you like to explore?
</h5>

<Form onSubmit={this.getLocationData}>
  <Row className="align-items-center">
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
        Name
      </Form.Label>
      <Form.Control id="inlineFormInputName" placeholder="Enter City" name='cityN' />
    </Col>
    <Col xs="auto" className="my-1">
      <Button type="submit">Explore</Button>
    </Col>
  </Row>
</Form>

<p>
{this.state.displayName}
</p>

<p>
lat : {this.state.lat}
</p>

<p>
Lon : {this.state.lon}
</p>

{
  this.state.showMap && // (false && 'doaa') >>> the truthy value (doaa) //  (true && 'doaa') >>> true %% with the same that order 
<img src={`https://maps.locationiq.com/v3/staticmap?key=pk.e997da4c61621084f545d56f650156b1&center=${this.state.lat},${this.state.lon}& zoom=18`} alt="map"/>
}

{
  this.state.displayErr && this.state.errMsg
}

{!this.state.weatherError ? (
          <Row className="mb-4">
            <Row>
              <h1>The Weather Status :</h1>
            </Row>
            <Col>
              <h2>{this.state.weatherStrings[0]}</h2>
              <h2>{this.state.weatherStrings[1]}</h2>
              <h2>{this.state.weatherStrings[2]}</h2>
            </Col>
          </Row>
        ) : (
          <>
            <h1>Error:{this.state.weatherText}</h1>
          </>
        )}
<p>
&copy;Doa'a Daban
</p>

</div>
      </>
    )
  }
}

export default App;