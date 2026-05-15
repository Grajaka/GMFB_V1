// Hooks/CreateHerrContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CreateHerrContext = createContext<any>(null);

//Wrapper component. Any component inside Provider can access to the context data
export const FormProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialize state from sessionStorage so a page refresh doesn't kill progress
    const [formData, setFormData] = useState(() => { //Initialize formData
        const saved = sessionStorage.getItem("multistep_form");//When the component mounts, it checks the browser's `sessionStorage` for an item named `"multistep_form"`
        return saved ? JSON.parse(saved) : {};
    }); //If data exists (e.g., the user refreshed the page halfway through the form),
    // it parses and loads that data into the state
    //If no data exists, it defaults to an empty object `{}`.


    // Save to sessionStorage whenever formData changes
    useEffect(() => {
        sessionStorage.setItem("multistep_form", JSON.stringify(formData));//With useEffect we monitor the formData state every time the user types something, this effect triggers and overwrites the "multistep_form" key in session storage
    }, [formData]); //Dependency array ensures this runs only when 'formData' changes

    const updateFormData = (newData: any) => {
        setFormData((prev: any) => ({ ...prev, ...newData }));//Takes new form inputs and merges them into the existing state (using the spread operator `...prev`).

    };

    //- Resets the state back to an empty object and permanently deletes the saved progress from `sessionStorage`.
    // This is usually called when the form is successfully submitted or cancelled
    const clearForm = () => {
        setFormData({});
        sessionStorage.removeItem("multistep_form");
    };

    return (
        <CreateHerrContext.Provider value={{ formData, updateFormData, clearForm }}>
    {children}
    </CreateHerrContext.Provider>
);
};

//Instead of requiring every file to import both and , this exports a clean, reusable custom hook named "useFormData".
// Any component can simply call `const { formData, updateFormData } = useFormData();` to instantly interact with the multi-step form's data. `useContext``CreateContext``useFormData`

export const useFormData = () => useContext(CreateHerrContext);