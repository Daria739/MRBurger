// Всплывающее меню //

const openBtn = document.querySelector('.menu-burger');
const menu = document.querySelector('.menu-burger-mobile');
const closeBtn = document.querySelector('.menu-burger-mobile-close');
let opacity = 0.2;
const menuItem = document.querySelectorAll('.menu-burger-mobile__item');

openBtn.addEventListener('click', function () {
    menu.classList.add('menu-burger-mobile_active');
    menu.style.opacity = 0;

    setTimeout(function foo() {
        if (opacity < 1) {
            opacity += 0.2;
            menu.style.opacity = opacity;
            setTimeout(foo, 80);
        }


    }, 80);



});

for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener('click', function () {
        menu.classList.remove('menu-burger-mobile_active');
    }

    )
};


closeBtn.addEventListener('click', function () {
    setTimeout(function fooC() {
        if (opacity > 0) {
            opacity -= 0.2;
            menu.style.opacity = opacity;
            setTimeout(fooC, 80);
        } else {

            menu.classList.remove('menu-burger-mobile_active');
        }
    }, 80);


});

document.addEventListener('keydown', function (e) {

    setTimeout(function fooC() {
        if (e.keyCode === 27) {
            opacity -= 0.2;
            menu.style.opacity = opacity;
            setTimeout(fooC, 80);
        } else {
            menu.classList.remove('menu-burger-mobile_active');
        }
    }, 80);

});






// Вертикальный аккордеон //


const items = document.querySelectorAll('.team__item');

for (const item of items) {
    item.addEventListener('click', e => {
        const curItem = e.currentTarget;
        const content = curItem.querySelector('.team__btn-content');

        if (curItem.classList.contains('active')) { //пункт открыт
            curItem.classList.remove('active');
            content.style.height = 0;
        } else {

            Array.from(items).forEach(elem => {
                elem.classList.remove('active');
                elem.querySelector('.team__btn-content').style.height = 0;
            })

            curItem.classList.add('active');
            content.style.height = '100%';
        }




    });
}




//Горизонтальный аккордеон




const menuItems = document.querySelectorAll('.our-menu__item');

for (const menuItem of menuItems) {
    menuItem.addEventListener('click', e => {
        const curMenuItem = e.currentTarget;
        const contentMenu = curMenuItem.querySelector('.our-menu__desc');

        if (curMenuItem.classList.contains('active')) { //пункт открыт
            curMenuItem.classList.remove('active');
            contentMenu.style.width = 0;
        } else {

            Array.from(menuItems).forEach(elem => {
                elem.classList.remove('active');
                elem.querySelector('.our-menu__desc').style.width = 0;
            })

            curMenuItem.classList.add('active');
            contentMenu.style.width = '100%';
        }




    });
}





// Слайдер


const leftBtn = document.querySelector('.burgers__arrow-link_left');
const rightBtn = document.querySelector('.burgers__arrow-link_right');
const sliderItem = document.querySelector('.burgers__list');

//const step = 1025;
let step = sliderItem.firstElementChild.getBoundingClientRect().width;
//const maxRight = 3900;
const maxRight = (sliderItem.children.length - 1) * step; // 1 - количество слайдов, которые помещаются в экран
const minRight = 0;
let currentRight = 0;



rightBtn.addEventListener('click', e => {
    e.preventDefault();
    if (currentRight < maxRight) {
        currentRight += step;
        sliderItem.style.right = `${currentRight}px`;
    } else {
        currentRight = 0;
        sliderItem.style.right = `${currentRight}px`;
    }
});

leftBtn.addEventListener('click', e => {
    e.preventDefault();
    if (currentRight > minRight) {
        currentRight -= step;
        sliderItem.style.right = `${currentRight}px`;
    } else {
        currentRight = maxRight;
        sliderItem.style.right = `${currentRight}px`;
    }
});


// Модальное окно


const button = document.querySelectorAll('.js-open-btn');

const modal = createModal();

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', e => {
        const thisBtn = e.currentTarget;
        contentWrap = thisBtn.parentNode;
        const title = contentWrap.querySelector('.reviews__title').innerHTML;
        const text = contentWrap.querySelector('.reviews__text').innerHTML;
        modal.setContent(title, text);
        modal.open();

    });
}


function createModal() {
    const container = document.createElement('div');
    const template = document.querySelector('#modal-template').innerHTML;
    container.className = 'popup';
    container.innerHTML = template;

    const contentBlock = container.querySelector('.popup__content');
    //contentBlock.appendChild(content);

    const contentTitle = container.querySelector('.popup__title');
    const contentText = container.querySelector('.popup__text');


    const closeBtn = container.querySelector('#close-btn');

    closeBtn.addEventListener('click', e => {
        document.body.removeChild(container);
    });

    const overlay = container.querySelector('.overlay');

    overlay.addEventListener('click', e => {
        document.body.removeChild(container);
    });



    return {
        open() {
            document.body.appendChild(container);
        },
        close() {
            closeBtn.click();
        },
        setContent(title, text) {
            contentTitle.innerHTML = title;
            contentText.innerHTML = text;
        }
    }
}

// Форма заказа


const myForm = document.querySelector('.form');
const orderBtn = myForm.querySelector('.js-btn-sumbit');
const clearBtn = myForm.querySelector('.js-btn-reset');


myForm.addEventListener('submit', e=>{
    e.preventDefault();

    if (validateForm(myForm)) {
        const name = myForm.elements.name.value;
        const phone = myForm.elements.phone.value;
        const comment = myForm.elements.comment.value;
        const to = 'juicebox739@gmail.com';
        var formData = new FormData();
            formData.append('name',name);
            formData.append('phone', phone);
            formData.append('comment', comment);
            formData.append('to', to);
            console.log(formData);
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.send(formData);
            xhr.addEventListener('load', e =>{

                if (xhr.response.status){
                    const response = 'Заказ оформлен';
                        modal.setContent('', response);
                        modal.open();
                        setTimeout(e=>{
                            clearBtn.click();
                            modal.close();
                        },1500);
                        
                } else {
                    const rejected = 'Заказ не оформлен';
                    modal.setContent('',rejected);
                    modal.open();
                    clearBtn.click();
                }
                
            });
    }
});

function validateForm(myForm) {
    let valid = true;
    
    if (!validateField(myForm.elements.name)) {
        valid = false;
    }

    if (!validateField(myForm.elements.phone)) {
        valid = false;
    }

    if (!validateField(myForm.elements.comment)) {
        valid = false;
    }
    return valid;
};


function validateField(field) {
    if (!field.checkValidity()){
        field.nextElementSibling.textContent = field.validationMessage;
        return false;
    }
    else {
        field.nextElementSibling.textContent = '';
        return true;
    }
};

// Смена экранов


const sections = $('.section');
const display = $('.maincontent');
let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const switchActiveClassInSideMenu = menuItemIndex => {
    $('.points__item').eq(menuItemIndex).addClass('active')
    .siblings().removeClass('active');
}









const performTransition = sectionEq => { 
    if (inScroll) return;

    const sectionEqNum = parseInt(sectionEq);

    if(!!sectionEqNum === false) {
        console.error('Неверное значение для sectionEq');
    }


    inScroll = true;

    const position = sectionEqNum * -100 + '%';

    sections
    .eq(sectionEq)
    .addClass('active')
    .siblings()
    .removeClass('active');

    display.css({
        'transform': `translateY(${position})`
    });

    setTimeout(() => {
        inScroll = false;
        switchActiveClassInSideMenu(sectionEq);

    }, 1000 + 300);
    

};

const scrollToSection = direction => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === 'prev' && prevSection.length) {
        performTransition(prevSection.index());
    }

    if (direction === 'next' && nextSection.length) {
        performTransition(nextSection.index());
    }




};







$('.wrapper').on('wheel', e =>{
    const deltaY = e.originalEvent.deltaY;

    if(deltaY > 0) {
        scrollToSection('next');
    }

    if(deltaY < 0) {
     scrollToSection('prev');
    }

});

$(document).on('keydown', e => {
    switch(e.keyCode) {
        case 38: scrollToSection('prev'); break;
        case 40: scrollToSection('next'); break;
    }
    touchmove: e => e.preventDefault()
});

$('[data-scroll-to]').on('click', e => {
    e.preventDefault();
  
    const target = parseInt($(e.currentTarget).attr('data-scroll-to'));
  
  
    performTransition(target);
  
  });
  if (isMobile) {
    $(document).swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

        const scrollDirection = direction === 'down' ? 'up' : 'down';
        
        scrollToSection(scrollDirection);
      }
    });
  }







  // Плеер


 let player;

 function onYouTubeIframeAPIReady() {
    player = new YT.Player("yt-player", {
      width: "660",
      height: "405",
      videoId: "V5w1OGknhlc",
      playerVars: {
        controls: 0,
        disablekb: 0,
        showinfo: 0,
        rel: 0,
        autoplay: 0,
        modestbranding: 0
      },
      events: {
       onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }


$('.player__playback').on('click', e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.originalEvent.layerX;
    const clickedPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;

    player.seekTo(newPlayerTime);
})


$('.player__splash').on('click', e => {
    player.playVideo();
})

  function onPlayerReady(e) {
  

  let interval;
  const durationTime = player.getDuration();

  clearInterval(interval);

  updateTimerDisplay();


  interval = setInterval(() => {
      const completedTime = player.getCurrentTime();
      const percent = (completedTime / durationTime) * 100;
      $('.player__playback-button').css({
      left: `${percent}%`
    })

    updateTimerDisplay();
  }, 1000);
  }

  function onPlayerStateChange(event) {
      const btn = $('.player__start');
      switch (event.data){
        case 1:
        btn.addClass('paused');
        $('.player__wrapper').addClass('active');
        break;
        case 2:
        btn.removeClass('paused');
        break;
      }
  }






  function updateTimerDisplay () {
    $('.player__duration-estimate').text(formatTime(player.getDuration()));
    $('.player__duration-completed').text(formatTime(player.getCurrentTime()));
  }


  $('.player__start').on('click', e=> {
      const btn =$(e.currentTarget);
      const playerState = player.getPlayerState();

      if(playerState !== 1 ) {
        player.playVideo();
      } else {
          player.pauseVideo();
      }
  });

  function formatTime(time) {
      const roundTime = Math.round(time);
      const minutes = Math.floor(roundTime / 60);
      const seconds = roundTime - minutes * 60;

      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      return `${minutes}:${formattedSeconds}`;
  };




//Volume



function editVolume() {  

    changeVolumeButtonPosition(100);
    let currentVol = 0;
    
    $('.player__playback-volume').on('click', function (e) {
      e.preventDefault();
      var bar = $(e.currentTarget);
      var newButtonPosition = e.pageX - bar.offset().left;
      var clickedPercents = newButtonPosition / bar.width() * 100;
      
    
      changeVolumeButtonPosition(clickedPercents);
      player.setVolume(clickedPercents);
      currentVol = clickedPercents;
    });
    
    function changeVolumeButtonPosition(percents) {
      $('.player__playback-button-volume').css({
        left: percents + '%'
      });
    }

}
editVolume();

$('.player__button-volume').on('click', function(e) {
    var volumeButton = $(e.currentTarget);
    var mute = player.isMuted();

     if (mute) {
       volumeButton.removeClass('mute');
       player.unMute();
       changeVolumeButtonPosition(player.getVolume())
     } else {
       volumeButton.addClass('mute');
       player.mute();
       changeVolumeButtonPosition(0)
     }

  });




  

  


























  // Карта 


  ymaps.ready(init);


  var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
        balloonContent: [
            '<div class="map__balloon></div>',
            '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
            '</div>'
        ]

    },


    {
        latitude: 59.94,
        longitude: 30.25,
        hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
        balloonContent: [
            '<div class="map__balloon></div>',
            '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
            '</div>'
        ]

    },

    {
        latitude: 59.93,
        longitude: 30.34,
        hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
        balloonContent: [
            '<div class="map__balloon></div>',
            '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
            '</div>'
        ]

    }


  ],

geoObjects = [];

function init(){     
 
   var map = new ymaps.Map("map", {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent.join('')
    
        },
    
        {
            iconLayout: 'default#image',
            iconImageHref: './img/map-marker.png',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        });

        

        var clusterer = new ymaps.Clusterer({

        });
        map.geoObjects.add(clusterer); 
        //map.geoObjects.add(placemark); 
        clusterer.add(geoObjects);
    }





    

  
    
   
}
