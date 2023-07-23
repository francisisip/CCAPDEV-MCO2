function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

window.addEventListener("load", function(e){
    const username = this.document.querySelector("#username");
    const password = this.document.querySelector("#password");
    const email = this.document.querySelector("#email");
    const createAcc = this.document.querySelector("#submit");
    const error = this.document.querySelector(".text-error");
    let fields = [username,password,email];

    createAcc.addEventListener("click", (e)=> {
        e.preventDefault();
        
        let emptyFields = [];
        for(const input of fields){
            if(isEmptyOrSpaces(input.value)){
                console.log("hello");
                emptyFields.push(input);
            }
        }

        // if(emptyFields.length > 0){
        //     showError(error, "Please fill out all fields.", emptyFields);
        //     return;
        // }

        const formData = new FormData(this.document.querySelector("#createUser"));

        this.fetch("/register", {
            method: "POST",
            body: formData
        }).then(res => {
            if(res.status == 200)
                this.window.location.href = window.location.origin + "/login";
            else
                return res.json()
        }).then(data => {
            if(data.error){
                let errorFields = [];
                if (data.fields && Array.isArray(data.fields)) { // Check if data.fields is defined and an array
                    data.fields.forEach(field => {
                        errorFields.push(document.querySelector(`#${field}`));
                    });
                }
                // showError(error, data.error, errorFields);
                return;
            }
            else if(data.message){
                // showError(error, data.message, [profileImg.parentElement]);
                return;
            }
        }).catch(err => console.log(err));
    });
});