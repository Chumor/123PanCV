// ==UserScript==
// @name         123Pan CV
// @name:zh-CN   123云盘 CV
// @namespace    https://github.com/Chumor/123PanCV
// @version      1.0.250828.17
// @description  A lightweight Tampermonkey userscript for 123Pan. Automatically saves and manages extraction codes, displays them in a table, supports one-click copy, import/export, and Tampermonkey cloud sync. File/folder names are clickable to open share links.
// @description:zh-CN  一个适用于 123云盘 的轻量级 Tampermonkey 用户脚本：自动保存提取码，表格化管理，一键复制，支持导入/导出与 Tampermonkey 云同步，文件/文件夹名可点击跳转到分享链接。
// @author       Chumor
// @license      MIT
// @homepage     https://github.com/Chumor/123PanCV
// @supportURL   https://scriptcat.org/zh-CN/script-show-page/4094/issue
// @updateURL    https://scriptcat.org/zh-CN/script/4094.user.js
// @downloadURL  https://scriptcat.org/zh-CN/script/4094.user.js
// @match        *://*.123pan.com/*
// @match        *://123pan.com/*
// @match        *://*.123684.com/*
// @match        *://123684.com/*
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const STORAGE_KEY = 'PanCV_Data';

  /** ========== 数据操作 ========== **/
  function loadData() {
    const raw = GM_getValue(STORAGE_KEY, "[]");
    return JSON.parse(raw);
  }

  function saveData(data) {
    GM_setValue(STORAGE_KEY, JSON.stringify(data));
  }

  function addRecord(name, code) {
    code = code.replace(/^["']|["']$/g, '');
    const shareKey = localStorage.getItem("shareKey")?.replace(/^"|"$/g, "");
    const domain = location.hostname;
    const shareUrl = (shareKey && shareKey !== "undefined")
      ? `https://${domain}/s/${shareKey}`
      : location.href;

    let data = loadData();

    // ⚡ 确保同一个 URL 只保存一个提取码
    const existing = data.find(d => d.url === shareUrl);
    if (existing) {
      existing.name = name;
      existing.code = code;
    } else {
      data.push({ name, code, url: shareUrl });
    }

    saveData(data);
    console.log('[PanCV] ✅ 保存:', name, code, shareUrl);
  }

  /** ========== 提取码 & 文件名查找 ========== **/
  function findCodes() {
    const out = new Set();

    ["SharePwd", "sharePwd", "share_code", "pwd"].forEach(k => {
      const v = localStorage.getItem(k) || sessionStorage.getItem(k);
      if (v) out.add(v.replace(/^["']|["']$/g, ''));
    });

    document.cookie.split(';').forEach(c => {
      const kv = c.trim().split('=');
      if (kv.length === 2 && /^[A-Za-z0-9]{4}$/.test(kv[1])) {
        out.add(kv[1]);
      }
    });

    document.querySelectorAll('input').forEach(el => {
      const v = (el.value || '').trim();
      if (/^[A-Za-z0-9]{4}$/.test(v)) out.add(v);
    });

    return [...out];
  }

  function findFileNames() {
    const names = new Set();

    document.querySelectorAll('a,div,span,li,p').forEach(el => {
      const t = (el.innerText || '').trim();
      if (t && !/^分享文件/.test(t) && t.length < 200) {
        if (
          /\.(txt|zip|rar|7z|mp4|mkv|avi|mp3|flac|jpg|jpeg|png|gif|pdf|docx?|xlsx?|pptx?)$/i.test(t) ||
          el.style.whiteSpace === "nowrap"
        ) {
          names.add(t);
        }
      }
    });

    return [...names];
  }

  /** ========== 保存逻辑 ========== **/
  function trySave() {
    const codes = findCodes();
    let files = findFileNames();

    if (!files.length && codes.length) files = ["未知文件"];

    if (codes.length && files.length) {
      files.forEach(f => codes.forEach(c => addRecord(f, c)));
    }
  }

  /** ========== UI ========== **/
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
            <th style="padding:8px 10px;width:70%;">文件/文件夹名</th>
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
                <td style="border-bottom:1px solid #f0f0f0;padding:8px 10px;cursor:pointer;color:#007bff;">
                  ${d.code}
                </td>
              </tr>
            `
                ).join('')
              : `<tr><td colspan="2" style="padding:10px;text-align:center;color:#999;">暂无记录</td></tr>`
          }
        </tbody>
      </table>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#panCV-close').onclick = () => overlay.remove();

    overlay.querySelectorAll('td:nth-child(2)').forEach(td => {
      td.addEventListener('click', () => {
        GM_setClipboard(td.innerText.trim());
        td.style.color = 'green';
        setTimeout(() => (td.style.color = '#007bff'), 600);
      });
    });
  }

  function exportData() {
    const data = loadData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '123PanCV-export.json';
    a.click();
  }

  function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const imported = JSON.parse(e.target.result);
          if (Array.isArray(imported)) {
            const current = loadData();
            // ⚡ 合并去重：同 URL 覆盖
            imported.forEach(r => {
              const exist = current.find(d => d.url === r.url);
              if (exist) {
                exist.name = r.name;
                exist.code = r.code;
              } else {
                current.push(r);
              }
            });
            saveData(current);
            alert('导入成功！');
          }
        } catch (err) {
          alert('导入失败：' + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function clearData() {
    if (confirm('确定要清空所有记录吗？')) {
      saveData([]);
      alert('已清空');
    }
  }

  GM_registerMenuCommand('📑 查看提取码记录', showTable);
  GM_registerMenuCommand('💾 导出提取码记录', exportData);
  GM_registerMenuCommand('📥 导入提取码记录', importData);
  GM_registerMenuCommand('🗑️ 清空提取码记录', clearData);

  setInterval(trySave, 3000);
})();