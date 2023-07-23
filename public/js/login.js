const login = document.querySelector(".login");
const userForm = document.forms.userLogin;
const { checkCredentials } = require('../../src/db/models/user');


login?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    console.log("submit");

    const username = formData.get('username');
    const password = formData.get('password');

    checkCredentials(username, password).then((formsMatch) => {
        if (formsMatch) {
            console.log("yay")
        } else {
            console.log('naur');
        }
    })

})