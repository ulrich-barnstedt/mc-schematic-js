# MC-Schematic

Node.JS API for WorldEdit schematics.

### Example usage

```js
const sch = require("mc-schematic");
const fs = require("fs");

// create a new schematic
const schematic = new sch.Schematic();

// create a new material
const STONE = new sch.BlockReference("stone");

// fill a 10x1x1 area and set an single block
schematic.fill(0, 0, 0, 9, 0, 0, STONE);
schematic.set(5, 5, 5, STONE);

// generate the finished schematic
// the output file has to be gzipped before use
fs.writeFileSync("./out", schematic.generate("test"));
```

### API

#### `Schematic` class

- `.set(x, y, z, material: BlockReference)`: Set a block to the specified material
- `.fill(x1, y1, z1, x2, y2, z2, material: BlockReference)`: Fill an area with the specified material
- `.generate()`: Get the finished schematic (buffer). This has to be run through gzip before it can be used.
- `.xSize()`: Get the size of the Schematic (x-Dimension)
- `.ySize()`: Get the size of the Schematic (y-Dimension)
- `.zSize()`: Get the size of the Schematic (z-Dimension)


#### `BlockReference` class

- `constructor(blockName: string, meta: string, namespace: string)`   
`blockName` is the in-game name of the block.   
`namespace` is where the block originates from. Normally `minecraft`, `<mod-name>` for modded minecraft.   
`meta` is block metadata, specified in `<key>=<value>,...`. For example, placing an open trapdoor: `open=true`. Can be found in the in-game F3 menu.