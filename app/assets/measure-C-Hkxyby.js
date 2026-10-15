import{n as e,r as t}from"./supabaseClient-CdMXQqVK.js";import{c as n,n as r,o as i,r as a,s as o,t as s}from"./measureDraft-DWTbK9YM.js";import{t as c}from"./jsx-runtime-Cbmb5DT6.js";import{n as l}from"./pageNavigation-DbIq8MXG.js";import{a as u,r as d,t as f}from"./recordInformation-7zr-Auzp.js";import{r as p}from"./appUpdate-aYZITI6w.js";import{c as m,g as h,h as g,i as _,l as v,m as y,n as b,p as x,r as S,s as ee,t as C,u as w}from"./windowConfiguration-ZBUPDgxt.js";import{a as T,c as E,d as te,i as ne,l as D,n as O,o as k,r as A,t as j,u as M}from"./productDependencies-LTYWPysj.js";import{r as N,t as re}from"./boundedDropdowns-hDTksWyO.js";import{i as ie,n as ae,o as oe,r as P,t as se}from"./pricingCatalog-5urwbWaW.js";import{a as ce,i as F,r as le}from"./clientWorkflow-BYmPVTla.js";import{t as I}from"./quoteAccountAction-CN6KFPXI.js";function ue(e=globalThis.window){let t=!0,n=[],r=new Set;return{listen(e,r,i,a){t&&(e.addEventListener(r,i,a),n.push([e,r,i,a]))},delay(n,i=0){if(!t)return;let a=e.setTimeout(()=>{r.delete(a),t&&n()},i);return r.add(a),a},dispose(){t=!1,n.splice(0).forEach(([e,t,n,r])=>e.removeEventListener(t,n,r)),r.forEach(t=>e.clearTimeout(t)),r.clear()}}}var L=e=>e&&!e.classList.contains(`placeholder`)?e.textContent.trim():``;function de(e){let t=e?.querySelector(`[data-fabric-display]`),n=e?.querySelector(`[data-fabric-color-display]`);return{code:L(t),color:L(n),price:L(t)?Number(t.dataset.fabricPrice||0):0,id:t?.dataset.fabricId||``,colorId:n?.dataset.fabricColorId||``,width:Number(t?.dataset.fabricWidth||0)}}function fe(e){let t=de(e?.querySelector(`[data-fabric-display]`)?.closest(`.col-4`)),n=L(e?.querySelector(`[data-headrail-display]`));return{headrail:n,fabric:t.code,fabricColor:t.color,pricePerSqft:t.price,...x(n)?{fabricB:de(e.querySelector(`[data-duo-fabric-b]`))}:{}}}function pe(e){if(!e||e.dataset.restoringQuote)return;let t=x(L(e.querySelector(`[data-headrail-display]`)));e.classList.toggle(`is-duo`,t);let n=e.querySelector(`[data-fabric-display]`)?.closest(`.col-4`);if(!n)return;n.querySelector(`.field-label`).textContent=t?`Product · Fabric A`:`Product`;let r=e.querySelector(`[data-duo-fabric-b]`);if(!t){r?.remove();return}r||(r=document.createElement(`div`),r.className=`col-4 duo-fabric-b`,r.dataset.duoFabricB=``,r.innerHTML=`<div class="field-label">Product · Fabric B</div><div class="product-combo" style="grid-template-columns:3fr 1fr"><div class="product-seg clickable placeholder" data-fabric-display onclick="toggleFabricMenu(this,event)">Fabric</div><div class="product-seg clickable placeholder" data-fabric-color-display onclick="toggleFabricColorMenu(this,event)">Color</div></div><div class="client-menu hidden" data-fabric-menu></div><div class="client-menu hidden" data-fabric-color-menu></div>`,([...e.querySelectorAll(`.field-label`)].find(e=>e.textContent.trim()===`Config`)?.parentElement)?.after(r))}function me(e,t){let n=e.dataset.restoringQuote;delete e.dataset.restoringQuote,pe(e),n&&(e.dataset.restoringQuote=n);let r=e.querySelector(`[data-duo-fabric-b]`);if(!r)return;let i=t.fabricB||{},a=r.querySelector(`[data-fabric-display]`),o=r.querySelector(`[data-fabric-color-display]`);a.textContent=i.code||`Fabric`,a.classList.toggle(`placeholder`,!i.code);let s=(window.measureFabricItems||[]).find(e=>e.id===i.id||e.code===i.code);Object.assign(a.dataset,{fabricId:i.id||s?.id||``,fabricCode:i.code||``,fabricGroup:`Roller`,fabricPrice:String(i.price||0),fabricWidth:String(i.width||s?.width||0)}),o.textContent=i.color||`Color`,o.classList.toggle(`placeholder`,!i.color),Object.assign(o.dataset,{fabricColorId:i.colorId||``,fabricColor:i.color||``})}var he={...w,read:fe,sync:pe,restore:me},R=e=>e==null||String(e).trim()===``?null:Number(e),ge=e=>Math.round(e*1e6)/1e6;function _e(e,t){let n=t.map(e=>R(e.widthMm)),r=t.findIndex(e=>e.autoCalculated===!0);if(r>=0&&n.some((e,t)=>t!==r&&e===null)&&(n[r]=null,r=-1),r<0){let e=n.flatMap((e,t)=>e===null?[t]:[]);e.length===1?r=e[0]:e.length||(r=n.length===3?1:n.length-1)}if(n.length<2&&(r=-1),r>=0){let t=R(e),i=n.filter((e,t)=>t!==r);n[r]=Number.isFinite(t)&&t>0&&i.every(Number.isFinite)?Math.max(0,ge(t-i.reduce((e,t)=>e+t,0))):null}return{values:n,autoIndex:r}}function ve(e){if(!b(e.config))return[];let t=e.splits||[],n=R(e.widthMm),r=t.map(e=>R(e.widthMm));return t.length<2||t.length>7?[`Choose between 2 and 7 sections.`]:!Number.isFinite(n)||n<=0?[`Enter the total width before setting section widths.`]:r.some(e=>!Number.isFinite(e))?[`Enter the width of each section except the automatically calculated section.`]:r.some(e=>e<=0)?[`Every section must have a positive width. The entered widths must leave room for the automatic section.`]:Math.abs(r.reduce((e,t)=>e+t,0)-n)>1e-6?[`Section widths must add up to the total width.`]:[]}function ye(e,t=!1){e?.querySelectorAll(`.split-mm-input`).forEach(e=>{e.readOnly=!1,e.classList.remove(`split-input-auto`),e.removeAttribute(`aria-readonly`),e.removeAttribute(`aria-invalid`),e.removeAttribute(`title`),e.setCustomValidity(``),t&&(delete e.dataset.autoFilled,delete e.dataset.forceAuto)})}function be(e,t){let n=e?.querySelector(`.split-row`);if(!n||n.classList.contains(`hidden`))return;let r=Array.from(n.querySelectorAll(`.split-mm-input`)),i=r.map(e=>e.dataset.autoFilled===`true`||e.dataset.forceAuto===`true`),{values:a,autoIndex:o}=_e(t,r.map(e=>({widthMm:e.value,autoCalculated:e.dataset.autoFilled===`true`||e.dataset.forceAuto===`true`})));ye(e,!0);let s=ve({config:`Multi`,widthMm:t,splits:a.map(e=>({widthMm:e}))})[0];r.forEach((e,t)=>{(t===o||i[t]&&a[t]===null)&&(e.value=a[t]===null?``:String(a[t])),t===o&&(e.readOnly=!0,e.dataset.autoFilled=`true`,e.classList.add(`split-input-auto`),e.setAttribute(`aria-readonly`,`true`),e.title=s||`Automatically calculated: total width minus the other sections.`,s&&e.setAttribute(`aria-invalid`,`true`)),e.setCustomValidity(s||``)})}var xe=e=>[...e.querySelectorAll(`.field-label`)].find(e=>e.textContent.trim()===`Config`)?.parentElement.querySelector(`.field`),Se=e=>e.querySelector(`.dimension-field[data-dimension="w"]`),z=e=>e===``||e==null?null:Number(e),Ce=[`Single`,`Multi`,`Linked`,`Multi + Linked`];function we(e){let t=xe(e)?.querySelector(`span`)?.textContent.trim()||`Single`;return{config:t,widthMm:z(Se(e)?.dataset.mmValue),splits:[...e.querySelectorAll(`[data-split-fields] .split-item`)].map(e=>({widthMm:z(e.querySelector(`.split-mm-input`)?.value),ctrl:e.querySelector(`.split-select-display`)?.textContent.trim()||`None`,autoCalculated:e.querySelector(`.split-mm-input`)?.dataset.autoFilled===`true`,linkedToNext:e.dataset.linkedToNext===void 0?t===`Linked`:e.dataset.linkedToNext===`true`}))}}function Te(e){be(e,z(Se(e)?.dataset.mmValue)),window.renderReviewTableRows(),e.dispatchEvent(new Event(`input`,{bubbles:!0}))}function Ee(e,t){let n=e.querySelector(`.split-row`),r=b(t.config),i=xe(e);if(i.tagName!==`BUTTON`){let e=document.createElement(`button`);e.type=`button`,e.className=`field configuration-trigger`,e.setAttribute(`onclick`,`toggleConfigMenu(this)`),e.append(...i.childNodes),i.replaceWith(e),i=e}i.classList.add(`configuration-trigger`),i.removeAttribute(`aria-haspopup`),i.querySelector(`span`).textContent=r?t.config:`Single`,i.setAttribute(`aria-label`,`Window configuration: ${r?t.config:`Single`}`),i.title=`Choose window configuration`;let a=i.parentElement.querySelector(`[data-configuration-menu]`);a||(i.parentElement.querySelector(`.client-menu`)?.remove(),a=document.createElement(`div`),a.className=`client-menu hidden menu-right-align`,a.dataset.configurationMenu=``,Ce.forEach(e=>{let t=document.createElement(`button`);t.type=`button`,t.className=`client-option`,t.textContent=e,t.setAttribute(`onclick`,`selectConfig(this,'${e}')`),a.append(t)}),i.parentElement.append(a)),a.querySelectorAll(`button`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.textContent===(r?t.config:`Single`)))),a.classList.add(`hidden`),n.classList.toggle(`hidden`,!r),n.removeAttribute(`aria-hidden`),n.replaceChildren();let o=document.createElement(`div`);o.className=`split-row-inner`,o.dataset.splitContainer=``;let s=document.createElement(`div`);s.className=`split-fields`,s.dataset.splitFields=``;let c=t.splits?.length>=2?t.splits:[{},{}];c.forEach((e,n)=>{let r=document.createElement(`div`);if(r.className=`split-unit`,t.config===`Multi + Linked`&&n>0){let e=document.createElement(`label`);e.className=`split-link`;let t=document.createElement(`span`);t.textContent=`Linked`;let i=document.createElement(`input`);i.type=`checkbox`,i.checked=c[n-1].linkedToNext===!0,i.defaultChecked=i.checked,i.dataset.linkIndex=String(n-1),i.setAttribute(`aria-label`,`Link sections ${n} and ${n+1}`),i.setAttribute(`onchange`,`window.wincoConfiguration.link(this)`),e.append(t,i),r.append(e)}let i=document.createElement(`div`);i.className=`split-item`,i.dataset.linkedToNext=String(n<c.length-1&&(t.config===`Linked`||t.config===`Multi + Linked`&&e.linkedToNext===!0));let a=document.createElement(`div`);a.className=`split-label`,a.textContent=`(${n+1}/${c.length})`,i.innerHTML=`<div class="split-combo"><div class="split-seg"><input class="split-mm-input" type="number" step="any" min="0" placeholder="mm" aria-label="Section ${n+1} width in mm"></div><div class="split-seg"><div class="split-select-display" onclick="toggleSplitCtrlMenu(this, event)"></div><div class="client-menu split-select-menu hidden"><div class="client-option" onclick="selectSplitCtrl(this,'None', event)">None</div><div class="client-option" onclick="selectSplitCtrl(this,'L', event)">L</div><div class="client-option" onclick="selectSplitCtrl(this,'R', event)">R</div></div></div></div>`,i.prepend(a);let o=i.querySelector(`input`);o.value=e.widthMm??``,o.defaultValue=o.value,e.autoCalculated&&(o.dataset.autoFilled=`true`),i.querySelector(`.split-select-display`).textContent=e.ctrl||`None`,r.append(i),s.append(r)});let l=document.createElement(`div`);l.className=`split-control`,l.innerHTML=`<div class="split-label">&nbsp;</div><div class="field"><button type="button" data-section-minus aria-label="Remove section" onclick="window.wincoConfiguration.resize(this,-1)">−</button><button type="button" data-section-plus aria-label="Add section" onclick="window.wincoConfiguration.resize(this,1)">+</button></div>`,l.querySelector(`[data-section-minus]`).disabled=c.length<=2,l.querySelector(`[data-section-plus]`).disabled=c.length>=7,o.append(s,l),n.append(o),r&&be(e,z(Se(e)?.dataset.mmValue))}function De(e,t){if(!Ce.includes(t))return;let n=e.closest(`.card`);Ee(n,{...we(n),config:t}),b(t)&&window.selectUnit(`mm`),Te(n)}function Oe(e,t){let n=e.closest(`.card`),r=we(n),i=Math.max(2,Math.min(7,r.splits.length+t));if(i===r.splits.length)return;let a=r.splits.slice(0,i).map(e=>t>0?{...e,widthMm:e.autoCalculated?null:e.widthMm,autoCalculated:!1}:{...e});for(;a.length<i;)a.push({widthMm:null,ctrl:`None`,linkedToNext:r.config===`Linked`});t<0&&!a.some(e=>e.autoCalculated)&&(a.at(-1).autoCalculated=!0),a.at(-1).linkedToNext=!1,Ee(n,{...r,splits:a}),Te(n)}function ke(e){let t=e.closest(`.card`),n=t.querySelectorAll(`[data-split-fields] .split-item`)[Number(e.dataset.linkIndex)];n&&(n.dataset.linkedToNext=String(e.checked),e.defaultChecked=e.checked,Te(t))}var Ae={read:we,restore:Ee,select:De,resize:Oe,link:ke,layout:C},B=(e,t)=>Array.from(e?.querySelectorAll(t)||[]),V=e=>!e||e.classList.contains(`placeholder`)?``:e.textContent.trim(),H=(e,t)=>e?.querySelector(t)?.value??``,U=(e,t)=>B(e,`.field-label`).find(e=>e.textContent.trim()===t)?.parentElement?.querySelector(`.field span`),je={":scope":[`channelChargeCategory`,`chargeQuantities`,`savedOptionAmount`,`savedSurchargeAmount`,`savedMotorAmount`,`optionPriceSelection`,`surchargePriceSelection`,`motorPriceSelection`],".dimension-field":[`mmValue`],"[data-fabric-display]":[`fabricId`,`fabricCode`,`fabricGroup`,`fabricDescription`,`fabricPrice`,`fabricWidth`,`fabricVisibility`],"[data-fabric-color-display]":[`fabricColorId`,`fabricColor`,`fabricColorStatus`,`fabricColorVisibility`],"[data-headrail-display]":[`headrailId`,`headrailCode`,`headrailDescription`,`headrailPricingType`],"[data-bottomrail-display]":[`bottomrailId`,`bottomrailCode`,`bottomrailDescription`,`bottomrailPricingType`],".rail-seg.clickable":[`railColorId`,`railColorCode`,`railColorDescription`,`railColorVisibility`],"[data-cordless-type-section] .field span:first-child":[`cordlessTypeCode`,`cordlessTypePrice`,`cordlessPricingId`],"[data-motor-section] .field span:first-child":[`motorName`,`motorCode`,`motorPricingId`],"[data-measure-tag-display]":[`measureTagMode`,`measureTagSource`,`measureTagValue`],"[data-accessory-item]":[`accessoryPricingId`,`accessoryValue`]},Me=[`.info-input`,`.info-comments-input`,`[data-sidemark-input]`,`[data-memo-input]`,`.dimension-field input`,`.dimension-field select`,`.split-mm-input`,`.length-input`,`[data-review-calc-input]`,`[data-accessory-qty]`,`[data-accessory-price]`,`[data-accessory-discount-input]`],Ne=(e,t)=>t===`:scope`?[e]:B(e,t);function W(e){return{fields:Object.fromEntries(Me.map(t=>[t,B(e,t).map(e=>String(e.value??``))])),metadata:Object.fromEntries(Object.entries(je).map(([t,n])=>[t,Ne(e,t).map(e=>Object.fromEntries(n.filter(t=>e.dataset[t]!==void 0).map(t=>[t,e.dataset[t]])))]))}}function G(e,t){for(let n of Me)B(e,n).forEach((e,r)=>{let i=t?.fields?.[n]?.[r];typeof i==`string`&&(e.value=i)});for(let[n,r]of Object.entries(je))Ne(e,n).forEach((e,i)=>{let a=t?.metadata?.[n]?.[i];if(!(!a||typeof a!=`object`))for(let t of r)typeof a[t]==`string`?e.dataset[t]=a[t]:delete e.dataset[t]})}var Pe=e=>B(e,`.window-head`).map(e=>e.closest(`.card`)),Fe=e=>B(e.querySelector(`.review-table-wrap`)?.closest(`.card`),`.check`).find(e=>e.textContent.includes(`Show excluded items`)),Ie=(e,t)=>B(e,t+` .check.checked`).map(e=>V(e.querySelector(`span:not(.check-box)`))),Le=(e,t)=>V(B(e.querySelector(`[data-`+t+`-display]`)?.closest(`.col-3`),`.rail-seg.clickable`).at(-1)),Re=(e,t,n)=>e.querySelector(t)?H(e,t):V(n);function ze(e){let t=e.querySelector(`#informationCard`),n=U(t,`Client`),r=B(t,`.info-input`),i=Pe(e),a=B(e,`[data-review-calc-input]`),o=i.map((e,t)=>{let n=e.querySelector(`[data-motor-section] .field span`),r=e.querySelector(`[data-headrail-display]`);return{no:t+1,included:!!e.querySelector(`.window-head .check.checked`),...Ae.read(e),...fe(e),heightMm:Number(e.querySelector(`[data-dimension="h"]`)?.dataset.mmValue||0),group:V(U(e,`Group`)),location:Re(e,`[data-location-input]`,U(e,`Location`)),room:Re(e,`[data-room-input]`,e.querySelector(`[data-room-display]`)),mount:Re(e,`[data-mount-type-input]`,e.querySelector(`[data-mount-type-display]`)),sidemark:H(e,`[data-sidemark-input]`),memo:H(e,`[data-memo-input]`),headrailMeta:Object.fromEntries([`id`,`code`,`description`,`pricingType`].map(e=>[e,r?.dataset[`headrail`+e[0].toUpperCase()+e.slice(1)]||``])),headrailColor:Le(e,`headrail`),bottomrail:V(e.querySelector(`[data-bottomrail-display]`)),bottomrailColor:Le(e,`bottomrail`),control:V(U(e,`Control Type`)),controlSide:V(U(e,`Ctrl Side`)),length:H(e,`.length-input`),cordlessType:V(e.querySelector(`[data-cordless-type-section] .field span`)),motorName:V(n),motorCode:n?.dataset.motorCode||``,motorPricingId:n?.dataset.motorPricingId||``,optionState:{general:Ie(e,`[data-general-option-box]`),chain:Ie(e,`[data-chain-option-section]`),cordless:Ie(e,`[data-cordless-option-section]`)},chargeQuantities:m(e),channelChargeCategory:e.dataset.channelChargeCategory||`surcharge`}}),s={quoteNumber:V(e.querySelector(`.meta div[style*="font-size:16px"]`)),quoteDate:V(e.querySelector(`.meta-right span`)),unit:V(e.querySelector(`#unitLabel`)),information:{tag:V(t.querySelector(`[data-measure-tag-display]`)),client:V(n),clientId:n?.dataset.clientId||``,clientAccount:n?.dataset.clientAccount||``,clientCompany:n?.dataset.clientCompany||``,partner:V(U(t,`Partner`)),type:V(U(t,`Type`)),...Object.fromEntries([`name`,`address`,`phone`,`email`].map((e,t)=>[e,r[t]?.value||``])),comments:H(t,`.info-comments-input`)},windows:o,accessories:{rows:B(e,`.accessory-row`).map(e=>({item:e.querySelector(`[data-accessory-item]`)?.dataset.accessoryValue||V(e.querySelector(`[data-accessory-item]`)),qty:H(e,`[data-accessory-qty]`),price:e.dataset.accessoryPrice||H(e,`[data-accessory-price]`)})),discountPercent:H(e,`[data-accessory-discount-input]`)},summary:Object.fromEntries([`install`,`extraFee`,`bldSurDiscountPercent`,`optDiscountPercent`,`motDiscountPercent`].map((e,t)=>[e,a[t]?.value||``]))};return s.quoteNumber=s.quoteNumber.replace(/^#\s*/,``),{payload:s,ui:{informationCollapsed:t.classList.contains(`is-collapsed`),showExcluded:!!Fe(e)?.classList.contains(`checked`)},raw:W(e.querySelector(`#informationCard`)),windows:i.map(e=>({...W(e),custom:Object.fromEntries([`location`,`room`,`mount-type`].map(t=>[t,e.querySelector(`[data-`+t+`-input]`)?.value??null]))})),review:W(e.querySelector(`.review-bottom`)),accessories:W(e.querySelector(`.accessories`))}}function Be(e,t,n,r){if(!t?.payload||!Array.isArray(t.payload.windows))throw Error(`This draft could not be restored.`);n({quote:{raw_payload:t.payload},windows:[],accessories:[]}),G(e.querySelector(`#informationCard`),t.raw),Pe(e).forEach((e,n)=>{let i=t.windows?.[n];for(let[t,n]of[[`location`,`selectLocation`],[`room`,`selectRoom`],[`mount-type`,`selectMountType`]]){if(typeof i?.custom?.[t]!=`string`)continue;let a=t===`location`?`[onclick="toggleLocationMenu(this)"]`:t===`room`?`.room-type-combo`:`[data-mount-type-wrapper]`,o=(e.querySelector(a)?.parentElement)?.querySelector(`.client-option`);o&&typeof r[n]==`function`&&r[n](o,`custom`);let s=e.querySelector(`[data-`+t+`-input]`);s&&(s.value=i.custom[t])}G(e,i)}),G(e.querySelector(`.review-bottom`),t.review),G(e.querySelector(`.accessories`),t.accessories);let i=e.querySelector(`#informationCard`);t.ui?.informationCollapsed!==void 0&&i.classList.contains(`is-collapsed`)!==t.ui.informationCollapsed&&r.toggleInformationCard?.(),t.ui?.showExcluded!==void 0&&Fe(e)?.classList.toggle(`checked`,t.ui.showExcluded),r.forceMeasureTagRefresh?.(),r.reindexWindowCards?.(),r.updateAllWindowSqft?.(),r.updateAllWindowPricing?.(),r.renderReviewTableRows?.(),r.renderReviewSummaryTotals?.()}function Ve(e,t){let n=e.createElement(`template`);if(n.innerHTML=t,!n.content.querySelector(`#informationCard`))throw Error(`This saved draft is incomplete.`);return ze(n.content)}function He(){let e=(e,t,n)=>{if(!e)return;let r=Array.from(e.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===t),i=r?r.parentElement:null,a=i?i.querySelector(`.field`):null,o=a?a.querySelector(`span`):null;if(!o)return;let s=String(n||``).trim();o.textContent=s||t,o.classList.toggle(`placeholder`,!s)},t=(e,t,n,r=``)=>{let i=e?e.querySelector(t):null;if(!i)return;let a=String(n||``).trim();i.textContent=a||r,i.classList.toggle(`placeholder`,!a)},n=(e,t)=>{if(!e)return;let n=new Set((Array.isArray(t)?t:[]).map(e=>String(e||``).trim().toLowerCase()).filter(Boolean));e.querySelectorAll(`.check`).forEach(e=>{let t=String(e.querySelector(`span:not(.check-box)`)?.textContent||e.textContent||``).replace(`✓`,``).trim().toLowerCase();if(e.classList.toggle(`checked`,n.has(t)),e.hasAttribute(`data-chain-weight-toggle`)){let t=e.classList.contains(`checked`),n=e.closest(`.card`),r=n?n.querySelector(`[data-length-prefix]`):null,i=n?n.querySelector(`.length-field`):null;r&&r.classList.toggle(`hidden`,!t),i&&i.classList.toggle(`has-prefix`,t)}if(t.includes(`reach cord`)){let t=e.nextElementSibling;t&&t.classList.contains(`inline-value`)&&t.classList.toggle(`hidden`,!e.classList.contains(`checked`))}})},r=(e,t)=>{if(!e||!t)return;let r=t.optionState&&typeof t.optionState==`object`&&!Array.isArray(t.optionState)?t.optionState:null;if(r){let t=e.querySelector(`[data-general-option-box]`);n(t,r.general),typeof window.syncLChannelOptionForCard==`function`&&window.syncLChannelOptionForCard(e),n(t,r.general),n(e.querySelector(`[data-chain-option-section]`),r.chain),n(e.querySelector(`[data-cordless-option-section]`),r.cordless)}let i=e.querySelector(`[data-memo-input]`);i&&(i.value=String(t.memo||``))},i=(e,t)=>{e&&t&&Ae.restore(e,t)},a=(e,n,a)=>{if(!e||!n)return;e.dataset.restoringQuote=`true`;for(let t of[`option`,`surcharge`,`motor`])delete e.dataset[t+`PriceSelection`],delete e.dataset[`saved`+t[0].toUpperCase()+t.slice(1)+`Amount`];let o=e.querySelector(`.window-head .check`);o&&o.classList.toggle(`checked`,n.included!==!1);let s=Array.from(e.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Location`)?.parentElement?.querySelector(`.field`);if(s){let e=String(n.location||``).trim();s.innerHTML=e?`<span>`+e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)+`</span>`:`<span class="placeholder">Floor</span>`}let c=e.querySelector(`.room-type-value`);if(c){let e=String(n.room||``).trim();c.innerHTML=e?`<span data-room-display>`+e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)+`</span>`:`<span data-room-display class="placeholder">Select Room</span>`}let l=e.querySelector(`[data-sidemark-input]`);l&&(l.value=String(n.sidemark||``));let u=e.querySelectorAll(`.dimension-field`);u[0]&&typeof window.setMmValue==`function`&&window.setMmValue(u[0],Number(n.widthMm||0)),u[1]&&typeof window.setMmValue==`function`&&window.setMmValue(u[1],Number(n.heightMm||0)),i(e,n),t(e,`[data-mount-type-display]`,n.mount,`Select`);let d=Array.from(e.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Group`)?.parentElement?.querySelector(`.field span`);if(d){let e=String(n.group||``).trim();d.textContent=e||`Shade`,d.classList.toggle(`placeholder`,!e)}let f=e.querySelector(`[data-fabric-display]`);if(f){let e=String(n.fabric||``).trim();f.textContent=e||`Fabric`,f.classList.toggle(`placeholder`,!e),e&&(f.dataset.fabricCode=e),n.pricePerSqft!==void 0&&n.pricePerSqft!==null&&(f.dataset.fabricPrice=String(n.pricePerSqft||0))}t(e,`[data-fabric-color-display]`,n.fabricColor,`Color`),t(e,`[data-headrail-display]`,window.wincoDependencies.normalizeHeadrail(n.headrail),`Head rail`);let p=e.querySelector(`[data-headrail-display]`),m=n.headrailMeta&&typeof n.headrailMeta==`object`&&!Array.isArray(n.headrailMeta)?n.headrailMeta:null;p&&m&&(m.id&&(p.dataset.headrailId=String(m.id)),m.code&&(p.dataset.headrailCode=window.wincoDependencies.normalizeHeadrail(m.code)),m.description&&(p.dataset.headrailDescription=String(m.description)),m.pricingType&&(p.dataset.headrailPricingType=String(m.pricingType))),t(e,`[data-bottomrail-display]`,n.bottomrail,`Bottom rail`);let h=(t,n)=>{let r=e.querySelector(t),i=r?r.closest(`.col-3`):null,a=i?Array.from(i.querySelectorAll(`.rail-seg.clickable`)).filter(e=>!e.matches(`[data-headrail-display], [data-bottomrail-display]`)):[],o=a[a.length-1];if(!o)return;let s=String(n||``).trim();o.textContent=s||`Color`,o.classList.toggle(`placeholder`,!s)};h(`[data-headrail-display]`,n.headrailColor),h(`[data-bottomrail-display]`,n.bottomrailColor);let g=Array.from(e.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Control Type`)?.parentElement?.querySelector(`.field span`),_=String(n.control||``).trim();g&&(g.textContent=_||`Select control type`,g.classList.toggle(`placeholder`,!_)),_&&typeof window.renderControlTypeDetails==`function`&&window.renderControlTypeDetails(e,_),r(e,n);let v=Array.from(e.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Ctrl Side`)?.parentElement?.querySelector(`.field span`);if(v){let e=String(n.controlSide||``).trim();v.textContent=e||`L/R`,v.classList.toggle(`placeholder`,!e)}let y=e.querySelector(`.length-input`);y&&(y.value=n.length??``);let b=e.querySelector(`[data-cordless-type-section] .field span`);if(b){let e=window.wincoDependencies.normalizeControl(n.cordlessType,n.group);b.textContent=e||`Select Type`,b.classList.toggle(`placeholder`,!e)}let x=e.querySelector(`[data-motor-section] .field span`);if(x){let e=String(n.motorName||``).trim();x.textContent=e||`Select Motor`,x.classList.toggle(`placeholder`,!e),e&&(x.dataset.motorName=e),n.motorCode&&(x.dataset.motorCode=n.motorCode),n.motorPricingId&&(x.dataset.motorPricingId=n.motorPricingId)}e.dataset.channelChargeCategory=n.channelChargeCategory||`option`,window.wincoDuo.restore(e,n),e.dataset.chargeQuantities=JSON.stringify(n.chargeQuantities||{});for(let t of[`option`,`surcharge`,`motor`]){if(t===`option`&&window.wincoDuo.hasUnsupportedDuoChannels(n)){delete e.dataset.savedOptionAmount,delete e.dataset.optionPriceSelection;continue}e.dataset[`saved`+t[0].toUpperCase()+t.slice(1)+`Amount`]=String(Number.isFinite(Number(n[t]))?Number(n[t]):0),e.dataset[t+`PriceSelection`]=window.pricingSelectionKey(e,t)}delete e.dataset.restoringQuote,typeof window.updateWindowTitleMeta==`function`&&window.updateWindowTitleMeta(a+1)};return t=>{let{quote:n,windows:r,accessories:i}=t,o=n.raw_payload&&typeof n.raw_payload==`object`&&!Array.isArray(n.raw_payload)?n.raw_payload:{},s=o.information&&typeof o.information==`object`&&!Array.isArray(o.information)?o.information:{},c=o.summary&&typeof o.summary==`object`&&!Array.isArray(o.summary)?o.summary:{},l=Array.isArray(o.windows)?o.windows:[],u=(r||[]).length?(r||[]).map((e,t)=>{let n=e.raw_window&&typeof e.raw_window==`object`&&!Array.isArray(e.raw_window)?e.raw_window:{};return{...l[t]||{},...n,config:n.config??l[t]?.config??`Single`,splits:n.splits??l[t]?.splits??[],no:n.no??e.window_no??t+1,included:n.included??e.included??!0,group:n.group??e.product_group??``,location:n.location??e.location??``,room:n.room??e.room??``,sidemark:n.sidemark??e.sidemark??``,fabric:n.fabric??e.fabric??``,fabricColor:n.fabricColor??e.fabric_color??``,mount:n.mount??e.mount??``,headrail:n.headrail??e.headrail??``,headrailColor:n.headrailColor??e.headrail_color??``,bottomrail:n.bottomrail??e.bottomrail??``,bottomrailColor:n.bottomrailColor??e.bottomrail_color??``,control:n.control??e.control_type??``,controlSide:n.controlSide??e.control_side??``,length:n.length??e.chain_length??``,cordlessType:n.cordlessType??e.cordless_type??``,motorName:n.motorName??e.motor??``,widthMm:n.widthMm??e.width_mm??0,heightMm:n.heightMm??e.height_mm??0,sqft:n.sqft??e.sqft??0,pricePerSqft:n.pricePerSqft??e.price_per_sqft??0,bld:n.bld??e.bld??0,surcharge:n.surcharge??e.surcharge??0,option:n.option??e.option_total??0,motor:n.motor??e.motor_total??0,total:n.total??e.total??0}}):l,d=o.accessories&&typeof o.accessories==`object`&&!Array.isArray(o.accessories)?o.accessories:{},f=(i||[]).length?(i||[]).map((e,t)=>{let n=e.raw_accessory&&typeof e.raw_accessory==`object`&&!Array.isArray(e.raw_accessory)?e.raw_accessory:{};return{...n,no:n.no??e.accessory_no??t+1,item:n.item??e.item??``,qty:n.qty??e.qty??0,price:n.price??e.price??0,subtotal:n.subtotal??e.subtotal??0}}):Array.isArray(d.rows)?d.rows:[];typeof window.setMeasureQuoteNumberDisplay==`function`&&window.setMeasureQuoteNumberDisplay(o.quoteNumber||n.quote_number||``);let p=document.querySelector(`.meta-right span`);p&&(p.textContent=String(o.quoteDate||n.quote_date||``));let m=String(o.unit||n.unit||`mm`).trim();m&&typeof window.selectUnit==`function`&&window.selectUnit(m);let h=document.getElementById(`informationCard`);if(h){let t=Array.from(h.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Client`)?.parentElement?.querySelector(`.field span`);if(t){let e=String(s.client??n.client??n.customer_name??``).trim();t.textContent=e||`Select...`,t.classList.toggle(`placeholder`,!e);let r=s.clientId||n.client_id||``;r&&(t.dataset.clientId=String(r)),s.clientAccount&&(t.dataset.clientAccount=String(s.clientAccount)),s.clientCompany&&(t.dataset.clientCompany=String(s.clientCompany))}e(h,`Partner`,s.partner??n.partner??``),e(h,`Type`,s.type??n.quote_type??``);let r=Array.from(h.querySelectorAll(`.info-input`));r[0]&&(r[0].value=String(s.name??n.customer_name??``)),r[1]&&(r[1].value=String(s.address??n.address??``)),r[2]&&(r[2].value=String(s.phone??n.phone??``)),r[3]&&(r[3].value=String(s.email??n.email??``));let i=h.querySelector(`.info-comments-input`);i&&(i.value=String(s.comments??n.general_comments??``));let a=h.querySelector(`[data-measure-tag-display]`);if(a){let e=String(s.tag??n.tag??``).trim();a.textContent=e||`Tag`,a.title=e,a.classList.toggle(`placeholder`,!e),a.dataset.measureTagMode=`manual`,a.dataset.measureTagValue=e,delete a.dataset.measureTagSource,window.forceMeasureTagRefresh?.()}}let g=Array.from(document.querySelectorAll(`.card`)).filter(e=>e.querySelector(`.window-head`));window.measureWindowHistory?.clear(),g.forEach(e=>e.remove());let _=document.querySelector(`.actions button`),v=u.length;for(let e=0;e<v;e+=1)typeof window.addWindowRow==`function`&&window.addWindowRow(_);let y=Array.from(document.querySelectorAll(`.card`)).filter(e=>e.querySelector(`.window-head`));u.forEach((e,t)=>{a(y[t],e,t)}),typeof window.selectUnit==`function`&&window.selectUnit(String(document.getElementById(`unitLabel`)?.textContent||`ft+inch`).trim());let b=Array.from(document.querySelectorAll(`.review-number-input[data-review-calc-input]`)),x=[c.install??n.install_fee??0,c.extraFee??n.extra_fee??0,c.bldSurDiscountPercent??n.bld_sur_discount_percent??0,c.optDiscountPercent??n.opt_discount_percent??0,c.motDiscountPercent??n.mot_discount_percent??0];b.forEach((e,t)=>{x[t]!==void 0&&(e.value=String(x[t]??0))});let S=document.querySelector(`.accessories`);if(S){let e=S.querySelector(`.accessories-items`);e&&(e.innerHTML=``);let t=S.querySelector(`.accessory-tools .btn`);f.forEach(e=>{if(t&&typeof window.addAccessoryRow==`function`){window.addAccessoryRow(t);let n=S.querySelectorAll(`.accessory-row`),r=n[n.length-1];if(!r)return;let i=r.querySelector(`[data-accessory-item]`),a=r.querySelector(`[data-accessory-qty]`),o=r.querySelector(`[data-accessory-price]`),s=r.querySelector(`[data-accessory-price-display]`),c=String(e.item||``).trim(),l=Number(e.price||0);i&&(i.textContent=c||`Accessory item`,i.classList.toggle(`placeholder`,!c),c&&(i.dataset.accessoryValue=c)),a&&(a.value=String(e.qty??0)),o&&(o.value=l.toFixed(2)),s&&(s.textContent=l.toFixed(2)),r.dataset.accessoryPrice=l.toFixed(2)}});let n=S.querySelector(`[data-accessory-discount-input]`);n&&(n.value=String(d.discountPercent===void 0?20:d.discountPercent??0)),typeof window.updateAccessoriesEmptyState==`function`&&window.updateAccessoriesEmptyState(),typeof window.updateAccessoriesTotals==`function`&&window.updateAccessoriesTotals(S)}typeof window.reindexWindowCards==`function`&&window.reindexWindowCards(),typeof window.updateWindowCardActionButtons==`function`&&window.updateWindowCardActionButtons(),typeof window.updateAllWindowSqft==`function`&&window.updateAllWindowSqft(),typeof window.updateAllWindowPricing==`function`&&window.updateAllWindowPricing(),typeof window.renderReviewTableRows==`function`&&window.renderReviewTableRows(),typeof window.renderReviewSummaryTotals==`function`&&window.renderReviewSummaryTotals()}}var Ue=`<div class="app">
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
<div class="card" id="informationCard">
<div class="card-header info-card-toggle" onclick="toggleInformationCard()">
<div class="card-title"><div class="dot"></div><span style="font-size:16px;font-weight:600">Information</span></div>
<div class="info-toggle-icon" id="infoToggleIcon">▴</div>
</div>
<div class="grid12 info-card-body-hidden" style="display:grid;">
<div class="col-8">
<div class="grid12" style="align-items:start;">
<div class="col-4"><div class="field-label">Tag</div><div class="field measure-tag-field"><span class="placeholder" data-measure-tag-display="" contenteditable="false" role="textbox" aria-label="Tag" aria-readonly="true" tabindex="0">Tag</span></div></div>
<div class="col-4" style="position:relative;">
<div class="field-label">Client</div>
<div class="field" onclick="toggleClientMenu(this)">
<span class="placeholder">Select...</span>
</div>
<div class="client-menu hidden">
<div class="client-option" onclick="selectNewClientOption(this, event)">New client</div>
<div class="client-option" onclick="openMeasureClientSelectPopup(this, event)">Select client</div>
</div>
<div class="client-search hidden">
<div class="field placeholder">Search client</div>
</div>
</div>
<div class="col-2 partner-field-wrapper" style="position:relative;">
<div class="field-label">Partner</div>
<div class="field" onclick="toggleDealerMenu(this)">
<span class="placeholder">Partner</span>
</div>
<div class="client-menu hidden">
<div class="client-option partner-option-with-delete" data-partner-name="Winco" onclick="selectDealer(this,'Winco')" style="display:flex;align-items:center;justify-content:space-between;text-align:left;gap:12px;"><span>Winco</span><button type="button" aria-label="Delete partner" onclick="event.stopPropagation(); if (typeof confirmDeletePartnerFromDropdown === 'function') confirmDeletePartnerFromDropdown(this,'Winco');" style="border:0;background:transparent;color:#94a3b8;cursor:pointer;font-size:14px;line-height:1;padding:0 2px;">×</button></div>
<div class="client-option" onclick="selectDealer(this,'None')">None</div>
<div class="client-option" onclick="startAddPartner(this)">Add Partner</div>
</div>
</div>
<div class="col-2" style="position:relative;">
<div class="field-label">Type</div>
<div class="field" onclick="toggleTypeMenu(this)">
<span class="placeholder">Type</span>
</div>
<div class="client-menu hidden">
<div class="client-option" onclick="selectType(this,'House')">House</div>
<div class="client-option" onclick="selectType(this,'Condo')">Condo</div>
<div class="client-option" onclick="selectType(this,'Commercial')">Commercial</div>
<div class="client-option" onclick="selectType(this,'Other')">Other</div>
</div>
</div>
<div class="col-12 row-split">
<div class="col-5"><div class="field"><input class="info-input" data-measure-name-input="" type="text" placeholder="Name" oninput="window.forceMeasureTagRefresh && window.forceMeasureTagRefresh()" onchange="window.forceMeasureTagRefresh && window.forceMeasureTagRefresh()" onkeyup="window.forceMeasureTagRefresh && window.forceMeasureTagRefresh()" onblur="window.forceMeasureTagRefresh && window.forceMeasureTagRefresh()" /></div></div>
<div class="col-7"><div class="field"><input class="info-input" data-measure-address-input="" type="text" placeholder="Address" oninput="window.forceMeasureTagRefresh && window.forceMeasureTagRefresh()" onchange="window.forceMeasureTagRefresh && window.forceMeasureTagRefresh()" onkeyup="window.forceMeasureTagRefresh && window.forceMeasureTagRefresh()" onblur="window.forceMeasureTagRefresh && window.forceMeasureTagRefresh()" /></div></div>
</div>
<div class="col-12 row-split">
<div class="col-5"><div class="field"><input class="info-input" type="text" placeholder="Phone" /></div></div>
<div class="col-7"><div class="field"><input class="info-input" type="email" placeholder="E-mail" /></div></div>
</div>
</div>
</div>
<div class="col-4">
<div class="grid12" style="align-items:stretch; height:100%;">
<div class="col-12" style="display:flex; flex-direction:column;">
<div class="field-label">General Comments</div>
<textarea class="comments-box info-comments-input" style="flex:1;" placeholder=""></textarea>
</div>
</div>
</div>
</div>
</div>
<div class="measure-client-popup hidden" data-measure-client-popup="">
  <div class="measure-client-popup-backdrop" onclick="closeMeasureClientSelectPopup()"></div>
  <div class="measure-client-popup-panel">
    <div class="measure-client-popup-header">
      <div class="measure-client-popup-title">Clients</div>
      <div class="measure-client-popup-search"><input type="text" placeholder="Search" data-measure-client-search="" oninput="renderMeasureClientPopupRows(this.value)" /></div>
      <button class="measure-client-popup-close" type="button" onclick="closeMeasureClientSelectPopup()">×</button>
    </div>
    <div class="measure-client-popup-table">
      <div class="measure-client-popup-head"><div>Account</div><div>Partner</div><div>Client</div><div>Company</div><div>Phone</div></div>
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
<div class="field-label"> </div>
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
<div class="col-3"><div class="field-label"> </div><div class="field"><input data-sidemark-input="1" oninput="updateWindowTitleMeta(1)" placeholder="Sidemark" type="text"/></div></div>
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
<div class="client-option" onclick="selectMountType(this,'IN')">IN   Inside Mount</div>
<div class="client-option" onclick="selectMountType(this,'FF')">FF   Frame Mount</div>
<div class="client-option" onclick="selectMountType(this,'FW')">FW   Wall Mount</div>
<div class="client-option" onclick="selectMountType(this,'FD')">FD   Door Mount</div>
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
<div class="field-label"> </div>
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
<div class="col-6"><div class="field-label">Memo</div><div class="option-box" data-memo-box=""></div></div>
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
<div class="card-header measure-review-header">
<div class="card-title"><span style="font-size:16px;font-weight:600">Review</span></div>
<div class="measure-review-controls">
<button class="check checked" onclick="toggleCheck(this)" type="button"><span class="check-box">✓</span><span>Show excluded items</span></button>
<span>Confirm excluded items before saving</span>
</div>
</div>
<div data-review-client-info="" class="measure-review-information">
${u.map(([e,t])=>`<div><span class="review-info-label">${t}</span><span data-review-client-${e}="" class="review-info-value">—</span></div>`).join(``)}
<div data-review-company-row class="review-info-comments" hidden><span class="review-info-label">Company</span><span data-review-client-company="" class="review-info-value"></span></div>
<div data-review-comments-row class="review-info-comments" hidden><span class="review-info-label">General Comments</span><span data-review-client-comments="" class="review-info-value"></span></div>
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
<div class="record-supplement">
<section class="record-panel"><h2>Fees &amp; discounts</h2>
<div class="subgrid3">
<div><div class="field-label">Install</div><div class="field"><input class="review-number-input" data-review-calc-input="" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" step="0.01" value="0" /></div></div>
<div><div class="field-label">Extra Fee</div><div class="field"><input class="review-number-input" data-review-calc-input="" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" step="0.01" value="0" /></div></div>
<div></div>
</div>
<div class="subgrid3">
<div><div class="field-label">BLD / SUR Disc. %</div><div class="field"><input class="review-number-input" data-review-calc-input="" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" max="100" step="0.01" value="0" /></div></div>
<div><div class="field-label">OPT Disc. %</div><div class="field"><input class="review-number-input" data-review-calc-input="" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" max="100" step="0.01" value="0" /></div></div>
<div><div class="field-label">MOT Disc. %</div><div class="field"><input class="review-number-input" data-review-calc-input="" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:left;" type="number" min="0" max="100" step="0.01" value="0" /></div></div>
</div>
</section>
<div class="accessories record-panel">
<div class="accessories-head">
<h2>Accessories</h2>
<div style="text-align:right;font-size:14px"><span data-accessories-preview-amount="">$0</span></div>
</div>
<div class="accessories-list">
<div class="accessories-items"></div>
<div class="accessories-empty">No accessories.</div>
</div>
<div class="accessory-tools"><span class="accessory-discount-label">Accessory discount</span><div class="tinybox"><input data-accessory-discount-input="" max="100" min="0" step="0.01" type="number" value="0" style="width:100%;border:0;outline:0;background:transparent;font:inherit;color:inherit;text-align:center;"/> <span>%</span></div><button class="btn" onclick="addAccessoryRow(this)" type="button">Add row</button></div>
</div>
</div>
<div>
<div class="summary-card record-panel record-totals">${h()}</div>
</div>
</div>
</div>
</div>
</div>`,We=`
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
      if(target.matches('[data-measure-name-input], [data-measure-address-input]')){
        window.forceMeasureTagRefresh();
      }
    };

    measurePageLifetime.listen(document,'input', window.measureTagForceRefreshHandler, true);
    measurePageLifetime.listen(document,'change', window.measureTagForceRefreshHandler, true);
    measurePageLifetime.listen(document,'keyup', window.measureTagForceRefreshHandler, true);
    measurePageLifetime.listen(document,'blur', window.measureTagForceRefreshHandler, true);

    measurePageLifetime.listen(document,'input', function(event){
      const target = event && event.target ? event.target : null;
      if(target && target.closest && target.closest('#informationCard') && target.matches('.info-input, .info-comments-input')){
        refreshReviewClientInfo();
      }
    }, true);

    measurePageLifetime.listen(document,'change', function(event){
      const target = event && event.target ? event.target : null;
      if(target && target.closest && target.closest('#informationCard') && target.matches('.info-input, .info-comments-input')){
        refreshReviewClientInfo();
      }
    }, true);

    function toggleCheck(el){
      el.classList.toggle('checked');
      const label = getCheckButtonLabel(el).trim();

      const optionContainer = el.closest(
        '[data-general-option-box], [data-chain-option-section], [data-cordless-option-section]'
      );
      const optionCard = optionContainer ? optionContainer.closest('.card') : null;
      if(optionCard && optionCard.dataset.savedOptionAmount !== undefined){
        delete optionCard.dataset.savedOptionAmount;
      }

      if(label.includes('Reach cord')){
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
      if(menu) menu.classList.toggle('hidden');
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
        popup.innerHTML = '<div class="measure-client-popup-backdrop" onclick="closeMeasureClientSelectPopup()"></div><div class="measure-client-popup-panel"><div class="measure-client-popup-header"><div class="measure-client-popup-title">Clients</div><div class="measure-client-popup-search"><input type="text" placeholder="Search" data-measure-client-search oninput="renderMeasureClientPopupRows(this.value)" /></div><button class="measure-client-popup-close" type="button" onclick="closeMeasureClientSelectPopup()">×</button></div><div class="measure-client-popup-table"><div class="measure-client-popup-head"><div>Account</div><div>Partner</div><div>Client</div><div>Company</div><div>Phone</div></div><div class="measure-client-popup-body" data-measure-client-popup-body><div class="measure-client-popup-empty">Loading clients...</div></div></div></div>';
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
        delete fieldText.dataset.clientPartner;
      }

      if(menu) menu.classList.add('hidden');
      closeMeasureClientSelectPopup();
      window.forceMeasureTagRefresh?.();
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
      if(popup) popup.classList.add('hidden');
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
        return [client.account, client.partner, client.name, client.company, client.phone, client.address, client.email]
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
        return '<div class="measure-client-popup-row" data-measure-client-row-index="' + rowId + '" onclick="selectMeasureClientFromPopup(' + index + ')"><div data-mobile-label="Account">' + escapeMeasureClientText(client.account || '-') + '</div><div data-mobile-label="Partner">' + escapeMeasureClientText(client.partner || '-') + '</div><div data-mobile-label="Client">' + escapeMeasureClientText(client.name || '-') + '</div><div data-mobile-label="Company">' + escapeMeasureClientText(client.company || '-') + '</div><div data-mobile-label="Phone">' + escapeMeasureClientText(client.phone || '-') + '</div></div>';
      }).join('');

      window.measureClientFilteredRows = filteredRows;
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

      const card = document.getElementById('informationCard');
      const clientLabel = card ? Array.from(card.querySelectorAll('.field-label')).find((label) => label.textContent.trim() === 'Client') : null;
      const clientWrapper = clientLabel ? clientLabel.closest('.col-4') : null;
      const fieldText = clientWrapper ? clientWrapper.querySelector('.field span') : null;

      if(fieldText){
        fieldText.textContent = client.name || 'Selected client';
        fieldText.title = client.name || '';
        fieldText.classList.remove('placeholder');
        fieldText.dataset.clientId = client.id || '';
        fieldText.dataset.clientAccount = client.account || '';
        fieldText.dataset.clientPartner = client.partner || '';
        fieldText.dataset.clientCompany = client.company || '';
      }

      setInfoInputValue(card, 'Name', client.name || '');
      setInfoInputValue(card, 'Address', client.address || '');
      setInfoInputValue(card, 'Phone', client.phone || '');
      setInfoInputValue(card, 'E-mail', client.email || '');

      const partnerLabel = card ? Array.from(card.querySelectorAll('.field-label')).find(label => label.textContent.trim() === 'Partner') : null;
      const partnerText = partnerLabel?.parentElement.querySelector('.field span');
      if (partnerText && client.partner) {
        partnerText.textContent = client.partner;
        partnerText.classList.remove('placeholder');
      }

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

    function toggleDealerMenu(el){
      const wrapper = el.parentElement;
      const menu = wrapper.querySelector('.client-menu');
      if(menu) menu.classList.toggle('hidden');
    }

    function selectDealer(el, dealerName){
      const wrapper = el.closest('.col-2');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      const fieldText = wrapper.querySelector('.field span');
      if(fieldText){
        fieldText.textContent = dealerName;
        fieldText.title = dealerName;
        fieldText.classList.remove('placeholder');
      }
      if(menu) menu.classList.add('hidden');
      refreshReviewClientInfo();
    }

    window.selectDealer = selectDealer;
    
    function startAddPartner(el) {
      const wrapper = el.closest('.col-2');
      if (!wrapper) return;

      const menu = wrapper.querySelector('.client-menu');
      const field = wrapper.querySelector('.field');

      if (menu) {
        menu.classList.add('hidden');
      }

      if (!field) return;

      field.innerHTML = '<input data-new-partner-input type="text" placeholder="Partner name" onclick="event.stopPropagation()" />';

      const input = field.querySelector('[data-new-partner-input]');

      if (input) {
        input.focus();

        input.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            finishAddPartner(input);
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            cancelAddPartner(input);
          }
        });

        input.addEventListener('blur', function() {
          finishAddPartner(input);
        });
      }
    }

    async function finishAddPartner(input) {
      if (!input || input.dataset.savingPartner === 'true') return;

      const partnerName = input.value.trim();
      const wrapper = input.closest('.col-2');
      if (!wrapper) return;

      const field = wrapper.querySelector('.field');

      if (!field) return;

      if (!partnerName) {
        field.innerHTML = '<span class="placeholder">Partner</span>';
        return;
      }

      try {
        input.dataset.savingPartner = 'true';
        field.innerHTML = '<span class="placeholder">Saving...</span>';

        if (typeof window.savePartnerToSupabase !== 'function') throw new Error('Partner service is not ready.');
        const savedPartner = await window.savePartnerToSupabase(partnerName);
        const label = document.createElement('span');
        label.textContent = savedPartner.partner_name;
        label.title = savedPartner.partner_name;
        field.replaceChildren(label);
        if (typeof window.refreshReviewClientInfo === 'function') window.refreshReviewClientInfo();
      } catch (error) {
        console.error('Failed to save partner:', error);
        field.innerHTML = '<span class="placeholder">Partner</span>';
        alert('Failed to save partner. Please try again.');
      }
    }

    function cancelAddPartner(input) {
      if (!input) return;

      const wrapper = input.closest('.col-2');
      if (!wrapper) return;

      const field = wrapper.querySelector('.field');
      if (!field) return;

      field.innerHTML = '<span class="placeholder">Partner</span>';
    }

    function toggleTypeMenu(el){
      const wrapper = el.parentElement;
      const menu = wrapper.querySelector('.client-menu');
      if(menu) menu.classList.toggle('hidden');
    }

    function selectType(el, value){
      const wrapper = el.closest('.col-2');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      const fieldText = wrapper.querySelector('.field span');
      if(fieldText){
        fieldText.textContent = value;
        fieldText.classList.remove('placeholder');
      }
      if(menu) menu.classList.add('hidden');
      if(typeof refreshReviewClientInfo === 'function') refreshReviewClientInfo();
    }

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
 return (window.measureFabricItems||[]).filter(fabric=>(!state.group||state.group===fabric.product_group)&&window.wincoDependencies.allowedValue(state,'group',fabric.product_group));
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
      const wrapper = el.closest('.col-1');
      if(!wrapper) return;
      const menu = wrapper.querySelector('.client-menu');
      const fieldText = wrapper.querySelector('.field span');
      if(fieldText){
        fieldText.textContent = sideValue;
        fieldText.classList.remove('placeholder');
      }
      if(menu) menu.classList.add('hidden');
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

          if(!available){
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

    function getMotorItems(){
      return window.wincoPricing.motorCatalog(window.measurePricingMotorItems || []);
    }

    function refreshSelectedCatalogPrices(){
      // A saved Quote edit keeps its historical labels and unit prices.
      if(window.measureEditingQuoteId)return;
      document.querySelectorAll('.measure-page [data-fabric-display]').forEach(display=>{
        if(display.classList.contains('placeholder'))return;
        const id=display.dataset.fabricId;
        const item=(window.measureFabricItems||[]).find(row=>id ? row.id===id : row.code===display.dataset.fabricCode);
        if(!item)return;
        display.dataset.fabricPrice=String(item.price ?? 0);
        display.dataset.fabricWidth=String(item.width ?? 0);
        display.textContent=item.code;
        display.dataset.fabricCode=item.code;
        display.title=formatFabricOptionLabel(item);
      });
      for(const key of ['headrail','bottomrail'])document.querySelectorAll('.measure-page [data-'+key+'-display]').forEach(display=>{
        if(display.classList.contains('placeholder'))return;
        const id=display.dataset[key+'Id'];
        const item=(window.measureHardwareItems||[]).find(row=>id ? row.id===id : row.code===display.dataset[key+'Code']);
        if(!item)return;
        display.dataset[key+'PricingType']=item.pricing_type || '';
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
        const item=(window.measurePricingAccessoryItems||[]).find(item=>item.is_active!==false && (display?.dataset.accessoryPricingId ? item.id===display.dataset.accessoryPricingId : item.name===display?.dataset.accessoryValue));
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

      const motors = getMotorItems();
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

      const menu = wrapper.querySelector('[data-motor-menu]');
      const fieldText = wrapper.querySelector('.field span');
      const label = formatMotorOptionLabel(motor);

      if(fieldText){
        fieldText.textContent = label;
        fieldText.title = label;
        fieldText.classList.remove('placeholder');
        fieldText.dataset.motorId = motor.id || '';
        fieldText.dataset.motorPricingId = motor.id || '';
        fieldText.dataset.motorCode = motor.code || '';
        fieldText.dataset.motorName = label;
        fieldText.dataset.motorPricingType = motor.pricing_type || '';
        fieldText.dataset.motorVisibility = motor.visibility || '';
      }

      if(menu) menu.classList.add('hidden');

      const card = wrapper.closest('.card');
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
 if(rules.allowedValue(state,'control','CH'))choices.push('Chain / Manual');
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
 if(isVisible){const display=side?.querySelector('.field span');if(display){display.textContent='L/R';display.classList.add('placeholder');}}
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
      const isChainManual = controlType === 'Chain / Manual';
      const isCordless = controlType === 'Cordless';
      const isMotorized = controlType === 'Motorized';

      setChainManualSections(card, isChainManual);
      setCordlessSections(card, isCordless);
      setMotorizedSections(card, isMotorized);
      setControlFillerVisibility(card, isChainManual || isCordless || isMotorized);
      renderGeneralOptionAndMemo(card, controlType);

      if(isCordless && typeof refreshCordlessTypeMenusForGroup === 'function'){
        refreshCordlessTypeMenusForGroup(card);
      }
    }

    function shouldShowBottomBarBrush(card){return ['ES','NB'].includes(window.wincoDependencies.readProductState(card).bottomrail);}

    function renderGeneralOptionAndMemo(card){
 if(!card)return;
 const memo=card.querySelector('[data-memo-box]');
 if(memo&&!memo.querySelector('[data-memo-input]'))memo.innerHTML='<input data-memo-input type="text" style="width:100%;min-width:0;border:none;outline:none;background:transparent;font:inherit;color:inherit;" />';
 window.wincoDependencies.renderOptions(card);
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

          if(!available){
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

          if(memoInput && !String(memoInput.value || '').trim()){
            memoInput.value = 'Frame size (W x H) :';
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
                <input class="dimension-control" data-role="mm" type="number" step="1" value="\${hasVal ? formatMmValue(mmValue) : ''}" />
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

    function reindexWindowCards(){
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

      windowCards.forEach((_, index) => updateWindowTitleMeta(index + 1));
      updateAllWindowSqft();
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

    function clearDuplicatedSidemarkAndMemo(clone){
      if(!clone) return;

      clone.querySelectorAll('[data-sidemark-input]').forEach((input) => {
        input.value = '';
        input.setAttribute('value', '');
      });

      clone.querySelectorAll('[data-window-meta]').forEach((metaEl) => {
        metaEl.innerHTML = '';
      });

      clone.querySelectorAll('[data-memo-input]').forEach((input) => {
        input.value = '';
        input.setAttribute('value', '');
      });

      clone.querySelectorAll('[data-memo-box]').forEach((memoBox) => {
        const memoInput = memoBox.querySelector('[data-memo-input]');
        if(memoInput){
          memoInput.value = '';
          memoInput.setAttribute('value', '');
        }
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
      for(const key of ['savedMotorAmount','optionPriceSelection','surchargePriceSelection','motorPriceSelection'])delete card.dataset[key];

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

    function addWindowRow(el){
      const windowCards = Array.from(document.querySelectorAll('.card')).filter(function(card){
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

      clearDuplicatedSidemarkAndMemo(clone);

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

    function updateWindowTitleMeta(index){
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

      if(typeof renderReviewTableRows === 'function'){
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

    function calculateHeadrailSurchargeForCard(card){
      if(!card) return 0;

      const headrail = getSelectedHeadrailForCard(card);
      if(!headrail) return 0;

      const pricingType = String(headrail.pricingType || '').trim().toLowerCase();
      if(pricingType !== 'surcharge') return 0;

      const surchargeBlock = getSurchargeBlockForHeadrail(headrail.code);
      if(!surchargeBlock) return 0;

      const widthField = card.querySelector('.dimension-field[data-dimension="w"]');
      const widthMm = widthField ? getMmValue(widthField) : null;
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
      if(currentChannels)return JSON.stringify([product.control,product.headrail,product.bottomrail,...['general','chain','cordless'].map(key=>(options[key]||[]).filter(label=>!['Side channel','L channel'].includes(label)).slice().sort().map(label=>[label,window.wincoQuantities.quantity(card,label)]))]);
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
      if(card.dataset[fingerprint]&&card.dataset[fingerprint]!==pricingSelectionKey(card,kind)){
        delete card.dataset[name];delete card.dataset[fingerprint];return null;
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

    function calculateLChannelOptionForCard(card){
      if(!card || window.wincoDuo.isDuo(getSelectedHeadrailCode(card))) return 0;

      const lChannelButton = card.querySelector('[data-l-channel-option="true"]');
      const isLChannelChecked = lChannelButton
        ? lChannelButton.classList.contains('checked')
        : isOptionCheckedByLabel(card, 'L channel');

      if(!isLChannelChecked) return 0;

      const block = getSideChannelBlock('L CHANNELS');
      if(!block) return 0;

      const widthField = card.querySelector('.dimension-field[data-dimension="w"]');
      const widthMm = widthField ? getMmValue(widthField) : null;
      const widthInches = mmToInchesForPricing(widthMm);

      return getBracketPriceByWidth(block.rows, widthInches) * window.wincoQuantities.quantity(card,'L channel');
    }

    function normalizeMeasureName(value){
      return String(value || '').trim().toLowerCase().replace(/\\s+/g, ' ');
    }

    function getPricingOptionPriceByName(optionName){
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
        return normalizeMeasureName(getCheckButtonLabel(button)) === targetLabel;
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
        price: cordlessTypeText.dataset.cordlessTypePrice,
      };
    }

    function calculateCordlessTypeOptionForCard(card){
 const selection=getSelectedCordlessTypeForCard(card);if(!selection)return 0;
 const rules=window.wincoDependencies,code=rules.normalizeControl(selection.code,getSelectedGroupValue(card));
 const matched=rules.cordlessCatalog(window.measurePricingCordlessTypeItems,window.measureControlItems).find(item=>item.code===code);
 return matched?parseMeasureMoney(matched.price):0;
}

    function calculateWindowOptions(card){
      const saved=savedPricingAmount(card,'option');
      if(saved!==null)return saved;

      return (
        ['general','chain','cordless'].flatMap(section=>getWindowOptionState(card)[section]).filter(label=>!['Side channel','L channel'].includes(label)).reduce((sum,label)=>sum+getPricingOptionPriceByName(label)*window.wincoQuantities.quantity(card,label),0) +
        calculateCordlessTypeOptionForCard(card) +
        (getWindowChannelChargeCategory(card)==='option' ? calculateSideChannelOptionForCard(card)+calculateLChannelOptionForCard(card) : 0)
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
      return getFieldTextByLabel(card, 'Control Type');
    }

    function getReviewControlText(card){
      const controlType = getReviewControlTypeText(card);

      if(controlType === 'Chain / Manual') return 'CH';
      if(controlType === 'Cordless') return getSelectedCordlessTypeCode(card) || 'CD';
      if(controlType === 'Motorized') return 'MOT';

      return controlType;
    }

    function getReviewCtrlSideText(card){
      const section = card ? card.querySelector('[data-ctrl-side-section]') : null;
      const span = section ? section.querySelector('.field span') : null;

      if(!span || span.classList.contains('placeholder')) return '';

      return span.textContent.trim();
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
      const sqft = calculateCeilingSqftFromMm(widthMm, heightMm);
      const fabricPrice = getSelectedFabricPriceForCard(card);
      const bldAmount = fabricPrice * sqft;
      const surchargeAmount = calculateWindowSurcharge(card);
      const optionAmount = calculateWindowOptions(card);
      const motorAmount = calculateWindowMotor(card);

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
        len: getReviewLengthText(card),
        w: window.wincoFormatReviewDimension(widthMm),
        h: window.wincoFormatReviewDimension(heightMm),
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
      const heightMm = Number(baseRow.h || 0);

      if(!splitItems.length){
        return [baseRow];
      }

      return splitItems.map((item, splitIndex) => {
        const input = item.querySelector('.split-mm-input');
        const ctrl = item.querySelector('.split-select-display');
        const splitWidthMm =
          input && String(input.value || '').trim() !== ''
            ? Number(input.value)
            : 0;
        const splitSqft = calculateCeilingSqftFromMm(
          Number.isFinite(splitWidthMm) ? splitWidthMm : 0,
          Number.isFinite(heightMm) ? heightMm : 0
        );

        const part = window.wincoConfiguration.layout({config:configValue,splits:getSplitStateForCard(card)}).parts[splitIndex];

        return {
          ...baseRow,
          loc: String(baseRow.loc || '').trim() + part.fraction,
          headrailNote: part.headrailNote,
          side:
            String(ctrl?.textContent || '').trim() === 'None'
              ? ''
              : String(ctrl?.textContent || '').trim() || baseRow.side,
          w:
            Number.isFinite(splitWidthMm) && splitWidthMm > 0
              ? window.wincoFormatReviewDimension(splitWidthMm)
              : '',
          h: baseRow.h,
          sf: splitSqft ? String(splitSqft) : '0',

          // Keep the existing window-level pricing presentation on the first
          // split row only. This step changes Review dimensions only.
          bld: splitIndex === 0 ? baseRow.bld : '-',
          sur: splitIndex === 0 ? baseRow.sur : '-',
          opt: splitIndex === 0 ? baseRow.opt : '-',
          mot: splitIndex === 0 ? baseRow.mot : '-',
          total: splitIndex === 0 ? baseRow.total : '-',
        };
      });
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
      valueEl.textContent = options.negative && amount ? '-' + formatMeasureMoney(amount) : formatMeasureMoney(amount);
      row.classList.toggle('zero', !amount);
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
        const dims = card.querySelectorAll('.dimension-field');
        const widthMm = dims.length >= 2 ? getMmValue(dims[0]) : null;
        const heightMm = dims.length >= 2 ? getMmValue(dims[1]) : null;
        const sqft = calculateCeilingSqftFromMm(widthMm, heightMm);
        const fabricPrice = getSelectedFabricPriceForCard(card);
        const bldAmount = fabricPrice * sqft;
        const surchargeAmount = calculateWindowSurcharge(card);
        const optionAmount = calculateWindowOptions(card);
        const motorAmount = calculateWindowMotor(card);

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
      setSummaryRowValue('Subtotal', subtotalAmount);
      setSummaryRowValue('Motor', totals.motor);
      setSummaryRowValue('Fee (Install + Extra)', feeAmount);
      setSummaryRowValue('Accessories', accessoriesAmount);
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

      card.querySelectorAll('[data-accessory-discount-input], [data-accessory-qty], [data-accessory-price]').forEach((input) => {
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
          '<td>' + escapeReviewHtml(row.hw) + (row.headrailNote ? '<small class="review-headrail-note">' + escapeReviewHtml(row.headrailNote) + '</small>' : '') + '</td>' +
          '<td>' + escapeReviewHtml(row.bt) + '</td>' +
          '<td>' + escapeReviewHtml(row.ctrl) + '</td>';

        if(showSideColumn){
          rowHtml += '<td>' + escapeReviewHtml(row.controlType === 'Cordless' ? '' : row.side) + '</td>';
        }

        if(showLengthColumn){
          rowHtml += '<td>' + escapeReviewHtml(row.controlType === 'Chain / Manual' ? row.len : '') + '</td>';
        }

        rowHtml +=
          '<td>' + escapeReviewHtml(row.w) + '</td>' +
          '<td>' + escapeReviewHtml(row.h) + '</td>' +
          '<td>' + escapeReviewHtml(row.sf) + '</td>' +
          '<td style="white-space:pre">' + escapeReviewHtml(row.pricePerSf) + '</td>' +
          '<td>' + escapeReviewHtml(row.bld) + '</td>' +
          '<td>' + escapeReviewHtml(row.sur) + '</td>' +
          '<td>' + escapeReviewHtml(row.opt) + '</td>' +
          '<td>' + escapeReviewHtml(row.mot) + '</td>' +
          '<td style="font-weight:600;color:#0f172a">' + escapeReviewHtml(row.total) + '</td>';

        tr.innerHTML = rowHtml;
        tbody.appendChild(tr);
      });

      renderReviewSummaryTotals();
    }

    function updateWindowCardPricing(card, sqft){
      window.wincoDuo.sync(card);
      window.wincoQuantities.sync(card);
      if(!card) return;
      const head=card.querySelector('[data-headrail-display]');
      if(head&&!head.classList.contains('placeholder')){
        head.textContent=window.wincoDependencies.normalizeHeadrail(head.textContent);
        if(head.dataset.headrailCode)head.dataset.headrailCode=window.wincoDependencies.normalizeHeadrail(head.dataset.headrailCode);
      }

      const summaryTop = card.querySelector('.win-summary-top');
      const totalEl = card.querySelector('.win-summary-total');
      if(!summaryTop || !totalEl) return;

      const summaryParts = summaryTop.querySelectorAll('span');
      const fabricPrice = getSelectedFabricPriceForCard(card);
      const bldAmount = fabricPrice * (Number.isFinite(sqft) ? sqft : 0);
      const surchargeAmount = calculateWindowSurcharge(card);
      const optionAmount = calculateWindowOptions(card);
      const motorAmount = calculateWindowMotor(card);

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

      if(typeof renderReviewTableRows === 'function'){
        renderReviewTableRows();
      }
    }

    function updateAllWindowPricing(){
      try {
        const windowCards = Array.from(document.querySelectorAll('.card')).filter((card) => card.querySelector('.window-head'));

        windowCards.forEach((card) => {
          const dims = card.querySelectorAll('.dimension-field');
          const widthMm = dims.length >= 2 ? getMmValue(dims[0]) : null;
          const heightMm = dims.length >= 2 ? getMmValue(dims[1]) : null;
          const sqft = calculateCeilingSqftFromMm(widthMm, heightMm);

          updateWindowCardPricing(card, sqft);
        });
      } catch (err) {
        console.error('measure pricing update error', err);
      }
    }

    window.updateAllWindowPricing = updateAllWindowPricing;
    window.renderCordlessTypeMenu = renderCordlessTypeMenu;
    window.refreshCordlessTypeMenusForGroup = refreshCordlessTypeMenusForGroup;

    function updateAllWindowSqft(){
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
          updateWindowCardPricing(card, sqft);
        } catch (err) {
          console.error('measure sqft pricing update error', err);
        }
      });
    }

    function handleMeasureDocumentInput(e) {
      if(e.target.classList.contains('dimension-control')){
        const field = e.target.closest('.dimension-field');
        if(field){
          updateFieldMmFromControls(field);
        }
        return;
      }

      if(e.target.classList.contains('split-mm-input')){
        const currentInput = e.target;
        syncSplitAutoForCard(currentInput.closest('.card'));
        if(typeof renderReviewTableRows === 'function'){
          renderReviewTableRows();
        }
        return;
      }

      if(
        e.target.matches('[data-accessory-qty]') ||
        e.target.matches('[data-accessory-price]') ||
        e.target.matches('[data-accessory-discount-input]')
      ){
        updateAccessoriesTotals(e.target.closest('.accessories'));
      }
    }

    function handleMeasureDocumentChange(e) {
      if(!e.target.classList.contains('dimension-control')) return;
      const field = e.target.closest('.dimension-field');
      if(field){
        updateFieldMmFromControls(field);
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

    function toggleInformationCard(){
      const cardEl = document.getElementById('informationCard');
      const bodyEl = document.querySelector('#informationCard .info-card-body-hidden');
      const iconEl = document.getElementById('infoToggleIcon');
      if(!bodyEl || !cardEl) return;
      const isHidden = getComputedStyle(bodyEl).display === 'none';
      bodyEl.style.display = isHidden ? 'grid' : 'none';
      cardEl.classList.toggle('is-collapsed', !isHidden);
      if(iconEl){
        iconEl.textContent = isHidden ? '▴' : '▾';
      }
    }

    function formatCurrency(value){
      return window.wincoFormatReviewMoney(value);
    }

    function getAccessoryDiscountPercent(card){
      const input = card.querySelector('[data-accessory-discount-input]');
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
        .filter((item) => item && item.is_active !== false && String(item.name || '').trim())
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
      const card = document.getElementById('informationCard');
      if(!card) return {};

      window.forceMeasureTagRefresh?.();

      const infoInputs = Array.from(card.querySelectorAll('.info-input'));
      const tagField = card.querySelector('[data-measure-tag-display]');
      const clientField = Array.from(card.querySelectorAll('.field-label')).find((label) => label.textContent.trim() === 'Client')?.parentElement?.querySelector('.field span');
      const partnerField = Array.from(card.querySelectorAll('.field-label')).find((label) => label.textContent.trim() === 'Partner')?.parentElement?.querySelector('.field span');
      const typeField = Array.from(card.querySelectorAll('.field-label')).find((label) => label.textContent.trim() === 'Type')?.parentElement?.querySelector('.field span');

      return {
        tag: tagField?.classList.contains('placeholder') ? '' : getFieldValueByLabel(card, 'Tag'),
        client: clientField && !clientField.classList.contains('placeholder') ? String(clientField.textContent || '').trim() : '',
        clientId: clientField ? String(clientField.dataset.clientId || '').trim() : '',
        clientAccount: clientField ? String(clientField.dataset.clientAccount || '').trim() : '',
        clientCompany: clientField ? String(clientField.dataset.clientCompany || '').trim() : '',
        partner: partnerField && !partnerField.classList.contains('placeholder') ? String(partnerField.textContent || '').trim() : '',
        type: typeField && !typeField.classList.contains('placeholder') ? String(typeField.textContent || '').trim() : '',
        name: infoInputs[0] ? String(infoInputs[0].value || '').trim() : '',
        address: infoInputs[1] ? String(infoInputs[1].value || '').trim() : '',
        phone: infoInputs[2] ? String(infoInputs[2].value || '').trim() : '',
        email: infoInputs[3] ? String(infoInputs[3].value || '').trim() : '',
        comments: String(card.querySelector('.info-comments-input')?.value || '').trim(),
      };
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
          widthMm: input && String(input.value || '').trim() !== ''
            ? Number(input.value)
            : null,
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
      const sqft = calculateCeilingSqftFromMm(widthMm, heightMm);
      const fabricPrice = getSelectedFabricPriceForCard(card);
      const bldAmount = fabricPrice * sqft;
      const surchargeAmount = calculateWindowSurcharge(card);
      const optionAmount = calculateWindowOptions(card);
      const motorAmount = calculateWindowMotor(card);

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
        group: getSelectedGroupValue(card),
        location: getWindowFloorValue(index + 1) || '',
        room: getValidationRoomText(card),
        sidemark: sidemarkInput ? String(sidemarkInput.value || '').trim() : '',
        fabric: getValidationDisplayText(fabricDisplay),
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
        bottomrailColor: getValidationRailColorText(bottomrailWrapper),
        control: getValidationFieldTextByLabel(card, 'Control Type'),
        controlSide: window.wincoDependencies.isCordless(window.wincoDependencies.readProductState(card).control)?'':getValidationFieldTextByLabel(card, 'Ctrl Side'),
        length: getReviewLengthText(card),
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

      return {
        totalSqft: parseMeasureMoney(document.querySelector('.tfoot-note')?.textContent || ''),
        blinds: getSummaryDisplayedAmount('Blinds'),
        surcharge: getSummaryDisplayedAmount('Surcharge'),
        option: getSummaryDisplayedAmount('Option'),
        subtotal: getSummaryDisplayedAmount('Subtotal'),
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
      const info = window.wincoRecordInformation({raw_payload:{information:getInformationCardData()}});
      Object.entries(info).forEach(([key,value]) => {
        const el = document.querySelector('[data-review-client-' + key + ']');
        if(el) el.textContent = value || '—';
      });
      const comments = document.querySelector('[data-review-comments-row]');
      if(comments) comments.hidden = !info.comments;
      const company = document.querySelector('[data-review-company-row]');
      if(company) company.hidden = !info.company;
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

        if(!ctrlSide){
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

      if(!String(information.partner || '').trim()){
        warnings.push('Information: Partner is missing');
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
        const resolvedClient = await resolveMeasureQuoteClient(information);
        if(context && !context.active) throw Object.assign(new Error('Your account changed. Reopen this page before trying again.'),{code:'CLIENT_SAVE_CANCELLED'});
        const quoteRow = {
          quote_number: payload.quoteNumber || null,
          quote_date: payload.quoteDate || null,
          unit: payload.unit || null,

          tag: information.tag || null,
          client_id: resolvedClient && resolvedClient.clientId ? resolvedClient.clientId : null,

          client: window.wincoClientLabel(information.client) || information.name || null,
          partner: information.partner || null,
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
      const informationCard = document.getElementById('informationCard');

      if(informationCard){
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
        resetInfoField('Partner', 'Partner');
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
      if(window.measureNewQuoteResetBusy){
        if(event){event.preventDefault();event.stopPropagation();}
        return {cancelled:true,reason:'new quote reset in progress'};
      }
      if(window.measurePricingCatalogState !== 'ready' || window.measureCatalogRefreshBusy){
        if(event){event.preventDefault();event.stopPropagation();}
        alert('Prices are not loaded. Use Retry prices before saving this quote.');
        return {cancelled:true,reason:'pricing unavailable'};
      }
      const missingPrices=getReviewIncludedWindowCards().flatMap((card,index)=>{
        const errors=[],headrail=getSelectedHeadrailForCard(card);
        if(!window.measureEditingQuoteId){
          card.querySelectorAll('[data-fabric-display]').forEach(display=>{
            if(display.classList.contains('placeholder'))return;
            const id=display.dataset.fabricId;
            const item=(window.measureFabricItems||[]).find(row=>id ? row.id===id : row.code===display.dataset.fabricCode);
            if(!item || item.price == null || item.price === '' || !Number.isFinite(Number(item.price)))errors.push('Fabric '+display.textContent);
          });
        }
        if(savedPricingAmount(card,'surcharge')===null&&headrail?.pricingType.toLowerCase()==='surcharge'&&!getSurchargeBlockForHeadrail(headrail.code))errors.push('Head Rail '+headrail.code);
        if(savedPricingAmount(card,getWindowChannelChargeCategory(card))===null){
          if(isOptionCheckedByLabel(card,'L channel')&&!getSideChannelBlock('L CHANNELS'))errors.push('L channel');
          if(isOptionCheckedByLabel(card,'Side channel')){
            const mount=getSelectedMountTypeForCard(card);
            if(!mount||!getSideChannelBlock(mount==='IN'?'INSIDE MOUNT':'OUTSIDE MOUNT'))errors.push('Side channel (check mount and price table)');
          }
        }
        if(savedPricingAmount(card,'option')===null){
          const cordless=getSelectedCordlessTypeForCard(card);
          if(cordless&&!window.wincoDependencies.cordlessCatalog(window.measurePricingCordlessTypeItems).some(item=>item.code===window.wincoDependencies.normalizeControl(cordless.code,getSelectedGroupValue(card))))errors.push('Cordless '+cordless.code);
        }
        const motor=getSelectedMotorForCard(card);
        if(savedPricingAmount(card,'motor')===null&&motor&&!getPricingMotorItemBySelection(motor))errors.push('Motor '+motor.name);
        return errors.map(name=>'Window '+(card.querySelector('.window-head h3')?.textContent||index+1)+': '+name);
      });
      if(!window.measureEditingQuoteId){
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

  `;function Ge(e,{unavailable:t=!1}={}){return new Promise(n=>{let r=document.activeElement,i=document.createElement(`dialog`);i.className=`client-match-dialog`,i.setAttribute(`aria-labelledby`,`client-match-title`),i.setAttribute(`aria-describedby`,`client-match-description`),i.innerHTML=`<div class="client-match-header"><h2 id="client-match-title"></h2><button type="button" class="client-match-close" aria-label="Cancel saving">×</button></div><p id="client-match-description"></p><div class="client-match-list"></div><p class="client-match-note">Your quote information stays as entered.<br>The existing client record will not change.</p><div class="client-match-actions"><button type="button" data-use-existing>Use existing client</button><button type="button" data-create-new class="client-match-primary">Create new client</button></div>`,i.querySelector(`h2`).textContent=t?`Client check unavailable`:`Matching client found`,i.querySelector(`#client-match-description`).textContent=t?`You can save a separate new client, or cancel and try again.`:e.length===1?`An existing client has matching information.`:`Choose a matching client, or create a separate new client.`;let a=e.length===1?e[0].id:null,o=i.querySelector(`[data-use-existing]`);o.hidden=t,o.disabled=!a;for(let t of e){let n=F(t),r=document.createElement(`label`);if(r.className=`client-match-candidate`,e.length>1){let e=document.createElement(`input`);e.type=`radio`,e.name=`client-match-selection`,e.value=n.id,e.addEventListener(`change`,()=>{a=n.id,o.disabled=!1}),r.append(e)}let s=document.createElement(`div`);s.className=`client-match-content`;for(let[e,r]of[[`client-match-name`,n.name],[`client-match-reason`,(t.reasons||[]).join(` · `)],[`client-match-contact`,[n.phone,n.email,n.address].filter(Boolean).join(` · `)],[`client-match-account`,n.account]]){if(!r)continue;let t=document.createElement(`div`);t.className=e,t.textContent=r,s.append(t)}r.append(s),i.querySelector(`.client-match-list`).append(r)}let s=!1,c=e=>{s||(s=!0,i.close(),i.remove(),r?.isConnected&&r.focus(),n(e))};o.addEventListener(`click`,()=>{a&&c(a)}),i.querySelector(`[data-create-new]`).addEventListener(`click`,()=>c(null)),i.querySelector(`.client-match-close`).addEventListener(`click`,()=>c(void 0)),i.addEventListener(`cancel`,e=>{e.preventDefault(),c(void 0)}),i.addEventListener(`close`,()=>c(void 0)),document.body.append(i),i.showModal()})}function Ke(){document.querySelectorAll(`.client-match-dialog`).forEach(e=>e.close())}function qe(e){let t=String(e.querySelector(`[data-measure-name-input]`)?.value||``).trim(),n=String(e.querySelector(`[data-measure-address-input]`)?.value||``).trim(),r=n.match(/\d+/)?.[0],i=t&&r?`${t}-${r}`:``,a=JSON.stringify([t,n]),o=i;for(let t of e.querySelectorAll(`[data-measure-tag-display]`)){for(let[e,n]of Object.entries({contenteditable:`false`,role:`textbox`,"aria-label":`Tag`,"aria-readonly":`true`,tabindex:`0`}))t.setAttribute?.(e,n);for(let e of[`onfocus`,`oninput`,`onkeydown`,`onblur`])t.removeAttribute?.(e);t.style?.removeProperty(`outline`),t.closest?.(`.field`)?.classList.add(`measure-tag-field`);let e=t.classList.contains(`placeholder`)?``:String(t.textContent||``).trim();t.dataset.measureTagMode||(t.dataset.measureTagMode=e?`manual`:`auto`),t.dataset.measureTagSource!==void 0&&t.dataset.measureTagSource!==a&&(t.dataset.measureTagMode=`auto`),t.dataset.measureTagSource=a,o=t.dataset.measureTagMode===`manual`?e:i,t.dataset.measureTagValue=o,t.textContent=o||`Tag`,t.title=o,t.classList.toggle(`placeholder`,!o)}return o}var K=t(),Je=n(),Ye=[[`fabric`,`Fabric`],[`fabricColor`,`Fabric Color`],[`headrail`,`Head Rail`],[`headrailColor`,`Head Rail Color`],[`bottomrail`,`Bottom Rail`],[`bottomrailColor`,`Bottom Rail Color`],[`control`,`Control Type`],[`mount`,`Mount`]],Xe=Object.fromEntries([...Ye.map(([e])=>[e,``]),[`mountCustom`,``]]),Ze=e=>Ye.some(([t])=>!!e[t]),Qe=(e,t,n)=>({...e,[t]:n,...[`fabric`,`headrail`,`bottomrail`].includes(t)?{[t+`Color`]:``}:{}}),q={group:`Fabric`,headrail:`Head Rail`,bottomrail:`Bottom`,control:`Control`,headrailColor:`Head Rail Color`,bottomrailColor:`Bottom Color`},$e=e=>e===`headrail`?`headrail`:`bottom rail`,J=(e,t)=>String(e.id)===String(t),et=(e,t)=>String(e.color_code).trim()===String(t).trim(),tt=(e,t,n)=>t.fabric?n.fabrics.find(e=>J(e,t.fabric)):n.fabrics.find(t=>e.fabricId?J(t,e.fabricId):t.code===e.fabricCode&&(!e.group||t.product_group===e.group));function nt(e,t){let n=e.fields.filter(e=>t[e]);n.length===2&&n[0]===`group`&&n.reverse();let r=n.map(e=>`${q[e]} ${t[e]}`);return r.length>1?r.join(` ≠ `):`${r[0]||`Selection`} — unavailable`}function rt(e,t,n){let r=D(e),i=[],a={},o={},s=tt(e,t,n);t.fabric&&!s&&i.push(`Fabric — unavailable`),t.fabric&&s&&(a.group=s.product_group);for(let e of[`headrail`,`bottomrail`]){let s=n.hardware.find(n=>String(n.product_group).toLowerCase()===$e(e)&&(t[e]?J(n,t[e]):E(n.code)===r[e]));o[e]=s,t[e]&&!s&&i.push(`${q[e]} — unavailable`),t[e]&&s&&(a[e]=E(s.code))}for(let e of[`headrailColor`,`bottomrailColor`,`control`])t[e]&&(a[e]=t[e]);Object.assign(r,D({...r,...a}));let c=O(r);i.push(...c.map(e=>nt(e,r)));for(let e of[`headrail`,`bottomrail`]){let a=o[e],s=e+`Color`,l=r[s];r[e]&&!a&&i.push(`${q[e]} ${r[e]} — unavailable`),t[e]&&!l&&i.push(`${q[s]} — select a color`),l&&!c.some(e=>e.fields.includes(s))&&(!a||!n.colors.some(e=>String(e.hardware_id)===String(a.id)&&et(e,l)))&&i.push(`${q[s]} ${l} ≠ ${q[e]} ${r[e]||`not selected`}`)}let l=t.fabricColor||e.fabricColor||``,u=s?.fabric_colors?.find(e=>et(e,l));(t.fabric||t.fabricColor)&&(l?u||i.push(`Fabric Color ${l} ≠ Fabric ${s?.code||e.fabricCode||`not selected`}`):i.push(`Fabric Color — select a color`)),k(r.control)&&r.control!==`Cordless`&&!T(n.pricing,n.controls).some(e=>e.code===r.control)&&i.push(`Control ${r.control} — price unavailable`);let d=t.mount===`custom`?String(t.mountCustom||``).trim():t.mount;t.mount&&![`IN`,`FF`,`FW`,`FD`,`custom`].includes(t.mount)&&i.push(`Mount — unavailable`),t.mount===`custom`&&!d&&i.push(`Mount — enter a value`);let f=j(r),p=[];for(let t of[`general`,`chain`,`cordless`])for(let n of e.optionState?.[t]||[])f[t].some(e=>e.toLowerCase()===n.toLowerCase())||p.push(n);return k(r.control)&&e.controlSide&&p.push(`Control Side`),r.control!==`CH`&&e.length&&p.push(`Chain Length`),r.control!==`Motorized`&&e.motor&&p.push(`Motor`),e.headrail===`4FA DUO`&&r.headrail!==`4FA DUO`&&p.push(`Fabric B`),{state:r,issues:[...new Set(i)],cleared:[...new Set(p)],fabric:t.fabric?s:null,fabricColor:t.fabric||t.fabricColor?u:null,mount:t.mount?d:null,changes:t}}function it(e,t,n,r){let i=e=>[e.code,e.description].filter(Boolean).join(` — `);if(n===`fabric`)return r.fabrics.map(e=>({value:String(e.id),label:`${e.product_group} · ${i(e)}`}));if(n===`mount`)return[[`IN`,`Inside Mount`],[`FF`,`Frame Mount`],[`FW`,`Wall Mount`],[`FD`,`Door Mount`],[`custom`,`Custom`]].map(([e,t])=>({value:e,label:e===`custom`?t:`${e} — ${t}`}));if(n===`control`)return[`CH`,...T(r.pricing,r.controls).map(e=>e.code),`Motorized`].map(e=>({value:e,label:ne(e)}));if(n===`headrail`||n===`bottomrail`)return r.hardware.filter(e=>String(e.product_group).toLowerCase()===$e(n)).map(e=>({value:String(e.id),label:i(e)}));let a=e.map(e=>{if(n===`fabricColor`)return tt(e,t,r)?.fabric_colors||[];let i=n.replace(`Color`,``),a=r.hardware.find(n=>String(n.product_group).toLowerCase()===$e(i)&&(t[i]?J(n,t[i]):E(n.code)===e[i]));return a?r.colors.filter(e=>String(e.hardware_id)===String(a.id)&&!O({[i]:E(a.code),[n]:String(e.color_code)}).length):[]});return[...new Map((a[0]||[]).filter(e=>a.every(t=>t.some(t=>et(t,e.color_code)))).map(e=>[String(e.color_code),{value:String(e.color_code),label:[e.color_code,e.color_description].filter(Boolean).join(` — `)}])).values()]}var Y=e=>!e||e.classList.contains(`placeholder`)?``:e.textContent.trim(),X=(e,t)=>[...e.querySelectorAll(`.field-label`)].find(e=>e.textContent.trim()===t)?.parentElement?.querySelector(`.field span`),at=(e,t)=>e.querySelector(`[data-${t}-display]`)?.closest(`.col-3`),ot=(e,t)=>[...at(e,t)?.querySelectorAll(`.rail-seg.clickable`)||[]].find(e=>!e.hasAttribute(`data-${t}-display`));function Z(e){return D({group:Y(X(e,`Group`)),headrail:Y(e.querySelector(`[data-headrail-display]`)),bottomrail:Y(e.querySelector(`[data-bottomrail-display]`)),control:Y(X(e,`Control Type`)),cordlessType:Y(e.querySelector(`[data-cordless-type-section] .field span`)),headrailColor:Y(ot(e,`headrail`)),bottomrailColor:Y(ot(e,`bottomrail`))})}var Q=(e,t,n)=>{e&&(e.textContent=t||n,e.classList.toggle(`placeholder`,!t))};function st(e,t){if(t===`control`){Q(X(e,`Control Type`),``,`Select control type`);let t=e.querySelector(`[data-cordless-type-section] .field span`);Q(t,``,`Select Type`),t&&(delete t.dataset.cordlessTypeCode,delete t.dataset.cordlessTypePrice,delete t.dataset.cordlessPricingId)}else if(t.endsWith(`Color`)){let n=ot(e,t.replace(`Color`,``));if(Q(n,``,`Color`),n)for(let e of Object.keys(n.dataset))e.startsWith(`railColor`)&&delete n.dataset[e]}else{let n=e.querySelector(`[data-${t}-display]`);if(Q(n,``,t===`headrail`?`Head rail`:`Bottom rail`),n)for(let e of[`Id`,`Code`,`Description`,`PricingType`])delete n.dataset[t+e];st(e,t+`Color`)}}function ct(e,t,n){if(!n){st(e,t);return}let r=(window.measureHardwareItems||[]).find(e=>String(e.product_group).toLowerCase()===(t===`headrail`?`headrail`:`bottom rail`)&&E(e.code)===n);if(!r)throw Error(`${n} is no longer in the hardware catalog.`);let i=e.querySelector(`[data-${t}-display]`);Q(i,n,``),Object.assign(i.dataset,{[t+`Id`]:r.id,[t+`Code`]:n,[t+`Description`]:r.description||``,[t+`PricingType`]:r.pricing_type||``})}function lt(e,t,n){if(!n){st(e,t+`Color`);return}let r=(window.measureHardwareColors||[]).find(r=>String(r.hardware_id)===String(e.querySelector(`[data-${t}-display]`)?.dataset[t+`Id`])&&String(r.color_code)===n);if(!r)throw Error(`${t===`headrail`?`Head`:`Bottom`} Rail Color ${n} is no longer in the catalog.`);let i=ot(e,t);Q(i,n,`Color`),Object.assign(i.dataset,{railColorId:r.id,railColorCode:n,railColorDescription:r.color_description||``,railColorVisibility:r.visibility||``})}function ut(e,t){Q(X(e,`Control Type`),A(t),`Select control type`);let n=e.querySelector(`[data-cordless-type-section] .field span`);if(k(t)&&t!==`Cordless`){let e=T(window.measurePricingCordlessTypeItems,window.measureControlItems).find(e=>e.code===t);if(!e)throw Error(`No active price is registered for ${t}.`);Q(n,t,`Select Type`),Object.assign(n.dataset,{cordlessTypeCode:t,cordlessTypePrice:String(e.price??``),cordlessPricingId:e.id||``})}else Q(n,``,`Select Type`),n&&(delete n.dataset.cordlessTypeCode,delete n.dataset.cordlessTypePrice,delete n.dataset.cordlessPricingId)}function dt(e,t,n){let r=e.querySelector(t);if(!r)return;let i=new Set([...r.querySelectorAll(`.check.checked`)].map(e=>window.getCheckButtonLabel(e).trim().toLowerCase())),a=Y(r.querySelector(`.inline-value`))||`12"`;r.replaceChildren();for(let e of n){let t=document.createElement(`button`);t.type=`button`,t.className=`check`,t.classList.toggle(`checked`,i.has(e.toLowerCase())),t.setAttribute(`onclick`,`toggleCheck(this)`),e===`Side channel`&&(t.dataset.sideChannelOption=`true`),e===`L channel`&&(t.dataset.lChannelOption=`true`),e===`No Chain Weight`&&(t.dataset.chainWeightToggle=``);let n=document.createElement(`span`);n.className=`check-box`,n.textContent=`✓`;let o=document.createElement(`span`);if(o.textContent=e,t.append(n,o),r.append(t),e===`Reach cord`){let e=document.createElement(`span`);e.className=`inline-value`,e.classList.toggle(`hidden`,!t.classList.contains(`checked`)),e.textContent=a,r.append(e)}}}function ft(e){let t=j(Z(e));dt(e,`[data-general-option-box]`,t.general),dt(e,`[data-cordless-option-section] .option-box`,t.cordless),e.querySelector(`[data-cordless-option-section]`)?.classList.toggle(`hidden`,!t.cordless.length),t.chain.length&&dt(e,`[data-chain-option-section] .option-box`,t.chain)}var pt=new WeakSet;function mt(e,t){if(!(!e||pt.has(e)||e.dataset.applyingBulk)){pt.add(e);try{let n=Z(e),{state:r}=M(n,Object.fromEntries((Array.isArray(t)?t:[t]).filter(Boolean).map(e=>[e,n[e]])));for(let t of[`headrail`,`bottomrail`,`control`,`headrailColor`,`bottomrailColor`])n[t]&&!r[t]&&st(e,t);window.renderControlTypeDetails(e,A(r.control)),ft(e)}finally{pt.delete(e)}}}function ht(){return{fabrics:window.measureFabricItems||[],hardware:window.measureHardwareItems||[],colors:window.measureHardwareColors||[],pricing:window.measurePricingCordlessTypeItems||[],controls:window.measureControlItems||[]}}function gt(e){let t=e.querySelector(`[data-fabric-display]`);return{...Z(e),fabricId:t?.dataset.fabricId||``,fabricCode:Y(t),fabricColor:Y(e.querySelector(`[data-fabric-color-display]`)),controlSide:Y(X(e,`Ctrl Side`)),length:e.querySelector(`[data-chain-length-section] .length-input`)?.value||``,motor:Y(e.querySelector(`[data-motor-section] .field span`)),optionState:window.getWindowOptionState(e)}}function _t(e,t){return{...rt(gt(e),t,ht()),card:e}}function vt(e,t=!0){let{card:n,state:r,fabric:i,fabricColor:a,mount:o}=e;if(e.issues.length)throw Error(e.issues.join(`
`));n.dataset.applyingBulk=`true`;try{if(i){let e=n.querySelector(`[data-fabric-display]`);Q(e,i.code,`Fabric`),e.title=window.formatFabricOptionLabel(i),Object.assign(e.dataset,{fabricId:i.id,fabricCode:i.code,fabricGroup:i.product_group,fabricDescription:i.description||``,fabricPrice:String(i.price??``),fabricWidth:String(i.width??``),fabricVisibility:i.visibility||``}),Q(X(n,`Group`),i.product_group,`Shade`)}if(a&&window.selectFabricColor(n.querySelector(`[data-fabric-color-display]`),a),ct(n,`headrail`,r.headrail),ct(n,`bottomrail`,r.bottomrail),ut(n,r.control),lt(n,`headrail`,r.headrailColor),lt(n,`bottomrail`,r.bottomrailColor),window.renderControlTypeDetails(n,A(r.control)),ft(n),o!==null){let t=n.querySelector(`[data-mount-type-wrapper]`);if(!t)throw Error(`Mount field is unavailable.`);if(e.changes.mount===`custom`){let e=document.createElement(`span`);e.dataset.mountTypeDisplay=``,e.textContent=o,t.querySelector(`[data-mount-type-value]`).replaceChildren(e)}else window.selectMountType(t,o)}delete n.dataset.savedOptionAmount,delete n.dataset.savedSurchargeAmount;let t=O(Z(n));if(t.length)throw Error(t[0].message)}finally{delete n.dataset.applyingBulk}let s=n.querySelectorAll(`.dimension-field`);window.updateWindowCardPricing(n,window.calculateCeilingSqftFromMm(window.getMmValue(s[0]),window.getMmValue(s[1]))),t&&n.dispatchEvent(new Event(`input`,{bubbles:!0}))}function yt(e){let t=[...e.childNodes].map(yt),n=e.attributes?[...e.attributes].map(e=>[e.name,e.value]):null,r=Object.fromEntries([`value`,`checked`,`selected`,`indeterminate`].filter(t=>t in e).map(t=>[t,e[t]])),i=e.nodeType===3?e.data:null;return()=>{if(n){for(let t of[...e.attributes])e.removeAttribute(t.name);for(let[t,r]of n)e.setAttribute(t,r)}return e.nodeType===1&&e.replaceChildren(...t.map(e=>e())),i!==null&&(e.data=i),Object.assign(e,r),e}}function bt(e,t){let n=e.map(e=>({..._t(e.card,t),no:e.no})),r=n.flatMap(e=>e.issues.map(t=>`Window #${e.no}: ${t}`));if(r.length)throw Error(r.join(`
`));let i=e.map(e=>yt(e.card));try{n.forEach(e=>vt(e,!1))}catch(e){throw i.forEach(e=>e()),window.renderReviewTableRows?.(),e}e.forEach(e=>e.card.dispatchEvent(new Event(`input`,{bubbles:!0})))}var xt={...te,readProductState:Z,renderOptions:ft,reconcile:mt,fillControl:ut},$=c();function St({checked:e,mixed:t=!1,onChange:n,...r}){let i=(0,K.useRef)(null);return(0,K.useEffect)(()=>{i.current&&(i.current.indeterminate=t)},[t]),(0,$.jsxs)(`span`,{className:`bulk-checkbox`,children:[(0,$.jsx)(`input`,{...r,ref:i,type:`checkbox`,checked:e,onChange:n}),(0,$.jsx)(`span`,{className:`bulk-checkmark`,"aria-hidden":`true`,children:(0,$.jsxs)(`svg`,{viewBox:`0 0 20 20`,children:[(0,$.jsx)(`path`,{className:`bulk-tick`,d:`m4 10 4 4 8-9`}),(0,$.jsx)(`path`,{className:`bulk-dash`,d:`M4 10h12`})]})})]})}function Ct(e,t){return e.map(e=>{try{return{no:e.no,..._t(e.card,t)}}catch(t){return{no:e.no,issues:[t.message],cleared:[]}}})}function wt(){let[e,t]=(0,K.useState)(null),[n,r]=(0,K.useState)(1),[i,a]=(0,K.useState)([]),[o,s]=(0,K.useState)(Xe),[c,l]=(0,K.useState)(``),[u,d]=(0,K.useState)(!1),[f,p]=(0,K.useState)(``),m=(0,K.useRef)(null),h=(0,K.useRef)(null),g=(0,K.useRef)(null),_=(0,K.useRef)(null),v=()=>{t(null),_.current?.focus()};if((0,K.useEffect)(()=>{let e=e=>{let n=e.target.closest(`[data-measure-bulk-edit]`);n&&(_.current=n,t([...document.querySelectorAll(`.measure-page .window-head`)].map((e,t)=>{let n=e.closest(`.card`),r=e.querySelector(`.window-title`)?.textContent.trim()||`Window #${t+1}`,i=r.replace(/^Window\s*#?\s*\d+\s*/i,``).trim(),a=Z(n);return{card:n,no:t+1,title:r,location:i,detail:[a.group,a.headrail,a.bottomrail].filter(Boolean).join(` · `)}})),r(1),a([]),s({...Xe}),l(``),d(!1),p(``))};return document.addEventListener(`click`,e),()=>document.removeEventListener(`click`,e)},[]),(0,K.useEffect)(()=>{e&&m.current?.showModal()},[e]),(0,K.useEffect)(()=>{e&&(h.current&&(h.current.scrollTop=0),g.current?.focus())},[n,e]),!e)return null;let y=e.filter(e=>i.includes(e.no)),b=e.filter(e=>`${e.title} ${e.detail}`.toLowerCase().includes(c.trim().toLowerCase())),x=u?y:y.slice(0,6),S=Ze(o)?Ct(y,o):[],ee=S.flatMap(e=>e.issues.map(t=>({no:e.no,message:t}))),C=y.map(e=>gt(e.card)),w=e=>{a(e),p(``),e.length||(r(1),d(!1))},T=(e,t)=>{p(``),s(Qe(o,e,t))},E=e=>{let t=it(C,o,e,ht());return o[e]&&!t.some(t=>t.value===o[e])&&t.push({value:o[e],label:`${o[e]} — unavailable`,disabled:!0}),t};return(0,Je.createPortal)((0,$.jsxs)(`dialog`,{className:`measure-bulk-dialog`,ref:m,onCancel:v,"aria-labelledby":`bulk-edit-title`,children:[(0,$.jsxs)(`header`,{className:`bulk-header`,children:[(0,$.jsxs)(`div`,{className:`bulk-title-row`,children:[(0,$.jsx)(`h2`,{id:`bulk-edit-title`,children:`Bulk Edit`}),(0,$.jsx)(`button`,{type:`button`,className:`bulk-close`,"aria-label":`Close Bulk Edit`,onClick:v,children:`×`})]}),(0,$.jsxs)(`ol`,{className:`bulk-steps`,"aria-label":`Bulk edit progress`,children:[(0,$.jsxs)(`li`,{"aria-current":n===1?`step`:void 0,children:[(0,$.jsx)(`span`,{children:n===2?`✓`:`1`}),` Select windows`]}),(0,$.jsxs)(`li`,{"aria-current":n===2?`step`:void 0,children:[(0,$.jsx)(`span`,{children:`2`}),` Choose options`]})]})]}),(0,$.jsxs)(`div`,{className:`bulk-body`,ref:h,children:[(0,$.jsx)(`h3`,{ref:g,tabIndex:-1,children:n===1?`Which windows would you like to update?`:`Choose the product settings to apply`}),n===1?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`p`,{className:`bulk-description`,children:`Tap a window to select it. You can change your selection in the next step.`}),(0,$.jsxs)(`div`,{className:`bulk-selection-tools`,children:[(0,$.jsxs)(`label`,{className:`bulk-select-all`,children:[(0,$.jsx)(St,{checked:i.length===e.length&&e.length>0,mixed:i.length>0&&i.length<e.length,onChange:t=>w(t.target.checked?e.map(e=>e.no):[])}),` Select all (`,e.length,`)`]}),(0,$.jsx)(`button`,{type:`button`,className:`bulk-text-button`,disabled:!i.length,onClick:()=>w([]),children:`Clear selection`})]}),e.length>6&&(0,$.jsx)(`input`,{className:`bulk-search`,type:`search`,"aria-label":`Find windows`,placeholder:`Find by window number, room or product…`,value:c,onChange:e=>l(e.target.value)}),(0,$.jsx)(`div`,{className:`bulk-window-grid`,children:b.map(e=>(0,$.jsxs)(`label`,{className:`bulk-window-card${i.includes(e.no)?` is-selected`:``}`,children:[(0,$.jsx)(St,{"aria-label":e.title,checked:i.includes(e.no),onChange:t=>w(t.target.checked?[...i,e.no]:i.filter(t=>t!==e.no))}),(0,$.jsxs)(`span`,{className:`bulk-window-copy`,children:[(0,$.jsxs)(`strong`,{children:[`Window #`,e.no]}),(0,$.jsx)(`span`,{children:e.location||`Location not set`}),e.detail&&(0,$.jsx)(`small`,{children:e.detail})]})]},e.no))}),!b.length&&(0,$.jsx)(`p`,{className:`bulk-empty`,children:`No windows match your search.`})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`section`,{className:`bulk-selected-panel`,"aria-label":`Selected windows`,children:[(0,$.jsxs)(`div`,{className:`bulk-selection-tools`,children:[(0,$.jsxs)(`strong`,{children:[i.length,` `,i.length===1?`window`:`windows`,` selected`]}),(0,$.jsx)(`button`,{type:`button`,className:`bulk-text-button`,onClick:()=>{l(``),r(1)},children:`Edit selection`})]}),(0,$.jsx)(`div`,{className:`bulk-selected-chips`,children:x.map(e=>(0,$.jsxs)(`button`,{type:`button`,className:`bulk-selected-chip`,"aria-label":`Remove ${e.title}`,title:e.title,onClick:()=>w(i.filter(t=>t!==e.no)),children:[(0,$.jsxs)(`span`,{children:[`#`,e.no,e.location?` · ${e.location}`:``]}),(0,$.jsx)(`span`,{"aria-hidden":`true`,children:`×`})]},e.no))}),y.length>6&&(0,$.jsx)(`button`,{type:`button`,className:`bulk-text-button`,onClick:()=>d(!u),children:u?`Show fewer`:`Show all ${i.length} windows`})]}),(0,$.jsx)(`p`,{className:`bulk-description`,children:`“Keep current” retains each window’s value. Resolve incompatible combinations before applying.`}),(0,$.jsx)(`div`,{className:`bulk-settings`,children:Ye.map(([e,t])=>(0,$.jsxs)(`label`,{children:[t,(0,$.jsxs)(`select`,{"aria-label":t,value:o[e],onChange:t=>T(e,t.target.value),children:[(0,$.jsx)(`option`,{value:``,children:`Keep current`}),E(e).map(e=>(0,$.jsx)(`option`,{value:e.value,disabled:e.disabled,children:e.label},e.value))]}),e===`mount`&&o.mount===`custom`&&(0,$.jsx)(`input`,{"aria-label":`Custom Mount`,placeholder:`Custom mount`,value:o.mountCustom,onChange:e=>T(`mountCustom`,e.target.value)})]},e))}),ee.length>0&&(0,$.jsxs)(`section`,{className:`bulk-clear-preview`,role:`alert`,"aria-label":`Incompatible combinations`,children:[(0,$.jsx)(`strong`,{children:`Incompatible combinations`}),ee.map(({no:e,message:t})=>(0,$.jsxs)(`p`,{children:[`Window #`,e,`: `,t]},`${e}:${t}`))]}),S.some(e=>e.cleared.length>0)&&(0,$.jsxs)(`details`,{className:`bulk-clear-preview`,open:!0,children:[(0,$.jsx)(`summary`,{children:`Related selections to be removed`}),S.filter(e=>e.cleared.length).map(e=>(0,$.jsxs)(`p`,{children:[`Window #`,e.no,`: `,e.cleared.join(`, `)]},e.no))]}),(C.some(e=>e.headrail===`4FA DUO`)||S.some(e=>e.state?.headrail===`4FA DUO`))&&(0,$.jsx)(`p`,{className:`bulk-preserve-note`,children:`For DUO windows, Fabric and Fabric Color apply to Fabric A.`}),(0,$.jsx)(`p`,{className:`bulk-preserve-note`,children:`Dimensions and location stay the same. Existing memo text is kept.`})]}),f&&(0,$.jsx)(`p`,{role:`alert`,className:`bulk-error`,children:f})]}),(0,$.jsxs)(`footer`,{className:`bulk-footer`,children:[(0,$.jsxs)(`span`,{className:`bulk-count`,role:`status`,children:[i.length,` of `,e.length,` selected`]}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`button`,{type:`button`,onClick:n===1?v:()=>r(1),children:n===1?`Cancel`:`Back`}),n===1?(0,$.jsx)(`button`,{type:`button`,className:`bulk-primary`,disabled:!i.length,onClick:()=>r(2),children:`Next: choose options →`}):(0,$.jsxs)(`button`,{type:`button`,className:`bulk-primary`,disabled:!i.length||!Ze(o)||ee.length>0,onClick:()=>{try{if(!i.length||!Ze(o))return;bt(y,o),v()}catch(e){p(e.message)}},children:[`Apply to `,i.length,` `,i.length===1?`window`:`windows`]})]})]})]}),document.body)}function Tt(e,t){let n=[];return{get latest(){let e=n.at(-1);return e?{count:e.rows.length,kind:e.kind}:null},clear(){n.length=0},remove(t,r=`delete`){let i=e(),a=new Set(t),o=i.flatMap((e,t)=>a.has(e)?[{card:e,index:t}]:[]);return o.length?(o.forEach(({card:e})=>e.remove()),n.push({rows:o,kind:r}),n.length>20&&n.shift(),!0):!1},undo(){let r=n.at(-1),i=t();if(!r||!i?.parentNode)return!1;for(let{card:t,index:n}of r.rows){let r=e()[n]||i;r.parentNode.insertBefore(t,r)}return n.pop(),!0}}}var Et=[`input.dimension-control`,`input.split-mm-input`,`input.length-input`,`input[data-sidemark-input]`,`input[data-accessory-qty]`].join(`,`);function Dt(e){if(!e)return()=>{};let t=e.ownerDocument,n=t.defaultView,r=null,i,a=e=>e?.matches?.(Et)&&!e.readOnly&&!e.disabled,o=()=>{n.clearTimeout(i),r=null},s=e=>{if(n.clearTimeout(i),!a(e)||t.activeElement!==e)return;e.select();let r=e.value;i=n.setTimeout(()=>{a(e)&&t.activeElement===e&&e.value===r&&e.select()},0)},c={pointerdown:({target:e})=>{o(),a(e)&&t.activeElement!==e&&(r=e)},focusin:({target:e})=>s(e),click:({target:e})=>{e===r&&s(e),r=null},focusout:({target:e})=>{n.clearTimeout(i),r===e&&(r=null)},pointercancel:o,keydown:o,input:o};for(let[t,n]of Object.entries(c))e.addEventListener(t,n,!0);return()=>{o();for(let[t,n]of Object.entries(c))e.removeEventListener(t,n,!0)}}function Ot(e){let t=e?.querySelector(`.top-nav`);if(!t)return()=>{};let n=e.ownerDocument.defaultView,r=()=>e.style.setProperty(`--measure-nav-height`,`${t.getBoundingClientRect().height}px`);r();let i=n.ResizeObserver?new n.ResizeObserver(r):null;return i?.observe(t),n.addEventListener(`resize`,r),()=>{i?.disconnect(),n.removeEventListener(`resize`,r),e.style.removeProperty(`--measure-nav-height`)}}function kt(e,t){let n=e?.querySelector(`#unitDropdown`),r=e?.querySelector(`#unitMenu`);if(!n||!r)return()=>{};let i=e.ownerDocument,a=Array.from(r.querySelectorAll(`[data-unit-option]`));n.setAttribute(`role`,`button`),n.setAttribute(`tabindex`,`0`),n.setAttribute(`aria-haspopup`,`menu`),n.setAttribute(`aria-controls`,`unitMenu`),n.setAttribute(`aria-label`,`Measurement unit`),r.setAttribute(`role`,`menu`),r.setAttribute(`aria-label`,`Measurement unit`),a.forEach(e=>{e.setAttribute(`role`,`menuitemradio`),e.setAttribute(`tabindex`,`-1`)});let o=()=>{n.setAttribute(`aria-expanded`,String(!r.classList.contains(`hidden`)));let t=e.querySelector(`#unitLabel`).textContent.trim();a.forEach(e=>e.setAttribute(`aria-checked`,String(e.dataset.unitOption===t)))},s=(e=!1)=>{r.classList.add(`hidden`),o(),e&&n.focus()},c=(e=!1)=>{r.classList.remove(`hidden`),o(),e&&(a.find(e=>e.getAttribute(`aria-checked`)===`true`)||a[0])?.focus()},l=e=>{let i=e.target.closest(`[data-unit-option]`);r.contains(i)?(e.preventDefault(),e.stopPropagation(),t(i.dataset.unitOption),s(!0)):n.contains(e.target)?(e.preventDefault(),e.stopPropagation(),r.classList.contains(`hidden`)?c():s()):r.contains(e.target)||s()},u=e=>{if(!n.contains(e.target)&&!r.contains(e.target)){e.key===`Escape`&&!r.classList.contains(`hidden`)&&(e.preventDefault(),s(!0));return}if(e.key===`Escape`){e.preventDefault(),e.stopPropagation(),s(!0);return}if(e.key===`Tab`){s();return}if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.stopPropagation();let n=e.target.closest(`[data-unit-option]`);r.contains(n)?(t(n.dataset.unitOption),s(!0)):r.classList.contains(`hidden`)?c(!0):s()}else if([`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(e.key)){if(e.preventDefault(),e.stopPropagation(),r.classList.contains(`hidden`)){c(!0);return}let t=a.indexOf(i.activeElement);a[e.key===`Home`?0:e.key===`End`?a.length-1:(t+(e.key===`ArrowUp`?-1:1)+a.length)%a.length]?.focus()}},d=e=>{!n.contains(e.target)&&!r.contains(e.target)&&s()};return o(),i.addEventListener(`click`,l,!0),i.addEventListener(`keydown`,u,!0),i.addEventListener(`focusin`,d),()=>{i.removeEventListener(`click`,l,!0),i.removeEventListener(`keydown`,u,!0),i.removeEventListener(`focusin`,d)}}function At(e,t=()=>crypto.randomUUID(),{accountId:n,storage:r,storageKey:i}={}){let a;try{a=JSON.parse(r?.getItem(i)||`null`)}catch{}return async({quoteId:o,revision:s,quote:c,windows:l,accessories:u})=>{if(!o||!s)throw Error(`Reopen this quote before overwriting it. Your edits are still on this screen.`);let d=JSON.stringify([o,s,c,l,u]);if(a?.signature!==d){a={signature:d,id:t()};try{r?.setItem(i,JSON.stringify(a))}catch{}}let{data:f,error:p}=await I(e,n,`overwrite`,{p_quote_id:o,p_expected:s,p_request_id:a.id,p_quote:c,p_windows:l,p_accessories:u});if(p)throw p;if(!f?.id||f.id!==o||!f.revision)throw Error(`Could not confirm the save. Retry without changing the form to check the same request safely.`);return f}}async function jt(e,t){let{data:n,error:r}=await e.rpc(`winco_load_quote_for_edit`,{p_quote_id:t});if(r)throw r;if(!n?.quote||n.quote.id!==t||!n.revision||!Array.isArray(n.windows)||!Array.isArray(n.accessories))throw Error(`Could not load the complete quote. Please reopen it.`);return n}function Mt(e,{accountId:t,storage:n,storageKey:r,uuid:i=()=>crypto.randomUUID()}={}){let a;try{a=JSON.parse(n?.getItem(r)||`null`)}catch{}let o=e=>{a=e;try{e?n?.setItem(r,JSON.stringify(e)):n?.removeItem(r)}catch{}},s=e=>{if(!e?.id||!e.quote_number||!e.revision)throw Error(`Could not confirm the save. Please retry.`);return e},c=async({payload:n,prepare:r})=>{let c=JSON.stringify({...n,quoteNumber:void 0});if(a&&a.signature!==c){let{data:n,error:r}=await I(e,t,`settle_create`,{p_request_id:a.id});if(r)throw r;if(n?.cancelled!==!0){let e=s(n);o(null);let t=Error(`The earlier save completed as `+e.quote_number+`. Your latest edits are still here. Press Save to update that quote or choose Save as New Quote.`);throw t.createdQuote=e,t}o(null)}if(!a){let e=await r();o({id:i(),signature:c,submission:e})}let{quote:l,windows:u,accessories:d}=a.submission,{data:f,error:p}=await I(e,t,`create`,{p_request_id:a.id,p_quote:l,p_windows:u,p_accessories:d});if(p)throw p;return s(f)};return c.hasPending=()=>!!a,c.canResume=()=>{if(!a)return!0;try{return n?.getItem(r)===JSON.stringify(a)}catch{return!1}},c.reset=()=>o(null),c}window.wincoFormatReviewMoney=g,window.wincoFormatReviewDimension=y,window.wincoRefreshMeasureTag=qe,window.wincoRecordInformation=d,window.wincoClientLabel=f,window.wincoNormalizeClient=F,window.wincoLoadClients=()=>le(e),window.wincoResolveQuoteClient=t=>ce(e,t,Ge);function Nt({currentUser:t,onOpenMainPage:n,onOpenMeasurePage:c,onOpenQuotesPage:u,onOpenOrdersPage:d,onOpenClientsPage:f,onOpenResourcesPage:h,onOpenAdminPage:g}){let y=t?.role===`Admin`||t?.role===`Sales`,b=t?.account_name||`Charles / Winco`,[x]=(0,K.useState)(()=>a(window,t.id)),C=Ue.replace(`<button class="btn">Bulk Edit</button>`,`<button class="btn" type="button" data-measure-bulk-edit>Bulk Edit</button>`).replace(/(<div data-account-home-link[^>]*>)[\s\S]*?(<\/div>)/,(e,t,n)=>`${t}${b.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}${n}`).replace(/<div\b[^>]*class=["'][^"']*\bnav-item\b[^"']*["'][^>]*>\s*Admin\s*<\/div>/gi,e=>y?e:``).replace(`<div class="main-nav-item current">Admin</div>`,y?`<div class="main-nav-item current">Admin</div>`:``).replace(`<div class="main-nav-item">Admin</div>`,y?`<div class="main-nav-item">Admin</div>`:``);return(0,K.useEffect)(()=>re(document.querySelector(`.measure-page`),`[data-accessory-menu]`),[]),(0,K.useEffect)(()=>{window.supabaseClient=e,window.measureCurrentAccountName=b,window.measureCurrentAccountId=t?.id,window.measureEditingQuoteId=x.editingQuoteId,window.measureEditingRevision=x.revision;let n=!0,r=e=>String(e||``).trim().toLowerCase(),i=e=>String(e?.dataset?.partnerName||e?.textContent||``).replace(`×`,``).trim(),a=e=>{let t=document.querySelector(`.measure-page`);if(!t)return;let n=Array.from(t.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Partner`),a=n?n.closest(`.col-2`):null,o=a?a.querySelector(`.client-menu`):null;if(!o)return;let s=new Set((e||[]).map(e=>r(e)));Array.from(o.querySelectorAll(`.partner-option-with-delete[data-partner-name]`)).forEach(e=>{let t=String(e.dataset.partnerName||``).trim();if(!t)return;if(!s.has(r(t))){e.remove();return}e.onclick=function(){let n=e.closest(`.col-2`);if(!n)return;let r=n.querySelector(`.client-menu`),i=n.querySelector(`.field span`);i&&(i.textContent=t,i.title=t,i.classList.remove(`placeholder`)),r&&r.classList.add(`hidden`),typeof window.refreshReviewClientInfo==`function`&&window.refreshReviewClientInfo()};let n=e.querySelector(`button[aria-label="Delete partner"]`);n&&(n.onclick=function(e){e.stopPropagation(),typeof window.confirmDeletePartnerFromDropdown==`function`&&window.confirmDeletePartnerFromDropdown(n,t)})});let c=new Set(Array.from(o.querySelectorAll(`.client-option`)).map(e=>r(i(e)))),l=Array.from(o.querySelectorAll(`.client-option`)).find(e=>e.textContent.trim()===`None`);e.forEach(e=>{let t=String(e||``).trim(),n=r(t);if(!t||c.has(n))return;let i=document.createElement(`div`);i.className=`client-option partner-option-with-delete`,i.dataset.partnerName=t,i.title=t,i.style.display=`flex`,i.style.alignItems=`center`,i.style.justifyContent=`space-between`,i.style.textAlign=`left`,i.style.gap=`12px`;let a=document.createElement(`span`);a.textContent=t;let s=document.createElement(`button`);s.type=`button`,s.textContent=`×`,s.setAttribute(`aria-label`,`Delete partner`),s.style.border=`0`,s.style.background=`transparent`,s.style.color=`#94a3b8`,s.style.cursor=`pointer`,s.style.fontSize=`14px`,s.style.lineHeight=`1`,s.style.padding=`0 2px`,s.onclick=function(e){e.stopPropagation(),typeof window.confirmDeletePartnerFromDropdown==`function`&&window.confirmDeletePartnerFromDropdown(s,t)},i.appendChild(a),i.appendChild(s),i.onclick=function(){let e=i.closest(`.col-2`);if(!e)return;let n=e.querySelector(`.client-menu`),r=e.querySelector(`.field span`);r&&(r.textContent=t,r.title=t,r.classList.remove(`placeholder`)),n&&n.classList.add(`hidden`),typeof window.refreshReviewClientInfo==`function`&&window.refreshReviewClientInfo()},o.insertBefore(i,l||null),c.add(n)})};return(async()=>{let{data:r,error:i}=await e.from(`account_partners`).select(`id, partner_name`).eq(`account_id`,t?.id).order(`partner_name`,{ascending:!0});if(n){if(i){console.error(`Failed to load partners:`,i);return}a((r||[]).map(e=>e.partner_name))}})(),()=>{n=!1}},[t,b]),(0,K.useEffect)(()=>{let t=e=>String(e||``).trim().toLowerCase(),n=e=>String(e?.dataset?.partnerName||e?.textContent||``).replace(`×`,``).trim();return window.addPartnerOptionToMeasureDropdown=e=>{let r=document.querySelector(`.measure-page`);if(!r)return;let i=Array.from(r.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Partner`),a=i?i.closest(`.col-2`):null,o=a?a.querySelector(`.client-menu`):null;if(!o)return;let s=String(e||``).trim(),c=t(s);if(!s||Array.from(o.querySelectorAll(`.client-option`)).some(e=>t(n(e))===c))return;let l=Array.from(o.querySelectorAll(`.client-option`)).find(e=>e.textContent.trim()===`None`),u=document.createElement(`div`);u.className=`client-option partner-option-with-delete`,u.dataset.partnerName=s,u.title=s,u.style.display=`flex`,u.style.alignItems=`center`,u.style.justifyContent=`space-between`,u.style.textAlign=`left`,u.style.gap=`12px`;let d=document.createElement(`span`);d.textContent=s;let f=document.createElement(`button`);f.type=`button`,f.textContent=`×`,f.setAttribute(`aria-label`,`Delete partner`),f.style.border=`0`,f.style.background=`transparent`,f.style.color=`#94a3b8`,f.style.cursor=`pointer`,f.style.fontSize=`14px`,f.style.lineHeight=`1`,f.style.padding=`0 2px`,f.onclick=function(e){e.stopPropagation(),typeof window.confirmDeletePartnerFromDropdown==`function`&&window.confirmDeletePartnerFromDropdown(f,s)},u.appendChild(d),u.appendChild(f),u.onclick=function(){let e=u.closest(`.col-2`);if(!e)return;let t=e.querySelector(`.client-menu`),n=e.querySelector(`.field span`);n&&(n.textContent=s,n.title=s,n.classList.remove(`placeholder`)),t&&t.classList.add(`hidden`),typeof window.refreshReviewClientInfo==`function`&&window.refreshReviewClientInfo()},o.insertBefore(u,l||null)},window.removePartnerFromMeasureDropdown=e=>{let r=document.querySelector(`.measure-page`);if(!r)return;let i=t(String(e||``).trim()),a=Array.from(r.querySelectorAll(`.field-label`)).find(e=>e.textContent.trim()===`Partner`),o=a?a.closest(`.col-2`):null,s=o?o.querySelector(`.client-menu`):null,c=o?o.querySelector(`.field span`):null;s&&Array.from(s.querySelectorAll(`.client-option`)).forEach(e=>{t(n(e))===i&&e.remove()}),c&&t(c.textContent)===i&&(c.textContent=`Partner`,c.title=``,c.classList.add(`placeholder`))},window.deletePartnerFromSupabase=async t=>{let n=String(t||``).trim();if(!n)throw Error(`Partner name is required.`);let{error:r}=await e.rpc(`winco_remove_account_partner`,{p_name:n});if(r)throw r},window.confirmDeletePartnerFromDropdown=(e,t)=>{let n=String(t||``).trim();if(!n)return;let r=document.querySelector(`[data-partner-delete-modal]`);r&&r.remove();let i=document.createElement(`div`);i.dataset.partnerDeleteModal=`true`,i.style.position=`fixed`,i.style.inset=`0`,i.style.background=`rgba(15, 23, 42, 0.25)`,i.style.display=`flex`,i.style.alignItems=`center`,i.style.justifyContent=`center`,i.style.zIndex=`9999`;let a=document.createElement(`div`);a.style.width=`320px`,a.style.background=`#ffffff`,a.style.border=`1px solid #e2e8f0`,a.style.borderRadius=`12px`,a.style.boxShadow=`0 18px 45px rgba(15, 23, 42, 0.18)`,a.style.padding=`20px`,a.style.fontFamily=`inherit`;let o=document.createElement(`div`);o.textContent=`Delete partner "${n}"?`,o.style.fontSize=`14px`,o.style.color=`#0f172a`,o.style.marginBottom=`18px`;let s=document.createElement(`div`);s.style.display=`flex`,s.style.justifyContent=`center`,s.style.alignItems=`center`,s.style.gap=`10px`,s.style.width=`100%`;let c=document.createElement(`button`);c.type=`button`,c.textContent=`No`,c.className=`btn`,c.style.minWidth=`92px`,c.onclick=function(){i.remove()};let l=document.createElement(`button`);l.type=`button`,l.textContent=`Yes`,l.className=`btn btn-danger`,l.style.minWidth=`92px`,l.onclick=async function(){try{if(l.disabled=!0,c.disabled=!0,l.textContent=`Deleting...`,typeof window.deletePartnerFromSupabase==`function`&&await window.deletePartnerFromSupabase(n),typeof window.removePartnerFromMeasureDropdown==`function`)window.removePartnerFromMeasureDropdown(n);else if(e){let t=e.closest(`.client-option`);t&&t.remove()}i.remove()}catch(e){console.error(`Failed to delete partner:`,e),alert(`Failed to delete partner. Please try again.`),l.disabled=!1,c.disabled=!1,l.textContent=`Yes`}},s.appendChild(l),s.appendChild(c),a.appendChild(o),a.appendChild(s),i.appendChild(a),document.body.appendChild(i)},window.savePartnerToSupabase=async t=>{let n=String(t||``).trim();if(!n)throw Error(`Partner name is required.`);let{data:r,error:i}=await e.rpc(`winco_save_account_partner`,{p_name:n});if(i)throw i;if(!r?.id||!r.partner_name)throw Error(`Partner save was not confirmed.`);return window.addPartnerOptionToMeasureDropdown(r.partner_name),r},()=>{delete window.savePartnerToSupabase,delete window.addPartnerOptionToMeasureDropdown,delete window.deletePartnerFromSupabase,delete window.confirmDeletePartnerFromDropdown,delete window.removePartnerFromMeasureDropdown}},[t?.id]),(0,K.useEffect)(()=>{let e=document.createElement(`style`);return e.setAttribute(`data-partner-delete-modal-alignment-fix`,`true`),e.textContent=`
/* Partner delete modal alignment fix */

  .measure-page .partner-field-wrapper .client-menu .client-option {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    gap: 8px;
  }

  .measure-page .partner-field-wrapper .client-menu .partner-option-label {
    flex: 1;
    min-width: 0;
    text-align: left;
  }

  .measure-page .partner-delete-x {
    margin-left: auto;
    flex: 0 0 auto;
  }

  .measure-page .partner-delete-modal-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

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
    grid-template-columns: minmax(120px, 0.9fr) minmax(120px, 0.9fr) minmax(140px, 1fr) minmax(170px, 1.2fr) minmax(120px, 0.9fr);
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

`,document.head.appendChild(e),()=>{e.remove()}},[]),(0,K.useEffect)(()=>{let n=!0,r=0,i=async(i=!1)=>{let a=++r,o=String(t?.role||``).trim(),s=String(b||``).trim(),c=o===`Admin`||o===`Sales`,l=``;if(!c&&s){let{data:t,error:n}=await e.from(`accounts`).select(`dealer_level`).eq(`account_name`,s).limit(1);n?console.error(`Failed to load dealer level:`,n):l=String(t?.[0]?.dealer_level||``).trim().toUpperCase()}let{data:u,error:d}=await e.from(`fabrics`).select(`
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
        `).order(`product_group`,{ascending:!0}).order(`sort_order`,{ascending:!0,nullsFirst:!1}).order(`code`,{ascending:!0});if(!n||a!==r)return;if(d)return console.error(`Failed to load fabrics:`,d),i||(window.measureFabricItems=[]),!1;let f=e=>{if(c)return!0;let t=String(e||`Public`).trim().toLowerCase();return t===`public`?!0:l===`L1`?t===`access l1`:l===`L2`?t===`access l2`||t===`access l3`:!1};return window.measureFabricItems=(u||[]).filter(e=>f(e.visibility)).map(e=>({...e,fabric_colors:Array.isArray(e.fabric_colors)?e.fabric_colors.filter(e=>f(e.visibility)):[]})),window.refreshSelectedCatalogPrices?.(),window.refreshFabricMenusForGroup?.(void 0,{reconcile:!1}),!0};return window.reloadMeasureFabrics=i,i(),()=>{n=!1,window.reloadMeasureFabrics===i&&delete window.reloadMeasureFabrics}},[]),(0,K.useEffect)(()=>{let t=!0,n=0,r=async()=>{let r=++n;window.measureHardwareCatalogState=`loading`;let{data:i,error:a}=await e.from(`hardware_items`).select(`id, product_group, code, description, pricing_type, sort_order`).order(`product_group`,{ascending:!0}).order(`sort_order`,{ascending:!0,nullsFirst:!1}).order(`code`,{ascending:!0});if(!(!t||r!==n))return a?(console.error(`Failed to load hardware items:`,a),window.measureHardwareCatalogState=`error`,!1):(window.measureHardwareItems=(i||[]).map(xt.normalizeHardwareItem),window.measureHardwareCatalogState=`ready`,window.measurePricingCatalogState===`ready`&&!window.measureEditingQuoteId&&window.refreshCordlessTypeMenusForGroup?.(),window.refreshSelectedCatalogPrices?.(),!0)};return window.reloadMeasureHardware=r,r(),()=>{t=!1,window.reloadMeasureHardware===r&&delete window.reloadMeasureHardware}},[]),(0,K.useEffect)(()=>{let t=!0,n=0,r=async()=>{let r=++n;window.measureHardwareColorsState=`loading`;let{data:i,error:a}=await e.from(`hardware_colors`).select(`id, hardware_id, color_code, color_description, visibility`).order(`color_code`,{ascending:!0});if(!(!t||r!==n))return a?(console.error(`Failed to load hardware colors:`,a),window.measureHardwareColorsState=`error`,!1):(window.measureHardwareColors=i||[],window.measureHardwareColorsState=`ready`,window.measurePricingCatalogState===`ready`&&!window.measureEditingQuoteId&&window.refreshCordlessTypeMenusForGroup?.(),!0)};return window.reloadMeasureHardwareColors=r,r(),()=>{t=!1,window.reloadMeasureHardwareColors===r&&delete window.reloadMeasureHardwareColors}},[]),(0,K.useEffect)(()=>{let t=!0,n=()=>{let e=document.querySelector(`.measure-page .page`);if(!e)return;let t=e.querySelector(`[data-pricing-status]`);if(t||(t=document.createElement(`div`),t.dataset.pricingStatus=``,t.className=`measure-pricing-status`,t.setAttribute(`role`,`status`),e.querySelector(`.meta`).after(t)),t.replaceChildren(),t.hidden=window.measurePricingCatalogState===`ready`||window.measureCatalogRefreshBusy,t.hidden)return;let n=document.createElement(`span`);if(n.textContent=window.measurePricingCatalogState===`loading`||window.measureCatalogRefreshBusy?`Loading prices…`:`Prices could not be loaded. Retry before saving.`,t.append(n),window.measurePricingCatalogState===`error`){let e=document.createElement(`button`);e.type=`button`,e.className=`btn`,e.textContent=`Retry prices`,e.onclick=()=>window.reloadMeasureCatalogs?.(),t.append(e)}},r=0,i=async(i=!1)=>{let a=++r;window.measurePricingCatalogState=`loading`,i||(window.measurePricingOptionItems=[],window.measurePricingMotorItems=[],window.measurePricingCordlessTypeItems=[],window.measurePricingAccessoryItems=[],window.measurePricingRateTables=[]),n();try{let n=await P(e);if(!t||a!==r)return;let i=e=>n.items.filter(t=>t.category===e&&t.is_active!==!1);window.measurePricingOptionItems=i(`Option`),window.measurePricingMotorItems=i(`Motor`),window.measurePricingCordlessTypeItems=i(`Cordless Type`),window.measurePricingAccessoryItems=i(`Accessory`),window.measurePricingRateTables=n.rates,window.measurePricingCatalogState=`ready`,window.measurePricingCatalogRevision=n.revision,window.refreshAccessoryPricingMenus?.(),window.measureEditingQuoteId||window.refreshCordlessTypeMenusForGroup?.(),window.refreshOpenMotorMenus?.(),window.refreshSelectedCatalogPrices?.(),window.updateAllWindowPricing?.()}catch(e){if(!t||a!==r)return;window.measurePricingCatalogState=`error`,console.error(`Failed to load pricing catalog`,e)}return t&&n(),window.measurePricingCatalogState===`ready`};return window.reloadMeasurePricing=i,window.updateMeasurePricingStatus=n,i(),()=>{t=!1,window.reloadMeasurePricing===i&&delete window.reloadMeasurePricing,window.updateMeasurePricingStatus===n&&delete window.updateMeasurePricingStatus}},[]),(0,K.useEffect)(()=>{let t=!0,n=0,r=async()=>{let r=++n,{data:i,error:a}=await e.from(`control_items`).select(`id, product_group, code, control_type, pricing_type, visibility, sort_order`).order(`sort_order`,{ascending:!0,nullsFirst:!1}).order(`control_type`,{ascending:!0});if(!(!t||r!==n))return a?(console.error(`Failed to load motorized control items:`,a),!1):(window.measureControlItems=i||[],document.querySelectorAll(`[data-cordless-type-section]`).forEach(e=>{let t=e.querySelector(`.client-menu`);t&&!t.classList.contains(`hidden`)&&window.renderCordlessTypeMenu?.(e)}),document.querySelectorAll(`[data-motor-menu]`).forEach(e=>{if(!e.classList.contains(`hidden`)){let t=e.closest(`[data-motor-section]`);t&&typeof window.renderMotorMenu==`function`&&window.renderMotorMenu(t)}}),!0)};return window.reloadMeasureControls=r,r(),()=>{t=!1,window.reloadMeasureControls===r&&delete window.reloadMeasureControls}},[]),(0,K.useEffect)(()=>{let e=!1,n=N(async()=>{if(e||window.measureCurrentAccountId!==t.id)return;window.measureCatalogRefreshBusy=!0,window.updateMeasurePricingStatus?.();let n=[window.reloadMeasurePricing,window.reloadMeasureFabrics,window.reloadMeasureControls,window.reloadMeasureHardware,window.reloadMeasureHardwareColors].filter(Boolean),r=await Promise.allSettled(n.map(e=>e(!0)));e||window.measureCurrentAccountId!==t.id||(window.measureCatalogRefreshBusy=!1,r.some(e=>e.status===`rejected`||e.value===!1)&&(window.measurePricingCatalogState=`error`),window.updateMeasurePricingStatus?.(),window.saveMeasureDraftState?.())},{busy:()=>window.measureSaveBusy||window.measureNewQuoteResetBusy});return window.reloadMeasureCatalogs=n.refresh,()=>{e=!0,n.dispose(),window.measureCatalogRefreshBusy=!1,window.reloadMeasureCatalogs===n.refresh&&delete window.reloadMeasureCatalogs}},[t.id]),(0,K.useEffect)(()=>{let a=x.editingQuoteId,y=!1,C,w=!1,T=document.querySelector(`.measure-page`),E=()=>{let e=T;!e||y||window.measureCurrentAccountId!==t.id||w&&i(window,t.id,ze(e),window.measureEditingQuoteId||``,window.measureEditingRevision||``)},te=()=>{E(),window.clearTimeout(C),C=window.setTimeout(E,0)};window.saveMeasureDraftState=E;let ne=()=>{s(window,t.id),r(window,t.id)};window.clearMeasureDraftState=ne;let D=()=>p({window,document,accountId:t.id,saveDraft:E,captureDraft:()=>w&&ze(T),verifyDraft:e=>o(window,t.id,e)});window.wincoPrepareAppUpdate=D;let O=()=>{document.visibilityState===`hidden`&&E()};window.addEventListener(`pagehide`,E),document.addEventListener(`visibilitychange`,O);let k=()=>{let e=document.querySelector(`.measure-page`);return e?([`input`,`change`,`keyup`,`click`,`focusout`].forEach(t=>{e.addEventListener(t,te,!1)}),()=>{[`input`,`change`,`keyup`,`click`,`focusout`].forEach(t=>{e.removeEventListener(t,te,!1)})}):()=>{}};document.querySelectorAll(`script[data-winco-measure-page="true"]`).forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)});let A=document.createElement(`script`),j=document.createElement(`div`);j.innerHTML=Ue,window.measureBlankWindowTemplate=j.querySelector(`.window-head`).closest(`.card`).cloneNode(!0),window.measureWindowHistory=Tt(()=>Array.from(document.querySelectorAll(`.measure-page .window-head`)).map(e=>e.closest(`.card`)),()=>document.querySelector(`.measure-page .actions`)),A.type=`text/javascript`,A.dataset.wincoMeasurePage=`true`,window.wincoDependencies=xt,window.wincoPricing={bracketPrice:se,rateTable:oe,motorCatalog:ie,findMotorPricingItem:ae},window.wincoDuo=he,window.wincoQuantities={quantity:S,read:m,sync:v,change:_,issues:ee},window.wincoConfiguration=Ae,window.wincoSplits={sync:be,clear:ye,issues:ve};let M;try{M=window.sessionStorage}catch{}window.overwriteMeasureQuote=At(e,void 0,{storage:M,storageKey:`wincoQuoteOverwrite::`+t.id,accountId:t.id}),window.measureClientRows=[],window.measureClientGeneration=(window.measureClientGeneration||0)+1,window.measureClientFilteredRows=[],window.measureClientRowsLoading=!1,window.measureClientRowsLoaded=!1,window.createMeasureQuote=Mt(e,{storage:M,storageKey:`wincoQuoteCreate::`+encodeURIComponent(t?.id||b),accountId:t.id});let N={active:!0,create:window.createMeasureQuote,overwrite:window.overwriteMeasureQuote};window.measureSaveContext=N,window.measureSaveBusy=!1,window.measureNewQuoteResetBusy=!1,A.text=`window.currentMeasureUserRole = ${JSON.stringify(t?.role||``)};\nwindow.currentMeasureAccountName = ${JSON.stringify(b)};\n`+We;let re=ue(window);window.measurePageLifetime=re,document.body.appendChild(A);let P=window.cleanupMeasureDocumentEvents,ce=l(document.querySelector(`.measure-page`),{onOpenMainPage:n,onOpenMeasurePage:c,onOpenQuotesPage:u,onOpenOrdersPage:d,onOpenClientsPage:f,onOpenResourcesPage:h,onOpenAdminPage:g},{beforeNavigate:()=>{Ke(),E()}}),F=k(),le=Dt(document.querySelector(`.measure-page`)),I=Ot(document.querySelector(`.measure-page`)),L=He(),de=async n=>{let r=String(n||``).trim();if(!r)return;delete window.measureEditingRevision;let i;try{i=await jt(e,r)}catch(e){if(y)return;console.error(`Could not load complete quote for editing`,e),alert(`Could not load the complete quote. Please reopen it before overwriting.`);return}y||window.measureCurrentAccountId!==t.id||window.measureEditingQuoteId!==r||(window.measureEditingRevision=i.revision,L(i))},fe=window.setTimeout(async()=>{typeof window.initMeasurePage==`function`&&window.initMeasurePage();try{if(x.loadQuote?await de(a):(x.data||x.html)&&Be(T,x.data||Ve(document,x.html),L,window),y)return;w=!0,E()}catch(e){console.error(`Could not restore Measure draft`,e);let t=document.createElement(`p`);t.setAttribute(`role`,`alert`),t.textContent=`Could not restore this draft. Please reload before continuing. Your saved draft has been kept.`,T.prepend(t),T.querySelector(`.app`)?.setAttribute(`inert`,``)}y||r(window,t.id)},0),pe=kt(document.querySelector(`.measure-page`),e=>{window.selectUnit(e),E()});return()=>{Ke(),E(),y=!0,N.active=!1,window.measureSaveContext===N&&(window.measureSaveBusy=!1,window.measureNewQuoteResetBusy=!1),window.clearTimeout(C),window.saveMeasureDraftState===E&&delete window.saveMeasureDraftState,window.clearMeasureDraftState===ne&&delete window.clearMeasureDraftState,window.wincoPrepareAppUpdate===D&&delete window.wincoPrepareAppUpdate,window.removeEventListener(`pagehide`,E),document.removeEventListener(`visibilitychange`,O),window.measureClientGeneration+=1,typeof ce==`function`&&ce(),typeof F==`function`&&F(),re.dispose(),le(),I(),typeof P==`function`&&P(),window.cleanupMeasureDocumentEvents===P&&delete window.cleanupMeasureDocumentEvents,window.clearTimeout(fe),pe(),A.parentNode&&A.parentNode.removeChild(A)}},[]),(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`div`,{className:`measure-page`,"data-screen-mode":`newQuote`,dangerouslySetInnerHTML:{__html:C}}),(0,$.jsx)(wt,{})]})}export{Nt as default};