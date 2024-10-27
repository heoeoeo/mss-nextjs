"use server";

import { createServerSupabaseClient } from "utils/supabase/server";
import { getUserId } from "./dbs/auth";

export async function manageBizNotice(contents?: string) {
  const supabase = await createServerSupabaseClient();
  const user_id = await getUserId(supabase);

  try {
    let { data: noticeData, error: noticeError } = await supabase
      .schema("public")
      .from("biz_post_notices")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (noticeError && noticeError.code !== "PGRST116") {
      throw new Error("공지 가져오기 실패");
    }

    if (!noticeData) {
      const { data: newNoticeData, error: insertError } = await supabase
        .schema("public")
        .from("biz_post_notices")
        .insert({ user_id })
        .select("*")
        .single();

      if (insertError) {
        throw new Error("빈 공지 만들기 실패");
      }
      noticeData = newNoticeData;
    }

    if (contents) {
      const { error: logError } = await supabase
        .schema("audit_log")
        .from("biz_notice_logs")
        .insert({
          notice_id: noticeData.id,
          contents,
        });

      if (logError) {
        console.error("Log Error:", logError.message);
        throw new Error("Failed to log the notice update.");
      }

      return {
        notice: noticeData,
        message: "Notice log created successfully.",
      };
    }

    return { notice: noticeData, message: "Notice initialized." };
  } catch (error) {
    console.error("Error in manageBizNotice:", error);
    return {
      notice: null,
      error: error.message || "An unknown error occurred",
    };
  }
}

export async function getNoticeLogStatus() {
  const supabase = await createServerSupabaseClient();
  const user_id = await getUserId(supabase);

  try {
    const { data: noticeData, error: noticeError } = await supabase
      .schema("public")
      .from("biz_post_notices")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (noticeError || !noticeData) {
      throw new Error("Failed to fetch the user's notice ID.");
    }

    const { data: logs, error: logError } = await supabase
      .schema("audit_log")
      .from("biz_notice_logs")
      .select("contents, status")
      .eq("notice_id", noticeData.id)
      .order("changed_at", { ascending: false })
      .limit(1);

    if (logError) {
      console.error("Log Error:", logError.message);
      throw new Error("Failed to fetch notice log status.");
    }

    return logs.length ? logs[0] : null; // 로그가 있으면 반환
  } catch (error) {
    console.error("Error in getNoticeLogStatus:", error);
    return null;
  }
}

export async function getBizOffDays() {
  const supabase = await createServerSupabaseClient();
  const user_id = await getUserId(supabase);
  const { data, error } = await supabase
    .from("biz_posts_off_days")
    .select("id, off_day")
    .eq("user_id", user_id);

  if (error) {
    console.error("supabase select 실패: " + error.message);
    return [];
  }

  return data;
}

export async function insertBizOffDays(newOffDays: string[]) {
  const supabase = await createServerSupabaseClient();
  const user_id = await getUserId(supabase);

  // newOffDays 배열을 이용해 각 요일마다 개별 행을 생성
  const offDaysData = newOffDays.map((new_off_day) => ({
    user_id,
    off_day: new_off_day,
  }));

  // 한 번에 여러 행 삽입
  const { error } = await supabase
    .from("biz_posts_off_days")
    .insert(offDaysData);

  if (error) {
    console.error("Supabase insert 실패: " + error.message);
    return false;
  }

  return true;
}

export async function deleteBizOffDays(off_day) {
  const supabase = await createServerSupabaseClient();
  const user_id = await getUserId(supabase);

  const { error } = await supabase
    .from("biz_posts_off_days")
    .delete()
    .eq("off_day", off_day)
    .eq("user_id", user_id);
}
