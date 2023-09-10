// Handle the execution of the command that works without any UI
if (figma.command == 'plugin-command')
    figma.closePlugin('The plugin command was executed')

// Configure the command that presents a UI
if (figma.command == 'plugin-command-with-ui') {

    // Present a UI, providing it with Figma CSS color variables
    figma.showUI(__html__, {
        themeColors: true,
        width: 400,
        height: 100
    })

    // Create a variable to store the rectangles that will be created
    const rectangles: RectangleNode[] = []

    // Handle the message from the UI
    figma.ui.onmessage = (message: { count: number }) => {

        // Get the number of a new rectangle
        const { count } = message

        // Create a rectangle
        const rectangle = figma.createRectangle()

        // Set the rectangle name
        rectangle.name = 'rectangle-' + count

        // If it’s not the first created rectangle, add a margin from the last one
        if (rectangles.length) {

            // Find the last rectangle
            const lastRectangle = rectangles.slice(-1)[0]

            // Add a margin
            rectangle.x = lastRectangle.x + lastRectangle.width + 100
        }

        // Add the newly created rectangle to the list
        rectangles.push(rectangle)

        // Move the viewport to the rectangle
        figma.viewport.scrollAndZoomIntoView([rectangle])

        // Select the rectangle
        figma.currentPage.selection = [rectangle]
    }
}