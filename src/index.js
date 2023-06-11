import './style.css'
import $ from 'jquery'

const loader = $('#progressLoader');
const submitButton = $('#submitButton');
const typeInput = $('#typeInput');
const titleInput = $('#titleInput');
const filmsContainer = $('#filmsContainer');
const films = $('#films');

submitButton.on('click', (event) => {
    event.preventDefault();

    loadFilms().then();
})

const handleSuccess = (response) => {
    if (response.Response === "False") {
        alert(response.Error);
        return;
    }

    filmsContainer.removeClass('hidden');
    const html = response.Search.map(film => {
        return `<div class="film vStack">
                            <img src="${film.Poster}" alt="">
                            <h4>${film.Title}</h4>
                            <span>${film.Year}</span>
                        </div>`
    }).join('');

    films.html(html.toString());
}

const handleError = () => {
    filmsContainer.addClass('hidden');
}

const handleComplete = () => {
    loader.addClass('hidden');
}

const loadFilms = async () => {
    loader.removeClass('hidden');
    $.ajax({
        url: "http://www.omdbapi.com/",
        method: 'GET',
        data: {
            apikey: "7290f870",
            s: titleInput.val(),
            type: typeInput.val(),
        },
        success: handleSuccess,
        error: handleError,
        complete: handleComplete,
    })
}