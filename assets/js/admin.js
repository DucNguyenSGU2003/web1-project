
function hienThiTrangAdmin(obj) {
    switch (obj.id) {
        case "trangchu": {
            trangChuUser();
            break;
        }
        case "quanlyuser": {
            quanlyuser();
            break;
        }
        case "quanlysanpham": {
            quanlysanpam();
            break;
        }
        case "quanlydonhang": {
            quanlydonhang();
            break;
        }
        case "thongkekinhdoanh": {
    

            break;
        }
    }
}




function trangChuUser() {
window.location.href = "http://127.0.0.1:5500/user.html";
document.getElementById("sign-in").outerHTML = `
<div id="sign-in" onclick="dangXuat();">
<i class="fas fa-sign-in-alt"></i>
<a href="#">Đăng Xuất</a>
</div>`
document.getElementById("user").innerHTML = `<i class="fas fa-cog"></i><a href="#">Admin</a>`
}

function quanlyuser() {
var s = `            
<table id="quanlyuser">
    <thead>
        <th>STT</th>
        <th>Họ Tên</th>
        <th>Số điện thoại</th>
        <th>Tài Khoản</th>
        <th>Mật Khẩu</th>
    </thead>
    <tbody id="table-body">
        
    </tbody>
    <tfoot>
        <tr id="tongTaiKhoan">
            
        </tr>
    </tfoot>
</table>`;
document.getElementById("container").innerHTML = s;
var listTaiKhoan = JSON.parse(localStorage.getItem("listTaiKhoan"));
var s = "";
for (var i = 0; i < listTaiKhoan.length; i++) {
    s += `
    <tr>
        <td>${i+1}</td>
        <td>${listTaiKhoan[i].hoten}</td>
        <td>${listTaiKhoan[i].sdt}</td>
        <td>${listTaiKhoan[i].taikhoan}</td>
        <td>${listTaiKhoan[i].matkhau}</td>
    </tr>`
}
document.getElementById("table-body").innerHTML = s;
document.getElementById("tongTaiKhoan").innerHTML = `<th colspan="5"><spanp>Tổng Tài Khoản: </spanp>${listTaiKhoan.length}</th>`
}


function quanlysanpam() {
var s = `
    <div class = "content">
        <table id="quanlysanpham">
            <thead>
                <th>STT</th>
                <th>Tên Hãng</th>
                <th>Tên Sản Phẩm</th>
                <th>Mã Sản Phẩm</th>
                <th>Hình Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Giá</th>
                <th>Action</th>
            </thead>
            <tbody id="table-body">

            </tbody>

            <tr id="themSp" onclick="addsp()">
                <th colspan="8">Thêm Sản Phẩm <i class="fas fa-plus"></i></th>
            </tr>
            <tfoot>
                <tr id="tongSanPham">

                </tr>
                <tr id="tongNike">

                </tr>
                <tr id="tongAdidas">

                </tr>
                <tr id="tongJordan">

                </tr>
                <tr id="tongMen">

                </tr>
                <tr id="tongBitis">

                </tr>
            </tfoot>
        </table>
    </div>`;
document.getElementById("container").innerHTML = s;
var s = "";
var stt=0,tong=0,nike=0,adidas=0,jordan=0,men=0,bitis=0;
var arr = JSON.parse(localStorage.getItem("sanPham"));
for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
        s += `
        <tr>
            <td>${++stt}</td>
            <td class="brand">${arr[i][j].brand}</td>
            <td class="name">${arr[i][j].name}</td>
            <td class="productID">${arr[i][j].productId}</td>
            <td class="img"><img src="${arr[i][j].img}" alt=""></td>
            <td class="quantity">${arr[i][j].quantity}</td>
            <td class="price">${arr[i][j].price}đ</td>
            <td class="action">
                <button onclick="editsp(this);">Edit</button>
                <button onclick="deletesp(this);">Delete</button>
            </td>
        </tr>`;
        tong += arr[i][j].quantity;
        if (arr[i][j].brand === "Nike") {
            nike += arr[i][j].quantity;
        }
        else if (arr[i][j].brand === "Adidas"){
            adidas += arr[i][j].quantity;
        }
        else if (arr[i][j].brand === "Jordan"){
            jordan += arr[i][j].quantity;
        }
        else if (arr[i][j].brand === "Men"){
            men += arr[i][j].quantity;
        }
        else {
            bitis += arr[i][j].quantity;
        }

    }
}
document.getElementById("table-body").innerHTML = s;
document.getElementById("tongSanPham").innerHTML = `<th colspan="8"><spanp>Tổng Sản Phẩm: </spanp>${tong}</th>`;
document.getElementById("tongNike").innerHTML = `<th colspan="8"><spanp>Tổng Giày Nike: </spanp>${nike}</th>`;
document.getElementById("tongAdidas").innerHTML = `<th colspan="8"><spanp>Tổng Giày Adidas: </spanp>${adidas}</th>`;
document.getElementById("tongJordan").innerHTML = `<th colspan="8"><spanp>Tổng Giày Jordan: </spanp>${jordan}</th>`;
document.getElementById("tongMen").innerHTML = `<th colspan="8"><spanp>Tổng Giày Nam: </spanp>${men}</th>`;
document.getElementById("tongBitis").innerHTML = `<th colspan="8"><spanp>Tổng Giày Bitis: </spanp>${bitis}</th>`;
}


var brand;
var productID;
function editsp(button) {
    document.getElementById("editSP").style.display = "block";
    brand = button.parentElement.parentElement.querySelector(".brand").innerHTML;
    var name = button.parentElement.parentElement.querySelector(".name").innerHTML;
    productID = button.parentElement.parentElement.querySelector(".productID").innerHTML;
    var img = button.parentElement.parentElement.querySelector(".img").querySelector("img").getAttribute("src");
    var quantity = button.parentElement.parentElement.querySelector(".quantity").innerHTML;
    var price = button.parentElement.parentElement.querySelector(".price").innerHTML;
    

    var edit = document.getElementById("form-edit");
    var arr = edit.querySelector(".hangsp").children;
    for (var option of arr) {
        if (option.value === brand) {
            option.setAttribute("selected", "selected");
            edit.querySelector(".hangsp").firstElementChild.innerText = "Nike";
        }
        else {
            if (option.getAttribute("selected")) {
                option.removeAttribute("selected");
            }
        }
    }

    edit.querySelector(".hangsp").firstElementChild.innerHTML = brand;
    edit.querySelector(".tensp").value = name;
    edit.querySelector(".idsp").value = productID;
    edit.querySelector(".hinhsp").setAttribute("src",img);
    edit.querySelector(".slsp").value = quantity;
    edit.querySelector(".giasp").value = price;
}

function closeEdit() {
    document.getElementById("editSP").style.display = "none";
}

function thietlapEdit() {
    // Kiểm tra trùng thông tin với các sản phẩm trước
    var hang = document.getElementById("form-edit").querySelector(".hangsp").value;
    var tensp = document.getElementById("form-edit").querySelector(".tensp").value;
    var masp = document.getElementById("form-edit").querySelector(".idsp").value;
    var hinhsp = document.getElementById("form-edit").querySelector(".hinhsp").getAttribute("src");
    var slsp = document.getElementById("form-edit").querySelector(".slsp").value;
    var giasp = document.getElementById("form-edit").querySelector(".giasp").value;
    var arr = JSON.parse(localStorage.getItem("sanPham"));
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (arr[i][j].productId != productID) {
                if (arr[i][j].name === tensp) {
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "";
    
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "Tên sản phẩm đã tồn tại";
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").style.color = "red";
                    return false;
                }
                else if (arr[i][j].productId === masp) {
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "";
    
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "ID sản phẩm đã tồn tại";
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").style.color = "red";
                    return false;
    
                }
                else if (arr[i][j].img === hinhsp) {
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "";
    
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "Hình sản phẩm đã tồn tại";
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").style.color = "red";
                    return false;
                }
                else {
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "";
                }

            }
            
        }
    }
    var checkId = document.querySelector(".idsp").parentElement.querySelector(".error-message").innerText;
    var checkTen = document.querySelector(".tensp").parentElement.querySelector(".error-message").innerText;
    var checkHinh = document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerText;
    var Nike = JSON.parse(localStorage.getItem("nike"));
    var Adidas = JSON.parse(localStorage.getItem("adidas"));
    var Jordan = JSON.parse(localStorage.getItem("jordan"));
    var Men = JSON.parse(localStorage.getItem("men"));
    var Bitis = JSON.parse(localStorage.getItem("bitis"));
    var sanpham = JSON.parse(localStorage.getItem("sanPham"));
    if (checkId==="" && checkTen==="" && checkHinh==="") {
        if (document.querySelector(".hangsp").value === brand) {
            if (brand === "Nike") {
                Nike.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Nike));

                
                sanpham[0].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }
            else if (brand === "Adidas") {
                Adidas.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Adidas));

                sanpham[1].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }
            else if (brand === "Jordan") {
                Jordan.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Jordan));

                sanpham[2].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }
            else if (brand === "Men") {
                Men.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Men));

                sanpham[3].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }
            else if (brand === "Bitis") {
                Bitis.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Bitis));

                sanpham[4].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }

        }
        else {
            if (brand === "Nike") {
                for (var i = 0; i < Nike.length; i++) {
                    if (Nike[i].productId == productID) {
                        Nike.splice(i,1);
                        break;
                    }
                }
            }
            else if (brand === "Adidas") {
                for (var i = 0; i < Adidas.length; i++) {
                    if (Adidas[i].productId === productID) {
                        Adidas.splice(i,1);
                        break;
                    }
                }

            }
            else if (brand === "Jordan") {
                for (var i = 0; i < Jordan.length; i++) {
                    if (Jordan[i].productId === productID) {
                        Jordan.splice(i,1);
                        break;
                    }
                }

            }
            else if (brand === "Men") {
                for (var i = 0; i < Men.length; i++) {
                    if (Men[i].productId === productID) {
                        Men.splice(i,1);
                        break;
                    }
                }

            }
            else {
                for (var i = 0; i < Bitis.length; i++) {
                    if (Bitis[i].productId === productID) {
                        Bitis.splice(i,1);
                        break;
                    }
                }

            }


            if (hang === "Nike") {
                Nike.push({
                    productId: masp,
                    brand: hang,
                    img: hinhsp,
                    name: tensp,
                    price: parseInt(giasp),
                    quantity: parseInt(slsp),
                })
                console.log(Nike);
            }
            else if (hang === "Adidas") {
                Adidas.push({
                    productId: masp,
                    brand: hang,
                    img: hinhsp,
                    name: tensp,
                    price: parseInt(giasp),
                    quantity: parseInt(slsp),
                })
                console.log(Adidas);
            }
            else if (hang === "Jordan") {
                Jordan.push({
                    productId: masp,
                    brand: hang,
                    img: hinhsp,
                    name: tensp,
                    price: parseInt(giasp),
                    quantity: parseInt(slsp),
                })
                console.log(Jordan);
            }
            else if (hang === "Men") {
                Men.push({
                    productId: masp,
                    brand: hang,
                    img: hinhsp,
                    name: tensp,
                    price: parseInt(giasp),
                    quantity: parseInt(slsp),
                })
                console.log(Men);
            }
            else {
                Bitis.push({
                    productId: masp,
                    brand: hang,
                    img: hinhsp,
                    name: tensp,
                    price: parseInt(giasp),
                    quantity: parseInt(slsp),
                })
                console.log(Bitis);
            }
            
            sanpham = [Nike,Adidas,Jordan,Men,Bitis];
            localStorage.setItem("nike",JSON.stringify(Nike));
            localStorage.setItem("adidas",JSON.stringify(Adidas));
            localStorage.setItem("jordan",JSON.stringify(Jordan));
            localStorage.setItem("men",JSON.stringify(Men));
            localStorage.setItem("bitis",JSON.stringify(Bitis));
            localStorage.setItem("sanPham",JSON.stringify(sanpham));
        }
        alert("Thiết Lập Thành Công!");
        closeEdit();
    }
}

function doiHinh(event) {
    event.stopPropagation();
    event.preventDefault();

    var files = event.target.files;
    var file = files[0];

    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent) {
        var url = fileReader.result;

        var myImg = document.getElementById("form-edit").querySelector(".hinhsp");
        myImg.src = url;
    }
    fileReader.readAsDataURL(file);
}




function deletesp(button) {
    document.getElementById("deleteSP").style.display = "block";
    var hang = button.parentElement.parentElement.querySelector(".brand").innerText;
    var ten = button.parentElement.parentElement.querySelector(".name").innerText;
    var ma = button.parentElement.parentElement.querySelector(".productID").innerText;
    var soluong = parseInt(button.parentElement.parentElement.querySelector(".quantity").innerText);

    var s = `
        <p class="hang">${hang}</p>
        <p class="ten">${ten}</p>
        <p class="ma">${ma}</p>
        <p class="soluong">Số Lượng Xóa <br></p>
        <select name="" id="chon">

        </select>
    `;
    document.getElementById("thongtin").innerHTML = s;
    s = "";
    for (let index = 1; index <= soluong; index++) {
        s += `<option value="${index}">${index}</option>`
    }
    document.getElementById("chon").innerHTML = s;
}

var DeleteContainer = document.getElementById("main-delete");
DeleteContainer.addEventListener('click',function(event) {
    event.stopPropagation();
})

function closeDelete() {
    document.getElementById("deleteSP").style.display = "none";
}

function thietlapDelete() {
    var soluong = parseInt(document.getElementById("chon").value);
    var max = parseInt(document.getElementById("chon").lastElementChild.innerText);
    var brand = document.getElementById("thongtin").querySelector(".hang").innerText;
    var productId = document.getElementById("thongtin").querySelector(".ma").innerText;
    console.log(soluong,max,brand,productId);
    var sanPham = JSON.parse(localStorage.getItem("sanPham"));
    var Nike = JSON.parse(localStorage.getItem("nike"));
    var Adidas = JSON.parse(localStorage.getItem("adidas"));
    var Jordan = JSON.parse(localStorage.getItem("jordan"));
    var Men = JSON.parse(localStorage.getItem("men"));
    var Bitis = JSON.parse(localStorage.getItem("bitis"));

    if (brand === "Nike") {
        var mang = JSON.parse(localStorage.getItem("nike"));
    }
    else if (brand === "Adidas") {
        var mang = JSON.parse(localStorage.getItem("adidas"));
    }
    else if (brand === "Jordan") {
        var mang = JSON.parse(localStorage.getItem("jordan"));
    }
    else if (brand === "Men") {
        var mang = JSON.parse(localStorage.getItem("men"));
    }
    else {
        var mang = JSON.parse(localStorage.getItem("bitis"));
    }

    console.log(mang);
    if (soluong === max) {
        mang.forEach(function(value,index) {
            if (value.productId === productId) {
                mang.splice(index,1);
            }
        });
        console.log("sau khi xóa hết",mang);
    }
    else {
        mang.forEach(function(value,index) {
            if (value.productId === productId) {
                value.quantity = value.quantity - soluong;
            }
        });
        console.log("sau khi xóa số lượng",mang);
    }


    if (brand === "Nike") {
        sanPham = [mang,Adidas,Jordan,Men,Bitis];
        localStorage.setItem("nike",JSON.stringify(mang));
    }
    else if (brand === "Adidas") {
        sanPham = [Nike,mang,Jordan,Men,Bitis];
        localStorage.setItem("adidas",JSON.stringify(mang));
    }
    else if (brand === "Jordan") {
        sanPham = [Nike,Adidas,mang,Men,Bitis];
        localStorage.setItem("jordan",JSON.stringify(mang));
    }
    else if (brand === "Men") {
        sanPham = [Nike,Adidas,Jordan,mang,Bitis];
        localStorage.setItem("men",JSON.stringify(mang));
    }
    else {
        sanPham = [Nike,Adidas,Jordan,Men,mang];
        localStorage.setItem("bitis",JSON.stringify(mang));
    }

    localStorage.setItem("sanPham",JSON.stringify(sanPham));
    alert("Xóa thành công!");
    closeDelete();
}


function addsp() {
    document.getElementById("addSP").style.display = "block";
}

function closeAdd() {
    document.getElementById("addSP").style.display = "none";
    document.getElementById("form-add").querySelector(".tensp").value = "";
    document.getElementById("form-add").querySelector(".idsp").value = "";
    document.getElementById("form-add").querySelector(".hinhsp").src = "";
    document.getElementById("form-add").querySelector(".hinhsp").style.display = "none";
    document.getElementById("form-add").querySelector(".slsp").value = "";
    document.getElementById("form-add").querySelector(".giasp").value = "";


}


function doiHinh1(event) {
    event.stopPropagation();
    event.preventDefault();

    var files = event.target.files;
    var file = files[0];

    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent) {
        var url = fileReader.result;
        document.getElementById("form-add").querySelector(".hinhsp").style.display = "block";
        var myImg = document.getElementById("form-add").querySelector(".hinhsp");
        myImg.src = url;
    }
    fileReader.readAsDataURL(file);
}


function thietlapAdd() {
    // Kiểm tra trùng thông tin với các sản phẩm trước
    var hang = document.getElementById("form-add").querySelector(".hangsp").value;
    var tensp = document.getElementById("form-add").querySelector(".tensp").value;
    var masp = document.getElementById("form-add").querySelector(".idsp").value;
    var hinhsp = document.getElementById("form-add").querySelector(".hinhsp").getAttribute("src");
    var slsp = document.getElementById("form-add").querySelector(".slsp").value;
    var giasp = document.getElementById("form-add").querySelector(".giasp").value;
    var arr = JSON.parse(localStorage.getItem("sanPham"));
    console.log("hình",hinhsp);
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
                if (arr[i][j].name === tensp) {
                    document.getElementById("form-add").querySelector(".idsp").parentElement.querySelector(".error").innerHTML = "";
                    document.getElementById("form-add").querySelector(".tensp").parentElement.querySelector(".error").innerHTML = "Tên sản phẩm đã tồn tại";
                    document.getElementById("form-add").querySelector(".tensp").parentElement.querySelector(".error").style.color = "red";
                    return false;
                }
                else if (arr[i][j].productId === masp) {
                    document.getElementById("form-add").querySelector(".tensp").parentElement.querySelector(".error").innerHTML = "";
                    document.getElementById("form-add").querySelector(".idsp").parentElement.querySelector(".error").innerHTML = "ID sản phẩm đã tồn tại";
                    document.getElementById("form-add").querySelector(".idsp").parentElement.querySelector(".error").style.color = "red";
                    return false;
    
                }
                else {
                    document.getElementById("form-add").querySelector(".idsp").parentElement.querySelector(".error").innerHTML = "";
                    document.getElementById("form-add").querySelector(".tensp").parentElement.querySelector(".error").innerHTML = "";
                }
        }
    }
    var checkId = document.getElementById("form-add").querySelector(".idsp").parentElement.querySelector(".error").innerText;
    var checkTen = document.getElementById("form-add").querySelector(".tensp").parentElement.querySelector(".error").innerText;
    var Nike = JSON.parse(localStorage.getItem("nike"));
    var Adidas = JSON.parse(localStorage.getItem("adidas"));
    var Jordan = JSON.parse(localStorage.getItem("jordan"));
    var Men = JSON.parse(localStorage.getItem("men"));
    var Bitis = JSON.parse(localStorage.getItem("bitis"));
    var sanpham = JSON.parse(localStorage.getItem("sanPham"));

    if (checkId==="" && checkTen===""  && slsp !== "" && giasp!=="" && tensp!=="" && masp!=="" && hinhsp!=="") {
        if (hang === "Nike") {
            Nike.push({
                productId: masp,
                brand: hang,
                img: hinhsp,
                name: tensp,
                price: parseInt(giasp),
                quantity: parseInt(slsp),
            })
            console.log(Nike);
        }
        else if (hang === "Adidas") {
            Adidas.push({
                productId: masp,
                brand: hang,
                img: hinhsp,
                name: tensp,
                price: parseInt(giasp),
                quantity: parseInt(slsp),
            })
            console.log(Adidas);
        }
        else if (hang === "Jordan") {
            Jordan.push({
                productId: masp,
                brand: hang,
                img: hinhsp,
                name: tensp,
                price: parseInt(giasp),
                quantity: parseInt(slsp),
            })
            console.log(Jordan);
        }
        else if (hang === "Men") {
            Men.push({
                productId: masp,
                brand: hang,
                img: hinhsp,
                name: tensp,
                price: parseInt(giasp),
                quantity: parseInt(slsp),
            })
            console.log(Men);
        }
        else {
            Bitis.push({
                productId: masp,
                brand: hang,
                img: hinhsp,
                name: tensp,
                price: parseInt(giasp),
                quantity: parseInt(slsp),
            })
            console.log(Bitis);
        }
        
        sanpham = [Nike,Adidas,Jordan,Men,Bitis];
        localStorage.setItem("nike",JSON.stringify(Nike));
        localStorage.setItem("adidas",JSON.stringify(Adidas));
        localStorage.setItem("jordan",JSON.stringify(Jordan));
        localStorage.setItem("men",JSON.stringify(Men));
        localStorage.setItem("bitis",JSON.stringify(Bitis));
        localStorage.setItem("sanPham",JSON.stringify(sanpham));

        
        alert("Thiết Lập Thành Công!");
        closeAdd();
    }
}





function quanlydonhang() {
    var s = `
    <div class = "content">
        <h1 id="title-chuaXuLy">Các Đơn Hàng Chưa Xử Lý</h1>
        <table id="quanlydonhang-chuaXuLy">
            <thead>
                <th>STT</th>
                <th>Mã Đơn Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Số Điện Thoại</th>
                <th>Sản Phẩm</th>
                <th>Thành Tiền</th>
                <th>Action</th>
            </thead>
            <tbody id="table-chuaXuLy">

            </tbody>
        
            <tfoot>
                <tr>
                    <td colspan="7">
                        <button onclick="duyetHetDonHang();">Duyệt Hết</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>


    <div class = "content">
        <h1 id="title-daXuLy">Các Đơn Hàng Đã Xử Lý</h1>
        <table id="quanlydonhang-daXuLy">
            <thead>
                <th>STT</th>
                <th>Mã Đơn Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Số Điện Thoại</th>
                <th>Sản Phẩm</th>
                <th>Thành Tiền</th>
            </thead>

            <tbody id="table-daXuLy">

            </tbody>
        </table>
    </div>


`;
    document.getElementById("container").innerHTML = s;

    var listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    var string = "";
    var s = "";
    var sttchuaXuLy = 0;
    var sttdaXuLy = 0;
    var tong = 0;
    for (var a of listDonHang) {
        if (a.donhang.length !== 0) {
            for (var i = 0; i < a.donhang.length; i++) {
                if (a.donhang[i].duocDuyet === false) { // Chưa được duyệt ==> In trong table-chuaXuLy
                    for (var j = 0; j < a.donhang[i].giohang.length; j++) {
                        s+= `<span class="Ten">${a.donhang[i].giohang[j].nameProduct}</span> <span class="SoLuong">(${a.donhang[i].giohang[j].quantity})</span><br>`;
                        tong+= parseInt(a.donhang[i].giohang[j].money);
                    }
                    string = `
                    <tr>
                        <td>${++sttchuaXuLy}</td>
                        <td class="maDonHang">${a.donhang[i].madh}</td>
                        <td class="tenKhachHang">${a.name}</td>
                        <td class="sdtKhachHang">${a.sdt}</td>
                        <td class="SanPham">
                            ${s}
                        </td>
                        <td class="ThanhTien">${tong}đ</td>
                        <td>
                            <button onclick="duyetDonHang(this);">Duyệt</button>
                        </td>
                    </tr>`;
                    document.getElementById("table-chuaXuLy").innerHTML += string;
                    s = "";
                    tong = 0;
                }

                else { // Được duyệt rồi ==> In trong table-daXuLy
                    for (var j = 0; j < a.donhang[i].giohang.length; j++) {
                        s+= `<span class="Ten">${a.donhang[i].giohang[j].nameProduct}</span> <span class="SoLuong">(${a.donhang[i].giohang[j].quantity})</span><br>`;
                        tong+= parseInt(a.donhang[i].giohang[j].money);
                    }
                    string = `
                    <tr>
                        <td>${++sttdaXuLy}</td>
                        <td class="maDonHang">${a.donhang[i].madh}</td>
                        <td class="tenKhachHang">${a.name}</td>
                        <td class="sdtKhachHang">${a.sdt}</td>
                        <td class="SanPham">
                            ${s}
                        </td>
                        <td class="ThanhTien">${tong}đ</td>
                    </tr>`;
                    document.getElementById("table-daXuLy").innerHTML += string;
                    s = "";
                    tong = 0;
                }
            }
        }
    }
}


/** Khi bấm duyệt
 * đưa vào localStorage listDonHang-daXuLy, in ra trong table listDonHang daXuLy
 * xóa số đi số lượng sản phẩm trên localStorage: nike/adidas/jordan/men/bitis , sanPham
 * inner vào Đơn hàng của trang người dùng đó thành đã xử lý
 */
function duyetDonHang(button) {
    alert("Duyệt Thành Công!");
    
    // Chuyển đơn hàng từ chưa xử lý sang xử lý
    var tenKhachHang = button.parentElement.parentElement.querySelector(".tenKhachHang").innerText;
    var maDonHang = button.parentElement.parentElement.querySelector(".maDonHang").innerText;
    var listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    var listSanPham = [];
    for (var a of listDonHang) {
        if (a.name === tenKhachHang) {
            for (var i = 0; i < a.donhang.length; i++) {
                if (a.donhang[i].madh === maDonHang) {
                    a.donhang[i].duocDuyet = true;
                    listSanPham = a.donhang[i].giohang;
                }
            }
        }
    }
    localStorage.setItem("listDonHang", JSON.stringify(listDonHang));




    // Xóa đi số lượng sản phẩm hiện có
    var nike = JSON.parse(localStorage.getItem("nike"));
    var adidas = JSON.parse(localStorage.getItem("adidas"));
    var jordan = JSON.parse(localStorage.getItem("jordan"));
    var men = JSON.parse(localStorage.getItem("men"));
    var bitis = JSON.parse(localStorage.getItem("bitis"));
    var sanPham = JSON.parse(localStorage.getItem("sanPham"));

    for (var a of listSanPham) {
        for (var i = 0; i < sanPham.length; i++) {
            for (var j = 0; j < sanPham[i].length; j++) {
                if (a.nameProduct === sanPham[i][j].name) {
                    if (a.quantity === sanPham[i][j].quantity) {
                    // Xóa ở các mảng sản phẩm
                        if (sanPham[i][j].brand === "Nike") {
                            nike.splice(j,1);
                        }
                        else if (sanPham[i][j].brand === "Adidas") {
                            adidas.splice(j,1);
                        }
                        else if (sanPham[i][j].brand === "Jordan") {
                            jordan.splice(j,1);
                        }
                        else if (sanPham[i][j].brand === "Men") {
                            men.splice(j,1);
                        }
                        else {
                            bitis.splice(j,1);
                        }
                    }
                    else {
                        console.log("Số lượng",a.quantity);
                        if (sanPham[i][j].brand === "Nike") {
                            nike[j].quantity -= a.quantity;
                        console.log(nike[j].quantity);
                        }
                        else if (sanPham[i][j].brand === "Adidas") {
                            adidas[j].quantity -= a.quantity;
                            console.log(adidas[j].quantity);
                        }
                        else if (sanPham[i][j].brand === "Jordan") {
                            jordan[j].quantity -= a.quantity;
                            console.log(jordan[j].quantity);
                        }
                        else if (sanPham[i][j].brand === "Men") {
                            men[j].quantity -= a.quantity;
                            console.log(men[j].quantity);
                        }
                        else {
                            bitis[j].quantity -= a.quantity;
                            console.log(bitis[j].quantity);
                        }
                    }
            
                }
            }
        }

    }

    sanPham = [nike,adidas,jordan,men,bitis];
    localStorage.setItem("nike",JSON.stringify(nike));
    localStorage.setItem("adidas",JSON.stringify(adidas));
    localStorage.setItem("jordan",JSON.stringify(jordan));
    localStorage.setItem("men",JSON.stringify(men));
    localStorage.setItem("bitis",JSON.stringify(bitis));
    localStorage.setItem("sanPham",JSON.stringify(sanPham));
}


function duyetHetDonHang() {
    alert("Đã Duyệt Hết!");
    var listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    for (var a of listDonHang) {
        if (a.donhang.length !== 0) {
            for (var i = 0; i < a.donhang.length; i++) {
                if (a.donhang[i].duocDuyet === false) {
                    a.donhang[i].duocDuyet = true;
                }
            }
        }
    }
    localStorage.setItem("listDonHang",JSON.stringify(listDonHang));
}