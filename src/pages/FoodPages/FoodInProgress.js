import React from 'react';

function FoodInProgress() {
  return (
    <div>
      <img
        // Mudar src e alt
        src="https://conteudo.imguol.com.br/c/entretenimento/77/2021/08/27/alimentacao-saudavel-alimentacao-equlibrada-pizza-salada-fast-food-1630077159002_v2_450x337.jpg"
        alt="rango detalhado"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        Titulo Provisorio
      </h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <p
        data-testid="recipe-category"
      >
        Categoria: Italiana
      </p>
      <ul>
        <li
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
          />
          limão
        </li>
        <li>banana</li>
        <li>alcachofra</li>
        <li>cereja</li>
        <li>mirtillo</li>
      </ul>
      <p
        data-testid="instructions"
      >
        Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
        IpsumLorem IpsumLorem IpsumLorem
        IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
        IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
        IpsumLorem
        IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Favorite
      </button>
    </div>
  );
}

export default FoodInProgress;
