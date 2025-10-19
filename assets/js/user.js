
//Tài Khoản Admin---------------------------------------------------------------------------------------------------------------------------------------------------------------------
var adminTk = "admin";
var adminMk = "1111";

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function dangKy() {
    var formElement = document.querySelector(".sign-up");
    var inputElement = formElement.querySelectorAll(".form-input");
    // kiểm tra bỏ trống thông tin
    for (let index = 0; index < inputElement.length; index++) {
        if (inputElement[index].value === "") {
            inputElement[index].parentElement.querySelector(".error-message").innerText = `Vui lòng nhập ${inputElement[index].name}`;
            inputElement[index].parentElement.querySelector(".error-message").style.color = "red";
            inputElement[index].focus();
            return false;
        } else {
            inputElement[index].parentElement.querySelector(".error-message").innerText = "";
        }
    }
    // xử lý đăng ký thành công ==> lưu tài khoản vào localStorage
    var hoten = document.getElementById("hoten");
    var sdt = document.getElementById("sdt");
    var taikhoan = document.getElementById("taikhoan");
    var matkhau = document.getElementById("matkhau");

    var listTaiKhoan = localStorage.getItem("listTaiKhoan") ? JSON.parse(localStorage.getItem("listTaiKhoan")) : [];
    var listGioHang = localStorage.getItem("listGioHang") ? JSON.parse(localStorage.getItem("listGioHang")) : [];
    var listDonHang = localStorage.getItem("listDonHang") ? JSON.parse(localStorage.getItem("listDonHang")) : [];

    // kiểm tra trùng thông tin đăng ký
    var tonTai = false;
    if (listTaiKhoan != []) {
        for (var i = 0; i < listTaiKhoan.length; i++) {
            console.log(listTaiKhoan[i]);
            if (listTaiKhoan[i].hoten === hoten.value) {
                tonTai = true;
                hoten.parentElement.querySelector(".error-message").innerText = "Họ tên này đã tồn tại";
                hoten.parentElement.querySelector(".error-message").style.color = "red";
                hoten.focus();
                return false;

            } else if (listTaiKhoan[i].sdt === sdt.value) {
                tonTai = true;
                sdt.parentElement.querySelector(".error-message").innerText = "Số điện thoại này đã tồn tại";
                sdt.parentElement.querySelector(".error-message").style.color = "red";
                sdt.focus();
                return false;
            } else if (listTaiKhoan[i].taikhoan === taikhoan.value) {
                tonTai = true;
                taikhoan.parentElement.querySelector(".error-message").innerText = "Tên tài khoản này đã tồn tại";
                taikhoan.parentElement.querySelector(".error-message").style.color = "red";
                taikhoan.focus();
                return false;
            } else {
                hoten.parentElement.querySelector(".error-message").innerText = "";
                sdt.parentElement.querySelector(".error-message").innerText = "";
                taikhoan.parentElement.querySelector(".error-message").innerText = "";
                matkhau.parentElement.querySelector(".error-message").innerText = "";
            }
        }
    }
    // nếu không bị trùng thông tin đăng ký
    if (tonTai == false) {
        listTaiKhoan.push({
            hoten: hoten.value,
            sdt: sdt.value,
            taikhoan: taikhoan.value,
            matkhau: matkhau.value,
        })
        localStorage.setItem("listTaiKhoan", JSON.stringify(listTaiKhoan));
        showSuccessToast("Đăng Ký thành công!");

        // khi tạo tài khoản ==> tạo luôn kho lưu trữ giỏ hàng cho khách
        listGioHang.push({
            name: hoten.value,
            sdt: sdt.value,
            taikhoan: taikhoan.value,
            matkhau: matkhau.value,
            giohang: [],
        })
        localStorage.setItem("listGioHang", JSON.stringify(listGioHang));


        listDonHang.push({
            name: hoten.value,
            sdt: sdt.value,
            taikhoan: taikhoan.value,
            matkhau: matkhau.value,
            donhang: [],
        })
        localStorage.setItem("listDonHang", JSON.stringify(listDonHang));



    }

}

function dangNhap() {
    var taikhoan = document.getElementById("tk").value;
    var matkhau = document.getElementById("mk").value;
    var name;
    var listTaiKhoan = localStorage.getItem("listTaiKhoan") ? JSON.parse(localStorage.getItem("listTaiKhoan")) : [];
    var check = false;
    for (let index = 0; index < listTaiKhoan.length; index++) {
        if (listTaiKhoan[index].taikhoan === taikhoan && listTaiKhoan[index].matkhau === matkhau) {
            check = true;
            name = listTaiKhoan[index].hoten;
            break;
        }
    }
    // Kiểm tra tài khoản đã tồn tại hay chưa

    // tài khoản đã tồn tại
    if (check) {
        document.getElementById("mk").parentElement.querySelector(".error-message").innerText = "";
        showSuccessToast("Đăng nhập thành công");
        hideDangNhap();

        var listTaiKhoan = localStorage.getItem("listTaiKhoan") ? JSON.parse(localStorage.getItem("listTaiKhoan")) : [];
        var hoten, sdt;
        for (const tk of listTaiKhoan) {
            if (tk.taikhoan === taikhoan) {
                hoten = tk.hoten;
                sdt = tk.sdt;
            }
        }
        // khi đã đăng nhập vào thì thay Đăng nhập ==> Đăng xuất
        document.getElementById("sign-in").outerHTML = `
        <div id="sign-in" onclick="dangXuat();">
        <i class="fas fa-sign-in-alt"></i>
        <a href="#">Đăng Xuất</a>
        </div>`;

        // In thông tin khách hàng
        document.getElementById("user").innerHTML = `
            <i class="fas fa-user"></i>
            <a href="#">${name}</a>
            <div id="infomation">
                <p>Họ tên: <span id="show-hoten">${hoten}</span></p>
                <p>Số điện thoại: <span id="show-sdt">${sdt}</span></p>
                <p>Tài Khoản: <span id="show-taikhoan">${taikhoan}</span></p>
                <p>Mật Khẩu: <span id="show-matkhau">${matkhau}</span></p>
            </div>`

        // show Đơn hàng đã đặt
        document.getElementById("order").style.display = "block";

        document.getElementById("register").style.display = "none";

        // cập nhật giỏ hàng cho khách hàng (lưu lại giỏ hàng của khách khi thoát)  
        var listGioHang = JSON.parse(localStorage.getItem("listGioHang"));
        var stt = 0;
        var s = "";
        var tongtien = 0;
        for (const a of listGioHang) {
            if (a.taikhoan === taikhoan) {
                for (const b of a.giohang) {
                    s += `            
                    <tr class="sanPham">
                        <td class="stt">${++stt}</td>
                        <td><img class="hinh" src=${b.img}></td>
                        <td class="cotTen">${b.nameProduct}</td>
                        <td class="donGia">${b.price}đ</td>
                        <td class="soLuong">${b.quantity}</td>
                        <td class="thanhTien">${b.money}đ</td>
                        <td>
                            <button onclick="deleteProduct(this);">Delete</button>
                        </td>
                    </tr>`;
                    tongtien += parseInt(b.money);
                }
                document.getElementById("showShopTable").innerHTML = s;
            }
        }
        console.log(stt);
        document.getElementById("quantity").innerText = stt;
        document.getElementById("tongTien").innerText = `${tongtien}đ`;
    }
    // tài khoản chưa tồn tại
    else {
        document.getElementById("mk").parentElement.querySelector(".error-message").innerText = "Tài khoản không tồn tại. Vui lòng đăng ký!";
        document.getElementById("mk").parentElement.querySelector(".error-message").style.color = "red";
    }

    // tài khoản đặc biệt (admin) ==> dẫn tới trang admin
    if (taikhoan === adminTk && matkhau === adminMk) {
        window.location.href = "http://127.0.0.1:5500/admin.html";
    }
}


var click = false;

function showInfo() {
    if (!click) {
        document.getElementById("infomation").style.display = "block";
        click = true;
    } else {
        document.getElementById("infomation").style.display = "none";
        click = false;
    }
}


function dangXuat() {
    document.getElementById("user").innerHTML = "";
    document.getElementById("sign-in").outerHTML = `
    <div id="sign-in" onclick="showDangNhap();">
    <i class="fas fa-sign-in-alt"></i>
    <a href="#">Đăng Nhập</a>
    </div>`

    document.getElementById("quantity").innerText = 0;
    document.getElementById("tongTien").innerHTML = `0đ`;
    var display = document.getElementById("showShop").style.display;
    if (display === "block") {
        document.getElementById("showShop").style.display = "none";
        console.log(document.getElementById("showShop").style.display);
    }
    document.getElementById("order").style.display = "none";
     document.getElementById("register").style.display = "block";


}

var registerModal = document.querySelector(".register-modal");
var registermModalContainer = document.querySelector(".register-modal-container");



function showDangKy() {

    registerModal.classList.add("open");
}

function hideDangKy() {
    registerModal.classList.remove("open");
}

registermModalContainer.addEventListener('click', function(event) {
    event.stopPropagation()
})


var modal = document.querySelector(".modal");
var modalContainer = document.querySelector(".modal-container");

function showDangNhap() {
    modal.classList.add("open");
}

function hideDangNhap() {
    modal.classList.remove("open");
}

modalContainer.addEventListener('click', function(event) {
    event.stopPropagation()
})


var mang = [1];

function hienThi(obJ) {
    currentPage = 1;
    var a = obJ;
    switch (a.id) {
        case "gioiThieu":
            {
                s =
                '<div id="container" style=" margin-top: 50px;margin-left: 30px;margin-bottom: 50px;">' +
                '<h2 class = "gioiThieu">BÁN GIÀY THỂ THAO SNEAKER CHÍNH HÃNG TẠI TPHCM - SneakerShop GIỚI THIỆU</h2>' +
                '<p class = "gioiThieu">Nỗi sợ vì mua phải giày kém chất lượng, giày fake, từ nay không còn lo lắng nữa vì đã có #SneakerShop.VN: hàng chính hãng nhập trực tiếp từ US, fullbox, nguyên tem.</p>' +
                '<p class = "gioiThieu"><img class = "gioiThieu" src="/assets/img/logo.png" alt=""><h4 class = "gioiThieu">SneakerShop</h4>✓15 Ngày Đổi Hàng ✓Giao Hàng Miễn Phí ✓Thanh Toán Khi Nhận Hàng ✓Bảo Hành Hàng Chính Hãng.!!!</p>' +
                '<p class = "gioiThieu">Đến với "SneakerShop.VN” quý khách hàng sẽ có những sản phẩm ưng ý nhất, chất lượng phục vụ tốt và giá thành tốt nhất, cùng những “ Chương Trình Khuyến Mãi Đặc Biệt”.</p>' +
                '<p class = "gioiThieu">Tìm được cửa hàng giày khiến mình an tâm rất khó luôn đó mọi người ơi. Hổng nói nổi vui như nào khi gặp được SneakerShop luôn á, ' +
                'Sản phẩm chất lượng mà các dịch vụ đi kèm hấp dẫn nữa. Dân mê giày làm sao cưỡng lại KINGSHOES đây!</p>' +
                '<img class = "gioiThieu" src="/assets/img/gioithieu1.Jpg" alt="">' +
                '<p class = "gioiThieu">Cửa Hàng Bán Giày Sneaker Chính Hãng Tại HCM - SneakerShop Giới thiệu</p>' +
                '<img class = "gioiThieu" src="/assets/img/gioithieu2.Jpg" alt="">' +
                '<h3 class = "gioiThieu">SneakerShop CHUẨN GIÀY REAL - DEAL SIÊU KHỦNG</h3>' +
                '<p class = "gioiThieu">Cửa Hàng KING SHOES là một trong những nơi sưu tầm có khối lượng giày hiếm siêu khủng. Có những mẫu giày cực kì hype được giới sưu tầm săn lùng' +
                ', thậm chí bạn sẽ bắt gặp nhiều mẫu lạ mới mà hiếm shop nào có. Có những mẫu chỉ có độc nhất 1 đôi. ' +
                'Ngoài ra những mẫu đang rất HOT trên thị trường sneaker về liên tục nên các bạn cứ yên tâm không sợ hết hàng.</p>' +
                '<img class = "gioiThieu" src="/assets/img/gioithieu3.Jpg" alt="">' +
                '<p class = "gioiThieu">Cửa Hàng Bán Giày Sneaker Chính Hãng Tại HCM - SneakerShop Giới thiệu</p>' +
                '<img class = "gioiThieu" src="/assets/img/gioithieu4.Jpg" alt="">' +
                '<p class = "gioiThieu">Cửa Hàng Bán Giày Sneaker Adidas, Jordan Chính Hãng tại tpHCM 100% Authentic nhập trực tiếp từ US, UK,' +
                'JAPAN @ SneakerShop.VN nhiệm vụ mang hàng chính hãng đến tay người tiêu dùng Việt Nam !!! 192/2 Nguyễn Thái Bình,' +
                'Phường 12, Quận Tân Bình, Thành phố Hồ Chí Minh. </p>' +
                '<img class = "gioiThieu" src="/assets/img/gioithieu5.Jpg" alt="">;'
                '</div>'
                document.getElementById("search-main").innerHTML = "";
                document.getElementById("container").outerHTML = s;
                break;
            }
        case "Nike":
            {
                var s =
                    `<div id="container">
                <div id="content"></div>
                <ul id="sotrang"></ul>
            </div>`;
                document.getElementById("search-main").innerHTML = `<input type="text" placeholder="Nhập từ cần tìm" id="search" oninput="search()"></input><i class="fas fa-search"></i>`
                document.getElementById("container").outerHTML = s;
                hienThiSanPhamPhanTrang(a.id, mang);
                break;
            }
        case "Adidas":
            {
                var s =
                    `<div id="container">
                <div id="content"></div>
                <ul id="sotrang"></ul>
            </div>`;
                document.getElementById("search-main").innerHTML = `<input type="text" placeholder="Nhập từ cần tìm" id="search" oninput="search()"></input><i class="fas fa-search"></i>`
                document.getElementById("container").outerHTML = s;
                hienThiSanPhamPhanTrang(a.id, mang);
                break;


            }
        case "Jordan":
            {
                var s =
                    `<div id="container">
                <div id="content"></div>
                <ul id="sotrang"></ul>
            </div>`;
                document.getElementById("search-main").innerHTML = `<input type="text" placeholder="Nhập từ cần tìm" id="search" oninput="search()"></input><i class="fas fa-search"></i>`
                document.getElementById("container").outerHTML = s;
                hienThiSanPhamPhanTrang(a.id, mang);
                break;


            }
        case "Men":
            {
                var s =
                    `<div id="container">
                <div id="content"></div>
                <ul id="sotrang"></ul>
            </div>`;
                document.getElementById("search-main").innerHTML = `<input type="text" placeholder="Nhập từ cần tìm" id="search" oninput="search()"></input><i class="fas fa-search"></i>`
                document.getElementById("container").outerHTML = s;
                hienThiSanPhamPhanTrang(a.id, mang);
                break;


            }
        case "Bitis":
            {
                var s =
                    `<div id="container">
                <div id="content"></div>
                <ul id="sotrang"></ul>
            </div>`;
                document.getElementById("search-main").innerHTML = `<input type="text" placeholder="Nhập từ cần tìm" id="search" oninput="search()"></input><i class="fas fa-search"></i>`
                document.getElementById("container").outerHTML = s;
                hienThiSanPhamPhanTrang(a.id, mang);
                break;


            }
        case "lienHe":
            {
                s =
                '<div id="container" style="margin-bottom: 50px;">' +
                '<img src="/assets/img/bando.png" alt="">' +
                '<div id="main">' +
                '<div id="leftmain">' +
                '<h2>SNEAKERSHOP TRANG THÔNG TIN CHÍNH THỨC</h2>' +
                '<p>Thông tin liên hệ</p>' +
                '<hr>' +
                '<h4>SNEAKERSHOP.VN Trang Thông Tin Chính Thức</h4>' +
                '<p><i class="fas fa-home"></i>Địa chỉ: 192/2 Nguyễn Thái Bình, Phường 12, Quận Tân Bình, Thành phố Hồ Chí Minh</p>' +
                '<p>Email : cskh.sneakershop.vn@gmail.com</p>' +
                '<a href="https://kingshoes.vn/">https://SneakerShop.vn/</a>' +
                '<a href="https://twitter.com/KingShoes_vn">https://twitter.com/SneakerShop</a>' +
                '<a href="https://instagram.com/KingShoes.vn">https://instagram.com/SneakerShop.vn</a>' +
                '<a href="https://facebook.com/pg/www.KingShoes.vn">https://facebook.com/pg/www.SneakerShop.vn</a>' +
                '<a href="https://www.youtube.com/www.KingShoes.vn">https://www.youtube.com/www.SneakerShop.vn</a>' +
                '<a href="https://www.tiktok.com/@sneaker_radio">https://www.tiktok.com/@sneaker_radio</a>' +
                '<p><i class="fas fa-phone-volume"></i>Hotline Bán Hàng: 0909.300.746 - 0909.45.0001</p>' +
                '<p><i class="fas fa-phone-volume"></i>Hotline CSKH: 0902.368.001</p>' +
                '</div>' +
                '<div id="rightmain">' +
                '<h2>VỚI CHÚNG TÔI</h2>' +
                '<textarea name="" id="" cols="10" rows="5" placeholder="Nội Dung"></textarea>' +
                '<input type="text" placeholder="Tên bạn*">' +
                '<div id="box">' +
                '<input type="email" placeholder="Email*" style="margin-right: 30px;">' +
                '<input type="number" placeholder="Điện thoại*">' +
                '</div>' +
                '<div id="button">' +
                '<button style="margin-right: 30px; background-color: rgba(231, 76, 60,1.0);">Gửi ngay</button>' +
                '<button style="background-color: rgba(46, 204, 113,1.0);">Nhập lại</button>' +
                '</div>' +
                '</div>' +
                '</div>'
                '</div>'
                document.getElementById("search-main").innerHTML = "";
                document.getElementById("container").outerHTML = s;
                break;

            }
        default:
            {
                document.getElementById("container").innerHTML = "";
            }
    }
}



var currentPage = 1;
var perPage = 10;
var mangTam = [];
var totalPage = 0;
var arr = [];

function hienThiSanPhamPhanTrang(brand, mang) {
    if (brand === "Nike") {
        mang = JSON.parse(localStorage.getItem("nike"));
    } else if (brand === "Adidas") {
        mang = JSON.parse(localStorage.getItem("adidas"));
    } else if (brand === "Jordan") {
        mang = JSON.parse(localStorage.getItem("jordan"));
    } else if (brand === "Men") {
        mang = JSON.parse(localStorage.getItem("men"));
    } else if (brand === "search") {

    } else {
        mang = JSON.parse(localStorage.getItem("bitis"));
    }
    mangTam = mang.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage);
    renderProduct(mangTam);
    
    renderPageNumber(mang);
}

function handlePageNumber(num, mang) {
    currentPage = num;
    arr = mang;
    console.log("arr", arr);
    var ul = document.getElementById("sotrang").childNodes;
    for (var i = 0; i < ul.length; i++) {
        if (ul.item(i).innerText == currentPage) {
            ul.item(i).style.backgroundColor = "red";
        } else {
            ul.item(i).style.backgroundColor = "white";
        }
    }
    mangTam = arr.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage);
    renderProduct(mangTam);
}

function surfPage(num) {
    if (num === 1) {
        if (currentPage > 1) {
            currentPage--;
        } else {
            currentPage = totalPage;
        }
    } else {
        if (currentPage < totalPage) {
            currentPage++;
        } else {
            currentPage = 1;
        }
    }
    var ul = document.getElementById("sotrang").childNodes;
    for (var i = 0; i < ul.length; i++) {
        if (ul.item(i).innerText == currentPage) {
            ul.item(i).style.backgroundColor = "red";
        } else {
            ul.item(i).style.backgroundColor = "white";
        }
    }
    mangTam = arr.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage);
    renderProduct(mangTam);
}

function renderPageNumber(mang) {
    arr = mang;
    document.getElementById("sotrang").innerHTML = `<li onclick="surfPage(1);"><i class="fas fa-angle-left"></i></li>`;
    totalPage = Math.ceil(arr.length / perPage);
    for (var i = 1; i <= totalPage; i++) {
        if (i == 1)
            document.getElementById("sotrang").innerHTML += `<li style="background-color: red;" onclick="handlePageNumber(${i},arr)">${i}</li>`;
        else
            document.getElementById("sotrang").innerHTML += `<li onclick="handlePageNumber(${i},arr)">${i}</li>`;
    }
    document.getElementById("sotrang").innerHTML += `<li onclick="surfPage(2);"><i class="fas fa-angle-right"></i></li>`;
}

function renderProduct(mang) {
    var s = "";
    for (var i = 0; i < mang.length; i++) {
        var price = `Giá: ${mang[i].price} VNĐ`;
        s +=
            `<div class="item-group">
             <div class="bot-item">
                        <div class="bot-item-details1">
                             <img class="img" src="${mang[i].img}" onclick="chiTietSP(this);">
                    <h4 class="name">${mang[i].name}</h4>
                  
                        </div>
                    </div>
                    <div class="bot-item">
                        <div class="bot-item-details">
                            <p>Số lượng: <span class ="quantity">${mang[i].quantity}</span></p>
                           <p class="">${price}</p>
                        </div>
                        <button onclick="addProduct(this);"><i class="fas fa-cart-arrow-down button-add-product"></i><br>Thêm sản phẩm vào giỏ hàng</button>
                    </div>
                    
                </div>
                `

    }
    if(s == '')
    {
        s = '<h3 style="margin:auto">Không có sản phẩm để hiển thị</h3>'
    }
    if(mang.length == 0)
    {
        document.getElementById('main').style.margin = 0
    }
    document.getElementById("content").innerHTML = s;
}



function search() {
    var url = window.location.href;
    var id = url.split('#')[1];
    if (id === "Nike") {
        arr = JSON.parse(localStorage.getItem("nike"));
    } else if (id === "Adidas") {
        arr = JSON.parse(localStorage.getItem("adidas"));
    } else if (id === "Jordan") {
        arr = JSON.parse(localStorage.getItem("jordan"));
    } else if (id === "Men") {
        arr = JSON.parse(localStorage.getItem("men"));
    } else {
        arr = JSON.parse(localStorage.getItem("bitis"));
    }
    var valueSearchInput = document.getElementById("search").value;
    var search = arr.filter(function(value, index) {
        return value.name.toUpperCase().includes(valueSearchInput.toUpperCase());
    });


    // Xử lý phân trang tìm kiếm  
    hienThiSanPhamPhanTrang("search", search);
}


// Xử lý giỏ hàng
var click = false;

function showShop() {
    // kiểm tra đã đăng nhập chưa (muốn xem/thểm giỏ hàng thì cần phải đăng nhập)
    // Nếu đã đăng nhập
    if (document.getElementById("user").innerText != "") {
        if (click === false) {
            document.getElementById("showShop").style.display = "block";
            click = true;
        } else {
            document.getElementById("showShop").style.display = "none";
            click = false;
        }

        var ngannoibot = document.getElementById("showShop");
        ngannoibot.addEventListener('click', function(event) {
            event.stopPropagation();
        })

    }
    // Chưa thì bắt đăng nhập
    else {
        showWarningToast('Cần đăng nhập trước khi xem giỏ hàng!')
        // showDangNhap();
    }
}

// hàm ThemGioHang là thêm sản phẩm vào giỏ hàng trên localStorage
function ThemGioHang(gioHang, check) {
    // đồng bộ hóa giỏ hàng vật lý với giỏ hàng trên localStorage của từng khách hàng
    var listGioHang = JSON.parse(localStorage.getItem("listGioHang"));
    var num;
    for (var i = 0; i < listGioHang.length; i++) {
        if (listGioHang[i].taikhoan === document.getElementById("show-taikhoan").innerText) {
            if (check) { // sản phẩm đã tồn tại trong giỏ ==> xử lý tăng số lượng, thành tiền
                num = i;
                break;
            } else { // sản phẩm chưa tồn tại trong giỏ 
                listGioHang[i].giohang.push(gioHang);
            }

        }
    }
    if (check) {
        for (var i = 0; i < listGioHang[num].giohang.length; i++) {
            if (listGioHang[num].giohang[i].img === gioHang.img) { // so sánh đường dẫn hình (duy nhất) để không xảy ra lỗi ngoài ý muốn
                listGioHang[num].giohang[i].quantity += 1;
                listGioHang[num].giohang[i].money = listGioHang[num].giohang[i].quantity * listGioHang[num].giohang[i].price;
            }

        }
    }

    localStorage.setItem("listGioHang", JSON.stringify(listGioHang));
}
// hàm addProduct là thêm sản phẩm vào giỏ hàng vật lý
function addProduct(button) {
    // kiểm tra đã đăng nhập chưa (thêm sản phẩm vào giỏ hàng cần phải đăngn nhập)

    // đã đăng nhập
    if (document.getElementById("user").innerText != "") {
        if (document.getElementById("showShopTable").innerText === "") {
            var stt = 0;
        } else {
            console.log("không rỗng");
            var stt = parseInt(document.getElementById("showShopTable").lastElementChild.querySelector(".stt").innerText);
        }
        var img = button.parentElement.parentElement.querySelector(".img").getAttribute("src");
        var name = button.parentElement.parentElement.querySelector(".name").innerText;
        var quantity = parseInt(button.parentElement.querySelector(".quantity").innerText);
        var price = button.parentElement.parentElement.querySelector(".price").innerText;
        var thanhTien;
        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa 
        var check = false;
        var allTen = document.getElementById("showShopTable").querySelectorAll(".cotTen");
        for (var ten of allTen) {
            if (ten.innerText === name) { // nếu đã có ==> tăng số lượng, tăng thành tiền 
                check = true;
                var a = parseInt(ten.parentElement.querySelector(".soLuong").innerText);
                // Kiểm tra số lượng của 1 sản phẩm trong giỏ hàng không được đặt quá số lượng của shop
                if (a >= quantity) {
                    console.log("quá ");
                    return;
                } else {
                    console.log("chưa quá");
                    ten.parentElement.querySelector(".soLuong").innerText = a + 1;
                    thanhTien = (a + 1) * price;
                    console.log("Thành Tiền", thanhTien);
                    ten.parentElement.querySelector(".thanhTien").innerText = thanhTien + "đ";
                }
                // -------------------------------------------------------------------------------------
            }
        }


        // nếu chưa ==> thêm vào giỏ hàng
        if (!check) {
            document.getElementById("quantity").innerText = stt + 1;
            document.getElementById("showShopTable").innerHTML += `
            <tr class="sanPham">
                <td class="stt">${stt+1}</td>
                <td><img class="hinh" src=${img}></td>
                <td class="cotTen">${name}</td>
                <td class="donGia">${price}đ</td>
                <td class="soLuong">1</td>
                <td class="thanhTien">${price}đ</td>
                <td>
                    <button onclick="deleteProduct(this);">Delete</button>
                </td>
            </tr>`;
        }


        // cập nhật lại tổng tiền các sản phẩm trong giỏ hàng
        var arr = document.getElementById("showShopTable").querySelectorAll(".thanhTien");
        var tongTien = 0;
        for (var tien of arr) {
            tongTien += parseInt(tien.innerText);
        }
        document.getElementById("tongTien").innerText = `${tongTien}đ`;


        // cập nhật lại giỏ hàng của khách trong localStorage
        var gioHang = {
            img: img,
            nameProduct: name,
            price: price,
            quantity: 1,
            money: price,
        }
        ThemGioHang(gioHang, check);
    }
    // chưa đăng nhập ==> bắt đăng nhập
    else {
        showWarningToast('Vui lòng đăng nhập trước khi thêm giỏ hàng!')
        // showDangNhap();
    }
}



function XoaGioHang(hinhgioHang) {
    var listGioHang = JSON.parse(localStorage.getItem("listGioHang"));
    for (var i = 0; i < listGioHang.length; i++) {
        if (listGioHang[i].taikhoan === document.getElementById("show-taikhoan").innerText) {
            for (var j = 0; j < listGioHang[i].giohang.length; j++) {
                if (listGioHang[i].giohang[j].img == hinhgioHang) {
                    if (listGioHang[i].giohang[j].quantity == 1) {
                        listGioHang[i].giohang.splice(j, 1);
                    } else {
                        listGioHang[i].giohang[j].quantity -= 1;
                        listGioHang[i].giohang[j].money = listGioHang[i].giohang[j].quantity * listGioHang[i].giohang[j].price;
                    }
                }
            }
        }
    }
    localStorage.setItem("listGioHang", JSON.stringify(listGioHang));
}


function deleteProduct(button) {
    // lấy ra số lượng sản phẩm đó trong giỏ hàng
    var soLuong = parseInt(button.parentElement.parentElement.querySelector(".soLuong").innerText);
    // nếu còn 1 mà xóa ==> xóa sản phẩm đó ra khỏi giỏ hàng
    if (soLuong === 1) {
        var tr = button.parentElement.parentElement.outerHTML;
        var table = document.getElementById("showShopTable");
        var arr = document.getElementById("showShopTable").querySelectorAll(".sanPham");
        for (var sanPham of arr) {
            if (sanPham.outerHTML === tr) {
                table.removeChild(sanPham);
                break;
            }
        }
        document.getElementById("quantity").innerText = parseInt(document.getElementById("quantity").innerText) - 1;

        // Cập nhật lại thứ tự sản phẩm trong giỏ hàng sau khi xóa 1 sản phẩm khỏi giỏ hàng
        var arr = document.getElementById("showShopTable").children;
        for (var i = 0; i < arr.length; i++) {
            arr[i].querySelector(".stt").innerText = i + 1;

        }
    }
    // nếu còn nhiều hơn 1 ==> xóa đi 1 đv số lượng
    else {
        button.parentElement.parentElement.querySelector(".soLuong").innerText = soLuong - 1;
    }
    var thanhTien = parseInt(button.parentElement.parentElement.querySelector(".donGia").innerText) * parseInt(button.parentElement.parentElement.querySelector(".soLuong").innerText);
    console.log(thanhTien);
    button.parentElement.parentElement.querySelector(".thanhTien").innerText = `${thanhTien}đ`;
    var tong = parseInt(document.getElementById("tongTien").innerText) - parseInt(button.parentElement.parentElement.querySelector(".donGia").innerText);
    console.log(tong);
    document.getElementById("tongTien").innerText = `${tong}đ`;

    // Cập nhật lại giỏ hàng của khách trên localStorage
    var hinh = button.parentElement.parentElement.querySelector(".hinh").getAttribute("src");
    XoaGioHang(hinh);


}


function moDonHang() {
    document.getElementById("donHang").style.display = "block";
    var hoten = document.getElementById("show-hoten").innerText;
    var sdt = document.getElementById("show-sdt").innerText;
    var s = `
        <p id="hoten-mua">Họ Tên: <span >${hoten}</span></p>
        <p id="sdt-mua">Số Điện Thoại: <span >${sdt}</span> </p>
        <p id="title">Sản Phẩm Chọn Mua</p>
        <ul id="sanpham-mua">

        </ul>
        <p id="tongtien-mua"></p>
    `;
    document.getElementById("mid-donhang").innerHTML = s;
    var a = document.getElementById("showShopTable").children;
    var s = "";
    var thanhTien = 0;
    for (var i = 0; i < a.length; i++) {
        var ten = a[i].querySelector(".cotTen").innerText;
        var soLuong = a[i].querySelector(".soLuong").innerText;
        thanhTien += parseInt(a[i].querySelector(".thanhTien").innerText);
        s += `<li><span class="tensp-mua">${ten}</span><span class="slsp-mua">${soLuong}</span></li>`

    }
    document.getElementById("sanpham-mua").innerHTML = s;
    document.getElementById("tongtien-mua").innerHTML = `Tổng Tiền: ${thanhTien}đ`;
}

var donhangContainer = document.getElementById("main-donhang");
donhangContainer.addEventListener('click', function(event) {
    event.stopPropagation();
})

function dongDonHang() {
    document.getElementById("donHang").style.display = "none";
}

function muaHang() {
    alert("Đơn hàng của bạn đã được gửi đến admin. Vui lòng chờ Xử lý!");
    dongDonHang();
    // Xóa giỏ hàng
    var listGioHang = JSON.parse(localStorage.getItem("listGioHang"));
    var taikhoan = document.getElementById("show-taikhoan").innerText;
    var gioHang = [];
    for (var a of listGioHang) {
        if (a.taikhoan === taikhoan) {
            gioHang = a.giohang;
            a.giohang = [];
        }
    }
    localStorage.setItem("listGioHang", JSON.stringify(listGioHang));

    document.getElementById("showShopTable").innerHTML = "";
    document.getElementById("showShop").style.display = "none";
    document.getElementById("tongTien").innerText = "0đ";
    document.getElementById("quantity").innerText = 0;

    console.log(document.getElementById("order-body").childElementCount);
    if (document.getElementById("order-body").childElementCount === 0) {
        var so = 0;
    } else {
        var h = document.getElementById("order-body").lastElementChild.querySelector(".madh").innerText;
        var m = h.indexOf("-");
        var so = parseInt(h.slice(m + 1)) + 1;
    }
    // Thêm vào listDonHang
    var listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    for (var a of listDonHang) {
        if (a.taikhoan === taikhoan) {
            a.donhang.push({
                madh: `${taikhoan}-${so}`,
                duocDuyet: false,
                giohang: gioHang,
            })
        }
    }
    localStorage.setItem("listDonHang", JSON.stringify(listDonHang));
}

function inDonHang() {
    document.getElementById("order-body").innerHTML = "";
    var taikhoan = document.getElementById("show-taikhoan").innerText;
    var listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    var arr = [];
    for (var a of listDonHang) {
        if (a.taikhoan === taikhoan) {
            arr = a.donhang;
        }
    }
    var s = "";
    var tong = 0;
    var stt = 0;
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].giohang.length; j++) {
            s += `<span class="ten">${arr[i].giohang[j].nameProduct}</span> <span class="sl">(${arr[i].giohang[j].quantity})</span><br>`;
            tong += parseInt(arr[i].giohang[j].money);
        }

        // inner vào Đơn hàng của trang người dùng đó thành đã xử lý
        if (arr[i].duocDuyet === true) { // đã xử lý thì không được hủy đơn hàng nữa.
            var xuLy = "Đã Xử Lý";
            var btn = "";
        } else {
            var xuLy = "Chưa Xử Lý";
            var btn = `<button onclick="huyDonHang(this);">Hủy đơn hàng</button>`;
        }

        document.getElementById("order-body").innerHTML += `
            <tr>
                <td class="sott">${++stt}</td>
                <td class="madh">${arr[i].madh}</td>
                <td class="listsp">
                    ${s}
                </td>
                <td id="tongtien">${tong}đ</td>
                <td>${xuLy}</td>
                <td>${btn}</td>
            </tr>`
        s = "";
        tong = 0;
    }
}

var click = false;

function showOrder() {
    if (!click) {
        document.getElementById("main-order").style.display = "block";
        click = true;
        inDonHang();
    } else {
        document.getElementById("main-order").style.display = "none";
        click = false;
    }
}


function huyDonHang(button) {
    var taikhoan = document.getElementById("show-taikhoan").innerText;
    var madh = button.parentElement.parentElement.querySelector(".madh").innerText;
    console.log("madh", madh);
    var listDonHang = JSON.parse(localStorage.getItem("listDonHang"));
    var arr = [];
    for (var a of listDonHang) {
        if (a.taikhoan === taikhoan) {
            arr = a.donhang;
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].madh === madh) {
            arr.splice(i, 1);
            break;
        }
    }
    for (var a of listDonHang) {
        if (a.taikhoan === taikhoan) {
            a.donhang = arr;
        }
    }
    localStorage.setItem("listDonHang", JSON.stringify(listDonHang));
}