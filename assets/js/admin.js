function DangXuatAdmin()
{
window.location.href = 'http://127.0.0.1:8080/loginAdmin.html'
localStorage.removeItem('userId')
}




function hienThiTrangAdmin(obj) {
  localStorage.setItem("page", obj.id);
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
      quanlysanpham();
      break;
    }
    case "quanlyphieunhap": {
      quanlyphieunhap();
      break;
    }

    case "quanlydonhang": {
      quanlydonhang('*');
      break;
    }
    case "baocaoton": {
        baocaoton();
      break;
    }
  }
}

function getAccUser() {
  var listTaiKhoan = JSON.parse(localStorage.getItem("listTaiKhoan")) || [];
  listTaiKhoan = listTaiKhoan.filter((item) => item.role == "1");
  return listTaiKhoan;
}
function quanlyuser() {
  var s = `
  <div class="user-container">
    <h2 class="user-title">Quản Lý Người Dùng</h2>

  
    <table class="user-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ Tên</th>
          <th>Số Điện Thoại</th>
          <th>Tài Khoản</th>
          <th>Mật Khẩu</th>
          <th>Sử dụng</th>
              <th></th>
        </tr>
      </thead>
      <tbody id="table-body"></tbody>
     
    </table>
  </div>`;

  document.getElementById("container").innerHTML = s;

  var listTaiKhoan = getAccUser();
  var rows = "";
  for (var i = 0; i < listTaiKhoan.length; i++) {
    rows += `
      <tr id="user-row-${i}">
        <td>${i + 1}</td>
        <td>${listTaiKhoan[i].hoten}</td>
        <td>${listTaiKhoan[i].sdt}</td>
        <td>${listTaiKhoan[i].taikhoan}</td>
        <td>${listTaiKhoan[i].matkhau}</td>
        <td><input type="checkbox" ${
          listTaiKhoan[i].status == "1" ? "checked" : ""
        } onchange="anUser('${listTaiKhoan[i].taikhoan}',this)"></td>
        <td><button class="btn-reset" onclick="resetMatKhauTK('${
          listTaiKhoan[i].taikhoan
        }')">Reset mật khẩu</button></td>
        </tr>`;
  }

  document.getElementById("table-body").innerHTML = rows;
}

function anUser(tk, checkbox) {
  var list = getAccUser();
  var index = list.findIndex((item) => item.taikhoan == tk);
  if (index >= 0) {
    if (checkbox.checked) list[index].status = "1";
    else list[index].status = "0";

    localStorage.setItem("listTaiKhoan", JSON.stringify(list));
    showSuccessToast("Thay đổi trạng thái tài khoản thành công!");
  }
}

function resetMatKhauTK(us) {
  var list = getAccUser();
  var index = list.findIndex((item) => item.taikhoan == us);
  if (index >= 0) {
    var resetmk = parseInt(localStorage.getItem("resetmk")) + 1;

    list[index].matkhau = "thankyou" + resetmk;
    localStorage.setItem("resetmk", resetmk);
    localStorage.setItem("listTaiKhoan", JSON.stringify(list));
    var r = `
        <div style="text-align:center">
        <h3>Mật khẩu của tài khoản ${list[index].taikhoan} là: ${resetmk} </h3>
                    <button class="btn-reset"onclick="goBack('quanlyuser')">OK</button> 
            </div>       
            `;
    document.getElementsByClassName("user-container")[0].innerHTML = r;
    showSuccessToast("Thay đổi trạng thái tài khoản thành công!");
  }
}
function goBack(id) {
  hienThiTrangAdmin({ id: id });
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
  var stt = 0,
    tong = 0,
    nike = 0,
    adidas = 0,
    jordan = 0,
    men = 0,
    bitis = 0;
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
      } else if (arr[i][j].brand === "Adidas") {
        adidas += arr[i][j].quantity;
      } else if (arr[i][j].brand === "Jordan") {
        jordan += arr[i][j].quantity;
      } else if (arr[i][j].brand === "Men") {
        men += arr[i][j].quantity;
      } else {
        bitis += arr[i][j].quantity;
      }
    }
  }
  document.getElementById("table-body").innerHTML = s;
  document.getElementById(
    "tongSanPham"
  ).innerHTML = `<th colspan="8"><spanp>Tổng Sản Phẩm: </spanp>${tong}</th>`;
  document.getElementById(
    "tongNike"
  ).innerHTML = `<th colspan="8"><spanp>Tổng Giày Nike: </spanp>${nike}</th>`;
  document.getElementById(
    "tongAdidas"
  ).innerHTML = `<th colspan="8"><spanp>Tổng Giày Adidas: </spanp>${adidas}</th>`;
  document.getElementById(
    "tongJordan"
  ).innerHTML = `<th colspan="8"><spanp>Tổng Giày Jordan: </spanp>${jordan}</th>`;
  document.getElementById(
    "tongMen"
  ).innerHTML = `<th colspan="8"><spanp>Tổng Giày Nam: </spanp>${men}</th>`;
  document.getElementById(
    "tongBitis"
  ).innerHTML = `<th colspan="8"><spanp>Tổng Giày Bitis: </spanp>${bitis}</th>`;
}

var brand;
var productID;
function editsp(button) {
  document.getElementById("editSP").style.display = "block";
  brand = button.parentElement.parentElement.querySelector(".brand").innerHTML;
  var name =
    button.parentElement.parentElement.querySelector(".name").innerHTML;
  productID =
    button.parentElement.parentElement.querySelector(".productID").innerHTML;
  var img = button.parentElement.parentElement
    .querySelector(".img")
    .querySelector("img")
    .getAttribute("src");
  var quantity =
    button.parentElement.parentElement.querySelector(".quantity").innerHTML;
  var price =
    button.parentElement.parentElement.querySelector(".price").innerHTML;

  var edit = document.getElementById("form-edit");
  var arr = edit.querySelector(".hangsp").children;
  for (var option of arr) {
    if (option.value === brand) {
      option.setAttribute("selected", "selected");
      edit.querySelector(".hangsp").firstElementChild.innerText = "Nike";
    } else {
      if (option.getAttribute("selected")) {
        option.removeAttribute("selected");
      }
    }
  }

  edit.querySelector(".hangsp").firstElementChild.innerHTML = brand;
  edit.querySelector(".tensp").value = name;
  edit.querySelector(".idsp").value = productID;
  edit.querySelector(".hinhsp").setAttribute("src", img);
  edit.querySelector(".slsp").value = quantity;
  edit.querySelector(".giasp").value = price;
}

function closeEdit() {
  document.getElementById("editSP").style.display = "none";
}

function thietlapEdit() {
  // Kiểm tra trùng thông tin với các sản phẩm trước
  var hang = document
    .getElementById("form-edit")
    .querySelector(".hangsp").value;
  var tensp = document
    .getElementById("form-edit")
    .querySelector(".tensp").value;
  var masp = document.getElementById("form-edit").querySelector(".idsp").value;
  var hinhsp = document
    .getElementById("form-edit")
    .querySelector(".hinhsp")
    .getAttribute("src");
  var slsp = document.getElementById("form-edit").querySelector(".slsp").value;
  var giasp = document
    .getElementById("form-edit")
    .querySelector(".giasp").value;
  var arr = JSON.parse(localStorage.getItem("sanPham"));
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j].productId != productID) {
        if (arr[i][j].name === tensp) {
          document
            .querySelector(".idsp")
            .parentElement.querySelector(".error-message").innerHTML = "";
          document
            .querySelector(".hinhsp")
            .parentElement.querySelector(".error-message").innerHTML = "";

          document
            .querySelector(".tensp")
            .parentElement.querySelector(".error-message").innerHTML =
            "Tên sản phẩm đã tồn tại";
          document
            .querySelector(".tensp")
            .parentElement.querySelector(".error-message").style.color = "red";
          return false;
        } else if (arr[i][j].productId === masp) {
          document
            .querySelector(".tensp")
            .parentElement.querySelector(".error-message").innerHTML = "";
          document
            .querySelector(".hinhsp")
            .parentElement.querySelector(".error-message").innerHTML = "";

          document
            .querySelector(".idsp")
            .parentElement.querySelector(".error-message").innerHTML =
            "ID sản phẩm đã tồn tại";
          document
            .querySelector(".idsp")
            .parentElement.querySelector(".error-message").style.color = "red";
          return false;
        } else if (arr[i][j].img === hinhsp) {
          document
            .querySelector(".idsp")
            .parentElement.querySelector(".error-message").innerHTML = "";
          document
            .querySelector(".tensp")
            .parentElement.querySelector(".error-message").innerHTML = "";

          document
            .querySelector(".hinhsp")
            .parentElement.querySelector(".error-message").innerHTML =
            "Hình sản phẩm đã tồn tại";
          document
            .querySelector(".hinhsp")
            .parentElement.querySelector(".error-message").style.color = "red";
          return false;
        } else {
          document
            .querySelector(".idsp")
            .parentElement.querySelector(".error-message").innerHTML = "";
          document
            .querySelector(".tensp")
            .parentElement.querySelector(".error-message").innerHTML = "";
          document
            .querySelector(".hinhsp")
            .parentElement.querySelector(".error-message").innerHTML = "";
        }
      }
    }
  }
  var checkId = document
    .querySelector(".idsp")
    .parentElement.querySelector(".error-message").innerText;
  var checkTen = document
    .querySelector(".tensp")
    .parentElement.querySelector(".error-message").innerText;
  var checkHinh = document
    .querySelector(".hinhsp")
    .parentElement.querySelector(".error-message").innerText;
  console.log(checkId, checkTen, checkHinh);
  var Nike = JSON.parse(localStorage.getItem("nike"));
  var Adidas = JSON.parse(localStorage.getItem("adidas"));
  var Jordan = JSON.parse(localStorage.getItem("jordan"));
  var Men = JSON.parse(localStorage.getItem("men"));
  var Bitis = JSON.parse(localStorage.getItem("bitis"));
  var sanpham = JSON.parse(localStorage.getItem("sanPham"));
  if (checkId === "" && checkTen === "" && checkHinh === "") {
    if (document.querySelector(".hangsp").value === brand) {
      if (brand === "Nike") {
        Nike.forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("nike", JSON.stringify(Nike));

        sanpham[0].forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("sanPham", JSON.stringify(sanpham));
      } else if (brand === "Adidas") {
        Adidas.forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("nike", JSON.stringify(Adidas));

        sanpham[1].forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("sanPham", JSON.stringify(sanpham));
      } else if (brand === "Jordan") {
        Jordan.forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("nike", JSON.stringify(Jordan));

        sanpham[2].forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("sanPham", JSON.stringify(sanpham));
      } else if (brand === "Men") {
        Men.forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("nike", JSON.stringify(Men));

        sanpham[3].forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("sanPham", JSON.stringify(sanpham));
      } else if (brand === "Bitis") {
        Bitis.forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("nike", JSON.stringify(Bitis));

        sanpham[4].forEach(function (value, index) {
          if (value.productId === productID) {
            value.productId = masp;
            value.name = tensp;
            value.img = hinhsp;
            value.quantity = parseInt(slsp);
            value.price = parseInt(giasp);
          }
        });
        localStorage.setItem("sanPham", JSON.stringify(sanpham));
      }
    } else {
      if (brand === "Nike") {
        for (var i = 0; i < Nike.length; i++) {
          if (Nike[i].productId == productID) {
            Nike.splice(i, 1);
            break;
          }
        }
      } else if (brand === "Adidas") {
        for (var i = 0; i < Adidas.length; i++) {
          if (Adidas[i].productId === productID) {
            Adidas.splice(i, 1);
            break;
          }
        }
      } else if (brand === "Jordan") {
        for (var i = 0; i < Jordan.length; i++) {
          if (Jordan[i].productId === productID) {
            Jordan.splice(i, 1);
            break;
          }
        }
      } else if (brand === "Men") {
        for (var i = 0; i < Men.length; i++) {
          if (Men[i].productId === productID) {
            Men.splice(i, 1);
            break;
          }
        }
      } else {
        for (var i = 0; i < Bitis.length; i++) {
          if (Bitis[i].productId === productID) {
            Bitis.splice(i, 1);
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
        });
        console.log(Nike);
      } else if (hang === "Adidas") {
        Adidas.push({
          productId: masp,
          brand: hang,
          img: hinhsp,
          name: tensp,
          price: parseInt(giasp),
          quantity: parseInt(slsp),
        });
        console.log(Adidas);
      } else if (hang === "Jordan") {
        Jordan.push({
          productId: masp,
          brand: hang,
          img: hinhsp,
          name: tensp,
          price: parseInt(giasp),
          quantity: parseInt(slsp),
        });
        console.log(Jordan);
      } else if (hang === "Men") {
        Men.push({
          productId: masp,
          brand: hang,
          img: hinhsp,
          name: tensp,
          price: parseInt(giasp),
          quantity: parseInt(slsp),
        });
        console.log(Men);
      } else {
        Bitis.push({
          productId: masp,
          brand: hang,
          img: hinhsp,
          name: tensp,
          price: parseInt(giasp),
          quantity: parseInt(slsp),
        });
        console.log(Bitis);
      }

      sanpham = [Nike, Adidas, Jordan, Men, Bitis];
      localStorage.setItem("nike", JSON.stringify(Nike));
      localStorage.setItem("adidas", JSON.stringify(Adidas));
      localStorage.setItem("jordan", JSON.stringify(Jordan));
      localStorage.setItem("men", JSON.stringify(Men));
      localStorage.setItem("bitis", JSON.stringify(Bitis));
      localStorage.setItem("sanPham", JSON.stringify(sanpham));
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

  fileReader.onload = function (progressEvent) {
    var url = fileReader.result;

    var myImg = document.getElementById("form-edit").querySelector(".hinhsp");
    myImg.src = url;
  };
  fileReader.readAsDataURL(file);
}

function deletesp(button) {
  document.getElementById("deleteSP").style.display = "block";
  var hang =
    button.parentElement.parentElement.querySelector(".brand").innerText;
  var ten = button.parentElement.parentElement.querySelector(".name").innerText;
  var ma =
    button.parentElement.parentElement.querySelector(".productID").innerText;
  var soluong = parseInt(
    button.parentElement.parentElement.querySelector(".quantity").innerText
  );

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
    s += `<option value="${index}">${index}</option>`;
  }
  document.getElementById("chon").innerHTML = s;
}

var DeleteContainer = document.getElementById("main-delete");
DeleteContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

function closeDelete() {
  document.getElementById("deleteSP").style.display = "none";
}

function thietlapDelete() {
  var soluong = parseInt(document.getElementById("chon").value);
  var max = parseInt(
    document.getElementById("chon").lastElementChild.innerText
  );
  var brand = document
    .getElementById("thongtin")
    .querySelector(".hang").innerText;
  var productId = document
    .getElementById("thongtin")
    .querySelector(".ma").innerText;
  console.log(soluong, max, brand, productId);
  var sanPham = JSON.parse(localStorage.getItem("sanPham"));
  var Nike = JSON.parse(localStorage.getItem("nike"));
  var Adidas = JSON.parse(localStorage.getItem("adidas"));
  var Jordan = JSON.parse(localStorage.getItem("jordan"));
  var Men = JSON.parse(localStorage.getItem("men"));
  var Bitis = JSON.parse(localStorage.getItem("bitis"));

  if (brand === "Nike") {
    var mang = JSON.parse(localStorage.getItem("nike"));
  } else if (brand === "Adidas") {
    var mang = JSON.parse(localStorage.getItem("adidas"));
  } else if (brand === "Jordan") {
    var mang = JSON.parse(localStorage.getItem("jordan"));
  } else if (brand === "Men") {
    var mang = JSON.parse(localStorage.getItem("men"));
  } else {
    var mang = JSON.parse(localStorage.getItem("bitis"));
  }

  console.log(mang);
  if (soluong === max) {
    mang.forEach(function (value, index) {
      if (value.productId === productId) {
        mang.splice(index, 1);
      }
    });
    console.log("sau khi xóa hết", mang);
  } else {
    mang.forEach(function (value, index) {
      if (value.productId === productId) {
        value.quantity = value.quantity - soluong;
      }
    });
    console.log("sau khi xóa số lượng", mang);
  }

  if (brand === "Nike") {
    sanPham = [mang, Adidas, Jordan, Men, Bitis];
    localStorage.setItem("nike", JSON.stringify(mang));
  } else if (brand === "Adidas") {
    sanPham = [Nike, mang, Jordan, Men, Bitis];
    localStorage.setItem("adidas", JSON.stringify(mang));
  } else if (brand === "Jordan") {
    sanPham = [Nike, Adidas, mang, Men, Bitis];
    localStorage.setItem("jordan", JSON.stringify(mang));
  } else if (brand === "Men") {
    sanPham = [Nike, Adidas, Jordan, mang, Bitis];
    localStorage.setItem("men", JSON.stringify(mang));
  } else {
    sanPham = [Nike, Adidas, Jordan, Men, mang];
    localStorage.setItem("bitis", JSON.stringify(mang));
  }

  localStorage.setItem("sanPham", JSON.stringify(sanPham));
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
  document.getElementById("form-add").querySelector(".hinhsp").style.display =
    "none";
  document.getElementById("form-add").querySelector(".slsp").value = "";
  document.getElementById("form-add").querySelector(".giasp").value = "";
}

function doiHinh1(event) {
  event.stopPropagation();
  event.preventDefault();

  var files = event.target.files;
  var file = files[0];

  var fileReader = new FileReader();

  fileReader.onload = function (progressEvent) {
    var url = fileReader.result;
    document.getElementById("form-add").querySelector(".hinhsp").style.display =
      "block";
    var myImg = document.getElementById("form-add").querySelector(".hinhsp");
    myImg.src = url;
  };
  fileReader.readAsDataURL(file);
}

function thietlapAdd() {
  // Kiểm tra trùng thông tin với các sản phẩm trước
  var hang = document.getElementById("form-add").querySelector(".hangsp").value;
  var tensp = document.getElementById("form-add").querySelector(".tensp").value;
  var masp = document.getElementById("form-add").querySelector(".idsp").value;
  var hinhsp = document
    .getElementById("form-add")
    .querySelector(".hinhsp")
    .getAttribute("src");
  var slsp = document.getElementById("form-add").querySelector(".slsp").value;
  var giasp = document.getElementById("form-add").querySelector(".giasp").value;
  var arr = JSON.parse(localStorage.getItem("sanPham"));
  console.log("hình", hinhsp);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (arr[i][j].name === tensp) {
        document
          .getElementById("form-add")
          .querySelector(".idsp")
          .parentElement.querySelector(".error").innerHTML = "";
        document
          .getElementById("form-add")
          .querySelector(".tensp")
          .parentElement.querySelector(".error").innerHTML =
          "Tên sản phẩm đã tồn tại";
        document
          .getElementById("form-add")
          .querySelector(".tensp")
          .parentElement.querySelector(".error").style.color = "red";
        return false;
      } else if (arr[i][j].productId === masp) {
        document
          .getElementById("form-add")
          .querySelector(".tensp")
          .parentElement.querySelector(".error").innerHTML = "";
        document
          .getElementById("form-add")
          .querySelector(".idsp")
          .parentElement.querySelector(".error").innerHTML =
          "ID sản phẩm đã tồn tại";
        document
          .getElementById("form-add")
          .querySelector(".idsp")
          .parentElement.querySelector(".error").style.color = "red";
        return false;
      } else {
        document
          .getElementById("form-add")
          .querySelector(".idsp")
          .parentElement.querySelector(".error").innerHTML = "";
        document
          .getElementById("form-add")
          .querySelector(".tensp")
          .parentElement.querySelector(".error").innerHTML = "";
      }
    }
  }
  var checkId = document
    .getElementById("form-add")
    .querySelector(".idsp")
    .parentElement.querySelector(".error").innerText;
  var checkTen = document
    .getElementById("form-add")
    .querySelector(".tensp")
    .parentElement.querySelector(".error").innerText;
  var Nike = JSON.parse(localStorage.getItem("nike"));
  var Adidas = JSON.parse(localStorage.getItem("adidas"));
  var Jordan = JSON.parse(localStorage.getItem("jordan"));
  var Men = JSON.parse(localStorage.getItem("men"));
  var Bitis = JSON.parse(localStorage.getItem("bitis"));
  var sanpham = JSON.parse(localStorage.getItem("sanPham"));

  if (
    checkId === "" &&
    checkTen === "" &&
    slsp !== "" &&
    giasp !== "" &&
    tensp !== "" &&
    masp !== "" &&
    hinhsp !== ""
  ) {
    if (hang === "Nike") {
      Nike.push({
        productId: masp,
        brand: hang,
        img: hinhsp,
        name: tensp,
        price: parseInt(giasp),
        quantity: parseInt(slsp),
      });
      console.log(Nike);
    } else if (hang === "Adidas") {
      Adidas.push({
        productId: masp,
        brand: hang,
        img: hinhsp,
        name: tensp,
        price: parseInt(giasp),
        quantity: parseInt(slsp),
      });
      console.log(Adidas);
    } else if (hang === "Jordan") {
      Jordan.push({
        productId: masp,
        brand: hang,
        img: hinhsp,
        name: tensp,
        price: parseInt(giasp),
        quantity: parseInt(slsp),
      });
      console.log(Jordan);
    } else if (hang === "Men") {
      Men.push({
        productId: masp,
        brand: hang,
        img: hinhsp,
        name: tensp,
        price: parseInt(giasp),
        quantity: parseInt(slsp),
      });
      console.log(Men);
    } else {
      Bitis.push({
        productId: masp,
        brand: hang,
        img: hinhsp,
        name: tensp,
        price: parseInt(giasp),
        quantity: parseInt(slsp),
      });
      console.log(Bitis);
    }

    sanpham = [Nike, Adidas, Jordan, Men, Bitis];
    localStorage.setItem("nike", JSON.stringify(Nike));
    localStorage.setItem("adidas", JSON.stringify(Adidas));
    localStorage.setItem("jordan", JSON.stringify(Jordan));
    localStorage.setItem("men", JSON.stringify(Men));
    localStorage.setItem("bitis", JSON.stringify(Bitis));
    localStorage.setItem("sanPham", JSON.stringify(sanpham));

    alert("Thiết Lập Thành Công!");
    closeAdd();
  }
}


function getDonHangOfAcc()
{
    var list = JSON.parse(localStorage.getItem('DonHang'));
    return list;
}







function renderArrSPXuat()
{
  var arr1  = JSON.parse(localStorage.getItem('DonHang')) || [];
  arr1 = arr1.filter(item=>item.status != 5);
    var list_sp  = []
    var l = arr1.length;
    for(var  i = 0 ; i< l ; i++)
    {
        var index =  list_sp.findIndex((item)=>{
                return item.productId == arr1[i].productId  
        })
        if(index >= 0 )
        {
            list_sp[index].so_luong += parseFloat(arr1[i].so_luong);
        }else
        {
            list_sp.push(arr1[i]);
        }
            
    }
    return list_sp;
}




function renderArrSPNhap()
{
  var arr1  = JSON.parse(localStorage.getItem('PhieuNhap')) || [];
  arr1 = arr1.filter(item=>item.status == 1);
    var list_sp  = []
    var l = arr1.length;
    for(var  i = 0 ; i< l ; i++)
    {
        var index =  list_sp.findIndex((item)=>{
                return item.productId == arr1[i].productId  
        })
        if(index >= 0 )
        {
            list_sp[index].so_luong += parseFloat(arr1[i].so_luong);
        }else
        {
            list_sp.push(arr1[i]);
        }
            
    }
    return list_sp;
}


function baocaoton() {


  var dfrom  = document.getElementById('dfrom') != null ? document.getElementById('dfrom').value: '';
if(dfrom != '')
{
  var df = new Date(dfrom);
  arr = arr.filter(item=>(new Date(item.date0) >= df));
}



var dto  = document.getElementById('dto') != null ? document.getElementById('dto').value: '';
if(dto != '')
{
  var dt = new Date(dto);
  arr = arr.filter(item=>(new Date(item.date0) <= dt));
}




  var s = `
  <div class="sanpham-container">
    <div class="sanpham-title">
      <h2>Báo cáo tồn</h2>

       <label>Từ ngày</label>
   <input id='dfrom' class="add-sanpham-input" id='ngay-nhap' type="date"/>
      <label>Đến ngày</label>
    <input  id='dto' class="add-sanpham-input" id='ngay-nhap' type="date"/>
    
    <div>
 
       <button class="btn-reset" onclick="baocaoton()">Lọc </button></div>
  
    </div>
    
    
    
    <table class="sanpham-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Sản phẩm</th>
          <th>Size</th>
          <th>Nhập</th>
          <th>Xuất</th>
          <th>Tồn</th>
        </tr>
      </thead>
      <tbody id="sanpham-table-body"></tbody>
    </table>
  </div>`;

  document.getElementById("container").innerHTML = s;

  var listSanPham = renderArrSP();

  var phieu_xuat = renderArrSPXuat();
  var phieu_nhap =renderArrSPNhap();
  var rows = "";
  for (var i = 0; i < listSanPham.length; i++) {
    var d = listSanPham[i];

    var statusText = d.status == "1" ? "checked" : "";

    var size = ``;
    var arrSize = getSizeBySP(d.productId);
    for (var s = 0; s < arrSize.length; s++) {
      var c = "";
      if (arrSize[s].status == "1") c = "#51a105";
      else c = "red";
      size += `<input type="button" class="btn-size" style="background:${c}; color:white" value="${arrSize[s].size}"/>
       `;
    }
    // nhập: 
  
    // var PhieuNhap = JSON.parse(localStorage.PhieuNhap);
    // PhieuNhap = PhieuNhap.filter(item=>(item.productId == d.productId && item.status == '1'));
    // for(var i = 0 ;i <PhieuNhap.length;i++)
    //   {
    //     if(PhieuNhap.status == '1' && PhieuNhap.productId == d.productId )
    //     {
    //       nhap+=parseFloat(PhieuNhap[i].so_luong)
    //     }
    //   } 

    var x =0 
    var arrXuat=  phieu_xuat.filter(item=> item.productId == d.productId);
    if(arrXuat.length>0)
    {
      x = arrXuat[0].quantity
    }
      var nhap=0;

       var arrNhap=  phieu_nhap.filter(item=> item.productId == d.productId);
    if(arrNhap.length>0)
    {
      x = arrNhap[0].so_luong
    }
    
    rows += `
      <tr onclick="selectID('${d.productId}')">
       <td class="sanpham-name">${d.productId}</td>
        <td class="user-cell">
          <img src="${d.img}" class="user-avatar" alt="${d.name}">
          <div class="user-info">
            <div class="user-name">${d.name}</div>
          </div>
        </td>
        <td class="sanpham-size">${size}</td>
        <td class="team-cell">
          <div class="team-avatars">
            ${d.price_nhap}
          </div>
        </td>
        <td class="status-cell">
          ${x}
        </td>
    <!--    <td class="budget-cell"> <span class="status-badge"><input type="checkbox" ${statusText} onchange=""></span></td> -->
        <td class="budget-cell">
       ${d.quantity}
        </td>
      </tr>`;
  }

  document.getElementById("sanpham-table-body").innerHTML = rows;


  
if(dfrom != '')
{
  document.getElementById('dfrom').value = dfrom
}


if(dto != '')
{
  document.getElementById('dto').value = dto

}

}

function quanlydonhang(status) {
  localStorage.setItem('statusOrder',status)
var arr = getDonHangOfAcc();
var dfrom  = document.getElementById('dfrom') != null ? document.getElementById('dfrom').value: '';
if(dfrom != '')
{
  var df = new Date(dfrom);
  arr = arr.filter(item=>(new Date(item.date0) >= df));
}



var dto  = document.getElementById('dto') != null ? document.getElementById('dto').value: '';
if(dto != '')
{
  var dt = new Date(dto);
  arr = arr.filter(item=>(new Date(item.date0) <= dt));
}

if( status != '*')
    arr = arr.filter(item => item.status == status);
var listDonHoang = ``
var listStatus = JSON.parse(localStorage.status);

arr.forEach(item=>{
listDonHoang +=`
 <div id="user-container">
 <div class="order-card">
      <div class="order-header">
        <div class="shop-info">
        Mã đơn hàng: ${item.stt_rec}
        </div>
        <div class="shop-actions">
          <span class="shop-status">${item.status == '4'  ?"🚚 Giao hàng thành công · ":""}<span style="color:#ff5722;">${listStatus[item.status+'']}</span></span>
        </div>
      </div>
      <div class="product-list">
        <div class="product-item">
          <div class="product-img">
            <img src="${item.img}" alt="${item.name}">
          </div>
          <div class="product-info">
            <div class="product-title">${item.name}</div>
            <div class="product-meta">Size: ${item.size} <span class="product-qty">x${item.quantity}</span></div>
          </div>
          <div class="product-price">
            <span class="price-now">${item.price} VNĐ</span>
          </div>
        </div>
      </div>
      <div class="order-footer">
        <div class="order-total">Thành tiền: <strong>${item.total} VNĐ</strong></div>
        <div class="footer-actions">
       <button class="btn-back" onclick="showOrder('${item.stt_rec}')">Chi tiết</button>
        ${(item.status != '4' && item.status != '5')   ?`<button class="btn-back" onclick="ChuyenTrangThaiDonHang('${item.stt_rec}')">Chuyển Trạng Thái</button>`:""}
          
        </div>
      </div>
    </div>
</div>
`;


})
var r = `
  <div class="orders-container">
        <label>Từ ngày</label>
   <input id='dfrom' class="add-sanpham-input" id='ngay-nhap' type="date"/>
      <label>Đến ngày</label>
    <input  id='dto' class="add-sanpham-input" id='ngay-nhap' type="date"/>
     
    <div class="tabs">
      <div class="tab ${status == "*" ? "active" :"" }" onclick="quanlydonhang('*')">Tất cả</div>
      <div class="tab ${status == "1" ? "active" :"" }" onclick="quanlydonhang('1')">Chờ xác nhận</div>
      <div class="tab ${status == "2" ? "active" :"" }" onclick="quanlydonhang('2')">Đang lấy hàng</div>
      <div class="tab ${status == "3" ? "active" :"" }" onclick="quanlydonhang('3')">Đang vận chuyển</div>
      <div class="tab ${status == "4" ? "active" :"" }" onclick="quanlydonhang('4')">Hoàn thành</div>
      <div class="tab ${status == "5" ? "active" :"" }" onclick="quanlydonhang('5')" >Đã hủy</div>
    </div>

    ${listDonHoang != '' ? listDonHoang :'<h3 style="text-align:center;">Chưa có Đơn hàng</h3>' }
  </div>
`;
document.getElementById("container").innerHTML = r ;


if(dfrom != '')
{
  document.getElementById('dfrom').value = dfrom
}


if(dto != '')
{
  document.getElementById('dto').value = dto

}

}

showSuccessToast("Đăng nhập thành công!");

function quanlysanpham() {
  var s = `
  <div class="sanpham-container">
    <div class="sanpham-title">
   
    <div>
    <h2>Quản Lý Sản Phẩm</h2>
 <!--   <label>ID</label>
    <input id="id-varriant" disabled type='text'/>
      <label>Size:</label>
    <input type='number'/>
     <input type="button" class="btn-add" onclick="addVarriant()"value="Thêm biến thể" /> -->
       <button class="btn-reset" onclick="showAddProduct('A');">Thêm mới </button></div>
  
    </div>
    
    
    
    <table class="sanpham-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Sản phẩm</th>
          <th>Size</th>
          <th>Giá nhập</th>
          <th>Giá bán</th>
          <!-- <th>Trạng thái</th> -->
          <th></th>
        </tr>
      </thead>
      <tbody id="sanpham-table-body"></tbody>
    </table>
  </div>`;

  document.getElementById("container").innerHTML = s;

  var listSanPham = renderArrSP();

  var rows = "";
  for (var i = 0; i < listSanPham.length; i++) {
    var d = listSanPham[i];

    var statusText = d.status == "1" ? "checked" : "";

    var size = ``;
    var arrSize = getSizeBySP(d.productId);
    for (var s = 0; s < arrSize.length; s++) {
      var c = "";
      if (arrSize[s].status == "1") c = "#51a105";
      else c = "red";
      size += `<input type="button" class="btn-size" style="background:${c}; color:white" value="${arrSize[s].size}"/>
       `;
    }

    rows += `
      <tr onclick="selectID('${d.productId}')">
       <td class="sanpham-name">${d.productId}</td>
        <td class="user-cell">
          <img src="${d.img}" class="user-avatar" alt="${d.name}">
          <div class="user-info">
            <div class="user-name">${d.name}</div>
          </div>
        </td>
        <td class="sanpham-size">${size}</td>
        <td class="team-cell">
          <div class="team-avatars">
            ${d.price_nhap}
          </div>
        </td>
        <td class="status-cell">
          ${d.price}
        </td>
    <!--    <td class="budget-cell"> <span class="status-badge"><input type="checkbox" ${statusText} onchange=""></span></td> -->
        <td class="budget-cell">
       
        <input type="button" class="btn-edit" onclick="showAddProduct('E','${d.productId}')" value="Sửa"/>
        </td>
      </tr>`;
  }

  document.getElementById("sanpham-table-body").innerHTML = rows;
}

function quanlyphieunhap() {
  var s = `
  <div class="sanpham-container">
    <div class="sanpham-title">
   
    <div>
    <h2>Quản lý phiếu nhập</h2>
       <button class="btn-reset" onclick="showAddPhieuNhap('A');">Thêm mới </button></div>
    </div>
    
    
    
    <table class="sanpham-table">
      <thead>
        <tr>
          <th>Mã phiếu nhập</th>
          <th>Ngày nhập hàng</th>
           <th>Tổng Tiền</th>
           <th>Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="sanpham-table-body"></tbody>
    </table>
  </div>`;

  document.getElementById("container").innerHTML = s;

  var listSanPham = getPhieuNhapGroup();

  var rows = "";
  for (var i = 0; i < listSanPham.length; i++) {
    var d = listSanPham[i];

    var statusStr = JSON.parse(localStorage.statusPND)[d.status];
    rows += `
      <tr >
     
        <td class="user-cell">
         
          <div class="user-info">
            <div class="user-name">${d.stt_rec}</div>
          </div>
        </td>
        <td class="sanpham-size"> ${
          new Date(d.ngay_nhap).toISOString().split("T")[0]
        }</td>
        <td class="team-cell">
          ${d.tong_tien_phieu}
        </td>
          <td class="sanpham-name">${statusStr}</td>
        <td class="budget-cell">
       
        <input type="button" class="btn-edit" onclick="showAddPhieuNhap('E','${
          d.stt_rec
        }')" value="Sửa"/>
        </td>
      </tr>`;
  }

  document.getElementById("sanpham-table-body").innerHTML = rows;
}

function getSizeBySP(id) {
  var sanPham = JSON.parse(localStorage.sanPham);

  var size = ``;

  var arrSize = sanPham.filter(
    (item) => item.productId == id && item.productId == id
  );
  var size = arrSize.map((item) => ({
    size: item.size,
    status: item.status,
  }));
  return size;
}

function renderArrSP() {
  var arr1 = JSON.parse(localStorage.getItem("sanPham"));
  var list_sp = [];
  var l = arr1.length;
  for (var i = 0; i < l; i++) {
    var index = list_sp.findIndex((item) => {
      return item.productId == arr1[i].productId;
    });
    if (index >= 0) {
      list_sp[index].quantity += parseFloat(arr1[i].quantity);
    } else {
      list_sp.push(arr1[i]);
    }
  }
  return list_sp;
}

function selectID(id) {
  document.getElementById("id-varriant").value = id;
}

function previewImage(event) {
  document.getElementById("previewImg").src = URL.createObjectURL(
    event.target.files[0]
  );
  localStorage.setItem("file", event.target.files[0].name);
}

function showAddProduct(action = "A", productId = "") {
  localStorage.setItem("action", action);
  if (action == "A") localStorage.setItem("list_size", JSON.stringify([]));

  localStorage.removeItem("file");
  var r = ``;

  var renderCombo = ``;
  var combo = JSON.parse(localStorage.type);
  for (var i = 0; i < combo.length; i++) {
    renderCombo += `  <option value="${combo[i].id}">${combo[i].name}</option>`;
  }

  var stt_rec = combo[0].id + localStorage.stt_rec_product;
  localStorage.setItem(
    "stt_rec_product",
    parseFloat(localStorage.stt_rec_product) + 1
  );

  r = `
    <div class="add-sanpham-container">
  <button class="btn-reset"onclick="goBack('quanlysanpham')"> < Quay lại</button> 
        <h1 class="add-sanpham-title">
        
        ${action == "A" ? "Thêm sản phẩm" : "Sửa sản phẩm"}</h1>

        <div class="add-sanpham-grid">
            <div class="add-sanpham-left">
                <div class="add-sanpham-image-preview">
                    <img id="previewImg" src="" alt="">
                </div>

                <input class="add-sanpham-file" type="file" onchange="previewImage(event)">
            </div>

            <!-- RIGHT -->
            <div class="add-sanpham-right">
            <div id="combobox-panel">
            <label class="add-sanpham-label">Thể loại <span style="color:red">*</span></label>
               <select id="product-type" style="width:200px" onchange="changeType(this)">
                    ${renderCombo}
              </select>
            </div>  
                <label class="add-sanpham-label">Mã sản phẩm <span style="color:red">*</span></label>
                <input id="productId" class="add-sanpham-input" value="${stt_rec}"disabled type="text">

                <label class="add-sanpham-label">Tên sản phẩm <span style="color:red">*</span></label>
                <input id="productName" class="add-sanpham-input" type="text">

                <label class="add-sanpham-label">Giá nhập <span style="color:red">*</span></label>
                <input id="price-import" class="add-sanpham-input" type="number">

                <label class="add-sanpham-label">Giá bán <span style="color:red">*</span></label>
                <input id="price" class="add-sanpham-input" type="number">

                <label class="add-sanpham-label">Mô tả</label>
                <textarea id="mota"  class="add-sanpham-textarea"></textarea>
            </div>
        </div>

        <button class="add-sanpham-btn-submit" onclick="checkBeforProduct('${action}')">Thêm sản phẩm</button>


        <div class="variant-container">
        <div class="variant-title">Quản lý biến thể</div>
        <label><b>Size: </b></label>
        <input id="input-variant" type='number'    oninput="this.value = this.value < 0 ? 0 : this.value"/>
     <input type="button" class="btn-add" onclick="addVarriant()"value="Thêm biến thể" /> 
            <table class="variant-table">
                <thead>
                    <tr>
                        <th>Kích thước</th>
                        <th>Trạng thái</th>
                      ${localStorage.action == 'E'?"":' <th>Hành động</th>'} 

                    </tr>
                </thead>
                <tbody>
                  
                </tbody>
            </table>
        </div>

    </div>`;

  document.getElementById("container").innerHTML = r;

  if (action == "E") {
    var product = getDetailProduct(productId);
    var list_size = product.map((item) => {
      return {
        size: item.size,
        status: item.status,
      };
    });
    localStorage.setItem("list_size", JSON.stringify(list_size));
    renderCheckBoxVariant(list_size);

    document.getElementById("product-type").disabled = true;
    document.getElementById("price-import").disabled = true;
    document.getElementById("price").disabled = true;
    document.getElementById("combobox-panel").style.display = "none";
    document.getElementsByClassName("add-sanpham-btn-submit")[0].innerHTML =
      "Cập nhật thông tin sản phẩm";
    var type = document.getElementById("product-type").value;
    document.getElementById("productName").value = product[0].name;
    document.getElementById("productId").value = product[0].productId;
    document.getElementById("price-import").value = product[0].price_nhap;
    document.getElementById("price").value = product[0].price;
    document.getElementById("previewImg").src = product[0].img;
    document.getElementById("mota").value = product[0].mo_ta;

    const arr = product[0].img.split("/").map((item) => item.trim());
    localStorage.setItem("file", arr[arr.length - 1].trim());
     document.querySelectorAll(".btn-delete").forEach((item) => {
        item.parentElement.style.display ='none';
      });
  }
}
function changeType(type) {
  document.querySelector(".add-sanpham-input#productId").value =
    type.value + localStorage.stt_rec_product + "";
  localStorage.setItem(
    "stt_rec_product",
    parseFloat(localStorage.stt_rec_product) + 1
  );
}

function checkBeforProduct(action) {
  var type = document.getElementById("product-type").value;
  var productId = document.getElementById("productId").value;
  var productName = document.getElementById("productName").value;
  var price_import = parseFloat(document.getElementById("price-import").value);
  var price = parseFloat(document.getElementById("price").value);
  var mota = document.getElementById("mota").value;

  if (
    productId == "" ||
    productName == "" ||
    price_import == "" ||
    price == "" ||
    mota == ""
  ) {
    showErrorToast("Bắt buộc nhập các trường dữ liệu!");
    return;
  }
  if (!localStorage.file || localStorage.file == "") {
    showErrorToast("Bắt buộc chọn hình ảnh của sản phẩm!");
    return;
  }
  if (price <= price_import) {
    showWarningToast("Giá bán phải lớn hơn giá nhập!");
    return;
  }

  var list_size = JSON.parse(localStorage.list_size);

  if (list_size.length <= 0) {
    showErrorToast("Bạn chưa nhập danh sách biến thể!");
    document.getElementById("input-variant").focus();
    return;
  }

  var tmp = {
    productId: productId,
    type: type || "",
    productName: productName,
    price_import: price_import,
    price: price,
    mota: mota,
  };

  if (action == "A") {
    AddProductToList(tmp);
  }

  if (action == "E") {
    EditProductToList(tmp);
  }
}

function addVarriant() {
  var list_size = JSON.parse(localStorage.list_size);
  
 if(document.getElementById("input-variant").value == '')
  {
    showErrorToast('Vui lòng nhập size!')
    return;
  }
  var value_variant = {
    size: parseFloat(document.getElementById("input-variant").value),
    status: "1",
  };
  var checkExists = list_size.findIndex((item) => {
    return item.size == value_variant.size;
  });

  if (checkExists >= 0) {
    showErrorToast("Biến thể đã tồn tại!");
    return;
  }

  list_size.push(value_variant);
  localStorage.setItem("list_size", JSON.stringify(list_size));

  var r = ``;
  renderCheckBoxVariant(list_size);

  document.getElementById("input-variant").value = "";
}

function AddProductToList(data) {
  var list_size = JSON.parse(localStorage.list_size);
  console.log(1);
  var list_type = JSON.parse(localStorage.type);
  var new_products = [];
  var file = localStorage.file.toLowerCase();
  list_size.forEach((item) => {
    var brand = list_type.filter((i) => i.id == data.type)[0].name;
    var img = `./assets/img/${brand.toLowerCase()}/${file}`;
    var product = new giay(
      data.productId,
      brand,
      img,
      data.productName,
      data.price,
      0,
      item.size,
      data.price_import,
      data.mota,
      item.status
    );
    new_products.push(product);
  });
  var sanPham = JSON.parse(localStorage.sanPham);
  var newSanPham = [...sanPham, ...new_products];
  localStorage.setItem("sanPham", JSON.stringify(newSanPham));
  showSuccessToast("Thêm sản phẩm thành công");
  quanlysanpham();
}



function EditProductToList(data) {
  var list_size = JSON.parse(localStorage.list_size);
  var list_type = JSON.parse(localStorage.type);
  var new_products = [];
  var file = localStorage.file.toLowerCase();
  var sanPham = JSON.parse(localStorage.sanPham);
  
  for(var i = 0 ; i < list_size.length ; i++  )
  {

       var brand = list_type.filter((i) => i.id == data.type)[0].name;
    var img = `./assets/img/${brand.toLowerCase()}/${file}`;
    var index  = sanPham.findIndex(item => item.productId == data.productId && item.size == list_size[i].size);
    if(index >= 0 )
    {
      sanPham[index].img = img;
      sanPham[index].mo_ta = data.mota;
      sanPham[index].name =data.productName;
      sanPham[index].status =list_size[i].status;
    }
  }


localStorage.setItem('sanPham',JSON.stringify(sanPham))

  showSuccessToast("Cập nhật sản phẩm thành công");
  quanlysanpham();
}

function deleteVariant(size) {
  var list_size = JSON.parse(localStorage.getItem("list_size"));
  var action = localStorage.action;
  if (action == "A") {
    list_size = list_size.filter((item) => item.size != size);
    localStorage.setItem("list_size", JSON.stringify(list_size));
    var r = ``;
    renderCheckBoxVariant(list_size);
  }
}


function deleteVariant(size) {
  var list_size = JSON.parse(localStorage.getItem("list_size"));
  var action = localStorage.action;
  if (action == "A") {
    list_size = list_size.filter((item) => item.size != size);
    localStorage.setItem("list_size", JSON.stringify(list_size));
    var r = ``;
    renderCheckBoxVariant(list_size);
  }
}

function renderCheckBoxVariant(list_size) {
  var r = ``;
  list_size.forEach((item) => {
    var x =` <td ><button  class="btn-delete" onclick="deleteVariant(${
                item.size
              })">Xóa biến thể</button>`
    r += `<tr>
              <td>${item.size}</td>
              <td><input type="checkbox"  ${
                item.status == 1 ? "checked" : ""
              }  onchange="changeStatusVariant(this,'${item.size}')" /></td>
              ${localStorage.action == 'E'?'':x}
             </td>
          </tr>`;
  });
  document.querySelector(".variant-table>tbody").innerHTML = r;
}

function changeStatusVariant(button, size) {
  var list_size = JSON.parse(localStorage.list_size);
  list_size.forEach((item) => {
    if (item.size == size) {
      button.checked == true ? (item.status = 1) : (item.status = 0);
    }
  });
  localStorage.setItem("list_size", JSON.stringify(list_size));
  renderCheckBoxVariant(list_size);
}

function getDetailProduct(id) {
  var arr = JSON.parse(localStorage.getItem("sanPham"));
  var obj = arr.filter((item) => item.productId == id);
  return obj;
}

function showAddPhieuNhap(action = "A", id = "") {
  localStorage.setItem("action", action);
  if (action == "A") localStorage.setItem("list_detail", JSON.stringify([]));

  localStorage.removeItem("file");
  var r = ``;

  var statusPND = JSON.parse(localStorage.statusPND);

  var statusPNDStr = ``;
  statusPND.forEach((item, index) => {
    statusPNDStr += `  <option value="${index}">${item}</option>`;
  });
  var stt_rec = "PND" + localStorage.stt_rec_product;
  localStorage.setItem(
    "stt_rec_product",
    parseFloat(localStorage.stt_rec_product) + 1
  );

  r = `
    <div class="add-sanpham-container">
  <button class="btn-reset"onclick="goBack('quanlyphieunhap')"> < Quay lại</button> 
      
  
  <h1 class="add-sanpham-title">
        
        ${action == "A" ? "Thêm Phiếu Nhập" : "Sửa Phiếu nhập"}</h1>

        <div class="add-sanpham-grid">
        
            <!-- RIGHT -->
            <div class="add-sanpham-right">
                <label class="add-sanpham-label">Số chứng từ <span style="color:red">*</span></label>
                <input id="PhieuNhapId" class="add-sanpham-input" value="${stt_rec}"disabled type="text">
                <div class="form-chi-tiet">
                  <div class="add-phieunhap-title">
                  <div class="form-chi-tiet-current">
                   <label class="add-sanpham-label">Mã sản phẩm <span style="color:red">*</span></label>
                   <input id="variantId" class="add-sanpham-input" type="text" onkeydown="changeVarriantId(event,this)">
                </div>
                  <div class="form-chi-tiet-current">
                   <label class="add-sanpham-label">Giá nhập<span style="color:red">*</span></label>
                   <input type="number" id="gia-nhap" class="add-sanpham-input" disabled>
                </div>
              <div id="combobox-panel1">
                <label class="add-sanpham-label">Size: <span style="color:red">*</span></label>
               <select id="product-size" style="width:200px">
              </select>
             </div> 
                   <div class="form-chi-tiet-current">
                   <label class="add-sanpham-label">Số lượng nhập <span style="color:red">*</span></label>
                   <input  type="number" id="so-luong" class="add-sanpham-input" >
                </div>
             <div>
                <label class="add-sanpham-label"></label>

                </div>
                </div class="form-chi-tiet-current">
                
                <input type="button" class="btn-reset1" onclick="resetAddVarriant()"value="Nhập lại mã sản phẩm" /> 
                <input type="button" class="btn-add" onclick="AddDetailPhieuNhap()"value="Thêm chi tiết" /> 
            </div>
                      
            
            </div>

            <div class="add-sanpham-left">
               <button class="add-sanpham-btn-submit" onclick="checkBeforPhieuNhap('${action}')">Thêm phiếu nhập </button>
                  

              <div id="combobox-panel">
              <label class="add-sanpham-label">Ngày nhập <span style="color:red">*</span></label>
             <input class="add-sanpham-input" id='ngay-nhap' type="date"/>
             <label class="add-sanpham-label">Trạng thái <span style="color:red">*</span></label>
               <select id="statusPND" style="width:100%">
              ${statusPNDStr}
               </select>
             </div>  
              </div>
      
        </div>

     

        <div class="variant-container">
        <div class="variant-title">Danh sách chi tiết:</div>
            <table class="variant-table">
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Size</th>
                        <th>Giá nhập</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                         <th></th>
                    </tr>
                </thead>
                <tbody>
                  
                </tbody>
            </table>
        </div>

    </div>`;

  document.getElementById("container").innerHTML = r;

  if (action == "A") {
    const today = new Date().toLocaleDateString("en-CA");
    document.getElementById("ngay-nhap").value = today;
  }
  if (action == "E") {
    var list_detail = getPhieuNhapByKey(id);
    localStorage.setItem("list_detail", JSON.stringify(list_detail));
    renderDetailPhieuNhap();
    var statusPNDValue = list_detail[0].status;
    document.getElementById("statusPND").value = statusPNDValue;
    var ngay_nhap = new Date(list_detail[0].ngay_nhap)
      .toISOString()
      .split("T")[0];
    document.getElementById("ngay-nhap").value = ngay_nhap;
    document.getElementById("PhieuNhapId").value = list_detail[0].stt_rec;
    document.getElementsByClassName("add-sanpham-btn-submit")[0].innerHTML =
      "Cập nhật phiếu nhập";
    if (statusPNDValue == 1) {
      document.getElementById("statusPND").disabled = true;
      document.getElementById("ngay-nhap").disabled = true;
      document.getElementById("statusPND").disabled = true;
      document.getElementsByClassName("form-chi-tiet")[0].style.display =
        "none";
      document.getElementsByClassName("form-chi-tiet")[0].style.display =
        "none";
      document.getElementsByClassName(
        "add-sanpham-btn-submit"
      )[0].style.display = "none";
      document.querySelectorAll(".qty-btn").forEach((item) => {
        item.style.display = "none";
      });

      document.querySelectorAll(".btn-delete").forEach((item) => {
        item.disabled = true;
      });
      showWarningToast("Phiếu ở trạng thái Hoàn Thành không được thao Tác");
    }
  }
}

function changeVarriantId(e, button) {
  if (e.key != "Enter") return;

  var gia_nhap = getGiaNhapOfSPByStatus(button.value, "1");
  if (gia_nhap == -1) {
    showWarningToast("Không có mã sản phẩm: " + button.value);
    return;
  }

  document.getElementById("gia-nhap").value = gia_nhap;
  var list_size = getListSizeOfSPByStatus(button.value, "1");

  var renderComboboxSize = ``;
  for (var i = 0; i < list_size.length; i++) {
    renderComboboxSize += `  <option value="${list_size[i].size}">${list_size[i].size}</option>`;
  }
  document.getElementById("product-size").innerHTML = renderComboboxSize;
  if (list_size.length > 0)
    document.getElementById("variantId").disabled = true;
}

function getListSizeOfSPByStatus(id, status) {
  var list_sp = JSON.parse(localStorage.sanPham);
  list_sp = list_sp.filter(
    (item) => item.productId == id && item.status == status
  );

  var list_size = list_sp.map((item) => {
    return {
      size: item.size,
      status: item.status,
    };
  });

  return list_size;
}

function getGiaNhapOfSPByStatus(id, status) {
  var list_sp = JSON.parse(localStorage.sanPham);
  list_sp = list_sp.filter(
    (item) => item.productId == id && item.status == status
  );

  if (list_sp.length > 0) return list_sp[0].price_nhap;

  return -1;
}

function resetAddVarriant() {
  document.getElementById("product-size").innerHTML = "";
  document.getElementById("variantId").value = "";
  document.getElementById("variantId").disabled = false;
  document.getElementById("gia-nhap").value = "";
  document.getElementById("so-luong").value = "";
}

function AddDetailPhieuNhap() {
  var stt_rec = document.getElementById("PhieuNhapId").value;
  var productId = document.getElementById("variantId").value;
  var gia_nhap = document.getElementById("gia-nhap").value;
  var size = document.getElementById("product-size").value;
  var so_luong = document.getElementById("so-luong").value;
  if (productId == "" || gia_nhap == "" || size == "" || so_luong == "") {
    showErrorToast("Vui lòng nhập đủ các trường!");
    return;
  }
  if (so_luong <= 0) {
    showErrorToast("Số lượng nhập phải lớn hơn 0!");
    return;
  }

  var list_detail = JSON.parse(localStorage.list_detail);

  var index = list_detail.findIndex((item) => {
    return item.productId == productId && item.size == size;
  });
  if (index >= 0) {
    list_detail[index].so_luong =
      parseFloat(list_detail[index].so_luong) + parseFloat(so_luong);
    list_detail[index].tong_tien_sp =
      parseFloat(list_detail[index].so_luong) * parseFloat(gia_nhap);
  } else {
    var total = parseFloat(so_luong) * parseFloat(gia_nhap);
    var PND = new PhieuNhap(
      stt_rec,
      productId,
      size,
      gia_nhap,
      so_luong,
      total,
      0,
      -1,
      new Date()
    );
    list_detail.push(PND);
  }

  localStorage.setItem("list_detail", JSON.stringify(list_detail));
  renderDetailPhieuNhap();

  resetAddVarriant();

  showSuccessToast("Thêm chi tiết thành công!");
}

function renderDetailPhieuNhap() {
  var list_detail = JSON.parse(localStorage.list_detail);

  var rows = ``;
  for (var i = 0; i < list_detail.length; i++) {
    rows += `
      <tr >
        <td>${list_detail[i].productId}</td>
        <td>${list_detail[i].size}</td>
        <td>${list_detail[i].gia_nhap}</td>
        <td>
        <button class="qty-btn" onclick="changeQtyPhieuNhap('${list_detail[i].productId}','${list_detail[i].size}',-1)">-</button>
                <input class="qty-input" disabled type="text" value="${list_detail[i].so_luong}" min="1" />
  <button class="qty-btn" onclick="changeQtyPhieuNhap('${list_detail[i].productId}','${list_detail[i].size}',1)">+</button>
        
        
        
        </td>
        <td>${list_detail[i].tong_tien_sp}</td>
        <td><button  class="btn-delete" onclick="deleteDetail('${list_detail[i].productId}','${list_detail[i].size}')">Xóa biến thể</button></td>
        </tr>
       `;
  }

  document.querySelector(".variant-table tbody").innerHTML = rows;
}

function changeQtyPhieuNhap(id, size, x) {
  var list_detail = JSON.parse(localStorage.list_detail);

  list_detail.forEach((item) => {
    if (item.productId == id && item.size == size) {
      item.so_luong = parseFloat(item.so_luong) + parseFloat(x);
      item.tong_tien_sp = parseFloat(item.so_luong) * parseFloat(item.gia_nhap);

      if (item.so_luong > 0) {
        localStorage.setItem("list_detail", JSON.stringify(list_detail));
      }
    }
  });
  renderDetailPhieuNhap();
}
function deleteDetail(id, size) {
  var list_detail = JSON.parse(localStorage.list_detail);
  var index = list_detail.findIndex(
    (item) => item.productId == id && item.size == size
  );
  if (index >= 0) list_detail.splice(index, 1);
  localStorage.setItem("list_detail", JSON.stringify(list_detail));
  renderDetailPhieuNhap();
  showSuccessToast("Xóa thành công bản ghi!");
}

function checkBeforPhieuNhap(action) {
  var list_detail = JSON.parse(localStorage.list_detail);

  if (list_detail.length == 0) {
    showErrorToast("Bạn chưa nhập danh sách chi tiết!");
    return;
  }
  var ngay_nhap = document.getElementById("ngay-nhap").value;
  var statusPND = document.getElementById("statusPND").value;
  var stt_rec = document.getElementById("PhieuNhapId").value;
  var sum = 0;

  list_detail.forEach((item) => {
    sum += parseFloat(item.tong_tien_sp);
  });

  var arr = [];
  list_detail.forEach((item) => {
    var tmp = new PhieuNhap(
      stt_rec,
      item.productId,
      item.size,
      item.gia_nhap,
      item.so_luong,
      item.tong_tien_sp,
      sum,
      statusPND,
      new Date(ngay_nhap)
    );
    arr.push(tmp);
  });

  var phieunhap = JSON.parse(localStorage.PhieuNhap);

  phieunhap = phieunhap.filter((item) => item.stt_rec != stt_rec);
  phieunhap = [...phieunhap, ...arr];
  localStorage.setItem("PhieuNhap", JSON.stringify(phieunhap));
  goBack("quanlyphieunhap");
  showSuccessToast("Bạn đã thêm phiếu nhập thành công");

  if (statusPND == "1") {
    var sanPham = JSON.parse(localStorage.sanPham);

    for (var i = 0; i < list_detail.length; i++) {
      var index = sanPham.findIndex((item2) => {
        return (
          item2.productId == list_detail[i].productId &&
          list_detail[i].size == item2.size
        );
      });
      if (index >= 0)
        sanPham[index].quantity =
          parseFloat(sanPham[index].quantity) + parseFloat(list_detail[i].so_luong);
    }

    localStorage.setItem("sanPham", JSON.stringify(sanPham));
  }
}

function getPhieuNhapGroup() {
  var arr1 = JSON.parse(localStorage.getItem("PhieuNhap"));
  var list_sp = [];
  var l = arr1.length;
  for (var i = 0; i < l; i++) {
    var index = list_sp.findIndex((item) => {
      return item.stt_rec == arr1[i].stt_rec;
    });
    if (index >= 0) {
      continue;
    } else {
      list_sp.push(arr1[i]);
    }
  }
  return list_sp;
}

function getPhieuNhapByKey(stt_rec) {
  var arr1 = JSON.parse(localStorage.getItem("PhieuNhap"));
  arr1 = arr1.filter((item) => item.stt_rec == stt_rec);
  return arr1;
}












function renderInfoAcc(id)
{
    var accs = JSON.parse(localStorage.getItem('listTaiKhoan'))
    var index = accs.findIndex(item=> item.taikhoan == id);
    return accs[index];
}


function showOrder(id) {
    // kiểm tra đã đăng nhập chưa (muốn xem/thểm giỏ hàng thì cần phải đăng nhập)
    // Nếu đã đăng nhập
      
    var obj = getDonHangOfAccBykey(id);
    var infoAcc = renderInfoAcc(obj.userId);
    var total=obj.quantity*obj.price;
    var r =`
                <button class="btn-back" onclick="goBack('quanlydonhang')">← Quay lại</button>

    <div class="order-container">

    <div class="order-left">
      <h3>Đặt hàng</h3>
      <div class="order-input-row">
        <input type="text" disabled placeholder="Tên" value='${infoAcc.hoten}'>
      </div>

    <div class="order-input-row">
        <input type="text"  disabled placeholder="Điện thoại" value='${infoAcc.sdt}'>
      </div>

      <div class="order-input-row">
        <input type="text" id="dia_chi" placeholder="Địa chỉ" value='${infoAcc.diachi}'>
      </div>
      
     
      <div class="order-payment-buttons">
    </div>
    </div>

    <div class="order-right">
      <div class="order-product">
        <img src="${obj.img}" alt="">
        <div class="order-product-info">
          <p class="order-product-name">${obj.name}</p>
          <p class="order-product-size">Size: ${obj.size}</p>
        </div>
        <span class="order-product-price">Giá: ${obj.price} VNĐ</span>
      </div>
     

      <div class="order-summary">
        <div class="order-summary-item">
          <span>Tổng số lượng · ${obj.quantity} mặt hàng</span>
        </div>
       

        <div class="order-total">
          <span>Tổng thanh toán</span>
          <span>${total} VNĐ</span>
        </div>

      </div>
        

      <div style="display:none" class="QRpanel" >
    <div  class="QR">
         <img src="./assets/img/QR.jpg" alt="">

    </div>
    <div  class="QRbutton">
        <button class="order-button order-button-cod" onclick="ThanhToan('${obj.productId}','${obj.size}')">Thanh toán</button>

    </div>

      </div>






      
    </div>
  </div>`;

  document.getElementsByClassName('orders-container')[0].innerHTML = r;
   
   
}


function getDonHangOfAccBykey(id)
{
    var list = JSON.parse(localStorage.getItem('DonHang'));
    list = list.filter(item=> item.stt_rec == id)
    return list[0];
}


function ChuyenTrangThaiDonHang(stt_rec)
{
  var list_don_hang = JSON.parse(localStorage.getItem('DonHang'));
  var index = list_don_hang.findIndex(item=>(item.stt_rec == stt_rec))
  if(index >= 0)
  {
    list_don_hang[index].status = parseFloat(list_don_hang[index].status)+1;
    localStorage.setItem('DonHang',JSON.stringify(list_don_hang))
  }
  quanlydonhang(localStorage.statusOrder);
}