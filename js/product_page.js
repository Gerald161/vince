var slider = document.querySelector('.slider');
var next = document.querySelector('.next');
var prev = document.querySelector('.prev');
const images = document.querySelector('.images');
var counter = 0;

const sliders = Array.from(slider.querySelectorAll('.img'));
let lastSlider = sliders[sliders.length - 1];

sliders.forEach(slide => {
    slide.dataset.left = "-50";
});

sliders[0].dataset.left = "0";

var stuff = [];

for(var i = 0; i < sliders.length; i++){
    stuff.push(sliders[i].dataset.left)
}

var c = stuff.join('+');

var final = eval(c);

var arrow_counter_value = 50;

next.addEventListener('click', ()=>{
    slider.style.transition = 'all 0.7s';

    if(counter == final){
        slider.animate([{opacity:'0.2'},{opacity:"1.0"}],{duration:500,fill:'forwards'});

        counter = arrow_counter_value;

        slider.style.transition = 'all 0s';
    }
    counter -= arrow_counter_value;

    slider.style.left = counter + 'vw';

    setSliderActiveTab(counter);
})

prev.addEventListener('click', ()=>{
    slider.style.transition = 'all 0.7s';

    if(counter == 0){
        slider.animate([{opacity:'0.2'},{opacity:"1.0"}],{duration:500,fill:'forwards'});

        counter = final - arrow_counter_value;

        slider.style.transition = 'all 0s';
    }

    counter += arrow_counter_value;

    slider.style.left = counter + 'vw';

    setSliderActiveTab(counter);
})

var additional_images = document.querySelectorAll(".additional_image");

additional_images.forEach((additional_image)=>{
    additional_image.addEventListener("click", (e)=>{
        slider.style.transition = 'all 0.7s';

        slider.style.left = `-${e.target.parentElement.dataset.left}vw`;

        counter = parseInt(-`${e.target.parentElement.dataset.left}`);

        addInactivity();

        e.target.parentElement.classList.remove("inactive");
    })
})

function addInactivity(){
    additional_images.forEach((additional_image)=>{
        additional_image.classList.add("inactive");
    })
}

var setSliderActiveTab = function(dataSetValue){
    additional_images.forEach((image)=>{
        if(dataSetValue == parseInt(-image.dataset.left)){
            addInactivity();
            
            image.classList.remove("inactive");
        }
    })
}

function checkWindowSize(){
    if(window.innerWidth <= '900'){
        changeLeftToHundred();
    }else{
        changeLeftToSeventy();
    }
}

if(window.innerWidth <= '900'){
    changeLeftToHundred();
}else{
    changeLeftToSeventy();
}

window.onresize = checkWindowSize;

function changeLeftToHundred(){
    var fresh_counter = -100;

    arrow_counter_value = 100;

    additional_images.forEach((additional_image)=>{
        fresh_counter += 100;

        additional_image.dataset.left = fresh_counter;

        if(!additional_image.classList.contains("inactive")){
            slider.style.left = `-${additional_image.dataset.left}vw`;
        }
    });

    final = -fresh_counter;
}

function changeLeftToSeventy(){
    var fresh_counter = -50;

    arrow_counter_value = 50;

    additional_images.forEach((additional_image)=>{
        fresh_counter += 50;

        additional_image.dataset.left = fresh_counter;

        if(!additional_image.classList.contains("inactive")){
            slider.style.left = `-${additional_image.dataset.left}vw`;
        }
    }); 

    final = -fresh_counter;
};