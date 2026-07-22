/* ═══════════════════════════════════════════════════════════
   voxel3d.js — 3D перспективний рендерер вокселів
   Minecraft Academy Web Shell
   ═══════════════════════════════════════════════════════════ */

const BLOCK_COLORS = {
  0:  null,                          // AIR
  1:  { top:'#9E9E9E', l:'#787878', r:'#5E5E5E' }, // STONE
  2:  { top:'#6AAF3D', l:'#5A8F30', r:'#4A7526' }, // GRASS
  3:  { top:'#9B7653', l:'#7B5633', r:'#5B3613' }, // DIRT
  4:  { top:'#7B7B6B', l:'#6B6B5B', r:'#5B5B4B' }, // COBBLESTONE
  5:  { top:'#C8A96E', l:'#A8894E', r:'#88692E' }, // WOOD_PLANKS
  6:  null,                          // SAPLING
  7:  { top:'#3A3A3A', l:'#2A2A2A', r:'#1A1A1A' }, // BEDROCK
  8:  { top:'#3D6FBF', l:'#2D5F9F', r:'#1D4F7F' }, // WATER
  9:  { top:'#3D6FBF', l:'#2D5F9F', r:'#1D4F7F' }, // WATER_STAT
  10: { top:'#E86D1F', l:'#C84D0F', r:'#A83D00' }, // LAVA
  12: { top:'#D9C99A', l:'#B9A97A', r:'#99895A' }, // SAND
  13: { top:'#9E8E7E', l:'#7E6E5E', r:'#5E4E3E' }, // GRAVEL
  14: { top:'#D4C040', l:'#B4A020', r:'#948000' }, // GOLD_ORE
  15: { top:'#A07898', l:'#807068', r:'#605848' }, // IRON_ORE
  16: { top:'#666666', l:'#444444', r:'#222222' }, // COAL_ORE
  17: { top:'#5C4A2A', l:'#4C3A1A', r:'#3C2A0A' }, // LOG
  18: { top:'#4A8A3A', l:'#3A7A2A', r:'#2A6A1A' }, // LEAVES
  20: { top:'#A8D8E8', l:'#88B8C8', r:'#6898A8' }, // GLASS
  35: { top:'#E8E8E8', l:'#C8C8C8', r:'#A8A8A8' }, // WOOL (white)
  41: { top:'#F0D040', l:'#D0B020', r:'#B09000' }, // GOLD_BLOCK
  42: { top:'#D8D8D8', l:'#B8B8B8', r:'#989898' }, // IRON_BLOCK
  45: { top:'#9A5A4A', l:'#7A3A2A', r:'#5A1A0A' }, // BRICK
  46: { top:'#CC2222', l:'#AA0000', r:'#880000' }, // TNT
  49: { top:'#2A244A', l:'#1A142A', r:'#0A0418' }, // OBSIDIAN
  57: { top:'#40E0E0', l:'#20C0C0', r:'#00A0A0' }, // DIAMOND_BLOCK
  73: { top:'#8B3030', l:'#6B1010', r:'#4B0000' }, // REDSTONE_ORE
  89: { top:'#FFEE77', l:'#DDCC55', r:'#BBAA33' }, // GLOWSTONE
};

// Wool color variants (block id=35, data=color)
const WOOL_COLORS = [
  { top:'#E8E8E8', l:'#C8C8C8', r:'#A8A8A8' }, // 0 white
  { top:'#E07830', l:'#C05810', r:'#A03800' }, // 1 orange
  { top:'#BD44BE', l:'#9D24AE', r:'#7D048E' }, // 2 magenta
  { top:'#6090D8', l:'#4070B8', r:'#205098' }, // 3 light blue
  { top:'#E8D840', l:'#C8B820', r:'#A89800' }, // 4 yellow
  { top:'#5CB85C', l:'#3C983C', r:'#1C781C' }, // 5 lime
  { top:'#E87898', l:'#C85878', r:'#A83858' }, // 6 pink
  { top:'#404040', l:'#202020', r:'#080808' }, // 7 gray
  { top:'#9898A8', l:'#787888', r:'#585868' }, // 8 light gray
  { top:'#208898', l:'#006878', r:'#004858' }, // 9 cyan
  { top:'#8040C0', l:'#6020A0', r:'#400080' }, // 10 purple
  { top:'#2040A0', l:'#002080', r:'#001060' }, // 11 blue
  { top:'#603018', l:'#401800', r:'#200800' }, // 12 brown
  { top:'#406020', l:'#204000', r:'#002000' }, // 13 green
  { top:'#A02828', l:'#800808', r:'#600000' }, // 14 red
  { top:'#181818', l:'#080808', r:'#000000' }, // 15 black
];

class VoxelWorld {
  constructor(canvas) {
    this.canvas  = canvas;
    this.ctx     = canvas.getContext('2d');
    this.blocks  = new Map(); // "x,y,z" -> {id, data}
    this.rotY    = 0.65;
    this.rotX    = 0.45;
    this.zoom    = 22;
    this.centerX = canvas.width  / 2;
    this.centerY = canvas.height / 2;
    this.dragging    = false;
    this.dragStart   = null;
    this._playerPos  = { x: 0, y: 64, z: 0 };
    this._chatLines  = [];
    this._setupEvents();
    this._drawEmpty();
  }

  /* ── Public API (mcpi interface) ──────────────── */

  setBlock(x, y, z, blockId, data = 0, _skipRender = false) {
    x = Math.round(x); y = Math.round(y); z = Math.round(z);
    if (blockId === 0) {
      this.blocks.delete(`${x},${y},${z}`);
    } else {
      // Cap total blocks to keep rendering fast
      if (this.blocks.size < 8000) {
        this.blocks.set(`${x},${y},${z}`, { id: blockId, data });
      }
    }
    if (!_skipRender) this._render();
  }

  setBlocks(x1, y1, z1, x2, y2, z2, blockId, data = 0) {
    const minX = Math.min(x1,x2), maxX = Math.max(x1,x2);
    const minY = Math.min(y1,y2), maxY = Math.max(y1,y2);
    const minZ = Math.min(z1,z2), maxZ = Math.max(z1,z2);
    for (let x = minX; x <= maxX; x++)
      for (let y = minY; y <= maxY; y++)
        for (let z = minZ; z <= maxZ; z++)
          this.setBlock(x, y, z, blockId, data, true); // skip per-block render
    this._render(); // single render after all blocks placed
  }

  getBlock(x, y, z) {
    const b = this.blocks.get(`${Math.round(x)},${Math.round(y)},${Math.round(z)}`);
    return b ? b.id : 0;
  }

  getPlayerPos()  { return { ...this._playerPos }; }
  setPlayerPos(x, y, z) {
    this._playerPos = { x, y, z };
    this._render();
  }

  postToChat(msg) {
    this._chatLines.push(String(msg));
    if (this._chatLines.length > 5) this._chatLines.shift();
    this._renderChat();
  }

  clear() {
    this.blocks.clear();
    this._chatLines = [];
    this._render();
  }

  resetCamera() {
    this.rotY = 0.65; this.rotX = 0.45; this.zoom = 22;
    this._render();
  }

  /* ── Projection ───────────────────────────────── */

  _project(x, y, z) {
    // Rotate Y
    const cosY = Math.cos(this.rotY), sinY = Math.sin(this.rotY);
    const rx =  x * cosY + z * sinY;
    const rz = -x * sinY + z * cosY;
    // Rotate X (pitch)
    const cosX = Math.cos(this.rotX), sinX = Math.sin(this.rotX);
    const ry  =  y * cosX - rz * sinX;
    const rz2 =  y * sinX + rz * cosX;
    // Perspective
    const fov = 600;
    const d   = fov / (fov + rz2 * 8 + 80);
    return {
      sx: rx * this.zoom * d + this.centerX,
      sy: -ry * this.zoom * d + this.centerY,
      depth: rz2
    };
  }

  /* ── Render ───────────────────────────────────── */

  _render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawGrid();

    if (this.blocks.size === 0) { this._drawEmpty(); return; }

    // Sort back→front (painter's algorithm)
    const entries = [];
    for (const [key, block] of this.blocks) {
      const [x, y, z] = key.split(',').map(Number);
      const c = this._project(x + 0.5, y + 0.5, z + 0.5);
      entries.push({ x, y, z, block, depth: c.depth });
    }
    entries.sort((a, b) => b.depth - a.depth);

    for (const e of entries) this._drawBlock(e.x, e.y, e.z, e.block);

    // Draw player marker
    const pp = this._playerPos;
    const pc = this._project(pp.x + 0.5, pp.y + 0.5, pp.z + 0.5);
    ctx.beginPath();
    ctx.arc(pc.sx, pc.sy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#FF4444';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    this._renderChat();
  }

  _drawGrid() {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    const size = 8;
    for (let i = -size; i <= size; i++) {
      const a = this._project(i, 0, -size);
      const b = this._project(i, 0,  size);
      const c = this._project(-size, 0, i);
      const d = this._project( size, 0, i);
      ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(c.sx, c.sy); ctx.lineTo(d.sx, d.sy); ctx.stroke();
    }
  }

  _drawEmpty() {
    const ctx = this.ctx;
    this._drawGrid();
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.textAlign = 'center';
    ctx.fillText('Запусти код — блоки з\'являться тут', this.canvas.width/2, this.canvas.height/2 - 10);
    ctx.font = '12px monospace';
    ctx.fillText('перетягни мишею щоб обертати • колесо для зуму', this.canvas.width/2, this.canvas.height/2 + 12);
    ctx.textAlign = 'left';
  }

  _drawBlock(x, y, z, block) {
    let colors = BLOCK_COLORS[block.id];
    if (!colors) return;
    if (block.id === 35) colors = WOOL_COLORS[block.data % 16] || WOOL_COLORS[0];

    // pts[0..3] = bottom ring, pts[4..7] = top ring (same XZ order)
    //  0:(x,y,z)  1:(x+1,y,z)  2:(x+1,y,z+1)  3:(x,y,z+1)
    //  4:(x,y+1,z) 5:(x+1,y+1,z) 6:(x+1,y+1,z+1) 7:(x,y+1,z+1)
    const pts = [
      this._project(x,   y,   z  ),
      this._project(x+1, y,   z  ),
      this._project(x+1, y,   z+1),
      this._project(x,   y,   z+1),
      this._project(x,   y+1, z  ),
      this._project(x+1, y+1, z  ),
      this._project(x+1, y+1, z+1),
      this._project(x,   y+1, z+1),
    ];

    const drawFace = (indices, color) => {
      const ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(pts[indices[0]].sx, pts[indices[0]].sy);
      for (let i = 1; i < indices.length; i++)
        ctx.lineTo(pts[indices[i]].sx, pts[indices[i]].sy);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    const sinY = Math.sin(this.rotY);
    const cosY = Math.cos(this.rotY);

    // Camera world direction ≈ (+sinY, h, -cosY).
    // A face is visible when its outward normal dot camera-direction > 0.
    //   +X face (normal +X): visible when sinY > 0
    //   -X face (normal -X): visible when sinY < 0
    //   -Z face (normal -Z): visible when cosY > 0  (camera in -Z → block's -Z face faces camera)
    //   +Z face (normal +Z): visible when cosY < 0

    // The face whose axis is more aligned with the camera gets the lighter shade.
    const xIsFront = Math.abs(sinY) > Math.abs(cosY);
    const xColor   = xIsFront ? colors.l : colors.r;
    const zColor   = xIsFront ? colors.r : colors.l;

    // Top face — always visible from above
    drawFace([4, 5, 6, 7], colors.top);

    // X-axis side: whichever face points toward camera
    if (sinY >= 0) drawFace([1, 5, 6, 2], xColor);  // +X face
    else            drawFace([0, 4, 7, 3], xColor);  // -X face

    // Z-axis side: whichever face points toward camera
    if (cosY >= 0) drawFace([0, 4, 5, 1], zColor);  // -Z face
    else            drawFace([3, 7, 6, 2], zColor);  // +Z face
  }

  _renderChat() {
    if (!this._chatLines.length) return;
    const ctx = this.ctx;
    ctx.font = '13px monospace';
    const y0 = this.canvas.height - 12 - this._chatLines.length * 20;
    this._chatLines.forEach((line, i) => {
      const text = '💬 ' + line;
      const w = ctx.measureText(text).width + 16;
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(8, y0 + i*20 - 14, w, 18);
      ctx.fillStyle = '#FFFDE7';
      ctx.fillText(text, 16, y0 + i*20);
    });
  }

  /* ── Mouse events ─────────────────────────────── */

  _setupEvents() {
    const el = this.canvas;
    el.addEventListener('mousedown', e => {
      this.dragging  = true;
      this.dragStart = { mx: e.clientX, my: e.clientY, ry: this.rotY, rx: this.rotX };
    });
    el.addEventListener('mousemove', e => {
      if (!this.dragging) return;
      const dx = e.clientX - this.dragStart.mx;
      const dy = e.clientY - this.dragStart.my;
      this.rotY = this.dragStart.ry + dx * 0.012;
      this.rotX = Math.max(0.05, Math.min(1.3, this.dragStart.rx + dy * 0.012));
      this._render();
    });
    el.addEventListener('mouseup',   () => this.dragging = false);
    el.addEventListener('mouseleave',() => this.dragging = false);
    el.addEventListener('wheel', e => {
      e.preventDefault();
      this.zoom = Math.max(8, Math.min(50, this.zoom - e.deltaY * 0.06));
      this._render();
    }, { passive: false });

    // Touch support
    let lastTouchDist = null;
    el.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        this.dragging  = true;
        this.dragStart = { mx: e.touches[0].clientX, my: e.touches[0].clientY, ry: this.rotY, rx: this.rotX };
      }
    });
    el.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 1 && this.dragging) {
        const dx = e.touches[0].clientX - this.dragStart.mx;
        const dy = e.touches[0].clientY - this.dragStart.my;
        this.rotY = this.dragStart.ry + dx * 0.012;
        this.rotX = Math.max(0.05, Math.min(1.3, this.dragStart.rx + dy * 0.012));
        this._render();
      } else if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX,
                             e.touches[0].clientY - e.touches[1].clientY);
        if (lastTouchDist !== null) this.zoom = Math.max(8, Math.min(50, this.zoom + (d - lastTouchDist) * 0.1));
        lastTouchDist = d;
        this._render();
      }
    }, { passive: false });
    el.addEventListener('touchend', () => { this.dragging = false; lastTouchDist = null; });
  }
}
