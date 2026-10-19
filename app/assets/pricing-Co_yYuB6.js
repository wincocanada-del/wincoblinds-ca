import{n as e,r as t}from"./supabaseClient-CdMXQqVK.js";import{t as n}from"./adminAccess-BqWs8i9A.js";import{t as r}from"./jsx-runtime-DrYbZxX9.js";import{c as i}from"./productDependencies-BF4VZsEZ.js";import{a,r as o,s}from"./pricingCatalog-CCizDbwo.js";import{n as c}from"./pageNavigation-DUYQEysm.js";import{n as l,r as u}from"./adminLeaveGuard-BdKSAivd.js";import{n as d}from"./adminEditExit-B40rPG-n.js";import{n as f,t as p}from"./catalogLastUpdated-CKx-edYD.js";import{t as m}from"./boundedDropdowns-DMm48AUR.js";var h=t(),g=r(),_=`(function() {\r
\r
\r
const state = {\r
      activeTab: ['Cordless Type','Motor','Option','Accessory','Extras','Surcharge'].includes(window.initialPricingTab) ? window.initialPricingTab : 'Cordless Type', tabRows: {}, selectedIdsByTab: {},\r
      surchargeBlocks: [], sideChannelBlocks: [], pendingFocus: null,\r
      revision: null, loading: true, saving: false, loadError: '',\r
      editingScopes:new Set(), editBaselines:new Map(), savedCatalog:null, saveErrors:{},\r
      saveAttempts:{}, recoveryMessages:{}, recoveryConflicts:new Set(), discardPrompt:null,\r
      channelDeletePrompt:null, deletedChannelDrafts:[], channelDeleteOrder:null, restoreChannelId:'', pendingActionFocus:null,\r
      leaveRequest:null,\r
    };\r
\r
    const tabs = ["Cordless Type","Motor","Option","Accessory","Extras","Surcharge"];\r
\r
    const tabMeta = {\r
      "Cordless Type": {\r
        title: "Cordless Type",\r
        description: "Manage cordless type prices linked to the Control page.",\r
        addLabel: "Add Type",\r
        deleteMessage: "Delete selected type(s)?",\r
        widths: "56px 70px 120px 260px minmax(220px,1fr) 110px",\r
        columns: [\r
          { key: "sort", header: "Sort", align: "left", numericOnly: true },\r
          { key: "code", header: "Code", align: "left" },\r
          { key: "name", header: "Cordless Type", align: "left" },\r
          { key: "description", header: "Description", align: "left" },\r
          { key: "price", header: "Price", align: "right", price: true }\r
        ],\r
        newRow: (id) => ({ id, sort: "", code: "", name: "", description: "", price: "0.00" })\r
      },\r
      "Motor": {\r
        title: "Motor",\r
        description: "Manage motors, prices and visibility available in Measure.",\r
        addLabel: "Add Motor",\r
        deleteMessage: "Delete selected motor(s)?",\r
        widths: "56px 70px 240px minmax(180px,1fr) 110px 140px 110px",\r
        columns: [\r
          { key: "sort", header: "Sort", align: "left", numericOnly: true },\r
          { key: "name", header: "Motor", align: "left" },\r
          { key: "description", header: "Description", align: "left" },\r
          { key: "code", header: "Part #", align: "left" },\r
          { key: "visibility", header: "Visibility", options: ['Public','Winco Only','Access L1','Access L2','Access L3'] },\r
          { key: "price", header: "Price", align: "right", price: true }\r
        ],\r
        newRow: (id) => ({ id, sort: "", code: "", name: "", description: "", visibility: "Public", price: "0.00" })\r
      },\r
      "Option": {\r
        title: "Option",\r
        description: "Manage option prices linked to the Control page.",\r
        addLabel: "Add Option",\r
        deleteMessage: "Delete selected option(s)?",\r
        widths: "56px 70px 320px minmax(260px,1fr) 110px",\r
        columns: [\r
          { key: "sort", header: "Sort", align: "left", numericOnly: true },\r
          { key: "name", header: "Option", align: "left" },\r
          { key: "description", header: "Description", align: "left" },\r
          { key: "price", header: "Price", align: "right", price: true }\r
        ],\r
        newRow: (id) => ({ id, sort: "", name: "", description: "", price: "0.00" })\r
      },\r
      "Accessory": {\r
        title: "Accessory",\r
        description: "Manage accessory prices linked to the Control page.",\r
        addLabel: "Add Accessory",\r
        deleteMessage: "Delete selected accessory(s)?",\r
        widths: "56px 70px 260px minmax(200px,1fr) 110px 110px",\r
        columns: [\r
          { key: "sort", header: "Sort", align: "left", numericOnly: true },\r
          { key: "name", header: "Accessory", align: "left" },\r
          { key: "description", header: "Description", align: "left" },\r
          { key: "code", header: "Part #", align: "left" },\r
          { key: "price", header: "Price", align: "right", price: true }\r
        ],\r
        newRow: (id) => ({ id, sort: "", code: "", name: "", description: "", price: "0.00" })\r
      },\r
      "Surcharge": {\r
        title: "Surcharge",\r
        description: "Manage surcharge items. Card layout will be added next.",\r
        addLabel: "Add Surcharge Item",\r
        deleteMessage: "Delete selected surcharge item(s)?",\r
        widths: "56px 140px minmax(320px,1fr) 140px",\r
        columns: [\r
          { key: "code", header: "Code", align: "left" },\r
          { key: "name", header: "Type Name", align: "left" },\r
          { key: "price", header: "Price", align: "right", price: true }\r
        ],\r
        newRow: (id) => ({ id, code: "", name: "", price: "0.00" })\r
      },\r
      "Extras": {\r
        title: "Extras",\r
        description: "Store extra prices here. Install and Extra Fee are entered manually in Measure.",\r
        addLabel: "Add Extra",\r
        deleteMessage: "Delete selected extra(s)?",\r
        widths: "56px 70px 320px minmax(260px,1fr) 110px",\r
        columns: [\r
          { key: "sort", header: "Sort", align: "left", numericOnly: true },\r
          { key: "name", header: "Extras", align: "left" },\r
          { key: "description", header: "Description", align: "left" },\r
          { key: "price", header: "Price", align: "right", price: true }\r
        ],\r
        newRow: (id) => ({ id, sort: "", name: "", description: "", price: "0.00" })\r
      }\r
    };\r
\r
    const pricingPersistTabs = ["Cordless Type","Motor","Option","Accessory","Extras"];\r
\r
    function parsePricingPrice(value){\r
      const number = parseFloat(String(value ?? "").replace(/[^0-9.]/g, ""));\r
      return Number.isFinite(number) ? number : 0;\r
    }\r
\r
    function formatPricingPrice(value){\r
      return parsePricingPrice(value).toFixed(2);\r
    }\r
\r
    function normalizeLoadedPricingRow(tab, row, index){\r
      return {\r
        id: index + 1,\r
        dbId: row.id || "",\r
        sort: row.sort_order == null ? String(index + 1) : String(row.sort_order),\r
        code: row.code || "",\r
        name: row.name || "",\r
        description: row.description || "",\r
        part_number: row.part_number || "",\r
        visibility: row.visibility || 'Public',\r
        price: formatPricingPrice(row.price),\r
      };\r
    }\r
\r
    function isEditing(scope){return state.editingScopes.has(scope);}\r
    function getPricingEditState(){\r
      const scopes=[...state.editingScopes];\r
      return {busy:state.saving||!!state.leaveRequest,\r
        dirty:scopes.some(scope=>JSON.stringify(scopeRows(scope))!==state.editBaselines?.get(scope)),\r
        token:JSON.stringify(scopes.map(scope=>[scope,scopeRows(scope)])),\r
      };\r
    }\r
    function scopeRows(scope){\r
      return scope==='surcharge'?state.surchargeBlocks:scope==='side-channel'?state.sideChannelBlocks:state.tabRows[scope];\r
    }\r
    function changedPricingScope(scope){\r
      return isEditing(scope)&&JSON.stringify(scopeRows(scope))!==state.editBaselines.get(scope);\r
    }\r
    function requestPricingLeave(navigate,scopes=[...state.editingScopes],onStay=()=>{}){\r
      if(destroyed||state.saving||state.leaveRequest){onStay();return;}\r
      const editing=scopes.filter(isEditing);\r
      if(!editing.some(changedPricingScope)){\r
        editing.forEach(cancelEditSection);\r
        navigate();return;\r
      }\r
      state.leaveRequest={navigate,scopes:editing,focus:document.activeElement,onStay};\r
      showPricingLeavePrompt();\r
    }\r
    async function finishPricingLeave(choice){\r
      const request=state.leaveRequest;\r
      if(!request||state.saving||destroyed)return;\r
      closePricingLeavePrompt();\r
      if(choice==='keep'){\r
        state.leaveRequest=null;\r
        request.onStay?.();\r
        if(request.focus?.isConnected)request.focus.focus();\r
        return;\r
      }\r
      if(choice==='save'){\r
        for(const scope of request.scopes.filter(changedPricingScope)){\r
          if(!await saveSection(scope)){\r
            state.leaveRequest=null;\r
            request.onStay?.();\r
            document.querySelector(\`[data-pricing-scope="\${scope}"] [data-pricing-action="Save"]\`)?.focus();\r
            return;\r
          }\r
        }\r
      }\r
      if(destroyed)return;\r
      request.scopes.filter(isEditing).forEach(cancelEditSection);\r
      state.leaveRequest=null;\r
      request.navigate();\r
    }\r
    function closePricingLeavePrompt(){\r
      state.closeLeaveDialog?.();state.closeLeaveDialog=null;\r
    }\r
    function showPricingLeavePrompt(){\r
      const blocked=state.leaveRequest.scopes.some(scope=>state.recoveryConflicts.has(scope)||(scope==='side-channel'&&state.channelDeletePrompt));\r
      state.closeLeaveDialog=window.openAdminEditExitDialog({onChoose:finishPricingLeave,saveBlocked:blocked});\r
    }\r
    function navigatePricingTab(tab){\r
      if(tab===state.activeTab)return;\r
      const scopes=(state.activeTab==='Surcharge'?['surcharge','side-channel']:[state.activeTab]);\r
      requestPricingLeave(()=>{\r
        state.activeTab=tab;state.pendingFocus=null;state.pendingActionFocus=null;render();\r
        [...document.querySelectorAll('#tabs .tab')].find(button=>button.textContent===tab)?.focus();\r
      },scopes);\r
    }\r
    function setScopeRows(scope,rows){\r
      if(scope==='surcharge')state.surchargeBlocks=rows;\r
      else if(scope==='side-channel')state.sideChannelBlocks=rows;\r
      else state.tabRows[scope]=rows;\r
    }\r
    function applyLoadedPricingItems(catalog,preserveDrafts=false){\r
      // A save/cancel in one card must not replace another card's unfinished draft.\r
      const drafts=preserveDrafts?[...state.editingScopes].map(scope=>({scope,rows:scopeRows(scope),\r
        selection:rateSelections[scope]||state.selectedIdsByTab[scope]||[]})):[];\r
      state.savedCatalog=structuredClone(catalog);\r
      pricingPersistTabs.forEach(tab => {\r
        state.tabRows[tab] = catalog.items.filter(row => row.category === tab && row.is_active !== false)\r
          .sort((a,b) => Number(a.sort_order)-Number(b.sort_order) || String(a.name).localeCompare(String(b.name)))\r
          .map((row,index) => normalizeLoadedPricingRow(tab,row,index));\r
        state.selectedIdsByTab[tab] = [];\r
      });\r
      const blocks = kind => catalog.rates.filter(row => row.kind === kind && row.is_active !== false)\r
        .map(row => ({...row, rows: row.rows.map(([size,price]) => [String(size),Number(price).toFixed(2)])}));\r
      // Match the supplied price sheet; keep custom rails after the standard four.\r
      const headrailOrder = ['3FA','4FA DUO','ZSL','ZST'];\r
      const headrailRank = block => {\r
        const index = headrailOrder.indexOf(String(block.code).trim().toUpperCase().replace(/\\s+/g,' '));\r
        return index < 0 ? headrailOrder.length : index;\r
      };\r
      state.surchargeBlocks = blocks('surcharge').sort((a,b) => headrailRank(a)-headrailRank(b));\r
      state.sideChannelBlocks = blocks('side-channel');\r
      state.revision = catalog.revision;\r
      rateSelections.surcharge=[];rateSelections['side-channel']=[];\r
      drafts.forEach(({scope,rows,selection})=>{\r
        setScopeRows(scope,rows);\r
        if(scope in rateSelections)rateSelections[scope]=selection;\r
        else state.selectedIdsByTab[scope]=selection;\r
      });\r
    }\r
\r
    function buildPricingItemsPayload(scope){\r
      const draft = {\r
        items: pricingPersistTabs.filter(tab=>tab===scope).flatMap(tab => sortRows(state.tabRows[tab] || []).map((row,index) => {\r
          // Keep the ID even if the response is interrupted, so retries cannot insert duplicates.\r
          row.dbId ||= crypto.randomUUID();\r
          return { id:row.dbId, category:tab, sort_order:row.sort === '' ? index+1 : Number(row.sort),\r
            code:String(row.code || '').trim(), name:String(row.name || '').trim(),\r
            description:row.description || '', part_number:row.code || row.part_number || '',\r
            price:row.price, is_active:true, ...(tab==='Motor'?{visibility:row.visibility}: {}) };\r
        })),\r
        rates: [...state.surchargeBlocks,...state.sideChannelBlocks].filter(block=>block.kind===scope).map(block => ({\r
          id:block.id,kind:block.kind,code:block.code.trim().toUpperCase().replace(/\\s+/g,' '),\r
          title:block.title,rows:block.rows,is_active:true,\r
        })),\r
      };\r
      // The server accepts one atomic catalog. Replace only this card in its last\r
      // confirmed catalog; never send unsaved values from any other card.\r
      return {\r
        items:pricingPersistTabs.includes(scope)\r
          ? [...state.savedCatalog.items.filter(row=>row.category!==scope),...draft.items.filter(row=>row.category===scope)]\r
          : state.savedCatalog.items,\r
        rates:scope==='surcharge'||scope==='side-channel'\r
          ? [...state.savedCatalog.rates.filter(row=>row.kind!==scope),...draft.rates.filter(row=>row.kind===scope)]\r
          : state.savedCatalog.rates,\r
      };\r
    }\r
\r
    function currentRows(){ return state.tabRows[state.activeTab] || []; }\r
    function isPortraitCompact(){\r
      return window.innerWidth <= 900 && window.innerHeight > window.innerWidth;\r
    }\r
    function getResponsiveWidths(tabKey){\r
      const base = tabMeta[tabKey].widths;\r
      if (!isPortraitCompact()) return base;\r
\r
      if (tabKey === "Cordless Type") {\r
        return "44px 56px 78px 150px minmax(90px,1fr) 88px";\r
      }\r
      if (tabKey === "Motor") {\r
        return "44px 56px 220px minmax(120px,1fr) 90px 140px 90px";\r
      }\r
      if (tabKey === "Accessory") {\r
        return "44px 56px 220px minmax(120px,1fr) 90px 90px";\r
      }\r
      if (tabKey === "Option") {\r
        return "44px 56px 220px minmax(110px,1fr) 90px";\r
      }\r
      if (tabKey === "Extras") {\r
        return "44px 56px 220px minmax(110px,1fr) 90px";\r
      }\r
      return base;\r
    }\r
    function selectedIds(){ return state.selectedIdsByTab[state.activeTab] || []; }\r
    function nextId(){ const rows=currentRows(); return rows.length ? Math.max(...rows.map(r=>r.id))+1 : 1; }\r
    function sortRows(items){\r
      return [...(items || [])].sort((a,b)=>{\r
        const aSort = a.sort === "" || a.sort == null ? Number.POSITIVE_INFINITY : Number(a.sort);\r
        const bSort = b.sort === "" || b.sort == null ? Number.POSITIVE_INFINITY : Number(b.sort);\r
        if (aSort !== bSort) return aSort - bSort;\r
        return a.id - b.id;\r
      });\r
    }\r
    function setSaved(text){\r
      const el = document.getElementById("savedState");\r
      el.textContent = text || "";\r
      clearTimeout(window.__savedTimer);\r
      if (text) window.__savedTimer = setTimeout(()=>{ el.textContent = ""; }, 2000);\r
    }\r
\r
    function updateRow(id,key,value){\r
      if(!isEditing(state.activeTab)||state.saving)return;\r
      state.tabRows[state.activeTab] = currentRows().map(row => row.id === id ? {...row,[key]:value} : row);\r
    }\r
\r
    function renderTabs(){\r
      const wrap = document.getElementById("tabs");\r
      wrap.innerHTML = "";\r
      tabs.forEach(tab=>{\r
        const btn = document.createElement("button");\r
        btn.className = "tab" + (tab === state.activeTab ? " active" : "");\r
        btn.textContent = tab;\r
        btn.onclick = ()=>navigatePricingTab(tab);\r
        wrap.appendChild(btn);\r
      });\r
    }\r
\r
    function makeField(row,col){\r
      if (!isEditing(state.activeTab) && !col.price && !col.numericOnly) {\r
        const value = document.createElement('span');\r
        value.className = 'pricing-read-value';\r
        value.textContent = row[col.key] ?? '';\r
        return value;\r
      }\r
      if (col.options) {\r
        const host=document.createElement('div');host.className='pricing-visibility';\r
        const trigger=document.createElement('button');trigger.type='button';trigger.className='field';trigger.dataset.pricingVisibilityTrigger='';\r
        trigger.textContent=row[col.key] || 'Public';trigger.setAttribute('aria-label',\`\${state.activeTab} \${row.name || row.id} \${col.header}\`);\r
        const menu=document.createElement('div');menu.className='pricing-visibility-menu hidden';menu.dataset.pricingVisibilityMenu='';\r
        trigger.onclick=event=>{event.stopPropagation();const open=menu.classList.contains('hidden');document.querySelectorAll('[data-pricing-visibility-menu]').forEach(other=>other.classList.add('hidden'));menu.classList.toggle('hidden',!open);};\r
        col.options.forEach(value=>{const option=document.createElement('div');option.className='demo-dropdown-item'+(value===trigger.textContent?' selected':'');option.textContent=value;\r
          option.onclick=event=>{event.stopPropagation();updateRow(row.id,col.key,value);trigger.textContent=value;menu.querySelectorAll('.demo-dropdown-item').forEach(other=>other.classList.toggle('selected',other===option));menu.classList.add('hidden');};menu.append(option);});\r
        host.append(trigger,menu);return host;\r
      }\r
      const input = document.createElement("input");\r
      input.type = "text";\r
      input.className = "field" + (col.align === "right" ? " right" : "");\r
      input.value = row[col.key] ?? "";\r
      if(col.price||col.numericOnly)input.inputMode=col.price?'decimal':'numeric';\r
      input.setAttribute("aria-label", \`\${state.activeTab} \${row.name || row.code || row.id} \${col.header}\`);\r
      if (state.pendingFocus && state.pendingFocus.tab === state.activeTab && state.pendingFocus.id === row.id && state.pendingFocus.key === col.key){\r
        setTimeout(()=>{ input.focus(); input.select(); state.pendingFocus = null; }, 0);\r
      }\r
      input.oninput = (e)=>{\r
        let value = e.target.value;\r
        e.target.value = value;\r
        updateRow(row.id, col.key, value);\r
      };\r
      return input;\r
    }\r
\r
    function regularCard(meta){\r
      const scope=state.activeTab;\r
      const rows = currentRows();\r
      const selected = selectedIds();\r
      const shell = document.createElement("div");\r
      shell.className = "card content-card";\r
      shell.dataset.pricingScope=scope;shell.setAttribute("role","region");shell.setAttribute("aria-label",meta.title);\r
\r
      const top = document.createElement("div");\r
      top.className = "row pb-4";\r
      const left = document.createElement("div");\r
      left.innerHTML = \`<h2 class="section-title">\${meta.title}</h2><div class="section-desc">\${meta.description}</div>\`;\r
      const actions = document.createElement("div");\r
      actions.className = "section-actions";\r
\r
      const add = document.createElement("button");\r
      add.className = "btn";\r
      add.textContent = meta.addLabel;\r
      add.hidden=!isEditing(scope);\r
      add.onclick = ()=>{\r
        if(!isEditing(state.activeTab)||state.saving)return;\r
        const id = nextId();\r
        state.tabRows[state.activeTab] = [...currentRows(), {...meta.newRow(id), dbId:crypto.randomUUID()}];\r
        const firstKey = meta.columns.some(c=>c.key==="sort") ? "sort" : "code";\r
        state.pendingFocus = { tab: state.activeTab, id, key: firstKey };\r
        render();\r
      };\r
\r
      const del = document.createElement("button");\r
      del.className = "btn btn-danger";\r
      del.textContent = "Delete";\r
      del.hidden=!isEditing(scope);\r
      del.disabled = !selected.length;\r
      del.onclick = ()=>{\r
        if (!isEditing(scope)||state.saving||!selected.length) return;\r
        state.tabRows[state.activeTab] = currentRows().filter(row => !selected.includes(row.id));\r
        state.selectedIdsByTab[state.activeTab] = [];\r
        render();\r
      };\r
\r
      actions.append(add, del);\r
      appendSectionControls(actions,scope);\r
      top.append(left, actions);\r
      shell.appendChild(top);\r
      appendSectionError(shell,scope);\r
\r
      const tableShell = document.createElement("div");\r
      tableShell.className = "table-shell";\r
\r
      const head = document.createElement("div");\r
      head.className = "table-head";\r
      head.style.gridTemplateColumns = getResponsiveWidths(state.activeTab);\r
      const thCheck = document.createElement("div");\r
      thCheck.className = "th-check";\r
      head.appendChild(thCheck);\r
      meta.columns.forEach(col=>{\r
        const th = document.createElement("div");\r
        th.className = "th" + (col.align === "right" ? " right" : "");\r
        th.textContent = col.header;\r
        head.appendChild(th);\r
      });\r
      tableShell.appendChild(head);\r
\r
      if (!rows.length){\r
        const empty = document.createElement("div");\r
        empty.className = "empty";\r
        empty.textContent = "No items yet.";\r
        tableShell.appendChild(empty);\r
      } else {\r
        rows.forEach(row=>{\r
          const tr = document.createElement("div");\r
          tr.className = "table-row pricing-item-row";\r
          tr.style.gridTemplateColumns = getResponsiveWidths(state.activeTab);\r
\r
          const tdCheck = document.createElement("div");\r
          tdCheck.className = "td-check";\r
          const cb = document.createElement("input");\r
          cb.type = "checkbox";\r
          cb.checked = selected.includes(row.id);\r
          cb.onchange = ()=>{\r
            const current = selectedIds();\r
            state.selectedIdsByTab[state.activeTab] = current.includes(row.id)\r
              ? current.filter(id=>id!==row.id)\r
              : [...current, row.id];\r
            render();\r
          };\r
          tdCheck.appendChild(cb);\r
          tr.appendChild(tdCheck);\r
\r
          meta.columns.forEach(col=>{\r
            const td = document.createElement("div");\r
            td.className = "td";\r
            td.appendChild(makeField(row,col));\r
            tr.appendChild(td);\r
          });\r
          tableShell.appendChild(tr);\r
        });\r
      }\r
\r
      shell.appendChild(tableShell);\r
      return shell;\r
    }\r
\r
    const rateSelections = { surcharge: [], 'side-channel': [] };\r
\r
    function rateField(scope, value, label, oninput, right=false){\r
      const input=document.createElement('input');input.type='text';\r
      input.className='field'+(right?' right':'');input.value=value;\r
      input.setAttribute('aria-label',label);\r
      if(right)input.inputMode='decimal';\r
      input.oninput=()=>{if(isEditing(scope)&&!state.saving)oninput(input.value);};\r
      return input;\r
    }\r
    function rateCell(row, className, child){\r
      const cell=document.createElement('div');cell.className=className;\r
      if(typeof child==='string')cell.textContent=child;else if(child)cell.append(child);\r
      row.append(cell);return cell;\r
    }\r
    function rateButton(scope, label, action, disabled=false){\r
      const button=document.createElement('button');button.type='button';button.className='btn'+(label==='Delete'?' btn-danger':'');\r
      button.dataset.pricingAction=label;\r
      button.hidden=!isEditing(scope);\r
      button.textContent=label;button.disabled=disabled;button.onclick=()=>{if(isEditing(scope)&&!state.saving)action();};return button;\r
    }\r
    function rateCard(kind){\r
      const surcharge=kind==='surcharge', key=surcharge?'surchargeBlocks':'sideChannelBlocks';\r
      const rates=state[key];\r
      rateSelections[kind]=rateSelections[kind].filter(id=>rates.some(rate=>rate.id===id));\r
      const selected=rateSelections[kind];\r
      const shell=document.createElement('div');shell.className='card content-card pricing-rates-card';\r
      shell.dataset.pricingScope=kind;shell.setAttribute('role','region');shell.setAttribute('aria-label',surcharge?'Headrail Surcharge':'Side Channel Surcharge');\r
      const top=document.createElement('div');top.className='row pb-4';\r
      const left=document.createElement('div');\r
      const heading=document.createElement('h2');heading.className='section-title';heading.textContent=surcharge?'Headrail Surcharge':'Side Channel Surcharge';\r
      const description=document.createElement('div');description.className='section-desc';\r
      description.textContent=surcharge?'Prices by width in inches.':'Prices by height for side channels and by width for L channels. Side channels are priced as a pair.';\r
      left.append(heading,description);\r
      const actions=document.createElement('div');actions.className='section-actions';\r
      if(surcharge)actions.append(rateButton(kind,'Add Item',()=>{\r
        // New items use the fixed six-inch columns from the confirmed price sheet.\r
        const rows=Array.from({length:14},(_,index)=>[String((surcharge?30:24)+index*6),'0.00']);\r
        const rate={id:crypto.randomUUID(),kind,code:'',title:'',rows};\r
        rates.push(rate);rateSelections[kind]=[rate.id];render();\r
      }));\r
      actions.append(rateButton(kind,'Delete',()=>{\r
        if(surcharge){state[key]=rates.filter(rate=>!selected.includes(rate.id));rateSelections[kind]=[];render();}\r
        else {state.channelDeletePrompt=[...selected];render();}\r
      },!selected.length));\r
      if(!surcharge&&state.deletedChannelDrafts.length)actions.append(rateButton(kind,'Undo delete',undoChannelDelete));\r
      appendSectionControls(actions,kind);\r
      top.append(left,actions);shell.append(top);appendSectionError(shell,kind);\r
      if(!surcharge)appendChannelRecovery(shell);\r
      const sizeKey=value=>String(value).trim()===''?'':String(Number(value));\r
      const sizes=[...new Set(rates.flatMap(rate=>rate.rows.map(row=>sizeKey(row[0]))))].sort((a,b)=>a===''?1:b===''?-1:Number(a)-Number(b));\r
      const table=document.createElement('div');table.className='table-shell pricing-rate-table';\r
      table.tabIndex=0;table.setAttribute('aria-label',surcharge?'Headrail surcharge prices':'Side channel prices');\r
      const codeWidth=surcharge?130:160;\r
      const grid='56px '+codeWidth+'px 240px'+sizes.map(()=>' 84px').join('');\r
      const minWidth=296+codeWidth+sizes.length*84;\r
      const head=document.createElement('div');head.className='table-head';head.style.gridTemplateColumns=grid;head.style.minWidth=minWidth+'px';\r
      rateCell(head,'th-check pricing-rate-select','');rateCell(head,'th pricing-rate-code',surcharge?'Code':'Channel');rateCell(head,'th','Description');\r
      sizes.forEach(size=>rateCell(head,'th right',size===''?'Size':size+'″'));table.append(head);\r
      rates.forEach(rate=>{\r
        const row=document.createElement('div');row.className='table-row';row.dataset.rateCode=rate.code;\r
        row.style.gridTemplateColumns=grid;row.style.minWidth=minWidth+'px';\r
        const check=document.createElement('input');check.type='checkbox';check.checked=selected.includes(rate.id);check.setAttribute('aria-label','Select '+(rate.code||'new item'));\r
        check.onchange=()=>{rateSelections[kind]=check.checked?[...selected,rate.id]:selected.filter(id=>id!==rate.id);state.channelDeletePrompt=null;render();};\r
        rateCell(row,'td-check pricing-rate-select',check);\r
        let code;\r
        if(surcharge){code=rateField(kind,rate.code,'Rate product code',value=>{rate.code=value;});code.placeholder='Code';}\r
        else {\r
          code=document.createElement('select');code.className='field';code.setAttribute('aria-label','Channel type');\r
          for(const value of ['INSIDE MOUNT','OUTSIDE MOUNT','L CHANNELS']){\r
            const option=document.createElement('option');option.value=value;option.textContent={'INSIDE MOUNT':'Inside Mount','OUTSIDE MOUNT':'Outside Mount','L CHANNELS':'L Channels'}[value];code.append(option);\r
          }\r
          code.value=rate.code;code.onchange=()=>{if(isEditing(kind)&&!state.saving){rate.code=code.value;render();}};\r
        }\r
        rateCell(row,'td pricing-rate-code',code);\r
        const title=rateField(kind,rate.title,'Rate description',value=>{rate.title=value;});title.placeholder='Description';rateCell(row,'td',title);\r
        sizes.forEach(size=>{\r
          const values=rate.rows.find(values=>sizeKey(values[0])===size);\r
          rateCell(row,'td'+(!values?' pricing-rate-missing':''),values?rateField(kind,values[1],rate.code+' '+(size||'new')+' inch Price',value=>{values[1]=value;},true):'—');\r
        });table.append(row);\r
      });\r
      if(!rates.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='No items yet.';table.append(empty);}\r
      shell.append(table);\r
      return shell;\r
    }\r
    function buildOptionExtraCard(){return rateCard('side-channel');}\r
    function buildSurchargeView(){return rateCard('surcharge');}\r
\r
    function renderContent(){\r
      const content = document.getElementById("content");\r
      content.innerHTML = "";\r
      const meta = tabMeta[state.activeTab];\r
      if (state.activeTab === "Surcharge"){\r
        content.appendChild(buildSurchargeView());\r
        content.appendChild(buildOptionExtraCard());\r
        return;\r
      }\r
      content.appendChild(regularCard(meta));\r
    }\r
\r
    function render(){\r
      const active=document.activeElement;\r
      const activeScope=active?.closest?.('[data-pricing-scope]')?.dataset.pricingScope;\r
      if(activeScope&&active.dataset.pricingAction)state.pendingActionFocus={scope:activeScope,action:active.dataset.pricingAction};\r
      renderTabs();\r
      const content=document.getElementById('content');\r
      if(state.loading||state.loadError){\r
        content.textContent=state.loading?'Loading prices...':state.loadError;\r
      } else renderContent();\r
      const locked=state.loading||state.saving||!!state.loadError;\r
      content.inert=locked;\r
      document.getElementById('tabs').inert=locked;\r
      content.querySelectorAll('[data-pricing-scope]').forEach(card=>{\r
        const editing=isEditing(card.dataset.pricingScope);\r
        card.classList.toggle('is-editing',editing);\r
        card.querySelectorAll('input,select').forEach(input=>{\r
          if(input.tagName==='SELECT'||input.type==='checkbox')input.disabled=!editing||locked;\r
          else input.readOnly=!editing||locked;\r
          input.tabIndex=editing?0:-1;\r
        });\r
      });\r
      const reload=document.querySelector('[data-reload-prices]');\r
      if(reload){reload.disabled=state.loading||state.saving;reload.hidden=state.editingScopes.size>0;}\r
      if(!locked&&state.pendingActionFocus){\r
        const {scope,action}=state.pendingActionFocus;\r
        const card=[...content.querySelectorAll('[data-pricing-scope]')].find(card=>card.dataset.pricingScope===scope);\r
        const controls=[...(card?.querySelectorAll('[data-pricing-action]')||[])].filter(control=>!control.disabled&&!control.hidden);\r
        const after={'Delete':'Keep channels','Delete selected':'Undo delete','Keep channels':'Delete','Undo delete':'Delete','Use saved prices':'Keep editing','Keep editing':'Use saved prices','Discard this card’s edits':'Edit','Restore to draft':'Save'};\r
        const target=controls.find(control=>control.dataset.pricingAction===after[action])\r
          ||controls.find(control=>control.dataset.pricingAction===action)\r
          ||controls.find(control=>control.dataset.pricingAction===(isEditing(scope)?'Save':'Edit'));\r
        state.pendingActionFocus=null;\r
        target?.focus();\r
      }\r
    }\r
\r
    async function loadCatalog(){\r
      state.loading=true;state.loadError='';render();\r
      try {\r
        const catalog=await window.loadPricingItemsFromSupabase();\r
        if(destroyed)return;\r
        state.editingScopes.clear();state.editBaselines.clear();state.saveErrors={};\r
        state.saveAttempts={};state.recoveryMessages={};state.recoveryConflicts.clear();\r
        state.channelDeletePrompt=null;state.deletedChannelDrafts=[];state.channelDeleteOrder=null;state.discardPrompt=null;state.pendingActionFocus=null;\r
        applyLoadedPricingItems(catalog);\r
      } catch(error){\r
        if(destroyed)return;\r
        state.loadError='Prices could not be loaded. Try Reload prices. If this continues, the pricing database update may not be installed.';\r
        console.error('Failed to load pricing',error);\r
      } finally {state.loading=false;if(!destroyed)render();}\r
    }\r
    function beginEditSection(scope){\r
      if(window.canEditPricingCatalog!==true)return;\r
      if(state.loading||state.saving||!state.revision||state.loadError)return;\r
      if(isEditing(scope))return;\r
      (state.editBaselines ||= new Map()).set(scope,JSON.stringify(scopeRows(scope)));\r
      state.editingScopes.add(scope);delete state.saveErrors[scope];delete state.recoveryMessages[scope];setSaved('');render();\r
    }\r
    function cancelEditSection(scope){\r
      if(state.saving||!state.savedCatalog)return;\r
      state.editingScopes.delete(scope);delete state.saveErrors[scope];\r
      clearScopeRecovery(scope);\r
      state.editBaselines?.delete(scope);\r
      applyLoadedPricingItems(state.savedCatalog,true);setSaved('');render();\r
    }\r
    async function saveSection(scope){\r
      if(window.canEditPricingCatalog!==true)return false;\r
      if(!isEditing(scope)||state.loading||state.saving||!state.revision||state.recoveryConflicts.has(scope)||(scope==='side-channel'&&state.channelDeletePrompt))return false;\r
      state.saving=true;delete state.saveErrors[scope];render();setSaved('Saving...');\r
      try {\r
        const payload=buildPricingItemsPayload(scope);\r
        state.saveAttempts[scope]={payload:structuredClone(payload)};\r
        const catalog=await window.savePricingItemsToSupabase(payload,state.revision);\r
        if(destroyed)return false;\r
        state.editingScopes.delete(scope);\r
        state.editBaselines?.delete(scope);\r
        clearScopeRecovery(scope);\r
        applyLoadedPricingItems(catalog,true);setSaved('Changes saved');\r
        return true;\r
      } catch(error){\r
        if(destroyed)return;\r
        setSaved('Save not confirmed');state.saveErrors[scope]=(error.message || 'Prices could not be saved.')+' Your edits are still here. Check saved prices before trying again.';\r
        return false;\r
      } finally {state.saving=false;if(!destroyed)render();}\r
    }\r
    function appendSectionControls(actions,scope){\r
      if(window.canEditPricingCatalog!==true)return;\r
      const control=(label,action,primary=false)=>{\r
        const button=document.createElement('button');button.type='button';\r
        button.dataset.pricingAction=label;\r
        button.className='btn'+(primary?' btn-dark':'');button.textContent=label;\r
        button.disabled=state.loading||state.saving||!!state.loadError||!state.revision;\r
        button.onclick=action;return button;\r
      };\r
      if(isEditing(scope))actions.append(control('Cancel',()=>cancelEditSection(scope)),control('Save',()=>saveSection(scope),true));\r
      else actions.append(control('Edit',()=>beginEditSection(scope),true));\r
      if(isEditing(scope)&&(state.recoveryConflicts.has(scope)||(scope==='side-channel'&&state.channelDeletePrompt)))actions.querySelector('.btn-dark').disabled=true;\r
    }\r
    function appendSectionError(card,scope){\r
      const message=state.saveErrors[scope]||state.recoveryMessages[scope];\r
      if(!message)return;\r
      const panel=document.createElement('div');panel.className=state.saveErrors[scope]?'pricing-save-error':'pricing-recovery';\r
      panel.setAttribute('role',state.saveErrors[scope]?'alert':'status');\r
      const text=document.createElement('div');text.textContent=message;panel.append(text);\r
      const actions=document.createElement('div');actions.className='pricing-recovery-actions';\r
      actions.append(recoveryButton('Check saved prices',()=>checkSavedSection(scope)));\r
      if(state.recoveryConflicts.has(scope)){\r
        appendSavedPrices(panel,scope);\r
        if(state.discardPrompt===scope){\r
          const note=document.createElement('p');note.textContent="Discard this card's edits and load its saved prices? Other card edits will stay here.";panel.append(note);\r
          actions.append(recoveryButton('Discard this card’s edits',()=>discardAndLoadScope(scope),true),recoveryButton('Keep editing',()=>{state.discardPrompt=null;render();}));\r
        }else actions.append(recoveryButton('Use saved prices',()=>{state.discardPrompt=scope;render();}));\r
      }\r
      panel.append(actions);card.append(panel);\r
    }\r
    function clearScopeRecovery(scope){\r
      delete state.saveAttempts[scope];delete state.recoveryMessages[scope];\r
      state.recoveryConflicts.delete(scope);if(state.discardPrompt===scope)state.discardPrompt=null;\r
      if(scope==='side-channel'){state.channelDeletePrompt=null;state.deletedChannelDrafts=[];state.channelDeleteOrder=null;state.restoreChannelId='';}\r
    }\r
    function recoveryButton(label,action,primary=false){\r
      const button=document.createElement('button');button.type='button';button.className='btn'+(primary?' btn-dark':'');\r
      button.dataset.pricingAction=label;\r
      button.textContent=label;button.disabled=state.saving;button.onclick=()=>{if(!state.saving)action();};return button;\r
    }\r
    function acceptCheckedCatalog(catalog,checkingScope){\r
      const previous=state.savedCatalog;\r
      for(const scope of state.editingScopes){\r
        const draft=buildPricingItemsPayload(scope);\r
        const matches=window.samePricingScope(draft,catalog,scope);\r
        const ownSave=scope===checkingScope&&state.saveAttempts[scope]&&window.samePricingScope(state.saveAttempts[scope].payload,catalog,scope);\r
        if(matches||ownSave){\r
          if(matches&&state.recoveryConflicts.has(scope))state.recoveryMessages[scope]='Saved prices now match this card. Your editor remains open.';\r
          state.recoveryConflicts.delete(scope);\r
        }\r
        else if(!window.samePricingScope(previous,catalog,scope)){\r
          state.recoveryConflicts.add(scope);\r
          state.recoveryMessages[scope]='Saved prices for this card changed. Your edits are kept. Compare the saved prices, then choose Use saved prices or adjust your edits and check again.';\r
        }\r
      }\r
      applyLoadedPricingItems(catalog,true);\r
    }\r
    async function checkSavedSection(scope){\r
      if(window.canEditPricingCatalog!==true||!isEditing(scope)||state.loading||state.saving)return;\r
      state.saving=true;setSaved('Checking saved prices...');render();\r
      try{\r
        const catalog=await window.loadPricingItemsFromSupabase();if(destroyed)return;\r
        const confirmed=state.saveAttempts[scope]&&window.samePricingScope(state.saveAttempts[scope].payload,catalog,scope);\r
        const currentMatches=window.samePricingScope(buildPricingItemsPayload(scope),catalog,scope);\r
        acceptCheckedCatalog(catalog,scope);delete state.saveErrors[scope];\r
        if(confirmed&&currentMatches){\r
          state.editingScopes.delete(scope);state.editBaselines.delete(scope);clearScopeRecovery(scope);\r
          applyLoadedPricingItems(catalog,true);setSaved('Saved prices confirmed');\r
        }else if(confirmed){\r
          delete state.saveAttempts[scope];\r
          state.recoveryMessages[scope]='Prices from your previous save are confirmed. Your newer edits are still here. Review them before saving.';\r
          setSaved('Previous save confirmed');\r
        }else if(!state.recoveryConflicts.has(scope)){\r
          state.recoveryMessages[scope]='Saved prices checked. Your edits are still here and have not been sent again. Review them, then Save when ready.';\r
          setSaved('Saved prices checked');\r
        }else setSaved('Compare saved prices');\r
      }catch(error){\r
        if(destroyed)return;\r
        state.saveErrors[scope]='Saved prices could not be checked. Your edits are still here. Try Check saved prices again.';\r
        setSaved('Check failed');console.error('Failed to check saved prices',error);\r
      }finally{state.saving=false;if(!destroyed)render();}\r
    }\r
    async function discardAndLoadScope(scope){\r
      if(window.canEditPricingCatalog!==true||state.discardPrompt!==scope||!isEditing(scope)||state.saving)return;\r
      state.saving=true;render();\r
      try{\r
        const catalog=await window.loadPricingItemsFromSupabase();if(destroyed)return;\r
        acceptCheckedCatalog(catalog,null);\r
        state.editingScopes.delete(scope);state.editBaselines.delete(scope);delete state.saveErrors[scope];clearScopeRecovery(scope);\r
        applyLoadedPricingItems(catalog,true);setSaved('Saved prices loaded');\r
      }catch(error){if(!destroyed)state.saveErrors[scope]='Saved prices could not be loaded. No edits were discarded. Try again.';}\r
      finally{state.saving=false;if(!destroyed)render();}\r
    }\r
    function appendSavedPrices(panel,scope){\r
      const details=document.createElement('details');details.className='pricing-saved-preview';\r
      const summary=document.createElement('summary');summary.textContent='Saved prices (read only)';details.append(summary);\r
      const body=document.createElement('div');\r
      const rows=window.pricingScopeSnapshot(state.savedCatalog,scope);\r
      for(const row of rows){\r
        const line=document.createElement('p');\r
        line.textContent=row.kind?\`\${row.code} — \${row.title}: \`+row.rows.map(([size,price])=>\`\${size}″ $\${Number(price).toFixed(2)}\`).join(' · ')\r
          :\`\${row.name}\${row.code?' ('+row.code+')':''}: $\${Number(row.price).toFixed(2)}\${row.description?' — '+row.description:''}\`;\r
        body.append(line);\r
      }\r
      if(!rows.length)body.textContent='No saved items in this card.';\r
      details.append(body);panel.append(details);\r
    }\r
    function confirmChannelDelete(){\r
      if(!isEditing('side-channel')||state.saving||!state.channelDeletePrompt)return;\r
      const selected=new Set(state.channelDeletePrompt);\r
      if(!state.deletedChannelDrafts.length)state.channelDeleteOrder=state.sideChannelBlocks.map(rate=>rate.id);\r
      state.sideChannelBlocks.forEach((rate,index)=>{if(selected.has(rate.id))state.deletedChannelDrafts.push({rate:structuredClone(rate),index});});\r
      state.sideChannelBlocks=state.sideChannelBlocks.filter(rate=>!selected.has(rate.id));\r
      rateSelections['side-channel']=[];state.channelDeletePrompt=null;render();\r
    }\r
    function undoChannelDelete(){\r
      if(!isEditing('side-channel')||state.saving)return;\r
      for(const {rate} of state.deletedChannelDrafts){\r
        if(!state.sideChannelBlocks.some(row=>row.id===rate.id))state.sideChannelBlocks.push(rate);\r
      }\r
      const order=new Map((state.channelDeleteOrder||[]).map((id,index)=>[id,index]));\r
      state.sideChannelBlocks.sort((a,b)=>(order.get(a.id)??order.size)-(order.get(b.id)??order.size));\r
      state.deletedChannelDrafts=[];state.channelDeleteOrder=null;state.channelDeletePrompt=null;render();\r
    }\r
    function restoreChannelToDraft(id){\r
      if(window.canEditPricingCatalog!==true||!isEditing('side-channel')||state.saving)return;\r
      const rate=window.restorableChannelRates(state.savedCatalog,state.sideChannelBlocks).find(rate=>rate.id===id);if(!rate)return;\r
      state.sideChannelBlocks.push({...structuredClone(rate),is_active:true,rows:rate.rows.map(([size,price])=>[String(size),Number(price).toFixed(2)])});\r
      state.restoreChannelId='';render();\r
    }\r
    function appendChannelRecovery(card){\r
      if(state.channelDeletePrompt){\r
        const panel=document.createElement('div');panel.className='pricing-recovery';panel.setAttribute('role','alert');\r
        const names=state.sideChannelBlocks.filter(rate=>state.channelDeletePrompt.includes(rate.id)).map(rate=>rate.code).join(', ');\r
        const text=document.createElement('p');text.textContent=\`Delete \${names}? After Save, new quotes using these channels cannot be saved until their prices are restored. Existing quotes and orders keep their saved prices.\`;panel.append(text);\r
        const actions=document.createElement('div');actions.className='pricing-recovery-actions';\r
        actions.append(recoveryButton('Delete selected',confirmChannelDelete),recoveryButton('Keep channels',()=>{state.channelDeletePrompt=null;render();}));panel.append(actions);card.append(panel);\r
      }else if(state.deletedChannelDrafts.length){\r
        const note=document.createElement('p');note.className='pricing-channel-note';note.textContent='Channel deletion is not saved yet. Undo delete restores the removed rows; Cancel restores this whole card.';card.append(note);\r
      }\r
      const archived=window.restorableChannelRates(state.savedCatalog,state.sideChannelBlocks);\r
      if(!archived.length)return;\r
      const panel=document.createElement('div');panel.className='pricing-recovery';\r
      const text=document.createElement('p');text.textContent=isEditing('side-channel')\r
        ?'Restore a deleted channel using its retained prices. Save applies the restoration; Cancel leaves saved prices unchanged.'\r
        :'Deleted channel prices are available. Edit this card to restore them. Existing quotes and orders keep their saved prices.';\r
      panel.append(text);\r
      if(isEditing('side-channel')&&window.canEditPricingCatalog===true){\r
        const actions=document.createElement('div');actions.className='pricing-recovery-actions';\r
        const select=document.createElement('select');select.className='field';select.setAttribute('aria-label','Deleted channel to restore');\r
        select.dataset.pricingAction='Deleted channel to restore';\r
        const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Select deleted channel';select.append(placeholder);\r
        for(const rate of archived){const option=document.createElement('option');option.value=rate.id;option.textContent=rate.title?\`\${rate.code} — \${rate.title}\`:rate.code;select.append(option);}\r
        select.value=state.restoreChannelId;select.onchange=()=>{state.restoreChannelId=select.value;render();};\r
        const restore=recoveryButton('Restore to draft',()=>restoreChannelToDraft(state.restoreChannelId));restore.disabled=state.saving||!state.restoreChannelId;\r
        actions.append(select,restore);panel.append(actions);\r
      }\r
      card.append(panel);\r
    }\r
    let destroyed=false;\r
    async function initPricingPage(){\r
      document.querySelector('[data-reload-prices]')?.remove();\r
      const reload=document.createElement('button');reload.type='button';reload.className='btn';reload.textContent='Reload prices';reload.dataset.reloadPrices='true';\r
      reload.onclick=()=>{if(!state.loading&&!state.saving&&!state.editingScopes.size)loadCatalog();};document.querySelector('.pricing-page .page-topbar .actions-right').append(reload);\r
      window.addEventListener('resize',render);\r
      await loadCatalog();\r
    }\r
    window.destroyPricingPage=()=>{destroyed=true;state.leaveRequest?.onStay?.();state.leaveRequest=null;closePricingLeavePrompt();window.removeEventListener('resize',render);clearTimeout(window.__savedTimer);document.querySelector('[data-reload-prices]')?.remove();};\r
    window.initPricingPage=initPricingPage;\r
    window.getPricingEditState=getPricingEditState;\r
    window.requestPricingLeave=requestPricingLeave;\r
})();\r
`,v=e=>{let t=String(e??``).trim();return t!==``&&Number.isFinite(Number(t))?Number(t):`invalid:${t}`};function y(e,t){return(t===`surcharge`||t===`side-channel`?(e.rates||[]).filter(e=>e.kind===t&&e.is_active!==!1).map(e=>({id:e.id,kind:e.kind,code:t===`surcharge`?i(e.code):a(e.code),title:e.title||``,rows:(e.rows||[]).map(([e,t])=>[v(e),v(t)]).sort((e,t)=>Number(e[0])-Number(t[0]))})):(e.items||[]).filter(e=>e.category===t&&e.is_active!==!1).map(e=>({id:e.id,category:e.category,sort_order:v(e.sort_order),code:String(e.code||``).trim(),name:String(e.name||``).trim(),description:e.description||``,part_number:e.part_number||``,price:v(e.price),...t===`Motor`?{visibility:e.visibility||`Public`}:{}}))).sort((e,t)=>String(e.id).localeCompare(String(t.id)))}var b=(e,t,n)=>JSON.stringify(y(e,n))===JSON.stringify(y(t,n));function x(e,t){let n=[`INSIDE MOUNT`,`OUTSIDE MOUNT`,`L CHANNELS`],r=new Set((t||[]).map(e=>a(e.code))),i=new Set((t||[]).map(e=>e.id));return(e.deleted_channels||[]).filter(e=>e.kind===`side-channel`&&n.includes(a(e.code))&&!r.has(a(e.code))&&!i.has(e.id))}var S=`<div class="app">
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
      </div>
    </nav>

    <nav class="admin-subnav" aria-label="Admin sections">
      <div class="admin-subnav-inner">
        <div class="admin-subnav-item">Fabric</div>
        <div class="admin-subnav-item">Hardware</div>
        <div class="admin-subnav-item">Control System</div>
        <div class="admin-subnav-item current">Pricing</div>
        <div class="admin-subnav-item">Accounts</div>
      </div>
    </nav>

    <div class="page">
      <section class="page-topbar">
        <div class="title-wrap">
          <h1>Pricing</h1>
          <p id="lastUpdatedText">Last updated: Loading…</p>
        </div>
        <div class="actions-right">
          <div id="savedState" class="saved-state"></div>
        </div>
      </section>

      <div class="container">
      <div id="tabs" class="tabs" aria-label="Pricing tabs"></div>
      <div id="content"></div>
    </div>
  </div>`;function C({currentUser:t,initialTab:r=`Cordless Type`,onOpenMainPage:i,onOpenMeasurePage:a,onOpenQuotesPage:v,onOpenOrdersPage:C,onOpenClientsPage:w,onOpenResourcesPage:T,onOpenAdminPage:E,onOpenAdminFabricPage:D,onOpenAdminHardwarePage:O,onOpenAdminControlSystemPage:k,onOpenAdminPricingPage:A,onOpenAdminAccountsPage:j,onOpenAdminFeedbackPage:M}){let N=n(t),P=f(S,t?.account_name||`Charles / Winco`,N,t?.role===`Admin`);return(0,h.useEffect)(()=>{window.initialPricingTab=r,window.openAdminEditExitDialog=d;let n=m(document.querySelector(`.pricing-page`),`[data-pricing-visibility-menu]`),i=p(document.querySelector(`.pricing-page`));window.canEditPricingCatalog=t?.role===`Admin`,window.samePricingScope=b,window.pricingScopeSnapshot=y,window.restorableChannelRates=x,window.loadPricingItemsFromSupabase=async()=>{try{let t=await o(e);return i.render(t.last_updated),t}catch(e){throw i.unavailable(),e}},window.savePricingItemsToSupabase=async(n,r)=>{if(t?.role!==`Admin`)throw Error(`Admin access required`);let a=await s(e,n,r);return i.render(a.last_updated),a};let a=document.createElement(`script`);a.type=`text/javascript`,a.dataset.wincoPricingPage=`true`,a.text=_,document.body.appendChild(a);let c=l(()=>window.getPricingEditState?.()||{}),f=u(()=>new Promise(e=>{window.requestPricingLeave(()=>e(!0),void 0,()=>e(!1))})),h=window.setTimeout(()=>{typeof window.initPricingPage==`function`&&window.initPricingPage()},0);return()=>{n(),delete window.initialPricingTab,window.clearTimeout(h),c(),f(),window.destroyPricingPage?.(),delete window.getPricingEditState,delete window.requestPricingLeave,delete window.openAdminEditExitDialog,a.parentNode&&a.parentNode.removeChild(a),delete window.initPricingPage,delete window.destroyPricingPage,delete window.canEditPricingCatalog,delete window.samePricingScope,delete window.pricingScopeSnapshot,delete window.restorableChannelRates,delete window.loadPricingItemsFromSupabase,delete window.savePricingItemsToSupabase}},[]),(0,h.useEffect)(()=>{let e=document.querySelector(`.pricing-page`);if(e)return c(e,{onOpenMainPage:i,onOpenMeasurePage:a,onOpenQuotesPage:v,onOpenOrdersPage:C,onOpenClientsPage:w,onOpenResourcesPage:T,onOpenAdminPage:E,onOpenAdminFabricPage:D,onOpenAdminHardwarePage:O,onOpenAdminControlSystemPage:k,onOpenAdminPricingPage:A,onOpenAdminAccountsPage:j,onOpenAdminFeedbackPage:M},{navigate:e=>window.requestPricingLeave?.(e)})},[i,a,v,C,w,T,E,D,O,k,A,j,M]),(0,g.jsx)(`div`,{className:`pricing-page admin-design`,dangerouslySetInnerHTML:{__html:P}})}export{C as default};