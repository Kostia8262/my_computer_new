/* ═══════════════════════════════════════════════════════════
   mcpi_mock.js — Skulpt-модуль, що імітує mcpi для браузера
   Підключається до глобального voxelWorld (VoxelWorld instance)
   ═══════════════════════════════════════════════════════════ */

var $builtinmodule = function(name) {
  var mod = {};

  /* ── block constants module ─────────────────── */
  var blockMod = Sk.misceval.buildClass(mod, function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function() {});
  }, 'BlockType', []);

  var BLOCK_IDS = {
    AIR: 0, STONE: 1, GRASS: 2, DIRT: 3, COBBLESTONE: 4,
    WOOD_PLANKS: 5, SAPLING: 6, BEDROCK: 7, WATER_FLOWING: 8,
    WATER: 9, LAVA_FLOWING: 10, LAVA: 11, SAND: 12, GRAVEL: 13,
    GOLD_ORE: 14, IRON_ORE: 15, COAL_ORE: 16, WOOD: 17,
    LEAVES: 18, GLASS: 20, LAPIS_LAZULI_ORE: 21,
    LAPIS_LAZULI_BLOCK: 22, SANDSTONE: 24, WOOL: 35,
    GOLD_BLOCK: 41, IRON_BLOCK: 42, BRICK_BLOCK: 45, TNT: 46,
    BOOKSHELF: 47, MOSS_STONE: 48, OBSIDIAN: 49,
    DIAMOND_ORE: 56, DIAMOND_BLOCK: 57, CRAFTING_TABLE: 58,
    REDSTONE_ORE: 73, SNOW: 78, ICE: 79, SNOW_BLOCK: 80,
    CACTUS: 81, CLAY: 82, GLOWSTONE_BLOCK: 89,
    BEDROCK_INVISIBLE: 95,
  };

  var blockObj = {};
  for (var k in BLOCK_IDS) {
    blockObj[k] = new Sk.builtin.int_(BLOCK_IDS[k]);
  }
  mod.block = blockObj;

  /* ── Vec3 ───────────────────────────────────── */
  var Vec3 = Sk.misceval.buildClass(mod, function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function(self, x, y, z) {
      self.x = Sk.ffi.remapToJs(x);
      self.y = Sk.ffi.remapToJs(y);
      self.z = Sk.ffi.remapToJs(z);
    });
    $loc.x = new Sk.builtin.property(new Sk.builtin.func(function(self) {
      return new Sk.builtin.float_(self.x);
    }));
    $loc.y = new Sk.builtin.property(new Sk.builtin.func(function(self) {
      return new Sk.builtin.float_(self.y);
    }));
    $loc.z = new Sk.builtin.property(new Sk.builtin.func(function(self) {
      return new Sk.builtin.float_(self.z);
    }));
    $loc.__repr__ = new Sk.builtin.func(function(self) {
      return new Sk.builtin.str(`Vec3(${self.x}, ${self.y}, ${self.z})`);
    });
    $loc.__str__ = $loc.__repr__;
  }, 'Vec3', []);

  function makeVec3(x, y, z) {
    return Sk.misceval.callsimArray(Vec3, [
      new Sk.builtin.float_(x),
      new Sk.builtin.float_(y),
      new Sk.builtin.float_(z)
    ]);
  }

  /* ── Player ─────────────────────────────────── */
  var PlayerClass = Sk.misceval.buildClass(mod, function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function(self) {});

    $loc.getPos = new Sk.builtin.func(function(self) {
      var p = window.voxelWorld ? window.voxelWorld.getPlayerPos() : {x:0,y:64,z:0};
      return makeVec3(p.x, p.y, p.z);
    });
    $loc.getTilePos = $loc.getPos;

    $loc.setPos = new Sk.builtin.func(function(self, x, y, z) {
      var px = Sk.ffi.remapToJs(x), py = Sk.ffi.remapToJs(y), pz = Sk.ffi.remapToJs(z);
      if (window.voxelWorld) window.voxelWorld.setPlayerPos(px, py, pz);
      return Sk.builtin.none.none$;
    });
    $loc.setTilePos = $loc.setPos;
  }, 'Player', []);

  /* ── Minecraft ──────────────────────────────── */
  var MinecraftClass = Sk.misceval.buildClass(mod, function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function(self) {
      self.player = Sk.misceval.callsimArray(PlayerClass, []);
    });

    $loc.create = new Sk.builtin.classmethod(new Sk.builtin.func(function(cls) {
      return Sk.misceval.callsimArray(cls, []);
    }));

    $loc.setBlock = new Sk.builtin.func(function(self, x, y, z, blockId, data) {
      var bx = Sk.ffi.remapToJs(x), by = Sk.ffi.remapToJs(y), bz = Sk.ffi.remapToJs(z);
      var bid = Sk.ffi.remapToJs(blockId);
      var bd  = data ? Sk.ffi.remapToJs(data) : 0;
      if (window.voxelWorld) window.voxelWorld.setBlock(bx, by, bz, bid, bd);
      return Sk.builtin.none.none$;
    });

    $loc.setBlocks = new Sk.builtin.func(function(self, x1, y1, z1, x2, y2, z2, blockId, data) {
      var bid = Sk.ffi.remapToJs(blockId);
      var bd  = data ? Sk.ffi.remapToJs(data) : 0;
      if (window.voxelWorld) window.voxelWorld.setBlocks(
        Sk.ffi.remapToJs(x1), Sk.ffi.remapToJs(y1), Sk.ffi.remapToJs(z1),
        Sk.ffi.remapToJs(x2), Sk.ffi.remapToJs(y2), Sk.ffi.remapToJs(z2),
        bid, bd
      );
      return Sk.builtin.none.none$;
    });

    $loc.getBlock = new Sk.builtin.func(function(self, x, y, z) {
      var result = 0;
      if (window.voxelWorld) result = window.voxelWorld.getBlock(
        Sk.ffi.remapToJs(x), Sk.ffi.remapToJs(y), Sk.ffi.remapToJs(z)
      );
      return new Sk.builtin.int_(result);
    });

    $loc.postToChat = new Sk.builtin.func(function(self, msg) {
      var text = Sk.ffi.remapToJs(msg);
      if (window.voxelWorld) window.voxelWorld.postToChat(text);
      if (window.mcpiChatCallback) window.mcpiChatCallback(text);
      return Sk.builtin.none.none$;
    });
  }, 'Minecraft', []);

  mod.Minecraft = MinecraftClass;
  mod.Vec3 = Vec3;

  return mod;
};
