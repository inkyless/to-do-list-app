export const projectLists = ["default", "completed"]

export const createNewProject = (element) => {
    // Add completed section variable so that new project section will be created right above completed section
    const newOption = element.querySelector("#project-name") || document.querySelector("#project-name")
    newOption.addEventListener("change", (e) => handleCreateNew(e))

    // Trigger a change that when user choose (New) option on project input

    function createSelectDropdown(projects) {
        const dropDownSelect = document.createElement("select")
        dropDownSelect.name = "project"
        dropDownSelect.setAttribute("id", "project-name")
        dropDownSelect.innerHTML = projects
            .filter(project => project !== "completed")
            .map((project) => {
                const projectName = project.charAt(0).toUpperCase() + project.slice(1)
                return `<option value='${project.toLowerCase()}'>${projectName}</option>`
            }).join('')
        const createNewOption = document.createElement("option")
        createNewOption.value = "new"
        createNewOption.textContent = "(Create New Project)"
        dropDownSelect.appendChild(createNewOption)
        dropDownSelect.addEventListener("change", handleCreateNew)
        return dropDownSelect

    }

    function handleCreateNew(e) {
        const optionValue = e.target.value
        if (optionValue == "new") {
            const projectDiv = document.createElement("div")
            projectDiv.classList.add("new-project-input")

            const newProjectInput = document.createElement("input")
            newProjectInput.type = "text"
            newProjectInput.setAttribute("id", "project-name")
            newProjectInput.name = "project"

            const cancelCreateLink = document.createElement("a")
            cancelCreateLink.setAttribute("id", "cancel-create-project")
            cancelCreateLink.textContent = "Cancel?"
            cancelCreateLink.addEventListener("click", (event) => {
                event.preventDefault()
                projectDiv.replaceWith(createSelectDropdown(projectLists))
            }

            )

            projectDiv.appendChild(newProjectInput)
            projectDiv.appendChild(cancelCreateLink)
            e.target.replaceWith(projectDiv)
        }


    }
    return {createSelectDropdown}




}

