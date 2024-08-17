import { useAlert } from "../lib/hooks/alert";
import { AlertMessage } from "../lib/types";

export default function Alert(alert: AlertMessage) {
    const { removeAlert } = useAlert();

    return (
        <div className={"p-4 w-64 rounded-md text-center relative " +
        (alert.type === "error" ? "bg-red-100 text-red-900" :
        alert.type === "success" ? "bg-green-100 text-green-900" :
        "bg-blue-100 text-blue-900")
        }
        onClick={() => removeAlert(alert.id)}
        aria-label="close alert"
        role="button"
        >
            {alert.message}
        </div>
    );
}
