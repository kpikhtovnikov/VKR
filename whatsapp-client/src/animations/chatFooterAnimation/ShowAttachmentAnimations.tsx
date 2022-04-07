import { animated as a, useTrail } from "@react-spring/web";

export const ShowAttachmentAnimations = ({
    items,
    reverse,
    onClose,
    className,
}: any) => {
    const trail = useTrail(items.length, {
        config: { mass: 1, tension: 500, friction: 30 },
        onRest: onClose,
        scale: reverse ? 0 : 1,
        opacity: reverse ? 0 : 1,
        marginTop: reverse ? -20 : -95,
        height: reverse ? 0 : 40,
        from: { scale: 0, marginTop: 0, height: 0, opacity: 0 },
    });

    const trail2 = useTrail(2, {
        config: { mass: 1, tension: 500, friction: 30 },
        onRest: onClose,
        scale: reverse ? 0 : 1,
        opacity: reverse ? 0 : 1,
        marginTop: reverse ? -20 : -10,
        height: reverse ? 0 : 40,
        marginLeft: 40,
        from: { scale: 0, marginTop: 0, height: 0, opacity: 0 },
    });
    return (
        <a.div className={className}>
            {trail.map((style, index) => (
                <a.div key={`_${index}`} style={{ ...style, marginLeft: -5 }}>
                    {items[index].element}
                </a.div>
            ))}
            {/* {trail2.map((style, index) => (
                <a.div key={`_${index}`} style={{ ...style, marginLeft: 100 }}>
                    {items[index].element}
                </a.div>
            ))
            } */}
        </a.div>
    );
};
