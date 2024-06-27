/// <reference types="../@types/jquery" />



let rowData = document.querySelector('#rowData');
let categories = document.querySelector('#categories');
let area = document.querySelector('#area');
let ingredients = document.querySelector('#ingredients');
let search = document.querySelector('#search');
let searchTab = document.querySelector('#searchTab');
let contact_us = document.querySelector('#contact_us');
let SubmitButton;


$(document).ready(function () {

    SearchByName('').then(() => {
        $('.loading_Screan').fadeOut(800, function () {
            $('body').css({ overflow: 'auto' })
        });

    })
})

//  ====================================navbar==================================== 

function OpenNavbar() {

    $('.Nav1 , .Nav2').animate({ left: `0px` }, 600);
    $('.open').css({ display: 'none' });
    $('.close').css({ display: 'block' });

    for (let i = 0; i < 5; i++) {
        $('.nav-link ul li').eq(i).animate({ top: 0 }, (i + 9) * 100);
    }
}

function CloseNavbar() {

    let Nav1Width = $('.Nav1').outerWidth();
    console.log(Nav1Width);

    $('.Nav1 , .Nav2').animate({ left: `-${Nav1Width}` }, 600);
    $('.open').css({ display: 'block' });
    $('.close').css({ display: 'none' });

    for (let i = 4; i >= 0; i--) {
        $('.nav-link ul li').eq(i).animate({ top: 300 }, (i - 9) * -100);
    }
}


CloseNavbar();
$('.open , .close').on('click', function () {

    let LeftValue = $('.Nav1 , .Nav2').css('left');
    console.log(LeftValue);

    if (LeftValue == '0px') {

        CloseNavbar();
    }
    else {
        OpenNavbar();
    }
})

//  ====================================meals==================================== 

// SearchByName('');

function DisplayMeals(DataArray) {

    let meal = "";

    for (let i = 0; i < DataArray.length; i++) {

        meal += ` <div class="col-md-3">
        <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer" onclick="Meals_Detiles(${DataArray[i].idMeal})">
            <img class="w-100" src="${DataArray[i].strMealThumb}" alt=""
                srcset="">
            <div class="meal_layer position-absolute d-flex align-items-center py-5">
                <h3 class="ps-2 text-black">${DataArray[i].strMeal}</h3>
            </div>
        </div>
        </div>`
    }

    rowData.innerHTML = meal;
}

//  ====================================Categories==================================== 

async function getCategories() {
    rowData.innerHTML = '';
    $('.inner_loading_Screan').fadeIn(300);

    searchTab.innerHTML = "";

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

    let dataCateg = await response.json();
    let DataArray = dataCateg.categories;

    console.log(DataArray);

    DisplayCategories(DataArray);
    CloseNavbar();
    $('.inner_loading_Screan').fadeOut(300);

}

function DisplayCategories(DataArray) {

    let Categ = "";

    for (let i = 0; i < DataArray.length; i++) {

        Categ += `<div class="col-md-3">
        <div class="meal position-relative overflow-hidden  rounded-2 cursor-pointer" onclick="getCategories_Meals('${DataArray[i].strCategory}')">
            <img class="w-100" src="${DataArray[i].strCategoryThumb}" alt="" srcset="">
            <div class="meal_layer position-absolute text-center">
                <h3 class="ps-2 pt-2 text-black">${DataArray[i].strCategory}</h3>
                <p class="text-black p-2 pt-0">${DataArray[i].strCategoryDescription.slice(0, 125)}</p>
            </div>
        </div>
    </div>`
    }
    rowData.innerHTML = Categ;
}

categories.addEventListener('click', getCategories);

//  ====================================Area==================================== 

async function GetArea() {
    rowData.innerHTML = '';
    $('.inner_loading_Screan').fadeIn(300);

    searchTab.innerHTML = "";

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

    let dataArea = await response.json();
    let DataArray = dataArea.meals;

    console.log(DataArray);

    DisplayArea(DataArray);
    CloseNavbar();

    $('.inner_loading_Screan').fadeOut(300);

}

function DisplayArea(DataArray) {

    let area = "";

    for (let i = 0; i < DataArray.length; i++) {

        area += ` <div class="col-md-3">
        <div class="meal text-center cursor-pointer"  onclick="getArea_Meals('${DataArray[i].strArea}')">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${DataArray[i].strArea}</h3>
        </div>
        </div> `
    }
    rowData.innerHTML = area
}

area.addEventListener('click', GetArea);

//  ====================================Ingredients==================================== 

async function getIngredients() {
    rowData.innerHTML = '';
    $('.inner_loading_Screan').fadeIn(300);

    searchTab.innerHTML = "";

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    let dataIngred = await response.json();
    let DataArray = dataIngred.meals;

    console.log(DataArray);

    DisplayIngred(DataArray.slice(0, 20));
    CloseNavbar();

    $('.inner_loading_Screan').fadeOut(300);

}


function DisplayIngred(DataArray) {

    let Ingred = "";

    for (let i = 0; i < DataArray.length; i++) {

        Ingred += ` <div class="col-md-3">
        <div class="meal text-center cursor-pointer" onclick="getIngredients_Meals('${DataArray[i].strIngredient}')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i> 
            <h3>${DataArray[i].strIngredient}</h3>
            <p class="PIngred">${DataArray[i].strDescription.slice(0, 120)}</p>
        </div>
        </div> `
    }
    rowData.innerHTML = Ingred;
}

ingredients.addEventListener('click', getIngredients);

//////////////////////////////////////Categories Meals//////////////////////////////////////

async function getCategories_Meals(Category) {
    rowData.innerHTML = '';
    $('.inner_loading_Screan').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);

    let data_Categories_Meals = await response.json();
    let DataArray = data_Categories_Meals.meals.slice(0, 20);

    console.log(DataArray);

    DisplayMeals(DataArray);
    CloseNavbar();

    $('.inner_loading_Screan').fadeOut(300);

}

//////////////////////////////////////Area Meals//////////////////////////////////////

async function getArea_Meals(area) {
    rowData.innerHTML = '';
    $('.inner_loading_Screan').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);

    let data_Area_Meals = await response.json();
    let DataArray = data_Area_Meals.meals.slice(0, 20);

    console.log(DataArray);

    DisplayMeals(DataArray);
    CloseNavbar();

    $('.inner_loading_Screan').fadeOut(300);

}

//////////////////////////////////////Ingredients Meals//////////////////////////////////////

async function getIngredients_Meals(ingredients) {
    rowData.innerHTML = '';
    $('.inner_loading_Screan').fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);

    let data_Ingredients_Meals = await response.json();
    let DataArray = data_Ingredients_Meals.meals.slice(0, 20);

    console.log(DataArray);

    DisplayMeals(DataArray);
    CloseNavbar();

    $('.inner_loading_Screan').fadeOut(300);
}

// ********************************************Meals Detiles**********************************************

async function Meals_Detiles(id) {
    rowData.innerHTML = '';
    $('.inner_loading_Screan').fadeIn(300);

    searchTab.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    let Mdata = await response.json();
    let MealDet = Mdata.meals[0];

    console.log(MealDet);

    DisplayMeals_Detiles(MealDet);
    CloseNavbar();

    $('.inner_loading_Screan').fadeOut(300);
}


function DisplayMeals_Detiles(MealDet) {

    let Ingredient = '';

    for (let i = 0; i <= 20; i++) {

        if (MealDet[`strIngredient${i}`]) {

            Ingredient += `<li class="alert alert-info m-2 p-1">${MealDet[`strMeasure${i}`]} ${MealDet[`strIngredient${i}`]}</li>`
        }
    }
    console.log(Ingredient);

    // ---------------------------------------

    let tags = MealDet.strTags?.split(",");
    if (!tags) tags = [];
    let tagsStr = '';

    for (let i = 0; i <= tags.length; i++) {

        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags}</li>`
    }

    console.log(tagsStr);

    // ----------------------------------------

    let mealDet_All = ` <div class="col-md-4">
    <div>
        <img class="w-100 rounded-3" src="${MealDet.strMealThumb}"
            alt="">
        <h2>${MealDet.strMeal}</h2>
    </div>
</div>
<div class="col-md-8">
    <div>
        <h2>Instructions</h2>
        <p>${MealDet.strInstructions}</p>
        <h3><span class="fw-bolder">Area :</span> ${MealDet.strCategory}</h3>
        <h3><span class="fw-bolder">Category :</span> ${MealDet.strArea}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${Ingredient}          
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}          
        </ul>
        <div class="my-4">
        <a href="${MealDet.strSource}" target="_blank"><button class="btn btn-success">Source</button></a>
        <a href="${MealDet.strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
        </div>
    </div>
</div>`

    rowData.innerHTML = mealDet_All;
}

// =========================================Show Search input=============================================

function ShowSearch_input() {

    searchTab.innerHTML = `<div class="row py-4" >
<div class="col-md-6">
    <div class="py-2">
        <input type="text" class="form-control bg-transparent" placeholder="Search by Name" id="Search" onkeyup="SearchByName(this.value)">
    </div>
</div>
<div class="col-md-6">
    <div  class="py-2">
        <input type="text" class="form-control bg-transparent" placeholder="Search by First Letter" id="Search" maxlength="1" onkeyup=" SearchBy_Fristlitter(this.value)">
    </div>
</div>
</div>`

    rowData.innerHTML = '';
    CloseNavbar();
}

search.addEventListener('click', ShowSearch_input);

// ==============================================Search By Name================================================

async function SearchByName(name) {

    $('.inner_loading_Screan').fadeIn(300);

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

    let data = await resp.json();
    DataArray = data.meals;

    console.log(DataArray);

    DataArray ? DisplayMeals(DataArray) : DisplayMeals([]);

    CloseNavbar();
    $('.inner_loading_Screan').fadeOut(300);
}

// ===========================================Search By Frist litter=========================================

async function SearchBy_Fristlitter(litter) {

    $('.inner_loading_Screan').fadeIn(300);

    litter ? litter : litter = "a";

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`);

    let data = await resp.json();
    DataArray = data.meals;

    console.log(DataArray);

    DataArray ? DisplayMeals(DataArray) : DisplayMeals([]);

    CloseNavbar();

    $('.inner_loading_Screan').fadeOut(300);

}

// ===========================================Contact Us=========================================

function ContactAll_Us() {

    rowData.innerHTML = ` <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <div>
                    <input type="text" class="form-control" placeholder="Enter Your Name" id="nameInput" onkeyup="InputsValidation()">
                    <div class="alert alert-danger w-100 mt-2 d-none" id="namealert">
                        Special characters and numbers not allowed
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="email" class="form-control" placeholder="Enter Your Email" id="emailInput" onkeyup="InputsValidation()">
                    <div class="alert alert-danger w-100 mt-2 d-none" id="emailalert">
                        Email not valid *exemple12@yyyy.zzz
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="number" class="form-control" placeholder="Enter Your Phone" id="PhoneInput" onkeyup="InputsValidation()">
                    <div class="alert alert-danger w-100 mt-2 d-none" id="Phonealert">
                        Enter valid Phone Number
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="number" class="form-control" placeholder="Enter Your Age" id="AgeInput" onkeyup="InputsValidation()">
                    <div class="alert alert-danger w-100 mt-2 d-none" id="Agealert">
                        Enter valid age
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="password" class="form-control" placeholder="Enter Your Password" id="passwordInput" onkeyup="InputsValidation()">
                    <div class="alert alert-danger w-100 mt-2 d-none" id="Passwordalert">
                        Enter valid password * Enter Five numbers
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <input type="password" class="form-control" placeholder="Enter Your Repassword" id="RepasswordInput" onkeyup="InputsValidation()">
                    <div class="alert alert-danger w-100 mt-2 d-none" id="Repasswordalert">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
        </div>
        <button disabled class="btn btn-outline-danger mt-4 px-4" id="SubmitButton">Submit</button>
    </div>
</div>`
    searchTab.innerHTML = "";
    CloseNavbar();
    SubmitButton = document.querySelector('#SubmitButton');


    document.getElementById('nameInput').addEventListener('focus', function () {
        nameInputTouched = true;
    })
    document.getElementById('emailInput').addEventListener('focus', function () {
        emailInputTouched = true;
    })
    document.getElementById('PhoneInput').addEventListener('focus', function () {
        PhoneInputTouched = true;
    })
    document.getElementById('AgeInput').addEventListener('focus', function () {
        AgeInputTouched = true;
    })
    document.getElementById('passwordInput').addEventListener('focus', function () {
        passwordInputTouched = true;
    })
    document.getElementById('RepasswordInput').addEventListener('focus', function () {
        RepasswordInputTouched = true;
    })

}

contact_us.addEventListener('click', ContactAll_Us);

// ---------------------------------------------------------------------------------------------------------------------------

let nameInputTouched = false;
let emailInputTouched = false;
let PhoneInputTouched = false;
let AgeInputTouched = false;
let passwordInputTouched = false;
let RepasswordInputTouched = false;


function InputsValidation() {

    if (nameInputTouched) {
        if (name_Validation()) {
            document.getElementById('namealert').classList.replace('d-block', 'd-none');
        }
        else {
            document.getElementById('namealert').classList.replace('d-none', 'd-block');
        }
    }

    if (emailInputTouched) {
        if (email_Validation()) {
            document.getElementById('emailalert').classList.replace('d-block', 'd-none');
        }
        else {
            document.getElementById('emailalert').classList.replace('d-none', 'd-block');
        }
    }

    if (PhoneInputTouched) {
        if (phone_Validation()) {
            document.getElementById('Phonealert').classList.replace('d-block', 'd-none');
        }
        else {
            document.getElementById('Phonealert').classList.replace('d-none', 'd-block');
        }
    }

    if (AgeInputTouched) {
        if (Age_Validation()) {
            document.getElementById('Agealert').classList.replace('d-block', 'd-none');
        }
        else {
            document.getElementById('Agealert').classList.replace('d-none', 'd-block');
        }
    }

    if (passwordInputTouched) {
        if (password_Validation()) {
            document.getElementById('Passwordalert').classList.replace('d-block', 'd-none');
        }
        else {
            document.getElementById('Passwordalert').classList.replace('d-none', 'd-block');
        }
    }

    if (RepasswordInputTouched) {
        if (repassword_Validation()) {
            document.getElementById('Repasswordalert').classList.replace('d-block', 'd-none');
        }
        else {
            document.getElementById('Repasswordalert').classList.replace('d-none', 'd-block');
        }
    }

    //--------------------------------

    if (name_Validation() && email_Validation() && phone_Validation() && Age_Validation() && password_Validation() && repassword_Validation()) {
        SubmitButton.removeAttribute('disabled');
    }
    else {
        SubmitButton.setAttribute('disabled', true);
    }
}

// ---------------------------------------------------------------------------------------------------------------------------

function name_Validation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById('nameInput').value));
}
function email_Validation() {
    return (/^[a-zA-z]+[1-9]+\@[a-z]+\.(com)$/.test(document.getElementById('emailInput').value));
}
function phone_Validation() {
    return (/^(011|010|012|015)[0-9]{8}$/.test(document.getElementById('PhoneInput').value));
}
function Age_Validation() {
    return (/(^[0-9]{1}[0-9]{1}|100)$/.test(document.getElementById('AgeInput').value));
}
function password_Validation() {
    return (/^[A-za-z]+[0-9]{5}$/.test(document.getElementById('passwordInput').value));
}
function repassword_Validation() {
    return document.getElementById('RepasswordInput').value == document.getElementById('passwordInput').value;
}





