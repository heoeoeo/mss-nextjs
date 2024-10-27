"use client";

interface ApprovalPendingModalProps {
  isOpen: boolean;
}

const EMAIL = "help@masunsang.com";
const PHONE = "010-1234-5678";

export default function ApprovalPendingModal({
  isOpen,
}: ApprovalPendingModalProps) {
  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* 모달 헤더 */}
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          승인 대기 중입니다
        </h3>

        {/* 모달 바디 */}
        <p className="text-gray-700 text-center mb-6">
          기업회원 신청이 완료되었습니다. 최대한 빨리 담당자가 확인 후
          처리해드리겠습니다.
        </p>

        {/* 고객센터 정보 */}
        <div className="my-6 text-center">
          <h4 className="text-lg font-semibold text-gray-900">
            고객센터 연락처
          </h4>
          <p className="text-gray-700">
            이메일:{" "}
            <a href={`mailto:${EMAIL}`} className="text-blue-500 underline">
              {EMAIL}
            </a>
          </p>
          <p className="text-gray-700">
            전화:{" "}
            <a href={`tel:${PHONE}`} className="text-blue-500 underline">
              {PHONE}
            </a>
          </p>
        </div>

        {/* 안내 문구 */}
        <p className="text-sm text-gray-500 text-center mt-6">
          우측 하단 채널톡 버튼 클릭 시 실시간 상담 가능합니다.
        </p>
      </div>
    </div>
  );
}

// "use client";

// import { Dialog, DialogBody, Typography } from "@material-tailwind/react";

// interface ApprovalPendingModalProps {
//   isOpen: boolean; // 부모로부터 모달 상태를 받음
// }

// const EMAIL = "help@masunsang.com";
// const PHONE = "010-1234-5678";

// export default function ApprovalPendingModal({
//   isOpen,
// }: ApprovalPendingModalProps) {
//   return (
//     <Dialog
//       open={isOpen} // 부모로부터 받은 상태로 모달을 열고 닫음
//       size="md"
//       className="w-full max-w-md mx-auto p-4"
//       handler={() => {} /* 닫기 버튼 비활성화 */}
//       backdrop={false}
//     >
//       <DialogBody className="p-6 text-center">
//         <Typography variant="h4" className="mb-4">
//           승인 대기 중입니다
//         </Typography>
//         <Typography className="text-gray-700 mb-4">
//           기업회원 신청이 완료되었습니다. 최대한 빨리 담당자가 확인 후
//           처리해드리겠습니다.
//         </Typography>
//         <div className="my-6 text-center">
//           <Typography variant="h6" className="text-gray-900">
//             고객센터 연락처
//           </Typography>
//           <Typography className="text-gray-700">
//             이메일:{" "}
//             <a href={`mailto:${EMAIL}`} className="text-blue-500 underline">
//               {EMAIL}
//             </a>
//           </Typography>
//           <Typography className="text-gray-700">
//             전화:{" "}
//             <a href={`tel:${PHONE}`} className="text-blue-500 underline">
//               {PHONE}
//             </a>
//           </Typography>
//         </div>
//         <Typography variant="small" className="text-gray-500 mt-6">
//           우측 하단 채널톡 버튼 클릭 시 실시간 상담 가능합니다.
//         </Typography>
//       </DialogBody>
//     </Dialog>
//   );
// }
