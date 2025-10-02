import { handlePriority, priorityColor } from "../handlePriority"


export const createWarningLog = (errorSpan,ele, message="")=>{
    const warningMessage = ele.validationMessage
    const warningBoolean = ele.validity
    const fieldName = ele.name.charAt(0).toUpperCase() + ele.name.slice(1)
    console.log(warningBoolean)

    if(warningBoolean.valueMissing){
        message =`Please fill the required field(s) : ${fieldName}`
        errorSpan.textContent = message

    } else{
        errorSpan.textContent = warningMessage

    }

    ele.style.border = "2px solid red"
}