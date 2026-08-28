import type { CSSProperties, MouseEventHandler } from 'react'
import styles from './button.module.scss'

/**
 * Represents the properties of a button component
 */
export interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children?: string,
    className?: string,
    style?: CSSProperties
}

/**
 * A button component inspired by native Figma buttons
 * @param props A list of button properties
 * @returns The button component
 */
export default function Button(props: ButtonProps) {

    // Append the custom class only when one is given
    const className = props.className
        ? styles.button + ' ' + props.className
        : styles.button

    return <button
        onClick={props.onClick}
        className={className}
        style={props.style}
    >
        {props.children ?? 'Button'}
    </button>
}