// Temporary setbacks share one game-time clock and never stack with each other.
let incidents={active:null,pending:[],schedule:[],day:0,next:60,last:null,serial:0};
const incidentKinds=[
{id:'network',name:'网络崩溃',text:'加载圈转个不停，AI 助手暂时离线。',effect:'AI 助手暂停攻击',eligible:()=>!!p.drone},
{id:'low',name:'情绪低落',text:'今天有点提不起劲，先稳住自己的脚步。',effect:'释放压力暂时不能击退',eligible:()=>!!p.pulse},
{id:'camera',name:'相机故障',text:'快门没反应。先收好相机，缓一会儿再试。',effect:'相机暂时无法拍照定格',eligible:()=>!!p.camera},
{id:'injury',name:'锻炼拉伤',text:'这一组有点勉强，手臂酸得发紧。',effect:'造成的伤害减半',eligible:()=>true},
{id:'heart',name:'情感危机',text:'那句话还在脑子里打转，手上的动作慢了下来。',effect:'你与助手的基础攻击频率降低35%',eligible:()=>true}
];
function resetIncidents(){incidents={active:null,pending:[],schedule:[],day:0,next:45+gameRandom()*30,last:null,serial:0};planDayIncidents()}
function planDayIncidents(){if(endless||incidents.day===day)return;incidents.day=day;incidents.schedule=[5+gameRandom()*7,20+gameRandom()*8]}
function incidentIs(id){return incidents.active?.id===id&&!quietActive()}
function incidentAttackRate(){return incidentIs('heart')?.65:1}
function incidentDamage(){return incidentIs('injury')?.5:1}
function tickIncidents(dt){if(mode!=='play')return;
 if(incidents.active){incidents.active.left=Math.max(0,incidents.active.left-dt);if(!incidents.active.left){let old=incidents.active;incidents.active=null;notice(old.name+'过去了，状态恢复')}}
 if(endless){while(t>=incidents.next){incidents.pending.push(++incidents.serial);incidents.next+=45+gameRandom()*30}}else{planDayIncidents();while(incidents.schedule.length&&dayTime>=incidents.schedule[0]){incidents.schedule.shift();incidents.pending.push(++incidents.serial)}}
 if(!incidents.active&&incidents.pending.length){let pool=incidentKinds.filter(e=>e.eligible()&&e.id!==incidents.last);if(!pool.length)pool=incidentKinds.filter(e=>e.eligible());let chosen=pool[Math.floor(gameRandom()*pool.length)];incidents.pending.shift();incidents.last=chosen.id;incidents.active={id:chosen.id,name:chosen.name,text:chosen.text,effect:chosen.effect,left:10};sound(180,.16,'triangle')}
 renderIncident();
}
function renderIncident(){let el=$('#incidentBanner'),a=incidents.active;el.style.display=a&&['play','paused','story','activity','upgrade','encounter','bossdeath'].includes(mode)?'block':'none';if(a)el.textContent='突发 · '+a.name+'　'+a.left.toFixed(1)+'秒\n'+a.effect;}
function restoreIncidents(saved){if(saved&&Array.isArray(saved.schedule)&&Array.isArray(saved.pending)){incidents=saved;return}resetIncidents();incidents.schedule=incidents.schedule.filter(x=>x>dayTime);if(endless)incidents.next=t+45+gameRandom()*30;}
