import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Ticket, TrendingUp, Zap, Terminal, X, Monitor,
    Mail, Phone, FileText, User, Tag, Code2, ArrowUpRight,
    Swords, ExternalLink
} from 'lucide-react';

const App = () => {
    const constraintsRef = useRef(null);
    const [openWindows, setOpenWindows] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [resizingId, setResizingId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 網格大小設定 (例如 100x100 像素一個單位)
    const gridSize = 100;

    // 終端機狀態
    const [terminalInput, setTerminalInput] = useState('');
    const [terminalHistory, setTerminalHistory] = useState([
        'DevOS(R) Kernel Version 1.0.4 initialized.',
        'Ready for input. Type "help" for commands.'
    ]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // --- 資料定義 (嚴格保留) ---
    const topLeftProjects = [
        {
            id: "ticket-manager",
            name: "TicketManager",
            fullName: "票券管理系統 (LINE Bot)",
            icon: Ticket,
            gradient: "from-emerald-400 to-teal-500",
            tags: ["Line Bot", "生活", "自動化", "票券", "優惠券"],
            description: "這是一款與 Gemini 協作開發的專案。基於 LINE 通訊軟體的票券管理系統，旨在解決數位票券雜亂且易過期問題。",
            features: ["自動化到期提醒：推播通知", "OCR 辨識：快速輸入", "資料庫同步", "快速新增各類票券", "使用記錄追蹤"],
            tech: ["Google Sheet", "Google Apps Script", "LINE API", "Gemini AI"],
            qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://line.me/ti/p/~@714rwsvb",
            botUrl: { label: "加入 LINE 好友", url: "https://line.me/ti/p/~@714rwsvb" },
            messages: [
                { type: 'bot', text: '您好！我是您的票券管家。' },
                { type: 'bot', text: '提醒您：您的「星巴克買一送一券」將在 3 天後到期！' },
                { type: 'user', text: '幫我查詢所有未使用的票券' },
                { type: 'bot', text: '查詢中... 目前共有 3 張未使用票券。' }
            ]
        },
        {
            id: "ai-investor",
            name: "AI Investor",
            fullName: "AI 投資助手 (Telegram Bot)",
            icon: TrendingUp,
            gradient: "from-blue-400 to-indigo-500",
            tags: ["Telegram Bot", "Gemini AI", "投資助手", "台股", "美股", "加密貨幣"],
            description: "與 Gemini 協作開發，整合 Telegram 介面的投資輔助工具。利用 AI 進行市場情緒分析與即時報價。",
            features: ["AI 智能投資建議", "即時市場數據分析", "風險評估報告", "投資組合追蹤"],
            tech: ["Python", "Telegram API", "Gemini AI"],
            qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/@k_invest999_bot",
            botUrl: { label: "開啟 Telegram Bot", url: "https://t.me/k_invest999_bot" },
            messages: [
                { type: 'user', text: '分析 NVDA 的技術指標' },
                { type: 'bot', text: '正在串接市場數據...' },
                { type: 'bot', text: '根據 RSI 與 MACD 顯示，目前處於超買區，建議注意回檔風險。' }
            ],
            hasChart: true
        },
        {
            id: "ai-interviewer",
            name: "BattleInterview",
            fullName: "AI 戰鬥面試官 (Web App)",
            icon: Swords,
            gradient: "from-red-500 to-orange-600",
            tags: ["Web App", "Gemini AI", "面試模擬", "反作弊", "多語言"],
            description: "與 Gemini 協作開發的高壓模擬面試系統，支援 HR 行為面試與技術深度拷問雙階段。具備反作弊偵測（視窗切換、複製貼上、壓力倒數），面試結束後自動生成評分報告。",
            features: [
                "雙階段面試：HR (STAR) + 技術深度拷問",
                "8 種程式語言技術面試支援",
                "反作弊系統：視窗切換偵測 / 貼上偵測 / 60秒限時",
                "AI 自動評分與詳細回饋報告",
                "面試紀錄自動儲存至 Google Sheets"
            ],
            tech: ["Cloudflare Pages", "Google Apps Script", "Gemini AI", "Vanilla JS"],
            isWebApp: true,
            webAppUrl: "https://battle-interview.pages.dev/",
            purchaseUrl: "https://portaly.cc/career.advanture/product/KYYe2hZYNIQabN7Wa82r",
            messages: [
                { type: 'bot', text: '請描述一個你在團隊中解決衝突的經歷。', sender: 'HR面試官' },
                { type: 'user', text: '在上一份工作中，我曾遇到團隊成員對技術方案有分歧...' },
                { type: 'bot', text: '你提到了「分歧」，但沒有說明具體的衝突點。請用 STAR 原則重新回答。', sender: 'HR面試官' },
                { type: 'bot', text: '⚠️ 偵測到視窗切換，已記錄。', sender: '系統' }
            ]
        }
    ];

    const bottomRightProjects = [
        { id: "terminal", name: "Terminal", fullName: "系統終端機", icon: Terminal, gradient: "from-gray-700 to-gray-900", isTerminal: true },
        {
            id: "readme",
            name: "readme.txt",
            fullName: "我的學經歷 (README)",
            icon: FileText,
            gradient: "from-amber-200 to-yellow-500",
            isTextFile: true,
            content: {
                title: "SYSTEM_MANIFESTO: Professional_Profile",
                bio: "🚀 專注於 AI 自動化與高效能後端的實戰派開發者。具備多維度的產業視角，擅長將複雜業務需求轉化為直覺、自動化的技術解決方案。",

                // 強調工作經驗與轉職後的技術沉澱
                experience: [
                    "🔹 Current: Backend Developer (JAVA)",
                    "   - 主力研發高效能後端架構，確保系統穩定性與擴展性。",
                    "   - 導入 AI 工具優化開發流程，提升代碼生產力 30% 以上。",
                    "🔹 Diverse Background: Entrepreneur / Sales / HR",
                    "   - 曾任桌遊店老闆與業務，具備強大的產品思維與市場敏感度。",
                    "   - HR 經歷強化了對組織流程的理解，轉化為開發時對業務邏輯的精確掌控。"
                ],

                // 強調具體成就（目前以你現有的專案為主）
                achievements: [
                    "🏆 AI 投資助手：串接 Gemini API 實現 24/7 市場情緒自動化分析，降低投資者 50% 的資訊過濾時間。",
                    "🏆 票券管理系統：利用 LINE Bot + GAS 解決數位資產過期痛點，實現零延遲 OCR 辨識自動輸入。",
                    "🏆 AI 戰鬥面試官：整合 Gemini API 打造雙階段面試模擬，搭配反作弊偵測系統，完整自動評分與回饋。",
                    "🏆 技術整合：成功將分散的 Google 生態系工具（Sheet/Apps Script）與主流 AI 介面達成無縫對齊。"
                ],

                links: [
                    { label: "🌐 個人資訊與技能樹", url: "https://supergalen.com/guild/kevin.html" },
                    { label: "🧵 作者 Threads", url: "https://www.threads.net/@supergalen0921" }
                ],

                footer: ">> Status: Ready to build the future. Contact for collaboration."
            }
        },
        {
            id: "contact",
            name: "Contact Me",
            fullName: "聯絡我",
            icon: User,
            gradient: "from-pink-400 to-rose-500",
            isContact: true,
            info: { phone: "09XX-XXX-XXX", email: "k120575@gmail.com" }
        }
    ];

    const allProjects = [...topLeftProjects, ...bottomRightProjects];

    // --- 視窗管理邏輯 (保持不變) ---
    const openWindow = (p) => {
        if (!openWindows.find(w => w.id === p.id)) {
            const maxZ = openWindows.length > 0 ? Math.max(...openWindows.map(w => w.zIndex)) : 10;
            const mobile = window.innerWidth <= 768;
            setOpenWindows([...openWindows, {
                ...p, zIndex: maxZ + 1,
                width: mobile ? window.innerWidth : (p.isTextFile ? 420 : 750),
                height: mobile ? (window.innerHeight - 32 - 64) : (p.isTextFile ? 520 : 480)
            }]);
        } else { focusWindow(p.id); }
    };

    const closeWindow = (id) => setOpenWindows(openWindows.filter(w => w.id !== id));
    const focusWindow = (id) => {
        setOpenWindows(prev => {
            const maxZ = Math.max(...prev.map(w => w.zIndex), 10);
            return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
        });
    };

    const handleResize = (id, e) => {
        e.preventDefault(); e.stopPropagation();
        setResizingId(id);
        const startX = e.clientX, startY = e.clientY;
        const win = openWindows.find(w => w.id === id);
        const startWidth = win.width, startHeight = win.height;
        const onMouseMove = (m) => {
            window.requestAnimationFrame(() => {
                setOpenWindows(prev => prev.map(w => w.id === id ? {
                    ...w, width: Math.max(400, startWidth + (m.clientX - startX)), height: Math.max(300, startHeight + (m.clientY - startY))
                } : w));
            });
        };
        const onMouseUp = () => { setResizingId(null); document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleTerminalCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.trim().toLowerCase();
            let response = `Command not found: ${cmd}`;
            if (cmd === 'help') response = 'Available commands: help, clear, whoami, ls';
            if (cmd === 'clear') { setTerminalHistory([]); setTerminalInput(''); return; }
            if (cmd === 'whoami') response = 'Backend Developer / AI Automation Specialist';
            if (cmd === 'ls') response = 'projects/  about/  contact.info  README.txt';
            setTerminalHistory([...terminalHistory, `user@devos:~$ ${terminalInput}`, response]);
            setTerminalInput('');
        }
    };

    const StockChart = () => {
        const pathData = "M0,45 L15,42 L30,44 L45,30 L60,35 L75,15 L90,20 L100,5";
        const areaPathData = `${pathData} L100,50 L0,50 Z`;
        const volumes = [
            { h: 12, c: "#ef4444" }, { h: 18, c: "#ef4444" }, { h: 8, c: "#22c55e" },
            { h: 15, c: "#ef4444" }, { h: 22, c: "#ef4444" }, { h: 10, c: "#22c55e" },
            { h: 28, c: "#ef4444" }, { h: 20, c: "#ef4444" }, { h: 14, c: "#22c55e" },
            { h: 32, c: "#ef4444" }
        ];

        return (
            <div className="mt-4 bg-black/40 p-4 rounded-xl border border-red-500/10 h-40 relative overflow-hidden">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="stockGradientRed" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {volumes.map((v, i) => (<rect key={i} x={i * 10 + 1} y={50 - v.h} width="6" height={v.h} fill={v.c} fillOpacity="0.5" />))}
                    <path d={areaPathData} fill="url(#stockGradientRed)" />
                    <path d={pathData} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="absolute top-2 left-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-red-400 font-mono bg-red-950/40 px-2 py-0.5 rounded-full border border-red-500/30 flex items-center gap-1">
                            <TrendingUp size={10} /> BULLISH TREND
                        </span>
                        <span className="text-[9px] text-red-500 font-bold flex items-center gap-0.5">+4.12% <ArrowUpRight size={10} /></span>
                    </div>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ef444405_1px,transparent_1px),linear-gradient(to_bottom,#ef444405_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
        );
    };

    return (
        <div ref={constraintsRef} className="h-screen bg-[#020617] bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden flex flex-col font-sans select-none text-slate-200">
            {/* Top Bar */}
            <div className="h-8 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 flex justify-between items-center z-[999] text-[11px]">
                <div className="font-black text-indigo-400 tracking-widest uppercase flex items-center gap-2">
                    <Monitor size={14} /> DevOS Kernel v1.0.4
                </div>
                <div className="font-mono opacity-80">{currentTime.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>

            <div className="flex-1 relative p-6">
                {/* 左上角圖示區 - 修改拖拽邏輯 */}
                <div className={`absolute top-6 left-6 flex flex-col ${isMobile ? 'gap-4' : 'gap-6'}`}>
                    {topLeftProjects.map((p) => (
                        <motion.div
                            key={p.id}
                            drag={!resizingId}
                            dragConstraints={constraintsRef}
                            dragElastic={0}           // 禁止超出邊界的彈性
                            dragMomentum={false}      // 核心：移除放手後的滑動感
                            dragTransition={{ power: 0, timeConstant: 0 }} // 確保完全沒有殘餘慣性
                            onDragEnd={(event, info) => {
                                // 此處邏輯可擴展用於儲存位置，Framer Motion 會自動處理渲染
                            }}
                            {...(isMobile ? { onClick: () => openWindow(p) } : { onDoubleClick: () => openWindow(p) })}
                            className="flex flex-col items-center gap-1 cursor-pointer"
                            style={{ width: 85 }}
                        >
                            <div className={`bg-gradient-to-br ${p.gradient} p-4 rounded-2xl shadow-xl ring-1 ring-white/20 hover:scale-110 transition-transform`}>
                                <p.icon className="text-white" size={32} />
                            </div>
                            <span className="text-[10px] font-bold text-center bg-black/40 px-2 rounded-full leading-5 w-full truncate">{p.name}</span>
                        </motion.div>
                    ))}
                </div>

                {/* 右下角圖示區 - 修改拖拽邏輯 */}
                <div className={`absolute right-6 flex flex-col ${isMobile ? 'gap-4 bottom-20' : 'gap-6 bottom-24'}`}>
                    {bottomRightProjects.map((p) => (
                        <motion.div
                            key={p.id}
                            drag={!resizingId}
                            dragConstraints={constraintsRef}
                            dragElastic={0}
                            dragMomentum={false}
                            {...(isMobile ? { onClick: () => openWindow(p) } : { onDoubleClick: () => openWindow(p) })}
                            className="flex flex-col items-center gap-1 cursor-pointer"
                            style={{ width: 85 }}
                        >
                            <div className={`bg-gradient-to-br ${p.gradient} p-4 rounded-2xl shadow-xl ring-1 ring-white/20 hover:scale-110 transition-transform`}>
                                <p.icon className="text-white" size={32} />
                            </div>
                            <span className="text-[10px] font-bold text-center bg-black/40 px-2 rounded-full leading-5 w-full truncate">{p.name}</span>
                        </motion.div>
                    ))}
                </div>

                {/* 視窗引擎 */}
                <AnimatePresence>
                    {openWindows.map(win => (
                        <motion.div key={win.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} drag={!isMobile && resizingId !== win.id} dragHandleClassName="window-header" dragConstraints={constraintsRef} dragMomentum={false} onMouseDown={() => focusWindow(win.id)} className={`absolute bg-slate-900/95 backdrop-blur-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col pointer-events-auto ${isMobile ? 'rounded-none inset-0' : 'rounded-2xl'}`}
                            style={{ zIndex: win.zIndex, ...(isMobile ? { width: '100%', height: 'calc(100vh - 32px - 64px)' } : { width: win.width, height: win.height, top: '15%', left: '25%' }) }}>

                            <div className={`window-header h-12 bg-gradient-to-r ${win.gradient} px-5 flex justify-between items-center cursor-grab active:cursor-grabbing shrink-0`}>
                                <div className="flex items-center gap-3 text-white text-[13px] font-bold tracking-widest uppercase">
                                    <win.icon size={18} /> {win.fullName || win.name}
                                </div>
                                <button onClick={() => closeWindow(win.id)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className={`flex-1 overflow-hidden relative ${isMobile ? 'flex flex-col overflow-y-auto' : 'flex'}`}>
                                {win.isTerminal ? (
                                    <div className="flex-1 bg-black/90 p-4 font-mono text-xs text-green-400 overflow-y-auto">
                                        {terminalHistory.map((line, i) => <div key={i} className="mb-1 leading-relaxed">{line}</div>)}
                                        <div className="flex items-center gap-2">
                                            <span className="text-indigo-400 font-bold font-mono">user@devos:~$</span>
                                            <input autoFocus className="bg-transparent outline-none border-none p-0 text-green-400 flex-1 font-mono" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} onKeyDown={handleTerminalCommand} />
                                        </div>
                                    </div>
                                ) : win.isTextFile ? (
                                    <div className="flex-1 bg-white p-8 font-mono text-slate-800 text-xs overflow-y-auto leading-relaxed">
                                        <div className="border-b-2 border-indigo-600 pb-3 mb-6">
                                            <div className="text-xl font-black text-indigo-950 uppercase tracking-tighter">KEVIN_PROFILE.manifesto</div>
                                            <div className="text-[9px] text-slate-400 font-bold mt-1">LAST_UPDATE: {new Date().toLocaleDateString()}</div>
                                        </div>

                                        <div className="space-y-6">
                                            <section>
                                                <h5 className="font-bold text-indigo-600 mb-2">// 個人簡介</h5>
                                                <p className="pl-4 border-l-2 border-slate-200 text-slate-600 italic leading-relaxed">
                                                    {win.content.bio}
                                                </p>
                                            </section>

                                            <section>
                                                <h5 className="font-bold text-indigo-600 mb-2">// 專業成就 & 經歷</h5>
                                                <ul className="space-y-3">
                                                    {win.content.experience.map((exp, i) => (
                                                        <li key={i} className="pl-2">{exp}</li>
                                                    ))}
                                                    {win.content.achievements.map((ach, i) => (
                                                        <li key={i} className="pl-2 text-indigo-900 font-bold font-sans">{ach}</li>
                                                    ))}
                                                </ul>
                                            </section>

                                            <section>
                                                <h5 className="font-bold text-indigo-600 mb-2">// 外部鏈結 (EXTERNAL_LINKS)</h5>
                                                <div className="flex flex-col gap-2">
                                                    {win.content.links.map((link, i) => (
                                                        <a
                                                            key={i}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 hover:underline transition-all"
                                                        >
                                                            <ArrowUpRight size={14} /> {link.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>

                                        <div className="mt-12 pt-4 border-t border-slate-100 text-[9px] text-slate-400 text-right font-bold tracking-widest uppercase">
                                            {win.content.footer}
                                        </div>
                                    </div>
                                ) : win.isContact ? (
                                    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
                                        <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 w-full max-w-sm"><Phone className="text-pink-400" size={24} /><div><div className="text-[10px] opacity-40 uppercase">Mobile</div><div className="font-mono text-lg">{win.info.phone}</div></div></div>
                                        <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 w-full max-w-sm"><Mail className="text-rose-400" size={24} /><div><div className="text-[10px] opacity-40 uppercase">Email</div><div className="font-mono text-lg">{win.info.email}</div></div></div>
                                    </div>
                                ) : win.isWebApp ? (
                                    <>
                                        <div className={`bg-black/40 flex flex-col border-white/10 ${isMobile ? 'w-full border-b p-4 shrink-0' : 'w-[42%] border-r min-w-[240px] p-5'}`}>
                                            <div className={`bg-slate-950/80 rounded-2xl p-4 overflow-y-auto flex flex-col gap-3 scrollbar-hide ${isMobile ? 'max-h-[200px]' : 'flex-1'}`}>
                                                {win.messages?.map((m, i) => (
                                                    <div key={i} className="flex flex-col gap-1">
                                                        {m.sender && (
                                                            <span className={`text-[9px] font-bold uppercase tracking-wider ${m.sender === '系統' ? 'text-yellow-400' : 'text-slate-500'}`}>
                                                                {m.sender}
                                                            </span>
                                                        )}
                                                        <div className={`max-w-[90%] p-3 rounded-2xl text-[12px] ${m.sender === '系統'
                                                            ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-300'
                                                            : m.type === 'bot'
                                                                ? 'bg-slate-800 text-slate-200'
                                                                : 'bg-indigo-600 self-end text-white'
                                                            }`}>
                                                            {m.text}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={`flex gap-2 ${isMobile ? 'mt-3' : 'mt-5 flex-col'}`}>
                                                <a
                                                    href={win.webAppUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-red-500/25 ${isMobile ? 'py-2.5 px-4 text-xs flex-1' : 'py-3 px-6 text-sm'}`}
                                                >
                                                    <ExternalLink size={16} /> 前往體驗
                                                </a>
                                                {win.purchaseUrl && (
                                                    <a
                                                        href={win.purchaseUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 hover:text-white font-bold rounded-2xl transition-all duration-300 ${isMobile ? 'py-2.5 px-4 text-xs flex-1' : 'py-3 px-6 text-sm'}`}
                                                    >
                                                        <Tag size={14} /> 購買授權碼
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className={`flex-1 overflow-y-auto scrollbar-hide ${isMobile ? 'p-4' : 'p-8'}`}>
                                            <div className="flex gap-2 mb-4 flex-wrap">
                                                {win.tags?.map(t => <span key={t} className="px-2 py-0.5 bg-white/10 rounded-full text-[9px] font-bold text-white/60"><Tag size={8} className="inline mr-1" />{t}</span>)}
                                            </div>
                                            <h4 className="text-indigo-400 font-black mb-3 uppercase text-[10px] tracking-widest flex items-center gap-2"><Code2 size={14} /> Description</h4>
                                            <p className="text-slate-300 text-[12px] leading-relaxed mb-6">{win.description}</p>

                                            <h4 className="text-emerald-400 font-black mt-6 mb-3 uppercase text-[10px] tracking-widest">Key Features</h4>
                                            <ul className="space-y-2">
                                                {win.features?.map((f, i) => <li key={i} className="text-[11px] text-slate-300 flex items-start gap-2">
                                                    <Zap size={10} className="mt-1 text-emerald-400 shrink-0" /> {f}
                                                </li>)}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={`bg-black/40 flex flex-col border-white/10 ${isMobile ? 'w-full border-b p-4 shrink-0' : 'w-[42%] border-r min-w-[240px] p-5'}`}>
                                            <div className={`bg-slate-950/80 rounded-2xl p-4 overflow-y-auto flex flex-col gap-4 scrollbar-hide ${isMobile ? 'max-h-[180px]' : 'flex-1'}`}>
                                                {win.messages?.map((m, i) => (
                                                    <div key={i} className={`max-w-[90%] p-3 rounded-2xl text-[12px] ${m.type === 'bot' ? 'bg-slate-800 text-slate-200' : 'bg-indigo-600 self-end text-white'}`}>
                                                        {m.text}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={`flex items-center bg-white/5 rounded-2xl border border-white/10 ${isMobile ? 'mt-3 py-2 px-3 gap-3' : 'mt-5 py-4 flex-col'}`}>
                                                <img src={win.qrCode} alt="QR" className={`bg-white p-1 rounded shadow-lg ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`} />
                                                <div className={`flex flex-col ${isMobile ? 'gap-1' : 'items-center'}`}>
                                                    <span className={`opacity-40 font-bold uppercase tracking-widest ${isMobile ? 'text-[11px]' : 'text-[14px] mt-2'}`}>請掃描</span>
                                                    {win.botUrl && (
                                                        <a
                                                            href={win.botUrl.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 hover:underline transition-colors ${isMobile ? 'text-[11px]' : 'text-[12px] mt-2'}`}
                                                        >
                                                            <ExternalLink size={12} /> {win.botUrl.label}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`flex-1 overflow-y-auto scrollbar-hide ${isMobile ? 'p-4' : 'p-8'}`}>
                                            <div className="flex gap-2 mb-4">
                                                {win.tags?.map(t => <span key={t} className="px-2 py-0.5 bg-white/10 rounded-full text-[9px] font-bold text-white/60"><Tag size={8} className="inline mr-1" />{t}</span>)}
                                            </div>
                                            <h4 className="text-indigo-400 font-black mb-3 uppercase text-[10px] tracking-widest flex items-center gap-2"><Code2 size={14} /> Description</h4>
                                            <p className="text-slate-300 text-[12px] leading-relaxed mb-6">{win.description}</p>

                                            {win.hasChart && (
                                                <div className="mb-6">
                                                    <h4 className="text-red-400 font-black mb-2 uppercase text-[10px] tracking-widest flex items-center gap-2"><TrendingUp size={14} /> Live Market Analysis</h4>
                                                    <StockChart />
                                                </div>
                                            )}

                                            <h4 className="text-emerald-400 font-black mt-6 mb-3 uppercase text-[10px] tracking-widest">Key Features</h4>
                                            <ul className="space-y-2">
                                                {win.features?.map((f, i) => <li key={i} className="text-[11px] text-slate-300 flex items-start gap-2">
                                                    <Zap size={10} className="mt-1 text-emerald-400 shrink-0" /> {f}
                                                </li>)}
                                            </ul>
                                        </div>
                                    </>
                                )}
                                {!isMobile && <div className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize z-[2000]" onMouseDown={(e) => handleResize(win.id, e)} />}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Dock Bar */}
            <div className="h-16 flex justify-center items-end pb-3 z-[1000]">
                <div className={`bg-white/5 backdrop-blur-3xl border border-white/20 py-2 rounded-2xl flex ${isMobile ? 'px-2 gap-2' : 'px-4 gap-4'}`}>
                    {allProjects.map(p => (
                        <div key={p.id} onClick={() => openWindow(p)} className="relative group cursor-pointer transition-transform hover:-translate-y-2">
                            <div className={`bg-gradient-to-br ${p.gradient} p-2.5 rounded-xl shadow-lg`}>
                                <p.icon className="text-white" size={24} />
                            </div>
                            {openWindows.find(w => w.id === p.id) && <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full left-1/2 -translate-x-1/2" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;