import {html,render} from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { updateNav } from '../app.js';

const loginTemplate = () => html`
<div class="loginForm" >
    <h1>Log in your account</h1>
    <form @submit=${onSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" name="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
`

export function loginView() {
    render(loginTemplate(), document.querySelector('main'));
}


async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');


    try {

        if(email == '' || password == '') {
            throw new Error('Please fill in all inputs!');
        }

        const response = await fetch('http://localhost:3030/users/login',{
            method: 'POST',
            headers: {'Content-Type': 'application.json'},
            body: JSON.stringify({email,password})
        })
    
        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const result = await response.json();
        localStorage.setItem('token', result.accessToken);
        localStorage.setItem('ownerId', result._id);

        page.redirect('/');
        updateNav();
    } catch (error) {
        alert(error.message)
    }
}


