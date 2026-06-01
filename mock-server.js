// mock-server.js
// -----------------------------------------------------------------------------
// This script runs a pure Node.js HTTP server to mock the backend endpoints
// required for the mold creation (FormNewMold) integration testing.
// No extra dependencies (like Express) are required. Run using: `node mock-server.js`
// -----------------------------------------------------------------------------

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname since we are in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the port to listen on.
// The frontend calls http://localhost:8000 (as configured in IndexAx.js).
const PORT = 8000;

// ==========================================
// Mock Database / Stub Data
// ==========================================

// Mock data returned for General Info steps (CreateGnrl.tsx)
const mockTipoHerramental = [
    { th_IdTipoHerramental: 1, th_NombreTipoHerramental: "Troquel (TR)", th_CodigoTipoHerramental: "TR" },
    { th_IdTipoHerramental: 2, th_NombreTipoHerramental: "Molde Inyección (MI)", th_CodigoTipoHerramental: "MI" },
    { th_IdTipoHerramental: 3, th_NombreTipoHerramental: "Dispositivo Control (DC)", th_CodigoTipoHerramental: "DC" }
];

const mockFamilias = [
    { fa_IdFamilia: 10, fa_NombreFamilia: "Hexagonal", fa_CodigoFamilia: "HX" },
    { fa_IdFamilia: 20, fa_NombreFamilia: "Cuadrado", fa_CodigoFamilia: "CU" },
    { fa_IdFamilia: 30, fa_NombreFamilia: "Rectangular", fa_CodigoFamilia: "RE" }
];

const mockHerramentales = [
    { he_IdHerramental: 100, he_NombreHerramental: "Molde Forja Superior", he_CodigoHerramental: "MFS" },
    { he_IdHerramental: 200, he_NombreHerramental: "Molde Forja Inferior", he_CodigoHerramental: "MFI" },
    { he_IdHerramental: 300, he_NombreHerramental: "Estampa de Corte", he_CodigoHerramental: "EC" }
];

// Mock data returned for Location steps (CreateUbic.tsx)
const mockMaquinas = [
    { id: 1, numero: "84" },
    { id: 2, numero: "25" },
    { id: 3, numero: "28" }
];

const mockActividades = [
    { id: 15, nombre: "Pulir" },
    { id: 25, nombre: "Soldar" },
    { id: 35, nombre: "Perforar" }
];

const mockEstanterias = [
    { es_IdEstanteria: 50, es_NombreEstanteria: "ESTANTE GENERAL A" },
    { es_IdEstanteria: 60, es_NombreEstanteria: "ESTANTE GENERAL B" }
];

const mockPisos = [
    { pi_NumeroPiso: 1, pi_DescripcionPiso: "Nivel 1 - Suelo" },
    { pi_NumeroPiso: 2, pi_DescripcionPiso: "Nivel 2 - Medio" },
    { pi_NumeroPiso: 3, pi_DescripcionPiso: "Nivel 3 - Alto" }
];

const mockEstados = [
    { eh_IdEstadoHerr: 1, eh_NombreEstado: "Disponible para uso" },
    { eh_IdEstadoHerr: 2, eh_NombreEstado: "En mantenimiento" },
    { eh_IdEstadoHerr: 3, eh_NombreEstado: "Fuera de servicio" }
];

const mockDiesets = [
    { di_IdDieSet: 1, di_CodigoDieSet: "1300" },
    { di_IdDieSet: 2, di_CodigoDieSet: "1500" },
    { di_IdDieSet: 3, di_CodigoDieSet: "1600" }
];

// -----------------------------------------------------------
// Mock record that VisualMold will fetch (id = 1 in this example)
// -----------------------------------------------------------
const mockHerramentalEspecifico = [
    {
        hesp_IdHerramentalEspecifico: 1,   // <-- matches the URL /api/herramental_especifico/1/
        hesp_IdFamilia: "HX",              // any family code that exists in familias.schema.json
        hesp_IdImagen: 101,                // ID of the mock document that holds the picture
        hesp_CodigoHerramental: "HX-001",
        hesp_Descripcion1: "Mock tool for testing",
        hesp_CodigoAlterno: "NB-10",
        hesp_CantHerramental: "1",
        nombre_maquina_pp: "84",
        nombre_maquina_opc: "25",
        codigo_dieset: "1500",
        numero_piso: "1",
        nombre_estanteria: "A",
        numero_fila: "1",
        numero_columna: "1",
        numero_posicion: "1",
        nombre_estado_Herr: "Disponible para uso",
        nombre_herramental: "Molde",
        nombre_tipo_herramental: "Troquel (TR)",
        nombre_familia: "HEXAGONAL",
        nombre_actividad: "Pulir",
        hesp_A: "52.1",
        hesp_B: "47.1",
        hesp_C: "44.1",
        hesp_D: "40.1",
        hesp_E: "30.1",
        hesp_F: "50.1",
        hesp_G: "20.1",
        hesp_H: "25.1",
        hesp_I: "55.1",
        hesp_J: "60.1",
        hesp_L: "70.1",
        hesp_P: "90.1",
        hesp_Q: "95.1",
        hesp_T: "110.1",
        // … you can add any extra fields that your UI reads
    },
    {
        hesp_IdHerramentalEspecifico: 2,   // <-- matches the URL /api/herramental_especifico/1/
        hesp_IdFamilia: "CU",              // any family code that exists in familias.schema.json
        hesp_IdImagen: 102,                // ID of the mock document that holds the picture
        hesp_CodigoHerramental: "CU-001",
        hesp_Descripcion1: "Molde para tuercas hexagonales",
        hesp_CodigoAlterno: "NB-30",
        hesp_CantHerramental: "1",
        nombre_maquina_pp: "25",
        nombre_maquina_opc: "28",
        codigo_dieset: "1500",
        numero_piso: "2",
        nombre_estanteria: "B",
        numero_fila: "1",
        numero_columna: "1",
        numero_posicion: "1",
        nombre_estado_Herr: "En mantenimiento",
        nombre_herramental: "Molde",
        nombre_tipo_herramental: "Troquel (TR)",
        nombre_familia: "CUADRADO",
        nombre_actividad: "Soldar",
        hesp_A: "52.1",
        hesp_B: "47.1",
        hesp_C: "44.1",
        hesp_D: "40.1",
        hesp_E: "30.1",
        hesp_F: "50.1",
        hesp_G: "20.1",
        hesp_H: "25.1",
        hesp_I: "55.1",
        hesp_J: "60.1",
        hesp_L: "70.1",
        hesp_P: "90.1",
        hesp_Q: "95.1",
        hesp_T: "110.1",
        // … you can add any extra fields that your UI reads
    },
];

const mockDocuments = [
    {
        id: 101,                                    // matches hesp_IdImagen above
        archivo: "media/imagenes/sample-tool.jpg", // path *inside* the server’s media folder
        // other fields (nombre, tipo, tamaño…) can be added if you wish
    },
    {
        id: 102,                                    // matches hesp_IdImagen above
        archivo: "media/imagenes/sample-tool2.jpg", // path *inside* the server’s media folder
        // other fields (nombre, tipo, tamaño…) can be added if you wish
    },
];

// ==========================================
// Main Request Handler
// ==========================================
const server = http.createServer((req, res) => {
    // 1. Set CORS Headers (Required for local React app running on a different port like 5173)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 2. Handle CORS Pre-flight Options Requests
    // The browser automatically sends an OPTIONS request before POST/PUT requests.
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // 204 No Content is the standard response for pre-flights
        res.end();
        return;
    }

    // Parse the path to match endpoints. Clean trailing slashes or queries.
    const urlParts = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = urlParts.pathname;

    console.log(`[MOCK SERVER] Incoming: ${req.method} ${pathname}`);

    // Intercept image schema requests and serve from a local directory
    if (pathname.startsWith('/media/esquemas/')) {
        const decodedPath = decodeURIComponent(pathname);
        const filename = decodedPath.split('/').pop();
        const filePath = path.join(__dirname, 'media', 'esquemas', filename);

        console.log(`[MOCK SERVER] Serving scheme file from local path: ${filePath}`);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(`[MOCK SERVER] Media file not found: ${filePath}. Serving status 404.`);
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `File ${filename} not found locally under /media/esquemas/ directory.` }));
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(content);
            }
        });
        return;
    }
    if (pathname.startsWith('/media/imagenes/')) {
        const filename = decodeURIComponent(pathname.split('/').pop());
        const filePath = path.join(__dirname, 'media', 'imagenes', filename);
        console.log(`[MOCK SERVER] Serving tool image: ${filePath}`);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.log(`[MOCK SERVER] Image not found: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Image ${filename} not found` }));
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(content);
            }
        });
        return;
    }

    // Helper utility to write JSON responses
    const sendJSON = (statusCode, data) => {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    };

    // ==========================================
    // GET Route Handlers
    // ==========================================
    if (req.method === 'GET') {
        switch (pathname) {
            // General Info endpoints
            case '/api/tipo_herramental/':
            case '/api/tipo_herramental':
                return sendJSON(200, mockTipoHerramental);

            case '/api/familia/':
            case '/api/familia':
                return sendJSON(200, mockFamilias);

            case '/api/herramental/':
            case '/api/herramental':
                return sendJSON(200, mockHerramentales);

            // Location Step endpoints
            case '/api/maquinas/':
            case '/api/maquinas':
                return sendJSON(200, mockMaquinas);

            case '/api/actividades/':
            case '/api/actividades':
                return sendJSON(200, mockActividades);

            case '/api/estanterias/':
            case '/api/estanterias':
                return sendJSON(200, mockEstanterias);

            case '/api/pisos/':
            case '/api/pisos':
                return sendJSON(200, mockPisos);

            case '/api/estado_herramental/':
            case '/api/estado_herramental':
                return sendJSON(200, mockEstados);

            case '/api/diesets/':
            case '/api/diesets':
                return sendJSON(200, mockDiesets);

            case '/api/herramental_especifico/':
            case '/api/herramental_especifico':
                return sendJSON(200, mockHerramentalEspecifico);

            // VisualMold: fetch a single herramental_especifico by id
            case pathname.match(/^\/api\/herramental_especifico\/\d+\/?$/)?.input:
                // extract the numeric id from the URL
                const hId = Number(pathname.split('/')[3]); // /api/herramental_especifico/<id>/
                const foundTool = mockHerramentalEspecifico.find(t => t.hesp_IdHerramentalEspecifico === hId);
                return sendJSON(200, foundTool || {});
            // VisualMold: fetch a document (image) by id
            case pathname.match(/^\/api\/documents\/\d+\/?$/)?.input:
                const dId = Number(pathname.split('/')[3]); // /api/documents/<id>/
                const foundDoc = mockDocuments.find(d => d.id === dId);
                return sendJSON(200, foundDoc || {});

            default:
                console.log(`[MOCK SERVER] Warning: 404 Route Not Found for ${pathname}`);
                return sendJSON(404, { error: `Endpoint ${pathname} not found in mock server.` });
        }
    }

    // ==========================================
    // POST Route Handlers (Capturing forms data)
    // ==========================================
    if (req.method === 'POST') {
        let body = '';

        // Read data chunk by chunk as it streams from the client
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            let parsedData = {};
            try {
                if (body) {
                    parsedData = JSON.parse(body);
                }
            } catch (err) {
                console.error('[MOCK SERVER] Error parsing JSON body:', err.message);
            }

            console.log('[MOCK SERVER] Submitted Body Payload:', JSON.stringify(parsedData, null, 2));

            switch (pathname) {
                // First POST logic (Create locations: CreateUbic.tsx)
                case '/api/ubicaciones/':
                case '/api/ubicaciones':
                    // Simulate generating a unique location ID
                    const mockLocationResponse = {
                        uh_IdUbicacionHerr: Math.floor(Math.random() * 1000) + 1,
                        message: "Mock Location Created Successfully!"
                    };
                    console.log('[MOCK SERVER] Responding to /api/ubicaciones/ with ID:', mockLocationResponse.uh_IdUbicacionHerr);
                    return sendJSON(201, mockLocationResponse);

                // Final mold creation post endpoint (CreateUbic.tsx)
                case '/api/herramental_especifico/':
                case '/api/herramental_especifico':
                    // Simulate saving the combined wizard state from context & returning the final Record ID
                    const mockMoldResponse = {
                        hesp_IdHerramentalEspecifico: Math.floor(Math.random() * 5000) + 1000,
                        message: "Mock Mold/Herramental Especifico created!"
                    };
                    console.log('[MOCK SERVER] Responding with new Mold Record ID:', mockMoldResponse.hesp_IdHerramentalEspecifico);
                    return sendJSON(201, mockMoldResponse);

                default:
                    console.log(`[MOCK SERVER] Warning: 404 POST Endpoint not matched for ${pathname}`);
                    return sendJSON(404, { error: `POST Endpoint ${pathname} not supported.` });
            }
        });
        return;
    }

    // Fallback for other HTTP verbs (PUT, DELETE, etc.)
    return sendJSON(405, { error: 'HTTP Method not allowed on this mock server.' });
});

// Start listening for traffic
server.listen(PORT, '0.0.0.0', () => {
    console.log('==================================================');
    console.log(`[MOCK SERVER] Listening on http://localhost:${PORT}`);
    console.log('==================================================');
});
