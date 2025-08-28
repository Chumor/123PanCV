// ==UserScript==
// @name         123Pan CV
// @name:zh-CN   123云盘 CV
// @namespace    http://tampermonkey.net/
// @version      1.0.250828.12
// @description  123Pan Extract Code Manager: Save, view in table, copy with one click, import & export, support Tampermonkey cloud sync. File names clickable to open share link.
// @description:zh-CN  保存、表格查看、点击复制、导入导出，支持 Tampermonkey 云同步；文件名可点击跳转到分享链接。
// @author       Chumor
// @license      MIT
// @match        *://*.123pan.com/*
// @match        *://123pan.com/*
// @match        *://*.123684.com/*
// @match        *://123684.com/*
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'PanCV_Data';

  function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ✅ 修复 undefined 链接：优先 shareKey，否则退回当前页面
  function addRecord(name, code) {
    code = code.replace(/^["']|["']$/g, '');
    const shareKey = localStorage.getItem("shareKey")?.replace(/^"|"$/g, "");
    const domain = location.hostname;

    const shareUrl = (shareKey && shareKey !== "undefined")
      ? `https://${domain}/s/${shareKey}`
      : location.href;

    const data = loadData();
    if (!data.find(d => d.name === name && d.code === code)) {
      data.push({ name, code, url: shareUrl });
      saveData(data);
      console.log('[PanCV] ✅ 新记录:', name, code, shareUrl);
    }
  }

  function findCodes() {
    const out = new Set();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const val = localStorage.getItem(key);
      if (!val) continue;
      if (/pwd|code/i.test(key)) {
        out.add(val.replace(/^["']|["']$/g, ''));
      }
      if (/^[A-Za-z0-9]{4}$/.test(val)) {
        out.add(val.replace(/^["']|["']$/g, ''));
      }
    }
    document.cookie.split(';').forEach(c => {
      const kv = c.trim().split('=');
      if (kv.length === 2 && /^[A-Za-z0-9]{4}$/.test(kv[1])) {
        out.add(kv[1]);
      }
    });
    return [...out];
  }

  function findFileNames() {
    const names = new Set();
    document.querySelectorAll('a,div,span,li,p').forEach(el => {
      const t = (el.innerText || '').trim();
      if (
        t &&
        /\.(txt|zip|rar|7z|mp4|mkv|avi|mp3|flac|jpg|jpeg|png|gif|pdf|docx?|xlsx?|pptx?)$/i.test(t)
      ) {
        names.add(t);
      }
    });
    return [...names];
  }

  function trySave() {
    const codes = findCodes();
    const files = findFileNames();
    if (codes.length && files.length) {
      files.forEach(f => codes.forEach(c => addRecord(f, c)));
    }
  }

  function showTable() {
    const data = loadData();
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 10% 5% auto 5%; background: #fff;
      z-index: 999999; border-radius: 12px; border: 1px solid #ccc;
      box-shadow: 0 4px 16px rgba(0,0,0,.2); padding: 14px 18px;
      max-height: 80%; overflow: auto; font-size: 14px;
    `;
    overlay.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <h2 style="margin:0;font-size:16px;">📂 文件与提取码</h2>
        <button id="panCV-close" style="
          border:none;background:none;color:#666;
          font-size:18px;cursor:pointer;
        ">✖</button>
      </div>
      <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">
        <thead>
          <tr style="background:#fafafa;">
            <th style="padding:8px 10px;width:70%;">文件名</th>
            <th style="padding:8px 10px;width:30%;">提取码</th>
          </tr>
        </thead>
        <tbody>
          ${
            data.length
              ? data.map(
                  d => `
              <tr>
                <td style="border-bottom:1px solid #f0f0f0;padding:8px 10px;">
                  <a href="${d.url}" target="_blank" style="color:#333;text-decoration:none;">${d.name}</a>
                </td>
                <td style="border-bottom:1px solid #f0f0f0;padding:8px 10px;">
                  <button data-code="${d.code}" style="color:#06c;text-decoration:underline;border:none;background:none;cursor:pointer;">
                    ${d.code}
                  </button>
                </td>
              </tr>`
                ).join('')
              : `<tr><td colspan="2" style="padding:12px 10px;color:#888;">暂无记录</td></tr>`
          }
        </tbody>
      </table>
    `;
    document.body.appendChild(overlay);

    overlay.querySelectorAll('button[data-code]').forEach(btn => {
      btn.addEventListener('click', () => {
        GM_setClipboard(btn.dataset.code);
        alert('已复制提取码：' + btn.dataset.code);
      });
    });

    overlay.querySelector('#panCV-close').addEventListener('click', () => overlay.remove());
  }

  function exportData() {
    GM_setClipboard(JSON.stringify(loadData()));
    alert('已导出到剪贴板');
  }
  function importData() {
    const input = prompt('请粘贴导入的 JSON：');
    if (input) {
      try {
        saveData(JSON.parse(input));
        alert('导入成功！');
      } catch {
        alert('导入失败：无效的 JSON');
      }
    }
  }
  function clearData() {
    if (confirm('确定要清空所有提取码记录吗？')) {
      saveData([]);
      alert('已清空');
    }
  }

  GM_registerMenuCommand('📑 查看提取码记录', showTable);
  GM_registerMenuCommand('💾 导出提取码', exportData);
  GM_registerMenuCommand('📥 导入提取码', importData);
  GM_registerMenuCommand('🗑️ 清空所有记录', clearData);

  const observer = new MutationObserver(() => trySave());
  observer.observe(document.body, { childList: true, subtree: true });
  setInterval(() => trySave(), 2000);

  trySave();
})();