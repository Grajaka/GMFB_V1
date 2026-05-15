//Col 0-30
//Row 0-7
//Pos 0-21
import React, {forwardRef} from 'react';
interface DropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    length: number;
    start?: number;
}
const DropDown= forwardRef <HTMLSelectElement, DropDownProps>(
    ({length, start =0, ...props },ref) => {

    const options = Array.from({length}, (_, i) => i + start);

    return (
        <select
            ref={ref}
            {...props}>
            <option value = "" hidden>-----</option>
            {options.map((option) => (
                <option key={option}
                        value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}
);

// 3. Set a display name (useful for debugging in React DevTools with forwardRef)
DropDown.displayName = "DropDown";

export default DropDown;