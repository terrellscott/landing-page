/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
//get all sections
const sections = document.querySelectorAll('section');
//get navbar
const nav = document.querySelector('#navbar__list');
//get links
const links = document.querySelectorAll('a');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


function inViewPort(element) {
    const position = element.getBoundingClientRect();
    const buffer = 100; // Increase this value to make the viewport area bigger
    return (
        position.top >= -buffer &&
        position.left >= -buffer &&
        position.bottom <= (window.innerHeight || document.documentElement.clientHeight) + buffer &&
        position.right <= (window.innerWidth || document.documentElement.clientWidth) + buffer
    );
}
// build the nav
function createNav() {
    for (section of sections) {
        // Retrieve section name and id
        sectionName = section.getAttribute('data-nav');
        sectionId = section.getAttribute('id');
        // Create new list item
        const newItem = document.createElement('li');
        const anchorId = `nav-${sectionId}`; 
        // Create new anchor tag
        const anchorTag = document.createElement('a');
        anchorTag.id = anchorId;
        anchorTag.className = 'menu__link';
        anchorTag.href = `#${sectionId}`;
        anchorTag.textContent = sectionName;
        // Add event listener for mouseover
        anchorTag.addEventListener('mouseover', function(event) {
            event.target.style.backgroundColor = '#8db600';
            event.target.style.color = '#fff';
        });
        // Add event listener for mouseout
        anchorTag.addEventListener('mouseout', function(event) {
            const sectionId = event.target.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            if (!section.classList.contains('your-active-class')) {
                event.target.style.backgroundColor = '#fff';
                event.target.style.color = '#333';
            }
        });
        // Append anchor tag to list item
        newItem.appendChild(anchorTag);
        // Append list item to navbar
        nav.appendChild(newItem);
    }
}

//add active class to section
function activeSection() {
    for (section of sections) {
        //add active class to section when in viewport
        if (inViewPort(section)) {
            section.classList.add('your-active-class');
            const sectionId = section.getAttribute('id');
             // Get corresponding anchor ID to change its style
            const anchorId = `nav-${sectionId}`;
            const anchorTag = document.getElementById(anchorId);
            // Change background and text color of anchor tag
            anchorTag.style.backgroundColor = '#8db600'; 
            anchorTag.style.color = '#fff'; 
        } else {
            //remove active class from section when not in viewport
            section.classList.remove('your-active-class');
            const sectionId = section.getAttribute('id');
            //Return anchor ID to original style
            const anchorId = `nav-${sectionId}`; 
            const anchorTag = document.getElementById(anchorId);
            anchorTag.style.backgroundColor = '#fff';
            anchorTag.style.color = '#333'; 
        }
    }
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', activeSection);


// Smooth scroll to anchor ID using scrollTO event

nav.addEventListener('click', function (event) {
    event.preventDefault();
    const clicked = event.target;
    const sectionId = clicked.getAttribute('href');
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
});




/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createNav();

// Set sections as active
activeSection();
