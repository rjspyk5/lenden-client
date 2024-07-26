import { useEffect } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue="test" {...register("example")} />
          <input {...register("exampleRequired", { required: true })} />

          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};
