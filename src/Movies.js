import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'


class Movies extends React.Component {

    render() {
        return (
            <>
                {
                    this.props.showCard &&
                    this.props.movies.map(element => {
                        return (<Card style={{ border: 'groove', width: '860px' }} >
                            <Card.Header as="h5">
                                {element.title}
                            </Card.Header>

                            <Card.Img variant="top" src={element.poster_path} />

                            {element.vote_average}
                            {element.vote_count}
                            {element.overview} 
                            {element.popularity}
                            {element.release_date}

                
                        </Card>
                        )
                    })
                }


            </>
        )
    }


}

export default Movies;