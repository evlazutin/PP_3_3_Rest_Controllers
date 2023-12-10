$(document).ready(function () {

    $("#addNewUser").submit(async function (event) {
        event.preventDefault()

        let role = [];
        let arr = Array.from(document.getElementById("role").options).filter(option => option.selected).map(option => option.value)
        for (let i = 0; i < arr.length; i++) {
            role.push({id:arr[i]})
        }

        let user = {
            name: $("#name").val(),
            last_name: $("#lastname").val(),
            age: $("#age").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            roles: role
        }

        await fetch('/api/admin',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
            .then(result => console.log(result))
        window.location.href = "/admin"
    })
})