import { formatDistanceToNow } from "date-fns";
import { createTaskForm } from "./js-files/form-folder/createForm";
import { createNewProject } from "./js-files/project-folder/createNewProject";
import { handleDateTime } from "./js-files/handleDateTime";
import { handleForm } from "./js-files/form-folder/handleForm";
import { handlePriority, priorityColor } from "./js-files/handlePriority";
import { handleTaskDetails } from "./js-files/task-folder/handleTaskDetails";
import { handleTaskList } from "./js-files/task-folder/handleTaskList";
import "./styles.css"
import { deleteTask } from "./js-files/task-folder/deleteTask";
import { handleDialogForm } from "./js-files/form-folder/handleDialogForm";

// Create Task Objects as Array to be reusable later 
// First example is for the sample
let sampleTask = {
    "title": "Sample",
    "description": "(This task is for sample)",
    // "duedate": new Date().toLocaleDateString(),
    "priority": "1",
    "note": "(nothing important)",
    "project": "default",
    "complete": false,
}

export let taskLists = [sampleTask];

// Create Task Object
export class Task {
    constructor(data = {}) {
        this.id = `task-${crypto.randomUUID()}`;
        this.title = data.title;
        this.description = data.description || "";
        this.duedate = data.duedate
        this.duetime = data.duetime
        this.priority = data.priority || "3";
        this.note = data.note || "(empty notes)";
        this.project = data.project || "default";
        this.complete = data.complete;
        this.deleted = false;
    }

    createTask() {
        const existingCard = document.querySelector(`article[id="card-${this.id}"]`)
        const projectName = `${this.project}`
        const projectClass = `project-${projectName}`
        const priorityStyles = handlePriority(this.priority, priorityColor)

        const parsedDate = this.duedate
        const formDueTime = this.duetime

        // Remove "st", "nd", "rd", "th"
        const cleanDate = parsedDate.replace(/(\d+)(st|nd|rd|th)/, "$1");
        // Merge into valid Date string
        const mergedDate = new Date(`${cleanDate} ${formDueTime}`);
        const deadlinePeriod = formatDistanceToNow(mergedDate)

        let projectList = document.querySelector(`#${projectClass}`)

        // If user create new project when creating task, proceed to create new project
        if (!projectList) {
            const completedSection = document.querySelector("#project-completed")
            const newProjectSection = document.createElement("section")
            newProjectSection.setAttribute("id", projectClass)
            const projectHeading = document.createElement("h3")
            projectHeading.textContent = `${projectName.charAt(0).toUpperCase() + projectName.slice(1)}`
            newProjectSection.appendChild(projectHeading)
            completedSection.insertAdjacentElement("beforebegin", newProjectSection)
            projectList = newProjectSection

        }

        const article = document.createElement("article")
        article.classList.add(`project-${this.project}-card`)
        article.setAttribute("id", `card-${this.id}`)
        article.style = priorityStyles.cardStyle
        article.innerHTML = `
            <input type="checkbox" data-task-id="${this.id}" ${this.complete ? "checked" : ""}/>
            <div class="tasks">
                <div class="top-task-part">
                    <h4 class="${projectClass}-card">${this.title}</h4>
                    ${this.complete ? "" : `<button id="delete-task-button">${this.deleted ? "Restore" : "Delete"}</button>`}
                </div>
                <p class="${projectClass}-note" style="${priorityStyles.noteStyle}"><strong>${this.note}</strong></p>
                <span class="${projectClass}-deadline">Due to ${deadlinePeriod}</span>
            </div>
        `
        article.addEventListener("mouseover", () => article.style = priorityStyles.hoverStyle)
        article.addEventListener("mouseout", () => article.style = priorityStyles.cardStyle)
        article.addEventListener("click", (e) => handleTaskDetails(e, this))

        if (!existingCard) projectList.appendChild(article)

        // This function wont apply on completed tasks
        if (!this.complete) {
            const deleteButton = article.querySelector("#delete-task-button")
            deleteButton.addEventListener("click", (e) => { e.stopPropagation(), deleteTask(this, article) })
        }

    }

}

function initialize() {
    const dialogForm = createTaskForm()
    // Initialize Form Input
    if (dialogForm) {
        // // Initialize Due Time Form input
        handleDateTime(dialogForm)
        // // Initialize new project trigger
        createNewProject(dialogForm)
        // // Initialize Form 
        handleForm(dialogForm)
        // Initialize form trigger when clicking input create task
        handleDialogForm(dialogForm)

    } else {
        console.error("Dialog Element Cannot be Created")
        return;
    }

    if (taskLists) {
        // Initialize available tasks
        handleTaskList(taskLists)
        // Make all tasks available to be deleted
        deleteTask()
    }

}

initialize()

window.lists = taskLists


