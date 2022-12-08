import {Compound} from "./Compound";
import {NBTType} from "./NBTType";

export class RootCompound extends Compound {
    public name: string;

    constructor(name: string, value?: Record<string, NBTType>) {
        super(value);
        this.name = name;
    }
}