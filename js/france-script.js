// تثبيت الـ Navbar عند التمرير
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 180);
});

// تفعيل القائمة الجانبية عند الضغط على أيقونة القائمة
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navList = document.querySelector(".navlist");

    menuIcon.addEventListener("click", function () {
        navList.classList.toggle("active");
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", function (event) {
        if (!menuIcon.contains(event.target) && !navList.contains(event.target)) {
            navList.classList.remove("active");
        }
    });

    // **إخفاء الكروت في صفحات المدن**
    const cities = ["Paris", "Nice", "Lille", "Lyon", "Bordeaux", "Toulouse"];
    const pageTitle = document.title.trim();

    if (cities.includes(pageTitle)) {
        document.body.classList.add("hide-cards");
    }

    // **تعطيل ظهور الكروت عند الضغط على أي مدينة في index.html**
    document.querySelectorAll(".navlist a, .card a").forEach(link => {
        link.addEventListener("click", function () {
            const targetCity = this.textContent.trim();
            if (cities.includes(targetCity)) {
                localStorage.setItem("hideCards", "true");
            }
        });
    });

    // **التأكد عند تحميل الصفحة الجديدة إذا كان هناك أمر لإخفاء الكروت**
    if (localStorage.getItem("hideCards") === "true") {
        document.body.classList.add("hide-cards");
        localStorage.removeItem("hideCards");
    }
});

// **سلايدر عرض الأماكن**
document.querySelectorAll(".slider").forEach(slider => {
    const form = slider.querySelector(".form");
    let mouseDownAt = 0;
    let left = 0;

    slider.onmousedown = (e) => {
        mouseDownAt = e.clientX;
    };

    slider.onmouseup = () => {
        mouseDownAt = 0;
        slider.style.userSelect = 'unset';
        slider.style.cursor = 'unset';
        form.style.pointerEvents = 'unset';
        form.classList.remove('left', 'right');
    };

    slider.onmousemove = (e) => {
        if (mouseDownAt === 0) return;
        slider.style.userSelect = 'none';
        slider.style.cursor = 'grab';
        form.style.pointerEvents = 'none';

        if (e.clientX > mouseDownAt) {
            form.classList.add('left');
            form.classList.remove('right');
        } else if (e.clientX < mouseDownAt) {
            form.classList.remove('left');
            form.classList.add('right');
        }

        let speed = 3;
        let leftTemporary = left + ((e.clientX - mouseDownAt) / speed);
        let leftLimit = form.offsetWidth - slider.offsetWidth / 2;

        if (leftTemporary < 0 && Math.abs(leftTemporary) < leftLimit) {
            form.style.setProperty('--left', left + 'px');
            left = leftTemporary;
            mouseDownAt = e.clientX;
        }
    };
});

// **النوافذ المنبثقة الخاصة بالتقييم**
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const openModalButtons = document.querySelectorAll(".openModalrate");
    const closeModal = document.querySelector(".close");

    modal.style.display = "none";

    openModalButtons.forEach(button => {
        button.addEventListener("click", function () {
            modal.style.display = "flex";
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // إرسال التقييم عند النقر على زر "إرسال"
    document.getElementById("submitReview")?.addEventListener("click", function () {
        const reviewText = document.getElementById("reviewText").value;
        const selectedRating = document.querySelector('input[name="rate"]:checked');

        if (!selectedRating) {
            alert("يرجى اختيار عدد النجوم للتقييم!");
            return;
        }

        alert(`تم إرسال تقييمك: ${selectedRating.value} نجوم\nمراجعتك: ${reviewText}`);
        modal.style.display = "none";
    });
});

// **النوافذ المنبثقة للأماكن والمطاعم**
document.addEventListener("DOMContentLoaded", function () {
    const modalButtons = document.querySelectorAll(".openModal");
    const closeButtons = document.querySelectorAll(".close");
    const modals = document.querySelectorAll(".modal");

    modals.forEach(modal => modal.style.display = "none");

    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "flex";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});

// **فتح خريطة جوجل عند الضغط على زر الموقع**
function openLocation(url) {
    window.open(url, "_blank");
}

// **إجراء مكالمة عند الضغط على زر الاتصال**
function callNumber(number) {
    window.location.href = `tel:${number}`;
}
