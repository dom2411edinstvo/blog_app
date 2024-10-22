const articles = []; // массив статей, которые будут выводиться на экран 

const articleHeadingNode = document.querySelector(".js-blog__input-heading"); // получаю инпут заголовка поста
const articleTextNode = document.querySelector(".js-blog__input-article"); // получаю инпут текста поста
const articleBtnNode = document.querySelector(".js-blog__btn"); // полуаю кнопку публикации
const articleNewPostNode = document.querySelector(".js-blog__articles-wrap"); // получаю поле для новых постов
const errorMessageNode = document.querySelector(".js-error-message"); // получаем элемент для сообщений об ошибках

const maxHeadingLength = 100; // Максимальная длина заголовка
const maxTextLength = 200; // Максимальная длина поста

// Функция выключения/включения кнопки и проверки длины заголовка с текстом поста
function checkButtonState() {
    const headingLength = articleHeadingNode.value.length;
    const textLength = articleTextNode.value.length;

    if (headingLength > maxHeadingLength) {
        articleBtnNode.disabled = true; // Выключаем кнопку
        articleBtnNode.style.background = 'grey'; // Меняем фон кнопки
        errorMessageNode.style.display = 'inline-block'; // Показываем сообщение об ошибке
        errorMessageNode.textContent = `Заголовок не должен превышать ${maxHeadingLength} символов`;
    } else if (textLength > maxTextLength) {
        articleBtnNode.disabled = true; // Выключаем кнопку
        articleBtnNode.style.background = 'grey'; // Меняем фон кнопки
        errorMessageNode.style.display = 'inline-block'; // Показываем сообщение об ошибке
        errorMessageNode.textContent = `Текст не должен превышать ${maxTextLength} символов`;
    } else {
        articleBtnNode.disabled = false; // Включаем кнопку
        articleBtnNode.style.background = ''; // Сброс фона кнопки
        errorMessageNode.textContent = ''; // Очищаем сообщение об ошибке
    }
}

// Обработчик событий для заголовка
articleHeadingNode.addEventListener('input', function () {
    checkButtonState(); // Проверяем состояние кнопки и длину заголовка и текста поста
});

// Обработчик событий для текста поста
articleTextNode.addEventListener('input', function () {
    checkButtonState() // Проверяем состояние кнопки, длину заголовка и текста поста
});

// прослушивание событий при клике на кнопку, назначаю действия после клика
articleBtnNode.addEventListener("click", function () {

    errorMessageNode.textContent = '';  // очищаем сообщение об ошибках перед выполнением проверки

    const articleFromUser = getArticleFromUser(); // получаю текст новой статьи от пользователя

    // Проверка на пустые заголовки и текст
    if(!articleFromUser.heading.trim() || !articleFromUser.text.trim()) {
        errorMessageNode.style.display = 'inline-block'; // Показываем сообщение об ошибке
        errorMessageNode.textContent = 'Заголовок и текст не могут быть пустыми';
        return; // останавливаем выполнение функции
    }

    addPost(articleFromUser); // создаю новые статьи
    renderArticles(); // отображение на странице новых статей
});

function getArticleFromUser() {
    // получаю новую статью от пользователя
    const heading = articleHeadingNode.value; // присваиваю переменной heading введенный пользователем текст в инпуте заголовка
    const text = articleTextNode.value; // присваиваю переменной text введенный пользователем текст в инпуте текста поста
    const date = formatDate(new Date());
    return {
        // возвращаю объект из заголовка, текста и даты в результат выполнения функции
        heading: heading,
        text: text,
        date: date,
    };

}

function addPost({ heading, text, date }) {
    // добавление написанного заголовка, текста, текущей даты в массив статей в виде объекта
    articles.push({
        heading, // добавляем заголовок к объекту статьи
        text, // добавляем текст поста к объекту статьи
        date, // добавляем дату к объекту статьи
    });
}

// Функция для инкапсуляции кода
function getArticles() {
    return articles;
}

// функция для отображения текста созданной статьи
function renderArticles() {
    const articles = getArticles(); // окончательное определение контента для новых статей

    let articlesHTML = "";

    articles.forEach((article) => {
        // формирование отображения контента для HTML-документа
        articlesHTML += `                   
        <article class='blog__article'>
            <p class="blog__article__date">
                ${article.date} <!-- Добавляем дату перед заголовком -->
            </p>  
            <h3 class="blog__article__heading"> <!-- Добавляем заголовок -->
                ${article.heading}
            </h3>
            <p class="blog__article__text"> <!-- Добавляем текст поста -->
                ${article.text}
            </p>
        </article>
    `;
    });

    articleNewPostNode.innerHTML = articlesHTML; // внесение новой статьи в HTML-документ и на сайт
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (с учетом нуля) и добавляем ведущий ноль
    const year = date.getFullYear(); // Получаем год
    const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль
    
    return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматируем строку
}

// Получаем текущую дату и время
const now = new Date();
const formattedDate = formatDate(now);
