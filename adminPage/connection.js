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
  brand: document.querySelector("#p_brand"),
  price: document.querySelector("#p_price"),
  sale: document.querySelector("#p_sale"),
  cate: document.querySelector("#p_cate"),
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
    let item = {
      id: +inputs.id.value,
      img_url: inputs.img.value,
      title: inputs.title.value,
      desc: inputs.desc.value,
      brand: inputs.brand.value,
      price: +inputs.price.value,
      sale: +inputs.sale.value,
      cate: inputs.cate.value,
    };
    await syncData(item);
  }
});

async function syncData(item) {
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
        list = list.filter((i) => i.id !== item.id);
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
