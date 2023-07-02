let tittle= document.getElementById("listProduct__Item3");

/*Api File Fetch Start*/
async function getFileData() {
    const response = await fetch('./gift.json');
    // console.log(response)
    let data = await response.json();
    // console.log("data", data);
    displayList(data);
}

function error() {
    console.log("Error");
}

(async function () {
    try {
        getFileData();
    }
    catch {
        error();
    }
})();
/*Api File Fetch End*/
function displayList(data) {
    let product = "";
    for (let i = 0; i < data.length; i++) {
        product += `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="product mb-50">
                <div class="product__img">
                    <div class="product__cart">
                        <a class="img__Link" href="./shoping.html">
                            <img class="img__1" src="${data[i].img1}" alt="">
                            <img class="img__hover" src="${data[i].image_url}" alt="">          
                        </a>
                        <span class="wishlist">
                            <span onclick="addToWish3(${i})" class="wishlistIcon"><i class="fa-regular fa-heart"></i></span>
                            <span class="loadingIcon hide"><i class="fa-solid fa-spinner"></i></span>
                        </span>
                    </div>
                    <div class="productInfo text-center mt-30">
                        <div class="product__price__details">
                            <h6 class="product__tittle mb-11">${data[i].title}</h6>
                            <div class="product__price">
                                <span class="new__price text-dark mr-12">$${data[i].newPrice}</span>
                            </div>
                        </div>
                        <div class="row justify-content-center align-items-center product__buttons">
                            <div class="productIcon productSearch"><i
                                    class="fa-solid fa-magnifying-glass"></i></div>
                            <div class="productIcon productShop" onclick="addCart3(${i})"><i
                                    class="fa-solid fa-cart-shopping"></i></div>
                            <div class="productIcon productCompare"><i
                                    class="fa-solid fa-shuffle"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> `;
    }
    document.getElementById("productGift").innerHTML=product;
    changeImage();
    wishAction();
}