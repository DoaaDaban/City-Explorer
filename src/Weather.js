import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'



class Weather extends React.Component {

    render() {
        console.log(this.props);
        return (
            <>

            {/* <h1>WEather</h1> */}

                {
                    this.props.showCard &&
                    this.props.weather.map(element => {
                        return (<Card style={{ border: 'groove', width: '500px' }} >
                            <Card.Header as="h5">
                                {element.date}
                            </Card.Header>
                            <Card.Header as="h5">
                                {element.description}
                            </Card.Header>
                        </Card>
                        )
                    })
                }


            </>
        )
    }


}

export default Weather;