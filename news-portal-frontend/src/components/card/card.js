import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardGroup, CardColumns } from 'react-bootstrap';
const CardComponent = ({renderList}) =>{
    
    const cardList = renderList.map(card =>(
        <Card>
        <Card.Img variant="top" src={card.urlToImage} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>
            {card.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted">Published on:{Date(card.publishedAt).toString()}</small>
        </Card.Footer>
      </Card>
    ));

    return(
        <CardColumns>
            {cardList}
        </CardColumns>
    )
}

export default CardComponent;