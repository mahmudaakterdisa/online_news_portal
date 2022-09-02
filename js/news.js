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
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
    //start load spinner
    loadSpinner();

}



//loading spinner
const loadSpinner = () => {
    const loadSpiner = document.getElementById("load-spinner");
    loadSpiner.innerHTML = `
<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
`
}

loadData();