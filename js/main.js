// Всплывающее меню //

    const openBtn = document.querySelector('.menu-burger');
    const menu = document.querySelector('.menu-burger-mobile');
    const closeBtn = document.querySelector('.menu-burger-mobile-close');
    let opacity = 0.2;
    const menuItem = document.querySelectorAll('.menu-burger-mobile__item');

    openBtn.addEventListener('click', function() {
       menu.classList.add('menu-burger-mobile_active');
       menu.style.opacity = 0;

       setTimeout(function foo() {
           if (opacity < 1) {
               opacity += 0.2;
               menu.style.opacity = opacity;
               setTimeout (foo, 80);
           }

           
       }, 80);

       

    });

    for (let i = 0; i < menuItem.length; i++) {
		menuItem[i].addEventListener('click', function () {		
        menu.classList.remove('menu-burger-mobile_active');		
		}						
		
	)};





    closeBtn.addEventListener('click', function() {
        setTimeout (function fooC(){
            if (opacity > 0) {
                opacity -= 0.2;
                menu.style.opacity = opacity;
                setTimeout (fooC, 80);
            } else {
                
            menu.classList.remove('menu-burger-mobile_active');
            }
        }, 80);


    });




    




    document.addEventListener('keydown', function(e) {

        setTimeout (function fooC() {
        if(e.keyCode === 27) {
            opacity -= 0.2;
            menu.style.opacity = opacity;
            setTimeout (fooC, 80);
        } else {
            menu.classList.remove('menu-burger-mobile_active');
        }
    }, 80);

    });


    



