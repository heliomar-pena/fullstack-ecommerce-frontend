import type z from "zod";
import { mclsx } from "../../utils/clsx";
import styles from "./signup.module.css";
import { Controller, useForm } from "react-hook-form";
import { signupSchema } from "./const/signupSchema";
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
import { useMutation } from "@tanstack/react-query";
import type { LoginRequest } from "../login/api/login";
import { signupApi } from "./api/signup";
import { toast } from "sonner";

const clsx = mclsx(styles);

const Signup = () => {
  const navigate = useNavigate();

  const signUp = useMutation({
    mutationFn: (body: LoginRequest) => signupApi(body),
    onSuccess: () => {
      toast.success(
        "Account created successfully!. You'll be redirected to Log In screen.",
      );

      navigate("/auth/login");
    },
  });

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    signUp.mutate(data);
  };

  return (
    <div className={clsx("signup")}>
      <div className={clsx("signup__container")}>
        <h1 className={clsx("signup__title")}>Sign Up</h1>
        <form
          className={clsx("signup__formulary")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="signup-email"
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
                  <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="signup-password"
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
            <div className={clsx("signup__create-account")}>
              <Link to="/auth/login">Go to Log In</Link>
            </div>
            <Field orientation="horizontal">
              <Button type="submit">Sign Up</Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default Signup;
