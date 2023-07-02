let blogDetailsPage = JSON.parse(localStorage.getItem('blogDetailsCart')) || []

blogDetails(blogDetailsPage);

function blogDetails(blogDetailsPage) {
    let blogdet = ""
    blogdet = `
        <div class="singleBlog__img mb-30 blogPage__Img">
            <img src="${blogDetailsPage.img__blog}" alt="">
        </div>
        <h2 class="singleBlog__Heading">${blogDetailsPage.tittle}</h2>
        <ul class="d-flex mb-11 singleBlog__List">
            <li><i class="fa-regular fa-user"></i>${blogDetailsPage.writtenBy}</li>
            <li>
                <i class="fa-regular fa-calendar"></i>
                <a href="#">${blogDetailsPage.date}</a>
            </li>
            <li>
                <i class="fa-solid fa-comment"></i>
                <a href="#">${blogDetailsPage.comments}</a>
            </li>
        </ul>
        <div class="mb-20">
            <p>${blogDetailsPage.description}</p>
        </div>
        <div class="blogQoutes">
            <p>${blogDetailsPage.blogDetails1}</p>
        </div>
        <div class="mb-20">
            <p>${blogDetailsPage.blogDetails1}</p>
        </div>
        <div class="mb-20">
            <p>${blogDetailsPage.blogDetails1}</p>
        </div>
        <div class="mb-20">
            <p>${blogDetailsPage.blogDetails1}</p>
        </div>
    `;
    document.getElementById("blogDetailsCarts").innerHTML=blogdet;
    document.getElementById("blogHeading").innerHTML=blogDetailsPage.tittle;
    document.getElementById("listBlog__Item3").innerHTML = blogDetailsPage.tittle;
}