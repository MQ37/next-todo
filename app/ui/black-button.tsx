export function BlackButton({
    children,
    onClick,
    type = "button",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}) {
    return (
        <button
            onClick={onClick}
            type={type}
            className="bg-black text-white rounded-md px-4 py-2"
        >
            {children}
        </button>
    );
}
