import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import {FETCH_STATUS} from "./FetchStatus.js";

const useAxios = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);


    const axiosInstance = axios.create({
        baseURL: "http://10.1.1.14:8000"
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        });

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        });
    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        // Cleanup function to abort on unmount
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    const CreatePost = async (url, method = "POST", data, config = {}) => {
        setLoading(true);
        setError("");
        try {
            const result = await axiosInstance.request({
                url,
                method,
                data,
                ...config
            });
            setResponse(result.data); // Add to response the ID stored in BD
            setStatus(FETCH_STATUS.SUCCESS);
            return result.data; //Return id_image
        } catch (error) {
            const errorData = error.response ? error.response.data : error.message;
            setError(errorData);
            setStatus(FETCH_STATUS.ERROR);
            throw errorData;
        } finally {
            setLoading(false);
        }}



    const updatePost = async (url, data) => {
        setLoading(true);
        setError("");
        try {
            const result = await axiosInstance.put(url, data);
            setResponse(result.data);
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }

    }

    const fetchData = async (args) => {
        const { url, method = "GET", data = null, params = null } =
            typeof args === 'string' ? { url: args } : args;
        setLoading(true);
        setStatus(FETCH_STATUS.LOADING);
        setError("");
        controllerRef.current.abort();
        controllerRef.current = new AbortController();


        try {
            //check if url is an array or string
            if (Array.isArray(url)) {
                const requests = url.map(targetUrl =>
                    axiosInstance({
                        url: targetUrl,
                        method,
                        data,
                        params,
                        signal: controllerRef.current.signal
                    })
                );
                const results = await Promise.all(requests);
                const dataResult = results.map(result => result.data);
                setResponse(dataResult);
                return dataResult;

            }else {
                const result = await axiosInstance({
                    url,
                    method,
                    data,
                    params,
                    signal: controllerRef.current.signal
                });
                setResponse(result.data);
                setStatus(FETCH_STATUS.SUCCESS);
                return result.data;
            }

        } catch (error) {
            if(!axios.isCancel(error)){
                setError(error.response ? error.response.data : error.message);
                setStatus(FETCH_STATUS.ERROR);
                console.error('Request error', error.message)
            }
            return null;
        } finally {
            setLoading(false);
        }
    };
    return {
        response,
        loading,
        error,
        status,
        fetchData,
        CreatePost,
        updatePost,
    }
};
export default useAxios;