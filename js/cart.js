let cartData = JSON.parse(localStorage.getItem('shopCart')) || []
console.log("cartData" ,cartData);
let tBody = document.querySelector('.tBody')

cartCheck();
function cartCheck(){
    if(cartData.length > 0){
        document.getElementById("fullCart").style.display="block";
        document.getElementById("emptyCart").style.display="none";
    }
    else {
        document.getElementById("fullCart").style.display="none";
        document.getElementById("emptyCart").style.display="block";
    }
}

cartDisplay();
function cartDisplay() {
    let table = ""
    for (let i = 0; i < cartData.length; i++) {
        table += `
            <tr>
                <th class="imgProduct dataRow">
                    <img src="${cartData[i].img1}" alt="">
                </th>
                <td class="tittleProduct dataRow">${cartData[i].title}</td>
                <td class="priceProduct dataRow">$${cartData[i].newPrice}</td>
                <td class="quanityProduct dataRow">
                    <div class="productNum">
                        <span onclick="plus(${i})" class="plus">(<i class="fa-solid fa-plus"></i>)</span>
                        <span class="number">${cartData[i].count}</span>
                        <span onclick="minus(${i})" class="minus">(<i class="fa-solid fa-minus"></i>)</span>
                    </div>
                </td>
                <td class="totalPriceProduct dataRow">$${totalPrice(cartData[i].newPrice, cartData[i].count)}</td>
                <td onclick="deleteAll(${i})" class="removePrice dataRow"><i class="fa-solid fa-xmark"></i></td>
            </tr>
        `;
    }
    console.log(table);

    tBody.innerHTML = table;
    subTotal();
}

function totalPrice(price, count) {
    return price * count;
}

function plus(i) {
    choosenProduct = cartData[i];
    let plusNum = 0;
    const findProduct = cartData.find((product) => product.id === choosenProduct.id);
    findProduct.count++;
    plusNum = findProduct.count;
    localStorage.setItem('shopCart', JSON.stringify(cartData))
    document.getElementsByClassName("number")[i].innerHTML = plusNum;
    document.getElementsByClassName("totalPriceProduct")[i].innerHTML = "$" + totalPrice(findProduct.newPrice, findProduct.count);
    subTotal();
}

function minus(i) {
    let minusNum = 0;
    choosenProduct = cartData[i];
    const findProduct = cartData.find((product) => product.id === choosenProduct.id);
    if (findProduct.count > 1) {
        findProduct.count--;
        minusNum = findProduct.count;
        document.getElementsByClassName("number")[i].innerHTML = minusNum;
        document.getElementsByClassName("totalPriceProduct")[i].innerHTML = "$" + totalPrice(findProduct.newPrice, minusNum);
    }
    else {
        deleteAll(i);
    }
    localStorage.setItem('shopCart', JSON.stringify(cartData))
    subTotal();
}

function deleteAll(i) {
    choosenProduct = cartData[i];
    const findProduct = cartData.find((product) => product.id === choosenProduct.id);
    cartData.splice(i, 1);
    localStorage.setItem('shopCart', JSON.stringify(cartData));
    cartDisplay();
    cartCheck();
}

document.getElementById("clearCart").addEventListener("click",function(){
    localStorage.removeItem('shopCart');
    cartData=[]
    cartDisplay();
    cartCheck();
})

function subTotal(){
    let sum = 0 ;
    for(let i = 0 ; i <cartData.length ; i++){
        console.log(totalPrice(cartData[i].newPrice,cartData[i].count))
        sum=totalPrice(cartData[i].newPrice,cartData[i].count)+sum;
    }
    document.getElementById("subTotalPrice").innerHTML= "$" + sum;
}
