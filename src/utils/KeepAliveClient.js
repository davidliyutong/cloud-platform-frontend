import {getRootWSPath} from "@/utils/tool";

function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

class KeepAliveClient {
    constructor() {
        let token = localStorage.getItem('token');
        this.uri = getRootWSPath() + '/v1/heartbeat/user?token=' + token;
        this.socket = new WebSocket(this.uri);

        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
    }

    onOpen(event) {
        console.log('KeepAlive connection established', event);
    }

    async onError(error) {
        console.log('KeepAlive Error: ', error);
        // eslint-disable-next-line no-constant-condition
        while (true) {
            let token = localStorage.getItem('token');
            this.uri = getRootWSPath() + '/v1/heartbeat/user?token=' + token;
            this.socket = new WebSocket(this.uri);
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.onopen = this.onOpen;
                this.socket.onerror = this.onError;
                this.socket.onmessage = this.onMessage;
                this.socket.onclose = this.onClose;
                break
            } else {
                console.log('KeepAlive Retry Failed');
                await sleep(2000);
            }
        }
    }

    onMessage(event) {
        console.log('KeepAlive Message: ', event.data);
    }

    async onClose(event) {
        console.log('KeepAlive connection closed', event);
        // eslint-disable-next-line no-constant-condition
        while (true) {
            let token = localStorage.getItem('token');
            this.uri = getRootWSPath() + '/v1/heartbeat/user?token=' + token;
            this.socket = new WebSocket(this.uri);
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.onopen = this.onOpen;
                this.socket.onerror = this.onError;
                this.socket.onmessage = this.onMessage;
                this.socket.onclose = this.onClose;
                break
            } else {
                console.log('KeepAlive Retry Failed');
                await sleep(2000);
            }
        }

    }

    send(message) {
        this.socket.send(message);
    }

    close() {
        this.socket.close();
    }
}

export default KeepAliveClient;