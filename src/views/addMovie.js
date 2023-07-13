import {html,render} from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const myMoviesTemplate = () => html`
<div class="loginForm" >
    <h1>Add a favourite movie.</h1>
    <form @submit=${onSubmit}>
  <div class="mb-3">
    <label for="movieTitle" class="form-label">Movie Name:</label>
    <input type="text" name="movieTitle" class="form-control" id="movieTitle" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="moviePlot" class="form-label">Movie Year:</label>
    <input type="text" name="movieYear" class="form-control" id="movieYear">
  </div>
  <div class="mb-3">
    <label for="movieDirector" class="form-label">Director:</label>
    <input type="text" name="movieDirector" class="form-control" id="movieDirector">
  </div>
  <div class="mb-3">
    <label for="movieImg" class="form-label">Add an image URL:</label>
    <input type="text" name="movieImg" class="form-control" id="movieImg">
  </div>
  <div >
    <label for="moviePlot" class="form-label">Movie Description:</label>
    <textarea name="moviePlot" id="moviePlot" cols="79" rows="5"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Add Movie</button>
</form>
</div>
`

export function addMovieView() {
    render(myMoviesTemplate(), document.querySelector('main'));
}



async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get('movieTitle');
    const year = formData.get('movieYear');
    const director = formData.get('movieDirector');
    const posterUrl = formData.get('movieImg');
    const plot = formData.get('moviePlot');

    try {
        if(movieTitle == '' || movieYear == '' || movieDirector == '' || movieImg == '' || moviePlot == '') {
            throw new Error('Please fill in all inputs!');
        }        

        const response = await fetch('http://localhost:3030/data/movies',{
            method: 'POST',
            headers: {'X-Authorization': localStorage.token, 'Content-Type': 'application/json'},
            body: JSON.stringify({title,year,director,posterUrl,plot})
        })

        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        let res = await response.json();

        console.log(res);
        page.redirect('/');
    } catch (error) {
        alert(error.message);
        throw error;
    }

}