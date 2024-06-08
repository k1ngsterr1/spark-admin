document.addEventListener("DOMContentLoaded", function () {
  function makeElementsEditable() {
    const editableElements = document.querySelectorAll("[id^='ferla-edit-']");

    editableElements.forEach((element) => {
      if (!element.getAttribute("contenteditable")) {
        element.setAttribute("contenteditable", "true");
      }

      if (!element.getAttribute("data-blur-listener-added")) {
        element.setAttribute("data-blur-listener-added", "true");
        element.addEventListener("blur", function () {
          const [siteName, _, componentId] = element.id.split("-");
          const route = `http://localhost:4000/`;
          console.log(siteName, componentId);

          const data = {
            newValue: element.textContent.replace(/\u00a0/g, ' ').trim()
          };
          console.log(data.newValue);

          fetch(route, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }
    });
  }

  makeElementsEditable();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" || mutation.type === "attributes") {
        makeElementsEditable();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true,
  });
});