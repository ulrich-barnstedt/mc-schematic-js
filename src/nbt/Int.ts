import {NBTType} from "./NBTType";

export class Int extends NBTType {
    readonly type: string = "int";
    value: number | undefined;

    constructor(value?: number) {
        super();
        this.value = value;
    }
}