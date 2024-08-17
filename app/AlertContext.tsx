"use client";

import { useAppSelector } from "./lib/hooks";
import Alert from "./ui/alert";

export default function AuthContext({
  children,
}: {
  children: React.ReactNode
}) {

    const alerts = useAppSelector((state) => state.alert.alerts);

    return (
        <>
            <div className="fixed bottom-0 left-0 max-h-96 overflow-auto p-4 flex flex-col-reverse gap-4">
            {alerts.toReversed().map((alert) => (
                <Alert key={alert.id} {...alert} />
            ))}
            </div>

            {children}
        </>
    );
}
