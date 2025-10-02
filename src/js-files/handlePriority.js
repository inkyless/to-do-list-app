

// Based on priority chosen, highlight color will differ
// 1 (Red), 2 (Yellow), 3 (Blue)

export const priorityColor = [
    {
        number: "1",
        description: "Urgent",
        colorData: "red",
        hexCode: "#D07067",
        borderColor: "#A53E2A",
        backgroundColor: "#E1A39D",
    },
    {
        number: "2",
        description: "Important",
        colorData: "yellow",
        hexCode: "#E0CD71",
        borderColor: "#CB741E",
        backgroundColor: "#EBDFA4",

    },
    {
        number: "3",
        description: "Optional",
        colorData: "blue",
        hexCode: "#8EC8EC",
        borderColor: "#1E3962",
        backgroundColor: "#B6DBF3",
    },
]


export const handlePriority = (number, colors) => {
    const prio = colors.find(p => p.number == number)
    if (prio) {
        const cardColor = prio.backgroundColor || prio.colorData
        const noteColor = prio.hexCode || prio.colorData
        return {
            cardStyle: `
                    background-color: ${cardColor};
                    border: 0.1rem solid ${prio.borderColor};
                `,
            noteStyle: `
                    background-color: ${noteColor};
                `,
            hoverStyle: `
                    background-color: ${noteColor};
                `,
            priorityDescription: `${prio.description}`

        }

    }

}