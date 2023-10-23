import {useForm} from "react-hook-form"

const HookDemoRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
            firstName: "Jeník",
            lastName: "Kolozub",
            confirm: true
        }
     });

    const handleData = (data) => {
        console.log(data);
    }
    
    return (
        <form onSubmit={handleSubmit(handleData)}>
            <div>
                <input {...register("firstName")} />
            </div>
            <div>
                <input {...register("lastName", 
                    {
                        required: "Není vyplněno", 
                        minLength: {
                            message: "Alespoň dva znaky", 
                            value: 2
                        }
                    })} />
                {console.log(errors)}
                {errors.lastName && 
                    <div>
                        {errors.lastName.type}: {errors.lastName.message}   
                    </div>
                }
            </div>
            <div>
                <label>Souhlas s odběrem novinek:
                    <input type="checkbox" {...register("confirm")} />
                </label>
            </div>
            <div>
                <input type="submit" value="odeslat" />
            </div>
            
        </form>
    );
}

export default HookDemoRegister;