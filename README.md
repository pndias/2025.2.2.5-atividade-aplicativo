# 🍳 Meal Search - Buscador de Receitas

Aplicativo web interativo para busca de receitas culinárias usando a API TheMealDB. O aplicativo permite buscar receitas por nome ou ingrediente, explorar categorias populares e visualizar sugestões dinâmicas de receitas.

## 📋 Sobre o Projeto

Atividade avaliativa de desenvolvimento de um aplicativo web com HTML, CSS e JavaScript que consome API externa e constrói HTML dinamicamente.

- **Disciplina**: Web Design
- **Tema escolhido**: Buscador de Receitas
- **API Externa**: [TheMealDB](https://www.themealdb.com/api.php)

## ✨ Funcionalidades

### 🔍 Sistema de Busca
- **Busca por Nome**: Encontre receitas digitando o nome do prato
- **Busca por Ingrediente**: Descubra receitas que usam ingredientes específicos
- **Busca Enter**: Pressione Enter para buscar rapidamente

### 🔥 Receitas Populares
a vídeo no YouTube
- Tags relacionadas

## 💻 Principais Funções JavaScript

### Busca de Receitas
```javascript
searchByName()          // Busca receitas por nome
searchByIngredient()    // Busca receitas por ingrediente
searchByCategory()      // Busca receitas por categoria
```

### Gerenciamento de Dados
```javascript
getMealDetails(id)      // Obtém detalhes completos de uma receita
displayResults(meals)   // Exibe resultados em cards
displayPopularRecipes() // Exibe receitas populares
```

### Interface e UX
```javascript
showRecipeDetails(id)   // Abre modal com detalhes
closeModal()            // Fecha modal de detalhes
loadRandomRecipes()     // Carrega receitas aleatórias
showLoading()           // Exibe indicador de carregamento
```

## 🎯 Funcionalidades Técnicas

### Consumo de API
- Requisições assíncronas com `fetch()`
- Tratamento de erros com `try/catch`
- Uso de `Promise.all()` para requisições paralelas
- Loading states durante as requisições

### Manipulação do DOM
- Criação dinâmica de cards de receitas
- Renderização condicional de elementos
- Event listeners para interações do usuário
- Manipulação de classes CSS para animações

### Experiência do Usuário
- Feedback visual em todas as ações
- Estados de loading durante requisições
- Mensagens de erro amigáveis
- Responsividade para diferentes dispositivos
- Lazy loading de imagens

## 📱 Responsividade

O aplicativo se adapta a diferentes tamanhos de tela:

- **Desktop** (> 768px): Layout completo com grid de múltiplas colunas
- **Tablet** (768px): Grid adaptativo com 2-3 colunas
- **Mobile** (< 768px): Layout em coluna única, botões empilhados

## 🔄 Fluxo de Dados

1. **Carregamento Inicial**: 
   - Aplicativo carrega 8 receitas aleatórias
   - Exibe categorias populares

2. **Busca do Usuário**:
   - Usuário digita termo de busca
   - Requisição enviada para API
   - Loading exibido
   - Resultados renderizados dinamicamente

3. **Visualização de Detalhes**:
   - Usuário clica em um card
   - Modal abre com loading
   - Detalhes completos são buscados
   - Informações exibidas no modal

## 🐛 Tratamento de Erros

- Validação de campos vazios antes da busca
- Mensagens de erro em caso de falha na API
- Tratamento de respostas sem resultados
- Feedback visual para o usuário

## 🌟 Destaques do Código

### Código Limpo e Organizado
- Funções pequenas e focadas
- Nomenclatura descritiva
- Comentários explicativos
- Separação de responsabilidades

### Boas Práticas
- Uso de `const` e `let` ao invés de `var`
- Arrow functions para callbacks
- Template literals para strings
- Async/await para código assíncrono
- DRY (Don't Repeat Yourself)

## 📝 Checklist de Desenvolvimento

- [x] Fork do repositório
- [x] Escolha do tema (Buscador de Receitas)
- [x] Construção do HTML estruturado
- [x] Estilização com CSS (tema dark mode)
- [x] Integração com API externa (TheMealDB)
- [x] Construção dinâmica de HTML via JavaScript
- [x] Funções de busca e filtros
- [x] Modal de detalhes
- [x] Receitas populares dinâmicas
- [x] Categorias interativas
- [x] Responsividade
- [x] Tratamento de erros
- [x] Loading states
- [x] Documentação completa

## 🔮 Possíveis Melhorias Futuras

- [ ] Adicionar sistema de favoritos (LocalStorage)
- [ ] Implementar filtros avançados
- [ ] Adicionar busca por múltiplos ingredientes
- [ ] Sistema de avaliação de receitas
- [ ] Modo de impressão para receitas
- [ ] Compartilhamento em redes sociais
- [ ] Conversor de medidas
- [ ] Lista de compras automática
- [ ] Histórico de buscas
- [ ] Sugestões de receitas similares

## 📄 Licença

Este projeto está sob a licença especificada no arquivo LICENSE.

## 👨‍💻 Desenvolvimento

Desenvolvido como atividade avaliativa para a disciplina de Web Design.

---

⭐ Se gostou do projeto, considere dar uma estrela no repositório!

## Temas de Aplicativos Web Simples para Iniciantes

### Aplicativos com Armazenamento Interno (IndexedDB)

1. **Lista de Tarefas (To-Do List)**
   - Recurso único: Adicionar, listar e marcar tarefas como concluídas
   - Armazenamento: IndexedDB

2. **Bloco de Notas Pessoal**
   - Recurso único: Criar, editar e deletar notas de texto
   - Armazenamento: IndexedDB

3. **Lista de Compras**
   - Recurso único: Adicionar e remover itens da lista de compras
   - Armazenamento: IndexedDB

4. **Contador de Água Diário**
   - Recurso único: Registrar copos de água consumidos no dia
   - Armazenamento: IndexedDB

5. **Gerenciador de Links Favoritos**
   - Recurso único: Salvar e organizar URLs favoritos
   - Armazenamento: IndexedDB

6. **Diário de Humor**
   - Recurso único: Registrar o humor diário com emoji
   - Armazenamento: IndexedDB

7. **Lista de Filmes Assistidos**
   - Recurso único: Adicionar filmes assistidos com avaliação
   - Armazenamento: IndexedDB

8. **Contador de Hábitos**
   - Recurso único: Marcar dias em que praticou um hábito
   - Armazenamento: IndexedDB

9. **Lista de Livros para Ler**
   - Recurso único: Adicionar livros e marcar como lido
   - Armazenamento: IndexedDB

10. **Cronômetro de Estudos (Pomodoro)**
    - Recurso único: Iniciar/pausar timer e registrar sessões
    - Armazenamento: IndexedDB

### Aplicativos com API Externa

11. **Consulta de CEP**
    - Recurso único: Buscar endereço pelo CEP
    - API: [ViaCEP](https://viacep.com.br/)

12. **Previsão do Tempo**
    - Recurso único: Mostrar clima atual de uma cidade
    - API: [OpenWeatherMap](https://openweathermap.org/api)

13. **Conversor de Moedas**
    - Recurso único: Converter valores entre moedas
    - API: [ExchangeRate-API](https://exchangerate-api.com/)

14. **Gerador de Citações Motivacionais**
    - Recurso único: Exibir citações aleatórias
    - API: [Quotable](https://github.com/lukePeavey/quotable) ou [API Ninjas Quotes](https://api-ninjas.com/api/quotes)

15. **Buscador de Receitas**
    - Recurso único: Pesquisar receitas por ingrediente
    - API: [TheMealDB](https://www.themealdb.com/api.php)

16. **Catálogo de Pokémon**
    - Recurso único: Listar e buscar informações de Pokémon
    - API: [PokéAPI](https://pokeapi.co/)

17. **Buscador de Usuários GitHub**
    - Recurso único: Pesquisar perfis de usuários do GitHub
    - API: [GitHub API](https://docs.github.com/en/rest)

18. **Gerador de Piadas**
    - Recurso único: Exibir piadas aleatórias
    - API: [JokeAPI](https://jokeapi.dev/)

19. **Consulta de País**
    - Recurso único: Buscar informações sobre países
    - API: [REST Countries](https://restcountries.com/)

20. **Galeria de Imagens Aleatórias**
    - Recurso único: Exibir imagens aleatórias por categoria
    - API: [Unsplash API](https://unsplash.com/developers) ou [Lorem Picsum](https://picsum.photos/)

## API fake sugeridas
- [dummy](https://dummyjson.com/docs)
  - produtos
  - carinho de compras
  - receitas
  - usuários
  - postagens
  - comentários
  - tarefas
  - quotes
- [fake store](https://fakestoreapi.com/docs)
  - produtos
  - carinho de compras
  - usuários
- [json placeholder](https://jsonplaceholder.typicode.com/guide/)
  - comentários
  - postagens
  - usuários
  - fotos
  - albúns
