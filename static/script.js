function addEditTaskEvent() {
  const editTaskForms = document.querySelectorAll(".edit-task-form");
  editTaskForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      const inputTaskName = event.target.querySelectorAll(".edit-task-name")[0];
      const taskName = decodeURIComponent(inputTaskName.value);
      const url = "/tasks";
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: itemId, name: taskName }),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
      } catch (error) {
        console.error(error.message);
      }
      globalThis.location = "/board";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  addEditTaskEvent();
});
