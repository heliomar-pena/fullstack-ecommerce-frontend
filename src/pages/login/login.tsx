import type z from "zod";
import { mclsx } from "../../utils/clsx";
import styles from "./login.module.css";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "./const/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, type LoginRequest } from "./api/login";
import { setToken } from "@/stores/authStore";

const clsx = mclsx(styles);

const LogIn = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const logIn = useMutation({
    mutationFn: (body: LoginRequest) => loginApi(body),
    onSuccess: async (data) => {
      setToken(data.accessToken);

      await qc.invalidateQueries({ queryKey: ["me"] });

      navigate("/");
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    logIn.mutate(data);
  };

  return (
    <div className={clsx("login")}>
      <div className={clsx("login__container")}>
        <h1 className={clsx("login__title")}>Log In</h1>
        <form
          id="login-form"
          className={clsx("login__formulary")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="username"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="login-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className={clsx("login__create-account")}>
              Don't have an account yet?{" "}
              <Link to="/auth/signup">Create Account</Link>
            </div>
            <Field orientation="horizontal">
              <Button form="login-form" type="submit">
                Log In
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
