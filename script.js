// Base URL da API TheMealDB
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Elementos do DOM
const resultsContainer = document.getElementById('results');
const loadingElement = document.getElementById('loading');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const popularRecipesContainer = document.getElementById('popularRecipes');
const searchByNameInput = document.getElementById('searchByName');
const searchByIngredientInput = document.getElementById('searchByIngredient');
const suggestionsDropdown = document.getElementById('suggestions');
const ingredientSuggestionsDropdown = document.getElementById('ingredientSuggestions');

// Variáveis para debounce
let searchTimeout;
let ingredientTimeout;

// Função para mostrar loading
function showLoading() {
    loadingElement.classList.remove('hidden');
    resultsContainer.innerHTML = '';
}

// Função para esconder loading
function hideLoading() {
    loadingElement.classList.add('hidden');
}

// Função para buscar receitas por nome
async function searchByName() {
    const searchTerm = searchByNameInput.value.trim();
    
    if (!searchTerm) {
        alert('Por favor, digite o nome de uma receita!');
        return;
    }

    // Esconder seções de sugestões
    document.getElementById('popularSection').style.display = 'none';
    document.getElementById('categoriesSection').style.display = 'none';

    showLoading();

    try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=${searchTerm}`);
        const data = await response.json();
        
        hideLoading();
        displayResults(data.meals);
    } catch (error) {
        hideLoading();
        console.error('Erro ao buscar receitas:', error);
        resultsContainer.innerHTML = '<div class="no-results">Erro ao buscar receitas. Tente novamente.</div>';
    }
}

// Função para buscar receitas por ingrediente
async function searchByIngredient() {
    const ingredient = searchByIngredientInput.value.trim();
    
    if (!ingredient) {
        alert('Por favor, digite um ingrediente!');
        return;
    }

    // Esconder seções de sugestões
    document.getElementById('popularSection').style.display = 'none';
    document.getElementById('categoriesSection').style.display = 'none';

    showLoading();

    try {
        const response = await fetch(`${API_BASE_URL}/filter.php?i=${ingredient}`);
        const data = await response.json();
        
        hideLoading();
        
        if (data.meals) {
            // Buscar detalhes completos de cada receita
            const mealsWithDetails = await Promise.all(
                data.meals.slice(0, 12).map(meal => getMealDetails(meal.idMeal))
            );
            displayResults(mealsWithDetails);
        } else {
            displayResults(null);
        }
    } catch (error) {
        hideLoading();
        console.error('Erro ao buscar receitas por ingrediente:', error);
        resultsContainer.innerHTML = '<div class="no-results">Erro ao buscar receitas. Tente novamente.</div>';
    }
}

// Função para buscar detalhes de uma receita específica
async function getMealDetails(mealId) {
    try {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error('Erro ao buscar detalhes da receita:', error);
        return null;
    }
}

// Função para exibir os resultados
function displayResults(meals) {
    if (!meals || meals.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Nenhuma receita encontrada. Tente outra busca!</div>';
        return;
    }

    resultsContainer.innerHTML = meals.map(meal => {
        const tags = meal.strTags ? meal.strTags.split(',').map(tag => 
            `<span class="recipe-tag">${tag.trim()}</span>`
        ).join('') : '';
        
        return `
            <div class="recipe-card" onclick="showRecipeDetails('${meal.idMeal}')">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="recipe-info">
                    <h3>${meal.strMeal}</h3>
                    <div class="recipe-meta">
                        <span class="recipe-category">${meal.strCategory || 'Categoria'}</span>
                        <span class="recipe-area">🌍 ${meal.strArea || 'Internacional'}</span>
                    </div>
                    ${tags ? `<div class="recipe-tags-container">${tags}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Função para mostrar detalhes da receita no modal
async function showRecipeDetails(mealId) {
    showLoading();
    modal.classList.remove('hidden');

    try {
        const meal = await getMealDetails(mealId);
        hideLoading();

        if (!meal) {
            modalBody.innerHTML = '<p>Erro ao carregar detalhes da receita.</p>';
            return;
        }

        // Coletar ingredientes e medidas
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            
            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }

        modalBody.innerHTML = `
            <div class="recipe-detail">
                <div class="recipe-header">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="recipe-title-section">
                        <h2>${meal.strMeal}</h2>
                        <div class="recipe-tags">
                            <span class="tag">${meal.strCategory}</span>
                            <span class="tag">${meal.strArea}</span>
                            ${meal.strTags ? meal.strTags.split(',').map(tag => 
                                `<span class="tag">${tag.trim()}</span>`
                            ).join('') : ''}
                        </div>
                    </div>
                </div>

                <div class="recipe-section">
                    <h3>📝 Ingredientes</h3>
                    <ul class="ingredients-list">
                        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>

                <div class="recipe-section">
                    <h3>👨‍🍳 Modo de Preparo</h3>
                    <p class="instructions">${meal.strInstructions}</p>
                </div>

                ${meal.strYoutube ? `
                    <div class="recipe-section">
                        <h3>🎥 Vídeo</h3>
                        <a href="${meal.strYoutube}" target="_blank" class="video-link">
                            Assistir no YouTube
                        </a>
                    </div>
                ` : ''}
            </div>
        `;
    } catch (error) {
        hideLoading();
        console.error('Erro ao carregar detalhes:', error);
        modalBody.innerHTML = '<p>Erro ao carregar detalhes da receita.</p>';
    }
}

// Função para fechar o modal
function closeModal() {
    modal.classList.add('hidden');
    modalBody.innerHTML = '';
}

// Fechar modal ao clicar fora do conteúdo
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Autocomplete para busca por nome
searchByNameInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    clearTimeout(searchTimeout);
    
    if (query.length < 2) {
        suggestionsDropdown.classList.add('hidden');
        return;
    }
    
    searchTimeout = setTimeout(() => {
        fetchSuggestions(query);
    }, 300);
});

// Autocomplete para busca por ingrediente
searchByIngredientInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    clearTimeout(ingredientTimeout);
    
    if (query.length < 2) {
        ingredientSuggestionsDropdown.classList.add('hidden');
        return;
    }
    
    ingredientTimeout = setTimeout(() => {
        fetchIngredientSuggestions(query);
    }, 300);
});

// Permitir busca com Enter
searchByNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchByName();
        suggestionsDropdown.classList.add('hidden');
    }
});

searchByIngredientInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchByIngredient();
        ingredientSuggestionsDropdown.classList.add('hidden');
    }
});

// Fechar sugestões ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-input-wrapper')) {
        suggestionsDropdown.classList.add('hidden');
        ingredientSuggestionsDropdown.classList.add('hidden');
    }
});

// Função para carregar receitas aleatórias
async function loadRandomRecipes() {
    popularRecipesContainer.innerHTML = '<div class="loading-inline"><div class="spinner-small"></div></div>';
    
    try {
        // Buscar 8 receitas aleatórias
        const promises = Array(8).fill().map(() => 
            fetch(`${API_BASE_URL}/random.php`).then(res => res.json())
        );
        
        const results = await Promise.all(promises);
        const meals = results.map(data => data.meals[0]);
        
        displayPopularRecipes(meals);
    } catch (error) {
        console.error('Erro ao carregar receitas populares:', error);
        popularRecipesContainer.innerHTML = '<div class="no-results">Erro ao carregar receitas.</div>';
    }
}

// Função para exibir receitas populares
function displayPopularRecipes(meals) {
    if (!meals || meals.length === 0) {
        popularRecipesContainer.innerHTML = '<div class="no-results">Nenhuma receita encontrada.</div>';
        return;
    }

    popularRecipesContainer.innerHTML = meals.map(meal => {
        const tags = meal.strTags ? meal.strTags.split(',').map(tag => 
            `<span class="recipe-tag">${tag.trim()}</span>`
        ).join('') : '';
        
        return `
            <div class="recipe-card" onclick="showRecipeDetails('${meal.idMeal}')">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
                <div class="recipe-info">
                    <h3>${meal.strMeal}</h3>
                    <div class="recipe-meta">
                        <span class="recipe-category">${meal.strCategory || 'Categoria'}</span>
                        <span class="recipe-area">🌍 ${meal.strArea || 'Internacional'}</span>
                    </div>
                    ${tags ? `<div class="recipe-tags-container">${tags}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Função para buscar sugestões de receitas
async function fetchSuggestions(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
            displaySuggestions(data.meals.slice(0, 5));
        } else {
            suggestionsDropdown.classList.add('hidden');
        }
    } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
    }
}

// Função para buscar sugestões de ingredientes
async function fetchIngredientSuggestions(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/filter.php?i=${query}`);
        const data = await response.json();
        
        if (data.meals && data.meals.length > 0) {
            displayIngredientSuggestions(data.meals.slice(0, 5));
        } else {
            ingredientSuggestionsDropdown.classList.add('hidden');
        }
    } catch (error) {
        console.error('Erro ao buscar sugestões de ingredientes:', error);
    }
}

// Exibir sugestões de receitas
function displaySuggestions(meals) {
    suggestionsDropdown.innerHTML = meals.map(meal => `
        <div class="suggestion-item" onclick="selectSuggestion('${meal.strMeal}')">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="suggestion-info">
                <span class="suggestion-name">${meal.strMeal}</span>
                <span class="suggestion-category">${meal.strCategory || ''}</span>
            </div>
        </div>
    `).join('');
    suggestionsDropdown.classList.remove('hidden');
}

// Exibir sugestões de ingredientes
function displayIngredientSuggestions(meals) {
    ingredientSuggestionsDropdown.innerHTML = meals.map(meal => `
        <div class="suggestion-item" onclick="selectIngredientSuggestion('${meal.strMeal}')">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="suggestion-info">
                <span class="suggestion-name">${meal.strMeal}</span>
            </div>
        </div>
    `).join('');
    ingredientSuggestionsDropdown.classList.remove('hidden');
}

// Selecionar sugestão de receita
function selectSuggestion(mealName) {
    searchByNameInput.value = mealName;
    suggestionsDropdown.classList.add('hidden');
    searchByName();
}

// Selecionar sugestão de ingrediente
function selectIngredientSuggestion(mealName) {
    searchByNameInput.value = mealName;
    ingredientSuggestionsDropdown.classList.add('hidden');
    searchByName();
}

// Função para buscar por categoria
async function searchByCategory(category) {
    showLoading();
    
    // Esconder seção de populares
    document.getElementById('popularSection').style.display = 'none';
    document.getElementById('categoriesSection').style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
        const data = await response.json();
        
        hideLoading();
        
        if (data.meals) {
            // Buscar detalhes completos de cada receita (limitado a 12)
            const mealsWithDetails = await Promise.all(
                data.meals.slice(0, 12).map(meal => getMealDetails(meal.idMeal))
            );
            displayResults(mealsWithDetails);
        } else {
            displayResults(null);
        }
    } catch (error) {
        hideLoading();
        console.error('Erro ao buscar receitas por categoria:', error);
        resultsContainer.innerHTML = '<div class="no-results">Erro ao buscar receitas. Tente novamente.</div>';
    }
}

// Carregar receitas populares quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    loadRandomRecipes();
});
