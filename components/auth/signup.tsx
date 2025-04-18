"use client";

import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useState } from "react";
import HasAccount from "./hasAccount";
import AuthLogo from "./AuthLogo";
import OAuthSet from "./OAuthSet";
import { AuthForm } from "constants/types/custom";
import AuthInput from "./AuthInput";
import SignInUpButton from "./SignInUpButton";
import { SCHEMA_YUP_SIGN_UP } from "constants/yup/Schema";
import useSupabase from "hooks/useSupabase";

export default function SignUp({ view, setView }) {
  const [confirmState, setConfirmState] = useState(false);
  const supabase = useSupabase();

  // Supabase 회원가입 기능
  const signupMutation = useMutation({
    mutationFn: async ({ email, password }: AuthForm) => {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_LOCALHOST_URL}/signup/confirm`,
        },
      });

      if (data) setConfirmState(true);
      if (error) alert(error.message);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <AuthLogo />
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={SCHEMA_YUP_SIGN_UP}
        onSubmit={async ({ email, password }) => {
          await signupMutation.mutate({
            email,
            password,
          });
        }}
      >
        {() => (
          <Form className="flex flex-col gap-4 w-full">
            <AuthInput
              label="이메일"
              name="email"
              type="email"
              isPending={signupMutation.isPending}
            />
            <AuthInput
              label="비밀번호"
              name="password"
              type="password"
              isPending={signupMutation.isPending}
            />
            <AuthInput
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              isPending={signupMutation.isPending}
            />
            <div>
              서비스 이용 약관 동의
              <br />
              개인정보 수집 및 이용에 관한 동의
              <br />
              14세미만이아닙니다.
            </div>
            <SignInUpButton view={view} isPending={signupMutation.isPending} />
          </Form>
        )}
      </Formik>

      <HasAccount view={view} setView={setView} />
      <div className="divider">간편 회원가입</div>
      <OAuthSet supabase={supabase} />
    </div>
  );
}
