     function dangNhapAdmin()
    {
        var un = document.getElementById ('username').value;
        var pass = document.getElementById ('password').value;
        var check = false;
        var listTaiKhoan = JSON.parse(localStorage.listTaiKhoan)
        var index  =  listTaiKhoan.findIndex(item=>{
                return item.taikhoan == un  && item.matkhau == pass && item.status == '1' && item.role == '2' 
        })

        if(index >= 0 )
        {
            localStorage.setItem('userId',un);
            window.location.href = 'http://127.0.0.1:8080/ADMIN.html';
        }
        else
            showErrorToast('Tài khoản hoặc mật khẩu không đúng!')
    }
