import page from '../../node_modules/page/page.mjs';
import {html,render, nothing} from '../../node_modules/lit-html/lit-html.js';

document.querySelector('.d-flex').addEventListener('submit', searchFunc)
   

export async function searchFunc(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let searchInput = formData.get('searchForm');
    page.redirect(`/movies?search=${searchInput}`);
    return searchInput;
}




export async function getSearchedMovie() {

    const search = searchFunc();
    const response = await fetch(`http://localhost:3030/data/movies?where=title%20like%20%22${search}%22`);

    const result = await response.json();
    console.log(result);
    return result;
}
