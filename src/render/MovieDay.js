import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'



class Movies extends React.Component {

    render() {
        return (
            <>

                {
                   
                        <Card style={{ border: 'groove', width: '500px' }} >
                        <Card.Header as="h5">
                            {this.props.moviesInfo.title}
                        </Card.Header>
                        <Card.Header as="h5">
                        <img class="card-img-top" src={this.props.moviesInfo.poster_path} alt="movies"/>
                        </Card.Header>
                        <Card.Header as="h5">
                            {this.props.moviesInfo.vote_average}
                        </Card.Header>
                        <Card.Header as="h5">
                            {this.props.moviesInfo.vote_count}
                        </Card.Header>
                        <Card.Header as="h5">
                          {this.props.moviesInfo.overview} 
                        </Card.Header>
                        <Card.Header as="h5">
                            {this.props.moviesInfo.popularity}
                        </Card.Header>
                        <Card.Header as="h5">
                            {this.props.moviesInfo.release_date}
                        </Card.Header>
                    </Card>
                        
                    
                }


            </>
        )
    }


}

export default Movies;