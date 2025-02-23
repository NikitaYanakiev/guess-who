import React from "react";
import { Link } from "react-router-dom";
import "./categories.scss";

const categories = ["HarryPotter", "GameOfThrones", "Brands", "SpongeBob", "DesperateHousewives", "LordOfTheRing"]; // Просто добавь сюда папки

const Categories = () => {
  return (
    <section className="categories">
      <div className="categories__container">
        <h1 className="categories__title">Выбери категорию:</h1>
        <ul className="categories__list">
          {categories.map((category) => (
            <li key={category} className="categories__item">
              <Link to={`/category/${category}`} className="categories__link">
                {category.replace(/_/g, " ")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
