/* Read-only illustrated mechanism loops. Shared in-game silhouettes; not a live run.
   No gameplay state, random generator, storage or audio is touched here. */
(function(){
'use strict';
let frame=0,observer=null,items=[],last=0;
const tau=Math.PI*2,clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
function label(c,s,y=176,col='#d9e7df'){c.fillStyle='#223640';c.fillRect(0,y-14,320,21);c.fillStyle=col;c.font='12px system-ui';c.textAlign='center';c.fillText(s,160,y,304)}
function circle(c,x,y,r,col,fill=false){c.beginPath();c.arc(x,y,Math.max(0,r),0,tau);c.strokeStyle=col;c.fillStyle=col;fill?c.fill():c.stroke()}
function line(c,x,y,xx,yy,col='#edd694'){c.strokeStyle=col;c.beginPath();c.moveTo(x,y);c.lineTo(xx,yy);c.stroke()}
function hero(c,x=100,y=126,t=0){drawVeryHero(c,x,y,{scale:.95,facing:1,walk:t})}
function enemy(c,id,x=245,y=124,t=0,boss=false){drawFieldEnemy(c,{x,y,type:+id,boss,r:boss?30:+id===2?20:13,human:true,hp:100,max:100,flash:0,col:'#87b8a2'},t)}
function item(c,id,x=35,y=65,s=.9){drawLifeItem(c,x,y,id,s)}
function bullet(c,x,y,col='#f6d889',r=3){circle(c,x,y,r,col,true)}
function bar(c,x,y,q,col='#e77e78',w=44){c.fillStyle='#17252e';c.fillRect(x,y,w,5);c.fillStyle=col;c.fillRect(x,y,w*clamp(q),5)}
function freeze(c,x,y){c.strokeStyle='#a8edfa';c.strokeRect(x-20,y-50,40,60);c.fillStyle='#a8edfa';c.font='11px system-ui';c.textAlign='center';c.fillText('定格',x,y-56)}
function arrow(c,x,y,x2,y2){line(c,x,y,x2,y2,'#f7dd9a');let a=Math.atan2(y2-y,x2-x);line(c,x2,y2,x2-9*Math.cos(a-.5),y2-9*Math.sin(a-.5));line(c,x2,y2,x2-9*Math.cos(a+.5),y2-9*Math.sin(a+.5))}
function small(c,id,t){let u=t%5,active=u<3,x=active?245-u*55:80+(u-3)*60,y=123;
 if(![3,6,8].includes(+id))hero(c,78,126,u>3?t:0);if(+id===1){x=u<1.4?250:u<2?250-(u-1.4)*220:118+(u-2)*42;if(u<1.4){c.setLineDash([4,5]);line(c,82,123,245,123,'#edb67b');c.setLineDash([])}}
 if(+id===7){y+=Math.sin(t*5)*17;x=250-u*26}
 enemy(c,id,x,y,t);let text='靠近角色 → 接触损失精力';
 if([3,6,8].includes(+id)){c.setLineDash([3,6]);circle(c,x,y-9,70,'#d5c68d66');c.setLineDash([]);let inside=u>1.3&&u<3.4;hero(c,inside?x-40:78,126,inside?t*.35:t);text=+id===6?'圈内射击变慢 → 离开影响圈恢复':+id===3?'消息圈内移动变慢 → 离开恢复':'生病影像附近移动变慢 → 拉开距离';for(let j=0;j<3;j++)bullet(c,100+((t*(inside&&+id===6?34:85)+j*37)%110),93)}
 if(+id===4){let shields=Math.max(0,3-Math.floor(u));for(let i=0;i<shields;i++){c.strokeStyle='#dfcfad';c.strokeRect(x-23-i*4,y-52-i*4,46+i*8,59+i*8)}bullet(c,84+(u%1)*150,104);text='三层改稿壳 → 三次命中后露出本体'}
 if(+id===5){for(let i=0;i<3;i++)bullet(c,x-((t*62+i*44)%160),100,'#e9b28d');text='保持距离 → 发射远程弹丸'}
 if(+id===1)text=u<1.4?'先停下蓄力，锁定冲刺方向':'沿锁定方向冲刺 → 侧移躲开';
 if([0,2].includes(+id))bar(c,56,64,u>2.7?.65:1);if(+id===2){bar(c,x-22,y-58,1);text='移动较慢、血量较厚 → 接触造成伤害'}
 if(+id===7)text='摇摆绕行接近 → 留出移动空间';label(c,text)
}
function boss(c,id,t){let u=t%8,q=clamp((u-3)/2.5),safe=u>5.5,px=85+q*85,py=130;enemy(c,id,254,126,t,true);hero(c,px,py,q?t:0);let name=typeof lifeTrials!=='undefined'?lifeTrials[id]?.[0]:'专属技能';label(c,name||'专属技能',23,'#f5dba1');
 if(u<1.2){c.setLineDash([5,4]);circle(c,90,124,37,'#efb47d');c.setLineDash([]);label(c,'橙色预警 → 进入专属效果');return}
 circle(c,170,129,29,safe?'#b3f7cb':'#7bc9a66b',true);circle(c,170,129,29,'#b3f7cb');
 if(+id===9){if(!safe){for(let i=0;i<3;i++){c.fillStyle='#ded4ba';c.fillRect(px-15+i*7,81-i*5,28,10)}}label(c,safe?'分工圈：负担解除，步速恢复':'待办压肩：移动减慢，走向分工圈')}
 if(+id===10||+id===3){if(!safe){c.fillStyle=+id===10?'#142937d9':'#211e36df';c.fillRect(0,37,69,111);c.fillRect(220,37,100,111);for(let i=0;i<3;i++){c.fillStyle='#43505ddd';c.fillRect(i%2?226:5,48+i*30,85,23);c.fillStyle='#e0dce5';c.font='10px system-ui';c.textAlign='left';c.fillText((+id===10?['进度发我看看','这个今天交吗','消息看到了吗']:['怎么又卡住了','有点撑不住','想歇一会儿'])[i],i%2?229:8,64+i*30,80)}}if(+id===3&&safe){bar(c,px-20,64,.5+(u-5.5)*.15);label(c,'靠近暖光：阴影散去，慢慢恢复精力')}else label(c,safe?'走入免打扰圈，清开视野':'两侧视野遮挡 → 绿色解围点始终可见')}
 if(+id===6){for(let j=0;j<2;j++)bullet(c,px+((t*(safe?85:30)+j*55)%80),102);label(c,safe?'答题圈：恢复基础射击节奏':'限时审题：基础射击暂时变慢')}
 if(+id===11){if(!safe){c.globalAlpha=.3;enemy(c,id,222,97,t,true);enemy(c,id,282,142,t,true);c.globalAlpha=1;circle(c,254,102,34,'#d4b2ee')}bullet(c,px+(u*45)%80,104);label(c,safe?'找到真实目标：解除减伤保护':'比较滤镜：虚影出现，Boss 获得减伤')}
 if(+id===7){c.fillStyle='#223640';c.fillRect(136,98,67,62);for(let i=0;i<3;i++){let got=u>2+i*1.2;if(!got){c.fillStyle='#efd38f';c.fillRect(115+i*38,85,17,23);c.fillStyle='#33434d';c.font='9px system-ui';c.fillText('作品',123+i*38,100)}else circle(c,116+i*20,56,4,'#ade6c2',true)}label(c,u>4.4?'收齐三份作品：本轮剩余时间伤害提高':'作品集投递：移动拾取三份作品')}
 if(+id===8){let remaining=safe?Math.max(0,8-(u-5.5)):3+(u-1.2)*.7;bar(c,58,57,remaining/8,'#c5aedc',65);c.fillStyle='#d7c6e8';c.font='11px system-ui';c.textAlign='center';c.fillText('发愤冷却',90,50);label(c,safe?'走到存档点：冷却恢复正常减少':'终稿返工：发愤图强的冷却往回拨')}
}
function itemsDemo(c,id,t){let u=t%6,px=93,ey=126,ex=240;item(c,id);hero(c,px,126);let text='';
 if(['coffee','meal'].includes(id)){bar(c,px-22,66,.35+(u/6)*.6);for(let i=0;i<3;i++){c.fillStyle='#c7edb0';c.font='16px system-ui';c.fillText('+',px+18+i*10,112-((t*17+i*15)%40))}if(id==='meal'){enemy(c,6,ex,ey,t);freeze(c,ex,ey)}text=id==='coffee'?'持续恢复精力；其他回复也更有效':'恢复精力，暂时定格失眠 / 焦虑 / 生病'}
 else if(id==='headphones'){let active=u>=1&&u<=2;for(let j=0;j<3;j++){let bx=280-((u*100+j*28)%215);if(!active||bx>132)bullet(c,bx,106,'#eac29a')}if(active){drawPlayerShield(c,{x:px,y:126},t);circle(c,131,106,4+Math.sin(t*15)*2,'#d4ffff');text='护盾开启：抵挡飞弹，清除压力干扰'}else text=u<1?'飞弹袭来，准备开启耳机':'保护结束 → 冷却仍从开启时计算'}
 else if(id==='camera'){let frozen=u>1.5&&u<3;ex=frozen?210:235-((u*16)%40);enemy(c,0,ex,ey,frozen?0:t);if(u>1.5&&u<1.9)circle(c,px,112,(u-1.5)*350,'#fff1bf');if(frozen)freeze(c,ex,ey);bar(c,ex-22,65,u>1.5?.65:1);text=frozen?'闪光造成伤害，困难短暂停住':'自动闪光 → 定格附近困难'}
 else if(id==='gym'){let k=clamp((u-1.2)/.42);ex=181+72.5*(1-Math.pow(1-k,3));enemy(c,0,ex,ey,t);if(u>1.2&&u<1.8)circle(c,px,116,(u-1.2)*290,'#b5eefa');bar(c,ex-22,65,1);text='从当前位置平滑推开 · 敌人血量不变'}
 else if(id==='book'||id==='bag'){let radius=id==='bag'?77:85;circle(c,px,112,radius,'#95d8b755');for(let i=0;i<5;i++){let f=clamp((u-1-i*.23)/1.8),x=228+i*8+(px-228-i*8)*f,y=90+i*9+(113-90-i*9)*f;c.fillStyle='#b5ebc8';c.save();c.translate(x,y);c.rotate(.7);c.fillRect(-3,-3,6,6);c.restore()}text=id==='book'?'扩大经验拾取范围，经验从更远处靠近':'拾取范围扩大，脚步也更轻快'}
 else if(id==='robot'){enemy(c,0,ex,ey,t);item(c,'robot',120,72,.65);for(let j=0;j<2;j++)bullet(c,120+(t*110+j*55)%110,79);bar(c,75,52,.9-(u/6)*.2,'#9adeb9');text='助手同步基础攻击 · 每轮消耗少量经验'}
 else if(id==='knowledge'){for(let i=0;i<3;i++){let x=168+i*54;enemy(c,i,x,126,t);bar(c,x-20,66,u>2?.65:1)}if(u>2&&u<2.7){c.fillStyle='#bad6ed33';c.fillRect(0,30,320,125);line(c,0,70+(u-2)*80,320,70+(u-2)*80,'#d5ebff')}text='周期对屏内每个敌人造成一次伤害'}
 else if(id==='boost'){let active=t%8<5;enemy(c,0,ex,ey,t);for(let j=0;j<(active?3:2);j++)bullet(c,px+(t*(active?150:100)+j*45)%140,99+(j-1)*10);if(active){for(let i=0;i<6;i++){c.fillStyle=i%2?'#ffd777':'#ef8249';c.beginPath();c.moveTo(px-22+i*8,138);c.lineTo(px-18+i*8,118-8*Math.sin(t*11+i));c.lineTo(px-14+i*8,138);c.fill()}}else{for(let i=0;i<5;i++)circle(c,px-20+i*10,54+Math.sin(t+i)*3,7,'#8993a5',true)}text=active?'强化：攻击 / 相机 / 压力波更强':'强化结束后短暂疲惫，移动速度减半'}
 else{enemy(c,0,ex,ey,t);let count=id==='notes'&&u>2?2:1,rate=id==='clock'?(u>2?141:110):110;for(let j=0;j<count;j++)bullet(c,px+((t*rate+j*8)%140),103+(j-(count-1)/2)*11,'#f6d889',id==='dumbbell'?5:3);bar(c,ex-22,65,1-(u/6)*(id==='dumbbell'?.8:.45));text={notes:(u>2?'获得便签：每轮从1发增加为2发':'原来的基础攻击：每轮1发'),clock:(u>2?'获得番茄钟：间隔缩短，射击更密':'获得之前：保持原来的射击节奏'),dumbbell:'进阶哑铃：基础子弹造成更多伤害'}[id]||''}
 label(c,text)
}
function incident(c,id,t){let u=t%12,active=u<10;hero(c,90,126);enemy(c,0,245,126,t);bar(c,55,30,active?1-u/10:0,'#d9ad80',210);label(c,active?'突发剩余 '+(10-u).toFixed(1)+' 秒':'状态恢复',22,'#f4d6a2');
 if(id==='network'){item(c,'robot',130,78,.65);if(active){c.strokeStyle='#df8b83';line(c,118,57,143,80,'#df8b83');line(c,143,57,118,80,'#df8b83')}else bullet(c,143+((u-10)*110)%100,79);label(c,active?'网络崩溃：助手暂停攻击':'网络恢复：助手继续协作')}
 if(id==='camera'||id==='low'){item(c,id==='camera'?'camera':'gym',35,86,.85);if(!active){circle(c,90,114,(u-10)*80,'#b6e9ed');if(id==='camera')freeze(c,245,126);else enemy(c,0,245+(u-10)*25,126,t)}label(c,active?id==='camera'?'相机故障：暂停闪光与定格':'情绪低落：压力波暂时不能击退':'十秒结束，装备功能恢复')}
 if(id==='injury'||id==='heart'){let speed=id==='heart'&&active?65:100;for(let i=0;i<3;i++)bullet(c,100+(t*speed+i*45)%130,104,'#f3d9a0',id==='injury'&&active?2:4);label(c,id==='injury'?(active?'锻炼拉伤：伤害减半':'伤害恢复'):(active?'情感危机：基础攻击频率降低35%':'射击节奏恢复'))}
}
function event(c,id,t){let ch=typeof chapters!=='undefined'?chapters.find(q=>q.id===id):null,u=t%6;if(!ch){hero(c);label(c,'剧情事件');return}
 if(ch.item){item(c,ch.item,257,118,1.1);let a=clamp((u-1.4)/2.5),x=74+a*149;hero(c,x,126,a?t:0);if(u<3.8)arrow(c,x+20,70,252,70);else{circle(c,257,110,(u-3.8)*20,'#c1ecd4');c.fillStyle='#203440dd';c.fillRect(234,79,52,66);item(c,ch.item,45,81,.8)}label(c,u<3.8?'视野外出现物品 → 顺着箭头寻找':'靠近拾取 → 获得对应生活活动成长');if(ch.unlock&&u<2)enemy(c,ch.unlock[0],275,144,t);if(ch.effect==='support'){drawPlayerShield(c,{x,y:126},t);label(c,'同门提供6秒保护 → 寻找热饭补充精力')}}
 else if(ch.unlock&&!ch.reward){let target=ch.unlock[0];small(c,target,t);c.fillStyle='#223640';c.fillRect(0,160,320,30);label(c,'剧情之后首次出现：'+({3:'消息分心',5:'比较压力',4:'完美主义',7:'焦虑',6:'失眠',8:'生病'}[target]||'新困难'))}
 else if(ch.reward==='wave'||ch.effect==='printer'){hero(c,75,126);let n=ch.effect==='printer'?6:8;for(let i=0;i<n;i++){let x=170+(i%4)*37-clamp(u/6)*30,y=80+Math.floor(i/4)*59;enemy(c,ch.effect==='printer'?4:1,x,y,t);if(ch.effect==='printer'){c.strokeStyle='#e3cfaa';c.strokeRect(x-16,y-40,32,46)}}label(c,ch.effect==='printer'?'卡纸风波：六张带改稿壳的废稿出现':'导师来任务：八项困难加入战场')}
 else if(ch.effect==='rush'){hero(c,55+(t*65)%210,126,t);for(let i=0;i<3;i++)arrow(c,60+i*65,55,95+i*65,55);label(c,'同学带路：移速提高30%，持续6秒')}
 else if(ch.effect==='recovery'){hero(c,90,126);for(let i=0;i<6;i++)if(u<2)bullet(c,280-u*65+i*8,70+i*13,'#e3ad97');if(u>2&&u<3)circle(c,90,110,(u-2)*200,'#b7edce');label(c,u<2?'软件卡住，来弹逼近……':'找回自动恢复文件：清空当前敌方来弹')}
 else if(ch.effect==='memory'){hero(c,90,126);enemy(c,0,240,126,u<2?t:0);if(u>2){freeze(c,240,126);bar(c,68,65,.5+(u-2)*.07)}item(c,'camera',35,80);label(c,'旧照片：回复精力20，小怪定格4秒')}
}
function draw(c,kind,id,t){c.save();c.setTransform(c.canvas.width/320,0,0,c.canvas.height/190,0,0);c.clearRect(0,0,320,190);c.fillStyle='#223640';c.fillRect(0,0,320,190);c.strokeStyle='#8ba8ad12';c.lineWidth=1;for(let x=0;x<320;x+=32)line(c,x,35,x,155,'#8ba8ad12');for(let y=35;y<156;y+=30)line(c,0,y,320,y,'#8ba8ad12');c.lineWidth=2;
 if(kind==='small')small(c,+id,t);else if(kind==='boss')boss(c,+id,t);else if(kind==='items')itemsDemo(c,id,t);else if(kind==='incidents')incident(c,id,t);else event(c,id,t);c.restore()}
window.drawGuideAnimationFrame=draw;
window.stopGuideAnimations=function(){if(frame)cancelAnimationFrame(frame);frame=0;observer?.disconnect();observer=null;items=[]};
window.startGuideAnimations=function(entries){stopGuideAnimations();items=entries.map(e=>({...e,visible:false,time:0}));last=0;if(typeof IntersectionObserver!=='undefined'){observer=new IntersectionObserver(es=>{for(let e of es){let k=items.find(q=>q.canvas===e.target);if(k)k.visible=e.isIntersecting}},{threshold:.01});items.forEach(e=>observer.observe(e.canvas))}else items.forEach(e=>e.visible=true);items.forEach(e=>draw(e.canvas.getContext('2d'),e.kind,e.id,0));let loop=now=>{if(!items.some(e=>e.canvas.isConnected)){stopGuideAnimations();return}if(!last)last=now;let dt=Math.min(.08,(now-last)/1000);if(now-last>=1000/24){last=now;if(!document.hidden)for(let e of items){if(!e.visible||!e.canvas.isConnected)continue;e.time+=dt;draw(e.canvas.getContext('2d'),e.kind,e.id,e.time)}}frame=requestAnimationFrame(loop)};frame=requestAnimationFrame(loop)};
})();
