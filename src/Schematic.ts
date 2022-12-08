import {BlockReference} from "./BlockReference";
import {RootCompound} from "./nbt/RootCompound";
import {Int} from "./nbt/Int";
import {Compound} from "./nbt/Compound";
import {Short} from "./nbt/Short";
import {ByteArray} from "./nbt/ByteArray";
import prismarineNBT from "prismarine-nbt";

export class Schematic {
    private space: Array<Array<Array<number>>> = [];
    private palette: Array<BlockReference> = [new BlockReference("air")];

    private expand (x: number, y: number) {
        if (this.space[x] === undefined) this.space[x] = [];
        if (this.space[x][y] === undefined) this.space[x][y] = [];
    }

    private blockId (block: BlockReference) : number {
        let idx = this.palette.findIndex(b => b.equal(block));

        if (idx === -1) return this.palette.push(block) - 1;
        return idx;
    }

    public set (x: number, y: number, z: number, block: BlockReference) {
        this.expand(x, y);
        this.space[x][y][z] = this.blockId(block);
    }

    public fill (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, block: BlockReference) {
        let id = this.blockId(block);

        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                this.expand(x, y);

                for (let z = z1; z <= z2; z++) {
                    this.space[x][y][z] = id;
                }
            }
        }
    }

    public xSize () : number {
        return this.space.length;
    }

    public ySize () : number {
        return Math.max(...this.space.map(a => a.length));
    }

    public zSize () : number {
        return Math.max(...this.space.map(a => Math.max(...a.filter(b => b != undefined).map(b => b.length))));
    }

    private transformSpace () : Array<number> {
        let x_max = this.xSize();
        let y_max = this.ySize();
        let z_max = this.zSize();
        let output = [];

        for (let y = 0; y < y_max; y++) {
            for (let z = 0; z < z_max; z++) {
                for (let x = 0; x < x_max; x++) {
                    if (this.space[x] === undefined || this.space[x][y] === undefined || this.space[x][y][z] === undefined) {
                        output.push(0);
                    } else {
                        output.push(this.space[x][y][z]);
                    }
                }
            }
        }

        return output;
    }

    public generate (name: string, specificationVersion: number = 2, minecraftVersion: number = 3120) : Buffer {
        let root = new RootCompound(name, {
            "PaletteMax" : new Int(this.palette.length),
            "Palette" : new Compound(
                Object.fromEntries(this.palette.map((v, idx) => [v.generate(), new Int(idx)]))
            ),
            "Version" : new Int(specificationVersion),
            "Length" : new Short(this.zSize()),
            "Height" : new Short(this.ySize()),
            "Width" : new Short(this.xSize()),
            "DataVersion" : new Int(minecraftVersion),
            "BlockData" : new ByteArray(this.transformSpace())
        });

        // @ts-ignore
        return prismarineNBT.writeUncompressed(root);
    }
}
