import{c as e,n as t}from"./supabaseClient-LRyLHGGh.js";import{t as n}from"./adminAccess-BqWs8i9A.js";import{t as r}from"./jsx-runtime-DrYbZxX9.js";import{n as i}from"./pageNavigation-DUYQEysm.js";import{n as a,t as o}from"./catalogLastUpdated-D7Jq1fYD.js";import{a as s,i as c,n as l,r as u}from"./catalogSortControls-C1vvzRzC.js";function d(e,t=!1){let n=String(e??``).trim();if(t&&n.startsWith(`$`)&&(n=n.slice(1).trim()),!/^(?:\d+(?:\.\d*)?|\.\d+|\d{1,3}(?:,\d{3})+(?:\.\d*)?)$/.test(n))return null;let r=Number(n.replaceAll(`,`,``));return Number.isFinite(r)?r:null}var f=e(),p=r(),m=`(function(){
  const pageRoot = document.querySelector('.fabric-page');
  let disposed = false;
  window.destroyFabricPage = () => { disposed = true; };



    const DUAL_DESCRIPTION_OPTIONS = [
      'Description',
      'Room Darkening',
      'Light Filtering',
      'Custom'
    ];

    const ROLLER_DESCRIPTION_OPTIONS = [
      'Description',
      'Blackout',
      'Light Filtering',
      'Privacy Sunscreen',
      '1% Sunscreen',
      '3% Sunscreen',
      '5% Sunscreen',
      'Custom'
    ];

    const STATUS_OPTIONS = [
      'Active',
      'Limited stock',
      'Discontinued',
      'Discontinued / Limited stock'
    ];

    const VISIBILITY_OPTIONS = ['Winco Only', 'Access L1', 'Access L2', 'Access L3', 'Public'];
    let currentGroupName = 'Dual';

    function setPendingApply() { document.querySelector('.fabric-page')?.dispatchEvent(new Event('catalog-dirty')); }

    function setApplied() {}

    function setCurrentGroup(groupName) {
      currentGroupName = groupName;
      const tabs = document.querySelectorAll('.tabbar .tab');
      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.group === groupName);
      });

      const label = document.getElementById('selectedGroupLabel');
      if (label) {
        label.textContent = \`Selected group: \${groupName}\`;
      }

      const title = document.getElementById('fabricListTitle');
      if (title) {
        title.textContent = \`\${groupName} Fabric List\`;
      }

      const dualList = document.getElementById('dualGroupList');
      const rollerList = document.getElementById('rollerGroupList');
      const newFabricCard = document.getElementById('newFabricCard');
      const newFabricCardRoller = document.getElementById('newFabricCardRoller');

      if (dualList) {
        dualList.style.display = groupName === 'Dual' ? '' : 'none';
      }

      if (rollerList) {
        rollerList.classList.toggle('hidden-new-fabric', groupName !== 'Roller');
        rollerList.style.display = groupName === 'Roller' ? '' : 'none';
      }

      if (newFabricCard) {
        newFabricCard.style.display = groupName === 'Dual' ? '' : 'none';
      }

      if (newFabricCardRoller) {
        newFabricCardRoller.style.display = groupName === 'Roller' ? '' : 'none';
      }

      const newFabricCardRollerExtra = document.getElementById('newFabricCardRollerExtra');
      if (newFabricCardRollerExtra) {
        newFabricCardRollerExtra.style.display = groupName === 'Roller' ? '' : 'none';
      }

      document.querySelectorAll('.dual-added-card').forEach(card => {
        card.style.display = groupName === 'Dual' ? '' : 'none';
      });

      document.querySelectorAll('.roller-added-card').forEach(card => {
        card.style.display = groupName === 'Roller' ? '' : 'none';
      });
    }

    function getVisibilityRank(value) {
      const map = {
        'Winco Only': 0,
        'Access L1': 1,
        'Access L2': 2,
        'Access L3': 3,
        'Public': 4
      };
      return map[value] ?? 999;
    }

    function getAllowedVisibilityOptions(fabricVisibility) {
      const maxRank = getVisibilityRank(fabricVisibility);
      return VISIBILITY_OPTIONS.filter(option => getVisibilityRank(option) <= maxRank);
    }

    function buildColorVisibilityHtml(fabricVisibility, selectedValue, preserveExisting = false) {
      const allowed = getAllowedVisibilityOptions(fabricVisibility);
      const retainSaved = preserveExisting && VISIBILITY_OPTIONS.includes(selectedValue) && !allowed.includes(selectedValue);
      // Keep a saved value during load/Cancel; only new selections use the current parent limits.
      const retainedOption = retainSaved ? \`<option selected disabled>\${escapeHtml(selectedValue)}</option>\` : '';
      return retainedOption + buildOptionHtml(allowed, retainSaved ? '' : (allowed.includes(selectedValue) ? selectedValue : fabricVisibility));
    }

    function rebuildColorVisibilitySelect(select, fabricVisibility, preserveExisting = false) {
      if (!select) return;
      const previousValue = select.value;
      const allowed = getAllowedVisibilityOptions(fabricVisibility);
      select.innerHTML = buildColorVisibilityHtml(fabricVisibility, previousValue, preserveExisting);
      select.value = allowed.includes(previousValue) || (preserveExisting && VISIBILITY_OPTIONS.includes(previousValue)) ? previousValue : fabricVisibility;
    }

    function syncCardColorVisibility(card, preserveExisting = false) {
      if (!card) return;
      const fabricVisibility = card.querySelector('.fabric-visibility')?.value;
      if (!fabricVisibility) return;
      const colorVisibilitySelects = card.querySelectorAll('.mini-table tbody tr:not(.hidden-row) td:last-child select');
      colorVisibilitySelects.forEach(select => rebuildColorVisibilitySelect(select, fabricVisibility, preserveExisting));
    }

    function syncAllCardsVisibility() {
      document.querySelectorAll('.fabric-card').forEach(card => syncCardColorVisibility(card));
    }

    function toggleFabricCard(header) {
      const card = header.closest('.fabric-card');
      if (!card) return;
      const shouldOpen = card.classList.contains('collapsed');
      document.querySelectorAll('.fabric-card').forEach(item => item.classList.add('collapsed'));
      if (shouldOpen) {
        card.classList.remove('collapsed');
      }
    }

    function toggleNewColorRow(rowId) {
      const templateRow = document.getElementById(rowId);
      if (!templateRow || !templateRow.parentNode) return;

      const newRow = templateRow.cloneNode(true);
      newRow.removeAttribute('id');
      delete newRow.dataset.colorId;
      newRow.classList.remove('hidden-row');
      newRow.classList.add('hidden-row-active', 'color-pending-row');

      newRow.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox') {
          input.checked = false;
        } else {
          input.value = '';
        }
      });

      const card = templateRow.closest('.fabric-card');
      const fabricVisibility = card?.querySelector('.fabric-visibility')?.value || 'Public';
      const selects = newRow.querySelectorAll('.inline-select');
      if (selects[0]) selects[0].value = 'Active';
      if (selects[1]) {
        rebuildColorVisibilitySelect(selects[1], fabricVisibility);
        selects[1].value = fabricVisibility;
      }

      templateRow.parentNode.insertBefore(newRow, templateRow);
      bindInputsForPendingState(newRow);
      setPendingApply();
    }

    function toggleNewFabricRow() {
      if (currentGroupName === 'Roller') {
        createRollerExtraCard();
        setPendingApply();
        return;
      }

      createDualExtraCard();
      setPendingApply();
    }

    function createDualExtraCard() {
      const template = document.getElementById('newFabricCard');
      if (!template || !template.parentNode) return;

      const clone = template.cloneNode(true);
      const uid = 'newFabricCardDual-' + Date.now() + '-' + Math.floor(Math.random() * 10000);

      clone.id = uid;
      clone.classList.remove('hidden-new-fabric');
      clone.classList.add('dual-added-card');
      clone.style.display = currentGroupName === 'Dual' ? '' : 'none';

      clone.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox') {
          input.checked = false;
        } else {
          input.value = '';
        }
      });

      clone.querySelectorAll('.fabric-desc-custom').forEach(input => {
        input.classList.add('hidden-desc-custom');
      });

      clone.querySelectorAll('.desc-back-btn').forEach(button => {
        button.classList.add('hidden-desc-back');
      });

      clone.querySelectorAll('.fabric-desc-select').forEach(select => {
        select.value = 'Description';
        select.classList.add('placeholder-like');
        select.classList.remove('hidden-desc-custom');
      });

      clone.querySelectorAll('.fabric-visibility').forEach(select => {
        select.value = 'Public';
      });

      clone.querySelectorAll('.price-input').forEach(input => {
        input.value = '';
        input.removeAttribute('data-user-edited');
      });

      clone.querySelectorAll('[id]').forEach(el => {
        el.id = el.id + '-' + uid;
      });

      const colorRowId = uid + '-new-color';
      const head = clone.querySelector('.fabric-card-head');
      if (head) {
        head.classList.add('clickable');
        head.setAttribute('onclick', 'toggleFabricCard(this)');
      }

      const addColorBtn = clone.querySelector('.card-actions .btn.primary');
      if (addColorBtn) {
        addColorBtn.setAttribute('onclick', "event.stopPropagation(); toggleNewColorRow('" + colorRowId + "')");
      }

      if (!clone.querySelector('.card-color-wrap')) {
        clone.insertAdjacentHTML('beforeend', \`
          <div class="card-color-wrap">
            <table class="mini-table">
              <thead>
                <tr>
                  <th class="checkbox-col"></th>
                  <th style="width: 18%;">Color</th>
                  <th style="width: 31%;">Status</th>
                  <th style="width: 31%;">Visibility</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="checkbox-col"><input type="checkbox" /></td>
                  <td><input class="inline-input" placeholder="Color" /></td>
                  <td><select class="inline-select">\${buildOptionHtml(STATUS_OPTIONS, 'Active')}</select></td>
                  <td><select class="inline-select">\${buildOptionHtml(getAllowedVisibilityOptions('Public'), 'Public')}</select></td>
                </tr>
                <tr id="\${colorRowId}" class="hidden-row">
                  <td class="checkbox-col"><input type="checkbox" /></td>
                  <td><input class="inline-input" placeholder="New color code" /></td>
                  <td><select class="inline-select">\${buildOptionHtml(STATUS_OPTIONS, 'Active')}</select></td>
                  <td><select class="inline-select">\${buildOptionHtml(getAllowedVisibilityOptions('Public'), 'Public')}</select></td>
                </tr>
              </tbody>
            </table>
          </div>
        \`);
      }


      document.getElementById('dualGroupList').appendChild(clone);

      if (typeof bindCardInteractions === 'function') {
        bindCardInteractions(clone);
      }

      if (typeof syncCardColorVisibility === 'function') {
        syncCardColorVisibility(clone);
      }

      if (typeof toggleDescriptionInput === 'function') {
        clone.querySelectorAll('.fabric-desc-select').forEach(select => toggleDescriptionInput(select));
      }
    }

    function getVisibleRollerCards() {
      return Array.from(document.querySelectorAll('.roller-fixed-card, .roller-added-card'))
        .filter(card => card && !card.classList.contains('hidden-new-fabric') && !card.classList.contains('roller-template-card'));
    }

    async function deleteSelectedFabrics() {
      const cards = Array.from(document.querySelectorAll('.fabric-card'));
      const selectedCards = cards.filter(card => {
        if ((card.closest('#rollerGroupList') || card.classList.contains('roller-added-card') ? 'Roller' : 'Dual') !== currentGroupName) return false;
        if (card.classList.contains('roller-template-card')) return false;

        if (card.id === 'newFabricCard' && card.classList.contains('hidden-new-fabric')) return false;
        if (card.id === 'newFabricCardRollerExtra' && card.classList.contains('hidden-new-fabric')) return false;

        const checkbox = card.querySelector('.fabric-card-head .checkbox-col input[type="checkbox"]');
        return checkbox && checkbox.checked;
      });

      if (!selectedCards.length) {
        alert('Select at least one fabric to delete.');
        return;
      }

      if (currentGroupName === 'Dual') {
        const dualCards = Array.from(document.querySelectorAll('#dualGroupList > .fabric-card, .dual-added-card'))
          .filter(card => !card.classList.contains('hidden-new-fabric') && card.style.display !== 'none');
        const remainingDualCount = dualCards.filter(card => !selectedCards.includes(card)).length;

        if (remainingDualCount < 1) {
          alert('At least one Dual fabric card must remain.');
          return;
        }
      }

      if (currentGroupName === 'Roller') {
        const rollerCards = getVisibleRollerCards();
        const remainingRollerCount = rollerCards.filter(card => !selectedCards.includes(card)).length;

        if (remainingRollerCount < 1) {
          alert('At least one Roller fabric card must remain.');
          return;
        }
      }


      try {


        selectedCards.forEach(card => card.remove());
        setPendingApply();
      } catch (error) {
        console.error(error);
        alert('Could not remove the selected items.');
      }
    }

    function deleteSelectedColors(button) {
      const card = button.closest('.fabric-card');
      if (!card) return;

      const rows = Array.from(card.querySelectorAll('.mini-table tbody tr'));
      const selectedRows = rows.filter(row => {
        if (row.classList.contains('hidden-row')) return false;
        const checkbox = row.querySelector('td.checkbox-col input[type="checkbox"]');
        return checkbox && checkbox.checked;
      });

      if (!selectedRows.length) {
        alert('Select at least one color to delete.');
        return;
      }

      if (!confirm('Delete selected color item(s)?')) {
        return;
      }

      selectedRows.forEach(row => row.remove());
      setPendingApply();
    }

    function toggleDescriptionInput(select) {
      const wrap = select.closest('.desc-wrap');
      if (!wrap) return;
      const input = wrap.querySelector('.fabric-desc-custom');
      const backBtn = wrap.querySelector('.desc-back-btn');
      const isCustom = select.value === 'Custom';
      const isPlaceholder = select.value === 'Description';

      select.classList.toggle('placeholder-like', isPlaceholder);

      if (input) {
        input.classList.toggle('hidden-desc-custom', !isCustom);
        if (isCustom) {
          input.focus();
        } else {
          input.value = '';
        }
      }

      select.classList.toggle('hidden-desc-custom', isCustom);
      if (backBtn) {
        backBtn.classList.toggle('hidden-desc-back', !isCustom);
      }
    }

    function revertDescription(button) {
      const wrap = button.closest('.desc-wrap');
      if (!wrap) return;
      const select = wrap.querySelector('.fabric-desc-select');
      const input = wrap.querySelector('.fabric-desc-custom');
      if (!select || !input) return;
      select.value = 'Description';
      input.value = '';
      toggleDescriptionInput(select);
      setPendingApply();
    }

    function getDescriptionValue(card) {
      const select = card.querySelector('.fabric-desc-select');
      const custom = card.querySelector('.fabric-desc-custom');
      if (!select) return '';
      if (select.value === 'Custom') {
        return custom ? custom.value.trim() : '';
      }
      return select.value === 'Description' ? '' : select.value;
    }

    function getWidthValue(card) {
      const input = card.querySelector('.fabric-width-input');
      if (!input) return '';
      return input.value.trim();
    }

    function formatCurrencyValue(value) {
      const num = window.parseFabricNumber(value, true);
      if (num === null) return String(value ?? '');
      return '$' + num.toFixed(2);
    }

    function normalizePriceInput(input) {
      if (!input) return;
      const rawValue = String(input.value || '').trim();

      const valid = window.parseFabricNumber(rawValue, true) !== null;
      input.setAttribute('aria-invalid', String(rawValue !== '' && !valid));
      if (valid) input.value = formatCurrencyValue(rawValue);
    }

    function normalizeAllPrices() {
      document.querySelectorAll('.price-input').forEach(input => {
        normalizePriceInput(input);
      });
    }

    function buildOptionHtml(options, selectedValue) {
      return options
        .map(option => \`<option\${option === selectedValue ? ' selected' : ''}>\${option}</option>\`)
        .join('');
    }

    function applyDualDescriptionOptions() {
      const dualRoot = document.getElementById('dualGroupList');
      if (!dualRoot) return;

      dualRoot.querySelectorAll('.fabric-desc-select').forEach(select => {
        const currentValue = select.value || 'Description';
        const safeValue = DUAL_DESCRIPTION_OPTIONS.includes(currentValue) ? currentValue : 'Description';
        select.innerHTML = buildOptionHtml(DUAL_DESCRIPTION_OPTIONS, safeValue);
        toggleDescriptionInput(select);
      });

      const dualNewCard = document.getElementById('newFabricCard');
      if (dualNewCard) {
        dualNewCard.querySelectorAll('.fabric-desc-select').forEach(select => {
          const currentValue = select.value || 'Description';
          const safeValue = DUAL_DESCRIPTION_OPTIONS.includes(currentValue) ? currentValue : 'Description';
          select.innerHTML = buildOptionHtml(DUAL_DESCRIPTION_OPTIONS, safeValue);
          toggleDescriptionInput(select);
        });
      }
    }

    function applyRollerDescriptionOptions() {
      const rollerRoot = document.getElementById('rollerGroupList');
      if (!rollerRoot) return;

      rollerRoot.querySelectorAll('.fabric-desc-select').forEach(select => {
        const currentValue = select.value || 'Description';
        const safeValue = ROLLER_DESCRIPTION_OPTIONS.includes(currentValue) ? currentValue : 'Description';
        select.innerHTML = buildOptionHtml(ROLLER_DESCRIPTION_OPTIONS, safeValue);
        toggleDescriptionInput(select);
      });

      const rollerBaseCard = document.getElementById('newFabricCardRoller');
      if (rollerBaseCard) {
        rollerBaseCard.querySelectorAll('.fabric-desc-select').forEach(select => {
          const currentValue = select.value || 'Description';
          const safeValue = ROLLER_DESCRIPTION_OPTIONS.includes(currentValue) ? currentValue : 'Description';
          select.innerHTML = buildOptionHtml(ROLLER_DESCRIPTION_OPTIONS, safeValue);
          toggleDescriptionInput(select);
        });
      }

      const rollerExtraTemplate = document.getElementById('newFabricCardRollerExtra');
      if (rollerExtraTemplate) {
        rollerExtraTemplate.querySelectorAll('.fabric-desc-select').forEach(select => {
          const currentValue = select.value || 'Description';
          const safeValue = ROLLER_DESCRIPTION_OPTIONS.includes(currentValue) ? currentValue : 'Description';
          select.innerHTML = buildOptionHtml(ROLLER_DESCRIPTION_OPTIONS, safeValue);
          toggleDescriptionInput(select);
        });
      }
    }

    function createRollerExtraCard() {
      const template = document.getElementById('newFabricCardRollerExtra');
      const rollerRoot = document.getElementById('rollerGroupList');
      if (!template || !rollerRoot) return;

      const clone = template.cloneNode(true);
      const uid = 'roller-extra-' + Date.now();
      clone.id = uid;
      clone.classList.remove('hidden-new-fabric', 'roller-template-card');
      clone.classList.add('roller-added-card');

      const pendingRow = clone.querySelector('#roller-extra-new-color');
      if (pendingRow) {
        pendingRow.id = uid + '-new-color';
      }

      const addColorBtn = clone.querySelector('.btn.primary');
      if (addColorBtn) {
        addColorBtn.setAttribute('onclick', \`event.stopPropagation(); toggleNewColorRow('\${uid}-new-color')\`);
      }

      clone.querySelectorAll('.inline-input').forEach(input => {
        input.value = '';
      });

      const rollerCodeInput = clone.querySelector('.fabric-name-group .code input');
      if (rollerCodeInput) {
        rollerCodeInput.placeholder = 'New code';
      }

      clone.querySelectorAll('.fabric-desc-custom').forEach(input => {
        input.classList.add('hidden-desc-custom');
      });

      clone.querySelectorAll('.price-input').forEach(input => {
        input.value = '';
        input.removeAttribute('data-user-edited');
      });

      clone.querySelectorAll('.fabric-desc-select').forEach(select => {
        select.innerHTML = buildOptionHtml(ROLLER_DESCRIPTION_OPTIONS, 'Description');
        select.value = 'Description';
      });

      clone.querySelectorAll('.fabric-visibility').forEach(select => {
        select.value = 'Public';
      });

      clone.querySelectorAll('.mini-table tbody tr').forEach((row, index) => {
        const colorInput = row.querySelector('.inline-input');
        if (colorInput) colorInput.value = '';
        const selects = row.querySelectorAll('.inline-select');
        if (selects[0]) selects[0].value = 'Active';
        if (selects[1]) selects[1].value = 'Public';
        if (index > 0) {
          row.classList.add('hidden-row');
          row.classList.remove('hidden-row-active');
        }
      });

      rollerRoot.appendChild(clone);
      bindCardInteractions(clone);
      syncCardColorVisibility(clone);
      applyRollerDescriptionOptions();
    }

    function createAppliedColorRow(code, status, visibility) {
      const row = document.createElement('tr');
      row.innerHTML = \`
        <td class="checkbox-col"><input type="checkbox" /></td>
        <td class="code"><input class="inline-input" value="\${escapeHtml(code)}" /></td>
        <td><select class="inline-select">\${buildOptionHtml(STATUS_OPTIONS, status)}</select></td>
        <td><select class="inline-select">\${buildOptionHtml(getAllowedVisibilityOptions(visibility), visibility)}</select></td>
      \`;
      return row;
    }

    function createNewFabricCard(code, description, price, width, visibility) {
      const rowId = 'new-color-' + Date.now();
      const card = document.createElement('div');
      card.className = 'fabric-card collapsed';
      card.setAttribute('data-fabric', code);
      card.innerHTML = \`
        <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
          <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
          <div class="fabric-name-group">
            <div class="code"><input class="inline-input" value="\${code}" onclick="event.stopPropagation()" /></div>
            <div class="desc-divider">
              <div class="desc-wrap">
                <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                  \${buildOptionHtml(DUAL_DESCRIPTION_OPTIONS, description || 'Description')}
                </select>
                <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" onclick="event.stopPropagation()" />
                <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
              </div>
            </div>
          </div>
          <div>
            <div class="price-width-group">
              <div class="price-cell"><input class="price-input" value="\${formatCurrencyValue(price)}" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
              <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" value="\${width}" onclick="event.stopPropagation()" /></div>
            </div>
          </div>
          <div>
            <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
              \${buildOptionHtml(VISIBILITY_OPTIONS.slice().reverse(), visibility).split('').join('').replace(/<option selected>Public<\\/option><option>Access L3<\\/option><option>Access L2<\\/option><option>Access L1<\\/option><option>Winco Only<\\/option>/, buildOptionHtml(['Public', 'Winco Only', 'Access L1', 'Access L2', 'Access L3'], visibility))}
            </select>
          </div>
          <div style="padding-right: 4px;">
            <div class="card-actions">
              <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('\${rowId}')">Add Color</button>
              <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
            </div>
          </div>
        </div>
        <div class="card-color-wrap">
          <table class="mini-table">
            <thead>
              <tr>
                <th class="checkbox-col"></th>
                <th style="width: 18%;">Color</th>
                <th style="width: 31%;">Status</th>
                <th style="width: 31%;">Visibility</th>
              </tr>
            </thead>
            <tbody>
              <tr id="\${rowId}" class="hidden-row">
                <td class="checkbox-col"><input type="checkbox" /></td>
                <td><input class="inline-input" placeholder="New color code" /></td>
                <td><select class="inline-select">\${buildOptionHtml(STATUS_OPTIONS, 'Active')}</select></td>
                <td><select class="inline-select">\${buildOptionHtml(getAllowedVisibilityOptions(visibility), visibility)}</select></td>
              </tr>
            </tbody>
          </table>
        </div>
      \`;

      const descSelect = card.querySelector('.fabric-desc-select');
      if (description && DUAL_DESCRIPTION_OPTIONS.includes(description) && description !== 'Description') {
        descSelect.value = description;
      }

      return card;
    }

    function applyNewFabricCard() {
      const card = document.getElementById('newFabricCard');
      if (!card || card.classList.contains('hidden-new-fabric')) return true;

      const code = card.querySelector('.code .inline-input')?.value.trim() || '';
      const description = getDescriptionValue(card);
      const price = card.querySelector('.price-input')?.value.trim() || '';
      const width = getWidthValue(card);
      const visibility = card.querySelector('.fabric-visibility')?.value || 'Public';

      if (!code || !description || !price || !width) {
        alert('Please complete New code, Description, Price, and Width before applying.');
        return false;
      }

      const newCard = createNewFabricCard(code, description, price, width, visibility);
      card.parentNode.insertBefore(newCard, card);
      bindCardInteractions(newCard);
      syncCardColorVisibility(newCard);

      card.querySelector('.code .inline-input').value = '';
      const descSelect = card.querySelector('.fabric-desc-select');
      const descCustom = card.querySelector('.fabric-desc-custom');
      if (descSelect) {
        descSelect.value = 'Description';
        toggleDescriptionInput(descSelect);
      }
      if (descCustom) descCustom.value = '';
      const priceInput = card.querySelector('.price-input');
      if (priceInput) priceInput.value = '';
      const widthInput = card.querySelector('.fabric-width-input');
      if (widthInput) widthInput.value = '';
      const visibilitySelect = card.querySelector('.fabric-visibility');
      if (visibilitySelect) visibilitySelect.value = 'Public';
      card.classList.add('hidden-new-fabric');

      return true;
    }

    function applyPendingColors() {
      const cards = Array.from(document.querySelectorAll(currentGroupName === 'Roller' ? '#rollerGroupList .fabric-card' : '#dualGroupList .fabric-card'));

      for (const card of cards) {
        const fabricVisibility = card.querySelector('.fabric-visibility')?.value || 'Public';
        const pendingRows = Array.from(card.querySelectorAll('.mini-table tbody tr.hidden-row-active'));

        for (const row of pendingRows) {
          const colorInput = row.querySelector('.inline-input');
          const selects = row.querySelectorAll('.inline-select');
          const colorCode = colorInput ? colorInput.value.trim() : '';
          const status = selects[0] ? selects[0].value : 'Active';
          const visibility = selects[1] ? selects[1].value : fabricVisibility;

          if (!colorCode) {
            alert('Please enter a Color code before applying.');
            return false;
          }

          const newRow = createAppliedColorRow(colorCode, status, visibility);
          row.parentNode.insertBefore(newRow, row);
          bindInputsForPendingState(newRow);

          if (row.classList.contains('color-pending-row')) {
            row.remove();
          } else {
            colorInput.value = '';
            if (selects[0]) selects[0].value = 'Active';
            if (selects[1]) selects[1].value = fabricVisibility;
            row.classList.add('hidden-row');
            row.classList.remove('hidden-row-active');
          }
        }

        syncCardColorVisibility(card, true);
      }

      return true;
    }

    function bindInputsForPendingState(scope) {
      scope.querySelectorAll('.price-input, .inline-input, .inline-select').forEach(el => {
        el.addEventListener('input', setPendingApply);
        el.addEventListener('change', setPendingApply);
      });

      scope.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('input', function() {
          const rawValue = String(this.value || '').trim();
          if (/[0-9]/.test(rawValue)) {
            this.setAttribute('data-user-edited', 'true');
          } else {
            this.removeAttribute('data-user-edited');
          }
        });

        input.addEventListener('blur', function() {
          normalizePriceInput(this);
        });
      });
    }

    function bindCardInteractions(card) {
      bindInputsForPendingState(card);

      card.querySelectorAll('.fabric-desc-select').forEach(select => {
        select.addEventListener('change', function(event) {
          event.stopPropagation();
          toggleDescriptionInput(this);
          setPendingApply();
        });
        toggleDescriptionInput(select);
      });

      card.querySelectorAll('.desc-back-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
          event.stopPropagation();
          revertDescription(this);
        });
      });

      card.querySelectorAll('.fabric-visibility').forEach(select => {
        select.addEventListener('change', function(event) {
          event.stopPropagation();
          const parentCard = this.closest('.fabric-card');
          syncCardColorVisibility(parentCard);
          setPendingApply();
        });
      });
    }

    function runSelfTests() {
      console.assert(getVisibilityRank('Public') === 4, 'Test failed: Public rank should be 4');
      console.assert(getVisibilityRank('Winco Only') === 0, 'Test failed: Winco Only rank should be 0');
      console.assert(getAllowedVisibilityOptions('Access L2').join('|') === 'Winco Only|Access L1|Access L2', 'Test failed: Access L2 visibility options mismatch');
      console.assert(formatCurrencyValue('$12') === '$12.00', 'Test failed: Currency normalization mismatch');
      console.assert(formatCurrencyValue('abc') === 'abc', 'Test failed: Invalid currency should stay visible');
      console.assert(typeof getWidthValue(document) === 'string', 'Test failed: getWidthValue should return string even on invalid scope');

      const emptyInput = document.createElement('input');
      emptyInput.value = '';
      normalizePriceInput(emptyInput);
      console.assert(emptyInput.value === '', 'Test failed: Empty price should stay empty');

      const typedInput = document.createElement('input');
      typedInput.value = '12.5';
      normalizePriceInput(typedInput);
      console.assert(typedInput.value === '$12.50', 'Test failed: Typed price should normalize to currency');
    }


    function escapeHtml(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function getDescriptionOptionsForGroup(groupName) {
      return groupName === 'Roller' ? ROLLER_DESCRIPTION_OPTIONS : DUAL_DESCRIPTION_OPTIONS;
    }

    function getVisibilitySelectHtml(selectedValue) {
      const ordered = ['Public', 'Winco Only', 'Access L1', 'Access L2', 'Access L3'];
      return ordered
        .map(option => '<option' + (option === selectedValue ? ' selected' : '') + '>' + option + '</option>')
        .join('');
    }

    function createSupabaseFabricCard(fabric) {
      const groupName = fabric.product_group === 'Roller' ? 'Roller' : 'Dual';
      const card = document.createElement('div');
      const uid = 'loaded-fabric-' + fabric.id;
      const pendingColorRowId = uid + '-new-color';
      const descriptionOptions = getDescriptionOptionsForGroup(groupName);
      const description = fabric.description || '';
      const isKnownDescription = descriptionOptions.includes(description);
      const selectedDescription = isKnownDescription && description ? description : (description ? 'Custom' : 'Description');
      const visibility = fabric.visibility || 'Public';
      const colors = Array.isArray(fabric.fabric_colors) ? fabric.fabric_colors : [];

      card.className = 'fabric-card collapsed ' + (groupName === 'Roller' ? 'roller-fixed-card roller-added-card' : 'dual-added-card');
      if (fabric.id) card.dataset.fabricId = fabric.id;
      card.dataset.cardKey = uid;
      card.setAttribute('data-fabric', fabric.code || '');

      const colorRowsHtml = colors.map(color => {
        const colorVisibility = color.visibility || visibility;
        return \`
          <tr data-color-id="\${escapeHtml(color.id || '')}">
            <td class="checkbox-col"><input type="checkbox" /></td>
            <td class="code"><input class="inline-input" value="\${escapeHtml(color.color_code || '')}" /></td>
            <td><select class="inline-select">\${buildOptionHtml(STATUS_OPTIONS, color.status || 'Active')}</select></td>
            <td><select class="inline-select">\${buildColorVisibilityHtml(visibility, colorVisibility, true)}</select></td>
          </tr>
        \`;
      }).join('');

      card.innerHTML = \`
        <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
          <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
          <div class="fabric-name-group">
            <div class="code"><input class="inline-input" value="\${escapeHtml(fabric.code || '')}" placeholder="Code" onclick="event.stopPropagation()" /></div>
            <div class="desc-divider">
              <div class="desc-wrap">
                <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                  \${buildOptionHtml(descriptionOptions, selectedDescription)}
                </select>
                <input class="inline-input fabric-desc-custom \${selectedDescription === 'Custom' ? '' : 'hidden-desc-custom'}" value="\${selectedDescription === 'Custom' ? escapeHtml(description) : ''}" placeholder="Custom" onclick="event.stopPropagation()" />
                <button type="button" class="desc-back-btn \${selectedDescription === 'Custom' ? '' : 'hidden-desc-back'}" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
              </div>
            </div>
          </div>
          <div>
            <div class="price-width-group">
              <div class="price-cell"><input class="price-input" value="\${fabric.price !== null && fabric.price !== undefined ? formatCurrencyValue(fabric.price) : ''}" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
              <div class="width-cell"><input class="inline-input fabric-width-input" value="\${fabric.width !== null && fabric.width !== undefined ? escapeHtml(fabric.width) : ''}" placeholder="Width" style="height: 26px;" onclick="event.stopPropagation()" /></div>
            </div>
          </div>
          <div>
            <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
              \${getVisibilitySelectHtml(visibility)}
            </select>
          </div>
          <div style="padding-right: 4px;">
            <div class="card-actions">
              <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('\${pendingColorRowId}')">Add Color</button>
              <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
            </div>
          </div>
        </div>
        <div class="card-color-wrap">
          <table class="mini-table">
            <thead>
              <tr>
                <th class="checkbox-col"></th>
                <th style="width: 18%;">Color</th>
                <th style="width: 31%;">Status</th>
                <th style="width: 31%;">Visibility</th>
              </tr>
            </thead>
            <tbody>
              \${colorRowsHtml}
              <tr id="\${pendingColorRowId}" class="hidden-row">
                <td class="checkbox-col"><input type="checkbox" /></td>
                <td><input class="inline-input" placeholder="New color code" /></td>
                <td><select class="inline-select">\${buildOptionHtml(STATUS_OPTIONS, 'Active')}</select></td>
                <td><select class="inline-select">\${buildOptionHtml(getAllowedVisibilityOptions(visibility), visibility)}</select></td>
              </tr>
            </tbody>
          </table>
        </div>
      \`;

      return card;
    }

    function renderFabricDataFromSupabase(fabrics) {
      if (!Array.isArray(fabrics)) {
        return;
      }

      const dualRoot = document.getElementById('dualGroupList');
      const rollerRoot = document.getElementById('rollerGroupList');
      const rollerBaseCard = document.getElementById('newFabricCardRoller');

      if (dualRoot) dualRoot.innerHTML = '';
      if (rollerRoot) rollerRoot.innerHTML = '';

      if (rollerBaseCard) {
        rollerBaseCard.classList.add('hidden-new-fabric', 'roller-template-card');
        rollerBaseCard.style.display = 'none';
      }

      fabrics.forEach(fabric => {
        const card = createSupabaseFabricCard(fabric);
        if (fabric.product_group === 'Roller') {
          if (rollerRoot) rollerRoot.appendChild(card);
        } else {
          if (dualRoot) dualRoot.appendChild(card);
        }

        bindCardInteractions(card);
        syncCardColorVisibility(card, true);
      });

      setCurrentGroup(currentGroupName || 'Dual');
      setApplied();
    }

    function initFabricPage() {
      if (disposed) return;
      document.getElementById('deleteFabricBtn')?.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        deleteSelectedFabrics();
      });



      document.querySelectorAll('.fabric-card').forEach(card => bindCardInteractions(card));
      syncAllCardsVisibility();
      applyDualDescriptionOptions();
      applyRollerDescriptionOptions();
      const defaultDualCards = Array.from(document.querySelectorAll('#dualGroupList > .fabric-card'));
      defaultDualCards.forEach(function(card, index) {
        if (index > 0) {
          card.remove();
        }
      });

      const defaultRollerCards = Array.from(document.querySelectorAll('#rollerGroupList > .fabric-card'))
        .filter(function(card) {
          return !card.classList.contains('roller-template-card');
        });
      defaultRollerCards.forEach(function(card, index) {
        if (index > 0) {
          card.remove();
        }
      });

      const standaloneRollerBaseCard = document.getElementById('newFabricCardRoller');
      if (standaloneRollerBaseCard) {
        standaloneRollerBaseCard.remove();
      }
      setCurrentGroup('Dual');

      if (window.loadFabricDataFromSupabase) {
        window.loadFabricDataFromSupabase()
          .then(function(fabrics) {
            if (disposed) return;
            renderFabricDataFromSupabase(fabrics);
            pageRoot?.dispatchEvent(new Event('catalog-ready'));
          })
          .catch(function(error) {
            if (disposed) return;
            console.error(error);
            pageRoot?.dispatchEvent(new Event('catalog-load-error'));
          });
      }

      document.querySelectorAll('.tabbar .tab').forEach(tab => {
        tab.addEventListener('click', function() {
          const groupName = this.dataset.group || 'Dual';
          setCurrentGroup(groupName);
        });
      });
      runSelfTests();

      window.deleteSelectedFabrics = deleteSelectedFabrics;
      window.toggleFabricCard = toggleFabricCard;
      window.toggleNewFabricRow = toggleNewFabricRow;
      window.toggleNewColorRow = toggleNewColorRow;
      window.deleteSelectedColors = deleteSelectedColors;
      window.toggleDescriptionInput = toggleDescriptionInput;
      window.revertDescription = revertDescription;
    }

  function restoreCatalogGroup(rows, group) {
 const list = document.getElementById(group === 'Roller' ? 'rollerGroupList' : 'dualGroupList');
 list.innerHTML = '';
 rows.forEach(row => { const card = createSupabaseFabricCard({...row, id:row.fabric_id, fabric_colors:row.colors}); list.appendChild(card); bindCardInteractions(card); syncCardColorVisibility(card, true); });
 setCurrentGroup(currentGroupName);
 }
 window.prepareFabricCatalogSave = () => { if (!applyPendingColors()) return false; normalizeAllPrices(); return true; };
 window.restoreFabricCatalogGroup = restoreCatalogGroup;
  window.initFabricPage = initFabricPage;
})();
`,h=`
  <div class="app">
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
          <div class="admin-subnav-item current">Fabric</div>
          <div class="admin-subnav-item">Hardware</div>
          <div class="admin-subnav-item">Control System</div>
          <div class="admin-subnav-item">Pricing</div>
          <div class="admin-subnav-item">Accounts</div>
        </div>
      </nav>

      <section class="topbar">
        <div class="title-wrap">
          <h1>Fabric</h1>
          <p id="lastUpdatedText">Last updated: Loading…</p>
        </div>
        <div class="tabbar" aria-label="Product group tabs">
          <button class="tab active" type="button" data-group="Dual">Dual</button>
          <button class="tab" type="button" data-group="Roller">Roller</button>
        </div>
      </section>

      <section class="stack">
        <div class="panel">
          <div class="panel-head fabric-list-head" style="border-bottom: 1px solid var(--line-soft);">
            <div class="panel-title">
              <strong id="fabricListTitle">Dual Fabric List</strong>
              <span id="selectedGroupLabel">Selected group: Dual</span>
            </div>
            <div class="actions">
              <button class="btn primary" type="button" onclick="toggleNewFabricRow()">Add Fabric</button>
              <button class="btn danger" type="button" id="deleteFabricBtn">Delete Fabric</button>
              <button class="btn" type="button" id="applyBtn" style="min-width: 96px;">Apply</button>
              <span id="applyStatus" style="font-size: 11px; color: var(--blue); font-weight: 600; align-self: center;">Applied</span>
            </div>
          </div>

          <div class="card-list" id="cardList">
            <div id="dualGroupList">
              <div class="fabric-card collapsed" data-fabric="PLU">
                <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
                  <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
                  <div class="fabric-name-group">
                    <div class="code"><input class="inline-input" placeholder="Code" onclick="event.stopPropagation()" /></div>
                    <div class="desc-divider">
                      <div class="desc-wrap">
                        <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                          <option selected>Description</option>
                          <option>Room Darkening</option>
                          <option>Light Filtering</option>
                          <option>Custom</option>
                        </select>
                        <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" onclick="event.stopPropagation()" />
                        <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="price-width-group">
                      <div class="price-cell"><input class="price-input" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                      <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                    </div>
                  </div>
                  <div>
                    <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
                      <option selected>Public</option>
                      <option>Winco Only</option>
                      <option>Access L1</option>
                      <option>Access L2</option>
                      <option>Access L3</option>
                    </select>
                  </div>
                  <div style="padding-right: 4px;">
                    <div class="card-actions">
                      <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('plu-new-color')">Add Color</button>
                      <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
                    </div>
                  </div>
                </div>
                <div class="card-color-wrap">
                  <table class="mini-table">
                    <thead>
                      <tr>
                        <th class="checkbox-col"></th>
                        <th style="width: 18%;">Color</th>
                        <th style="width: 31%;">Status</th>
                        <th style="width: 31%;">Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td class="code"><input class="inline-input" placeholder="Color" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                      <tr id="plu-new-color" class="hidden-row">
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td><input class="inline-input" placeholder="New color code" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="fabric-card collapsed" data-fabric="SIG">
                <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
                  <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
                  <div class="fabric-name-group">
                    <div class="code"><input class="inline-input" placeholder="Code" onclick="event.stopPropagation()" /></div>
                    <div class="desc-divider">
                      <div class="desc-wrap">
                        <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                          <option selected>Description</option>
                          <option>Room Darkening</option>
                          <option>Light Filtering</option>
                          <option>Custom</option>
                        </select>
                        <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" onclick="event.stopPropagation()" />
                        <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="price-width-group">
                      <div class="price-cell"><input class="price-input" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                      <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                    </div>
                  </div>
                  <div>
                    <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
                      <option selected>Public</option>
                      <option>Winco Only</option>
                      <option>Access L1</option>
                      <option>Access L2</option>
                      <option>Access L3</option>
                    </select>
                  </div>
                  <div style="padding-right: 4px;">
                    <div class="card-actions">
                      <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('sig-new-color')">Add Color</button>
                      <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
                    </div>
                  </div>
                </div>
                <div class="card-color-wrap">
                  <table class="mini-table">
                    <thead>
                      <tr>
                        <th class="checkbox-col"></th>
                        <th style="width: 18%;">Color</th>
                        <th style="width: 31%;">Status</th>
                        <th style="width: 31%;">Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td class="code"><input class="inline-input" placeholder="Color" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                      <tr id="sig-new-color" class="hidden-row">
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td><input class="inline-input" placeholder="New color code" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="fabric-card collapsed" data-fabric="SF">
                <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
                  <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
                  <div class="fabric-name-group">
                    <div class="code"><input class="inline-input" placeholder="Code" onclick="event.stopPropagation()" /></div>
                    <div class="desc-divider">
                      <div class="desc-wrap">
                        <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                          <option selected>Description</option>
                          <option>Room Darkening</option>
                          <option>Light Filtering</option>
                          <option>Custom</option>
                        </select>
                        <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" onclick="event.stopPropagation()" />
                        <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="price-width-group">
                      <div class="price-cell"><input class="price-input" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                      <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                    </div>
                  </div>
                  <div>
                    <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
                      <option selected>Public</option>
                      <option>Winco Only</option>
                      <option>Access L1</option>
                      <option>Access L2</option>
                      <option>Access L3</option>
                    </select>
                  </div>
                  <div style="padding-right: 4px;">
                    <div class="card-actions">
                      <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('sf-new-color')">Add Color</button>
                      <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
                    </div>
                  </div>
                </div>
                <div class="card-color-wrap">
                  <table class="mini-table">
                    <thead>
                      <tr>
                        <th class="checkbox-col"></th>
                        <th style="width: 18%;">Color</th>
                        <th style="width: 31%;">Status</th>
                        <th style="width: 31%;">Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td class="code"><input class="inline-input" placeholder="Color" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                      <tr id="sf-new-color" class="hidden-row">
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td><input class="inline-input" placeholder="New color code" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div id="rollerGroupList" class="hidden-new-fabric">
              <div class="fabric-card collapsed roller-fixed-card" data-fabric="R-SCR-3">
                <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
                  <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
                  <div class="fabric-name-group">
                    <div class="code"><input class="inline-input" placeholder="Code" onclick="event.stopPropagation()" /></div>
                    <div class="desc-divider">
                      <div class="desc-wrap">
                        <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                          <option selected>Description</option>
                          <option>Blackout</option>
                          <option>Light Filtering</option>
                          <option>Privacy Sunscreen</option>
                          <option>1% Sunscreen</option>
                          <option>3% Sunscreen</option>
                          <option>5% Sunscreen</option>
                          <option>Custom</option>
                        </select>
                        <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" onclick="event.stopPropagation()" />
                        <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="price-width-group">
                      <div class="price-cell"><input class="price-input" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                      <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                    </div>
                  </div>
                  <div>
                    <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
                      <option selected>Public</option>
                      <option>Winco Only</option>
                      <option>Access L1</option>
                      <option>Access L2</option>
                      <option>Access L3</option>
                    </select>
                  </div>
                  <div style="padding-right: 4px;">
                    <div class="card-actions">
                      <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('roller-1-new-color')">Add Color</button>
                      <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
                    </div>
                  </div>
                </div>
                <div class="card-color-wrap">
                  <table class="mini-table">
                    <thead>
                      <tr>
                        <th class="checkbox-col"></th>
                        <th style="width: 18%;">Color</th>
                        <th style="width: 31%;">Status</th>
                        <th style="width: 31%;">Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td class="code"><input class="inline-input" placeholder="Color" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                      <tr id="roller-1-new-color" class="hidden-row">
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td><input class="inline-input" placeholder="New color code" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="fabric-card collapsed roller-fixed-card roller-card-2" data-fabric="R-BO">
                <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
                  <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
                  <div class="fabric-name-group">
                    <div class="code"><input class="inline-input" placeholder="Code" onclick="event.stopPropagation()" /></div>
                    <div class="desc-divider">
                      <div class="desc-wrap">
                        <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                          <option selected>Description</option>
                          <option>Blackout</option>
                          <option>Light Filtering</option>
                          <option>Privacy Sunscreen</option>
                          <option>1% Sunscreen</option>
                          <option>3% Sunscreen</option>
                          <option>5% Sunscreen</option>
                          <option>Custom</option>
                        </select>
                        <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" onclick="event.stopPropagation()" />
                        <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="price-width-group">
                      <div class="price-cell"><input class="price-input" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                      <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                    </div>
                  </div>
                  <div>
                    <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
                      <option selected>Public</option>
                      <option>Winco Only</option>
                      <option>Access L1</option>
                      <option>Access L2</option>
                      <option>Access L3</option>
                    </select>
                  </div>
                  <div style="padding-right: 4px;">
                    <div class="card-actions">
                      <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('roller-2-new-color')">Add Color</button>
                      <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
                    </div>
                  </div>
                </div>
                <div class="card-color-wrap">
                  <table class="mini-table">
                    <thead>
                      <tr>
                        <th class="checkbox-col"></th>
                        <th style="width: 18%;">Color</th>
                        <th style="width: 31%;">Status</th>
                        <th style="width: 31%;">Visibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td class="code"><input class="inline-input" placeholder="Color" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                      <tr id="roller-2-new-color" class="hidden-row">
                        <td class="checkbox-col"><input type="checkbox" /></td>
                        <td><input class="inline-input" placeholder="New color code" /></td>
                        <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                        <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="fabric-card collapsed roller-base-card roller-fixed-card roller-card-3" id="newFabricCardRoller">
              <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
                <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
                <div class="fabric-name-group">
                  <div class="code"><input class="inline-input" placeholder="Code" onclick="event.stopPropagation()" /></div>
                  <div class="desc-divider">
                    <div class="desc-wrap">
                      <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                        <option selected>Description</option>
                        <option>Blackout</option>
                        <option>Light Filtering</option>
                        <option>Privacy Sunscreen</option>
                        <option>1% Sunscreen</option>
                        <option>3% Sunscreen</option>
                        <option>5% Sunscreen</option>
                        <option>Custom</option>
                      </select>
                      <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" onclick="event.stopPropagation()" />
                      <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="price-width-group">
                    <div class="price-cell"><input class="price-input" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                    <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                  </div>
                </div>
                <div>
                  <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
                    <option selected>Public</option>
                    <option>Winco Only</option>
                    <option>Access L1</option>
                    <option>Access L2</option>
                    <option>Access L3</option>
                  </select>
                </div>
                <div style="padding-right: 4px;">
                  <div class="card-actions">
                    <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('roller-base-new-color')">Add Color</button>
                    <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
                  </div>
                </div>
              </div>
              <div class="card-color-wrap">
                <table class="mini-table">
                  <thead>
                    <tr>
                      <th class="checkbox-col"></th>
                      <th style="width: 18%;">Color</th>
                      <th style="width: 31%;">Status</th>
                      <th style="width: 31%;">Visibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="checkbox-col"><input type="checkbox" /></td>
                      <td class="code"><input class="inline-input" placeholder="Color" /></td>
                      <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                      <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                    </tr>
                    <tr id="roller-base-new-color" class="hidden-row">
                      <td class="checkbox-col"><input type="checkbox" /></td>
                      <td><input class="inline-input" placeholder="New color code" /></td>
                      <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                      <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="fabric-card collapsed hidden-new-fabric roller-template-card" id="newFabricCardRollerExtra">
              <div class="fabric-card-head clickable" onclick="toggleFabricCard(this)">
                <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
                <div class="fabric-name-group">
                  <div class="code"><input class="inline-input" placeholder="Code" onclick="event.stopPropagation()" /></div>
                  <div class="desc-divider">
                    <div class="desc-wrap">
                      <select class="inline-select fabric-desc-select" onclick="event.stopPropagation()">
                        <option selected>Description</option>
                        <option>Blackout</option>
                        <option>Room Darkening</option>
                        <option>Light Filtering</option>
                        <option>Privacy Sunscreen</option>
                        <option>1% Sunscreen</option>
                        <option>3% Sunscreen</option>
                        <option>5% Sunscreen</option>
                        <option>Custom</option>
                      </select>
                      <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" onclick="event.stopPropagation()" />
                      <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="price-width-group">
                    <div class="price-cell"><input class="price-input" placeholder="Price" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                    <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" onclick="event.stopPropagation()" /></div>
                  </div>
                </div>
                <div>
                  <select class="inline-select fabric-visibility" onclick="event.stopPropagation()">
                    <option selected>Public</option>
                    <option>Winco Only</option>
                    <option>Access L1</option>
                    <option>Access L2</option>
                    <option>Access L3</option>
                  </select>
                </div>
                <div style="padding-right: 4px;">
                  <div class="card-actions">
                    <button class="btn primary" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); toggleNewColorRow('roller-extra-new-color')">Add Color</button>
                    <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
                  </div>
                </div>
              </div>
              <div class="card-color-wrap">
                <table class="mini-table">
                  <thead>
                    <tr>
                      <th class="checkbox-col"></th>
                      <th style="width: 18%;">Color</th>
                      <th style="width: 31%;">Status</th>
                      <th style="width: 31%;">Visibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="checkbox-col"><input type="checkbox" /></td>
                      <td class="code"><input class="inline-input" placeholder="Color" /></td>
                      <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                      <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                    </tr>
                    <tr id="roller-extra-new-color" class="hidden-row">
                      <td class="checkbox-col"><input type="checkbox" /></td>
                      <td><input class="inline-input" placeholder="New color code" /></td>
                      <td><select class="inline-select"><option selected>Active</option><option>Limited stock</option><option>Discontinued</option><option>Discontinued / Limited stock</option></select></td>
                      <td><select class="inline-select"><option selected>Public</option><option>Winco Only</option><option>Access L1</option><option>Access L2</option><option>Access L3</option></select></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="fabric-card collapsed hidden-new-fabric" id="newFabricCard">
              <div class="fabric-card-head">
                <div class="checkbox-col"><input type="checkbox" onclick="event.stopPropagation()" /></div>
                <div class="fabric-name-group">
                  <div class="code"><input class="inline-input" placeholder="New code" /></div>
                  <div class="desc-divider">
                    <div class="desc-wrap">
                      <select class="inline-select fabric-desc-select">
                        <option selected>Description</option>
                        <option>Blackout</option>
                        <option>Room Darkening</option>
                        <option>Light Filtering</option>
                        <option>Privacy Sunscreen</option>
                        <option>1% Sunscreen</option>
                        <option>3% Sunscreen</option>
                        <option>5% Sunscreen</option>
                        <option>Custom</option>
                      </select>
                      <input class="inline-input fabric-desc-custom hidden-desc-custom" placeholder="Custom" />
                      <button type="button" class="desc-back-btn hidden-desc-back" title="Back to description list" onclick="event.stopPropagation(); revertDescription(this)"><</button>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="price-width-group">
                    <div class="price-cell"><input class="price-input" placeholder="Price" style="height: 26px;" /></div>
                    <div class="width-cell"><input class="inline-input fabric-width-input" placeholder="Width" style="height: 26px;" /></div>
                  </div>
                </div>
                <div>
                  <select class="inline-select fabric-visibility">
                    <option selected>Public</option>
                    <option>Winco Only</option>
                    <option>Access L1</option>
                    <option>Access L2</option>
                    <option>Access L3</option>
                  </select>
                </div>
                <div style="padding-right: 4px;">
                  <div class="card-actions">
                    <button class="btn primary" type="button" style="min-width: 96px;">Add Color</button>
                    <button class="btn danger" type="button" style="min-width: 96px;" onclick="event.stopPropagation(); deleteSelectedColors(this)">Delete Color</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="note">
            Click a fabric row to view colors. Width is now direct input with placeholder styling like the Quote screen. Visibility is managed separately. New Fabric is added by row.
          </div>
        </div>
      </section>
    </div>
  </div>

  `;function g(e,t=!1){return d(e,t)}function _(e){let t=e.querySelector(`.fabric-desc-select`),n=e.querySelector(`.fabric-desc-custom`);return t?t.value===`Custom`?n?n.value.trim():``:t.value===`Description`?``:t.value||``:``}function v(e){return e.closest(`#rollerGroupList`)||e.classList.contains(`roller-fixed-card`)||e.classList.contains(`roller-added-card`)||e.id===`newFabricCardRoller`?`Roller`:`Dual`}function y(e){return!(!e||e.classList.contains(`hidden-new-fabric`)||e.classList.contains(`roller-template-card`)||e.id===`newFabricCard`||e.id===`newFabricCardRollerExtra`)}function b(e,t){return!(v(e)!==t||window.getComputedStyle(e).display===`none`)}function x(e,t){return Array.from(e.querySelectorAll(`.mini-table tbody tr`)).filter(e=>!(window.getComputedStyle(e).display===`none`||e.classList.contains(`hidden-row`)&&!e.classList.contains(`hidden-row-active`))).map(e=>{let n=e.querySelector(`td:nth-child(2) input`),r=e.querySelectorAll(`select`);return{id:e.dataset.colorId||null,color_code:n?n.value.trim():``,status:r[0]?r[0].value:`Active`,visibility:r[1]?r[1].value:t}}).filter(e=>e.color_code)}function S(){let e=document.querySelector(`.fabric-page .tabbar .tab.active`),t=e&&e.dataset.group||`Dual`;return Array.from(document.querySelectorAll(`.fabric-page .fabric-card`)).filter(y).filter(e=>b(e,t)).map((e,t)=>{let n=e.querySelector(`.fabric-name-group .code input`),r=e.querySelector(`.price-input`),i=e.querySelector(`.fabric-width-input`),a=e.querySelector(`.fabric-visibility`),o=a?a.value:`Public`;return e.dataset.cardKey||(e.dataset.cardKey=`fabric-card-`+Date.now()+`-`+Math.floor(Math.random()*1e6)),{_card_key:e.dataset.cardKey,fabric_id:e.dataset.fabricId||null,product_group:v(e),code:n?n.value.trim():``,description:_(e),price:g(r?r.value:``,!0),width:g(i?i.value:``),visibility:o,sort_order:t+1,colors:x(e,o)}}).filter(e=>e.fabric_id||e.code||e.description||e.price!==null||e.width!==null||e.colors.length>0)}function C({currentUser:e,onOpenMainPage:r,onOpenMeasurePage:g,onOpenQuotesPage:_,onOpenOrdersPage:v,onOpenClientsPage:y,onOpenResourcesPage:b,onOpenAdminPage:x,onOpenAdminHardwarePage:C,onOpenAdminControlSystemPage:w,onOpenAdminPricingPage:T,onOpenAdminAccountsPage:E,onOpenAdminFeedbackPage:D}){(0,f.useEffect)(()=>u(document.querySelector(`.fabric-page`),`fabric`),[]),(0,f.useEffect)(()=>l(document.querySelector(`.fabric-page`)),[]);let O=n(e),k=a(h,e?.account_name||`Charles / Winco`,O,e?.role===`Admin`);return(0,f.useEffect)(()=>{window.parseFabricNumber=d;let n=document.createElement(`script`);n.type=`text/javascript`,n.dataset.wincoFabricPage=`true`,n.text=m,document.body.appendChild(n),window.collectFabricDataFromFabricPage=S;let a=o(document.querySelector(`.fabric-page`)),l=s(t,`fabric`,{onLastUpdated:a.render});window.loadFabricDataFromSupabase=async()=>{try{return await l.load()}catch(e){throw a.unavailable(),e}};let u=c(document.querySelector(`.fabric-page`),{canEdit:e?.role===`Admin`,kind:`fabric`,idKey:`fabric_id`,collect:S,saveGroup:async(t,n)=>{if(e?.role!==`Admin`)throw Error(`Admin access required`);let r=await l.save(t,n);window.restoreFabricCatalogGroup(r,t)},restore:(e,t)=>window.restoreFabricCatalogGroup(e,t),prepare:()=>window.prepareFabricCatalogSave()}),f=window.setTimeout(()=>{typeof window.initFabricPage==`function`&&window.initFabricPage()},0),p=i(document.querySelector(`.fabric-page`),{onOpenMainPage:r,onOpenMeasurePage:g,onOpenQuotesPage:_,onOpenOrdersPage:v,onOpenClientsPage:y,onOpenResourcesPage:b,onOpenAdminPage:x,onOpenAdminHardwarePage:C,onOpenAdminControlSystemPage:w,onOpenAdminPricingPage:T,onOpenAdminAccountsPage:E,onOpenAdminFeedbackPage:D},{});return()=>{window.destroyFabricPage?.(),delete window.destroyFabricPage,u(),delete window.parseFabricNumber,delete window.restoreFabricCatalogGroup,delete window.prepareFabricCatalogSave,typeof p==`function`&&p(),window.clearTimeout(f),delete window.collectFabricDataFromFabricPage,delete window.loadFabricDataFromSupabase,n.parentNode&&n.parentNode.removeChild(n),window.initFabricPage&&delete window.initFabricPage,window.deleteSelectedFabrics&&delete window.deleteSelectedFabrics,window.toggleFabricCard&&delete window.toggleFabricCard,window.toggleNewFabricRow&&delete window.toggleNewFabricRow,window.toggleNewColorRow&&delete window.toggleNewColorRow,window.deleteSelectedColors&&delete window.deleteSelectedColors,window.toggleDescriptionInput&&delete window.toggleDescriptionInput,window.revertDescription&&delete window.revertDescription}},[r,g,_,v,y,b,x,C,w,T,E,D]),(0,p.jsx)(`div`,{className:`fabric-page admin-design catalog-page`,dangerouslySetInnerHTML:{__html:k}})}export{C as default};