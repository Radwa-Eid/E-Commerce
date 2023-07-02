"use strict"

/* Mobile Menu Header Start */
let mobileMenu = document.getElementById("mobileMenu");
let mobileList = document.getElementById("mobileList");
let overlay = document.getElementById("overlay");
mobileMenu.addEventListener("click", function () {
    mobileList.style.transform = "translate(0)";
    overlay.style.display = "block";
})
overlay.addEventListener("click", function () {
    mobileList.style.transform = "translate(-100%)";
    overlay.style.display = "none";
})
/* Mobile Menu Header End */

/*Search Header Start */
let searchIcon = document.getElementById("searchICON");
let closeBtn = document.getElementById("searchClose");
let searchContainer = []
searchIcon.addEventListener("click", function () {
    document.getElementById("searchCart").style.transform = "translate(0%)"
})
closeBtn.addEventListener("click", function () {
    document.getElementById("searchCart").style.transform = "translate(100%)"
})

let search = document.getElementById("searchingProduct");
let display = document.getElementById("searching");
searchContainer = JSON.parse(localStorage.getItem("searchContainer"))
search.addEventListener("keyup", function () {
    let searchDisplay = [];
    let searchedValue = this.value;
    if (searchedValue != null) {
        display.style.display = "block";
        if (searchedValue == "") {
            display.style.display = "none";
        }
        else {
            for (let i = 0; i < searchContainer.sale.length; i++) {
                if (searchContainer.sale[i].title.includes(searchedValue.trim()) == true) {
                    console.log(searchContainer.sale[i])
                    searchDisplay += `
                    <li class="searchResults1">
                        <a href="#">
                            <div class="row align-items-center justify-content-center">
                                <div class="col-lg-4">
                                    <img class="searching__img" src="${searchContainer.sale[i].img1}" alt="">
                                </div>
                                <div class="col-lg-8">
                                    <div class="search__item">
                                        <span class="searchVendor">Vendor</span>
                                        <span class="searchHeading__item">${searchContainer.sale[i].title}</span>
                                        <div class="searchPrice__item">$${searchContainer.sale[i].newPrice}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`
                }
            }
            document.getElementById("searchingResult").innerHTML = searchDisplay;
        }
    }
})

/*Search Header End */

/*----------------------------------------------------------------------------------- */
/*----------------------------------------------------------------------------------- */

/*Decleration Variables Start */

/*Wish Cart Variables Start */
let wishItem1 = []
let wishItem2 = []
let wishItem3 = []

let wishCart = JSON.parse(localStorage.getItem('wishCart')) || []
/*Wish Cart Variables End */

/*Cart Item Variable Start */
let cartCount = document.getElementById("cartLenght")
let cart = JSON.parse(localStorage.getItem('shopCart')) || []
cartCount.textContent = cart.length

/*Cart Item Variable End */
/*Decleration Variables End */

/*Api File Fetch Start*/
async function getFileData() {
    const response = await fetch('./product.json');
    // console.log(response);
    let data = await response.json();
    // console.log("data", data);
    displayProduct(data);
    wishItem1 = data.sale;
    wishItem2 = data.nosale;
    wishItem3 = data.noOption;
    localStorage.setItem('searchContainer', JSON.stringify(data));
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

/*Display Product From Api File Start */
function displayProduct(data) {
    let sale = data.sale;
    let nosale = data.nosale;
    let noOption = data.noOption;
    let product = "";
    for (let i = 0; i < sale.length; i++) {
        product += `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div id="itemLoading" class="product mb-50">
                <div class="product__img">
                    <div class="product__cart">
                        <a class="img__Link" href="./shoping.html">
                            <img class="img__1" src="${sale[i].img1}" alt="">
                            <img class="img__hover" src="${sale[i].image_url}" alt="">          
                        </a>
                        <div class="productBadge d-flex flex-column">
                            <div class="onsale">Sale</div>
                            <div class="onsale precent">${sale[i].sale}%</div>
                        </div>
                        <span class="wishlist">
                            <span onclick="addToWish1(${i})" class="wishlistIcon"><i class="fa-regular fa-heart"></i></span>
                            <span class="loadingIcon hide"><i class="fa-solid fa-spinner"></i></span>
                        </span>
                        <div class="productOption">
                            <div class="colorContainer">
                                <ul class="colorList row justify-content-center align-items-center">
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div data-src="${sale[i].cart1}" data-id="${sale[i].id}" class="productIcon product__view" id="productCrop1">
                                                <img class="productOption__img" src="${sale[i].optionImg1}" alt="">
                                            </div>
                                        </div>
                                    </li>
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div data-src="${sale[i].cart2}" data-id="${sale[i].id}" class="productIcon product__view" id="productCrop2">
                                                <img class="productOption__img" src="${sale[i].optionImg2}" alt="">
                                            </div>
                                        </div>
                                    </li>
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div data-src="${sale[i].cart3}" data-id="${sale[i].id}" class="productIcon product__view" id="productCrop3">
                                                <img class="productOption__img" src="${sale[i].optionImg3}" alt="">
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="sizeContainer">
                                <ul class="sizeList row justify-content-center align-items-center">
                                    <li class="size1">s</li>
                                    <li class="size1">m</li>
                                    <li class="size1">l</li>
                                    <li class="size1">xl</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="productInfo text-center mt-30">
                        <div class="product__price__details">
                            <h6 class="product__tittle mb-11">${sale[i].title}</h6>
                            <div class="product__price">
                                <span class="new__price mr-12">$${sale[i].newPrice}</span>
                                <span class="old__price">$${sale[i].oldPrice}</span>
                            </div>
                        </div>
                        <div class="row justify-content-center align-items-center product__buttons">
                            <div class="productIcon productSearch"><i
                                    class="fa-solid fa-magnifying-glass"></i></div>
                            <div class="productIcon productShop" onclick="addCart1(${i})"><i
                                    class="fa-solid fa-cart-shopping"></i></div>
                            <div class="productIcon productCompare"><i
                                    class="fa-solid fa-shuffle"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        `;
    }
    for (let i = 0; i < nosale.length; i++) {
        product += `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="product mb-50">
                <div class="product__img">
                    <div class="product__cart">
                        <a class="img__Link" href="./shoping.html">
                            <img class="img__1" src="${nosale[i].img1}" alt="">
                            <img class="img__hover" src="${nosale[i].image_url}" alt="">          
                        </a>
                        <div class="productBadge d-flex flex-column">
                            <div class="onsale">Sale</div>
                            <div class="onsale precent">${nosale[i].sale}%</div>
                        </div>
                        <span class="wishlist">
                            <span onclick="addToWish2(${i})" class="wishlistIcon"><i class="fa-regular fa-heart"></i></span>
                            <span class="loadingIcon hide"><i class="fa-solid fa-spinner"></i></span>
                        </span>
                        <div class="productOption">
                            <div class="colorContainer">
                                <ul class="colorList row justify-content-center align-items-center">
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div class="productIcon" id="productCrop1">
                                                <div class="productOption__img colorPlate colorBg1"></div>
                                            </div>    
                                        </div>
                                    </li>
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div class="productIcon" id="productCrop2">
                                                <div class="productOption__img colorPlate colorBg2"></div>
                                            </div>   
                                        </div>     
                                    </li>
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div class="productIcon" id="productCrop3">
                                                <div class="productOption__img colorPlate colorBg3"></div>
                                            </div>   
                                        </div> 
                                    </li>
                                </ul>
                            </div>
                            <div class="sizeContainer">
                                <ul class="sizeList row justify-content-center align-items-center">
                                    <li class="size1">s</li>
                                    <li class="size1">m</li>
                                    <li class="size1">l</li>
                                    <li class="size1">xl</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="productInfo text-center mt-30">
                        <div class="product__price__details">
                            <h6 class="product__tittle mb-11">${nosale[i].title}</h6>
                            <div class="product__price">
                                <span class="new__price mr-12">$${nosale[i].newPrice}</span>
                                <span class="old__price">$${nosale[i].oldPrice}</span>
                            </div>
                        </div>
                        <div class="row justify-content-center align-items-center product__buttons">
                            <div class="productIcon productSearch"><i
                                    class="fa-solid fa-magnifying-glass"></i></div>
                            <div class="productIcon productShop" onclick="addCart2(${i})"><i
                                    class="fa-solid fa-cart-shopping"></i></div>
                            <div class="productIcon productCompare"><i
                                    class="fa-solid fa-shuffle"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> `;
    }
    for (let i = 0; i < noOption.length; i++) {
        product += `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="product mb-50">
                <div class="product__img">
                    <div class="product__cart">
                        <a class="img__Link" href="./shoping.html">
                            <img class="img__1" src="${noOption[i].img1}" alt="">
                            <img class="img__hover" src="${noOption[i].image_url}" alt="">          
                        </a>
                        <span class="wishlist">
                            <span onclick="addToWish3(${i})" class="wishlistIcon"><i class="fa-regular fa-heart"></i></span>
                            <span class="loadingIcon hide"><i class="fa-solid fa-spinner"></i></span>
                        </span>
                    </div>
                    <div class="productInfo text-center mt-30">
                        <div class="product__price__details">
                            <h6 class="product__tittle mb-11">${noOption[i].title}</h6>
                            <div class="product__price">
                                <span class="new__price text-dark mr-12">$${noOption[i].newPrice}</span>
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
    document.getElementById("product").innerHTML = product;
    changeImage();
    wishAction();
}

/*Filteration Start*/

let Decor = document.getElementById("Decor");
let Toys = document.getElementById("Toys");
let Gifts = document.getElementById("Gifts");
let allProducts = document.getElementById("allProducts");

async function getFileData1() {
    const responsetoys = await fetch('./toys.json');
    let toys = await responsetoys.json();
    localStorage.setItem("toys", JSON.stringify(toys))

    const responsedecor = await fetch('./decor.json');
    let decor = await responsedecor.json();
    localStorage.setItem("decor", JSON.stringify(decor))

    const responsegifts = await fetch('./decor.json');
    let gifts = await responsegifts.json();
    localStorage.setItem("gifts", JSON.stringify(gifts))
}
function error1() {
    console.log("Error");
}

(async function () {
    try {
        getFileData1();
    }
    catch {
        error1();
    }
})();

Toys.addEventListener("click", function () {
    let data = JSON.parse(localStorage.getItem("toys"));
    let product = "";
    for (let i = 0; i < data.length; i++) {
        product += `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div id="itemLoading" class="product mb-50">
                <div class="product__img">
                    <div class="product__cart">
                        <a class="img__Link" href="./shoping.html">
                            <img class="img__1" src="${data[i].img1}" alt="">
                            <img class="img__hover" src="${data[i].image_url}" alt="">          
                        </a>
                        <div class="productBadge d-flex flex-column">
                            <div class="onsale">Sale</div>
                            <div class="onsale precent">${data[i].sale}%</div>
                        </div>
                        <span class="wishlist">
                            <span onclick="addToWish1(${i})" class="wishlistIcon"><i class="fa-regular fa-heart"></i></span>
                            <span class="loadingIcon hide"><i class="fa-solid fa-spinner"></i></span>
                        </span>
                        <div class="productOption">
                            <div class="colorContainer">
                                <ul class="colorList row justify-content-center align-items-center">
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div data-src="${data[i].cart1}" data-id="${data[i].id}" class="productIcon product__view" id="productCrop1">
                                                <img class="productOption__img" src="${data[i].optionImg1}" alt="">
                                            </div>
                                        </div>
                                    </li>
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div data-src="${data[i].cart2}" data-id="${data[i].id}" class="productIcon product__view" id="productCrop2">
                                                <img class="productOption__img" src="${data[i].optionImg2}" alt="">
                                            </div>
                                        </div>
                                    </li>
                                    <li class="img__variant">
                                        <div class="img__click">
                                            <div data-src="${data[i].cart3}" data-id="${data[i].id}" class="productIcon product__view" id="productCrop3">
                                                <img class="productOption__img" src="${data[i].optionImg3}" alt="">
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="sizeContainer">
                                <ul class="sizeList row justify-content-center align-items-center">
                                    <li class="size1">s</li>
                                    <li class="size1">m</li>
                                    <li class="size1">l</li>
                                    <li class="size1">xl</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="productInfo text-center mt-30">
                        <div class="product__price__details">
                            <h6 class="product__tittle mb-11">${data[i].title}</h6>
                            <div class="product__price">
                                <span class="new__price mr-12">$${data[i].newPrice}</span>
                                <span class="old__price">$${data[i].oldPrice}</span>
                            </div>
                        </div>
                        <div class="row justify-content-center align-items-center product__buttons">
                            <div class="productIcon productSearch"><i
                                    class="fa-solid fa-magnifying-glass"></i></div>
                            <div class="productIcon productShop" onclick="addCart1(${i})"><i
                                    class="fa-solid fa-cart-shopping"></i></div>
                            <div class="productIcon productCompare"><i
                                    class="fa-solid fa-shuffle"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    `;
    }
    document.getElementById("product").innerHTML = product;
    changeImage();
    wishAction();
})

Decor.addEventListener("click", function () {
    let data = JSON.parse(localStorage.getItem("decor"));
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
                    <div class="productBadge d-flex flex-column">
                        <div class="onsale">Sale</div>
                        <div class="onsale precent">${data[i].sale}%</div>
                    </div>
                    <span class="wishlist">
                        <span onclick="addToWish2(${i})" class="wishlistIcon"><i class="fa-regular fa-heart"></i></span>
                        <span class="loadingIcon hide"><i class="fa-solid fa-spinner"></i></span>
                    </span>
                    <div class="productOption">
                        <div class="colorContainer">
                            <ul class="colorList row justify-content-center align-items-center">
                                <li class="img__variant">
                                    <div class="img__click">
                                        <div class="productIcon" id="productCrop1">
                                            <div class="productOption__img colorPlate colorBg1"></div>
                                        </div>    
                                    </div>
                                </li>
                                <li class="img__variant">
                                    <div class="img__click">
                                        <div class="productIcon" id="productCrop2">
                                            <div class="productOption__img colorPlate colorBg2"></div>
                                        </div>   
                                    </div>     
                                </li>
                                <li class="img__variant">
                                    <div class="img__click">
                                        <div class="productIcon" id="productCrop3">
                                            <div class="productOption__img colorPlate colorBg3"></div>
                                        </div>   
                                    </div> 
                                </li>
                            </ul>
                        </div>
                        <div class="sizeContainer">
                            <ul class="sizeList row justify-content-center align-items-center">
                                <li class="size1">s</li>
                                <li class="size1">m</li>
                                <li class="size1">l</li>
                                <li class="size1">xl</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="productInfo text-center mt-30">
                    <div class="product__price__details">
                        <h6 class="product__tittle mb-11">${data[i].title}</h6>
                        <div class="product__price">
                            <span class="new__price mr-12">$${data[i].newPrice}</span>
                            <span class="old__price">$${data[i].oldPrice}</span>
                        </div>
                    </div>
                    <div class="row justify-content-center align-items-center product__buttons">
                        <div class="productIcon productSearch"><i
                                class="fa-solid fa-magnifying-glass"></i></div>
                        <div class="productIcon productShop" onclick="addCart2(${i})"><i
                                class="fa-solid fa-cart-shopping"></i></div>
                        <div class="productIcon productCompare"><i
                                class="fa-solid fa-shuffle"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div> `;
    }
    document.getElementById("product").innerHTML = product;
    changeImage();
    wishAction();
})

Gifts.addEventListener("click", function () {
    let data = JSON.parse(localStorage.getItem("decor"));
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
    document.getElementById("product").innerHTML = product;
    changeImage();
    wishAction();
})

allProducts.addEventListener("click", function () {
    getFileData();
})
/*Filteration End*/

/*Wish List Icon Adding & Loading Start*/
function wishAction() {
    document.addEventListener("click", function (everyInfo) {
        // console.log("Path: ",everyInfo.path);
        // console.log("Parent Class of Icon: ",everyInfo.path[2]);
        let span = everyInfo.path[2].getElementsByTagName("span");
        // console.log("Collection of Span: ",span);
        // console.log("Class of Span of Loading Icon: ",span[1].classList);
        span[0].style.display = "none";
        span[1].classList.replace('hide', 'show');
        setTimeout(function () {
            span[0].style.display = "inline-block";
            span[1].classList.replace('show', 'hide');
        }, 1000);
    })
}
/*Wish List Icon Adding & Loading End*/

/*Add To WishList Page Start*/
function addToWish1(index) {
    let wishProduct = wishItem1[index];
    check(wishProduct);
}
function addToWish2(index) {
    let wishProduct = wishItem2[index];
    check(wishProduct);
}
function addToWish3(index) {
    let wishProduct = wishItem3[index];
    check(wishProduct);
}
function check(wishProduct) {
    const isFound = wishCart.find((product) => product.id === wishProduct.id)
    // console.log(isFound);
    wishCart.push(wishProduct);
    if (isFound) {
        wishCart.pop();
    }
    else {
        localStorage.setItem('wishCart', JSON.stringify(wishCart));
    }
}
/*Add To WishList Page End*/

/* Change Images With Click Start */
function changeImage() {
    let productIcon = Array.from(document.querySelectorAll(".product__view"));
    let productImg1 = Array.from(document.querySelectorAll(".img__1"));
    let productImg2 = Array.from(document.querySelectorAll(".img__hover"));
    productIcon.forEach(element => {
        element.addEventListener("click", function () {
            // console.log(element.dataset.id)
            let index = element.dataset.id;
            productImg1[index].src = element.dataset.src;
            productImg2[index].src = element.dataset.src;
        })
    });
}
/* Change Images With Click End */


/*Add To Cart Start*/
function addCart1(index) {
    let cartProduct = wishItem1[index];
    checkCart(cartProduct);
    checkCartLength();
}
function addCart2(index) {
    let cartProduct = wishItem2[index];
    checkCart(cartProduct);
    checkCartLength();
}
function addCart3(index) {
    let cartProduct = wishItem3[index];
    checkCart(cartProduct);
    checkCartLength();
}

checkCartLength()
function checkCartLength() {
    cart.length > 0 ? document.getElementById("cartLenght").style.display = "block" : document.getElementById("cartLenght").style.display = "none"
}
function checkCart(products) {
    let choosenProduct = products;
    let isfind = cart.find((product) => product.id === choosenProduct.id)
    if (isfind) {
        isfind.count += 1;
    }
    else {
        cart.push(choosenProduct);
    }
    cartCount.textContent = cart.length

    localStorage.setItem('shopCart', JSON.stringify(cart))
}
/*Add To Cart End*/

/*Back To Top Button Action Start */
let backTop = document.getElementById("backTop");
let headerScrolling = document.getElementById("headerScrolling");
let headerTools = document.getElementById("headerTools");
let mobileSrolling = document.getElementById("mobileSrolling");
/* On Scrolling */

/* On Click */
backTop.addEventListener("click", function () {
    window.scroll({
        top: 0,
        behavior: "smooth",
    }
    )
})
/*Back To Top Button Action End */

/*JQuery Codes Start*/
/*Loading Start */
$(document).ready(function () {
    $(".loading").fadeOut(1000, function () {
        $("body").css("overflow-y", "auto");
        /*window Scrolling Start*/
        window.onscroll = function () {
            if (scrollY >= 300) {
                backTop.style.display = "block";
                headerScrolling.classList.add("headerScroll");
                mobileSrolling.classList.add("headerScroll");
                mobileSrolling.style.top = "-90px"
            }
            else {
                backTop.style.display = "none";
                headerScrolling.classList.remove("headerScroll");
                mobileSrolling.classList.remove("headerScroll")
            }
        }
        /*window Scrolling End*/
    });
})
/*Loading End */

/*Home Page Slider Start*/
$('#homeSlider').owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    animateOut: 'fadeOut',
    navText: [`<i class="fa-solid fa-chevron-left"></i>`, `<i class="fa-solid fa-chevron-right"></i>`]
})
/*Home Page Slider End*/

/*Categories Banner Start */
$('#categoriesBanner').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    navText: [`<i class="fa-solid fa-chevron-left"></i>`, `<i class="fa-solid fa-chevron-right"></i>`],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})
/*Categories Banner End */
/*JQuery Codes Ends*/