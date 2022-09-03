// steps:fetch the url
const loadData = () => {
    fetch(" https://openapi.programming-hero.com/api/news/categories")
        .then(response => response.json())
        .then(data => displayCatagories(data.data.news_category))
}

const displayCatagories = (data) => {

    const categories = document.getElementById("catagories")
    data.forEach(catagory => {
        // console.log(catagory);

        const div = document.createElement("div")
        div.classList.add("catagories-color")
        //catagories function also add here
        div.innerHTML = `
<h3 onclick="catagoriesDetails('${catagory.category_id}')">${catagory.category_name}</h3>

`;
        categories.appendChild(div);
    });


}

const catagoriesDetails = id => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`

    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.data))
    //start load spinner
    loadSpinner(true);

}

//news details
const displayDetails = data => {

    const checkData = detailsCatagories(data.length);

    const newsDetails = document.getElementById("news-details");
    newsDetails.innerText = " ";
    data.forEach(details => {

        const div = document.createElement("div");

        div.innerHTML = `
        <div class="card my-5 mx-auto" style="max-width: 900px;">
                <div class="row g-0">
                    <div class="col-4 col-sm-4 col-md-4">
                        <img src="${details.image_url}" class="img-thumbnail rounded-start my-auto" alt="..." style:"height:200px;width:200px;">
                    </div>
                    <div class="col-8 col-sm-8 col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${details.title}</h5>
                            <p class="card-text text-truncate">${details.details}</p>
                           
                            
                           
                            
                        </div>

                        <div class="container">
                            <div class="row mx-auto">
                              <div class="col-5 col-sm-6 col-md-6">
                              <img src="${details.author ? details.author.img : "Author not found"}" class="author-img rounded-circle" alt="...">
                                       
                              <span class="p-sm-2 p-md-2">${details.author.name ? details.author.name : 'no-name'}</span>

           
                              </div >
                              <div class="col-3 col-sm-3 col-md-3 mt-sm-2 mt-md-2">
                              <i class="fa-solid fa-eye fs-6 ">${details.total_view ? details.total_view : "no-views"}</i>
                              </div>
                              <div class="col-4 col-sm-3 col-md-3">
                              <button class="btn btn-color p-2 text-dark" type="submit" onclick="showModal('${details._id}')"    data-bs-toggle="modal" data-bs-target="#exampleModal">More</button>
                              </div>
                            </div >
                        </div >




                    </div >
                </div >
                
                               
            </div >
    `;
        newsDetails.appendChild(div);

    });
    //stop spinner
    loadSpinner(false);
}

//show Modal
const showModal = news_id => {

    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

    fetch(url)
        .then(response => response.json())
        .then(data => newsDetails(data.data[0]))
}

const newsDetails = (data) => {


    const moreDetails = document.getElementById("more-details");
    const authorName = document.getElementById("exampleModalLabel");
    // authorName.innerText = data.author.name;
    authorName.innerHTML = `
    <h5>${data.author ? data.author.name : "No data available"}</h5>
    `;
    const totalView = document.getElementById("moda-details");
    totalView.innerHTML = `
    <p>Total view:${data.total_view ? data.total_view : "No data available"}</p>
    `
}







//loading spinner
const loadSpinner = (isspinner) => {
    const loadSpiner = document.getElementById("load-spinner");
    if (isspinner == true) {
        loadSpiner.classList.remove("d-none");
    }
    else {
        loadSpiner.classList.add("d-none");
    }

}
//data not found
const detailsCatagories = data => {

    const noFoundText = document.getElementById("no-found");
    if (data == 0) {
        noFoundText.classList.remove("d-none");
    }
    else {
        noFoundText.classList.add("d-none");
    }
}

loadData();