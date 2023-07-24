function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function showError(str) {
    const para =  document.querySelector(".text-error");

    para.innerHTML = str;
}

window.addEventListener("load", function(e){
    const username = this.document.querySelector("#username");
    const password = this.document.querySelector("#password");
    const login = this.document.querySelector(".login");
    // const error = this.document.querySelector(".text-error");
    let fields = [username, password];

    login?.addEventListener("click", async (e)=> {
        
        e.preventDefault();

        let emptyFields = [];
        for(const input of fields){
            if(isEmptyOrSpaces(input.value)){
                emptyFields.push(input);
            }
        }

        if(isEmptyOrSpaces(username.value) || isEmptyOrSpaces(password.value)){
            showError("Please fill out all fields.");
            return;
        }

        const myObj = { 
            username: username.value,
            password: password.value
        };

        const jString = JSON.stringify(myObj);


        try {
            const response = await fetch("/login", {
                method: 'POST',
                body: jString,
                headers: {
                'Content-Type': 'application/json'
                }
            });

            console.log(response);
            if (response.status === 200) {
                const data = await response.json(); 
                const user = data.message;
                localStorage.setItem('user', JSON.stringify(user));
                this.window.location.href = window.location.origin + "/";
            } else {
                const data = await response.json(); 
                const message = data.message; 
                showError(message);
            }
        } catch (err) {
            console.error(err);
        }
    });
});