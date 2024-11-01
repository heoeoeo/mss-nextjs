"use server";

import { getSignedUrl, isBizRegistered } from "./dbs/select";
import { validateBizWithAPI } from "./apis/validateBizInfo";
import { insertBizInfo, insertBizTotalInfo } from "./dbs/insert";
import { createServerSupabaseClient } from "utils/supabase/server";
import { BizBaseInfoInsert, BizTotalInfosInsert } from "constants/types/db";
import { updateBizRole } from "./dbs/update";
import { getUserId, getUserRole } from "./dbs/auth";

const path = "app/actions/auth-actions.ts";

/**
 * 공공데이터포털 통해 사업자 정보 검증하는 api
 *
 * biz_num: 사업자 등록번호
 * ceo_name: 대표자명
 * biz_name: 상호
 * open_date: 개업일(사업자등록일이 아닌 개업일)
 *
 * @returns {valid: boolean, message: string}
 * valid: 사업자 정보가 유효한지 여부 - 계속 사업자만 true, 나머지 false
 * message: 유저에게 보여줄 상태에 대한 메시지
 */
export async function verifyBizWithAllInfo(bizBaseInfo: BizBaseInfoInsert) {
  try {
    const supabase = await createServerSupabaseClient();
    // 데이터베이스에서 사업자 정보가 이미 등록되었는지 확인
    const isRegistered = await isBizRegistered(bizBaseInfo.b_no, supabase);
    if (isRegistered)
      return { valid: false, message: "이미 등록된 사업자 정보가 있습니다." };

    // 공공데이터포털 API를 통해 사업자 정보 검증
    const isValid = await validateBizWithAPI(bizBaseInfo);
    if (!isValid)
      return { valid: false, message: "사업자 정보가 일치하지 않습니다." };
    console.log(isValid);
    // 데이터베이스에 신규 사업자 정보 삽입
    const isInsertOk = await insertBizInfo(bizBaseInfo, supabase);

    if (isInsertOk)
      return { valid: true, message: "사업자 정보가 일치합니다." };

    return {
      valid: false,
      message:
        "문제가 발생하였습니다. 다시 시도하거나 고객센터로 문의바랍니다.",
    };
  } catch (e) {
    console.error(`${path}\nverifyBizWithAllInfo\n`, e);
    return {
      valid: false,
      message:
        "문제가 발생하였습니다. 다시 시도하거나 고객센터로 문의바랍니다.",
    };
  }
}

/** 사업자의 주소, 휴대폰, 인근역 정보 insert */
export async function addBizMoreInfos(bizTotalInfo: BizTotalInfosInsert) {
  try {
    const supabase = await createServerSupabaseClient();

    const user_id = await getUserId(supabase);
    if (!user_id)
      return { valid: false, message: "로그인 정보를 찾을 수 없습니다." };

    const isInsertOk = await insertBizTotalInfo(bizTotalInfo, supabase);
    if (!isInsertOk)
      return {
        valid: false,
        message: "추가 사업자 정보 삽입에 실패하였습니다.",
      };

    const isGetSignedUrlOk = await getSignedUrl(user_id, supabase);
    if (!isGetSignedUrlOk)
      return {
        valid: false,
        message: "서명 파일 url을 가져오는데 실패하였습니다.",
      };

    return {
      valid: true,
      message: "추가 사업자 정보가 성공적으로 등록되었습니다.",
    };
  } catch (e) {
    console.error(`${path}\naddBizMoreInfos\n`, e);
    return {
      valid: true,
      message: "추가 사업자 정보가 성공적으로 등록되었습니다.",
    };
  }
}

/** 유저 승인 정보 가져오는 함수
 *
 * @returns { valid: boolean, approval: "승인" | "대기" | "반려"}
 */
export async function getApprovalStatus() {
  try {
    const supabase = await createServerSupabaseClient();
    const user_id = await getUserId(supabase);
    if (!user_id) return false;

    const { data } = await supabase
      .from("biz_total_infos")
      .select("approval")
      .eq("id", user_id)
      .throwOnError();

    return { valid: true, approval: data[0]?.approval };
  } catch (e) {
    console.error(`${path}\ngetApprovalStatus\n`, e);
    return { valid: false, approval: null };
  }
}
