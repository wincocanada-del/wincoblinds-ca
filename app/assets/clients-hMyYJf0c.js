import{c as e,n as t}from"./supabaseClient-DbeEDEc0.js";import{o as n}from"./measureDraft-DF2uoLOp.js";import{t as r}from"./adminAccess-BqWs8i9A.js";import{t as i}from"./jsx-runtime-DrYbZxX9.js";import{n as a}from"./pageNavigation-DUYQEysm.js";import{i as o}from"./adminLeaveGuard-BdKSAivd.js";import{v as s}from"./sectionPricing-CHT6thI6.js";import{u as c}from"./excelDetails-CZhTk8qt.js";import{t as l}from"./adminEditExit-B40rPG-n.js";import{n as u,r as d,t as f}from"./clientWorkflow-V5ZrGgzj.js";import{t as p}from"./QuoteDetail-B7oGqW6G.js";import{r as m,t as h}from"./OrderDetail-Czmpck8N.js";var g=e(),_=i(),v=String.raw`window.cleanupClientDocumentListeners?.();
    window.clientDocumentListeners=[];
    function listenClientDocument(type,handler){document.addEventListener(type,handler);window.clientDocumentListeners.push([type,handler]);}
    window.cleanupClientDocumentListeners=()=>{for(const [type,handler] of window.clientDocumentListeners||[])document.removeEventListener(type,handler);window.clientDocumentListeners=[];};
    function updateQuotesSearchClear() {
      const input = document.querySelector('[data-quotes-search-input]');
      const clearBtn = document.querySelector('[data-quotes-search-clear]');
      if (!input || !clearBtn) return;
      const hasValue = input.value.trim() !== '';
      clearBtn.classList.toggle('hidden', !hasValue);
    }

    function getQuotesSearchValue() {
      const input = document.querySelector('[data-quotes-search-input]');
      return input ? input.value.trim().toLowerCase() : '';
    }

    function getCurrentAccountValue() {
      const current = document.querySelector('.quotes-account-option.current');
      return current ? current.textContent.trim().toLowerCase() : 'all';
    }

    function toggleAccountFilter(event) {
      event.stopPropagation();
      const filter = event.currentTarget;
      filter.classList.toggle('open');
    }

    function closeAccountFilter() {
      document.querySelectorAll('.quotes-account-head.open').forEach(function (filter) {
        filter.classList.remove('open');
      });
    }

    function selectAccountFilter(event, value) {
      event.stopPropagation();
      const option = event.currentTarget;
      const filter = option.closest('.quotes-account-head');
      if (!filter) return;

      filter.querySelectorAll('.quotes-account-option').forEach(function (item) {
        item.classList.remove('current');
      });
      option.classList.add('current');

      const label = filter.querySelector('[data-account-filter-label]');
      if (label) {
        label.textContent = value === 'All' ? 'Account' : value;
      }

      applyQuotesSearchOnly();
      closeAccountFilter();
    }

    function getCurrentActivityValue() {
      const current = document.querySelector('.quotes-activity-option.current');
      return current ? current.textContent.trim().toLowerCase() : 'all';
    }

    function toggleActivityFilter(event) {
      event.stopPropagation();
      const filter = event.currentTarget;
      filter.classList.toggle('open');
    }

    function closeActivityFilter() {
      document.querySelectorAll('.quotes-activity-head.open').forEach(function (filter) {
        filter.classList.remove('open');
      });
    }

    function selectActivityFilter(event, value) {
      event.stopPropagation();
      const option = event.currentTarget;
      const filter = option.closest('.quotes-activity-head');
      if (!filter) return;

      filter.querySelectorAll('.quotes-activity-option').forEach(function (item) {
        item.classList.remove('current');
      });
      option.classList.add('current');

      const label = filter.querySelector('[data-activity-filter-label]');
      if (label) {
        label.textContent = value === 'All' ? 'Activity' : value;
      }

      applyQuotesSearchOnly();
      closeActivityFilter();
    }

    function applyQuotesSearchOnly() {
      const searchValue = getQuotesSearchValue();
      const accountValue = getCurrentAccountValue();
      const activityValue = getCurrentActivityValue();

      document.querySelectorAll('.quotes-row').forEach(function (row) {
        const rowSearch = String(row.dataset.search || '').toLowerCase();
        const rowActivity = String(row.dataset.activity || '').toLowerCase();
        const rowAccount = String(row.dataset.account || '').toLowerCase();
        const searchMatch = searchValue === '' || rowSearch.includes(searchValue);
        const activityMatch = activityValue === 'all' || rowActivity.split('|').includes(activityValue);
        const accountMatch = accountValue === 'all' || rowAccount === accountValue;
        const shouldShow = searchMatch && activityMatch && accountMatch;
        row.style.display = shouldShow ? 'grid' : 'none';

        const detail = row.nextElementSibling;
        if (detail && detail.classList.contains('quotes-detail-row')) {
          detail.style.display = shouldShow && detail.classList.contains('open') ? 'block' : 'none';
        }
      });

      updateQuotesSearchClear();
    }

    function closeAllDetails() {
      document.querySelectorAll('.quotes-row.expanded').forEach(function (row) {
        row.classList.remove('expanded');
      });

      document.querySelectorAll('.quotes-detail-row.open').forEach(function (detail) {
        detail.classList.remove('open');
        detail.style.display = 'none';
      });
    }

    function getSelectedClientRows() {
      return Array.from(document.querySelectorAll('.quotes-row[data-client-id]')).filter(function (row) {
        const checkbox = row.querySelector('[data-client-select]');
        return !!(checkbox && checkbox.checked);
      });
    }

    function updateClientDeleteButtonState() {
      const button = document.querySelector('[data-client-delete-button]');
      if (!button) return;
      const enabled = getSelectedClientRows().length > 0;
      button.disabled = !enabled;
      button.style.color = enabled ? '#b42318' : '#9aa4b5';
      button.style.borderColor = enabled ? '#f0b8b4' : '#d7dce5';
      button.style.background = enabled ? '#fff7f6' : '#ffffff';
      button.style.cursor = enabled ? 'pointer' : 'not-allowed';
    }

    function closeClientDeleteConfirm() {
      const overlay = document.querySelector('[data-client-delete-confirm]');
      if (overlay) overlay.style.display = 'none';
    }

    function toggleDetailRow(row) {
      const detail = row.nextElementSibling;
      if (!detail || !detail.classList.contains('quotes-detail-row')) return;

      const willOpen = !detail.classList.contains('open');
      closeAllDetails();

      if (willOpen) {
        row.classList.add('expanded');
        detail.classList.add('open');
        detail.style.display = 'block';
        ensureClientHistory(row);
      }
    }

    async function ensureClientHistory(row) {
      const target=row.nextElementSibling?.querySelector('.history-list');
      if(!target || target.dataset.loaded==='true' || target.dataset.loading==='true' || !window.loadClientHistoryRows)return;
      target.dataset.loading='true';target.textContent='Loading history…';
      try {
        const history=await window.loadClientHistoryRows(row.dataset.clientId);
        if(!target.isConnected)return;
        target.innerHTML=renderClientQuoteHistory(history);target.dataset.loaded='true';
        bindDynamicClientRows();
      } catch(error) {
        if(!target.isConnected)return;
        target.textContent=error.message || 'Unable to load history.';
        const retry=document.createElement('button');retry.type='button';retry.textContent='Retry';
        retry.onclick=event=>{event.stopPropagation();ensureClientHistory(row);};target.append(retry);
      } finally {delete target.dataset.loading;}
    }

    function openHistoryItem(row) {
      const id=row.dataset.historyId;
      if(row.dataset.historyType==='order') window.openClientHistoryOrder?.(id);
      else if(row.dataset.historyCurrent==='false') window.openClientHistoryRevision?.(id,Number(row.dataset.historyRevision));
      else window.openClientHistoryQuote?.(id);
    }


    function syncClientInfoCard(card) {
      card.querySelectorAll('.client-info-basic-item').forEach(function (item) {
        const display = item.querySelector('.client-info-basic-value');
        const input = item.querySelector('.client-info-edit-input');
        if (display && input) {
          display.textContent = input.value;
        }
      });

      card.querySelectorAll('.client-info-list-item').forEach(function (item) {
        const display = item.querySelector('.display-value');
        const input = item.querySelector('.client-info-edit-input');
        if (!display || !input) return;

        const nextValue = input.value.trim();
        if (nextValue === '') {
          item.remove();
          return;
        }

        display.textContent = nextValue;
        input.value = nextValue;
      });

      card.querySelectorAll('.client-info-note-box').forEach(function (item) {
        const display = item.querySelector('.display-value');
        const textarea = item.querySelector('.client-info-edit-textarea');
        if (display && textarea) {
          display.textContent = textarea.value;
        }
      });
    }

    function getClientBasicEditValue(card, labelText) {
      const item = Array.from(card.querySelectorAll('.client-info-basic-item')).find(function (row) {
        const label = row.querySelector('.client-info-basic-label');
        return label && label.textContent.trim() === labelText;
      });
      const input = item ? item.querySelector('.client-info-edit-input') : null;
      return input ? String(input.value || '').trim() : '';
    }

    function collectClientChildEdits(card, target) {
      const addButton = card.querySelector('[data-add-target="' + target + '"]');
      const section = addButton ? addButton.closest('.client-info-section') : null;
      if (!section) return [];

      return Array.from(section.querySelectorAll('.client-info-list-item .client-info-edit-input')).map(function (input) {
        return {
          id: String(input.dataset.recordId || '').trim(),
          value: String(input.value || '').trim(),
          isPrimary: input.dataset.isPrimary === 'true',
        };
      });
    }

    function collectClientInfoEdits(card) {
      const noteInput = card.querySelector('.client-info-edit-textarea');
      return {
        clientId: String(card.dataset.clientId || '').trim(),
        version: card.dataset.clientVersion,
        account: getClientBasicEditValue(card, 'Account'),
        clientName: getClientBasicEditValue(card, 'Client'),
        company: getClientBasicEditValue(card, 'Company'),
        note: noteInput ? String(noteInput.value || '') : '',
        phones: collectClientChildEdits(card, 'phones'),
        emails: collectClientChildEdits(card, 'emails'),
        addresses: collectClientChildEdits(card, 'addresses'),
      };
    }

    async function toggleClientInfoEdit(card, button) {
      const isEditing = card.classList.contains('editing');
      if (isEditing) {
        if (button.dataset.savingClient === 'true') return false;

        const payload = collectClientInfoEdits(card);
        card.querySelectorAll('input,textarea,[data-client-cancel]').forEach(el=>el.disabled=true);
        button.dataset.savingClient = 'true';
        button.textContent = 'Saving...';

        try {
          if (typeof window.saveClientInformationToSupabase !== 'function') {
            throw new Error('Client save function is not available');
          }

          const saved = await window.saveClientInformationToSupabase(payload);
          if(!card.isConnected)return false;
          card.dataset.clientVersion = saved.version;
          syncClientInfoCard(card);
          card.classList.remove('editing');
          button.textContent = 'Edit';

          if (typeof window.reloadClientsFromSupabase === 'function') {
            await window.reloadClientsFromSupabase();
          }
          return true;
        } catch (error) {
          console.error('Failed to save client information:', error);
          button.textContent = 'Save';
          if(card.isConnected)window.alert(error.message || 'Failed to save client information. Please try again.');
          return false;
        } finally {
          delete button.dataset.savingClient;
          card.querySelectorAll('input,textarea,[data-client-cancel]').forEach(el=>el.disabled=false);
        }
      } else {
        card._clientBeforeEdit=card.innerHTML;
        card._clientBeforeValues=JSON.stringify(collectClientInfoEdits(card));
        card.classList.add('editing');
        button.textContent = 'Save';
      }
    }

    function discardClientEdit(card) {
      if(card.querySelector('[data-saving-client="true"]'))return;
      card.innerHTML=card._clientBeforeEdit;card.classList.remove('editing');
      card.querySelectorAll('[data-dynamic-bound]').forEach(el=>delete el.dataset.dynamicBound);
      card.querySelectorAll('.client-primary,.client-primary-label').forEach(el=>el.remove());
      bindDynamicClientRows();
    }

    window.getClientEditors = () => Array.from(document.querySelectorAll('.clients-page .client-info-card.editing')).map(card=>({
      getState:()=>{
        const editing=card.classList.contains('editing');
        const token=JSON.stringify(collectClientInfoEdits(card));
        return {editing,dirty:editing&&token!==card._clientBeforeValues,busy:Boolean(card.querySelector('[data-saving-client="true"]')),token};
      },
      validate:()=>true,
      save:()=>toggleClientInfoEdit(card,card.querySelector('[data-client-edit-toggle]')),
      discard:()=>discardClientEdit(card),
    }));

    function createClientInfoListItem(value, target) {
      const item = document.createElement('div');
      item.className = 'client-info-list-item';

      const display = document.createElement('span');
      display.className = 'display-value';
      display.textContent = value || '';

      const input = document.createElement('input');
      input.className = 'client-info-edit-input';
      input.type = 'text';
      input.value = value || '';
      input.dataset.recordId = '';
      input.dataset.isPrimary = 'false';

      if (target === 'phones') {
        input.placeholder = 'Add phone';
      } else if (target === 'emails') {
        input.placeholder = 'Add email';
      } else if (target === 'addresses') {
        input.placeholder = 'Add address';
      }

      item.appendChild(display);
      item.appendChild(input);
      appendClientPrimaryButton(item);
      return item;
    }

    function addClientInfoItem(button) {
      if(button.closest('.client-info-card')?.querySelector('[data-saving-client="true"]')) return;
      const target = String(button.dataset.addTarget || '').toLowerCase();
      const section = button.closest('.client-info-section');
      if (!section) return;

      let container = null;
      if (target === 'phones') {
        container = section.querySelector('.client-info-inline-grid');
      } else if (target === 'emails' || target === 'addresses') {
        container = section.querySelector('.client-info-list');
      }
      if (!container) return;

      const item = createClientInfoListItem('', target);
      container.appendChild(item);

      const input = item.querySelector('.client-info-edit-input');
      if (input) {
        input.focus();
      }
    }

    listenClientDocument('click', function (event) {
      document.querySelectorAll('.quotes-account-head.open').forEach(function (filter) {
        if (!filter.contains(event.target)) {
          filter.classList.remove('open');
        }
      });

      document.querySelectorAll('.quotes-activity-head.open').forEach(function (filter) {
        if (!filter.contains(event.target)) {
          filter.classList.remove('open');
        }
      });
    });

    function escapeClientHtml(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function formatClientDate(value) {
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '';
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const yyyy = String(date.getFullYear());
      return mm + '/' + dd + '/' + yyyy;
    }

    function getPrimaryClientValue(items, key) {
      const list = Array.isArray(items) ? items : [];
      const primary = list.find(function (item) { return item && item.is_primary; }) || list[0];
      return primary && primary[key] ? String(primary[key]) : '';
    }

    function updateClientPrimaryState(item) {
      const isPrimary=item.querySelector('.client-info-edit-input').dataset.isPrimary==='true';
      const button=item.querySelector('.client-primary');
      button.textContent=isPrimary?'Primary':'Set primary';
      button.setAttribute('aria-pressed',String(isPrimary));
      item.querySelector('.client-primary-label').hidden=!isPrimary;
    }

    function appendClientPrimaryButton(item) {
      const button=document.createElement('button');button.type='button';button.className='client-primary';
      const label=document.createElement('span');label.className='client-primary-label';label.textContent='Primary';
      label.title='Used by default when selecting this client in Measure.';
      button.onclick=()=>{
        if(item.closest('.client-info-card').querySelector('[data-saving-client="true"]')) return;
        if(!item.closest('.client-info-card').classList.contains('editing')) return;
        const section=item.closest('.client-info-section');
        section.querySelectorAll('.client-info-list-item').forEach(row=>{
          const field=row.querySelector('.client-info-edit-input');field.dataset.isPrimary=String(row===item);
          updateClientPrimaryState(row);
        });
      };
      item.append(label,button);
      updateClientPrimaryState(item);
    }

    function renderClientInfoList(items, key) {
      const list = Array.isArray(items) ? items : [];
      return list.map(function (item) {
        const value = item && item[key] ? String(item[key]) : '';
        const safe = escapeClientHtml(value);
        const recordId = escapeClientHtml(item && item.id ? item.id : '');
        const isPrimary = item && item.is_primary ? 'true' : 'false';
        return '<div class="client-info-list-item"><span class="display-value">' + safe + '</span><input class="client-info-edit-input" type="text" value="' + safe + '" data-record-id="' + recordId + '" data-is-primary="' + isPrimary + '" /></div>';
      }).join('');
    }

    function formatClientHistoryTotal(value) {
      const amount = Number(value);
      if (!Number.isFinite(amount)) return '';
      return window.formatClientHistoryMoney(amount);
    }

    function renderClientQuoteHistory(history) {
      if(!history.length) return '<div class="client-history-empty">No saved quotes or orders.</div>';
      return history.map(function(item){
        const quoteReference=window.formatClientQuoteReference({quote_number:item.kind==='quote'?item.number:item.quote_number,quote_revision:item.revision});
        const reference=item.kind==='quote'?quoteReference:item.number;
        return '<button type="button" class="history-row" data-history-type="'+escapeClientHtml(item.kind)+'" data-history-id="'+escapeClientHtml(item.id)+'" data-history-revision="'+escapeClientHtml(item.revision)+'" data-history-current="'+String(item.current)+'">'+
          '<span class="history-cell type">'+(item.kind==='order'?'Order':'Quote')+'</span>'+
          '<span class="history-cell">'+escapeClientHtml(reference)+'</span>'+
          '<span class="history-cell project"><span class="history-project-main">'+escapeClientHtml(item.tag||item.name||'—')+'</span><span class="history-project-sub">'+escapeClientHtml(item.status)+(item.kind==='order'&&item.quote_number?' · '+escapeClientHtml(quoteReference):'')+'</span></span>'+
          '<span class="history-cell">'+escapeClientHtml(formatClientDate(item.date))+'</span>'+
          '<span class="history-cell total">'+escapeClientHtml(formatClientHistoryTotal(item.total))+'</span><span class="history-cell chevron">›</span></button>';
      }).join('');
    }


    function bindDynamicClientRows() {
      document.querySelectorAll('.client-info-list-item').forEach(item=>{if(!item.querySelector('.client-primary'))appendClientPrimaryButton(item);});
      document.querySelectorAll('[data-client-cancel]').forEach(button=>{
        button.onclick=()=>{
          const card=button.closest('.client-info-card');
          if(card.querySelector('[data-saving-client="true"]'))return;
          discardClientEdit(card);
          window.reloadClientsFromSupabase?.();
        };
      });
      document.querySelectorAll('.quotes-row').forEach(function (row) {
        if (row.dataset.dynamicBound === 'true') return;
        row.dataset.dynamicBound = 'true';
        row.addEventListener('click', function (event) {
          if (event.target.closest('[data-client-select]')) return;
          toggleDetailRow(row);
        });
      });

      document.querySelectorAll('.history-row').forEach(function (historyRow) {
        if (historyRow.dataset.dynamicBound === 'true') return;
        historyRow.dataset.dynamicBound = 'true';
        historyRow.addEventListener('click', function (event) {
          event.stopPropagation();
          openHistoryItem(historyRow);
        });
      });

      document.querySelectorAll('[data-client-edit-toggle]').forEach(function (button) {
        if (button.dataset.dynamicBound === 'true') return;
        button.dataset.dynamicBound = 'true';
        button.addEventListener('click', function (event) {
          event.stopPropagation();
          const card = button.closest('.client-info-card');
          if (!card) return;
          toggleClientInfoEdit(card, button);
        });
      });

      document.querySelectorAll('.client-info-add').forEach(function (button) {
        if (button.dataset.dynamicBound === 'true') return;
        button.dataset.dynamicBound = 'true';
        button.addEventListener('click', function (event) {
          event.stopPropagation();
          addClientInfoItem(button);
        });
      });
    }

    function getClientLastUpdatedTime(client) {
      const history = Array.isArray(client.history) ? client.history : [];
      return Math.max(0, ...[client.updated_at, client.created_at, client.history_summary?.latest, ...history.map(item => item.date)]
        .map(value => new Date(value || 0).getTime() || 0));
    }

    function renderClientsFromSupabase(clients) {
      const body = document.querySelector('[data-clients-live-body]');
      if (!body) return;

      // Sort the authorized result without changing master timestamps or records.
      // Use the same activity time as the displayed Last Updated value.
      const rows = Array.isArray(clients) ? [...clients].sort((a, b) => getClientLastUpdatedTime(b) - getClientLastUpdatedTime(a)) : [];
      // Keep the actual editor nodes (values, primary contacts, version and listeners)
      // while another client's successful save refreshes list summaries/history.
      const editors=Array.from(body.querySelectorAll('.client-info-card.editing'));
      if(editors.some(card=>!rows.some(row=>row.id===card.dataset.clientId)))throw new Error('A client being edited is no longer available. Finish or discard that edit, then retry.');

      const openIds=Array.from(document.querySelectorAll('.quotes-row.expanded')).map(row=>row.dataset.clientId);
      const selectedIds=new Set(getSelectedClientRows().map(row=>row.dataset.clientId));
      body.innerHTML = rows.map(function (client) {
        const account = String(client.account || '');
        const partner = String(client.partner || '');
        const name = String(client.client_name || '');
        const company = String(client.company || '');
        const phones = Array.isArray(client.client_phones) ? client.client_phones : [];
        const emails = Array.isArray(client.client_emails) ? client.client_emails : [];
        const addresses = Array.isArray(client.client_addresses) ? client.client_addresses : [];
        const phone = getPrimaryClientValue(phones, 'phone');
        const phoneValues = phones.map(function (item) { return item.phone; }).filter(Boolean);
        const emailValues = emails.map(function (item) { return item.email; }).filter(Boolean);
        const addressValues = addresses.map(function (item) { return item.address; }).filter(Boolean);
        const history=Array.isArray(client.history)?client.history:[];
        const latestTime=getClientLastUpdatedTime(client);
        const lastUpdated=formatClientDate(latestTime?new Date(latestTime).toISOString():'');
        const activities=client.history_summary?.activities || [...new Set(history.map(item=>item.kind==='quote'?'Quote':item.status))];
        const activity=activities.join(' · ');
        const searchValue=[account,partner,name,company,...phoneValues,...emailValues,...addressValues,activity,lastUpdated,client.history_summary?.search,...history.map(item=>item.number+' '+item.tag)].filter(Boolean).join(' ');

        return '' +
          '<div class="quotes-row" data-client-id="' + escapeClientHtml(client.id || '') + '" data-client-name="' + escapeClientHtml(name) + '" data-client-quote-count="' + String(client.history_summary?.count ?? history.length) + '" data-search="' + escapeClientHtml(searchValue) + '" data-activity="' + escapeClientHtml(activities.join('|').toLowerCase()) + '" data-account="' + escapeClientHtml(account.toLowerCase()) + '">' +
            '<div class="quotes-cell" style="display:flex;align-items:center;justify-content:center;"><input type="checkbox" data-client-select aria-label="Select ' + escapeClientHtml(name || 'client') + '" /></div>' +
            '<div class="quotes-cell" data-mobile-label="Account">' + escapeClientHtml(account) + '</div>' +
            '<div class="quotes-cell" data-mobile-label="Partner">' + escapeClientHtml(partner) + '</div>' +
            '<div class="quotes-cell" data-mobile-label="Client">' + escapeClientHtml(name) + '</div>' +
            '<div class="quotes-cell" data-mobile-label="Company">' + escapeClientHtml(company) + '</div>' +
            '<div class="quotes-cell" data-mobile-label="Phone">' + escapeClientHtml(phone) + '</div>' +
            '<div class="quotes-cell activity" data-mobile-label="Activity">' + escapeClientHtml(activity) + '</div>' +
            '<div class="quotes-cell muted" data-mobile-label="Last updated">' + escapeClientHtml(lastUpdated) + '</div>' +
          '</div>' +
          '<div class="quotes-detail-row">' +
            '<div class="quotes-detail-layout">' +
              '<div class="quotes-detail-card client-info-card" data-client-version="'+escapeClientHtml(client.version)+'" data-client-id="' + escapeClientHtml(client.id || '') + '">' +
                '<div class="quotes-detail-card-head">' +
                  '<div class="quotes-detail-card-title">Client Information</div>' +
                  '<div class="client-edit-actions"><button type="button" class="quotes-detail-card-action" data-client-cancel>Cancel</button><button type="button" class="quotes-detail-card-action" data-client-edit-toggle>Edit</button></div>' +
                '</div>' +
                '<div class="quotes-detail-card-body">' +
                  '<div class="client-info-layout">' +
                    '<div class="client-info-section">' +
                      '<div class="client-info-section-title">Basic</div>' +
                      '<div class="client-info-basic-grid">' +
                        '<div class="client-info-basic-item"><div class="client-info-basic-label">Account</div><div class="client-info-basic-value">' + escapeClientHtml(account) + '</div><input class="client-info-edit-input" type="text" readonly value="' + escapeClientHtml(account) + '" /></div>' +
                        '<div class="client-info-basic-item"><div class="client-info-basic-label">Client</div><div class="client-info-basic-value">' + escapeClientHtml(name) + '</div><input class="client-info-edit-input" type="text" value="' + escapeClientHtml(name) + '" /></div>' +
                        '<div class="client-info-basic-item"><div class="client-info-basic-label">Company</div><div class="client-info-basic-value">' + escapeClientHtml(company) + '</div><input class="client-info-edit-input" type="text" value="' + escapeClientHtml(company) + '" /></div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="client-info-contact-row">' +
                      '<div class="client-info-section"><div class="client-info-section-head"><div class="client-info-section-title">Phones</div><div class="client-info-add" data-add-target="phones">+ Add</div></div><div class="client-info-inline-grid">' + renderClientInfoList(phones, 'phone') + '</div></div>' +
                      '<div class="client-info-section"><div class="client-info-section-head"><div class="client-info-section-title">Emails</div><div class="client-info-add" data-add-target="emails">+ Add</div></div><div class="client-info-list">' + renderClientInfoList(emails, 'email') + '</div></div>' +
                    '</div>' +
                    '<div class="client-info-section"><div class="client-info-section-head"><div class="client-info-section-title">Addresses</div><div class="client-info-add" data-add-target="addresses">+ Add</div></div><div class="client-info-list">' + renderClientInfoList(addresses, 'address') + '</div></div>' +
                    '<div class="client-info-section"><div class="client-info-section-title">Note</div><div class="client-info-note-box"><div class="display-value">' + escapeClientHtml(client.note || '') + '</div><textarea class="client-info-edit-textarea">' + escapeClientHtml(client.note || '') + '</textarea></div></div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="quotes-detail-card"><div class="quotes-detail-card-head"><div class="quotes-detail-card-title">History</div></div><div class="quotes-detail-card-body"><div class="history-list">' + (client.history_summary ? 'Loading history…' : renderClientQuoteHistory(history)) + '</div></div></div>' +
            '</div>' +
          '</div>';
      }).join('');

      for(const card of editors){
        const replacement=Array.from(body.querySelectorAll('.client-info-card')).find(el=>el.dataset.clientId===card.dataset.clientId);
        replacement?.replaceWith(card);
      }

      const accountMenu=document.querySelector('.quotes-account-menu');
      if(accountMenu){
        const previous=getCurrentAccountValue();
        const names=['All',...new Set(rows.map(row=>row.account).filter(Boolean))];
        const selected=names.find(name=>name.toLowerCase()===previous)||'All';
        accountMenu.textContent='';
        names.forEach(name=>{
          const option=document.createElement('div');option.className='quotes-account-option'+(name===selected?' current':'');option.textContent=name;option.onclick=event=>selectAccountFilter(event,name);accountMenu.append(option);
        });
        const label=document.querySelector('[data-account-filter-label]');if(label)label.textContent=selected==='All'?'Account':selected;
      }
      bindDynamicClientRows();
      document.querySelectorAll('.quotes-row[data-client-id]').forEach(row=>{if(openIds.includes(row.dataset.clientId))toggleDetailRow(row);});
      document.querySelectorAll('.quotes-row[data-client-id]').forEach(row=>{const checkbox=row.querySelector('[data-client-select]');if(checkbox)checkbox.checked=selectedIds.has(row.dataset.clientId);});
      const activityMenu=document.querySelector('.quotes-activity-menu');
      if(activityMenu){
        const previous=getCurrentActivityValue();
        const values=['All',...new Set(['Quote','Ordered',...rows.flatMap(row=>row.history_summary?.activities || (row.history||[]).filter(item=>item.kind==='order').map(item=>item.status)).filter(Boolean)])];
        const selected=values.find(value=>value.toLowerCase()===previous)||'All';
        activityMenu.textContent='';
        values.forEach(value=>{const option=document.createElement('div');option.className='quotes-activity-option'+(value===selected?' current':'');option.textContent=value;option.onclick=event=>selectActivityFilter(event,value);activityMenu.append(option);});
        const label=document.querySelector('[data-activity-filter-label]');if(label)label.textContent=selected==='All'?'Activity':selected;
      }
      applyQuotesSearchOnly();
      updateClientDeleteButtonState();
    }

    window.renderClientsFromSupabase = renderClientsFromSupabase;

    window.initClientsPage = function initClientsPage() {

      applyQuotesSearchOnly();

      const searchInput = document.querySelector('[data-quotes-search-input]');
      const clearBtn = document.querySelector('[data-quotes-search-clear]');
      const deleteButton = document.querySelector('[data-client-delete-button]');
      const deleteConfirm = document.querySelector('[data-client-delete-confirm]');
      const deleteConfirmText = document.querySelector('[data-client-delete-confirm-text]');
      const deleteNo = document.querySelector('[data-client-delete-no]');
      const deleteYes = document.querySelector('[data-client-delete-yes]');

      if (searchInput) {
        searchInput.addEventListener('input', function () {
          applyQuotesSearchOnly();
        });
      }

      if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', function () {
          searchInput.value = '';
          applyQuotesSearchOnly();
          searchInput.focus();
        });
      }

      if (deleteButton) {
        deleteButton.addEventListener('click', function () {
          const selectedRows = getSelectedClientRows();
          if (!selectedRows.length || deleteButton.disabled) return;

          if(deleteConfirmText) deleteConfirmText.textContent='Delete '+selectedRows.length+' selected client'+(selectedRows.length===1?'':'s')+'? Clients with any saved quotes, revisions or orders cannot be deleted. No transaction history will be removed.';

          if (deleteConfirm) deleteConfirm.style.display = 'flex';
        });
      }

      if (deleteNo) {
        deleteNo.addEventListener('click', closeClientDeleteConfirm);
      }

      if (deleteConfirm) {
        deleteConfirm.addEventListener('click', function (event) {
          if (event.target === deleteConfirm) closeClientDeleteConfirm();
        });
      }

      listenClientDocument('change', function (event) {
        if (!event.target.matches('[data-client-select]')) return;
        updateClientDeleteButtonState();
      });

      if (deleteYes) {
        deleteYes.addEventListener('click', async function () {
          const selectedRows = getSelectedClientRows();
          const clientIds = selectedRows.map(function (row) {
            return String(row.dataset.clientId || '').trim();
          }).filter(Boolean);

          if (!clientIds.length) {
            closeClientDeleteConfirm();
            return;
          }
          if (typeof window.deleteClientsFromSupabase !== 'function') return;

          deleteYes.disabled = true;
          deleteYes.textContent = 'Deleting...';
          try {
            await window.deleteClientsFromSupabase(clientIds);
            closeClientDeleteConfirm();
            closeAllDetails();
            updateClientDeleteButtonState();
          } catch (error) {
            console.error('Failed to delete client:', error);
            window.alert(error.message || 'Failed to delete client. Please try again.');
          } finally {
            deleteYes.disabled = false;
            deleteYes.textContent = 'Yes';
          }
        });
      }

      document.querySelectorAll('.quotes-row').forEach(function (row) {
        row.addEventListener('click', function (event) {
          if (event.target.closest('[data-client-select]')) return;
          toggleDetailRow(row);
        });
      });

      document.querySelectorAll('.history-row').forEach(function (historyRow) {
        historyRow.addEventListener('click', function (event) {
          event.stopPropagation();
          openHistoryItem(historyRow);
        });
      });

      document.querySelectorAll('[data-client-edit-toggle]').forEach(function (button) {
        button.addEventListener('click', function (event) {
          event.stopPropagation();
          const card = button.closest('.client-info-card');
          if (!card) return;
          toggleClientInfoEdit(card, button);
        });
      });

      document.querySelectorAll('.client-info-add').forEach(function (button) {
        button.addEventListener('click', function (event) {
          event.stopPropagation();
          addClientInfoItem(button);
        });
      });
};`,y=`<div class="app-preview">
    <div class="ipad-stage">
      <div class="app-frame">
        <nav class="topbar">
          <div class="topbar-inner">
            <div class="topbar-left">
              <div class="nav-item account" data-account-home-link>Charles / Winco</div>
              <div class="nav-separator">|</div>
              <div class="nav-item">Measure</div>
              <div class="nav-item">Quotes</div>
              <div class="nav-item">Orders</div>
              <div class="nav-item current">Clients</div>
              <div class="nav-item">Resources</div>
              <div class="nav-item">Admin</div>
            </div>
          </div>
        </nav>

        <main class="page-shell">
          <section class="page-blank">
            <div class="quotes-shell">
              <div class="quotes-header">
                <div class="quotes-title">Clients</div>
                <div class="quotes-header-tools">
                  <button type="button" data-client-delete-button disabled style="height:38px;padding:0 18px;border:1px solid #d7dce5;border-radius:10px;background:#ffffff;color:#9aa4b5;font-size:14px;font-weight:600;cursor:not-allowed;">Delete</button>
                  <div class="quotes-search">
                    <input type="text" placeholder="Search" data-quotes-search-input />
                    <button type="button" class="quotes-search-clear hidden" data-quotes-search-clear aria-label="Clear search">×</button>
                  </div>
                </div>
              </div>

              <div class="quotes-table">
                <div class="quotes-table-head">
                  <div class="quotes-cell"></div>
                  <div class="quotes-cell filter-cell">
                    <div class="quotes-account-head active" onclick="toggleAccountFilter(event)">
                      <span data-account-filter-label>Account</span>
                      <span class="quotes-sort-arrow">▾</span>
                      <div class="quotes-account-menu">
                        <div class="quotes-account-option current" onclick="selectAccountFilter(event, 'All')">All</div>
                        <div class="quotes-account-option" onclick="selectAccountFilter(event, 'Winco')">Winco</div>
                        <div class="quotes-account-option" onclick="selectAccountFilter(event, 'Winco Sales')">Winco Sales</div>
                        <div class="quotes-account-option" onclick="selectAccountFilter(event, 'Dealer A')">Dealer A</div>
                        <div class="quotes-account-option" onclick="selectAccountFilter(event, 'Dealer B')">Dealer B</div>
                        <div class="quotes-account-option" onclick="selectAccountFilter(event, 'Dealer C')">Dealer C</div>
                      </div>
                    </div>
                  </div>
                  <div class="quotes-cell">Partner</div>
                  <div class="quotes-cell">Client</div>
                  <div class="quotes-cell">Company</div>
                  <div class="quotes-cell">Phone</div>
                  <div class="quotes-cell filter-cell">
                    <div class="quotes-activity-head active" onclick="toggleActivityFilter(event)">
                      <span data-activity-filter-label>Activity</span>
                      <span class="quotes-sort-arrow">▾</span>
                      <div class="quotes-activity-menu">
                        <div class="quotes-activity-option current" onclick="selectActivityFilter(event, 'All')">All</div>
                        <div class="quotes-activity-option" onclick="selectActivityFilter(event, 'Ordered')">Ordered</div>
                        <div class="quotes-activity-option" onclick="selectActivityFilter(event, 'Quote')">Quote</div>
                      </div>
                    </div>
                  </div>
                  <div class="quotes-cell">
                    <span class="quotes-sort-button active">Last Updated <span class="quotes-sort-arrow">▾</span></span>
                  </div>
                </div>

                <div data-clients-live-body=""></div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>

  <div data-client-delete-confirm style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,0.36);align-items:center;justify-content:center;padding:24px;">
    <div role="dialog" aria-modal="true" aria-labelledby="clientDeleteConfirmTitle" style="width:min(460px,100%);background:#fff;border-radius:18px;padding:24px;box-shadow:0 20px 60px rgba(15,23,42,0.22);">
      <div id="clientDeleteConfirmTitle" style="font-size:20px;font-weight:700;color:#172033;margin-bottom:10px;">Delete client?</div>
      <div data-client-delete-confirm-text style="font-size:14px;line-height:1.55;color:#536176;margin-bottom:22px;">Are you sure you want to delete this client?</div>
      <div style="display:flex;justify-content:flex-end;gap:10px;">
        <button type="button" data-client-delete-no style="height:38px;padding:0 18px;border:1px solid #d7dce5;border-radius:10px;background:#fff;color:#344054;font-weight:600;cursor:pointer;">No</button>
        <button type="button" data-client-delete-yes style="height:38px;padding:0 18px;border:1px solid #c83b3b;border-radius:10px;background:#c83b3b;color:#fff;font-weight:600;cursor:pointer;">Yes</button>
      </div>
    </div>
  </div>`;function b({currentUser:e,onOpenMainPage:i,onOpenMeasurePage:b,onOpenQuotesPage:x,onOpenOrdersPage:S,onOpenClientsPage:C,onOpenResourcesPage:w,onOpenAdminPage:T,onOpenFeedbackPage:E}){let[D,O]=(0,g.useState)(null),k=(0,g.useRef)(null),A=r(e),j=e?.account_name||`Charles / Winco`,M=y.replace(`Charles / Winco`,()=>j.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])).replace(`<div class="nav-item">Admin</div>`,A?`<div class="nav-item">Admin</div>`:`<div class="nav-item">Feedback</div>`).replace(`<div class="main-nav-item current">Admin</div>`,A?`<div class="main-nav-item current">Admin</div>`:`<div class="main-nav-item">Feedback</div>`).replace(`<div class="main-nav-item">Admin</div>`,A?`<div class="main-nav-item">Admin</div>`:`<div class="main-nav-item">Feedback</div>`),N=(0,g.useMemo)(()=>({__html:M}),[M]);(0,g.useLayoutEffect)(()=>{if(D){window.scrollTo(0,0);return}let e=k.current;e&&(e.focus?.focus({preventScroll:!0}),window.scrollTo(e.x,e.y))},[D]);let P=()=>{O(null),document.querySelector(`.client-info-card.editing`)||window.reloadClientsFromSupabase?.()};return(0,g.useEffect)(()=>{let e=!1,n=0,r=document.createElement(`script`);r.type=`text/javascript`,r.dataset.wincoClientsPage=`true`,r.text=v,document.body.appendChild(r);let o=a(document.querySelector(`.clients-page`),{onOpenMainPage:i,onOpenMeasurePage:b,onOpenQuotesPage:x,onOpenOrdersPage:S,onOpenClientsPage:C,onOpenResourcesPage:w,onOpenAdminPage:T,onOpenFeedbackPage:E},{beforeNavigate:e=>{e===`onOpenClientsPage`&&O(null)}}),p=l(document.querySelector(`.clients-page`),()=>window.getClientEditors?.()||[],{selector:`.topbar-left .nav-item:not(.current),[data-client-delete-button]`}),h=e=>{e.id&&(k.current={x:window.scrollX,y:window.scrollY,focus:document.activeElement},O(e))};window.openClientHistoryQuote=e=>h({kind:`quote`,id:e}),window.openClientHistoryOrder=e=>h({kind:`order`,id:e}),window.openClientHistoryRevision=(e,t)=>h({kind:`quote`,id:e,revision:t}),window.saveClientInformationToSupabase=f(t),window.formatClientHistoryMoney=s,window.formatClientQuoteReference=c,window.deleteClientsFromSupabase=async e=>{let n=(Array.isArray(e)?e:[]).map(e=>String(e||``).trim()).filter(Boolean);if(!n.length)throw Error(`Missing client id`);await m(t,n),await g()};let g=async()=>{let r=++n;try{let i=await d(t);if(e||r!==n)return;window.renderClientsFromSupabase?.(i),document.querySelector(`[data-clients-load-error]`)?.remove()}catch(t){if(e||r!==n)return;let i=document.querySelector(`[data-clients-live-body]`);if(i){let e=document.querySelector(`[data-clients-load-error]`);e||(e=document.createElement(`div`),e.dataset.clientsLoadError=`true`,e.className=`quotes-empty-row`,e.setAttribute(`role`,`alert`),i.before(e)),e.textContent=t.message;let n=document.createElement(`button`);n.type=`button`,n.textContent=`Retry`,n.onclick=g,e.append(n)}}};window.reloadClientsFromSupabase=g;let _=e=>u(t,e);window.loadClientHistoryRows=_;let y=window.setTimeout(()=>{typeof window.initClientsPage==`function`&&window.initClientsPage(),g().catch(()=>{})},0);return()=>{e=!0,window.loadClientHistoryRows===_&&delete window.loadClientHistoryRows,p(),delete window.getClientEditors,window.cleanupClientDocumentListeners?.(),delete window.openClientHistoryOrder,delete window.openClientHistoryRevision,delete window.formatClientHistoryMoney,delete window.formatClientQuoteReference,typeof o==`function`&&o(),window.clearTimeout(y),r.parentNode&&r.parentNode.removeChild(r),window.initClientsPage&&delete window.initClientsPage,window.saveClientInformationToSupabase&&delete window.saveClientInformationToSupabase,window.reloadClientsFromSupabase&&delete window.reloadClientsFromSupabase,window.deleteClientsFromSupabase&&delete window.deleteClientsFromSupabase,window.openClientHistoryQuote&&delete window.openClientHistoryQuote}},[N]),(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`div`,{className:`clients-page`+(D?` clients-history-open`:``),dangerouslySetInnerHTML:N}),D&&(0,_.jsx)(`div`,{className:`quotes-page client-history-detail`,children:D.kind===`order`?(0,_.jsx)(h,{orderId:D.id,currentUser:e,onBack:P,backLabel:`‹ Back to clients`}):(0,_.jsx)(p,{quoteId:D.id,historicalRevision:D.revision,currentUser:e,onBack:P,onEdit:async t=>{await o()&&(n(window,e.id,t),b?.())},backLabel:`‹ Back to clients`})})]})}export{b as default};