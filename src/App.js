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

//   getLocationData = async(event)=>{
//     event.preventDefault();

//    let cityName= event.target.city.value; // if i was named city-name maybe ill got an error with dot notation , so i have to put target['city-name']

  
//     console.log(cityName);

//   // https://us1.locationiq.com/v1/search.php?key=pk.e997da4c61621084f545d56f650156b1&q=amman&format=json
//   console.log(process.env);

//   let URL=`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${cityName}&format=json`;

//   console.log(URL);

//   try{
     
//   let locResult = await axios.get(URL);  // send req to locationIQ API
//    console.log(locResult.data[0].display_name, locResult.data[0].type);
   
//    this.setState({
//      displayName : locResult.data[0].display_name,
//      lat : locResult.data[0].lat,
//      lon: locResult.data[0].lon,
//      showMap: true,
//      displayErr: false,
//      showCard: true
 
//    })
//   }

//   catch{
//     this.setState({
//        showMap: false,
//         displayErr: true,
//         showCard: false
//     })
//   }
//   this.getWeather(cityName);
// };

// //=================

getLocationData = async (event) => {
  event.preventDefault();
  const city = event.target.city.value; 

    
  // https://eu1.locationiq.com/v1/search.php?key=pk.4c3005b1826605a4f7ba622e6e59cb39&q=amman&format=json
  const URL =`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${city}&format=json`;
  
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

  // let URL = `${process.env.REACT_APP_SERVER_URL}/weather?lat=a&lon=b&searchQuery=c`;
  // let weatherData = await axios.get(URL);
  // this.setState({
  //   weather :weatherData.data
  // })
  //  console.log(weatherData);
}

////////////////////////////////=====lab 7=============================== 

// getWeather = async (city) =>{

// // http://localhost:3001/weather?lat=31.9515694&lon=35.9239625&searchQuery=Amman
// let URL = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${city}`;

// console.log(URL);

// let weatherData= await axios.get(URL);

// console.log(weatherData);

// // let arrayOfStrings = weatherData.data.map((element) => {
// //   return `The Date is : ${element.date} and the description is : ${element.description}`;
// // });

// this.setState({
//   weather :weatherData.data
// })
// // console.log(this.state.weather);

// };

/////////////////////////
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


{/* {
  this.state.showMap && // (false && 'doaa') >>> the truthy value (doaa) //  (true && 'doaa') >>> true %% with the same that order 
<img src={`https://maps.locationiq.com/v3/staticmap?key=pk.e997da4c61621084f545d56f650156b1&center=${this.state.lat},${this.state.lon}& zoom=18`} alt="map"/>
} */}

{/* {
  this.state.displayErr && this.state.errMsg
} */}


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