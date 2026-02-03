import { io } from "socket.io-client";

// Support for Railway deployment via environment variable
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 
    (process.env.NODE_ENV === "development"
        ? "http://localhost:3001" // Development URL
        : "https://nameless-coast-33840-33c3fd45fe2d.herokuapp.com"); // Production URL (no trailing slash)

export function initSocket(sessionId) {
    const socket = io(serverURL, {
        reconnection: true,
        autoConnect: false,
        auth: {
            sessionId: sessionId,
        },
    });
    return socket;
}


