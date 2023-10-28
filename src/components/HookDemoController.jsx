import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";

// Definujeme Yup schéma pro validaci polí formuláře
const schema = yup.object().shape({
    username: yup
        .string()
        .required("Toto pole je povinné")
        .min(3, "Uživatelské jméno musí mít alespoň 3 znaky")
        .max(25, "Uživatelské jméno nesmí mít více než 25 znaků"),
    email: yup
        .string()
        .email("Neplatná emailová adresa")
        .required("Toto pole je povinné"),
    password: yup
        .string()
        .required("Toto pole je povinné")
        .min(8, "Heslo musí mít alespoň 8 znaků")
        .max(25, "Heslo nesmí mít více než 25 znaků"),
});

const HookDemoController = () => {
    // Použijeme useForm funkci z React Hook Form, která přijímá Yup schéma jako resolver
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    // Definujeme funkci pro odeslání formuláře
    const onSubmit = (data) => {
        // Zde bys mohl poslat data na server nebo provést jinou akci
        console.log(JSON.stringify(data, null, 2));
    };

    return (
        // Použijeme komponentu Form z react-bootstrap pro vytvoření formuláře
        <Form onSubmit={handleSubmit(onSubmit)}>
            {/*{Použijeme komponentu Controller z React Hook Form pro ovládání polí formuláře*/}
            <Controller
                control={control}
                name="username"
                render={({ field }) => (
                    // Použijeme komponentu Form.Control z react-bootstrap pro vytvoření polí formuláře
                    <Form.Control
                        {...field}
                        type="text"
                        placeholder="Zadejte uživatelské jméno"
                        isInvalid={!!errors.username}
                    />
                )}
            />

            {/* Použijeme komponentu Form.Control.Feedback z react-bootstrap pro zobrazení chybových zpráv*/}
            {errors.username && (
                <Form.Control.Feedback type="invalid">
                    {errors.username.message}
                </Form.Control.Feedback>
            )}

            <Controller
                control={control}
                name="email"
                render={({ field }) => (
                    <Form.Control
                        {...field}
                        type="email"
                        placeholder="Zadejte email"
                        isInvalid={!!errors.email}
                    />
                )}
            />
            {errors.email && (
                <Form.Control.Feedback type="invalid">
                    {errors.email.message}
                </Form.Control.Feedback>
            )}

            <Controller
                control={control}
                name="password"
                render={({ field }) => (
                    <Form.Control
                        {...field}
                        type="password"
                        placeholder="Zadejte heslo"
                        isInvalid={!!errors.password}
                    />
                )}
            />
            {errors.password && (
                <Form.Control.Feedback type="invalid">
                    {errors.password.message}
                </Form.Control.Feedback>
            )}

            {/*Použijeme komponentu Button z react-bootstrap pro odeslání formuláře*/}
            <Button type="submit">Registrovat se</Button>
        </Form>
    );
};

export default HookDemoController;
