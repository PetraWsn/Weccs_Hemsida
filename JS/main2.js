document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelectorAll(".content");
  const navigation = document.getElementById("navigation");
  const textToHide = document.getElementById("rubrik");
  const menuButton = document.getElementById("containerMenu");
  const menu = document.getElementById("menuScreen");
  const menuIcon = document.querySelectorAll("rect");
  const expandButtonL = document.querySelectorAll(".expandButtonL");
  const expandButtonR = document.querySelectorAll(".expandButtonR");
  const caseBoxL = document.querySelectorAll(".caseBoxL");
  const caseBoxR = document.querySelectorAll(".caseBoxR");
  /* const buttonImg = document.querySelectorAll("buttonImg"); */

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

  /* KNAPP FÖR VISA MER/MINDRE */

  let lastScrollPosition = 0; // Variabel för att hålla koll på scrollpositionen

  // Funktion för att hantera expandering och kollaps av CaseBoxL
  expandButtonL[0].addEventListener("click", function () {
    toggleHeight(caseBoxL[0], this.querySelector(".buttonImg"));
  });

  // Funktion för att hantera expandering och kollaps av CaseBoxL (för andra knappen)
  expandButtonL[1].addEventListener("click", function () {
    toggleHeight(caseBoxL[1], this.querySelector(".buttonImg"));
  });

  // Funktion för att hantera expandering och kollaps av CaseBoxR
  expandButtonR[0].addEventListener("click", function () {
    toggleHeight(caseBoxR[0], this.querySelector(".buttonImg"));
  });

  // Funktion för att hantera expandering och kollaps av CaseBoxR (för andra knappen)
  expandButtonR[1].addEventListener("click", function () {
    toggleHeight(caseBoxR[1], this.querySelector(".buttonImg"));
  });

  // Funktion för att toggla höjden mellan expandering och kollaps
  function toggleHeight(box, buttonImg) {
    if (box.classList.contains("expanded")) {
      box.classList.remove("expanded");
      window.scrollTo(0, lastScrollPosition);
      buttonImg.src = "./assets/arrow_down.svg";
    } else {
      lastScrollPosition = window.scrollY;
      box.classList.add("expanded");
      buttonImg.src = "./assets/arrow_up.svg";
    }
  }

  /* EXPANDERA SERVICEKOLUMN */

  document.querySelectorAll(".serviceContainer").forEach((container) => {
    container.addEventListener("click", () => {
      // Toggla 'expanded' på den klickade containern
      container.classList.toggle("expanded");
    });
  });
});
