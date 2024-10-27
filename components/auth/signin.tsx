"use client";

import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import { redirect } from "next/navigation";
import { SCHEMA_YUP_SIGN_IN } from "constants/yup/Schema";
import { AuthForm } from "constants/types/custom";
import AuthInput from "./AuthInput";
import SignInUpButton from "./SignInUpButton";
import OAuthSet from "./OAuthSet";
import HasAccount from "./hasAccount";
import AuthLogo from "./AuthLogo";

export default function SignIn({ view, setView }) {
  const supabase = createBrowserSupabaseClient();

  const signinMutation = useMutation({
    mutationFn: async ({ email, password }: AuthForm) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (data) redirect("/");
      if (error) alert(error.message);
    },
  });

  return (
    <div className="flex flex-col items-center max-w-84">
      <AuthLogo />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SCHEMA_YUP_SIGN_IN}
        onSubmit={async ({ email, password }) => {
          await signinMutation.mutate({
            email,
            password,
          });
        }}
      >
        {() => (
          <Form className="flex flex-col gap-0 w-full">
            <AuthInput
              label="이메일"
              name="email"
              type="email"
              isPending={signinMutation.isPending}
            />
            <AuthInput
              label="비밀번호"
              name="password"
              type="password"
              isPending={signinMutation.isPending}
            />
            <SignInUpButton view={view} isPending={signinMutation.isPending} />
          </Form>
        )}
      </Formik>
      <HasAccount view={view} setView={setView} />
      <div className="divider">간편 로그인</div>
      <OAuthSet supabase={supabase} />
    </div>
  );
}
