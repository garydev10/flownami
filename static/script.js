function addEditTaskEvent() {

  const enableTaskEdit = (itemId) => {
    const editButton = document.querySelector(`.edit-button[data-id="${itemId}"]`);
    const nameDisplay = document.querySelector(`.name-display[data-id="${itemId}"]`);
    const nameEdit = document.querySelector(`.name-edit[data-id="${itemId}"]`);
    const okButton = document.querySelector(`.ok-button[data-id="${itemId}"]`);
    const cancelButton = document.querySelector(`.cancel-button[data-id="${itemId}"]`);
    editButton.style.display = "none";
    nameDisplay.style.display = "none";
    nameEdit.style.display = "block";
    okButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
  }

  const disableTaskEdit = (itemId) => {
    const editButton = document.querySelector(`.edit-button[data-id="${itemId}"]`);
    const nameDisplay = document.querySelector(`.name-display[data-id="${itemId}"]`);
    const nameEdit = document.querySelector(`.name-edit[data-id="${itemId}"]`);
    const okButton = document.querySelector(`.ok-button[data-id="${itemId}"]`);
    const cancelButton = document.querySelector(`.cancel-button[data-id="${itemId}"]`);
    editButton.style.display = "block";
    nameDisplay.style.display = "block";
    nameEdit.style.display = "none";
    nameEdit.value = nameDisplay.innerText;
    okButton.style.display = "none";
    cancelButton.style.display = "none";
  }

  const editTaskButtons = document.querySelectorAll(".edit-button");
  editTaskButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      enableTaskEdit(itemId);
    });
  });

  const cancelTaskButtons = document.querySelectorAll(".cancel-button");
  cancelTaskButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      disableTaskEdit(itemId);
    });
  });

  const okTaskButtons = document.querySelectorAll(".ok-button");
  okTaskButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const itemId = event.target.getAttribute("data-id");
      const inputTaskName = document.querySelector(`.name-edit[data-id="${itemId}"]`);
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
