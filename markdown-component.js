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
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 0;
        }

        /* ── Formatting toolbar (slide-in) ── */
        .formatting-toolbar {
          display: flex;
          align-items: center;
          gap: 3px;
          background: #000000;
          border: 1px solid rgba(255,255,255,0.08);
          border-bottom: none;
          border-radius: 10px 10px 0 0;
          padding: 5px 8px;
          overflow: hidden;
          /* Hidden by default via clip + opacity */
          max-height: 0;
          opacity: 0;
          pointer-events: none;
          transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease;
          padding-top: 0;
          padding-bottom: 0;
        }
        .formatting-toolbar.visible {
          max-height: 48px;
          opacity: 1;
          pointer-events: auto;
          padding-top: 5px;
          padding-bottom: 5px;
        }
        .formatting-toolbar button {
          background: transparent;
          border: none;
          color: #c5d6f8;
          cursor: pointer;
          border-radius: 5px;
          padding: 4px 9px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .formatting-toolbar button:hover {
          background: rgba(138, 180, 248, 0.15);
          color: #8ab4f8;
        }
        .formatting-toolbar .sep {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
          margin: 0 2px;
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
          /* Transition: fade + border-color */
          transition: opacity 0.2s ease, border-color 0.2s;
          opacity: 0;
          /* Keep in flow but invisible until editing */
          pointer-events: none;
          height: 0;
          min-height: 0;
          padding-top: 0;
          padding-bottom: 0;
          border-width: 0;
        }
        .notes-textarea.editing {
          border-radius: 0 0 10px 10px;
          opacity: 1;
          pointer-events: auto;
          min-height: 86px;
          height: auto;
          padding-top: 10px;
          padding-bottom: 10px;
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
          /* Fade transition */
          transition: opacity 0.2s ease;
          opacity: 0;
          pointer-events: none;
          height: 0;
          min-height: 0;
          padding-top: 0;
          padding-bottom: 0;
          border-width: 0;
        }
        .notes-md-render.visible {
          opacity: 1;
          pointer-events: auto;
          min-height: 86px;
          height: auto;
          padding-top: 10px;
          padding-bottom: 10px;
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
          .formatting-toolbar button {
            padding: 4px 6px;
            font-size: 11px;
          }
          .notes-textarea, .notes-md-render {
            font-size: 14px;
            padding: 10px 12px;
          }
        }
      </style>
      <div class="notes-md-wrap">
        <div class="notes-md-render"></div>
        <div class="formatting-toolbar">
          <button type="button" data-action="bold"      title="Bold (Ctrl+B)"><b>B</b></button>
          <button type="button" data-action="h1"        title="Heading">H1</button>
          <button type="button" data-action="h2"        title="Sub-heading">H2</button>
          <div class="sep"></div>
          <button type="button" data-action="highlight" title="Highlight">Hl</button>
          <button type="button" data-action="color"     title="Red color">🔴</button>
          <div class="sep"></div>
          <button type="button" data-action="points"    title="Bullet list">• List</button>
          <button type="button" data-action="code"      title="Inline code">&lt;/&gt;</button>
          <div class="sep"></div>
          <button type="button" data-action="font-dec"  title="Decrease font size" class="font-dec-btn"><b>A-</b></button>
          <button type="button" data-action="font-inc"  title="Increase font size" class="font-inc-btn"><b>A+</b></button>
        </div>
        <textarea class="notes-textarea" placeholder="Your notes… (Markdown supported · Ctrl+Enter to save)"></textarea>
      </div>
    `;

    this.textarea = this.shadowRoot.querySelector('.notes-textarea');
    this.preview  = this.shadowRoot.querySelector('.notes-md-render');
    this.toolbar  = this.shadowRoot.querySelector('.formatting-toolbar');
    this._fontSize = 13; // default px
    this._minFont  = 11;
    this._maxFont  = 18;

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

    // Wire up toolbar buttons
    this.toolbar.addEventListener('mousedown', e => e.preventDefault());

    this.toolbar.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      const start  = this.textarea.selectionStart;
      const end    = this.textarea.selectionEnd;
      const val    = this.textarea.value;
      const sel    = val.slice(start, end);
      let   rep    = sel;
      let   cur    = start;

      if (action === 'bold') {
        const wrapped = `**${sel}**`;
        const unwrap  = start >= 2 && val.slice(start-2,start)==='**' && val.slice(end,end+2)==='**';
        if (unwrap) {
          this.textarea.value = val.slice(0,start-2) + sel + val.slice(end+2);
          this.textarea.selectionStart = start - 2;
          this.textarea.selectionEnd   = end   - 2;
        } else {
          rep = wrapped; cur = start + 2 + sel.length;
          this.textarea.value = val.slice(0,start) + rep + val.slice(end);
          this.textarea.selectionStart = start + 2;
          this.textarea.selectionEnd   = end   + 2;
        }
      } else if (action === 'h1') {
        rep = `# ${sel}`; cur = start + rep.length;
        this.textarea.value = val.slice(0,start) + rep + val.slice(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'h2') {
        rep = `## ${sel}`; cur = start + rep.length;
        this.textarea.value = val.slice(0,start) + rep + val.slice(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'highlight') {
        rep = `<mark>${sel}</mark>`; cur = start + rep.length;
        this.textarea.value = val.slice(0,start) + rep + val.slice(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'color') {
        rep = `<span style="color:#f04438">${sel}</span>`; cur = start + rep.length;
        this.textarea.value = val.slice(0,start) + rep + val.slice(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'points') {
        if (sel) {
          rep = sel.split('\n').map(l => `- ${l}`).join('\n');
        } else {
          rep = '- ';
        }
        cur = start + rep.length;
        this.textarea.value = val.slice(0,start) + rep + val.slice(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = cur;
      } else if (action === 'code') {
        rep = `\`${sel}\``; cur = start + rep.length;
        this.textarea.value = val.slice(0,start) + rep + val.slice(end);
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
    });

    this.textarea.addEventListener('input', () => {
      this._emit();
      this.updatePreview();
      this.adjustHeight();
    });

    this.textarea.addEventListener('keydown', e => {
      // Ctrl+Enter → save (view mode)
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.setEditMode(false);
        return;
      }
      // Ctrl+B → bold
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end   = this.textarea.selectionEnd;
        const val   = this.textarea.value;
        const sel   = val.slice(start, end);
        const bBefore = start >= 2 && val.slice(start-2, start) === '**';
        const bAfter  = end + 2 <= val.length && val.slice(end, end+2) === '**';
        if (bBefore && bAfter) {
          this.textarea.value = val.slice(0, start-2) + sel + val.slice(end+2);
          this.textarea.selectionStart = start - 2;
          this.textarea.selectionEnd   = start - 2 + sel.length;
        } else {
          this.textarea.value = val.slice(0, start) + '**' + sel + '**' + val.slice(end);
          this.textarea.selectionStart = start + 2;
          this.textarea.selectionEnd   = end   + 2;
        }
        this.textarea.dispatchEvent(new Event('input'));
      }
      // Auto-continue bullet lists on Enter
      if (e.key === 'Enter') {
        const pos       = this.textarea.selectionStart;
        const val       = this.textarea.value;
        const lineStart = val.lastIndexOf('\n', pos - 1) + 1;
        const curLine   = val.slice(lineStart, pos);
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

    // Click-outside → switch to view mode but KEEP notes panel open
    // The notes panel closing is handled by the parent template.html
    this._onDocumentMouseDown = e => {
      if (!this.isEditing) return;
      // If click is inside this component, do nothing
      if (this.contains(e.target)) return;
      // If click is on the edit button, do nothing (let the button handler deal with it)
      if (e.target.closest && e.target.closest('.tab-edit-md-btn')) return;
      // Otherwise switch to view mode only (don't close the panel)
      this.setEditMode(false);
    };
    document.addEventListener('mousedown', this._onDocumentMouseDown);

    // Now set initial mode (toolbar must already be in DOM above)
    this.setEditMode(!initialValue.trim());
  }

  disconnectedCallback() {
    if (this._onDocumentMouseDown) {
      document.removeEventListener('mousedown', this._onDocumentMouseDown);
    }
  }

  setEditMode(isEditing) {
    this.isEditing = isEditing;
    if (isEditing) {
      // Show textarea, hide preview — both via CSS class transitions
      this.preview.classList.remove('visible');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { // double-rAF ensures layout computed first
          this.toolbar.classList.add('visible');
          this.textarea.classList.add('editing');
          this.adjustHeight();
          this.focusEditor();
        });
      });
    } else {
      // Slide toolbar away, fade textarea out
      this.toolbar.classList.remove('visible');
      this.textarea.classList.remove('editing');
      // Reset inline height so CSS height:0 (from removing .editing) takes over
      this.textarea.style.height = '';
      // Update preview content while textarea is still visible
      this.updatePreview();
      // Fade preview in
      requestAnimationFrame(() => {
        this.preview.classList.add('visible');
      });
      // textarea fades out via CSS (opacity:0, height:0 when .editing removed)
      // No display manipulation needed — CSS handles it cleanly
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
    this.preview.style.fontSize  = fs;
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
