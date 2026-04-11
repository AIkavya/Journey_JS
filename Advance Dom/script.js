'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
 
const section1 = document.querySelector('#section--1');

const message = document.createElement('div');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');


///////////////////////////////////////
// Modal window



const openModal = function (e)
{
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((ele) => {
  ele.addEventListener('click',openModal)
});



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// README Modal on Page Load

const readmeModal = document.querySelector('.modal--readme');
const btnCloseReadme = document.querySelector('.btn--close-readme');
const readmeContent = document.querySelector('.modal__readme-content');

const openReadmeModal = function () {
  readmeModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeReadmeModal = function () {
  readmeModal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Fetch and display README on page load
document.addEventListener('DOMContentLoaded', function () {
  fetch('README.md')
    .then(response => response.text())
    .then(data => {
      // Simple markdown to HTML conversion for basic formatting
      let htmlContent = data
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gm, '<em>$1</em>')
        .replace(/`(.*?)`/gm, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^- /gm, '• ');
      
      readmeContent.innerHTML = '<p>' + htmlContent + '</p>';
      openReadmeModal();
    })
    .catch(error => {
      console.log('Could not load README:', error);
      readmeContent.innerHTML = '<p>README file not found</p>';
      openReadmeModal();
    });
});

btnCloseReadme.addEventListener('click', closeReadmeModal);

// Also close README modal with overlay click
overlay.addEventListener('click', function () {
  if (!readmeModal.classList.contains('hidden')) {
    closeReadmeModal();
  }
});

// Close README modal with ESC key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !readmeModal.classList.contains('hidden')) {
    closeReadmeModal();
  }
});


// Cookie--------------------------------------

message.classList.add('cookie-message');
message.innerHTML = 'We use cookied for improved functionality and anaytics <button class="btn btn--close-cookie"> Got it! </button> ';

// document.querySelector('.header').prepend(message);
document.querySelector('.header').append(message);
// document.querySelector('.header').append(message.cloneNode(true));

// prepend -> inside and at first
// append -> inside and at last
// before -> outside and before
// after -> outside and after.

// Delete elements

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove(); // removing...
  // old method -> choose parent element and then remove the child..

  // message.parentElement.removeChild(message);
})

// ------------------------------------------------

// Scroll -> Learn More

btnScrollTo.addEventListener('click', function (e)
{
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // top always equals to y and left always equals to x.

  console.log('current scroll (x/y) :', window.screenX, window.scrollY);

  console.log(`height / width viewport`, document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling

  // Way -1
  // window.scrollTo(
  //   coords.lefts1 + window.pageXOffset,
  //   s1coords.top + window.pageYOffset)

  // Way - 2
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset ,
  //   top:  s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // })

  // Way - 3
  section1.scrollIntoView({ behavior: 'smooth' });

})

// ------------------------------------------------


// page navigation


// solution - 1 : Not so effective....

// document.querySelectorAll('.nav__link').forEach((ele) => {
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
    
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// })


// solution 2 : Via Event Propagation

// 1. add event listener to common parent element

// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  
  // Matching..

  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();

    const id = e.target.getAttribute('href');
    
   document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

  }
})

// Tab Component



tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) 
  {
    return;
  }

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');


  // Activate content area

  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})


// -------------------------------------------------

// Menu fade animation


const handleHover = function (e)
{
   if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    })

    logo.style.opacity = this;

   }
  
}

// nav.addEventListener('mouseover', function(e) {
//     handleHover(e,0.5)
// })

// nav.addEventListener('mouseout', function (e)
// {
  
//    handleHover(e,1)
  
// })


nav.addEventListener('mouseover', handleHover.bind(0.5) )

nav.addEventListener('mouseout',handleHover.bind(1))



// -------------------------------------------

// sticky navigation

// Way 1 : Ineffcient...

// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })

// <Important#####> Way 2 :

// Sticky navigation : Intersection Observer API

// const obsCallback = function (entries, observer)
// {
//   entries.forEach((ele) => {
//         console.log(ele)     
//            })
// };
// const obsOptions = {
//   root: null,
//   threshould: [0,0.2]
// }
// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
     nav.classList.add('sticky')
  }
  else {
    nav.classList.remove('sticky')
  }

  
}


const heaaderObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin:  `-${navHeight}px`// margin of px above
});
heaaderObserver.observe(header);
//---------------------------------------------- 

// Reveal Sections

const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer)
{
  entries.forEach((entry) => {
     
    if (!entry.isIntersecting)
   {
    return;
   }

    entry.target.classList.remove('section--hidden')
      observer.unobserve(entry.target);
   })

  

}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold:0.15,
});

allSections.forEach(function(ele)
{
  sectionObserver.observe(ele);
  ele.classList.add('section--hidden');
})

// -------------------------------------------

// lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }

  entry.target.setAttribute('src', `${entry.target.dataset.src}`)

  // entry.target.classList.remove('lazy-img') -> removing directly cause and performance problems.. so we use a load event ... using eventListener..
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin:'200px' // before loading ...
})
imgTargets.forEach((img) => {
  imgObserver.observe(img);
})
// -------------------------------------------
// slider

const slides = document.querySelectorAll('.slide');

const btnleft = document.querySelector('.slider__btn--left');


const btnright = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots')

let curSlide = 0;
const maxSlide = slides.length;


const createDots = function () {
  slides.forEach(function(_, i)  {
     dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
   })
}

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach((ele) => {
    ele.classList.remove('dots__dot--active')
  })

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')


}

const goToSLide = function (slide) {
  slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i-slide)*100}%)`
   })
}

goToSLide(0);
createDots();


const nextSlide = function () {
  
  if (curSlide === maxSlide-1) {
    curSlide = 0;
  }
  else {
      curSlide++;
  }

  goToSLide(curSlide);
  activateDot(curSlide);
}

const prevSlide = function ()
{
  if (curSlide === 0)
  {
    curSlide = maxSlide - 1;  
  }
  else {
     curSlide--;
  }
 
  goToSLide(curSlide);
  activateDot(curSlide);
}

btnright.addEventListener('click', nextSlide);
btnleft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  }
  
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
})


dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    curSlide = Number(e.target.dataset.slide);
    goToSLide(curSlide)
    activateDot(curSlide);
    }
})

// -------------------------------------------

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(`HTML PARSED AND DOM TREE BUILT>>`, e)
// });
 
// window.addEventListener('load', function (e) {
//   console.log(`Page fully loaded`, e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ' ';
// })
// -------------------------------------------
// Selecting Elememts..

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Node List.....
const nodeList = document.querySelectorAll('.section');
console.log(nodeList);

// Node List -> does not change ...

// HTML COLLECTIONS..

const htmlCollection = document.getElementsByClassName('btn');

// HTML COLLECTIONS -> are live changing...

// Creating and inserting elements..

// .insertAdjacentHTML




message.style.backgroundColor = '#27282d';
message.style.width = '120%';

console.log(message.style.color); // nothing consoles
console.log(message.style.backgroundColor);
console.log(message.style.height); // nothing consoles

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

let height = Number.parseFloat(getComputedStyle(message).height, 10)
console.log(height)
message.style.height = Number.parseFloat(height, 10) + 30 + 'px';


//  ----------------------------------------------

// changing variable...

// document.documentElement.style.setProperty('--color-primary','orangered');


// ----------------------------------------------- 

// Attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt, logo.src, logo.className); 

// Non-standard..
console.log(logo.designer) // undefined..

// only consloe the standard properties...

// BUT DO SO WE HAVE HACK..

console.log(logo.getAttribute('designer')); // jonas..

// set attribute...

logo.setAttribute('comapany', 'Bankist')


// atrribute , value as parameters..

//  in src we get absoulate url to get ride of that we need to use the getAttribute ..

console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.getAttribute('href'));
// or ... document.queryselector('.twitter-link).href

// Both gives same answer... above ^ ^


// Data  attributes
console.log(logo.dataset.name); //Hi

// classes..

// add , remove , toggle , contains , replace..

// Dont do ..
//  logo.className = 'jonas'

// it will remove all the class and just jonas will be their but using classList method it will not do that it will simply add the class and do not remove other ones...




// -----------------------------------------------------

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('You are reading...')

//   // if you want to removeEventlistener after just one execution you can do ->
//   // h1.removeEventListener('mouseenter',alertH1)
// }
// h1.addEventListener('mouseenter',alertH1)

// // h1.onmouseenter = alertH1;


// // if you want to set a timeline for removingEventListener then..

// setTimeout(() =>
// {
//   h1.removeEventListener('mouseenter', alertH1);
//   // will remove after 3 seconds...
// }, 3000);


// ----------------------------------------------

// Event Propagation : Capturing , Execute , Bubbling

// creating a function which generates the random color...

// const random = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) }

// const randomColor = function () { return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})` }

// document.querySelector('.nav__link').addEventListener('click', function(e){
 
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//  e.stopPropagation();
// stop propogataion...

// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//    console.log('BOX', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//    console.log('NAV', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// },true) // capturing


// -------------------------------------------------

// Travesing DOM

const h11 = document.querySelector('h1');


// Going downwards: child 
console.log(h11.querySelectorAll('.highlight'));

console.log(h11.childNodes); // Node List
console.log(h1.children); // HTML Colletion
h1.firstElementChild.style.color = 'white';

h1.lastElementChild.style.color = 'white';

// Going Up wards

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header') // find parent..


// selecting siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// get all siblings...

console.log(h1.parentElement.children) //HTML COllECTION






