/* Original pressure encounters: fixed warnings are readable before every attack.
   All coordinates are world-space. No attacks aim at the player after warning. */
function initPressureBoss(e){
 const hp={9:1000,10:1350,6:1800,11:2200,7:2700,8:3200,3:3800}[e.type]||1200;
 e.hp=e.max=hp*3*difficulty;e.damageBudget=e.max/36;e.guardRate=e.max/36;e.cd=.2;e.bossStep=0;e.bossPhase=0;e.bossWarnings=[];e.summonCD=4;
}
function pressureShot(e,x,y,a,speed=145,damage=8){
 projectile(x,y,a,damage,true);let b=bullets[bullets.length-1];
 b.vx=Math.cos(a)*speed;b.vy=Math.sin(a)*speed;b.life=5;
}
function bossWarn(e,kind,data,delay=1.05){e.bossWarnings.push({kind,...data,left:delay,total:delay,done:false,linger:.32});}
function updatePressureBoss(e,dt){
 e.bossWarnings??=[];e.damageBudget=Math.min(e.guardRate,e.damageBudget+e.guardRate*dt);
 // Warnings freeze with the camera stun rather than resolving invisibly.
 for(let w of e.bossWarnings){
  w.left-=dt;
  if(w.left<=0&&!w.done){w.done=true;
   if(w.kind==='trial'){beginLifeTrial(e);}else if(w.kind==='summon'){summonBossMinions(e,w.count); }else if(w.kind==='disc'){
    ring(w.x,w.y,w.r,'#f6c19a',.45);
    if(len(p.x-w.x,p.y-w.y)<w.r+p.r)hurt(w.damage*difficulty*(1+.18*((e.day||1)-1)));
    particle(w.x,w.y,'#efd3a0',7);
   }else if(w.kind==='fan'){
    for(let i=0;i<w.count;i++){let a=w.angle+(i-(w.count-1)/2)*w.spread;pressureShot(e,w.x,w.y,a,w.speed,w.damage)}
   }else if(w.kind==='ring'){
    for(let i=0;i<w.count;i++){let a=i*TAU/w.count,delta=Math.atan2(Math.sin(a-w.gap),Math.cos(a-w.gap));if(Math.abs(delta)<w.safe)continue;pressureShot(e,w.x,w.y,a,w.speed,w.damage)}
   }else if(w.kind==='line'){
    const vx=w.x2-w.x,vy=w.y2-w.y,ll=vx*vx+vy*vy,at=clamp(((p.x-w.x)*vx+(p.y-w.y)*vy)/(ll||1),0,1);
    if(len(p.x-w.x-at*vx,p.y-w.y-at*vy)<w.width/2+p.r)hurt(w.damage*difficulty*(1+.18*((e.day||1)-1)));
   }
   sound(180,.12,'triangle',.025);
  }
 }
 e.bossWarnings=e.bossWarnings.filter(w=>w.left>-w.linger);
 if(!e.seen||!onScreen(e))return;

 const phase=e.hp/e.max<.34?2:e.hp/e.max<.67?1:0;
 if(phase>e.bossPhase){e.bossPhase=phase;notice(({9:'周一：待办开始叠起来',10:'周二：消息又多了一轮',11:'周四：先完成，别急着比较',6:'考试：附加题来了',7:'求职：进入下一轮',8:'毕业：进入下一阶段',3:'先停一停，听听自己'}[e.type]||'下一阶段')+' · 留意地面预告');ring(e.x,e.y,100,'#d8c4ee',.8)}
 e.cd-=dt;if(e.cd>0)return;
 e.cd+=bossSkillInterval(e);
 let castRoll=gameRandom();
 if(castRoll<.15){e.bossStep++;e.skillName=lifeTrials[e.type][0];bossWarn(e,'trial',{x:p.x,y:p.y,r:65},1.2);notice('即将：'+e.skillName+' · '+lifeTrials[e.type][1]);return;}
 if(castRoll<.40&&enemies.filter(q=>!q.dead).length<420){e.bossStep++;let count=20+10*((e.day||1)-1);e.skillName=({9:'任务分派',10:'消息转发',6:'加试题海',11:'返工清单',7:'面试加轮',8:'答辩追问',3:'杂念回响'}[e.type]);bossWarn(e,'summon',{x:e.x,y:e.y,r:115,count},1.6);notice(e.skillName+'：即将召唤 '+count+' 项困难');return;}
 const a=Math.atan2(p.y-e.y,p.x-e.x),step=Math.floor(gameRandom()*3);e.attackStep=(e.attackStep||0)+1;e.bossStep++;
 e.skillName=({9:['待办三连','临时加项','截止冲线'],10:['消息轰炸','免打扰缺口','催办双响'],6:['选择题弹幕','突击点名','限时交卷'],11:['平行比较','返工回环','修改意见'],7:['延迟回信','追问连发','终面围场'],8:['三轮修改','答辩追问','终稿连击'],3:['灰色回声','情绪雨落','自我追问']}[e.type]||[])[step];notice(e.skillName+' · 留意橙色预警');
 // Warning geometry is locked now; the player has at least a full second to leave.
 if(e.type===9){
  // Monday: a short checklist fan, then two separate tasks, then one deadline lane.
  if(step===0)bossWarn(e,'fan',{x:e.x,y:e.y,angle:a,count:3+phase*2,spread:.32,speed:115,damage:7},1.2);
  else if(step===1){for(let i=0;i<2;i++)bossWarn(e,'disc',{x:p.x+i*90*Math.cos(a+1.57),y:p.y+i*90*Math.sin(a+1.57),r:37+phase*3,damage:9},1.2+i*.5)}
  else bossWarn(e,'line',{x:e.x,y:e.y,x2:e.x+Math.cos(a)*300,y2:e.y+Math.sin(a)*300,width:32+phase*4,damage:10},1.25);
 }else if(e.type===10){
  // Tuesday: notifications arrive in delayed batches, but never retarget mid-warning.
  if(step===0){for(let i=0;i<2+phase;i++)bossWarn(e,'fan',{x:e.x,y:e.y,angle:a+(i%2?-.2:.2),count:3,spread:.24,speed:125,damage:6},1.15+i*.5)}
  else if(step===1){bossWarn(e,'ring',{x:e.x,y:e.y,count:16+phase*2,gap:a,safe:.8,speed:105,damage:7},1.2)}
  else{bossWarn(e,'disc',{x:p.x,y:p.y,r:45,damage:10},1.25);bossWarn(e,'disc',{x:e.x,y:e.y,r:70,damage:9},1.8)}
 }else if(e.type===11){
  // Thursday: revise two parallel lanes or step through the clear comparison gap.
  if(step===0){let nx=Math.cos(a+1.57),ny=Math.sin(a+1.57);for(let i of [-1,1])bossWarn(e,'line',{x:e.x+nx*i*65,y:e.y+ny*i*65,x2:e.x+nx*i*65+Math.cos(a)*360,y2:e.y+ny*i*65+Math.sin(a)*360,width:30,damage:10},1.2+(i>0?.35:0))}
  else if(step===1){bossWarn(e,'ring',{x:e.x,y:e.y,count:20,gap:a,safe:.65,speed:120,damage:7},1.2);if(phase>0)bossWarn(e,'disc',{x:p.x,y:p.y,r:38,damage:10},1.75)}
  else{bossWarn(e,'fan',{x:e.x,y:e.y,angle:a,count:5+phase*2,spread:.26,speed:135,damage:8},1.15)}
 }else if(e.type===6){
  if(step===0){bossWarn(e,'fan',{x:e.x,y:e.y,angle:a,count:5+phase*2,spread:.25,speed:130+phase*10,damage:8},1.1)}
  else if(step===1){
   bossWarn(e,'disc',{x:p.x,y:p.y,r:48,damage:12},1.2);
   if(phase>0)bossWarn(e,'disc',{x:p.x+90*Math.cos(a+1.57),y:p.y+90*Math.sin(a+1.57),r:43,damage:10},1.5);
  }else{bossWarn(e,'ring',{x:e.x,y:e.y,count:18+phase*3,gap:a,safe:.55,speed:125,damage:7},1.15)}
 }else if(e.type===7){
  e.replyBurst=step===0;
  if(step===0){ // A fixed reply lane, then a delayed parallel lane; no tracking.
   const reach=Math.min(430,Math.max(vw,vh)*.65),nx=Math.cos(a+1.57),ny=Math.sin(a+1.57);
   bossWarn(e,'line',{x:e.x,y:e.y,x2:e.x+Math.cos(a)*reach,y2:e.y+Math.sin(a)*reach,width:40,damage:12},1.15);
   if(phase>0)bossWarn(e,'line',{x:e.x+nx*82,y:e.y+ny*82,x2:e.x+nx*82+Math.cos(a)*reach,y2:e.y+ny*82+Math.sin(a)*reach,width:34,damage:10},1.75);
  }else if(step===1){bossWarn(e,'fan',{x:e.x,y:e.y,angle:a,count:3+phase*2,spread:.28,speed:165,damage:8},1.05)}
  else{bossWarn(e,'disc',{x:p.x,y:p.y,r:54,damage:11},1.25);bossWarn(e,'ring',{x:e.x,y:e.y,count:16,gap:a,safe:.65,speed:110,damage:7},1.4)}
 }else if(e.type===8){
  if(step===0){ // Three revision piles, spread apart rather than carpeting the screen.
   let spread=Math.min(115,vw*.24);for(let i=-1;i<=1;i++)bossWarn(e,'disc',{x:p.x+i*spread,y:p.y+(i===0?0:65),r:38+phase*3,damage:10},1.15+Math.abs(i)*.25);
  }else if(step===1){bossWarn(e,'ring',{x:e.x,y:e.y,count:22,gap:a,safe:.62,speed:115+phase*10,damage:8},1.15)}
  else{bossWarn(e,'fan',{x:e.x,y:e.y,angle:a,count:7+phase*2,spread:.22,speed:125,damage:8},1.1);if(phase===2)bossWarn(e,'disc',{x:p.x,y:p.y,r:42,damage:10},1.65)}
 }else{
  if(step===0)bossWarn(e,'ring',{x:e.x,y:e.y,count:18,gap:a,safe:.75,speed:115,damage:7},1.25);
  else if(step===1)bossWarn(e,'disc',{x:p.x,y:p.y,r:52,damage:10},1.3);
  else bossWarn(e,'fan',{x:e.x,y:e.y,angle:a,count:5,spread:.3,speed:135,damage:7},1.15);
 }
 // cadence preserves frame remainder.
}
function drawPressureWarnings(ctx){
 ctx.save();
 for(let e of enemies){if(!e.boss||e.dead)continue;for(let w of e.bossWarnings||[]){
  let progress=clamp(1-w.left/w.total,0,1);ctx.lineWidth=w.done?3:2;ctx.strokeStyle=w.done?'#fff0b9':'#f4b482';ctx.fillStyle=w.done?'#f9c79655':'#e7a36c20';ctx.setLineDash(w.done?[]:[6,5]);
  if(w.kind==='disc'||w.kind==='summon'||w.kind==='trial'){ctx.beginPath();ctx.arc(w.x,w.y,w.r,0,TAU);ctx.fill();ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.arc(w.x,w.y,w.r+4,-Math.PI/2,-Math.PI/2+TAU*progress);ctx.stroke()}
  else if(w.kind==='line'){ctx.save();ctx.translate(w.x,w.y);ctx.rotate(Math.atan2(w.y2-w.y,w.x2-w.x));let length=len(w.x2-w.x,w.y2-w.y);ctx.fillRect(0,-w.width/2,length,w.width);ctx.strokeRect(0,-w.width/2,length,w.width);ctx.restore()}
  else if(!w.done&&w.kind==='fan'){for(let i=0;i<w.count;i++){let a=w.angle+(i-(w.count-1)/2)*w.spread;ctx.beginPath();ctx.moveTo(w.x+Math.cos(a)*25,w.y+Math.sin(a)*25);ctx.lineTo(w.x+Math.cos(a)*125,w.y+Math.sin(a)*125);ctx.stroke()}}
  else if(!w.done&&w.kind==='ring'){ctx.beginPath();ctx.arc(w.x,w.y,70,w.gap+w.safe,w.gap+TAU-w.safe);ctx.stroke();ctx.setLineDash([]);ctx.strokeStyle='#bce6bc';ctx.beginPath();ctx.moveTo(w.x+Math.cos(w.gap)*35,w.y+Math.sin(w.gap)*35);ctx.lineTo(w.x+Math.cos(w.gap)*100,w.y+Math.sin(w.gap)*100);ctx.stroke()}
 }}ctx.restore();
}
function drawPressureBossHUD(ctx){
 if(!p||!['play','paused','story','upgrade','activity'].includes(mode))return;
 const active=enemies.filter(e=>e.boss&&!e.dead);if(!active.length)return;
 active.sort((a,b)=>len(a.x-p.x,a.y-p.y)-len(b.x-p.x,b.y-p.y));const e=active[0];if(active.length>1){drawMultiBossHUD(ctx,active);return;}
 const width=Math.min(430,vw-32),x=(vw-width)/2,y=112,ratio=clamp(e.hp/e.max,0,1),phase=ratio<.34?3:ratio<.67?2:1;
 ctx.save();ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#172934ec';ctx.fillRect(x-8,y-19,width+16,48);
 ctx.font='bold '+(vw<450?11:13)+'px system-ui';ctx.textAlign='left';ctx.fillStyle='#f8dfb5';
 ctx.fillText((['','周一','周二','周三','周四','周五','周六','周日'][e.day]||'')+' '+({9:'待办清单',10:'消息与拖延',6:'考试周',11:'比较与返工',7:'求职季',8:'毕业关',3:'另一个自己'}[e.type]||'阶段挑战')+' · 阶段 '+phase+'/3'+(active.length>1?' · 共 '+active.length+' 项挑战':''),x,y-4);
 ctx.textAlign='right';ctx.fillStyle='#d7d4df';ctx.fillText('压力 '+Math.ceil(ratio*100)+'%',x+width,y-4);
 ctx.fillStyle='#40505d';ctx.fillRect(x,y+4,width,10);ctx.fillStyle={9:'#c3cfa0',10:'#8ec9de',11:'#d6a9bc',6:'#e7bc76',7:'#8bc7dc',8:'#bba6d9',3:'#b3abc7'}[e.type]||'#d6c1a0';ctx.fillRect(x,y+4,width*ratio,10);
 ctx.fillStyle='#243440';ctx.fillRect(x+width*.34,y+4,2,10);ctx.fillRect(x+width*.67,y+4,2,10);
 ctx.font='10px system-ui';ctx.textAlign='center';ctx.fillStyle='#c5d3c8';ctx.fillText((e.skillName||'挑战准备中')+' · 每'+bossSkillInterval(e).toFixed(1)+'秒施法',vw/2,y+25);ctx.restore();
}

function summonBossMinions(e,count){if(enemies.filter(q=>!q.dead).length>=420){notice('场上困难已满，召唤暂缓');return;}let offset=Math.floor(gameRandom()*9);for(let i=0;i<count;i++){addEnemy((offset+i+Math.floor(i/9)*3)%9);let q=enemies[enemies.length-1],a=i*TAU/count+gameRandom()*.12,r=270+gameRandom()*160;q.x=p.x+Math.cos(a)*r;q.y=p.y+Math.sin(a)*r;q.stun=1.2;q.summoned=true;ring(q.x,q.y,20,'#dcafea',.8)}notice('召唤到场：'+count+' 项困难 · 自然刷新仍暂停')}

function bossSkillInterval(e){return Math.max(1.3,2.5-.2*((e.day||1)-1))}

const lifeTrials={9:['待办压肩','走进绿色分工圈，卸下负担',6],10:['消息刷屏','移到免打扰圈，清空弹窗',5],6:['限时审题','走进答题圈，恢复攻击节奏',6],11:['比较滤镜','靠近真实目标标记，拆掉护盾',6],7:['作品集投递','收集三份作品，获得伤害加成',8],8:['终稿返工','找到存档点，停止技能冷却倒流',6],3:['低谷雨夜','到暖光里歇一会儿，恢复精力',7]};
function beginLifeTrial(e){let a=Math.atan2(p.y-e.y,p.x-e.x);e.trial={kind:e.type,left:lifeTrials[e.type][2],x:p.x+Math.cos(a+1.1)*95,y:p.y+Math.sin(a+1.1)*95,done:false,tokens:[]};if(e.type===7)for(let i=0;i<3;i++){let angle=a+i*2.1;e.trial.tokens.push({x:p.x+Math.cos(angle)*100,y:p.y+Math.sin(angle)*100,got:false})}notice(lifeTrials[e.type][0]+'：'+lifeTrials[e.type][1]);}
function updateLifeTrials(dt){for(let e of enemies){let q=e.trial;if(!q||e.dead)continue;q.left-=dt;if(q.left<=0){e.trial=null;continue}if(q.kind===7){for(let token of q.tokens)if(!token.got&&len(p.x-token.x,p.y-token.y)<35){token.got=true;sound(800,.08)}if(q.tokens.every(k=>k.got))q.done=true;}else if(len(p.x-q.x,p.y-q.y)<38){q.done=true;if(q.kind===3)healPlayer(dt*7);}if(q.kind===8&&!q.done&&!quietActive()&&p.cd>0)p.cd=Math.min(8,p.cd+dt*1.7);}}
function trialActive(kind){if(quietActive())return null;return enemies.find(e=>!e.dead&&e.trial&&e.trial.left>0&&e.trial.kind===kind&&!e.trial.done)}
function trialDamage(e,d){if(e.trial?.kind===11&&!e.trial.done)return d*.4;if(enemies.some(b=>b.trial?.kind===7&&b.trial.done))return d*1.5;return d;}
function drawLifeTrialWorld(ctx){for(let e of enemies){let q=e.trial;if(!q||e.dead)continue;ctx.save();ctx.textAlign='center';ctx.font='12px system-ui';if(q.kind===7){for(let k of q.tokens){if(k.got)continue;ctx.fillStyle='#f3d896';ctx.fillRect(k.x-12,k.y-15,24,30);ctx.fillStyle='#27363b';ctx.fillText('作品',k.x,k.y+4)}}else{ctx.fillStyle=q.done?'#94d9c555':'#8ee7bb30';ctx.strokeStyle='#b3ffd5';ctx.lineWidth=3;ctx.beginPath();ctx.arc(q.x,q.y,38,0,TAU);ctx.fill();ctx.stroke();ctx.fillStyle='#e6ffee';ctx.fillText(q.kind===3?'暖光':q.done?'已完成':'解围点',q.x,q.y+4);}if(q.kind===11&&!q.done){ctx.globalAlpha=.35;for(let side of [-1,1])drawVeryHero(ctx,e.x+side*70,e.y,{scale:1.2,facing:side,walk:0});}ctx.restore();}}
function drawLifeTrialScreen(ctx){let all=enemies.filter(e=>e.trial&&!e.dead),e=all.find(e=>!e.trial.done&&[10,3].includes(e.trial.kind))||all[0];if(!e)return;let q=e.trial;ctx.save();if(!quietActive()&&!q.done&&[10,3].includes(q.kind)){ctx.fillStyle=q.kind===3?'#171c3b9c':'#15303de0';let width=Math.min(90,vw*.18);ctx.fillRect(0,180,width,vh-290);ctx.fillRect(vw-width,180,width,vh-290);if(q.kind===10){ctx.fillStyle='#f0dce9';ctx.font='12px system-ui';for(let y=220;y<vh-120;y+=65){ctx.fillText('新消息…',8,y);ctx.fillText('请回复',vw-width+8,y)}}}ctx.textAlign='center';ctx.fillStyle='#f6deb5';ctx.font='bold 12px system-ui';all.forEach((owner,i)=>{let state=owner.trial;ctx.fillText(lifeTrials[state.kind][0]+' · '+(state.done?'已解围':lifeTrials[state.kind][1]),vw/2,(enemies.filter(e=>e.boss&&!e.dead).length>1?211:182)+i*16)});ctx.restore();}

function drawMultiBossHUD(ctx,active){ctx.save();ctx.setTransform(dpr,0,0,dpr,0,0);let width=Math.min(430,vw-24),x=(vw-width)/2;for(let i=0;i<active.length;i++){let e=active[i],y=105+i*29,r=clamp(e.hp/e.max,0,1);ctx.fillStyle='#162b35ee';ctx.fillRect(x-5,y-12,width+10,27);ctx.fillStyle='#f0dcbb';ctx.font='bold 11px system-ui';ctx.textAlign='left';ctx.fillText(lifeTrials[e.type][0]+' · 阶段'+(r<.34?3:r<.67?2:1),x,y);ctx.textAlign='right';ctx.fillText(Math.ceil(r*100)+'%',x+width,y);ctx.fillStyle='#425965';ctx.fillRect(x,y+5,width,5);ctx.fillStyle=['#e9bf8b','#b8a4d7','#94d7ca'][i];ctx.fillRect(x,y+5,width*r,5);}ctx.restore();}
