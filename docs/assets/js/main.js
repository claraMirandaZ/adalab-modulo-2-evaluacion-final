"use strict";const cocktailList=document.querySelector(".js-cocktailList"),favoritesList=document.querySelector(".js-favoritesList"),inputSearch=document.querySelector(".js-search"),defaultImage="https://via.placeholder.com/150x150/ffffff/666666/?text=drink",btnSubmit=document.querySelector(".js-submitBtn"),btnReset=document.querySelector(".js-resetBtn"),btnDislikeAll=document.querySelector(".js-dislikeAll");let drinks=[],favoriteCocktails=[];function getFavLocalStorage(){const t=localStorage.getItem("favoriteCocktails");null!==t&&(favoriteCocktails=JSON.parse(t),renderFavoriteCocktails())}function generateDefaultImage(t){let e="";return e=null!==t.strDrinkThumb?t.strDrinkThumb:defaultImage,e}function handleInputSearch(t){t.preventDefault();const e=inputSearch.value;fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+e).then(t=>t.json()).then(t=>{drinks=t.drinks,""===inputSearch.value?cocktailList.innerHTML="...¡Hey! ¡Busca una bebida primero!":renderCocktailList()})}function renderCocktailList(){let t="";for(const e of drinks){let i="",a="",c=generateDefaultImage(e);-1!==favoriteCocktails.findIndex(t=>t.idDrink===e.idDrink)?(i="favCocktail",a="favCocktailName"):(i="",a=""),t+=`<li class="cocktailList__item ${i} js-cocktail" id="${e.idDrink}">`,t+=`<img alt="Cóctel" class="cocktailImg" src="${c}" />`,t+=`<h3 class="favoritesList__name ${a}">${e.strDrink}</h3>`,t+="</li>",cocktailList.innerHTML=t}cocktailListener()}function handleClickCocktail(t){const e=t.currentTarget.id,i=drinks.find(t=>t.idDrink===e),a=favoriteCocktails.findIndex(t=>t.idDrink===e);-1===a?favoriteCocktails.push(i):favoriteCocktails.splice(a,1),localStorage.setItem("favoriteCocktails",JSON.stringify(favoriteCocktails)),renderCocktailList(),renderFavoriteCocktails()}function cocktailListener(){const t=document.querySelectorAll(".js-cocktail");for(const e of t)e.addEventListener("click",handleClickCocktail)}function handleClickReset(t){t.preventDefault(),inputSearch.value="",favoriteCocktails=[],cocktailList.innerHTML="",favoritesList.innerHTML="",localStorage.clear("favoriteCocktails")}function renderFavoriteCocktails(){let t="";for(const e of favoriteCocktails){t+='<li class="favoritesList__item">',t+=`<img alt="Cóctel" class="cocktailImg" src="${generateDefaultImage(e)}" />`,t+=`<h3 class="favoritesList__name">${e.strDrink}</h3>`,t+=`<i class="favoritesList__icon js-unfav fa-solid fa-heart-circle-xmark" id="${e.idDrink}"></i>`,t+="</li>"}favoritesList.innerHTML=t,dislikedListener()}function handleClickDislike(t){const e=t.currentTarget.id,i=favoriteCocktails.findIndex(t=>t.idDrink===e);-1!==i&&favoriteCocktails.splice(i,1),localStorage.setItem("favoriteCocktails",JSON.stringify(favoriteCocktails)),renderCocktailList(),renderFavoriteCocktails()}function dislikedListener(){const t=document.querySelectorAll(".js-unfav");for(const e of t)e.addEventListener("click",handleClickDislike)}function handleDislikeAllFavs(t){t.preventDefault(),favoriteCocktails=[],favoritesList.innerHTML="",localStorage.removeItem("favoriteCocktails"),renderCocktailList()}getFavLocalStorage(),btnSubmit.addEventListener("click",handleInputSearch),btnReset.addEventListener("click",handleClickReset),btnDislikeAll.addEventListener("click",handleDislikeAllFavs);