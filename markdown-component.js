class MarkdownEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isEditing = false;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .notes-md-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 0;
        }

          /* ── Textarea ── */
        .notes-textarea {
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 13px;
          line-height: 1.65;
          padding: 10px 14px;
          min-height: 86px;
          box-sizing: border-box;
          margin: 0;
          background: #000000;
          border: 1px solid rgba(255,255,255,0.08);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          color: #f5f5f5;
          resize: none;
          outline: none;
          overflow: hidden;
          white-space: pre-wrap;
          word-wrap: break-word;
          /* Fade dissolve transition */
          transition: opacity 0.3s ease, border-color 0.2s;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          visibility: hidden;
          padding: 0;
          border-width: 0;
        }
        .notes-textarea.editing {
          position: relative;
          visibility: visible;
          border-radius: 10px;
          opacity: 1;
          pointer-events: auto;
          min-height: 86px;
          padding: 10px;
          border-width: 1px;
        }
        .notes-textarea::placeholder {
          color: #6a6a6a;
        }
        .notes-textarea:focus {
          border-color: rgba(138, 180, 248, 0.5);
        }

        /* ── Preview ── */
        .notes-md-render {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 13px;
          line-height: 1.65;
          padding: 10px 14px;
          min-height: 86px;
          box-sizing: border-box;
          color: #f5f5f5;
          background: #000000;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          overflow: auto;
          white-space: normal;
          word-wrap: break-word;
          /* Fade dissolve transition */
          transition: opacity 0.3s ease, border-color 0.2s;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          visibility: hidden;
          padding: 0;
          border-width: 0;
        }
        .notes-md-render.visible {
          position: relative;
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
          min-height: 86px;
          padding: 10px 14px;
          border-width: 1px;
        }
        /* Markdown render styles */
        .notes-md-render h1 { font-size: 1.3em; margin: 0 0 0.5em; color: #8ab4f8; }
        .notes-md-render h2 { font-size: 1.1em; margin: 0 0 0.4em; color: #8ab4f8; }
        .notes-md-render h3 { font-size: 1em; margin: 0 0 0.4em; }
        .notes-md-render p { margin-top: 0; margin-bottom: 0.8em; }
        .notes-md-render p:last-child { margin-bottom: 0; }
        .notes-md-render a { color: #8ab4f8; text-decoration: none; }
        .notes-md-render a:hover { text-decoration: underline; }
        .notes-md-render code { background: rgba(255,255,255,.1); padding: 2px 5px; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; font-size: 12px; }
        .notes-md-render pre { background: rgba(0,0,0,.3); padding: 10px; border-radius: 8px; overflow-x: auto; margin-bottom: 0.8em; }
        .notes-md-render pre code { background: transparent; padding: 0; }
        .notes-md-render blockquote { border-left: 3px solid #8ab4f8; margin: 0 0 0.8em; padding: 4px 0 4px 1em; color: #9a9a9a; }
        .notes-md-render ul, .notes-md-render ol { margin-top: 0; margin-bottom: 0.8em; padding-left: 20px; }
        .notes-md-render li { margin-bottom: 0.2em; }
        .notes-md-render mark { background: rgba(246, 224, 94, 0.25); color: inherit; padding: 0 3px; border-radius: 3px; }
        .notes-md-render strong { color: #d5e8ff; }
        .notes-md-render hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 1em 0; }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .notes-textarea.editing, .notes-md-render.visible {
            font-size: 14px;
            padding: 10px 12px;
          }
        }
      </style>
      <div class="notes-md-wrap">
        <div class="notes-md-render"></div>
        <textarea class="notes-textarea" placeholder="Your notes… (Markdown supported · Ctrl+Enter to save)"></textarea>
      </div>
    `;

    this.textarea = this.shadowRoot.querySelector('.notes-textarea');
    this.preview = this.shadowRoot.querySelector('.notes-md-render');
    this._fontSize = 13; // default px
    this._minFont = 11;
    this._maxFont = 18;

    // Load marked.js if not already present
    if (typeof marked === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
      script.onload = () => this.updatePreview();
      document.head.appendChild(script);
    }
  }

  connectedCallback() {
    const initialValue = this.getAttribute('initial-value') || '';
    this.textarea.value = initialValue;

    this.textarea.addEventListener('input', () => {
      this._emit();
      this.updatePreview();
      this.adjustHeight();
    });

    this.textarea.addEventListener('keydown', e => {
      // Ctrl+Enter → save and exit edit mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.setEditMode(false);
        this._emit();
        this.dispatchEvent(new CustomEvent('mode-change', { detail: { isEditing: false }, bubbles: true, composed: true }));
      }
      // Ctrl+B → bold
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        this.formatAction('bold');
      }
      // Auto-continue bullet lists on Enter
      if (e.key === 'Enter') {
        const pos = this.textarea.selectionStart;
        const val = this.textarea.value;
        const lineStart = val.lastIndexOf('\n', pos - 1) + 1;
        const curLine = val.slice(lineStart, pos);
        if (/^- /.test(curLine)) {
          if (curLine === '- ') {
            e.preventDefault();
            this.textarea.value = val.slice(0, lineStart) + val.slice(pos);
            this.textarea.selectionStart = this.textarea.selectionEnd = lineStart;
            this.textarea.dispatchEvent(new Event('input'));
          } else {
            e.preventDefault();
            this.textarea.value = val.slice(0, pos) + '\n- ' + val.slice(pos);
            this.textarea.selectionStart = this.textarea.selectionEnd = pos + 3;
            this.textarea.dispatchEvent(new Event('input'));
          }
        }
      }
    });

    this._onDocumentMouseDown = e => {
      if (!this.isEditing) return;
      if (this.contains(e.target)) return;
      if (e.target.closest && e.target.closest('.tab-edit-md-btn')) return;
      if (e.target.closest && e.target.closest('.formatting-toolbar-ext')) return;
      this.setEditMode(false);
    };
    document.addEventListener('mousedown', this._onDocumentMouseDown);

    this.setEditMode(!initialValue.trim());
  }

  disconnectedCallback() {
    if (this._onDocumentMouseDown) {
      document.removeEventListener('mousedown', this._onDocumentMouseDown);
    }
  }

  formatAction(action) {
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const val = this.textarea.value;
    const sel = val.slice(start, end);
    let rep = sel;
    let cur = start;

      let pre = val.slice(0, start);
      let post = val.slice(end);
      let innerSel = sel;
      let trimmedStart = start;
      let trimmedEnd = end;

      // Extract trailing spaces so they don't break markdown (e.g. "**word **" -> "**word** ")
      const trailingSpaceMatch = sel.match(/(\s+)$/);
      let trailingSpace = '';
      if (trailingSpaceMatch) {
        trailingSpace = trailingSpaceMatch[1];
        innerSel = sel.substring(0, sel.length - trailingSpace.length);
        trimmedEnd = end - trailingSpace.length;
      }
      // Extract leading spaces
      const leadingSpaceMatch = innerSel.match(/^(\s+)/);
      let leadingSpace = '';
      if (leadingSpaceMatch) {
        leadingSpace = leadingSpaceMatch[1];
        innerSel = innerSel.substring(leadingSpace.length);
        trimmedStart = start + leadingSpace.length;
      }

      if (action === 'bold') {
        const wrapped = `**${innerSel}**`;
        const unwrap = trimmedStart >= 2 && val.slice(trimmedStart - 2, trimmedStart) === '**' && val.slice(trimmedEnd, trimmedEnd + 2) === '**';
        if (unwrap) {
          this.textarea.value = val.slice(0, trimmedStart - 2) + innerSel + val.slice(trimmedEnd + 2);
          this.textarea.selectionStart = trimmedStart - 2;
          this.textarea.selectionEnd = trimmedEnd - 2;
        } else {
          rep = wrapped; cur = trimmedStart + 2 + innerSel.length;
          this.textarea.value = val.slice(0, trimmedStart) + rep + val.slice(trimmedEnd);
          this.textarea.selectionStart = trimmedStart + 2;
          this.textarea.selectionEnd = trimmedEnd + 2;
        }
      } else if (action === 'underline') {
        const wrapped = `<u>${innerSel}</u>`;
        const unwrap = trimmedStart >= 3 && val.slice(trimmedStart - 3, trimmedStart) === '<u>' && val.slice(trimmedEnd, trimmedEnd + 4) === '</u>';
        if (unwrap) {
          this.textarea.value = val.slice(0, trimmedStart - 3) + innerSel + val.slice(trimmedEnd + 4);
          this.textarea.selectionStart = trimmedStart - 3;
          this.textarea.selectionEnd = trimmedEnd - 3;
        } else {
          rep = wrapped; cur = trimmedStart + 3 + innerSel.length;
          this.textarea.value = val.slice(0, trimmedStart) + rep + val.slice(trimmedEnd);
          this.textarea.selectionStart = trimmedStart + 3;
          this.textarea.selectionEnd = trimmedEnd + 3;
        }
      } else if (action === 'h1' || action === 'h2') {
        const prefix = action === 'h1' ? '# ' : '## ';
        const lineStart = val.lastIndexOf('\n', start - 1) + 1;
        const prependNL = (lineStart < start && val.slice(lineStart, start).trim() !== '') ? '\n\n' : '';
        rep = `${prependNL}${prefix}${sel}`; 
        cur = start + rep.length;
        this.textarea.value = pre + rep + post;
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'highlight') {
        rep = `<mark>${innerSel}</mark>`; cur = trimmedStart + rep.length;
        this.textarea.value = val.slice(0, trimmedStart) + rep + val.slice(trimmedEnd);
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'color') {
        rep = `<span style="color:#f04438">${innerSel}</span>`; cur = trimmedStart + rep.length;
        this.textarea.value = val.slice(0, trimmedStart) + rep + val.slice(trimmedEnd);
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'points') {
        if (sel) {
          rep = sel.split('\n').map(l => `- ${l}`).join('\n');
        } else {
          const lineStart = val.lastIndexOf('\n', start - 1) + 1;
          const prependNL = (lineStart < start && val.slice(lineStart, start).trim() !== '') ? '\n' : '';
          rep = prependNL + '- ';
        }
        cur = start + rep.length;
        this.textarea.value = pre + rep + post;
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'code') {
        rep = `\`${innerSel}\``; cur = trimmedStart + rep.length;
        this.textarea.value = val.slice(0, trimmedStart) + rep + val.slice(trimmedEnd);
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'font-dec') {
        this._fontSize = Math.max(this._minFont, this._fontSize - 1);
        this._applyFontSize();
        this.textarea.focus();
        return;
      } else if (action === 'font-inc') {
        this._fontSize = Math.min(this._maxFont, this._fontSize + 1);
        this._applyFontSize();
        this.textarea.focus();
        return;
      }

      this._emit();
      this.updatePreview();
      this.adjustHeight();
      this.textarea.focus();
  }

  setEditMode(isEditing) {
    this.isEditing = isEditing;
    if (this.isEditing) {
      this.textarea.classList.add('editing');
      this.preview.classList.remove('visible');
      setTimeout(() => { 
        this.adjustHeight();
        this.textarea.focus(); 
      }, 50);
    } else {
      this.textarea.classList.remove('editing');
      this.preview.classList.add('visible');
      this.updatePreview();
    }
    this.dispatchEvent(new CustomEvent('mode-change', {
      detail: { isEditing },
      bubbles: true,
      composed: true
    }));
  }

  toggleEditMode() {
    this.setEditMode(!this.isEditing);
  }

  adjustHeight() {
    this.textarea.style.height = 'auto';
    this.textarea.style.height = (this.textarea.scrollHeight) + 'px';
  }

  _applyFontSize() {
    const fs = this._fontSize + 'px';
    this.textarea.style.fontSize = fs;
    this.preview.style.fontSize = fs;
    this.adjustHeight();
  }

  updatePreview() {
    const val = this.textarea.value;
    if (val.trim() && typeof marked !== 'undefined') {
      this.preview.innerHTML = marked.parse(val);
    } else if (val.trim()) {
      // marked not loaded yet — show plain text
      this.preview.textContent = val;
    } else {
      this.preview.innerHTML = '<span style="color:#6a6a6a; font-style:italic;">No notes yet. Click the edit icon to add notes.</span>';
    }
  }

  _emit() {
    this.dispatchEvent(new CustomEvent('note-change', {
      detail: { value: this.textarea.value },
      bubbles: true,
      composed: true
    }));
  }

  get value() { return this.textarea.value; }
  set value(v) { this.textarea.value = v; this.updatePreview(); }

  focusEditor() {
    // Small delay to let layout settle
    setTimeout(() => this.textarea.focus(), 30);
  }
}

customElements.define('markdown-editor', MarkdownEditor);
