"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyBizWithAllInfo } from "app/actions/auth-actions";
import AuthInput from "components/auth/AuthInput";
import { BizBaseInfoInsert } from "constants/types/db";

import {
  YUP_B_NAME,
  YUP_B_NO,
  YUP_P_NM,
  YUP_START_DT,
} from "constants/yup/values";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import BizApplyStep from "./commons/BizApplySteps";
import NeedVerifyText from "./commons/NeedVerifyText";

const validationSchema = yup.object({
  b_nm: YUP_B_NAME,
  b_no: YUP_B_NO,
  p_nm: YUP_P_NM,
  start_dt: YUP_START_DT,
});

export default function BizApplyForm() {
  const router = useRouter();

  const fetchBizInfoVerifyMutation = useMutation({
    mutationFn: async ({ b_no, b_nm, p_nm, start_dt }: BizBaseInfoInsert) =>
      await verifyBizWithAllInfo({ b_no, b_nm, p_nm, start_dt }),
    onSuccess: ({ valid, message }) => {
      valid && router.refresh();
      if (!valid) {
        console.error(message);
        alert(message);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="flex flex-col items-center md:px-4 py-8 md:bg-gray-50 min-h-screen">
      <NeedVerifyText />
      <BizApplyStep stage={1} />
      <Formik
        initialValues={{
          b_nm: "",
          b_no: "",
          p_nm: "",
          start_dt: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const formattedDate = values.start_dt.replace(/-/g, "");

          await fetchBizInfoVerifyMutation.mutate({
            b_no: values.b_no,
            b_nm: values.b_nm,
            p_nm: values.p_nm,
            start_dt: formattedDate,
          });
        }}
      >
        {() => (
          <Form className="flex flex-col gap-4 w-full max-w-md md:max-w-lg md:p-6 p-4 sm:p-8 bg-white rounded-lg md:shadow-lg">
            <AuthInput
              label="업체명"
              name="b_nm"
              type="text"
              isPending={fetchBizInfoVerifyMutation.isPending}
            />
            <AuthInput
              label="사업자등록번호 (- 없이 숫자 10자리)"
              name="b_no"
              type="text"
              isPending={fetchBizInfoVerifyMutation.isPending}
            />
            <AuthInput
              label="대표자명"
              name="p_nm"
              type="text"
              isPending={fetchBizInfoVerifyMutation.isPending}
            />
            <AuthInput
              label="개업일"
              name="start_dt"
              type="date"
              isPending={fetchBizInfoVerifyMutation.isPending}
            />

            <button
              type="submit"
              className={`w-full btn bg-blue-500 hover:bg-blue-600 text-white text-lg mt-4 ${
                fetchBizInfoVerifyMutation.isPending ? "btn-disabled" : ""
              }`}
              disabled={fetchBizInfoVerifyMutation.isPending}
            >
              {fetchBizInfoVerifyMutation.isPending ? "확인중..." : "제출"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
