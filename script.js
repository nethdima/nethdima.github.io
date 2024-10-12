document.addEventListener("DOMContentLoaded", function () {
    var style = document.createElement("style");
    style.textContent = `
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-decoration: none;
    list-style: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin: 0;
    padding: 0;
    outline: none;
  }
  
  *:focus {
    outline: none;
  }
  
  ::-webkit-scrollbar {
    width: 0;
  }
  
  html {
    scroll-behavior: smooth;
  }
  `;
    document.head.appendChild(style);
  
    var body = document.querySelector("body");
    body.oncontextmenu = function () {
      return false;
    };
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    // Preventing dragstart on all elements
    var elements = document.querySelectorAll("*");
    elements.forEach(function (element) {
      element.addEventListener("dragstart", function (event) {
        event.preventDefault();
      });
    });
  
    // Optional: Preventing drop on the document (may interfere with normal browser functionality)
    document.addEventListener("drop", function (event) {
      event.preventDefault();
    });
  
    // Optional: Preventing dragover on the document (may interfere with normal browser functionality)
    document.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
      images[i].ondragstart = function () {
        return false;
      };
      images[i].addEventListener("contextmenu", function (event) {
        event.preventDefault();
      });
    }
  
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  
    document.addEventListener("keydown", function (event) {
      if (
        (event.ctrlKey && (event.key === "p" || event.key === "P")) ||
        (event.ctrlKey && (event.key === "s" || event.key === "S"))
      ) {
        event.preventDefault();
      }
  
      if (
        event.ctrlKey &&
        event.shiftKey &&
        (event.key === "I" || event.key === "i")
      ) {
        event.preventDefault();
      }
  
      var charCode = event.keyCode || event.which;
      if (
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        (charCode < 48 && charCode !== 32) ||
        (charCode > 57 && charCode < 65) ||
        (charCode > 90 && charCode < 97) ||
        charCode > 122
      ) {
        event.preventDefault();
      }
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    function hideAltText(img) {
      img.setAttribute("alt", ""); // Hide alt text
    }
  
    function replaceWithDamageIcon(img) {
      const damageIcon = document.createElement("span");
      damageIcon.classList.add("damage-icon");
      // Set some text or icon content here if needed
      damageIcon.textContent = "";
      img.style.display = "none"; // Hide the original img element
      img.parentNode.insertBefore(damageIcon, img); // Insert the damage icon before the img
    }
  
    function showImage(img) {
      img.style.display = "inline"; // Show the image
    }
  
    function handleImage(img) {
      hideAltText(img);
  
      if (img.complete && img.naturalWidth !== 0) {
        // Image has loaded successfully
        showImage(img);
        // Save image state to local storage
        localStorage.setItem("img_" + img.src, "loaded");
      } else {
        // Image has not completed loading or failed to load
        replaceWithDamageIcon(img);
        // Remove from local storage if previously saved
        localStorage.removeItem("img_" + img.src);
      }
  
      img.onload = function () {
        showImage(img);
        // Save image state to local storage
        localStorage.setItem("img_" + img.src, "loaded");
      };
  
      img.onerror = function () {
        replaceWithDamageIcon(img); // Replace with damage icon on error
        // Remove from local storage if previously saved
        localStorage.removeItem("img_" + img.src);
      };
    }
  
    const images = document.getElementsByTagName("img");
    Array.from(images).forEach(function (img) {
      // Check local storage if image was previously loaded
      if (localStorage.getItem("img_" + img.src) === "loaded") {
        showImage(img);
      } else {
        handleImage(img);
      }
    });
  
    // Clear local storage on page refresh to start fresh
    window.addEventListener("beforeunload", function () {
      localStorage.clear();
    });
  });
  