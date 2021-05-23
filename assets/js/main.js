(function($) {
  
  "use strict";  

  $(window).on('load', function() {

  /*Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    // one page navigation 
    $('.navbar-nav').onePageNav({
      currentClass: 'active'
    });

    /* Auto Close Responsive Navbar on Click
    ========================================================*/
    function close_toggle() {
        if ($(window).width() <= 768) {
            $('.navbar-collapse a').on('click', function () {
                $('.navbar-collapse').collapse('hide');
            });
        }
        else {
            $('.navbar .navbar-inverse a').off('click');
        }
    }
    close_toggle();
    $(window).resize(close_toggle);

    /* WOW Scroll Spy
    ========================================================*/
     var wow = new WOW({
      //disabled for mobile
        mobile: false
    });

    wow.init();

    /* 
    CounterUp
    ========================================================================== */
    $('.counter').counterUp({
      time: 500
    });  
    

     /* Testimonials Carousel 
    ========================================================*/
    var owl = $("#testimonials");
      owl.owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        center: true,
        margin: 15,
        slideSpeed: 1000,
        stopOnHover: true,
        autoPlay: true,
        responsiveClass: true,
        responsiveRefreshRate: true,
        responsive : {
            0 : {
                items: 1
            },
            768 : {
                items: 2
            },
            960 : {
                items: 3
            },
            1200 : {
                items: 3
            },
            1920 : {
                items: 3
            }
        }
      });  
      


    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

  });      

}(jQuery));

var button = document.querySelector('.buttonvaccine')
//var inputValue = document.querySelector('.inputValue')
// var inputValue2 = document.querySelector('.inputValue2')
var clear = document.querySelector('.buttonvaccineclear')

    button.addEventListener('click', function(){
          
      var e = document.getElementById("vaccinebox");
      var inputValue2 = e.options[e.selectedIndex].value;
    
      var f = document.getElementById("vaccineboxday");
      var inputValue1 = f.options[f.selectedIndex].value;

        fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=726&date='+inputValue1+'-'+inputValue2+'-2021')
        .then(response => response.json())
        .then(data => {
          const malda = data.sessions.map(data =>{
           return `
            <div class="card col-lg-12">
            <div class="row">
            <div class="col-lg-8 col-sm-8 vaccinedata">
                <p class="pl-5 pt-3"><strong class="universal-text-color-vaccine">Center name:</strong> ${data.name}</p>
                <p class="pl-5 "><strong class="universal-text-color-vaccine">Block:</strong> ${data.block_name}</p>
                <p class="pl-5 "><strong class="universal-text-color-vaccine">Minimum age:</strong> ${data.min_age_limit}</p>
                <p class="pl-5 "><strong class="universal-text-color-vaccine">Pincode:</strong> ${data.pincode}</p>
                <p class="pl-5 "><strong class="universal-text-color-vaccine">Vaccine:</strong> <strong> ${data.vaccine}</strong></p>
                <p class="pl-5 "><strong class="universal-text-color-vaccine">Address:</strong> ${data.address}</p>
                <p class="pl-5 "><strong class="universal-text-color-vaccine">Date:</strong> ${data.date}</p>
                <p class="pl-5 "><strong class="universal-text-color-vaccine">Available dose 1: ${data.available_capacity_dose1}</strong></p>
                <p class="pl-5 pb-3"><strong class="universal-text-color-vaccine">Available dose 2: ${data.available_capacity_dose2}</strong></p>
            </div>

            <div class="col-lg-4 col-sm-4  d-flex align-items-center pb-2 d-sm-block vaccineimg">
                  <img src="https://res.cloudinary.com/rahulsarkar/image/upload/v1621711079/vaccine_tewfoy.png">
            </div>
                </div>
                </div>`
          }).join("");
          document.querySelector('#app').insertAdjacentHTML('afterbegin', malda);
          if(malda == ""){
            alert('Sorry no data found! 🥺 Try another date..😇')
          }
        })
        .catch(err => alert('Sorry no data is available for this date'))
    })

    clear.addEventListener('click', function(){
      document.querySelector('#app').innerHTML = " ";
    })
