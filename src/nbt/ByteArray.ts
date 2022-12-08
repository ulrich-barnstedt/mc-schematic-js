import {NBTType} from "./NBTType";

export class ByteArray extends NBTType {
    readonly type: string = "byteArray";
    value: Array<Number> | undefined;

    constructor(value?: Array<Number>) {
        super();
        this.value = value;
    }
}