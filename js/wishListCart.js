let wishListCart = JSON.parse(localStorage.getItem('wishCart')) || []

/* Wish List Page Loading Start */
if (wishListCart.length == 0) {
    document.getElementById("emptyList").style.display = "block";
}
else {
    displayWishList();
}
/* Wish List Page Loading  End*/

/*Dispaly WishList Start*/
function displayWishList(){
    let wishItemCintainer = ""
    for(let i = 0 ; i < wishListCart.length ; i ++){
        wishItemCintainer += `   
            <div class="col-lg-3 col-md-6 col-sm-12 mb-30">
                <div class="wishCart__Item">
                    <a class="wishCart__Img" href="./shoping.html">
                        <img src="${wishListCart[i].img1}" alt="">
                    </a>
                    <div class="wishCart__text text-center">
                        <h4 class="wishCart__heading">${wishListCart[i].title}</h4>
                        <p class="wishCart__price mb-11">
                            <span class="newPrice">${wishListCart[i].newPrice}$</span>
                            <span class="newPrice oldPrice ml-12">${wishListCart[i].oldPrice}$</span>
                        </p>
                        <div onclick="removeItem(${i})" id="removeItem">Remove From Wishlist</div>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("wishCartContainer").innerHTML=wishItemCintainer;
    oldPriceCheck();
}
/*Dispaly WishList End*/

/*Check Old Price Start */

function oldPriceCheck(){
    let removeItem= document.querySelectorAll(".wishCart__price :last-child");
    for(let i = 0 ; i < removeItem.length ; i++){
        // console.log(removeItem[i].textContent)
        if(removeItem[i].textContent=="undefined$"){
            removeItem[i].remove()
        }
    }
}
/*Check Old Price End */

/*Remove From Wishlist Start */
function removeItem(id){
    // console.log(wishListCart[id]);
    
    wishListCart.splice(id,1);
    localStorage.setItem('wishCart',JSON.stringify(wishListCart));
    displayWishList();
    if(wishListCart.length==0){
        document.getElementById("emptyList").style.display = "block";
    }
}
/*Remove From Wishlist End */