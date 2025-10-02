import { taskLists } from "../.."
import { handleTaskDetails } from "./handleTaskDetails"
import { handleTaskList } from "./handleTaskList"

export default function toggleTask(task) {
    const checkbox = document.querySelector(`input[data-task-id="${task.id}"]`)
    const card = document.querySelector(`article[id="card-${task.id}"]`)
    if (checkbox && card) {
        // console.log(checkbox)
        checkbox.addEventListener("change", (e) => {
            // First made the object task complete status become true
            task.complete = e.target.checked
            // Then if completed, it will be send to completed section
            // Then if want to revert back again return to default project
            task.project = task.complete ? "completed" : "default"
            // Remove the current card element
            card.remove()
            handleTaskList(taskLists)

            // Clears out task details when being checked/unchecked
            // handleTaskDetails(e.target, task)
        })
    }


}
