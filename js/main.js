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


/*
const button = document.querySelector('.js-open-btn');
const template = document.querySelector('#modal-template').innerHTML;
//const popup = document.querySelector('.modal');
//const close = document.querySelector('#close-btn');

const title = contentWrap.querySelector('.reviews__title').innerHTML;
const text = contentWrap.querySelector('.reviews__text').innerHTML;

const modal = createModal();

button.addEventListener('click', e => {
    modal.setContent(title, text);
    modal.open()
});*/





/*const popupBlock = document.createElement('div');
popupBlock.className = 'popup';

const overlay = document.createElement('div');
overlay.className = 'overlay';

popupBlock.appendChild(overlay);
console.log(popupBlock);*/

/*button.addEventListener('click', e => {
popup.classList.add('opened');
});

close.addEventListener('click', e=> {
    popup.classList.remove('opened');
}); */