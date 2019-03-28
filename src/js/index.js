//add figcaption to the team  on hover

const icon = document.querySelectorAll('.team__pearson-looking-item');

icon.forEach(item=>{
    item.addEventListener('mouseenter', addCaption );
    item.addEventListener('mouseleave', removeCaption );
    item.addEventListener('touch', addCaptionTouch);
})

//create figcaption

function createCaption(value){
    const figcaption = document.createElement('figcaption');
    figcaption.classList.add('team__pearson-looking-name');
    const par = document.createElement('p');
    par.classList.add('par-1', 'team__pearson-looking-name-text');
    par.textContent = value;
    figcaption.appendChild(par);

    return figcaption;
}

function addCaption(e){
    const value = e.currentTarget.getAttribute('data-pearson');
    const figcaption = createCaption(value);

    e.currentTarget.appendChild(figcaption);
}

function removeCaption(e){
    const target = e.currentTarget;
    const figcaption = document.querySelector('.team__pearson-looking-name');
    figcaption.classList.remove('team__pearson-looking-name');
    target.removeChild(figcaption);
}

//caption for touch

function addCaptionTouch(e){
    if(document.querySelector('.team__pearson-looking-name')){
        const figcaption = document.querySelector('.team__pearson-looking-name');
        figcaption.classList.remove('team__pearson-looking-name');
        figcaption.parentElement.removeChild(figcaption);
    }

    addCaption(e);
}

//toggle menu

function toggleMenu(e){
    const menu = document.querySelector('.header__menu');
    if(menu.style.display == 'none'){
        menu.classList.remove('header__menu_out')
        menu.style.display = 'flex';
    } else {
        menu.classList.add('header__menu_out')
        setTimeout(()=>{
            menu.style.display = 'none';
        }, 1000);
    }
}

const toggleMenuButton = document.querySelector('.header__button-item');

toggleMenuButton.addEventListener('click', toggleMenu);
