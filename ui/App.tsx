import { useState } from 'react'
import Button from './components/button/button'

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
        ? `A rectangle has been created`
        : `${count} rectangles have been created`

    return <>

        {/* Render a button */}
        <Button
            onClick={handleClick}
            className='button'
            style={{ width: '100%' }}
        >
            Create a rectagle
        </Button>

        {/* Render a label. Show it only if some rectangles have been created */}
        <p
            style={{
                fontSize: '0.6rem',
                marginTop: '0.5rem',
                color: 'var(--figma-color-text-tertiary)',
                textAlign: 'center'
            }}
        >
            {count > 0 ? label : null}
        </p>
    </>
}

export default App