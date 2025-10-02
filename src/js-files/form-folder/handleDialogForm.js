import { createTaskForm } from "./createForm"

export const handleDialogForm = (dialog) => {
    if (!dialog) console.error("Dialog Form doesn't exist")
    const createInput = document.querySelector("#create-task")
    const cancelCreate = dialog.querySelector("#cancel-create")

    //The input task from page will trigger to open the form dialog
    if (createInput) {
        createInput.addEventListener("click", () => {
            if (!dialog.open) {
                dialog.removeAttribute("hidden")
                dialog.showModal()
            }

        })
    }

    if (cancelCreate) {
        cancelCreate.addEventListener("click", () => {
            dialog.close()
            dialog.setAttribute("hidden", "");
        })
    }



}