

// For the deletion part, it won't be completely gone but will be moved to temporary trash folder

import { taskLists } from "../.."
import { handleTaskList } from "./handleTaskList"

export const deleteTask = (object, card) => {
    if (object) {
        // Toggle the complete key become true
        object.deleted = !object.deleted

        // If deleted key become true and it was not complete
        object.project = object.deleted ? "trash" : "default"
        card.remove()
        handleTaskList(taskLists)

        // Make sure to clear the project details screen
        const projectDetails = document.querySelector("#project-detail")
        projectDetails.innerHTML = ""

    }

}