let portoCart=[]

let portofolioCart = JSON.parse(localStorage.getItem('portofolioCart')) || []
/*Api File Fetch Start*/
async function getPortofolioData() {
    const response = await fetch('./portofolio.json');
    // console.log(response);
    let Portofolio = await response.json();
    // console.log("data", Portofolio);
    portoCart=Portofolio;
    displayPortofolio(Portofolio);
}

function error() {
    console.log("Error");
}

(async function () {
    try {
        getPortofolioData();
    }
    catch {
        error();
    }
})();
/*Api File Fetch End*/

/* */
function displayPortofolio(Portofolio) {
    let porto = ""
    for(let i=0 ; i<Portofolio.length ; i++){
        porto += `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="mb-30">
                <div class="portofolio__item1">
                    <div class="portofolio__img">
                        <img src="${Portofolio[i].portofolio__img}" alt="">
                    </div>
                    <div class="portofolio__content">
                        <h4 class="portofolio__Heading mb-20">${Portofolio[i].title}</h4>
                        <div class="mb-20">
                            <p class="portofolio__text">${Portofolio[i].text}</p>
                        </div>
                        <div class="portofolio__link">
                            <a onclick="readMore(${i})" href="./portofolioDetails.html">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }
   document.getElementById("portofolio").innerHTML=porto;
}

function readMore(id){
    localStorage.setItem('portofolioCart', JSON.stringify(portoCart[id]))
}

