// import { React } from 'react';

import { useState } from "react";

const LoginForm = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // const name = e.target.name as keyof LoginForm;

        // setForm(previous => ({
        //     ..previous,
        //     [name]: value
        // }));
    }
}

export default LoginForm;

