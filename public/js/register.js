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
    const email = this.document.querySelector("#email");
    const createAcc = this.document.querySelector("#submit");
    let fields = [username,password,email];


    createAcc?.addEventListener("click", async (e)=> {
        e.preventDefault();

        let mark = document.querySelector(".thread-container")
        let num = Number(mark.id.replace('mark', ''))
        num++
        
        let emptyFields = [];
        for(const input of fields){
            if(isEmptyOrSpaces(input.value)){
                emptyFields.push(input);
            }
        }

        if(emptyFields.length > 0){
            showError("Please fill out all fields.",);
            return;
        }

        const myObj = { 
            username: username.value,
            password: password.value,
            email: email.value,
            num: num
        };

        const jString = JSON.stringify(myObj);

        try {
            const response = await fetch("/register", {
                method: 'POST',
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200) {
                const name = await response.json(); 
                const user = name.username;
                const id = name.userID;
                console.log("here");
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('userID', JSON.stringify(id));
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