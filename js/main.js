//Slider:
var images = document.querySelectorAll(".slider li");
var next = document.querySelector(".header_container .next");
var prev = document.querySelector(".header_container .prev");
var counter = 0;

// blok z obrazami

var bloks = document.querySelectorAll(".box_container.picture")

// Aplikacja do zamówień:
var button = document.getElementsByClassName("drop_down_list");
var application = document.querySelector(".application");
var transport = document.getElementById("transport");

var sumOfOrder = application.querySelector(".sum");

var chairType = application.querySelector(".chair_type");
var chairColor = application.querySelector(".chair_color");
var chairTextile = application.querySelector(".chair_textile");

var chairTypeChoice = application.querySelector(".title");
var chairColorChoice = application.querySelector(".color");
var chairTextileChoice = application.querySelector(".pattern");
var transportChoice = application.querySelector(".transport");

var chairTypeChoiceValue = application.querySelector(".title.value");
var chairColorChoiceValue = application.querySelector(".color.value");
var chairTextileChoiceValue = application.querySelector(".pattern.value");
var transportChoiceValue = application.querySelector(".transport.value");

// Slider

// pierwszy widoczny obrazek w sliderze:

var visibleImage = images[counter];
visibleImage.classList.add("visible");


next.addEventListener("click", function(){
  if(counter >= images.length-1) {
    counter = -1;
  }
  visibleImage.classList.remove("visible")
  counter++;
  visibleImage = images[counter];
  visibleImage.classList.add("visible")
});

prev.addEventListener("click", function(){
  if(counter <= 0) {
    counter = images.length;
  }
  visibleImage.classList.remove("visible")
  counter--;
  visibleImage = images[counter];
  visibleImage.classList.add("visible")
});

// block z obrazkami

for (var i =0; i<bloks.length; i++) {
  bloks[i].addEventListener("mouseover", function() {
      this.querySelector(".box_info").classList.add("is_transparent")
  });
}

for (var i =0; i<bloks.length; i++) {
  bloks[i].addEventListener("mouseout", function() {
      this.querySelector(".box_info").classList.remove("is_transparent")
  });
}

// Rozwijane pole wyboru przy zamównieniach + podsumowanie ceny
function panelToogler(e){
    var isVisible = document.getElementsByClassName("is_visible");
    var rotated = document.getElementsByClassName("rotate180");
    if(isVisible.length !==0 && this.querySelector(".list_panel").classList[2]==="is_visible") {
        while (isVisible.length) {
            isVisible[0].classList.remove("is_visible");
            rotated[0].classList.remove("rotate180");
        }
    } else if (isVisible.length !==0) {
        while (isVisible.length) {
            isVisible[0].classList.remove("is_visible");
            rotated[0].classList.remove("rotate180");
        }
        this.querySelector(".list_panel").classList.add("is_visible");
        this.querySelector(".list_arrow").classList.add("rotate180");
    } else {
        this.querySelector(".list_panel").classList.toggle("is_visible");
        this.querySelector(".list_arrow").classList.toggle("rotate180");
    }
    e.stopPropagation();
}

for (var i =0; i< button.length; i++) {
  button[i].addEventListener("click", panelToogler);

}

document.addEventListener("click", function(){
  var isVisible = application.getElementsByClassName("is_visible");
  var rotated = application.getElementsByClassName("rotate180");
      while (isVisible.length) {
          isVisible[0].classList.remove("is_visible");
          rotated[0].classList.remove("rotate180");
      }
});

for (var i = 0; i < chairType.children.length; i++) {
    chairType.children[i].addEventListener("click", function(){
        chairTypeChoice.innerText = "Twój fotel: " + this.innerText;
        chairType.parentElement.querySelector(".list_label").innerHTML = "<span class='theme_style2'>Rodzaj: </span>" + this.innerText;
        chairType.parentElement.querySelector(".list_label").classList.add("theme_style1");
        chairTypeChoiceValue.innerText = this.dataset.typePrice;
        sum();
    });
}

for (var i = 0; i < chairColor.children.length; i++) {
    chairColor.children[i].addEventListener("click", function(){
        chairColorChoice.innerText = ("kolor: " + this.innerText).toLowerCase();
        chairColor.parentElement.querySelector(".list_label").innerHTML = "<span class='theme_style2'>Kolor: </span>" + this.innerText.toLowerCase();
        chairColor.parentElement.querySelector(".list_label").classList.add("theme_style1");
        chairColorChoiceValue.innerText = this.dataset.colorPrice;
        sum();
    });
}

for (var i = 0; i < chairTextile.children.length; i++) {
    chairTextile.children[i].addEventListener("click", function(){
        chairTextileChoice.innerText = ("materiał: " + this.innerText).toLowerCase();
        chairTextile.parentElement.querySelector(".list_label").innerHTML = "<span class='theme_style2'>Materiał: </span>" + this.innerText.toLowerCase();
        chairTextile.parentElement.querySelector(".list_label").classList.add("theme_style1");
        chairTextileChoiceValue.innerText = this.dataset.textilePrice;
        sum();
    });
}

transport.addEventListener("change", function(){
  if(transport.checked) {
    transportChoice.innerText = "transport: tak";
    transportChoiceValue.innerText = this.dataset.transportPrice;
  } else {
    transportChoice.innerText = "transport: nie";
    transportChoiceValue.innerText = ""
  }
  sum();
})

function sum() {
  var sumAll = 0;
  sumAll = Number(chairColorChoiceValue.innerText) + Number(chairTypeChoiceValue.innerText) + Number(chairTextileChoiceValue.innerText) + Number(transportChoiceValue.innerText);
  sumOfOrder.firstElementChild.innerText = sumAll.toFixed(2) + " zł";
}
