
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';


class Weather extends React.Component {

    render() {
        return (
            <>

                {
                     
                        <Card style={{ border: 'groove', width: '500px' }} >
                            <Card.Header as="h5">
                                {this.props.weatherDayInfo.date}
                            </Card.Header>
                            <Card.Header as="h5">
                            {this.props.weatherDayInfo.description}
                            </Card.Header>
                        </Card>
                        
                    
                }


            </>
        )
    }


}

export default Weather;