$(document).ready(async function () {

        let userId = $("#tableBodyUser").data('id')
        let  url = '/api/admin/' + userId
        let users = await fetch(url).then(response => response.json())

        let listRoles = '';
        for (let element of users.authorities) {
            listRoles += " " + element.role;
        }
        let userid = users.id;
        let username = users.name;
        let userlastname = users.lastName;
        let userage = users.age;
        let useremail = users.email;
        let userroles = listRoles;

        let tr = $("<tr>");
        tr.append("" +
            "<td>" + userid + "</td>" +
            "<td>" + username + "</td>" +
            "<td>" + userlastname + "</td>" +
            "<td>" + userage + "</td>" +
            "<td>" + useremail + "</td>" +
            "<td>" + userroles + "</td>");
        $("#myTable").append(tr)
});




