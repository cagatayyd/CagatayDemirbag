const initTerminal = function() {
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');

  if (!terminalOutput || !terminalInput || !terminalBody) return;

  const history = [];
  let historyIndex = -1;

  // Escape HTML for safety
  function escHtml(unsafe) {
    return (unsafe || '').toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Strip Turkish characters if any slip through
  function toAscii(str) {
    return (str || '').toString()
      .replace(/ç/g, 'c').replace(/Ç/g, 'C')
      .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
      .replace(/ı/g, 'i').replace(/İ/g, 'I')
      .replace(/ö/g, 'o').replace(/Ö/g, 'O')
      .replace(/ş/g, 's').replace(/Ş/g, 'S')
      .replace(/ü/g, 'u').replace(/Ü/g, 'U');
  }

  function addLine(htmlContent, className = 'cmd-output') {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = htmlContent;
    terminalOutput.appendChild(div);
    scrollToBottom();
  }

  function addEmpty() {
    addLine('&nbsp;');
  }

  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  const bootSeq = [
    'Booting RetroOS v2.0...',
    'Loading system memory... OK (640K)',
    'Initializing modules...',
    'Loading UI graphics... OK',
    'Mounting file system... OK',
    'Starting CMD engine...'
  ];

  let bootIndex = 0;
  function runBootSequence() {
    if (bootIndex < bootSeq.length) {
      addLine(bootSeq[bootIndex], 'cmd-dim');
      bootIndex++;
      setTimeout(runBootSequence, 100 + Math.random() * 200);
    } else {
      setTimeout(() => {
        addEmpty();
        addLine('<span class="term-hl">Welcome!</span> Type <span class="term-hl">help</span> to get started.', 'cmd-success');
        addEmpty();
      }, 300);
    }
  }

  setTimeout(runBootSequence, 300);

  // Define commands (100% English, no Turkish characters)
  const COMMANDS = {
    help: function() {
      addEmpty();
      addLine('<span class="term-hl">Available commands:</span>', 'cmd-header');
      addEmpty();
      const cmds = [
        ['about',    'Shows information about me'],
        ['whoami',   'Tells you who I am'],
        ['projects', 'Lists my projects'],
        ['skills',   'Displays my skills'],
        ['contact',  'Shows contact info'],
        ['open',     'Opens a window (e.g. open projects)'],
        ['cd',       'Enters a folder or opens a file (e.g. cd skills/)'],
        ['ls / dir', 'Lists files'],
        ['date',     'Shows current date and time'],
        ['neofetch', 'System information'],
        ['matrix',   '[+] Matrix mode'],
        ['clear',    'Clears the terminal'],
        ['exit',     'Closes terminal'],
      ];
      cmds.forEach(([cmd, desc]) => {
        addLine(
          `<span class="term-hl" style="display:inline-block;width:110px">${escHtml(cmd)}</span>` +
          `<span class="term-dim">-- ${escHtml(desc)}</span>`,
          'cmd-output'
        );
      });
      addEmpty();
    },

    about: function() {
      addEmpty();
      addLine('About Me:', 'cmd-header');
      addEmpty();
      addLine('&gt; Name    : Cagatay Demirbag');
      addLine('&gt; Title   : Software Developer &amp; DevOps Engineer');
      addLine('&gt; School  : Karabuk University, Computer Engineering');
      addLine('&gt; Location: Turkey');
      addEmpty();
      addLine('Expertise: C#, .NET, ASP.NET, SQL, Linux,');
      addLine('           RabbitMQ, Elasticsearch, DevOps');
      addEmpty();
    },

    whoami: function() {
      addEmpty();
      addLine('<span class="term-hl">cagatay_demirbag</span>');
      addLine('<span class="term-dim">// Software Developer &amp; DevOps Engineer</span>');
      addEmpty();
    },

    projects: function() {
      addEmpty();
      addLine('Listing projects...', 'cmd-info');
      addEmpty();
      const projects = (typeof SITE_DATA !== 'undefined') ? SITE_DATA.projects : [];
      if (projects.length === 0) {
        addLine('No projects found.', 'cmd-warn');
      } else {
        projects.forEach((p, i) => {
          const descText = toAscii(p.descEn || p.desc || '').split('.')[0];
          addLine(
            `<span class="term-hl">${i + 1}. ${escHtml(toAscii(p.name))}</span>` +
            `<span class="term-dim"> -- ${escHtml(descText)}</span>`
          );
        });
      }
      addEmpty();
      addLine('<span class="term-dim">For all projects: open projects</span>', 'cmd-info');
      addEmpty();
    },

    skills: function() {
      addEmpty();
      addLine('Skills:', 'cmd-header');
      addEmpty();
      const skillGroups = (typeof SITE_DATA !== 'undefined') ? SITE_DATA.skills : [];
      skillGroups.forEach(group => {
        addLine(`[ ${escHtml(toAscii(group.category))} ]`, 'cmd-warn');
        const names = group.items.map(s => escHtml(toAscii(typeof s === 'string' ? s : s.name))).join('  |  ');
        addLine(`  &gt; <span class="term-hl">${names}</span>`);
        addEmpty();
      });
    },

    contact: function() {
      addEmpty();
      addLine('Contact Channels:', 'cmd-header');
      addEmpty();
      addLine('&gt; Email:   cagatayydemirbag@hotmail.com');
      addLine('&gt; GitHub:  github.com/cagatayyd');
      addLine('&gt; Tel:     +90 545 253 58 00');
      addEmpty();
    },

    open: function(args) {
      this.cd(args);
    },

    // cd command - opens folder/file popups and PDFs
    cd: function(args) {
      const raw = toAscii(args[0] || '');
      const target = raw
        .toLowerCase()
        .replace(/\.txt$/, '')
        .replace(/\/$/, '')
        .replace(/\.bin$/, '')
        .replace(/\.exe$/, '');

      const aliases = {
        about:       'about',
        hakkimda:    'about',
        projects:    'projects',
        project:     'projects',
        projeler:    'projects',
        skills:      'skills',
        skill:       'skills',
        yetenekler:  'skills',
        contact:     'contact',
        iletisim:    'contact',
        recycle:     'recycle',
        geridonusum: 'recycle',
        terminal:    'terminal',
        cmd:         'terminal'
      };

      if (!raw || raw === '..' || raw === '\\') {
        addLine('C:\\Portfolio', 'cmd-output');
        return;
      }

      if (raw.toLowerCase() === 'cv-tr.pdf' || raw.toLowerCase() === 'cv-en.pdf') {
        const pdfName = raw.toLowerCase() === 'cv-tr.pdf' ? 'CV-tr.pdf' : 'CV-en.pdf';
        addLine(`<span class="term-dim">C:\\Portfolio\\${escHtml(pdfName)}</span>`, 'cmd-output');
        addLine(`Opening ${escHtml(pdfName)}...`, 'cmd-success');
        setTimeout(() => window.open('assets/' + pdfName, '_blank'), 150);
        return;
      }

      const resolved = aliases[target] || aliases[target.replace(/\s/g, '')];
      if (resolved) {
        addLine(`<span class="term-dim">C:\\Portfolio\\${escHtml(raw)}</span>`, 'cmd-output');
        addLine(`Opening: <span class="term-hl">${escHtml(raw)}</span>...`, 'cmd-success');
        setTimeout(() => openWindow(resolved), 150);
      } else {
        addLine(
          `The system cannot find the path specified: '<span class="term-hl">${escHtml(raw)}</span>'`,
          'cmd-error'
        );
      }
    },

    date: function() {
      addEmpty();
      const now = new Date();
      addLine('Current date/time:');
      addLine(`<span class="term-hl">${escHtml(now.toUTCString())}</span>`);
      addEmpty();
    },

    neofetch: function() {
      addEmpty();
      const osIcon = `
<span style="color:var(--amber-bright)">
      :::       
   :::   :::    
  :::     :::   
 :::       :::  
  :::     :::   
   :::   :::    
      :::       
</span>`;

      const lines = osIcon.split('\n');
      const info = [
        '<span class="term-hl">cagatay</span>@<span class="term-hl">portfolio</span>',
        '-------------------',
        'OS: RetroOS v2.0',
        'Host: HTML5 / CSS3 / JS',
        'Kernel: Vanilla DOM',
        'Uptime: Since page load',
        'Shell: Custom CMD',
        'Resolution: ' + window.innerWidth + 'x' + window.innerHeight,
        'Theme: Amber Monochrome',
        'Font: VT323 & Courier'
      ];

      for (let i = 0; i < Math.max(lines.length, info.length); i++) {
        const left = (lines[i] || '                  ').padEnd(20, ' ');
        const right = info[i] || '';
        addLine(`<span style="display:flex;gap:16px;"><span>${left}</span><span>${right}</span></span>`);
      }
      addEmpty();
    },

    matrix: function() {
      addLine('Entering the Matrix...', 'cmd-success');
      setTimeout(() => {
        document.body.style.filter = 'hue-rotate(100deg)';
        setTimeout(() => document.body.style.filter = '', 5000);
      }, 500);
    },

    clear: function() {
      terminalOutput.innerHTML = '';
    },

    exit: function() {
      addLine('Terminating session...', 'cmd-warn');
      setTimeout(() => closeWindow('terminal'), 500);
    },

    ls: function() {
      this.dir();
    },

    dir: function() {
      addEmpty();
      addLine('Directory of C:\\Portfolio');
      addEmpty();
      addLine('2025-01-10  10:00 AM    &lt;DIR&gt;          projects');
      addLine('2025-01-10  10:01 AM    &lt;DIR&gt;          skills');
      addLine('2025-01-10  10:02 AM    &lt;DIR&gt;          contact');
      addLine('2025-01-15  08:15 AM               245 about.txt');
      addLine('2025-01-15  09:00 AM    &lt;DIR&gt;          recycle.bin');
      addLine('2025-01-15  09:05 AM            10,240 CV-en.pdf');
      addLine('2025-01-15  09:05 AM            10,240 CV-tr.pdf');
      addEmpty();
      addLine('               3 File(s)          20,725 bytes');
      addLine('               4 Dir(s)      20,480,000 bytes free');
      addEmpty();
    }
  };

  // Execute command
  function executeCommand(rawCmd) {
    const trimmed = toAscii(rawCmd.trim());
    if (!trimmed) return;

    addLine(`<span class="term-prompt">C:\\&gt;</span> ${escHtml(trimmed)}`);

    history.push(trimmed);
    historyIndex = history.length;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args);
    } else {
      addLine(
        `'${escHtml(cmd)}' is not recognized as an internal or external command.`,
        'cmd-error'
      );
    }
  }

  // Input events
  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const val = this.value;
      this.value = '';
      executeCommand(val);
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        this.value = history[historyIndex];
      }
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        this.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        this.value = '';
      }
    }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const current = toAscii(this.value.toLowerCase());
      const allAliases = Object.keys(COMMANDS).concat([
        'about.txt', 'projects', 'skills', 'contact', 'recycle.bin',
        'hakkimda.txt', 'projeler', 'yetenekler', 'iletisim', 'geridonusum.bin',
        'CV-tr.pdf', 'CV-en.pdf'
      ]);

      const lastPart = current.split(/\s+/).pop();
      const match = allAliases.find(c => c.toLowerCase().startsWith(lastPart));

      if (match) {
        const parts = this.value.split(/\s+/);
        parts.pop();
        this.value = (parts.length > 0 ? parts.join(' ') + ' ' : '') + match;
      }
    }
  });

  // Initial focus
  terminalInput.focus();
};

document.addEventListener('DOMContentLoaded', initTerminal);
