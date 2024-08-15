import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "./Canvas.css";

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      text: "This is a dummy text that you can show in a popup when you click show more.",
      position: { x: 0, y: 0 },
      isPopupOpen: false,
    };
    setCards([...cards, newCard]);
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const openPopup = (cardId) => {
    setSelectedCard(cards.find((card) => card.id === cardId));
  };

  const closePopup = () => {
    setSelectedCard(null);
  };

  return (
    <div className="canvas-container">
      <button onClick={addCard} className="add-card-button">Add Card</button>
      <div className="canvas">
        {cards.map((card, index) => (
          <Draggable key={card.id}>
            <ResizableBox width={200} height={150} className="card">
              <div className="card-content">
                <p className="card-heading">Card {index + 1}</p>
                <p>{card.text.slice(0, 50)}...</p>
                <div className="card-buttons">
                  <button onClick={() => openPopup(card.id)} className="show-more">Show More</button>
                  <button onClick={() => deleteCard(card.id)} className="delete-card">Delete</button>
                </div>
              </div>
            </ResizableBox>
          </Draggable>
        ))}
      </div>

      {selectedCard && (
        <div className="popup">
          <div className="popup-content">
            <h3>Card Details</h3>
            <p>{selectedCard.text}</p>
            <button onClick={closePopup} className="close-popup">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;
