export class Arquivo {
    fileName: string;
    ipAddress: string;
    port: number;

    constructor(fileName: string, ipAddress: string, port: number) {
        this.fileName = fileName;
        this.ipAddress = ipAddress;
        this.port = port;
    }
}