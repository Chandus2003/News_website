const API="87102d6e7e03409cb5b16f64a585fe08";
const url="https://newsapi.org/v2/everything?q=";

const cardContainer= document.getElementById('Cards_container');
const newsTemp =document.getElementById('template_card')

window.addEventListener("load", () => fetchnews("India"));

async function fetchnews(query)
{
   const res = await fetch(`${url}${query}&apiKey=${API}`);
   const data = await res.json();
   console.log(data);
   bindData(data.articles);
}

function bindData(articles)
{
    cardContainer.innerHTML='';
    articles.forEach(article => {
        if (!article.urlToImage)
         {
            return;
        }
        const cardClone =newsTemp.content.cloneNode(true);
        
        fillDataInCard(cardClone,article); 
        cardContainer.appendChild(cardClone)

    });

 
}


function fillDataInCard(cardClone,article)
{
    const newsImg = cardClone.querySelector('.news_image');
    const newsTItle = cardClone.querySelector('.news_title');
    const newsSrc = cardClone.querySelector('.news_src');
    const newsDisc = cardClone.querySelector('.new_disc');

    
    const date = new Date(article.publishedAt).toLocaleString("en-us",  {
          timeZone: "Asia/jakarta"  })



    newsSrc.innerHTML =  `${article.source.name} ${date}`; 
    newsTItle.innerHTML = article.title;
    newsDisc.innerHTML =  article.description

    newsImg.src = article.urlToImage;
    cardClone.firstElementChild.addEventListener('click', ()=>
    {
        window.open(article.url, "_black")

    })
}

let current_selected_nav = null;

function onNavItem(id)
{
    fetchnews(id);
   
    const navItem = document.getElementById(id);

    current_selected_nav?.classList.remove("active");
    current_selected_nav = navItem;
    current_selected_nav.classList.add("active");

} 
const input = document.getElementById('News_input');
const searchBtn = document.getElementById('search_btn');

searchBtn.addEventListener('click', ()=>
    {
        const query = input.value;
        if (!query) 
        return;
    fetchnews(query);
    current_selected_nav?.classList.remove("active");
    current_selected_nav = null;


    })
