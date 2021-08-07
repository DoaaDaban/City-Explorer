import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import './App.css';

import Map from './Map';
import Weather from './Weather';
import Movies from './Movies';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state={
     displayName :'',
     lat :'',
     lon :'',
     errMsg: 'Unable to geocode',
     displayErr: false,
     showMap: false,
     showCard: false,
     weather :[],
     movies :[],
   
    }
  }


//===================================================lab7&8===========================================================

getLocationData = async (event) => {
  event.preventDefault();
  const city = event.target.city.value; 

    
  // https://eu1.locationiq.com/v1/search.php?key=pk.4c3005b1826605a4f7ba622e6e59cb39&q=amman&format=json

  const URL = `https://eu1.locationiq.com/v1/search.php?key=pk.4c3005b1826605a4f7ba622e6e59cb39&q=${city}&format=json`;

  
  try {

    let locationResult = await axios.get(URL)
    this.setState({
      displayName: locationResult.data[0].display_name,
      lon: locationResult.data[0].lon,
      lat: locationResult.data[0].lat,
      showMap: true,
      displayErr: false,
      showCard: true
    }
)

const urlServer = `${process.env.REACT_APP_SERVER_URL}/getWeather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${city}`
    let weatherResult = await axios.get(urlServer)
    this.setState({
      weather : weatherResult.data
    })

    console.log(this.state.weather);
    
    console.log(weatherResult.data);

const urlMovies = `${process.env.REACT_APP_SERVER_URL}/movies?city=${city}`
    let moviesResult = await axios.get(urlMovies)
    this.setState({
      movies : moviesResult.data
    })
  }
  catch {
    this.setState({
      showMap: false,
      displayErr: true,
      showCard: false
    }
    )
  }

  
}


//=======================================================================================================
  render(){
    // console.log(this.state.weather)
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
      <Form.Control id="inlineFormInputName" placeholder="Enter City" name='city' />
    </Col>
    <Col xs="auto" className="my-1">
      <Button type="submit">Explore</Button>
    </Col>
  </Row>
</Form>



<Map
          displayName={this.state.displayName}
          lon={this.state.lon}
          lat={this.state.lat}
          showMap={this.state.showMap}
          displayErr={this.state.displayErr}
          errorMsg={this.state.errorMsg}
          showCard={this.state.showCard}

        />
<Weather showCard= {this.state.showCard} weather={this.state.weather} ></Weather>

<Movies showCard= {this.state.showCard} movies={this.state.movies} ></Movies>
<p>
&copy;Doa'a Daban
</p>

</div>
      </>
    )
  }
}

export default App;