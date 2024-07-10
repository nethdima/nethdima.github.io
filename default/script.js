function updateTime() {
  const today = new Date();
  let hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  // Display 24-hour format (00:00 to 23:59)
  const formattedTime24 = `${hour.toString().padStart(2, "0")}`;
  document.querySelector(".clock-24-format").textContent = formattedTime24;

  // Display 12-hour format with AM/PM
  const amPM = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  const formattedTime12 = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")} ${amPM}`;
  document.querySelector(".clock-12-format").textContent = formattedTime12;

  // Display the current date and month
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const monthNumber = (today.getMonth() + 1).toString().padStart(2, "0");

  document.querySelector(".calendar-info").textContent = formattedDate;
  document.querySelector(".month-display").textContent = monthNumber;
}

updateTime();

setInterval(updateTime, 1000);

const greetings = {
  morning: [
    "Good morning! May this new day bring you all the success and happiness you deserve.",
    "Rise and shine! Begin your day with a smile and positive thoughts.",
    "Good morning! May your day be as productive as the first sip of your coffee.",
    "Wishing you a morning filled with energy and enthusiasm to achieve your goals.",
    "Hello! Embrace the new day with determination and make every moment count.",
  ],
  afternoon: [
    "Good afternoon! Stay strong and positive as you progress through your day.",
    "Hope your day is going well! Take a moment to recharge and approach the rest of the day with enthusiasm.",
    "Sending you positive vibes for a productive and successful afternoon.",
    "Good afternoon! Reflect on your achievements and continue moving forward.",
    "Wishing you a pleasant afternoon filled with accomplishments and smiles.",
  ],
  evening: [
    "Good evening! Reflect on the day's accomplishments and prepare for tomorrow.",
    "Hope your evening is as rejuvenating as the sunset. Take time to relax and recharge.",
    "Wishing you a peaceful evening filled with contentment and joy.",
    "Good evening! May this serene evening inspire and refresh you.",
    "As the day winds down, find comfort in life's simple pleasures.",
  ],
  night: [
    "Good night! Reflect on today's achievements and anticipate a successful tomorrow.",
    "Wishing you a restful night's sleep filled with rejuvenating dreams.",
    "Good night! May you find peace and relaxation after a productive day.",
    "As you conclude your day, remember the lessons learned. Sleep well and recharge.",
    "Sending you warm wishes for a peaceful and refreshing night. Good night!",
  ],
};

function getRandomGreeting(timeOfDay) {
  const greetingArray = greetings[timeOfDay];
  const randomIndex = Math.floor(Math.random() * greetingArray.length);
  return greetingArray[randomIndex];
}

function displayRandomGreeting() {
  const currentTime = new Date().getHours();
  let greeting;

  if (currentTime >= 5 && currentTime < 12) {
    greeting = getRandomGreeting("morning");
  } else if (currentTime >= 12 && currentTime < 17) {
    greeting = getRandomGreeting("afternoon");
  } else if (currentTime >= 17 && currentTime < 21) {
    greeting = getRandomGreeting("evening");
  } else {
    greeting = getRandomGreeting("night");
  }

  const greetingDiv = document.querySelector(".greeting-text");
  greetingDiv.textContent = `${greeting}`;
}

displayRandomGreeting();

function updateCompanyAge() {
  const foundedDate = new Date("2017-12-21");
  const currentDate = new Date();

  let years = currentDate.getFullYear() - foundedDate.getFullYear();
  let months = currentDate.getMonth() - foundedDate.getMonth();
  let days = currentDate.getDate() - foundedDate.getDate();

  if (
    months < 0 ||
    (months === 0 && currentDate.getDate() < foundedDate.getDate())
  ) {
    years--;
    months += 12;
  }
  if (days < 0) {
    months--;
    const tempDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days += tempDate.getDate();
  }

  const formattedAge = `${years} year${years !== 1 ? "s" : ""} ${months} month${
    months !== 1 ? "s" : ""
  } ${days} day${days !== 1 ? "s" : ""}`;

  document.querySelector(".time-since-founded").textContent = formattedAge;
}

updateCompanyAge();

window.addEventListener("load", () => {
  const ss = document.querySelector(".splash-screen");

  setTimeout(() => {
    ss.style.transition = "opacity .5s";
    ss.style.opacity = 0;
    setTimeout(() => ss.remove(), 500);
  }, 5000);
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

const navToggle = document.querySelector("header > .menu-toggle");
const navMenu = document.querySelector("header > nav");

function closeNavMenu() {
  navMenu.classList.remove("active");
}

navToggle.addEventListener("click", function (event) {
  event.stopPropagation();
  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    adjustSubMenuPosition();
  }
});

document.body.addEventListener("click", function (event) {
  const isClickInsideNav = navMenu.contains(event.target);
  const isClickOnToggle = navToggle.contains(event.target);

  if (!isClickInsideNav && !isClickOnToggle) {
    closeNavMenu();
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("openModal")) {
    event.preventDefault();
    const modalId = event.target.getAttribute("data-modal-id");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  if (event.target.classList.contains("close")) {
    const modal = event.target.closest(".modal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});
