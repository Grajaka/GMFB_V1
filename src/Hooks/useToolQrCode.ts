import { useMemo } from 'react';

export default function useToolQrCode(toolData: any) {
    const qrCodeValue = useMemo(() => {
        if (!toolData) return "";
        return [
            `Codigo herramental: ${toolData.hesp_CodigoHerramental || ""}`,
            `código alterno: ${toolData.hesp_CodigoAlterno || ""}`,
            `CantHerramental: ${toolData.hesp_CantHerramental || ""}`,
            `Maq. principal: ${toolData.nombre_maquina_pp || ""}`,
            `maq. Opcional: ${toolData.nombre_maquina_opc || ""}`,
            `DieSet: ${toolData.codigo_dieset || ""}`,
            `Ubicación Molde: Piso ${toolData.numero_piso || ""}, Estante ${toolData.nombre_estanteria || ""}, Fila ${toolData.numero_fila || ""}, Celda ${toolData.numero_columna || ""}, Posición ${toolData.numero_posicion || ""}`,
            `EstadoMolde: ${toolData.nombre_estado_Herr || ""}`,
            `hesp_Descripcion1: ${toolData.hesp_Descripcion1 || ""}`
        ].join("\n");
    }, [toolData]);

    return qrCodeValue;
}
