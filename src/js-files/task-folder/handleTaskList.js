import { Task, taskLists } from "../.."
import { projectLists } from "../project-folder/createNewProject"
import toggleTask from "./toggleTask"
import { format } from "date-fns"


// Handle what to do with the tasks objects arrays available
export const handleTaskList = (array) => {
    array.forEach((task) => {
        // Create brand new task object from class, add them to taskArray and add toggle (features from it)
        if (!task.complete && !task.id) {
            // Set the formet for the task object to be created later
            const taskObject = {
                "title": task.title,
                "description": task.description || "(empty)...",
                "duedate": task.duedate || format(task.duedate ? new Date(task.duedate) : new Date(), 'do MMM yyyy'),
                "duetime": task.duetime || "12:00",
                "priority": task.priority,
                "note": task.note || "(empty)...",
                "project": task.project || "default",
                "complete": task.complete || false,
            }
            if (!projectLists.includes(taskObject.project)) projectLists.splice(-1, 0, taskObject.project)
            const newDefaultTask = new Task(taskObject)
            newDefaultTask.createTask()
            taskLists.push(newDefaultTask)
            toggleTask(newDefaultTask)
            if (!task.id) taskLists.splice(taskLists.indexOf(task), 1)
        }
        // This condition is for existing tasks (completed and default)
        else if (task.id) {
            task.createTask()
            toggleTask(task)
        }

    })
}