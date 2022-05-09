const customer_name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const addBtn = document.getElementById("btnAdd"); //Truy xuất đến nút Add
const updateBtn = document.getElementById("btnUpdate"); //Truy xuất đến nút Add

//Nếu người dùng bấm vào nút ADD =>
// 1. Lấy tất cả các thông tin trên form add
// ==> chuyển vào object
//==> xoá dữ liệu form => đưa object=> lists chuyển lists vào localStorage.setItem('customer',object)

//2. Show_list lên table (làm thế nào show lên table)
// thêm 1 dòng vào trong list (tbody - table) +data
//Data => truy xuất từ localStorage

// let lists = [];

addBtn.onclick = () => {
  let obj_customer = {
    name: customer_name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
  };
  let getLocalStorageData = localStorage.getItem("customer");
  if (getLocalStorageData == null) {
    let lists = []; // localstorage chưa có phần tử nào
  } else {
    let lists = JSON.parse(getLocalStorageData); // Chuyển dữ liệu localstorage từ string sang object
  }
  lists.push(obj_customer); //Đưa dữ liệu lấy được từ form (object) vào list
  localStorage.setItem("customer", JSON.stringify(lists)); //Chuyển lists sang string=>đưavào localstorage
  show_lists(); //Hiển thị ra table
  reset_form();
};

function show_lists() {
  let getLocalStorageData = localStorage.getItem("customer"); //lấy data từ localstorage
  if (getLocalStorageData == null) {
    lists = []; // localstorage chưa có phần tử nào
  } else {
    lists = JSON.parse(getLocalStorageData); // Chuyển dữ liệu localstorage từ string sang object
  }
  let row = "";
  lists.forEach((element, index) => {
    row += `
                <tr>
                    <td>${index}</td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.phone}</td>
                    <td>${element.address}</td>
                    <td><button onclick= "edit(${index})">Edit</button></td>
                    <td><button onclick= "delete_customer(${index})">Delete</button></td>
                </tr>
                `;
  });
  document.getElementById("list").innerHTML = row;
}

function reset_form() {
  customer_name.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  customer_name.focus();
}

function delete_customer(index) {
  let getLocalStorageData = localStorage.getItem("customer"); //lấy data từ localstorage
  lists = JSON.parse(getLocalStorageData); // Chuyển dữ liệu localstorage từ string sang object
  lists.splice(index, 1); // xoá 1 phần tử tại vị trí index
  localStorage.setItem("customer", JSON.stringify(lists)); // cập nhật lại string lên localstorage
  show_lists(); // hiển thị lại danh sách trên table
}
//edit lấy dữ liệu đổ lên form
function edit(index) {
  let getLocalStorageData = localStorage.getItem("customer"); //lấy data từ localstorage
  lists = JSON.parse(getLocalStorageData); // Chuyển dữ liệu localstorage từ string sang object
  customer_name.value = lists[index].name;
  email.value = lists[index].email;
  phone.value = lists[index].phone;
  address.value = lists[index].address;
  document.getElementById("index").value = index;
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";
}

updateBtn.onclick = () => {
  let obj_customer = {
    name: customer_name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
  };
  let getLocalStorageData = localStorage.getItem("customer"); //lấy data từ localstorage
  lists = JSON.parse(getLocalStorageData); // Chuyển dữ liệu localstorage từ string sang object
  let index = parseInt(document.getElementById("index").value);
  // cập nhật lại nội dung của phần tử index
  lists[index] = obj_customer;
  // cập nhật lại nội dung của lists
  localStorage.setItem("customer", JSON.stringify(lists)); //Chuyển lists sang string=>đưavào localstorage
  show_lists(); //Hiển thị ra table
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "block";
  reset_form();
};

window.onload = () => {
  show_lists(); //Hiển thị ra table
};

// Array.from(document.querySelectorAll("#formInfo input")).reduce((acc, input) => ({...acc, [input.id]: input.value }), {});
