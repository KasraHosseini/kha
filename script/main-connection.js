async function getData() {
  try {
    let res = await fetch("https://67964d45bedc5d43a6c4db00.mockapi.io/api/db1/data", {
      method: "GET",
    });
    if (res.status === 200) {
      let data = await res.json();

      data[0].db.product.big_sale.map((elem) => {
        document.querySelector("#home-slider-sale .swiper-wrapper").innerHTML += `
            <div class="swiper-slide product-modal-btn bg-body-tertiary border border-slate-400 text-center height-250px p-1 d-flex flex-column align-items-center height-250px product-tab-sale">
              <div>
                <img src="${elem.img_url}" class="img-thumbnail border-slate-100 bg-overly" alt="" />
              </div>
              <div class="w-100 h-100 d-flex justify-content-between flex-column gap-0">
                <p class="txt-5">${minNameSlider(elem.title)}</p>
                <p class="d-none">${elem.title}</p>
                <p class="d-none">${elem.desc}</p>
                <p class="d-none">${elem.cate}</p>
                <p class="d-none">${elem.brand}</p>
                <p class="d-none">${elem.id}</p>
                ${priceOff(elem.sale, elem.price)}
              </div>
            </div>`;
      });
      for (let i = 0; i < data[0].db.product.categories.length; i++) {
        if ((i + 1) % 3 == 0) {
          document.querySelector("#home-categories").innerHTML += `
            <div class="col-10 p-0 pe-2 overflow-hidden row justify-content-around align-items-center border border-2 border-slate-400 rounded-5 height-150px">
                <div class="col-7 h-100 p-0">
                    <div class="w-min bg-slate-400 text-light rounded-end-pill h-100 d-flex justify-content-center align-items-start flex-column ps-5 pe-3">
                        <h3 class="fs-4 fw-bolder">${data[0].db.product.categories[i].faName}</h3>
                    </div>
                </div>
                <div class="ratio-cu ratio ratio-1x1 col overflow-hidden rounded-5 d-flex justify-content-center align-items-center height-130px">
                    <img src="${data[0].db.product.categories[i].thumbnail}" class="object-fit-cover rounded-2 bg-overly" alt="" />
                </div>
            </div>
            `;
        } else {
          document.querySelector("#home-categories").innerHTML += `
            <div class="col-10 col-md-5 p-0 pe-2 overflow-hidden row justify-content-around align-items-center border border-2 border-slate-400 rounded-5 height-150px">
                <div class="col-7 h-100 p-0">
                    <div class="w-min bg-slate-400 text-light rounded-end-pill h-100 d-flex justify-content-center align-items-start flex-column ps-5 pe-3">
                        <h3 class="fs-4 fw-bolder">${data[0].db.product.categories[i].faName}</h3>
                    </div>
                </div>
                <div class="ratio-cu ratio ratio-1x1 col overflow-hidden rounded-5 d-flex justify-content-center align-items-center height-130px">
                    <img src="${data[0].db.product.categories[i].thumbnail}" class="object-fit-cover rounded-2 bg-overly" alt="" />
                </div>
            </div>
            `;
        }
      }

      data[0].db.product.product.map((elem) => {
        document.querySelector("#home-product").innerHTML += `
            <div class="p-2 product-modal-btn hover-colcs shadow-hvr-box-gray col-5 col-md-3 col-lg-2 border border-slate-400 bg-gray-100 rounded-4">
              <div>
                <img src="${elem.img_url}" class="img-thumbnail border-0 bg-overly" alt="" />
              </div>
              <div class="w-100 d-flex justify-content-between flex-column gap-0">
                <p class="txt-5">${minName(elem.title)}</p>
                <p class="d-none">${elem.title}</p>
                <p class="d-none">${elem.desc}</p>
                <p class="d-none">${elem.cate}</p>
                <p class="d-none">${elem.brand}</p>
                <p class="d-none">${elem.id}</p>
                ${priceOff(elem.sale, elem.price)}
              </div>
            </div>
            `;
      });

      data[0].db.product.brands.map((elem) => {
        document.querySelector("#home-slider-brands .swiper-wrapper").innerHTML += `
        <div class="swiper-slide ratio ratio-16x9">
          <img src="${elem.thumbnail}" class="w-100 object-fit-cover bg-overly" alt="">
        </div>`;
      });
      productTab([...document.querySelectorAll(".product-modal-btn")]);
    } else {
      document.body.innerHTML += `
      <div class="toast align-items-center position-fixed top-0 mt-5 z-3 rounded-5 show" data-bs-theme="dark">
        <div class="toast-header rounded-top-5">
          <div class="p-3 rounded-circle bg-red me-1"></div>
          <strong>دیجی مارک</strong>
          <small class="text-body-secondary ms-auto">پیام خطا</small>
          <button class="btn-close me-2" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body text-light">${checkErr(res.status)}</div>
      </div>
      `;
    }
  } catch (err) {
    document.body.innerHTML += `
      <div class="toast align-items-center position-fixed top-0 mt-5 z-3 rounded-5 show" data-bs-theme="dark">
        <div class="toast-header rounded-top-5">
          <div class="p-3 rounded-circle bg-red me-1"></div>
          <strong>دیجی مارک</strong>
          <small class="text-body-secondary ms-auto">پیام خطا</small>
          <button class="btn-close me-2" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body text-light">${checkErr(err)}</div>
      </div>
      `;
    console.log(err);
  }
}
getData();
function generateCaptcha(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    captcha += chars.charAt(randomIndex);
  }
  return captcha;
}

document.addEventListener("DOMContentLoaded", function () {
  const captchaInput = document.getElementById("captcha-input");
  const captchaShow = document.getElementById("captcha-show");
  const captchaBtn = document.getElementById("captcha-check-btn");
  const captchaMsg = document.getElementById("captcha-msg");

  let captchaCode = generateCaptcha(6);
  captchaShow.value = captchaCode;

  captchaBtn.addEventListener("click", function () {
    const userInput = captchaInput.value.trim().toUpperCase();

    if (userInput === captchaCode) {
      captchaMsg.innerHTML = "کد امنیتی به درستی وارد شده است.<br>6219861807726327<br>پس از انتقال وجه، تصویر فیش را به شماره<br>09911996318<br>ارسال کنید";
      captchaMsg.classList.remove("text-danger");
      captchaMsg.classList.add("text-success");
    } else {
      captchaMsg.textContent = "کد وارد شده صحیح نیست. لطفاً دوباره تلاش کنید.";
      captchaMsg.classList.remove("text-success");
      captchaMsg.classList.add("text-danger");
      captchaInput.value = "";
      captchaCode = generateCaptcha(6);
      captchaShow.value = captchaCode;
    }
  });

  const payModal = document.getElementById("pay-help");
  payModal.addEventListener("shown.bs.modal", function () {
    captchaInput.value = "";
    captchaMsg.textContent = "";
    captchaCode = generateCaptcha(6);
    captchaShow.value = captchaCode;
  });
});
function productTab(target) {
  let PTab = document.createElement("div");
  PTab.classList = "product-modal position-fixed full-screen-fixed z-3";

  target.map((elem) => {
    elem.addEventListener("click", () => {
      PTab.innerHTML = `
      <div class="bg-glass w-100 h-100 rounded-3 z-2">
        <div class="p-2 p-md-3 col-10 col-md-9 h-100 overflow-auto center-fixed position-absolute rounded-5 bg-gray-50">
          <button class="btn-close- text-slate-400 bg-transparent fw-bold border-0">بستن</button>
          <div class="row gap-2 gap-lg-0 align-items-center flex-column flex-lg-row-reverse">
            <div class="col-lg-6 overflow-hidden rounded-5">
              <img src="${elem.children[0].children[0].src}" class="w-100 object-fit-cover rounded-5 bg-overly" alt=""/>
            </div>
            <div class="col-lg-6 pb-5">
              <p class="fw-bolder txt-4">${elem.children[1].children[1].innerText}</p>
              <p class="txt-4 text-gray-800 text-justify px-4">${elem.children[1].children[2].innerText}</p>
              <div class="bg-gray-200 rounded-5 position-sticky bottom-0 p-2 d-flex flex-column justify-content-center align-items-center">
                <div class="d-flex justify-content-between align-items-center col-12">
                  <div class="fw-bold txt-6">
                    <p>دسته بندی: <small class="fw-light">${elem.children[1].children[3].innerText}</small></p>
                    <p>برند: <small class="fw-light">${elem.children[1].children[4].innerText}</small></p>
                    <p>کد: <small class="fw-light">${elem.children[1].children[5].innerText}</small></p>
                  </div>
                  <div class="position-relative w-min">
                    ${elem.children[1].children[6].innerHTML}
                  </div>            
                </div>
                <button class="txt-5 py-2 col-10 rounded-pill bg-slate-400 bg-hvr-slate-600 border-0">افزودن به سبد خرید <i class="fa-duotone fa-basket-shopping-plus"></i></button>
              </div>
            </div>
          </div>
        </div>  
      </div>`;
      PTab.querySelector("button.txt-5").addEventListener("click", () => {
        addToCart(elem.children[1].children[1].innerText, elem.children[1].children[6].innerHTML, elem.children[0].children[0].src);
      });
      document.body.appendChild(PTab);
      PTab.addEventListener("click", (even) => {
        if (even.target.classList[0] == "bg-glass") {
          PTab.remove();
        }
      });
      PTab.querySelector(".btn-close-").addEventListener("click", () => {
        PTab.remove();
      });
    });
  });
}
function addToCart(title, priceBox, img) {
  document.querySelector("div.modal.product-m > .modal-dialog .modal-body").innerHTML += `
  <div class="position-relative p-2 rounded-3 border border-2 border-gray-300 d-flex flex-row justify-content-between align-items-center">
    <button class="btn bg-transparent text-hvr-red-300 position-absolute top-0 left-0 p-2 del-product"><i class="fa-duotone fa-trash-alt"></i></button>
    <div class="col ratio ratio-1x1 overflow-hidden rounded-3">
      <img src="${img}" class="object-fit-cover w-100 bg-overly" alt="" />
    </div>
    <div class="col-9 ps-2">
      <p class="txt-5 fw-bold">${title}</p>
      <div class="p-2 w-min ms-auto bg-gray-300 rounded-5 position-relative">
        ${priceBox}
      </div>
    </div>
  </div>
  `;
  let price = document.createElement("div");
  price.innerHTML = priceBox;
  showPrice(price.querySelector("span.txt-6.fw-light").innerHTML, "+");

  [...document.querySelectorAll("button.del-product")].map((elem) => {
    elem.addEventListener("click", () => {
      //
      showPrice(elem.nextElementSibling.nextElementSibling.querySelector("span.txt-6.fw-light").innerHTML, "-");
      elem.parentElement.remove();
    });
  });

  document.querySelector(".successAddCart").classList.toggle("hide");
  document.querySelector(".successAddCart").classList.toggle("show");
}
let currentCartPrice = 0;
function showPrice(newPrice, opr) {
  newPrice = Number(newPrice.replace(/,/g, ""));
  switch (opr) {
    case "+":
      currentCartPrice = currentCartPrice + newPrice;
      document.querySelector(".cartPrice span").innerHTML = minPrice(currentCartPrice);
      break;
    case "-":
      currentCartPrice = currentCartPrice - newPrice;
      document.querySelector(".cartPrice span").innerHTML = minPrice(currentCartPrice);
      break;
  }
}

function minNameSlider(name) {
  return name.slice(0, 25) + "...";
}
function minName(name) {
  return name.slice(0, 45) + "...";
}
function minPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function priceOff(sale, price) {
  if (sale == "" || sale == 0) {
    return `<p class="txt-5 fw-lighter text-end"><span class="txt-6 fw-light">${minPrice(price)}</span> <smal><img src="toman.svg" class="toman-size"/></smal></p>`;
  } else {
    return `
    <div class="d-flex p-0 flex-column gap-0 align-items-end position-relative">
      <p class="d-flex flex-row align-items-center text-end p-0 m-0 ms-5"><span class="txt-6 fw-light">${minPrice(price - (price * sale) / 100)}</span> <smal><img src="toman.svg" class="toman-size"/></smal></p>
      <p class="fw-lighter text-end text-decoration-line-through text-gray p-0 m-0 font-10px">${minPrice(price)}</p>
      <span class="p-1 badge rounded-pill bg-stone-400 text-light fw-lighter position-absolute top-right-0">${sale}%</span>
    </div>
    `;
  }
}
function checkErr(err) {
  switch (err) {
    case 400:
      return "نا موفق در ارسال درخواست به سرور";
    case 403:
      return "دسترسی به این صفحه مسدود است";
    case 404:
      return "صفحه مورد نظر یافت نشد";
    case 408:
      return "طولانی بودن زمان درخواست";
    case 500:
      return "عدم اتصال به سرور";
    case 502:
      return "مشکلی در سرور به وجود امده است";
    case 503:
      return "در حال به روز رسانی وبسایت هستیم";
    case 504:
      return "مشکلی از سمت سرور پیش آمده است";
    default:
      return "موقتا وب سایت از دسترس خارج شدا است، دوباره تلاش کنید";
  }
}
