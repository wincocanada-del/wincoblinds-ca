import{c as e,n as t}from"./supabaseClient-DbeEDEc0.js";import{t as n}from"./adminAccess-BqWs8i9A.js";import{t as r}from"./jsx-runtime-DrYbZxX9.js";import{n as i,s as a}from"./chainOptions-CgszWs98.js";import{t as o}from"./catalogChanges-KSuO_0T9.js";import{n as s}from"./pageNavigation-DUYQEysm.js";import{n as c,t as l}from"./catalogLastUpdated-CKx-edYD.js";import{n as u,r as d,t as f}from"./adminCatalogDesign-BapVv-MQ.js";import{n as p,t as m}from"./catalogSortControls-DYr5RXgo.js";function h(e,t,{canEdit:n=!1,onLastUpdated:r=()=>{}}={}){let s=document.createElement(`section`);s.className=`panel chain-options-panel`,s.setAttribute(`aria-label`,`Chain Control Options`),s.innerHTML=`<div class="panel-head"><div class="panel-title"><strong>Chain Control Options</strong><span>Manage names, order and availability for Chain / Manual.</span></div><div class="actions"><button type="button" class="btn" data-chain-action="add">Add</button><button type="button" class="btn btn-dark" data-chain-action="edit">Edit</button><button type="button" class="btn" data-chain-action="cancel">Cancel</button><button type="button" class="btn btn-dark" data-chain-action="save">Save</button></div></div><div class="chain-options-scroll"><table class="chain-options-table"><thead><tr><th>Option</th><th>Enabled</th><th>Order</th></tr></thead><tbody></tbody></table></div><p class="note">Turn off Enabled to stop offering an option. Saved selections are kept. Prices remain in Pricing → Option under the original option name.</p><div class="chain-options-status" role="status"></div>`,e.querySelector(`.panel`).after(s);let c=[],l=[],u=``,d=!1,f=!1,p=!1,m=``,h=null,g=e=>e.map(({id:e,name:t,enabled:n})=>({id:e,name:t.trim().replace(/\s+/g,` `),enabled:n})),_=()=>d&&JSON.stringify(g(l))!==JSON.stringify(g(c)),v=s.querySelector(`.chain-options-status`),y=s.querySelector(`tbody`),b=Object.fromEntries([...s.querySelectorAll(`[data-chain-action]`)].map(e=>[e.dataset.chainAction,e]));function x(){b.edit.hidden=!n||d,b.edit.disabled=!u||f;for(let e of[`add`,`cancel`,`save`])b[e].hidden=!n||!d,b[e].disabled=f;b.save.textContent=f?`Saving…`:`Save`,v.textContent=m||(u?``:`Loading…`),v.setAttribute(`role`,m?`alert`:`status`),v.classList.toggle(`catalog-save-error`,!!m),s.querySelectorAll(`input`).forEach(e=>{e.readOnly=!d||f,e.type===`checkbox`&&(e.disabled=!d||f)})}function S(){y.replaceChildren(),l.forEach((e,t)=>{let n=document.createElement(`tr`);n.dataset.chainOptionId=e.id;let r=document.createElement(`td`),i=document.createElement(`input`);i.className=`inline-input`,i.value=e.name,i.maxLength=80,i.setAttribute(`aria-label`,`Option ${t+1} name`),i.oninput=()=>{e.name=i.value,m=``,x()},r.append(i);let a=document.createElement(`td`),o=document.createElement(`label`),s=document.createElement(`input`);s.type=`checkbox`,s.checked=e.enabled,s.setAttribute(`aria-label`,`Enable ${e.name||`option `+(t+1)}`),s.onchange=()=>{e.enabled=s.checked,m=``,x()},o.append(s),a.append(o);let c=document.createElement(`td`);if(d)for(let[n,r]of[[-1,`↑`],[1,`↓`]]){let i=document.createElement(`button`);i.type=`button`,i.className=`btn chain-option-move`,i.textContent=r,i.setAttribute(`aria-label`,`Move ${e.name||`option `+(t+1)} ${n<0?`up`:`down`}`),i.disabled=f||t+n<0||t+n>=l.length,i.onclick=()=>{[l[t],l[t+n]]=[l[t+n],l[t]],S(),y.querySelectorAll(`tr`)[t+n]?.querySelector(`button[aria-label$="${n<0?`up`:`down`}"]`)?.focus()},c.append(i)}else c.textContent=String(t+1);n.append(r,a,c),y.append(n)}),x()}function C(){f||(d=!1,l=structuredClone(c),m=``,S())}async function w(){if(!n||!d||f)return!1;let e=g(l);if(e.some(e=>!e.name)||new Set(e.map(e=>i(e.name))).size!==e.length)return m=`Enter a different name for each option.`,x(),!1;let a=JSON.stringify([u,e]);h?.signature!==a&&(h={signature:a,id:crypto.randomUUID()}),f=!0,m=``,S();try{let{data:n,error:i}=await t.rpc(`winco_save_chain_options`,{p_expected:u,p_request_id:h.id,p_rows:e});if(i)throw i;if(!n?.revision||!Array.isArray(n.rows))throw Error(`Save could not be confirmed. Try Save again.`);return p?!1:(c=n.rows,l=structuredClone(c),u=n.revision,h=null,d=!1,r(n.last_updated),o(`control`,u),!0)}catch(e){return p||(m=e.message||`Could not save. Your changes are still here. Try again.`),!1}finally{f=!1,p||S()}}return b.edit.onclick=()=>{d=!0,l=structuredClone(c),S()},b.cancel.onclick=C,b.save.onclick=w,b.add.onclick=()=>{l.push({id:crypto.randomUUID(),name:``,enabled:!0}),S(),y.lastElementChild.querySelector(`input`).focus()},a(t).then(e=>{p||(c=e.rows,l=structuredClone(c),u=e.revision,S())}).catch(e=>{p||(m=e.message||`Could not load. Reopen this tab to retry.`,x())}),S(),{editor:{getState:()=>({editing:d,dirty:_(),busy:f}),save:w,discard:C},dispose:()=>{p=!0,s.remove()}}}var g=e(),_=r(),v=`(function() {
  const pageRoot = document.querySelector('.control-page');
  let disposed = false;
  window.destroyControlPage = () => {
    disposed = true;
    document.removeEventListener('click', closePageDropdowns);
  };


function setPendingApply() { document.querySelector('.control-page')?.dispatchEvent(new Event('catalog-dirty')); }

    function setApplied() {}

    function isInteractiveTarget(target) {
      return !!target.closest('[data-interactive], .demo-dropdown, input, button');
    }

    function setActiveLayer(card) {
      document.querySelectorAll('.hardware-card').forEach(item => item.classList.remove('active-layer'));
      if (card) card.classList.add('active-layer');
    }

    function toggleCard(card) {
      if (!card) return;
      const shouldOpen = card.classList.contains('collapsed');
      document.querySelectorAll('.hardware-card').forEach(item => item.classList.add('collapsed'));
      if (shouldOpen) {
        card.classList.remove('collapsed');
        setActiveLayer(card);
      } else {
        card.classList.add('collapsed');
        card.classList.remove('active-layer');
      }
    }

    function resetPricingDropdown(dropdown, value) {
      const btn = dropdown.querySelector('[data-demo-dropdown-btn]');
      const items = dropdown.querySelectorAll('.demo-dropdown-item');
      items.forEach(item => item.classList.remove('selected'));
      const target = Array.from(items).find(item => (item.dataset.value || item.textContent.trim()) === value);
      if (target) target.classList.add('selected');
      if (btn) {
        btn.textContent = value;
        btn.classList.remove('placeholder-like');
      }
      dropdown.classList.remove('open');
    }

    function resetDescriptionDropdown(dropdown) {
      const btn = dropdown.querySelector('[data-demo-dropdown-btn]');
      const items = dropdown.querySelectorAll('.demo-dropdown-item');
      items.forEach(item => item.classList.remove('selected'));
      if (btn) {
        btn.textContent = 'Color';
        btn.classList.add('placeholder-like');
      }
      dropdown.classList.remove('open');
    }

    function resetVisibilityDropdown(dropdown) {
      const btn = dropdown.querySelector('[data-demo-dropdown-btn]');
      const items = dropdown.querySelectorAll('.demo-dropdown-item');
      items.forEach(item => item.classList.remove('selected'));
      const target = Array.from(items).find(item => (item.dataset.value || item.textContent.trim()) === 'Public');
      if (target) target.classList.add('selected');
      if (btn) {
        btn.textContent = 'Public';
        btn.classList.remove('placeholder-like');
      }
      dropdown.classList.remove('open');
    }

    function resetColorRow(row) {
      delete row.dataset.colorId;
      row.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.checked = false;
      });
      row.querySelectorAll('.inline-input').forEach(input => {
        input.value = '';
      });

      const dropdowns = row.querySelectorAll('[data-demo-dropdown]');
      if (dropdowns[0]) resetDescriptionDropdown(dropdowns[0]);
      if (dropdowns[1]) resetVisibilityDropdown(dropdowns[1]);
    }

    function toggleNewDetailRow(rowId) {
      const templateRow = document.getElementById(rowId);
      if (!templateRow) return;
      const card = templateRow.closest('.hardware-card');
      if (card) {
        card.classList.remove('collapsed');
        setActiveLayer(card);
      }

      if (templateRow.classList.contains('hidden-row')) {
        templateRow.classList.remove('hidden-row');
        resetColorRow(templateRow);
      } else {
        const clone = templateRow.cloneNode(true);
        clone.removeAttribute('id');
        clone.classList.remove('hidden-row');
        clone.querySelectorAll('[data-bound]').forEach(el => el.removeAttribute('data-bound'));
      clone.querySelectorAll('[data-header-bound]').forEach(el => el.removeAttribute('data-header-bound'));
        resetColorRow(clone);
        templateRow.parentNode.appendChild(clone);
        bindDemoDropdowns(clone);
        bindInlineInputs(clone);
      }

      setPendingApply();
    }

    function deleteSelectedDetails(button) {
      const card = button.closest('.hardware-card');
      if (!card) return;
      const rows = Array.from(card.querySelectorAll('.mini-table tbody tr'));
      const selectedRows = rows.filter(row => {
        const checkbox = row.querySelector('td input[type="checkbox"]');
        return checkbox && checkbox.checked;
      });

      if (!selectedRows.length) {
        alert('Select at least one color row to delete.');
        return;
      }

      if (!confirm('Delete selected color item(s)?')) {
        return;
      }

      selectedRows.forEach(row => {
        if (row.id) {
          row.classList.add('hidden-row');
          resetColorRow(row);
          row.querySelectorAll('input[type="checkbox"]').forEach(box => {
            box.checked = false;
          });
        } else {
          row.remove();
        }
      });
      setPendingApply();
    }

    function setGroup(group) {
      document.getElementById('manualGroup').style.display = group === 'manual' ? '' : 'none';
      document.getElementById('cordlessGroup').style.display = group === 'cordless' ? '' : 'none';
      document.getElementById('motorizedGroup').style.display = group === 'motorized' ? '' : 'none';

      document.getElementById('listTitle').textContent = group === 'manual'
        ? 'Manual List'
        : group === 'cordless'
          ? 'Cordless List'
          : 'Motorized List';
      document.getElementById('groupLabel').textContent = group === 'manual'
        ? 'Selected group: Manual'
        : group === 'cordless'
          ? 'Selected group: Cordless'
          : 'Selected group: Motorized';
      document.getElementById('addBtn').textContent = 'Add';
      document.getElementById('deleteBtn').textContent = 'Delete';

      document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.group === group);
      });

      const groupNote = document.getElementById('groupNote');
      if (groupNote) {
        groupNote.textContent = group === 'manual'
          ? 'Manage manual controls. Color is for code color.'
          : group === 'cordless'
            ? 'Manage cordless controls. Option Charge applies.'
            : 'Motor names, prices and visibility are managed in Pricing.';
      }
    }

    function getCurrentGroupKey() {
      return document.querySelector('.tab.active')?.dataset.group || 'manual';
    }

    function buildCode(group, index) {
      return '';
    }

    function resetCardValues(card, groupKey, index) {
      const nameInputs = card.querySelectorAll('.name-group .inline-input');
      if (nameInputs[0]) {
        nameInputs[0].value = buildCode(groupKey, index);
        nameInputs[0].placeholder = groupKey === 'motorized' ? 'Code' : 'New code';
      }
      if (nameInputs[1]) {
        nameInputs[1].value = '';
        if (groupKey === 'cordless') {
          nameInputs[1].placeholder = 'Cordless Type';
        } else if (groupKey === 'motorized') {
          nameInputs[1].placeholder = 'New motor';
        } else {
          nameInputs[1].placeholder = 'Control Type';
        }
      }

      const headDropdowns = card.querySelectorAll('.hardware-card-head [data-demo-dropdown]');
      if (headDropdowns[0]) resetPricingDropdown(headDropdowns[0], groupKey === 'cordless' ? 'Option Charge' : groupKey === 'motorized' ? 'Motor Charge' : 'Included');
      if (headDropdowns[1]) resetVisibilityDropdown(headDropdowns[1]);

      card.querySelectorAll('.mini-table tbody tr').forEach((row, idx) => {
        resetColorRow(row);
        if (idx > 1) {
          row.remove();
        }
      });
      const templateRow = card.querySelector('.mini-table tbody tr[id]');
      if (templateRow) {
        templateRow.classList.add('hidden-row');
      }
      card.classList.add('collapsed');
      card.querySelectorAll('input[type="checkbox"]').forEach(box => {
        box.checked = false;
      });
    }

    function wireCardForUniqueRow(card, rowId) {
      const addBtn = card.querySelector('.add-color-btn');
      if (addBtn) {
        addBtn.dataset.rowId = rowId;
      }
      const templateRow = card.querySelector('.mini-table tbody tr[id]');
      if (templateRow) {
        templateRow.id = rowId;
      }
    }

    function bindInlineInputs(scope = document) {
      scope.querySelectorAll('.inline-input').forEach(input => {
        if (input.dataset.bound === 'true') return;
        input.dataset.bound = 'true';
        input.addEventListener('input', setPendingApply);
      });
    }

    function positionDropdown(dropdown) {
      const menu = dropdown.querySelector('[data-demo-dropdown-menu]');
      if (!menu) return;

      dropdown.classList.remove('open-up');
      menu.style.visibility = 'hidden';
      menu.style.display = 'block';

      const rect = menu.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const spaceBelow = viewportHeight - dropdown.getBoundingClientRect().bottom;
      const spaceAbove = dropdown.getBoundingClientRect().top;

      menu.style.display = '';
      menu.style.visibility = '';

      if (rect.height > spaceBelow && spaceAbove > spaceBelow) {
        dropdown.classList.add('open-up');
      }
    }

    function bindDemoDropdowns(scope = document) {
      scope.querySelectorAll('[data-demo-dropdown]').forEach(dropdown => {
        if (dropdown.dataset.bound === 'true') return;
        dropdown.dataset.bound = 'true';
        const btn = dropdown.querySelector('[data-demo-dropdown-btn]');
        const items = dropdown.querySelectorAll('.demo-dropdown-item');
        if (!btn) return;

        btn.addEventListener('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          document.querySelectorAll('[data-demo-dropdown].open').forEach(openItem => {
            if (openItem !== dropdown) {
              openItem.classList.remove('open');
              openItem.classList.remove('open-up');
            }
          });
          setActiveLayer(dropdown.closest('.hardware-card'));
          const willOpen = !dropdown.classList.contains('open');
          dropdown.classList.toggle('open');
          if (willOpen) {
            positionDropdown(dropdown);
          } else {
            dropdown.classList.remove('open-up');
          }
        });

        items.forEach(item => {
          item.addEventListener('click', function(event) {
            event.stopPropagation();
            items.forEach(x => x.classList.remove('selected'));
            item.classList.add('selected');
            btn.textContent = item.dataset.value || item.textContent.trim();
            btn.classList.remove('placeholder-like');
            dropdown.classList.remove('open');
            dropdown.classList.remove('open-up');
            setPendingApply();
          });
        });
      });
    }

    function addHardwareCard() {
      const groupKey = getCurrentGroupKey();
      const container = document.getElementById(groupKey === 'manual' ? 'manualGroup' : groupKey === 'cordless' ? 'cordlessGroup' : 'motorizedGroup');
      if (!container) return;

      let sourceCard = container.querySelector('.hardware-card');

      if (!sourceCard) {
        sourceCard = createBlankControlCard(groupKey, false);
        container.appendChild(sourceCard);
        bindDemoDropdowns(sourceCard);
        bindInlineInputs(sourceCard);
        bindCardHeader(sourceCard);
        bindActionButtons(sourceCard);
        setPendingApply();
        return;
      }

      const clone = sourceCard.cloneNode(true);
      delete clone.dataset.controlId;
      delete clone.dataset.cardKey;
      clone.querySelectorAll('[data-bound]').forEach(el => el.removeAttribute('data-bound'));
      clone.querySelectorAll('[data-header-bound]').forEach(el => el.removeAttribute('data-header-bound'));
      const count = container.querySelectorAll('.hardware-card').length + 1;
      const rowId = \`\${groupKey}-new-row-\${Date.now()}\`;
      wireCardForUniqueRow(clone, rowId);
      resetCardValues(clone, groupKey, count);
      container.appendChild(clone);
      bindDemoDropdowns(clone);
      bindInlineInputs(clone);
      bindCardHeader(clone);
      bindActionButtons(clone);
      setPendingApply();
    }

    async function deleteHardwareCard() {
      const groupKey = getCurrentGroupKey();
      const container = document.getElementById(groupKey === 'manual' ? 'manualGroup' : groupKey === 'cordless' ? 'cordlessGroup' : 'motorizedGroup');
      if (!container) return;

      const cards = Array.from(container.querySelectorAll('.hardware-card'));
      const selected = cards.filter(card => {
        const box = card.querySelector('.hardware-card-head input[type="checkbox"]');
        return box && box.checked;
      });

      if (!selected.length) {
        alert('Select at least one Control to delete.');
        return;
      }


      try {


        selected.forEach(card => card.remove());

        if (!container.querySelector('.hardware-card')) {
          const blankCard = createBlankControlCard(groupKey, false)
          container.appendChild(blankCard);
          bindDemoDropdowns(blankCard);
          bindInlineInputs(blankCard);
          bindCardHeader(blankCard);
          bindActionButtons(blankCard);
        }

        setPendingApply();
      } catch (error) {
        console.error(error);
        alert('Could not remove the selected items.');
      }
    }

    function bindCardHeader(scope = document) {
      scope.querySelectorAll('.hardware-card-head').forEach(head => {
        if (head.dataset.headerBound === 'true') return;
        head.dataset.headerBound = 'true';
        head.addEventListener('click', function(event) {
          if (isInteractiveTarget(event.target)) return;
          const card = head.closest('.hardware-card');
          toggleCard(card);
        });
      });
    }

    function bindActionButtons(scope = document) {
      scope.querySelectorAll('.add-color-btn').forEach(btn => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', function(event) {
          event.stopPropagation();
          toggleNewDetailRow(btn.dataset.rowId);
        });
      });

      scope.querySelectorAll('.delete-color-btn').forEach(btn => {
        if (btn.dataset.bound === 'true') return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', function(event) {
          event.stopPropagation();
          deleteSelectedDetails(btn);
        });
      });
    }

    function closePageDropdowns() {
      if (disposed) return;
      pageRoot?.querySelectorAll('[data-demo-dropdown].open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.classList.remove('open-up');
      });
    }
    document.addEventListener('click', closePageDropdowns);



    function escapeControlHtml(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function buildControlDropdownHtml(options, selectedValue) {
      return options.map(function(option) {
        const selected = option === selectedValue ? ' selected' : '';
        return '<div class="demo-dropdown-item' + selected + '" data-value="' + escapeControlHtml(option) + '">' + escapeControlHtml(option) + '</div>';
      }).join('');
    }

    function createControlDropdownHtml(options, selectedValue, placeholderLike, interactive) {
      const selected = selectedValue || options[0] || '';
      const placeholderClass = placeholderLike ? ' placeholder-like' : '';
      const interactiveAttr = interactive ? ' data-interactive' : '';
      return \`
        <div class="demo-dropdown" data-demo-dropdown>
          <button type="button" class="demo-dropdown-btn\${placeholderClass}" data-demo-dropdown-btn\${interactiveAttr}>\${escapeControlHtml(selected)}</button>
          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
            \${buildControlDropdownHtml(options, selected)}
          </div>
        </div>
      \`;
    }

    function createControlCardFromSupabase(item) {
      const groupKey = item.product_group === 'Cordless'
        ? 'cordless'
        : item.product_group === 'Motorized'
          ? 'motorized'
          : 'manual';

      const rowId = groupKey + '-loaded-row-' + item.id;
      const visibility = item.visibility || 'Public';
      const pricingType = item.pricing_type || (groupKey === 'cordless' ? 'Option Charge' : groupKey === 'motorized' ? 'Motor Charge' : 'Included');
      const colors = Array.isArray(item.control_colors) ? item.control_colors : [];

      const card = document.createElement('div');
      card.className = 'hardware-card collapsed';
      card.dataset.cardGroup = groupKey;

      if (item.id && !String(item.id).startsWith('blank-') && !String(item.id).startsWith('new-')) {
        card.dataset.controlId = item.id;
        card.dataset.cardKey = 'loaded-control-' + item.id;
      }

      let nameGroupHtml = '';
      if (groupKey === 'motorized') {
        nameGroupHtml = \`
          <div class="name-group">
            <div><input class="inline-input" placeholder="Code" value="\${escapeControlHtml(item.code || '')}" data-interactive /></div>
            <div><input class="inline-input" placeholder="\${item.id && String(item.id).startsWith('new-') ? 'New motor' : 'Motor'}" value="\${escapeControlHtml(item.control_type || '')}" data-interactive /></div>
          </div>
        \`;
      } else {
        nameGroupHtml = \`
          <div class="name-group">
            <div><input class="inline-input" placeholder="Code" value="\${escapeControlHtml(item.code || '')}" data-interactive /></div>
            <div><input class="inline-input" placeholder="\${groupKey === 'cordless' ? 'Cordless Type' : 'Control Type'}" value="\${escapeControlHtml(item.control_type || '')}" data-interactive /></div>
          </div>
        \`;
      }

      const hasColorActions = groupKey === 'manual';
      const colorRowsHtml = colors.map(function(color) {
        const colorDescription = color.color_description || 'Color';
        const isPlaceholder = !color.color_description;
        return \`
          <tr data-color-id="\${escapeControlHtml(color.id || '')}">
            <td><input type="checkbox" /></td>
            <td><input class="inline-input" placeholder="Color code" value="\${escapeControlHtml(color.color_code || '')}" /></td>
            <td>\${createControlDropdownHtml(['White', 'Ivory', 'Grey', 'Anodized', 'Black'], colorDescription, isPlaceholder, false)}</td>
            <td>\${createControlDropdownHtml(['Public', 'Winco Only', 'Access L1', 'Access L2', 'Access L3'], color.visibility || visibility, false, false)}</td>
          </tr>
        \`;
      }).join('');

      const actionsHtml = hasColorActions
        ? \`
          <div style="padding-right: 4px;">
            <div class="card-actions">
              <button class="btn primary add-color-btn" type="button" style="min-width: 96px;" data-row-id="\${rowId}" data-interactive>Add Color</button>
              <button class="btn danger delete-color-btn" type="button" style="min-width: 96px;" data-interactive>Delete Color</button>
            </div>
          </div>
        \`
        : '<div style="padding-right: 4px;"></div>';

      const detailHtml = hasColorActions
        ? \`
          <div class="card-detail-wrap">
            <table class="mini-table">
              <tbody>
                \${colorRowsHtml}
                <tr id="\${rowId}" class="hidden-row">
                  <td><input type="checkbox" /></td>
                  <td><input class="inline-input" placeholder="Color code" /></td>
                  <td>\${createControlDropdownHtml(['White', 'Ivory', 'Grey', 'Anodized', 'Black'], 'Color', true, false)}</td>
                  <td>\${createControlDropdownHtml(['Public', 'Winco Only', 'Access L1', 'Access L2', 'Access L3'], visibility, false, false)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        \`
        : '';

      card.innerHTML = \`
        <div class="hardware-card-head">
          <div><input type="checkbox" data-interactive /></div>
          \${nameGroupHtml}
          <div>\${createControlDropdownHtml(['Included', 'Surcharge', 'Option Charge', 'Motor Charge'], pricingType, false, true)}</div>
          <div>\${createControlDropdownHtml(['Public', 'Winco Only', 'Access L1', 'Access L2', 'Access L3'], visibility, false, true)}</div>
          \${actionsHtml}
        </div>
        \${detailHtml}
      \`;

      return card;
    }

    function createBlankControlCard(groupKey, isNewCard) {
      const productGroup = groupKey === 'cordless'
        ? 'Cordless'
        : groupKey === 'motorized'
          ? 'Motorized'
          : 'Manual';

      return createControlCardFromSupabase({
        id: (isNewCard ? 'new-' : 'blank-') + groupKey + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000000),
        product_group: productGroup,
        code: '',
        control_type: '',
        pricing_type: groupKey === 'cordless' ? 'Option Charge' : groupKey === 'motorized' ? 'Motor Charge' : 'Included',
        visibility: 'Public',
        control_colors: []
      });
    }

    function renderControlDataFromSupabase(items) {
      if (!Array.isArray(items)) return;

      const manualRoot = document.getElementById('manualGroup');
      const cordlessRoot = document.getElementById('cordlessGroup');
      const motorizedRoot = document.getElementById('motorizedGroup');

      if (manualRoot) manualRoot.innerHTML = '';
      if (cordlessRoot) cordlessRoot.innerHTML = '';
      if (motorizedRoot) motorizedRoot.innerHTML = '';

      items.forEach(function(item) {
        const card = createControlCardFromSupabase(item);
        if (item.product_group === 'Cordless') {
          if (cordlessRoot) cordlessRoot.appendChild(card);
        } else if (item.product_group === 'Motorized') {
          if (motorizedRoot) motorizedRoot.appendChild(card);
        } else {
          if (manualRoot) manualRoot.appendChild(card);
        }

        bindDemoDropdowns(card);
        bindInlineInputs(card);
        bindCardHeader(card);
        bindActionButtons(card);
      });

      ensureOneBlankCardPerEmptyGroup();

      setGroup(getCurrentGroupKey());
      setApplied();
    }

    function ensureOneBlankCardPerEmptyGroup() {
      ['manual', 'cordless', 'motorized'].forEach(function(groupKey) {
        const root = document.getElementById(groupKey === 'manual' ? 'manualGroup' : groupKey === 'cordless' ? 'cordlessGroup' : 'motorizedGroup');
        if (!root) return;

        if (!root.querySelector('.hardware-card')) {
          const card = createBlankControlCard(groupKey, false)
          root.appendChild(card);
          bindDemoDropdowns(card);
          bindInlineInputs(card);
          bindCardHeader(card);
          bindActionButtons(card);
        }
      });
    }


  function initControlPage() {
      if (disposed) return;
      bindDemoDropdowns();
      bindInlineInputs();
      bindCardHeader();
      bindActionButtons();

      document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
          setGroup(this.dataset.group || 'manual');
        });
      });



      document.getElementById('addBtn')?.addEventListener('click', function(event) {
        event.stopPropagation();
        addHardwareCard();
      });

      document.getElementById('deleteBtn')?.addEventListener('click', function(event) {
        event.stopPropagation();
        deleteHardwareCard();
      });

      setGroup('manual');

      if (window.loadControlDataFromSupabase) {
        window.loadControlDataFromSupabase()
          .then(function(items) {
            if (disposed) return;
            renderControlDataFromSupabase(items);
            pageRoot?.dispatchEvent(new Event('catalog-ready'));
            if (!items || !items.length) {
              ensureOneBlankCardPerEmptyGroup();
            }
          })
          .catch(function(error) {
            if (disposed) return;
            console.error(error);
            pageRoot?.dispatchEvent(new Event('catalog-load-error'));
          });
      }
  }

function restoreCatalogGroup(rows, group) {
 const list = document.getElementById(group === 'manual' ? 'manualGroup' : group === 'cordless' ? 'cordlessGroup' : 'motorizedGroup'); list.innerHTML = '';
 rows.forEach(row => { const card = createControlCardFromSupabase({...row,id:row.control_id,control_colors:row.colors}); list.appendChild(card); bindDemoDropdowns(card); bindInlineInputs(card); bindCardHeader(card); bindActionButtons(card); });
 ensureOneBlankCardPerEmptyGroup();
 setGroup(getCurrentGroupKey());
 }
 window.restoreControlCatalogGroup = restoreCatalogGroup;
  window.initControlPage = initControlPage;
  window.setControlGroup = setGroup;
  window.addControlCard = addHardwareCard;
  window.deleteControlCard = deleteHardwareCard;
})();
`,y=`<div class="app">
    <div class="page">
      <nav class="main-nav">
        <div class="main-nav-inner">
          <div class="main-nav-left">
            <div class="main-nav-item account" data-account-home-link>Charles / Winco</div>
            <div class="main-nav-separator">|</div>
            <div class="main-nav-item">Measure</div>
            <div class="main-nav-item">Quotes</div>
            <div class="main-nav-item">Orders</div>
            <div class="main-nav-item">Clients</div>
            <div class="main-nav-item">Resources</div>
            <div class="main-nav-item current">Admin</div>
          </div>
          <div class="main-nav-actions"></div>
        </div>
      </nav>

      <nav class="admin-subnav" aria-label="Admin sections">
        <div class="admin-subnav-inner">
          <div class="admin-subnav-item">Fabric</div>
          <div class="admin-subnav-item">Hardware</div>
          <div class="admin-subnav-item current">Control System</div>
          <div class="admin-subnav-item">Pricing</div>
          <div class="admin-subnav-item">Accounts</div>
        </div>
      </nav>

      <section class="page-topbar" style="margin: 18px 16px 12px;">
        <div class="title-wrap">
          <h1>Control System</h1>
          <p id="lastUpdatedText">Last updated: Loading…</p>
        </div>
        <div class="tabbar" aria-label="Control System tabs">
          <button class="tab active" type="button" data-group="manual">Manual</button>
          <button class="tab" type="button" data-group="cordless">Cordless</button>
          
        </div>
      </section>

      <section class="panel" style="margin: 0 16px 24px;">
        <div class="panel-head">
          <div class="panel-title">
            <strong id="listTitle">Control List</strong>
            <span id="groupLabel">Selected group: Manual</span>
          </div>
          <div class="actions">
            <button class="btn primary" type="button" id="addBtn">Add Control</button>
            <button class="btn danger" type="button" id="deleteBtn">Delete Control</button>
            <button class="btn" type="button" id="applyBtn" style="min-width: 96px;">Apply</button>
            <span id="applyStatus" style="font-size: 11px; color: var(--blue); font-weight: 600; align-self: center;">Applied</span>
          </div>
        </div>

        <div class="card-list">
          <div id="manualGroup">
            <div class="hardware-card collapsed" data-card-group="manual">
              <div class="hardware-card-head">
                <div><input type="checkbox" data-interactive /></div>
                <div class="name-group">
                  <div><input class="inline-input" placeholder="Code" data-interactive /></div>
                  <div><input class="inline-input" placeholder="Control Type" data-interactive /></div>
                </div>
                <div>
                  <div class="demo-dropdown" data-demo-dropdown>
                    <button type="button" class="demo-dropdown-btn" data-demo-dropdown-btn data-interactive>Included</button>
                    <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                      <div class="demo-dropdown-item selected" data-value="Included">Included</div>
                      <div class="demo-dropdown-item" data-value="Surcharge">Surcharge</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="demo-dropdown" data-demo-dropdown>
                    <button type="button" class="demo-dropdown-btn" data-demo-dropdown-btn data-interactive>Public</button>
                    <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                      <div class="demo-dropdown-item selected" data-value="Public">Public</div>
                      <div class="demo-dropdown-item" data-value="Winco Only">Winco Only</div>
                      <div class="demo-dropdown-item" data-value="Access L1">Access L1</div>
                      <div class="demo-dropdown-item" data-value="Access L2">Access L2</div>
                      <div class="demo-dropdown-item" data-value="Access L3">Access L3</div>
                    </div>
                  </div>
                </div>
                <div style="padding-right: 4px;">
                  <div class="card-actions">
                    <button class="btn primary add-color-btn" type="button" style="min-width: 96px;" data-row-id="manual-new-row" data-interactive>Add Color</button>
                    <button class="btn danger delete-color-btn" type="button" style="min-width: 96px;" data-interactive>Delete Color</button>
                  </div>
                </div>
              </div>
              <div class="card-detail-wrap">
                <table class="mini-table">
                  <tbody>
                    <tr>
                      <td><input type="checkbox" /></td>
                      <td><input class="inline-input" placeholder="Color code" /></td>
                      <td>
                        <div class="demo-dropdown" data-demo-dropdown>
                          <button type="button" class="demo-dropdown-btn placeholder-like" data-demo-dropdown-btn>Color</button>
                          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                            <div class="demo-dropdown-item" data-value="White">White</div>
                            <div class="demo-dropdown-item" data-value="Ivory">Ivory</div>
                            <div class="demo-dropdown-item" data-value="Grey">Grey</div>
                            <div class="demo-dropdown-item" data-value="Anodized">Anodized</div>
                            <div class="demo-dropdown-item" data-value="Black">Black</div>
                            <div class="demo-dropdown-item" data-value="Stainless Steel">Stainless Steel</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="demo-dropdown" data-demo-dropdown>
                          <button type="button" class="demo-dropdown-btn" data-demo-dropdown-btn>Public</button>
                          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                            <div class="demo-dropdown-item selected" data-value="Public">Public</div>
                            <div class="demo-dropdown-item" data-value="Winco Only">Winco Only</div>
                            <div class="demo-dropdown-item" data-value="Access L1">Access L1</div>
                            <div class="demo-dropdown-item" data-value="Access L2">Access L2</div>
                            <div class="demo-dropdown-item" data-value="Access L3">Access L3</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr id="manual-new-row" class="hidden-row">
                      <td><input type="checkbox" /></td>
                      <td><input class="inline-input" placeholder="Color code" /></td>
                      <td>
                        <div class="demo-dropdown" data-demo-dropdown>
                          <button type="button" class="demo-dropdown-btn placeholder-like" data-demo-dropdown-btn>Color</button>
                          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                            <div class="demo-dropdown-item" data-value="White">White</div>
                            <div class="demo-dropdown-item" data-value="Ivory">Ivory</div>
                            <div class="demo-dropdown-item" data-value="Grey">Grey</div>
                            <div class="demo-dropdown-item" data-value="Anodized">Anodized</div>
                            <div class="demo-dropdown-item" data-value="Black">Black</div>
                            <div class="demo-dropdown-item" data-value="Stainless Steel">Stainless Steel</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="demo-dropdown" data-demo-dropdown>
                          <button type="button" class="demo-dropdown-btn" data-demo-dropdown-btn>Public</button>
                          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                            <div class="demo-dropdown-item selected" data-value="Public">Public</div>
                            <div class="demo-dropdown-item" data-value="Winco Only">Winco Only</div>
                            <div class="demo-dropdown-item" data-value="Access L1">Access L1</div>
                            <div class="demo-dropdown-item" data-value="Access L2">Access L2</div>
                            <div class="demo-dropdown-item" data-value="Access L3">Access L3</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="cordlessGroup" style="display:none;">
            <div class="hardware-card collapsed" data-card-group="cordless">
              <div class="hardware-card-head">
                <div><input type="checkbox" data-interactive /></div>
                <div class="name-group">
                  <div><input class="inline-input" placeholder="Code" data-interactive /></div>
                  <div><input class="inline-input" placeholder="Cordless Type" data-interactive /></div>
                </div>
                <div>
                  <div class="demo-dropdown" data-demo-dropdown>
                    <button type="button" class="demo-dropdown-btn" data-demo-dropdown-btn data-interactive>Option Charge</button>
                    <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                      <div class="demo-dropdown-item" data-value="Included">Included</div>
                      <div class="demo-dropdown-item selected" data-value="Option Charge">Option Charge</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="demo-dropdown" data-demo-dropdown>
                    <button type="button" class="demo-dropdown-btn" data-demo-dropdown-btn data-interactive>Public</button>
                    <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                      <div class="demo-dropdown-item selected" data-value="Public">Public</div>
                      <div class="demo-dropdown-item" data-value="Winco Only">Winco Only</div>
                      <div class="demo-dropdown-item" data-value="Access L1">Access L1</div>
                      <div class="demo-dropdown-item" data-value="Access L2">Access L2</div>
                      <div class="demo-dropdown-item" data-value="Access L3">Access L3</div>
                    </div>
                  </div>
                </div>
                <div style="padding-right: 4px;"></div>
              </div>
            </div>
          </div>

          <div id="motorizedGroup" style="display:none;">
            <div class="hardware-card collapsed" data-card-group="motorized">
              <div class="hardware-card-head">
                <div><input type="checkbox" data-interactive /></div>
                <div class="name-group">
                  <div><input class="inline-input" placeholder="Code" data-interactive /></div>
                  <div><input class="inline-input" placeholder="Motor" data-interactive /></div>
                </div>
                <div>
                  <div class="demo-dropdown" data-demo-dropdown>
                    <button type="button" class="demo-dropdown-btn" data-demo-dropdown-btn data-interactive>Motor Charge</button>
                    <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                      <div class="demo-dropdown-item" data-value="Included">Included</div>
                      <div class="demo-dropdown-item selected" data-value="Motor Charge">Motor Charge</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="demo-dropdown" data-demo-dropdown>
                    <button type="button" class="demo-dropdown-btn" data-demo-dropdown-btn data-interactive>Public</button>
                    <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                      <div class="demo-dropdown-item selected" data-value="Public">Public</div>
                      <div class="demo-dropdown-item" data-value="Winco Only">Winco Only</div>
                      <div class="demo-dropdown-item" data-value="Access L1">Access L1</div>
                      <div class="demo-dropdown-item" data-value="Access L2">Access L2</div>
                      <div class="demo-dropdown-item" data-value="Access L3">Access L3</div>
                    </div>
                  </div>
                </div>
                <div style="padding-right: 4px;"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="note" id="groupNote" style="border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
          Manage manual controls. Color is for code color.
        </div>
      </section>
    </div>
  </div>`;function b(e,t,n=``){let r=e.querySelector(t);return r?r.textContent.trim():n}function x(e){return e.dataset.cardKey||(e.dataset.cardKey=`control-card-`+Date.now()+`-`+Math.floor(Math.random()*1e6)),e.dataset.cardKey}function S(e,t){return Array.from(e.querySelectorAll(`.mini-table tbody tr`)).filter(e=>window.getComputedStyle(e).display!==`none`&&!e.classList.contains(`hidden-row`)).map(e=>{let n=e.querySelector(`td:nth-child(2) input`),r=e.querySelector(`td:nth-child(3) [data-demo-dropdown-btn]`),i=e.querySelector(`td:nth-child(4) [data-demo-dropdown-btn]`),a=r?r.textContent.trim():``;return{id:e.dataset.colorId||null,color_code:n?n.value.trim():``,color_description:a===`Color`?``:a,visibility:i?i.textContent.trim():t}}).filter(e=>e.color_code||e.color_description)}function C(){return Array.from(document.querySelectorAll(`.control-page .hardware-card`)).map(e=>{let t=e.dataset.cardGroup||`manual`,n=e.querySelectorAll(`.name-group .inline-input`),r=b(e,`.hardware-card-head > div:nth-child(3) [data-demo-dropdown-btn]`,t===`cordless`?`Option Charge`:t===`motorized`?`Motor Charge`:`Included`),i=b(e,`.hardware-card-head > div:nth-child(4) [data-demo-dropdown-btn]`,`Public`),a=x(e),o=``,s=``;return o=n[0]?n[0].value.trim():``,s=n[1]?n[1].value.trim():``,{_card_key:a,sort_order:m(e),control_id:e.dataset.controlId||null,product_group:t===`cordless`?`Cordless`:t===`motorized`?`Motorized`:`Manual`,code:o,control_type:s,pricing_type:r,visibility:i,colors:S(e,i)}}).filter(e=>e.control_id||e.code||e.control_type||e.colors.length>0)}function w({currentUser:e,onOpenMainPage:r,onOpenMeasurePage:i,onOpenQuotesPage:a,onOpenOrdersPage:o,onOpenClientsPage:m,onOpenResourcesPage:b,onOpenAdminPage:x,onOpenAdminFabricPage:S,onOpenAdminHardwarePage:w,onOpenAdminControlSystemPage:T,onOpenAdminPricingPage:E,onOpenAdminAccountsPage:D,onOpenAdminFeedbackPage:O}){(0,g.useEffect)(()=>f(document.querySelector(`.control-page`),`control`),[]),(0,g.useEffect)(()=>p(document.querySelector(`.control-page`),`control`),[]);let k=n(e),A=c(y,e?.account_name||`Charles / Winco`,k,e?.role===`Admin`);return(0,g.useEffect)(()=>{window.collectControlDataFromPage=C;let n=l(document.querySelector(`.control-page`)),r=d(t,`control`,{onLastUpdated:n.render});window.loadControlDataFromSupabase=async()=>{try{return await r.load()}catch(e){throw n.unavailable(),e}};let i=document.createElement(`script`);i.type=`text/javascript`,i.dataset.wincoControlPage=`true`,i.text=v,document.body.appendChild(i);let a=document.querySelector(`.control-page`),o=h(a,t,{canEdit:e?.role===`Admin`,onLastUpdated:n.render}),s=u(a,{canEdit:e?.role===`Admin`,extraEditors:()=>[o.editor],kind:`control`,idKey:`control_id`,collect:C,saveGroup:async(t,n)=>{if(e?.role!==`Admin`)throw Error(`Admin access required`);let i=await r.save(t,n);window.restoreControlCatalogGroup(i,t)},restore:(e,t)=>window.restoreControlCatalogGroup(e,t)}),c=window.setTimeout(()=>{typeof window.initControlPage==`function`&&window.initControlPage()},0);return()=>{window.destroyControlPage?.(),o.dispose(),delete window.destroyControlPage,s(),delete window.restoreControlCatalogGroup,window.clearTimeout(c),i.parentNode&&i.parentNode.removeChild(i),delete window.initControlPage,delete window.setControlGroup,delete window.addControlCard,delete window.deleteControlCard,delete window.collectControlDataFromPage,delete window.loadControlDataFromSupabase}},[]),(0,g.useEffect)(()=>{let e=document.querySelector(`.control-page`);if(e)return s(e,{onOpenMainPage:r,onOpenMeasurePage:i,onOpenQuotesPage:a,onOpenOrdersPage:o,onOpenClientsPage:m,onOpenResourcesPage:b,onOpenAdminPage:x,onOpenAdminFabricPage:S,onOpenAdminHardwarePage:w,onOpenAdminControlSystemPage:T,onOpenAdminPricingPage:E,onOpenAdminAccountsPage:D,onOpenAdminFeedbackPage:O},{})},[r,i,a,o,m,b,x,S,w,T,E,D,O]),(0,_.jsx)(`div`,{className:`control-page admin-design catalog-page`,dangerouslySetInnerHTML:{__html:A}})}export{w as default};