import { useEffect } from "react";

/**
 * Custom hook to apply styles to the body element.
 * 
 * @param {Object} styles - An object where keys are CSS properties in camelCase 
 *                          and values are the CSS values as strings.
 */
export function useBodyStyle(styles) {
    useEffect(() => {
        // Save current styles to restore them later
        const originalStyles = {};
        for (const key in styles) {
            originalStyles[key] = document.body.style[key];
            document.body.style[key] = styles[key];
        }

        // Cleanup function to restore original styles
        return () => {
            for (const key in originalStyles) {
                document.body.style[key] = originalStyles[key];
            }
        };
    }, [styles]); // Re-apply when styles object changes
}
export default useBodyStyle;