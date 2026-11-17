
/* =====================================
   ACORD UGANDA WEBSITE JAVASCRIPT
===================================== */

/* ORGANISATION CONTACT AND SOCIAL LINKS */
const CONTACT = {
    email: "acordu@acorduganda.org",

    facebook: "https://www.facebook.com/ACORD-UGANDA",

    youtube: "",

    whatsappNumber: ""
};

/* ALL WEBSITE PAGES */
const pages = [
    { name: "Home", file: "index.html" },
    { name: "About", file: "about.html" },
    { name: "Our Work", file: "our-work.html" },
    { name: "Projects", file: "projects.html" },
    { name: "Media", file: "media.html" },
    { name: "Resources", file: "resources.html" },
    { name: "Get Involved", file: "get-involved.html" },
    { name: "Contact", file: "contact.html" }
];

/* GET CURRENT PAGE */
function getCurrentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
}

/* CREATE HEADER */
function createHeader() {
    const header = document.getElementById("site-header");

    if (!header) return;

    const currentPage = getCurrentPage();

    header.innerHTML = `
        <div class="header-container">

            <a href="index.html" class="brand">
                <img src="logo.png" alt="ACORD Uganda Logo">

                <div class="brand-name">
                    ACORD <span>Uganda</span>
                    <small>COMMUNITY DEVELOPMENT</small>
                </div>
            </a>

            <button
                class="menu-toggle"
                id="menu-toggle"
                aria-label="Open navigation menu"
                aria-expanded="false"
                aria-controls="main-nav">
                ☰ Menu
            </button>

            <nav class="main-nav" id="main-nav" aria-label="Main navigation">
                ${pages.map(page => `
                    <a
                        href="${page.file}"
                        class="${currentPage === page.file ? "active" : ""}"
                        ${currentPage === page.file ? 'aria-current="page"' : ""}>
                        ${page.name}
                    </a>
                `).join("")}
            </nav>

        </div>
    `;

    const menuButton = document.getElementById("menu-toggle");
    const navigation = document.getElementById("main-nav");

    menuButton.addEventListener("click", function () {
        const opened = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(opened));
        menuButton.innerHTML = opened ? "✕ Close" : "☰ Menu";
    });

    /* CLOSE MOBILE MENU AFTER SELECTING A PAGE */
    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.innerHTML = "☰ Menu";
        });
    });
}

/* CREATE SOCIAL MEDIA LINKS */
function createSocialLinks() {
    const links = [];

    if (CONTACT.facebook) {
        links.push(`
            <a class="social-link"
               href="${CONTACT.facebook}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Facebook">f</a>
        `);
    }

    if (CONTACT.youtube) {
        links.push(`
            <a class="social-link"
               href="${CONTACT.youtube}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="YouTube">▶</a>
        `);
    }

    if (CONTACT.whatsappNumber) {
        links.push(`
            <a class="social-link"
               href="https://wa.me/${CONTACT.whatsappNumber}"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="WhatsApp">W</a>
        `);
    }

    links.push(`
        <a class="social-link"
           href="mailto:${CONTACT.email}"
           aria-label="Email">@</a>
    `);

    return links.join("");
}

/* CREATE FOOTER */
function createFooter() {
    const footer = document.getElementById("site-footer");

    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-main">

            <div class="footer-column">
                <a href="index.html" class="footer-brand">
                    <img src="logo.png" alt="ACORD Uganda Logo">
                    <div>
                        <strong>ACORD <span>Uganda</span></strong>
                        <small>COMMUNITY DEVELOPMENT</small>
                    </div>
                </a>

                <p>
                    Working with communities to promote dignity,
                    equality and sustainable development.
                </p>

                <div class="footer-socials">
                    ${createSocialLinks()}
                </div>
            </div>

            <div class="footer-column">
                <h3>Quick Links</h3>
                <ul>
                    ${pages.slice(0, 4).map(page => `
                        <li>
                            <a href="${page.file}">${page.name}</a>
                        </li>
                    `).join("")}
                </ul>
            </div>

            <div class="footer-column">
                <h3>Explore</h3>
                <ul>
                    ${pages.slice(4).map(page => `
                        <li>
                            <a href="${page.file}">${page.name}</a>
                        </li>
                    `).join("")}
                </ul>
            </div>

            <div class="footer-column">
                <h3>Contact Us</h3>
                <p>
                    Email:
                    <a href="mailto:${CONTACT.email}">
                        ${CONTACT.email}
                    </a>
                </p>
                <p>Location: Uganda</p>
                <p>Connect with us through our social media platforms.</p>
            </div>

        </div>

        <div class="footer-bottom">
            &copy; ${new Date().getFullYear()}
            ACORD Uganda. All Rights Reserved.
        </div>

        <button
            id="back-to-top"
            class="back-to-top"
            aria-label="Back to top">
            ↑
        </button>
    `;

    setupBackToTop();
}

/* BACK TO TOP FUNCTION */
function setupBackToTop() {
    const button = document.getElementById("back-to-top");

    if (!button) return;

    window.addEventListener("scroll", function () {
        button.classList.toggle("show", window.scrollY > 300);
    });

    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* CONTACT FORM */
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-message");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            feedback.textContent = "Please complete all fields.";
            return;
        }

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        feedback.textContent =
            "Opening your email application to send your message.";

        window.location.href =
            `mailto:${CONTACT.email}?subject=${emailSubject}&body=${emailBody}`;
    });
}

/* INITIALISE WEBSITE */
document.addEventListener("DOMContentLoaded", function () {
    createHeader();
    createFooter();
    setupContactForm();
});
