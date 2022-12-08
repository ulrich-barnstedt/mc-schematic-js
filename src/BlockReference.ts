export class BlockReference {
    blockName: string;
    namespace: string;
    meta: string | undefined;

    constructor(blockName: string, meta?: string, namespace: string = "minecraft") {
        this.blockName = blockName;
        this.namespace = namespace;
        this.meta = meta;
    }

    public generate () {
        let meta = this.meta === undefined ? "" : `[${this.meta}]`;
        return `${this.namespace}:${this.blockName}${meta}`;
    }

    public equal (block: BlockReference) : boolean {
        return this.blockName === block.blockName &&
            this.namespace === block.namespace &&
            this.meta === block.meta;
    }
}