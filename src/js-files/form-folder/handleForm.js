import { taskLists } from "../.."
import { createNewProject, projectLists } from "../project-folder/createNewProject"
import { handleTaskList } from "../task-folder/handleTaskList"
import { format } from "date-fns"

// Handle the form input submission
export const handleForm = (element) => {
    const taskForm = element.querySelector("#task-form")
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(taskForm)
        const parsedDate = formData.get("duedate") ? new Date(formData.get("duedate")) : new Date()
        
        const taskFormObject = {
            "title": formData.get("title"),
            "description": formData.get("description") || "",
            "duedate": format(parsedDate, 'do MMM yyyy'),
            "duetime": formData.get("duetime"),
            "priority": formData.get("priority") || "3",
            "note": formData.get("note") || "(empty notes)",
            "project": formData.get("project") || "default",
            "complete": false,
        }
        taskLists.push(taskFormObject)
        handleTaskList(taskLists)

        const { createSelectDropdown } = createNewProject(element)
        createSelectDropdown(projectLists)

        // Close the dialog after finish submitting
        taskForm.reset()
        element.close()






    })
}
