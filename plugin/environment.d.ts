/* 
Declare environment variable types.

Since Node.js environment variables are not available in the Figma plugin environment, create a constant called `process` instead of extending the namespace of existing Node.js environment variables, as they do not exist here.
*/
declare global {
    const process: {
        env: {
            EXAMPLE_API_KEY?: string
        }
    }
}

// Convert the file into a module by adding an empty export statement
export { }