import{l as e,n as t,u as n}from"./supabaseClient-C7gHnHUi.js";import{c as r,i,l as a,n as o,s,t as c}from"./measureDraft-DFVexolS.js";import{t as l}from"./adminAccess-BqWs8i9A.js";import{a as u,i as d,n as f,o as p,s as m,u as h}from"./measurePriceWarmup-BRI2ISZw.js";import{n as g}from"./catalogChanges-BlHQ27lT.js";import{C as _,D as v,E as y,O as b,S as x,T as S,g as C,h as w,p as T,w as E,x as D}from"./legacyProductRules-Cc_J67Wv.js";import{_ as O,c as k,d as A,f as ee,g as j,h as te,l as M,m as N,o as ne,p as P,r as re,s as ie,t as ae,u as F,v as oe,y as se}from"./recordInformation-T867QR6K.js";import{n as ce}from"./pageNavigation-EF1UGgY3.js";import{B as le,F as ue,I as de,J as fe,L as pe,M as me,N as I,P as he,R as ge,U as L,Y as _e,_ as ve,a as ye,h as be,i as xe,j as Se,k as Ce,o as we,q as Te,r as Ee,s as De,t as Oe,v as ke,z as Ae}from"./clientShipping-DWSR3ssI.js";import{o as je}from"./reviewSupplements-B7_4X1E8.js";/* empty css                       */import{i as Me,n as Ne,t as Pe}from"./productCompatibility-DojogLOH.js";import{i as Fe,n as Ie,o as Le,t as Re}from"./summarySpacing-DPd406yM.js";import{i as ze,n as Be,t as Ve}from"./quoteAccountAction-DEM0c0Kv.js";var He=[`fabrics`,`hardware`,`hardwareColors`,`controls`,`pricing`];async function Ue(e){let{data:t,error:n}=await e.rpc(`winco_measure_catalog_versions`);if(n)throw Error(`Current product prices could not be checked. Retry before saving.`);if(!t||[...He,`account`].some(e=>typeof t[e]!=`string`||!t[e]))throw Error(`Current product prices could not be confirmed. Retry before saving.`);return t}var We=(e,t)=>e&&t&&[...He,`account`].every(n=>e[n]===t[n]);function Ge({versions:e,loaders:t,active:n=()=>!0,onConfirmed:r=()=>{}}){let i=null,a=null,o=!1;return{check:async({force:s=!1}={})=>{for(;a;)try{await a}catch{}if(o||!n())throw Error(`Reopen Measure to check current prices.`);let c=(async()=>{for(let a=0;a<3;a++){let a=await e();if(o||!n())throw Error(`Reopen Measure to check current prices.`);let c=He.filter(e=>s||!i||i.account!==a.account||i[e]!==a[e]);if(!c.length)return r(a),{versions:a,changed:[]};let l=await Promise.allSettled(c.map(e=>t[e]()));if(o||!n())throw Error(`Reopen Measure to check current prices.`);if(l.some(e=>e.status===`rejected`||e.value===!1))throw i=null,Error(`Product data could not be loaded. Retry before saving.`);let u=await e();if(o||!n())throw Error(`Reopen Measure to check current prices.`);if(We(a,u))return i={...u},r(u),{versions:u,changed:c};i=null}throw Error(`Product data changed while loading. Retry before saving.`)})();a=c;try{return await c}finally{a===c&&(a=null)}},dispose(){o=!0,i=null}}}function Ke(e,t){let n=Symbol(t),r=null,i=[];e.measureProductsOwner=n,delete e.measureProductConfiguration;let a=E(n,()=>{if(e.measureProductsOwner!==n||e.measureCurrentAccountId!==t||!e.measureProductConfiguration)return null;if([`measureFabricCatalogState`,`measureHardwareCatalogState`,`measureHardwareColorsState`,`measureControlCatalogState`,`measurePricingCatalogState`].some(t=>e[t]!==`ready`))return r;let a=[e.measureProductConfiguration,e.measureFabricItems,e.measureHardwareItems,e.measureHardwareColors,e.measureControlItems,e.measurePricingOptionItems,e.measurePricingMotorItems,e.measurePricingCordlessTypeItems,e.measurePricingAccessoryItems,e.measurePricingRateTables,e.measureChainOptions];return r&&a.every((e,t)=>e===i[t])?r:(r=Pe(Ne({catalogs:{fabric:{rows:e.measureFabricItems||[]},hardware:{rows:(e.measureHardwareItems||[]).map(t=>({...t,hardware_colors:(e.measureHardwareColors||[]).filter(e=>String(e.hardware_id)===String(t.id))}))},control:{rows:e.measureControlItems||[]}},pricing:{items:[...e.measurePricingOptionItems||[],...e.measurePricingMotorItems||[],...e.measurePricingCordlessTypeItems||[],...e.measurePricingAccessoryItems||[]],rates:e.measurePricingRateTables||[]},chain:{rows:e.measureChainOptions||[]},configuration:e.measureProductConfiguration})),i=a,r)});return e.wincoProductCatalog={option:e=>_()?.optionProduct(e),sameOption:(e,t)=>_()?.sameOption(e,t)??String(e).trim().toLowerCase()===String(t).trim().toLowerCase(),manualChoices:()=>_()?.registry.products.filter(e=>e.kind===`control`&&e.group===`Manual`&&e.enabled&&e.priceReady&&e.compatReady)||null,optionPrice:e=>{let t=_()?.optionProduct(e);return t?t.charge===`Included`||t.charge===`Size`?0:t.price:void 0}},()=>{a(),e.measureProductsOwner===n&&(delete e.measureProductsOwner,delete e.measureProductConfiguration,delete e.wincoProductCatalog)}}var qe=[`measureFabricCatalogState`,`measureHardwareCatalogState`,`measureHardwareColorsState`,`measureControlCatalogState`];function Je(e){let t=[e.measurePricingCatalogState,...qe.map(t=>e[t])];return t.includes(`error`)?`error`:t.every(e=>e===`ready`)?`ready`:`loading`}function Ye(e,t,n,r){let i=0;return async(...a)=>{if(!r())return!1;let o=++i,s=()=>r()&&o===i;e[t]=`loading`,e.updateMeasurePricingStatus?.();try{let r=await n(...a);return s()&&(e[t]=r===!0?`ready`:`error`),r}catch(n){return s()&&(e[t]=`error`,console.error(`Failed to load product data:`,n)),!1}finally{s()&&e.updateMeasurePricingStatus?.()}}}function Xe(e=globalThis.window){let t=!0,n=[],r=new Set;return{listen(e,r,i,a){t&&(e.addEventListener(r,i,a),n.push([e,r,i,a]))},delay(n,i=0){if(!t)return;let a=e.setTimeout(()=>{r.delete(a),t&&n()},i);return r.add(a),a},dispose(){t=!1,n.splice(0).forEach(([e,t,n,r])=>e.removeEventListener(t,n,r)),r.forEach(t=>e.clearTimeout(t)),r.clear()}}}var R=e=>e==null||String(e).trim()===``?null:Number(e),Ze=e=>Math.round(e*1e6)/1e6;function Qe(e){return e?R(e.dataset.mmDisplay===e.value?e.dataset.mmValue:e.value):null}function $e(e,t=Qe(e)){e.dataset.mmValue=t==null?``:String(t),e.value=t===0?`0`:Te(t),e.dataset.mmDisplay=e.value}function et(e,t){let n=t.map(e=>R(e.widthMm)),r=t.findIndex(e=>e.autoCalculated===!0);if(r>=0&&n.some((e,t)=>t!==r&&e===null)&&(n[r]=null,r=-1),r<0){let e=n.flatMap((e,t)=>e===null?[t]:[]);e.length===1?r=e[0]:e.length||(r=n.length===3?1:n.length-1)}if(n.length<2&&(r=-1),r>=0){let t=R(e),i=n.filter((e,t)=>t!==r);n[r]=Number.isFinite(t)&&t>0&&i.every(Number.isFinite)?Math.max(0,Ze(t-i.reduce((e,t)=>e+t,0))):null}return{values:n,autoIndex:r}}function tt(e){if(!I(e.config))return[];let t=e.splits||[],n=R(e.widthMm),r=t.map(e=>R(e.widthMm));return t.length<2||t.length>7?[`Choose between 2 and 7 sections.`]:!Number.isFinite(n)||n<=0?[`Enter the total width before setting section widths.`]:r.some(e=>!Number.isFinite(e))?[`Enter the width of each section except the automatically calculated section.`]:r.some(e=>e<=0)?[`Every section must have a positive width. The entered widths must leave room for the automatic section.`]:Math.abs(r.reduce((e,t)=>e+t,0)-n)>1e-6?[`Section widths must add up to the total width.`]:[]}function nt(e,t=!1){e?.querySelectorAll(`.split-mm-input`).forEach(e=>{e.readOnly=!1,e.classList.remove(`split-input-auto`),e.removeAttribute(`aria-readonly`),e.removeAttribute(`aria-invalid`),e.removeAttribute(`title`),e.setCustomValidity(``),t&&(delete e.dataset.autoFilled,delete e.dataset.forceAuto)})}function rt(e,t){let n=e?.querySelector(`.split-row`);if(!n||n.classList.contains(`hidden`))return;let r=Array.from(n.querySelectorAll(`.split-mm-input`)),i=r.map(e=>e.dataset.autoFilled===`true`||e.dataset.forceAuto===`true`),{values:a,autoIndex:o}=et(t,r.map(e=>({widthMm:Qe(e),autoCalculated:e.dataset.autoFilled===`true`||e.dataset.forceAuto===`true`})));nt(e,!0);let s=tt({config:`Multi`,widthMm:t,splits:a.map(e=>({widthMm:e}))})[0];r.forEach((e,t)=>{(t===o||i[t]&&a[t]===null)&&$e(e,a[t]),t===o&&(e.readOnly=!0,e.dataset.autoFilled=`true`,e.classList.add(`split-input-auto`),e.setAttribute(`aria-readonly`,`true`),e.title=s||`Automatically calculated: total width minus the other sections.`,s&&e.setAttribute(`aria-invalid`,`true`)),e.setCustomValidity(s||``)})}var it=e=>[...e.querySelectorAll(`.field-label`)].find(e=>e.textContent.trim()===`Config`)?.parentElement.querySelector(`.field`),at=e=>e.querySelector(`.dimension-field[data-dimension="w"]`),ot=e=>e===``||e==null?null:Number(e),st=[`Single`,`Multi`,`Linked`,`Multi + Linked`],ct=e=>I(it(e)?.querySelector(`span`)?.textContent.trim());function lt(e){let t=e?.querySelector(`[data-ctrl-side-section]`),n=t?.querySelector(`.field span`);return!n||ct(e)||t.classList.contains(`hidden`)||n.classList.contains(`placeholder`)?``:n.textContent.trim()}function ut(e){let t=e?.querySelector(`[data-ctrl-side-section]`),n=t?.querySelector(`.field`),r=n?.querySelector(`span`);if(!r)return;let i=ct(e);if(i)[`L`,`R`].includes(r.textContent.trim())&&(r.dataset.singleControlSide=r.textContent.trim()),r.textContent=`—`,r.classList.add(`placeholder`),n.setAttribute(`role`,`textbox`),n.setAttribute(`aria-label`,`Ctrl Side`),n.setAttribute(`aria-readonly`,`true`),t.querySelector(`.client-menu`)?.classList.add(`hidden`);else{if(r.textContent.trim()===`—`){let e=r.dataset.singleControlSide||``;r.textContent=e||`L/R`,r.classList.toggle(`placeholder`,!e)}n.removeAttribute(`role`),n.removeAttribute(`aria-label`),n.removeAttribute(`aria-readonly`)}n.classList.toggle(`ctrl-side-readonly`,i)}function dt(e){let t=it(e)?.querySelector(`span`)?.textContent.trim()||`Single`;return{config:t,widthMm:ot(at(e)?.dataset.mmValue),splits:[...e.querySelectorAll(`[data-split-fields] .split-item`)].map(e=>({widthMm:Qe(e.querySelector(`.split-mm-input`)),ctrl:e.querySelector(`.split-select-display`)?.textContent.trim()||`None`,autoCalculated:e.querySelector(`.split-mm-input`)?.dataset.autoFilled===`true`,linkedToNext:e.dataset.linkedToNext===void 0?t===`Linked`:e.dataset.linkedToNext===`true`}))}}function ft(e){rt(e,ot(at(e)?.dataset.mmValue)),window.updateWindowCardPricing(e,0),e.dispatchEvent(new Event(`input`,{bubbles:!0}))}function pt(e,t){let n=e.querySelector(`.split-row`),r=I(t.config),i=it(e);if(i.tagName!==`BUTTON`){let e=document.createElement(`button`);e.type=`button`,e.className=`field configuration-trigger`,e.setAttribute(`onclick`,`toggleConfigMenu(this)`),e.append(...i.childNodes),i.replaceWith(e),i=e}i.classList.add(`configuration-trigger`),i.removeAttribute(`aria-haspopup`),i.querySelector(`span`).textContent=r?t.config:`Single`,i.setAttribute(`aria-label`,`Window configuration: ${r?t.config:`Single`}`),i.title=`Choose window configuration`;let a=i.parentElement.querySelector(`[data-configuration-menu]`);a||(i.parentElement.querySelector(`.client-menu`)?.remove(),a=document.createElement(`div`),a.className=`client-menu hidden menu-right-align`,a.dataset.configurationMenu=``,st.forEach(e=>{let t=document.createElement(`button`);t.type=`button`,t.className=`client-option`,t.textContent=e,t.setAttribute(`onclick`,`selectConfig(this,'${e}')`),a.append(t)}),i.parentElement.append(a)),a.querySelectorAll(`button`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.textContent===(r?t.config:`Single`)))),a.classList.add(`hidden`),n.classList.toggle(`hidden`,!r),n.removeAttribute(`aria-hidden`),n.replaceChildren();let o=document.createElement(`div`);o.className=`split-row-inner`,o.dataset.splitContainer=``;let s=document.createElement(`div`);s.className=`split-fields`,s.dataset.splitFields=``;let c=t.splits?.length>=2?t.splits:[{},{}];c.forEach((e,n)=>{let r=document.createElement(`div`);if(r.className=`split-unit`,t.config===`Multi + Linked`&&n>0){let e=document.createElement(`label`);e.className=`split-link`;let t=document.createElement(`span`);t.textContent=`Linked`;let i=document.createElement(`input`);i.type=`checkbox`,i.checked=c[n-1].linkedToNext===!0,i.defaultChecked=i.checked,i.dataset.linkIndex=String(n-1),i.setAttribute(`aria-label`,`Link sections ${n} and ${n+1}`),i.setAttribute(`onchange`,`window.wincoConfiguration.link(this)`),e.append(t,i),r.append(e)}let i=document.createElement(`div`);i.className=`split-item`,i.dataset.linkedToNext=String(n<c.length-1&&(t.config===`Linked`||t.config===`Multi + Linked`&&e.linkedToNext===!0));let a=document.createElement(`div`);a.className=`split-label`,a.textContent=`(${n+1}/${c.length})`,i.innerHTML=`<div class="split-combo"><div class="split-seg"><input class="split-mm-input" type="number" step="any" min="0" placeholder="mm" aria-label="Section ${n+1} width in mm"></div><div class="split-seg"><div class="split-select-display" onclick="toggleSplitCtrlMenu(this, event)"></div><div class="client-menu split-select-menu hidden"><div class="client-option" onclick="selectSplitCtrl(this,'None', event)">None</div><div class="client-option" onclick="selectSplitCtrl(this,'L', event)">L</div><div class="client-option" onclick="selectSplitCtrl(this,'R', event)">R</div></div></div></div>`,i.prepend(a);let o=i.querySelector(`input`);$e(o,e.widthMm??null),o.defaultValue=o.value,e.autoCalculated&&(o.dataset.autoFilled=`true`),i.querySelector(`.split-select-display`).textContent=e.ctrl||`None`,r.append(i),s.append(r)});let l=document.createElement(`div`);l.className=`split-control`,l.innerHTML=`<div class="split-label">&nbsp;</div><div class="field"><button type="button" data-section-minus aria-label="Remove section" onclick="window.wincoConfiguration.resize(this,-1)">−</button><button type="button" data-section-plus aria-label="Add section" onclick="window.wincoConfiguration.resize(this,1)">+</button></div>`,l.querySelector(`[data-section-minus]`).disabled=c.length<=2,l.querySelector(`[data-section-plus]`).disabled=c.length>=7,o.append(s,l),n.append(o),r&&rt(e,ot(at(e)?.dataset.mmValue)),ut(e)}function mt(e,t){if(!st.includes(t))return;let n=e.closest(`.card`);pt(n,{...dt(n),config:t}),I(t)&&window.selectUnit(`mm`),ft(n)}function ht(e,t){let n=e.closest(`.card`),r=dt(n),i=Math.max(2,Math.min(7,r.splits.length+t));if(i===r.splits.length)return;let a=r.splits.slice(0,i).map(e=>t>0?{...e,widthMm:e.autoCalculated?null:e.widthMm,autoCalculated:!1}:{...e});for(;a.length<i;)a.push({widthMm:null,ctrl:`None`,linkedToNext:r.config===`Linked`});t<0&&!a.some(e=>e.autoCalculated)&&(a.at(-1).autoCalculated=!0),a.at(-1).linkedToNext=!1,pt(n,{...r,splits:a}),ft(n)}function gt(e){let t=e.closest(`.card`),n=t.querySelectorAll(`[data-split-fields] .split-item`)[Number(e.dataset.linkIndex)];n&&(n.dataset.linkedToNext=String(e.checked),e.defaultChecked=e.checked,ft(t))}var z={read:dt,restore:pt,select:mt,resize:ht,link:gt,layout:me,isCardDivided:ct,readControlSide:lt,syncControlSide:ut};function _t(e){e.reindexWindowCards?.({refresh:!1}),e.updateWindowCardActionButtons?.(),e.updateAllWindowSqft?.({refresh:!1}),e.updateAllWindowPricing?.({refresh:!1}),e.renderReviewTableRows?.(),e.renderReviewSummaryTotals?.()}var B=(e,t)=>Array.from(e?.querySelectorAll(t)||[]),V=e=>!e||e.classList.contains(`placeholder`)?``:e.textContent.trim(),H=(e,t)=>e?.querySelector(t)?.value??``,U=(e,t)=>B(e,`.field-label`).find(e=>e.textContent.trim()===t)?.parentElement?.querySelector(`.field span`),vt={":scope":[`savedDuoHeadrailCode`,`channelChargeCategory`,`chargeQuantities`,`savedSectionPricing`,`savedOptionAmount`,`savedSurchargeAmount`,`savedMotorAmount`,`optionPriceSelection`,`surchargePriceSelection`,`motorPriceSelection`],".dimension-field":[`mmValue`],".split-mm-input":[`mmValue`,`mmDisplay`],"[data-fabric-display]":[`fabricId`,`fabricCode`,`fabricGroup`,`fabricDescription`,`fabricPrice`,`fabricWidth`,`fabricVisibility`],"[data-fabric-color-display]":[`fabricColorId`,`fabricColor`,`fabricColorStatus`,`fabricColorVisibility`],"[data-headrail-display]":[`headrailId`,`headrailCode`,`headrailDescription`,`headrailPricingType`],"[data-bottomrail-display]":[`bottomrailId`,`bottomrailCode`,`bottomrailDescription`,`bottomrailPricingType`],".rail-seg.clickable":[`railColorId`,`railColorCode`,`railColorDescription`,`railColorVisibility`],"[data-cordless-type-section] .field span:first-child":[`cordlessTypeCode`,`cordlessTypePrice`,`cordlessPricingId`],"[data-motor-section] .field span:first-child":[`motorName`,`motorCode`,`motorPricingId`],"[data-ctrl-side-section] .field span":[`singleControlSide`],"[data-measure-tag-display]":[`measureTagMode`,`measureTagSource`,`measureTagValue`],"[data-accessory-item]":[`accessoryPricingId`,`accessoryValue`]},yt=[`.info-input`,`.info-comments-input`,`[data-sidemark-input]`,`[data-memo-input]`,`.dimension-field input`,`.dimension-field select`,`.split-mm-input`,`.length-input`,`[data-review-calc-input]`,`[data-accessory-qty]`,`[data-accessory-price]`,`[data-accessory-discount-input]`,`[data-installation-date]`,`[data-installation-time]`],bt=[`install`,`extraFee`,`bldSurDiscountPercent`,`optDiscountPercent`,`motDiscountPercent`],xt=(e,t)=>{let n=B(e,t);return t===`[data-review-calc-input]`&&n.some(e=>e.dataset?.reviewCalcKey)?bt.map(e=>n.find(t=>t.dataset.reviewCalcKey===e)).filter(Boolean):n},St=(e,t)=>t===`:scope`?[e]:B(e,t);function W(e){return{fields:Object.fromEntries(yt.map(t=>[t,xt(e,t).map(e=>String(e.value??``))])),metadata:Object.fromEntries(Object.entries(vt).map(([t,n])=>[t,St(e,t).map(e=>Object.fromEntries(n.filter(t=>e.dataset[t]!==void 0).map(t=>[t,e.dataset[t]])))]))}}function G(e,t){for(let n of yt)xt(e,n).forEach((e,r)=>{let i=t?.fields?.[n]?.[r];typeof i==`string`&&(e.value=i)});for(let[n,r]of Object.entries(vt))St(e,n).forEach((e,i)=>{let a=t?.metadata?.[n]?.[i];if(!(!a||typeof a!=`object`))for(let t of r)typeof a[t]==`string`?e.dataset[t]=a[t]:delete e.dataset[t]})}var Ct=e=>B(e,`.window-head`).map(e=>e.closest(`.card`)),wt=e=>B(e.querySelector(`.review-table-wrap`)?.closest(`.card`),`.check`).find(e=>e.textContent.includes(`Show excluded items`)),Tt=(e,t)=>B(e,t+` .check.checked`).map(e=>V(e.querySelector(`span:not(.check-box)`))),Et=(e,t)=>V(B(e.querySelector(`[data-`+t+`-display]`)?.closest(`.col-3`),`.rail-seg.clickable`).at(-1)),Dt=(e,t,n)=>e.querySelector(t)?H(e,t):V(n);function Ot(e){let t=e.querySelector(`#informationCard`),n=U(t,`Client`),r=B(t,`.info-input`),i=Ct(e),a=xt(e,`[data-review-calc-input]`),o=i.map((e,t)=>{let n=e.querySelector(`[data-motor-section] .field span`),r=e.querySelector(`[data-headrail-display]`);return{no:t+1,included:!!e.querySelector(`.window-head .check.checked`),...z.read(e),...le(e),heightMm:Number(e.querySelector(`[data-dimension="h"]`)?.dataset.mmValue||0),group:V(U(e,`Group`)),location:Dt(e,`[data-location-input]`,U(e,`Location`)),room:Dt(e,`[data-room-input]`,e.querySelector(`[data-room-display]`)),mount:Dt(e,`[data-mount-type-input]`,e.querySelector(`[data-mount-type-display]`)),sidemark:H(e,`[data-sidemark-input]`),memo:H(e,`[data-memo-input]`),headrailMeta:Object.fromEntries([`id`,`code`,`description`,`pricingType`].map(e=>[e,r?.dataset[`headrail`+e[0].toUpperCase()+e.slice(1)]||``])),headrailColor:Et(e,`headrail`),bottomrail:V(e.querySelector(`[data-bottomrail-display]`)),bottomrailColor:Et(e,`bottomrail`),control:V(U(e,`Control Type`)),controlSide:z.readControlSide(e),length:H(e,`.length-input`),controlFamily:oe({control:V(U(e,`Control Type`)),controlFamily:U(e,`Control Type`)?.dataset.controlFamily}),cordlessType:V(e.querySelector(`[data-cordless-type-section] .field span`)),motorName:V(n),motorCode:n?.dataset.motorCode||``,motorPricingId:n?.dataset.motorPricingId||``,optionState:{general:Tt(e,`[data-general-option-box]`),chain:Tt(e,`[data-chain-option-section]`),cordless:Tt(e,`[data-cordless-option-section]`)},chargeQuantities:pe(e),channelChargeCategory:e.dataset.channelChargeCategory||`surcharge`}}),s={quoteNumber:V(e.querySelector(`.meta div[style*="font-size:16px"]`)),quoteDate:V(e.querySelector(`.meta-right span`)),unit:V(e.querySelector(`#unitLabel`)),information:{tag:V(t.querySelector(`[data-measure-tag-display]`)),client:V(n),clientId:n?.dataset.clientId||``,clientAccount:n?.dataset.clientAccount||``,clientCompany:n?.dataset.clientCompany||``,partner:V(U(t,`Partner`)),type:Dt(t,`[data-measure-type-input]`,U(t,`Type`)),...Object.fromEntries([`name`,`address`,`phone`,`email`].map((e,t)=>[e,r[t]?.value||``])),comments:H(t,`.info-comments-input`),installationDate:H(e,`[data-installation-date]`),installationTime:H(e,`[data-installation-time]`)},windows:o,accessories:{rows:B(e,`.accessory-row`).map(e=>({item:e.querySelector(`[data-accessory-item]`)?.dataset.accessoryValue||V(e.querySelector(`[data-accessory-item]`)),qty:H(e,`[data-accessory-qty]`),price:e.dataset.accessoryPrice||H(e,`[data-accessory-price]`)})),discountPercent:H(e,`[data-accessory-discount-input]`)},summary:Object.fromEntries([`install`,`extraFee`,`bldSurDiscountPercent`,`optDiscountPercent`,`motDiscountPercent`].map((e,t)=>[e,a[t]?.value||``]))};s.quoteNumber=s.quoteNumber.replace(/^#\s*/,``);let c=e.querySelector(`#clientInformationCard`);return c&&(s.information={...ye(e),installationDate:H(e,`[data-installation-date]`),installationTime:H(e,`[data-installation-time]`)},s.clientInformation=xe(e),s.informationVersion=2),{payload:s,ui:{informationCollapsed:t.classList.contains(`is-collapsed`),clientInformationCollapsed:!!c?.classList.contains(`is-collapsed`),showExcluded:!!wt(e)?.classList.contains(`checked`)},...c?{informationLayoutVersion:3,clientRaw:W(c)}:{},raw:W(e.querySelector(`#informationCard`)),windows:i.map(e=>({...W(e),custom:Object.fromEntries([`location`,`room`,`mount-type`].map(t=>[t,e.querySelector(`[data-`+t+`-input]`)?.value??null]))})),review:W(e.querySelector(`.review-bottom`)),accessories:W(e.querySelector(`.accessories`))}}function kt(e,t,n,r){if(!t?.payload||!Array.isArray(t.payload.windows))throw Error(`This draft could not be restored.`);n({quote:{raw_payload:t.payload},windows:[],accessories:[]},{deferRefresh:!0}),(t.informationLayoutVersion===3||!e.querySelector(`#clientInformationCard`))&&G(e.querySelector(`#informationCard`),t.raw),t.informationLayoutVersion>=2&&G(e.querySelector(`#clientInformationCard`),t.clientRaw),Ct(e).forEach((e,n)=>{let i=t.windows?.[n];for(let[t,n]of[[`location`,`selectLocation`],[`room`,`selectRoom`],[`mount-type`,`selectMountType`]]){if(typeof i?.custom?.[t]!=`string`)continue;let a=t===`location`?`[onclick="toggleLocationMenu(this)"]`:t===`room`?`.room-type-combo`:`[data-mount-type-wrapper]`,o=(e.querySelector(a)?.parentElement)?.querySelector(`.client-option`);o&&typeof r[n]==`function`&&r[n](o,`custom`);let s=e.querySelector(`[data-`+t+`-input]`);s&&(s.value=i.custom[t])}G(e,i)}),G(e.querySelector(`.review-bottom`),t.review),G(e.querySelector(`.accessories`),t.accessories);let i=e.querySelector(`#informationCard`);t.ui?.informationCollapsed!==void 0&&i.classList.contains(`is-collapsed`)!==t.ui.informationCollapsed&&r.toggleInformationCard?.();let a=e.querySelector(`#clientInformationCard`);a&&t.ui?.clientInformationCollapsed!==void 0&&a.classList.contains(`is-collapsed`)!==t.ui.clientInformationCollapsed&&r.toggleInformationCard?.(`clientInformationCard`),t.ui?.showExcluded!==void 0&&wt(e)?.classList.toggle(`checked`,t.ui.showExcluded),r.forceMeasureTagRefresh?.(),_t(r)}function At(e,t){let n=e.createElement(`template`);if(n.innerHTML=t,!n.content.querySelector(`#informationCard`))throw Error(`This saved draft is incomplete.`);return Ot(n.content)}function jt(e,t,{delay:n=120,maxWait:r=500}={}){let i,a,o=()=>{t.clearTimeout(i),t.clearTimeout(a),i=a=void 0},s=()=>(o(),e());return{schedule(){t.clearTimeout(i),i=t.setTimeout(s,n),a??=t.setTimeout(s,r)},flush:s,cancel:o}}function Mt(){let e=(e,t,n,r=``)=>{let i=e?e.querySelector(t):null;if(!i)return;let a=String(n||``).trim();i.textContent=a||r,i.classList.toggle(`placeholder`,!a)},t=(e,t)=>{if(!e)return;let n=new Set((Array.isArray(t)?t:[]).map(e=>String(e||``).trim().toLowerCase()).filter(Boolean));e.querySelectorAll(`.check`).forEach(e=>{let t=String(e.querySelector(`span:not(.check-box)`)?.textContent||e.textContent||``).replace(`✓`,``).trim().toLowerCase();if(e.classList.toggle(`checked`,[...n].some(e=>window.wincoProductCatalog?.sameOption(e,t)??e===t)),e.hasAttribute(`data-chain-weight-toggle`)){let t=e.classList.contains(`checked`),n=e.closest(`.card`),r=n?n.querySelector(`[data-length-prefix]`):null,i=n?n.querySelector(`.length-field`):null;r&&r.classList.toggle(`hidden`,!t),i&&i.classList.toggle(`has-prefix`,t)}if(window.wincoProductCatalog?.sameOption(t,`Reach cord`)??t.includes(`reach cord`)){let t=e.nextElementSibling;t&&t.classList.contains(`inline-value`)&&t.classList.toggle(`hidden`,!e.classList.contains(`checked`))}})},n=(e,n)=>{if(!e||!n)return;let r=n.optionState&&typeof n.optionState==`object`&&!Array.isArray(n.optionState)?n.optionState:null;if(r){let n=e.querySelector(`[data-general-option-box]`);t(n,r.general),typeof window.syncLChannelOptionForCard==`function`&&window.syncLChannelOptionForCard(e),t(n,r.general),window.wincoDependencies?.renderChainOptions?.(e,r.chain||[]),t(e.querySelector(`[data-chain-option-section]`),r.chain),t(e.querySelector(`[data-cordless-option-section]`),r.cordless)}let i=e.querySelector(`[data-memo-input]`);i&&(i.value=String(n.memo||``))},r=(e,t)=>{e&&t&&z.restore(e,t)},i=(t,i,a)=>{if(!t||!i)return;t.dataset.restoringQuote=`true`;for(let e of[`option`,`surcharge`,`motor`])delete t.dataset[e+`PriceSelection`],delete t.dataset[`saved`+e[0].toUpperCase()+e.slice(1)+`Amount`];let o=t.querySelector(`.window-head .check`);o&&o.classList.toggle(`checked`,i.included!==!1);let s=Array.from(t.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Location`)?.parentElement?.querySelector(`.field`);if(s){let e=String(i.location||``).trim();s.innerHTML=e?`<span>`+e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)+`</span>`:`<span class="placeholder">Floor</span>`}let c=t.querySelector(`.room-type-value`);if(c){let e=String(i.room||``).trim();c.innerHTML=e?`<span data-room-display>`+e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)+`</span>`:`<span data-room-display class="placeholder">Select Room</span>`}let l=t.querySelector(`[data-sidemark-input]`);l&&(l.value=String(i.sidemark||``));let u=t.querySelectorAll(`.dimension-field`);u[0]&&typeof window.setMmValue==`function`&&window.setMmValue(u[0],Number(i.widthMm||0)),u[1]&&typeof window.setMmValue==`function`&&window.setMmValue(u[1],Number(i.heightMm||0)),r(t,i),e(t,`[data-mount-type-display]`,i.mount,`Select`);let d=Array.from(t.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Group`)?.parentElement?.querySelector(`.field span`);if(d){let e=String(i.group||``).trim();d.textContent=e||`Shade`,d.classList.toggle(`placeholder`,!e)}let f=t.querySelector(`[data-fabric-display]`);if(f){let e=String(i.fabric||``).trim();f.textContent=e||`Fabric`,f.classList.toggle(`placeholder`,!e),e&&(f.dataset.fabricCode=e),i.fabricId&&(f.dataset.fabricId=String(i.fabricId)),i.pricePerSqft!==void 0&&i.pricePerSqft!==null&&(f.dataset.fabricPrice=String(i.pricePerSqft||0))}e(t,`[data-fabric-color-display]`,i.fabricColor,`Color`),e(t,`[data-headrail-display]`,window.wincoDependencies.normalizeHeadrail(i.headrail),`Head rail`);let p=t.querySelector(`[data-headrail-display]`),m=i.headrailMeta&&typeof i.headrailMeta==`object`&&!Array.isArray(i.headrailMeta)?i.headrailMeta:null;p&&m&&(m.id&&(p.dataset.headrailId=String(m.id)),m.code&&(p.dataset.headrailCode=window.wincoDependencies.normalizeHeadrail(m.code)),m.description&&(p.dataset.headrailDescription=String(m.description)),m.pricingType&&(p.dataset.headrailPricingType=String(m.pricingType))),e(t,`[data-bottomrail-display]`,i.bottomrail,`Bottom rail`);let h=t.querySelector(`[data-bottomrail-display]`);h&&i.bottomrailMeta?.id&&(h.dataset.bottomrailId=String(i.bottomrailMeta.id));let g=(e,n)=>{let r=t.querySelector(e),i=r?r.closest(`.col-3`):null,a=i?Array.from(i.querySelectorAll(`.rail-seg.clickable`)).filter(e=>!e.matches(`[data-headrail-display], [data-bottomrail-display]`)):[],o=a[a.length-1];if(!o)return;let s=String(n||``).trim();o.textContent=s||`Color`,o.classList.toggle(`placeholder`,!s)};g(`[data-headrail-display]`,i.headrailColor),g(`[data-bottomrail-display]`,i.bottomrailColor);let _=Array.from(t.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Control Type`)?.parentElement?.querySelector(`.field span`),v=T(i.control,i.group),y=oe(i);_&&(_.textContent=y===`Chain / Manual`&&v!==`CH`?v:y||`Select control type`,_.dataset.controlFamily=y,_.classList.toggle(`placeholder`,!y)),y&&typeof window.renderControlTypeDetails==`function`&&window.renderControlTypeDetails(t,y),n(t,i);let b=Array.from(t.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Ctrl Side`)?.parentElement?.querySelector(`.field span`);if(b){let e=String(i.controlSide||``).trim();b.textContent=e||`L/R`,b.classList.toggle(`placeholder`,!e),delete b.dataset.singleControlSide}z.syncControlSide(t);let x=t.querySelector(`.length-input`);x&&(x.value=i.length??``);let S=t.querySelector(`[data-cordless-type-section] .field span`);if(S){let e=T(i.cordlessType||(N(v)?v:``),i.group);S.textContent=e||`Select Type`,S.classList.toggle(`placeholder`,!e)}let C=t.querySelector(`[data-motor-section] .field span`);if(C){let e=String(i.motorName||``).trim();C.textContent=e||`Select Motor`,C.classList.toggle(`placeholder`,!e),e&&(C.dataset.motorName=e),i.motorCode&&(C.dataset.motorCode=i.motorCode),i.motorPricingId&&(C.dataset.motorPricingId=i.motorPricingId)}t.dataset.channelChargeCategory=i.channelChargeCategory||`option`,window.wincoDuo.restore(t,i),t.dataset.chargeQuantities=JSON.stringify(i.chargeQuantities||{}),window.wincoDependencies?.renderOptions?.(t,!0,i.optionState||null),i.sectionPricing?.version===1?t.dataset.savedSectionPricing=JSON.stringify(i.sectionPricing):delete t.dataset.savedSectionPricing;for(let e of[`option`,`surcharge`,`motor`]){if(e===`option`&&window.wincoDuo.hasUnsupportedDuoChannels(i)){delete t.dataset.savedOptionAmount,delete t.dataset.optionPriceSelection;continue}let n=i.sectionPricing?.version===1?i.sectionPricing.single?.[e]:i[e];t.dataset[`saved`+e[0].toUpperCase()+e.slice(1)+`Amount`]=String(Number.isFinite(Number(n))?Number(n):0),t.dataset[e+`PriceSelection`]=window.pricingSelectionKey(t,e)}delete t.dataset.restoringQuote,typeof window.updateWindowTitleMeta==`function`&&window.updateWindowTitleMeta(a+1,!1)};return(e,{deferRefresh:t=!1}={})=>{let{quote:n,windows:r,accessories:a}=e,o=n.raw_payload&&typeof n.raw_payload==`object`&&!Array.isArray(n.raw_payload)?n.raw_payload:{},s=o.information&&typeof o.information==`object`&&!Array.isArray(o.information)?o.information:{},c=o.summary&&typeof o.summary==`object`&&!Array.isArray(o.summary)?o.summary:{},l=Array.isArray(o.windows)?o.windows:[],u=(r||[]).length?(r||[]).map((e,t)=>{let n=e.raw_window&&typeof e.raw_window==`object`&&!Array.isArray(e.raw_window)?e.raw_window:{};return{...l[t]||{},...n,config:n.config??l[t]?.config??`Single`,splits:n.splits??l[t]?.splits??[],sectionPricing:n.sectionPricing??l[t]?.sectionPricing,no:n.no??e.window_no??t+1,included:n.included??e.included??!0,group:n.group??e.product_group??``,location:n.location??e.location??``,room:n.room??e.room??``,sidemark:n.sidemark??e.sidemark??``,fabric:n.fabric??e.fabric??``,fabricColor:n.fabricColor??e.fabric_color??``,mount:n.mount??e.mount??``,headrail:n.headrail??e.headrail??``,headrailColor:n.headrailColor??e.headrail_color??``,bottomrail:n.bottomrail??e.bottomrail??``,bottomrailColor:n.bottomrailColor??e.bottomrail_color??``,control:n.control??e.control_type??``,controlSide:n.controlSide??e.control_side??``,length:n.length??e.chain_length??``,cordlessType:n.cordlessType??e.cordless_type??``,motorName:n.motorName??e.motor??``,widthMm:n.widthMm??e.width_mm??0,heightMm:n.heightMm??e.height_mm??0,sqft:n.sqft??e.sqft??0,pricePerSqft:n.pricePerSqft??e.price_per_sqft??0,bld:n.bld??e.bld??0,surcharge:n.surcharge??e.surcharge??0,option:n.option??e.option_total??0,motor:n.motor??e.motor_total??0,total:n.total??e.total??0}}):l,d=o.accessories&&typeof o.accessories==`object`&&!Array.isArray(o.accessories)?o.accessories:{},f=(a||[]).length?(a||[]).map((e,t)=>{let n=e.raw_accessory&&typeof e.raw_accessory==`object`&&!Array.isArray(e.raw_accessory)?e.raw_accessory:{};return{...n,no:n.no??e.accessory_no??t+1,item:n.item??e.item??``,qty:n.qty??e.qty??0,price:n.price??e.price??0,subtotal:n.subtotal??e.subtotal??0}}):Array.isArray(d.rows)?d.rows:[];typeof window.setMeasureQuoteNumberDisplay==`function`&&window.setMeasureQuoteNumberDisplay(o.quoteNumber||n.quote_number||``);let p=document.querySelector(`.meta-right span`);p&&(p.textContent=String(o.quoteDate||n.quote_date||``));let m=String(o.unit||n.unit||`mm`).trim();m&&typeof window.selectUnit==`function`&&window.selectUnit(m),De(document,n,window);let h=document.querySelector(`[data-installation-date]`);h&&(h.value=ne(s.installationDate));let g=document.querySelector(`[data-installation-time]`);g&&(g.value=ie(s.installationTime)),ze(document);let _=Array.from(document.querySelectorAll(`.card`)).filter(e=>e.querySelector(`.window-head`));window.measureWindowHistory?.clear(),_.forEach(e=>e.remove());let v=document.querySelector(`.actions button`),y=u.length;for(let e=0;e<y;e+=1)typeof window.addWindowRow==`function`&&window.addWindowRow(v,{deferRefresh:!0});let b=Array.from(document.querySelectorAll(`.card`)).filter(e=>e.querySelector(`.window-head`));u.forEach((e,t)=>{i(b[t],e,t)}),typeof window.selectUnit==`function`&&window.selectUnit(String(document.getElementById(`unitLabel`)?.textContent||`ft+inch`).trim());let x={install:c.install??n.install_fee??0,extraFee:c.extraFee??n.extra_fee??0,bldSurDiscountPercent:c.bldSurDiscountPercent??n.bld_sur_discount_percent??0,optDiscountPercent:c.optDiscountPercent??n.opt_discount_percent??0,motDiscountPercent:c.motDiscountPercent??n.mot_discount_percent??0};document.querySelectorAll(`[data-review-calc-key]`).forEach(e=>{e.value=String(x[e.dataset.reviewCalcKey]??0)});let S=document.querySelector(`.accessories`);if(S){let e=S.querySelector(`.accessories-items`);e&&(e.innerHTML=``);let t=S.querySelector(`.accessories-head .btn`);f.forEach(e=>{if(t&&typeof window.addAccessoryRow==`function`){window.addAccessoryRow(t);let n=S.querySelectorAll(`.accessory-row`),r=n[n.length-1];if(!r)return;let i=r.querySelector(`[data-accessory-item]`),a=r.querySelector(`[data-accessory-qty]`),o=r.querySelector(`[data-accessory-price]`),s=r.querySelector(`[data-accessory-price-display]`),c=String(e.item||``).trim(),l=Number(e.price||0);i&&(i.textContent=c||`Accessory item`,i.classList.toggle(`placeholder`,!c),c&&(i.dataset.accessoryValue=c),e.pricingId&&(i.dataset.accessoryPricingId=String(e.pricingId))),a&&(a.value=String(e.qty??0)),o&&(o.value=l.toFixed(2)),s&&(s.textContent=l.toFixed(2)),r.dataset.accessoryPrice=l.toFixed(2)}});let n=document.querySelector(`[data-accessory-discount-input]`);n&&(n.value=String(d.discountPercent===void 0?20:d.discountPercent??0)),typeof window.updateAccessoriesEmptyState==`function`&&window.updateAccessoriesEmptyState(),typeof window.updateAccessoriesTotals==`function`&&window.updateAccessoriesTotals(S)}t||_t(window)}}function Nt(e,t){let n=e.ownerDocument,r=e.querySelector(`.page`),i=n.createElement(`div`);i.className=`measure-restore-status`,i.dataset.measureRestoreStatus=``,i.setAttribute(`aria-hidden`,`true`),i.textContent=t;let a=n.createElement(`span`);a.className=`measure-restore-announcement`,a.setAttribute(`role`,`status`),a.setAttribute(`aria-live`,`polite`),a.textContent=t,e.prepend(a),e.setAttribute(`aria-busy`,`true`);let o=r?.querySelector(`.meta`);return o?o.after(i):r?.prepend(i),()=>{i.remove(),a.remove(),e.removeAttribute(`aria-busy`)}}function Pt(e){return new Promise(t=>{if(typeof e.requestAnimationFrame!=`function`){e.setTimeout(t,0);return}e.requestAnimationFrame(()=>e.requestAnimationFrame(t))})}var K=(e,t,n,r=``)=>`<div class="information-field"><label class="field-label" for="${e}-information-${t}">${n}</label><div class="field"><input id="${e}-information-${t}" class="info-input" data-${e}-info="${t}" type="${t===`email`?`email`:`text`}" placeholder="${n}" ${r} /></div></div>`,Ft=(e,t,n)=>`<div class="information-comments"><label class="field-label" for="${e}-information-${t}">${n}</label><textarea id="${e}-information-${t}" class="comments-box info-comments-input" data-${e}-info="${t}"></textarea></div>`,It=`
<div class="card measure-information-card" id="clientInformationCard">
 <div class="card-header info-card-toggle" onclick="toggleInformationCard('clientInformationCard')"><div class="card-title"><div class="dot"></div><span style="font-size:16px;font-weight:600">Client Information</span><span class="client-deleted-badge" data-client-deleted-badge hidden>Deleted client</span></div><div class="info-toggle-icon" data-information-toggle>▴</div></div>
 <div class="information-layout info-card-body-hidden">
  <div class="information-fields">
   <div class="information-field col-4" style="position:relative"><div class="field-label">Client</div><button type="button" class="field information-client-choice" onclick="toggleClientMenu(this)" aria-label="Choose client" aria-expanded="false"><span class="placeholder" data-client-picker>Select...</span></button><div class="client-menu hidden"><button type="button" class="client-option information-client-option" onclick="selectNewClientOption(this,event)">New client</button><button type="button" class="client-option information-client-option" onclick="openMeasureClientSelectPopup(this,event)">Select client</button></div></div>
   ${K(`client`,`company`,`Company`)}${K(`client`,`name`,`Name`)}
   ${K(`client`,`phone`,`Phone`)}${K(`client`,`address`,`Address`)}${K(`client`,`email`,`E-mail`)}
  </div>${Ft(`client`,`note`,`Note`)}
 </div><div class="information-status" data-client-information-status hidden role="status"></div>
</div>
<div class="card measure-information-card" id="informationCard">
 <div class="card-header info-card-toggle" onclick="toggleInformationCard('informationCard')">
  <div class="card-title"><div class="dot"></div><span style="font-size:16px;font-weight:600">Shipping Information</span><span class="shipping-tag">#<span class="placeholder" data-measure-tag-display>Tag</span><span data-measure-label-display hidden></span></span></div>
  <div class="information-header-actions"><button class="btn information-copy" type="button" disabled onclick="event.stopPropagation();copyClientInformationToShipping()">Use Client Information</button><div class="info-toggle-icon" id="infoToggleIcon" data-information-toggle>▴</div></div>
 </div>
 <div class="information-layout info-card-body-hidden"><div class="information-fields information-shipping-fields">
  ${K(`shipping`,`label`,`Sidemark`)}
  <div class="information-field" style="position:relative"><div class="field-label">Type</div><div class="field" onclick="toggleTypeMenu(this)"><span class="placeholder" data-shipping-type>Type</span></div><div class="client-menu hidden"><div class="client-option" onclick="selectType(this,'House')">House</div><div class="client-option" onclick="selectType(this,'Condo')">Condo</div><div class="client-option" onclick="selectType(this,'Townhouse')">Townhouse</div><div class="client-option" onclick="selectType(this,'Commercial')">Commercial</div><div class="client-option" onclick="selectType(this,'custom')">Custom</div></div></div>
  ${K(`shipping`,`company`,`Company`)}${K(`shipping`,`name`,`Name`,`data-measure-name-input`)}
  ${K(`shipping`,`phone`,`Phone`)}${K(`shipping`,`address`,`Address`,`data-measure-address-input`)}${K(`shipping`,`email`,`E-mail`)}
 </div>${Ft(`shipping`,`comments`,`General Comments`)}</div>
</div>`,Lt=(e,t)=>t.map(([t,n])=>`<div><span class="review-info-label">${n}</span><span data-review-${e}-${t} class="review-info-value">—</span></div>`).join(``),Rt=`<div class="app">
<div class="top-nav">
<div class="top-nav-left">
<div data-account-home-link style="font-weight:600; cursor:pointer">Charles / Winco</div>
<div>|</div>
<div class="nav-item current">Measure</div>
<div class="nav-item">Quotes</div>
<div class="nav-item">Orders</div>
<div class="nav-item">Clients</div>
<div class="nav-item">Resources</div>
<div class="nav-item">Admin</div>
</div>
<div class="top-nav-actions">
<div class="pill" data-mode-target="newQuote" onclick="handleMeasureNewQuoteClick(event)" style="cursor:pointer;">New Quote</div>
<button class="btn" data-mode-target="quoteView" type="button">Edit</button>
<button class="btn" data-mode-target="common" type="button">Save</button>
</div>
</div>
<div class="page">
<div class="meta">
<div>
<div style="font-size:16px;font-weight:600"># Q260318-01</div>
</div>
<div class="meta-right">
<span data-measure-current-datetime="">03/18/2026 14:30</span>
<div class="dropdown" id="unitDropdown">
<span id="unitLabel">ft+inch</span><span>▾</span>
</div>
<div class="client-menu hidden" id="unitMenu" style="right:0; top:46px; margin-top:0;">
<div class="client-option" data-unit-option="ft+inch">ft+inch</div>
<div class="client-option" data-unit-option="inch">inch</div>
<div class="client-option" data-unit-option="mm">mm</div>
</div>
</div>
</div>
${It}
<div class="measure-client-popup hidden" data-measure-client-popup="">
  <div class="measure-client-popup-backdrop" onclick="closeMeasureClientSelectPopup()"></div>
  <div class="measure-client-popup-panel">
    <div class="measure-client-popup-header">
      <div class="measure-client-popup-title">Clients</div>
      <div class="measure-client-popup-search"><input type="text" placeholder="Search" data-measure-client-search="" oninput="renderMeasureClientPopupRows(this.value)" /></div>
      <button class="measure-client-popup-close" type="button" onclick="closeMeasureClientSelectPopup()">×</button>
    </div>
    <div class="measure-client-popup-table">
      <div class="measure-client-popup-head"><div>Account</div><div>Client</div><div>Company</div><div>Phone</div></div>
      <div class="measure-client-popup-body" data-measure-client-popup-body=""><div class="measure-client-popup-empty">Loading clients...</div></div>
    </div>
  </div>
</div>
<div class="card">
<div class="window-head">
<div class="window-title"><span data-window-label="1">Window #1</span><span data-window-meta="1"></span></div>
<button class="check checked" onclick="toggleCheck(this)" type="button"><span class="check-box">✓</span><span>Include</span></button>
</div>
<div class="grid12">
<div class="col-1" style="position:relative;">
<div class="field-label">Location</div>
<div class="field" onclick="toggleLocationMenu(this)">
<span class="placeholder">Floor</span>
</div>
<div class="client-menu hidden">
<div class="client-option" onclick="selectLocation(this,'B1')">B1</div>
<div class="client-option" onclick="selectLocation(this,'1F')">1F</div>
<div class="client-option" onclick="selectLocation(this,'2F')">2F</div>
<div class="client-option" onclick="selectLocation(this,'3F')">3F</div>
<div class="client-option" onclick="selectLocation(this,'custom')">Custom</div>
</div>
</div>
<div class="col-3" style="position:relative;">
<div class="field-label">\u00a0</div>
<div class="room-type-combo" onclick="toggleRoomMenu(this)">
<div class="room-type-value">
<span class="placeholder" data-room-display="">Select Room</span>
</div>
</div>
<div class="client-menu hidden">
<div class="client-option" onclick="selectRoom(this,'custom')">Custom</div>
<div class="client-option" onclick="selectRoom(this,'Foyer')">Foyer</div>
<div class="client-option" onclick="selectRoom(this,'Living')">Living</div>
<div class="client-option" onclick="selectRoom(this,'Dining')">Dining</div>
<div class="client-option" onclick="selectRoom(this,'Kitchen')">Kitchen</div>
<div class="client-option" onclick="selectRoom(this,'Master')">Master</div>
<div class="client-option" onclick="selectRoom(this,'Room')">Room</div>
<div class="client-option" onclick="selectRoom(this,'Washroom')">Washroom</div>
<div class="client-option" onclick="selectRoom(this,'Bonus room')">Bonus room</div>
<div class="client-option" onclick="selectRoom(this,'Den')">Den</div>
<div class="client-option" onclick="selectRoom(this,'Flex room')">Flex room</div>
<div class="client-option" onclick="selectRoom(this,'Office')">Office</div>
<div class="client-option" onclick="selectRoom(this,'Pantry')">Pantry</div>
<div class="client-option" onclick="selectRoom(this,'Deck Door')">Deck Door</div>
<div class="client-option" onclick="selectRoom(this,'Door window')">Door window</div>
<div class="client-option" onclick="selectRoom(this,'Stair')">Stair</div>
<div class="client-option" onclick="selectRoom(this,'Laundry')">Laundry</div>
</div>
</div>
<div class="col-3"><div class="field-label">\u00a0</div><div class="field"><input data-sidemark-input="1" oninput="updateWindowTitleMeta(1)" placeholder="Sidemark" type="text"/></div></div>
<div class="col-2"><div class="field-label">W (mm)</div><div class="dimension-field" data-dimension="w" data-mm-value=""></div></div>
<div class="col-2"><div class="field-label">H (mm)</div><div class="dimension-field" data-dimension="h" data-mm-value=""></div></div>
<div class="col-1" style="position:relative;">
<div class="field-label">Mount</div>
<div class="mount-type-combo" data-mount-type-wrapper="" onclick="toggleMountTypeMenu(this)">
<div class="mount-type-value" data-mount-type-value="">
<span class="placeholder" data-mount-type-display="">Select</span>
</div>
</div>
<div class="client-menu menu-right-align hidden">
<div class="client-option" onclick="selectMountType(this,'IN')">IN\u00a0\u00a0\u00a0Inside Mount</div>
<div class="client-option" onclick="selectMountType(this,'FF')">FF\u00a0\u00a0\u00a0Frame Mount</div>
<div class="client-option" onclick="selectMountType(this,'FW')">FW\u00a0\u00a0\u00a0Wall Mount</div>
<div class="client-option" onclick="selectMountType(this,'FD')">FD\u00a0\u00a0\u00a0Door Mount</div>
<div class="client-option" onclick="selectMountType(this,'custom')">Custom</div>
</div>
</div>
<div class="col-12 split-row hidden"><div data-split-fields=""></div></div>
<div class="col-1" style="position:relative;">
<div class="field-label">Group</div>
<div class="field" onclick="toggleGroupMenu(this)">
<span class="placeholder">Shade</span>
</div>
<div class="client-menu hidden">
<div class="client-option" onclick="selectGroup(this,'Dual')">Dual Shade</div>
<div class="client-option" onclick="selectGroup(this,'Roller')">Roller Shade</div>
</div>
</div>
<div class="col-4" style="position:relative;">
<div class="field-label">Product</div>
<div class="product-combo" style="grid-template-columns:3fr 1fr;">
<div class="product-seg clickable placeholder" data-fabric-display="" onclick="toggleFabricMenu(this, event)">Fabric</div>
<div class="product-seg clickable placeholder" data-fabric-color-display="" onclick="toggleFabricColorMenu(this, event)">Color</div>
</div>
<div class="client-menu hidden" data-fabric-menu=""></div>
<div class="client-menu hidden" data-fabric-color-menu=""></div>
</div>
<div class="col-3" style="position:relative;">
<div class="field-label">Model / System</div>
<div class="rail-combo">
<div class="rail-seg clickable placeholder" data-headrail-display="" onclick="toggleHeadrailMenu(this, event)">Head rail</div>
<div class="rail-seg clickable placeholder" onclick="toggleRailColorMenu(this, event)">Color</div>
</div>
<div class="client-menu hidden" data-headrail-menu=""></div>
<div class="client-menu hidden menu-right-align" data-rail-color-menu=""></div>
</div>
<div class="col-3" style="position:relative;">
<div class="field-label">\u00a0</div>
<div class="rail-combo">
<div class="rail-seg clickable placeholder" data-bottomrail-display="" onclick="toggleBottomrailMenu(this, event)">Bottom rail</div>
<div class="rail-seg clickable placeholder" onclick="toggleRailColorMenu(this, event)">Color</div>
</div>
<div class="client-menu hidden" data-bottomrail-menu=""></div>
<div class="client-menu hidden menu-right-align" data-rail-color-menu=""></div>
</div>
<div class="col-1" style="position:relative;">
<div class="field-label">Config</div>
<button type="button" class="field configuration-trigger" onclick="toggleConfigMenu(this)" aria-label="Window configuration: Single">
<span>Single</span>
</button>
</div>
<div class="col-3" style="position:relative;">
<div class="field-label">Control Type</div>
<div class="field" onclick="toggleControlTypeMenu(this)">
<span class="placeholder">Select control type</span>
</div>
<div class="client-menu hidden" data-control-type-menu=""></div>
</div>
<div class="col-4 hidden" style="position:relative;" data-motor-section="">
<div class="field-label">Motor</div>
<div class="field" onclick="toggleMotorMenu(this)" style="justify-content:space-between;">
<span class="placeholder">Select Motor</span><span class="placeholder">▾</span>
</div>
<div class="client-menu hidden" data-motor-menu=""></div>
</div>
<div class="col-1" style="position:relative;" data-ctrl-side-section="">
<div class="field-label">Ctrl Side</div>
<div class="field" onclick="toggleCtrlSideMenu(this)">
<span class="placeholder">L/R</span>
</div>
<div class="client-menu hidden">
<div class="client-option" onclick="selectCtrlSide(this,'L')">L</div>
<div class="client-option" onclick="selectCtrlSide(this,'R')">R</div>
</div>
</div>
<div class="col-3 hidden" style="position:relative;" data-cordless-type-section="">
<div class="field-label">Cordless Type</div>
<div class="field" onclick="toggleCordlessTypeMenu(this)" style="justify-content:space-between;">
<span class="placeholder">Select Type</span><span class="placeholder">▾</span>
</div>
<div class="client-menu hidden">
<div class="client-option" onclick="selectCordlessType(this,'CLF')">CLF</div>
<div class="client-option" onclick="selectCordlessType(this,'CLS')">CLS</div>
<div class="client-option" onclick="selectCordlessType(this,'CLO')">CLO</div>
</div>
</div>
<div class="col-6 hidden" data-cordless-option-section="">
<div class="field-label">Cordless Option</div>
<div class="option-box">
<button class="check" type="button" onclick="toggleCheck(this)"><span class="check-box">✓</span><span>Pull tap</span></button>
<button class="check" type="button" onclick="toggleCheck(this)"><span class="check-box">✓</span><span>Hold down bracket</span></button>
<button class="check" type="button" onclick="toggleCheck(this)"><span class="check-box">✓</span><span>Reach cord</span></button><span class="inline-value hidden">12&quot;</span>
</div>
</div>
<div aria-hidden="true" class="col-8" data-control-filler=""></div>
<div class="col-1 hidden" data-chain-length-section="">
<div class="field-label">Length</div>
<div class="length-field">
<div class="length-prefix hidden" data-length-prefix="">N</div>
<input class="length-input" type="number" />
</div>
</div>
<div class="col-7 hidden" data-chain-option-section="">
<div class="field-label">Chain Control Option</div>
<div class="option-box">
<button class="check" type="button" onclick="toggleCheck(this)" data-chain-weight-toggle=""><span class="check-box">✓</span><span>No Chain Weight</span></button>
<button class="check" type="button" onclick="toggleCheck(this)"><span class="check-box">✓</span><span>Chain Clip</span></button>
<button class="check" type="button" onclick="toggleCheck(this)"><span class="check-box">✓</span><span>Chain Guard</span></button>
<button class="check" type="button" onclick="toggleCheck(this)"><span class="check-box">✓</span><span>Safety Holder</span></button>
</div>
</div>
<div class="col-6"><div class="field-label">Option</div><div class="option-box" data-general-option-box=""></div></div>
<div class="col-6"><div class="field-label">Memo</div><div class="option-box" data-memo-box=""><input data-memo-input type="text" style="width:100%;min-width:0;border:none;outline:none;background:transparent;font:inherit;color:inherit;" /></div></div>
</div>
<div class="window-footer">
<div class="buttons">
<button class="btn" onclick="duplicateWindowCard(this)" type="button">Duplicate</button>
<button class="btn btn-danger" onclick="deleteWindowCard(this)" type="button">Delete</button>
</div>
<div class="win-summary">
<div class="win-summary-top">
<span>BLD $0</span>
<span>SUR $0</span>
<span>OPT $0</span>
<span>MOT $0</span>
</div>
<div class="win-summary-bottom">
<span data-window-sqft="1">Sqft 0</span>
<span class="win-summary-total">Total $0</span>
</div>
</div>
</div>
</div>
<div class="actions">
<button class="btn" onclick="addWindowRow(this)" type="button">Add Row</button>
<button class="btn" type="button" data-measure-bulk-edit>Bulk Edit</button>
</div>
<div class="card">
${`<div data-review-client-info class="measure-review-information measure-review-contacts">
 <section class="measure-review-contact"><h3>Client Information <span class="client-deleted-badge" data-review-client-deleted hidden>Deleted client</span></h3><div class="measure-review-contact-fields">${Lt(`invoice`,[[`client`,`Client`],[`company`,`Company`],[`name`,`Name`],[`phone`,`Phone`],[`address`,`Address`],[`email`,`E-mail`]])}</div></section>
 <section class="measure-review-contact"><h3>Shipping Information</h3><div class="measure-review-contact-fields">${Lt(`client`,[[`type`,`Type`],[`company`,`Company`],[`name`,`Name`],[`phone`,`Phone`],[`address`,`Address`],[`email`,`E-mail`]])}</div><div class="measure-review-contact-comments" data-review-comments-row><span class="review-info-label">General Comments</span><span data-review-client-comments id="measure-review-comments" class="review-info-value record-comment-text is-collapsed"></span><button data-review-comments-toggle type="button" class="record-comment-toggle" aria-controls="measure-review-comments" aria-expanded="false" hidden>Show more</button></div></section>
</div>`}
<div class="measure-review-project-row">
<div class="measure-review-project"><strong>Project / Tag :</strong> <span data-review-client-tag>—</span></div>
<div class="measure-review-controls">
<div class="review-unit-picker">${Fe(`measure-review-unit-menu`,!0)}</div>
<button class="check checked" onclick="toggleCheck(this)" type="button"><span class="check-box">✓</span><span>Show excluded items</span></button>
</div>
</div>
<div class="review-table-wrap">
<table>
<thead>
<tr>
<th></th><th>No.</th><th>Loc</th><th>Fab</th><th>MT</th><th>HW</th><th>BT</th><th>Ctrl</th><th>L/R</th><th>Len</th><th>W</th><th>H</th><th>SF</th><th>$/SF</th><th>BLD</th><th>SUR</th><th>OPT</th><th>MOT</th><th>Total</th>
</tr>
</thead>
<tbody style="font-size:12px">
<tr><td><button class="check box-only" onclick="toggleCheck(this)" type="button"><span class="check-box">✓</span></button></td><td>1</td><td>1F Living - 1L</td><td>PUL 600</td><td>IN</td><td>SL01</td><td>OP01</td><td>CH</td><td>R</td><td>1000</td><td>1460</td><td>1460</td><td>23</td><td>$23.80</td><td>$547.40</td><td>$47.40</td><td>-</td><td style="font-weight:600;color:#0f172a">$594.40</td></tr>
<tr><td><button class="check box-only" onclick="toggleCheck(this)" type="button"><span class="check-box">✓</span></button></td><td>2</td><td>1F Living - 2R</td><td>PUL 600</td><td>IN</td><td>SL01</td><td>OP01</td><td>CH</td><td>R</td><td>1000</td><td>1460</td><td>1460</td><td>23</td><td>$23.80</td><td>$547.40</td><td>$47.40</td><td>-</td><td style="font-weight:600;color:#0f172a">$594.40</td></tr>
<tr><td><button class="check box-only" onclick="toggleCheck(this)" type="button"><span class="check-box">✓</span></button></td><td>3</td><td>1F Dining</td><td>PUL 600</td><td>IN</td><td>SL01</td><td>OP01</td><td>CH</td><td>R</td><td>1000</td><td>1460</td><td>1460</td><td>23</td><td>$23.80</td><td>$547.40</td><td>$50.40</td><td>$570.00</td><td style="font-weight:600;color:#0f172a">$1,167.80</td></tr>
</tbody>
</table>
</div>
<div class="tfoot-note">Total Sqft : 69</div>
<div class="review-bottom record-bottom review-presentation">
<section class="record-panel record-fees-panel"><h2>Fees &amp; discounts</h2>
<div class="subgrid3">
<div><div class="field-label">BLD / SUR Disc. %</div><div class="field"><input class="review-number-input" data-review-calc-input="" data-review-calc-key="bldSurDiscountPercent" aria-label="BLD / SUR discount percentage" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" max="100" step="0.01" value="0" /></div></div>
<div><div class="field-label">OPT Disc. %</div><div class="field"><input class="review-number-input" data-review-calc-input="" data-review-calc-key="optDiscountPercent" aria-label="Option discount percentage" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" max="100" step="0.01" value="0" /></div></div>
<div><div class="field-label">MOT Disc. %</div><div class="field"><input class="review-number-input" data-review-calc-input="" data-review-calc-key="motDiscountPercent" aria-label="Motor discount percentage" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" max="100" step="0.01" value="0" /></div></div>
<div><div class="field-label" title="Accessory discount">ACC Disc. %</div><div class="field"><input data-accessory-discount-input="" aria-label="Accessory discount percentage" max="100" min="0" step="0.01" type="number" value="0" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" /></div></div>
<div><div class="field-label">Install</div><div class="field"><input class="review-number-input" data-review-calc-input="" data-review-calc-key="install" aria-label="Install fee" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" step="0.01" value="0" /></div></div>
<div><div class="field-label">Extra Fee</div><div class="field"><input class="review-number-input" data-review-calc-input="" data-review-calc-key="extraFee" aria-label="Extra fee" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" step="0.01" value="0" /></div></div>
</div>
</section>
<div class="record-supplement">
<div class="accessories record-panel">
<div class="accessories-head">
<h2>Accessories</h2>
<button class="btn" onclick="addAccessoryRow(this)" type="button">Add row</button>
</div>
<div class="accessories-list">
<div class="accessories-items"></div>
<div class="accessories-empty">No accessories.</div>
</div>
<div class="accessory-tools"><span>Total</span><strong data-accessories-preview-amount="">$0</strong></div>
</div>
</div>
<div>
<div class="summary-card record-panel record-totals">${_e()}</div>
<div class="installation-date-row"><input data-installation-date type="hidden" /><input data-installation-time type="hidden" /><button type="button" class="installation-trigger" data-installation-trigger aria-label="Choose installation date and time" aria-haspopup="dialog" aria-expanded="false"><span id="measure-installation-label">Installation Date</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg></button><span class="installation-value" data-installation-value aria-live="polite" hidden><span data-installation-day-label></span><span data-installation-clock-label hidden></span></span></div>
</div>
</div>
</div>
</div>
</div>`,zt=`
    var measurePageLifetime = window.measurePageLifetime;
    function formatMeasureCurrentDateTime(dateValue){
      const date = dateValue instanceof Date ? dateValue : new Date();
      const pad = function(value){ return String(value).padStart(2, '0'); };

      return (
        pad(date.getMonth() + 1) + '/' +
        pad(date.getDate()) + '/' +
        date.getFullYear() + ' ' +
        pad(date.getHours()) + ':' +
        pad(date.getMinutes())
      );
    }

    function updateMeasureCurrentDateTime(){
      const dateEl =
        document.querySelector('[data-measure-current-datetime]') ||
        document.querySelector('.meta-right > span:first-child');

      if(!dateEl) return '';

      if(!dateEl.hasAttribute('data-measure-current-datetime')){
        dateEl.setAttribute('data-measure-current-datetime', '');
      }

      const nextValue = formatMeasureCurrentDateTime(new Date());
      dateEl.textContent = nextValue;
      return nextValue;
    }

    window.updateMeasureCurrentDateTime = updateMeasureCurrentDateTime;

    window.forceMeasureTagRefresh = function(){
      const tagValue = window.wincoRefreshMeasureTag(document);
      window.currentMeasureTagValue = tagValue;
      return tagValue;
    };

    if(window.measureTagForceRefreshHandler){
      document.removeEventListener('input', window.measureTagForceRefreshHandler, true);
      document.removeEventListener('change', window.measureTagForceRefreshHandler, true);
      document.removeEventListener('keyup', window.measureTagForceRefreshHandler, true);
      document.removeEventListener('blur', window.measureTagForceRefreshHandler, true);
    }

    window.measureTagForceRefreshHandler = function(event){
      const target = event && event.target ? event.target : null;
      if(!target || !target.matches) return;
      if(target.matches('[data-measure-name-input], [data-measure-address-input], [data-shipping-info="label"]')){
        window.forceMeasureTagRefresh();
      }
    };

    measurePageLifetime.listen(document,'input', window.measureTagForceRefreshHandler, true);
    measurePageLifetime.listen(document,'change', window.measureTagForceRefreshHandler, true);
    measurePageLifetime.listen(document,'keyup', window.measureTagForceRefreshHandler, true);
    measurePageLifetime.listen(document,'blur', window.measureTagForceRefreshHandler, true);

    function refreshReviewFromMemo(event){
      const target = event && event.target;
      if(target && target.matches && target.matches('[data-memo-input]') && target.closest('.measure-page .card')){
        renderReviewTableRows();
      }
    }
    measurePageLifetime.listen(document,'input', refreshReviewFromMemo, true);
    measurePageLifetime.listen(document,'change', refreshReviewFromMemo, true);

    measurePageLifetime.listen(document,'input', function(event){
      const target = event && event.target ? event.target : null;
      if(target && target.closest && target.closest('.measure-information-card') && target.matches('.info-input, .info-comments-input')){
        refreshReviewClientInfo();
      }
    }, true);

    measurePageLifetime.listen(document,'change', function(event){
      const target = event && event.target ? event.target : null;
      if(target && target.closest && target.closest('.measure-information-card') && target.matches('.info-input, .info-comments-input')){
        refreshReviewClientInfo();
      }
    }, true);

    function toggleCheck(el){
      if(el.disabled || !window.wincoDependencies.optionToggleAllowed(el))return;
      el.classList.toggle('checked');
      const label = getCheckButtonLabel(el).trim();

      const optionContainer = el.closest(
        '[data-general-option-box], [data-chain-option-section], [data-cordless-option-section]'
      );
      const optionCard = optionContainer ? optionContainer.closest('.card') : null;
      if(optionCard && optionCard.dataset.savedOptionAmount !== undefined){
        delete optionCard.dataset.savedOptionAmount;
      }

      if(window.wincoProductCatalog?.sameOption(label,'Reach cord')??label.includes('Reach cord')){
        const valueEl = el.nextElementSibling;
        if(valueEl && valueEl.classList.contains('inline-value')){
          valueEl.classList.toggle('hidden', !el.classList.contains('checked'));
        }
      }

      if(el.hasAttribute('data-chain-weight-toggle')){
        const card = el.closest('.card');
        const prefix = card ? card.querySelector('[data-length-prefix]') : null;
        const lengthField = card ? card.querySelector('.length-field') : null;
        if(prefix){
          const isOn = el.classList.contains('checked');
          prefix.classList.toggle('hidden', !isOn);
          if(lengthField){
            lengthField.classList.toggle('has-prefix', isOn);
          }
        }
      }

      if(normalizeMeasureName(label) === 'show excluded items'){
        if(typeof renderReviewTableRows === 'function'){
          renderReviewTableRows();
        }
        return;
      }

      const card = el.closest('.card');
      if(card && card.querySelector('.window-head')){
        if(el === card.querySelector('.window-head .check') && !el.classList.contains('checked')){
          showReviewExcludedItems();
        }
        try {
          syncLChannelOptionForCard(card);
          const dims = card.querySelectorAll('.dimension-field');
          const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
          updateWindowCardPricing(card, sqft);
        } catch (err) {
          console.error('measure option pricing update error', err);
        }
      }
    }

    function toggleClientMenu(el){
      const wrapper = el.parentElement;
      const menu = wrapper.querySelector('.client-menu');
      if(menu){
        menu.classList.toggle('hidden');
        el.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
      }
    }

    function escapeMeasureClientText(value){
      return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function getMeasureClientFieldValue(client, keys){
      if(!client || typeof client !== 'object') return '';
      for(const key of keys){
        const value = client[key];
        if(value !== undefined && value !== null && String(value).trim()) return String(value).trim();
      }
      return '';
    }

    function normalizeMeasureClientRow(row){ return window.wincoNormalizeClient(row); }

    function ensureMeasureClientSelectPopup(){
      const root = document.querySelector('.measure-page');
      if(!root) return null;

      let popup = root.querySelector('[data-measure-client-popup]');
      if(!popup){
        popup = document.createElement('div');
        popup.className = 'measure-client-popup hidden';
        popup.setAttribute('data-measure-client-popup', '');
        popup.innerHTML = '<div class="measure-client-popup-backdrop" onclick="closeMeasureClientSelectPopup()"></div><div class="measure-client-popup-panel"><div class="measure-client-popup-header"><div class="measure-client-popup-title">Clients</div><div class="measure-client-popup-search"><input type="text" placeholder="Search" data-measure-client-search oninput="renderMeasureClientPopupRows(this.value)" /></div><button class="measure-client-popup-close" type="button" onclick="closeMeasureClientSelectPopup()">×</button></div><div class="measure-client-popup-table"><div class="measure-client-popup-head"><div>Account</div><div>Client</div><div>Company</div><div>Phone</div></div><div class="measure-client-popup-body" data-measure-client-popup-body><div class="measure-client-popup-empty">Loading clients...</div></div></div></div>';
        const panel=popup.querySelector('.measure-client-popup-panel');
        panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Select client');
        popup.querySelector('[data-measure-client-search]').setAttribute('aria-label','Search clients');
        popup.querySelector('.measure-client-popup-close').setAttribute('aria-label','Close client selection');
        const informationCard = document.getElementById('informationCard');
        if(informationCard && informationCard.parentNode){
          informationCard.parentNode.insertBefore(popup, informationCard.nextSibling);
        } else {
          root.appendChild(popup);
        }
      }

      const clientLabel = Array.from(root.querySelectorAll('.field-label')).find((label) => label.textContent.trim() === 'Client');
      const clientWrapper = clientLabel ? clientLabel.closest('.col-4') : null;
      if(clientWrapper){
        const options = Array.from(clientWrapper.querySelectorAll('.client-menu .client-option'));
        options.forEach((option) => {
          const text = String(option.textContent || '').trim().toLowerCase();
          if(text === 'new client'){
            option.onclick = function(event){ selectNewClientOption(option, event); };
          }
          if(text === 'select client'){
            option.onclick = function(event){ openMeasureClientSelectPopup(option, event); };
          }
        });
      }

      return popup;
    }

    function selectNewClientOption(el, event){
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      const wrapper = el ? el.closest('.col-4') : null;
      const menu = wrapper ? wrapper.querySelector('.client-menu') : null;
      const fieldText = wrapper ? wrapper.querySelector('.field span') : null;

      if(fieldText){
        fieldText.textContent = 'New client';
        fieldText.title = 'New client';
        fieldText.classList.remove('placeholder');
        delete fieldText.dataset.clientId;
        delete fieldText.dataset.clientAccount;
        delete fieldText.dataset.clientCompany;
      }

      if(menu) menu.classList.add('hidden');
      window.wincoMeasureInformation.setClientInformation(document,{mode:'new'},window);
      wrapper?.querySelector('.information-client-choice')?.setAttribute('aria-expanded','false');
      closeMeasureClientSelectPopup();
      refreshReviewClientInfo();
    }

    function openMeasureClientSelectPopup(el, event){
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      const wrapper = el ? el.closest('.col-4') : null;
      const menu = wrapper ? wrapper.querySelector('.client-menu') : null;
      if(menu) menu.classList.add('hidden');

      const popup = ensureMeasureClientSelectPopup();
      if(!popup) return;

      popup.clientReturnFocus = wrapper ? wrapper.querySelector('.field') : null;
      popup.clientReturnFocus?.setAttribute('aria-expanded', 'false');
      popup.classList.remove('hidden');
      const searchInput = popup.querySelector('[data-measure-client-search]');
      if(searchInput){
        searchInput.value = '';
        measurePageLifetime.delay(() => searchInput.focus(), 0);
      }

      if(typeof renderMeasureClientPopupRows === 'function'){
        renderMeasureClientPopupRows('');
      }

      if(typeof loadMeasureClientRows === 'function'){
        loadMeasureClientRows();
      }
    }

    function closeMeasureClientSelectPopup(){
      const popup = document.querySelector('[data-measure-client-popup]');
      if(popup){
        const wasOpen = !popup.classList.contains('hidden');
        popup.classList.add('hidden');
        if(wasOpen && popup.clientReturnFocus?.isConnected) popup.clientReturnFocus.focus();
      }
    }

    function renderMeasureClientPopupRows(searchText){
      const popup = ensureMeasureClientSelectPopup();
      if(!popup) return;

      const body = popup.querySelector('[data-measure-client-popup-body]');
      if(!body) return;

      const rows = Array.isArray(window.measureClientRows) ? window.measureClientRows : [];
      const scopedRows = rows;

      const normalizedSearch = String(searchText || '').trim().toLowerCase();
      const filteredRows = scopedRows.filter((client) => {
        if(!normalizedSearch) return true;
        return [client.account, client.name, client.company, client.phone, client.address, client.email]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);
      });

      if(window.measureClientRowsLoading){
        body.innerHTML = '<div class="measure-client-popup-empty">Loading clients...</div>';
        return;
      }

      if(window.measureClientRowsError){
        body.innerHTML = '<div class="measure-client-popup-empty">Failed to load clients.</div>';
        return;
      }

      if(!filteredRows.length){
        body.innerHTML = '<div class="measure-client-popup-empty">No clients found.</div>';
        return;
      }

      body.innerHTML = filteredRows.map((client, index) => {
        const rowId = escapeMeasureClientText(String(index));
        return '<div class="measure-client-popup-row" data-measure-client-row-index="' + rowId + '" onclick="selectMeasureClientFromPopup(' + index + ')"><div data-mobile-label="Account">' + escapeMeasureClientText(client.account || '-') + '</div><div data-mobile-label="Client">' + escapeMeasureClientText(client.name || '-') + '</div><div data-mobile-label="Company">' + escapeMeasureClientText(client.company || '-') + '</div><div data-mobile-label="Phone">' + escapeMeasureClientText(client.phone || '-') + '</div></div>';
      }).join('');

      window.measureClientFilteredRows = filteredRows;
      body.querySelectorAll('[data-measure-client-row-index]').forEach(row=>{row.setAttribute('role','button');row.tabIndex=0;});
    }

    function setInfoInputValue(card, placeholder, value){
      if(!card) return;
      const input = card.querySelector('input[placeholder="' + placeholder + '"]');
      if(!input) return;
      input.value = value || '';
      input.setAttribute('value', value || '');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function selectMeasureClientFromPopup(index){
      const rows = Array.isArray(window.measureClientFilteredRows) ? window.measureClientFilteredRows : [];
      const client = rows[index];
      if(!client) return;

      const card = document.getElementById('clientInformationCard');
      const clientLabel = card ? Array.from(card.querySelectorAll('.field-label')).find((label) => label.textContent.trim() === 'Client') : null;
      const clientWrapper = clientLabel ? clientLabel.closest('.col-4') : null;
      const fieldText = clientWrapper ? clientWrapper.querySelector('.field span') : null;

      if(fieldText){
        fieldText.textContent = client.name || 'Selected client';
        fieldText.title = client.name || '';
        fieldText.classList.remove('placeholder');
        fieldText.dataset.clientId = client.id || '';
        fieldText.dataset.clientAccount = client.account || '';
        fieldText.dataset.clientCompany = client.company || '';
      }

      window.wincoMeasureInformation.setClientInformation(document,client,window);

      if(typeof window.forceMeasureTagRefresh === 'function'){
        window.forceMeasureTagRefresh();
      }

      closeMeasureClientSelectPopup();
    }

    async function loadMeasureClientRows(){
      if(window.measureClientRowsLoading) return;
      const generation = window.measureClientGeneration;

      window.measureClientRowsLoading = true;
      window.measureClientRowsError = false;
      renderMeasureClientPopupRows('');

      try {
        if(!window.supabaseClient){
          window.measureClientRows = [];
          window.measureClientRowsError = true;
          return;
        }

        const data = await window.wincoLoadClients();
        if (generation !== window.measureClientGeneration) return;

        const normalizedRows = (data || []).map(normalizeMeasureClientRow);

        window.measureClientRows = normalizedRows
          .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), undefined, { numeric: true }));

        window.measureClientRowsLoaded = true;
      } catch(error) {
        if (generation !== window.measureClientGeneration) return;
        window.measureClientRows = [];
        window.measureClientRowsError = true;
        console.error('Failed to load clients',error);
      } finally {
        if (generation === window.measureClientGeneration) {
          window.measureClientRowsLoading = false;
          const searchInput = document.querySelector('[data-measure-client-search]');
          renderMeasureClientPopupRows(searchInput ? searchInput.value : '');
        }
      }
    }

    window.selectNewClientOption = selectNewClientOption;
    window.openMeasureClientSelectPopup = openMeasureClientSelectPopup;
    window.closeMeasureClientSelectPopup = closeMeasureClientSelectPopup;
    window.renderMeasureClientPopupRows = renderMeasureClientPopupRows;
    window.selectMeasureClientFromPopup = selectMeasureClientFromPopup;
    window.loadMeasureClientRows = loadMeasureClientRows;

    function closeOtherDropdownMenus(exceptMenu){
      document.querySelectorAll('.client-menu').forEach((menu) => {
        if(menu !== exceptMenu){
          menu.classList.add('hidden');
        }
      });
    }

    function toggleTypeMenu(el){
      const wrapper = el.parentElement;
      const menu = wrapper.querySelector('.client-menu');
      if(menu) menu.classList.toggle('hidden');
    }

    function selectType(el, value){
      const wrapper = el.closest('.information-field, .col-2');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      if(menu) menu.classList.add('hidden');
      const fieldText = wrapper.querySelector('.field span');
      const current = wrapper.querySelector('[data-measure-type-input]')?.value ??
        (fieldText && !fieldText.classList.contains('placeholder') ? fieldText.textContent : '');
      const customValue = ['House', 'Condo', 'Townhouse', 'Commercial'].includes(current) ? '' : current;
      renderMeasureTypeValue(wrapper, value === 'custom' ? customValue : value, value === 'custom', current);
      if(typeof refreshReviewClientInfo === 'function') refreshReviewClientInfo();
    }

    function renderMeasureTypeValue(wrapper, value = '', editing = false, previousValue = value){
      const field = wrapper?.querySelector('.field');
      if(!field) return;
      const cleanValue = String(value ?? '').trim();
      if(!editing){
        const label = document.createElement('span');
        label.dataset.shippingType = '';
        label.textContent = cleanValue || 'Type';
        label.title = cleanValue;
        Object.assign(label.style, { minWidth: '0', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' });
        label.classList.toggle('placeholder', !cleanValue);
        field.replaceChildren(label);
        return;
      }
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Custom';
      input.setAttribute('aria-label', 'Custom type');
      input.dataset.measureTypeInput = '';
      input.value = cleanValue;
      input.addEventListener('click', event => event.stopPropagation());
      input.addEventListener('input', () => refreshReviewClientInfo());
      input.addEventListener('keydown', event => {
        if(event.isComposing) return;
        if(event.key === 'Enter') { event.preventDefault(); input.blur(); }
        if(event.key === 'Escape') {
          event.preventDefault();
          renderMeasureTypeValue(wrapper, previousValue);
          refreshReviewClientInfo();
        }
      });
      input.addEventListener('blur', () => {
        if(!field.contains(input)) return;
        renderMeasureTypeValue(wrapper, input.value);
        refreshReviewClientInfo();
      });
      field.replaceChildren(input);
      input.focus();
    }
    window.renderMeasureTypeValue = renderMeasureTypeValue;

    function toggleRoomMenu(el){
      const wrapper = el.closest('.col-3');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      if(menu) menu.classList.toggle('hidden');
    }

    function renderRoomValue(wrapper, value = '', isCustom = false){
      const valueBox = wrapper.querySelector('.room-type-value');
      if(!valueBox) return;

      if(isCustom){
        valueBox.innerHTML = '<input data-room-input type="text" placeholder="Custom Room" />';
        const input = valueBox.querySelector('[data-room-input]');
        if(input){
          input.focus();
          input.addEventListener('click', (event) => {
            event.stopPropagation();
          });
          input.addEventListener('keydown', (event) => {
            if(event.key === 'Enter'){
              input.blur();
            }
          });
          input.addEventListener('blur', () => {
            const nextValue = input.value.trim();
            if(nextValue){
              renderRoomValue(wrapper, nextValue, false);
            } else {
              renderRoomValue(wrapper, '', false);
            }
          }, { once:true });
        }
        return;
      }

      if(!value){
        valueBox.innerHTML = '<span data-room-display class="placeholder">Select Room</span>';
        return;
      }

      valueBox.innerHTML = '<span data-room-display></span>';
      valueBox.querySelector('[data-room-display]').textContent = value;
    }

    function selectRoom(el, value){
      const wrapper = el.closest('.col-3');
      if(!wrapper) return;

      const menu = wrapper.querySelector('.client-menu');
      const windowCard = el.closest('.card');
      const windowIndex = windowCard
        ? Array.from(document.querySelectorAll('.card'))
            .filter(function(card){ return card.querySelector('.window-head'); })
            .indexOf(windowCard) + 1
        : null;

      if(value === 'custom'){
        renderRoomValue(wrapper, '', true);

        const input = wrapper.querySelector('[data-room-input]');
        if(input){
          input.addEventListener('blur', function () {
            if(windowIndex){
              updateWindowTitleMeta(windowIndex);
            }
          }, { once: true });
        }
      } else {
        renderRoomValue(wrapper, value, false);

        if(windowIndex){
          updateWindowTitleMeta(windowIndex);
        }
      }

      if(menu) menu.classList.add('hidden');
    }

    function toggleGroupMenu(el){
      const wrapper = el.parentElement;
      const menu = wrapper.querySelector('.client-menu');
      if(menu){
        closeOtherDropdownMenus(menu);
        menu.classList.toggle('hidden');
      }
    }

    function selectGroup(el, value){
      const wrapper = el.closest('.col-1');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      const fieldText = wrapper.querySelector('.field span');
      if(fieldText){
        fieldText.textContent = value;
        fieldText.classList.remove('placeholder');
      }
      if(menu) menu.classList.add('hidden');

      if(typeof refreshFabricMenusForGroup === 'function'){
        const card=wrapper.closest('.card');
        if(card){delete card.dataset.savedOptionAmount;delete card.dataset.savedSurchargeAmount;window.wincoDependencies.reconcile(card,'group');}
        refreshFabricMenusForGroup(wrapper.closest('.card'));
      }

      if(typeof refreshHeadrailMenusForGroup === 'function'){
        refreshHeadrailMenusForGroup(wrapper.closest('.card'));
      }

      if(typeof refreshBottomrailMenusForGroup === 'function'){
        refreshBottomrailMenusForGroup(wrapper.closest('.card'));
      }

      if(typeof refreshControlTypeMenusForGroup === 'function'){
        refreshControlTypeMenusForGroup(wrapper.closest('.card'));
      }

      if(typeof refreshCordlessTypeMenusForGroup === 'function'){
        refreshCordlessTypeMenusForGroup(wrapper.closest('.card'));
      }
      const card=wrapper.closest('.card');
      const dims=card?card.querySelectorAll('.dimension-field'):[];
      updateWindowCardPricing(card,dims.length>=2?calculateCeilingSqftFromMm(getMmValue(dims[0]),getMmValue(dims[1])):0);
    }

    function getSelectedGroupValue(card){
      if(!card) return '';
      const groupLabel = Array.from(card.querySelectorAll('.field-label')).find((label) => label.textContent.trim() === 'Group');
      const groupWrapper = groupLabel ? groupLabel.closest('.col-1') : null;
      const groupText = groupWrapper ? groupWrapper.querySelector('.field span') : null;
      if(!groupText || groupText.classList.contains('placeholder')) return '';

      const raw = groupText.textContent.trim();

      if(raw === 'Dual' || raw === 'Dual Shade') return 'Dual';
      if(raw === 'Roller' || raw === 'Roller Shade') return 'Roller';

      return raw;
    }

    function getFilteredFabricItems(card){
 const state=window.wincoDependencies.readProductState(card);
 return (window.measureFabricItems||[]).filter(fabric=>(!state.group||state.group===fabric.product_group)&&(!window.wincoDependencies.registrySelectionReady||window.wincoDependencies.registrySelectionReady('fabric',fabric.id,fabric.code))&&window.wincoDependencies.compatibilityIssues({...state,group:fabric.product_group,fabricId:fabric.id}).length===0);
}

    function formatFabricOptionLabel(fabric){
      const code = String(fabric.code || '').trim();
      const description = String(fabric.description || '').trim();

      if(code && description) return code + ' - ' + description;
      return code || description || 'Unnamed fabric';
    }

    function toggleFabricMenu(el, evt){
      const e = evt || window.event;
      if(e) e.stopPropagation();

      const wrapper = el.closest('.col-4');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-fabric-menu]');
      if(!menu) return;

      closeOtherDropdownMenus(menu);
      renderFabricMenu(wrapper);
      menu.classList.toggle('hidden');
    }

    function renderFabricMenu(wrapper){
      if(!wrapper) return;

      const card = wrapper.closest('.card');
      const menu = wrapper.querySelector('[data-fabric-menu]');
      if(!menu) return;

      const fabrics = getFilteredFabricItems(card);

      menu.innerHTML = '';

      if(!fabrics.length){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'No fabrics';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      fabrics.forEach((fabric) => {
        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = formatFabricOptionLabel(fabric);
        option.title = option.textContent;
        option.onclick = function(event){
          event.stopPropagation();
          selectFabric(option, fabric);
        };
        menu.appendChild(option);
      });
    }

    function selectFabric(el, fabric){
      const wrapper = el.closest('.col-4');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-fabric-menu]');
      const fabricDisplay = wrapper.querySelector('[data-fabric-display]');
      const colorDisplay = wrapper.querySelector('[data-fabric-color-display]');

      if(fabricDisplay){
        fabricDisplay.textContent = fabric.code || '';
        fabricDisplay.title = formatFabricOptionLabel(fabric);
        fabricDisplay.classList.remove('placeholder');
        fabricDisplay.dataset.fabricId = fabric.id || '';
        fabricDisplay.dataset.fabricCode = fabric.code || '';
        fabricDisplay.dataset.fabricGroup = fabric.product_group || '';
        fabricDisplay.dataset.fabricDescription = fabric.description || '';
        fabricDisplay.dataset.fabricPrice = fabric.price ?? '';
        fabricDisplay.dataset.fabricWidth = fabric.width ?? '';
        fabricDisplay.dataset.fabricVisibility = fabric.visibility || '';
      }

      if(colorDisplay){
        colorDisplay.textContent = 'Color';
        colorDisplay.title = '';
        colorDisplay.classList.add('placeholder');
        delete colorDisplay.dataset.fabricColorId;
        delete colorDisplay.dataset.fabricColor;
        delete colorDisplay.dataset.fabricColorStatus;
        delete colorDisplay.dataset.fabricColorVisibility;
      }

      const colorMenu = wrapper.querySelector('[data-fabric-color-menu]');
      if(colorMenu) colorMenu.classList.add('hidden');

      if(menu) menu.classList.add('hidden');

      const card = wrapper.closest('.card');
      const fabricGroup = String(fabric && fabric.product_group || '').trim();

      if(card && (fabricGroup === 'Dual' || fabricGroup === 'Roller')){
        const groupLabel = Array.from(card.querySelectorAll('.field-label'))
          .find((label) => label.textContent.trim() === 'Group');
        const groupWrapper = groupLabel ? groupLabel.closest('.col-1') : null;
        const groupOption = groupWrapper
          ? Array.from(groupWrapper.querySelectorAll('.client-option')).find((option) => {
              const optionText = String(option.textContent || '').trim();
              return fabricGroup === 'Dual'
                ? optionText === 'Dual Shade'
                : optionText === 'Roller Shade';
            })
          : null;

        if(groupOption){
          selectGroup(groupOption, fabricGroup);
        }
      }

      if(card){delete card.dataset.savedOptionAmount;window.wincoDependencies.reconcile(card,'group');}
      const dims = card ? card.querySelectorAll('.dimension-field') : [];
      const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
      updateWindowCardPricing(card, sqft);
    }

    function getSelectedFabricForProductWrapper(wrapper){
      if(!wrapper) return null;

      const fabricDisplay = wrapper.querySelector('[data-fabric-display]');
      if(!fabricDisplay || fabricDisplay.classList.contains('placeholder')) return null;

      const selectedId = String(fabricDisplay.dataset.fabricId || '').trim();
      const selectedCode = String(fabricDisplay.dataset.fabricCode || fabricDisplay.textContent || '').trim();
      const fabrics = Array.isArray(window.measureFabricItems) ? window.measureFabricItems : [];

      return fabrics.find((fabric) => {
        const fabricId = String(fabric.id || '').trim();
        const fabricCode = String(fabric.code || '').trim();
        return (selectedId && fabricId === selectedId) || (!selectedId && selectedCode && fabricCode === selectedCode);
      }) || null;
    }

    function getFabricColorItems(wrapper){
      const selectedFabric = getSelectedFabricForProductWrapper(wrapper);
      if(!selectedFabric || !Array.isArray(selectedFabric.fabric_colors)){
        return [];
      }

      return selectedFabric.fabric_colors
        .filter((color) => String(color.color_code || '').trim())
        .sort((a, b) => String(a.color_code || '').localeCompare(String(b.color_code || ''), undefined, { numeric: true }));
    }

    function toggleFabricColorMenu(el, evt){
      const e = evt || window.event;
      if(e) e.stopPropagation();

      const wrapper = el.closest('.col-4');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-fabric-color-menu]');
      if(!menu) return;

      const combo = wrapper.querySelector('.product-combo');
      if(combo){
        menu.style.left = el.offsetLeft + 'px';
        menu.style.right = 'auto';
        menu.style.width = el.offsetWidth + 'px';
        menu.style.top = (combo.offsetTop + combo.offsetHeight + 4) + 'px';
      }

      closeOtherDropdownMenus(menu);
      renderFabricColorMenu(wrapper);
      menu.classList.toggle('hidden');
    }

    function renderFabricColorMenu(wrapper){
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-fabric-color-menu]');
      if(!menu) return;

      const fabricDisplay = wrapper.querySelector('[data-fabric-display]');
      const colors = getFabricColorItems(wrapper);

      menu.innerHTML = '';

      if(!fabricDisplay || fabricDisplay.classList.contains('placeholder')){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'Select fabric first';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      if(!colors.length){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'No colors';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      colors.forEach((color) => {
        const cleanCode = String(color.color_code || '').trim();
        const colorStatus = String(color.status || '').trim();

        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = cleanCode;
        option.title = cleanCode;

        if(colorStatus === 'Limited stock'){
          option.style.background = '#fef3c7';
          option.style.color = '#92400e';
        } else if(colorStatus === 'Discontinued / Limited stock'){
          option.style.background = '#fee2e2';
          option.style.color = '#991b1b';
        }

        option.onclick = function(event){
          event.stopPropagation();
          selectFabricColor(option, color);
        };

        menu.appendChild(option);
      });
    }

    function selectFabricColor(el, color){
      const wrapper = el.closest('.col-4');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-fabric-color-menu]');
      const colorDisplay = wrapper.querySelector('[data-fabric-color-display]');

      const cleanCode = String(color.color_code || '').trim();

      if(colorDisplay){
        colorDisplay.textContent = cleanCode;
        colorDisplay.title = cleanCode;
        colorDisplay.classList.remove('placeholder');
        colorDisplay.dataset.fabricColorId = color.id || '';
        colorDisplay.dataset.fabricColor = cleanCode;
        colorDisplay.dataset.fabricColorStatus = color.status || '';
        colorDisplay.dataset.fabricColorVisibility = color.visibility || '';
      }

      if(menu) menu.classList.add('hidden');
      renderReviewTableRows();
    }

    function formatHardwareOptionLabel(item){
      const code = String(item.code || '').trim();
      const description = String(item.description || '').trim();

      if(code && description) return code + ' - ' + description;
      return code || description || 'Unnamed hardware';
    }

    function getSelectedCordlessTypeCode(card){
 const el=card?.querySelector('[data-cordless-type-section] .field span');
 if(!el||el.classList.contains('placeholder'))return '';
 return window.wincoDependencies.normalizeControl(el.textContent,getSelectedGroupValue(card));
}

    function isCordlessTypeSelected(card){
      return !!getSelectedCordlessTypeCode(card);
    }

    function refreshRailSelectionsForCard(card){
      if(window.wincoDependencies?.configuredProductRules?.())return;
      if(!card || card.dataset.restoringQuote || window.measureHardwareCatalogState !== 'ready') return;

      const headrailDisplay = card.querySelector('[data-headrail-display]');
      const headrailWrapper = headrailDisplay ? headrailDisplay.closest('.col-3') : null;

      if(headrailWrapper && headrailDisplay && !headrailDisplay.classList.contains('placeholder')){
        const selectedCode = String(headrailDisplay.dataset.headrailCode || headrailDisplay.textContent || '').trim();
        const available = getHeadrailItems(card).some((item) => String(item.code || '').trim() === selectedCode);

        if(!available){
          resetHeadrailSelection(headrailWrapper);
        } else {
          resetInvalidRailColorForWrapper(headrailWrapper);
        }
      }

      const bottomrailDisplay = card.querySelector('[data-bottomrail-display]');
      const bottomrailWrapper = bottomrailDisplay ? bottomrailDisplay.closest('.col-3') : null;

      if(bottomrailWrapper && bottomrailDisplay && !bottomrailDisplay.classList.contains('placeholder')){
        const selectedCode = String(bottomrailDisplay.dataset.bottomrailCode || bottomrailDisplay.textContent || '').trim();
        const available = getBottomrailItems(card).some((item) => String(item.code || '').trim() === selectedCode);

        if(!available){
          resetBottomrailSelection(bottomrailWrapper);
        }
      }
    }

    function getHeadrailItems(card){
 const rules=window.wincoDependencies, state={...rules.readProductState(card),headrailColor:''};
 return (window.measureHardwareItems||[]).filter(item=>String(item.product_group).trim().toLowerCase()==='headrail')
 .filter(item=>rules.allowedValue(state,'headrail',rules.normalizeHeadrail(item.code)))
 .sort((a,b)=>Number(a.sort_order??999999)-Number(b.sort_order??999999)||String(a.code).localeCompare(String(b.code)));
}

    function toggleHeadrailMenu(el, evt){
      const e = evt || window.event;
      if(e) e.stopPropagation();

      const wrapper = el.closest('.col-3');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-headrail-menu]');
      if(!menu) return;

      closeOtherDropdownMenus(menu);
      renderHeadrailMenu(wrapper);
      menu.classList.toggle('hidden');
    }

    function renderHeadrailMenu(wrapper){
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-headrail-menu]');
      if(!menu) return;

      const card = wrapper.closest('.card');
      const items = getHeadrailItems(card);

      menu.innerHTML = '';

      if(!items.length){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'No head rails';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      items.forEach((item) => {
        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = formatHardwareOptionLabel(item);
        option.title = option.textContent;
        option.onclick = function(event){
          event.stopPropagation();
          selectHeadrail(option, item);
        };
        menu.appendChild(option);
      });
    }

    function selectHeadrail(el, item){
      const wrapper = el.closest('.col-3');
      if(!wrapper) return;

      const selectedCard = wrapper.closest('.card');
      if(selectedCard && selectedCard.dataset.savedSurchargeAmount !== undefined){
        delete selectedCard.dataset.savedSurchargeAmount;
      }

      const menu = wrapper.querySelector('[data-headrail-menu]');
      const display = wrapper.querySelector('[data-headrail-display]');

      if(display){
        display.textContent = item.code || '';
        display.title = formatHardwareOptionLabel(item);
        display.classList.remove('placeholder');
        display.dataset.headrailId = item.id || '';
        display.dataset.headrailCode = item.code || '';
        display.dataset.headrailDescription = item.description || '';
        display.dataset.headrailPricingType = item.pricing_type || '';
      }

      const colorSegs = Array.from(wrapper.querySelectorAll('.rail-seg.clickable')).filter((seg) => !seg.hasAttribute('data-headrail-display'));
      const colorSeg = colorSegs[colorSegs.length - 1];
      if(colorSeg){
        colorSeg.textContent = 'Color';
        colorSeg.title = '';
        colorSeg.classList.add('placeholder');
        delete colorSeg.dataset.railColorId;
        delete colorSeg.dataset.railColorCode;
        delete colorSeg.dataset.railColorDescription;
        delete colorSeg.dataset.railColorVisibility;
      }

      const colorMenu = wrapper.querySelector('[data-rail-color-menu]');
      if(colorMenu) colorMenu.classList.add('hidden');

      if(menu) menu.classList.add('hidden');

      if(typeof refreshControlTypeMenusForGroup === 'function'){
        refreshControlTypeMenusForGroup(selectedCard);
      }

      const card = wrapper.closest('.card');
      if(card){delete card.dataset.savedOptionAmount;window.wincoDependencies.reconcile(card,'headrail');}
      if(String(item.code || '').toUpperCase() === 'CLO' && getSelectedGroupValue(card) === 'Roller'){
        selectControlType(card.querySelector('[data-control-type-menu]'), 'Cordless');
        const cordlessItem = getCordlessTypeItems(card).find((entry) => entry.code === 'CLO');
        if(cordlessItem) selectCordlessType(card.querySelector('[data-cordless-type-section] .client-menu'), 'CLO', cordlessItem);
      }
      const dims = card ? card.querySelectorAll('.dimension-field') : [];
      const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
      updateWindowCardPricing(card, sqft);
    }

    function resetHeadrailSelection(wrapper){
      if(!wrapper) return;

      const display = wrapper.querySelector('[data-headrail-display]');
      const colorSegs = Array.from(wrapper.querySelectorAll('.rail-seg.clickable')).filter((seg) => !seg.hasAttribute('data-headrail-display'));
      const colorSeg = colorSegs[colorSegs.length - 1];
      const headrailMenu = wrapper.querySelector('[data-headrail-menu]');
      const colorMenu = wrapper.querySelector('[data-rail-color-menu]');

      if(display){
        display.textContent = 'Head rail';
        display.title = '';
        display.classList.add('placeholder');
        delete display.dataset.headrailId;
        delete display.dataset.headrailCode;
        delete display.dataset.headrailDescription;
        delete display.dataset.headrailPricingType;
      }

      if(colorSeg){
        colorSeg.textContent = 'Color';
        colorSeg.title = '';
        colorSeg.classList.add('placeholder');
        delete colorSeg.dataset.railColorId;
        delete colorSeg.dataset.railColorCode;
        delete colorSeg.dataset.railColorDescription;
        delete colorSeg.dataset.railColorVisibility;
      }

      if(headrailMenu) headrailMenu.classList.add('hidden');
      if(colorMenu) colorMenu.classList.add('hidden');

      if(typeof refreshControlTypeMenusForGroup === 'function'){
        refreshControlTypeMenusForGroup();
      }

      const card = wrapper.closest('.card');
      const dims = card ? card.querySelectorAll('.dimension-field') : [];
      const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
      updateWindowCardPricing(card, sqft);
    }

    function refreshHeadrailMenusForGroup(scope = document){
      (scope.matches?.('.card') ? [scope] : scope.querySelectorAll('.card')).forEach((card) => {
        if(!card.querySelector('.window-head')) return;

        const headrailDisplay = card.querySelector('[data-headrail-display]');
        const headrailWrapper = headrailDisplay ? headrailDisplay.closest('.col-3') : null;
        if(!headrailWrapper || !headrailDisplay) return;

        if(!headrailDisplay.classList.contains('placeholder')){
          const selectedCode = String(headrailDisplay.dataset.headrailCode || headrailDisplay.textContent || '').trim();
          const available = getHeadrailItems(card).some((item) => String(item.code || '').trim() === selectedCode);

          if(!available){
            resetHeadrailSelection(headrailWrapper);
          } else {
            resetInvalidRailColorForWrapper(headrailWrapper);
          }
        }

        const menu = headrailWrapper.querySelector('[data-headrail-menu]');
        if(menu && !menu.classList.contains('hidden')){
          renderHeadrailMenu(headrailWrapper);
        }
      });
    }

    function getBottomrailItems(card){
 const rules=window.wincoDependencies, state={...rules.readProductState(card),bottomrailColor:''};
 return (window.measureHardwareItems||[]).filter(item=>String(item.product_group).trim().toLowerCase()==='bottom rail')
 .filter(item=>rules.allowedValue(state,'bottomrail',String(item.code).trim().toUpperCase()))
 .sort((a,b)=>Number(a.sort_order??999999)-Number(b.sort_order??999999)||String(a.code).localeCompare(String(b.code)));
}

    function toggleBottomrailMenu(el, evt){
      const e = evt || window.event;
      if(e) e.stopPropagation();

      const wrapper = el.closest('.col-3');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-bottomrail-menu]');
      if(!menu) return;

      closeOtherDropdownMenus(menu);
      renderBottomrailMenu(wrapper);
      menu.classList.toggle('hidden');
    }

    function renderBottomrailMenu(wrapper){
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-bottomrail-menu]');
      if(!menu) return;

      const card = wrapper.closest('.card');
      const items = getBottomrailItems(card);

      menu.innerHTML = '';

      if(!items.length){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'No bottom rails';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      items.forEach((item) => {
        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = formatHardwareOptionLabel(item);
        option.title = option.textContent;
        option.onclick = function(event){
          event.stopPropagation();
          selectBottomrail(option, item);
        };
        menu.appendChild(option);
      });
    }

    function selectBottomrail(el, item){
      const wrapper = el.closest('.col-3');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-bottomrail-menu]');
      const display = wrapper.querySelector('[data-bottomrail-display]');

      if(display){
        display.textContent = item.code || '';
        display.title = formatHardwareOptionLabel(item);
        display.classList.remove('placeholder');
        display.dataset.bottomrailId = item.id || '';
        display.dataset.bottomrailCode = item.code || '';
        display.dataset.bottomrailDescription = item.description || '';
        display.dataset.bottomrailPricingType = item.pricing_type || '';
      }

      const colorSegs = Array.from(wrapper.querySelectorAll('.rail-seg.clickable')).filter((seg) => !seg.hasAttribute('data-bottomrail-display'));
      const colorSeg = colorSegs[colorSegs.length - 1];
      if(colorSeg){
        colorSeg.textContent = 'Color';
        colorSeg.title = '';
        colorSeg.classList.add('placeholder');
        delete colorSeg.dataset.railColorId;
        delete colorSeg.dataset.railColorCode;
        delete colorSeg.dataset.railColorDescription;
        delete colorSeg.dataset.railColorVisibility;
      }

      const colorMenu = wrapper.querySelector('[data-rail-color-menu]');
      if(colorMenu) colorMenu.classList.add('hidden');

      if(menu) menu.classList.add('hidden');

      const card = wrapper.closest('.card');
      if(card){delete card.dataset.savedOptionAmount;window.wincoDependencies.reconcile(card,'bottomrail');}
      const dims = card ? card.querySelectorAll('.dimension-field') : [];
      const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
      updateWindowCardPricing(card, sqft);
    }

    function resetBottomrailSelection(wrapper){
      if(!wrapper) return;

      const display = wrapper.querySelector('[data-bottomrail-display]');
      const colorSegs = Array.from(wrapper.querySelectorAll('.rail-seg.clickable')).filter((seg) => !seg.hasAttribute('data-bottomrail-display'));
      const colorSeg = colorSegs[colorSegs.length - 1];
      const bottomrailMenu = wrapper.querySelector('[data-bottomrail-menu]');
      const colorMenu = wrapper.querySelector('[data-rail-color-menu]');

      if(display){
        display.textContent = 'Bottom rail';
        display.title = '';
        display.classList.add('placeholder');
        delete display.dataset.bottomrailId;
        delete display.dataset.bottomrailCode;
        delete display.dataset.bottomrailDescription;
        delete display.dataset.bottomrailPricingType;
      }

      if(colorSeg){
        colorSeg.textContent = 'Color';
        colorSeg.title = '';
        colorSeg.classList.add('placeholder');
        delete colorSeg.dataset.railColorId;
        delete colorSeg.dataset.railColorCode;
        delete colorSeg.dataset.railColorDescription;
        delete colorSeg.dataset.railColorVisibility;
      }

      if(bottomrailMenu) bottomrailMenu.classList.add('hidden');
      if(colorMenu) colorMenu.classList.add('hidden');
    }

    function refreshBottomrailMenusForGroup(scope = document){
      (scope.matches?.('.card') ? [scope] : scope.querySelectorAll('.card')).forEach((card) => {
        if(!card.querySelector('.window-head')) return;

        const bottomrailDisplay = card.querySelector('[data-bottomrail-display]');
        const bottomrailWrapper = bottomrailDisplay ? bottomrailDisplay.closest('.col-3') : null;
        if(!bottomrailWrapper || !bottomrailDisplay) return;

        if(!bottomrailDisplay.classList.contains('placeholder')){
          const selectedCode = String(bottomrailDisplay.dataset.bottomrailCode || bottomrailDisplay.textContent || '').trim();
          const available = getBottomrailItems(card).some((item) => String(item.code || '').trim() === selectedCode);

          if(!available){
            resetBottomrailSelection(bottomrailWrapper);
          }
        }

        const menu = bottomrailWrapper.querySelector('[data-bottomrail-menu]');
        if(menu && !menu.classList.contains('hidden')){
          renderBottomrailMenu(bottomrailWrapper);
        }
      });
    }

    function clearFabricSelectionIfNotAvailable(card){
      if(!card) return;

      const fabricDisplay = card.querySelector('[data-fabric-display]');
      const colorDisplay = card.querySelector('[data-fabric-color-display]');
      if(!fabricDisplay || fabricDisplay.classList.contains('placeholder')) return;

      const selectedCode = String(fabricDisplay.dataset.fabricCode || fabricDisplay.textContent || '').trim();
      const available = getFilteredFabricItems(card).some((fabric) => String(fabric.code || '').trim() === selectedCode);

      if(available) return;

      fabricDisplay.textContent = 'Fabric';
      fabricDisplay.title = '';
      fabricDisplay.classList.add('placeholder');
      delete fabricDisplay.dataset.fabricId;
      delete fabricDisplay.dataset.fabricCode;
      delete fabricDisplay.dataset.fabricGroup;
      delete fabricDisplay.dataset.fabricDescription;
      delete fabricDisplay.dataset.fabricPrice;
      delete fabricDisplay.dataset.fabricWidth;
      delete fabricDisplay.dataset.fabricVisibility;

      if(colorDisplay){
        colorDisplay.textContent = 'Color';
        colorDisplay.title = '';
        colorDisplay.classList.add('placeholder');
        delete colorDisplay.dataset.fabricColorId;
        delete colorDisplay.dataset.fabricColor;
        delete colorDisplay.dataset.fabricColorStatus;
        delete colorDisplay.dataset.fabricColorVisibility;
      }

      const dims = card.querySelectorAll('.dimension-field');
      const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
      updateWindowCardPricing(card, sqft);
    }

    function refreshFabricMenusForGroup(scope = document, {reconcile = true} = {}){
      (scope.matches?.('.card') ? [scope] : scope.querySelectorAll('.card')).forEach((card) => {
        if(!card.querySelector('.window-head')) return;

        if(reconcile) clearFabricSelectionIfNotAvailable(card);

        const productWrapper = card.querySelector('[data-fabric-menu]')?.closest('.col-4');
        if(productWrapper){
          const menu = productWrapper.querySelector('[data-fabric-menu]');
          if(menu && !menu.classList.contains('hidden')){
            renderFabricMenu(productWrapper);
          }
        }
      });
    }

    function toggleCtrlSideMenu(el){
      if(window.wincoConfiguration.isCardDivided(el.closest('.card'))) return;
      const wrapper = el.parentElement;
      const menu = wrapper.querySelector('.client-menu');
      if(menu) menu.classList.toggle('hidden');
    }

    function toggleSplitCtrlMenu(el, evt){
      const e = evt || window.event;
      if(e){
        e.preventDefault();
        e.stopPropagation();
      }
      const wrapper = el.closest('.split-seg');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.split-select-menu');
      if(!menu) return;

      const willOpen = menu.classList.contains('hidden');
      document.querySelectorAll('.split-select-menu').forEach((m) => {
        m.classList.add('hidden');
      });
      if(willOpen){
        menu.classList.remove('hidden');
      }
    }

    function selectSplitCtrl(el, value, evt){
      const e = evt || window.event;
      if(e) e.stopPropagation();
      const wrapper = el.closest('.split-seg');
      if(!wrapper) return;
      const display = wrapper.querySelector('.split-select-display');
      const menu = wrapper.querySelector('.split-select-menu');
      if(display) display.textContent = value;
      if(menu) menu.classList.add('hidden');

      if(typeof renderReviewTableRows === 'function'){
        renderReviewTableRows();
      }
    }

    function selectCtrlSide(el, sideValue){
      if(window.wincoConfiguration.isCardDivided(el.closest('.card'))) return;
      const wrapper = el.closest('.col-1');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      const fieldText = wrapper.querySelector('.field span');
      if(fieldText){
        fieldText.textContent = sideValue;
        fieldText.classList.remove('placeholder');
      }
      if(menu) menu.classList.add('hidden');
      renderReviewTableRows();
    }

    function getCordlessTypeItems(card){
 const rules=window.wincoDependencies,state=rules.readProductState(card);
 return rules.cordlessCatalog(window.measurePricingCordlessTypeItems,window.measureControlItems).filter(item=>rules.allowedValue(state,'control',item.code));
}

    function renderCordlessTypeMenu(wrapper){
      if(!wrapper) return;

      const menu = wrapper.querySelector('.client-menu');
      if(!menu) return;

      const card = wrapper.closest('.card');
      const items = getCordlessTypeItems(card);
      menu.innerHTML = '';

      if(!items.length){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'No cordless types';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      items.forEach((item) => {
        const code = String(item.code || item.part_number || item.name || '').trim();
        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = code;
        option.title = item.name || code;
        option.onclick = function(event){
          event.stopPropagation();
          selectCordlessType(option, code, item);
        };
        menu.appendChild(option);
      });
    }

    function toggleCordlessTypeMenu(el){
      const wrapper = el.closest('[data-cordless-type-section]');
      if(!wrapper) return;

      const menu = wrapper.querySelector('.client-menu');
      if(menu){
        closeOtherDropdownMenus(menu);
        renderCordlessTypeMenu(wrapper);
        menu.classList.toggle('hidden');
      }
    }

    function selectCordlessType(el, value, item){
      const wrapper = el.closest('[data-cordless-type-section]');
      if(!wrapper) return;

      const menu = wrapper.querySelector('.client-menu');
      const fieldText = wrapper.querySelector('.field span');

      if(fieldText){
        fieldText.textContent = value;
        fieldText.classList.remove('placeholder');
        value=window.wincoDependencies.normalizeControl(value,getSelectedGroupValue(wrapper.closest('.card')));
        fieldText.textContent=value;
        fieldText.dataset.cordlessTypeCode=value;
        fieldText.dataset.cordlessPricingId=item?.id||'';
        fieldText.dataset.cordlessTypePrice = item && item.price != null ? String(item.price) : '';
      }

      if(menu) menu.classList.add('hidden');

      const card = wrapper.closest('.card');
      if(card && card.querySelector('.window-head')){
        try {
          delete card.dataset.savedOptionAmount;
          delete card.dataset.savedSurchargeAmount;
          window.wincoDependencies.reconcile(card,'control');
          refreshRailSelectionsForCard(card);
          if(typeof refreshHeadrailMenusForGroup === 'function') refreshHeadrailMenusForGroup(card);
          if(typeof refreshBottomrailMenusForGroup === 'function') refreshBottomrailMenusForGroup(card);

          const dims = card.querySelectorAll('.dimension-field');
          const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
          updateWindowCardPricing(card, sqft);
        } catch (err) {
          console.error('measure cordless type pricing update error', err);
        }
      }
    }

    function resetCordlessTypeSelection(wrapper){
      if(!wrapper) return;

      const fieldText = wrapper.querySelector('.field span');
      const menu = wrapper.querySelector('.client-menu');
      const card = wrapper.closest('.card');

      if(fieldText){
        fieldText.textContent = 'Select Type';
        fieldText.classList.add('placeholder');
      }

      if(menu) menu.classList.add('hidden');

      if(card && card.querySelector('.window-head')){
        const dims = card.querySelectorAll('.dimension-field');
        const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
        updateWindowCardPricing(card, sqft);
      }
    }

    function refreshCordlessTypeMenusForGroup(scope = document){
      scope.querySelectorAll('[data-cordless-type-section]').forEach((wrapper) => {
        const card = wrapper.closest('.card');
        if(!card || card.dataset.restoringQuote || !card.querySelector('.window-head')) return;

        const fieldText = wrapper.querySelector('.field span');
        if(fieldText && !fieldText.classList.contains('placeholder')){
          const selectedCode = window.wincoDependencies.normalizeControl(fieldText.textContent,getSelectedGroupValue(card));
          const available = getCordlessTypeItems(card).some((item) => {
            const code = String(item.code || item.part_number || item.name || '').trim();
            return code === selectedCode;
          });

          if(!available&&!window.wincoDependencies?.configuredProductRules?.()){
            resetCordlessTypeSelection(wrapper);
          }
        }

        const menu = wrapper.querySelector('.client-menu');
        if(menu && !menu.classList.contains('hidden')){
          renderCordlessTypeMenu(wrapper);
        }

        refreshRailSelectionsForCard(card);
      });
    }

    function formatMotorOptionLabel(item){
      const name = String(item.name || item.control_type || '').trim();
      const code = String(item.code || '').trim();

      return name || code || 'Unnamed motor';
    }

    function getMotorItems(card){
      const items=window.wincoPricing.motorCatalog(window.measurePricingMotorItems || []);
      if(!card||!window.wincoDependencies?.configuredProductRules?.())return items;
      const state=window.wincoDependencies.readProductState(card);
      return items.filter(item=>!window.wincoDependencies.compatibilityIssues({...state,motorPricingId:item.id}).length);
    }

    function refreshSelectedCatalogPrices(force=false){
      // A saved Quote edit keeps its historical labels and unit prices.
      if(window.measureEditingQuoteId&&!force)return;
      document.querySelectorAll('.measure-page [data-fabric-display]').forEach(display=>{
        if(display.classList.contains('placeholder'))return;
        const id=display.dataset.fabricId;
        const oldCode=display.dataset.fabricCode || display.textContent;
        const configured=window.wincoDependencies?.configuredProductRules?.(),alias=configured?.registry.products.find(p=>p.kind==='fabric'&&p.group===(display.dataset.fabricGroup || getSelectedGroupValue(display.closest('.card')))&&p.codeAliases.some(a=>normalizeMeasureCode(a)===normalizeMeasureCode(oldCode)));
        const item=(window.measureFabricItems||[]).find(row=>id ? row.id===id : alias?row.id===alias.id:row.code===oldCode);
        if(!item)return;
        display.dataset.fabricId=item.id;
        display.dataset.fabricPrice=String(item.price ?? 0);
        display.dataset.fabricWidth=String(item.width ?? 0);
        display.textContent=item.code;
        display.dataset.fabricCode=item.code;
        display.title=formatFabricOptionLabel(item);
      });
      for(const key of ['headrail','bottomrail'])document.querySelectorAll('.measure-page [data-'+key+'-display]').forEach(display=>{
        if(display.classList.contains('placeholder'))return;
        const id=display.dataset[key+'Id'];
        const alias=window.wincoDependencies?.configuredProductRules?.()?.resolve(key,display.dataset[key+'Code'] || display.textContent);
        const item=(window.measureHardwareItems||[]).find(row=>id ? row.id===id : alias?row.id===alias.id:row.code===display.dataset[key+'Code']);
        if(!item)return;
        display.dataset[key+'Id']=item.id;
        display.dataset[key+'PricingType']=item.pricing_type || '';
        display.dataset[key+'Code']=item.code;
        display.dataset[key+'Description']=item.description || '';
        display.textContent=item.code;
      });
      const configured=window.wincoDependencies?.configuredProductRules?.();
      if(configured)document.querySelectorAll('.measure-page .card:has(.window-head)').forEach(card=>{
        const selected=configured.resolve('control',window.wincoDependencies.readProductState(card).control);
        if(selected&&selected.group!=='Motorized')window.wincoDependencies.fillControl(card,selected.canonicalCode);
      });
      document.querySelectorAll('.measure-page [data-motor-section] .field span').forEach(display=>{
        if(display.classList.contains('placeholder'))return;
        const item=window.wincoPricing.findMotorPricingItem(window.measurePricingMotorItems,{pricingId:display.dataset.motorPricingId,code:display.dataset.motorCode,name:display.dataset.motorName});
        if(!item)return;
        display.dataset.motorPricingId=item.id;
        display.dataset.motorCode=item.code || item.part_number || '';
        display.dataset.motorName=item.name;
        display.textContent=item.name;display.title=item.name;
      });
      document.querySelectorAll('.measure-page .accessory-row').forEach(row=>{
        const display=row.querySelector('[data-accessory-item]');
        const alias=window.wincoDependencies?.configuredProductRules?.()?.resolve('accessory',display?.dataset.accessoryValue);
        const item=(window.measurePricingAccessoryItems||[]).find(item=>item.is_active!==false && (display?.dataset.accessoryPricingId ? item.id===display.dataset.accessoryPricingId : alias?item.id===alias.id:item.name===display?.dataset.accessoryValue));
        if(!item)return;
        display.dataset.accessoryPricingId=item.id;display.dataset.accessoryValue=item.name;display.textContent=item.name;display.title=item.name;
        const price=formatAccessoryPriceInput(item.price);
        row.dataset.accessoryPrice=price;
        const input=row.querySelector('[data-accessory-price]'),priceDisplay=row.querySelector('[data-accessory-price-display]');
        if(input){input.value=price;input.defaultValue=price;input.setAttribute('value',price);}
        if(priceDisplay){priceDisplay.textContent=price;priceDisplay.dataset.accessoryPriceValue=price;}
      });
      window.updateAllWindowPricing?.();
      const accessories=document.querySelector('.measure-page .accessories');
      if(accessories)window.updateAccessoriesTotals?.(accessories);
    }

    function refreshOpenMotorMenus(){
      document.querySelectorAll('.measure-page [data-motor-menu]').forEach(menu=>{
        if(!menu.classList.contains('hidden'))renderMotorMenu(menu.closest('[data-motor-section]'));
      });
    }

    function toggleMotorMenu(el){
      const wrapper = el.closest('[data-motor-section]');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-motor-menu]');
      if(menu){
        closeOtherDropdownMenus(menu);
        renderMotorMenu(wrapper);
        menu.classList.toggle('hidden');
      }
    }

    function renderMotorMenu(wrapper){
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-motor-menu]');
      if(!menu) return;

      const motors = getMotorItems(wrapper.closest('.card'));
      menu.innerHTML = '';

      if(!motors.length){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'No motors';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      motors.forEach((motor) => {
        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = formatMotorOptionLabel(motor);
        option.title = option.textContent;
        option.onclick = function(event){
          event.stopPropagation();
          selectMotor(option, motor);
        };
        menu.appendChild(option);
      });
    }

    function selectMotor(el, motor){
      const wrapper = el.closest('[data-motor-section]');
      if(!wrapper) return;

      const card = wrapper.closest('.card');
      window.wincoDependencies.fillMotor(card, motor);
      window.wincoDependencies.renderOptions(card);
      if(card && card.querySelector('.window-head')){
        try {
          const dims = card.querySelectorAll('.dimension-field');
          const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
          updateWindowCardPricing(card, sqft);
        } catch (err) {
          console.error('measure motor pricing update error', err);
        }
      }
    }

    function toggleControlTypeMenu(el){
      const wrapper = el.parentElement;
      const menu = wrapper.querySelector('[data-control-type-menu]');
      if(menu){
        closeOtherDropdownMenus(menu);
        renderControlTypeMenu(wrapper);
        menu.classList.toggle('hidden');
      }
    }

    function getSelectedHeadrailCode(card){return window.wincoDependencies.readProductState(card).headrail;}

    function getControlTypeItems(card){
 const rules=window.wincoDependencies,state=rules.readProductState(card);
 const choices=[];
 const manual=window.wincoProductCatalog?.manualChoices();
 if(manual){manual.forEach(item=>{if(rules.allowedValue(state,'control',item.canonicalCode))choices.push(item.canonicalCode==='CH'?'Chain / Manual':item.canonicalCode);});}
 else if(rules.allowedValue(state,'control','CH'))choices.push('Chain / Manual');
 if(getCordlessTypeItems(card).length)choices.push('Cordless');
 if(rules.allowedValue(state,'control','Motorized'))choices.push('Motorized');
 return choices;
}

    function renderControlTypeMenu(wrapper){
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-control-type-menu]');
      if(!menu) return;

      const card = wrapper.closest('.card');
      const items = getControlTypeItems(card);

      menu.innerHTML = '';

      items.forEach((controlType) => {
        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = controlType;
        option.onclick = function(event){
          event.stopPropagation();
          selectControlType(option, controlType);
        };
        menu.appendChild(option);
      });
    }

    function setChainManualSections(card, isVisible){
      if(!card) return;

      const lengthSection = card.querySelector('[data-chain-length-section]');
      const optionSection = card.querySelector('[data-chain-option-section]');

      if(lengthSection) lengthSection.classList.toggle('hidden', !isVisible);
      if(optionSection) optionSection.classList.toggle('hidden', !isVisible);

      if(!isVisible){
        const lengthInput = lengthSection ? lengthSection.querySelector('.length-input') : null;
        const lengthPrefix = lengthSection ? lengthSection.querySelector('[data-length-prefix]') : null;
        const lengthField = lengthSection ? lengthSection.querySelector('.length-field') : null;

        if(lengthInput) lengthInput.value = '';
        if(lengthPrefix) lengthPrefix.classList.add('hidden');
        if(lengthField) lengthField.classList.remove('has-prefix');

        if(optionSection){
          optionSection.querySelectorAll('.check').forEach((check) => {
            check.classList.remove('checked');
          });
        }
      }
    }

    function setCordlessSections(card,isVisible){
 if(!card)return;
 const side=card.querySelector('[data-ctrl-side-section]'),type=card.querySelector('[data-cordless-type-section]'),options=card.querySelector('[data-cordless-option-section]');
 side?.classList.toggle('hidden',isVisible);type?.classList.toggle('hidden',!isVisible);options?.classList.toggle('hidden',!isVisible);
 if(isVisible){const display=side?.querySelector('.field span');if(display){display.textContent='L/R';display.classList.add('placeholder');delete display.dataset.singleControlSide;}}
 if(!isVisible&&type){const display=type.querySelector('.field span');if(display){display.textContent='Select Type';display.classList.add('placeholder');delete display.dataset.cordlessTypeCode;delete display.dataset.cordlessTypePrice;delete display.dataset.cordlessPricingId;}type.querySelector('.client-menu')?.classList.add('hidden');}
}

    function setMotorizedSections(card, isVisible){
      if(!card) return;

      const ctrlSideSection = card.querySelector('[data-ctrl-side-section]');
      const motorSection = card.querySelector('[data-motor-section]');

      if(ctrlSideSection && !card.querySelector('[data-cordless-type-section]:not(.hidden)')){
        ctrlSideSection.classList.toggle('hidden', false);
      }

      if(motorSection) motorSection.classList.toggle('hidden', !isVisible);

      if(!isVisible && motorSection){
        const fieldText = motorSection.querySelector('.field span');
        const menu = motorSection.querySelector('[data-motor-menu]');

        if(fieldText){
          fieldText.textContent = 'Select Motor';
          fieldText.title = '';
          fieldText.classList.add('placeholder');
          delete fieldText.dataset.motorId;
          delete fieldText.dataset.motorPricingId;
          delete fieldText.dataset.motorCode;
          delete fieldText.dataset.motorName;
          delete fieldText.dataset.motorPricingType;
          delete fieldText.dataset.motorVisibility;
        }

        if(menu) menu.classList.add('hidden');
      }
    }

    function setControlFillerVisibility(card, isDetailsVisible){
      if(!card) return;

      const filler = card.querySelector('[data-control-filler]');
      if(filler) filler.classList.toggle('hidden', isDetailsVisible);
    }

    function renderControlTypeDetails(card, controlType){
      controlType=window.wincoDependencies.controlFamily(window.wincoDependencies.normalizeControl(controlType));
      const isChainManual = controlType === 'Chain / Manual';
      const isCordless = controlType === 'Cordless';
      const isMotorized = controlType === 'Motorized';

      setChainManualSections(card, isChainManual);
      setCordlessSections(card, isCordless);
      setMotorizedSections(card, isMotorized);
      setControlFillerVisibility(card, isChainManual || isCordless || isMotorized);
      renderGeneralOptionAndMemo(card, controlType);
      window.wincoConfiguration.syncControlSide(card);

      if(isCordless && typeof refreshCordlessTypeMenusForGroup === 'function'){
        refreshCordlessTypeMenusForGroup(card);
      }
    }

    function shouldShowBottomBarBrush(card){return ['ES','NB'].includes(window.wincoDependencies.readProductState(card).bottomrail);}

    function renderGeneralOptionAndMemo(card){
 if(!card)return;
 const memo=card.querySelector('[data-memo-box]');
 if(memo&&!memo.querySelector('[data-memo-input]'))memo.innerHTML='<input data-memo-input type="text" style="width:100%;min-width:0;border:none;outline:none;background:transparent;font:inherit;color:inherit;" />';
 window.wincoDependencies.renderOptions(card,true);
}

    function resetControlTypeSelection(wrapper){
      if(!wrapper) return;

      const fieldText = wrapper.querySelector('.field span');
      const menu = wrapper.querySelector('[data-control-type-menu]');
      const card = wrapper.closest('.card');

      if(fieldText){
        fieldText.textContent = 'Select control type';
        fieldText.classList.add('placeholder');
      }

      renderControlTypeDetails(card, '');

      if(menu) menu.classList.add('hidden');
    }

    function refreshControlTypeMenusForGroup(scope = document){
      (scope.matches?.('.card') ? [scope] : scope.querySelectorAll('.card')).forEach((card) => {
        if(!card.querySelector('.window-head')) return;

        const controlLabel = Array.from(card.querySelectorAll('.field-label')).find((label) => label.textContent.trim() === 'Control Type');
        const controlWrapper = controlLabel ? controlLabel.closest('.col-3') : null;
        if(!controlWrapper) return;

        const fieldText = controlWrapper.querySelector('.field span');
        if(fieldText && !fieldText.classList.contains('placeholder')){
          const selectedValue = fieldText.textContent.trim();
          const available = getControlTypeItems(card).includes(selectedValue);

          if(!available&&!window.wincoDependencies?.configuredProductRules?.()){
            resetControlTypeSelection(controlWrapper);
          } else {
            renderControlTypeDetails(card, selectedValue);
          }
        }

        const menu = controlWrapper.querySelector('[data-control-type-menu]');
        if(menu && !menu.classList.contains('hidden')){
          renderControlTypeMenu(controlWrapper);
        }
      });
    }

    function selectControlType(el, controlType){
      const wrapper = el.closest('.col-3');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-control-type-menu]');
      const fieldText = wrapper.querySelector('.field span');
      const card = wrapper.closest('.card');

      if(fieldText){
        fieldText.textContent = controlType;
        fieldText.dataset.controlFamily=window.wincoDependencies.controlFamily(window.wincoDependencies.normalizeControl(controlType));
        fieldText.classList.remove('placeholder');
      }

      renderControlTypeDetails(card, controlType);

      if(card){delete card.dataset.savedOptionAmount;window.wincoDependencies.reconcile(card,'control');}

      if(card && card.querySelector('.window-head')){
        try {
          const dims = card.querySelectorAll('.dimension-field');
          const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
          updateWindowCardPricing(card, sqft);
        } catch (err) {
          console.error('measure control option pricing update error', err);
        }
      }

      if(menu) menu.classList.add('hidden');
    }

    function toggleLocationMenu(el){
      const wrapper = el.parentElement;
      const menu = wrapper.querySelector('.client-menu');
      if(menu) menu.classList.toggle('hidden');
    }

    function selectLocation(el, value){
      const wrapper = el.closest('.col-1');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      const field = wrapper.querySelector('.field');
      const windowCard = el.closest('.card');
      const windowIndex = windowCard ? Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head')).indexOf(windowCard) + 1 : null;

      if(value === 'custom'){
        field.innerHTML = '<input data-location-input type="text" placeholder="Floor" onclick="event.stopPropagation()" oninput="updateWindowTitleMeta(' + (windowIndex || 1) + ')" />';
        const input = field.querySelector('[data-location-input]');
        if(input){
          input.focus();
          input.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') input.blur();
          });
        }
      } else {
        field.innerHTML = '<span></span>';
        field.querySelector('span').textContent = value;
      }

      if(menu) menu.classList.add('hidden');
      if(windowIndex){
        updateWindowTitleMeta(windowIndex);
      }
    }

    function toggleRailColorMenu(el, evt){
      const e = evt || window.event;
      if(e) e.stopPropagation();

      const wrapper = el.closest('.col-3');
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-rail-color-menu]');
      if(!menu) return;

      closeOtherDropdownMenus(menu);
      renderRailColorMenu(wrapper);
      menu.classList.toggle('hidden');
    }

    function getSelectedHardwareIdForRailWrapper(wrapper){
      if(!wrapper) return '';

      const hardwareItems = Array.isArray(window.measureHardwareItems) ? window.measureHardwareItems : [];

      const headrailDisplay = wrapper.querySelector('[data-headrail-display]');
      if(headrailDisplay && !headrailDisplay.classList.contains('placeholder')){
        const savedId = String(headrailDisplay.dataset.headrailId || '').trim();
        if(savedId) return savedId;

        const selectedCode = String(headrailDisplay.dataset.headrailCode || headrailDisplay.textContent || '').trim();
        const matchedItem = hardwareItems.find((item) =>
          String(item.product_group || '').trim().toLowerCase() === 'headrail' &&
          String(item.code || '').trim() === selectedCode
        );

        return matchedItem ? String(matchedItem.id || '').trim() : '';
      }

      const bottomrailDisplay = wrapper.querySelector('[data-bottomrail-display]');
      if(bottomrailDisplay && !bottomrailDisplay.classList.contains('placeholder')){
        const savedId = String(bottomrailDisplay.dataset.bottomrailId || '').trim();
        if(savedId) return savedId;

        const selectedCode = String(bottomrailDisplay.dataset.bottomrailCode || bottomrailDisplay.textContent || '').trim();
        const matchedItem = hardwareItems.find((item) =>
          String(item.product_group || '').trim().toLowerCase() === 'bottom rail' &&
          String(item.code || '').trim() === selectedCode
        );

        return matchedItem ? String(matchedItem.id || '').trim() : '';
      }

      return '';
    }

    function formatRailColorLabel(color){
      const code = String(color.color_code || '').trim();
      const description = String(color.color_description || '').trim();

      if(code && description) return code + '   ' + description;
      return code || description || 'Unnamed color';
    }

    function getRailColorItems(wrapper){
 const id=getSelectedHardwareIdForRailWrapper(wrapper),card=wrapper?.closest('.card');
 if(!id||!card)return [];
 const rules=window.wincoDependencies,key=wrapper.querySelector('[data-headrail-display]')?'headrailColor':'bottomrailColor';
 const state=rules.readProductState(card);
 return (window.measureHardwareColors||[]).filter(color=>String(color.hardware_id)===id&&rules.allowedValue(state,key,String(color.color_code)))
 .sort((a,b)=>String(a.color_code).localeCompare(String(b.color_code)));
}

    function resetInvalidRailColorForWrapper(wrapper){
      if(!wrapper || window.measureHardwareCatalogState !== 'ready' || window.measureHardwareColorsState !== 'ready') return;

      const colorSegs = Array.from(wrapper.querySelectorAll('.rail-seg.clickable')).filter((seg) =>
        !seg.hasAttribute('data-headrail-display') &&
        !seg.hasAttribute('data-bottomrail-display')
      );
      const colorSeg = colorSegs[colorSegs.length - 1];

      if(!colorSeg || colorSeg.classList.contains('placeholder')) return;

      const selectedCode = String(colorSeg.dataset.railColorCode || colorSeg.textContent || '').trim();
      const available = getRailColorItems(wrapper).some((color) => String(color.color_code || '').trim() === selectedCode);

      if(!available){
        colorSeg.textContent = 'Color';
        colorSeg.title = '';
        colorSeg.classList.add('placeholder');
        delete colorSeg.dataset.railColorId;
        delete colorSeg.dataset.railColorCode;
        delete colorSeg.dataset.railColorDescription;
        delete colorSeg.dataset.railColorVisibility;

        const colorMenu = wrapper.querySelector('[data-rail-color-menu]');
        if(colorMenu) colorMenu.classList.add('hidden');
      }
    }


    function renderRailColorMenu(wrapper){
      if(!wrapper) return;

      const menu = wrapper.querySelector('[data-rail-color-menu]');
      if(!menu) return;

      const selectedHardwareId = getSelectedHardwareIdForRailWrapper(wrapper);
      const colors = getRailColorItems(wrapper);

      menu.innerHTML = '';

      if(!selectedHardwareId){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'Select rail first';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      if(!colors.length){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'No colors';
        emptyOption.style.cursor = 'default';
        menu.appendChild(emptyOption);
        return;
      }

      colors.forEach((color) => {
        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = formatRailColorLabel(color);
        option.title = option.textContent;
        option.onclick = function(event){
          event.stopPropagation();
          selectRailColor(option, color);
        };
        menu.appendChild(option);
      });
    }

    function selectRailColor(el, color){
      const wrapper = el.closest('.col-3');
      if(!wrapper) return;

      const menu = el.closest('.client-menu');
      const colorSegs = Array.from(wrapper.querySelectorAll('.rail-seg.clickable')).filter((seg) =>
        !seg.hasAttribute('data-headrail-display') &&
        !seg.hasAttribute('data-bottomrail-display')
      );
      const colorSeg = colorSegs[colorSegs.length - 1];

      const code = String(color.color_code || '').trim();

      if(colorSeg){
        colorSeg.textContent = code;
        colorSeg.title = formatRailColorLabel(color);
        colorSeg.classList.remove('placeholder');
        colorSeg.dataset.railColorId = color.id || '';
        colorSeg.dataset.railColorCode = code;
        colorSeg.dataset.railColorDescription = color.color_description || '';
        colorSeg.dataset.railColorVisibility = color.visibility || '';
      }

      if(menu) menu.classList.add('hidden');
      renderReviewTableRows();
    }

    function toggleMountTypeMenu(el){
      const wrapper = el.closest('.col-1');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      if(menu) menu.classList.toggle('hidden');
    }

    function renderMountTypeValue(wrapper, value = '', isCustom = false){
      const valueBox = wrapper.querySelector('[data-mount-type-value]');
      if(!valueBox) return;

      if(isCustom){
        valueBox.innerHTML = '<input data-mount-type-input type="text" placeholder="Custom" />';
        const input = valueBox.querySelector('[data-mount-type-input]');
        if(input){
          input.focus();
          input.addEventListener('click', (event) => {
            event.stopPropagation();
          });
          input.addEventListener('keydown', (event) => {
            if(event.key === 'Enter'){
              input.blur();
            }
          });
        }
        return;
      }

      if(!value){
        valueBox.innerHTML = '<span data-mount-type-display class="placeholder">Select</span>';
        return;
      }

      valueBox.innerHTML = '<span data-mount-type-display></span>';
      valueBox.querySelector('[data-mount-type-display]').textContent = value;
    }

    function toggleConfigMenu(el){
      const menu = el.parentElement.querySelector('.client-menu');
      if(menu){ closeOtherDropdownMenus(menu); menu.classList.toggle('hidden'); }
    }

    function selectConfig(el, value){
      window.wincoConfiguration.select(el, value);
    }

    function getCardWidthMm(card){
      if(!card) return null;
      const widthField = card.querySelector('.dimension-field[data-dimension="w"]');
      if(!widthField) return null;
      return getMmValue(widthField);
    }

    function clearSplitAutoState(card){
      window.wincoSplits.clear(card);
    }

    function syncSplitAutoForCard(card){
      if(card) window.wincoSplits.sync(card,getCardWidthMm(card));
    }

    function selectMountType(el, value){
      const wrapper = el.closest('.col-1');
      if(!wrapper) return;

      const selectedCard = wrapper.closest('.card');
      if(selectedCard && selectedCard.dataset.savedSurchargeAmount !== undefined){
        delete selectedCard.dataset.savedSurchargeAmount;
      }
      const menu = wrapper.querySelector('.client-menu');

      if(value === 'custom'){
        renderMountTypeValue(wrapper, '', true);
      } else {
        renderMountTypeValue(wrapper, value, false);
      }

      if(menu) menu.classList.add('hidden');

      const card = wrapper.closest('.card');

      if(card && (value === 'FF' || value === 'FW' || value === 'FD')){
        const memoBox = card.querySelector('[data-memo-box]');
        if(memoBox){
          let memoInput = memoBox.querySelector('[data-memo-input]');

          if(!memoInput){
            memoBox.innerHTML = '<input data-memo-input type="text" style="width:100%; min-width:0; border:none; outline:none; background:transparent; font:inherit; color:inherit;" />';
            memoInput = memoBox.querySelector('[data-memo-input]');
          }

          if(memoInput){
            const memo = String(memoInput.value || '');
            const prompt = 'Frame size (W x H) :';
            if(!memo.includes(prompt)){
              memoInput.value = memo.trim() ? prompt + ' | ' + memo : prompt;
            } else {
              const blocks = memo.split(' | ');
              const frameBlock = blocks[blocks.length - 1];
              if(blocks.length > 1 && frameBlock.startsWith(prompt) && memo.indexOf(prompt) === memo.length - frameBlock.length){
                blocks.pop();
                memoInput.value = frameBlock + ' | ' + blocks.join(' | ');
              }
            }
          }
        }
      }

      if(card && card.querySelector('.window-head')){
        try {
          const dims = card.querySelectorAll('.dimension-field');
          const sqft = dims.length >= 2 ? calculateCeilingSqftFromMm(getMmValue(dims[0]), getMmValue(dims[1])) : 0;
          updateWindowCardPricing(card, sqft);
        } catch (err) {
          console.error('measure mount option pricing update error', err);
        }
      }
    }

    function gcd(a, b){
      return b ? gcd(b, a % b) : a;
    }

    function simplify(n, d){
      if(n === 0) return '';
      const g = gcd(n, d);
      return \`\${n / g}/\${d / g}\`;
    }

    function buildFractionOptions(){
      let opts = '<option value="">—</option>';
      for(let i = 1; i <= 31; i += 1){
        opts += \`<option value="\${i}">\${simplify(i, 32)}</option>\`;
      }
      return opts;
    }

    function buildInchOptions(){
      let html = '';
      for(let i = 0; i <= 11; i += 1){
        html += \`<option value="\${i}">\${i}</option>\`;
      }
      return html;
    }

    function inches32ToMmValue(total32){
      return (total32 / 32) * 25.4;
    }

    function mmToExact32(mm){
      const value = parseFloat(mm);
      if(!Number.isFinite(value) || value <= 0) return null;
      return Math.round((value / 25.4) * 32);
    }

    function formatMmValue(mm){
      if(mm === null || mm === undefined) return '';
      return window.wincoFormatReviewDimension(mm);
    }

    function decompose32(total32){
      const safe = Math.max(0, Math.floor(total32 || 0));
      return {
        whole: Math.floor(safe / 32),
        frac32: safe % 32,
      };
    }

    function decompose32Ft(total32){
      const safe = Math.max(0, Math.floor(total32 || 0));
      const feet = Math.floor(safe / (12 * 32));
      const rem = safe - feet * 12 * 32;
      return {
        feet,
        inches: Math.floor(rem / 32),
        frac32: rem % 32,
      };
    }

    function getMmValue(field){
      const raw = field.dataset.mmValue;
      if(raw === undefined || raw === '') return null;
      const value = parseFloat(raw);
      return Number.isFinite(value) && value >= 0 ? value : null;
    }

    function setMmValue(field, mm){
      if(mm === null || mm === undefined || mm === ''){
        delete field.dataset.mmValue;
        return;
      }
      const numeric = Number(mm);
      if(!Number.isFinite(numeric) || numeric < 0){
        delete field.dataset.mmValue;
        return;
      }
      field.dataset.mmValue = String(numeric);
    }

    function renderDimensionFields(unit){
      const fracOpts = buildFractionOptions();
      const inchOpts = buildInchOptions();

      document.querySelectorAll('.dimension-field').forEach((field) => {
        const mmValue = getMmValue(field);
        const hasVal = mmValue !== null;
        const exact32 = hasVal ? mmToExact32(mmValue) : null;

        if(unit === 'mm'){
          field.innerHTML = \`
            <div class="dimension-split mm">
              <div class="dimension-segment">
                <input class="dimension-control" data-role="mm" type="number" step="0.1" value="\${hasVal ? formatMmValue(mmValue) : ''}" />
              </div>
            </div>\`;
          return;
        }

        if(unit === 'inch'){
          const parts = decompose32(hasVal ? exact32 : 0);
          field.innerHTML = \`
            <div class="dimension-split inch">
              <div class="dimension-segment">
                <input class="dimension-control" data-role="inch-whole" type="number" step="1" value="\${hasVal ? parts.whole : ''}" />
              </div>
              <div class="dimension-segment">
                <select class="dimension-control select" data-role="inch-fraction">\${fracOpts}</select>
              </div>
            </div>\`;
          const sel = field.querySelector('[data-role="inch-fraction"]');
          if(sel && hasVal){
            sel.value = parts.frac32 ? String(parts.frac32) : '';
          }
          return;
        }

        const parts = decompose32Ft(hasVal ? exact32 : 0);
        field.innerHTML = \`
          <div class="dimension-split ft-inch">
            <div class="dimension-segment">
              <input class="dimension-control" data-role="ft" type="number" step="1" value="\${hasVal ? parts.feet : ''}" />
            </div>
            <div class="dimension-segment">
              <select class="dimension-control select" data-role="ft-inch-whole">\${inchOpts}</select>
            </div>
            <div class="dimension-segment">
              <select class="dimension-control select" data-role="ft-inch-fraction">\${fracOpts}</select>
            </div>
          </div>\`;

        const inchSel = field.querySelector('[data-role="ft-inch-whole"]');
        const fracSel = field.querySelector('[data-role="ft-inch-fraction"]');
        if(inchSel && hasVal){
          inchSel.value = String(parts.inches);
        }
        if(fracSel && hasVal){
          fracSel.value = parts.frac32 ? String(parts.frac32) : '';
        }
      });
    }

    function updateFieldMmFromControls(field){
      const unit = document.getElementById('unitLabel').textContent.trim();

      if(unit === 'mm'){
        const raw = field.querySelector('[data-role="mm"]')?.value ?? '';
        if(raw.trim() === ''){
          setMmValue(field, null);
          updateAllWindowSqft();
          if(field.dataset.dimension === 'w'){
            syncSplitAutoForCard(field.closest('.card'));
          }
          return;
        }
        setMmValue(field, parseFloat(raw));
        updateAllWindowSqft();
        if(field.dataset.dimension === 'w'){
          syncSplitAutoForCard(field.closest('.card'));
        }
        return;
      }

      if(unit === 'inch'){
        const wholeRaw = field.querySelector('[data-role="inch-whole"]')?.value ?? '';
        const fracRaw = field.querySelector('[data-role="inch-fraction"]')?.value ?? '';
        if(wholeRaw.trim() === '' && fracRaw === ''){
          setMmValue(field, null);
          updateAllWindowSqft();
          if(field.dataset.dimension === 'w'){
            syncSplitAutoForCard(field.closest('.card'));
          }
          return;
        }
        const whole = parseInt(wholeRaw || '0', 10);
        const frac32 = parseInt(fracRaw || '0', 10);
        const total32 = Math.max(0, (whole || 0) * 32 + (frac32 || 0));
        setMmValue(field, inches32ToMmValue(total32));
        updateAllWindowSqft();
        if(field.dataset.dimension === 'w'){
          syncSplitAutoForCard(field.closest('.card'));
        }
        return;
      }

      const feetRaw = field.querySelector('[data-role="ft"]')?.value ?? '';
      const inchRaw = field.querySelector('[data-role="ft-inch-whole"]')?.value ?? '0';
      const fracRaw = field.querySelector('[data-role="ft-inch-fraction"]')?.value ?? '';
      if(feetRaw.trim() === '' && inchRaw === '0' && fracRaw === ''){
        setMmValue(field, null);
        updateAllWindowSqft();
        if(field.dataset.dimension === 'w'){
          syncSplitAutoForCard(field.closest('.card'));
        }
        return;
      }
      const feet = parseInt(feetRaw || '0', 10);
      const inchesWhole = parseInt(inchRaw || '0', 10);
      const frac32 = parseInt(fracRaw || '0', 10);
      const total32 = Math.max(0, (feet || 0) * 12 * 32 + (inchesWhole || 0) * 32 + (frac32 || 0));
      setMmValue(field, inches32ToMmValue(total32));
      updateAllWindowSqft();
      if(field.dataset.dimension === 'w'){
        syncSplitAutoForCard(field.closest('.card'));
      }
    }

    function selectUnit(unit){
      const label = document.getElementById('unitLabel');
      if(label){
        label.textContent = unit;
      }

      document.querySelectorAll('.field-label').forEach((l) => {
        if(l.textContent.startsWith('W (')) l.textContent = \`W (\${unit})\`;
        if(l.textContent.startsWith('H (')) l.textContent = \`H (\${unit})\`;
      });

      renderDimensionFields(unit);
      updateAllWindowSqft();
      const menu = document.getElementById('unitMenu');
      if(menu){
        menu.classList.add('hidden');
      }
    }

    function toggleUnitMenu(){
      const menu = document.getElementById('unitMenu');
      if(menu){
        menu.classList.toggle('hidden');
      }
    }

    function getWindowFloorValue(index){
      const cards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));
      const card = cards[index - 1];
      if(!card) return '';
      const field = card.querySelector('.col-1 .field');
      if(!field) return '';
      const input = field.querySelector('[data-location-input]');
      if(input) return input.value.trim();
      const span = field.querySelector('span');
      if(!span) return '';
      return span.classList.contains('placeholder') ? '' : span.textContent.trim();
    }

    function reindexWindowCards({refresh = true} = {}){
      const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));

      windowCards.forEach((card, index) => {
        const newIndex = index + 1;
        const labelEl = card.querySelector('[data-window-label]');
        const metaEl = card.querySelector('[data-window-meta]');
        const sidemarkInput = card.querySelector('[data-sidemark-input]');
        const sqftEl = card.querySelector('[data-window-sqft]');

        if(labelEl) labelEl.textContent = \`Window #\${newIndex}\`;
        if(metaEl) metaEl.setAttribute('data-window-meta', String(newIndex));
        if(sidemarkInput){
          sidemarkInput.setAttribute('data-sidemark-input', String(newIndex));
          sidemarkInput.setAttribute('oninput', \`updateWindowTitleMeta(\${newIndex})\`);
        }
        if(sqftEl) sqftEl.setAttribute('data-window-sqft', String(newIndex));
      });

      windowCards.forEach((_, index) => updateWindowTitleMeta(index + 1, false));
      if(refresh) updateAllWindowSqft();
    }

    function updateWindowCardActionButtons(){
      const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));

      windowCards.forEach((card) => {
        const buttons = card.querySelectorAll('.window-footer .buttons .btn');
        const duplicateBtn = buttons[0];
        const deleteBtn = buttons[1];
        const canDelete = true;

        if(duplicateBtn){
          duplicateBtn.disabled = false;
          duplicateBtn.style.opacity = '1';
          duplicateBtn.style.cursor = 'pointer';
        }

        if(deleteBtn){
          deleteBtn.disabled = !canDelete;
          deleteBtn.style.opacity = canDelete ? '1' : '0.45';
          deleteBtn.style.cursor = canDelete ? 'pointer' : 'not-allowed';
        }
      });
      updateWindowRemovalControls(windowCards.length);
    }

    function updateWindowRemovalControls(count){
      const actions=document.querySelector('.measure-page .actions');
      const meta=document.querySelector('.measure-page .meta-right');
      if(!actions || !meta)return;
      let controls=meta.querySelector('.measure-clear-controls');
      if(!controls){
        controls=document.createElement('div');
        controls.className='measure-clear-controls';
        meta.append(controls);
      }
      // Saved drafts may still contain the retired All Clear button.
      document.querySelectorAll('.measure-page [data-measure-clear-all]').forEach(button=>button.remove());
      const oldUndo=actions.querySelector('[data-measure-window-undo]');
      if(oldUndo)controls.append(oldUndo);
      if(!controls.querySelector('[data-measure-window-undo]')){
        controls.insertAdjacentHTML('beforeend','<span class="measure-window-undo hidden" data-measure-window-undo><span role="status" data-measure-window-undo-message></span><button type="button" class="btn" onclick="undoWindowRemoval()">Undo</button></span>');
      }
      let empty=document.querySelector('[data-measure-empty-windows]');
      if(!empty){empty=document.createElement('div');empty.className='measure-empty-windows hidden';empty.setAttribute('data-measure-empty-windows','');empty.textContent='No windows yet. Use Add Row to start measuring.';actions.before(empty);}
      empty.classList.toggle('hidden',count>0);
      const bulk=actions.querySelector('[data-measure-bulk-edit]');if(bulk)bulk.disabled=count===0;
      const latest=window.measureWindowHistory?.latest;
      controls.classList.toggle('hidden',!latest);
      controls.querySelector('[data-measure-window-undo]').classList.toggle('hidden',!latest);
      controls.querySelector('[data-measure-window-undo-message]').textContent=latest?(latest.kind==='clear'?'Cleared ':'Deleted ')+latest.count+' '+(latest.count===1?'window.':'windows.'):'';
    }

    function finishWindowRemoval(){
      reindexWindowCards();
      updateWindowCardActionButtons();
      renderReviewTableRows();
      document.querySelector('.measure-page')?.dispatchEvent(new Event('input',{bubbles:true}));
    }

    function undoWindowRemoval(){
      if(!window.measureWindowHistory?.undo())return;
      const unit=document.getElementById('unitLabel')?.textContent.trim()||'ft+inch';
      renderDimensionFields(unit);
      finishWindowRemoval();
    }

    function copyWindowFormState(sourceCard, cloneCard){
      if(!sourceCard || !cloneCard) return;

      const sourceInputs = Array.from(sourceCard.querySelectorAll('input, textarea, select'));
      const cloneInputs = Array.from(cloneCard.querySelectorAll('input, textarea, select'));

      sourceInputs.forEach((sourceInput, index) => {
        const cloneInput = cloneInputs[index];
        if(!cloneInput) return;

        if(sourceInput.type === 'checkbox' || sourceInput.type === 'radio'){
          cloneInput.checked = sourceInput.checked;
        } else {
          cloneInput.value = sourceInput.value;
        }
      });
    }

    function clearDuplicatedSidemark(clone){
      if(!clone) return;

      clone.querySelectorAll('[data-sidemark-input]').forEach((input) => {
        input.value = '';
        input.setAttribute('value', '');
      });

      clone.querySelectorAll('[data-window-meta]').forEach((metaEl) => {
        metaEl.innerHTML = '';
      });

    }

    function clearElementDataset(el, preserveKeys){
      if(!el || !el.dataset) return;

      const keep = Array.isArray(preserveKeys) ? preserveKeys : [];

      Object.keys(el.dataset).forEach(function(key){
        if(!keep.includes(key)){
          delete el.dataset[key];
        }
      });
    }

    function resetFieldDisplay(fieldText, value, usePlaceholder){
      if(!fieldText) return;

      fieldText.textContent = value;
      fieldText.title = '';

      if(usePlaceholder){
        fieldText.classList.add('placeholder');
      } else {
        fieldText.classList.remove('placeholder');
      }

      clearElementDataset(fieldText);
    }

    function resetSegmentDisplay(seg, value){
      if(!seg) return;

      seg.textContent = value;
      seg.title = '';
      seg.classList.add('placeholder');

      const preserveKeys = [];

      if(seg.hasAttribute('data-fabric-display')) preserveKeys.push('fabricDisplay');
      if(seg.hasAttribute('data-fabric-color-display')) preserveKeys.push('fabricColorDisplay');
      if(seg.hasAttribute('data-headrail-display')) preserveKeys.push('headrailDisplay');
      if(seg.hasAttribute('data-bottomrail-display')) preserveKeys.push('bottomrailDisplay');

      clearElementDataset(seg, preserveKeys);
    }

    function resetSplitRowToDefault(card){
      if(card) window.wincoConfiguration.restore(card, {config:'Single',splits:[]});
    }

    function resetControlTypeArea(card){
      if(!card) return;

      const controlLabel = Array.from(card.querySelectorAll('.field-label')).find(function(label){
        return label.textContent.trim() === 'Control Type';
      });
      const controlWrapper = controlLabel ? controlLabel.closest('.col-3') : null;
      const controlText = controlWrapper ? controlWrapper.querySelector('.field span') : null;

      resetFieldDisplay(controlText, 'Select control type', true);

      if(typeof renderControlTypeDetails === 'function'){
        renderControlTypeDetails(card, '');
      }

      const ctrlSideSection = card.querySelector('[data-ctrl-side-section]');
      if(ctrlSideSection){
        ctrlSideSection.classList.remove('hidden');
        resetFieldDisplay(ctrlSideSection.querySelector('.field span'), 'L/R', true);
      }

      const motorSection = card.querySelector('[data-motor-section]');
      if(motorSection){
        motorSection.classList.add('hidden');
        resetFieldDisplay(motorSection.querySelector('.field span'), 'Select Motor', true);
      }

      const cordlessTypeSection = card.querySelector('[data-cordless-type-section]');
      if(cordlessTypeSection){
        cordlessTypeSection.classList.add('hidden');
        resetFieldDisplay(cordlessTypeSection.querySelector('.field span'), 'Select Type', true);
      }

      const cordlessOptionSection = card.querySelector('[data-cordless-option-section]');
      if(cordlessOptionSection){
        cordlessOptionSection.classList.add('hidden');
      }

      const chainLengthSection = card.querySelector('[data-chain-length-section]');
      if(chainLengthSection){
        chainLengthSection.classList.add('hidden');
        const lengthInput = chainLengthSection.querySelector('.length-input');
        const lengthPrefix = chainLengthSection.querySelector('[data-length-prefix]');
        const lengthField = chainLengthSection.querySelector('.length-field');

        if(lengthInput) lengthInput.value = '';
        if(lengthPrefix) lengthPrefix.classList.add('hidden');
        if(lengthField) lengthField.classList.remove('has-prefix');
      }

      const chainOptionSection = card.querySelector('[data-chain-option-section]');
      if(chainOptionSection){
        chainOptionSection.classList.add('hidden');
      }

      const filler = card.querySelector('[data-control-filler]');
      if(filler){
        filler.classList.remove('hidden');
      }
    }

    function resetWindowCardToDefault(card){
      if(!card) return;
      delete card.dataset.channelChargeCategory;
      card.querySelector('[data-duo-fabric-b]')?.remove();
      card.querySelectorAll('[data-charge-quantity]').forEach(el=>el.remove());
      delete card.dataset.chargeQuantities;

      delete card.dataset.savedOptionAmount;
      delete card.dataset.savedSurchargeAmount;
      for(const key of ['savedSectionPricing','savedMotorAmount','optionPriceSelection','surchargePriceSelection','motorPriceSelection'])delete card.dataset[key];

      card.querySelectorAll('.client-menu').forEach(function(menu){
        menu.classList.add('hidden');
      });

      card.querySelectorAll('input').forEach(function(input){
        if(input.type === 'checkbox' || input.type === 'radio'){
          input.checked = false;
        } else {
          input.value = '';
          input.setAttribute('value', '');
        }

        input.classList.remove('split-input-auto');
        delete input.dataset.autoFilled;
        delete input.dataset.forceAuto;
      });

      card.querySelectorAll('textarea').forEach(function(textarea){
        textarea.value = '';
      });

      card.querySelectorAll('.check').forEach(function(check){
        check.classList.remove('checked');
      });

      const includeButton = card.querySelector('.window-head .check');
      if(includeButton){
        includeButton.classList.add('checked');
      }

      const locationLabel = Array.from(card.querySelectorAll('.field-label')).find(function(label){
        return label.textContent.trim() === 'Location';
      });
      const locationWrapper = locationLabel ? locationLabel.closest('.col-1') : null;
      const locationField = locationWrapper ? locationWrapper.querySelector('.field') : null;
      if(locationField){
        locationField.innerHTML = '<span class="placeholder">Floor</span>';
      }

      const roomWrapper = card.querySelector('.room-type-combo') ? card.querySelector('.room-type-combo').closest('.col-3') : null;
      if(roomWrapper && typeof renderRoomValue === 'function'){
        renderRoomValue(roomWrapper, '', false);
      }

      const sidemarkInput = card.querySelector('[data-sidemark-input]');
      if(sidemarkInput){
        sidemarkInput.value = '';
        sidemarkInput.setAttribute('value', '');
      }

      card.querySelectorAll('.dimension-field').forEach(function(field){
        delete field.dataset.mmValue;
        field.setAttribute('data-mm-value', '');
        field.innerHTML = '';
      });

      const mountWrapper = card.querySelector('[data-mount-type-wrapper]') ? card.querySelector('[data-mount-type-wrapper]').closest('.col-1') : null;
      if(mountWrapper && typeof renderMountTypeValue === 'function'){
        renderMountTypeValue(mountWrapper, '', false);
      }

      resetSplitRowToDefault(card);

      const groupLabel = Array.from(card.querySelectorAll('.field-label')).find(function(label){
        return label.textContent.trim() === 'Group';
      });
      const groupWrapper = groupLabel ? groupLabel.closest('.col-1') : null;
      const groupText = groupWrapper ? groupWrapper.querySelector('.field span') : null;
      resetFieldDisplay(groupText, 'Shade', true);

      resetSegmentDisplay(card.querySelector('[data-fabric-display]'), 'Fabric');
      resetSegmentDisplay(card.querySelector('[data-fabric-color-display]'), 'Color');
      resetSegmentDisplay(card.querySelector('[data-headrail-display]'), 'Head rail');
      resetSegmentDisplay(card.querySelector('[data-bottomrail-display]'), 'Bottom rail');

      card.querySelectorAll('.rail-combo').forEach(function(combo){
        const colorSegs = Array.from(combo.querySelectorAll('.rail-seg.clickable')).filter(function(seg){
          return !seg.hasAttribute('data-headrail-display') && !seg.hasAttribute('data-bottomrail-display');
        });

        colorSegs.forEach(function(seg){
          resetSegmentDisplay(seg, 'Color');
        });
      });

      const configLabel = Array.from(card.querySelectorAll('.field-label')).find(function(label){
        return label.textContent.trim() === 'Config';
      });
      const configWrapper = configLabel ? configLabel.closest('.col-1') : null;
      const configText = configWrapper ? configWrapper.querySelector('.field span') : null;
      resetFieldDisplay(configText, 'Single', false);

      resetControlTypeArea(card);

      const optionBox = card.querySelector('[data-general-option-box]');
      if(optionBox){
        optionBox.innerHTML = '';
      }

      const memoBox = card.querySelector('[data-memo-box]');
      if(memoBox){
        memoBox.innerHTML = '<input data-memo-input type="text" style="width:100%; min-width:0; border:none; outline:none; background:transparent; font:inherit; color:inherit;" />';
      }

      card.querySelectorAll('[data-window-meta]').forEach(function(metaEl){
        metaEl.innerHTML = '';
      });

      const summaryTop = card.querySelector('.win-summary-top');
      if(summaryTop){
        const summaryParts = summaryTop.querySelectorAll('span');
        if(summaryParts[0]) summaryParts[0].textContent = 'BLD $0';
        if(summaryParts[1]) summaryParts[1].textContent = 'SUR $0';
        if(summaryParts[2]) summaryParts[2].textContent = 'OPT $0';
        if(summaryParts[3]) summaryParts[3].textContent = 'MOT $0';
      }

      const summaryTotal = card.querySelector('.win-summary-total');
      if(summaryTotal){
        summaryTotal.textContent = 'Total $0';
      }

      card.querySelectorAll('.inline-value').forEach(function(valueEl){
        valueEl.classList.add('hidden');
      });
    }

    function addWindowRow(el, {deferRefresh = false} = {}){
      const windowCards = deferRefresh && window.measureBlankWindowTemplate ? [] : Array.from(document.querySelectorAll('.card')).filter(function(card){
        return card.querySelector('.window-head');
      });
      const templateCard = window.measureBlankWindowTemplate || windowCards[0];

      if(!templateCard) return;

      const clone = templateCard.cloneNode(true);
      resetWindowCardToDefault(clone);

      const actions = el ? el.closest('.actions') : document.querySelector('.actions');

      if(actions){
        actions.insertAdjacentElement('beforebegin', clone);
      } else if(windowCards.length){
        windowCards[windowCards.length - 1].insertAdjacentElement('afterend', clone);
      }

      // Snapshot restoration fills every card before its one final refresh.
      if(deferRefresh) return clone;

      reindexWindowCards();
      updateWindowCardActionButtons();

      const unitLabel = document.getElementById('unitLabel');
      const currentUnit = unitLabel ? unitLabel.textContent.trim() : 'ft+inch';

      if(typeof renderDimensionFields === 'function'){
        renderDimensionFields(currentUnit || 'ft+inch');
      }

      if(typeof updateAllWindowSqft === 'function'){
        updateAllWindowSqft();
      }

      if(typeof renderReviewTableRows === 'function'){
        renderReviewTableRows();
      }
    }

    function duplicateWindowCard(el){
      if(el.disabled) return;

      const card = el.closest('.card');
      if(!card || !card.querySelector('.window-head')) return;

      const clone = card.cloneNode(true);

      copyWindowFormState(card, clone);

      clone.querySelectorAll('.client-menu').forEach((menu) => {
        menu.classList.add('hidden');
      });

      clearDuplicatedSidemark(clone);

      card.insertAdjacentElement('afterend', clone);

      reindexWindowCards();
      updateWindowCardActionButtons();

      const duplicatedIndex = Array.from(document.querySelectorAll('.card'))
        .filter((windowCard) => windowCard.querySelector('.window-head'))
        .indexOf(clone) + 1;

      if(duplicatedIndex > 0){
        updateWindowTitleMeta(duplicatedIndex);
      }

      if(typeof renderReviewTableRows === 'function'){
        renderReviewTableRows();
      }
    }

    function deleteWindowCard(el){
      if(el.disabled) return;

      const card = el.closest('.card');
      if(!card || !card.querySelector('.window-head')) return;

      if(window.measureWindowHistory?.remove([card],'delete'))finishWindowRemoval();
    }

    function updateWindowTitleMeta(index, refreshReview = true){
      const metaEl = document.querySelector('[data-window-meta="' + index + '"]');
      if(!metaEl) return;

      const cards = Array.from(document.querySelectorAll('.card')).filter(function(card){
        return card.querySelector('.window-head');
      });

      const card = cards[index - 1];
      if(!card){
        metaEl.innerHTML = '';
        return;
      }

      const floor = getWindowFloorValue(index);

      const roomInput = card.querySelector('[data-room-input]');
      const roomDisplay = card.querySelector('[data-room-display]');
      const sidemarkInput = card.querySelector('[data-sidemark-input="' + index + '"]');

      const room = roomInput
        ? roomInput.value.trim()
        : (roomDisplay && !roomDisplay.classList.contains('placeholder')
            ? roomDisplay.textContent.trim()
            : '');

      const sidemark = sidemarkInput ? sidemarkInput.value.trim() : '';

      const left = [floor, room].filter(Boolean).join(' ');
      let meta = '';

      if(left && sidemark){
        meta = left + ' - ' + sidemark;
      } else if(left){
        meta = left;
      } else if(sidemark){
        meta = sidemark;
      }

      metaEl.textContent = meta ? ' ' + meta : '';

      if(refreshReview && typeof renderReviewTableRows === 'function'){
        renderReviewTableRows();
      }
    }
    function calculateCeilingSqftFromMm(widthMm, heightMm){
      if(widthMm === null || heightMm === null) return 0;
      const widthInches = widthMm / 25.4;
      const heightInches = heightMm / 25.4;
      const sqft = (widthInches * heightInches) / 144;
      return Math.ceil(sqft - Number.EPSILON * Math.max(1, sqft) * 4);
    }

    function parseMeasureMoney(value){
      const number = parseFloat(String(value ?? '').replace(/[^0-9.-]/g, ''));
      return Number.isFinite(number) ? number : 0;
    }

    function formatMeasureMoney(value){
      return window.wincoFormatReviewMoney(value);
    }

    function getSelectedFabricPriceForCard(card){
      return window.wincoDuo.fabricUnitTotal(window.wincoDuo.read(card));
    }

    function normalizeMeasureCode(value){
      return String(value || '').trim().toUpperCase().replace(/\\s+/g, ' ');
    }

    function mmToInchesForPricing(mmValue){
      const number = Number(mmValue);
      if(!Number.isFinite(number) || number <= 0) return 0;
      return number / 25.4;
    }

    function getSelectedHeadrailForCard(card){
      if(!card) return null;

      const display = card.querySelector('[data-headrail-display]');
      if(!display || display.classList.contains('placeholder')) return null;

      return {
        code: normalizeMeasureCode(display.dataset.headrailCode || display.textContent),
        pricingType: String(display.dataset.headrailPricingType || '').trim(),
      };
    }

    function getSurchargeBlockForHeadrail(code){
      return window.wincoPricing.rateTable(window.measurePricingRateTables,'surcharge',code);
    }
    function getBracketPriceByWidth(rows,widthInches){
      return window.wincoPricing.bracketPrice(rows,widthInches);
    }

    function calculateHeadrailSurchargeForCard(card, sectionWidth){
      if(!card) return 0;

      const headrail = getSelectedHeadrailForCard(card);
      if(!headrail) return 0;

      const pricingType = String(headrail.pricingType || '').trim().toLowerCase();
      if(pricingType !== 'surcharge') return 0;

      const surchargeBlock = getSurchargeBlockForHeadrail(headrail.code);
      if(!surchargeBlock) return 0;

      const widthField = card.querySelector('.dimension-field[data-dimension="w"]');
      const widthMm = sectionWidth ?? (widthField ? getMmValue(widthField) : null);
      const widthInches = mmToInchesForPricing(widthMm);

      return getBracketPriceByWidth(surchargeBlock.rows, widthInches);
    }

    function pricingSelectionKey(card,kind){
      const dimension=name=>{const el=card.querySelector('.dimension-field[data-dimension="'+name+'"]');return el?Math.round(Number(getMmValue(el)||0)*10000)/10000:0;};
      const product=window.wincoDependencies.readProductState(card);
      const motor=getSelectedMotorForCard(card);
      if(kind==='motor')return JSON.stringify([product.control,motor?.pricingId ? {pricingId:motor.pricingId} : motor,window.wincoQuantities.quantity(card,'motor')]);
      const currentChannels=getWindowChannelChargeCategory(card)==='surcharge';
      if(kind==='surcharge')return JSON.stringify(currentChannels
        ? [product.headrail,dimension('w'),isOptionCheckedByLabel(card,'Side channel') ? [getSelectedMountTypeForCard(card),dimension('h')] : null,isOptionCheckedByLabel(card,'L channel') ? window.wincoQuantities.quantity(card,'L channel') : null]
        : [product.headrail,dimension('w')]);
      const options=getWindowOptionState(card);
      if(currentChannels)return JSON.stringify([product.control,product.headrail,product.bottomrail,...['general','chain','cordless'].map(key=>(options[key]||[]).filter(label=>!['Side channel','L channel'].some(channel=>window.wincoProductCatalog?.sameOption(label,channel)??label===channel)).slice().sort().map(label=>[label,window.wincoQuantities.quantity(card,label)]))]);
      return JSON.stringify([product.control,product.headrail,product.bottomrail,dimension('w'),dimension('h'),getSelectedMountTypeForCard(card),...['general','chain','cordless'].map(key=>(options[key]||[]).slice().sort().map(label=>[label,window.wincoQuantities.quantity(card,label)]))]);
    }
    function savedPricingAmount(card,kind){
      if(!card)return null;
      const name='saved'+kind[0].toUpperCase()+kind.slice(1)+'Amount';
      const fingerprint=kind+'PriceSelection';
      if(card.dataset[name]===undefined)return null;
      if(kind==='surcharge'&&card.dataset[fingerprint]){
        try {
          const savedKey=JSON.parse(card.dataset[fingerprint]);
          if(Array.isArray(savedKey)&&savedKey.length===2){
            savedKey[0]=window.wincoDependencies.normalizeHeadrail(savedKey[0]);
            card.dataset[fingerprint]=JSON.stringify(savedKey);
          }
        } catch { /* Invalid draft fingerprints are invalidated below. */ }
      }
      if(card.dataset[fingerprint]){
        const current=pricingSelectionKey(card,kind),same=window.wincoDependencies?.samePricingSelections;
        if(!(same?same(card.dataset[fingerprint],current,kind):card.dataset[fingerprint]===current)){
          delete card.dataset[name];delete card.dataset[fingerprint];return null;
        }
        // The loaded registry may prove that an old and current label are the
        // same product. Keep the current representation in editable drafts so
        // a later cold restore does not need aliases just to retain its price.
        card.dataset[fingerprint]=current;
      }
      return parseMeasureMoney(card.dataset[name]);
    }
    function calculateWindowSurcharge(card){
      return savedPricingAmount(card,'surcharge') ?? (calculateHeadrailSurchargeForCard(card)
        + (getWindowChannelChargeCategory(card)==='surcharge' ? calculateSideChannelOptionForCard(card)+calculateLChannelOptionForCard(card) : 0));
    }

    function getWindowChannelChargeCategory(card){
      // Pre-patch saved edit drafts may resume as HTML without running the loader.
      if(!card)return 'surcharge';
      if(!['option','surcharge'].includes(card.dataset.channelChargeCategory)){
        card.dataset.channelChargeCategory=card.dataset.savedOptionAmount !== undefined || card.dataset.savedSurchargeAmount !== undefined ? 'option' : 'surcharge';
      }
      return card.dataset.channelChargeCategory;
    }

    function getSideChannelBlock(blockKey){
      return window.wincoPricing.rateTable(window.measurePricingRateTables,'side-channel',blockKey);
    }

    function getMountValueForCard(card){
      const input = card?.querySelector('[data-mount-type-input]');
      if(input) return String(input.value || '').trim();
      return getValidationDisplayText(card?.querySelector('[data-mount-type-display]'));
    }

    function getSelectedMountTypeForCard(card){
      const rawText = getMountValueForCard(card).toUpperCase();
      return rawText.split(/\\s+/)[0];
    }

    function syncLChannelOptionForCard(card){
 const box=card?.querySelector('[data-general-option-box]');if(!box)return;
 const existing=box.querySelector('[data-l-channel-option]');
 if(window.wincoDuo.isDuo(getSelectedHeadrailCode(card))){(existing?.closest('.duo-option-charge')||existing)?.remove();return;}
 if(existing)return;
 const button=document.createElement('button');button.type='button';button.className='check';button.dataset.lChannelOption='true';button.setAttribute('onclick','toggleCheck(this)');button.innerHTML='<span class="check-box">✓</span><span>L channel</span>';box.appendChild(button);
}

    window.syncLChannelOptionForCard = syncLChannelOptionForCard;

    function calculateSideChannelOptionForCard(card){
      if(!card || window.wincoDuo.isDuo(getSelectedHeadrailCode(card)) || !isOptionCheckedByLabel(card, 'Side channel')) return 0;

      const mountType = getSelectedMountTypeForCard(card);
      if(!mountType) return 0;

      const block = getSideChannelBlock(mountType === 'IN' ? 'INSIDE MOUNT' : 'OUTSIDE MOUNT');
      if(!block) return 0;

      const heightField = card.querySelector('.dimension-field[data-dimension="h"]');
      const heightMm = heightField ? getMmValue(heightField) : null;
      const heightInches = mmToInchesForPricing(heightMm);

      return getBracketPriceByWidth(block.rows, heightInches);
    }

    function calculateLChannelOptionForCard(card, sectionWidth){
      if(!card || window.wincoDuo.isDuo(getSelectedHeadrailCode(card))) return 0;

      const lChannelButton = card.querySelector('[data-l-channel-option="true"]');
      const isLChannelChecked = lChannelButton
        ? lChannelButton.classList.contains('checked')
        : isOptionCheckedByLabel(card, 'L channel');

      if(!isLChannelChecked) return 0;

      const block = getSideChannelBlock('L CHANNELS');
      if(!block) return 0;

      const widthField = card.querySelector('.dimension-field[data-dimension="w"]');
      const widthMm = sectionWidth ?? (widthField ? getMmValue(widthField) : null);
      const widthInches = mmToInchesForPricing(widthMm);

      return getBracketPriceByWidth(block.rows, widthInches) * window.wincoQuantities.quantity(card,'L channel');
    }

    function normalizeMeasureName(value){
      return String(value || '').trim().toLowerCase().replace(/\\s+/g, ' ');
    }

    function getPricingOptionPriceByName(optionName){
      const registered=window.wincoProductCatalog?.optionPrice(optionName);
      if(registered!==undefined)return registered===null?0:parseMeasureMoney(registered);
      const chainItem=window.wincoDependencies?.chainPriceItem?.(optionName);
      if(chainItem!==undefined)return chainItem?parseMeasureMoney(chainItem.price):0;
      const targetName = normalizeMeasureName(optionName);
      const dynamicItems = Array.isArray(window.measurePricingOptionItems) ? window.measurePricingOptionItems : [];


      const matchedItem = dynamicItems.find((item) => {
        const itemCategory = normalizeMeasureName(item.category || '');
        const itemName = normalizeMeasureName(item.name || item.option_name || item.code);
        return (!itemCategory || itemCategory === 'option') && itemName === targetName;
      });

      return matchedItem ? parseMeasureMoney(matchedItem.price) : 0;
    }

    function getCheckButtonLabel(button){
      if(!button) return '';

      const labelSpan = Array.from(button.querySelectorAll('span')).find((span) => {
        return !span.classList.contains('check-box');
      });

      return labelSpan ? labelSpan.textContent : button.textContent.replace('✓', '');
    }

    function isOptionCheckedByLabel(card, optionLabel){
      if(!card) return false;

      const targetLabel = normalizeMeasureName(optionLabel);

      return Array.from(card.querySelectorAll('.check.checked')).some((button) => {
        return window.wincoProductCatalog?.sameOption(getCheckButtonLabel(button),optionLabel) ?? normalizeMeasureName(getCheckButtonLabel(button)) === targetLabel;
      });
    }

    function calculateSpringAssistOptionForCard(card){
      if(!card || !isOptionCheckedByLabel(card, 'Spring Assist')) return 0;
      return getPricingOptionPriceByName('Spring Assist');
    }

    function getSelectedCordlessTypeForCard(card){
      if(!card) return null;

      const cordlessTypeText = card.querySelector('[data-cordless-type-section] .field span');
      if(!cordlessTypeText || cordlessTypeText.classList.contains('placeholder')) return null;

      return {
        code: String(cordlessTypeText.dataset.cordlessTypeCode || cordlessTypeText.textContent || '').trim(),
        pricingId: cordlessTypeText.dataset.cordlessPricingId || '',
        price: cordlessTypeText.dataset.cordlessTypePrice,
      };
    }

    function calculateCordlessTypeOptionForCard(card){
 const selection=getSelectedCordlessTypeForCard(card);if(!selection)return 0;
 const rules=window.wincoDependencies,code=rules.normalizeControl(selection.code,getSelectedGroupValue(card));
 const registered=rules.configuredProductRules?.()?.resolve('control',code);
 const matched=rules.cordlessCatalog(window.measurePricingCordlessTypeItems,window.measureControlItems).find(item=>selection.pricingId?item.id===selection.pricingId:registered?.priceId?item.id===registered.priceId:item.code===code);
 return matched?parseMeasureMoney(matched.price):0;
}

    function calculateWindowOptions(card, sectionWidth){
      const saved=sectionWidth === undefined ? savedPricingAmount(card,'option') : null;
      if(saved!==null)return saved;

      return (
        ['general','chain','cordless'].flatMap(section=>getWindowOptionState(card)[section]).filter(label=>!['Side channel','L channel'].some(channel=>window.wincoProductCatalog?.sameOption(label,channel)??label===channel)).reduce((sum,label)=>sum+getPricingOptionPriceByName(label)*window.wincoQuantities.quantity(card,label),0) +
        calculateCordlessTypeOptionForCard(card) +
        (getWindowChannelChargeCategory(card)==='option' ? calculateSideChannelOptionForCard(card)+calculateLChannelOptionForCard(card,sectionWidth) : 0)
      );
    }


    function getSelectedMotorForCard(card){
      if(!card) return null;

      const motorText = card.querySelector('[data-motor-section] .field span');
      if(!motorText || motorText.classList.contains('placeholder')) return null;

      return {
        code: String(motorText.dataset.motorCode || '').trim(),
        name: String(motorText.dataset.motorName || motorText.textContent || '').trim(),
        ...(motorText.dataset.motorPricingId ? {pricingId:motorText.dataset.motorPricingId} : {}),
      };
    }

    function getPricingMotorItemBySelection(selection){
      return window.wincoPricing.findMotorPricingItem(window.measurePricingMotorItems || [], selection);
    }

    function getPricingMotorPriceBySelection(selection){
      const matchedItem=getPricingMotorItemBySelection(selection);
      return matchedItem ? parseMeasureMoney(matchedItem.price) : 0;
    }

    function calculateWindowMotor(card){
      return savedPricingAmount(card,'motor') ?? getPricingMotorPriceBySelection(getSelectedMotorForCard(card)) * window.wincoQuantities.quantity(card,'motor');
    }

    function getWindowPricing(card){
      const row = window.wincoConfiguration.read(card);
      row.heightMm = getMmValue(card.querySelector('.dimension-field[data-dimension="h"]'));
      const rate = getSelectedFabricPriceForCard(card);
      const sqft = calculateCeilingSqftFromMm(row.widthMm,row.heightMm);
      const single = { sqft, bld: rate * sqft, surcharge: calculateWindowSurcharge(card),
        option: calculateWindowOptions(card), motor: calculateWindowMotor(card) };
      single.total = single.bld + single.surcharge + single.option + single.motor;
      if(row.config === 'Single') return {...single,parts:[]};
      const fingerprint = JSON.stringify([row.widthMm,row.heightMm,
        row.splits.map(part=>part.widthMm),window.wincoConfiguration.layout(row).groups,
        rate,...['surcharge','option','motor'].map(kind=>pricingSelectionKey(card,kind))]);
      let saved;
      try { saved = JSON.parse(card.dataset.savedSectionPricing || 'null'); } catch { /* Invalid draft: calculate from selections. */ }
      const sameSections=window.wincoDependencies?.sameSectionPricingSelections;
      if(saved?.version === window.wincoSectionPricing.version && (sameSections?sameSections(saved.fingerprint,fingerprint):saved.fingerprint === fingerprint)
          && Array.isArray(saved.parts) && saved.parts.length === row.splits.length){
        if(saved.fingerprint!==fingerprint){saved.fingerprint=fingerprint;card.dataset.savedSectionPricing=JSON.stringify(saved);}
        return {...window.wincoSectionPricing.sum(saved.parts),parts:saved.parts,sectionPricing:saved,fromSavedSections:true};
      }
      const parts = window.wincoSectionPricing.calculate(row,{
        fabricRate:rate,
        surcharge:part=>(part.groupFirst ? calculateHeadrailSurchargeForCard(card,part.headrailWidthMm) : 0)
          + (getWindowChannelChargeCategory(card)==='surcharge' ? calculateSideChannelOptionForCard(card)+calculateLChannelOptionForCard(card,part.widthMm) : 0),
        option:part=>calculateWindowOptions(card,part.widthMm),
        motor:single.motor,
      });
      const sectionPricing = {version:window.wincoSectionPricing.version,fingerprint,single,parts};
      return {...window.wincoSectionPricing.sum(parts),parts,sectionPricing};
    }


    function escapeReviewHtml(value){
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function getFieldTextByLabel(card, labelText){
      if(!card) return '';

      const label = Array.from(card.querySelectorAll('.field-label')).find((item) => item.textContent.trim() === labelText);
      const wrapper = label ? label.parentElement : null;
      const span = wrapper ? wrapper.querySelector('.field span, [data-mount-type-display], [data-room-display]') : null;
      const input = wrapper ? wrapper.querySelector('input') : null;

      if(input && input.value.trim()) return input.value.trim();
      if(!span || span.classList.contains('placeholder')) return '';

      return span.textContent.trim();
    }

    function getReviewLocationText(card, index){
      const meta = card ? card.querySelector('[data-window-meta]') : null;
      const metaText = meta ? meta.textContent.trim() : '';

      if(metaText) return metaText;

      const floor = getWindowFloorValue(index) || '';
      const room = getFieldTextByLabel(card, '\xA0');
      const sidemarkInput = card ? card.querySelector('[data-sidemark-input]') : null;
      const sidemark = sidemarkInput ? sidemarkInput.value.trim() : '';

      return [floor, room, sidemark].filter(Boolean).join(' ');
    }

    function getReviewSegmentText(card, selector){
      const el = card ? card.querySelector(selector) : null;
      if(!el || el.classList.contains('placeholder')) return '';
      return String(el.textContent || '').trim();
    }

    function getReviewRailText(card, railSelector){
      const display = card ? card.querySelector(railSelector) : null;
      if(!display || display.classList.contains('placeholder')) return '';

      const wrapper = display.closest('.col-3');
      const colorSegs = wrapper ? Array.from(wrapper.querySelectorAll('.rail-seg.clickable')).filter((seg) =>
        !seg.hasAttribute('data-headrail-display') &&
        !seg.hasAttribute('data-bottomrail-display')
      ) : [];
      const colorSeg = colorSegs[colorSegs.length - 1];

      const railCode = String(display.textContent || '').trim();
      const colorCode = colorSeg && !colorSeg.classList.contains('placeholder') ? String(colorSeg.textContent || '').trim() : '';

      return railCode + (colorCode ? colorCode : '');
    }

    function getReviewControlTypeText(card){
      const value=getFieldTextByLabel(card, 'Control Type');
      if(window.wincoDependencies?.restoredControlFamily){
        const label=[...card.querySelectorAll('.field-label')].find(el=>el.textContent.trim()==='Control Type');
        return window.wincoDependencies.restoredControlFamily({control:value,controlFamily:label?.parentElement?.querySelector('.field span')?.dataset.controlFamily});
      }
      return window.wincoDependencies?.controlFamily ? window.wincoDependencies.controlFamily(window.wincoDependencies.normalizeControl(value)) : value;
    }

    function getReviewControlText(card){
      const controlType = getReviewControlTypeText(card);

      if(controlType === 'Chain / Manual') return window.wincoDependencies?.readProductState?.(card)?.control || 'CH';
      if(controlType === 'Cordless') return getSelectedCordlessTypeCode(card) || 'CD';
      if(controlType === 'Motorized') return 'MOT';

      return controlType;
    }

    function getReviewCtrlSideText(card){
      return window.wincoConfiguration.readControlSide(card);
    }

    function getReviewLengthText(card){
      const input = card ? card.querySelector('[data-chain-length-section] .length-input') : null;
      return input && input.value ? input.value : '';
    }

    function getReviewMoneyText(value){
      const amount = Number.isFinite(value) ? value : 0;
      return amount ? formatMeasureMoney(amount) : '-';
    }

    function getReviewWindowRowData(card, index){
      const dims = card ? card.querySelectorAll('.dimension-field') : [];
      const widthMm = dims.length >= 2 ? getMmValue(dims[0]) : null;
      const heightMm = dims.length >= 2 ? getMmValue(dims[1]) : null;
      const pricing = getWindowPricing(card);
      const {sqft,bld:bldAmount,surcharge:surchargeAmount,option:optionAmount,motor:motorAmount} = pricing;

      return {
        no: index + 1,
        included: !!(card && card.querySelector('.window-head .check.checked')),
        loc: getReviewLocationText(card, index + 1),
        fab: window.wincoDuo.fabricText(window.wincoDuo.read(card)),
        mt: getFieldTextByLabel(card, 'Mount'),
        hw: getReviewRailText(card, '[data-headrail-display]'),
        bt: getReviewRailText(card, '[data-bottomrail-display]'),
        controlType: getReviewControlTypeText(card),
        ctrl: getReviewControlText(card),
        side: getReviewCtrlSideText(card),
        len: window.wincoFormatChainLength({
          length: getReviewLengthText(card),
          noChainWeight: !!card?.querySelector('[data-chain-weight-toggle].checked'),
        }),
        w: window.wincoFormatReviewDimension(widthMm, getReviewDisplayUnit()),
        h: window.wincoFormatReviewDimension(heightMm, getReviewDisplayUnit()),
        sf: sqft ? String(sqft) : '0',
        pricePerSf: window.wincoDuo.fabricRateText(window.wincoDuo.read(card),getReviewMoneyText),
        bld: getReviewMoneyText(bldAmount),
        sur: getReviewMoneyText(surchargeAmount),
        opt: getReviewMoneyText(optionAmount),
        mot: getReviewMoneyText(motorAmount),
        total: formatMeasureMoney(bldAmount + surchargeAmount + optionAmount + motorAmount),
      };
    }

    function getReviewWindowRowsData(card, index){
      const baseRow = getReviewWindowRowData(card, index);
      const configValue = typeof getSelectedConfigValue === 'function'
        ? getSelectedConfigValue(card)
        : 'Single';

      if(configValue === 'Single'){
        return [baseRow];
      }

      const splitItems = Array.from(
        card?.querySelectorAll('[data-split-fields] .split-item') || []
      );
      const heightMm = getMmValue(card.querySelector('.dimension-field[data-dimension="h"]')) || 0;

      if(!splitItems.length){
        return [baseRow];
      }

      const prices = getWindowPricing(card).parts;
      return splitItems.map((item, splitIndex) => {
        const input = item.querySelector('.split-mm-input');
        const ctrl = item.querySelector('.split-select-display');
        const splitWidthMm = window.wincoSplits.read(input) || 0;
        const splitSqft = calculateCeilingSqftFromMm(
          Number.isFinite(splitWidthMm) ? splitWidthMm : 0,
          Number.isFinite(heightMm) ? heightMm : 0
        );

        const part = window.wincoConfiguration.layout({config:configValue,splits:getSplitStateForCard(card)}).parts[splitIndex];

        return {
          ...baseRow,
          baseLoc: baseRow.loc,
          splitIndex,
          splitCount: splitItems.length,
          loc: String(baseRow.loc || '').trim() + part.fraction,
          headrailNote: part.headrailNote,
          side:
            String(ctrl?.textContent || '').trim() === 'None'
              ? ''
              : String(ctrl?.textContent || '').trim(),
          w:
            Number.isFinite(splitWidthMm) && splitWidthMm > 0
              ? window.wincoFormatReviewDimension(splitWidthMm, getReviewDisplayUnit())
              : '',
          h: baseRow.h,
          sf: splitSqft ? String(splitSqft) : '0',

          bld: getReviewMoneyText(prices[splitIndex]?.bld),
          sur: getReviewMoneyText(prices[splitIndex]?.surcharge),
          opt: getReviewMoneyText(prices[splitIndex]?.option),
          mot: getReviewMoneyText(prices[splitIndex]?.motor),
          total: formatMeasureMoney(prices[splitIndex]?.total || 0),
        };
      });
    }

    function getReviewDisplayUnit(){
      return document.querySelector('[data-review-unit]')?.value === 'inch' ? 'inch' : 'mm';
    }

    function getReviewShowExcludedItemsButton(){
      const reviewCard = document.querySelector('.review-table-wrap') ? document.querySelector('.review-table-wrap').closest('.card') : null;
      if(!reviewCard) return null;

      return Array.from(reviewCard.querySelectorAll('.check')).find((item) => {
        return normalizeMeasureName(getCheckButtonLabel(item)) === 'show excluded items';
      });
    }

    function isReviewShowExcludedItemsOn(){
      const button = getReviewShowExcludedItemsButton();
      return !!(button && button.classList.contains('checked'));
    }

    function showReviewExcludedItems(){
      const button = getReviewShowExcludedItemsButton();
      if(button) button.classList.add('checked');
    }

    function toggleReviewWindowInclude(windowNo){
      const index = Number(windowNo) - 1;
      if(!Number.isInteger(index) || index < 0) return;

      const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));
      const card = windowCards[index];
      if(!card) return;

      const includeButton = card.querySelector('.window-head .check');
      if(includeButton){
        includeButton.classList.toggle('checked');
        if(!includeButton.classList.contains('checked')) showReviewExcludedItems();
      }

      renderReviewTableRows();
    }

    function getReviewIncludedWindowCards(){
      return Array.from(document.querySelectorAll('.card'))
        .filter((card) => card.querySelector('.window-head'))
        .filter((card) => !!card.querySelector('.window-head .check.checked'));
    }

    function applyMeasureSummaryRowTone(row, labelText){
      if(!row) return;
      row.classList.remove('summary-strong', 'summary-muted');
    }

    function applyMeasureSummaryRowTones(){
      Array.from(document.querySelectorAll('.summary-card .summary-row')).forEach((row) => {
        const label = row.querySelector('span:first-child');
        applyMeasureSummaryRowTone(row, label ? label.textContent : '');
      });
    }

    function setSummaryRowValue(labelText, value, options = {}){
      const rows = Array.from(document.querySelectorAll('.summary-card .summary-row'));
      const row = rows.find((item) => {
        const label = item.querySelector('span:first-child');
        return label && label.textContent.trim() === labelText;
      });

      if(!row) return;

      applyMeasureSummaryRowTone(row, labelText);

      const valueEl = row.querySelector('span:last-child');
      if(!valueEl) return;

      const amount = Number.isFinite(value) ? value : 0;
      // Keep the canonical pre-Motor subtotal for Save while displaying the
      // requested Motor-inclusive subtotal. Preserve legacy currency rounding.
      if(options.displayValue !== undefined) row.dataset.summaryBaseAmount = formatMeasureMoney(amount);
      const displayAmount = Number.isFinite(options.displayValue) ? options.displayValue : amount;
      valueEl.textContent = options.negative && displayAmount ? '-' + formatMeasureMoney(displayAmount) : formatMeasureMoney(displayAmount);
      row.classList.toggle('zero', !displayAmount);
    }

    function getReviewNumberByLabel(labelText){
      const label = Array.from(document.querySelectorAll('.review-bottom .field-label')).find((item) => item.textContent.trim() === labelText);
      const wrapper = label ? label.parentElement : null;
      const field = wrapper ? wrapper.querySelector('.field') : null;
      if(!field) return 0;

      const input = field.querySelector('input');
      if(input) return parseMeasureMoney(input.value);

      return parseMeasureMoney(field.textContent);
    }

    function getReviewDiscountPercent(labelText){
      const value = getReviewNumberByLabel(labelText);
      if(!Number.isFinite(value) || value <= 0) return 0;
      return value / 100;
    }

    function getSummaryDisplayedAmount(labelText){
      const rows = Array.from(document.querySelectorAll('.summary-card .summary-row'));
      const row = rows.find((item) => {
        const label = item.querySelector('span:first-child');
        return label && label.textContent.trim() === labelText;
      });
      const valueEl = row ? row.querySelector('span:last-child') : null;
      return valueEl ? parseMeasureMoney(valueEl.textContent) : 0;
    }

    function setSummaryFinalTotalValue(value){
      const row = document.querySelector('.summary-card .summary-final');
      const valueEl = row ? row.querySelector('span:last-child') : null;
      if(!valueEl) return;

      const amount = Number.isFinite(value) ? value : 0;
      valueEl.textContent = formatMeasureMoney(amount);
      row.classList.toggle('zero', !amount);
    }

    function renderReviewSummaryTotals(){
      const includedCards = getReviewIncludedWindowCards();

      const totals = includedCards.reduce((acc, card) => {
        const {sqft,bld:bldAmount,surcharge:surchargeAmount,option:optionAmount,motor:motorAmount} = getWindowPricing(card);

        acc.sqft += sqft;
        acc.blinds += bldAmount;
        acc.surcharge += surchargeAmount;
        acc.option += optionAmount;
        acc.motor += motorAmount;

        return acc;
      }, {
        sqft: 0,
        blinds: 0,
        surcharge: 0,
        option: 0,
        motor: 0,
      });

      const totalSqftEl = document.querySelector('.tfoot-note');
      if(totalSqftEl){
        totalSqftEl.textContent = 'Total Sqft : ' + totals.sqft;
      }

      const subtotalAmount = totals.blinds + totals.surcharge + totals.option;
      const bldSurDiscountRate = getReviewDiscountPercent('BLD / SUR Disc. %');
      const optDiscountRate = getReviewDiscountPercent('OPT Disc. %');
      const motDiscountRate = getReviewDiscountPercent('MOT Disc. %');

      const discountAmount =
        ((totals.blinds + totals.surcharge) * bldSurDiscountRate) +
        (totals.option * optDiscountRate) +
        (totals.motor * motDiscountRate);

      const feeAmount = getReviewNumberByLabel('Install') + getReviewNumberByLabel('Extra Fee');
      const accessoriesAmount = typeof getCurrentAccessoriesTotal === 'function' ? getCurrentAccessoriesTotal() : getSummaryDisplayedAmount('Accessories');
      const totalBeforeGst = subtotalAmount + totals.motor + feeAmount + accessoriesAmount - discountAmount;
      const gstAmount = totalBeforeGst * 0.05;
      const finalTotal = totalBeforeGst + gstAmount;

      setSummaryRowValue('Blinds', totals.blinds);
      setSummaryRowValue('Surcharge', totals.surcharge);
      setSummaryRowValue('Option', totals.option);
      setSummaryRowValue('Motor', totals.motor);
      const displaySubtotalAmount = parseMeasureMoney(formatMeasureMoney(subtotalAmount)) + parseMeasureMoney(formatMeasureMoney(totals.motor));
      setSummaryRowValue('Subtotal', subtotalAmount, { displayValue: displaySubtotalAmount });
      setSummaryRowValue('Accessories', accessoriesAmount);
      setSummaryRowValue('Fee (Install + Extra)', feeAmount);
      setSummaryRowValue('Discount', discountAmount, { negative: true });
      setSummaryRowValue('Total before GST', totalBeforeGst);
      setSummaryRowValue('GST', gstAmount);
      setSummaryFinalTotalValue(finalTotal);
    }

    function bindReviewCalculationInputs(){
      document.querySelectorAll('[data-review-calc-input]').forEach((input) => {
        if(input.dataset.reviewCalcBound === 'true') return;

        input.dataset.reviewCalcBound = 'true';
        input.addEventListener('input', () => {
          if(typeof renderReviewSummaryTotals === 'function'){
            renderReviewSummaryTotals();
          }
        });
      });
    }

    function bindAccessoryCalculationInputs(){
      const card = document.querySelector('.accessories');
      if(!card) return;

      document.querySelectorAll('[data-accessory-discount-input], .accessories [data-accessory-qty], .accessories [data-accessory-price]').forEach((input) => {
        if(input.dataset.accessoryCalcBound === 'true') return;

        input.dataset.accessoryCalcBound = 'true';
        input.addEventListener('input', () => updateAccessoriesTotals(card));
      });

      updateAccessoriesTotals(card);
    }

    function renderReviewTableHeader(showSideColumn, showLengthColumn){
      const theadRow = document.querySelector('.review-table-wrap thead tr');
      if(!theadRow) return;

      const headers = ['', 'No.', 'Loc', 'Fab', 'MT', 'HW', 'BT', 'Ctrl'];
      if(showSideColumn) headers.push('L/R');
      if(showLengthColumn) headers.push('Len');
      headers.push('W', 'H', 'SF', '$/SF', 'BLD', 'SUR', 'OPT', 'MOT', 'Total');

      theadRow.innerHTML = headers.map((label) => '<th>' + escapeReviewHtml(label) + '</th>').join('');
    }

    function getReviewTableColumnCount(showSideColumn, showLengthColumn){
      return 17 + (showSideColumn ? 1 : 0) + (showLengthColumn ? 1 : 0);
    }

    function renderReviewTableRows(){
      refreshReviewClientInfo();
      const tbody = document.querySelector('.review-table-wrap tbody');
      if(!tbody) return;

      const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));
      const showExcludedItems = isReviewShowExcludedItemsOn();
      const rows = windowCards
        .flatMap((card, index) => getReviewWindowRowsData(card, index))
        .filter((row) => row.included || showExcludedItems);
      const showLengthColumn = rows.some((row) => row.controlType === 'Chain / Manual');
      const showSideColumn = showLengthColumn || rows.some((row) => row.controlType === 'Motorized');
      const columnCount = getReviewTableColumnCount(showSideColumn, showLengthColumn);
      const dimensionCellClass = getReviewDisplayUnit() === 'mm' ? ' class="review-numeric"' : '';
      const supplementApi = window.wincoReviewSupplements;
      const supplements = supplementApi.reviewSupplements(rows, windowCards.map((card,index) => getWindowCardMeasureData(card,index)), {});
      const supplementColumns = supplementApi.activeSupplementFields(supplements);

      renderReviewTableHeader(showSideColumn, showLengthColumn);
      tbody.innerHTML = '';

      if(!windowCards.length){
        tbody.innerHTML = '<tr><td colspan="' + columnCount + '" style="text-align:center;color:#64748b;padding:16px;">No window rows.</td></tr>';
        renderReviewSummaryTotals();
        return;
      }

      if(!rows.length){
        tbody.innerHTML = '<tr><td colspan="' + columnCount + '" style="text-align:center;color:#64748b;padding:16px;">No included window rows.</td></tr>';
        renderReviewSummaryTotals();
        return;
      }

      rows.forEach((row, index) => {
        const tr = document.createElement('tr');
        if(!row.included) tr.classList.add('review-row-excluded');
        const includeClass = row.included ? ' checked' : '';
        let rowHtml =
          '<td><button class="check box-only' + includeClass + '" aria-label="Include window ' + escapeReviewHtml(row.no) + '" aria-pressed="' + row.included + '" onclick="toggleReviewWindowInclude(' + escapeReviewHtml(row.no) + ')" type="button"><span class="check-box">✓</span></button></td>' +
          '<td>' + (index + 1) + '</td>' +
          '<td>' + escapeReviewHtml(row.loc) + '</td>' +
          '<td style="white-space:pre">' + escapeReviewHtml(row.fab) + '</td>' +
          '<td>' + escapeReviewHtml(row.mt) + '</td>' +
          '<td>' + escapeReviewHtml(row.hw) + '</td>' +
          '<td>' + escapeReviewHtml(row.bt) + '</td>' +
          '<td>' + escapeReviewHtml(row.ctrl) + '</td>';

        if(showSideColumn){
          rowHtml += '<td>' + escapeReviewHtml(row.controlType === 'Cordless' ? '' : row.side) + '</td>';
        }

        if(showLengthColumn){
          rowHtml += '<td>' + escapeReviewHtml(row.controlType === 'Chain / Manual' ? row.len : '') + '</td>';
        }

        rowHtml +=
          '<td' + dimensionCellClass + '>' + escapeReviewHtml(row.w) + '</td>' +
          '<td' + dimensionCellClass + '>' + escapeReviewHtml(row.h) + '</td>' +
          '<td class="review-numeric">' + escapeReviewHtml(row.sf) + '</td>' +
          '<td class="review-numeric" style="white-space:pre">' + escapeReviewHtml(row.pricePerSf) + '</td>' +
          '<td class="review-numeric">' + escapeReviewHtml(row.bld) + '</td>' +
          '<td class="review-numeric">' + escapeReviewHtml(row.sur) + '</td>' +
          '<td class="review-numeric">' + escapeReviewHtml(row.opt) + '</td>' +
          '<td class="review-numeric">' + escapeReviewHtml(row.mot) + '</td>' +
          '<td class="review-numeric" style="font-weight:600;color:#0f172a">' + escapeReviewHtml(row.total) + '</td>';

        tr.innerHTML = rowHtml;
        tbody.appendChild(tr);
        if(supplementApi.hasSupplement(supplements[index])){
          const extra = document.createElement('tr');
          extra.className = 'review-supplement-row';
          extra.innerHTML = '<td></td><td class="review-supplement-arrow" aria-label="Additional information for row ' + (index+1) + '">↳</td><td colspan="' + (columnCount-2) + '">' + supplementApi.supplementMarkup(supplements[index],supplementColumns) + '</td>';
          tbody.appendChild(extra);
        }
      });

      renderReviewSummaryTotals();
    }

    function updateWindowCardPricing(card, sqft, refreshReview = true){
      window.wincoDuo.sync(card);
      window.wincoQuantities.sync(card);
      if(!card) return;
      const head=card.querySelector('[data-headrail-display]');
      window.wincoDependencies.syncOptionCompatibility(card);
      if(head&&!head.classList.contains('placeholder')){
        head.textContent=window.wincoDependencies.normalizeHeadrail(head.textContent);
        if(head.dataset.headrailCode)head.dataset.headrailCode=window.wincoDependencies.normalizeHeadrail(head.dataset.headrailCode);
      }

      const summaryTop = card.querySelector('.win-summary-top');
      const totalEl = card.querySelector('.win-summary-total');
      if(!summaryTop || !totalEl) return;

      const summaryParts = summaryTop.querySelectorAll('span');
      const pricing = getWindowPricing(card);
      const {bld:bldAmount,surcharge:surchargeAmount,option:optionAmount,motor:motorAmount} = pricing;
      const sqftEl = card.querySelector('[data-window-sqft]');
      if(sqftEl) sqftEl.textContent = 'Sqft ' + pricing.sqft;

      if(summaryParts[0]){
        summaryParts[0].textContent = 'BLD ' + formatMeasureMoney(bldAmount);
      }

      if(summaryParts[1]){
        summaryParts[1].textContent = 'SUR ' + formatMeasureMoney(surchargeAmount);
      }

      if(summaryParts[2]){
        summaryParts[2].textContent = 'OPT ' + formatMeasureMoney(optionAmount);
      }

      if(summaryParts[3]){
        summaryParts[3].textContent = 'MOT ' + formatMeasureMoney(motorAmount);
      }

      totalEl.textContent = 'Total ' + formatMeasureMoney(bldAmount + surchargeAmount + optionAmount + motorAmount);

      if(refreshReview && typeof renderReviewTableRows === 'function'){
        renderReviewTableRows();
      }
    }

    function updateAllWindowPricing({refresh = true} = {}){
      try {
        const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));

        windowCards.forEach((card) => {
          const dims = card.querySelectorAll('.dimension-field');
          const widthMm = dims.length >= 2 ? getMmValue(dims[0]) : null;
          const heightMm = dims.length >= 2 ? getMmValue(dims[1]) : null;
          const sqft = calculateCeilingSqftFromMm(widthMm, heightMm);

          updateWindowCardPricing(card, sqft, false);
        });
        if(refresh) renderReviewTableRows();
      } catch (err) {
        console.error('measure pricing update error', err);
      }
    }

    window.updateAllWindowPricing = updateAllWindowPricing;
    window.renderCordlessTypeMenu = renderCordlessTypeMenu;
    window.refreshCordlessTypeMenusForGroup = refreshCordlessTypeMenusForGroup;

    function updateAllWindowSqft({refresh = true} = {}){
      const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));
      windowCards.forEach((card, index) => {
        syncSplitAutoForCard(card);
        const sqftEl = card.querySelector(\`[data-window-sqft="\${index + 1}"]\`);
        const dims = card.querySelectorAll('.dimension-field');
        if(!sqftEl || dims.length < 2){
          return;
        }
        const widthMm = getMmValue(dims[0]);
        const heightMm = getMmValue(dims[1]);
        const sqft = calculateCeilingSqftFromMm(widthMm, heightMm);
        sqftEl.textContent = \`Sqft \${sqft}\`;
        try {
          updateWindowCardPricing(card, sqft, false);
        } catch (err) {
          console.error('measure sqft pricing update error', err);
        }
      });
      if(refresh) renderReviewTableRows();
    }

    function handleMeasureDocumentInput(e) {
      if(e.target.classList.contains('length-input')){
        renderReviewTableRows();
        return;
      }
      if(e.target.classList.contains('dimension-control')){
        const field = e.target.closest('.dimension-field');
        if(field){
          updateFieldMmFromControls(field);
        }
        return;
      }

      if(e.target.classList.contains('split-mm-input')){
        const currentInput = e.target;
        delete currentInput.dataset.mmDisplay;
        syncSplitAutoForCard(currentInput.closest('.card'));
        updateWindowCardPricing(currentInput.closest('.card'),0);
        return;
      }

      if(
        e.target.matches('[data-accessory-qty]') ||
        e.target.matches('[data-accessory-price]') ||
        e.target.matches('[data-accessory-discount-input]')
      ){
        updateAccessoriesTotals(document.querySelector('.accessories'));
      }
    }

    function handleMeasureDocumentChange(e) {
      if(e.target.classList.contains('split-mm-input')){
        window.wincoSplits.render(e.target);
        return;
      }
      if(!e.target.classList.contains('dimension-control')) return;
      const field = e.target.closest('.dimension-field');
      if(field){
        // The input event already captured the exact value. Committing only
        // formats its view, so blur never writes rounding back into the model.
        if(e.target.dataset.role === 'mm') e.target.value = formatMmValue(getMmValue(field));
        else updateFieldMmFromControls(field);
      }
    }

    function handleMeasureDocumentClick(e) {
      const unitMenu = document.getElementById('unitMenu');
      const dropdown = e.target.closest('.dropdown');
      if(unitMenu && !unitMenu.contains(e.target) && !dropdown){
        unitMenu.classList.add('hidden');
      }

      document.querySelectorAll('.client-menu').forEach((clientMenu) => {
        if(clientMenu.classList.contains('split-select-menu')){
          if(!clientMenu.contains(e.target) && !e.target.closest('.split-select-display')){
            clientMenu.classList.add('hidden');
          }
          return;
        }

        const parent = clientMenu.parentElement;
        if(parent && !parent.contains(e.target)){
          clientMenu.classList.add('hidden');
          parent.querySelector('.information-client-choice')?.setAttribute('aria-expanded','false');
        }
      });
    }
    window.cleanupMeasureDocumentEvents = (function(){
      const handlers = [['input', handleMeasureDocumentInput], ['change', handleMeasureDocumentChange], ['click', handleMeasureDocumentClick]];
      handlers.forEach(function(entry){ measurePageLifetime.listen(document,entry[0], entry[1]); });
      return function(){ handlers.forEach(function(entry){ document.removeEventListener(entry[0], entry[1]); }); };
    })();

    function setScreenMode(mode){
      const allowedModes = ['newQuote', 'quoteView'];
      const nextMode = allowedModes.includes(mode) ? mode : 'newQuote';
      document.body.setAttribute('data-screen-mode', nextMode);
    }

    function toggleInformationCard(id='informationCard'){
      const cardEl=document.getElementById(id),bodyEl=cardEl?.querySelector('.info-card-body-hidden'),iconEl=cardEl?.querySelector('[data-information-toggle]');
      if(!bodyEl)return;const isHidden=getComputedStyle(bodyEl).display==='none';bodyEl.style.display=isHidden?'grid':'none';cardEl.classList.toggle('is-collapsed',!isHidden);if(iconEl)iconEl.textContent=isHidden?'▴':'▾';
    }
    window.copyClientInformationToShipping=function(){window.wincoMeasureInformation.copyClientInformation(document,window);};

    function formatCurrency(value){
      return window.wincoFormatReviewMoney(value);
    }

    function getAccessoryDiscountPercent(card){
      const input = document.querySelector('[data-accessory-discount-input]') || card?.querySelector('[data-accessory-discount-input]');
      if(!input) return 0;
      const value = parseFloat(input.value);
      if(!Number.isFinite(value)) return 0;
      return Math.min(100, Math.max(0, value));
    }

    function getAccessoryRowPrice(row){
      if(!row) return 0;

      const savedPrice = String(row.dataset.accessoryPrice || '').trim();
      if(savedPrice){
        return parseMeasureMoney(savedPrice);
      }

      return parseMeasureMoney(row.querySelector('[data-accessory-price]')?.value || '0');
    }

    function calculateAccessoriesTotal(card){
      if(!card) return 0;

      const rows = Array.from(card.querySelectorAll('.accessory-row'));
      const subtotal = rows.reduce((sum, row) => {
        const qty = parseMeasureMoney(row.querySelector('[data-accessory-qty]')?.value || '0');
        const price = getAccessoryRowPrice(row);
        return sum + (qty * price);
      }, 0);

      const discountPercent = getAccessoryDiscountPercent(card);
      return subtotal * (1 - discountPercent / 100);
    }

    function getCurrentAccessoriesTotal(){
      return calculateAccessoriesTotal(document.querySelector('.accessories'));
    }

    function updateAccessoriesTotals(card){
      if(!card) return;

      const previewTotal = calculateAccessoriesTotal(card);

      const previewEl = card.querySelector('[data-accessories-preview-amount]');
      if(previewEl) previewEl.textContent = formatCurrency(previewTotal);

      const summaryEl = document.querySelector('[data-summary-accessories-amount]');
      if(summaryEl){
        summaryEl.textContent = formatCurrency(previewTotal);
        const summaryRow = summaryEl.closest('.summary-row');
        if(summaryRow) summaryRow.classList.toggle('zero', !previewTotal);
      }

      if(typeof renderReviewSummaryTotals === 'function'){
        renderReviewSummaryTotals();
      }
    }

    function updateAccessoriesEmptyState(){
      document.querySelectorAll('.accessories').forEach((card) => {
        const itemsWrap = card.querySelector('.accessories-items');
        const emptyEl = card.querySelector('.accessories-empty');
        if(!itemsWrap || !emptyEl) return;

        const hasItems = itemsWrap.children.length > 0;
        emptyEl.classList.toggle('hidden', hasItems);
      });
    }

    function getMeasureAccessoryPricingItems(){
      const rows = Array.isArray(window.measurePricingAccessoryItems) ? window.measurePricingAccessoryItems : [];

      return rows
        .filter((item) => item && item.is_active !== false && String(item.name || '').trim() && (!window.wincoDependencies.registrySelectionReady || window.wincoDependencies.registrySelectionReady('accessory',item.id)))
        .sort((a, b) => {
          const aSort = a.sort_order == null ? Number.POSITIVE_INFINITY : Number(a.sort_order);
          const bSort = b.sort_order == null ? Number.POSITIVE_INFINITY : Number(b.sort_order);
          if(aSort !== bSort) return aSort - bSort;
          return String(a.name || '').localeCompare(String(b.name || ''), undefined, { numeric: true });
        });
    }

    function formatAccessoryPriceInput(value){
      const amount = parseMeasureMoney(value);
      return Number.isFinite(amount) ? amount.toFixed(2) : '0.00';
    }

    function renderAccessoryMenu(row){
      if(!row) return;

      const menu = row.querySelector('[data-accessory-menu]');
      if(!menu) return;

      menu.innerHTML = '';
      const pricingItems = getMeasureAccessoryPricingItems();

      if(!pricingItems.length){
        const emptyOption = document.createElement('div');
        emptyOption.className = 'client-option';
        emptyOption.textContent = 'No accessories found';
        emptyOption.onclick = (event) => {
          event.stopPropagation();
          menu.classList.add('hidden');
        };
        menu.appendChild(emptyOption);
        return;
      }

      pricingItems.forEach((item) => {
        const option = document.createElement('div');
        option.className = 'client-option';
        option.textContent = String(item.name || '').trim();
        option.dataset.accessoryName = String(item.name || '').trim();
        option.dataset.accessoryPricingId = item.id || '';
        option.dataset.accessoryPrice = String(item.price ?? '0');
        option.onclick = (event) => {
          event.stopPropagation();
          selectAccessoryPricingItem(option);
        };
        menu.appendChild(option);
      });
    }

    function refreshAccessoryPricingMenus(){
      document.querySelectorAll('.accessory-row').forEach((row) => {
        renderAccessoryMenu(row);
      });
    }

    function toggleAccessoryMenu(el, event){
      if(event) event.stopPropagation();

      const wrapper = el ? el.parentElement : null;
      const menu = wrapper ? wrapper.querySelector('[data-accessory-menu]') : null;
      if(!menu) return;

      renderAccessoryMenu(el.closest('.accessory-row'));
      closeOtherDropdownMenus(menu);
      menu.classList.toggle('hidden');
    }

    function selectAccessoryPricingItem(option){
      const row = option ? option.closest('.accessory-row') : null;
      if(!row) return;

      const itemDisplay = row.querySelector('[data-accessory-item]');
      const priceInput = row.querySelector('[data-accessory-price]');
      const priceDisplay = row.querySelector('[data-accessory-price-display]');
      const menu = row.querySelector('[data-accessory-menu]');
      const card = row.closest('.accessories');

      const accessoryName = String(option.dataset.accessoryName || option.textContent || '').trim();
      const accessoryPrice = formatAccessoryPriceInput(option.dataset.accessoryPrice || '0');

      if(itemDisplay){
        itemDisplay.textContent = accessoryName || 'Accessory item';
        itemDisplay.title = accessoryName;
        itemDisplay.dataset.accessoryValue = accessoryName;
        itemDisplay.dataset.accessoryPricingId = option.dataset.accessoryPricingId || '';
        itemDisplay.style.display = 'block';
        itemDisplay.style.minWidth = '0';
        itemDisplay.style.overflow = 'hidden';
        itemDisplay.style.textOverflow = 'ellipsis';
        itemDisplay.style.whiteSpace = 'nowrap';
        itemDisplay.classList.toggle('placeholder', !accessoryName);
      }

      row.dataset.accessoryPrice = accessoryPrice;

      if(priceDisplay){
        priceDisplay.textContent = accessoryPrice;
        priceDisplay.dataset.accessoryPriceValue = accessoryPrice;
      }

      if(priceInput){
        priceInput.readOnly = true;
        priceInput.setAttribute('readonly', 'readonly');
        priceInput.setAttribute('tabindex', '-1');
        priceInput.value = accessoryPrice;
        priceInput.defaultValue = accessoryPrice;
        priceInput.setAttribute('value', accessoryPrice);
        priceInput.dataset.accessoryPriceValue = accessoryPrice;
        priceInput.dispatchEvent(new Event('input', { bubbles: true }));
        priceInput.dispatchEvent(new Event('change', { bubbles: true }));

        window.requestAnimationFrame(function(){
          priceInput.value = accessoryPrice;
          priceInput.defaultValue = accessoryPrice;
          priceInput.setAttribute('value', accessoryPrice);
        });
      }

      if(menu){
        menu.classList.add('hidden');
      }

      updateAccessoriesTotals(card);
    }

    function addAccessoryRow(el){
      const card = el.closest('.accessories');
      if(!card) return;
      const itemsWrap = card.querySelector('.accessories-items');
      if(!itemsWrap) return;

      const row = document.createElement('div');
      row.className = 'accessory-row';
      row.dataset.accessoryPrice = '0.00';
      row.innerHTML = \`
        <div style="position:relative;min-width:0;"><div class="field" onclick="toggleAccessoryMenu(this, event)" style="min-width:0;overflow:hidden;"><span class="placeholder" data-accessory-item style="display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Accessory item</span></div><div class="client-menu hidden" data-accessory-menu></div></div>
        <div class="field"><input type="number" min="0" step="1" value="1" data-accessory-qty /></div>
        <div class="field currency-field"><span data-accessory-price-display style="display:block;width:100%;font:inherit;color:inherit;text-align:left;">0.00</span><input type="hidden" value="0.00" data-accessory-price /></div>
        <button class="btn btn-danger" type="button" onclick="removeAccessoryRow(this)">Del</button>
      \`;
      itemsWrap.appendChild(row);
      renderAccessoryMenu(row);
      row.querySelectorAll('[data-accessory-qty], [data-accessory-price]').forEach((input) => {
        input.addEventListener('input', () => updateAccessoriesTotals(card));
      });

      const priceInput = row.querySelector('[data-accessory-price]');
      if(priceInput){
        priceInput.readOnly = true;
        priceInput.setAttribute('readonly', 'readonly');
        priceInput.setAttribute('tabindex', '-1');
      }
      updateAccessoriesEmptyState();
      updateAccessoriesTotals(card);
    }

    function getFieldValueByLabel(root, labelText){
      if(!root) return '';

      const label = Array.from(root.querySelectorAll('.field-label')).find((item) => item.textContent.trim() === labelText);
      const wrapper = label ? label.parentElement : null;
      const field = wrapper ? wrapper.querySelector('.field, .room-type-combo, .mount-type-combo, .product-combo, .rail-combo') : null;

      if(!field) return '';

      const input = field.querySelector('input, textarea');
      if(input) return String(input.value || '').trim();

      const display = field.querySelector('span:not(.placeholder), [data-room-display]:not(.placeholder), [data-mount-type-display]:not(.placeholder), [data-fabric-display]:not(.placeholder), [data-headrail-display]:not(.placeholder), [data-bottomrail-display]:not(.placeholder)');
      if(display) return String(display.textContent || '').trim();

      if(field.classList.contains('placeholder')) return '';

      return String(field.textContent || '').trim();
    }

    function formatMeasureTagPart(value){
      return String(value || '')
        .trim()
        .replace(/[^a-zA-Z0-9가-힣\\s]/g, '')
        .replace(/\\s+/g, ' ');
    }

    function getMeasureTodayDateParts(){
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');

      return { year, month, day };
    }

    function getMeasureQuoteDateForTag(){
      const parts = getMeasureTodayDateParts();

      return parts.year + '-' + parts.month + '-' + parts.day;
    }

    function buildMeasureQuoteNumberPrefix(){
      const parts = getMeasureTodayDateParts();
      const shortYear = String(parts.year).slice(-2);

      return 'Q' + shortYear + parts.month + parts.day;
    }

    function buildMeasureQuoteNumber(sequenceNumber = 1){
      const prefix = buildMeasureQuoteNumberPrefix();
      const cleanSequenceNumber = Math.max(1, Number(sequenceNumber) || 1);
      return prefix + '-' + String(cleanSequenceNumber).padStart(2, '0');
    }

    async function getNextMeasureQuoteNumber(){
      const prefix = buildMeasureQuoteNumberPrefix();

      if(!window.supabaseClient){
        return buildMeasureQuoteNumber(1);
      }

      const { data, error } = await window.supabaseClient.rpc('winco_next_quote_number', { p_prefix: prefix });
      if(error || !data){
        console.error('Failed to preview next measure quote number', error);
        return buildMeasureQuoteNumber(1);
      }
      return String(data);
    }

    async function updateMeasureQuoteNumberDisplay(){
      const quoteNumberEl = document.querySelector('.meta div[style*="font-size:16px"]');
      if(!quoteNumberEl) return '';

      const requestVersion = (Number(window.measureQuoteNumberRequestVersion) || 0) + 1;
      window.measureQuoteNumberRequestVersion = requestVersion;

      const quoteNumber = await getNextMeasureQuoteNumber();

      if(requestVersion !== window.measureQuoteNumberRequestVersion){
        return getMeasureQuoteNumber();
      }

      quoteNumberEl.textContent = '# ' + quoteNumber;
      quoteNumberEl.dataset.measureQuoteNumber = quoteNumber;

      return quoteNumber;
    }

    function getMeasureQuoteNumber(){
      const quoteNumberEl = document.querySelector('.meta div[style*="font-size:16px"]');
      const dataValue = quoteNumberEl ? String(quoteNumberEl.dataset.measureQuoteNumber || '').trim() : '';
      if(dataValue) return dataValue;

      return String(quoteNumberEl?.textContent || '').replace(/^#\\s*/, '').trim();
    }

    function setMeasureQuoteNumberDisplay(quoteNumber){
      window.measureQuoteNumberRequestVersion = (Number(window.measureQuoteNumberRequestVersion) || 0) + 1;
      const quoteNumberEl = document.querySelector('.meta div[style*="font-size:16px"]');
      const cleanQuoteNumber = String(quoteNumber || '').trim();
      if(!quoteNumberEl || !cleanQuoteNumber) return '';

      quoteNumberEl.textContent = '# ' + cleanQuoteNumber;
      quoteNumberEl.dataset.measureQuoteNumber = cleanQuoteNumber;

      return cleanQuoteNumber;
    }

    function clearMeasureDraftStorage(){
      window.clearMeasureDraftState?.();
    }

    function saveCurrentMeasureDomAsDraft(){
      window.saveMeasureDraftState?.();
    }

    function getMeasureAddressForTag(address){
      const match = String(address || '').match(/\\d+/);
      return match ? match[0] : '';
    }

    function buildMeasureTagValue(name, address){
      const cleanName = formatMeasureTagPart(name);
      const cleanAddress = formatMeasureTagPart(getMeasureAddressForTag(address));

      if(!cleanName || !cleanAddress) return '';

      return cleanName + '-' + cleanAddress;
    }

    function updateMeasureTagCard(card){
      if(card) return window.forceMeasureTagRefresh();
    }

    function updateMeasureTagValue(event){
      return window.forceMeasureTagRefresh ? window.forceMeasureTagRefresh() : '';
    }

    function bindMeasureTagInputs(){
      const tagEvents = ['input', 'change', 'keyup', 'blur', 'paste'];

      const refreshMeasureTagValue = () => {
        updateMeasureTagValue();
        measurePageLifetime.delay(updateMeasureTagValue, 0);
      };

      document.querySelectorAll('[data-measure-name-input], [data-measure-address-input]').forEach((input) => {
        if(!input || input.dataset.measureTagBound === 'true') return;

        input.dataset.measureTagBound = 'true';
        tagEvents.forEach((eventName) => {
          input.addEventListener(eventName, refreshMeasureTagValue);
        });
      });

      if(window.measureTagDocumentHandlers){
        Object.keys(window.measureTagDocumentHandlers).forEach((eventName) => {
          document.removeEventListener(eventName, window.measureTagDocumentHandlers[eventName], true);
        });
      }

      window.measureTagDocumentHandlers = {};
      tagEvents.forEach((eventName) => {
        const handler = (event) => {
          const target = event && event.target ? event.target : null;
          if(target && target.matches && target.matches('[data-measure-name-input], [data-measure-address-input]')){
            refreshMeasureTagValue(event);
          }
        };

        window.measureTagDocumentHandlers[eventName] = handler;
        measurePageLifetime.listen(document,eventName, handler, true);
      });

      updateMeasureTagValue();
      measurePageLifetime.delay(updateMeasureTagValue, 0);
      measurePageLifetime.delay(updateMeasureTagValue, 100);
      measurePageLifetime.delay(updateMeasureTagValue, 500);
    }

    window.updateMeasureTagValue = updateMeasureTagValue;
    window.bindMeasureTagInputs = bindMeasureTagInputs;

    function getInformationCardData(){
      window.forceMeasureTagRefresh?.();
      return {...window.wincoMeasureInformation.readShippingInformation(document),
        installationDate:window.wincoNormalizeInstallationDate(document.querySelector('[data-installation-date]')?.value),
        installationTime:window.wincoNormalizeInstallationTime(document.querySelector('[data-installation-time]')?.value)};
    }

    function getCheckedOptionLabels(container){
      if(!container) return [];

      return Array.from(container.querySelectorAll('.check.checked'))
        .map((button) => String(getCheckButtonLabel(button) || '').trim())
        .filter(Boolean);
    }

    function getWindowOptionState(card){
      if(!card){
        return {
          general: [],
          chain: [],
          cordless: [],
        };
      }

      return {
        general: getCheckedOptionLabels(card.querySelector('[data-general-option-box]')),
        chain: getCheckedOptionLabels(card.querySelector('[data-chain-option-section]')),
        cordless: getCheckedOptionLabels(card.querySelector('[data-cordless-option-section]')),
      };
    }

    function getSelectedConfigValue(card){
      if(!card) return 'Single';

      const configLabel = Array.from(card.querySelectorAll('.field-label')).find(
        (label) => label.textContent.trim() === 'Config'
      );
      const configSpan = configLabel?.parentElement?.querySelector('.field span');
      const value = String(configSpan?.textContent || '').trim();

      return ['Multi', 'Linked', 'Multi + Linked'].includes(value) ? value : 'Single';
    }

    function getSplitStateForCard(card){
      if(!card) return [];

      return Array.from(card.querySelectorAll('[data-split-fields] .split-item')).map((item) => {
        const input = item.querySelector('.split-mm-input');
        const ctrl = item.querySelector('.split-select-display');

        return {
          widthMm: window.wincoSplits.read(input),
          ctrl: ctrl ? String(ctrl.textContent || 'None').trim() || 'None' : 'None',
          autoCalculated: input?.dataset.autoFilled === 'true',
          linkedToNext: item.dataset.linkedToNext === undefined ? getSelectedConfigValue(card) === 'Linked' : item.dataset.linkedToNext === 'true',
        };
      });
    }

    function getWindowCardMeasureData(card, index){
      const dims = card.querySelectorAll('.dimension-field');
      const widthMm = dims.length >= 2 ? getMmValue(dims[0]) : 0;
      const heightMm = dims.length >= 2 ? getMmValue(dims[1]) : 0;
      const pricing = getWindowPricing(card);
      const {sqft,bld:bldAmount,surcharge:surchargeAmount,option:optionAmount,motor:motorAmount} = pricing;

      const fabricDisplay = card.querySelector('[data-fabric-display]');
      const fabricColorDisplay = card.querySelector('[data-fabric-color-display]');
      const headrailDisplay = card.querySelector('[data-headrail-display]');
      const headrailWrapper = headrailDisplay ? headrailDisplay.closest('.col-3') : null;
      const bottomrailDisplay = card.querySelector('[data-bottomrail-display]');
      const bottomrailWrapper = bottomrailDisplay ? bottomrailDisplay.closest('.col-3') : null;
      const motorDisplay = card.querySelector('[data-motor-section] .field span');
      const sidemarkInput = card.querySelector('[data-sidemark-input]');

      return {
        no: index + 1,
        included: !!card.querySelector('.window-head .check.checked'),
        config: getSelectedConfigValue(card),
        splits: getSplitStateForCard(card),
        ...(pricing.sectionPricing ? {sectionPricing:pricing.sectionPricing} : {}),
        group: getSelectedGroupValue(card),
        location: getWindowFloorValue(index + 1) || '',
        room: getValidationRoomText(card),
        sidemark: sidemarkInput ? String(sidemarkInput.value || '').trim() : '',
        fabric: getValidationDisplayText(fabricDisplay),
        fabricId: fabricDisplay?.dataset.fabricId || '',
        fabricColor: getValidationDisplayText(fabricColorDisplay),
        mount: getMountValueForCard(card),
        headrail: getValidationDisplayText(headrailDisplay),
        headrailMeta: {
          id: headrailDisplay ? String(headrailDisplay.dataset.headrailId || '').trim() : '',
          code: headrailDisplay ? String(headrailDisplay.dataset.headrailCode || '').trim() : '',
          description: headrailDisplay ? String(headrailDisplay.dataset.headrailDescription || '').trim() : '',
          pricingType: headrailDisplay ? String(headrailDisplay.dataset.headrailPricingType || '').trim() : '',
        },
        headrailColor: getValidationRailColorText(headrailWrapper),
        bottomrail: getValidationDisplayText(bottomrailDisplay),
        bottomrailMeta:{id:bottomrailDisplay?.dataset.bottomrailId || '',code:bottomrailDisplay?.dataset.bottomrailCode || ''},
        bottomrailColor: getValidationRailColorText(bottomrailWrapper),
        control: getValidationFieldTextByLabel(card, 'Control Type'),
        controlFamily: window.wincoDependencies.controlFamily(window.wincoDependencies.readProductState(card).control),
        controlSide: window.wincoDependencies.isCordless(window.wincoDependencies.readProductState(card).control)?'':getValidationFieldTextByLabel(card, 'Ctrl Side'),
        length: getReviewLengthText(card),
        noChainWeight: !!card?.querySelector('[data-chain-weight-toggle].checked'),
        cordlessType: getSelectedCordlessTypeCode(card),
        dependencyVersion: window.wincoDependencies.DEPENDENCY_VERSION,
        motorName: getValidationDisplayText(motorDisplay),
        motorCode: motorDisplay?.dataset.motorCode || '',
        motorPricingId: motorDisplay?.dataset.motorPricingId || '',
        channelChargeCategory: getWindowChannelChargeCategory(card),
        optionState: getWindowOptionState(card),
        memo: String(card.querySelector('[data-memo-input]')?.value || '').trim(),
        widthMm,
        heightMm,
        sqft,
        ...window.wincoDuo.read(card),
        chargeQuantities: window.wincoQuantities.read(card),
        bld: bldAmount,
        surcharge: surchargeAmount,
        option: optionAmount,
        motor: motorAmount,
        total: bldAmount + surchargeAmount + optionAmount + motorAmount,
      };
    }

    function getAccessoriesData(){
      const card = document.querySelector('.accessories');
      if(!card) return { rows: [], subtotal: 0, discountPercent: 0, total: 0 };

      const rows = Array.from(card.querySelectorAll('.accessory-row')).map((row, index) => {
        const qty = parseMeasureMoney(row.querySelector('[data-accessory-qty]')?.value || '0');
        const price = getAccessoryRowPrice(row);

        return {
          no: index + 1,
          item: String(row.querySelector('[data-accessory-item]')?.dataset.accessoryValue || row.querySelector('[data-accessory-item]')?.value || row.querySelector('[data-accessory-item]')?.textContent || '').trim(),
          ...(row.querySelector('[data-accessory-item]')?.dataset.accessoryPricingId?{pricingId:row.querySelector('[data-accessory-item]').dataset.accessoryPricingId}:{}),
          qty,
          price,
          subtotal: qty * price,
        };
      });

      const subtotal = rows.reduce((sum, row) => sum + row.subtotal, 0);
      const discountPercent = getAccessoryDiscountPercent(card);
      const total = subtotal * (1 - discountPercent / 100);

      return {
        rows,
        subtotal,
        discountPercent,
        total,
      };
    }

    function getReviewSummaryData(){
      const totalRow = document.querySelector('.summary-card .summary-total span:last-child');
      const gstRow = Array.from(document.querySelectorAll('.summary-card .summary-row')).find((row) => row.querySelector('span:first-child')?.textContent.trim() === 'GST');
      const finalRow = document.querySelector('.summary-card .summary-final span:last-child');
      const subtotalBase = document.querySelector('[data-summary-key="subtotal"]')?.dataset?.summaryBaseAmount;

      return {
        totalSqft: parseMeasureMoney(document.querySelector('.tfoot-note')?.textContent || ''),
        blinds: getSummaryDisplayedAmount('Blinds'),
        surcharge: getSummaryDisplayedAmount('Surcharge'),
        option: getSummaryDisplayedAmount('Option'),
        subtotal: subtotalBase === undefined ? getSummaryDisplayedAmount('Subtotal') : parseMeasureMoney(subtotalBase),
        motor: getSummaryDisplayedAmount('Motor'),
        install: getReviewNumberByLabel('Install'),
        extraFee: getReviewNumberByLabel('Extra Fee'),
        fee: getSummaryDisplayedAmount('Fee (Install + Extra)'),
        accessories: getSummaryDisplayedAmount('Accessories'),
        bldSurDiscountPercent: getReviewNumberByLabel('BLD / SUR Disc. %'),
        optDiscountPercent: getReviewNumberByLabel('OPT Disc. %'),
        motDiscountPercent: getReviewNumberByLabel('MOT Disc. %'),
        discount: Math.abs(getSummaryDisplayedAmount('Discount')),
        total: totalRow ? parseMeasureMoney(totalRow.textContent) : 0,
        gst: gstRow ? parseMeasureMoney(gstRow.querySelector('span:last-child')?.textContent || '') : 0,
        finalTotal: finalRow ? parseMeasureMoney(finalRow.textContent) : 0,
      };
    }

    function refreshReviewClientInfo(){
      const info=getInformationCardData(),client=window.wincoMeasureInformation.readClientInformation(document);
      Object.entries(info).forEach(([key,value])=>{const el=document.querySelector('[data-review-client-'+key+']');if(el)el.textContent=value||'—';});
      const tag=document.querySelector('[data-review-client-tag]');if(tag)tag.textContent=window.wincoMeasureInformation.formatQuoteTag(info.tag,info.label)||'—';
      Object.entries({...client,client:client.name||client.mode==='new'&&'New client'||''}).forEach(([key,value])=>{const el=document.querySelector('[data-review-invoice-'+key+']');if(el)el.textContent=value||'—';});
      const comments=document.querySelector('[data-review-comments-row]');if(comments)comments.hidden=!info.comments;
    }

    function collectMeasureQuoteData(){
      if(typeof renderReviewSummaryTotals === 'function'){
        renderReviewSummaryTotals();
      }

      const quoteNumber = getMeasureQuoteNumber();
      const quoteDate = String(document.querySelector('.meta-right span')?.textContent || '').trim();
      const unit = String(document.getElementById('unitLabel')?.textContent || '').trim();

      const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));
      const windows = windowCards.map((card, index) => getWindowCardMeasureData(card, index));

      return {
        quoteNumber,
        quoteDate,
        unit,
        information: getInformationCardData(),
        informationVersion:2,clientInformation:window.wincoMeasureInformation.readClientInformation(document),
        windows,
        excludedWindowCount: windows.filter((windowRow) => !windowRow.included).length,
        accessories: getAccessoriesData(),
        summary: getReviewSummaryData(),
      };
    }

    window.collectMeasureQuoteData = collectMeasureQuoteData;

    function removeAccessoryRow(el){
      const row = el.closest('.accessory-row');
      const card = el.closest('.accessories');
      if(row) row.remove();
      updateAccessoriesEmptyState();
      updateAccessoriesTotals(card);
    }

    function getValidationDisplayText(el){
      if(!el) return '';
      if(el.classList && el.classList.contains('placeholder')) return '';
      return String(el.textContent || el.value || '').trim();
    }

    function getValidationFieldTextByLabel(card, labelText){
      if(!card) return '';
      if(labelText === 'Ctrl Side') return window.wincoConfiguration.readControlSide(card);

      const label = Array.from(card.querySelectorAll('.field-label')).find((item) => item.textContent.trim() === labelText);
      const wrapper = label ? label.parentElement : null;
      const field = wrapper ? wrapper.querySelector('.field') : null;
      if(!field) return '';

      const input = field.querySelector('input');
      if(input) return String(input.value || '').trim();

      const span = field.querySelector('span');
      if(span && span.classList.contains('placeholder')) return '';

      return String(field.textContent || '').trim();
    }

    function getValidationRoomText(card){
      const roomInput = card.querySelector('[data-room-input]');
      if(roomInput) return String(roomInput.value || '').trim();

      const roomDisplay = card.querySelector('[data-room-display]');
      return getValidationDisplayText(roomDisplay);
    }

    function getValidationRailColorText(wrapper){
      if(!wrapper) return '';

      const colorSegs = Array.from(wrapper.querySelectorAll('.rail-seg.clickable')).filter((seg) => {
        return !seg.hasAttribute('data-headrail-display') && !seg.hasAttribute('data-bottomrail-display');
      });

      const colorSeg = colorSegs[colorSegs.length - 1];
      return getValidationDisplayText(colorSeg);
    }

    function validateMeasureWindowCard(card, index){
      const warnings = [];
      if(!card) return warnings;

      const windowLabel = 'Window #' + (index + 1);
      const isIncluded = !!card.querySelector('.window-head .check.checked');

      if(!isIncluded){
        return warnings;
      }

      const dims = card.querySelectorAll('.dimension-field');
      const widthMm = dims.length >= 2 ? getMmValue(dims[0]) : 0;
      const heightMm = dims.length >= 2 ? getMmValue(dims[1]) : 0;

      const floorText = getValidationFieldTextByLabel(card, 'Location');
      const roomText = getValidationRoomText(card);
      const mountText = getMountValueForCard(card);
      const groupText = getSelectedGroupValue(card);
      const fabricText = getValidationDisplayText(card.querySelector('[data-fabric-display]'));
      const fabricColorText = getValidationDisplayText(card.querySelector('[data-fabric-color-display]'));
      const headrailDisplay = card.querySelector('[data-headrail-display]');
      const headrailText = getValidationDisplayText(headrailDisplay);
      const headrailColorText = getValidationRailColorText(headrailDisplay ? headrailDisplay.closest('.col-3') : null);
      const bottomrailDisplay = card.querySelector('[data-bottomrail-display]');
      const bottomrailText = getValidationDisplayText(bottomrailDisplay);
      const bottomrailColorText = getValidationRailColorText(bottomrailDisplay ? bottomrailDisplay.closest('.col-3') : null);
      const controlTypeText = getValidationFieldTextByLabel(card, 'Control Type');

      const requiredFields = [
        ['Location', floorText],
        ['Room', roomText],
        ['Width', widthMm > 0 ? String(widthMm) : ''],
        ['Height', heightMm > 0 ? String(heightMm) : ''],
        ['Mount', mountText],
        ['Group', groupText],
        ['Fabric', fabricText],
        ['Fabric Color', fabricColorText],
        ['Head rail', headrailText],
        ['Head rail Color', headrailColorText],
        ['Bottom rail', bottomrailText],
        ['Bottom rail Color', bottomrailColorText],
        ['Control Type', controlTypeText],
      ];

      warnings.push(...window.wincoDuo.duoFabricIssues(window.wincoDuo.read(card)).map(message=>windowLabel + ': ' + message));

      requiredFields.forEach(([fieldName, value]) => {
        if(!String(value || '').trim()){
          warnings.push(windowLabel + ': ' + fieldName + ' is missing');
        }
      });

      const normalizedControlType = String(controlTypeText || '').trim().toLowerCase();

      if(normalizedControlType === 'chain / manual'){
        const ctrlSide = getValidationFieldTextByLabel(card, 'Ctrl Side');
        const lengthSection = card.querySelector('[data-chain-length-section]');
        const lengthInput = lengthSection ? lengthSection.querySelector('.length-input') : null;
        const lengthValue = lengthInput ? String(lengthInput.value || '').trim() : '';

        if(!window.wincoConfiguration.isCardDivided(card) && !ctrlSide){
          warnings.push(windowLabel + ': Ctrl Side is missing');
        }

        if(!lengthValue || parseMeasureMoney(lengthValue) <= 0){
          warnings.push(windowLabel + ': Length is missing');
        }
      }

      if(normalizedControlType === 'cordless'){
        const cordlessType = getValidationDisplayText(card.querySelector('[data-cordless-type-section] .field span'));
        if(!cordlessType){
          warnings.push(windowLabel + ': Cordless Type is missing');
        }
      }

      if(normalizedControlType === 'motorized'){
        const motor = getValidationDisplayText(card.querySelector('[data-motor-section] .field span'));
        if(!motor){
          warnings.push(windowLabel + ': Motor is missing');
        }
      }

      return warnings;
    }

    function validateMeasureAccessoriesData(payload){
      const warnings = [];
      const accessories = payload && payload.accessories ? payload.accessories : {};
      const rows = Array.isArray(accessories.rows) ? accessories.rows : [];

      rows.forEach((row, index) => {
        const accessoryLabel = 'Accessory #' + (index + 1);

        if(!String(row.item || '').trim()){
          warnings.push(accessoryLabel + ': Item is missing');
        }

        if(!Number.isFinite(Number(row.qty)) || Number(row.qty) <= 0){
          warnings.push(accessoryLabel + ': Qty is missing');
        }

        if(!Number.isFinite(Number(row.price)) || Number(row.price) <= 0){
          warnings.push(accessoryLabel + ': Price is missing');
        }
      });

      return warnings;
    }

    function validateMeasureQuoteData(payload){
      const warnings = [];

      if(!payload){
        warnings.push('Quote payload is missing');
        return warnings;
      }

      const information = payload.information || {};
      const windows = Array.isArray(payload.windows) ? payload.windows : [];

      if(payload.excludedWindowCount > 0){
        warnings.push(payload.excludedWindowCount + ' excluded window item(s) exist');
      }

      if(!String(information.client || '').trim()){
        warnings.push('Information: Client is missing');
      }


      if(!String(information.type || '').trim()){
        warnings.push('Information: Type is missing');
      }

      if(!String(information.name || '').trim()){
        warnings.push('Information: Name is missing');
      }

      if(!String(information.address || '').trim()){
        warnings.push('Information: Address is missing');
      }

      if(!String(information.phone || '').trim()){
        warnings.push('Information: Phone is missing');
      }

      if(!String(information.email || '').trim()){
        warnings.push('Information: Email is missing');
      }

      if(!String(information.comments || '').trim()){
        warnings.push('Information: General Comments is missing');
      }

      if(!windows.length){
        warnings.push('No window rows exist');
      }

      if(windows.length && !windows.some((windowRow) => windowRow.included)){
        warnings.push('No included window rows exist');
      }

      Array.from(document.querySelectorAll('.card'))
        .filter((card) => card.querySelector('.window-head'))
        .forEach((card, index) => {
          warnings.push(...validateMeasureWindowCard(card, index));
        });

      warnings.push(...validateMeasureAccessoriesData(payload));

      return warnings;
    }

    window.validateMeasureQuoteData = validateMeasureQuoteData;

    function formatMeasureSaveWarningMessage(warnings){
      const warningList = Array.isArray(warnings) ? warnings : [];
      const groups = {};

      warningList.forEach((warning) => {
        const text = String(warning || '').trim();
        if(!text) return;

        const parts = text.split(':');
        const groupName = parts.length > 1 ? parts.shift().trim() : 'Other';
        const itemText = parts.length ? parts.join(':').trim() : text;

        if(!groups[groupName]){
          groups[groupName] = [];
        }

        groups[groupName].push(itemText);
      });

      const groupedText = Object.keys(groups).map((groupName) => {
        return groupName + '\\n' + groups[groupName].map((item) => '- ' + item).join('\\n');
      }).join('\\n\\n');

      return 'The following items are missing or need attention:\\n\\n'
        + groupedText
        + '\\n\\nDo you want to continue anyway?';
    }

    function prepareMeasureQuoteSave(payload){
      console.log('Measure quote ready to save', payload);
      return {
        payload,
        prepared: true,
      };
    }

    async function resolveMeasureQuoteClient(information){
      return window.wincoResolveQuoteClient(information);
    }

    async function saveMeasureQuoteToSupabase(payload, options = {}){
      const context = options.context || window.measureSaveContext;
      const cancelled = () => ({saved:false,cancelled:true});
      if(context && !context.active) return cancelled();
      if(!payload){
        return {
          saved: false,
          reason: 'missing payload',
        };
      }

      const dependencyErrors=(payload.windows||[]).filter(row=>row.included!==false).flatMap((row,index)=>[...window.wincoDependencies.windowIssues(row),...window.wincoQuantities.issues(row).map(message=>({message}))].map(issue=>'Window '+(row.no||index+1)+': '+issue.message));
      if(dependencyErrors.length){alert('Please correct these product combinations before saving:\\n'+dependencyErrors.join('\\n'));return {saved:false,reason:'invalid product combination',errors:dependencyErrors};}
      if(!window.supabaseClient){
        console.error('Supabase client is not available');
        return {
          saved: false,
          reason: 'missing supabase client',
        };
      }

      const splitErrors=(payload.windows||[]).filter(row=>row.included!==false).flatMap((row,index)=>window.wincoSplits.issues(row).map(message=>'Window '+(row.no||index+1)+': '+message));
      if(splitErrors.length) return {saved:false,reason:splitErrors.join(' ')};

      const information = payload.information || {};
      const summary = payload.summary || {};
      const accessories = payload.accessories || {};
      const windows = Array.isArray(payload.windows) ? payload.windows : [];
      const accessoryRows = Array.isArray(accessories.rows) ? accessories.rows : [];

      const editingQuoteId = String(
        options.editingQuoteId || window.measureEditingQuoteId || ''
      ).trim();
      const shouldOverwriteExisting =
        options.overwriteExisting === true && !!editingQuoteId;

      if(options.overwriteExisting === true && (!editingQuoteId || !window.measureEditingRevision)){
        return {saved:false,reason:'Reopen this quote before overwriting it. Your edits are still on this screen.'};
      }

      const prepare = async () => {
        const resolvedClient = await resolveMeasureQuoteClient(payload.clientInformation || information);
        if(context && !context.active) throw Object.assign(new Error('Your account changed. Reopen this page before trying again.'),{code:'CLIENT_SAVE_CANCELLED'});
        const quoteRow = {
          quote_number: payload.quoteNumber || null,
          quote_date: payload.quoteDate || null,
          unit: payload.unit || null,

          tag: information.tag || null,
          client_id: resolvedClient && resolvedClient.clientId ? resolvedClient.clientId : null,

          client: window.wincoClientLabel(information.client) || information.name || null,
          quote_type: information.type || null,

          customer_name: information.name || null,
          address: information.address || null,
          phone: information.phone || null,
          email: information.email || null,
          general_comments: information.comments || null,

          excluded_window_count: payload.excludedWindowCount || 0,

          total_sqft: summary.totalSqft || 0,
          blinds_total: summary.blinds || 0,
          surcharge_total: summary.surcharge || 0,
          option_total: summary.option || 0,
          subtotal: summary.subtotal || 0,
          motor_total: summary.motor || 0,
          install_fee: summary.install || 0,
          extra_fee: summary.extraFee || 0,
          fee_total: summary.fee || 0,
          accessories_total: summary.accessories || 0,

          bld_sur_discount_percent: summary.bldSurDiscountPercent || 0,
          opt_discount_percent: summary.optDiscountPercent || 0,
          mot_discount_percent: summary.motDiscountPercent || 0,
          discount_total: summary.discount || 0,

          total_before_gst: summary.total || 0,
          gst: summary.gst || 0,
          final_total: summary.finalTotal || 0,

          raw_payload: payload,
        };

        const quoteId = shouldOverwriteExisting ? editingQuoteId : null;
        const windowRows = windows.map((windowRow) => ({
          quote_id: quoteId,
          window_no: windowRow.no || null,
          included: windowRow.included !== false,
          product_group: windowRow.group || null,

          location: windowRow.location || null,
          room: windowRow.room || null,
          sidemark: windowRow.sidemark || null,

          fabric: windowRow.fabric || null,
          fabric_color: windowRow.fabricColor || null,
          mount: windowRow.mount || null,

          headrail: windowRow.headrail || null,
          headrail_color: windowRow.headrailColor || null,
          bottomrail: windowRow.bottomrail || null,
          bottomrail_color: windowRow.bottomrailColor || null,

          control_type: windowRow.control || null,
          control_side: windowRow.controlSide || null,
          chain_length: windowRow.length || null,
          cordless_type: windowRow.cordlessType || null,
          motor: windowRow.motorName || null,

          width_mm: windowRow.widthMm || 0,
          height_mm: windowRow.heightMm || 0,
          sqft: windowRow.sqft || 0,
          price_per_sqft: windowRow.pricePerSqft || 0,

          bld: windowRow.bld || 0,
          surcharge: windowRow.surcharge || 0,
          option_total: windowRow.option || 0,
          motor_total: windowRow.motor || 0,
          total: windowRow.total || 0,

          raw_window: windowRow,
        }));

        const accessoryInsertRows = accessoryRows.map((accessoryRow) => ({
          quote_id: quoteId,
          accessory_no: accessoryRow.no || null,
          item: accessoryRow.item || null,
          qty: accessoryRow.qty || 0,
          price: accessoryRow.price || 0,
          subtotal: accessoryRow.subtotal || 0,
          raw_accessory: accessoryRow,
        }));

        return {quote:quoteRow,windows:windowRows,accessories:accessoryInsertRows};
      };

      try {
        const data = shouldOverwriteExisting
          ? await (context?.overwrite || window.overwriteMeasureQuote)({quoteId:editingQuoteId,revision:window.measureEditingRevision,...await prepare()})
          : await (context?.create || window.createMeasureQuote)({payload,prepare});
        if(context && !context.active) return cancelled();
        if(data.quote_number){payload.quoteNumber=data.quote_number;setMeasureQuoteNumberDisplay(data.quote_number);}
        if(data.client_id){
          payload.information.clientId=data.client_id;
          payload.information.client=data.client;
          if(data.client_information){payload.clientInformation=data.client_information;window.wincoMeasureInformation.setClientInformation(document,data.client_information,window);}
        }
        return {saved:true,quoteId:data.id,updated:shouldOverwriteExisting};
      } catch(error){
        if(context && !context.active) return cancelled();
        if(error.code==='CLIENT_SAVE_CANCELLED') return {saved:false,cancelled:true};
        console.error('Failed to confirm quote save',error);
        if(error.createdQuote){
          window.measureEditingQuoteId=error.createdQuote.id;
          window.measureEditingRevision=error.createdQuote.revision;
          setMeasureQuoteNumberDisplay(error.createdQuote.quote_number);
          try {window.sessionStorage.setItem('wincoEditMeasureQuoteId',error.createdQuote.id);} catch { /* Keep the current draft. */ }
        }
        return {saved:false,reason:error.message||'Could not confirm the save. Please retry.',error};
      }
    }

    function askMeasureEditSaveMode(){
      return new Promise((resolve) => {
        const existing = document.querySelector('[data-measure-edit-save-choice]');
        if(existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.setAttribute('data-measure-edit-save-choice', '');
        overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(15,23,42,0.36);display:flex;align-items:center;justify-content:center;padding:24px;';

        const panel = document.createElement('div');
        panel.style.cssText = 'width:min(460px,100%);background:#fff;border-radius:18px;padding:24px;box-shadow:0 20px 60px rgba(15,23,42,0.22);';

        const title = document.createElement('div');
        title.textContent = 'Save Quote';
        title.style.cssText = 'font-size:20px;font-weight:700;color:#172033;margin-bottom:10px;';

        const message = document.createElement('div');
        message.textContent = 'How would you like to save these changes?';
        message.style.cssText = 'font-size:14px;line-height:1.55;color:#536176;margin-bottom:22px;';

        const actions = document.createElement('div');
        actions.style.cssText = 'display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap;';

        const overwriteButton = document.createElement('button');
        overwriteButton.type = 'button';
        overwriteButton.textContent = 'Overwrite Existing Quote';
        overwriteButton.style.cssText = 'height:40px;padding:0 16px;border:1px solid #d7dce5;border-radius:10px;background:#fff;color:#344054;font-weight:600;cursor:pointer;';

        const newButton = document.createElement('button');
        newButton.type = 'button';
        newButton.textContent = 'Save as New Quote';
        newButton.style.cssText = 'height:40px;padding:0 16px;border:1px solid #172033;border-radius:10px;background:#172033;color:#fff;font-weight:600;cursor:pointer;';

        const finish = (mode) => {
          overlay.remove();
          resolve(mode);
        };

        overwriteButton.addEventListener('click', () => finish('overwrite'));
        newButton.addEventListener('click', () => finish('new'));
        overlay.addEventListener('click', (event) => {
          if(event.target === overlay) finish('');
        });

        actions.appendChild(overwriteButton);
        actions.appendChild(newButton);
        panel.appendChild(title);
        panel.appendChild(message);
        panel.appendChild(actions);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
      });
    }

    async function prepareNextMeasureQuoteAfterSave(options = {}){
      window.createMeasureQuote?.reset();
      window.measureWindowHistory?.clear();
      const shouldUpdateQuoteNumber = !(options && options.skipQuoteNumberUpdate);
      if(document.getElementById('clientInformationCard'))window.wincoMeasureInformation.setClientInformation(document,{},window);
      const informationCard = document.getElementById('informationCard');

      if(informationCard){
        const installationDate = document.querySelector('[data-installation-date]');
        if(installationDate) installationDate.value = '';
        const installationTime = document.querySelector('[data-installation-time]');
        if(installationTime) { installationTime.value = ''; installationTime.disabled = true; }
        informationCard.querySelectorAll('.info-input').forEach((input) => {
          input.value = '';
          input.setAttribute('value', '');
        });

        const commentsInput = informationCard.querySelector('.info-comments-input');
        if(commentsInput){
          commentsInput.value = '';
        }

        const tagDisplay = informationCard.querySelector('[data-measure-tag-display]');
        if(tagDisplay){
          tagDisplay.textContent = 'Tag';
          tagDisplay.title = '';
          tagDisplay.classList.add('placeholder');
          delete tagDisplay.dataset.measureTagValue;
          delete tagDisplay.dataset.measureTagMode;
          delete tagDisplay.dataset.measureTagSource;
        }

        const resetInfoField = function(labelText, placeholderText){
          const label = Array.from(informationCard.querySelectorAll('.field-label')).find((item) => item.textContent.trim() === labelText);
          const wrapper = label ? label.parentElement : null;
          const field = wrapper ? wrapper.querySelector('.field') : null;
          const span = field ? field.querySelector('span') : null;

          if(span){
            span.textContent = placeholderText;
            span.title = '';
            span.classList.add('placeholder');
            if(labelText === 'Client'){
              delete span.dataset.clientId;
              delete span.dataset.clientAccount;
              delete span.dataset.clientCompany;
            }
          }
        };

        resetInfoField('Client', 'Select...');
        const typeLabel = Array.from(informationCard.querySelectorAll('.field-label')).find(item => item.textContent.trim() === 'Type');
        window.renderMeasureTypeValue?.(typeLabel?.parentElement);
        resetInfoField('Type', 'Type');
      }

      const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));
      const firstWindowCard = windowCards[0];

      windowCards.slice(1).forEach((card) => card.remove());

      if(firstWindowCard && typeof resetWindowCardToDefault === 'function'){
        resetWindowCardToDefault(firstWindowCard);
      }
      if(!firstWindowCard)addWindowRow(document.querySelector('.measure-page .actions button'));

      document.querySelectorAll('.client-menu').forEach((menu) => {
        menu.classList.add('hidden');
      });

      document.querySelectorAll('.accessory-row').forEach((row) => {
        row.remove();
      });

      const reviewInputs = Array.from(document.querySelectorAll('.review-number-input[data-review-calc-input]'));
      const reviewDefaultValues = ['0', '0', '0', '0', '0'];
      reviewInputs.forEach((input, index) => {
        if(reviewDefaultValues[index] !== undefined){
          input.value = reviewDefaultValues[index];
          input.setAttribute('value', reviewDefaultValues[index]);
        }
      });

      const accessoryDiscountInput = document.querySelector('[data-accessory-discount-input]');
      if(accessoryDiscountInput){
        accessoryDiscountInput.value = '0';
        accessoryDiscountInput.setAttribute('value', '0');
      }

      const unitLabel = document.getElementById('unitLabel');
      const currentUnit = unitLabel ? unitLabel.textContent.trim() : 'ft+inch';

      if(typeof reindexWindowCards === 'function'){
        reindexWindowCards();
      }

      if(typeof updateWindowCardActionButtons === 'function'){
        updateWindowCardActionButtons();
      }

      if(typeof renderDimensionFields === 'function'){
        renderDimensionFields(currentUnit || 'ft+inch');
      }

      if(typeof updateAllWindowSqft === 'function'){
        updateAllWindowSqft();
      }

      if(typeof updateAllWindowPricing === 'function'){
        updateAllWindowPricing();
      }

      if(typeof updateAccessoriesEmptyState === 'function'){
        updateAccessoriesEmptyState();
      }

      if(typeof bindAccessoryCalculationInputs === 'function'){
        bindAccessoryCalculationInputs();
      }

      if(typeof bindReviewCalculationInputs === 'function'){
        bindReviewCalculationInputs();
      }

      if(typeof renderReviewTableRows === 'function'){
        renderReviewTableRows();
      }

      if(typeof renderReviewSummaryTotals === 'function'){
        renderReviewSummaryTotals();
      }

      if(typeof updateMeasureTagValue === 'function'){
        updateMeasureTagValue();
      }

      window.dispatchEvent?.(new Event('winco:measure-reset'));
      if(shouldUpdateQuoteNumber && typeof updateMeasureQuoteNumberDisplay === 'function'){
        await updateMeasureQuoteNumberDisplay();
      }
    }

    async function handleMeasureNewQuoteClick(event){
      if(event){
        event.preventDefault();
        event.stopPropagation();
        if(typeof event.stopImmediatePropagation === 'function'){
          event.stopImmediatePropagation();
        }
      }

      if(window.measureNewQuoteResetBusy || window.measureSaveBusy){
        return;
      }

      const context = window.measureSaveContext;
      if(context && !context.active)return;
      window.measureNewQuoteResetBusy = true;
      window.measureQuoteNumberRequestVersion = (Number(window.measureQuoteNumberRequestVersion) || 0) + 1;

      try {
        delete window.measureEditingQuoteId;
        delete window.measureEditingRevision;
        delete window.__wincoEditMeasureQuoteId;
        window.measureSaveBusy = false;

        try {
          window.sessionStorage.removeItem('wincoEditMeasureQuoteId');
        } catch (error) {
          // Keep New Quote working even if session storage is unavailable.
        }

        clearMeasureDraftStorage();

        if(typeof closeMeasureClientSelectPopup === 'function'){
          closeMeasureClientSelectPopup();
        }

        if(typeof prepareNextMeasureQuoteAfterSave === 'function'){
          await prepareNextMeasureQuoteAfterSave({ skipQuoteNumberUpdate: true });
        }
        if(context && !context.active)return;

        if(typeof updateMeasureCurrentDateTime === 'function'){
          updateMeasureCurrentDateTime();
        }

        // Preview today's next available number. Only a successful save allocates it.
        await updateMeasureQuoteNumberDisplay();
        if(context && !context.active)return;

        if(typeof saveCurrentMeasureDomAsDraft === 'function'){
          saveCurrentMeasureDomAsDraft();
        }
      } finally {
        // This lock is state, not delayed UI work: leaving the page must not
        // cancel its release, and an old request must not unlock a new page.
        if(window.measureSaveContext === context){
          window.measureNewQuoteResetBusy = false;
        }
      }
    }

    async function handleMeasureSaveClick(event){
      const context = window.measureSaveContext;
      if(window.measureSaveBusy)return {cancelled:true,reason:'save already in progress'};
      if(window.measureNewQuoteResetBusy){
        if(event){event.preventDefault();event.stopPropagation();}
        return {cancelled:true,reason:'new quote reset in progress'};
      }
      if(window.ensureMeasureCatalogFresh){
        if(context?.checkingPrices)return {cancelled:true,reason:'price check in progress'};
        if(context)context.checkingPrices=true;
        try {
          await window.ensureMeasureCatalogFresh();
          if(context&&!context.active)return {cancelled:true};
          // Reading old documents retains their historical prices. An explicit
          // new Save uses current catalog prices, including reopened quotes.
          // Pending saves first settle their original idempotent submission.
          if(!window.createMeasureQuote?.hasPending()){
            document.querySelectorAll('.measure-page .card:has(.window-head)').forEach(card=>{
              for(const key of ['savedOptionAmount','savedSurchargeAmount','savedMotorAmount','savedSectionPricing','optionPriceSelection','surchargePriceSelection','motorPriceSelection','channelChargeCategory'])delete card.dataset[key];
            });
            refreshSelectedCatalogPrices(true);updateAllWindowPricing();renderReviewTableRows();
          }
        }catch(error){
          if(!context||context.active)alert(error.message||'Current product prices could not be checked. Retry before saving.');
          return {cancelled:true,reason:'catalog verification failed'};
        }finally{
          if(context)context.checkingPrices=false;
        }
      }
      if(window.measurePricingCatalogState !== 'ready' || window.measureCatalogRefreshBusy){
        if(event){event.preventDefault();event.stopPropagation();}
        alert('Prices are not loaded. Use Retry prices before saving this quote.');
        return {cancelled:true,reason:'pricing unavailable'};
      }
      const missingPrices=getReviewIncludedWindowCards().flatMap((card,index)=>{
        const errors=[],headrail=getSelectedHeadrailForCard(card);
        const repricingSections=getSelectedConfigValue(card)!=='Single' && !getWindowPricing(card).fromSavedSections;
        if(!window.measureEditingQuoteId || window.ensureMeasureCatalogFresh){
          card.querySelectorAll('[data-fabric-display]').forEach(display=>{
            if(display.classList.contains('placeholder'))return;
            const id=display.dataset.fabricId;
            const item=(window.measureFabricItems||[]).find(row=>id ? row.id===id : row.code===display.dataset.fabricCode);
            if(!item || item.price == null || item.price === '' || !Number.isFinite(Number(item.price)))errors.push('Fabric '+display.textContent);
          });
        }
        if((repricingSections || savedPricingAmount(card,'surcharge')===null)&&headrail?.pricingType.toLowerCase()==='surcharge'&&!getSurchargeBlockForHeadrail(headrail.code))errors.push('Head Rail '+headrail.code);
        if(repricingSections || savedPricingAmount(card,getWindowChannelChargeCategory(card))===null){
          if(isOptionCheckedByLabel(card,'L channel')&&!getSideChannelBlock('L CHANNELS'))errors.push('L channel');
          if(isOptionCheckedByLabel(card,'Side channel')){
            const mount=getSelectedMountTypeForCard(card);
            if(!mount||!getSideChannelBlock(mount==='IN'?'INSIDE MOUNT':'OUTSIDE MOUNT'))errors.push('Side channel (check mount and price table)');
          }
        }
        if(repricingSections || savedPricingAmount(card,'option')===null){
          for(const label of getWindowOptionState(card).chain){
            const chain=window.wincoDependencies.chainOption(label);
            if(chain?.pricing_item_id&&!window.wincoDependencies.chainPriceItem(label))errors.push('Option '+label);
          }
          const cordless=getSelectedCordlessTypeForCard(card);
          if(cordless&&!window.wincoDependencies.cordlessCatalog(window.measurePricingCordlessTypeItems).some(item=>item.code===window.wincoDependencies.normalizeControl(cordless.code,getSelectedGroupValue(card))))errors.push('Cordless '+cordless.code);
        }
        const motor=getSelectedMotorForCard(card);
        if(savedPricingAmount(card,'motor')===null&&motor&&!getPricingMotorItemBySelection(motor))errors.push('Motor '+motor.name);
        return errors.map(name=>'Window '+(card.querySelector('.window-head h3')?.textContent||index+1)+': '+name);
      });
      if(!window.measureEditingQuoteId || window.ensureMeasureCatalogFresh){
        document.querySelectorAll('.measure-page .accessory-row').forEach(row=>{
          const display=row.querySelector('[data-accessory-item]');
          const id=display?.dataset.accessoryPricingId;
          if(!id || display.classList.contains('placeholder'))return;
          const item=(window.measurePricingAccessoryItems || []).find(item=>item.id===id && item.is_active!==false);
          if(!item || item.price == null || item.price === '' || !Number.isFinite(Number(item.price)) || Number(item.price)<0){
            missingPrices.push('Accessory '+display.textContent);
          }
        });
      }
      if(missingPrices.length){
        if(event){event.preventDefault();event.stopPropagation();}
        alert('Missing prices. Update Admin Pricing before saving: '+missingPrices.join('; '));
        return {cancelled:true,reason:'missing price tables'};
      }
      if(event){
        event.preventDefault();
        event.stopPropagation();
      }

      if(window.measureSaveBusy){
        return {
          cancelled: true,
          reason: 'save already in progress',
        };
      }

      window.measureSaveBusy = true;

      const editingQuoteId = String(window.measureEditingQuoteId || '').trim();
      let editSaveMode = 'new';

      // An unconfirmed Save as New must finish that request before offering a
      // different save destination. Changed drafts are reconciled by the saver.
      if(editingQuoteId && !window.createMeasureQuote?.hasPending()){
        editSaveMode = await askMeasureEditSaveMode();
        if(context && !context.active) return {cancelled:true};

        if(!editSaveMode){
          window.measureSaveBusy = false;
          return {
            cancelled: true,
            reason: 'edit save choice cancelled',
          };
        }
      }

      if(editSaveMode === 'new' && typeof updateMeasureQuoteNumberDisplay === 'function'){
        await updateMeasureQuoteNumberDisplay();
      }
      if(context && !context.active) return {cancelled:true};

      const payload = typeof collectMeasureQuoteData === 'function' ? collectMeasureQuoteData() : null;
      if(payload&&window.measureCatalogVersions)payload.catalogVersions=JSON.parse(JSON.stringify(window.measureCatalogVersions));
      if(payload&&window.measureProductConfiguration)payload.productConfigurationRevision=window.measureProductConfiguration.revision;
      const warnings = typeof validateMeasureQuoteData === 'function' ? validateMeasureQuoteData(payload) : [];
      console.log('Measure quote payload', payload);
      console.log('Measure save warnings', warnings);

      if(warnings.length){
        const shouldContinue = window.confirm(formatMeasureSaveWarningMessage(warnings));

        if(!shouldContinue){
          console.log('Measure save cancelled by validation warning');
          window.measureSaveBusy = false;
          return {
            payload,
            warnings,
            cancelled: true,
          };
        }
      }

      const preparedSave = prepareMeasureQuoteSave(payload);
      if(context && !context.active) return {cancelled:true};

      let saveResult;
      try {
        saveResult = await saveMeasureQuoteToSupabase(payload, {
          editingQuoteId,
          overwriteExisting: editSaveMode === 'overwrite',
          context,
        });
      } catch(error){
        saveResult={saved:false,reason:error.message || 'Could not confirm the save. Please retry.'};
      } finally {
        if(!context || context.active) window.measureSaveBusy = false;
      }

      if(context && !context.active) return {cancelled:true};

      if(saveResult && saveResult.saved){
        if(typeof updateMeasureCurrentDateTime === 'function'){
          updateMeasureCurrentDateTime();
        }

        if(editingQuoteId){
          delete window.measureEditingQuoteId;
          delete window.measureEditingRevision;
          delete window.__wincoEditMeasureQuoteId;

          try {
            window.sessionStorage.removeItem('wincoEditMeasureQuoteId');
          } catch (error) {
            // Keep successful save flow working even if session storage is unavailable.
          }
        }

        alert('Measure quote saved successfully.');

        if(typeof prepareNextMeasureQuoteAfterSave === 'function'){
          await prepareNextMeasureQuoteAfterSave();
        }
      } else {
        if(!saveResult?.cancelled) alert('Save was not confirmed. Your edits are still on this screen. '+(saveResult?.reason || 'Please try again.'));
      }

      return {
        payload,
        warnings,
        cancelled: false,
        preparedSave,
        saveResult,
      };
    }

    window.handleMeasureNewQuoteClick = handleMeasureNewQuoteClick;
    window.handleMeasureSaveClick = handleMeasureSaveClick;

    function initMeasurePage(){
  if(!window.measureEditingQuoteId && typeof updateMeasureCurrentDateTime === 'function'){
    updateMeasureCurrentDateTime();
  }

  try {
    bindMeasureTagInputs();
  } catch (err) {
    console.error('measure tag init error', err);
  }

  const saveButton = document.querySelector('button[data-mode-target="common"]');
  if(saveButton && saveButton.dataset.measureSavePayloadBound !== 'true'){
    saveButton.dataset.measureSavePayloadBound = 'true';
    saveButton.addEventListener('click', handleMeasureSaveClick);
  }

  const newQuoteButton = document.querySelector('[data-mode-target="newQuote"]');
  if(newQuoteButton && newQuoteButton.dataset.measureNewQuoteBound !== 'true'){
    newQuoteButton.dataset.measureNewQuoteBound = 'true';
    newQuoteButton.addEventListener('click', handleMeasureNewQuoteClick);
  }

  if(typeof ensureMeasureClientSelectPopup === 'function'){
    ensureMeasureClientSelectPopup();
  }

  setScreenMode(document.body.getAttribute('data-screen-mode') || 'newQuote');
  selectUnit(document.getElementById('unitLabel').textContent.trim());
  updateAllWindowSqft();
  updateAllWindowPricing();
  reindexWindowCards();
  updateWindowCardActionButtons();
  bindReviewCalculationInputs();
  bindAccessoryCalculationInputs();
  if(!window.measureEditingQuoteId) updateMeasureQuoteNumberDisplay();
  bindMeasureTagInputs();
  renderReviewTableRows();
  if(typeof applyMeasureSummaryRowTones === 'function'){
    applyMeasureSummaryRowTones();
  }

  const chainWeightToggle = document.querySelector('[data-chain-weight-toggle]');
  const prefix = document.querySelector('[data-length-prefix]');
  const lengthField = document.querySelector('.length-field');
  if(chainWeightToggle && prefix){
    const isOn = chainWeightToggle.classList.contains('checked');
    prefix.classList.toggle('hidden', !isOn);
    if(lengthField){
      lengthField.classList.toggle('has-prefix', isOn);
    }
  }

  document.querySelectorAll('.card').forEach((card) => {
    try {
      if(card.querySelector('.window-head')) window.wincoConfiguration.restore(card, window.wincoConfiguration.read(card));
      syncSplitAutoForCard(card);
    } catch (err) {
      console.error('split auto init error', err);
    }
  });

  updateAccessoriesEmptyState();
}

  `;function Bt(){document.querySelectorAll(`.client-match-dialog`).forEach(e=>e.close())}function Vt({contentRight:e,viewportRight:t,button:n=48,gap:r=8,edge:i=16}){return t-e>=n+r+i?`right`:`center`}function Ht({placement:e,navigation:t,fees:n}){return e===`center`&&!!(t&&n&&t.left<n.right&&t.right>n.left&&t.top<n.bottom&&t.bottom>n.top)}function Ut(e){if(!e)return()=>{};let t=e.ownerDocument,n=t.defaultView,r=t.createElement(`div`);r.className=`measure-jumps`,r.setAttribute(`role`,`group`),r.setAttribute(`aria-label`,`Measure page navigation`);let i=(e,n)=>{let r=t.createElement(`button`);return r.type=`button`,r.className=`measure-jump`,r.setAttribute(`aria-label`,`Scroll to `+e),r.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="${n}"/></svg>`,r},a=i(`top`,`m5 12 7-7 7 7M12 5v14`),o=i(`bottom`,`m5 12 7 7 7-7M12 5v14`);r.append(a,o),t.body.append(r);let s,c=()=>{let i=t.scrollingElement,s=n.visualViewport,c=(s?.offsetLeft||0)+(s?.width||t.documentElement.clientWidth),l=Math.max(0,i.scrollHeight-i.clientHeight),u=Math.max(0,i.scrollTop),d=t.activeElement;a.hidden=l<=2||u<=2,o.hidden=l<=2||l-u<=2;let f=!!(s&&s.height<n.innerHeight*.75)||!!t.activeElement?.matches(`input:not([type="hidden"]),textarea,[contenteditable="true"]`);r.hidden=l<=2||f||!!t.querySelector(`.winco-appointment-layer,[aria-modal="true"],.winco-notifications .notification-panel`);let p=Vt({contentRight:e.getBoundingClientRect().right,viewportRight:c});r.dataset.placement=p,r.style.left=p===`center`?(s?.offsetLeft||0)+(s?.width||t.documentElement.clientWidth)/2+`px`:``,r.style.right=p===`right`?`16px`:``;let m=t.querySelector(`.winco-notifications`)?.getBoundingClientRect();r.style.bottom=`calc(16px + env(safe-area-inset-bottom, 0px))`;let h=r.getBoundingClientRect(),g=m?.height&&h.left<m.right&&h.right>m.left&&h.bottom>m.top-12&&h.top<m.bottom+12?Math.max(16,n.innerHeight-m.top+12):16;if(r.style.bottom=`calc(${g}px + env(safe-area-inset-bottom, 0px))`,!r.hidden&&Ht({placement:p,navigation:r.getBoundingClientRect(),fees:e.querySelector(`.record-fees-panel`)?.getBoundingClientRect()})&&(r.hidden=!0),!r.hidden&&(d===a&&a.hidden||d===o&&o.hidden)){let e=a.hidden?o:a;e.hidden||e.focus({preventScroll:!0})}},l=()=>{n.cancelAnimationFrame(s),s=n.requestAnimationFrame(c)},u=e=>{let t=n.matchMedia(`(prefers-reduced-motion: reduce)`).matches;n.scrollTo({top:e,behavior:t?`instant`:`smooth`})};a.addEventListener(`click`,()=>u(0)),o.addEventListener(`click`,()=>u(t.scrollingElement.scrollHeight));for(let e of[`scroll`,`resize`,`focusin`,`focusout`])n.addEventListener(e,l,{passive:!0});n.visualViewport?.addEventListener(`resize`,l),n.visualViewport?.addEventListener(`scroll`,l);let d=new ResizeObserver(l);d.observe(e);let f=new MutationObserver(e=>{e.some(e=>!r.contains(e.target))&&l()});return f.observe(t.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`aria-modal`,`hidden`]}),c(),()=>{r.remove(),n.cancelAnimationFrame(s),d.disconnect(),f.disconnect();for(let e of[`scroll`,`resize`,`focusin`,`focusout`])n.removeEventListener(e,l);n.visualViewport?.removeEventListener(`resize`,l),n.visualViewport?.removeEventListener(`scroll`,l)}}function Wt(e){let t=String(e.querySelector(`[data-measure-name-input]`)?.value||``).trim(),n=String(e.querySelector(`[data-measure-address-input]`)?.value||``).trim(),r=n.match(/\d+/)?.[0],i=t?`${t}${r?`-`+r:``}`:``,a=JSON.stringify([t,n]),o=i;for(let t of e.querySelectorAll(`[data-measure-tag-display]`)){for(let[e,n]of Object.entries({contenteditable:`false`,role:`textbox`,"aria-label":`Tag`,"aria-readonly":`true`,tabindex:`0`}))t.setAttribute?.(e,n);for(let e of[`onfocus`,`oninput`,`onkeydown`,`onblur`])t.removeAttribute?.(e);t.style?.removeProperty(`outline`),t.closest?.(`.field`)?.classList.add(`measure-tag-field`);let e=t.classList.contains(`placeholder`)?``:String(t.textContent||``).trim();t.dataset.measureTagMode||(t.dataset.measureTagMode=e?`manual`:`auto`),t.dataset.measureTagSource!==void 0&&t.dataset.measureTagSource!==a&&(t.dataset.measureTagMode=`auto`),t.dataset.measureTagSource=a,o=t.dataset.measureTagMode===`manual`?e:i,t.dataset.measureTagValue=o,t.textContent=o||`Tag`,t.title=o,t.classList.toggle(`placeholder`,!o)}let s=String(e.querySelector(`[data-shipping-info="label"]`)?.value||``).trim();for(let t of e.querySelectorAll(`[data-measure-label-display]`))t.textContent=s?` · `+s:``,t.hidden=!s;return o}var q=n(),Gt=a(),Kt=[[`group`,`Group`],[`fabric`,`Fabric`],[`fabricColor`,`Fabric Color`],[`headrail`,`Head Rail`],[`headrailColor`,`Head Rail Color`],[`bottomrail`,`Bottom Rail`],[`bottomrailColor`,`Bottom Rail Color`],[`control`,`Control Type`],[`cordlessType`,`Cordless Type`],[`motor`,`Motor`],[`mount`,`Mount`]],qt=Object.fromEntries([...Kt.map(([e])=>[e,``]),[`mountCustom`,``]]),Jt=e=>Kt.some(([t])=>!!e[t]),Yt=(e,t,n)=>({...e,[t]:n,...[`fabric`,`headrail`,`bottomrail`].includes(t)?{[t+`Color`]:``}:{},...t===`group`?{fabric:``,fabricColor:``}:{},...t===`control`?{cordlessType:``,motor:``}:{}}),J={group:`Fabric`,headrail:`Head Rail`,bottomrail:`Bottom`,control:`Control`,headrailColor:`Head Rail Color`,bottomrailColor:`Bottom Color`},Xt=e=>e===`headrail`?`headrail`:`bottom rail`,Zt=(e,t)=>String(e.id)===String(t),Qt=(e,t)=>String(e.color_code).trim()===String(t).trim(),$t=(e,t)=>e===`headrail`?w(t):String(t||``).trim().toUpperCase(),en=(e,t,n,r)=>{let i=F()?.resolve(r,e[r]);return n.hardware.find(n=>String(n.product_group).toLowerCase()===Xt(r)&&(t[r]?Zt(n,t[r]):i?Zt(n,i.id):$t(r,n.code)===$t(r,e[r])))},tn=(e,t,n)=>t.fabric?n.fabrics.find(e=>Zt(e,t.fabric)):n.fabrics.find(t=>e.fabricId?Zt(t,e.fabricId):t.code===e.fabricCode&&(!e.group||t.product_group===e.group));function nn(e,t){let n=e.fields.filter(e=>t[e]);n.length===2&&n[0]===`group`&&n.reverse();let r=n.map(e=>`${J[e]} ${t[e]}`);return r.length>1?r.join(` ≠ `):`${r[0]||`Selection`} — unavailable`}function rn(e,t,n){let r=C(e),i=[],a={},o={},s=tn(e,t,n);t.group&&![`Dual`,`Roller`].includes(t.group)&&i.push(`Group — unavailable`),t.group&&(a.group=t.group),t.group&&!t.fabric&&i.push(`Fabric — select a fabric`),t.fabric&&!s&&i.push(`Fabric — unavailable`),t.group&&s&&t.fabric&&s.product_group!==t.group&&i.push(`Fabric ${s.code} ≠ Group ${t.group}`),t.fabric&&s&&(a.group=s.product_group);for(let r of[`headrail`,`bottomrail`]){let s=en(e,t,n,r);o[r]=s,t[r]&&!s&&i.push(`${J[r]} — unavailable`),s&&(a[r]=r===`headrail`?w(s.code):String(s.code).trim().toUpperCase())}for(let e of[`headrailColor`,`bottomrailColor`,`control`])t[e]&&(a[e]=t[e]);t.control===`Cordless`?a.control=t.cordlessType||(N(r.control)?r.control:`Cordless`):t.cordlessType&&(!t.control&&N(r.control)?a.control=t.cordlessType:i.push(`Cordless Type — choose Cordless`)),Object.assign(r,C({...r,...a})),t.control===`Cordless`&&r.control===`Cordless`&&i.push(`Cordless Type — select a type`),t.cordlessType&&(!N(t.cordlessType)||t.cordlessType===`Cordless`)&&i.push(`Cordless Type — unavailable`);let c=null;t.motor&&(c=p(n.motors).find(e=>String(e.id)===String(t.motor))||null,c||i.push(`Motor — unavailable`),r.control!==`Motorized`&&i.push(`Motor — choose Motorized`)),t.control===`Motorized`&&!t.motor&&!u(n.motors,e.motorSelection)&&i.push(`Motor — select a motor`);let l=M({...r,...s?{fabricId:s.id}:{},...c?{motorPricingId:c.id}:r.control===`Motorized`&&e.motorSelection?{motorSelection:e.motorSelection}:{}});i.push(...l.map(e=>nn(e,r)));for(let e of[`headrail`,`bottomrail`]){let a=o[e],s=e+`Color`,c=r[s];r[e]&&!a&&i.push(`${J[e]} ${r[e]} — unavailable`),t[e]&&!c&&i.push(`${J[s]} — select a color`),c&&!l.some(e=>e.fields.includes(s))&&(!a||!n.colors.some(e=>String(e.hardware_id)===String(a.id)&&Qt(e,c)))&&i.push(`${J[s]} ${c} ≠ ${J[e]} ${r[e]||`not selected`}`)}let d=t.fabricColor||e.fabricColor||``,f=s?.fabric_colors?.find(e=>Qt(e,d));(t.fabric||t.fabricColor)&&(d?f||i.push(`Fabric Color ${d} ≠ Fabric ${s?.code||e.fabricCode||`not selected`}`):i.push(`Fabric Color — select a color`)),N(r.control)&&r.control!==`Cordless`&&!P(n.pricing,n.controls).some(e=>e.code===r.control)&&i.push(`Control ${r.control} — price unavailable`);let m=t.mount===`custom`?String(t.mountCustom||``).trim():t.mount;t.mount&&![`IN`,`FF`,`FW`,`FD`,`custom`].includes(t.mount)&&i.push(`Mount — unavailable`),t.mount===`custom`&&!m&&i.push(`Mount — enter a value`);let h=k({...r,...s?{fabricId:s.id}:{},...c?{motorPricingId:c.id}:r.control===`Motorized`&&e.motorSelection?{motorSelection:e.motorSelection}:{}},n.chainOptions),g=[];for(let t of[`general`,`chain`,`cordless`])for(let n of e.optionState?.[t]||[])h[t].some(e=>F()?.sameOption(e,n)??e.toLowerCase()===n.toLowerCase())||g.push(n);let _=Object.fromEntries([`general`,`chain`,`cordless`].map(t=>[t,(e.optionState?.[t]||[]).filter(e=>!g.includes(e))]));return i.push(...D(_,n.chainOptions).map(e=>e.message)),N(r.control)&&e.controlSide&&g.push(`Control Side`),A(r.control)!==`Chain / Manual`&&e.length&&g.push(`Chain Length`),r.control!==`Motorized`&&e.motor&&g.push(`Motor`),L(e)&&!L(r.headrail)&&g.push(`Fabric B`),{state:r,issues:[...new Set(i)],cleared:[...new Set(g)],fabric:t.fabric?s:null,fabricColor:t.fabric||t.fabricColor?f:null,motor:c,mount:t.mount?m:null,changes:t}}function an(e,t,n,r){let i=e=>[e.code,e.description].filter(Boolean).join(` — `);if(n===`group`)return[`Dual`,`Roller`].filter(e=>r.fabrics.some(t=>t.product_group===e&&O(`fabric`,t.id,t.code))).map(e=>({value:e,label:e}));if(n===`fabric`)return r.fabrics.filter(e=>(!t.group||e.product_group===t.group)&&O(`fabric`,e.id,e.code)).map(e=>({value:String(e.id),label:t.group?i(e):`${e.product_group} · ${i(e)}`}));if(n===`mount`)return[[`IN`,`Inside Mount`],[`FF`,`Frame Mount`],[`FW`,`Wall Mount`],[`FD`,`Door Mount`],[`custom`,`Custom`]].map(([e,t])=>({value:e,label:e===`custom`?t:`${e} — ${t}`}));if(n===`control`){let e=F(),t=e?e.registry.products.filter(e=>e.kind===`control`&&e.group===`Manual`&&O(`control`,e.id)).map(e=>e.canonicalCode):[`CH`];return[...t,`Cordless`,`Motorized`].map(e=>({value:e,label:t.includes(e)&&e!==`CH`?e:ee(e)}))}if(n===`cordlessType`){let n=e.map(e=>rn(e,t,r).state);return P(r.pricing,r.controls).filter(e=>n.every(t=>!M({...t,control:e.code,headrailColor:``,bottomrailColor:``}).length)).map(e=>({value:e.code,label:e.code}))}if(n===`motor`)return p(r.motors).filter(n=>!F()||e.every(e=>!M({...rn(e,t,r).state,headrailColor:``,bottomrailColor:``,motorPricingId:n.id}).length)).map(e=>({value:String(e.id),label:e.name}));if(n===`headrail`||n===`bottomrail`)return r.hardware.filter(e=>String(e.product_group).toLowerCase()===Xt(n)&&O(n,e.id,e.code)).map(e=>({value:String(e.id),label:String(e.code)}));if(n===`fabricColor`&&t.group&&!t.fabric)return[];let a=e.map(e=>{if(n===`fabricColor`)return tn(e,t,r)?.fabric_colors||[];let i=n.replace(`Color`,``),a=en(e,t,r,i);return a?r.colors.filter(e=>String(e.hardware_id)===String(a.id)&&!M({[i]:$t(i,a.code),[n]:String(e.color_code)}).length):[]});return[...new Map((a[0]||[]).filter(e=>a.every(t=>t.some(t=>Qt(t,e.color_code)))).map(e=>[String(e.color_code),{value:String(e.color_code),label:[e.color_code,e.color_description].filter(Boolean).join(` — `)}])).values()]}var Y=e=>!e||e.classList.contains(`placeholder`)?``:e.textContent.trim(),X=(e,t)=>[...e.querySelectorAll(`.field-label`)].find(e=>e.textContent.trim()===t)?.parentElement?.querySelector(`.field span`),on=(e,t)=>e.querySelector(`[data-${t}-display]`)?.closest(`.col-3`),sn=(e,t)=>[...on(e,t)?.querySelectorAll(`.rail-seg.clickable`)||[]].find(e=>!e.hasAttribute(`data-${t}-display`));function Z(e){let t=C({group:Y(X(e,`Group`)),headrail:Y(e.querySelector(`[data-headrail-display]`)),bottomrail:Y(e.querySelector(`[data-bottomrail-display]`)),control:Y(X(e,`Control Type`)),cordlessType:Y(e.querySelector(`[data-cordless-type-section] .field span`)),headrailColor:Y(sn(e,`headrail`)),bottomrailColor:Y(sn(e,`bottomrail`))}),n=e.querySelector(`[data-fabric-display]`)?.dataset.fabricId;return{...t,...n?{fabricId:n}:{}}}function cn(e){let t=Z(e),n=e.querySelector(`[data-motor-section] .field span`);return t.control===`Motorized`&&Y(n)?{...t,motorSelection:{pricingId:n.dataset.motorPricingId||``,code:n.dataset.motorCode||``,name:n.dataset.motorName||Y(n)}}:t}var Q=(e,t,n)=>{e&&(e.textContent=t||n,e.classList.toggle(`placeholder`,!t))};function ln(e,t){if(t===`control`){let t=X(e,`Control Type`);Q(t,``,`Select control type`),t&&delete t.dataset.controlFamily;let n=e.querySelector(`[data-cordless-type-section] .field span`);Q(n,``,`Select Type`),n&&(delete n.dataset.cordlessTypeCode,delete n.dataset.cordlessTypePrice,delete n.dataset.cordlessPricingId)}else if(t.endsWith(`Color`)){let n=sn(e,t.replace(`Color`,``));if(Q(n,``,`Color`),n)for(let e of Object.keys(n.dataset))e.startsWith(`railColor`)&&delete n.dataset[e]}else{let n=e.querySelector(`[data-${t}-display]`);if(Q(n,``,t===`headrail`?`Head rail`:`Bottom rail`),n)for(let e of[`Id`,`Code`,`Description`,`PricingType`])delete n.dataset[t+e];ln(e,t+`Color`)}}function un(e,t,n){if(!n){ln(e,t);return}let r=F()?.resolve(t,n),i=(window.measureHardwareItems||[]).find(e=>String(e.product_group).toLowerCase()===(t===`headrail`?`headrail`:`bottom rail`)&&(r?String(e.id)===r.id:(t===`headrail`?w(e.code):String(e.code).trim().toUpperCase())===n));if(!i)throw Error(`${n} is no longer in the hardware catalog.`);let a=e.querySelector(`[data-${t}-display]`);Q(a,i.code,``),Object.assign(a.dataset,{[t+`Id`]:i.id,[t+`Code`]:i.code,[t+`Description`]:i.description||``,[t+`PricingType`]:i.pricing_type||``})}function dn(e,t,n){if(!n){ln(e,t+`Color`);return}let r=(window.measureHardwareColors||[]).find(r=>String(r.hardware_id)===String(e.querySelector(`[data-${t}-display]`)?.dataset[t+`Id`])&&String(r.color_code)===n);if(!r)throw Error(`${t===`headrail`?`Head`:`Bottom`} Rail Color ${n} is no longer in the catalog.`);let i=sn(e,t);Q(i,n,`Color`),Object.assign(i.dataset,{railColorId:r.id,railColorCode:n,railColorDescription:r.color_description||``,railColorVisibility:r.visibility||``})}function fn(e,t){let n=A(t);Q(X(e,`Control Type`),n===`Chain / Manual`&&t!==`CH`?t:n,`Select control type`);let r=X(e,`Control Type`);r&&(r.dataset.controlFamily=n);let i=e.querySelector(`[data-cordless-type-section] .field span`);if(N(t)&&t!==`Cordless`){let e=P(window.measurePricingCordlessTypeItems,window.measureControlItems).find(e=>e.code===t);if(!e)throw Error(`No active price is registered for ${t}.`);Q(i,t,`Select Type`),Object.assign(i.dataset,{cordlessTypeCode:t,cordlessTypePrice:String(e.price??``),cordlessPricingId:e.id||``})}else Q(i,``,`Select Type`),i&&(delete i.dataset.cordlessTypeCode,delete i.dataset.cordlessTypePrice,delete i.dataset.cordlessPricingId)}function pn(e,t){let n=e?.querySelector(`[data-motor-section]`),r=n?.querySelector(`.field span`);if(!r)throw Error(`Motor field is unavailable.`);let i=String(t.name||t.control_type||t.code||``).trim();Q(r,i,`Select Motor`),r.title=i,Object.assign(r.dataset,{motorId:t.id||``,motorPricingId:t.id||``,motorCode:t.code||t.part_number||``,motorName:i,motorPricingType:t.pricing_type||``,motorVisibility:t.visibility||``}),n.querySelector(`[data-motor-menu]`)?.classList.add(`hidden`)}function mn(e,t,n,r){let i=e.querySelector(t);if(!i)return;let a=new Set((r||[...i.querySelectorAll(`.check.checked`)].map(e=>window.getCheckButtonLabel(e))).map(e=>e.trim().toLowerCase())),o=Y(i.querySelector(`.inline-value`))||`12"`;i.replaceChildren();for(let e of n){let n=document.createElement(`button`);n.type=`button`,n.className=`check`,n.classList.toggle(`checked`,[...a].some(t=>window.wincoProductCatalog?.sameOption(t,e)??t===e.toLowerCase())),n.setAttribute(`onclick`,t.includes(`data-chain-option-section`)?`window.wincoDependencies.toggleChainOption(this)`:`toggleCheck(this)`),(window.wincoProductCatalog?.sameOption(e,`Side channel`)??e===`Side channel`)&&(n.dataset.sideChannelOption=`true`),(window.wincoProductCatalog?.sameOption(e,`L channel`)??e===`L channel`)&&(n.dataset.lChannelOption=`true`),y(window.measureChainOptions,e)?.behavior===`no-chain-weight`&&(n.dataset.chainWeightToggle=``);let r=document.createElement(`span`);r.className=`check-box`,r.textContent=`✓`;let s=document.createElement(`span`);if(s.textContent=e,n.append(r,s),i.append(n),window.wincoProductCatalog?.sameOption(e,`Reach cord`)??e===`Reach cord`){let e=document.createElement(`span`);e.className=`inline-value`,e.classList.toggle(`hidden`,!n.classList.contains(`checked`)),e.textContent=o,i.append(e)}}}var hn={general:`[data-general-option-box]`,chain:`[data-chain-option-section]`,cordless:`[data-cordless-option-section]`};function gn(e){return Object.fromEntries(Object.entries(hn).map(([t,n])=>[t,[...e.querySelectorAll(n+` .check.checked`)].map(e=>window.getCheckButtonLabel(e).trim())]))}function _n(e,t){let n=[];for(let r of[...e,...t])n.some(e=>F()?.sameOption(e,r)??e.trim().toLowerCase()===r.trim().toLowerCase())||n.push(r);return n}function vn(e){let t=Object.keys(hn).find(t=>e.closest(hn[t]));return t?!x(gn(e.closest(`.card`)),t,window.getCheckButtonLabel(e),window.measureChainOptions).length:!0}function yn(e){if(!e)return;let t=gn(e);for(let[n,r]of Object.entries(hn))for(let i of e.querySelectorAll(r+` .check`)){let e=x(t,n,window.getCheckButtonLabel(i),window.measureChainOptions);i.disabled=!!e.length,i.setAttribute(`aria-pressed`,String(i.classList.contains(`checked`))),e.length?i.title=`Cannot be selected with `+e.join(` or `)+`.`:i.removeAttribute(`title`)}}function bn(e,t=!1,n=null){let r=k(cn(e));if(t||n){let t=n||gn(e);for(let e of[`general`,`chain`,`cordless`])r[e]=_n(r[e],t[e]||[])}mn(e,`[data-general-option-box]`,r.general,n?.general),mn(e,`[data-cordless-option-section] .option-box`,r.cordless,n?.cordless),e.querySelector(`[data-cordless-option-section]`)?.classList.toggle(`hidden`,!r.cordless.length),oe({control:Z(e).control,controlFamily:X(e,`Control Type`)?.dataset.controlFamily})===`Chain / Manual`?xn(e,n?.chain):yn(e)}function xn(e,t){let n=`[data-chain-option-section] .option-box`;t||=[...e.querySelector(n)?.querySelectorAll(`.check.checked`)||[]].map(e=>window.getCheckButtonLabel(e).trim()),mn(e,n,_n(F()?k(cn(e)).chain:S(window.measureChainOptions),t),t);let r=!!e.querySelector(`[data-chain-weight-toggle].checked`);e.querySelector(`[data-length-prefix]`)?.classList.toggle(`hidden`,!r),e.querySelector(`.length-field`)?.classList.toggle(`has-prefix`,r),yn(e)}var Sn=new WeakSet;function Cn(e,t){if(!(!e||Sn.has(e)||e.dataset.applyingBulk)){Sn.add(e);try{let n=Z(e),{state:r}=te(n,Object.fromEntries((Array.isArray(t)?t:[t]).filter(Boolean).map(e=>[e,n[e]])));for(let t of[`headrail`,`bottomrail`,`control`,`headrailColor`,`bottomrailColor`])n[t]&&!r[t]&&ln(e,t);window.renderControlTypeDetails(e,A(r.control)),bn(e)}finally{Sn.delete(e)}}}function wn(){return{fabrics:window.measureFabricItems||[],hardware:window.measureHardwareItems||[],colors:window.measureHardwareColors||[],pricing:window.measurePricingCordlessTypeItems||[],controls:window.measureControlItems||[],motors:window.measurePricingMotorItems||[],chainOptions:window.measureChainOptions}}function Tn(e){let t=e.querySelector(`[data-fabric-display]`),n=e.querySelector(`[data-motor-section] .field span`);return{...Z(e),fabricId:t?.dataset.fabricId||``,fabricCode:Y(t),fabricColor:Y(e.querySelector(`[data-fabric-color-display]`)),controlSide:z.readControlSide(e),length:e.querySelector(`[data-chain-length-section] .length-input`)?.value||``,motor:Y(n),motorSelection:Y(n)?{pricingId:n.dataset.motorPricingId||``,code:n.dataset.motorCode||``,name:n.dataset.motorName||Y(n)}:null,optionState:window.getWindowOptionState(e)}}function En(e,t){return{...rn(Tn(e),t,wn()),card:e}}function Dn(e,t=!0){let{card:n,state:r,fabric:i,fabricColor:a,motor:o,mount:s}=e;if(e.issues.length)throw Error(e.issues.join(`
`));n.dataset.applyingBulk=`true`;try{if(i){let e=n.querySelector(`[data-fabric-display]`);Q(e,i.code,`Fabric`),e.title=window.formatFabricOptionLabel(i),Object.assign(e.dataset,{fabricId:i.id,fabricCode:i.code,fabricGroup:i.product_group,fabricDescription:i.description||``,fabricPrice:String(i.price??``),fabricWidth:String(i.width??``),fabricVisibility:i.visibility||``}),Q(X(n,`Group`),i.product_group,`Shade`)}if(a&&window.selectFabricColor(n.querySelector(`[data-fabric-color-display]`),a),un(n,`headrail`,r.headrail),un(n,`bottomrail`,r.bottomrail),fn(n,r.control),dn(n,`headrail`,r.headrailColor),dn(n,`bottomrail`,r.bottomrailColor),window.renderControlTypeDetails(n,A(r.control)),o&&pn(n,o),bn(n),s!==null){let t=n.querySelector(`[data-mount-type-wrapper]`);if(!t)throw Error(`Mount field is unavailable.`);if(e.changes.mount===`custom`){let e=document.createElement(`span`);e.dataset.mountTypeDisplay=``,e.textContent=s,t.querySelector(`[data-mount-type-value]`).replaceChildren(e)}else window.selectMountType(t,s)}delete n.dataset.savedOptionAmount,delete n.dataset.savedSurchargeAmount;let t=M(Z(n));if(t.length)throw Error(t[0].message)}finally{delete n.dataset.applyingBulk}let c=n.querySelectorAll(`.dimension-field`);window.updateWindowCardPricing(n,window.calculateCeilingSqftFromMm(window.getMmValue(c[0]),window.getMmValue(c[1]))),t&&n.dispatchEvent(new Event(`input`,{bubbles:!0}))}function On(e){let t=[...e.childNodes].map(On),n=e.attributes?[...e.attributes].map(e=>[e.name,e.value]):null,r=Object.fromEntries([`value`,`checked`,`selected`,`indeterminate`].filter(t=>t in e).map(t=>[t,e[t]])),i=e.nodeType===3?e.data:null;return()=>{if(n){for(let t of[...e.attributes])e.removeAttribute(t.name);for(let[t,r]of n)e.setAttribute(t,r)}return e.nodeType===1&&e.replaceChildren(...t.map(e=>e())),i!==null&&(e.data=i),Object.assign(e,r),e}}function kn(e,t){let n=e.map(e=>({...En(e.card,t),no:e.no})),r=n.flatMap(e=>e.issues.map(t=>`Window #${e.no}: ${t}`));if(r.length)throw Error(r.join(`
`));let i=e.map(e=>On(e.card));try{n.forEach(e=>Dn(e,!1))}catch(e){throw i.forEach(e=>e()),window.renderReviewTableRows?.(),e}e.forEach(e=>e.card.dispatchEvent(new Event(`input`,{bubbles:!0})))}function An(e){let t=e.closest(`.card`),n=window.getCheckButtonLabel(e).trim(),r=y(window.measureChainOptions,n);if(window.toggleCheck(e),t&&!e.classList.contains(`checked`)&&r&&(!r.enabled||r.name!==n)){xn(t),window.updateAllWindowPricing?.();let e=[...t.querySelectorAll(`[data-chain-option-section] .check`)];(e.find(e=>window.getCheckButtonLabel(e).trim()===r.name)||e[0])?.focus()}window.saveMeasureDraftState?.()}var jn={...j,readProductState:Z,readOptionProductState:cn,renderOptions:bn,renderChainOptions:xn,toggleChainOption:An,reconcile:Cn,fillControl:fn,fillMotor:pn,optionToggleAllowed:vn,syncOptionCompatibility:yn,windowIssues:e=>se(e,window.measureChainOptions),chainPriceItem:e=>v(window.measureChainOptions,window.measurePricingOptionItems,e),chainOption:e=>y(window.measureChainOptions,e)},$=e();function Mn({checked:e,mixed:t=!1,onChange:n,...r}){let i=(0,q.useRef)(null);return(0,q.useEffect)(()=>{i.current&&(i.current.indeterminate=t)},[t]),(0,$.jsxs)(`span`,{className:`bulk-checkbox`,children:[(0,$.jsx)(`input`,{...r,ref:i,type:`checkbox`,checked:e,onChange:n}),(0,$.jsx)(`span`,{className:`bulk-checkmark`,"aria-hidden":`true`,children:(0,$.jsxs)(`svg`,{viewBox:`0 0 20 20`,children:[(0,$.jsx)(`path`,{className:`bulk-tick`,d:`m4 10 4 4 8-9`}),(0,$.jsx)(`path`,{className:`bulk-dash`,d:`M4 10h12`})]})})]})}function Nn(e,t){return e.map(e=>{try{return{no:e.no,...En(e.card,t)}}catch(t){return{no:e.no,issues:[t.message],cleared:[]}}})}function Pn(){let[e,t]=(0,q.useState)(null),[n,r]=(0,q.useState)(1),[i,a]=(0,q.useState)([]),[o,s]=(0,q.useState)(qt),[c,l]=(0,q.useState)(``),[u,d]=(0,q.useState)(!1),[f,p]=(0,q.useState)(``),m=(0,q.useRef)(null),h=(0,q.useRef)(null),g=(0,q.useRef)(null),_=(0,q.useRef)(null),v=()=>{t(null),_.current?.focus()};if((0,q.useEffect)(()=>{let e=e=>{let n=e.target.closest(`[data-measure-bulk-edit]`);if(!n)return;_.current=n;let i=0;t([...document.querySelectorAll(`.measure-page .window-head`)].map((e,t)=>{let n=e.closest(`.card`),r=e.querySelector(`.window-title`)?.textContent.trim()||`Window #${t+1}`,a=r.replace(/^Window\s*#?\s*\d+\s*/i,``).trim(),o=Z(n),s=window.getReviewWindowRowsData(n,t);return{card:n,no:t+1,title:r,location:a,detail:[o.group,o.headrail,o.bottomrail].filter(Boolean).join(` · `),blinds:s.map(e=>({...e,blindNo:++i}))}})),r(1),a([]),s({...qt}),l(``),d(!1),p(``)};return document.addEventListener(`click`,e),()=>document.removeEventListener(`click`,e)},[]),(0,q.useEffect)(()=>{e&&m.current?.showModal()},[e]),(0,q.useEffect)(()=>{e&&(h.current&&(h.current.scrollTop=0),g.current?.focus())},[n,e]),!e)return null;let y=e.filter(e=>i.includes(e.no)),b=e.filter(e=>[e.title,e.detail,...e.blinds.flatMap(e=>[e.blindNo,e.loc,e.fab,e.ctrl])].join(` `).toLowerCase().includes(c.trim().toLowerCase())),x=u?y:y.slice(0,6),S=Jt(o)?Nn(y,o):[],C=S.flatMap(e=>e.issues.map(t=>({no:e.no,message:t}))),w=y.map(e=>Tn(e.card)),T=wn(),E=e=>{a(e),p(``),e.length||(r(1),d(!1))},D=(e,t)=>{p(``);let n=Yt(o,e,t);e===`fabric`&&(n.group=t&&T.fabrics.find(e=>String(e.id)===t)?.product_group||``),s(n)},O=e=>{let t=an(w,o,e,T);return o[e]&&!t.some(t=>t.value===o[e])&&t.push({value:o[e],label:`${o[e]} — unavailable`,disabled:!0}),t},k=e=>{let t=Kt.find(([t])=>t===e)[1],n=O(e),r=e===`motor`&&!w.every(e=>e.control===`Motorized`&&e.motor)?`Select motor`:e===`cordlessType`&&!w.every(e=>[`CLF-R`,`CLS-R`,`CLF-Z`,`CLO`].includes(e.control))?`Select cordless type`:e===`fabric`&&o.group&&!o.fabric?`Select fabric`:`Keep current`,i=n.find(t=>t.value===o[e])?.label;return(0,$.jsxs)(`label`,{children:[t,(0,$.jsxs)(`select`,{"aria-label":t,value:o[e],onChange:t=>D(e,t.target.value),children:[(0,$.jsx)(`option`,{value:``,children:r}),n.map(e=>(0,$.jsx)(`option`,{value:e.value,disabled:e.disabled,children:e.label},e.value))]}),e===`motor`&&i?.length>24&&(0,$.jsx)(`small`,{className:`bulk-selection-value`,children:i}),e===`mount`&&o.mount===`custom`&&(0,$.jsx)(`input`,{"aria-label":`Custom Mount`,placeholder:`Custom mount`,value:o.mountCustom,onChange:e=>D(`mountCustom`,e.target.value)})]},e)};return(0,Gt.createPortal)((0,$.jsxs)(`dialog`,{className:`measure-bulk-dialog`,ref:m,onCancel:v,"aria-labelledby":`bulk-edit-title`,children:[(0,$.jsxs)(`header`,{className:`bulk-header`,children:[(0,$.jsxs)(`div`,{className:`bulk-title-row`,children:[(0,$.jsx)(`h2`,{id:`bulk-edit-title`,children:`Bulk Edit`}),(0,$.jsx)(`button`,{type:`button`,className:`bulk-close`,"aria-label":`Close Bulk Edit`,onClick:v,children:`×`})]}),(0,$.jsxs)(`ol`,{className:`bulk-steps`,"aria-label":`Bulk edit progress`,children:[(0,$.jsxs)(`li`,{"aria-current":n===1?`step`:void 0,children:[(0,$.jsx)(`span`,{children:n===2?`✓`:`1`}),` Select windows`]}),(0,$.jsxs)(`li`,{"aria-current":n===2?`step`:void 0,children:[(0,$.jsx)(`span`,{children:`2`}),` Choose options`]})]})]}),(0,$.jsxs)(`div`,{className:`bulk-body${n===1?` is-selection`:``}`,ref:h,children:[(0,$.jsx)(`h3`,{className:`bulk-sr-only`,ref:g,tabIndex:-1,children:n===1?`Which windows would you like to update?`:`Choose the product settings to apply`}),n===1?(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`bulk-selection-tools`,children:[(0,$.jsxs)(`label`,{className:`bulk-select-all`,children:[(0,$.jsx)(Mn,{checked:i.length===e.length&&e.length>0,mixed:i.length>0&&i.length<e.length,onChange:t=>E(t.target.checked?e.map(e=>e.no):[])}),` Select all (`,e.length,`)`]}),(0,$.jsx)(`button`,{type:`button`,className:`bulk-text-button`,disabled:!i.length,onClick:()=>E([]),children:`Clear selection`})]}),e.some(e=>e.blinds.at(-1)?.blindNo>6)&&(0,$.jsx)(`input`,{className:`bulk-search`,type:`search`,"aria-label":`Find windows`,placeholder:`Find by blind number, room or product…`,value:c,onChange:e=>l(e.target.value)}),(0,$.jsx)(`div`,{className:`bulk-table-wrap`,tabIndex:0,role:`region`,"aria-label":`Select window rows`,children:(0,$.jsxs)(`table`,{className:`bulk-window-table`,children:[(0,$.jsx)(`thead`,{children:(0,$.jsxs)(`tr`,{children:[(0,$.jsx)(`th`,{"aria-label":`Selection`}),(0,$.jsx)(`th`,{children:`No.`}),(0,$.jsx)(`th`,{children:`Loc`}),(0,$.jsx)(`th`,{children:`Fab`}),(0,$.jsx)(`th`,{children:`MT`}),(0,$.jsx)(`th`,{children:`HW`}),(0,$.jsx)(`th`,{children:`BT`}),(0,$.jsx)(`th`,{children:`Ctrl`}),(0,$.jsx)(`th`,{children:`W`}),(0,$.jsx)(`th`,{children:`H`})]})}),(0,$.jsxs)(`tbody`,{children:[b.flatMap(e=>e.blinds.map(t=>(0,$.jsxs)(`tr`,{className:i.includes(e.no)?`is-selected`:``,children:[(0,$.jsx)(`td`,{children:(0,$.jsx)(`label`,{className:`bulk-row-checkbox`,children:(0,$.jsx)(Mn,{"aria-label":`Select ${e.title}, blind ${t.blindNo}${e.blinds.length>1?`, all sections`:``}`,"aria-describedby":`bulk-selection-note`,checked:i.includes(e.no),onChange:t=>E(t.target.checked?[...i,e.no]:i.filter(t=>t!==e.no))})})}),(0,$.jsx)(`td`,{children:t.blindNo}),(0,$.jsxs)(`td`,{children:[t.loc,!t.included&&(0,$.jsx)(`small`,{children:`Excluded`})]}),(0,$.jsx)(`td`,{children:t.fab}),(0,$.jsx)(`td`,{children:t.mt}),(0,$.jsxs)(`td`,{children:[t.hw,t.headrailNote&&(0,$.jsx)(`small`,{children:t.headrailNote})]}),(0,$.jsx)(`td`,{children:t.bt}),(0,$.jsx)(`td`,{children:t.ctrl}),(0,$.jsx)(`td`,{children:t.w}),(0,$.jsx)(`td`,{children:t.h})]},t.blindNo))),!b.length&&(0,$.jsx)(`tr`,{children:(0,$.jsx)(`td`,{colSpan:10,children:`No windows match your search.`})})]})]})}),(0,$.jsx)(`p`,{className:`bulk-selection-note`,id:`bulk-selection-note`,children:`Split sections are selected together as one window.`})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:`bulk-selected-panel`,"aria-label":`Selected windows`,children:[(0,$.jsxs)(`div`,{className:`bulk-selection-tools`,children:[(0,$.jsxs)(`strong`,{children:[i.length,` `,i.length===1?`window`:`windows`,` selected`]}),(0,$.jsx)(`button`,{type:`button`,className:`bulk-text-button`,onClick:()=>{l(``),r(1)},children:`Edit selection`})]}),(0,$.jsx)(`p`,{className:`bulk-selected-names`,children:x.map(e=>`#${e.no}${e.location?` ${e.location}`:``}`).join(` · `)}),y.length>6&&(0,$.jsx)(`button`,{type:`button`,className:`bulk-text-button`,onClick:()=>d(!u),children:u?`Show fewer`:`Show all ${i.length} windows`})]}),(0,$.jsx)(`p`,{className:`bulk-description`,children:`“Keep current” retains each window’s value. Resolve incompatible combinations before applying.`}),(0,$.jsxs)(`div`,{className:`bulk-settings`,children:[(0,$.jsx)(`div`,{className:`bulk-setting-row bulk-three`,children:[`group`,`fabric`,`fabricColor`].map(k)}),(0,$.jsxs)(`div`,{className:`bulk-hardware-settings`,children:[(0,$.jsx)(`div`,{className:`bulk-setting-row bulk-two`,children:[`headrail`,`headrailColor`].map(k)}),(0,$.jsx)(`div`,{className:`bulk-setting-row bulk-two`,children:[`bottomrail`,`bottomrailColor`].map(k)})]}),(0,$.jsxs)(`div`,{className:`bulk-setting-row ${[`Motorized`,`Cordless`].includes(o.control)?`bulk-three`:`bulk-two`}`,children:[k(`control`),o.control===`Motorized`&&k(`motor`),o.control===`Cordless`&&k(`cordlessType`),k(`mount`)]})]}),C.length>0&&(0,$.jsxs)(`section`,{className:`bulk-clear-preview`,role:`alert`,"aria-label":`Incompatible combinations`,children:[(0,$.jsx)(`strong`,{children:`Incompatible combinations`}),C.map(({no:e,message:t})=>(0,$.jsxs)(`p`,{children:[`Window #`,e,`: `,t]},`${e}:${t}`))]}),S.some(e=>e.cleared.length>0)&&(0,$.jsxs)(`details`,{className:`bulk-clear-preview`,open:!0,children:[(0,$.jsx)(`summary`,{children:`Related selections to be removed`}),S.filter(e=>e.cleared.length).map(e=>(0,$.jsxs)(`p`,{children:[`Window #`,e.no,`: `,e.cleared.join(`, `)]},e.no))]}),(w.some(e=>e.headrail===`4FA DUO`)||S.some(e=>e.state?.headrail===`4FA DUO`))&&(0,$.jsx)(`p`,{className:`bulk-preserve-note`,children:`For DUO windows, Fabric and Fabric Color apply to Fabric A.`}),(0,$.jsx)(`p`,{className:`bulk-preserve-note`,children:`Dimensions and location stay the same. Existing memo text is kept.`})]}),f&&(0,$.jsx)(`p`,{role:`alert`,className:`bulk-error`,children:f})]}),(0,$.jsxs)(`footer`,{className:`bulk-footer`,children:[(0,$.jsxs)(`span`,{className:`bulk-count`,role:`status`,children:[i.length,` of `,e.length,` windows selected`]}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`button`,{type:`button`,onClick:n===1?v:()=>r(1),children:n===1?`Cancel`:`Back`}),n===1?(0,$.jsx)(`button`,{type:`button`,className:`bulk-primary`,disabled:!i.length,onClick:()=>r(2),children:`Next: choose options →`}):(0,$.jsxs)(`button`,{type:`button`,className:`bulk-primary`,disabled:!i.length||!Jt(o)||C.length>0,onClick:()=>{try{if(!i.length||!Jt(o))return;kn(y,o),v()}catch(e){p(e.message)}},children:[`Apply to `,i.length,` `,i.length===1?`window`:`windows`]})]})]})]}),document.body)}function Fn(e,t){let n=[];return{get latest(){let e=n.at(-1);return e?{count:e.rows.length,kind:e.kind}:null},clear(){n.length=0},remove(t,r=`delete`){let i=e(),a=new Set(t),o=i.flatMap((e,t)=>a.has(e)?[{card:e,index:t}]:[]);return o.length?(o.forEach(({card:e})=>e.remove()),n.push({rows:o,kind:r}),n.length>20&&n.shift(),!0):!1},undo(){let r=n.at(-1),i=t();if(!r||!i?.parentNode)return!1;for(let{card:t,index:n}of r.rows){let r=e()[n]||i;r.parentNode.insertBefore(t,r)}return n.pop(),!0}}}var In=[`input.dimension-control`,`input.split-mm-input`,`input.length-input`,`input[data-sidemark-input]`,`input[data-accessory-qty]`,`.record-fees-panel input[data-review-calc-input]`,`.record-fees-panel input[data-accessory-discount-input]`].join(`,`);function Ln(e){if(!e)return()=>{};let t=e.ownerDocument,n=t.defaultView,r=null,i,a=e=>e?.matches?.(In)&&!e.readOnly&&!e.disabled,o=()=>{n.clearTimeout(i),r=null},s=e=>{if(n.clearTimeout(i),!a(e)||t.activeElement!==e)return;e.select();let r=e.value;i=n.setTimeout(()=>{a(e)&&t.activeElement===e&&e.value===r&&e.select()},0)},c={pointerdown:({target:e})=>{o(),a(e)&&t.activeElement!==e&&(r=e)},focusin:({target:e})=>s(e),click:({target:e})=>{e===r&&s(e),r=null},focusout:({target:e})=>{n.clearTimeout(i),r===e&&(r=null)},pointercancel:o,keydown:o,input:o};for(let[t,n]of Object.entries(c))e.addEventListener(t,n,!0);return()=>{o();for(let[t,n]of Object.entries(c))e.removeEventListener(t,n,!0)}}function Rn(e){let t=e?.querySelector(`.top-nav`);if(!t)return()=>{};let n=e.ownerDocument.defaultView,r=()=>e.style.setProperty(`--measure-nav-height`,`${t.getBoundingClientRect().height}px`);r();let i=n.ResizeObserver?new n.ResizeObserver(r):null;return i?.observe(t),n.addEventListener(`resize`,r),()=>{i?.disconnect(),n.removeEventListener(`resize`,r),e.style.removeProperty(`--measure-nav-height`)}}function zn(e,t){let n=e?.querySelector(`#unitDropdown`),r=e?.querySelector(`#unitMenu`);if(!n||!r)return()=>{};let i=e.ownerDocument,a=Array.from(r.querySelectorAll(`[data-unit-option]`));n.setAttribute(`role`,`button`),n.setAttribute(`tabindex`,`0`),n.setAttribute(`aria-haspopup`,`menu`),n.setAttribute(`aria-controls`,`unitMenu`),n.setAttribute(`aria-label`,`Measurement unit`),r.setAttribute(`role`,`menu`),r.setAttribute(`aria-label`,`Measurement unit`),a.forEach(e=>{e.setAttribute(`role`,`menuitemradio`),e.setAttribute(`tabindex`,`-1`)});let o=()=>{n.setAttribute(`aria-expanded`,String(!r.classList.contains(`hidden`)));let t=e.querySelector(`#unitLabel`).textContent.trim();a.forEach(e=>e.setAttribute(`aria-checked`,String(e.dataset.unitOption===t)))},s=(e=!1)=>{r.classList.add(`hidden`),o(),e&&n.focus()},c=(e=!1)=>{r.classList.remove(`hidden`),o(),e&&(a.find(e=>e.getAttribute(`aria-checked`)===`true`)||a[0])?.focus()},l=e=>{let i=e.target.closest(`[data-unit-option]`);r.contains(i)?(e.preventDefault(),e.stopPropagation(),t(i.dataset.unitOption),s(!0)):n.contains(e.target)?(e.preventDefault(),e.stopPropagation(),r.classList.contains(`hidden`)?c():s()):r.contains(e.target)||s()},u=e=>{if(!n.contains(e.target)&&!r.contains(e.target)){e.key===`Escape`&&!r.classList.contains(`hidden`)&&(e.preventDefault(),s(!0));return}if(e.key===`Escape`){e.preventDefault(),e.stopPropagation(),s(!0);return}if(e.key===`Tab`){s();return}if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.stopPropagation();let n=e.target.closest(`[data-unit-option]`);r.contains(n)?(t(n.dataset.unitOption),s(!0)):r.classList.contains(`hidden`)?c(!0):s()}else if([`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(e.key)){if(e.preventDefault(),e.stopPropagation(),r.classList.contains(`hidden`)){c(!0);return}let t=a.indexOf(i.activeElement);a[e.key===`Home`?0:e.key===`End`?a.length-1:(t+(e.key===`ArrowUp`?-1:1)+a.length)%a.length]?.focus()}},d=e=>{!n.contains(e.target)&&!r.contains(e.target)&&s()};return o(),i.addEventListener(`click`,l,!0),i.addEventListener(`keydown`,u,!0),i.addEventListener(`focusin`,d),()=>{i.removeEventListener(`click`,l,!0),i.removeEventListener(`keydown`,u,!0),i.removeEventListener(`focusin`,d)}}function Bn(e,t){if(!e)return()=>{};let n=e.ownerDocument.defaultView,r=e.ownerDocument,i=new Map,a=new Map,o=0,s=!1,c=e=>e.parentElement?.querySelector(`[data-demo-dropdown-btn],[data-pricing-visibility-trigger],.field`),l=e=>e.matches(`[data-accessory-menu],[data-pricing-visibility-menu]`)?!e.classList.contains(`hidden`):e.closest(`[data-demo-dropdown]`)?.classList.contains(`open`),u=e=>{e.matches(`[data-accessory-menu],[data-pricing-visibility-menu]`)&&e.classList.add(`hidden`),e.closest(`[data-demo-dropdown]`)?.classList.remove(`open`,`open-up`)},d=e=>[...e.querySelectorAll(`.client-option,.demo-dropdown-item`)].filter(e=>!e.hasAttribute(`disabled`)&&e.style.cursor!==`default`),f=(e,t=!1)=>{let n=i.get(e);u(e),n&&(i.delete(e),typeof e.hidePopover==`function`&&e.matches(`:popover-open`)&&e.hidePopover(),n.popover===null?e.removeAttribute(`popover`):e.setAttribute(`popover`,n.popover),n.style===null?e.removeAttribute(`style`):e.setAttribute(`style`,n.style),delete e.dataset.dropdownPlacement,n.trigger.setAttribute(`aria-expanded`,`false`),t&&n.trigger.isConnected&&n.trigger.focus({preventScroll:!0}))},p=(e,t)=>{let r=t.getBoundingClientRect(),i=n.visualViewport,a=(i?.offsetLeft||0)+8,o=(i?.offsetTop||0)+8,s=a+(i?.width||n.innerWidth)-16,c=o+(i?.height||n.innerHeight)-16;if(r.bottom<=o||r.top>=c||r.right<=a||r.left>=s){f(e);return}let l=Math.max(0,c-r.bottom-6),u=Math.max(0,r.top-o-6),d=l<Math.min(260,e.scrollHeight)&&u>l,p=Math.max(0,Math.min(260,d?u:l)),m=Math.min(Math.max(r.width,140),s-a);Object.assign(e.style,{position:`fixed`,margin:`0`,inset:`auto`,boxSizing:`border-box`,minWidth:`0`,width:`${m}px`,maxHeight:`${p}px`,overflowY:`auto`,overscrollBehavior:`contain`,zIndex:`1000`,left:`${Math.max(a,Math.min(r.left,s-m))}px`,top:`${d?Math.max(o,r.top-6-Math.min(e.scrollHeight,p)):r.bottom+6}px`}),e.dataset.dropdownPlacement=d?`above`:`below`},m=()=>{if(o=0,!s){for(let t of[...i.keys()])(!t.isConnected||!e.contains(t)||!l(t))&&f(t);e.querySelectorAll(t).forEach(e=>{let t=c(e);if(!t||(a.has(t)||(a.set(t,{tab:t.getAttribute(`tabindex`),expanded:t.getAttribute(`aria-expanded`)}),/^(BUTTON|INPUT|SELECT)$/.test(t.tagName)||(t.tabIndex=0)),t.setAttribute(`aria-expanded`,String(!!l(e))),!l(e)))return;let r=t.getBoundingClientRect();if(!r.width||!r.height){f(e);return}if(!i.has(e)){i.set(e,{trigger:t,style:e.getAttribute(`style`),popover:e.getAttribute(`popover`)});let r=n.getComputedStyle(e),a=Object.fromEntries([`color`,`padding`,`fontFamily`,`fontSize`,`fontWeight`,`lineHeight`,`letterSpacing`].map(e=>[e,r[e]]));Object.assign(e.style,a,{colorScheme:`light`}),typeof e.showPopover==`function`&&(e.setAttribute(`popover`,`manual`),e.showPopover())}d(e).forEach(e=>{e.tabIndex=-1}),p(e,t)})}},h=()=>{!o&&!s&&(o=n.requestAnimationFrame(m))},g=e=>{for(let[t,{trigger:n}]of i)!t.contains(e.target)&&!n.contains(e.target)&&f(t)},_=e=>{let t=[...i.entries()].find(([t,n])=>t.contains(e.target)||n.trigger.contains(e.target));if(e.key===`Escape`&&i.size){e.preventDefault();for(let e of[...i.keys()])f(e,!0);return}if(t){let[n]=t,i=d(n),a=i.indexOf(r.activeElement),o;e.key===`ArrowDown`&&(o=Math.min(i.length-1,a+1)),e.key===`ArrowUp`&&(o=a<0?i.length-1:Math.max(0,a-1)),e.key===`Home`&&(o=0),e.key===`End`&&(o=i.length-1),o!==void 0&&i[o]&&(e.preventDefault(),i[o].focus({preventScroll:!0}),i[o].scrollIntoView({block:`nearest`})),(e.key===`Enter`||e.key===` `)&&a>=0&&(e.preventDefault(),i[a].click())}else (e.key===`Enter`||e.key===` `||e.key===`ArrowDown`)&&a.has(e.target)&&(e.preventDefault(),e.target.click(),h())},v=new n.MutationObserver(h);return v.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`class`]}),r.addEventListener(`pointerdown`,g,!0),r.addEventListener(`keydown`,_,!0),n.addEventListener(`resize`,h),r.addEventListener(`scroll`,h,!0),n.visualViewport?.addEventListener(`resize`,h),n.visualViewport?.addEventListener(`scroll`,h),m(),()=>{s=!0,v.disconnect(),o&&n.cancelAnimationFrame(o);for(let e of[...i.keys()])f(e);for(let[e,t]of a)for(let[n,r]of[[`tabindex`,t.tab],[`aria-expanded`,t.expanded]])r===null?e.removeAttribute(n):e.setAttribute(n,r);r.removeEventListener(`pointerdown`,g,!0),r.removeEventListener(`keydown`,_,!0),n.removeEventListener(`resize`,h),r.removeEventListener(`scroll`,h,!0),n.visualViewport?.removeEventListener(`resize`,h),n.visualViewport?.removeEventListener(`scroll`,h)}}function Vn(e,t=()=>crypto.randomUUID(),{accountId:n,storage:r,storageKey:i}={}){let a;try{a=JSON.parse(r?.getItem(i)||`null`)}catch{}return async({quoteId:o,revision:s,quote:c,windows:l,accessories:u})=>{if(!o||!s)throw Error(`Reopen this quote before overwriting it. Your edits are still on this screen.`);let d=JSON.stringify([o,s,c,l,u]);if(a?.signature!==d){a={signature:d,id:t()};try{r?.setItem(i,JSON.stringify(a))}catch{}}let{data:f,error:p}=await Ve(e,n,`overwrite`,{p_quote_id:o,p_expected:s,p_request_id:a.id,p_quote:c,p_windows:l,p_accessories:u});if(p)throw p;if(!f?.id||f.id!==o||!f.revision)throw Error(`Could not confirm the save. Retry without changing the form to check the same request safely.`);return f}}async function Hn(e,t){let{data:n,error:r}=await e.rpc(`winco_load_quote_for_edit`,{p_quote_id:t});if(r)throw r;if(!n?.quote||n.quote.id!==t||!n.revision||!Array.isArray(n.windows)||!Array.isArray(n.accessories))throw Error(`Could not load the complete quote. Please reopen it.`);return n}function Un(e,{accountId:t,storage:n,storageKey:r,uuid:i=()=>crypto.randomUUID()}={}){let a;try{a=JSON.parse(n?.getItem(r)||`null`)}catch{}let o=e=>{a=e;try{e?n?.setItem(r,JSON.stringify(e)):n?.removeItem(r)}catch{}},s=e=>{if(!e?.id||!e.quote_number||!e.revision)throw Error(`Could not confirm the save. Please retry.`);return e},c=async({payload:n,prepare:r})=>{let c=JSON.stringify({...n,quoteNumber:void 0});if(a&&a.signature!==c){let{data:n,error:r}=await Ve(e,t,`settle_create`,{p_request_id:a.id});if(r)throw r;if(n?.cancelled!==!0){let e=s(n);o(null);let t=Error(`The earlier save completed as `+e.quote_number+`. Your latest edits are still here. Press Save to update that quote or choose Save as New Quote.`);throw t.createdQuote=e,t}o(null)}if(!a){let e=await r();o({id:i(),signature:c,submission:e})}let{quote:l,windows:u,accessories:d}=a.submission,{data:f,error:p}=await Ve(e,t,`create`,{p_request_id:a.id,p_quote:l,p_windows:u,p_accessories:d});if(p)throw p;return s(f)};return c.hasPending=()=>!!a,c.canResume=()=>{if(!a)return!0;try{return n?.getItem(r)===JSON.stringify(a)}catch{return!1}},c.reset=()=>o(null),c}window.wincoFormatReviewMoney=fe,window.wincoFormatReviewDimension=Te,window.wincoFormatChainLength=b,window.wincoRefreshMeasureTag=Wt,window.wincoRecordInformation=re,window.wincoNormalizeInstallationDate=ne,window.wincoNormalizeInstallationTime=ie,window.wincoClientLabel=ae,window.wincoNormalizeClient=ke,window.wincoLoadClients=()=>be(t),window.wincoLoadLinkedClient=e=>ve(t,e),window.wincoMeasureInformation=Ee,window.wincoReviewSupplements=je,window.wincoResolveQuoteClient=async e=>{if(await we(t),!e.mode)throw Error(`Choose New client or Select client first.`);if(!String(e.name||``).trim())throw Error(`Enter a name in Client Information.`);let n=document.querySelector(`#clientInformationCard`);if(n?.dataset.clientPending===`true`||n?.dataset.clientError===`true`)throw Error(`Load Client Information before saving. Select the client again.`);return{clientId:e.id||null}};function Wn({currentUser:e,onOpenMainPage:n,onOpenMeasurePage:a,onOpenQuotesPage:_,onOpenOrdersPage:v,onOpenClientsPage:y,onOpenResourcesPage:b,onOpenAdminPage:x,onOpenFeedbackPage:S}){let C=l(e),w=e?.account_name||`Charles / Winco`,[T]=(0,q.useState)(()=>i(window,e.id)),E=Rt.replace(`<div class="app">`,`<div class="app" inert>`).replace(`<button class="btn">Bulk Edit</button>`,`<button class="btn" type="button" data-measure-bulk-edit>Bulk Edit</button>`).replace(/(<div data-account-home-link[^>]*>)[\s\S]*?(<\/div>)/,(e,t,n)=>`${t}${w.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}${n}`).replace(/<div\b[^>]*class=["'][^"']*\bnav-item\b[^"']*["'][^>]*>\s*Admin\s*<\/div>/gi,e=>C?e:`<div class="nav-item">Feedback</div>`).replace(`<div class="main-nav-item current">Admin</div>`,C?`<div class="main-nav-item current">Admin</div>`:`<div class="main-nav-item">Feedback</div>`).replace(`<div class="main-nav-item">Admin</div>`,C?`<div class="main-nav-item">Admin</div>`:`<div class="main-nav-item">Feedback</div>`);return(0,q.useEffect)(()=>Bn(document.querySelector(`.measure-page`),`[data-accessory-menu]`),[]),(0,q.useEffect)(()=>{window.supabaseClient=t,window.measureCurrentAccountName=w,window.measureCurrentAccountId=e.id,window.measureEditingQuoteId=T.editingQuoteId,window.measureEditingRevision=T.revision},[e.id,w,T.editingQuoteId,T.revision]),(0,q.useEffect)(()=>{let e=document.createElement(`style`);return e.setAttribute(`data-client-picker-style`,`true`),e.textContent=`
  .measure-page .measure-client-popup.hidden {
    display: none !important;
  }

  .measure-page .measure-client-popup {
    position: fixed;
    inset: 0;
    z-index: 9998;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 84px 16px 24px;
    font-family: inherit;
  }

  .measure-page .measure-client-popup-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(15, 23, 42, 0.18);
  }

  .measure-page .measure-client-popup-panel {
    position: relative;
    width: min(860px, calc(100vw - 32px));
    background: #f6f7f9;
    border: 1px solid #dbe3ec;
    border-radius: 18px;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.16);
    padding: 18px 16px 20px;
  }

  .measure-page .measure-client-popup-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
    margin-bottom: 16px;
  }

  .measure-page .measure-client-popup-title {
    font-size: 22px;
    font-weight: 600;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin-right: auto;
  }

  .measure-page .measure-client-popup-search {
    width: 280px;
    max-width: 100%;
    height: 38px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #64748b;
    font-size: 13px;
  }

  .measure-page .measure-client-popup-search input {
    width: 100%;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: #334155;
    font-size: 13px;
    padding: 0;
    font-family: inherit;
  }

  .measure-page .measure-client-popup-close {
    width: 30px;
    height: 30px;
    border: 0;
    background: transparent;
    color: #64748b;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }

  .measure-page .measure-client-popup-table {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
  }

  .measure-page .measure-client-popup-head,
  .measure-page .measure-client-popup-row {
    display: grid;
    grid-template-columns: minmax(110px, .9fr) minmax(130px, 1fr) minmax(150px, 1.2fr) minmax(120px, .9fr);
    align-items: center;
    gap: 8px;
    padding: 0 18px;
  }

  .measure-page .measure-client-popup-head {
    min-height: 46px;
    background: rgba(248, 250, 252, 0.92);
    border-bottom: 1px solid #e2e8f0;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }

  .measure-page .measure-client-popup-row {
    min-height: 52px;
    font-size: 13px;
    color: #334155;
    border-bottom: 1px solid #eef2f7;
    cursor: pointer;
  }

  .measure-page .measure-client-popup-row:last-child {
    border-bottom: none;
  }

  .measure-page .measure-client-popup-row:hover {
    background: #f8fafc;
  }

  .measure-page .measure-client-popup-head > div,
  .measure-page .measure-client-popup-row > div {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .measure-page .measure-client-popup-empty {
    min-height: 52px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 13px;
    color: #64748b;
  }

`,document.head.appendChild(e),()=>{e.remove()}},[]),(0,q.useEffect)(()=>Ke(window,e.id),[e.id]),(0,q.useEffect)(()=>{let n=!0,r=0,i=Ye(window,`measureFabricCatalogState`,async(i=!1)=>{let a=++r,o=String(e?.role||``).trim(),s=o===`Admin`||o===`Sales`,c=String(e?.dealer_level||``).trim().toUpperCase();if(!s&&!c&&e?.id){let{data:n,error:r}=await t.from(`accounts`).select(`dealer_level`).eq(`id`,e.id).limit(1);r?console.error(`Failed to load dealer level:`,r):c=String(n?.[0]?.dealer_level||``).trim().toUpperCase()}let{data:l,error:u}=await t.from(`fabrics`).select(`
          id,
          product_group,
          code,
          description,
          price,
          width,
          visibility,
          sort_order,
          fabric_colors (
            id,
            color_code,
            status,
            visibility
          )
        `).order(`product_group`,{ascending:!0}).order(`sort_order`,{ascending:!0,nullsFirst:!1}).order(`code`,{ascending:!0});if(!n||a!==r)return;if(u)return console.error(`Failed to load fabrics:`,u),i||(window.measureFabricItems=[]),!1;let d=e=>{if(s)return!0;let t=String(e||`Public`).trim().toLowerCase();return t===`public`?!0:c===`L1`?t===`access l1`:c===`L2`?t===`access l2`||t===`access l3`:!1};return window.measureFabricItems=(l||[]).filter(e=>d(e.visibility)).map(e=>({...e,fabric_colors:Array.isArray(e.fabric_colors)?e.fabric_colors.filter(e=>d(e.visibility)):[]})),window.refreshSelectedCatalogPrices?.(),window.refreshFabricMenusForGroup?.(void 0,{reconcile:!1}),!0},()=>n);return window.reloadMeasureFabrics=i,()=>{n=!1,window.reloadMeasureFabrics===i&&delete window.reloadMeasureFabrics}},[]),(0,q.useEffect)(()=>{let e=!0,n=0,r=Ye(window,`measureHardwareCatalogState`,async()=>{let r=++n;window.measureHardwareCatalogState=`loading`;let{data:i,error:a}=await t.from(`hardware_items`).select(`id, product_group, code, description, pricing_type, sort_order`).order(`product_group`,{ascending:!0}).order(`sort_order`,{ascending:!0,nullsFirst:!1}).order(`code`,{ascending:!0});if(!(!e||r!==n))return a?(console.error(`Failed to load hardware items:`,a),window.measureHardwareCatalogState=`error`,!1):(window.measureHardwareItems=(i||[]).map(jn.normalizeHardwareItem),window.measureHardwareCatalogState=`ready`,window.measurePricingCatalogState===`ready`&&!window.measureEditingQuoteId&&window.refreshCordlessTypeMenusForGroup?.(),window.refreshSelectedCatalogPrices?.(),!0)},()=>e);return window.reloadMeasureHardware=r,()=>{e=!1,window.reloadMeasureHardware===r&&delete window.reloadMeasureHardware}},[]),(0,q.useEffect)(()=>{let e=!0,n=0,r=Ye(window,`measureHardwareColorsState`,async()=>{let r=++n;window.measureHardwareColorsState=`loading`;let{data:i,error:a}=await t.from(`hardware_colors`).select(`id, hardware_id, color_code, color_description, visibility`).order(`color_code`,{ascending:!0});if(!(!e||r!==n))return a?(console.error(`Failed to load hardware colors:`,a),window.measureHardwareColorsState=`error`,!1):(window.measureHardwareColors=i||[],window.measureHardwareColorsState=`ready`,window.measurePricingCatalogState===`ready`&&!window.measureEditingQuoteId&&window.refreshCordlessTypeMenusForGroup?.(),!0)},()=>e);return window.reloadMeasureHardwareColors=r,()=>{e=!1,window.reloadMeasureHardwareColors===r&&delete window.reloadMeasureHardwareColors}},[]),(0,q.useEffect)(()=>{let n=!0,r,i=!1,a=()=>{let e=document.querySelector(`.measure-page .page`);if(!e)return;let t=e.querySelector(`[data-pricing-status]`);t||(t=document.createElement(`div`),t.dataset.pricingStatus=``,t.className=`measure-pricing-status`,t.setAttribute(`role`,`status`),e.querySelector(`.meta`).after(t)),t.replaceChildren();let o=Je(window);if(o===`ready`?(window.clearTimeout(r),r=void 0,i=!1):o===`loading`&&!i&&!r&&!window.measureCatalogRefreshBusy&&(r=window.setTimeout(()=>{r=void 0,n&&(i=!0,a())},200)),t.hidden=o===`ready`||window.measureCatalogRefreshBusy||o===`loading`&&!i,t.hidden)return;t.dataset.state=o;let s=document.createElement(`span`);if(s.textContent=o===`loading`?`Loading product data…`:`Product data could not be loaded. Retry before saving.`,t.append(s),o===`error`){let e=document.createElement(`button`);e.type=`button`,e.className=`btn`,e.textContent=`Retry data`,e.onclick=()=>window.reloadMeasureCatalogs?.(),t.append(e)}},o=0,s=async(r=!1)=>{let i=++o;window.measurePricingCatalogState=`loading`,r||(window.measurePricingOptionItems=[],window.measurePricingMotorItems=[],window.measurePricingCordlessTypeItems=[],window.measurePricingAccessoryItems=[],window.measurePricingRateTables=[]),a();try{let[[a,s],c]=await Promise.all([f(t,e,{fresh:r}),Me(t)]);if(!n||i!==o)return;let l=e=>a.items.filter(t=>t.category===e&&t.is_active!==!1);window.measurePricingOptionItems=l(`Option`),window.measurePricingMotorItems=l(`Motor`),window.measurePricingCordlessTypeItems=l(`Cordless Type`),window.measurePricingAccessoryItems=l(`Accessory`),window.measurePricingRateTables=a.rates,window.measureChainOptions=s.rows,window.measureProductConfiguration=c,window.measurePricingCatalogState=`ready`,document.querySelectorAll(`.measure-page .window-head`).forEach(e=>window.wincoDependencies?.renderOptions(e.closest(`.card`),!0)),window.measurePricingCatalogRevision=a.revision,window.refreshAccessoryPricingMenus?.(),window.measureEditingQuoteId||window.refreshCordlessTypeMenusForGroup?.(),window.refreshOpenMotorMenus?.(),window.refreshSelectedCatalogPrices?.(),window.updateAllWindowPricing?.()}catch(e){if(!n||i!==o)return;window.measurePricingCatalogState=`error`,console.error(`Failed to load pricing catalog`,e)}return n&&a(),window.measurePricingCatalogState===`ready`};return window.reloadMeasurePricing=s,window.updateMeasurePricingStatus=a,()=>{n=!1,window.reloadMeasurePricing===s&&delete window.reloadMeasurePricing,window.clearTimeout(r),window.updateMeasurePricingStatus===a&&delete window.updateMeasurePricingStatus}},[]),(0,q.useEffect)(()=>{let e=!0,n=0,r=Ye(window,`measureControlCatalogState`,async()=>{let r=++n,{data:i,error:a}=await t.from(`control_items`).select(`id, product_group, code, control_type, pricing_type, visibility, sort_order`).order(`sort_order`,{ascending:!0,nullsFirst:!1}).order(`control_type`,{ascending:!0});if(!(!e||r!==n))return a?(console.error(`Failed to load motorized control items:`,a),!1):(window.measureControlItems=i||[],document.querySelectorAll(`[data-cordless-type-section]`).forEach(e=>{let t=e.querySelector(`.client-menu`);t&&!t.classList.contains(`hidden`)&&window.renderCordlessTypeMenu?.(e)}),document.querySelectorAll(`[data-motor-menu]`).forEach(e=>{if(!e.classList.contains(`hidden`)){let t=e.closest(`[data-motor-section]`);t&&typeof window.renderMotorMenu==`function`&&window.renderMotorMenu(t)}}),!0)},()=>e);return window.reloadMeasureControls=r,()=>{e=!1,window.reloadMeasureControls===r&&delete window.reloadMeasureControls}},[]),(0,q.useEffect)(()=>{let n=!1,r=Ge({versions:()=>Ue(t),active:()=>!n&&window.measureCurrentAccountId===e.id,loaders:Object.fromEntries(Object.entries({fabrics:`reloadMeasureFabrics`,hardware:`reloadMeasureHardware`,hardwareColors:`reloadMeasureHardwareColors`,controls:`reloadMeasureControls`,pricing:`reloadMeasurePricing`}).map(([e,t])=>[e,()=>{if(typeof window[t]!=`function`)throw Error(`Product data is not ready.`);return window[t](!0)}])),onConfirmed:e=>{window.measureCatalogVersions=e,window.measurePricingCatalogState=`ready`}}),i=async(e={})=>{window.measureCatalogRefreshBusy=!0,window.updateMeasurePricingStatus?.();try{let t=await r.check(e);return!n&&t.changed.length&&(document.querySelectorAll(`.measure-page .window-head`).forEach(e=>{let t=e.closest(`.card`);t.dataset.restoringQuote||window.wincoDependencies?.renderOptions(t,!0)}),window.updateAllWindowPricing?.(),window.saveMeasureDraftState?.()),t}catch(e){throw n||(window.measurePricingCatalogState=`error`),e}finally{n||(window.measureCatalogRefreshBusy=!1,window.updateMeasurePricingStatus?.())}},a=()=>i().catch(()=>{}),o=g(a,{busy:()=>window.measureSaveBusy||window.measureNewQuoteResetBusy}),s=()=>i({force:!0}).catch(()=>{});return window.reloadMeasureCatalogs=s,window.ensureMeasureCatalogFresh=i,a(),()=>{n=!0,o.dispose(),r.dispose(),window.measureCatalogRefreshBusy=!1,window.reloadMeasureCatalogs===s&&delete window.reloadMeasureCatalogs,window.ensureMeasureCatalogFresh===i&&delete window.ensureMeasureCatalogFresh,delete window.measureCatalogVersions}},[e.id]),(0,q.useEffect)(()=>{let i=T.editingQuoteId,l=!1,f=!1,g=document.querySelector(`.measure-page`),C=jt(()=>{let t=g;!t||l||window.measureCurrentAccountId!==e.id||f&&s(window,e.id,Ot(t),window.measureEditingQuoteId||``,window.measureEditingRevision||``)},window),E=()=>C.flush(),D=()=>C.schedule();window.saveMeasureDraftState=E;let O=()=>{c(window,e.id),o(window,e.id)};window.clearMeasureDraftState=O;let k=()=>h({window,document,accountId:e.id,saveDraft:E,captureDraft:()=>f&&Ot(g),verifyDraft:t=>r(window,e.id,t)});window.wincoPrepareAppUpdate=k;let A=()=>{document.visibilityState===`hidden`&&E()};window.addEventListener(`pagehide`,E),document.addEventListener(`visibilitychange`,A);let ee=()=>{let e=document.querySelector(`.measure-page`);return e?([`input`,`change`,`keyup`,`click`,`focusout`].forEach(t=>{e.addEventListener(t,D,!1)}),()=>{[`input`,`change`,`keyup`,`click`,`focusout`].forEach(t=>{e.removeEventListener(t,D,!1)})}):()=>{}};document.querySelectorAll(`script[data-winco-measure-page="true"]`).forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)});let j=document.createElement(`script`),te=document.createElement(`div`);te.innerHTML=Rt,window.measureBlankWindowTemplate=te.querySelector(`.window-head`).closest(`.card`).cloneNode(!0),window.measureWindowHistory=Fn(()=>Array.from(document.querySelectorAll(`.measure-page .window-head`)).map(e=>e.closest(`.card`)),()=>document.querySelector(`.measure-page .actions`)),j.type=`text/javascript`,j.dataset.wincoMeasurePage=`true`,window.wincoDependencies=jn,window.wincoPricing={bracketPrice:d,rateTable:m,motorCatalog:p,findMotorPricingItem:u},window.wincoDuo=Ae,window.wincoQuantities={quantity:he,read:pe,sync:ge,change:ue,issues:de},window.wincoConfiguration=z,window.wincoSectionPricing={calculate:Ce,sum:Se,version:1},window.wincoSplits={sync:rt,clear:nt,issues:tt,read:Qe,render:$e};let M;try{M=window.sessionStorage}catch{}window.overwriteMeasureQuote=Vn(t,void 0,{storage:M,storageKey:`wincoQuoteOverwrite::`+e.id,accountId:e.id}),window.measureClientRows=[],window.measureClientGeneration=(window.measureClientGeneration||0)+1,window.measureClientFilteredRows=[],window.measureClientRowsLoading=!1,window.measureClientRowsLoaded=!1,window.createMeasureQuote=Un(t,{storage:M,storageKey:`wincoQuoteCreate::`+encodeURIComponent(e?.id||w),accountId:e.id});let N={active:!0,create:window.createMeasureQuote,overwrite:window.overwriteMeasureQuote};window.measureSaveContext=N,window.measureSaveBusy=!1,window.measureNewQuoteResetBusy=!1,j.text=`window.currentMeasureUserRole = ${JSON.stringify(e?.role||``)};\nwindow.currentMeasureAccountName = ${JSON.stringify(w)};\n`+zt;let ne=Xe(window);window.measurePageLifetime=ne,document.body.appendChild(j);let P=window.cleanupMeasureDocumentEvents,re=ce(document.querySelector(`.measure-page`),{onOpenMainPage:n,onOpenMeasurePage:a,onOpenQuotesPage:_,onOpenOrdersPage:v,onOpenClientsPage:y,onOpenResourcesPage:b,onOpenAdminPage:x,onOpenFeedbackPage:S},{beforeNavigate:()=>{Bt(),E()}}),ie=ee(),ae=Ln(document.querySelector(`.measure-page`)),F=Rn(document.querySelector(`.measure-page`)),oe=Be(g),se=Ut(g),le=Le(g),fe=Oe(g,window),me=Ie(g),I=Re(g.querySelector(`.record-totals`)),L=Mt(),_e=async n=>{let r=String(n||``).trim();if(!r)return;delete window.measureEditingRevision;let i=await Hn(t,r);return l||window.measureCurrentAccountId!==e.id||window.measureEditingQuoteId!==r?!1:(window.measureEditingRevision=i.revision,L(i),!0)};(async()=>{let t=!!(T.loadQuote||T.data||T.html),n=t?Nt(g,T.loadQuote?`Opening quote…`:`Restoring your work…`):()=>{};try{if(t&&await Pt(window),l)return;if(typeof window.initMeasurePage==`function`&&window.initMeasurePage(),T.loadQuote){if(!await _e(i))return}else (T.data||T.html)&&kt(g,T.data||At(document,T.html),L,window);if(l)return;ze(g),f=!0,E(),g.querySelector(`.app`)?.removeAttribute(`inert`),o(window,e.id)}catch(e){if(l)return;console.error(`Could not restore Measure draft`,e);let t=document.createElement(`p`);t.setAttribute(`role`,`alert`),t.textContent=T.loadQuote?`Could not open this quote. Your previous work has been kept. Reopen the quote to try again.`:`Could not restore this draft. Please reload before continuing. Your saved draft has been kept.`,g.prepend(t);let n=document.createElement(`button`);n.type=`button`,n.className=`btn`,n.textContent=`Back to quotes`,n.addEventListener(`click`,_),t.append(` `,n),g.querySelector(`.app`)?.setAttribute(`inert`,``)}finally{n()}})();let ve=zn(document.querySelector(`.measure-page`),e=>{window.selectUnit(e),E()});return()=>{Bt(),E(),l=!0,N.active=!1,window.measureSaveContext===N&&(window.measureSaveBusy=!1,window.measureNewQuoteResetBusy=!1),C.cancel(),window.saveMeasureDraftState===E&&delete window.saveMeasureDraftState,window.clearMeasureDraftState===O&&delete window.clearMeasureDraftState,window.wincoPrepareAppUpdate===k&&delete window.wincoPrepareAppUpdate,window.removeEventListener(`pagehide`,E),document.removeEventListener(`visibilitychange`,A),window.measureClientGeneration+=1,typeof re==`function`&&re(),typeof ie==`function`&&ie(),ne.dispose(),ae(),F(),oe(),se(),le(),fe(),me(),I(),typeof P==`function`&&P(),window.cleanupMeasureDocumentEvents===P&&delete window.cleanupMeasureDocumentEvents,ve(),j.parentNode&&j.parentNode.removeChild(j)}},[]),(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`div`,{className:`measure-page`,"data-screen-mode":`newQuote`,dangerouslySetInnerHTML:{__html:E}}),(0,$.jsx)(Pn,{})]})}export{Wn as default};