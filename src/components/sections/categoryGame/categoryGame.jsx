import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./categoryGame.scss";

const CategoryGame = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const imageCount = 24;

  // Генерация массива с путями только для PNG
  const images = Array.from({ length: imageCount }, (_, index) => {
    const basePath = `${process.env.PUBLIC_URL}/img/${categoryName}/${index + 1}`;
    return `${basePath}.png`; // только PNG формат
  });

  const [hiddenCards, setHiddenCards] = useState(new Set());
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleHidden = (index) => {
    setHiddenCards((prev) => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  const selectCard = (index) => {
    setSelectedCard(index);
    setIsModalOpen(false);
  };

  const resetGame = () => {
    setHiddenCards(new Set());
    setSelectedCard(null);
  };

  // Функция для случайного выбора карточки
  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedCard(randomIndex); // Устанавливаем случайный индекс
  };

  return (
    <section className="game">
      <div className="container game__container">
        <h1 className="game__title">{categoryName.replace(/_/g, " ")}</h1>

        <button
          className="game__button game__button--back"
          onClick={() => navigate("/")}
        >
          Назад
        </button>

        <ul className="game__body">
          {images.map((src, index) => (
            <li
              key={index}
              className={`game__card ${hiddenCards.has(index) ? "hidden" : ""}`}
              onClick={() => toggleHidden(index)}
            >
              <img
                src={src}
                alt={`card ${index + 1}`}
                className="game__img"
              />
            </li>
          ))}
        </ul>

        {selectedCard !== null && (
          <div className="game__selected">
            <h3 className="game__subtitle">Выбранная карточка:</h3>
            <div className="game__selected-card">
              <img
                src={images[selectedCard]} // Показываем только PNG
                alt="selected card"
                className="game__img"
              />
            </div>
          </div>
        )}

        <div className="game__controls">
          <button className="game__button" onClick={() => setIsModalOpen(true)}>
            Выбрать карточку
          </button>
          <button
            className="game__button game__button--reset"
            onClick={resetGame}
          >
            Сброс
          </button>

          {/* Кнопка случайного выбора карточки */}
          <button
            className="game__button game__button--random"
            onClick={selectRandomCard}
          >
            Случайная карточка
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h2>Выберите карточку</h2>
            <ul className="modal__grid">
              {images.map((src, index) => (
                <li
                  key={index}
                  className="modal__card"
                  onClick={() => selectCard(index)}
                >
                  <img
                    src={src} // Показываем только PNG
                    alt={`card ${index + 1}`}
                    className="modal__img"
                  />
                </li>
              ))}
            </ul>
            <button
              className="modal__close"
              onClick={() => setIsModalOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryGame;
