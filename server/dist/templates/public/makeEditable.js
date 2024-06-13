document.addEventListener("DOMContentLoaded", function () {
  function makeElementsEditable() {
    const editableElements = document.querySelectorAll("[id^='editable']");

    editableElements.forEach((element) => {
      if (!element.getAttribute("contenteditable")) {
        element.setAttribute("contenteditable", "true");
      }

      if (!element.getAttribute("data-blur-listener-added")) {
        element.setAttribute("data-blur-listener-added", "true");
        element.addEventListener("blur", function () {
          const [name, _, websiteId, componentId] = element.id.split("_");
          const route = `https://spark-admin-production.up.railway.app/api/site/update/${componentId}`;
//https://spark-admin-production.up.railway.app/makeEditable.js
          const data = {
            newValue: element.textContent.replace(/\u00a0/g, " ").trim(),
            websiteId: websiteId,
            url: `https://ferla-backend-production.up.railway.app/api/components/update`,
          };
          const userData = JSON.parse(localStorage.getItem("userData"));
          const access = userData.accessToken;

          fetch(route, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access}`,
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
