// Define the shape of one family entry
export interface FamilySchemaItem {
    Familia: string;
    CodFamilia: string;
    EsquemaFamilia: string;
    Literals: string[];
}

// Define the schema as an object where keys are strings and values are FamilySchemaItem
export interface FamiliasSchema {
    [key: string]: FamilySchemaItem;
    nan: FamilySchemaItem; // ← explicitly declare 'nan' always exists
}