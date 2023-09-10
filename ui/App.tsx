import { useState } from 'react'

function App() {

    // Create a state variable to count upcoming rectangles
    const [count, setCount] = useState(0)

    /** Handles button clicks and sends data to the plugin’s backend */
    function handleClick() {

        // Increase the rectangle counter
        const newCount = count + 1

        /* 
        Ask React to change the value. Don’t increase the value inside the `setCount` callback, because the state won’t be updated before the next re-render. See: https://react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value
         */
        setCount(newCount)

        // Send the message to the backend
        parent.postMessage({ pluginMessage: { count: newCount } }, '*')
    }

    // Compose a label that is gramatically correct
    const label = count === 1
        ? <p>A rectangle has been created</p>
        : <p>{count} rectangles have been created</p>

    return <>

        {/* Render a button */}
        <button onClick={handleClick}>
            Create a rectangle
        </button >

        {/* Render a label only if some rectangles have been created */}
        {count > 0 ? label : null}
    </>
}

export default App