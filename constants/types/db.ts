import { Database } from "types_db";
import { RequiredFields } from "./custom";

/**
 * supabase의 데이터베이스에서 사용되는 타입들을 모아놓은 파일
 *
 * - 네이밍 규칙은 테이블명 + Row, Insert, Update
 * - select를 통해 데이터를 가져올 때 필요한 타입을 Row
 * - insert를 통해 데이터를 추가할 때 필요한 타입을 Insert
 * - update를 통해 데이터를 수정할 때 필요한 타입을 Update
 *
 */

// biz_base_info 테이블의 타입
export type BizBaseInfoRow =
  Database["public"]["Tables"]["biz_base_info"]["Row"];

export type BizBaseInfoInsert =
  Database["public"]["Tables"]["biz_base_info"]["Insert"];

export type BizBaseInfoUpdate =
  Database["public"]["Tables"]["biz_base_info"]["Update"];

// biz_total_infos 테이블의 타입
export type BizTotalInfosRow =
  Database["public"]["Tables"]["biz_total_infos"]["Row"];

export type BizTotalInfosInsert =
  Database["public"]["Tables"]["biz_total_infos"]["Insert"];

export type BizTotalInfosUpdate =
  Database["public"]["Tables"]["biz_total_infos"]["Update"];
