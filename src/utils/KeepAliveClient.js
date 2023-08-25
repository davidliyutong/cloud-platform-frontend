import { getRootWSPath } from "@/utils/tool";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class KeepAliveClient {
    constructor() {
        this.uri = this.getConnectionUri();

        this.handlers = {
            onOpen: event => console.log('KeepAlive connection established', event),
            onError: event => {
                console.log('KeepAlive Error: ', event);
                this.reconnect();
            },
            onMessage: event => console.log('KeepAlive Message: ', event.data),
            onClose: event => {
                console.log('KeepAlive connection closed', event);
                this.reconnect();
            }
        };

        this.openConnection();
    }

    getConnectionUri() {
        const token = localStorage.getItem('token');
        return getRootWSPath() + '/v1/heartbeat/user?token=' + token;
    }

    openConnection() {
        this.socket = new WebSocket(this.uri);

        this.socket.onopen = this.handlers.onOpen;
        this.socket.onerror = this.handlers.onError;
        this.socket.onmessage = this.handlers.onMessage;
        this.socket.onclose = this.handlers.onClose;
    }

    async reconnect() {
        await sleep(1000);
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.log('KeepAlive Retry....');
            this.uri = this.getConnectionUri();
            this.openConnection();
        }
    }

    send(message) {
        if (this.socket.readyState === WebSocket.OPEN)
            this.socket.send(message);
        else
            console.log("Message not sent. Socket isn't open");
    }

    close() {
        if (this.socket) this.socket.close();
    }
}

export default KeepAliveClient;