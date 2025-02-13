document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelectorAll(".content");
  const navigation = document.getElementById("navigation");
  const welcomeImage = document.getElementById("start");
  const textToHide = document.getElementById("rubrik");
  const menuButton = document.getElementById("containerMenu");
  const menu = document.getElementById("menuScreen");
  const menuIcon = document.querySelectorAll("rect");

  let hasScrolled = false;

  // Funktion för animationen vid första besök
  if (!sessionStorage.getItem("hasSeenAnimation")) {
    content.forEach((el) => {
      el.style.display = "none";
    });
    navigation.style.display = "none";

    window.addEventListener("load", () => {
      if (welcomeImage) {
        const handleAnimationEnd = () => {
          navigation.style.display = "flex";

          content.forEach((el) => {
            el.style.display = "block";
            el.style.animation = "fadeIn 1s forwards";
          });
          navigation.style.animation = "fadeIn 2s forwards";
          document.body.style.overflow = "auto"; // Tillåter skrollning
          sessionStorage.setItem("hasSeenAnimation", "true");
          welcomeImage.removeEventListener("animationend", handleAnimationEnd);
        };

        welcomeImage.addEventListener("animationend", handleAnimationEnd);
      }
    });
  } else {
    welcomeImage.style.display = "none";
    navigation.style.display = "flex";
    content.forEach((el) => {
      el.style.display = "block";
      el.style.animation = "fadeIn 2s forwards";
    });
    navigation.style.animation = "fadeIn 4s forwards";
    document.body.style.overflow = "auto";
  }

  // Skrollfunktion för att dölja texten i Nav
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      textToHide.style.opacity = 0;
    } else {
      textToHide.style.opacity = 1;
    }

    if (window.scrollY > 500) {
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

  /*  SKROLL CONTENT LOCK  */

  /* let scrollLock = document.getElementById("scrollLock");
  let secondInfo = document.getElementById("secondInfo");
  let scrollActivated = false; // Håller koll på om scrollen har aktiverats

  window.addEventListener("scroll", function () {
    let rect = scrollLock.getBoundingClientRect();
    console.log(rect.top <= 0 && rect.bottom >= window.innerHeight);

    // Kolla om hela #scrollLock är synligt i viewporten
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      if (!scrollActivated) {
        // Lås scrollen på hela sidan och aktivera scroll för secondInfo
        document.body.style.overflow = "hidden"; // Stoppar scrollning på body
        secondInfo.style.overflowY = "scroll"; // Aktiverar scroll i secondInfo
        scrollActivated = true; // Indikerar att scrollen är aktiverad
      }
    } else {
      if (scrollActivated) {
        // Återställ scrollen till hela sidan när vi lämnar #scrollLock
        document.body.style.overflow = ""; // Återställer scrollen på body
        secondInfo.style.overflowY = ""; // Återställer scrollen för secondInfo
        scrollActivated = false; // Indikerar att scrollen har inaktiverats
      }
    }

    // Om användaren har skrollat till botten av secondInfo, återställ scrollen på hela sidan
    if (
      scrollActivated &&
      secondInfo.scrollTop + secondInfo.clientHeight >= secondInfo.scrollHeight
    ) {
      document.body.style.overflow = ""; // Tillåt normal scroll på hela sidan
      secondInfo.style.overflowY = ""; // Återställ scroll på secondInfo
      scrollActivated = false; // Återställ flaggan
    }

    if (scrollActivated && secondInfo.scrollTop === 0) {
      document.body.style.overflow = ""; // Återställ scrollen på hela sidan
      secondInfo.style.overflowY = ""; // Återställ scroll på #secondInfo
      scrollActivated = false; // Återställ flaggan
    }
  }); */

  /*   BAKGRUND FÄRG VÄXLA  */

  let scrollLock = document.getElementById("scrollLock");

  window.addEventListener("scroll", function () {
    // Hämta positionen och höjden för #scrollLock
    let rect = scrollLock.getBoundingClientRect();

    // Om scrollLock är synligt på skärmen (när toppen av elementet är synligt)
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      let scrollPosition = window.scrollY; // Använd scrollY för att få positionen på sidan
      let height = document.documentElement.scrollHeight - window.innerHeight;

      // Beräkna procenten av hur mycket användaren har skrollat
      let percentageScrolled = scrollPosition / height;

      // Beräkna RGB-värden för bakgrundsfärgen baserat på scrollprocenten
      let red = Math.min(220 + percentageScrolled * 50, 255);
      let green = Math.min(176 - percentageScrolled * 50, 255);
      let blue = Math.min(54 + percentageScrolled * 50, 106);

      // Uppdatera bakgrundsfärgen på #scrollLock
      scrollLock.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
  });
});
