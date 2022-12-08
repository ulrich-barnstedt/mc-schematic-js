import {NBTType} from "./NBTType";

export class Compound extends NBTType {
    public readonly type: string = "compound";
    public value: Record<string, NBTType> | undefined;

    constructor(value?: Record<string, NBTType>) {
        super();
        this.value = value;
    }
}