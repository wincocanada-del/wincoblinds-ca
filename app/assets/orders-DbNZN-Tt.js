import{n as e,r as t}from"./supabaseClient-CdMXQqVK.js";import{t as n}from"./jsx-runtime-C8sGzQnj.js";import{n as r}from"./pageNavigation-DlFtvZyK.js";import{t as i}from"./adminEditExit-CuqED_6G.js";import{n as a,t as o}from"./OrderDetail-C46FeW6l.js";import{t as s}from"./documentLists-tCgNg5Z0.js";function c(e,{accountId:t,orderId:n,initial:r=``,onState:i=()=>{}}){let a=String(r??``),o=a,s=null,c=!0,l=``,u=null,d=()=>({editing:!!u||o!==a,dirty:!!u||o!==a,busy:!!s,token:JSON.stringify([a,o,l]),confirmed:a,desired:o,error:l}),f=()=>{c&&i(d())},p=()=>c?s||(o===a&&!u?(l=``,f(),Promise.resolve(!0)):(s=Promise.resolve().then(async()=>{try{for(;c&&(u||o!==a);){u||={expected:a,note:o};let r=u.note,{data:i,error:s}=await e.rpc(`winco_save_order_note`,{p_account_id:t,p_order_id:n,p_expected:u.expected,p_note:r});if(!c)return!1;if(s)throw Error(s.message||`Unable to save the note.`);if(i?.id!==n||i.note_po!==r)throw Error(`The note save was not confirmed. Try again.`);a=r,u=null,l=``}return c}catch(e){return l=e.message||`Unable to save the note. Try again.`,!1}finally{s=null,f()}}),f(),s)):Promise.resolve(!1);return{getState:d,save:p,settle:p,setValue(e){c&&(o=String(e??``),l=``,f())},discard(){s||(o=a,u=null,l=``,f())},dispose(){c=!1}}}var l=t(),u=n(),d=`<div class="app-preview">
    <div class="ipad-stage">
      <div class="app-frame">
        <nav class="topbar">
          <div class="topbar-inner">
            <div class="topbar-left">
              <div class="nav-item account" data-account-home-link>Charles / Winco</div>
              <div class="nav-separator">|</div>
              <div class="nav-item">Measure</div>
              <div class="nav-item">Quotes</div>
              <div class="nav-item current">Orders</div>
              <div class="nav-item">Clients</div>
              <div class="nav-item">Resources</div>
              <div class="nav-item">Admin</div>
            </div>
            <div class="topbar-actions"></div>
          </div>
        </nav>

        <main class="page-shell">
          <section class="page-blank">
            <div class="orders-shell">
              <div class="orders-header">
                <div class="orders-title">Orders</div>
                <div class="orders-header-tools">
                  __ORDER_DELETE_BUTTON__
                  <div class="orders-search">
                    <input type="text" placeholder="Search" data-orders-search-input />
                    <button type="button" class="orders-search-clear hidden" data-orders-search-clear aria-label="Clear search">×</button>
                  </div>
                </div>
              </div>

              <div class="orders-table">
                <div class="orders-table-head">
                  <div class="orders-cell orders-check-cell"></div>
                  <div class="orders-cell">
                    <span class="orders-sort-button">Order # <span class="orders-sort-arrow">▾</span></span>
                  </div>
                  <div class="orders-cell">
                    <div class="orders-head-filter active" onclick="toggleOrdersAccountFilter(event)">
                      <span data-account-filter-label>Partner</span>
                      <span class="orders-sort-arrow">▾</span>
                      <div class="orders-filter-menu" data-orders-partner-filter-menu>
                        <div class="orders-filter-option current" onclick="selectOrdersAccountFilter(event, 'All Account')">All Partner</div>
                      </div>
                    </div>
                  </div>
                  <div class="orders-cell">Name</div>
                  <div class="orders-cell">Project / Tag</div>
                  <div class="orders-cell">Product</div>
                  <div class="orders-cell">Qty</div>
                  <div class="orders-cell">Total Price</div>
                  <div class="orders-cell">
                    <div class="orders-head-filter active" onclick="toggleOrdersFilter(event)">
                      <span data-status-filter-label>Status</span>
                      <span class="orders-sort-arrow">▾</span>
                      <div class="orders-filter-menu">
                        <div class="orders-filter-option current" onclick="selectOrdersFilter(event, 'All Status')">All Status</div>
                        <div class="orders-filter-option" onclick="selectOrdersFilter(event, 'Ordered')">Ordered</div>
                        <div class="orders-filter-option" onclick="selectOrdersFilter(event, 'Completed')">Completed</div>
                        <div class="orders-filter-option" onclick="selectOrdersFilter(event, 'Cancelled')">Cancelled</div>
                      </div>
                    </div>
                  </div>
                  <div class="orders-cell orders-note-head">Note / PO #</div>
                </div>

                <div data-orders-rows></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>

  __ORDER_DELETE_CONFIRM__`,f=`function toggleOrdersFilter(event) {
      event.stopPropagation();
      const filter = event.currentTarget;
      const isOpen = filter.classList.contains('open');
      closeOrdersFilters();
      if (!isOpen) filter.classList.add('open');
    }

    function closeOrdersFilters() {
      document.querySelectorAll('.orders-head-filter.open').forEach(function (filter) {
        filter.classList.remove('open');
      });
    }

    function updateOrdersSearchClear() {
      const input = document.querySelector('[data-orders-search-input]');
      const clearBtn = document.querySelector('[data-orders-search-clear]');
      if (!input || !clearBtn) return;
      const hasValue = input.value.trim() !== '';
      clearBtn.classList.toggle('hidden', !hasValue);
    }

    function getOrdersSearchValue() {
      const input = document.querySelector('[data-orders-search-input]');
      return input ? input.value.trim().toLowerCase() : '';
    }

    function getCurrentOrdersStatusValue() {
      const label = document.querySelector('[data-status-filter-label]');
      const value = label ? label.textContent.trim() : 'Status';
      return value === 'Status' ? 'All Status' : value;
    }

    function getCurrentOrdersAccountValue() {
      const current = document.querySelector('.orders-head-filter [data-account-filter-label]')
        ? document.querySelector('.orders-head-filter [data-account-filter-label]').textContent.trim()
        : 'Partner';
      return current === 'Partner' ? 'All Account' : current;
    }

    function applyOrdersFilters(statusValue, accountValue) {
      const normalizedStatus = String(statusValue || 'All Status').toLowerCase();
      const normalizedAccount = String(accountValue || 'All Account').toLowerCase();
      const searchValue = getOrdersSearchValue();

      document.querySelectorAll('.orders-row').forEach(function (row) {
        const rowStatus = String(row.dataset.status || '').toLowerCase();
        const rowAccount = String(row.dataset.account || '').toLowerCase();
        const rowSearch = String(row.dataset.search || '').toLowerCase();

        const statusMatch = normalizedStatus === 'all status' || rowStatus === normalizedStatus;
        const accountMatch = normalizedAccount === 'all account' || rowAccount === normalizedAccount;
        const searchMatch = searchValue === '' || rowSearch.includes(searchValue);
        const shouldShow = statusMatch && accountMatch && searchMatch;

        row.style.display = shouldShow ? 'grid' : 'none';
      });

      updateOrdersSearchClear();
      const ordersRoot = document.querySelector('.orders-page');
      if (ordersRoot) ordersRoot.dispatchEvent(new Event('ordersfilterchange'));
    }

    function syncOrderRowStatuses() {
      document.querySelectorAll('.orders-row').forEach(function (row) {
        const select = row.querySelector('[data-order-row-status]');
        if (!select) return;
        const value = String(select.value || 'ordered').toLowerCase();
        row.dataset.status = value;
        select.classList.remove('status-ordered', 'status-completed', 'status-cancelled');
        select.classList.add(value === 'completed' ? 'status-completed' : value === 'cancelled' ? 'status-cancelled' : 'status-ordered');
      });
    }

    function selectOrdersFilter(event, value) {
      event.stopPropagation();
      const option = event.currentTarget;
      const filter = option.closest('.orders-head-filter');
      if (!filter) return;

      filter.querySelectorAll('.orders-filter-option').forEach(function (item) {
        item.classList.remove('current');
      });
      option.classList.add('current');

      const label = filter.querySelector('[data-status-filter-label]');
      if (label) {
        label.textContent = value === 'All Status' ? 'Status' : value;
      }

      applyOrdersFilters(value, getCurrentOrdersAccountValue());
      closeOrdersFilters();
    }

    function selectOrdersAccountFilter(event, value) {
      event.stopPropagation();
      const option = event.currentTarget;
      const filter = option.closest('.orders-head-filter');
      if (!filter) return;

      filter.querySelectorAll('.orders-filter-option').forEach(function (item) {
        item.classList.remove('current');
      });
      option.classList.add('current');

      const label = filter.querySelector('[data-account-filter-label]');
      if (label) {
        label.textContent = value === 'All Account' ? 'Partner' : value;
      }

      applyOrdersFilters(getCurrentOrdersStatusValue(), value);
      closeOrdersFilters();
    }

    function toggleOrdersAccountFilter(event) {
      event.stopPropagation();
      const filter = event.currentTarget;
      const isOpen = filter.classList.contains('open');
      closeOrdersFilters();
      if (!isOpen) filter.classList.add('open');
    }

    window.initOrdersPage = function initOrdersPage() {
      console.assert(document.querySelector('.orders-head-filter'), 'Status filter should exist.');
      console.assert(document.querySelector('.orders-sort-button'), 'An order sort indicator should exist.');
      syncOrderRowStatuses();
      applyOrdersFilters('All Status', 'All Account');


      const searchInput = document.querySelector('[data-orders-search-input]');
      const clearBtn = document.querySelector('[data-orders-search-clear]');

      if (searchInput) {
        searchInput.oninput = function () {
          applyOrdersFilters(getCurrentOrdersStatusValue(), getCurrentOrdersAccountValue());
        };
      }

      if (clearBtn && searchInput) {
        clearBtn.onclick = function () {
          searchInput.value = '';
          applyOrdersFilters(getCurrentOrdersStatusValue(), getCurrentOrdersAccountValue());
          searchInput.focus();
        };
      }
};`;function p({currentUser:t,initialOrderId:n=null,onOpenMainPage:p,onOpenMeasurePage:m,onOpenQuotesPage:h,onOpenOrdersPage:g,onOpenClientsPage:_,onOpenResourcesPage:v,onOpenAdminPage:y}){let[b,x]=(0,l.useState)(n),S=t?.role===`Admin`||t?.role===`Sales`,C=t?.role===`Admin`,w=t?.account_name||`Charles / Winco`,T=C?`<button type="button" data-order-delete-button disabled style="height:38px;padding:0 18px;border:1px solid #d7dce5;border-radius:10px;background:#ffffff;color:#9aa4b5;font-size:14px;font-weight:600;cursor:not-allowed;">Delete</button>`:``,E=C?`<div data-order-delete-confirm style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,0.36);align-items:center;justify-content:center;padding:24px;"><div role="dialog" aria-modal="true" aria-labelledby="orderDeleteConfirmTitle" style="width:min(460px,100%);background:#fff;border-radius:18px;padding:24px;box-shadow:0 20px 60px rgba(15,23,42,0.22);"><div id="orderDeleteConfirmTitle" style="font-size:20px;font-weight:700;color:#172033;margin-bottom:10px;">Delete order?</div><div data-order-delete-confirm-text style="font-size:14px;line-height:1.55;color:#536176;margin-bottom:22px;">Are you sure you want to delete the selected order?</div><div style="display:flex;justify-content:flex-end;gap:10px;"><button type="button" data-order-delete-no style="height:38px;padding:0 18px;border:1px solid #d7dce5;border-radius:10px;background:#fff;color:#344054;font-weight:600;cursor:pointer;">No</button><button type="button" data-order-delete-yes style="height:38px;padding:0 18px;border:1px solid #c83b3b;border-radius:10px;background:#c83b3b;color:#fff;font-weight:600;cursor:pointer;">Yes</button></div></div></div>`:``,D=d.replace(`__ORDER_DELETE_BUTTON__`,T).replace(`__ORDER_DELETE_CONFIRM__`,E).replace(`<div class="orders-cell orders-check-cell"></div>`,C?`<div class="orders-cell orders-check-cell"><input type="checkbox" data-order-select-all aria-label="Select all visible orders" disabled /></div>`:`<div class="orders-cell orders-check-cell"></div>`).replace(`Charles / Winco`,w).replace(`<div class="nav-item">Admin</div>`,S?`<div class="nav-item">Admin</div>`:``).replace(`<div class="main-nav-item current">Admin</div>`,S?`<div class="main-nav-item current">Admin</div>`:``).replace(`<div class="main-nav-item">Admin</div>`,S?`<div class="main-nav-item">Admin</div>`:``);return(0,l.useEffect)(()=>{if(b)return;let n=!0,r=e=>String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`),i=e=>Number(e||0).toLocaleString(`en-CA`,{style:`currency`,currency:`CAD`,minimumFractionDigits:2,maximumFractionDigits:2});function a(e){let t=document.querySelector(`.orders-page [data-orders-partner-filter-menu]`);if(!t)return;let n=[...new Set((e||[]).map(e=>String(e?.partner||``).trim()).filter(Boolean))];t.innerHTML=``;let r=document.createElement(`div`);r.className=`orders-filter-option current`,r.textContent=`All Partner`,r.addEventListener(`click`,e=>{typeof window.selectOrdersAccountFilter==`function`&&window.selectOrdersAccountFilter(e,`All Account`)}),t.appendChild(r),n.forEach(e=>{let n=document.createElement(`div`);n.className=`orders-filter-option`,n.textContent=e,n.addEventListener(`click`,t=>{typeof window.selectOrdersAccountFilter==`function`&&window.selectOrdersAccountFilter(t,e)}),t.appendChild(n)})}async function o(){let o=document.querySelector(`.orders-page [data-orders-rows]`);if(!o)return;o.innerHTML=`<div class="orders-empty-row">Loading orders...</div>`;let c;try{c=await s(e,t,()=>n)}catch(e){n&&(o.textContent=e.message);return}if(!n)return;a(c);let l=c||[];if(l.some(e=>e.list_summary?.valid!==!0)){o.innerHTML=`<div class="orders-empty-row">Saved order details are unavailable. Please reload or contact an administrator.</div>`;return}if(!l.length){o.innerHTML=`<div class="orders-empty-row">No orders found.</div>`;return}o.innerHTML=l.map(e=>{let t=e.list_summary,n=e.order_number||`-`,a=e.partner||`-`,o=e.client||`-`,s=t.tag,c=t.product,l=t.qty,u=i(t.final_total),d=String(e.status||`Ordered`).trim()||`Ordered`,f=d.toLowerCase(),p=String(e.partner||``).trim().toLowerCase(),m=[n,t.quote_number,a,o,s,c,l,t.final_total,d].filter(Boolean).join(` `),h=C?`<div class="orders-cell orders-check-cell"><input type="checkbox" data-order-delete-select aria-label="Select order ${r(n)}" /></div>`:`<div class="orders-cell orders-check-cell"></div>`;return`
          <div class="orders-row" data-order-id="${r(e.id)}" data-status="${r(f)}" data-account="${r(p)}" data-search="${r(m)}">
            ${h}
            <div class="orders-cell" data-mobile-label="Order #"><span class="orders-order-id">${r(n)}</span></div>
            <div class="orders-cell" data-mobile-label="Partner">${r(a)}</div>
            <div class="orders-cell" data-mobile-label="Name">${r(o)}</div>
            <div class="orders-cell" data-mobile-label="Project / Tag">${r(s)}</div>
            <div class="orders-cell" data-mobile-label="Product">${r(c)}</div>
            <div class="orders-cell" data-mobile-label="Qty">${r(l)}</div>
            <div class="orders-cell total" data-mobile-label="Total Price">${r(u)}</div>
            ${C?`<div class="orders-cell status" data-mobile-label="Status"><span class="orders-status-field"><select class="orders-status-select ${f===`completed`?`status-completed`:f===`cancelled`?`status-cancelled`:`status-ordered`}" data-order-row-status ${C?``:`disabled`}><option value="ordered" ${f===`ordered`?`selected`:``}>Ordered</option><option value="completed" ${f===`completed`?`selected`:``}>Completed</option><option value="cancelled" ${f===`cancelled`?`selected`:``}>Cancelled</option></select></span></div>`:`<div class="orders-cell status" data-mobile-label="Status"><span class="orders-status-label status-${r(f)}">${r(d)}</span></div>`}
            <div class="orders-cell orders-note-cell" data-mobile-label="Note / PO #"><input class="orders-note-field" type="text" value="${r(e.note_po||``)}" placeholder="Note / PO #" data-order-note /></div>
          </div>
        `}).join(``),typeof window.initOrdersPage==`function`&&window.initOrdersPage()}let c=window.setTimeout(()=>{o()},0);return()=>{n=!1,window.clearTimeout(c)}},[t,b,C]),(0,l.useEffect)(()=>{if(b)return;let e=document.createElement(`script`);e.type=`text/javascript`,e.dataset.wincoOrdersPageV2=`true`,e.text=f,document.body.appendChild(e);let t=e=>document.querySelectorAll(`.orders-page .orders-head-filter.open`).forEach(t=>{t.contains(e.target)||t.classList.remove(`open`)});document.addEventListener(`click`,t);let n=window.setTimeout(()=>{typeof window.initOrdersPage==`function`&&window.initOrdersPage()},0);return()=>{document.removeEventListener(`click`,t),window.clearTimeout(n),e.parentNode&&e.parentNode.removeChild(e),window.initOrdersPage&&delete window.initOrdersPage}},[b]),(0,l.useEffect)(()=>{if(b)return;let n=document.querySelector(`.orders-page`);if(!n)return;let r=async t=>{let n=t.target.closest(`[data-order-row-status]`);if(!n||!C||n.disabled)return;let r=n.closest(`.orders-row`),i=r?.dataset.orderId;if(!r||!i)return;let o=String(r.dataset.status||`ordered`).toLowerCase(),s=String(n.value||`ordered`).toLowerCase(),c=s===`completed`?`Completed`:s===`cancelled`?`Cancelled`:`Ordered`;n.classList.remove(`status-ordered`,`status-completed`,`status-cancelled`),n.classList.add(s===`completed`?`status-completed`:s===`cancelled`?`status-cancelled`:`status-ordered`),n.disabled=!0;try{await a(e,[i],`status`,c),r.dataset.status=s,window.applyOrdersFilters?.(window.getCurrentOrdersStatusValue?.(),window.getCurrentOrdersAccountValue?.())}catch(e){console.error(`Failed to update order status:`,e),r.dataset.status=o,n.value=o,n.classList.remove(`status-ordered`,`status-completed`,`status-cancelled`),n.classList.add(o===`completed`?`status-completed`:o===`cancelled`?`status-cancelled`:`status-ordered`),alert(e.message)}finally{n.disabled=!1}},o=new Map,s=n=>{let r=n.closest(`.orders-row`)?.dataset.orderId;return r?(o.has(r)||o.set(r,c(e,{accountId:t.id,orderId:r,initial:n.defaultValue,onState:e=>{n.isConnected&&(n.title=e.error||(e.busy?`Saving note…`:``),n.setCustomValidity(e.error),n.setAttribute(`aria-invalid`,String(!!e.error)),e.dirty||(n.value=e.confirmed))}})),o.get(r)):null},l=e=>{let t=e.target.closest(`[data-order-note]`);t&&s(t)?.setValue(t.value)},u=async e=>{let t=e.target.closest(`[data-order-note]`);if(!t)return;let n=s(t);n&&(n.setValue(t.value),!await n.save()&&t.isConnected&&t.reportValidity())},d=e=>{let t=e.target.closest(`[data-order-note]`);!t||e.key!==`Enter`||(e.preventDefault(),t.blur())};n.addEventListener(`change`,r),n.addEventListener(`input`,l),n.addEventListener(`change`,u),n.addEventListener(`blur`,u,!0),n.addEventListener(`keydown`,d);let f=i(n,()=>[...o.values()],{selector:`.topbar-left .nav-item:not(.current),.orders-row,[data-order-delete-button]`,shouldIntercept:(e,t)=>!t.matches(`.orders-row`)||!e.target.closest(`input,select,button`)});return()=>{n.removeEventListener(`change`,r),n.removeEventListener(`input`,l),n.removeEventListener(`change`,u),n.removeEventListener(`blur`,u,!0),n.removeEventListener(`keydown`,d),f(),o.forEach(e=>e.dispose())}},[b,C,t]),(0,l.useEffect)(()=>{if(b||!C)return;let t=document.querySelector(`.orders-page`);if(!t)return;let n=t.querySelector(`[data-order-delete-button]`),r=t.querySelector(`[data-order-select-all]`),i=document.querySelector(`[data-order-delete-confirm]`),o=document.querySelector(`[data-order-delete-confirm-text]`),s=document.querySelector(`[data-order-delete-no]`),c=document.querySelector(`[data-order-delete-yes]`),l=()=>Array.from(t.querySelectorAll(`.orders-row[data-order-id]`)).filter(e=>!!e.querySelector(`[data-order-delete-select]`)?.checked),u=()=>Array.from(t.querySelectorAll(`.orders-row[data-order-id]`)).filter(e=>e.style.display!==`none`),d=()=>{if(r){let e=u(),t=e.filter(e=>e.querySelector(`[data-order-delete-select]`)?.checked).length;r.disabled=e.length===0,r.checked=e.length>0&&t===e.length,r.indeterminate=t>0&&t<e.length}if(!n)return;let e=l().length>0;n.disabled=!e,n.style.color=e?`#b42318`:`#9aa4b5`,n.style.borderColor=e?`#f0b8b4`:`#d7dce5`,n.style.background=e?`#fff7f6`:`#ffffff`,n.style.cursor=e?`pointer`:`not-allowed`},f=()=>{i&&(i.style.display=`none`)},p=e=>{if(e.target.closest(`[data-order-select-all]`)){u().forEach(t=>{let n=t.querySelector(`[data-order-delete-select]`);n&&(n.checked=e.target.checked)}),d();return}e.target.closest(`[data-order-delete-select]`)&&d()},m=()=>{let e=l();!e.length||n?.disabled||(o&&(o.textContent=e.length===1?`Are you sure you want to delete the selected order?`:`Are you sure you want to delete these ${e.length} orders?`),i&&(i.style.display=`flex`))},h=e=>{e.target===i&&f()},g=async()=>{let n=l(),r=n.map(e=>String(e.dataset.orderId||``).trim()).filter(Boolean);if(!r.length||!c){f();return}c.disabled=!0,c.textContent=`Deleting...`;try{await a(e,r,`delete`),n.forEach(e=>e.remove());let i=t.querySelectorAll(`.orders-row[data-order-id]`),o=t.querySelector(`[data-orders-rows]`);!i.length&&o&&(o.innerHTML=`<div class="orders-empty-row">No orders found.</div>`),f(),d()}catch(e){console.error(`Failed to delete order:`,e),alert(e.message)}finally{c.disabled=!1,c.textContent=`Yes`}};return t.addEventListener(`change`,p),t.addEventListener(`ordersfilterchange`,d),n?.addEventListener(`click`,m),s?.addEventListener(`click`,f),c?.addEventListener(`click`,g),i?.addEventListener(`click`,h),d(),()=>{t.removeEventListener(`change`,p),t.removeEventListener(`ordersfilterchange`,d),n?.removeEventListener(`click`,m),s?.removeEventListener(`click`,f),c?.removeEventListener(`click`,g),i?.removeEventListener(`click`,h)}},[C,b]),(0,l.useEffect)(()=>{let e=document.querySelector(`.orders-page`);if(!e||b)return;let t=e=>{if(e.target.closest(`[data-order-row-status], [data-order-note], button, input, select, textarea`))return;let t=e.target.closest(`.orders-row`),n=t?.dataset.orderId;!t||!n||x(n)};return e.addEventListener(`click`,t),()=>{e.removeEventListener(`click`,t)}},[b]),(0,l.useEffect)(()=>{if(b)return;let e=document.querySelector(`.orders-page`);if(e)return r(e,{onOpenMainPage:p,onOpenMeasurePage:m,onOpenQuotesPage:h,onOpenOrdersPage:g,onOpenClientsPage:_,onOpenResourcesPage:v,onOpenAdminPage:y},{})},[p,m,h,g,_,v,y,b]),b?(0,u.jsx)(`div`,{className:`orders-page`,children:(0,u.jsx)(`div`,{className:`app-preview`,children:(0,u.jsx)(`div`,{className:`ipad-stage`,children:(0,u.jsxs)(`div`,{className:`app-frame`,children:[(0,u.jsx)(`nav`,{className:`topbar`,children:(0,u.jsxs)(`div`,{className:`topbar-inner`,children:[(0,u.jsxs)(`div`,{className:`topbar-left`,children:[(0,u.jsx)(`div`,{className:`nav-item account`,onClick:p,style:{cursor:p?`pointer`:void 0},children:w}),(0,u.jsx)(`div`,{className:`nav-separator`,children:`|`}),(0,u.jsx)(`div`,{className:`nav-item`,onClick:m,style:{cursor:m?`pointer`:void 0},children:`Measure`}),(0,u.jsx)(`div`,{className:`nav-item`,onClick:h,style:{cursor:h?`pointer`:void 0},children:`Quotes`}),(0,u.jsx)(`div`,{className:`nav-item current`,onClick:g,style:{cursor:g?`pointer`:void 0},children:`Orders`}),(0,u.jsx)(`div`,{className:`nav-item`,onClick:_,style:{cursor:_?`pointer`:void 0},children:`Clients`}),(0,u.jsx)(`div`,{className:`nav-item`,onClick:v,style:{cursor:v?`pointer`:void 0},children:`Resources`}),S&&(0,u.jsx)(`div`,{className:`nav-item`,onClick:y,style:{cursor:y?`pointer`:void 0},children:`Admin`})]}),(0,u.jsx)(`div`,{className:`topbar-actions`})]})}),(0,u.jsx)(`main`,{className:`page-shell`,children:(0,u.jsx)(`section`,{className:`page-blank`,children:(0,u.jsx)(`div`,{className:`orders-shell`,children:(0,u.jsx)(o,{orderId:b,currentUser:t,onBack:()=>x(null)})})})})]})})})}):(0,u.jsx)(`div`,{className:`orders-page`,dangerouslySetInnerHTML:{__html:D}})}export{p as default};