document.addEventListener("DOMContentLoaded", function() {
    function makeElementsEditable() {
      const editableElements = document.querySelectorAll("[id^='editable-agro-']");
  
      editableElements.forEach(element => {
        if (!element.getAttribute("contenteditable")) {
          element.setAttribute("contenteditable", "true");
        }
        
        if (!element.getAttribute("data-blur-listener-added")) {
          element.setAttribute("data-blur-listener-added", "true");
          element.addEventListener("blur", function() {
            const info = (element.id).split("-");
            const siteName = info[1];
            const componentId = info[2];
            const route = `/api/site/update/${siteName}/${componentId}`;
  
            const data = {
              newValue: element.innerHTML
            };
  
            fetch(route, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          });
        }
      });
    }
  
    // Initial check for elements
    makeElementsEditable();
  
    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          makeElementsEditable();
        }
      });
    });
  
    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true, // Watch for added or removed child nodes
      attributes: true, // Watch for changes to attributes
      subtree: true // Watch the entire subtree for changes
    });
  });
  