// let currentMode = "";
// let p_id;
// let p_img;
// let p_title;
// let p_desc;
// let p_price;
// let p_sale;
// let p_cate;
// let p_delId;
// document.querySelector(".sub-btn").addEventListener("click", () => {
//   document.querySelector(".msg").style.bottom = "0";
//   document.querySelector(".msg").style.boxShadow = "0 0 50px black";
//   p_id = Number(document.querySelector("#p_id").value);
//   p_img = document.querySelector("#p_img").value;
//   p_title = document.querySelector("#p_title").value;
//   p_desc = document.querySelector("#p_desc").value;
//   p_price = Number(document.querySelector("#p_price").value);
//   p_sale = Number(document.querySelector("#p_sale").value);
//   p_cate = document.querySelector("#p_cate").value;
//   p_delId = document.querySelector("#delId").value;
//   console.log(p_id);
//   console.log(p_img);
//   document.querySelector('button[data-progress="true"]').addEventListener("click", () => {
//     document.querySelector(".msg").style.bottom = "-138px";
//     document.querySelector(".msg").style.boxShadow = "0 0 0 black";
//     changeData(p_id, p_img, p_title, p_desc, p_price, p_sale, p_cate);
//   });
//   document.querySelector('button[data-progress="false"]').addEventListener("click", () => {
//     document.querySelector(".msg").style.bottom = "-138px";
//     document.querySelector(".msg").style.boxShadow = "0 0 0 black";
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("#firstAction").addEventListener("click", (e) => {
//     if (e.target != document.querySelector("input[type='number']")) {
//       document.querySelector("#actions").style.height = "132px";
//       document.querySelector("#actions").style.zIndex = "3";
//     }
//   });
//   [...document.querySelectorAll("#actions div")].map((elem) => {
//     elem.addEventListener("click", () => {
//       currentMode = elem.getAttribute("data-admin-mode");
//       document.querySelector("#firstAction").innerHTML = elem.innerHTML;
//       document.querySelector("#actions").style.height = "44px";
//       document.querySelector("#actions").style.zIndex = "1";
//     });
//   });
// });
// async function changeData(p_id, p_img, p_title, p_desc, p_price, p_sale, p_cate) {
//   let data = {
//     id: p_id,
//     p_img,
//     p_title,
//     p_desc,
//     p_price,
//     p_sale,
//     p_cate,
//   };
//   try {
//     const res = await fetch("https://67964d45bedc5d43a6c4db00.mockapi.io/api/db1/data/1", {
//       method: "GET",
//     });
//     if (!res.ok) {
//       alert(`http error: ${res.status}`);
//       throw new Error(`http error: ${res.status}`);
//     }
//     let receivedData = await res.json();
//     if (currentMode == "addData") {
//       receivedData.db.product.product.unshift(data);
//     } else if (currentMode == "editData") {
//       receivedData.db.product.product = receivedData.db.product.product.map((elem) => (elem.id == p_id ? data : elem));
//     } else {
//       receivedData.db.product.product = receivedData.db.product.product.map((elem) => {
//         if (elem.id == p_delId) {
//         }
//       });
//     }
//     const action = await fetch("https://67964d45bedc5d43a6c4db00.mockapi.io/api/db1/data/1", {
//       method: "PUT",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(receivedData),
//     });
//     if (!action.ok) {
//       alert(`http error: ${res.status}`);
//       throw new Error(`http error: ${res.status}`);
//     }
//   } catch (err) {
//     alert(`fetch error: ${err.message}`);
//     console.error(`fetch error: ${err.message}`);
//   }
// }
// connection.js

const API = "https://67964d45bedc5d43a6c4db00.mockapi.io/api/db1/data/1";
let mode = "";

const msgBox = document.querySelector(".msg");
const firstBtn = document.querySelector("#firstAction");
const actions = document.querySelector("#actions");
const submitBtn = document.querySelector(".sub-btn");

const inputs = {
  id: document.querySelector("#p_id"),
  img: document.querySelector("#p_img"),
  title: document.querySelector("#p_title"),
  desc: document.querySelector("#p_desc"),
  price: document.querySelector("#p_price"),
  sale: document.querySelector("#p_sale"),
  cate: document.querySelector("#p_cate"),
  delId: document.querySelector("#delId"),
};

firstBtn.addEventListener("click", (e) => {
  if (e.target.closest("input[type=number]")) return;
  actions.classList.toggle("open");
});

actions.addEventListener("click", (e) => {
  const m = e.target.dataset.adminMode;
  if (!m) return;
  mode = m;
  firstBtn.innerHTML = e.target.innerHTML.trim();
  actions.classList.remove("open");
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  msgBox.style.cssText = "bottom:0; box-shadow:0 0 50px rgba(0,0,0,0.3);";
});

msgBox.addEventListener("click", async (e) => {
  if (!e.target.matches("button[data-progress]")) return;
  msgBox.style.cssText = "bottom:-138px; box-shadow:none;";

  if (e.target.dataset.progress === "true") {
    const item = {
      id: +inputs.id.value,
      img_url: inputs.img.value,
      title: inputs.title.value,
      desc: inputs.desc.value,
      price: +inputs.price.value,
      sale: +inputs.sale.value,
      cate: inputs.cate.value,
    };
    const delId = +inputs.delId.value;
    await syncData(item, delId);
  }
});

async function syncData(item, delId) {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`GET ${res.status}`);
    const json = await res.json();
    let list = json.db.product.product;

    switch (mode) {
      case "addData":
        list = [item, ...list];
        break;
      case "editData":
        list = list.map((i) => (i.id === item.id ? item : i));
        break;
      case "deleteData":
        list = list.filter((i) => i.id == delId);
        break;
      default:
        console.warn("no mode!");
        return;
    }

    json.db.product.product = list;
    const put = await fetch(API, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(json),
    });
    if (!put.ok) throw new Error(`PUT ${put.status}`);
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}
