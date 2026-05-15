import {type ChangeEvent, useEffect, useRef, useState} from "react";
import useAxios from "../Hooks/useAxios/IndexAx.js";
import {useFormData} from "../Hooks/FormNewHerrContext/HerrContext.js";
import {
    FileAudio,
    FileIcon,
    FileImage,
    FileText,
    FileVideo,
    Plus,
    Trash2,
    Upload,
    X,
} from 'lucide-react';
import axios from "axios";

type FileWithProgress = {
    id:string;
    file: File;
    progress: number;
    uploaded: boolean;
};

export default function FilesUpload(){
    const [files, setFiles] = useState<FileWithProgress[]>([]);
    const [uploading, setUploading] = useState(false);
    const {CreatePost, loading, status, response} = useAxios();
    const {formData, updateFormData} = useFormData(); //Access to context
    const inputRef = useRef<HTMLInputElement>(null);


    function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
        if(!e.target.files?.length){
            return;
        }
        const newFiles = Array.from(e.target.files).map((file)=>({
            file,
            progress: 0,
            uploaded: false,
            id: file.name,
        }));
        setFiles([...files, ...newFiles]);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

/*async function handleUpload() {
        if (files.length === 0 || uploading) {
            return;
        }
        setUploading(true);
        const uploadPromises = files.map(async (fileWithProgress) => {
            const formData = new FormData();
            formData.append('file', fileWithProgress.file);

            try{
                await axios.post('http://localhost:3000/upload', formData, {
                    onUploadProgress: (progressEvent) => {
                        const total = progressEvent.total || 1;
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / total || 1
                        );
                        setFiles((prevFiles) =>
                            prevFiles.map((file) =>
                                file.id === fileWithProgress.id
                                    ? {...file, progress}
                                    : file,
                            )
                        );
                    },
                });

                setFiles((prevFiles) =>
                    prevFiles.map((file) =>
                        file.id === fileWithProgress.id
                            ? {...file, uploaded: true}
                            : file,
                    ),
                );
            }catch (error){
                console.error('Error uploading file:', error);
            }
        });

        await Promise.all(uploadPromises);
        setUploading(false);
    }*/
//-------------------------------------------------------------------------------------------------------------------
        const handleUpload = async (e?: React.MouseEvent) => {
            if (e) e.preventDefault();
            if (files.length === 0 || uploading) return; //Avoid sending all form data without uploading file

            let lastUploadedId: number | null = null; // Cambiamos el array por una variable simple

            //const newIds: number[] = []; //Array to save images Ids

            for (const fileItem of files) {
                if (fileItem.uploaded) continue;

                // 1. Create FormData object
                const formDataBody = new FormData();

                // 2. Append all selected files
                // Note: The key "file" or "document" should match what your Django backend expects
                formDataBody.append("archivo", fileItem.file);
                formDataBody.append("nombre", fileItem.file.name);
                formDataBody.append("descripcion", "Uploaded by user");


                try {
                    // 3. Call CreatePost from IndexAx.js
                    // CreatePost (url, method, data, config)
                    const response = await CreatePost(
                        "/api/documents/",
                        "POST",
                        formDataBody,
                    {   // 4. config
                        onUploadProgress: (progressEvent) => {
                            const total = progressEvent.total || fileItem.file.size;
                            const percent = Math.round((progressEvent.loaded * 100) / total);
                            setFiles(prev => prev.map(f =>
                                f.id === fileItem.id ? { ...f, progress: percent } : f
                            ));
                        }
                    }
                );

                        //Extract id_imagen from Serializar.py backend
                    if (response && response.id_imagen) {
                        lastUploadedId = response.id_imagen; // Guardamos el ID más reciente
                       // newIds.push(response.id_imagen);
                    }
                    //Update progress bar
                    setFiles(prev =>prev.map(f =>
                    f.id === fileItem.id ? {...f, uploaded: true, progress: 100} : f
                    ));
                } catch (err) {
                    console.error("Upload failed of: ", fileItem.id, err);
                }
            }//Save in HerContext
            if (lastUploadedId) {
                updateFormData({
                    ...formData,
                    hesp_IdImagen: lastUploadedId, // Enviamos el entero, no un arreglo
                });

/*            if (newIds.length > 0) {
                updateFormData({
                    ...formData,
                    hesp_IdImagen: [...(formData.hesp_IdImagen || []), ...newIds],
                });*/
                console.log("Imagen guardada en Contexto:", lastUploadedId);
                //console.log("Images saved in Context", newIds);
            }
        };

//---------------------------------------------------------------------------------------------------------------------

function removeFile(id: string) {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
}

function handleClear(){
        setFiles([]);
}


    return (
        <div>
            <h3>Cargar archivos</h3>
            <div className="flex flex-col gap-2">
                <FileInput
                    inputRef={inputRef}
                    disabled={uploading}
                    onFileSelect={handleFileSelect}
                />
                <ActionButtons
                    disabled={files.length === 0 || uploading}
                    onUpload={handleUpload}
                    onClear={handleClear}/>
            </div>
            <FileList files={files} onRemove={removeFile} uploading={uploading}/>

    </div>
    );
}

//-------------------------------------------------------------------------------------
type FileInputProps = {
    inputRef: React.RefObject<HTMLInputElement | null>;
    disabled: boolean;
    onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
};

function FileInput({inputRef, disabled, onFileSelect}: FileInputProps) {

    return(
        <>
            <input
                type="file"
                ref={inputRef}
                onChange={onFileSelect}
                multiple
                className="hidden"
                id="file-upload"
                disabled={disabled}
            />
            <label htmlFor="file-upload" className="btn btn-orange">
                <Plus size={18} />
                Select Files
            </label>
        </>
        );
}

//----------------------------------------------------------------------------------------------
type ActionButtonsProps = {
    disabled: boolean;
    onUpload: () => void;
    onClear: () => void;
};

function ActionButtons({disabled, onUpload, onClear}: ActionButtonsProps) {
    return(
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onUpload}
                disabled={disabled}
                className="btn btn-orange"
            >
                <Upload size={18} />
                Upload
            </button>
            <button onClick={onClear} className="btn btn-orange"
            disabled={disabled}>
                <Trash2 size={18} />
                Eliminar todo
            </button>
        </div>
    )
}
//------------------------------------------------------------------------------------------------

type FileListProps ={
    files: FileWithProgress[];
    onRemove: (id: string) => void;
    uploading: boolean;
};

function FileList({files, onRemove, uploading}: FileListProps) {
    if (files.length === 0) {
        return
        <p>No files selected</p>;
        return null;
    }

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium">Files:</h3>
            <div className="flex flex-col gap-2">
                {files.map((file) => (
                    <FileItem
                        key={file.id}
                        file={file}
                        onRemove={onRemove}
                        uploading={uploading}
                    />
                ))}
            </div>
        </div>
    )
}
//----------------------------------------------------------------------------------
type FileItemProps = {
    file: FileWithProgress;
    onRemove: (id: string) => void;
    uploading: boolean;
};

function FileItem ({file, onRemove, uploading}: FileItemProps){
    const Icon = getFileIcon(file.file.type);

    return(
        <div className="space-y-2 rounded-md bg-gray-50 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon size={40} className="text-gray-500"/>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{file.file.name}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{formatFileSize(file.file.size)}</span>
                            <span>*</span>
                            <span>{file.file.type || 'Unknown type' }</span>
                        </div>
                    </div>
                </div>
                {!uploading &&(
                    <button onClick={()=> onRemove(file.id)} className="text-gray-500 hover:text-gray-700">
                        <X size={16} className={ "text-white"}/>
                    </button>
                )}
            </div>
            <div className="text-right text-xs">
                {file.uploaded ? 'Completed' : `${Math.round(file.progress)}%`}
            </div>
            <ProgressBar progress={file.progress}/>
        </div>
    );
}



//-----------------------------------------------------------------------------------------------

type ProgressBarProps = {
    progress: number;
};

function ProgressBar({progress}: ProgressBarProps){
    return(
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full"
                 style={{width: `${progress}%`}}>
            </div>
        </div>
    )
}


const getFileIcon = (mimeType: string) => {
    if(mimeType.startsWith('image/')) return FileImage;
    if (mimeType.startsWith('video/')) return FileVideo;
    if (mimeType.startsWith('audio/')) return FileAudio;
    if (mimeType === 'application/pdf') return FileText;
    return FileIcon;
};

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
