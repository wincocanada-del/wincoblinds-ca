import{n as e,r as t}from"./supabaseClient-CdMXQqVK.js";import{t as n}from"./jsx-runtime-C8sGzQnj.js";import{n as r}from"./pageNavigation-CLb-LSEZ.js";import{c as i,s as a}from"./productDependencies-Cz6O8XzH.js";import{n as o,t as s}from"./catalogLastUpdated-BKmULvXX.js";import{n as c,r as l,t as u}from"./adminCatalogDesign-B6ihXxrv.js";import{n as d,t as f}from"./catalogSortControls-CAZz1v6I.js";var p=t(),m=n(),h=`(function() {
  const pageRoot = document.querySelector('.hardware-page');
  let disposed = false;
  window.destroyHardwarePage = () => {
    disposed = true;
    document.removeEventListener('click', closePageDropdowns);
  };


function setPendingApply() { document.querySelector('.hardware-page')?.dispatchEvent(new Event('catalog-dirty')); }

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

    function resetDescriptionDropdown(dropdown) {
      const btn = dropdown.querySelector('[data-demo-dropdown-btn]');
      const items = dropdown.querySelectorAll('.demo-dropdown-item');
      items.forEach(item => item.classList.remove('selected'));
      if (btn) {
        btn.textContent = 'Description';
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
      const isBottom = group === 'bottom';
      document.getElementById('headrailGroup').style.display = isBottom ? 'none' : '';
      document.getElementById('bottomGroup').style.display = isBottom ? '' : 'none';
      document.getElementById('listTitle').textContent = isBottom ? 'Bottom rail List' : 'Headrail List';
      document.getElementById('groupLabel').textContent = isBottom ? 'Selected group: Bottom rail' : 'Selected group: Headrail';
      document.getElementById('addBtn').textContent = 'Add';
      document.getElementById('deleteBtn').textContent = 'Delete';

      document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.group === group);
      });
    }

    function getCurrentGroupKey() {
      return document.querySelector('.tab.active')?.dataset.group || 'headrail';
    }

    function getCodeValue(card) {
      return card.querySelector('.name-group .inline-input')?.value.trim() || '';
    }

    function getDescriptionValue(card) {
      const inputs = card.querySelectorAll('.name-group .inline-input');
      return inputs[1]?.value.trim() || '';
    }

    function getCurrentPricingValue(card) {
      const pricing = card.querySelector('.hardware-card-head > div:nth-child(3) [data-demo-dropdown-btn]');
      return pricing ? pricing.textContent.trim() : 'Included';
    }

    function getCurrentVisibilityValue(card) {
      const visibility = card.querySelector('.hardware-card-head > div:nth-child(4) [data-demo-dropdown-btn]');
      return visibility ? visibility.textContent.trim() : 'Public';
    }

    function buildCode(groupKey, index) {
      return '';
    }

    function resetCardValues(card, groupKey, index) {
      const nameInputs = card.querySelectorAll('.name-group .inline-input');
      if (nameInputs[0]) {
        nameInputs[0].value = buildCode(groupKey, index);
        nameInputs[0].placeholder = 'Code';
      }
      if (nameInputs[1]) nameInputs[1].value = '';

      const headDropdowns = card.querySelectorAll('.hardware-card-head [data-demo-dropdown]');
      if (headDropdowns[0]) resetPricingDropdown(headDropdowns[0], 'Included');
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
      const container = document.getElementById(groupKey === 'bottom' ? 'bottomGroup' : 'headrailGroup');
      if (!container) return;
      const sourceCard = container.querySelector('.hardware-card') || createHardwareCardFromSupabase({product_group:groupKey === 'bottom' ? 'Bottom rail' : 'Headrail'});

      const clone = sourceCard.cloneNode(true);
      delete clone.dataset.hardwareId;
      delete clone.dataset.cardKey;
      clone.querySelectorAll('[data-bound]').forEach(el => el.removeAttribute('data-bound'));
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
      const container = document.getElementById(groupKey === 'bottom' ? 'bottomGroup' : 'headrailGroup');
      if (!container) return;

      const cards = Array.from(container.querySelectorAll('.hardware-card'));
      const selected = cards.filter(card => {
        const box = card.querySelector('.hardware-card-head input[type="checkbox"]');
        return box && box.checked;
      });

      if (!selected.length) {
        alert(\`Select at least one \${groupKey === 'bottom' ? 'Bottom rail' : 'Headrail'} to delete.\`);
        return;
      }

      if (cards.length - selected.length < 1) {
        alert(\`At least one \${groupKey === 'bottom' ? 'Bottom rail' : 'Headrail'} card must remain.\`);
        return;
      }


      try {

        selected.forEach(card => card.remove());
        setPendingApply();
      } catch (error) {
        console.error(error);
        alert('Could not remove the selected items.');
      }
    }

    function bindCardHeader(scope = document) {
      scope.querySelectorAll('.hardware-card-head').forEach(head => {
        if (head.dataset.bound === 'true') return;
        head.dataset.bound = 'true';
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

    function runSelfTests() {
      console.assert(document.querySelector('#headrailGroup .hardware-card') !== null, 'Headrail card should exist');
      console.assert(document.querySelector('#bottomGroup .hardware-card') !== null, 'Bottom rail card should exist');
      console.assert(buildCode('headrail', 2) === '', 'Headrail code helper should return empty string');
      console.assert(buildCode('bottom', 3) === '', 'Bottom rail code helper should return empty string');
      console.assert(document.querySelector('.tab.active')?.dataset.group === 'headrail', 'Headrail tab should be active on load');
      console.assert(document.querySelector('#headrailGroup .demo-dropdown-btn.placeholder-like')?.textContent.trim() === 'Description', 'Description placeholder should render');

      const testWrap = document.createElement('div');
      testWrap.innerHTML = '<div class="demo-dropdown" data-demo-dropdown data-bound="true"><button type="button" class="demo-dropdown-btn placeholder-like" data-demo-dropdown-btn>Description</button><div class="demo-dropdown-menu" data-demo-dropdown-menu><div class="demo-dropdown-item" data-value="White">White</div><div class="demo-dropdown-item" data-value="Black">Black</div></div></div>';
      testWrap.querySelectorAll('[data-bound]').forEach(el => el.removeAttribute('data-bound'));
      bindDemoDropdowns(testWrap);
      const btn = testWrap.querySelector('[data-demo-dropdown-btn]');
      btn.click();
      console.assert(testWrap.querySelector('[data-demo-dropdown]').classList.contains('open'), 'Cloned dropdown should bind after data-bound reset');
    }

    function closePageDropdowns() {
      if (disposed) return;
      pageRoot?.querySelectorAll('[data-demo-dropdown].open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.classList.remove('open-up');
      });
    }
    document.addEventListener('click', closePageDropdowns);


    function escapeHardwareHtml(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function buildHardwareDropdownHtml(options, selectedValue) {
      return options.map(function(option) {
        const selected = option === selectedValue ? ' selected' : '';
        return '<div class="demo-dropdown-item' + selected + '" data-value="' + escapeHardwareHtml(option) + '">' + escapeHardwareHtml(option) + '</div>';
      }).join('');
    }

    function createHardwareDropdownHtml(options, selectedValue, placeholderLike, interactive) {
      const selected = selectedValue || options[0] || '';
      const placeholderClass = placeholderLike ? ' placeholder-like' : '';
      const interactiveAttr = interactive ? ' data-interactive' : '';
      return \`
        <div class="demo-dropdown" data-demo-dropdown>
          <button type="button" class="demo-dropdown-btn\${placeholderClass}" data-demo-dropdown-btn\${interactiveAttr}>\${escapeHardwareHtml(selected)}</button>
          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
            \${buildHardwareDropdownHtml(options, selected)}
          </div>
        </div>
      \`;
    }

    function createHardwareCardFromSupabase(item) {
      const groupKey = item.product_group === 'Bottom rail' ? 'bottom' : 'headrail';
      const rowId = groupKey + '-loaded-row-' + item.id;
      const visibility = item.visibility || 'Public';
      const pricingType = item.pricing_type || 'Included';
      const colors = Array.isArray(item.hardware_colors) ? item.hardware_colors : [];

      const card = document.createElement('div');
      card.className = 'hardware-card collapsed';
      card.dataset.cardGroup = groupKey;
      if (item.id) card.dataset.hardwareId = item.id;
      card.dataset.cardKey = 'loaded-hardware-' + item.id;

      const colorRowsHtml = colors.map(function(color) {
        const colorDescription = color.color_description || 'Description';
        const isPlaceholder = !color.color_description;
        return \`
          <tr data-color-id="\${escapeHardwareHtml(color.id || '')}">
            <td><input type="checkbox" /></td>
            <td><input class="inline-input" placeholder="Color code" value="\${escapeHardwareHtml(color.color_code || '')}" /></td>
            <td>\${createHardwareDropdownHtml(['White', 'Ivory', 'Grey', 'Anodized', 'Black'], colorDescription, isPlaceholder, false)}</td>
            <td>\${createHardwareDropdownHtml(['Public', 'Winco Only', 'Access L1', 'Access L2', 'Access L3'], color.visibility || visibility, false, false)}</td>
          </tr>
        \`;
      }).join('');

      card.innerHTML = \`
        <div class="hardware-card-head">
          <div><input type="checkbox" data-interactive /></div>
          <div class="name-group">
            <div><input class="inline-input" placeholder="Code" value="\${escapeHardwareHtml(item.code || '')}" data-interactive /></div>
            <div><input class="inline-input" placeholder="Description" value="\${escapeHardwareHtml(item.description || '')}" data-interactive /></div>
          </div>
          <div>\${createHardwareDropdownHtml(['Included', 'Surcharge'], pricingType, false, true)}</div>
          <div>\${createHardwareDropdownHtml(['Public', 'Winco Only', 'Access L1', 'Access L2', 'Access L3'], visibility, false, true)}</div>
          <div style="padding-right: 4px;">
            <div class="card-actions">
              <button class="btn primary add-color-btn" type="button" style="min-width: 96px;" data-row-id="\${rowId}" data-interactive>Add Color</button>
              <button class="btn danger delete-color-btn" type="button" style="min-width: 96px;" data-interactive>Delete Color</button>
            </div>
          </div>
        </div>
        <div class="card-detail-wrap">
          <table class="mini-table">
            <tbody>
              \${colorRowsHtml}
              <tr id="\${rowId}" class="hidden-row">
                <td><input type="checkbox" /></td>
                <td><input class="inline-input" placeholder="Color code" /></td>
                <td>\${createHardwareDropdownHtml(['White', 'Ivory', 'Grey', 'Anodized', 'Black'], 'Description', true, false)}</td>
                <td>\${createHardwareDropdownHtml(['Public', 'Winco Only', 'Access L1', 'Access L2', 'Access L3'], visibility, false, false)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      \`;

      return card;
    }

    function renderHardwareDataFromSupabase(items) {
      if (!Array.isArray(items)) return;

      const headrailRoot = document.getElementById('headrailGroup');
      const bottomRoot = document.getElementById('bottomGroup');

      if (headrailRoot) headrailRoot.innerHTML = '';
      if (bottomRoot) bottomRoot.innerHTML = '';

      items.forEach(function(item) {
        const card = createHardwareCardFromSupabase(item);
        if (item.product_group === 'Bottom rail') {
          if (bottomRoot) bottomRoot.appendChild(card);
        } else {
          if (headrailRoot) headrailRoot.appendChild(card);
        }

        bindDemoDropdowns(card);
        bindInlineInputs(card);
        bindCardHeader(card);
        bindActionButtons(card);
      });

      setGroup(getCurrentGroupKey());
      setApplied();
    }



  function initHardwarePage() {
      if (disposed) return;
      bindDemoDropdowns();
      bindInlineInputs();
      bindCardHeader();
      bindActionButtons();

      document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
          setGroup(this.dataset.group || 'headrail');
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

      setGroup('headrail');

      if (window.loadHardwareDataFromSupabase) {
        window.loadHardwareDataFromSupabase()
          .then(function(items) {
            if (disposed) return;
            renderHardwareDataFromSupabase(items);
            pageRoot?.dispatchEvent(new Event('catalog-ready'));
          })
          .catch(function(error) {
            if (disposed) return;
            console.error(error);
            pageRoot?.dispatchEvent(new Event('catalog-load-error'));
          });
      }

      runSelfTests();
  }

function restoreCatalogGroup(rows, group) {
 const list = document.getElementById(group === 'bottom' ? 'bottomGroup' : 'headrailGroup'); list.innerHTML = '';
 rows.forEach(row => { const card = createHardwareCardFromSupabase({...row,id:row.hardware_id,hardware_colors:row.colors}); list.appendChild(card); bindDemoDropdowns(card); bindInlineInputs(card); bindCardHeader(card); bindActionButtons(card); });

 setGroup(getCurrentGroupKey());
 }
 window.restoreHardwareCatalogGroup = restoreCatalogGroup;
  window.initHardwarePage = initHardwarePage;
  window.setHardwareGroup = setGroup;
  window.addHardwareCard = addHardwareCard;
  window.deleteHardwareCard = deleteHardwareCard;
})();
`,g=`<div class="app">
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
          <div class="admin-subnav-item current">Hardware</div>
          <div class="admin-subnav-item">Control System</div>
          <div class="admin-subnav-item">Pricing</div>
          <div class="admin-subnav-item">Accounts</div>
        </div>
      </nav>

      <section class="topbar">
        <div class="title-wrap">
          <h1>Hardware</h1>
          <p id="lastUpdatedText">Last updated: Loading…</p>
        </div>
        <div class="tabbar" aria-label="Hardware tabs">
          <button class="tab active" type="button" data-group="headrail">Headrail</button>
          <button class="tab" type="button" data-group="bottom">Bottom rail</button>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div class="panel-title">
            <strong id="listTitle">Headrail List</strong>
            <span id="groupLabel">Selected group: Headrail</span>
          </div>
          <div class="actions">
            <button class="btn primary" type="button" id="addBtn">Add Headrail</button>
            <button class="btn danger" type="button" id="deleteBtn">Delete Headrail</button>
            <button class="btn" type="button" id="applyBtn" style="min-width: 96px;">Apply</button>
            <span id="applyStatus" style="font-size: 11px; color: var(--blue); font-weight: 600; align-self: center;">Applied</span>
          </div>
        </div>

        <div class="card-list">
          <div id="headrailGroup">
            <div class="hardware-card collapsed" data-card-group="headrail">
              <div class="hardware-card-head">
                <div><input type="checkbox" data-interactive /></div>
                <div class="name-group">
                  <div><input class="inline-input" placeholder="Code" data-interactive /></div>
                  <div><input class="inline-input" placeholder="Description" data-interactive /></div>
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
                    <button class="btn primary add-color-btn" type="button" style="min-width: 96px;" data-row-id="hr-new-row" data-interactive>Add Color</button>
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
                          <button type="button" class="demo-dropdown-btn placeholder-like" data-demo-dropdown-btn>Description</button>
                          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                            <div class="demo-dropdown-item" data-value="White">White</div>
                            <div class="demo-dropdown-item" data-value="Ivory">Ivory</div>
                            <div class="demo-dropdown-item" data-value="Grey">Grey</div>
                            <div class="demo-dropdown-item" data-value="Anodized">Anodized</div>
                            <div class="demo-dropdown-item" data-value="Black">Black</div>
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
                    <tr id="hr-new-row" class="hidden-row">
                      <td><input type="checkbox" /></td>
                      <td><input class="inline-input" placeholder="Color code" /></td>
                      <td>
                        <div class="demo-dropdown" data-demo-dropdown>
                          <button type="button" class="demo-dropdown-btn placeholder-like" data-demo-dropdown-btn>Description</button>
                          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                            <div class="demo-dropdown-item" data-value="White">White</div>
                            <div class="demo-dropdown-item" data-value="Ivory">Ivory</div>
                            <div class="demo-dropdown-item" data-value="Grey">Grey</div>
                            <div class="demo-dropdown-item" data-value="Anodized">Anodized</div>
                            <div class="demo-dropdown-item" data-value="Black">Black</div>
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

          <div id="bottomGroup" style="display:none;">
            <div class="hardware-card collapsed" data-card-group="bottom">
              <div class="hardware-card-head">
                <div><input type="checkbox" data-interactive /></div>
                <div class="name-group">
                  <div><input class="inline-input" placeholder="Code" data-interactive /></div>
                  <div><input class="inline-input" placeholder="Description" data-interactive /></div>
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
                    <button class="btn primary add-color-btn" type="button" style="min-width: 96px;" data-row-id="br-new-row" data-interactive>Add Color</button>
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
                          <button type="button" class="demo-dropdown-btn placeholder-like" data-demo-dropdown-btn>Description</button>
                          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                            <div class="demo-dropdown-item" data-value="White">White</div>
                            <div class="demo-dropdown-item" data-value="Ivory">Ivory</div>
                            <div class="demo-dropdown-item" data-value="Grey">Grey</div>
                            <div class="demo-dropdown-item" data-value="Anodized">Anodized</div>
                            <div class="demo-dropdown-item" data-value="Black">Black</div>
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
                    <tr id="br-new-row" class="hidden-row">
                      <td><input type="checkbox" /></td>
                      <td><input class="inline-input" placeholder="Color code" /></td>
                      <td>
                        <div class="demo-dropdown" data-demo-dropdown>
                          <button type="button" class="demo-dropdown-btn placeholder-like" data-demo-dropdown-btn>Description</button>
                          <div class="demo-dropdown-menu" data-demo-dropdown-menu>
                            <div class="demo-dropdown-item" data-value="White">White</div>
                            <div class="demo-dropdown-item" data-value="Ivory">Ivory</div>
                            <div class="demo-dropdown-item" data-value="Grey">Grey</div>
                            <div class="demo-dropdown-item" data-value="Anodized">Anodized</div>
                            <div class="demo-dropdown-item" data-value="Black">Black</div>
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
        </div>

        <div class="note">
          Manage hardware items and color options for the selected category.
        </div>
      </section>
    </div>
  </div>`;function _(e,t,n=``){let r=e.querySelector(t);return r?r.textContent.trim():n}function v(e){return e.dataset.cardKey||(e.dataset.cardKey=`hardware-card-`+Date.now()+`-`+Math.floor(Math.random()*1e6)),e.dataset.cardKey}function y(e,t){return Array.from(e.querySelectorAll(`.mini-table tbody tr`)).filter(e=>window.getComputedStyle(e).display!==`none`&&!e.classList.contains(`hidden-row`)).map(e=>{let n=e.querySelector(`td:nth-child(2) input`),r=e.querySelector(`td:nth-child(3) [data-demo-dropdown-btn]`),i=e.querySelector(`td:nth-child(4) [data-demo-dropdown-btn]`),a=r?r.textContent.trim():``;return{id:e.dataset.colorId||null,color_code:n?n.value.trim():``,color_description:a===`Description`?``:a,visibility:i?i.textContent.trim():t}}).filter(e=>e.color_code||e.color_description)}function b(){return Array.from(document.querySelectorAll(`.hardware-page .hardware-card`)).map(e=>{let t=e.querySelectorAll(`.name-group .inline-input`),n=_(e,`.hardware-card-head > div:nth-child(3) [data-demo-dropdown-btn]`,`Included`),r=_(e,`.hardware-card-head > div:nth-child(4) [data-demo-dropdown-btn]`,`Public`);return{_card_key:v(e),sort_order:f(e),hardware_id:e.dataset.hardwareId||null,product_group:e.dataset.cardGroup===`bottom`?`Bottom rail`:`Headrail`,code:e.dataset.cardGroup===`bottom`?t[0]?.value.trim()||``:i(t[0]?.value),description:t[1]?t[1].value.trim():``,pricing_type:n,visibility:r,colors:y(e,r)}}).filter(e=>e.hardware_id||e.code||e.description||e.colors.length>0)}function x({currentUser:t,onOpenMainPage:n,onOpenMeasurePage:i,onOpenQuotesPage:f,onOpenOrdersPage:_,onOpenClientsPage:v,onOpenResourcesPage:y,onOpenAdminPage:x,onOpenAdminFabricPage:S,onOpenAdminHardwarePage:C,onOpenAdminControlSystemPage:w,onOpenAdminPricingPage:T,onOpenAdminAccountsPage:E}){(0,p.useEffect)(()=>u(document.querySelector(`.hardware-page`),`hardware`),[]),(0,p.useEffect)(()=>d(document.querySelector(`.hardware-page`),`hardware`),[]);let D=t?.role===`Admin`||t?.role===`Sales`,O=o(g,t?.account_name||`Charles / Winco`,D,t?.role===`Admin`);return(0,p.useEffect)(()=>{window.collectHardwareDataFromPage=b;let n=s(document.querySelector(`.hardware-page`)),r=l(e,`hardware`,{onLastUpdated:n.render});window.loadHardwareDataFromSupabase=async()=>{try{return(await r.load()).map(a)}catch(e){throw n.unavailable(),e}};let i=document.createElement(`script`);i.type=`text/javascript`,i.dataset.wincoHardwarePage=`true`,i.text=h,document.body.appendChild(i);let o=c(document.querySelector(`.hardware-page`),{canEdit:t?.role===`Admin`,kind:`hardware`,idKey:`hardware_id`,collect:b,saveGroup:async(e,n)=>{if(t?.role!==`Admin`)throw Error(`Admin access required`);let i=await r.save(e,n);window.restoreHardwareCatalogGroup(i,e)},restore:(e,t)=>window.restoreHardwareCatalogGroup(e,t)}),u=window.setTimeout(()=>{typeof window.initHardwarePage==`function`&&window.initHardwarePage()},0);return()=>{window.destroyHardwarePage?.(),delete window.destroyHardwarePage,o(),delete window.restoreHardwareCatalogGroup,window.clearTimeout(u),i.parentNode&&i.parentNode.removeChild(i),delete window.initHardwarePage,delete window.setHardwareGroup,delete window.addHardwareCard,delete window.deleteHardwareCard,delete window.collectHardwareDataFromPage,delete window.loadHardwareDataFromSupabase}},[]),(0,p.useEffect)(()=>{let e=document.querySelector(`.hardware-page`);if(e)return r(e,{onOpenMainPage:n,onOpenMeasurePage:i,onOpenQuotesPage:f,onOpenOrdersPage:_,onOpenClientsPage:v,onOpenResourcesPage:y,onOpenAdminPage:x,onOpenAdminFabricPage:S,onOpenAdminHardwarePage:C,onOpenAdminControlSystemPage:w,onOpenAdminPricingPage:T,onOpenAdminAccountsPage:E},{})},[n,i,f,_,v,y,x,S,C,w,T,E]),(0,m.jsx)(`div`,{className:`hardware-page admin-design catalog-page`,dangerouslySetInnerHTML:{__html:O}})}export{x as default};