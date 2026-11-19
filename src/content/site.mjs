// Global settings (WordPress: Customizer / options page + menus).
export const site = {
  name: "McGarrell Reilly Group",
  brand: "mcgr", // "mcgr" | "fajon"
  parallax: true, // site-wide switch; sections can also turn it off individually
  navigation: [
    { label: "Portfolio", url: "portfolio/" },
    { label: "About Us", url: "about-us/" },
    { label: "Responsibility", url: "responsibility/" },
    { label: "Working with us", url: "working-with-us/" },
    { label: "Media", url: "media/" },
    { label: "Contact Us", url: "contact-us/" },
  ],
  legalLinks: [
    { label: "Privacy Statement", url: "" }, // hidden until the content is supplied
    { label: "Terms of use", url: "terms-of-use/" },
  ],
  address: ["31/32 Charlemont Street", "Dublin 2", "D02 DK57", "Ireland"],
  phone: "+353 (0)1 4161 300",
  email: "info@mcgarrellreilly.ie",
  recruitmentEmail: "info@mcgarrellreilly.ie",
  linkedin: "https://www.linkedin.com/company/mcgarrell-reilly-group/",
  credit: "Designed by Begley Hutton",
};

// Draft copy from the supplied artwork. Replace with final content.
export const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.";
export const shortBody = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation ullamcorper suscipit lobortis nisl ut aliquip ex ea.";
