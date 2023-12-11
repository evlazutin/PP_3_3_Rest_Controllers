$(document).ready(function () {
    createTable();
    editUser();
});

async function createTable() {

    let users = await fetch('/api/admin').then(response => response.json())

    for (let i = 0; i < users.length; i++) {

        let listRoles = '';
        for (let element of users[i].authorities) {
            listRoles += " " + element.role;
        }
        let userid = users[i].id;
        let username = users[i].name;
        let userlastname = users[i].lastName;
        let userage = users[i].age;
        let useremail = users[i].email;
        let userroles = listRoles;

        let tr = $("<tr>").attr("id", i);
        tr.append("" +
            "<td>" + userid + "</td>" +
            "<td>" + username + "</td>" +
            "<td>" + userlastname + "</td>" +
            "<td>" + userage + "</td>" +
            "<td>" + useremail + "</td>" +
            "<td>" + userroles + "</td>" +

            "<td><button onclick='getUserForEdit(" + users[i].id + ")' class='btn btn-md btn-info eBtn' data-toggle='modal' data-target='#editModal'>Edit</button></td>" +
            "<td><button onclick='getUserForDelete(" + users[i].id + ")' class='btn btn-md btn-danger dBtn' data-toggle='modal' data-target='#delModal'>Delete</button> </td>"
        );
        $("#AllUsersTable").append(tr)
    }
}

async function getUserForEdit(id) {

    let user = await fetch('/api/admin/' + id).then(response => response.json());

    $(".editForm #id").val(user.id);
    $(".editForm #name").val(user.name);
    $(".editForm #lastName").val(user.lastName);
    $(".editForm #age").val(user.age);
    $(".editForm #email").val(user.email);
    $(".editForm #password").val(user.password);
}

function editUser() {
    $("#eForm").submit(function (event) {
        event.preventDefault()

        let role = [];
        let arr = Array.from(document.getElementById("role").options).filter(option => option.selected).map(option => option.value)
        for (let i = 0; i < arr.length; i++) {
            role.push({id:arr[i]})
        }

        let editedUser = {
            id: $("#id").val(),
            name: $("#name").val(),
            lastName: $("#lastName").val(),
            age: $("#age").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            roles: role
        }

        fetch('/api/admin/',
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editedUser)
            });
        window.location.href = "/admin"
    })
}

async function getUserForDelete(id) {

    let user = await fetch('/api/admin/' + id).then(response => response.json());

    $(".deleteForm #id2").val(user.id);
    $(".deleteForm #name2").val(user.name);
    $(".deleteForm #lastName2").val(user.lastName);
    $(".deleteForm #age2").val(user.age);
    $(".deleteForm #email2").val(user.email);

    $("#delF").submit(function (event) {
        event.preventDefault()
        fetch('/api/admin/' + id,
            {method: 'DELETE'});
        window.location.href = "/admin"
    })
}


$("#addNewUser").submit(async function (event) {
    event.preventDefault()

    let role3 = [];
    let arr = Array.from(document.getElementById("role3").options).filter(option => option.selected).map(option => option.value)
    for (let i = 0; i < arr.length; i++) {
        role3.push({id: arr[i]})
    }

    let user = {
        name: $("#name3").val(),
        lastName: $("#lastName3").val(),
        age: $("#age3").val(),
        email: $("#email3").val(),
        password: $("#password3").val(),
        roles: role3
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