"use strict";(()=>{function s(){let o=document.createElement("div");return Object.assign(o.style,{position:"fixed",inset:"0",background:"rgba(0, 0, 0, 0.35)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:"999998"}),o}function c(){let o=document.createElement("div");return Object.assign(o.style,{position:"fixed",inset:"0",display:"flex",alignItems:"center",justifyContent:"center",zIndex:"1000000",pointerEvents:"none"}),o.innerHTML=`
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 24px;
        font-family: system-ui, sans-serif;
      "
    >
      <div
        style="
          width: 28px;
          height: 28px;
          border: 3px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: dodo-sdk-spin 0.8s linear infinite;
        "
      ></div>

      <div
        style="
          color: white;
          font-size: 14px;
          font-weight: 500;
        "
      >
        Loading checkout...
      </div>
    </div>

    <style>
      @keyframes dodo-sdk-spin {
        to {
          transform: rotate(360deg);
        }
      }
    </style>
  `,o}function l(){let o=document.createElement("div");return Object.assign(o.style,{position:"fixed",inset:"0",display:"flex",alignItems:"center",justifyContent:"center",zIndex:"1000000",fontFamily:"system-ui, sans-serif"}),o.innerHTML=`
    <div
      style="
        width: min(380px, calc(100vw - 32px));
        box-sizing: border-box;
        padding: 28px;
        border-radius: 16px;
        background: white;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      "
    >
      <div
        style="
          font-size: 16px;
          font-weight: 600;
          color: #111;
          margin-bottom: 8px;
        "
      >
        Checkout couldn't load
      </div>

      <div
        style="
          font-size: 14px;
          line-height: 1.5;
          color: #666;
          margin-bottom: 20px;
        "
      >
        Something went wrong while loading the checkout.
        Please try again.
      </div>

      <button
        type="button"
        data-dodo-retry
        style="
          width: 100%;
          border: 0;
          border-radius: 10px;
          padding: 12px 16px;
          background: #111;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        "
      >
        Try again
      </button>
    </div>
  `,o}var a="http://localhost:5173",h=1e4,x=150,e=null,d=null;function v(){d=document.body.style.overflow,document.body.style.overflow="hidden"}function k(){document.body.style.overflow=d??"",d=null}function w(o){e?.iframe.contentWindow?.postMessage(o,a)}function u(){e&&(clearTimeout(e.readyTimeout),clearTimeout(e.loaderTimeout),window.removeEventListener("message",p),e.iframe.remove(),e.backdrop.remove(),e.loader.remove(),e=null,k())}function T(){if(!e)return;let o=e.options;u();let t=s(),n=l();n.querySelector("[data-dodo-retry]")?.addEventListener("click",()=>{t.remove(),n.remove(),m(o)}),document.body.appendChild(t),document.body.appendChild(n)}function p(o){if(!e||o.origin!==a||o.source!==e.iframe.contentWindow)return;let t=o.data;if(t.instanceId===e.instanceId)switch(t.type){case"READY":{clearTimeout(e.readyTimeout),clearTimeout(e.loaderTimeout),e.loader.remove(),e.iframe.style.visibility="visible",e.iframe.focus(),w({source:"dodo-sdk",type:"INIT",instanceId:e.instanceId,productId:e.options.productId});break}case"SUCCESS":{e.options.onSuccess?.({sessionId:t.sessionId});break}case"ERROR":{e.options.onError?.({code:t.code,message:t.message});break}case"CLOSED":{e.options.onClose?.({reason:t.reason}),u();break}}}function m(o){if(e)return;let t=crypto.randomUUID(),n=s(),i=c(),r=document.createElement("iframe"),g=new URLSearchParams({instanceId:t,productId:o.productId,origin:window.location.origin});r.src=`${a}?${g.toString()}`,Object.assign(r.style,{position:"fixed",inset:"0",width:"100%",height:"100%",border:"0",background:"transparent",zIndex:"999999",visibility:"hidden"});let y=setTimeout(()=>{T()},h),b=setTimeout(()=>{document.body.appendChild(i)},x);e={iframe:r,backdrop:n,loader:i,instanceId:t,options:o,readyTimeout:y,loaderTimeout:b},window.addEventListener("message",p),v(),document.body.appendChild(n),document.body.appendChild(r)}var f={open:m};window.DodoCheckout=f;})();
//# sourceMappingURL=dodo-checkout.js.map
