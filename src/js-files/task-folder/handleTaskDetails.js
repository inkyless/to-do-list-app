import { createHighlightText } from "../createHighlightText"
import { handlePriority, priorityColor } from "../handlePriority"

export const handleTaskDetails = (e, object) => {
    const target = e.target || e

    const projectDetail = document.querySelector("#project-detail")
    const priorityText = handlePriority(object.priority, priorityColor)

    // ignore checkbox when being clicked
    if (target.tagName == "INPUT" || target.tagname === "BUTTON") { return }
    else {
        let projectName = object.project
        projectName = projectName.charAt(0).toUpperCase() + projectName.slice(1)
        const taskTitle = document.createElement("h2")
        taskTitle.id = "task-detail-title"
        projectDetail.innerHTML = `
            <h2 id="task-detail-title">${object.title}</h2>
            <p>Status : ${object.complete ? "Completed" : "Not Completed"}</p>
            ${object.complete ? "" : `
                 <p>Project : ${projectName}</p>
                `}
            <p>Due Date : ${object.duedate}</p>
            <p>Due Time : ${object.duetime}</p>
            <p id="task-detail-priority">Priority :  <span id="priority-text">${priorityText.priorityDescription}</span></p>
            <p>Note ${object.note}</p>
            <p>Description ${object.description}<p>
        `
        createHighlightText(projectDetail, object.priority)

    }
    return projectDetail

}