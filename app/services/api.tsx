// Isolate the API requests to a single file

import axios, { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
    baseURL: 'https://6j531ckav7.execute-api.sa-east-1.amazonaws.com/prod',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YzM3ZWU0Ny1hNTY2LTRhYWYtOGRhMy1mN2E5Zjc2NjYwM2YiLCJpYXQiOjE3MjI2MzMwOTcsImV4cCI6MTcyMjY2OTA5N30.E5DtzqG-GV3zvXnKixLnbXYONgruABNegUsY-BCdWi0'
    }
}

interface UserSignInParams {
    email: string,
    password: string
}

interface UserCreateParams {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string
}

interface PathParams {
    auth: string,
    insurances: string
}

interface CreateInsuranceBody {
    policyNumber: string,
    policyHolderName: string,
    startDate: string,
    premiumAmount: number,
    status: string
}

const path: PathParams = {
    auth: 'api/auth',
    insurances: 'api/insurances'
}

export const axiosInstance = axios.create(axiosConfig)

axiosInstance.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
}, function (error) {
    console.log('Erro ao requisitar a API: ', error);
    return Promise.reject(error)
})

export const api = {
    auth: {
        signIn: async (body: UserSignInParams) => {
            console.log('params are: ', body);
            
            return axiosInstance.post(`${path.auth}/signin`, body)
        },
        signUp: async (body: UserCreateParams) => {
            return axiosInstance.post(`${path.auth}/signup`, body)

        }
    },
    insurances: {
        list: async () => {
            return axiosInstance.get(`${path.insurances}`)
        },
        find: async (id: number) => {
            return axiosInstance.get(`${path.insurances}/${id}`)
        },
        create: async (body: CreateInsuranceBody) => {
            return axiosInstance.post(`${path.insurances}`, body)
        },
        update: async (id: number, body: CreateInsuranceBody) => {
            return axiosInstance.post(`${path.insurances}/${id}`, body)
        },
        delete: async(id: number) => {
            return axiosInstance.delete(`${path.insurances}/${id}`)
        }
    }
} 