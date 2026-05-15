import {useFormState} from "react-dom";

export default function LoadingButton() {

    const {isLoading} = useFormState();

    return (

        <button type="submit" className="btn btn-orange" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
        </button>

    )
}