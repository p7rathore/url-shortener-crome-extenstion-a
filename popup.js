let btn = document.querySelector(".btn");
let result = document.querySelector(".result");
let lodderLink = document.querySelector(".lodder-link");
let QrCode = document.querySelector(".Qr-code");
let qrdbtn = document.getElementById("qrdbtn");
let errorInempty = document.querySelector(".error-input-empty");

btn.addEventListener("click", () => {
  let input = document.querySelector(".input").value;
  if (input === "") {
    errorInempty.style.display = "block";
  } else {
    errorInempty.style.display = "none";
  }
  InputUrl(input);
});

/* ================= lodder ===================== */
const lodderstart = () => {
  lodderLink.style.display = "block";
};

const lodderend = () => {
  lodderLink.style.display = "none";
};
/* =============== Url Api call =============== */
const InputUrl = (url) => {
  lodderstart();
  fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then((res) => res.json())
    .then((results) => {
      console.log(results);
      let resulturls = results.result;
      lodderend();
      showUrldeta(resulturls);
      QrCodeDataShow(resulturls);
      ErrorHandale(resulturls);
    });
};
/* =============== url data show =============== */
const showUrldeta = (showdetaurl) => {
  let html = "";
  html += `
    <div class="links">
         <p class="link-text">${showdetaurl.short_link2}</p>
    </div>
    <div class="links">
         <p class="link-text">${showdetaurl.full_short_link}</p>
    </div>
    <div class="links">
        <p class="link-text">${showdetaurl.full_short_link2}</p>
    </div>
    <div class="links">
        <p class="link-text">${showdetaurl.full_short_link3}</p>
     </div>
                   
    `;
  result.innerHTML = html;
};
/* ==================== Qr code data show ======================== */

const QrCodeDataShow = (QrLinkData) => {
  let qrlINK = `https://api.qrserver.com/v1/create-qr-code/?&data=${QrLinkData.short_link2}`;
  let qrdeta = "";
  qrdeta += `

      <img
          class="Qr-image"
          src="https://api.qrserver.com/v1/create-qr-code/?&data=${QrLinkData.short_link2}"
          alt="Qr.png"
        />
       
      `;
  QrCode.innerHTML = qrdeta;

  qrdbtn.addEventListener("click", () => {
    fetch(qrlINK)
      .then((res) => res.blob())
      .then((qrlinkdata) => {
        let tempURL = URL.createObjectURL(qrlinkdata);
        let aTag = document.createElement("a");
        aTag.href = tempURL;
        aTag.download = "QrCode";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  });
};

/* ============================ Error Handaling =================== */
const ErrorHandale = (error) => {
  console.log(error);
};
