document.addEventListener("DOMContentLoaded", function () {
  function makeElementsEditable() {
    const editableElements = document.querySelectorAll(
      "[id^='editable-agro-']"
    );

    editableElements.forEach((element) => {
      if (!element.getAttribute("contenteditable")) {
        element.setAttribute("contenteditable", "true");
      }

      if (!element.getAttribute("data-blur-listener-added")) {
        element.setAttribute("data-blur-listener-added", "true");
        element.addEventListener("blur", function () {
          const [_, siteName, componentId] = element.id.split("-");
          const route = `https://spark-admin-production.up.railway.app/api/site/update/${siteName}/${componentId}`;

          const data = {
            newValue: element.textContent.replace(/\u00a0/g, " ").trim(),
          };

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
