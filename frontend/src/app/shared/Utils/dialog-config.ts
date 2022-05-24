export class DialogConfig {
    data?: any;
    header?: string;
    baseZIndex: number = 2000;
    closable: boolean = true;

    constructor(data, header) {
        this.data = data;
        this.header = header;
    }
}
