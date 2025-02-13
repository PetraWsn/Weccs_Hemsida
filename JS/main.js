/* STARTSKÄRM */
document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const navigation = document.getElementById("navigation");
  const welcomeImage = document.getElementById("start");

  content.style.display = "none";
  navigation.style.display = "none";

  if (!sessionStorage.getItem("hasSeenAnimation")) {
    // Vänta tills sidan är helt inladdad och animationen är klar
    window.addEventListener("load", () => {
      if (welcomeImage) {
        const handleAnimationEnd = () => {
          navigation.style.display = "flex";
          content.style.display = "block"; // Visar det andra innehållet
          content.style.animation = "fadeIn 1s forwards";
          navigation.style.animation = "fadeIn 2s forwards";
          content.style.opacity = 1; // Gör innehållet synligt
          navigation.style.opacity = 1;
          document.body.style.overflow = "auto"; // Tillåter skrollning

          sessionStorage.setItem("hasSeenAnimation", "true");

          // Ta bort eventlistenern för animationen för att inte trigga den igen
          welcomeImage.removeEventListener("animationend", handleAnimationEnd);
        };

        welcomeImage.addEventListener("animationend", handleAnimationEnd);
      }
    });
  } else {
    welcomeImage.style.display = "none";
    navigation.style.display = "flex";
    content.style.display = "block";
    content.style.animation = "fadeIn 2s forwards";
    navigation.style.animation = "fadeIn 4s forwards";
    content.style.opacity = 1;
    navigation.style.opacity = 1;
    document.body.style.overflow = "auto"; // Tillåter skrollning
  }

  /* NAVTEXT FUNKTION - gömmer Rubriken i Naven vid skroll */

  const textToHide = document.getElementById("rubrik");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      textToHide.style.opacity = 0;
    } else {
      textToHide.style.opacity = 1;
    }
  });

  /* NAV MIXBlEND FUNKTION & MENYKNAPP FUNKTION*/

  let hasScrolled = false;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      // Om användaren skrollar mer än 100px
      /* navColor.classList.add("scroll"); */
      hasScrolled = true;
      navigation.style.mixBlendMode = "unset";
    } else {
      hasScrolled = false;
      navigation.style.mixBlendMode = "different";
    }
  });

  function toggleMenu() {
    const menu = document.getElementById("menuScreen");
    const menuIcon = document.querySelectorAll("rect");

    // Spara det aktuella blendmode-värdet innan förändring
    let lastBlendMode = window.getComputedStyle(navigation).mixBlendMode;

    // Om ingen mixBlendMode är satt eller är "normal", sätt till "unset"
    if (lastBlendMode === "normal" || lastBlendMode === "") {
      lastBlendMode = "unset";
    }

    // Toggle visibility of the menuScreen
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";

    if (menu.style.height === "0vh" || !menu.style.height) {
      // Om menyn är stängd eller om den saknar höjd, öppna den
      menu.style.animation = "openMenu 1s forwards";
      content.style.animation = "closeMenu 1s forwards";
      menu.style.height = "100vh";
      document.body.style.overflow = "hidden";

      if (!hasScrolled) {
        navigation.style.mixBlendMode = "unset";
      }
    } else {
      // Om menyn är öppen, stäng den
      menu.style.animation = "closeMenu 1s forwards";
      content.style.animation = "openMenu 1s forwards";
      menu.style.height = "0vh";
      document.body.style.overflow = "auto";
      navigation.style.mixBlendMode = lastBlendMode;

      if (!hasScrolled) {
        navigation.style.mixBlendMode = lastBlendMode;
      }
    }

    // Toggle the "active" class for the menu button (transform lines to 'X')
    menuIcon.forEach((icon) => {
      icon.classList.toggle("active");
    });
  }

  /* ANROP MENYKNAPP FUNKTION */

  const menuButton = document.getElementById("containerMenu");
  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }
});
