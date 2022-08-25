import { animated as a, useSpring } from "@react-spring/web";

export const EmojiDrawerAnimation = ({
  children,
  className,
  reverse,
  onClose,
}: any) => {
  const style = useSpring({
    config: {
      mass: 1,
      tension: 400,
    },
    onRest: onClose,
    to: {
      position: 'absolute',
      height: reverse ? 0 : 260,
      width: "70%",
      marginLeft: 130,
      bottom: 50,
      right: 25
    },
    from: {
      height: 0,
    },
  });
  return (
    <a.div style={style} className={className}>
      {children}
    </a.div>
  );
};
