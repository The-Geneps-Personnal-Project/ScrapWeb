import axios, { AxiosError, AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

export async function getFromApi<T>(endpoint: string): Promise<T> {
    const url = `${baseUrl}/${endpoint}`;

    try {
        const response: AxiosResponse<T> = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch from API:", error);
        throw error as AxiosError;
    }
}

export async function postToApi<T>(
    endpoint: string,
    body?: Record<string, any>,
    params?: Record<string, any>
): Promise<T> {
    const url = `${baseUrl}/${endpoint}`;

    try {
        const response: AxiosResponse<T> = await axios.post(url, body, { params });
        return response.data;
    } catch (error) {
        console.error("Failed to post to API:", error);
        throw error as AxiosError;
    }
}

export async function putToApi<T>(
    endpoint: string,
    body?: Record<string, any>,
    params?: Record<string, any>
): Promise<T> {
    const url = `${baseUrl}/${endpoint}`;

    try {
        const response: AxiosResponse<T> = await axios.put(url, body, { params });
        return response.data;
    } catch (error) {
        console.error("Failed to put to API:", error);
        throw error as AxiosError;
    }
}

export async function deleteFromApi<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = `${baseUrl}/${endpoint}`;

    try {
        const response: AxiosResponse<T> = await axios.delete(url, { params });
        return response.data as T;
    } catch (error) {
        console.error("Failed to delete from API:", error);
        throw error as AxiosError;
    }
}
