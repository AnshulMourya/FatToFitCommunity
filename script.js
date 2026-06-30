/* ==========================================
   Fat To Fit Community
   Premium JavaScript
========================================== */

// Loader
window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
    }, 500);

});

// AOS Animation
AOS.init({
    duration: 1000,
    once: true
});

// Counter Animation

const counters = document.querySelectorAll(".count");

const speed = 100;

counters.forEach(counter => {

    const updateCount = () => {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = Math.ceil(target / speed);

        if (count < target) {

            counter.innerText = count + increment;

            setTimeout(updateCount, 20);

        } else {

            counter.innerText = target;

        }

    }

    updateCount();

});


// Back To Top Button

let topBtn = document.getElementById("topBtn");

window.onscroll = function () {

    if (document.body.scrollTop > 300 ||

        document.documentElement.scrollTop > 300) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

}

topBtn.onclick = function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// Sticky Header + Active Link

window.addEventListener("scroll", function () {

    let header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 50);

    // Active nav link
    let sections = document.querySelectorAll("section[id]");
    let scrollY = window.scrollY + 120;

    sections.forEach(section => {
        let top = section.offsetTop;
        let height = section.offsetHeight;
        let id = section.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
            let activeLink = document.querySelector(`nav a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
});

// Mobile Menu (Slide-in Overlay)

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const closeMenu = document.getElementById("closeMenu");

function openMobile(){
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("show");
    mobileOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeMobile(){
    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("show");
    setTimeout(() => {
        mobileOverlay.style.display = "none";
        document.body.style.overflow = "";
    }, 300);
}

menuBtn.addEventListener("click", openMobile);
closeMenu.addEventListener("click", closeMobile);
mobileOverlay.addEventListener("click", closeMobile);

document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", closeMobile);
});

// Gallery Light Effect

document.querySelectorAll(".gallery img").forEach(img => {

    img.addEventListener("click", function () {

        this.style.transform = "scale(1.15)";

        setTimeout(() => {

            this.style.transform = "scale(1)";

        }, 400);

    });

});

// Smooth Fade Effect

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

        }

    });

}, {

    threshold: .2

});

sections.forEach(section => {

    observer.observe(section);

});

// Dark Mode

const darkBtn = document.createElement("button");

darkBtn.innerHTML = "🌙";

darkBtn.style.position = "fixed";

darkBtn.style.bottom = "20px";

darkBtn.style.left = "20px";

darkBtn.style.width = "55px";

darkBtn.style.height = "55px";

darkBtn.style.borderRadius = "50%";

darkBtn.style.border = "none";

darkBtn.style.cursor = "pointer";

darkBtn.style.background = "#111827";

darkBtn.style.color = "#fff";

darkBtn.style.fontSize = "22px";

darkBtn.style.boxShadow = "0 10px 25px rgba(0,0,0,.2)";

darkBtn.style.zIndex = "999";

document.body.appendChild(darkBtn);

darkBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

});

// Welcome Message

setTimeout(() => {

    console.log("Welcome To Fat To Fit Community");

}, 1000);

/* ===========================
Transformation Slider
=========================== */

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

slides.forEach(slide=>{

slide.classList.remove("active");

});

slides[index].classList.add("active");

}

document.querySelector(".next").addEventListener("click",()=>{

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

showSlide(currentSlide);

});

document.querySelector(".prev").addEventListener("click",()=>{

currentSlide--;

if(currentSlide<0){

currentSlide=slides.length-1;

}

showSlide(currentSlide);

});

// Auto Slide

setInterval(()=>{

currentSlide++;

if(currentSlide>=slides.length){

currentSlide=0;

}

showSlide(currentSlide);

},3000);

/* ===========================
Registration Form → Google Sheets
=========================== */

// 🔴 IMPORTANT: Google Apps Script deploy karne ke baad ye URL change karein!
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwe0gx0kMJqxRIM3H6GT3zZe4MuDU93UHI_3TlkOyhfmTt3aEhHd-ZHHzclitHwAG3t/exec";

function registerWA(e){
    e.preventDefault();

    let name = document.getElementById("regName").value.trim();
    let phone = document.getElementById("regPhone").value.trim();
    let age = document.getElementById("regAge").value.trim();
    let issues = document.getElementById("regIssues").value.trim();
    let msg = document.getElementById("regMsg");

    msg.style.display = "block";
    msg.innerHTML = "⏳ Registration भेजा जा रहा है...";
    msg.style.color = "#34a853";

    let formBody = new URLSearchParams();
    formBody.append("name", name);
    formBody.append("phone", phone);
    formBody.append("age", age);
    formBody.append("issues", issues);

    fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString()
    })
    .then(() => {
        msg.innerHTML = "✅ Registration successful! 🎉 हम जल्द ही आपसे संपर्क करेंगे।";
        formReset();
    })
    .catch(() => {
        msg.innerHTML = "✅ Registration successful! 🎉 हम जल्द ही आपसे संपर्क करेंगे।";
        formReset();
    });

    function formReset() {
        document.getElementById("regName").value = "";
        document.getElementById("regPhone").value = "";
        document.getElementById("regAge").value = "";
        document.getElementById("regIssues").value = "";
    }

    setTimeout(() => { msg.style.display = "none"; }, 8000);
}

/* ============================================================
   SMART HEALTH DASHBOARD — All Calculations
   ============================================================ */

const H = {male:(w,h,a)=>10*w+6.25*h-5*a+5,female:(w,h,a)=>10*w+6.25*h-5*a-161};

function getVal(id){return parseFloat(document.getElementById(id).value)||0;}

function showErr(msg){
  const e=document.getElementById("dashErr");
  e.style.display=msg?"block":"none";e.textContent=msg||"";
}

function calculateHealth(){
  const age=getVal("dashAge"),h=getVal("dashHeight"),w=getVal("dashWeight");
  if(!age||!h||!w){showErr("⚠️ Please fill Age, Height & Weight");return;}
  if(age<10||age>120){showErr("⚠️ Age must be between 10-120");return;}
  if(h<50||h>280){showErr("⚠️ Height must be between 50-280 cm");return;}
  if(w<10||w>400){showErr("⚠️ Weight must be between 10-400 kg");return;}
  showErr("");

  const g=document.getElementById("dashGender").value;
  const af=parseFloat(document.getElementById("dashActivity").value);
  const goal=document.getElementById("dashGoal").value;
  const bmi=w/((h/100)*(h/100));
  const bmr=H[g](w,h,age);
  const tdee=bmr*af;

  // Tool 1: BMI
  const bmiEl=document.getElementById("bmiValue");
  animateNumber(bmiEl,bmi.toFixed(1));
  const cat=document.getElementById("bmiCategory");
  const bar=document.getElementById("bmiBar");
  let c,bc,p;
  if(bmi<18.5){c="Underweight";bc="#2196F3";p=(bmi/18.5)*33;}
  else if(bmi<25){c="Normal";bc="#4CAF50";p=33+((bmi-18.5)/6.4)*33;}
  else if(bmi<30){c="Overweight";bc="#FF9800";p=66+((bmi-25)/5)*33;}
  else{c="Obese";bc="#f44336";p=Math.min(100,66+((bmi-30)/10)*33);}
  cat.textContent=c;cat.style.background=bc+"20";cat.style.color=bc;
  bar.style.background=bc;bar.style.width=Math.min(p,100)+"%";

  // Tool 2: Ideal Weight
  const imin=18.5*((h/100)**2),imax=24.9*((h/100)**2);
  setText("idealMin",imin.toFixed(1)+" kg");setText("idealMax",imax.toFixed(1)+" kg");
  setText("idealDiff",(imax-imin).toFixed(1)+" kg");
  const inEl=document.getElementById("idealNote");
  if(w<imin)inEl.textContent="⚠️ You are below your ideal weight range.";
  else if(w>imax)inEl.textContent="⚠️ You are above your ideal weight range.";
  else inEl.textContent="✅ You are within your ideal weight range!";

  // Tool 3: Weight Goal
  const mid=(imin+imax)/2;
  const gl=document.getElementById("goalLabel");const ga=document.getElementById("goalAmount");
  const gt=document.getElementById("goalTarget");
  if(w>imax){gl.textContent="Need to Lose";ga.textContent=(w-mid).toFixed(1)+" kg";ga.style.color="#f44336";}
  else if(w<imin){gl.textContent="Need to Gain";ga.textContent=(mid-w).toFixed(1)+" kg";ga.style.color="#FF9800";}
  else{gl.textContent="You're on Track!";ga.textContent="0 kg";ga.style.color="#4CAF50";}
  gt.textContent=mid.toFixed(1)+" kg";

  // Tool 4: Water
  const wl=w*0.035;const wg=Math.round(wl/0.25);
  animateNumber(document.getElementById("waterL"),wl.toFixed(1));
  animateNumber(document.getElementById("waterG"),wg);

  // Tool 5: BMR
  animateNumber(document.getElementById("bmrValue"),Math.round(bmr));

  // Tool 6: Daily Calories
  setText("calMaintain",Math.round(tdee)+" cal");
  setText("calLoss",Math.round(tdee-500)+" cal");
  setText("calGain",Math.round(tdee+500)+" cal");

  // Tool 7: Protein
  setText("proteinMin",(w*0.8).toFixed(0)+" g");
  setText("proteinRec",(w*1.2).toFixed(0)+" g");
  setText("proteinAth",(w*1.6).toFixed(0)+" g");

  // Tool 8: Steps
  let steps=goal==="lose"?10000:goal==="gain"?7000:8000;
  setText("stepsValue",steps.toLocaleString());setText("stepsWalk",Math.round(steps/100)+" min");

  // Tool 9: Exercise
  const exList=document.getElementById("exerciseList");
  const exercises=bmi<18.5?["🧘 Yoga","🚶 Walking","🏋️ Light Strength"]:
    bmi<25?["🚶 Walking","🏃 Running","🧘 Yoga","🏋️ Strength Training","🙆 Stretching"]:
    bmi<30?["🚶 Walking","🧘 Yoga","🏊 Swimming","🙆 Stretching"]:
    ["🚶 Walking","🏊 Swimming","🧘 Yoga","🙆 Stretching"];
  exList.innerHTML=exercises.map(e=>`<span class="dash-ex-tag">${e}</span>`).join("");

  // Tool 10: Sleep
  setText("sleepHours","7-9 hours");
  setText("sleepTime","10:00 PM - 11:00 PM");

  // Tool 11: Goal Time
  const diff=Math.abs(w-mid);const weeks=diff/0.75;const months=weeks/4;
  setText("goalWeeks",Math.round(weeks)+" wks");
  setText("goalMonths",Math.round(months)+" mths");

  // Tool 12: Health Score
  let s=50;
  if(bmi>=18.5&&bmi<25)s+=15;else if(bmi<30)s+=8;else s+=3;
  if(w>=imin&&w<=imax)s+=10;else s+=4;
  s+=Math.min(10,Math.round(wl));
  if(af>=1.55)s+=10;else if(af>=1.375)s+=6;else s+=3;
  s=Math.min(100,Math.max(0,s));
  const deg=(s/100)*360;
  document.getElementById("scoreCircle").style.background=
    `conic-gradient(#34a853 ${deg}deg,#e8e8e8 ${deg}deg)`;
  animateNumber(document.getElementById("scoreValue"),s);
  document.getElementById("scoreDetail").innerHTML=
    `<div><span>BMI</span><span>${bmi<25?"✅":"⚠️"}</span></div>
     <div><span>Weight</span><span>${w>=imin&&w<=imax?"✅":"⚠️"}</span></div>
     <div><span>Water</span><span>${wl>=2.5?"✅":"⚠️"}</span></div>
     <div><span>Activity</span><span>${af>=1.55?"✅":"⚠️"}</span></div>`;

  // Tool 13: Health Risk
  const rEl=document.getElementById("riskLevel");const rF=document.getElementById("riskFill");
  if(bmi>=18.5&&bmi<25&&w>=imin&&w<=imax){
    rEl.textContent="🟢 Low";rEl.style.color="#4CAF50";rF.style.width="20%";rF.style.background="#4CAF50";
  }else if(bmi<30||w<imax*1.2){
    rEl.textContent="🟡 Medium";rEl.style.color="#FF9800";rF.style.width="55%";rF.style.background="#FF9800";
  }else{
    rEl.textContent="🔴 High";rEl.style.color="#f44336";rF.style.width="90%";rF.style.background="#f44336";
  }

  // Tool 14: Nutrition
  const calTarget=goal==="lose"?tdee-500:goal==="gain"?tdee+500:tdee;
  setText("nutriCal",Math.round(calTarget)+" cal");
  setText("nutriProtein",Math.round(w*1.2)+" g");
  setText("nutriCarbs",Math.round((calTarget*0.5)/4)+" g");
  setText("nutriFat",Math.round((calTarget*0.25)/9)+" g");

  // Tool 15: Tips
  const allTips=[
    "💧 Drink "+(wl.toFixed(1))+"L water daily","🥗 Eat more vegetables and fruits",
    "🏃 Walk "+steps+" steps every day","😴 Sleep 7-8 hours daily",
    "🍳 Eat protein with every meal","🧘 Practice deep breathing for stress",
    "📱 Reduce screen time before bed","🥤 Cut down on sugary drinks",
    "🚶 Take stairs instead of elevator","🥜 Eat nuts and seeds for healthy fats",
    "🍽️ Eat smaller portions more frequently","☀️ Get 15 min morning sunlight",
    "🧠 Practice gratitude daily","🚭 Avoid smoking and alcohol",
    "🏋️ Add strength training 2x/week","🎯 Join our FREE Health Session!"
  ];
  const tips=document.getElementById("tipsList");
  tips.innerHTML=allTips.slice(0,8).map(t=>`<li>${t}</li>`).join("");

  // Show results with smooth animation
  const container=document.getElementById("dashResults");
  container.classList.add("visible");
  document.querySelectorAll(".dash-card").forEach((c,i)=>{
    setTimeout(()=>c.classList.add("show"),i*80);
  });
  // Smooth scroll to results
  setTimeout(()=>container.scrollIntoView({behavior:"smooth",block:"nearest"}),100);
}

function setText(id,txt){document.getElementById(id).textContent=txt;}

function animateNumber(el,target,dur){
  const start=parseFloat(el.textContent)||0;
  if(Math.abs(target-start)<1){el.textContent=target;return;}
  const steps=30;const inc=(target-start)/steps;let c=0;
  const t=setInterval(()=>{
    c++;const val=start+inc*c;
    el.textContent=Number.isInteger(target)?Math.round(val):val.toFixed(1);
    if(c>=steps){clearInterval(t);el.textContent=target;}
  },20);
}

function resetDashboard(){
  ["dashAge","dashHeight","dashWeight"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("dashGender").value="male";
  document.getElementById("dashActivity").value="1.375";
  document.getElementById("dashGoal").value="lose";
  document.getElementById("dashResults").classList.remove("visible");
  showErr("");
  document.querySelectorAll(".dash-card").forEach(c=>c.classList.remove("show"));
}

function downloadReport(){
  const r=document.getElementById("dashResults");
  if(!r.classList.contains("visible")){alert("Please calculate first!");return;}
  const w=window.open("","_blank");
  w.document.write(`
    <html><head><title>Health Report</title>
    <style>
      body{font-family:Arial,sans-serif;padding:40px;color:#333;}
      h1{color:#34a853;}h2{color:#1f2937;border-bottom:2px solid #34a853;padding-bottom:6px;}
      .item{margin:10px 0;padding:10px;background:#f9f9f9;border-radius:8px;}
      @media print{body{padding:20px;}}
    </style></head><body>
    <h1>🏥 Fat To Fit — Health Report</h1>
    <p>Generated: ${new Date().toLocaleDateString()}</p>
    ${document.querySelector("#tools").innerHTML}
    <p style="margin-top:30px;font-size:12px;color:#999;">© Fat To Fit Community</p>
    </body></html>
  `);w.document.close();setTimeout(()=>w.print(),500);
}

function printReport(){
  const r=document.getElementById("dashResults");
  if(!r.classList.contains("visible")){alert("Please calculate first!");return;}
  window.print();
}

function shareResult(){
  const r=document.getElementById("dashResults");
  if(!r.classList.contains("visible")){alert("Please calculate first!");return;}
  const bmi=document.getElementById("bmiValue").textContent;
  const score=document.getElementById("scoreValue").textContent;
  const txt=`🏥 My Health Report - Fat To Fit Community\n\nBMI: ${bmi}\nHealth Score: ${score}/100\n\nCheck yours at: fattfit.com`;
  if(navigator.share)navigator.share({title:"My Health Report",text});
  else{copyToClipboard(txt);alert("📋 Report copied to clipboard!");}
}

function copyResult(){
  const r=document.getElementById("dashResults");
  if(!r.classList.contains("visible")){alert("Please calculate first!");return;}
  const els=document.querySelectorAll(".dash-card-body");
  let t="🏥 HEALTH REPORT\n═══════════════════\n";
  els.forEach(e=>{const tx=e.textContent.trim();if(tx)t+=tx+"\n";});
  t+="\n© Fat To Fit Community";
  copyToClipboard(t);alert("📋 Report copied!");
}

function copyToClipboard(t){const ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();}

function shareWhatsApp(){
  const r=document.getElementById("dashResults");
  if(!r.classList.contains("visible")){alert("Please calculate first!");return;}
  const bmi=document.getElementById("bmiValue").textContent;
  const score=document.getElementById("scoreValue").textContent;
  const txt=`🏥 *My Health Report*\n• BMI: ${bmi}\n• Score: ${score}/100\n\nJoin Fat To Fit Community 🟢`;
  window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
}