/* Original canvas pixel scenery and enemy silhouettes. No external assets. */
(function(){
'use strict';
window.drawFieldScenery=function(ctx,x,y,seed){
 ctx.save();ctx.translate(Math.round(x),Math.round(y));
 const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
 const p=(a,c)=>{ctx.fillStyle=c;ctx.beginPath();a.forEach((q,i)=>i?ctx.lineTo(...q):ctx.moveTo(...q));ctx.closePath();ctx.fill()};
 const s=Math.abs(Number(seed)||0)%1;
 if(s<.25){
 // Campus bench: separate back slats, seat, metal legs and a canvas bag.
 p([[-29,4],[27,4],[46,15],[-9,15]],'#17304027');
 r(-24,-15,4,23,'#536b70');r(22,-15,4,23,'#536b70');r(-25,-25,52,6,'#bd9364');r(-25,-17,52,5,'#bc8f5f');
 r(-25,-25,52,2,'#e2bd85');r(-25,-17,52,1,'#dab57f');r(-29,-8,60,8,'#a77953');r(-29,-8,60,2,'#dcaf75');
 r(-25,0,5,10,'#445e67');r(22,0,5,10,'#445e67');r(-26,9,7,2,'#344e59');r(21,9,7,2,'#344e59');
 r(-31,-14,4,9,'#5c7477');r(29,-14,4,9,'#5c7477');r(-31,-15,8,3,'#87a09c');r(25,-15,8,3,'#87a09c');
 r(5,-22,15,16,'#698c87');r(8,-26,9,4,'#455d63');r(10,-25,5,2,'#c0c5ac');r(7,-20,3,12,'#a1b5a0');r(10,-13,8,6,'#4e7475');r(10,-13,8,1,'#d6c28e');
 }else if(s<.5){
 // Bulletin board: glass-front frame, coloured notices and readable header.
 p([[-22,6],[23,6],[42,19],[4,19]],'#17304027');r(-22,-43,46,36,'#596f79');r(-19,-40,40,30,'#c6ba96');
 r(-21,-43,44,3,'#9caeaa');r(-18,-39,38,5,'#466f79');
 ctx.fillStyle='#eef0d3';ctx.font='bold 5px sans-serif';ctx.textAlign='center';ctx.fillText('校园公告',1,-35);
 r(-15,-30,13,16,'#f5e7bf');r(-13,-28,9,3,'#b88f7d');r(-13,-23,9,1,'#b6ab8a');r(-13,-20,7,1,'#b6ab8a');r(-13,-17,8,1,'#b6ab8a');
 r(2,-31,15,10,'#a9c6bd');r(4,-29,11,2,'#608e8d');r(4,-25,8,1,'#719b94');r(3,-19,14,7,'#d7ae91');r(5,-17,10,1,'#a27c6b');
 r(-16,-32,2,2,'#a66b58');r(8,-33,2,2,'#a66b58');r(9,-21,2,2,'#a66b58');
 r(-17,-7,5,18,'#536b74');r(14,-7,5,18,'#536b74');r(-20,9,11,3,'#81928f');r(11,9,11,3,'#81928f');r(19,-38,1,25,'#e7edcf');
 }else if(s<.75){
 // Street lamp with a warm glass lantern and a slim iron post.
 p([[-5,9],[7,9],[38,24],[28,27]],'#1730402b');r(-6,6,13,5,'#556c75');r(-4,3,9,5,'#7f918e');r(-2,-44,5,49,'#425c6b');r(-1,-43,1,46,'#9caaa0');
 r(-10,-53,21,4,'#425c6b');r(-8,-49,17,17,'#5e7180');r(-6,-47,13,13,'#e9c88a');r(-4,-45,9,10,'#ffe6a8');
 r(-8,-33,17,3,'#425c6b');r(-10,-55,21,2,'#7b8a8b');r(-6,-58,13,3,'#536c77');r(-1,-61,3,4,'#7e9498');r(-1,-48,2,17,'#75817d');
 ctx.fillStyle='#ffd88c13';ctx.beginPath();ctx.ellipse(0,-40,21,16,0,0,7);ctx.fill();
 }else{
 // Research desk, screen, keyboard, notebook and a mug, not a loot crate.
 p([[-29,5],[31,5],[48,17],[-8,17]],'#1730402b');r(-28,-6,5,19,'#526f77');r(26,-6,5,19,'#526f77');r(-31,-13,65,10,'#9a785c');r(-31,-13,65,3,'#d4b58a');
 r(-20,-43,32,24,'#344e60');r(-18,-41,28,19,'#7fb7c3');r(-16,-39,24,15,'#416c85');r(-15,-38,11,2,'#b8d9cd');r(-14,-33,15,1,'#7cc5bc');r(-14,-30,10,1,'#e5cc8d');r(-14,-27,18,1,'#8bafb9');
 r(-6,-19,5,5,'#677e85');r(-12,-15,18,3,'#496675');r(-18,-10,29,5,'#d2d5c0');for(let k=0;k<7;k++)r(-16+k*4,-9,2,1,'#75909a');
 r(17,-13,11,3,'#6a8a8e');r(17,-16,11,3,'#f5e4bf');r(18,-18,10,2,'#d6bd91');r(25,-18,1,5,'#c47f69');
 r(18,-27,9,11,'#c2d4c7');r(19,-26,7,2,'#f0e2bf');r(20,-25,5,2,'#826b57');r(27,-24,4,6,'#b7cac1');r(28,-23,2,3,'#425d6b');
 }
 ctx.restore();
};
window.drawFieldEnemy=function(ctx,e,t){
 ctx.save();ctx.translate(Math.round(e.x),Math.round(e.y));
 const r=(x,y,w,h,c)=>{ctx.fillStyle=e.flash>0?'#fff7cc':c;ctx.fillRect(x,y,w,h)};
 const label=(text,x,y,size,col)=>{ctx.fillStyle=col;ctx.font='bold '+size+'px sans-serif';ctx.textAlign='center';ctx.fillText(text,x,y)};
 ctx.fillStyle='#13213640';ctx.beginPath();ctx.ellipse(3,8,e.r+4,6,0,0,7);ctx.fill();
 ctx.translate(0,Math.sin(t*3+e.x*.03)*2);
 if(e.boss&&[9,10,11].includes(e.type)){
 // Daily pressure projections: paperwork, notifications, and endless revisions.
 const z=(e.r||32)/27;ctx.scale(z,z);const type=e.type;
 const cloth=type===9?'#6a8e85':type===10?'#547f9c':'#97768f';
 ctx.fillStyle='#b8c4cf20';ctx.beginPath();ctx.ellipse(0,-12,28,34,0,0,7);ctx.fill();
 r(-10,-8,8,19,'#394658');r(3,-8,8,19,'#394658');r(-11,8,11,4,'#273748');r(3,8,12,4,'#273748');
 r(-15,-30,30,24,cloth);r(-19,-26,6,20,cloth);r(13,-26,6,20,cloth);r(-8,-46,17,16,'#dfb394');
 r(-10,-48,21,7,'#453b44');r(-10,-43,4,10,'#453b44');r(-3,-38,2,2,'#51454c');r(5,-38,2,2,'#51454c');r(0,-33,4,1,'#b28278');
 if(type===9){
  r(-24,-21,34,35,'#876c53');r(-21,-18,28,28,'#f5e8c4');r(-13,-24,13,7,'#829b94');label('本周待办',-7,-8,7,'#6d7266');
  for(let i=0;i<3;i++){r(-17,-3+i*4,3,3,'#98a386');r(-11,-2+i*4,14-i*2,1,'#bbad8b')}
  r(14,-17,12,16,'#d5c39d');r(16,-15,8,2,'#a7987c');
 }else if(type===10){
  r(-15,-25,29,37,'#304d67');r(-12,-22,23,28,'#83c8e0');r(-10,-20,19,5,'#bdeaf0');
  for(let i=0;i<3;i++){r(-9,-11+i*5,16,3,i%2?'#d4e5dc':'#568fac')}
  r(9,-28,9,9,'#d77d79');label('9+',13,-21,6,'#fff1d3');r(-22,-33,12,8,'#8abaca');r(17,-14,12,8,'#abcdd2');
 }else{
  r(-25,-16,34,27,'#9a899e');r(-22,-19,34,26,'#c9b8ce');r(-19,-22,33,25,'#f5e6d1');label('再改一版',-2,-12,8,'#956e83');
  r(-15,-7,24,1,'#b29ea2');r(-15,-3,17,1,'#b29ea2');r(-7,-9,17,1,'#ca7c7b');r(2,-8,1,9,'#ca7c7b');
  r(17,-28,5,28,'#b7556b');r(18,-27,2,22,'#eea294');r(18,0,3,5,'#d0b08c');r(19,4,1,3,'#5f4b64');
 }
 ctx.fillStyle='#394657';ctx.fillRect(-32,-61,64,4);ctx.fillStyle=type===9?'#c3cfa0':type===10?'#8ec9de':'#d6a9bc';ctx.fillRect(-32,-61,64*Math.max(0,Math.min(1,e.hp/(e.max||1))),4);
 label(type===9?'待办压力':type===10?'消息与拖延':'比较与返工',0,-66,8,'#e7ded1');
 }else if(e.boss&&[6,7,8].includes(e.type)){
 // Larger symbolic event projections, drawn as ordinary people and paperwork.
 const z=(e.r||32)/27;ctx.scale(z,z);
 const robe=e.type===8,exam=e.type===6;
 const cloth=exam?'#728c8b':robe?'#45475e':'#4b647d';
 ctx.fillStyle='#aebed022';ctx.beginPath();ctx.ellipse(0,-12,27,35,0,0,7);ctx.fill();
 r(-10,-9,8,21,'#384357');r(3,-9,8,21,'#384357');r(-11,8,11,4,'#293445');r(3,8,13,4,'#293445');
 r(-15,-31,30,25,cloth);r(-19,-27,6,21,cloth);r(13,-27,6,21,cloth);r(-17,-9,5,6,'#d5ad96');r(14,-9,5,6,'#d5ad96');
 r(-8,-47,17,17,'#dfb497');r(-10,-49,21,8,'#3e3740');r(-10,-43,4,10,'#51404a');r(-3,-39,2,2,'#4a4652');r(5,-39,2,2,'#4a4652');r(0,-34,4,1,'#af8277');
 if(exam){
  r(-12,-30,4,20,'#a7bcb4');r(-1,-29,2,14,'#dce1cd');
  r(-24,-17,32,32,'#899d9b');r(-22,-19,30,31,'#fff1cb');r(-19,-16,24,3,'#b8ab8a');label('考卷',-7,-5,9,'#726b64');label('A B C',-7,4,7,'#8f8375');r(-18,7,20,1,'#c4b493');
  r(15,-25,8,14,'#d4bb80');r(17,-23,4,8,'#fff2cb');
 }else if(robe){
  r(-17,-30,34,35,'#46495f');r(-14,-27,5,28,'#69738c');r(9,-27,5,28,'#69738c');r(-7,-29,5,19,'#d6bd7b');r(3,-29,5,19,'#d6bd7b');
  r(-17,-54,34,5,'#34384f');r(-10,-50,20,5,'#454b62');r(13,-52,2,13,'#d9bb75');r(11,-41,5,6,'#d9bb75');
  r(-22,-5,36,18,'#706982');r(-20,-8,35,17,'#c8c2b1');r(-18,-11,34,17,'#ece2c5');r(-16,-14,33,17,'#fbf0d2');label('毕业论文',0,-4,8,'#786e70');r(-11,-1,23,1,'#c6b596');
 }else{
  r(-6,-30,12,17,'#e4e4d8');r(-1,-29,3,15,'#bd8a7a');r(-12,-30,5,18,'#7d93a2');r(7,-30,5,18,'#7d93a2');
  r(-21,-17,29,31,'#9caab0');r(-19,-19,28,30,'#f2ead4');label('简历',-5,-8,10,'#5c7181');r(-15,-4,19,2,'#a6b4b6');r(-15,1,16,1,'#afb9b6');r(-15,5,19,1,'#afb9b6');
  r(15,-18,11,14,'#806f5d');r(17,-21,7,3,'#bca47b');r(16,-16,9,2,'#bca47b');
 }
 const ratio=Math.max(0,Math.min(1,e.hp/(e.max||1)));
 ctx.fillStyle='#394657';ctx.fillRect(-32,-66,64,4);ctx.fillStyle=exam?'#b9ceaa':robe?'#c5b1d9':'#9fc6db';ctx.fillRect(-32,-66,64*ratio,4);
 label(exam?'考试压力':robe?'毕业压力':'求职压力',0,-71,8,'#e7ded1');
 }else if(e.boss){
 // A weary reflection of the protagonist, not a monster or a real teacher.
 const z=(e.r||30)/25;ctx.scale(z,z);
 ctx.fillStyle='#b6a5ce20';ctx.beginPath();ctx.ellipse(0,-13,23,31,0,0,7);ctx.fill();
 r(-9,-9,8,18,'#343344');r(3,-9,8,18,'#343344');r(-10,6,10,4,'#282939');r(3,6,12,4,'#282939');
 r(-14,-29,27,24,'#353544');r(-17,-26,6,22,'#424252');r(11,-24,6,22,'#424252');
 r(-15,-6,5,6,'#ae9290');r(12,-4,5,6,'#ae9290');r(-10,-27,4,16,'#535365');r(1,-24,1,17,'#8e8395');
 // Head is pitched forward; glasses sit lower and hair obscures the brow.
 r(-6,-41,20,19,'#bfa29a');r(-6,-28,5,7,'#957f85');r(8,-26,5,4,'#a68b8b');
 r(-10,-44,24,10,'#242332');r(-12,-39,6,13,'#2d2938');r(-7,-47,7,8,'#302b39');r(1,-49,6,10,'#292634');r(8,-46,7,12,'#332d3d');
 r(-4,-32,8,5,'#c7c1cf');r(7,-31,7,5,'#c7c1cf');r(-3,-31,6,3,'#756e82');r(8,-30,5,3,'#756e82');r(4,-30,3,1,'#ddd1d9');
 r(1,-25,7,1,'#8c737e');
 ctx.fillStyle='#394051';ctx.fillRect(-26,-61,52,4);ctx.fillStyle='#b3a0c5';ctx.fillRect(-26,-61,52*Math.max(0,Math.min(1,e.hp/(e.max||1))),4);
 label('压力',0,-65,8,'#d8cbdf');
 }else if(e.human){
 // Ordinary students / a reminder projection. Props explain the pressure;
 // nobody is presented as evil, and no real person's likeness is used.
 const step=Math.sin(t*9+e.x*.03)*2;
 const coat=['#668b88','#9a879e','#b38d64','#517d9b','#88739d','#708292','#667f9e','#8d8a76','#bb929b'][e.type]||'#b38d64';
 const light=['#a6bcb0','#c6b3cf','#dec49b','#95c5d9','#bdacd2','#b2c2cb','#a5bbd0','#d6b68b','#e3bbc1'][e.type]||'#dec49b';
 if(e.type===1){ctx.globalAlpha=.84;ctx.strokeStyle='#d6bedb88';ctx.strokeRect(-20,-45,41,55)}
 r(-9,-7,7,16+step,'#39485b');r(3,-7,7,16-step,'#39485b');r(-10,6+step,9,4,'#293747');r(3,6-step,11,4,'#293747');
 r(-12,-29,24,24,coat);r(-15,-26,5,17,coat);r(11,-26,5,17,coat);r(-10,-28,3,18,light);r(-4,-27,8,3,'#e2d3b8');
 r(-7,-43,16,16,'#e3b795');r(-9,-45,20,7,e.type===2?'#655047':'#3b3540');r(-9,-40,4,9,e.type===2?'#655047':'#3b3540');r(8,-40,3,7,'#5c4844');
 r(-3,-36,2,2,'#51454b');r(5,-36,2,2,'#51454b');r(1,-31,4,1,'#b38172');
 if(e.type===0){ // Group meeting message held in both hands.
 r(-9,-20,20,15,'#eee1bd');r(-7,-18,16,2,'#8f9b92');r(-7,-13,12,1,'#b5ad91');r(-7,-9,8,1,'#b5ad91');r(-13,-14,5,5,'#e4b391');r(10,-13,5,5,'#e4b391');
 label('组会',1,-21,7,'#e7e9cd');
 }else if(e.type===1){ // Phone notification as an abstract task reminder.
 r(5,-24,10,16,'#4c475d');r(7,-22,6,11,'#dfd1e8');r(8,-20,4,2,'#aa85a3');r(9,-16,2,3,'#b98594');r(12,-12,5,5,'#d5b0aa');r(-14,-11,5,5,'#d5b0aa');
 }else if(e.type===3){ // Attention pulled into a luminous screen, not an antagonist.
 r(-5,-24,13,18,'#233c57');r(-3,-22,9,13,'#83d8f1');r(-2,-21,7,4,'#b9f3ff');r(-1,-15,5,1,'#4f9fc9');r(-1,-12,5,1,'#4f9fc9');
 r(5,-25,5,5,'#ec7971');r(7,-24,1,2,'#fff0d3');r(-9,-12,5,5,'#e4b391');r(8,-12,5,5,'#e4b391');
 r(14,-34,10,7,'#83b3d1');r(14,-28,3,3,'#83b3d1');r(16,-32,6,1,'#e7f7ff');
 }else if(e.type===4){ // Repeated revisions and an oversized red editing pen.
 r(-12,-22,19,15,'#b4aac2');r(-10,-24,19,15,'#d7cde0');r(-8,-26,19,15,'#f6edda');
 r(-5,-23,12,1,'#b2a4b9');r(-5,-19,9,1,'#b2a4b9');r(-5,-15,11,1,'#ce8b90');r(-1,-21,7,1,'#d46b77');r(1,-20,1,5,'#d46b77');
 r(12,-28,4,19,'#bf4f65');r(13,-27,1,16,'#ffb1a3');r(12,-10,4,3,'#d6b183');r(13,-7,2,3,'#5d4c65');r(10,-16,5,5,'#dfb49e');r(-12,-13,5,5,'#dfb49e');
 }else if(e.type===5){ // An idealized comparison image, with ranking card and trophy.
 r(-13,-22,14,16,'#d5e1dc');r(-11,-19,10,2,'#91a7af');r(-11,-15,7,2,'#91a7af');r(-11,-11,4,2,'#91a7af');
 r(5,-25,10,8,'#d3ab59');r(4,-26,12,2,'#f4d990');r(7,-18,6,3,'#bc9048');r(9,-15,2,6,'#e4bf6a');r(6,-10,8,3,'#b58c49');
 r(2,-24,3,6,'#d3ab59');r(15,-24,3,6,'#d3ab59');r(4,-19,2,2,'#d3ab59');r(14,-19,2,2,'#d3ab59');r(-15,-11,4,5,'#d8b299');r(12,-9,4,5,'#d8b299');
 }else if(e.type===6){ // Sleep deprivation as a gentle tired reflection.
 r(-9,-27,3,17,'#a3b9ce');r(3,-24,1,1,'#e2e5d4');r(3,-19,1,1,'#e2e5d4');
 r(-6,-37,5,1,'#927f7c');r(3,-37,5,1,'#927f7c');r(-3,-36,2,2,'#e3b795');r(5,-36,2,2,'#e3b795');
 r(0,-32,4,4,'#9b7374');r(1,-31,2,2,'#e2b69e');
 r(-13,-18,26,13,'#b9c9d7');r(-11,-17,22,10,'#e2e4dc');r(-9,-16,18,2,'#f6f0df');r(-11,-8,20,2,'#c9d6d7');r(-15,-12,5,5,'#e1b69c');r(11,-12,5,5,'#e1b69c');
 // Crescent moon is assembled from lit pixel strips, with no dark face mask.
 r(13,-46,3,10,'#efd991');r(16,-49,4,3,'#efd991');r(16,-36,4,3,'#efd991');r(11,-43,2,5,'#efd991');r(18,-38,3,2,'#efd991');
 }else if(e.type===7){ // A worried thought loop, never a threatening expression.
 r(-12,-29,24,5,'#d69c65');r(-8,-25,6,15,'#d69c65');r(-7,-24,2,13,'#f0be85');r(-8,-11,6,2,'#a87756');
 r(-6,-16,5,5,'#ddb195');r(0,-16,5,5,'#ddb195');r(-3,-14,5,2,'#bb8d7f');
 ctx.strokeStyle='#d9b47f';ctx.lineWidth=1.5;ctx.beginPath();
 for(let i=0;i<=32;i++){let a=i*.4+t*.8,rr=3+i*.11;let xx=12+Math.cos(a)*rr,yy=-44+Math.sin(a)*rr*.6;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)}ctx.stroke();
 r(-5,-39,5,1,'#796366');r(4,-39,5,1,'#796366');r(0,-31,4,1,'#b38172');
 }else if(e.type===8){ // Warm blanket and tissues symbolize a day feeling unwell.
 r(-16,-27,32,22,'#bb929b');r(-13,-26,5,20,'#e0b8be');r(9,-26,5,20,'#d4a7b1');r(-8,-26,4,14,'#9d808f');r(5,-26,4,14,'#9d808f');
 r(-13,-8,27,3,'#a17f8f');r(-11,-27,6,3,'#edcbd0');r(7,-27,6,3,'#edcbd0');
 r(1,-34,4,3,'#d69d90');r(-2,-31,10,6,'#f5f0df');r(0,-33,6,7,'#fff7e7');r(5,-29,5,5,'#dfb095');
 r(-12,-16,12,9,'#c1b4cb');r(-11,-15,10,2,'#e6d7e3');r(-8,-19,5,4,'#fff1df');r(-9,-18,7,2,'#fff1df');
 }else{ // Exam revision student carrying an open textbook.
 r(-12,-20,25,15,'#6d735d');r(-10,-19,10,12,'#f1dfb8');r(2,-19,9,12,'#ffedc6');r(0,-18,2,13,'#bba87d');r(-8,-16,6,1,'#b6a382');r(4,-16,5,1,'#b6a382');r(-14,-12,4,5,'#e4b391');r(12,-12,4,5,'#e4b391');
 }
 if(e.shield>0){
  for(let i=0;i<3;i++){ctx.fillStyle='#344e6a';ctx.fillRect(-12+i*9,-53,7,6);ctx.fillStyle=i<e.shield?'#9bcbd9':'#687b8b';ctx.fillRect(-11+i*9,-52,5,4)}
 }
 }else if(e.type===1){
 // Red-orange alarm clock, with a readable clock face and twin bells.
 r(-16,-23,11,6,'#eaa85d');r(5,-23,11,6,'#eaa85d');r(-14,-25,7,3,'#ffcd7f');r(7,-25,7,3,'#ffcd7f');
 r(-16,-17,32,24,'#9f4b40');r(-18,-13,36,16,'#c96647');r(-13,-18,26,26,'#e69b62');
 r(-11,-16,22,22,'#fff2c9');r(-8,-13,16,16,'#f9e4b0');
 r(-1,-13,2,10,'#63535a');r(0,-5,7,2,'#b94f45');r(-2,-6,4,4,'#67515c');
 r(-12,7,5,5,'#694951');r(8,7,5,5,'#694951');r(-1,-18,2,3,'#c77b4b');r(-11,-6,3,2,'#c77b4b');
 label('DUE',0,18,8,'#ffe6b1');
 if(e.charge>0){ctx.strokeStyle='#ffcb73';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,-5,24,-.7,.7);ctx.stroke();ctx.beginPath();ctx.arc(0,-5,24,2.4,3.8);ctx.stroke()}
 }else if(e.type===2){
 // School examination sheet: rolled corners, rules, and multiple choice.
 r(-17,-28,34,36,'#81756a');r(-15,-27,30,34,'#e9d5ac');r(-13,-25,26,29,'#fff2cd');
 r(-18,-29,33,5,'#d1ba8b');r(-17,-29,30,2,'#fff6d8');r(11,3,7,5,'#b7a683');r(-15,4,26,3,'#e0cca4');
 label('考卷',0,-15,9,'#7d6558');r(-9,-11,18,1,'#b9a27b');label('A B C',0,-3,7,'#716b6a');
 label('?',10,4,10,'#bd6e57');r(-9,0,3,3,'#a7a086');r(-4,0,8,1,'#b7aa8d');
 }else{
 // A task clipboard, not a caricature of a teacher.
 r(-15,-28,30,38,'#745347');r(-13,-26,26,33,'#bb9062');r(-11,-24,22,29,'#f7e8bf');
 r(-6,-30,12,7,'#728b91');r(-3,-31,6,3,'#c2d7ce');r(-5,-29,10,2,'#a9c0b8');
 label('任务',0,-14,9,'#645c59');
 for(let i=0;i<3;i++){r(-8,-10+i*5,3,3,'#9aa98c');r(-7,-9+i*5,1,1,'#f7e8bf');r(-2,-9+i*5,10-i*2,1,'#b3a386')}
 r(-12,6,24,2,'#e1bb83');
 }
 ctx.restore();
};
window.drawLifeItem=function(ctx,x,y,kind,scale=1){
 ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(scale,scale);
 const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h)};
 ctx.fillStyle='#17304335';ctx.beginPath();ctx.ellipse(2,9,20,6,0,0,7);ctx.fill();
 if(kind==='gym'){
 r(-19,-10,7,20,'#294658');r(12,-10,7,20,'#294658');r(-17,-13,5,24,'#4f7484');r(12,-13,5,24,'#4f7484');
 r(-21,-7,3,14,'#1d3549');r(18,-7,3,14,'#1d3549');r(-12,-4,24,7,'#8ba8ad');r(-12,-4,24,2,'#e1e7cd');
 r(-16,-11,2,20,'#82a2a7');r(13,-11,2,20,'#82a2a7');for(let i=-7;i<9;i+=4)r(i,-1,1,3,'#526f7c');
 }else if(kind==='robot'){
 r(-20,-16,40,28,'#6a91a3');r(-17,-13,34,21,'#193a50');r(-23,12,46,5,'#9fbac0');r(-6,12,12,2,'#d5e6de');ctx.fillStyle='#a9f1da';ctx.font='bold 13px monospace';ctx.textAlign='center';ctx.fillText('AI',0,2);
 }else if(kind==='clock'){
 // Tomato timer: green crown, warm red casing, cream timing dial.
 r(-12,-13,24,25,'#b94e43');r(-16,-8,32,17,'#d66e50');r(-11,-15,22,4,'#ea8a61');r(-11,10,22,3,'#9b4943');
 r(-3,-21,5,8,'#587b52');r(-10,-18,9,4,'#83a15e');r(2,-18,9,4,'#6b8c55');r(-11,-9,3,8,'#f7a67b');
 r(-7,-8,17,16,'#f8e6bc');r(-5,-6,13,12,'#fff4d6');r(1,-6,2,8,'#7c625b');r(2,0,5,2,'#bf6550');
 r(-4,-2,2,1,'#b4a183');r(1,5,2,1,'#b4a183');r(6,-2,2,1,'#b4a183');
 }else if(kind==='bag'){
 // Campus backpack, padded straps, front pocket and brass zipper.
 r(-7,-21,14,5,'#364c59');r(-4,-20,8,3,'#96a5a0');r(-17,-8,5,21,'#344b58');r(12,-8,5,21,'#344b58');
 r(-12,-17,24,31,'#537d83');r(-15,-11,30,24,'#537d83');r(-10,-16,20,4,'#87a7a3');r(-13,-10,4,19,'#729791');
 r(-9,-4,19,15,'#365c6b');r(-8,-3,17,2,'#d6bf80');r(5,-2,2,5,'#f4daa0');r(-6,3,11,5,'#567e85');
 r(-4,-12,8,5,'#d5bc87');r(-2,-11,4,2,'#9a7c5f');r(-12,12,24,3,'#2c4b5b');
 }else if(kind==='meal'){
 // Open bento: rice, greens and golden omelette, warm wooden lid behind.
 r(-19,-18,38,12,'#ac7f52');r(-17,-16,34,8,'#e6c38b');r(-15,-14,30,4,'#cfa16e');
 r(-20,-6,40,21,'#8b644c');r(-18,-5,36,17,'#e0b47b');r(-16,-3,32,12,'#f7e6bd');r(0,-3,2,13,'#b99366');
 r(-14,-1,12,8,'#fff6db');r(-12,0,3,1,'#ded8b8');r(-8,3,4,1,'#ded8b8');r(-11,2,4,3,'#c96c55');
 r(4,-1,10,4,'#6b9a60');r(6,-2,5,2,'#9db875');r(4,5,10,3,'#e6ac4e');r(5,4,8,2,'#ffd585');
 r(-18,11,36,3,'#bd8b5a');r(-20,-7,40,2,'#f2d59c');
 }else if(kind==='camera'){
 r(-17,-11,34,22,'#24374a');r(-15,-12,30,21,'#4c6575');r(-10,-16,12,5,'#405464');r(-8,-15,8,2,'#93a7aa');r(9,-14,5,3,'#d7a967');
 r(-15,-9,29,4,'#91a4a5');r(-14,-3,5,9,'#304655');r(9,-3,5,9,'#304655');
 ctx.fillStyle='#172e42';ctx.beginPath();ctx.arc(1,0,10,0,7);ctx.fill();ctx.fillStyle='#8aa8ae';ctx.beginPath();ctx.arc(1,0,8,0,7);ctx.fill();ctx.fillStyle='#24495e';ctx.beginPath();ctx.arc(1,0,6,0,7);ctx.fill();
 r(-2,-4,3,3,'#8fd3d2');r(3,2,2,2,'#4e8d9e');r(-13,-8,4,2,'#ffe9aa');
 }else{
 // Open book with two separately shaded paper blocks and gold binding.
 r(-20,-12,40,23,'#547b6b');r(-18,-14,16,22,'#e0d9b7');r(2,-14,16,22,'#fff1c9');r(-2,-12,4,23,'#a9936c');
 r(-17,-12,14,18,'#f1e8c6');r(3,-12,14,18,'#fff6d6');r(-18,8,16,2,'#b4b797');r(2,8,16,2,'#c6bf9b');
 for(let i=0;i<4;i++){r(-14,-8+i*4,9-i%2*2,1,'#b6b397');r(5,-8+i*4,9-i%2*2,1,'#cabfa0')}
 r(12,-14,2,11,'#d58766');r(0,-9,1,17,'#e8c88e');
 }
 ctx.restore();
};
})();
