/* Original Canvas character. Reference: short tousled dark hair, fine silver
   glasses, dark windbreaker, warm skin. No external image or sprite dependency. */
(function () {
  'use strict';
  window.drawVeryHero = function (ctx, x, y, options = {}) {
    const scale = options.scale ?? 1;
    const facing = options.facing === -1 ? -1 : 1;
    const walk = Number(options.walk) || 0;
    const step = Math.sin(walk * 11) * 3;
    const bob = walk ? Math.abs(Math.sin(walk * 11)) * 1.1 : 0;
    const back = !!options.back;
    const floating = Number(options.float) || 0;
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(scale, scale);
    ctx.fillStyle = '#07121d66';
    ctx.beginPath(); ctx.ellipse(0, 1, 17, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.translate(0, -bob - floating);
    ctx.scale(facing, 1);
    if (options.inv) ctx.globalAlpha = .64;
    const r = (x,y,w,h,c) => {ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
    const poly = (pts,c) => {ctx.fillStyle=c;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fill();};
    // Feet and trouser legs, offset to give a genuine two-step run cycle.
    r(-9,-16+step,8,14,'#111a29');r(-8,-14+step,3,9,'#253348');
    r(2,-15-step,8,14,'#192334');r(3,-13-step,3,9,'#304057');
    r(-10,-4+step,10,5,'#0a111c');r(-10,-4+step,9,1,'#738592');
    r(2,-3-step,12,5,'#0b1420');r(3,-3-step,9,1,'#8a9ca6');
    // Windbreaker silhouette, lighter rim and layered fabric panels.
    poly([[-9,-36],[-14,-30],[-13,-17],[-10,-12],[10,-12],[13,-20],[11,-31],[6,-36]],'#101924');
    poly([[-9,-33],[-12,-28],[-10,-17],[-6,-14],[7,-14],[10,-22],[8,-31],[3,-34]],'#293442');
    poly([[-9,-32],[-5,-30],[-6,-17],[-10,-20]],'#415063');
    poly([[1,-32],[8,-30],[9,-20],[4,-22]],'#1c2837');
    r(-10,-16,19,3,'#172231');r(-5,-22,3,1,'#617083');
    r(4,-18,4,1,'#46596d');
    // Far arm, sleeve and hand.
    poly([[-10,-31],[-15,-28],[-16,-20],[-12,-18],[-9,-24]],'#1b2737');
    r(-16,-22,5,5,'#d19874');r(-15,-21,3,2,'#e9b18a');
    if (back) {
      // Back collar, hair and ear; no face/glasses magically visible through head.
      poly([[-6,-39],[-5,-33],[5,-32],[8,-37]],'#bd8666');
      poly([[-9,-50],[-13,-45],[-12,-37],[-6,-34],[7,-35],[12,-41],[9,-49]],'#201c20');
      poly([[-12,-45],[-14,-49],[-10,-50],[-11,-54],[-6,-53],[-4,-57],[0,-55],[4,-57],[6,-53],[11,-54],[10,-50],[13,-48],[11,-42]],'#17171d');
      r(-9,-48,3,2,'#3a302e');r(-4,-53,4,2,'#3b302c');r(5,-49,3,2,'#43342d');
      r(9,-41,3,5,'#cd9877');
      poly([[-7,-33],[0,-30],[7,-33],[8,-30],[1,-26],[-7,-30]],'#4a5663');
      r(-2,-25,1,10,'#596570');r(-7,-20,3,1,'#3f5060');
    } else {
      // Neck, three-quarter face and chin, visibly separate from the hair mass.
      r(-3,-38,8,7,'#be8563');
      poly([[-8,-48],[5,-50],[10,-46],[10,-40],[13,-37],[9,-35],[7,-31],[0,-31],[-6,-35],[-9,-41]],'#e6ad82');
      poly([[-7,-44],[-4,-40],[-3,-35],[2,-32],[-1,-31],[-7,-35],[-9,-42]],'#c68c68');
      r(7,-40,3,3,'#f5c295');r(8,-34,2,1,'#805548');
      // Distinct irregular cropped hair tufts, with sparse warm highlights.
      poly([[-10,-38],[-13,-44],[-12,-49],[-15,-50],[-10,-52],[-11,-55],[-6,-54],[-4,-58],[-1,-55],[3,-58],[5,-54],[10,-55],[9,-51],[13,-50],[11,-46],[8,-44],[5,-47],[2,-44],[-2,-46],[-5,-42],[-7,-38]],'#1c191c');
      poly([[-10,-50],[-6,-52],[-7,-49],[-2,-53],[2,-54],[0,-50],[7,-52],[5,-48],[1,-47],[-4,-48]],'#3b2c28');
      r(-11,-46,2,6,'#30252a');
      r(-9,-39,4,6,'#dca17b');r(-8,-38,2,3,'#a97055');
      // Fine silver frames across the bridge, clear blue glass and small dark pupil.
      ctx.strokeStyle='#d4e2e6';ctx.lineWidth=1.35;
      ctx.beginPath();ctx.moveTo(-8,-41);ctx.lineTo(-2,-40);ctx.stroke();
      ctx.fillStyle='#b9d8de55';ctx.fillRect(-2,-42,6,5);ctx.fillRect(6,-42,5,5);
      ctx.strokeRect(-2,-42,6,5);ctx.strokeRect(6,-42,5,5);
      ctx.beginPath();ctx.moveTo(4,-40);ctx.lineTo(6,-40);ctx.stroke();
      r(1,-40,1,2,'#293139');r(8,-40,1,2,'#293139');
      r(-1,-42,3,1,'#effbff');r(7,-42,3,1,'#effbff');
      poly([[-5,-34],[1,-31],[6,-34],[8,-31],[3,-28],[-3,-30]],'#4a5260');
      r(1,-29,1,14,'#bd9f67');r(2,-25,1,2,'#e9cb85');
    }
    // Forearm holds a compact pulse emitter, not a generic block gun.
    poly([[8,-30],[13,-28],[15,-22],[12,-18],[8,-21]],'#354457');
    r(11,-23,7,5,'#e5ab82');r(11,-23,3,1,'#f4c295');
    r(16,-25,5,10,'#132d3b');r(15,-26,15,7,'#122530');
    r(17,-25,12,4,'#547887');r(18,-25,9,1,'#b7d3d8');
    r(20,-23,8,2,'#52e1d2');r(28,-25,5,6,'#d5b96f');
    r(32,-24,3,4,'#b0fff0');r(19,-19,3,4,'#243e4a');
    ctx.restore();
  };
})();
