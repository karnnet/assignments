debugger;
var form = `
<div class="form-add row">
<div class="sign-up-col">
    <label class="label-signup" for="name">Name</label>
    <input type="text" placeholder="Enter Name" name="name" id="name" required>
   </div>
<div class="sign-up-col">
    <label class="label-signup" for="Surname">Surname</label>
    <input type="text" placeholder="Enter Surname" name="surname" id="Surname" required>
   </div>
<div class="sign-up-col">
    <label class="label-signup" for="email">Email address</label>
    <input type="email" placeholder="Enter Email" name="email" id="email" required>
   </div>
<div class="sign-up-col text-align-c center">
  <button type="submit" class="padding-top btn btn-sign-up text-align-c backcolor-white color-white" onclick="save()">Add friend</button>
</div></div>`;

document.getElementById("formsection").innerHTML = form;

function table() {
    debugger;
    let table = `<table class="table">
  <thead>
    <tr>
    <th>Name</th>
      <th>Surname</th>
      <th>Email</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>`;
    for (let i = 0; i < details.length; i++) {
        table = table + `<tr>
      <td>${details[i].name}</td>
      <td>${details[i].Surname}</td>
      <td>${details[i].email}</td>
      <td><button type="button" class="btn edit" onclick="edit(${i})"><i class="fa fa-pen-to-square"></i></button></td>
      <td><button type="button" class="btn delete" onclick="deleteData(${i})"><i class="fa fa-trash"></i></button></td>
    </tr> `;
    };
    table = table + `</tbody>
    </table>`;
    document.getElementById("table").innerHTML = table;
};
var form = document.getElementById("form");
details = [];
getData();
table();

function getData() {
    let Data = localStorage.getItem("details");
    if (Data) {
        details = JSON.parse(Data);
    } else {
        setData();
    };
};

function setData() {
    localStorage.setItem("details", JSON.stringify(details));
};

function save() {
    debugger;
    let name = document.getElementById("name");
    let Surname = document.getElementById("Surname");
    let email = document.getElementById("email");
    let data = {
        name: name.value,
        Surname: Surname.value,
        email: email.value
    };

    if (validate()) {
        details.push(data);
        setData();
        table();
        name.value = "";
        Surname.value = "";
        email.value = "";
        event.preventDefault();
    }
}

function validate() {

    let isnametrue = true;
    let issurnametrue = true;
    let isemailtrue = true;
    let name = document.getElementById("name");
    let Surname = document.getElementById("Surname");
    let email = document.getElementById("email");


    if (name.value == "") {
        alert("Field can't be empty")
        isnametrue = false;
    } else if (name.value.length < 3) {
        alert("value is too short ")
        isnametrue = false;
    } else if (name.value.match(/ /g)) {
        alert("no whitespace allowed");
        isnametrue = false;
    } else if (name.value.match(/[0-9]/g)) {
        alert("Name not contain numbers");
        isnametrue = false;
    }

    if (Surname.value == "") {
        alert("Field can't be empty")
        issurnametrue = false;
    } else if (Surname.value.length < 3) {
        alert("value is too short ")
        issurnametrue = false;
    } else if (Surname.value.match(/ /g)) {
        alert("no whitespace allowed");
        issurnametrue = false;
    } else if (Surname.value.match(/[0-9]/g)) {
        alert("Name not contain numbers");
        issurnametrue = false;
    }

    if (email.value == "") {
        alert('Field cannot be empty')
        isemailtrue = false;
    } else if (email.value.length < 3) {
        alert("value is too short ")
        isemailtrue = false;
    } else if (email.value.match(/ /g)) {
        alert("no whitespace allowed");
        isemailtrue = false;
    } else if ((!email.value.endsWith(email.value.match(/gmail.com/i))) && !(email.value.endsWith(email.value.match(/qualminds.com/i)))) {
        alert("Email only ends with gmail.com/qualminds.com");
        isemailtrue = false;
    }

    // if (name.value == "" || Surname.value == "" || email.value == "") {
    //     alert("please fill the details!");
    //     // event.preventDefault();
    //     isValidTrue = false;
    // } else if (name.value.length < 3 || Surname.value.length < 3) {
    //     alert("minimum 3 characters needed");
    //     // event.preventDefault();
    //     isValidTrue = false;
    // } else if (name.value.length > 10 || Surname.value.length > 10) {
    //     alert("maximum 10 characters allowed");
    //     // event.preventDefault();
    //     isValidTrue = false;
    // } else if ((!email.value.endsWith(email.value.match(/gmail.com/i))) && !(email.value.endsWith(email.value.match(/qualminds.com/i)))) {
    //     alert("allow only gmail and qualminds emails");
    //     // event.preventDefault();
    //     isValidTrue = false;
    // } else if (name.value.match(/ /g) || Surname.value.match(/ /g) || email.value.match(/ /g)) {
    //     alert("white spaces are not allowed");
    //     // event.preventDefault();
    //     isValidTrue = false;
    // } else if (name.value.match(/[0-9]/g) || Surname.value.match(/[0-9]/g)) {
    //     alert("Name and surName should not be a numbers");
    //     // event.preventDefault();
    //     isValidTrue = false;
    // } else if (name.value.match(/[~ ! @ # $ % ^ & * _ + - = < > ? . , ' " : ; | /]/g) || Surname.value.match(/[~ ! @ # $ % ^ & * _ + - = < > ? . , ' " : ; | /]/g)) {
    //     alert("Name and surName should not contain any special characters");
    //     // event.preventDefault();
    //     isValidTrue = false;
    // }

    if (isnametrue & issurnametrue & isemailtrue) {
        return true;
    } else {
        return false;
    }
}

function deleteData(index) {
    alert("perform delete operation");
    details.splice(index, 1);
    setData();
    table();
};

function edit(index) {
    debugger;
    let editForm = `<div class="form-add row">
    <div class="sign-up-col">
    <label for="name">Update Name</label>
    <input type="text" value="${details[index].name}" id="name" placeholder="Update Your Name">
   </div>
  <div class="sign-up-col">
  <label for="Surname">Update Surname</label>
  <input type="text" value="${details[index].Surname}" id="Surname" placeholder="Update Your Surname">
</div>
<div class="sign-up-col">
    <label for="email">Update Email</label>
    <input type="email" value="${details[index].email}" id="email" placeholder="Update Your email">
  </div>
  <div class="sign-up-col text-align-c center">
  <button type="submit" class="margin-top btn btn-sign-up text-align-c backcolor-white color-white" onclick="update(${index})">Update</button>
</div>
</div>`;
    document.getElementById("formsection").innerHTML = editForm;

}

function update(index) {
    debugger;
    event.preventDefault();
    let name = document.getElementById('name');
    let Surname = document.getElementById('Surname');
    let email = document.getElementById('email');

    details[index] = {
        name: name.value,
        Surname: Surname.value,
        email: email.value
    };
    var form = `
    <div class="form-add row">
    <div class="sign-up-col">
        <label class="label-signup" for="name">Name</label>
        <input type="text" placeholder="Enter Name" name="name" id="name" required>
       </div>
    
    <div class="sign-up-col">
        <label class="label-signup" for="Surname">Surname</label>
        <input type="text" placeholder="Enter Surname" name="surname" id="Surname" required>
       </div>
    <div class="sign-up-col">
        <label class="label-signup" for="email">Email address</label>
        <input type="email" placeholder="Enter Email" name="email" id="email" required>
       </div>
    <div class="sign-up-col text-align-c center">
      <button type="button" class="padding-top btn btn-sign-up text-align-c backcolor-white color-white" onclick="save()">Add friend</button>
    </div></div>`;
    if (validate()) {
        setData();
        table();
        name.value = "";
        Surname.value = "";
        email.value = "";
        document.getElementById("formsection").innerHTML = form;
    } else {
        console.log("data is not updated")
    }

}