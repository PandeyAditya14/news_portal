import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardColumns } from 'react-bootstrap';
import './card.css';




const CardComponent = ({ renderList }) => {

  renderList.splice(14, 1)

  const cardList = renderList.map(card => (
    <a className="CardWrapper" href={card.url} style={{ textDecoration: 'none', color: 'Black' }} >
      <Card bg='secondary' text='white'>
        <Card.Img variant="top" src={card.urlToImage} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>
            {card.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Published on: {Date(card.publishedAt).toString()}</small>
        </Card.Footer>
      </Card>
    </a>
  ));

  return (
    <CardColumns>
      {cardList}
    </CardColumns>
  )
}

export default CardComponent;