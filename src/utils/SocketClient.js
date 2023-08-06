class SocketClient {
    constructor(url) {
        this.socket = new WebSocket(url);

        this.socket.onopen = this.onOpen;
        this.socket.onerror = this.onError;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
    }

    onOpen(event) {
        console.log('WebSocket connection established', event);
    }

    onError(error) {
        console.log('WebSocket Error: ', error);
    }

    onMessage(event) {
        console.log('WebSocket Message: ', event.data);
    }

    onClose(event) {
        console.log('WebSocket connection closed', event);
    }

    send(message) {
        this.socket.send(message);
    }

    close() {
        this.socket.close();
    }
}

export default SocketClient;