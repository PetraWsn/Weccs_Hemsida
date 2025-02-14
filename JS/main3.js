document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelectorAll(".content");
  const navigation = document.getElementById("navigation");
  const textToHide = document.getElementById("rubrik");
  const menuButton = document.getElementById("containerMenu");
  const menu = document.getElementById("menuScreen");
  const menuIcon = document.querySelectorAll("rect");

  let hasScrolled = false;

  window.addEventListener("load", function () {
    document.body.style.overflow = "auto"; // Återställ scrollning
    content.forEach((el) => {
      el.style.display = "block";
      el.style.animation = "fadeIn 2s forwards";
    });
  });

  // Skrollfunktion för att dölja texten i Nav
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      textToHide.style.opacity = 0;
    } else {
      textToHide.style.opacity = 1;
    }

    if (window.scrollY > 100) {
      hasScrolled = true;
      navigation.style.mixBlendMode = "unset"; // Stänger av mix-blend-mode vid skroll
    } else {
      hasScrolled = false;
      navigation.style.mixBlendMode = "difference"; // Sätter till "difference" när vi inte har skrollat förbi
    }
  });

  /* Funktion för att toggla menyn*/

  function toggleMenu() {
    const lastBlendMode = window.getComputedStyle(navigation).mixBlendMode;

    // Växla synligheten för menyn
    if (menu.classList.contains("open")) {
      // Om menyn är öppen, stäng den
      content.forEach((el) => {
        el.style.animation = "closeMenu 1s forwards";
      });
      menu.classList.remove("open"); // Ta bort 'open' för att stänga menyn
      document.body.style.overflow = "auto"; // Tillåt skrollning när menyn är stängd

      if (!hasScrolled) {
        navigation.style.mixBlendMode = lastBlendMode; // Återställ mixBlendMode
      }
    } else {
      // Om menyn är stängd, öppna den
      content.forEach((el) => {
        el.style.animation = "openMenu 1s forwards";
      });
      menu.classList.add("open"); // Lägg till 'open' för att öppna menyn
      document.body.style.overflow = "hidden"; // Blockera skrollning när menyn är öppen

      if (!hasScrolled) {
        navigation.style.mixBlendMode = "unset"; // Sätt till unset om vi inte har skrollat
      }
    }

    menuIcon.forEach((icon) => {
      icon.classList.toggle("active");
    });
  }

  // Lägger till eventlyssnare för menyn
  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }

  // Lägg till eventlyssnare på länkar för att stänga menyn när en länk klickas
  const menuLinks = document.querySelectorAll(".menuLink");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Förhindra standardbeteendet (omdirigering) tills övergången är klar
      event.preventDefault();

      // Lägg till en klass för att starta stängningsövergången
      menu.classList.remove("open");

      // Lägg till en eventlyssnare för att lyssna på när övergången är klar
      menu.addEventListener("transitionend", function onTransitionEnd() {
        // Ta bort eventlyssnaren för att förhindra att den körs igen
        menu.removeEventListener("transitionend", onTransitionEnd);

        // Omdirigera till den länkade sidan
        window.location.href = link.getAttribute("href");
      });
    });
  });

  /* EXPANDERA SERVICEKOLUMN */

  /*   document.querySelectorAll(".serviceContainer").forEach((container) => {
    container.addEventListener("click", () => {
      // Toggla 'expanded' på den klickade containern
      container.classList.toggle("expanded");
    });
  }); */

  document.querySelectorAll(".serviceContainer").forEach((container) => {
    container.addEventListener("click", () => {
      // Ta bort 'expanded' från alla containrar
      document
        .querySelectorAll(".serviceContainer")
        .forEach((otherContainer) => {
          if (otherContainer !== container) {
            otherContainer.classList.remove("expanded");
          }
        });
      // Toggla 'expanded' på den klickade containern
      container.classList.toggle("expanded");
      document.getElementById("h1Service").scrollIntoView();
    });
  });
});
