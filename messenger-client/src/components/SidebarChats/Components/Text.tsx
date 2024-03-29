export const Text = ({ otherUser, msgParams, type }: any) => {
  return type === "group" ? (
    <small>
      <strong>{otherUser?.split(" ").slice(0, 2).join(" ") ?? "Вы"}</strong>
      :&nbsp;{msgParams.text}
    </small>
  ) : (
    <small>{msgParams.text}</small>
  );
};
