import ErrorScreen from "components/layout/ErrorScreen";

export default function NotFound() {
  const code = "404";
  const title = "페이지를 찾을 수 없습니다";
  const message = "존재하지 않거나 이동된 페이지일 수 있습니다.";
  return <ErrorScreen code={code} title={title} message={message} />;
}
