"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import DaumPostModal from "./DaumPostModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { upsertBizCertToStorage } from "app/actions/storage-actions";
import {
  YUP_ADDRESS,
  YUP_BIZ_CERT,
  YUP_BNAME,
  YUP_DETAIL_ADDRESS,
  YUP_NEAR_STATION,
  YUP_PHONE,
  YUP_SIDO,
  YUP_SIGUNGU,
} from "constants/yup/values";
import { addBizMoreInfos } from "app/actions/auth-actions";
import { BizTotalInfosInsert } from "constants/types/db";
import BizApplyStep from "./commons/BizApplySteps";
import AuthInput from "components/auth/AuthInput";
import NeedVerifyText from "./commons/NeedVerifyText";

const validationSchema = yup.object({
  sigungu: YUP_SIGUNGU,
  sido: YUP_SIDO,
  bname: YUP_BNAME,
  address: YUP_ADDRESS,
  detail_address: YUP_DETAIL_ADDRESS,
  near_station: YUP_NEAR_STATION,
  phone: YUP_PHONE,
});

export default function BizMoreForm() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  /** 파일 선택 완료 시 supabase storage(버켓: biz, 경로 /licenses)에 upsert하는 뮤테이션 */
  const uploadBizCertMutation = useMutation({
    mutationFn: async (biz_cert: File) => {
      const formData = new FormData();
      formData.append("biz_cert", biz_cert);
      await upsertBizCertToStorage(formData);
    },
    onSuccess: (data) => {
      alert("업로드 성공");
      console.log("업로드 성공", data);
      setIsUploaded(true);
    },
    onError: (error) => {
      alert("업로드에 실패했습니다.");
      console.error("업로드 실패", error);
      setIsUploaded(false);
    },
  });

  const uploadTotalInfoMutation = useMutation({
    mutationFn: async (bizTotalInfo: BizTotalInfosInsert) => {
      // await addBizMoreInfos({
      //   ...bizTotalInfo,
      // });
      await addBizMoreInfos(bizTotalInfo);
    },
    onSuccess: (data) => {
      console.log("등록 성공");
      console.log(data);
      router.refresh();
    },
    onError: (error) => {
      alert(error);
      console.error("등록 실패", error);
    },
  });

  return (
    <div className="flex flex-col items-center md:px-4 py-8 md:bg-gray-50 min-h-screen">
      <NeedVerifyText />
      <BizApplyStep stage={2} />
      <Formik
        initialValues={{
          sigungu: "",
          sido: "",
          bname: "",
          address: "",
          detail_address: "",
          near_station: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await uploadTotalInfoMutation.mutate(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col gap-0 w-full max-w-md mx-auto p-6">
            {/* 사업자등록증 업로드 */}
            <label className="form-control w-full mb-5">
              <div className="label">
                <span className="label-text text-base flex flex-row space-x-1">
                  <p className="text-red-700">*</p> <p>사업자등록증</p>
                </span>
              </div>
              <input
                type="file"
                name="biz_cert"
                accept="image/*,application/pdf"
                className="file-input file-input-bordered w-full"
                onChange={async (e) => {
                  const file = e.currentTarget.files?.[0];
                  await uploadBizCertMutation.mutate(file);
                }}
              />
              <ErrorMessage
                name="biz_cert"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </label>

            {/* 주소 선택 */}
            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn w-full"
              >
                주소 찾기
              </button>
              <Field
                name="address"
                type="text"
                value={values.address} // Formik의 값으로 설정
                placeholder="주소 (주소 찾기 버튼을 눌러주세요.)"
                readOnly
                className="w-full border p-2 rounded size-12 mt-[20px]"
              />
              <div className="min-h-[20px] mt-1">
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <AuthInput
              label="상세주소"
              name="detail_address"
              type="text"
              isPending={uploadTotalInfoMutation.isPending}
            />
            <div>
              <Field
                name="sigungu"
                type="hidden"
                value={values.sigungu}
                readOnly
              />
              <Field name="sido" type="hidden" value={values.sido} readOnly />
              <Field name="bname" type="hidden" value={values.bname} readOnly />
            </div>

            {/* DaumPostModal 컴포넌트 */}
            <DaumPostModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onComplete={({ address, sigungu, sido, bname }) => {
                setFieldValue("address", address);
                setFieldValue("sigungu", sigungu);
                setFieldValue("sido", sido);
                setFieldValue("bname", bname);
              }}
            />

            <AuthInput
              label="인근역"
              name="near_station"
              type="text"
              isPending={uploadTotalInfoMutation.isPending}
              required={false}
            />
            <AuthInput
              label="휴대폰 번호"
              name="phone"
              type="text"
              isPending={uploadTotalInfoMutation.isPending}
            />

            <button
              type="submit"
              className="btn w-full bg-blue-500 text-white p-2 rounded mt-4"
              disabled={uploadBizCertMutation.isPending}
            >
              {uploadTotalInfoMutation.isPending ? "확인중..." : "제출"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// "use client";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as yup from "yup";
// import { useRouter } from "next/navigation";
// import DaumPostModal from "./DaumPostModal";
// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { upsertBizCertToStorage } from "app/actions/storage-actions";
// import {
//   YUP_ADDRESS,
//   YUP_BIZ_CERT,
//   YUP_BNAME,
//   YUP_DETAIL_ADDRESS,
//   YUP_NEAR_STATION,
//   YUP_PHONE,
//   YUP_SIDO,
//   YUP_SIGUNGU,
// } from "constants/yup/values";
// import { addBizMoreInfos } from "app/actions/auth-actions";
// import { BizTotalInfosInsert } from "constants/types/db";
// import BizApplyStep from "./commons/BizApplySteps";

// const validationSchema = yup.object({
//   sigungu: YUP_SIGUNGU,
//   sido: YUP_SIDO,
//   bname: YUP_BNAME,
//   address: YUP_ADDRESS,
//   detail_address: YUP_DETAIL_ADDRESS,
//   near_station: YUP_NEAR_STATION,
//   phone: YUP_PHONE,
// });

// export default function BizMoreForm() {
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isUploaded, setIsUploaded] = useState(false);

//   /** 파일 선택 완료 시 supabase storage(버켓: biz, 경로 /licenses)에 upsert하는 뮤테이션 */
//   const uploadBizCertMutation = useMutation({
//     mutationFn: async (biz_cert: File) => {
//       const formData = new FormData();
//       formData.append("biz_cert", biz_cert);
//       await upsertBizCertToStorage(formData);
//     },
//     onSuccess: (data) => {
//       alert("업로드 성공");
//       console.log("업로드 성공", data);
//       setIsUploaded(true);
//     },
//     onError: (error) => {
//       alert("업로드에 실패했습니다.");
//       console.error("업로드 실패", error);
//       setIsUploaded(false);
//     },
//   });

//   const uploadTotalInfoMutation = useMutation({
//     mutationFn: async (bizTotalInfo: BizTotalInfosInsert) => {
//       // await addBizMoreInfos({
//       //   ...bizTotalInfo,
//       // });
//       await addBizMoreInfos(bizTotalInfo);
//     },
//     onSuccess: (data) => {
//       console.log("등록 성공");
//       console.log(data);
//       router.refresh();
//     },
//     onError: (error) => {
//       alert(error);
//       console.error("등록 실패", error);
//     },
//   });

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-center">
//         사업자 등록 정보를 입력해주세요
//       </h2>
//       <BizApplyStep stage={2} />
//       <Formik
//         initialValues={{
//           sigungu: "",
//           sido: "",
//           bname: "",
//           address: "",
//           detail_address: "",
//           near_station: "",
//           phone: "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={async (values) => {
//           await uploadTotalInfoMutation.mutate(values);
//         }}
//       >
//         {({ setFieldValue, values }) => (
//           <Form className="flex flex-col gap-4 w-full max-w-md mx-auto p-6">
//             {/* 사업자등록증 업로드 */}
//             <div>
//               <input
//                 type="file"
//                 name="biz_cert"
//                 accept="image/*,application/pdf"
//                 onChange={async (e) => {
//                   const file = e.currentTarget.files?.[0];
//                   await uploadBizCertMutation.mutate(file);
//                 }}
//                 className="w-full border p-2 rounded"
//               />
//               <ErrorMessage
//                 name="biz_cert"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>

//             {/* 주소 선택 */}
//             <div>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="btn btn-wide"
//               >
//                 주소 찾기
//               </button>
//               <Field
//                 name="address"
//                 type="text"
//                 value={values.address} // Formik의 값으로 설정
//                 placeholder="주소"
//                 readOnly
//                 className="w-full border p-2 rounded mt-2"
//               />
//               <ErrorMessage
//                 name="address"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>
//             <div>
//               <Field
//                 name="detail_address"
//                 type="text"
//                 placeholder="상세주소"
//                 className="w-full border p-2 rounded mt-2"
//                 value={values.detail_address}
//                 readOnly={uploadTotalInfoMutation.isPending}
//               />
//               <ErrorMessage
//                 name="detail_address"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//               <Field
//                 name="sigungu"
//                 type="hidden"
//                 value={values.sigungu}
//                 readOnly
//               />
//               <Field name="sido" type="hidden" value={values.sido} readOnly />
//               <Field name="bname" type="hidden" value={values.bname} readOnly />
//             </div>

//             {/* DaumPostModal 컴포넌트 */}
//             <DaumPostModal
//               isOpen={isModalOpen}
//               onClose={() => setIsModalOpen(false)}
//               onComplete={({ address, sigungu, sido, bname }) => {
//                 setFieldValue("address", address);
//                 setFieldValue("sigungu", sigungu);
//                 setFieldValue("sido", sido);
//                 setFieldValue("bname", bname);
//               }}
//             />

//             {/* 인근역 */}
//             <div>
//               <Field
//                 name="near_station"
//                 type="text"
//                 placeholder="인근역"
//                 className="w-full border p-2 rounded"
//                 value={values.near_station}
//                 readOnly={uploadTotalInfoMutation.isPending}
//               />
//               <ErrorMessage
//                 name="near_station"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>

//             {/* 휴대폰 번호 */}
//             <div>
//               <Field
//                 name="phone"
//                 type="text"
//                 placeholder="휴대폰번호 (숫자만 입력)"
//                 className="w-full border p-2 rounded"
//                 readOnly={uploadTotalInfoMutation.isPending}
//               />
//               <ErrorMessage
//                 name="phone"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded mt-4"
//               disabled={uploadBizCertMutation.isPending}
//             >
//               {uploadTotalInfoMutation.isPending ? "확인중..." : "제출"}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }
