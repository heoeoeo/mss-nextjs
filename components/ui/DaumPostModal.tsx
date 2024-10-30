"use client";

import DaumPostcodeEmbed from "react-daum-postcode";

interface DaumPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: ({
    address,
    sigungu,
    sido,
    bname,
  }: {
    address: string;
    sigungu: string;
    sido: string;
    bname: string;
  }) => void;
}

export default function DaumPostModal({
  isOpen,
  onClose,
  onComplete,
}: DaumPostModalProps) {
  const handleComplete = (data: any) => {
    console.log(data);
    const address = data.address; // 선택된 전체 주소
    const sigungu = data.sigungu; // 시군구
    const sido = data.sido; // 시도
    const bname = data.bname; // 동
    onComplete({ address, sigungu, sido, bname }); // 선택된 주소를 상위 컴포넌트로 전달
    onClose(); // 모달 닫기
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-full max-w-2xl bg-white shadow-xl rounded-none md:rounded-lg lg:rounded-lg p-0 h-screen lg:h-auto">
        {/* 모달 헤더 */}
        <div className="p-4 border-b">
          <h3 className="font-bold text-xl text-gray-800">주소 찾기</h3>
        </div>

        {/* 모달 바디 */}
        <div className="w-full">
          <DaumPostcodeEmbed
            style={{ height: "66vh" }}
            onComplete={handleComplete}
          />
        </div>

        {/* 모달 푸터 */}
        <div className="flex justify-start p-4 border-t">
          <button
            onClick={onClose}
            className="btn btn-outline btn-error rounded-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import {
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Button,
// } from "@material-tailwind/react";
// import DaumPostcodeEmbed from "react-daum-postcode";

// interface DaumPostModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onComplete: ({
//     address,
//     sigungu,
//     sido,
//     bname,
//   }: {
//     address: string;
//     sigungu: string;
//     sido: string;
//     bname: string;
//   }) => void;
// }

// export default function DaumPostModal({
//   isOpen,
//   onClose,
//   onComplete,
// }: DaumPostModalProps) {
//   const handleComplete = (data: any) => {
//     const address = data.address; // 선택된 전체 주소
//     const sigungu = data.sigungu; // 시군구
//     const sido = data.sido; // 시도
//     const bname = data.bname; // 동
//     onComplete({ address, sigungu, sido, bname }); // 선택된 주소를 상위 컴포넌트로 전달
//     onClose(); // 모달 닫기
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       handler={onClose}
//       size="lg"
//       className="w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto" // 모바일/데스크탑 크기 설정
//     >
//       <DialogHeader>주소 찾기</DialogHeader>
//       <DialogBody divider className="p-0">
//         <div className="h-96 md:h-[500px] lg:h-[600px] overflow-auto">
//           <DaumPostcodeEmbed onComplete={handleComplete} />
//         </div>
//       </DialogBody>
//       <DialogFooter>
//         <Button color="red" onClick={onClose} className="mr-2">
//           닫기
//         </Button>
//       </DialogFooter>
//     </Dialog>
//   );
// }
