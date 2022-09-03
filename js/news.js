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

    const newsDetails = document.getElementById("news-details");
    newsDetails.innerText = " ";
    data.forEach(details => {
        // console.log(details);
        const div = document.createElement("div");

        div.innerHTML = `
        <div class="card my-5 mx-auto" style="max-width: 900px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${details.image_url}" class="img-thumbnail rounded-start my-auto" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${details.title}</h5>
                            <p class="card-text text-truncate">${details.details}</p>
                           
                                <div class="d-sm-flex d-md-flex justify-content-between ">
                                    <div>
                                        <div ><img src="${details.author ? details.author.img : "Author not found"}" class="author-img rounded" alt="..."></div>
                                        <div>
                                            <h5 class="p-sm-2 p-md-2">Author Name:${details.author ? details.author.name : "Author not found"}</h5>
                                        </div>
                                        
                                        
                                    </div>
                                
                                    <button class="btn btn-primary p-2 h-25 mt-4" type="submit" onclick="showModal('${details._id}')"    data-bs-toggle="modal" data-bs-target="#exampleModal">show More</button>
                                </div>
                               
                           
                            
                        </div>
                    </div>
                </div>
            </div>
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

    console.log(data);
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

loadData();