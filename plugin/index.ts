// Handle the execution of the first command
if (figma.command == 'plugin-command')
    figma.closePlugin('The plugin command was executed')

// Configure the command that involves a UI
if (figma.command == 'plugin-command-with-ui') {

    // Present a UI, providing it with Figma CSS color variables
    figma.showUI(__html__, {
        themeColors: true,
        width: 300,
        height: 62
    })

    // Create a variable to store the rectangles that will be created
    const rectangles: RectangleNode[] = []

    /* Handle the message from the UI, being aware that it will be an object with the single `count` property */
    figma.ui.onmessage = (message: { count: number }) => {

        // Retrieve the number associated with the rectangle we’re about to create
        const { count } = message

        /* Initially, the UI contains only a button. So if we are creating the first rectangle, we should resize the UI to make room for the label that keeps track on the number of rectangles created */
        figma.ui.resize(300, 88)

        // Create a rectangle on the canvas
        const rectangle = figma.createRectangle()

        // Set the rectangle name, providing the index number
        rectangle.name = 'rectangle-' + count

        // If it’s not the first created rectangle, add a margin from the last one
        if (rectangles.length) {

            // Find the last rectangle
            const lastRectangle = rectangles.slice(-1)[0]

            // Add a margin
            rectangle.x = lastRectangle.x + lastRectangle.width + 100
        }

        // Add the newly created rectangle to the list of created rectangles
        rectangles.push(rectangle)

        // Move the viewport to the rectangle
        figma.viewport.scrollAndZoomIntoView([rectangle])

        // Select the rectangle
        figma.currentPage.selection = [rectangle]
    }
}