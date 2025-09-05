// Одна тема (Сумерки) + фиксированная палитра + параллакс «колизий»
(function () {
  const root = document.documentElement;
  root.setAttribute('data-theme', 'dim');
  root.style.setProperty('--accent', '#00d4ff');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const lerp = (a,b,t)=>a+(b-a)*t;
  let target = 0, current = 0;

  window.addEventListener('mousemove', (e)=>{
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    target = (e.clientX / vw - .5);
  });

  function loop(){
    current = lerp(current, target, .12);
    const rx = (current*12).toFixed(3);
    const ry = (current*8).toFixed(3);
    document.querySelectorAll('.collision').forEach(el=>{
      el.style.transform = `translate3d(${rx}px,0,0) rotateY(${ry}deg)`;
    });
    requestAnimationFrame(loop);
  }
  loop();
})();
