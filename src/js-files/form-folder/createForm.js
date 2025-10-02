
// Create form element through js files
import { priorityColor } from "../handlePriority"
import { createWarningLog } from "./createWarningLog"

export const createTaskForm = () => {
    // Create input section to be wrapped and its heading
    const inputSection = document.createElement("dialog")
    inputSection.id = "project-input"
    inputSection.hidden = true
    inputSection.innerHTML = "<h2>Create New Task</h2>"

    // Then, add span element as warning text log for input
    const warningLog = document.createElement("span")
    warningLog.id = "warning-log";
    inputSection.appendChild(warningLog)
    

    const taskInputData = [
        [{
            "name": "title",
            "type": "text",
            "required": true,
            "needSubRow": false,
            "maxLength": 50,
        }],
        [{
            "name": "description",
            "type": "text",
            "required": false,
            "needSubRow": false,
        }]
        , [
            {
                "name": "due-date",
                "type": "date",
                "required": false,
                "needSubRow": true,
            }
            , {
                "name": "due-time",
                "type": "other",
                "required": false,
                "needSubRow": true,
            }],
        [{
            "name": "priority",
            "type": "other",
            "required": false,
            "needSubRow": false,
        }],
        [{
            "name": "notes",
            "type": "text",
            "required": false,
            "needSubRow": false,
            "maxLength": 75,

        }],
        [{
            "name": "project",
            "type": "other",
            "required": false,
            "needSubRow": false,
        }],
    ]

    const form = document.createElement("form")
    form.action = "#"
    form.method = "dialog"
    form.id = "task-form"


    taskInputData.map((data) => {
        const formRow = document.createElement("div")
        formRow.classList.add("form-row")
        let labelName;
        let requiredLabelName;


        // For inputs that dont need subrow container
        if (data.length == 1) {
            data.map((subdata) => {
                const inputName = subdata.name
                labelName = inputName.charAt(0).toUpperCase() + inputName.slice(1)
                if (subdata.required) {
                    requiredLabelName = labelName.concat("*")
                }

                // For text input that dont need sub row
                if (!subdata.needSubRow && subdata.type !== "other") {
                    formRow.innerHTML = `
                    <label for='${subdata.name}'>${subdata.required ? requiredLabelName : labelName}</label>
                    <input type='${subdata.type}' id='${subdata.name}' name='${subdata.name}' ${subdata.required ? "required" : ""} />
                `
                }
                else if (subdata.type == "other") {
                    formRow.innerHTML = `
                        <label for='${subdata.name}'>${subdata.required ? requiredLabelName : labelName}</label>
                    `
                    if (subdata.name == "priority") {
                        const radioInput = document.createElement("div")
                        radioInput.id = "radio-input"
                        priorityColor.map((color) => {
                            const colorClass = color.description
                            const colorId = color.number
                            const radioOption = document.createElement("div")
                            radioOption.classList.add("radio-option")
                            radioOption.innerHTML = `
                            <input type="radio" id="${colorClass.toLowerCase()}" name="priority" value=${colorId}>
                            <label for="${colorClass.toLowerCase()}">${colorClass}</label>
                            `
                            radioInput.appendChild(radioOption)
                            formRow.appendChild(radioInput)

                        })
                    }
                    else if (subdata.name == "project") {
                        const selectProject = document.createElement("select")
                        selectProject.name = subdata.name
                        selectProject.id = "project-name"
                        // Initial Options 
                        selectProject.innerHTML = `
                            <option value="default" selected>Default</option>
                            <option value="new">(Create New Project)</option>
                        `
                        formRow.appendChild(selectProject)
                    }


                }
            })
        }

        // If form input is in sub row container
        else {
            data.map((subdata) => {
                const formSubRow = document.createElement("div")
                formSubRow.classList.add("form-sub-row")

                const inputName = subdata.name;
                const noSpaceName = inputName.split("-").join("")

                labelName = inputName.split("-");
                labelName = labelName.map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join(" ")


                formSubRow.innerHTML = `
                 <label for="${subdata.name}">${labelName}</label>
                `
                // For due date input
                if (subdata.name === "due-date") {
                    const dueDateInput = document.createElement("input")
                    dueDateInput.type = "date"
                    dueDateInput.id = subdata.name
                    dueDateInput.name = noSpaceName
                    formSubRow.appendChild(dueDateInput)
                }
                else if (subdata.name === "due-time") {
                    const dueTimeSelect = document.createElement("select")
                    dueTimeSelect.id = subdata.name
                    dueTimeSelect.name = noSpaceName
                    formSubRow.appendChild(dueTimeSelect)
                }


                formRow.appendChild(formSubRow)
            })
        }

        // Append every input needed to the form
        form.appendChild(formRow)
    })
    // Then add container for submit button
    const formSubmitDiv = document.createElement("div")
    formSubmitDiv.classList.add("form-row")
    formSubmitDiv.id = "form-submit-div"
    formSubmitDiv.innerHTML = `
         <button type="submit" id="create-button" formmethod="dialog">Create Task</button>
        `
    form.appendChild(formSubmitDiv)


    // TEMPORARY : This is added before adding into dialog element
    const body = document.querySelector("#projects")
    inputSection.append(form)
    // body.insertAdjacentElement("beforebegin", inputSection)

    // Add custom validation for required input
    const requiredInput = inputSection.querySelectorAll("input[required]")
    requiredInput.forEach((input)=>
        input.addEventListener("invalid",(e)=>{
            e.preventDefault()
            createWarningLog(warningLog,input)
        })
    )

    // Add cancel button outside of form element
    const cancelButton = document.createElement("button")
    cancelButton.type ="button"
    cancelButton.id = "cancel-create"
    cancelButton.textContent = "Cancel"
    inputSection.appendChild(cancelButton)

    // Add to DOM Section (CSS Style will make it hidden)
    document.body.append(inputSection)
    return inputSection


}