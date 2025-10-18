// 📄 toast.js

// ===== Hàm gốc tạo toast =====
 function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (!main) return;

  const toast = document.createElement("div");

  // Tự động xóa toast sau thời gian duration + 1s
  const autoRemoveId = setTimeout(() => {
    main.removeChild(toast);
  }, duration + 1000);

  // Xóa khi người dùng click nút đóng
  toast.onclick = (e) => {
    if (e.target.closest(".toast__close")) {
      main.removeChild(toast);
      clearTimeout(autoRemoveId);
    }
  };

  const icons = {
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-circle",
    error: "fas fa-exclamation-circle",
  };

  const icon = icons[type];
  const delay = (duration / 1000).toFixed(2);

  toast.classList.add("toast", `toast--${type}`);
  toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

  toast.innerHTML = `
    <div class="toast__icon">
      <i class="${icon}"></i>
    </div>
    <div class="toast__body">
      <h3 class="toast__title">${title}</h3>
      <p class="toast__msg">${message}</p>
    </div>
    <div class="toast__close">
      <i class="fas fa-times"></i>
    </div>
  `;

  main.appendChild(toast);
}

// ===== Các hàm public export ra ngoài =====

// Thành công
 function showSuccessToast(message) {
  toast({
    title: "Thành công!",
    message,
    type: "success",
    duration: 5000,
  });
}

// Thông tin
  function showInfoToast(message) {
  toast({
    title: "Thông tin",
    message,
    type: "info",
    duration: 5000,
  });
}

// Cảnh báo
 function showWarningToast(message) {
  toast({
    title: "Cảnh báo!",
    message,
    type: "warning",
    duration: 5000,
  });
}

// Lỗi
 function showErrorToast(message) {
  toast({
    title: "Thất bại!",
    message,
    type: "error",
    duration: 5000,
  });
}


