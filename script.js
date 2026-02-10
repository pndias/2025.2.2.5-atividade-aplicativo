// Base URL da API TheMealDB
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Elementos do DOM
const resultsContainer = document.getElementById('results');
const loadingElement = document.getElementById('loading');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');

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
    const searchTerm = document.getElementById('searchByName').value.trim();
    
    if (!searchTerm) {
        alert('Por favor, digite o nome de uma receita!');
        return;
    }

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
    const ingredient = document.getElementById('searchByIngredient').value.trim();
    
    if (!ingredient) {
        alert('Por favor, digite um ingrediente!');
        return;
    }

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

    resultsContainer.innerHTML = meals.map(meal => `
        <div class="recipe-card" onclick="showRecipeDetails('${meal.idMeal}')">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="recipe-info">
                <h3>${meal.strMeal}</h3>
                <span class="recipe-category">${meal.strCategory || 'Categoria'}</span>
                <p class="recipe-area">🌍 ${meal.strArea || 'Internacional'}</p>
            </div>
        </div>
    `).join('');
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

// Permitir busca com Enter
document.getElementById('searchByName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchByName();
    }
});

document.getElementById('searchByIngredient').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchByIngredient();
    }
});
