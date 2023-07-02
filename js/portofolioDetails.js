let portoCart = JSON.parse(localStorage.getItem('portofolioCart')) || []
portoDetails(portoCart);

function portoDetails(portoCart){
    let porotPage=""
    porotPage=`
    <div class="col-lg-9 col-12 mb-50">
        <div class="singleBlog">
            <div class="singleBlog__img mb-30">
                <img src="${portoCart.portofolio__img}" alt="">
            </div>
            <div class="singleBlog__content mb-50">
                <h2 class="singleBlog__Heading">${portoCart.title}</h2>
                <ul class="d-flex mb-11 singleBlog__List">
                    <li>
                        <i class="fa-regular fa-user"></i>
                        <a href="#"> HasTech Shopify Team</a>
                    </li>
                    <li>
                        <i class="fa-regular fa-calendar"></i>
                        <a href="#"> January 20, 2021</a>
                    </li>
                </ul>
                <div class="mb-20">
                    <p>${portoCart.description1}</p>
                </div>
                <div class="mb-20">
                    <p>${portoCart.description2}</p>
                </div>
                <div class="mb-20">
                    <p>${portoCart.description3}</p>
                </div>
            </div>
            <div class="blogFooter row justify-content-between align-items-center mb-30 pb-25">
                <div class="col-auto">
                    <span><i class="fa-solid fa-tags"></i></span>
                </div>
                <div class="col-auto">
                    <div class="shareBlog d-flex justify-content-between align-items-center">
                        <span>Share this post:</span>
                        <span
                            class="shareBlog__Icon d-flex align-items-center justify-content-center"><i
                                class="fa-solid fa-share-nodes"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementById("portoDetailsCart").innerHTML=porotPage;
    document.getElementById("wishHeading").innerHTML=portoCart.title;
    document.getElementById("listPorto__Item3").innerHTML=portoCart.title;
}