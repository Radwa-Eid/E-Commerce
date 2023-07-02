let blogDetails=[]
let blogDetailsCart = JSON.parse(localStorage.getItem('blogDetailsCart')) || []

/*Api File Fetch Start*/
async function getFileData() {
    const response = await fetch('./blog.json');
    // console.log(response);
    let data = await response.json();
    // console.log("data", data);
    blogDetails=data;
    displayBlog(data);
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

/*Display  Blog Data Start*/
function displayBlog(data){
    let blogCarts=""
    for(let i = 0 ; i < data.length ; i++){
        blogCarts += `
            <div class="singleBlog mb-30">
                <div class="singleBlog__img mb-30 blogPage__Img">
                    <img src=${data[i].img__blog} alt="">
                </div>
                <div class="singleBlog__content mb-20">
                    <h2 class="singleBlog__Heading">${data[i].tittle}</h2>
                    <ul class="d-flex mb-11 singleBlog__List">
                        <li><i class="fa-regular fa-user"></i>${data[i].writtenBy}</li>
                        <li>
                            <i class="fa-regular fa-calendar"></i>
                            <a href="#">${data[i].date}</a>
                        </li>
                        <li>
                            <i class="fa-solid fa-comment"></i>
                            <a href="#">${data[i].comments}</a>
                        </li>
                    </ul>
                    <div class="mb-20">
                        <p>${data[i].description}</p>
                    </div>
                    <a onclick="blogList(${i})" class="blogDetails__link" href="./blogDetails.html">Read More</a>
                </div>
            </div>
        `;
    }
    document.getElementById("blogPage").innerHTML=blogCarts;
}
/*Display  Blog Data End*/

/*Moving To Blog Details List*/
function blogList(id){
    console.log(blogDetails[id]);
    localStorage.setItem('blogDetailsCart', JSON.stringify(blogDetails[id]))
}