import {NBTType} from "./NBTType";

export class Short extends NBTType {
    readonly type: string = "short";
    value: number | undefined;

    constructor(value?: number) {
        super();
        this.value = value;
    }
}