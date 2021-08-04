import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Map extends React.Component {

    render() {

        return (
            <>
                {this.props.showCard &&
                    <div class="card" style={{ width: '22rem', border: '1px solid black ', color: 'pink' }}>
                        <div class="card-header">
                            <h2> {this.props.displayName}</h2>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" style={{ border: '1px solid black ', color: 'green' }}>
                                <h6>{this.props.lon}</h6></li>
                            <li class="list-group-item" style={{ border: '1px solid black ', color: 'green' }}>
                                <h6>{this.props.lat}</h6></li>
                        </ul>
                    </div>
                }
                {this.props.showMap &&
                    <div class="card" style={{ width: "30rem" }}>
                        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.e997da4c61621084f545d56f650156b1&center=${this.props.lat},${this.props.lon}`} class="card-img-top" alt="map" />
                        <div class="card-body">
                            <p class="card-text">
                                {this.props.lon} , {this.props.lat}
                            </p>
                        </div>
                    </div>
                }
                {
                    this.props.displayErr &&
                    this.props.errorMsg
                }

            </>

        )

    }



}

export default Map;