// Menu data structure with sub-links
const menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '#', subLinks: [
        { text: 'all', href: '/catalog/all' },
        { text: 'top selling', href: '/catalog/top' },
        { text: 'search', href: '/catalog/search' },
    ]},
    { text: 'orders', href: '#', subLinks: [
        { text: 'new', href: '/orders/new' },
        { text: 'pending', href: '/orders/pending' },
        { text: 'history', href: '/orders/history' },
    ]},
    { text: 'account', href: '#', subLinks: [
        { text: 'profile', href: '/account/profile' },
        { text: 'sign out', href: '/account/signout' },
    ]},
];

// Manipulate the main element
const mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

// Create a menu bar
const topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

// Add menu links to the navigation bar
menuLinks.forEach(link => {
    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', link.href);
    linkEl.textContent = link.text;
    topMenuEl.appendChild(linkEl);
});

// Cache the sub-menu element
const subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

// Cache all top menu links
const topMenuLinks = topMenuEl.querySelectorAll('a');

// Handle top menu click events
topMenuEl.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    // Toggle active class
    topMenuLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    // Show or hide sub-menu
    const linkObject = menuLinks.find(link => link.text === event.target.textContent);
    if (linkObject && linkObject.subLinks) {
        subMenuEl.style.top = '100%';
        buildSubmenu(linkObject.subLinks);
    } else {
        subMenuEl.style.top = '0';
    }
});

// Build sub-menu
function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = '';
    subLinks.forEach(link => {
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', link.href);
        linkEl.textContent = link.text;
        subMenuEl.appendChild(linkEl);
    });
}

// Handle sub-menu click events
subMenuEl.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.tagName !== 'A') return;

    // Reset sub-menu position
    subMenuEl.style.top = '0';
    mainEl.innerHTML = <h1>${event.target.textContent}</h1>;
    topMenuLinks.forEach(link => link.classList.remove('active'));
});
