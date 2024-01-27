import { HandleNuiMessage } from "handlers/HandleNuiMessage";
import React from "react";
import './App.css';
import { ContextMenu } from "main/context-menu";

export function App() {
    const ResizeEvent = () => {};

    return (
        React.useEffect(() => {}, []),
        React.useEffect(() => {
            window.addEventListener('resize', ResizeEvent),
            () => {
                window.removeEventListener('resize', ResizeEvent)
            }
        }, []),
        HandleNuiMessage("copyText", (text: any) => {
            const TextArea = document.createElement("textarea");
            TextArea.value = text;
            document.body.appendChild(TextArea);
            TextArea.select();
            document.execCommand("copy");
            document.body.removeChild(TextArea);
        }),
        <>
            <ContextMenu />
        </>
    )
}