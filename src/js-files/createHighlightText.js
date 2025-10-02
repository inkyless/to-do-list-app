import { handlePriority, priorityColor } from "./handlePriority"


export const createHighlightText = (element, priority) => {
    const heading = element.querySelector("#task-detail-title")
    const priorityText = element.querySelector("#task-detail-priority")

    const codeColor = handlePriority(priority, priorityColor)
    const highlightStyle = document.createElement("style")
    if (heading) {
        let titleHighlight;
        highlightStyle.textContent = `
            #${heading.id}::before{
                ${codeColor.noteStyle}
                content : "";
                position:absolute;
                width : calc(100% + 4px);
                height : 20%;
                left : -2px;
                bottom : 0;
                z-index:-1;
        }
    `
        titleHighlight = highlightStyle
        document.head.appendChild(titleHighlight)

    }

    if (priorityText) {
        let priorityHighlight;
        const spanText = priorityText.querySelector("span")
        spanText.style = `
            ${codeColor.noteStyle}
            color : #FEF;
            position:relative;
            width : calc(100% + 10px);
         }
        `
        priorityHighlight = highlightStyle

        document.head.appendChild(priorityHighlight)

    }

}

