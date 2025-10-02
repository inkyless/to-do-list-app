
// Create dynamic options for due time form
export const handleDateTime = (element,interval = 30) => {
    const selectTime = element.querySelector("#due-time")
    if (selectTime) {
        // Loop hours (00-23)
        for (let h = 0; h < 24; h++) {
            // Loop minutes (00-59), for now make 30 minute interval
            for (let m = 0; m < 60; m += interval) {
                // For hour and minute make it formatted like hh:mm
                const hour = String(h).padStart(2, "0")
                const minute = String(m).padStart(2, "0")
                const time = `${hour}:${minute}`

                // Then crete option element every loop
                const timeOption = document.createElement("option")
                timeOption.value = time
                timeOption.textContent = time
                timeOption.classList.add("time-options")

                const defaultTime = "12:30"
                if (defaultTime == time) timeOption.selected = true;

                selectTime.appendChild(timeOption)

            }
        }
    } else{
        console.error("Element Select #due-time is empty")
    }


}
