// Hooks/FormContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialize state from sessionStorage so a page refresh doesn't kill progress
    const [formData, setFormData] = useState(() => {
        const saved = sessionStorage.getItem("multistep_form");
        return saved ? JSON.parse(saved) : {};
    });

    // Save to sessionStorage whenever formData changes
    useEffect(() => {
        sessionStorage.setItem("multistep_form", JSON.stringify(formData));
    }, [formData]);

    const updateFormData = (newData: any) => {
        setFormData((prev: any) => ({ ...prev, ...newData }));
    };

    const clearForm = () => {
        setFormData({});
        sessionStorage.removeItem("multistep_form");
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData, clearForm }}>
    {children}
    </FormContext.Provider>
);
};

export const useFormData = () => useContext(FormContext);