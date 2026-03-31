// js/photo-upload.js
export function initPhotoUpload(containerEl) {
  const files = []

  const zone = containerEl.querySelector('.upload-zone')
  const thumbs = containerEl.querySelector('#photoThumbs')

  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over') })
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'))
  zone.addEventListener('drop', e => {
    e.preventDefault()
    zone.classList.remove('drag-over')
    handleFiles([...e.dataTransfer.files])
  })
  zone.addEventListener('click', () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/*'
    input.onchange = e => handleFiles([...e.target.files])
    input.click()
  })

  function handleFiles(newFiles) {
    newFiles.filter(f => f.type.startsWith('image/')).forEach(f => {
      files.push(f)
      const reader = new FileReader()
      reader.onload = e => {
        const isFirst = files.length === 1
        const wrap = document.createElement('div')
        wrap.style.cssText = 'position:relative;display:inline-block;'
        wrap.innerHTML = `
          <img src="${e.target.result}" style="width:72px;height:72px;border-radius:3px;object-fit:cover;border:1.5px solid var(--ivory-dark);">
          ${isFirst ? '<span style="position:absolute;bottom:3px;left:3px;background:rgba(26,24,20,0.7);color:white;font-family:var(--mono);font-size:7px;padding:1px 4px;border-radius:1px;text-transform:uppercase;">Cover</span>' : ''}
          <button onclick="this.closest('[data-idx]').remove()" style="position:absolute;top:-5px;right:-5px;width:16px;height:16px;background:var(--coral);border-radius:50%;border:none;color:white;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;">×</button>`
        wrap.setAttribute('data-idx', files.length - 1)
        thumbs.appendChild(wrap)
      }
      reader.readAsDataURL(f)
    })
  }

  return {
    getFiles: () => files,
    clear: () => { files.length = 0; thumbs.innerHTML = '' }
  }
}
