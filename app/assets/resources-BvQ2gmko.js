import{n as e,r as t}from"./supabaseClient-CdMXQqVK.js";import{t as n}from"./jsx-runtime-C8sGzQnj.js";var r=t(),i=n(),a=`function applyOrdersFilters() {\r
      document.querySelectorAll('.orders-row').forEach(function (row) {\r
        row.style.display = 'grid';\r
      });\r
    }\r
\r
    window.initResourcesPage = function initResourcesPage() {\r
      window.disposeResourcesPage?.();\r
      const pageRoot = document.querySelector('.resources-page');\r
      const resourceSupabaseClient = window.wincoResourcesSupabase;\r
      const resourceFiles = window.wincoResourceFiles;\r
      const uploadFile = resourceFiles.createResourceUploads();\r
      let disposed = false;\r
      let folderLoadRevision = 0;\r
      let documentLoadRevision = 0;\r
      let documentPreviewRevision = 0;\r
      let fileMutationPending = false;\r
      let retryImageFiles = [];\r
      let newFolderParentId = null;\r
      let newFolderAttempt = null;\r
      const manageToggle = pageRoot.querySelector('[data-manage-toggle]');\r
      const manageDeleteBtn = pageRoot.querySelector('.manage-delete-btn');\r
      const manageSaveBtn = pageRoot.querySelector('[data-manage-save]');\r
      const manageSaveStatus = pageRoot.querySelector('[data-manage-save-status]');\r
      const ordersShell = pageRoot.querySelector('.orders-shell');\r
      const selectAllCheckbox = pageRoot.querySelector('.manage-select-head .manage-checkbox');\r
      const deleteConfirmOverlay = pageRoot.querySelector('[data-delete-confirm]');\r
      const deleteConfirmTitle = pageRoot.querySelector('[data-delete-confirm-title]');\r
      const deleteConfirmText = pageRoot.querySelector('[data-delete-confirm-text]');\r
      const deleteCancelBtn = pageRoot.querySelector('[data-delete-cancel]');\r
      const deleteConfirmBtn = pageRoot.querySelector('[data-delete-confirm-btn]');\r
\r
      const resourceTabs = Array.from(pageRoot.querySelectorAll('[data-resource-tab]'));\r
      const resourcePanes = Array.from(pageRoot.querySelectorAll('[data-resource-pane]'));\r
      const documentsUploadBtn = pageRoot.querySelector('.documents-upload-btn');\r
      const documentUploadOverlay = pageRoot.querySelector('[data-document-upload-overlay]');\r
      const documentTitleInput = pageRoot.querySelector('[data-document-title]');\r
      const documentFileInput = pageRoot.querySelector('[data-document-file]');\r
      const documentRevisionInput = pageRoot.querySelector('[data-document-revision]');\r
      const documentAccessSelect = pageRoot.querySelector('[data-document-access]');\r
      const documentIsNewInput = pageRoot.querySelector('[data-document-is-new]');\r
      const documentUploadStatus = pageRoot.querySelector('[data-document-upload-status]');\r
      const documentUploadCancel = pageRoot.querySelector('[data-document-upload-cancel]');\r
      const documentUploadSubmit = pageRoot.querySelector('[data-document-upload-submit]');\r
      const resourceDocumentsList = pageRoot.querySelector('[data-resource-documents-list]');\r
\r
      const imageFolderCards = Array.from(pageRoot.querySelectorAll('.image-folder-card[data-folder-open]'));\r
      const imageFolderList = pageRoot.querySelector('[data-image-folder-list]');\r
      const imageFolderDetail = pageRoot.querySelector('[data-image-folder-detail]');\r
      const imageFolderDetailTitle = pageRoot.querySelector('[data-folder-detail-title]');\r
      const imageFolderBack = pageRoot.querySelector('[data-folder-back]');\r
      const imageThumbGrid = pageRoot.querySelector('[data-image-thumb-grid]');\r
      const imageSelectionCount = pageRoot.querySelector('[data-image-selection-count]');\r
      const folderSelectionCount = pageRoot.querySelector('[data-folder-selection-count]');\r
\r
      const imageUploadOverlay = pageRoot.querySelector('[data-image-upload-overlay]');\r
      const imageUploadDropzone = imageUploadOverlay ? imageUploadOverlay.querySelector('.upload-dropzone') : null;\r
      const imageUploadInput = pageRoot.querySelector('[data-image-upload-input]');\r
      const imageUploadCancel = pageRoot.querySelector('[data-image-upload-cancel]');\r
      const imageUploadChoose = pageRoot.querySelector('[data-image-upload-choose]');\r
      const imageUploadBtn = pageRoot.querySelector('.manage-image-upload-btn');\r
\r
      const newFolderBtn = pageRoot.querySelector('.manage-image-folder-btn');\r
      const newFolderOverlay = pageRoot.querySelector('[data-new-folder-overlay]');\r
      const newFolderCancel = pageRoot.querySelector('[data-new-folder-cancel]');\r
      const newFolderCreate = pageRoot.querySelector('[data-new-folder-create]');\r
      const newFolderInput = pageRoot.querySelector('[data-new-folder-input]');\r
\r
      const renameFolderBtn = pageRoot.querySelector('.manage-image-rename-btn');\r
      const documentPreviewOverlay = pageRoot.querySelector('[data-document-preview-overlay]');\r
      const documentPreviewClose = pageRoot.querySelector('[data-document-preview-close]');\r
      const documentPreviewTitle = pageRoot.querySelector('[data-document-preview-title]');\r
      const documentPreviewContent = pageRoot.querySelector('[data-document-preview-content]');\r
      const imagePreviewOverlay = pageRoot.querySelector('[data-image-preview-overlay]');\r
      const imagePreviewClose = pageRoot.querySelector('[data-image-preview-close]');\r
      const imagePreviewTitle = pageRoot.querySelector('[data-image-preview-title]');\r
      const imagePreviewStage = pageRoot.querySelector('[data-image-preview-stage]');\r
      const imagePreviewContent = pageRoot.querySelector('[data-image-preview-content]');\r
      const imagePreviewCount = pageRoot.querySelector('[data-image-preview-count]');\r
      const imagePreviewPrev = pageRoot.querySelector('[data-image-preview-prev]');\r
      const imagePreviewNext = pageRoot.querySelector('[data-image-preview-next]');\r
      const imagePreviewStrip = pageRoot.querySelector('[data-image-preview-strip]');\r
\r
      let currentFolderName = 'Product Photos';\r
      let currentFolderId = null;\r
      let folderTrail = [];\r
      let allFolderRows = [];\r
      let imageLoadRevision = 0;\r
      let imageOrderSaving = false;\r
      const childFolderList = document.createElement('div');\r
      childFolderList.className = 'image-folder-list-mode resource-child-folders';\r
      imageThumbGrid?.before(childFolderList);\r
      let saveStatusTimer = null;\r
      let hasManageChanges = false;\r
      const resourceEdits = window.createWincoResourceEdits();\r
      let resourceSavePending = false;\r
      let documentPreviewObjectUrl = null;\r
      let imageTileObjectUrls = [];\r
      let imageFolderPreviewObjectUrls = [];\r
      let previewIndex = 0;\r
      let touchStartX = 0;\r
\r
      function getRowCheckboxes() {\r
        return Array.from(pageRoot.querySelectorAll('.manage-select-cell .manage-checkbox'));\r
      }\r
\r
      function getDocumentRows() {\r
        return Array.from(pageRoot.querySelectorAll('[data-resource-pane="documents"] .orders-row'));\r
      }\r
\r
      function getImageTiles() {\r
        return Array.from(imageThumbGrid.querySelectorAll('.image-tile'));\r
      }\r
\r
      function getSelectedFolderCards() {\r
        return Array.from(pageRoot.querySelectorAll('.image-folder-list-mode .image-folder-card.is-selected'));\r
      }\r
\r
      function folderIsEmpty(card) {\r
        const id = card.dataset.resourceImageFolderId;\r
        const info = card.querySelector('.image-folder-info')?.textContent.trim().toLowerCase() || '';\r
        return info.startsWith('0 images') && !allFolderRows.some(row => row.parent_id === id);\r
      }\r
\r
      function imagesPaneIsActive() {\r
        const pane = pageRoot.querySelector('[data-resource-pane="images"]');\r
        return !!(pane && pane.classList.contains('is-active'));\r
      }\r
\r
      function imageDetailIsActive() {\r
        return !!(imageFolderDetail && imageFolderDetail.classList.contains('is-active'));\r
      }\r
\r
      function updateManageDeleteState() {\r
        if (!manageDeleteBtn) return;\r
        manageDeleteBtn.disabled = fileMutationPending || resourceSavePending || imageOrderSaving;\r
        const hasCheckedRows = getRowCheckboxes().some(function (checkbox) {\r
          return checkbox.checked;\r
        });\r
        const hasSelectedImages = getImageTiles().some(function (tile) {\r
          return tile.classList.contains('is-selected');\r
        });\r
        const hasSelectedFolders = getSelectedFolderCards().length > 0;\r
        manageDeleteBtn.classList.toggle('is-enabled', hasCheckedRows || hasSelectedImages || hasSelectedFolders);\r
      }\r
\r
      function updateManageSaveState() {\r
        if (!manageSaveBtn) return;\r
        const enabled = !fileMutationPending && !imageOrderSaving && (hasManageChanges || resourceEdits.size > 0) && !resourceSavePending;\r
        manageSaveBtn.classList.toggle('is-enabled', enabled);\r
        manageSaveBtn.disabled = !enabled;\r
        if (manageToggle) manageToggle.disabled = resourceSavePending || fileMutationPending || imageOrderSaving;\r
        pageRoot.querySelectorAll('.resource-name-input, .manage-access-select').forEach(input => {\r
          input.disabled = resourceSavePending;\r
          if (input.classList.contains('resource-name-input')) input.readOnly = !canManageImages();\r
        });\r
      }\r
\r
      function addResourceNameEditor(container, table, row, field, label) {\r
        container.classList.add('resource-name-field');\r
        const text = document.createElement('span');\r
        text.className = 'resource-name-text';\r
        text.textContent = row[field] || '';\r
        const input = document.createElement('input');\r
        input.className = 'resource-name-input';\r
        input.type = 'text'; input.maxLength = 255;\r
        input.setAttribute('aria-label', label);\r
        input.value = resourceEdits.value(table, row, field);\r
        input.readOnly = !canManageImages();\r
        input.disabled = resourceSavePending;\r
        input.addEventListener('click', event => event.stopPropagation());\r
        input.addEventListener('input', () => {\r
          if (!canManageImages() || resourceSavePending) return;\r
          resourceEdits.stage(table, row, field, input.value);\r
          updateManageSaveState();\r
        });\r
        container.replaceChildren(text, input);\r
        return input;\r
      }\r
\r
      async function refreshManagedResources() {\r
        const documents = await loadResourceDocuments();\r
        const folders = await loadResourceImageFolders();\r
        const images = currentFolderId ? await loadResourceImagesForCurrentFolder() : true;\r
        return documents !== false && folders !== false && images !== false;\r
      }\r
\r
      async function saveManagedResources() {\r
        if (!canManageImages() || resourceSavePending || fileMutationPending || imageOrderSaving) return false;\r
        resourceSavePending = true;\r
        let saved = false;\r
        updateManageSaveState();\r
        try {\r
          await resourceEdits.save(window.wincoResourcesSupabase);\r
          saved = true;\r
          resetManageChanged();\r
          if (await refreshManagedResources() === false) throw new Error('Changes were saved, but the list could not refresh. Refresh Resources to check them.');\r
          showSaveStatus();\r
          return true;\r
        } catch (error) {\r
          // Reload acknowledged rows while retaining the unsaved draft values.\r
          if (!saved) await refreshManagedResources();\r
          window.alert(error.message || 'Unable to save changes. Please try again.');\r
          return false;\r
        } finally {\r
          resourceSavePending = false;\r
          updateManageSaveState();\r
          updateManageDeleteState();\r
        }\r
      }\r
\r
      function markManageChanged() {\r
        hasManageChanges = true;\r
        updateManageSaveState();\r
      }\r
\r
      function resetManageChanged() {\r
        hasManageChanges = false;\r
        updateManageSaveState();\r
      }\r
\r
      function syncSelectAllState() {\r
        if (!selectAllCheckbox) return;\r
        const rowCheckboxes = getRowCheckboxes();\r
        const total = rowCheckboxes.length;\r
        const checkedCount = rowCheckboxes.filter(function (checkbox) {\r
          return checkbox.checked;\r
        }).length;\r
        selectAllCheckbox.checked = total > 0 && checkedCount === total;\r
        selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < total;\r
      }\r
\r
      function updateImageSelectionCount() {\r
        if (!imageSelectionCount) return;\r
        const selectedCount = getImageTiles().filter(function (tile) {\r
          return tile.classList.contains('is-selected');\r
        }).length;\r
        imageSelectionCount.textContent = selectedCount + ' selected';\r
        imageSelectionCount.classList.toggle('is-visible', selectedCount > 0);\r
      }\r
\r
      function updateFolderSelectionCount() {\r
        if (!folderSelectionCount) return;\r
        const selectedCount = getSelectedFolderCards().length;\r
        folderSelectionCount.textContent = selectedCount + ' selected';\r
        folderSelectionCount.classList.toggle('is-visible', selectedCount > 0);\r
      }\r
\r
      function clearAllSelections() {\r
        getRowCheckboxes().forEach(function (checkbox) {\r
          checkbox.checked = false;\r
        });\r
        if (selectAllCheckbox) {\r
          selectAllCheckbox.checked = false;\r
          selectAllCheckbox.indeterminate = false;\r
        }\r
        updateManageDeleteState();\r
      }\r
\r
      function clearImageSelections() {\r
        getImageTiles().forEach(function (tile) {\r
          tile.classList.remove('is-selected');\r
        });\r
        pageRoot.querySelectorAll('.image-folder-list-mode .image-folder-card.is-selected').forEach(function (card) {\r
          card.classList.remove('is-selected');\r
        });\r
        updateImageSelectionCount();\r
        updateFolderSelectionCount();\r
        updateManageDeleteState();\r
      }\r
\r
      function showSaveStatus() {\r
        if (!manageSaveStatus) return;\r
        manageSaveStatus.classList.add('is-visible');\r
        window.clearTimeout(saveStatusTimer);\r
        saveStatusTimer = window.setTimeout(function () {\r
          manageSaveStatus.classList.remove('is-visible');\r
        }, 1400);\r
      }\r
\r
      function closeDeleteConfirm() {\r
        if (!deleteConfirmOverlay) return;\r
        deleteConfirmOverlay.classList.remove('is-open');\r
        if (deleteConfirmTitle) deleteConfirmTitle.textContent = 'Delete selected files?';\r
        if (deleteConfirmText) deleteConfirmText.textContent = 'This action will remove the selected resource items from the current list.';\r
      }\r
\r
      function setDocumentUploadStatus(message, isError) {\r
        if (!documentUploadStatus) return;\r
        documentUploadStatus.textContent = message || '';\r
        documentUploadStatus.classList.toggle('is-error', !!isError);\r
      }\r
\r
      function closeDocumentUpload() {\r
        if (fileMutationPending) return;\r
        if (documentUploadOverlay) documentUploadOverlay.classList.remove('is-open');\r
        if (documentTitleInput) documentTitleInput.value = '';\r
        if (documentFileInput) documentFileInput.value = '';\r
        if (documentRevisionInput) documentRevisionInput.value = '';\r
        if (documentAccessSelect) documentAccessSelect.value = 'Public';\r
        if (documentIsNewInput) documentIsNewInput.checked = false;\r
        setDocumentUploadStatus('', false);\r
        if (documentUploadSubmit) {\r
          documentUploadSubmit.disabled = false;\r
          documentUploadSubmit.textContent = 'Upload';\r
        }\r
      }\r
\r
      function formatDocumentDate(value) {\r
        if (!value) return '-';\r
        const date = new Date(value);\r
        if (Number.isNaN(date.getTime())) return '-';\r
        const year = date.getFullYear();\r
        const month = String(date.getMonth() + 1).padStart(2, '0');\r
        const day = String(date.getDate()).padStart(2, '0');\r
        return year + '-' + month + '-' + day;\r
      }\r
\r
      function getDocumentFileType(fileName, mimeType) {\r
        const name = String(fileName || '').toLowerCase();\r
        const mime = String(mimeType || '').toLowerCase();\r
        if (mime === 'application/pdf' || name.endsWith('.pdf')) return 'PDF';\r
        if (\r
          mime.indexOf('spreadsheet') >= 0 ||\r
          mime.indexOf('excel') >= 0 ||\r
          name.endsWith('.xlsx') ||\r
          name.endsWith('.xls')\r
        ) return 'Excel';\r
        const parts = String(fileName || '').split('.');\r
        return parts.length > 1 ? parts.pop().toUpperCase() : 'File';\r
      }\r
\r
      function createDocumentRow(documentRow) {\r
        const row = document.createElement('div');\r
        row.className = 'orders-row' + (documentRow.is_new ? ' is-new' : '');\r
        row.setAttribute('draggable', 'false');\r
        row.dataset.resourceDocumentId = documentRow.id || '';\r
        row.dataset.resourceFilePath = documentRow.file_path || '';\r
\r
        const selectCell = document.createElement('div');\r
        selectCell.className = 'orders-cell manage-select-cell';\r
        const checkbox = document.createElement('input');\r
        checkbox.className = 'manage-checkbox';\r
        checkbox.type = 'checkbox';\r
        checkbox.setAttribute('aria-label', 'Select ' + (documentRow.title || 'document'));\r
        selectCell.appendChild(checkbox);\r
\r
        const titleCell = document.createElement('div');\r
        titleCell.className = 'orders-cell';\r
        const titleWrap = document.createElement('span');\r
        titleWrap.className = 'orders-order-id';\r
        if (documentRow.is_new) {\r
          const badge = document.createElement('span');\r
          badge.className = 'orders-new-badge';\r
          badge.textContent = 'NEW';\r
          titleWrap.appendChild(badge);\r
        }\r
        const titleText = document.createElement('span');\r
        titleText.className = 'orders-order-text';\r
        addResourceNameEditor(titleText, 'resource_documents', documentRow, 'title', 'Document name');\r
        titleWrap.appendChild(titleText);\r
        titleCell.appendChild(titleWrap);\r
\r
        const fileCell = document.createElement('div');\r
        fileCell.className = 'orders-cell';\r
        fileCell.textContent = documentRow.file_type || 'File';\r
\r
        const revisionCell = document.createElement('div');\r
        revisionCell.className = 'orders-cell';\r
        revisionCell.textContent = documentRow.revision ? 'Rev. ' + documentRow.revision : '-';\r
\r
        const updatedCell = document.createElement('div');\r
        updatedCell.className = 'orders-cell';\r
        updatedCell.textContent = formatDocumentDate(documentRow.updated_at);\r
\r
        const accessCell = document.createElement('div');\r
        accessCell.className = 'orders-cell manage-access-cell';\r
        const accessSelect = document.createElement('select');\r
        accessSelect.className = 'manage-access-select';\r
        accessSelect.setAttribute('aria-label', 'Access for ' + (documentRow.title || 'document'));\r
        ['Public', 'Dealer', 'Winco Only'].forEach(function (optionValue) {\r
          const option = document.createElement('option');\r
          option.value = optionValue;\r
          option.textContent = optionValue;\r
          option.selected = optionValue === documentRow.access;\r
          accessSelect.appendChild(option);\r
        });\r
        accessCell.appendChild(accessSelect);\r
        accessSelect.value = resourceEdits.value('resource_documents', documentRow, 'access');\r
        accessSelect.addEventListener('change', () => {\r
          if (!canManageImages() || resourceSavePending) return;\r
          resourceEdits.stage('resource_documents', documentRow, 'access', accessSelect.value);\r
          updateManageSaveState();\r
        });\r
\r
        const downloadCell = document.createElement('div');\r
        downloadCell.className = 'orders-cell resource-download-cell';\r
        const downloadButton = document.createElement('button');\r
        downloadButton.className = 'resource-download-btn';\r
        downloadButton.type = 'button';\r
        downloadButton.setAttribute('aria-label', 'Download ' + (documentRow.title || 'document'));\r
        downloadButton.textContent = '↓';\r
        downloadButton.addEventListener('click', async function () {\r
          const resourceSupabase = window.wincoResourcesSupabase;\r
          if (!resourceSupabase || !documentRow.file_path) return;\r
          downloadButton.disabled = true;\r
          try {\r
            const result = await resourceSupabase.storage\r
              .from('resource-documents')\r
              .download(documentRow.file_path);\r
            if (result.error) throw result.error;\r
\r
            const objectUrl = URL.createObjectURL(result.data);\r
            const anchor = document.createElement('a');\r
            anchor.href = objectUrl;\r
            anchor.download = documentRow.file_name || documentRow.title || 'document';\r
            document.body.appendChild(anchor);\r
            anchor.click();\r
            anchor.remove();\r
            URL.revokeObjectURL(objectUrl);\r
          } catch (error) {\r
            console.error('Document download error:', error);\r
            window.alert('Unable to download this document.');\r
          } finally {\r
            downloadButton.disabled = false;\r
          }\r
        });\r
        downloadCell.appendChild(downloadButton);\r
\r
        row.appendChild(selectCell);\r
        row.appendChild(titleCell);\r
        row.appendChild(fileCell);\r
        row.appendChild(revisionCell);\r
        row.appendChild(updatedCell);\r
        row.appendChild(accessCell);\r
        row.appendChild(downloadCell);\r
\r
        if ((documentRow.file_type || '').toUpperCase() === 'PDF') {\r
          row.addEventListener('click', function (event) {\r
            if (canManageImages()) return;\r
            if (event.target.closest('input, select, button, a')) return;\r
            openDocumentPreview(documentRow);\r
          });\r
        }\r
\r
        return row;\r
      }\r
\r
      async function loadResourceDocuments() {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        if (disposed || !resourceSupabase || !resourceDocumentsList) return;\r
        const loadRevision = ++documentLoadRevision;\r
\r
        const result = await resourceSupabase\r
          .from('resource_documents')\r
          .select('id, title, file_name, file_path, file_type, revision, access, is_new, sort_order, created_at, updated_at')\r
          .order('sort_order', { ascending: true, nullsFirst: false })\r
          .order('created_at', { ascending: true });\r
\r
        if (result.error) {\r
          console.error('Resource documents load error:', result.error);\r
          return false;\r
        }\r
\r
        if (disposed || loadRevision !== documentLoadRevision) return;\r
        resourceDocumentsList.innerHTML = '';\r
        (result.data || []).forEach(function (documentRow) {\r
          resourceDocumentsList.appendChild(createDocumentRow(documentRow));\r
        });\r
\r
        syncSelectAllState();\r
        updateManageDeleteState();\r
        return true;\r
      }\r
\r
      async function uploadResourceDocument() {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        const resourceUser = window.currentWincoResourcesUser || {};\r
        const isActive = () => !disposed && !!resourceUser.id && window.currentWincoResourcesUser?.id === resourceUser.id;\r
        const title = documentTitleInput ? documentTitleInput.value.trim() : '';\r
        const file = documentFileInput && documentFileInput.files ? documentFileInput.files[0] : null;\r
        const revision = documentRevisionInput ? documentRevisionInput.value.trim() : '';\r
        const access = documentAccessSelect ? documentAccessSelect.value : 'Public';\r
        const isNew = !!(documentIsNewInput && documentIsNewInput.checked);\r
\r
        if (!isActive() || fileMutationPending || !['Admin','Sales'].includes(resourceUser.role)) return;\r
        if (!resourceSupabase) {\r
          setDocumentUploadStatus('Supabase connection is unavailable.', true);\r
          return;\r
        }\r
        if (!title) {\r
          setDocumentUploadStatus('Enter a Document Title.', true);\r
          if (documentTitleInput) documentTitleInput.focus();\r
          return;\r
        }\r
        if (!file) {\r
          setDocumentUploadStatus('Choose a file to upload.', true);\r
          return;\r
        }\r
\r
        if (documentUploadSubmit) {\r
          documentUploadSubmit.disabled = true;\r
          documentUploadSubmit.textContent = 'Uploading...';\r
        }\r
        setDocumentUploadStatus('', false);\r
\r
        fileMutationPending = true;\r
        updateManageSaveState(); updateManageDeleteState();\r
        try {\r
          await uploadFile(resourceSupabase, {kind:'documents',file,isActive,accountId:resourceUser.id,\r
            isCurrentAccount:() => window.currentWincoResourcesUser?.id === resourceUser.id,fields:{\r
            title, file_type:getDocumentFileType(file.name,file.type), revision:revision || null,\r
            access, is_new:isNew, uploaded_by:resourceUser.account_name || resourceUser.username || null,\r
          }});\r
          if (!isActive()) return;\r
          const refreshed = await loadResourceDocuments();\r
          if (!isActive()) return;\r
          if (refreshed === false) throw new Error('The file was saved, but the list could not refresh. Keep the selected file and retry.');\r
          fileMutationPending = false;\r
          closeDocumentUpload();\r
        } catch (error) {\r
          if (!isActive()) return;\r
          console.error('Document upload error:', error);\r
          setDocumentUploadStatus(\r
            error && error.message ? error.message : 'Upload failed.',\r
            true\r
          );\r
          if (documentUploadSubmit) {\r
            documentUploadSubmit.disabled = false;\r
            documentUploadSubmit.textContent = 'Upload';\r
          }\r
        } finally { fileMutationPending = false; if (isActive()) { updateManageSaveState(); updateManageDeleteState(); } }\r
      }\r
\r
      function closeImageUpload() {\r
        if (fileMutationPending) return;\r
        if (imageUploadOverlay) imageUploadOverlay.classList.remove('is-open');\r
        if (imageUploadInput) imageUploadInput.value = '';\r
        if (imageUploadChoose) imageUploadChoose.textContent = 'Choose Files';\r
        retryImageFiles = [];\r
      }\r
\r
      async function uploadResourceImages(files) {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        const resourceUser = window.currentWincoResourcesUser || {};\r
        const isActive = () => !disposed && !!resourceUser.id && window.currentWincoResourcesUser?.id === resourceUser.id;\r
        const folderId = currentFolderId;\r
        const imageFiles = Array.from(files || []).filter(file => String(file.type || '').startsWith('image/'));\r
        if (!isActive() || !resourceSupabase || !folderId || !imageFiles.length || !canManageImages() || fileMutationPending) return;\r
        retryImageFiles = imageFiles;\r
        let listRefreshAttempted = false;\r
        fileMutationPending = true;\r
        updateManageSaveState(); updateManageDeleteState();\r
        if (imageUploadChoose) imageUploadChoose.disabled = true;\r
        try {\r
          for (const file of imageFiles) {\r
            if (!isActive()) return;\r
            await uploadFile(resourceSupabase, {kind:'images',file,folderId,isActive,accountId:resourceUser.id,\r
              isCurrentAccount:() => window.currentWincoResourcesUser?.id === resourceUser.id,fields:{\r
              file_type:file.type || null, uploaded_by:resourceUser.account_name || resourceUser.username || null,\r
            }});\r
          }\r
          if (!isActive()) return;\r
          listRefreshAttempted = true;\r
          const foldersRefreshed = await loadResourceImageFolders();\r
          if (!isActive()) return;\r
          const imagesRefreshed = currentFolderId === folderId ? await loadResourceImagesForCurrentFolder() : true;\r
          if (!isActive()) return;\r
          if (foldersRefreshed === false || imagesRefreshed === false) {\r
            throw new Error('The files were saved, but the list could not refresh. Retry to update the list.');\r
          }\r
          fileMutationPending = false;\r
          closeImageUpload();\r
        } catch (error) {\r
          if (!isActive()) return;\r
          console.error('Resource image upload error:', error);\r
          if (imageUploadChoose) imageUploadChoose.textContent = 'Retry';\r
          window.alert(error.message || 'Unable to upload the selected image.');\r
        } finally {\r
          fileMutationPending = false;\r
          if (isActive()) {\r
            if (imageUploadChoose) imageUploadChoose.disabled = false;\r
            if (!listRefreshAttempted) {\r
              await loadResourceImageFolders();\r
              if (isActive() && currentFolderId === folderId) await loadResourceImagesForCurrentFolder();\r
            }\r
            if (isActive()) { updateManageSaveState(); updateManageDeleteState(); }\r
          }\r
        }\r
      }\r
\r
      function closeNewFolder() {\r
        if (fileMutationPending) return;\r
        if (newFolderOverlay) newFolderOverlay.classList.remove('is-open');\r
        if (newFolderInput) newFolderInput.value = '';\r
        newFolderAttempt = null;\r
        if (newFolderCreate) newFolderCreate.textContent = 'Create';\r
      }\r
\r
      async function openDocumentPreview(documentRow) {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        if (disposed || !resourceSupabase || !documentRow || !documentRow.file_path) return;\r
        const previewRevision = ++documentPreviewRevision;\r
\r
        if (documentPreviewTitle) documentPreviewTitle.textContent = documentRow.title || 'PDF Preview';\r
        if (documentPreviewContent) documentPreviewContent.textContent = 'Loading PDF...';\r
        if (documentPreviewOverlay) documentPreviewOverlay.classList.add('is-open');\r
\r
        try {\r
          const result = await resourceSupabase.storage\r
            .from('resource-documents')\r
            .download(documentRow.file_path);\r
          if (result.error) throw result.error;\r
          if (disposed || previewRevision !== documentPreviewRevision) return;\r
\r
          if (documentPreviewObjectUrl) {\r
            URL.revokeObjectURL(documentPreviewObjectUrl);\r
          }\r
          documentPreviewObjectUrl = URL.createObjectURL(result.data);\r
\r
          if (documentPreviewContent) {\r
            documentPreviewContent.innerHTML = '';\r
            const frame = document.createElement('iframe');\r
            frame.src = documentPreviewObjectUrl;\r
            frame.title = documentRow.title || 'PDF Preview';\r
            frame.style.width = '100%';\r
            frame.style.height = '100%';\r
            frame.style.border = '0';\r
            frame.style.display = 'block';\r
            documentPreviewContent.style.width = '100%';\r
            documentPreviewContent.style.height = '100%';\r
            documentPreviewContent.appendChild(frame);\r
          }\r
        } catch (error) {\r
          console.error('Document preview error:', error);\r
          if (!disposed && previewRevision === documentPreviewRevision && documentPreviewContent) documentPreviewContent.textContent = 'Unable to preview this PDF.';\r
        }\r
      }\r
\r
      function closeDocumentPreview() {\r
        documentPreviewRevision++;\r
        if (documentPreviewOverlay) documentPreviewOverlay.classList.remove('is-open');\r
        if (documentPreviewObjectUrl) {\r
          URL.revokeObjectURL(documentPreviewObjectUrl);\r
          documentPreviewObjectUrl = null;\r
        }\r
        if (documentPreviewTitle) documentPreviewTitle.textContent = 'PDF Preview';\r
        if (documentPreviewContent) {\r
          documentPreviewContent.innerHTML = '';\r
          documentPreviewContent.textContent = 'PDF Preview';\r
          documentPreviewContent.style.width = '';\r
          documentPreviewContent.style.height = '';\r
        }\r
      }\r
\r
      function getPreviewTiles() {\r
        return getImageTiles();\r
      }\r
\r
      function renderImagePreview() {\r
        const tiles = getPreviewTiles();\r
        if (!tiles.length) return;\r
        const safeIndex = Math.max(0, Math.min(previewIndex, tiles.length - 1));\r
        previewIndex = safeIndex;\r
        const activeTile = tiles[safeIndex];\r
        const activeImage = activeTile.querySelector('img');\r
        const labelText = activeTile.dataset.resourceImageFileName || (activeImage ? activeImage.alt : '') || 'Image Preview';\r
\r
        if (imagePreviewTitle) imagePreviewTitle.textContent = labelText;\r
        if (imagePreviewContent) {\r
          imagePreviewContent.innerHTML = '';\r
          if (activeImage && activeImage.src) {\r
            const previewImage = document.createElement('img');\r
            previewImage.src = activeImage.src;\r
            previewImage.alt = labelText;\r
            previewImage.style.maxWidth = '100%';\r
            previewImage.style.maxHeight = '100%';\r
            previewImage.style.objectFit = 'contain';\r
            previewImage.style.display = 'block';\r
            imagePreviewContent.appendChild(previewImage);\r
          }\r
        }\r
        if (imagePreviewCount) imagePreviewCount.textContent = (safeIndex + 1) + ' / ' + tiles.length;\r
\r
        if (imagePreviewStrip) {\r
          imagePreviewStrip.innerHTML = '';\r
          tiles.forEach(function (tile, index) {\r
            const thumb = document.createElement('button');\r
            thumb.type = 'button';\r
            thumb.className = 'image-preview-thumb' + (index === safeIndex ? ' is-active' : '');\r
            thumb.setAttribute('data-image-preview-thumb', String(index));\r
\r
            const tileImage = tile.querySelector('img');\r
            if (tileImage && tileImage.src) {\r
              const thumbImage = document.createElement('img');\r
              thumbImage.src = tileImage.src;\r
              thumbImage.alt = tile.dataset.resourceImageFileName || tileImage.alt || 'Image';\r
              thumbImage.style.width = '100%';\r
              thumbImage.style.height = '100%';\r
              thumbImage.style.objectFit = 'cover';\r
              thumbImage.style.display = 'block';\r
              thumb.appendChild(thumbImage);\r
            } else {\r
              thumb.textContent = String(index + 1);\r
            }\r
\r
            thumb.addEventListener('click', function () {\r
              openImagePreviewByIndex(index);\r
            });\r
            imagePreviewStrip.appendChild(thumb);\r
          });\r
        }\r
      }\r
\r
      function openImagePreviewByIndex(index) {\r
        previewIndex = index;\r
        renderImagePreview();\r
        if (imagePreviewOverlay) imagePreviewOverlay.classList.add('is-open');\r
      }\r
\r
      function moveImagePreview(step) {\r
        const tiles = getPreviewTiles();\r
        if (!tiles.length) return;\r
        previewIndex = Math.max(0, Math.min(previewIndex + step, tiles.length - 1));\r
        renderImagePreview();\r
      }\r
\r
      function openImagePreviewByTile(tile) {\r
        const tiles = getPreviewTiles();\r
        const matchIndex = tiles.indexOf(tile);\r
        openImagePreviewByIndex(matchIndex >= 0 ? matchIndex : 0);\r
      }\r
\r
      function closeImagePreview() {\r
        if (imagePreviewOverlay) imagePreviewOverlay.classList.remove('is-open');\r
      }\r
\r
      async function deleteSelectedResourceDocuments() {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        const deleteAccountId = window.currentWincoResourcesUser?.id;\r
        const isActive = () => !disposed && !!deleteAccountId && window.currentWincoResourcesUser?.id === deleteAccountId;\r
        if (!isActive() || !resourceSupabase || !canManageImages()) return false;\r
\r
        const selectedRows = getRowCheckboxes()\r
          .filter(function (checkbox) { return checkbox.checked; })\r
          .map(function (checkbox) { return checkbox.closest('.orders-row'); })\r
          .filter(function (row) { return row && row.dataset.resourceDocumentId; });\r
\r
        if (!selectedRows.length) return false;\r
\r
        const ids = selectedRows.map(function (row) { return row.dataset.resourceDocumentId; });\r
        try {\r
          const result = await resourceFiles.deleteResourceItems(resourceSupabase, 'documents', ids, isActive);\r
          if (!isActive()) return false;\r
          if (!result.cleanupComplete) window.alert('Removed from the list. File cleanup will retry next time you open Resources.');\r
          selectedRows.forEach(function (row) { row.remove(); });\r
          resourceEdits.remove('resource_documents', ids);\r
          updateManageSaveState();\r
          const refreshed = await loadResourceDocuments();\r
          if (!isActive()) return false;\r
          if (refreshed === false) window.alert('Items were removed, but the list could not refresh. Refresh Resources to check the list.');\r
          clearAllSelections();\r
          syncSelectAllState();\r
          updateManageDeleteState();\r
          return true;\r
        } catch (error) {\r
          if (!isActive()) return false;\r
          console.error('Resource documents delete error:', error);\r
          window.alert(error.message || 'Unable to delete the selected document.');\r
          return false;\r
        }\r
      }\r
\r
      async function deleteSelectedResourceImages() {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        const deleteAccountId = window.currentWincoResourcesUser?.id;\r
        const isActive = () => !disposed && !!deleteAccountId && window.currentWincoResourcesUser?.id === deleteAccountId;\r
        if (!isActive() || !resourceSupabase || !canManageImages()) return false;\r
\r
        const selectedTiles = getImageTiles().filter(function (tile) {\r
          return tile.classList.contains('is-selected') && tile.dataset.resourceImageId;\r
        });\r
\r
        if (!selectedTiles.length) return false;\r
\r
        const imageIds = selectedTiles\r
          .map(function (tile) { return tile.dataset.resourceImageId || ''; })\r
          .filter(Boolean);\r
        try {\r
          const result = await resourceFiles.deleteResourceItems(resourceSupabase, 'images', imageIds, isActive);\r
          if (!isActive()) return false;\r
          if (!result.cleanupComplete) window.alert('Removed from the list. File cleanup will retry next time you open Resources.');\r
          selectedTiles.forEach(function (tile) { tile.remove(); });\r
          resourceEdits.remove('resource_images', imageIds);\r
          updateManageSaveState();\r
          const images = await loadResourceImagesForCurrentFolder();\r
          if (!isActive()) return false;\r
          const folders = await loadResourceImageFolders();\r
          if (!isActive()) return false;\r
          if (images === false || folders === false) window.alert('Items were removed, but the list could not refresh. Refresh Resources to check the list.');\r
          clearImageSelections();\r
          updateManageDeleteState();\r
          return true;\r
        } catch (error) {\r
          if (!isActive()) return false;\r
          console.error('Resource image delete error:', error);\r
          window.alert(error.message || 'Unable to delete the selected image.');\r
          return false;\r
        }\r
      }\r
\r
      async function deleteSelectedEmptyFolders() {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        const deleteAccountId = window.currentWincoResourcesUser?.id;\r
        const isActive = () => !disposed && !!deleteAccountId && window.currentWincoResourcesUser?.id === deleteAccountId;\r
        if (!isActive() || !resourceSupabase || !canManageImages()) return false;\r
\r
        const selectedFolders = getSelectedFolderCards();\r
        const emptyFolders = selectedFolders.filter(folderIsEmpty);\r
\r
        const folderIds = emptyFolders\r
          .map(function (card) { return card.dataset.resourceImageFolderId || ''; })\r
          .filter(Boolean);\r
\r
        if (!folderIds.length) return false;\r
\r
        try {\r
          const result = await resourceFiles.deleteResourceItems(resourceSupabase, 'folders', folderIds, isActive);\r
          if (!isActive()) return false;\r
          if (!result.cleanupComplete) window.alert('Removed from the list. File cleanup will retry next time you open Resources.');\r
          emptyFolders.forEach(function (card) { card.remove(); });\r
          resourceEdits.remove('resource_image_folders', folderIds);\r
          updateManageSaveState();\r
          const refreshed = await loadResourceImageFolders();\r
          if (!isActive()) return false;\r
          if (refreshed === false) window.alert('Items were removed, but the list could not refresh. Refresh Resources to check the list.');\r
          clearImageSelections();\r
          updateManageDeleteState();\r
          return true;\r
        } catch (error) {\r
          if (!isActive()) return false;\r
          console.error('Resource image folder delete error:', error);\r
          window.alert(error.message || 'Unable to delete the selected folder.');\r
          return false;\r
        }\r
      }\r
\r
\r
      function setActiveResourcePane(targetPane) {\r
        resourceTabs.forEach(function (tab) {\r
          tab.classList.toggle('is-active', tab.dataset.resourceTab === targetPane);\r
        });\r
        resourcePanes.forEach(function (pane) {\r
          pane.classList.toggle('is-active', pane.dataset.resourcePane === targetPane);\r
        });\r
        if (documentsUploadBtn) {\r
          documentsUploadBtn.style.display = targetPane === 'documents' ? 'inline-flex' : 'none';\r
        }\r
        if (targetPane !== 'images') {\r
          closeImageFolder();\r
        }\r
      }\r
\r
      function openImageFolder(folderName, folderId) {\r
        if (disposed || !folderId || folderId === currentFolderId) return;\r
        if (currentFolderId) folderTrail.push({ id: currentFolderId, name: currentFolderName });\r
        currentFolderName = folderName;\r
        imageLoadRevision++; folderLoadRevision++;\r
        clearImageTileObjectUrls(); imageThumbGrid.replaceChildren();\r
        clearImageFolderPreviewObjectUrls(); childFolderList.replaceChildren();\r
        currentFolderId = folderId || null;\r
        if (imageFolderDetailTitle) imageFolderDetailTitle.textContent = folderName;\r
        if (imageFolderList) imageFolderList.style.display = 'none';\r
        if (imageFolderDetail) imageFolderDetail.classList.add('is-active');\r
        clearImageSelections();\r
        loadResourceImagesForCurrentFolder();\r
        loadResourceImageFolders();\r
      }\r
\r
      function closeImageFolder() {\r
        imageLoadRevision += 1; folderLoadRevision++;\r
        clearImageTileObjectUrls(); imageThumbGrid.replaceChildren();\r
        clearImageFolderPreviewObjectUrls(); childFolderList.replaceChildren(); imageFolderList.replaceChildren();\r
        currentFolderId = null;\r
        folderTrail = [];\r
        if (imageFolderList) imageFolderList.style.display = 'grid';\r
        if (imageFolderDetail) imageFolderDetail.classList.remove('is-active');\r
        clearImageSelections();\r
        loadResourceImageFolders();\r
      }\r
\r
      function createImageFolderCard(folderRow) {\r
        const card = document.createElement('div');\r
        card.className = 'image-folder-card';\r
        card.dataset.folderOpen = folderRow.name || 'Folder';\r
        card.dataset.resourceImageFolderId = folderRow.id || '';\r
\r
        const thumb = document.createElement('div');\r
        thumb.className = 'image-folder-thumb';\r
        for (let index = 0; index < 8; index += 1) {\r
          const mini = document.createElement('div');\r
          mini.className = 'image-folder-mini';\r
          thumb.appendChild(mini);\r
        }\r
\r
        const meta = document.createElement('div');\r
        meta.className = 'image-folder-meta';\r
        const name = document.createElement('div');\r
        name.className = 'image-folder-name';\r
        addResourceNameEditor(name, 'resource_image_folders', folderRow, 'name', 'Folder name');\r
        const info = document.createElement('div');\r
        info.className = 'image-folder-info';\r
        info.textContent = String(folderRow.image_count || 0) + ' images';\r
        meta.appendChild(name);\r
        meta.appendChild(info);\r
\r
        card.appendChild(thumb);\r
        card.appendChild(meta);\r
        const selectButton = document.createElement('button');\r
        selectButton.type = 'button';\r
        selectButton.className = 'resource-folder-select';\r
        selectButton.textContent = 'Select';\r
        selectButton.addEventListener('click', function(event) {\r
          event.stopPropagation();\r
          if (!canManageImages()) return;\r
          card.classList.toggle('is-selected');\r
          selectButton.textContent = card.classList.contains('is-selected') ? 'Selected' : 'Select';\r
          updateFolderSelectionCount();\r
          updateManageDeleteState();\r
        });\r
        card.appendChild(selectButton);\r
        bindImageFolderCard(card);\r
        return card;\r
      }\r
\r
      function clearImageTileObjectUrls() {\r
        imageTileObjectUrls.forEach(function (objectUrl) {\r
          URL.revokeObjectURL(objectUrl);\r
        });\r
        imageTileObjectUrls = [];\r
      }\r
\r
      async function loadResourceImagesForCurrentFolder() {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        if (disposed || !resourceSupabase || !imageThumbGrid || !currentFolderId) return;\r
        const loadRevision = ++imageLoadRevision;\r
\r
        const result = await resourceSupabase\r
          .from('resource_images')\r
          .select('id, folder_id, file_name, file_path, file_type, sort_order, created_at')\r
          .eq('folder_id', currentFolderId)\r
          .order('sort_order', { ascending: true, nullsFirst: false })\r
          .order('created_at', { ascending: true });\r
\r
        if (result.error) {\r
          console.error('Resource images load error:', result.error);\r
          return false;\r
        }\r
        if (disposed || loadRevision !== imageLoadRevision) return;\r
\r
        clearImageTileObjectUrls();\r
        imageThumbGrid.innerHTML = '';\r
\r
        for (let index = 0; index < (result.data || []).length; index += 1) {\r
          const imageRow = result.data[index];\r
          const downloadResult = await resourceSupabase.storage\r
            .from('resource-images')\r
            .download(imageRow.file_path);\r
          if (disposed || loadRevision !== imageLoadRevision) return;\r
\r
          let objectUrl = null;\r
          if (!downloadResult.error) {\r
            objectUrl = URL.createObjectURL(downloadResult.data);\r
            imageTileObjectUrls.push(objectUrl);\r
          }\r
\r
          const tile = document.createElement('div');\r
          tile.className = 'image-tile';\r
          tile.setAttribute('draggable', 'false');\r
          tile.dataset.resourceImageId = imageRow.id || '';\r
          tile.dataset.resourceImageFilePath = imageRow.file_path || '';\r
          tile.dataset.resourceImageFileName = imageRow.file_name || '';\r
\r
          if (objectUrl) {\r
            const image = document.createElement('img');\r
            image.src = objectUrl; image.alt = imageRow.file_name || 'Image';\r
            image.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';\r
            tile.appendChild(image);\r
          } else {\r
            const unavailable = document.createElement('span');\r
            unavailable.textContent = 'Preview unavailable';\r
            tile.appendChild(unavailable);\r
          }\r
          bindImageNameAndOrder(tile, imageRow);\r
          imageThumbGrid.appendChild(tile);\r
        }\r
\r
        updateImageSelectionCount();\r
        updateManageDeleteState();\r
        return true;\r
      }\r
\r
      function canManageImages() {\r
        return !disposed && ['Admin', 'Sales'].includes(window.currentWincoResourcesUser?.role) && ordersShell?.classList.contains('is-manage-mode');\r
      }\r
\r
      async function saveImageOrder() {\r
        if (!canManageImages() || imageOrderSaving || fileMutationPending || resourceSavePending) return;\r
        imageOrderSaving = true;\r
        updateManageSaveState(); updateManageDeleteState();\r
        const folderId = currentFolderId;\r
        const ids = getImageTiles().map(tile => tile.dataset.resourceImageId).filter(Boolean);\r
        try {\r
          const {error} = await resourceSupabaseClient.rpc('reorder_resource_images', {p_folder_id:folderId,p_image_ids:ids});\r
          if (error) throw error;\r
        } catch {\r
          if (!disposed) {\r
            window.alert('Unable to save image order. The previous order will be restored.');\r
            if (currentFolderId === folderId) await loadResourceImagesForCurrentFolder();\r
          }\r
        } finally { imageOrderSaving = false; updateManageSaveState(); updateManageDeleteState(); }\r
      }\r
\r
      function bindImageNameAndOrder(tile, imageRow) {\r
        const caption = document.createElement('div');\r
        caption.className = 'resource-image-caption';\r
        const nameInput = addResourceNameEditor(caption, 'resource_images', imageRow, 'file_name', 'Image file name');\r
        tile.appendChild(caption);\r
        const tools = document.createElement('div');\r
        tools.className = 'resource-image-tools';\r
        const rename = document.createElement('button');\r
        rename.type = 'button'; rename.textContent = 'Rename';\r
        rename.addEventListener('click', event => {\r
          event.stopPropagation();\r
          if (!canManageImages()) return;\r
          nameInput.focus(); nameInput.select();\r
        });\r
        tools.appendChild(rename);\r
        const handle = document.createElement('button');\r
        handle.type = 'button'; handle.textContent = '↕ Move'; handle.className = 'resource-image-drag';\r
        handle.setAttribute('aria-label', 'Drag to reorder ' + (imageRow.file_name || 'image'));\r
        let moving = false;\r
        let originalOrder = [];\r
        handle.addEventListener('click', event => event.stopPropagation());\r
        handle.addEventListener('pointerdown', event => {\r
          if (!canManageImages() || imageOrderSaving || fileMutationPending || resourceSavePending || event.button !== 0) return;\r
          originalOrder = getImageTiles();\r
          event.preventDefault(); event.stopPropagation(); moving = true;\r
          handle.setPointerCapture(event.pointerId); tile.classList.add('is-dragging');\r
        });\r
        handle.addEventListener('pointermove', event => {\r
          if (!moving) return;\r
          const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('.image-tile');\r
          if (!target || target === tile || target.parentElement !== imageThumbGrid) return;\r
          const tiles = getImageTiles();\r
          imageThumbGrid.insertBefore(tile, tiles.indexOf(tile) < tiles.indexOf(target) ? target.nextSibling : target);\r
        });\r
        const finish = async event => {\r
          if (!moving) return;\r
          moving = false; tile.classList.remove('is-dragging');\r
          if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);\r
          await saveImageOrder();\r
        };\r
        handle.addEventListener('pointerup', finish);\r
        handle.addEventListener('pointercancel', () => {\r
          if (!moving) return;\r
          moving = false; tile.classList.remove('is-dragging');\r
          originalOrder.forEach(item => imageThumbGrid.appendChild(item));\r
        });\r
        handle.addEventListener('keydown', async event => {\r
          if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key) || !canManageImages() || imageOrderSaving || fileMutationPending || resourceSavePending) return;\r
          event.preventDefault(); event.stopPropagation();\r
          if (['ArrowLeft','ArrowUp'].includes(event.key)) { if (tile.previousElementSibling) imageThumbGrid.insertBefore(tile,tile.previousElementSibling); }\r
          else if (tile.nextElementSibling) imageThumbGrid.insertBefore(tile.nextElementSibling,tile);\r
          handle.focus(); await saveImageOrder();\r
        });\r
        tools.appendChild(handle);\r
        [-1, 1].forEach(direction => {\r
          const move = document.createElement('button');\r
          move.type = 'button'; move.textContent = direction < 0 ? '←' : '→';\r
          move.setAttribute('aria-label', direction < 0 ? 'Move image earlier' : 'Move image later');\r
          move.addEventListener('click', async event => {\r
            event.preventDefault(); event.stopPropagation();\r
            if (!canManageImages() || imageOrderSaving || fileMutationPending || resourceSavePending || moving) return;\r
            if (direction < 0 && tile.previousElementSibling) imageThumbGrid.insertBefore(tile, tile.previousElementSibling);\r
            else if (direction > 0 && tile.nextElementSibling) imageThumbGrid.insertBefore(tile.nextElementSibling, tile);\r
            else return;\r
            move.focus(); await saveImageOrder();\r
          });\r
          tools.appendChild(move);\r
        });\r
        tile.appendChild(tools);\r
      }\r
\r
      function clearImageFolderPreviewObjectUrls() {\r
        imageFolderPreviewObjectUrls.forEach(function (objectUrl) {\r
          URL.revokeObjectURL(objectUrl);\r
        });\r
        imageFolderPreviewObjectUrls = [];\r
      }\r
\r
      async function loadImageFolderCardPreview(card, imageRows, revision) {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        if (!resourceSupabase || !card) return;\r
\r
        const miniSlots = Array.from(card.querySelectorAll('.image-folder-mini'));\r
        const previewRows = (imageRows || []).slice(0, miniSlots.length);\r
\r
        for (let index = 0; index < previewRows.length; index += 1) {\r
          const imageRow = previewRows[index];\r
          const mini = miniSlots[index];\r
          if (!mini || !imageRow.file_path) continue;\r
\r
          const downloadResult = await resourceSupabase.storage\r
            .from('resource-images')\r
            .download(imageRow.file_path);\r
\r
          if (downloadResult.error) {\r
            console.error('Resource image folder preview load error:', downloadResult.error);\r
            continue;\r
          }\r
\r
          if (disposed || revision !== folderLoadRevision) return;\r
          const objectUrl = URL.createObjectURL(downloadResult.data);\r
          imageFolderPreviewObjectUrls.push(objectUrl);\r
\r
          const image = document.createElement('img');\r
          image.src = objectUrl;\r
          image.alt = imageRow.file_name || 'Image';\r
          image.style.width = '100%';\r
          image.style.height = '100%';\r
          image.style.objectFit = 'cover';\r
          image.style.display = 'block';\r
          mini.innerHTML = '';\r
          mini.appendChild(image);\r
        }\r
      }\r
\r
      async function loadResourceImageFolders() {\r
        const resourceSupabase = window.wincoResourcesSupabase;\r
        if (disposed || !resourceSupabase || !imageFolderList) return;\r
        const revision = ++folderLoadRevision;\r
        const folderId = currentFolderId;\r
\r
        const result = await resourceSupabase\r
          .from('resource_image_folders')\r
          .select('id, name, parent_id, sort_order, created_at, updated_at')\r
          .order('sort_order', { ascending: true, nullsFirst: false })\r
          .order('created_at', { ascending: true });\r
\r
        if (result.error) {\r
          console.error('Resource image folders load error:', result.error);\r
          return false;\r
        }\r
\r
        const imageCountResult = await resourceSupabase\r
          .from('resource_images')\r
          .select('folder_id, file_name, file_path, sort_order, created_at')\r
          .order('sort_order', { ascending: true, nullsFirst: false })\r
          .order('created_at', { ascending: true });\r
\r
        if (imageCountResult.error) {\r
          console.error('Resource image counts load error:', imageCountResult.error);\r
          return false;\r
        }\r
\r
        const imageCounts = {};\r
        const imagesByFolder = {};\r
        (imageCountResult.data || []).forEach(function (imageRow) {\r
          imageCounts[imageRow.folder_id] = (imageCounts[imageRow.folder_id] || 0) + 1;\r
          if (!imagesByFolder[imageRow.folder_id]) imagesByFolder[imageRow.folder_id] = [];\r
          imagesByFolder[imageRow.folder_id].push(imageRow);\r
        });\r
\r
        if (disposed || revision !== folderLoadRevision || folderId !== currentFolderId) return;\r
        clearImageFolderPreviewObjectUrls();\r
        imageFolderList.innerHTML = '';\r
        allFolderRows = result.data || [];\r
        const currentFolder = allFolderRows.find(row => row.id === currentFolderId);\r
        if (currentFolder && imageFolderDetailTitle) {\r
          currentFolderName = currentFolder.name;\r
          addResourceNameEditor(imageFolderDetailTitle, 'resource_image_folders', currentFolder, 'name', 'Current folder name');\r
        }\r
        childFolderList.innerHTML = '';\r
        const folderRows = allFolderRows.filter(row => (row.parent_id || null) === currentFolderId);\r
        const targetList = currentFolderId ? childFolderList : imageFolderList;\r
        for (let index = 0; index < folderRows.length; index += 1) {\r
          if (disposed || revision !== folderLoadRevision) return;\r
          const folderRow = folderRows[index];\r
          folderRow.image_count = imageCounts[folderRow.id] || 0;\r
          const card = createImageFolderCard(folderRow);\r
          targetList.appendChild(card);\r
          await loadImageFolderCardPreview(card, imagesByFolder[folderRow.id] || [], revision);\r
        }\r
        updateFolderSelectionCount();\r
        updateManageDeleteState();\r
        return true;\r
      }\r
\r
      function bindImageFolderCard(card) {\r
        if (!card) return;\r
        card.addEventListener('click', function (event) {\r
          if (event.target.closest('input, button')) return;\r
          openImageFolder(\r
            card.dataset.folderOpen || 'Folder',\r
            card.dataset.resourceImageFolderId || null\r
          );\r
        });\r
      }\r
\r
      resourceTabs.forEach(function (tab) {\r
        tab.addEventListener('click', function () {\r
          setActiveResourcePane(tab.dataset.resourceTab);\r
        });\r
      });\r
\r
      if (documentsUploadBtn) {\r
        documentsUploadBtn.addEventListener('click', function () {\r
          if (documentUploadOverlay) documentUploadOverlay.classList.add('is-open');\r
          if (documentTitleInput) documentTitleInput.focus();\r
        });\r
      }\r
\r
      if (documentUploadCancel) {\r
        documentUploadCancel.addEventListener('click', closeDocumentUpload);\r
      }\r
\r
      if (documentUploadSubmit) {\r
        documentUploadSubmit.addEventListener('click', uploadResourceDocument);\r
      }\r
\r
      if (documentUploadOverlay) {\r
        documentUploadOverlay.addEventListener('click', function (event) {\r
          if (event.target === documentUploadOverlay) closeDocumentUpload();\r
        });\r
      }\r
\r
      imageFolderCards.forEach(function (card) {\r
        bindImageFolderCard(card);\r
      });\r
\r
      if (imageFolderBack) {\r
        imageFolderBack.addEventListener('click', function () {\r
          const parent = folderTrail.pop();\r
          if (!parent) { closeImageFolder(); return; }\r
          currentFolderId = null;\r
          openImageFolder(parent.name, parent.id);\r
        });\r
      }\r
\r
      pageRoot.addEventListener('click', function (event) {\r
        const tile = event.target.closest('.image-tile');\r
        if (!tile) return;\r
        if (!imageDetailIsActive()) return;\r
\r
        const inManageMode = !!(ordersShell && ordersShell.classList.contains('is-manage-mode'));\r
        if (inManageMode) {\r
          tile.classList.toggle('is-selected');\r
          updateImageSelectionCount();\r
          updateManageDeleteState();\r
          return;\r
        }\r
\r
        openImagePreviewByTile(tile);\r
      });\r
\r
      if (manageToggle && ordersShell) {\r
        manageToggle.addEventListener('click', async function () {\r
          if (resourceSavePending || fileMutationPending || imageOrderSaving) return;\r
          const isActive = manageToggle.classList.toggle('is-active');\r
          ordersShell.classList.toggle('is-manage-mode', isActive);\r
          if (!isActive) {\r
            clearAllSelections();\r
            clearImageSelections();\r
            resourceEdits.clear();\r
            resetManageChanged();\r
            await refreshManagedResources();\r
          }\r
          updateManageSaveState();\r
        });\r
      }\r
\r
      pageRoot.addEventListener('change', function (event) {\r
        if (event.target.matches('.manage-select-cell .manage-checkbox')) {\r
          syncSelectAllState();\r
          updateManageDeleteState();\r
        }\r
      });\r
\r
      if (selectAllCheckbox) {\r
        selectAllCheckbox.addEventListener('change', function () {\r
          const checked = selectAllCheckbox.checked;\r
          getRowCheckboxes().forEach(function (checkbox) {\r
            checkbox.checked = checked;\r
          });\r
          syncSelectAllState();\r
          updateManageDeleteState();\r
        });\r
      }\r
\r
      if (newFolderBtn) {\r
        newFolderBtn.addEventListener('click', function () {\r
          if (!ordersShell || !ordersShell.classList.contains('is-manage-mode')) return;\r
          if (!canManageImages() || fileMutationPending || resourceSavePending || imageOrderSaving) return;\r
          newFolderParentId = currentFolderId;\r
          if (newFolderInput) newFolderInput.maxLength = 255;\r
          if (newFolderOverlay) newFolderOverlay.classList.add('is-open');\r
        });\r
      }\r
\r
      if (newFolderCancel) {\r
        newFolderCancel.addEventListener('click', closeNewFolder);\r
      }\r
\r
      if (newFolderCreate) {\r
        newFolderCreate.addEventListener('click', async function () {\r
          const folderName = newFolderInput ? newFolderInput.value.trim() : '';\r
          const resourceSupabase = window.wincoResourcesSupabase;\r
          const resourceUser = window.currentWincoResourcesUser || {};\r
          const isActive = () => !disposed && !!resourceUser.id && window.currentWincoResourcesUser?.id === resourceUser.id;\r
\r
          if (!folderName) {\r
            if (newFolderInput) newFolderInput.focus();\r
            return;\r
          }\r
          if (!isActive() || !resourceSupabase || !canManageImages() || fileMutationPending || resourceSavePending || imageOrderSaving) return;\r
\r
          fileMutationPending = true;\r
          newFolderCreate.disabled = true;\r
          if (newFolderInput) newFolderInput.disabled = true;\r
          updateManageSaveState(); updateManageDeleteState();\r
          try {\r
            newFolderAttempt ||= {id:crypto.randomUUID()};\r
            const payload = {id:newFolderAttempt.id,name:folderName,parent_id:newFolderParentId,created_by:resourceUser.account_name || resourceUser.username || null};\r
            const columns = 'id,name,parent_id,created_by';\r
            let result = await resourceSupabase.from('resource_image_folders').select(columns).eq('id',payload.id).maybeSingle();\r
            if (!isActive()) return;\r
            if (result.error) throw new Error('Unable to check this folder. Keep the name and retry.');\r
            if (!result.data) {\r
              result = await resourceSupabase.from('resource_image_folders').insert(payload).select(columns).single();\r
              if (!isActive()) return;\r
              if (result.error) {\r
                result = await resourceSupabase.from('resource_image_folders').select(columns).eq('id',payload.id).maybeSingle();\r
                if (!isActive()) return;\r
                if (result.error || !result.data) throw new Error('Folder details were not confirmed. Keep the name and retry.');\r
              }\r
            }\r
            if (Object.entries(payload).some(([key,value]) => (result.data[key] ?? null) !== (value ?? null))) {\r
              throw new Error('This folder was already created with different details. Refresh Resources and edit the saved folder.');\r
            }\r
            const refreshed = await loadResourceImageFolders();\r
            if (!isActive()) return;\r
            if (refreshed === false) throw new Error('The folder was created, but the list could not refresh. Retry to update the list.');\r
            fileMutationPending = false;\r
            closeNewFolder();\r
          } catch (error) {\r
            if (!isActive()) return;\r
            console.error('Resource image folder create error:', error);\r
            newFolderCreate.textContent = 'Retry';\r
            window.alert(error.message || 'Unable to create this folder.');\r
          } finally {\r
            fileMutationPending = false;\r
            if (isActive()) {\r
              newFolderCreate.disabled = false;\r
              if (newFolderInput) newFolderInput.disabled = false;\r
              updateManageSaveState(); updateManageDeleteState();\r
            }\r
          }\r
        });\r
      }\r
\r
      if (newFolderOverlay) {\r
        newFolderOverlay.addEventListener('click', function (event) {\r
          if (event.target === newFolderOverlay) closeNewFolder();\r
        });\r
      }\r
\r
      if (renameFolderBtn) {\r
        renameFolderBtn.addEventListener('click', function () {\r
          if (!canManageImages()) return;\r
          const input = imageFolderDetailTitle?.querySelector('.resource-name-input');\r
          input?.focus(); input?.select();\r
        });\r
      }\r
\r
      if (documentPreviewClose) {\r
        documentPreviewClose.addEventListener('click', closeDocumentPreview);\r
      }\r
\r
      if (documentPreviewOverlay) {\r
        documentPreviewOverlay.addEventListener('click', function (event) {\r
          if (event.target === documentPreviewOverlay) closeDocumentPreview();\r
        });\r
      }\r
\r
      if (imagePreviewClose) {\r
        imagePreviewClose.addEventListener('click', closeImagePreview);\r
      }\r
\r
      if (imagePreviewPrev) {\r
        imagePreviewPrev.addEventListener('click', function () {\r
          moveImagePreview(-1);\r
        });\r
      }\r
\r
      if (imagePreviewNext) {\r
        imagePreviewNext.addEventListener('click', function () {\r
          moveImagePreview(1);\r
        });\r
      }\r
\r
      if (imagePreviewStage) {\r
        imagePreviewStage.addEventListener('touchstart', function (event) {\r
          if (!event.touches || !event.touches.length) return;\r
          touchStartX = event.touches[0].clientX;\r
        }, { passive: true });\r
\r
        imagePreviewStage.addEventListener('touchend', function (event) {\r
          if (!event.changedTouches || !event.changedTouches.length) return;\r
          const deltaX = event.changedTouches[0].clientX - touchStartX;\r
          if (Math.abs(deltaX) < 30) return;\r
          moveImagePreview(deltaX < 0 ? 1 : -1);\r
        }, { passive: true });\r
      }\r
\r
      if (imagePreviewOverlay) {\r
        imagePreviewOverlay.addEventListener('click', function (event) {\r
          if (event.target === imagePreviewOverlay) closeImagePreview();\r
        });\r
      }\r
\r
      if (imageUploadBtn) {\r
        imageUploadBtn.addEventListener('click', function () {\r
          if (!ordersShell || !ordersShell.classList.contains('is-manage-mode')) return;\r
          if (!imageDetailIsActive()) return;\r
          if (imageUploadOverlay) imageUploadOverlay.classList.add('is-open');\r
        });\r
      }\r
\r
      if (imageUploadCancel) {\r
        imageUploadCancel.addEventListener('click', closeImageUpload);\r
      }\r
\r
      if (imageUploadChoose) {\r
        imageUploadChoose.addEventListener('click', function () {\r
          if (imageUploadChoose.textContent === 'Retry' && retryImageFiles.length) uploadResourceImages(retryImageFiles);\r
          else if (imageUploadInput) imageUploadInput.click();\r
        });\r
      }\r
\r
      if (imageUploadInput) {\r
        imageUploadInput.addEventListener('change', function () {\r
          uploadResourceImages(imageUploadInput.files);\r
        });\r
      }\r
\r
      if (imageUploadDropzone) {\r
        imageUploadDropzone.addEventListener('dragover', function (event) {\r
          event.preventDefault();\r
        });\r
\r
        imageUploadDropzone.addEventListener('drop', function (event) {\r
          event.preventDefault();\r
          const files = event.dataTransfer ? event.dataTransfer.files : null;\r
          uploadResourceImages(files);\r
        });\r
      }\r
\r
      if (imageUploadOverlay) {\r
        imageUploadOverlay.addEventListener('click', function (event) {\r
          if (event.target === imageUploadOverlay) closeImageUpload();\r
        });\r
      }\r
\r
      if (manageSaveBtn) {\r
        manageSaveBtn.addEventListener('click', async function () {\r
          if (!manageSaveBtn.classList.contains('is-enabled')) return;\r
          await saveManagedResources();\r
        });\r
      }\r
\r
      if (manageDeleteBtn) {\r
        manageDeleteBtn.addEventListener('click', function () {\r
          if (!canManageImages() || fileMutationPending || resourceSavePending || imageOrderSaving || !manageDeleteBtn.classList.contains('is-enabled')) return;\r
\r
          if (imagesPaneIsActive() && getSelectedFolderCards().length) {\r
            const selectedFolders = getSelectedFolderCards();\r
            const hasNonEmptyFolder = selectedFolders.some(card => !folderIsEmpty(card));\r
            if (deleteConfirmTitle) deleteConfirmTitle.textContent = hasNonEmptyFolder ? 'Only empty folders can be deleted' : 'Delete selected folders?';\r
            if (deleteConfirmText) deleteConfirmText.textContent = hasNonEmptyFolder ? 'Remove images and subfolders first. Only empty folders can be deleted.' : 'This will remove the selected empty folders from the current image library.';\r
          } else if (imagesPaneIsActive() && imageDetailIsActive()) {\r
            if (deleteConfirmTitle) deleteConfirmTitle.textContent = 'Delete selected images?';\r
            if (deleteConfirmText) deleteConfirmText.textContent = 'This action will remove the selected images from the current folder.';\r
          } else {\r
            if (deleteConfirmTitle) deleteConfirmTitle.textContent = 'Delete selected files?';\r
            if (deleteConfirmText) deleteConfirmText.textContent = 'This action will remove the selected resource items from the current list.';\r
          }\r
\r
          if (deleteConfirmOverlay) deleteConfirmOverlay.classList.add('is-open');\r
        });\r
      }\r
\r
      if (deleteCancelBtn) {\r
        deleteCancelBtn.addEventListener('click', closeDeleteConfirm);\r
      }\r
\r
      if (deleteConfirmBtn) {\r
        deleteConfirmBtn.addEventListener('click', async function () {\r
          if (!canManageImages() || fileMutationPending || resourceSavePending || imageOrderSaving) return;\r
          fileMutationPending = true; deleteConfirmBtn.disabled = true;\r
          updateManageSaveState(); updateManageDeleteState();\r
          try {\r
          if (imagesPaneIsActive() && imageDetailIsActive() && !getSelectedFolderCards().length) {\r
            await deleteSelectedResourceImages();\r
          } else if (imagesPaneIsActive() && getSelectedFolderCards().length) {\r
            const selectedFolders = getSelectedFolderCards();\r
            const hasNonEmptyFolder = selectedFolders.some(card => !folderIsEmpty(card));\r
            if (!hasNonEmptyFolder) {\r
              await deleteSelectedEmptyFolders();\r
            }\r
          } else {\r
            await deleteSelectedResourceDocuments();\r
          }\r
          closeDeleteConfirm();\r
          } finally {\r
            fileMutationPending = false; deleteConfirmBtn.disabled = false;\r
            updateManageSaveState(); updateManageDeleteState();\r
          }\r
        });\r
      }\r
\r
      if (deleteConfirmOverlay) {\r
        deleteConfirmOverlay.addEventListener('click', function (event) {\r
          if (event.target === deleteConfirmOverlay) closeDeleteConfirm();\r
        });\r
      }\r
\r
      window.disposeResourcesPage = () => {\r
        disposed = true; imageLoadRevision++; folderLoadRevision++; documentLoadRevision++; documentPreviewRevision++;\r
        Promise.resolve(uploadFile.abandon?.()).catch(() => {});\r
        window.clearTimeout(saveStatusTimer);\r
        clearImageTileObjectUrls(); clearImageFolderPreviewObjectUrls(); closeDocumentPreview();\r
        delete window.disposeResourcesPage;\r
      };\r
      if (['Admin','Sales'].includes(window.currentWincoResourcesUser?.role)) {\r
        const cleanupAccountId = window.currentWincoResourcesUser.id;\r
        resourceFiles.cleanupResourceFiles(resourceSupabaseClient,\r
          () => window.currentWincoResourcesUser?.id === cleanupAccountId).catch(() => {});\r
      }\r
      loadResourceDocuments();\r
      loadResourceImageFolders();\r
      applyOrdersFilters();\r
      syncSelectAllState();\r
      updateImageSelectionCount();\r
      updateFolderSelectionCount();\r
      updateManageDeleteState();\r
      updateManageSaveState();\r
      setActiveResourcePane('documents');\r
};\r
`;function o(e,t){let n=String(t||``).match(/\.[a-z0-9]{1,10}$/i)?.[0]||``,r=String(e||``).trim().replace(/[<>:"/\\|?*\u0000-\u001f]/g,`_`);if(n&&r.toLowerCase().endsWith(n.toLowerCase())&&(r=r.slice(0,-n.length)),r=r.replace(/[. ]+$/g,``).trim(),!r)throw Error(`Enter a file name.`);return r.slice(0,255-n.length)+n}function s(){let e=new Map,t={resource_documents:[`title`,`access`],resource_images:[`file_name`],resource_image_folders:[`name`]},n=(e,t)=>`${e}:${t}`;return{get size(){return e.size},value(t,r,i){return e.get(n(t,r.id))?.patch[i]??r[i]??``},stage(r,i,a,o){if(!t[r]?.includes(a)||!i.id)throw Error(`Invalid resource change.`);let s=n(r,i.id),c=e.get(s)||{table:r,row:i,patch:{}};o===(c.row[a]??``)?delete c.patch[a]:c.patch[a]=o,Object.keys(c.patch).length?e.set(s,c):e.delete(s)},remove(t,r){r.forEach(r=>e.delete(n(t,r)))},clear(){e.clear()},async save(t){let n=[...e.entries()].map(([e,t])=>{let n={...t.patch},r={resource_documents:`title`,resource_images:`file_name`,resource_image_folders:`name`}[t.table];if(Object.hasOwn(n,r)){if(n[r]=n[r].trim(),!n[r])throw Error(`Enter a name before saving.`);if(n[r].length>255)throw Error(`Names must be 255 characters or fewer.`);t.table===`resource_documents`&&(n.file_name=o(n.title,t.row.file_name||t.row.file_path)),t.table===`resource_images`&&(n.file_name=o(n.file_name,t.row.file_name||t.row.file_path))}return{id:e,edit:t,patch:n}});for(let{id:r,edit:i,patch:a}of n){let n=await t.from(i.table).update(a).eq(`id`,i.row.id).select(`id`).single();if(n.error||n.data?.id!==i.row.id)throw Error(`Unable to save changes. Your unsaved names are kept. Please try again.`);Object.assign(i.row,a),e.delete(r)}}}}async function c(e,t=()=>!0){if(!t())return!1;let n=!0;try{(await e.rpc(`winco_queue_abandoned_resource_uploads`)).error&&(n=!1)}catch{n=!1}if(!t())return!1;let r;try{r=await e.from(`resource_file_cleanup`).select(`id,bucket_id,file_path`)}catch{return!1}if(!t()||r.error)return!1;for(let i of r.data||[]){if(!t())return!1;try{let r=await e.storage.from(i.bucket_id).remove([i.file_path]);if(!t())return!1;if(r.error){n=!1;continue}if(!r.data?.some(e=>e.name===i.file_path)){let r=await e.storage.from(i.bucket_id).download(i.file_path);if(!t())return!1;if(Number(r.error?.statusCode??r.error?.status)!==404){n=!1;continue}}let a=await e.from(`resource_file_cleanup`).delete().eq(`id`,i.id).select(`id`).single();if(!t())return!1;(a.error||a.data?.id!==i.id)&&(n=!1)}catch{n=!1}}return n}async function l(e,t,n,r=()=>!0){let i=[...new Set(n.filter(Boolean))];if(!i.length)throw Error(`Select at least one item.`);if(!r())return{cleanupComplete:!1};let{data:a,error:o}=await e.rpc(`winco_delete_resources`,{p_kind:t,p_ids:i});if(o)throw Error(o.code===`23503`?`This folder contains images or subfolders. Nothing was deleted.`:`Deletion was not confirmed. Refresh the list before trying again.`);if(a!==i.length)throw Error(`Deletion was not confirmed. Refresh the list before trying again.`);return{cleanupComplete:await c(e,r)}}function u(e=()=>crypto.randomUUID(),{renewEveryMs:t=6e4}={}){let n=new WeakMap,r=new Set;async function i(e){if(!e.complete&&e.isCurrentAccount()){if(e.abandoning)return e.abandoning;e.abandoning=(async()=>{try{let t=await e.client.rpc(`winco_abandon_resource_upload`,{p_id:e.id,p_expected_account_id:e.accountId});!t.error&&t.data===!0&&e.isCurrentAccount()&&await c(e.client,e.isCurrentAccount)}catch{}})();try{await e.abandoning}finally{e.abandoning=null}}}async function a(o,s,c=!1){let{kind:l,file:u,folderId:d=null,fields:f={},isActive:p=()=>!0,accountId:m=null,isCurrentAccount:h=()=>!0}=s,g=n.get(u),_=()=>{if(!p()||g?.cancelled)throw Error(`This upload was cancelled because Resources or the account changed.`)};_();let v=l===`images`,y=v?`resource_images`:`resource_documents`,b=v?`resource-images`:`resource-documents`;if(!g){let t=e(),i=String(u.name||`file`).replace(/[^a-zA-Z0-9._-]+/g,`_`);g={id:t,kind:l,folderId:d,path:(v?d+`/`:``)+t+`-`+i,uploaded:!1,client:o,accountId:m,isCurrentAccount:h,registered:!1,complete:!1,cancelled:!1},n.set(u,g),r.add(g)}if(g.kind!==l||g.folderId!==d)throw Error(`Retry this upload in its original folder.`);let x={...f,id:g.id,file_name:u.name,file_path:g.path,...v?{folder_id:d}:{}},S=Object.keys(x).join(`,`),C=e=>{if(Object.entries(x).some(([t,n])=>(e[t]??null)!==(n??null)))throw Error(`This file was already uploaded with different details. Refresh Resources and edit the saved item.`);return e},w=()=>o.rpc(`winco_begin_resource_upload`,{p_id:g.id,p_kind:l,p_file_path:g.path,p_folder_id:d,p_expected_account_id:g.accountId}),T;try{let e=await o.from(y).select(S).eq(`id`,g.id).maybeSingle();if(_(),e.error)throw Error(`Unable to check the upload. Your selected file is kept for retry.`);if(e.data)return g.complete=!0,r.delete(g),C(e.data);let i=await w();if(!i.error&&i.data===`pending`&&(g.registered=!0),_(),i.error||![`pending`,`abandoned`].includes(i.data))throw Error(`Unable to upload this file. Please retry.`);if(i.data===`abandoned`){if(r.delete(g),n.delete(u),c)throw Error(`Unable to upload this file. Please retry.`);return a(o,s,!0)}let l=!1;if(T=setInterval(async()=>{if(!(l||g.cancelled||!p())){l=!0;try{let e=await w();!e.error&&e.data===`abandoned`&&(g.expired=!0)}catch{}finally{l=!1}}},t),!g.uploaded){let e=await o.storage.from(b).upload(g.path,u,{cacheControl:`3600`,upsert:!1,contentType:u.type||void 0});if(_(),e.error&&Number(e.error.statusCode??e.error.status)!==409){let e=await o.storage.from(b).download(g.path);if(_(),e.error||e.data?.size!==u.size)throw Error(`Unable to upload this file. Please retry.`)}g.uploaded=!0}if(g.expired)throw Error(`Unable to upload this file. Please retry.`);let d=await o.from(y).insert(x).select(S).single();if(_(),d.error){let e=await o.from(y).select(S).eq(`id`,g.id).maybeSingle();if(_(),!e.error&&e.data)return g.complete=!0,r.delete(g),C(e.data);throw Error(`The file was uploaded but its details were not confirmed. Keep the selected file and retry.`)}return g.complete=!0,r.delete(g),d.data}catch(e){throw(!p()||g.cancelled)&&await i(g),e}finally{clearInterval(T)}}return a.abandon=async()=>{let e=[...r];for(let t of e)t.cancelled=!0;await Promise.allSettled(e.map(i))},a}var d=`<div class="app-preview">
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
              <div class="nav-item">Clients</div>
              <div class="nav-item current">Resources</div>
              <div class="nav-item">Admin</div>
            </div>
            <div class="topbar-actions"></div>
          </div>
        </nav>

        <main class="page-shell">
          <section class="page-blank">
            <div class="orders-shell">
              <div class="orders-header">
                <div class="orders-header-left">
                  <div class="orders-title">Resources</div>
                  <div class="resource-view-tabs">
                    <button class="resource-view-tab is-active" type="button" data-resource-tab="documents">Documents</button>
                    <button class="resource-view-tab" type="button" data-resource-tab="images">Image Library</button>
                  </div>
                </div>
                <div class="orders-header-tools">
                  <button class="admin-action-btn documents-upload-btn" type="button">Upload</button>
                  <button class="admin-action-btn" type="button" data-manage-toggle>Manage</button>
                  <button class="admin-action-btn manage-save-btn" type="button" data-manage-save>Save</button>
                  <div class="manage-save-status" data-manage-save-status>Changes saved</div>
                  <button class="admin-action-btn manage-delete-btn" type="button">Delete</button>
                </div>
              </div>

              <div class="resource-content-pane is-active" data-resource-pane="documents">
                <div class="orders-table">
                <div class="orders-table-head">
                  <div class="orders-cell manage-select-head"><input class="manage-checkbox" type="checkbox" aria-label="Select all" /></div>
                  <div class="orders-cell">
                    <span class="orders-sort-button">Document Title</span>
                  </div>
                  <div class="orders-cell">File</div>
                  <div class="orders-cell">Rev.</div>
                  <div class="orders-cell">Updated</div>
                  <div class="orders-cell manage-access-head">Access</div>
                  <div class="orders-cell resource-download-head">↓</div>
                </div>

                <div data-resource-documents-list></div>
              </div>
              </div>

              <section class="image-library-section resource-content-pane" data-resource-pane="images">
              <div class="image-library-header">
                <div class="folder-selection-count" data-folder-selection-count>0 selected</div>
                <button class="admin-action-btn manage-image-folder-btn" type="button">New Folder</button>
              </div>

              <div class="image-library-grid image-folder-list-mode" data-image-folder-list>
              </div>

              <template id="image-folder-card-template">
                <div class="image-folder-card" data-folder-open="">
                  <div class="image-folder-thumb">
                    <div class="image-folder-mini"></div>
                    <div class="image-folder-mini"></div>
                    <div class="image-folder-mini"></div>
                    <div class="image-folder-mini"></div>
                    <div class="image-folder-mini"></div>
                    <div class="image-folder-mini"></div>
                    <div class="image-folder-mini"></div>
                    <div class="image-folder-mini"></div>
                  </div>
                  <div class="image-folder-meta">
                    <div class="image-folder-name"></div>
                    <div class="image-folder-info">0 images</div>
                  </div>
                </div>
              </template>

              <div class="image-folder-detail" data-image-folder-detail>
                <div class="image-folder-detail-head">
                  <div class="image-folder-detail-left">
                    <button class="image-folder-back" type="button" data-folder-back>← Back</button>
                    <div class="image-folder-detail-title" data-folder-detail-title>Product Photos</div>
                  </div>
                  <div class="orders-header-tools">
                    <div class="image-selection-count" data-image-selection-count>0 selected</div>
                    <button class="admin-action-btn manage-image-rename-btn" type="button">Rename Folder</button>
                    <button class="admin-action-btn manage-image-upload-btn" type="button">Upload Images</button>
                  </div>
                </div>

                <div class="image-thumb-grid" data-image-thumb-grid>
                </div>
              </div>
            </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>

  <div class="upload-overlay" data-document-upload-overlay>
    <div class="upload-dialog" role="dialog" aria-modal="true" aria-labelledby="documentUploadTitle">
      <div class="upload-title" id="documentUploadTitle">Upload Document</div>
      <div class="document-upload-fields">
        <label class="document-upload-field">
          <span>Document Title</span>
          <input class="folder-input" type="text" data-document-title />
        </label>
        <label class="document-upload-field">
          <span>File</span>
          <input class="document-file-input" type="file" data-document-file />
        </label>
        <label class="document-upload-field">
          <span>Revision</span>
          <input class="folder-input" type="text" placeholder="Optional" data-document-revision />
        </label>
        <label class="document-upload-field">
          <span>Access</span>
          <select class="document-upload-select" data-document-access>
            <option>Public</option>
            <option>Dealer</option>
            <option>Winco Only</option>
          </select>
        </label>
        <label class="document-upload-check">
          <input type="checkbox" data-document-is-new />
          <span>Mark as NEW</span>
        </label>
        <div class="document-upload-status" data-document-upload-status></div>
      </div>
      <div class="upload-actions">
        <button class="confirm-btn" type="button" data-document-upload-cancel>Cancel</button>
        <button class="confirm-btn delete" type="button" data-document-upload-submit>Upload</button>
      </div>
    </div>
  </div>

  <div class="upload-overlay" data-image-upload-overlay>
    <div class="upload-dialog" role="dialog" aria-modal="true" aria-labelledby="imageUploadTitle">
      <div class="upload-title" id="imageUploadTitle">Upload Images</div>
      <div class="upload-text">Add images to the current folder. On PC, drag files here or choose from your computer. On iPad, choose from Photos or Files.</div>
      <div class="upload-dropzone">
        <div class="upload-dropzone-title">Drag images here</div>
        <div class="upload-dropzone-sub">or choose files from device</div>
      </div>
      <input type="file" accept="image/*" multiple data-image-upload-input style="display:none;" />
      <div class="upload-actions">
        <button class="confirm-btn" type="button" data-image-upload-cancel>Cancel</button>
        <button class="confirm-btn delete" type="button" data-image-upload-choose>Choose Files</button>
      </div>
    </div>
  </div>

  <div class="upload-overlay" data-new-folder-overlay>
    <div class="upload-dialog" role="dialog" aria-modal="true" aria-labelledby="newFolderTitle">
      <div class="upload-title" id="newFolderTitle">New Folder</div>
      <div class="upload-text">Create a new image folder for organizing customer presentation photos and reference images.</div>
      <input class="folder-input" type="text" placeholder="Folder name" data-new-folder-input />
      <div class="upload-actions">
        <button class="confirm-btn" type="button" data-new-folder-cancel>Cancel</button>
        <button class="confirm-btn delete" type="button" data-new-folder-create>Create</button>
      </div>
    </div>
  </div>

  <div class="image-preview-overlay" data-document-preview-overlay>
    <div class="image-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="documentPreviewTitle">
      <div class="image-preview-head">
        <div class="image-preview-title" id="documentPreviewTitle" data-document-preview-title>PDF Preview</div>
        <div class="orders-header-tools" style="gap:8px;">
          <button class="image-preview-close" type="button" data-document-preview-close>×</button>
        </div>
      </div>
      <div class="image-preview-stage">
        <div class="image-preview-frame">
          <div data-document-preview-content>PDF Preview</div>
        </div>
      </div>
    </div>
  </div>

  <div class="image-preview-overlay" data-image-preview-overlay>
    <div class="image-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="imagePreviewTitle">
      <div class="image-preview-head">
        <div class="image-preview-title" id="imagePreviewTitle" data-image-preview-title>Image Preview</div>
        <div class="orders-header-tools" style="gap:8px;">
          <div class="image-preview-count" data-image-preview-count>1 / 6</div>
          <button class="image-preview-close" type="button" data-image-preview-close>×</button>
        </div>
      </div>
      <div class="image-preview-stage" data-image-preview-stage>
        <button class="image-preview-nav prev" type="button" data-image-preview-prev>‹</button>
        <div class="image-preview-frame">
          <div data-image-preview-content>Large Image Preview</div>
        </div>
        <button class="image-preview-nav next" type="button" data-image-preview-next>›</button>
      </div>
      <div class="image-preview-strip" data-image-preview-strip>
        <button class="image-preview-thumb is-active" type="button" data-image-preview-thumb="0">1</button>
        <button class="image-preview-thumb" type="button" data-image-preview-thumb="1">2</button>
        <button class="image-preview-thumb" type="button" data-image-preview-thumb="2">3</button>
        <button class="image-preview-thumb" type="button" data-image-preview-thumb="3">4</button>
        <button class="image-preview-thumb" type="button" data-image-preview-thumb="4">5</button>
        <button class="image-preview-thumb" type="button" data-image-preview-thumb="5">6</button>
      </div>
    </div>
  </div>

  <div class="confirm-overlay" data-delete-confirm>
    <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="deleteConfirmTitle">
      <div class="confirm-title" id="deleteConfirmTitle" data-delete-confirm-title>Delete selected files?</div>
      <div class="confirm-text" data-delete-confirm-text>This action will remove the selected resource items from the current list.</div>
      <div class="confirm-actions">
        <button class="confirm-btn" type="button" data-delete-cancel>Cancel</button>
        <button class="confirm-btn delete" type="button" data-delete-confirm-btn>Delete</button>
      </div>
    </div>
  </div>`;function f({currentUser:t,onOpenMainPage:n,onOpenMeasurePage:o,onOpenQuotesPage:f,onOpenOrdersPage:p,onOpenClientsPage:m,onOpenResourcesPage:h,onOpenAdminPage:g}){let _=t?.role===`Admin`||t?.role===`Sales`,v=t?.account_name||`Charles / Winco`,y=d.replace(`Charles / Winco`,v).replace(`<button class="admin-action-btn documents-upload-btn" type="button">Upload</button>`,_?`<button class="admin-action-btn documents-upload-btn" type="button">Upload</button>`:``).replace(`<button class="admin-action-btn" type="button" data-manage-toggle>Manage</button>`,_?`<button class="admin-action-btn" type="button" data-manage-toggle>Manage</button>`:``).replace(`<button class="admin-action-btn manage-save-btn" type="button" data-manage-save>Save</button>`,_?`<button class="admin-action-btn manage-save-btn" type="button" data-manage-save>Save</button>`:``).replace(`<div class="manage-save-status" data-manage-save-status>Changes saved</div>`,_?`<div class="manage-save-status" data-manage-save-status>Changes saved</div>`:``).replace(`<button class="admin-action-btn manage-delete-btn" type="button">Delete</button>`,_?`<button class="admin-action-btn manage-delete-btn" type="button">Delete</button>`:``).replace(`<div class="nav-item">Admin</div>`,_?`<div class="nav-item">Admin</div>`:``).replace(`<div class="main-nav-item current">Admin</div>`,_?`<div class="main-nav-item current">Admin</div>`:``).replace(`<div class="main-nav-item">Admin</div>`,_?`<div class="main-nav-item">Admin</div>`:``);return(0,r.useEffect)(()=>{window.wincoResourcesSupabase=e,window.createWincoResourceEdits=s,window.wincoResourceFiles={cleanupResourceFiles:c,createResourceUploads:u,deleteResourceItems:l},window.currentWincoResourcesUser=t;let r=document.createElement(`script`);r.type=`text/javascript`,r.dataset.wincoResourcesPage=`true`,r.text=a,document.body.appendChild(r);let i=(()=>{let e=document.querySelector(`.resources-page`);if(!e)return()=>{};let t=e.querySelectorAll(`.topbar-left .nav-item`),r=[];return t.forEach(e=>{let t=e.textContent.trim(),i=null;if((e.hasAttribute(`data-account-home-link`)||e.classList.contains(`account`)||t===`Charles / Winco`)&&(i=n),t===`Measure`&&(i=o),t===`Quotes`&&(i=f),t===`Orders`&&(i=p),t===`Clients`&&(i=m),t===`Resources`&&(i=h),t===`Admin`&&(i=g),i){let t=()=>i();e.style.cursor=`pointer`,e.addEventListener(`click`,t),r.push([e,t])}}),()=>{r.forEach(([e,t])=>{e.removeEventListener(`click`,t)})}})(),d=window.setTimeout(()=>{typeof window.initResourcesPage==`function`&&window.initResourcesPage()},0);return()=>{window.disposeResourcesPage?.(),typeof i==`function`&&i(),window.clearTimeout(d),r.parentNode&&r.parentNode.removeChild(r),window.initResourcesPage&&delete window.initResourcesPage,delete window.wincoResourcesSupabase,delete window.createWincoResourceEdits,delete window.wincoResourceFiles,delete window.currentWincoResourcesUser}},[]),(0,i.jsx)(`div`,{className:`resources-page`,dangerouslySetInnerHTML:{__html:y}})}export{f as default};