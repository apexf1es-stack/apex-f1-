import { useState, useEffect } from "react";

// ─── DATOS 2026 CORRECTOS ────────────────────────────────────────────────────

const TEAMS = [
  { id:"mercedes",  name:"Mercedes",       full:"Mercedes-AMG Petronas F1 Team", color:"#00D2BE", country:"🇩🇪", base:"Brackley, UK",        engine:"Mercedes", principal:"Toto Wolff",     championships:8,  drivers:[12,63], logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg/240px-Mercedes_AMG_Petronas_F1_Logo.svg.png" },
  { id:"ferrari",   name:"Ferrari",        full:"Scuderia Ferrari HP",            color:"#E8002D", country:"🇮🇹", base:"Maranello, Italia",   engine:"Ferrari",  principal:"Fred Vasseur",   championships:16, drivers:[16,44], logo:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Ferrari_World_Logo.svg/240px-Ferrari_World_Logo.svg.png" },
  { id:"mclaren",   name:"McLaren",        full:"McLaren Formula 1 Team",         color:"#FF8000", country:"🇬🇧", base:"Woking, UK",          engine:"Mercedes", principal:"Andrea Stella",  championships:8,  drivers:[1,81],  logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/McLaren_Logo.svg/240px-McLaren_Logo.svg.png" },
  { id:"redbull",   name:"Red Bull",       full:"Oracle Red Bull Racing",         color:"#3671C6", country:"🇦🇹", base:"Milton Keynes, UK",   engine:"Honda",    principal:"Christian Horner",championships:6, drivers:[3,6],   logo:"https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Red_Bull_Racing_logo.svg/240px-Red_Bull_Racing_logo.svg.png" },
  { id:"alpine",    name:"Alpine",         full:"BWT Alpine F1 Team",             color:"#FF87BC", country:"🇫🇷", base:"Enstone, UK",         engine:"Renault",  principal:"Oliver Oakes",   championships:2,  drivers:[10,43], logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Alpine_F1_Team_Logo.svg/240px-Alpine_F1_Team_Logo.svg.png" },
  { id:"aston",     name:"Aston Martin",   full:"Aston Martin Aramco F1 Team",    color:"#229971", country:"🇬🇧", base:"Silverstone, UK",     engine:"Honda",    principal:"Andy Cowell",    championships:0,  drivers:[14,18], logo:"https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Aston_Martin_Lagonda_brand_logo.svg/240px-Aston_Martin_Lagonda_brand_logo.svg.png" },
  { id:"haas",      name:"Haas",           full:"MoneyGram Haas F1 Team",         color:"#B6BABD", country:"🇺🇸", base:"Kannapolis, USA",     engine:"Ferrari",  principal:"Ayao Komatsu",   championships:0,  drivers:[31,87], logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Haas_F1_Team_logo.svg/240px-Haas_F1_Team_logo.svg.png" },
  { id:"williams",  name:"Williams",       full:"Williams Racing",                color:"#64C4FF", country:"🇬🇧", base:"Grove, UK",           engine:"Mercedes", principal:"James Vowles",   championships:7,  drivers:[23,55], logo:"https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Williams_F1_Racing_logo.svg/240px-Williams_F1_Racing_logo.svg.png" },
  { id:"rb",        name:"Racing Bulls",   full:"Visa Cash App RB F1 Team",       color:"#6692FF", country:"🇮🇹", base:"Faenza, Italia",      engine:"Honda",    principal:"Laurent Mekies", championships:0,  drivers:[30,41], logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Racing_Bulls_logo.svg/240px-Racing_Bulls_logo.svg.png" },
  { id:"audi",      name:"Audi",           full:"Audi F1 Team",                   color:"#FF2800", country:"🇩🇪", base:"Hinwil, Suiza",       engine:"Audi",     principal:"Mattia Binotto", championships:0,  drivers:[5,27],  logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/240px-Audi-Logo_2016.svg.png" },
  { id:"cadillac",  name:"Cadillac",       full:"Cadillac Formula 1 Team",        color:"#CC0000", country:"🇺🇸", base:"Concord, USA",        engine:"Ferrari",  principal:"Graeme Lowdon",  championships:0,  drivers:[11,77], logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cadillac_logo.svg/240px-Cadillac_logo.svg.png" },
];

const DRIVERS = [
  { num:1,  name:"Lando Norris",       code:"NOR", team:"mclaren",  country:"🇬🇧", pts:51,  wins:0, podiums:2, photo:"https://media.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png" },
  { num:81, name:"Oscar Piastri",      code:"PIA", team:"mclaren",  country:"🇦🇺", pts:43,  wins:0, podiums:1, photo:"https://media.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png" },
  { num:63, name:"George Russell",     code:"RUS", team:"mercedes", country:"🇬🇧", pts:80,  wins:1, podiums:3, photo:"https://media.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png" },
  { num:12, name:"Kimi Antonelli",     code:"ANT", team:"mercedes", country:"🇮🇹", pts:100, wins:3, podiums:4, photo:"https://media.formula1.com/content/dam/fom-website/drivers/A/ANDANT01_Andrea_Kimi_Antonelli/andant01.png" },
  { num:16, name:"Charles Leclerc",    code:"LEC", team:"ferrari",  country:"🇲🇨", pts:59,  wins:0, podiums:2, photo:"https://media.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png" },
  { num:44, name:"Lewis Hamilton",     code:"HAM", team:"ferrari",  country:"🇬🇧", pts:51,  wins:0, podiums:1, photo:"https://media.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png" },
  { num:3,  name:"Max Verstappen",     code:"VER", team:"redbull",  country:"🇳🇱", pts:26,  wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png" },
  { num:6,  name:"Isack Hadjar",       code:"HAD", team:"redbull",  country:"🇫🇷", pts:4,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png" },
  { num:10, name:"Pierre Gasly",       code:"GAS", team:"alpine",   country:"🇫🇷", pts:16,  wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png" },
  { num:43, name:"Franco Colapinto",   code:"COL", team:"alpine",   country:"🇦🇷", pts:7,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png", highlight:true },
  { num:14, name:"Fernando Alonso",    code:"ALO", team:"aston",    country:"🇪🇸", pts:0,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png" },
  { num:18, name:"Lance Stroll",       code:"STR", team:"aston",    country:"🇨🇦", pts:0,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png" },
  { num:34, name:"Jack Crawford",      code:"CRA", team:"aston",    country:"🇺🇸", pts:0,   wins:0, podiums:0, photo:"" },
  { num:31, name:"Esteban Ocon",       code:"OCO", team:"haas",     country:"🇫🇷", pts:1,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png" },
  { num:87, name:"Oliver Bearman",     code:"BEA", team:"haas",     country:"🇬🇧", pts:17,  wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png" },
  { num:23, name:"Alexander Albon",    code:"ALB", team:"williams", country:"🇹🇭", pts:1,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png" },
  { num:55, name:"Carlos Sainz",       code:"SAI", team:"williams", country:"🇪🇸", pts:4,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png" },
  { num:30, name:"Liam Lawson",        code:"LAW", team:"rb",       country:"🇳🇿", pts:10,  wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png" },
  { num:41, name:"Arvid Lindblad",     code:"LIN", team:"rb",       country:"🇬🇧", pts:4,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/A/ARVLIN01_Arvid_Lindblad/arvlin01.png" },
  { num:5,  name:"Gabriel Bortoleto",  code:"BOR", team:"audi",     country:"🇧🇷", pts:2,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png" },
  { num:27, name:"Nico Hülkenberg",    code:"HUL", team:"audi",     country:"🇩🇪", pts:0,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png" },
  { num:11, name:"Sergio Pérez",       code:"PER", team:"cadillac", country:"🇲🇽", pts:0,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png" },
  { num:77, name:"Valtteri Bottas",    code:"BOT", team:"cadillac", country:"🇫🇮", pts:0,   wins:0, podiums:0, photo:"https://media.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png" },
];

const CALENDAR = [
  { round:1,  name:"Australia",      circuit:"Albert Park",              city:"Melbourne",    flag:"🇦🇺", date:"2026-03-08", winner:"George Russell",    pole:"George Russell",    cancelled:false },
  { round:2,  name:"China",          circuit:"Shanghai International",   city:"Shanghái",     flag:"🇨🇳", date:"2026-03-15", winner:"Kimi Antonelli",    pole:"Kimi Antonelli",    cancelled:false },
  { round:3,  name:"Japón",          circuit:"Suzuka Circuit",           city:"Suzuka",       flag:"🇯🇵", date:"2026-03-29", winner:"Kimi Antonelli",    pole:"Kimi Antonelli",    cancelled:false },
  { round:4,  name:"Bahrein",        circuit:"Bahrain International",    city:"Sakhir",       flag:"🇧🇭", date:"2026-04-12", winner:"CANCELADO",         pole:"",                   cancelled:true },
  { round:5,  name:"Arabia Saudita", circuit:"Jeddah Street Circuit",    city:"Jeddah",       flag:"🇸🇦", date:"2026-04-19", winner:"CANCELADO",         pole:"",                   cancelled:true },
  { round:6,  name:"Miami",          circuit:"Miami Int. Autodrome",     city:"Miami",        flag:"🇺🇸", date:"2026-05-03", winner:"Kimi Antonelli",    pole:"Charles Leclerc",   cancelled:false },
  { round:7,  name:"Canadá",         circuit:"Gilles Villeneuve",        city:"Montreal",     flag:"🇨🇦", date:"2026-05-24", winner:"",                  pole:"",                   cancelled:false },
  { round:8,  name:"Mónaco",         circuit:"Circuit de Monaco",        city:"Monte Carlo",  flag:"🇲🇨", date:"2026-06-07", winner:"",                  pole:"",                   cancelled:false },
  { round:9,  name:"España",         circuit:"Barcelona-Catalunya",      city:"Barcelona",    flag:"🇪🇸", date:"2026-06-14", winner:"",                  pole:"",                   cancelled:false },
  { round:10, name:"Austria",        circuit:"Red Bull Ring",            city:"Spielberg",    flag:"🇦🇹", date:"2026-06-28", winner:"",                  pole:"",                   cancelled:false },
  { round:11, name:"Gran Bretaña",   circuit:"Silverstone",              city:"Silverstone",  flag:"🇬🇧", date:"2026-07-05", winner:"",                  pole:"",                   cancelled:false },
  { round:12, name:"Bélgica",        circuit:"Spa-Francorchamps",        city:"Spa",          flag:"🇧🇪", date:"2026-07-19", winner:"",                  pole:"",                   cancelled:false },
  { round:13, name:"Hungría",        circuit:"Hungaroring",              city:"Budapest",     flag:"🇭🇺", date:"2026-07-26", winner:"",                  pole:"",                   cancelled:false },
  { round:14, name:"Países Bajos",   circuit:"Zandvoort",                city:"Zandvoort",    flag:"🇳🇱", date:"2026-08-23", winner:"",                  pole:"",                   cancelled:false },
  { round:15, name:"Italia",         circuit:"Monza",                    city:"Monza",        flag:"🇮🇹", date:"2026-09-06", winner:"",                  pole:"",                   cancelled:false },
  { round:16, name:"España 2",       circuit:"Circuito de Jerez",        city:"Madrid",       flag:"🇪🇸", date:"2026-09-13", winner:"",                  pole:"",                   cancelled:false },
  { round:17, name:"Azerbaiyán",     circuit:"Baku City Circuit",        city:"Bakú",         flag:"🇦🇿", date:"2026-09-26", winner:"",                  pole:"",                   cancelled:false },
  { round:18, name:"Singapur",       circuit:"Marina Bay Street",        city:"Marina Bay",   flag:"🇸🇬", date:"2026-10-11", winner:"",                  pole:"",                   cancelled:false },
  { round:19, name:"EE.UU.",         circuit:"Circuit of the Americas",  city:"Austin",       flag:"🇺🇸", date:"2026-10-25", winner:"",                  pole:"",                   cancelled:false },
  { round:20, name:"México",         circuit:"Hermanos Rodríguez",       city:"Cdad. de Méx.",flag:"🇲🇽", date:"2026-11-01", winner:"",                  pole:"",                   cancelled:false },
  { round:21, name:"Brasil",         circuit:"Interlagos",               city:"São Paulo",    flag:"🇧🇷", date:"2026-11-08", winner:"",                  pole:"",                   cancelled:false },
  { round:22, name:"Las Vegas",      circuit:"Las Vegas Street",         city:"Las Vegas",    flag:"🇺🇸", date:"2026-11-22", winner:"",                  pole:"",                   cancelled:false },
  { round:23, name:"Qatar",          circuit:"Lusail International",     city:"Lusail",       flag:"🇶🇦", date:"2026-11-29", winner:"",                  pole:"",                   cancelled:false },
  { round:24, name:"Abu Dhabi",      circuit:"Yas Marina",               city:"Abu Dhabi",    flag:"🇦🇪", date:"2026-12-06", winner:"",                  pole:"",                   cancelled:false },
];

const CONSTRUCTORS = [
  { pos:1,  name:"Mercedes",     pts:180, color:"#00D2BE" },
  { pos:2,  name:"Ferrari",      pts:110, color:"#E8002D" },
  { pos:3,  name:"McLaren",      pts:94,  color:"#FF8000" },
  { pos:4,  name:"Red Bull",     pts:30,  color:"#3671C6" },
  { pos:5,  name:"Alpine",       pts:23,  color:"#FF87BC" },
  { pos:6,  name:"Haas",         pts:18,  color:"#B6BABD" },
  { pos:7,  name:"Racing Bulls", pts:14,  color:"#6692FF" },
  { pos:8,  name:"Williams",     pts:5,   color:"#64C4FF" },
  { pos:9,  name:"Aston Martin", pts:0,   color:"#229971" },
  { pos:10, name:"Audi",         pts:0,   color:"#FF2800" },
  { pos:11, name:"Cadillac",     pts:0,   color:"#CC0000" },
];

const VIDEOS = [
  { id:"lhBeRn0TLNE", title:"Top 10 Momentos más épicos de la F1", cat:"CLÁSICOS" },
  { id:"D-OVh5JqbNA",  title:"Los mejores adelantamientos de la historia", cat:"HIGHLIGHTS" },
  { id:"W0bwJhIcVJ0",  title:"F1 2026 — Nueva Era, Nuevos Motores", cat:"2026" },
  { id:"RgUmFKzO8OE",  title:"Análisis técnico: monoplazas 2026", cat:"TÉCNICA" },
  { id:"eB2LL0OhNEg",  title:"Kimi Antonelli — El nuevo rey de la F1", cat:"PILOTOS" },
  { id:"Ej0M3lPM0Ao",  title:"Hamilton en Ferrari: toda la historia", cat:"PILOTOS" },
  { id:"pDji9wZ6wE0",  title:"Los circuitos más rápidos del mundo", cat:"CIRCUITOS" },
  { id:"Yq4e3OdcB30",  title:"Monaco GP — La carrera más glamorosa", cat:"CLÁSICOS" },
];

const NEWS = [
  { title:"Antonelli lidera el campeonato tras el GP de Miami con autoridad", date:"May 4, 2026", cat:"CAMPEONATO", src:"Autosport", url:"https://www.autosport.com", img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80" },
  { title:"Colapinto suma sus primeros puntos en Miami con una remontada espectacular", date:"May 3, 2026", cat:"COLAPINTO 🇦🇷", src:"Motorsport.com", url:"https://www.motorsport.com", img:"https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80" },
  { title:"Mercedes domina con puño de hierro: 180 puntos en constructores", date:"May 4, 2026", cat:"EQUIPOS", src:"The Race", url:"https://the-race.com", img:"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80" },
  { title:"Verstappen sin victorias: ¿por qué Red Bull no puede con los nuevos motores?", date:"Abr 28, 2026", cat:"ANÁLISIS", src:"RaceFans", url:"https://racefans.net", img:"https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&q=80" },
  { title:"Los nuevos motores 2026: todo sobre la revolución técnica de la F1", date:"Mar 20, 2026", cat:"TÉCNICA", src:"Autosport", url:"https://www.autosport.com", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { title:"Hamilton busca su primer podio con Ferrari en el GP de Canadá", date:"May 10, 2026", cat:"PILOTOS", src:"Formula1.com", url:"https://www.formula1.com", img:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
];

const F1_POINTS = [25,18,15,12,10,8,6,4,2,1];

function teamColor(teamId) {
  return TEAMS.find(t=>t.id===teamId)?.color || "#E10600";
}
function teamName(teamId) {
  return TEAMS.find(t=>t.id===teamId)?.name || teamId;
}
function useCountdown(d) {
  const[t,setT]=useState({d:0,h:0,m:0,s:0});
  useEffect(()=>{
    const tick=()=>{
      const diff=new Date(d)-new Date();
      if(diff<=0)return;
      setT({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000)});
    };
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[d]);
  return t;
}

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#000!important;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-thumb{background:#E10600;border-radius:2px;}
::-webkit-scrollbar-track{background:#000;}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.fade{animation:fadeUp .35s ease both;}
.row{display:flex;align-items:center;gap:14px;padding:13px 18px;border-bottom:1px solid #111;cursor:pointer;transition:background .15s;}
.row:hover{background:#0e0e0e;}
.card{background:#0d0d0d;border:1px solid #1a1a1a;border-radius:6px;overflow:hidden;transition:transform .2s,border-color .2s;}
.card:hover{transform:translateY(-2px);border-color:#2a2a2a;}
.tab{background:none;border:none;padding:10px 14px;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:12px;letter-spacing:2px;cursor:pointer;text-transform:uppercase;transition:all .2s;border-bottom:3px solid transparent;white-space:nowrap;color:#444;}
.tab.active{color:#fff;border-bottom-color:#E10600;}
.tab:hover:not(.active){color:#888;}
.badge{display:inline-block;font-size:10px;letter-spacing:2px;padding:2px 10px;border-radius:2px;font-weight:700;}
.btn-red{background:#E10600;color:#fff;border:none;padding:10px 28px;font-family:'Rajdhani',sans-serif;font-weight:700;font-size:14px;letter-spacing:3px;cursor:pointer;text-transform:uppercase;transition:opacity .2s;border-radius:2px;}
.btn-red:hover{opacity:.85;}
.btn-ghost{background:transparent;color:#666;border:1px solid #222;padding:8px 18px;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:12px;letter-spacing:2px;cursor:pointer;text-transform:uppercase;transition:all .2s;border-radius:2px;}
.btn-ghost:hover{border-color:#E10600;color:#fff;}
input[type=email]{background:#111;border:1px solid #222;color:#fff;padding:10px 16px;font-family:'Rajdhani',sans-serif;font-size:14px;outline:none;border-radius:2px;transition:border-color .2s;width:100%;}
input[type=email]:focus{border-color:#E10600;}
input[type=email]::placeholder{color:#333;}
`;

export default function ApexApp() {
  const[tab,setTab]=useState("home");
  const[selDriver,setSelDriver]=useState(null);
  const[selTeam,setSelTeam]=useState(null);
  const[selVideo,setSelVideo]=useState(null);
  const[newsFilter,setNewsFilter]=useState("TODOS");
  const[email,setEmail]=useState("");
  const[subbed,setSubbed]=useState(false);

  const today=new Date();
  const past=CALENDAR.filter(r=>new Date(r.date)<today&&!r.cancelled);
  const upcoming=CALENDAR.filter(r=>new Date(r.date)>=today);
  const next=upcoming[0];
  const cd=useCountdown(next?.date||"2099-01-01");
  const pct=Math.round((past.length/CALENDAR.length)*100);

  const TABS=[
    {id:"home",label:"🏠 Inicio"},
    {id:"calendario",label:"🏁 Calendario"},
    {id:"pilotos",label:"👤 Pilotos"},
    {id:"equipos",label:"🔧 Equipos"},
    {id:"clasificacion",label:"🏆 Clasificación"},
    {id:"videos",label:"▶ Videos"},
    {id:"noticias",label:"📰 Noticias"},
  ];

  return(
    <div style={{fontFamily:"'Rajdhani',sans-serif",background:"#000",minHeight:"100vh",color:"#fff"}}>
      <style>{CSS}</style>

      {/* HEADER */}
      <header style={{background:"linear-gradient(180deg,#0f0000 0%,#000 100%)",borderBottom:"3px solid #E10600",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1080,margin:"0 auto",padding:"0 20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0 0"}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,letterSpacing:5,background:"#E10600",color:"#fff",padding:"2px 20px 2px 14px",clipPath:"polygon(0 0,100% 0,88% 100%,0 100%)"}}>APEX</div>
            <div style={{fontSize:10,color:"#3a3a3a",letterSpacing:3,lineHeight:1.6}}>F1<br/>EN ESPAÑOL</div>
          </div>
          <div style={{display:"flex",gap:0,marginTop:8,overflowX:"auto",paddingBottom:1}}>
            {TABS.map(t=><button key={t.id} className={`tab${tab===t.id?" active":""}`} onClick={()=>{setTab(t.id);setSelDriver(null);setSelTeam(null);setSelVideo(null);}}>{t.label}</button>)}
          </div>
        </div>
      </header>

      <div style={{maxWidth:1080,margin:"0 auto",padding:"28px 20px 60px"}} className="fade">

        {/* ══ HOME ══ */}
        {tab==="home"&&(
          <div>
            {/* HERO */}
            {next&&(
              <div style={{background:"linear-gradient(135deg,#120000,#0d0d0d)",border:"1px solid #1f0000",borderRadius:8,padding:"32px",marginBottom:24,display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"center",flexWrap:"wrap"}}>
                <div>
                  <div style={{fontSize:10,color:"#E10600",letterSpacing:5,fontWeight:700}}>PRÓXIMA CARRERA · RONDA {next.round}</div>
                  <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:48,letterSpacing:3,lineHeight:.95,marginTop:8}}>
                    {next.flag} GP DE {next.name.toUpperCase()}
                  </div>
                  <div style={{fontSize:13,color:"#555",marginTop:4}}>{next.circuit} · {next.city}</div>
                  <div style={{display:"flex",gap:20,marginTop:20,flexWrap:"wrap"}}>
                    {[["DÍAS",cd.d],["HORAS",cd.h],["MIN",cd.m],["SEG",cd.s]].map(([l,v])=>(
                      <div key={l} style={{textAlign:"center"}}>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:52,color:"#E10600",lineHeight:1}}>{String(v).padStart(2,"0")}</div>
                        <div style={{fontSize:10,letterSpacing:3,color:"#444"}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{textAlign:"center",display:"flex",flexDirection:"column",gap:8}}>
                  <div style={{height:4,background:"#111",borderRadius:2,width:200}}>
                    <div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#E10600,#FF8000)",width:`${pct}%`}}/>
                  </div>
                  <div style={{fontSize:10,color:"#444",letterSpacing:2}}>{past.length}/24 CARRERAS · {pct}%</div>
                </div>
              </div>
            )}

            {/* STATS */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
              {[{l:"RONDAS",v:24,c:"#fff"},{l:"DISPUTADAS",v:past.length,c:"#27F4D2"},{l:"RESTANTES",v:upcoming.length,c:"#FF8000"},{l:"PROGRESO",v:`${pct}%`,c:"#E10600"}].map(s=>(
                <div key={s.l} style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,padding:"16px 20px"}}>
                  <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:40,color:s.c,lineHeight:1}}>{s.v}</div>
                  <div style={{fontSize:10,color:"#444",letterSpacing:2,marginTop:4}}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* LIDER */}
            <div style={{background:"linear-gradient(135deg,#0a0a0a,#111)",border:"1px solid #1a1a1a",borderRadius:8,padding:"20px 24px",marginBottom:24,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
              <div style={{fontSize:10,color:"#E10600",letterSpacing:4,fontWeight:700,flexShrink:0}}>🏆 LÍDER DEL CAMPEONATO</div>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,letterSpacing:3}}>KIMI ANTONELLI</div>
              <div style={{fontSize:14,color:"#00D2BE"}}>Mercedes</div>
              <div style={{marginLeft:"auto",fontFamily:"'Bebas Neue',cursive",fontSize:42,color:"#E10600"}}>100 PTS</div>
            </div>

            {/* ÚLTIMAS CARRERAS + CLASIFICACIÓN */}
            <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:20,marginBottom:24}}>
              <div>
                <STitle>Últimas carreras</STitle>
                <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
                  {past.length===0&&<div style={{padding:32,textAlign:"center",color:"#444"}}>Temporada no iniciada.</div>}
                  {[...past].reverse().slice(0,6).map(r=>(
                    <div key={r.round} className="row">
                      <span style={{fontSize:10,color:"#333",width:22,textAlign:"center"}}>{r.round}</span>
                      <span style={{fontSize:20}}>{r.flag}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:14}}>GP de {r.name}</div>
                        {r.winner&&<div style={{fontSize:11,color:"#555"}}>🏆 {r.winner}</div>}
                      </div>
                      <div style={{fontSize:11,color:"#444"}}>{new Date(r.date).toLocaleDateString("es-AR",{day:"numeric",month:"short"}).toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <STitle>Top 5 Pilotos</STitle>
                <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
                  {[...DRIVERS].sort((a,b)=>b.pts-a.pts).slice(0,5).map((d,i)=>{
                    const tc=teamColor(d.team);
                    return(
                      <div key={d.num} className="row" onClick={()=>{setSelDriver(d);setTab("pilotos");}}>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:20,color:i<3?["#FFD700","#C0C0C0","#CD7F32"][i]:"#333",width:24,textAlign:"center"}}>{i+1}</div>
                        <div style={{width:3,height:32,background:tc,borderRadius:2,flexShrink:0}}/>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:700,fontSize:13}}>{d.name}</div>
                          <div style={{fontSize:11,color:tc}}>{teamName(d.team)}</div>
                        </div>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,color:i===0?"#E10600":"#fff"}}>{d.pts}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div style={{background:"linear-gradient(135deg,#0d0d0d,#0f0f0f)",border:"1px solid #1c1c1c",borderRadius:8,padding:"28px 32px",display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"center"}}>
              <div>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,letterSpacing:3}}>📬 Newsletter semanal gratuita</div>
                <div style={{fontSize:14,color:"#555",marginTop:4}}>Análisis, resultados y todo lo que pasó. Cada lunes en tu mail.</div>
              </div>
              <div style={{minWidth:260}}>
                {subbed?(
                  <div style={{color:"#27F4D2",fontWeight:700,letterSpacing:2,fontSize:14,textAlign:"center"}}>✓ ¡SUSCRIPTO!</div>
                ):(
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <input type="email" placeholder="tu@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <button className="btn-red" onClick={()=>email.includes("@")&&setSubbed(true)}>SUSCRIBIRME GRATIS</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ CALENDARIO ══ */}
        {tab==="calendario"&&(
          <div>
            <STitle>Temporada 2026 · 24 Grandes Premios</STitle>
            <div style={{height:4,background:"#111",borderRadius:2,marginBottom:20}}>
              <div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#E10600,#FF8000)",width:`${pct}%`}}/>
            </div>
            <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
              {CALENDAR.map((r,i)=>{
                const isPast=new Date(r.date)<today&&!r.cancelled;
                const isNext=!isPast&&!r.cancelled&&i===CALENDAR.filter((x,j)=>j<i&&new Date(x.date)<today).length;
                return(
                  <div key={r.round} className="row" style={{opacity:r.cancelled?0.35:isPast?1:0.5,cursor:"default"}}>
                    <div style={{width:28,textAlign:"center",fontFamily:"'Bebas Neue',cursive",fontSize:16,color:isNext?"#E10600":"#2a2a2a"}}>{r.round}</div>
                    <div style={{fontSize:22}}>{r.flag}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontWeight:700,fontSize:14}}>GP de {r.name}</span>
                        {r.cancelled&&<span className="badge" style={{background:"#44000022",color:"#884444"}}>CANCELADO</span>}
                        {isNext&&<span className="badge" style={{background:"#E10600",color:"#fff",animation:"pulse 2s infinite"}}>PRÓXIMA</span>}
                        {isPast&&<span className="badge" style={{background:"#00443322",color:"#27F4D2"}}>FINALIZADA</span>}
                      </div>
                      <div style={{fontSize:11,color:"#444"}}>{r.circuit} · {r.city}</div>
                      {isPast&&r.winner&&r.winner!=="CANCELADO"&&(
                        <div style={{fontSize:11,color:"#666",marginTop:2}}>🏆 {r.winner} · Pole: {r.pole}</div>
                      )}
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontWeight:700,fontSize:12,color:isPast?"#fff":isNext?"#FF8000":"#333"}}>
                        {new Date(r.date).toLocaleDateString("es-AR",{day:"numeric",month:"short"}).toUpperCase()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ PILOTOS ══ */}
        {tab==="pilotos"&&(
          <div>
            {selDriver?(
              <div className="fade">
                <button className="btn-ghost" style={{marginBottom:20}} onClick={()=>setSelDriver(null)}>← TODOS LOS PILOTOS</button>
                <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:28,alignItems:"start"}}>
                  <div style={{textAlign:"center"}}>
                    {selDriver.photo?(
                      <img src={selDriver.photo} alt="" style={{width:180,height:180,borderRadius:"50%",objectFit:"cover",border:`4px solid ${teamColor(selDriver.team)}`,display:"block",margin:"0 auto"}} onError={e=>{e.target.style.display="none";}}/>
                    ):(
                      <div style={{width:180,height:180,borderRadius:"50%",background:"#1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',cursive",fontSize:60,color:teamColor(selDriver.team),margin:"0 auto",border:`4px solid ${teamColor(selDriver.team)}`}}>#{selDriver.num}</div>
                    )}
                    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,letterSpacing:3,marginTop:14}}>{selDriver.name}</div>
                    <div style={{fontSize:12,color:teamColor(selDriver.team),letterSpacing:1,marginTop:2}}>{teamName(selDriver.team)}</div>
                    {selDriver.highlight&&<div style={{marginTop:8}}><span className="badge" style={{background:"#75AADB22",color:"#75AADB",border:"1px solid #75AADB44"}}>🇦🇷 EL PILOTO ARGENTINO</span></div>}
                  </div>
                  <div>
                    <STitle>Estadísticas 2026</STitle>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
                      {[["PUNTOS",selDriver.pts,"#E10600"],["VICTORIAS",selDriver.wins,"#FFD700"],["PODIOS",selDriver.podiums,"#27F4D2"]].map(([l,v,c])=>(
                        <div key={l} style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,padding:"16px",textAlign:"center"}}>
                          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:42,color:c,lineHeight:1}}>{v}</div>
                          <div style={{fontSize:10,color:"#444",letterSpacing:2,marginTop:4}}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <STitle>Ficha técnica</STitle>
                    <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
                      {[["Número","#"+selDriver.num],["Código",selDriver.code],["País",selDriver.country],["Equipo",teamName(selDriver.team)]].map(([k,v])=>(
                        <div key={k} style={{display:"flex",padding:"12px 18px",borderBottom:"1px solid #111"}}>
                          <div style={{fontSize:11,color:"#444",letterSpacing:2,width:120,flexShrink:0}}>{k.toUpperCase()}</div>
                          <div style={{fontWeight:700,fontSize:14}}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ):(
              <div>
                <STitle>Pilotos 2026 · 22 pilotos</STitle>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
                  {DRIVERS.map(d=>{
                    const tc=teamColor(d.team);
                    return(
                      <div key={d.num} className="card" style={{borderLeft:`4px solid ${tc}`,cursor:"pointer"}} onClick={()=>setSelDriver(d)}>
                        <div style={{display:"flex",gap:14,alignItems:"center",padding:16}}>
                          {d.photo?(
                            <img src={d.photo} alt="" style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",background:"#111",flexShrink:0}} onError={e=>{e.target.src="";e.target.style.display="none";}}/>
                          ):(
                            <div style={{width:56,height:56,borderRadius:"50%",background:"#1a1a1a",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',cursive",fontSize:20,color:tc}}>#{d.num}</div>
                          )}
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontWeight:700,fontSize:14,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{d.name}</div>
                            <div style={{fontSize:12,color:tc,letterSpacing:1,marginTop:2}}>{teamName(d.team)}</div>
                            <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                              <span className="badge" style={{background:tc+"22",color:tc,border:`1px solid ${tc}44`}}>#{d.num}</span>
                              <span className="badge" style={{background:"#1a1a1a",color:"#555"}}>{d.country}</span>
                              {d.pts>0&&<span className="badge" style={{background:"#E1060022",color:"#E10600"}}>{d.pts}pts</span>}
                              {d.highlight&&<span className="badge" style={{background:"#75AADB22",color:"#75AADB"}}>🇦🇷</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ EQUIPOS ══ */}
        {tab==="equipos"&&(
          <div>
            {selTeam?(
              <div className="fade">
                <button className="btn-ghost" style={{marginBottom:20}} onClick={()=>setSelTeam(null)}>← TODOS LOS EQUIPOS</button>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
                  <div>
                    <div style={{width:120,height:6,background:selTeam.color,borderRadius:3,marginBottom:20}}/>
                    {selTeam.logo&&(
                      <img src={selTeam.logo} alt="" style={{height:60,objectFit:"contain",marginBottom:16,display:"block"}} onError={e=>e.target.style.display="none"}/>
                    )}
                    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:42,letterSpacing:3,color:selTeam.color,lineHeight:.9}}>{selTeam.name.toUpperCase()}</div>
                    <div style={{fontSize:14,color:"#555",marginTop:4}}>{selTeam.full}</div>
                    <div style={{marginTop:24,background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
                      {[["Base",selTeam.base],["Motor",selTeam.engine],["Director",selTeam.principal],["País",selTeam.country],["Campeonatos",selTeam.championships+"×🏆"]].map(([k,v])=>(
                        <div key={k} style={{display:"flex",padding:"12px 18px",borderBottom:"1px solid #111"}}>
                          <div style={{fontSize:11,color:"#444",letterSpacing:2,width:120,flexShrink:0}}>{k.toUpperCase()}</div>
                          <div style={{fontWeight:700,fontSize:14}}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <STitle>Pilotos 2026</STitle>
                    {selTeam.drivers.map(num=>{
                      const d=DRIVERS.find(x=>x.num===num);
                      if(!d) return null;
                      return(
                        <div key={num} style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderLeft:`4px solid ${selTeam.color}`,borderRadius:4,padding:"16px 20px",marginBottom:10,cursor:"pointer"}} onClick={()=>{setSelDriver(d);setTab("pilotos");}}>
                          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:10,color:"#444",letterSpacing:3}}>#{num}</div>
                          <div style={{fontWeight:700,fontSize:18,marginTop:4}}>{d.name}</div>
                          <div style={{fontSize:12,color:"#555",marginTop:2}}>{d.country} · {d.pts} puntos</div>
                        </div>
                      );
                    })}
                    <STitle style={{marginTop:20}}>Puntos en constructores</STitle>
                    {(() => {
                      const c=CONSTRUCTORS.find(x=>x.name===selTeam.name);
                      const max=CONSTRUCTORS[0].pts;
                      return c?(
                        <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,padding:"20px"}}>
                          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:48,color:selTeam.color,lineHeight:1}}>{c.pts}</div>
                          <div style={{fontSize:10,color:"#444",letterSpacing:2,marginTop:4}}>PUNTOS · POSICIÓN #{c.pos}</div>
                          <div style={{marginTop:12,height:4,background:"#1a1a1a",borderRadius:2}}>
                            <div style={{height:"100%",background:selTeam.color,borderRadius:2,width:max>0?`${(c.pts/max)*100}%`:"0%"}}/>
                          </div>
                        </div>
                      ):null;
                    })()}
                  </div>
                </div>
              </div>
            ):(
              <div>
                <STitle>Equipos 2026 · 11 escuderías</STitle>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
                  {TEAMS.map(t=>{
                    const c=CONSTRUCTORS.find(x=>x.name===t.name);
                    return(
                      <div key={t.id} className="card" style={{borderTop:`4px solid ${t.color}`,cursor:"pointer"}} onClick={()=>setSelTeam(t)}>
                        <div style={{padding:"18px 20px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                            <div>
                              {t.logo&&<img src={t.logo} alt="" style={{height:32,objectFit:"contain",marginBottom:8,display:"block"}} onError={e=>e.target.style.display="none"}/>}
                              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,letterSpacing:3,color:t.color}}>{t.name.toUpperCase()}</div>
                            </div>
                            {c&&c.pts>0&&<span className="badge" style={{background:t.color+"22",color:t.color,border:`1px solid ${t.color}44`}}>{c.pts}pts</span>}
                          </div>
                          <div style={{fontSize:12,color:"#555",marginBottom:12}}>{t.engine} · {t.country}</div>
                          {t.drivers.map(num=>{
                            const d=DRIVERS.find(x=>x.num===num);
                            return d?(
                              <div key={num} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                                <div style={{width:3,height:16,background:t.color,borderRadius:2,flexShrink:0}}/>
                                <div style={{fontSize:13,fontWeight:600}}>{d.name}</div>
                                {d.highlight&&<span style={{fontSize:12}}>🇦🇷</span>}
                              </div>
                            ):null;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ CLASIFICACIÓN ══ */}
        {tab==="clasificacion"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              {/* PILOTOS */}
              <div>
                <STitle>Campeonato de Pilotos</STitle>
                <div style={{fontSize:10,color:"#444",letterSpacing:2,marginBottom:8}}>TRAS EL GP DE MIAMI 2026</div>
                <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
                  <div style={{display:"grid",gridTemplateColumns:"36px 1fr 80px",padding:"8px 16px",borderBottom:"2px solid #E10600",fontSize:10,letterSpacing:2,color:"#444"}}>
                    <span>POS</span><span>PILOTO</span><span style={{textAlign:"right"}}>PTS</span>
                  </div>
                  {[...DRIVERS].sort((a,b)=>b.pts-a.pts).map((d,i)=>{
                    const tc=teamColor(d.team);
                    const max=DRIVERS.reduce((m,x)=>Math.max(m,x.pts),1);
                    return(
                      <div key={d.num} style={{display:"grid",gridTemplateColumns:"36px 1fr 80px",alignItems:"center",padding:"10px 16px",borderBottom:"1px solid #0f0f0f",background:i===0?"rgba(225,6,0,0.05)":"transparent"}}>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:18,color:i<3?["#FFD700","#C0C0C0","#CD7F32"][i]:"#2a2a2a"}}>{i+1}</div>
                        <div>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{width:3,height:28,background:tc,borderRadius:2,flexShrink:0}}/>
                            <div>
                              <div style={{fontWeight:700,fontSize:13}}>{d.name}{d.highlight?" 🇦🇷":""}</div>
                              <div style={{fontSize:10,color:tc,letterSpacing:1}}>{teamName(d.team)}</div>
                              <div style={{marginTop:3,height:2,background:"#1a1a1a",borderRadius:1,width:80}}>
                                <div style={{height:"100%",background:tc,borderRadius:1,width:max>0?`${(d.pts/max)*80}px`:"0"}}/>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{textAlign:"right",fontFamily:"'Bebas Neue',cursive",fontSize:20,color:i===0?"#E10600":"#fff"}}>{d.pts}</div>
                      </div>
                    );
                  })}
                </div>

                {/* SISTEMA DE PUNTOS */}
                <div style={{marginTop:16,background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,padding:"16px"}}>
                  <div style={{fontSize:10,color:"#444",letterSpacing:3,marginBottom:10}}>SISTEMA DE PUNTOS F1</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {F1_POINTS.map((p,i)=>(
                      <div key={i} style={{background:"#111",borderRadius:4,padding:"4px 10px",textAlign:"center"}}>
                        <div style={{fontSize:9,color:"#444"}}>{i+1}°</div>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:16,color:"#E10600"}}>{p}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CONSTRUCTORES */}
              <div>
                <STitle>Campeonato de Constructores</STitle>
                <div style={{fontSize:10,color:"#444",letterSpacing:2,marginBottom:8}}>TRAS EL GP DE MIAMI 2026</div>
                <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
                  {CONSTRUCTORS.map((c,i)=>{
                    const team=TEAMS.find(t=>t.name===c.name);
                    const max=CONSTRUCTORS[0].pts||1;
                    return(
                      <div key={c.name} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 18px",borderBottom:"1px solid #0f0f0f",background:i===0?"rgba(225,6,0,0.05)":"transparent"}}>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:20,color:i<3?["#FFD700","#C0C0C0","#CD7F32"][i]:"#2a2a2a",width:24,textAlign:"center"}}>{c.pos}</div>
                        <div style={{flex:1}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{width:3,height:32,background:c.color,borderRadius:2,flexShrink:0}}/>
                            <div>
                              <div style={{fontWeight:700,fontSize:14,color:c.color}}>{c.name.toUpperCase()}</div>
                              <div style={{marginTop:4,height:3,background:"#1a1a1a",borderRadius:1,width:120}}>
                                <div style={{height:"100%",background:c.color,borderRadius:1,width:max>0?`${(c.pts/max)*120}px`:"0"}}/>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:26,color:i===0?"#E10600":"#fff"}}>{c.pts}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ VIDEOS ══ */}
        {tab==="videos"&&(
          <div>
            {selVideo&&(
              <div style={{marginBottom:24}} className="fade">
                <div style={{borderRadius:8,overflow:"hidden",border:"1px solid #1a1a1a",marginBottom:12}}>
                  <div style={{position:"relative",paddingBottom:"56.25%",background:"#0d0d0d"}}>
                    <iframe src={`https://www.youtube.com/embed/${selVideo.id}?autoplay=1&rel=0&modestbranding=1`} style={{position:"absolute",inset:0,width:"100%",height:"100%",border:"none"}} allowFullScreen allow="autoplay" title={selVideo.title}/>
                  </div>
                </div>
                <span className="badge" style={{background:"#E1060020",color:"#E10600",border:"1px solid #E1060030"}}>{selVideo.cat}</span>
                <div style={{fontWeight:700,fontSize:18,marginTop:8}}>{selVideo.title}</div>
                <div style={{display:"flex",gap:10,marginTop:12}}>
                  <button className="btn-ghost" onClick={()=>setSelVideo(null)}>← VOLVER</button>
                  <a href={`https://www.youtube.com/watch?v=${selVideo.id}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                    <button className="btn-red">VER EN YOUTUBE ↗</button>
                  </a>
                </div>
              </div>
            )}
            <STitle>Videos F1 · Selección</STitle>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
              {VIDEOS.map(v=>(
                <div key={v.id} className="card" style={{cursor:"pointer"}} onClick={()=>setSelVideo(v)}>
                  <div style={{position:"relative",overflow:"hidden",borderRadius:"4px 4px 0 0"}}>
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} style={{width:"100%",aspectRatio:"16/9",objectFit:"cover",display:"block",transition:"transform .3s"}} onMouseOver={e=>e.currentTarget.style.transform="scale(1.04)"} onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}/>
                    <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.4)"}}>
                      <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(225,6,0,.9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>▶</div>
                    </div>
                    <div style={{position:"absolute",top:8,left:8}}>
                      <span className="badge" style={{background:"#E10600dd",color:"#fff"}}>{v.cat}</span>
                    </div>
                  </div>
                  <div style={{padding:"12px 14px"}}>
                    <div style={{fontWeight:700,fontSize:13,lineHeight:1.35}}>{v.title}</div>
                    <div style={{fontSize:11,color:"#444",marginTop:6,letterSpacing:1}}>YOUTUBE →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ NOTICIAS ══ */}
        {tab==="noticias"&&(
          <div>
            <STitle>Noticias F1 · 2026</STitle>
            <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
              {["TODOS",...new Set(NEWS.map(n=>n.cat))].map(c=>(
                <button key={c} onClick={()=>setNewsFilter(c)} style={{background:newsFilter===c?"#E10600":"#0d0d0d",color:newsFilter===c?"#fff":"#555",border:`1px solid ${newsFilter===c?"#E10600":"#1c1c1c"}`,padding:"6px 16px",borderRadius:2,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:11,letterSpacing:2,transition:"all .2s"}}>{c}</button>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
              {(newsFilter==="TODOS"?NEWS:NEWS.filter(n=>n.cat===newsFilter)).map((n,i)=>(
                <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",color:"inherit"}}>
                  <div className="card" style={{height:"100%"}}>
                    <div style={{height:160,overflow:"hidden"}}>
                      <img src={n.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s"}} onMouseOver={e=>e.target.style.transform="scale(1.06)"} onMouseOut={e=>e.target.style.transform="scale(1)"}/>
                    </div>
                    <div style={{padding:"14px 16px"}}>
                      <span className="badge" style={{background:"#E1060018",color:"#E10600",marginBottom:10,display:"inline-block"}}>{n.cat}</span>
                      <div style={{fontWeight:700,fontSize:15,lineHeight:1.35,marginBottom:10}}>{n.title}</div>
                      <div style={{fontSize:11,color:"#444",display:"flex",justifyContent:"space-between"}}>
                        <span>{n.src}</span><span>{n.date}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid #111",padding:"28px 20px",textAlign:"center"}}>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,letterSpacing:6,color:"#1c1c1c"}}>APEX F1 EN ESPAÑOL</div>
        <div style={{fontSize:10,color:"#222",letterSpacing:2,marginTop:6}}>FAN SITE NO OFICIAL · NO AFILIADO A FIA NI FORMULA ONE MANAGEMENT</div>
      </footer>
    </div>
  );
}

function STitle({children}){
  return <div style={{fontSize:10,letterSpacing:4,color:"#444",fontWeight:700,textTransform:"uppercase",marginBottom:14,paddingBottom:10,borderBottom:"1px solid #111"}}>{children}</div>;
}
