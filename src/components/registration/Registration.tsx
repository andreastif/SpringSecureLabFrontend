import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

import {
    BsEnvelope,
    BsEye,
    BsEyeSlash,
    BsLock,
    BsPerson,
    BsPersonAdd,
} from "react-icons/bs";

import {FormEvent, useContext, useEffect, useState} from "react";

import isEmail from "validator/lib/isEmail";

import {useNavigate} from "react-router-dom";
import {FormType} from "../../types/FormType.ts";
import {post} from "../../hooks/useAxios.ts";
import {useRegistrationAuthProps} from "../../hooks/useRegistrationAuthProps.ts";
import {AxiosError, isAxiosError} from "axios";

export default function Registration() {
    const props = useRegistrationAuthProps();

    const [form, setForm] = useState<FormType>({
        confirmPassword: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        username: ""
    })
    const [registrationComplete, setRegistrationComplete] = useState<boolean>(false)
    const [registrationFailed, setRegistrationFailed] = useState<boolean>(false)


    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = {
            username: form.username,
            email: form.email,
            password: form.password,
            firstname: form.firstname,
            lastname: form.lastname,
            registeredToClientId: import.meta.env.VITE_REGISTERED_TO_CLIENT_ID,
        }

        try {
            const res = await post("members/login", userData);
            if (res.status === 201) {
                setRegistrationComplete(true);
                setRegistrationFailed(false);
                navigate("/register/success")
            } else {
                setRegistrationComplete(false);
                setRegistrationFailed(true);
                navigate("/register/failure")
            }
        } catch (err: any) {
            props.setErrorMessage(err.toString())
            navigate("*")
        }

        //reset form
        setForm({
            confirmPassword: "",
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            username: ""
        })




    }
}