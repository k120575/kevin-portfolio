import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ticket, TrendingUp, Zap, Terminal, X, Monitor,
  CheckCircle2, Mail, Phone, FileText, User, Tag,
  Code2, Info
} from 'lucide-react';

const App = () => {
  const constraintsRef = useRef(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [resizingId, setResizingId] = useState(null);
  const [terminalInput, setTerminalInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- 資料定義 ---
  const topLeftProjects = [
    {
      id: "ticket-manager",
      name: "TicketManager",
      fullName: "票券管理系統 (LINE Bot)",
      icon: Ticket,
      gradient: "from-emerald-400 to-teal-500",
      tags: ["Line Bot", "生活", "自動化"],
      description: "這是一款與 Gemini 協作開發的專案。基於 LINE 通訊軟體的票券管理系統，旨在解決數位票券雜亂且易過期問題。",
      features: [
        "自動化到期提醒：推播通知",
        "OCR 辨識：快速輸入",
        "資料庫同步",
        "快速新增各類票券",
        "使用記錄追蹤"
      ],
      tech: [
        "Google Sheet",
        "Google Apps Script",
        "LINE API"
      ],
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://line.me/ti/p/~@714rwsvb",
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
      tags: ["Telegram Bot", "Gemini AI", "投資助手"],
      description: "與 Gemini 協作開發，整合 Telegram 介面的投資輔助工具。利用 AI 進行市場情緒分析與即時報價。",
      features: [
        "AI 智能投資建議",
        "即時市場數據分析",
        "風險評估報告",
        "投資組合追蹤"
      ],
      tech: ["Python", "Telegram API", "Gemini AI"],
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/@k_invest999_bot",
      messages: [
        { type: 'user', text: '分析 NVDA 的技術指標' },
        { type: 'bot', text: '正在串接市場數據...' },
        { type: 'bot', text: '根據 RSI 與 MACD 顯示，目前處於超買區，建議注意回檔風險。' }
      ],
      hasChart: true
    }
  ];

  const bottomRightProjects = [
    {
      id: "readme",
      name: "readme.txt",
      fullName: "我的學經歷 (README)",
      icon: FileText,
      gradient: "from-amber-200 to-yellow-500",
      isTextFile: true,
      content: {
        edu: "🎓 學歷：大學",
        exp: "💼 經歷：曾擔任過老師、業務員、桌遊店老闆、HR等，現職Backend Developer，主要語言是JAVA",
        bio: "致力於透過 AI 提升開發效率。"
      }
    },
    {
      id: "contact",
      name: "Contact Me",
      fullName: "聯絡我",
      icon: User,
      gradient: "from-pink-400 to-rose-500",
      isContact: true,
      info: { phone: "0911-XXX-XXX", email: "k120575@gmail.com" }
    }
  ];

  const allProjects = [...topLeftProjects, ...bottomRightProjects];

  // --- 邏輯函數 ---
  const openWindow = (p) => {
    if (!openWindows.find(w => w.id === p.id)) {
      const maxZ = openWindows.length > 0 ? Math.max(...openWindows.map(w => w.zIndex)) : 10;
      setOpenWindows([...openWindows, { ...p, zIndex: maxZ + 1, width: p.isTextFile ? 420 : 750, height: p.isTextFile ? 520 : 480 }]);
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
          ...w, width: Math.max(380, startWidth + (m.clientX - startX)), height: Math.max(300, startHeight + (m.clientY - startY))
        } : w));
      });
    };
    const onMouseUp = () => { setResizingId(null); document.removeEventListener('mousemove', onMouseMove); document.removeEventListener('mouseup', onMouseUp); };
    document.addEventListener('mousemove', onMouseMove); document.addEventListener('mouseup', onMouseUp);
  };

  // --- 組件渲染 ---
  const DynamicChart = () => (
      <div className="mt-4 bg-black/40 p-4 rounded-xl border border-white/5 h-32 relative flex items-end gap-1">
        {[40, 70, 45, 90, 65, 80, 95, 100].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", delay: i * 0.1 }} className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-300 rounded-t-sm" />
        ))}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] text-cyan-400 font-mono bg-black/80 px-2 rounded-full border border-cyan-500/30 tracking-widest animate-pulse">AI ANALYZING...</span>
        </div>
      </div>
  );

  return (
      <div ref={constraintsRef} className="h-screen bg-[#020617] bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center relative overflow-hidden flex flex-col font-sans select-none text-slate-200">

        {/* Top Bar */}
        <div className="h-8 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 flex justify-between items-center z-[999] text-[11px]">
          <div className="font-black text-indigo-400 tracking-widest uppercase flex items-center gap-2"><Monitor size={14}/> DevOS Kernel v1.0.4</div>
          <div className="font-mono opacity-80">{currentTime.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
        </div>

        <div className="flex-1 relative p-6">

          {/* --- 左上角圖示區（含裝飾背景） --- */}
          <div className="absolute top-8 left-8 p-3 rounded-3xl bg-indigo-500/5 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col gap-6 group">
            <div className="absolute -left-2 top-8 h-12 w-1 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
            <div className="px-2 text-[9px] font-black text-indigo-400/50 uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180 self-center mb-2">Projects</div>
            {topLeftProjects.map((p) => (
                <motion.div key={p.id} drag={!resizingId} dragConstraints={constraintsRef} onDoubleClick={() => openWindow(p)} className="flex flex-col items-center gap-1 cursor-pointer" style={{ width: 85 }}>
                  <div className={`bg-gradient-to-br ${p.gradient} p-4 rounded-2xl shadow-xl ring-1 ring-white/20 hover:scale-110 transition-transform active:scale-95`}><p.icon className="text-white" size={32} /></div>
                  <span className="text-[10px] font-bold text-center bg-black/60 px-2 rounded-full leading-5 w-full truncate border border-white/5">{p.name}</span>
                </motion.div>
            ))}
          </div>

          {/* --- 右下角圖示區（含裝飾背景） --- */}
          <div className="absolute bottom-28 right-8 p-3 rounded-3xl bg-amber-500/5 backdrop-blur-md border border-white/10 shadow-2xl flex flex-col gap-6 group">
            <div className="absolute -right-2 bottom-8 h-12 w-1 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]" />
            <div className="px-2 text-[9px] font-black text-amber-400/50 uppercase tracking-[0.2em] [writing-mode:vertical-lr] self-center mb-2">About</div>
            {bottomRightProjects.map((p) => (
                <motion.div key={p.id} drag={!resizingId} dragConstraints={constraintsRef} onDoubleClick={() => openWindow(p)} className="flex flex-col items-center gap-1 cursor-pointer" style={{ width: 85 }}>
                  <div className={`bg-gradient-to-br ${p.gradient} p-4 rounded-2xl shadow-xl ring-1 ring-white/20 hover:scale-110 transition-transform active:scale-95`}><p.icon className="text-white" size={32} /></div>
                  <span className="text-[10px] font-bold text-center bg-black/60 px-2 rounded-full leading-5 w-full truncate border border-white/5">{p.name}</span>
                </motion.div>
            ))}
          </div>

          {/* --- 視窗引擎 --- */}
          <AnimatePresence>
            {openWindows.map(win => (
                <motion.div key={win.id} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} drag={resizingId !== win.id} dragHandleClassName="window-header" dragConstraints={constraintsRef} dragMomentum={false} onMouseDown={() => focusWindow(win.id)} className="absolute bg-slate-900/95 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto" style={{ zIndex: win.zIndex, width: win.width, height: win.height, top: '12%', left: '22%' }}>

                  <div className={`window-header h-12 bg-gradient-to-r ${win.gradient} px-5 flex justify-between items-center cursor-grab active:cursor-grabbing shrink-0`}>
                    <div className="flex items-center gap-3 text-white text-[13px] font-black tracking-tighter uppercase"><win.icon size={18}/> {win.fullName || win.name}</div>
                    <button onClick={() => closeWindow(win.id)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full text-white transition-colors"><X size={18}/></button>
                  </div>

                  <div className="flex-1 flex overflow-hidden relative">
                    {win.isTextFile ? (
                        <div className="flex-1 bg-slate-50 p-8 font-mono text-slate-800 text-sm overflow-y-auto leading-relaxed">
                          <div className="border-b-4 border-amber-500/20 pb-4 mb-6"><div className="text-amber-600 font-black text-xl">README.txt</div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">System User Profile</div></div>
                          <div className="space-y-6">
                            <section>
                              <h5 className="text-amber-700 font-black border-l-4 border-amber-500 pl-3 mb-2">EDUCATION</h5>
                              <p>{win.content.edu}</p>
                            </section>
                            <section>
                              <h5 className="text-amber-700 font-black border-l-4 border-amber-500 pl-3 mb-2">EXPERIENCE</h5>
                              <p>{win.content.exp}</p>
                            </section>
                            <section className="bg-amber-100 p-4 rounded-lg italic text-slate-600 border border-amber-200">
                              {win.content.bio}
                            </section>
                          </div>
                        </div>
                    ) : win.isContact ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 bg-slate-900/50">
                          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-5 bg-white/5 p-5 rounded-2xl border border-white/10 w-full max-w-sm shadow-xl">
                            <div className="p-3 bg-pink-500/20 rounded-xl"><Phone className="text-pink-400" size={24}/></div>
                            <div><div className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1">Mobile</div><div className="font-mono text-lg text-white">{win.info.phone}</div></div>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-5 bg-white/5 p-5 rounded-2xl border border-white/10 w-full max-w-sm shadow-xl">
                            <div className="p-3 bg-rose-500/20 rounded-xl"><Mail className="text-rose-400" size={24}/></div>
                            <div><div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Email</div><div className="font-mono text-lg text-white">{win.info.email}</div></div>
                          </motion.div>
                        </div>
                    ) : (
                        <>
                          <div className="w-[42%] bg-black/40 p-5 flex flex-col border-r border-white/10 min-w-[240px]">
                            <div className="flex-1 bg-slate-950/80 rounded-2xl p-4 overflow-y-auto flex flex-col gap-4 scrollbar-hide border border-white/5">
                              {win.messages?.map((m, i) => (
                                  <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-[12px] shadow-lg ${m.type === 'bot' ? 'bg-slate-800 text-slate-200 rounded-bl-none' : 'bg-indigo-600 self-end text-white rounded-br-none'}`}>
                                    {m.text}
                                  </div>
                              ))}
                            </div>
                            <div className="mt-5 flex flex-col items-center bg-white/5 rounded-2xl py-4 border border-white/10 group">
                              <img src={win.qrCode} alt="QR" className="w-20 h-20 bg-white p-1 rounded-lg shadow-2xl group-hover:scale-110 transition-transform" />
                              <span className="text-[10px] mt-3 opacity-40 uppercase font-black tracking-[0.2em]">Live Demo Scan</span>
                            </div>
                          </div>

                          <div className="flex-1 p-8 overflow-y-auto scrollbar-hide bg-slate-900/20">
                            <div className="flex gap-2 mb-6">
                              {win.tags?.map(t => (
                                  <span key={t} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/50 uppercase tracking-tighter hover:bg-white/10 transition-colors">
                              <Tag size={10} className="text-indigo-400"/> {t}
                            </span>
                              ))}
                            </div>
                            <h4 className="text-indigo-400 font-black mb-3 uppercase text-[11px] tracking-widest flex items-center gap-2"><Code2 size={14}/> Project Description</h4>
                            <p className="text-slate-300 text-[13px] leading-relaxed mb-8 font-medium">{win.description}</p>

                            {win.hasChart && (
                                <div className="mb-8">
                                  <h4 className="text-cyan-400 font-black mb-3 uppercase text-[11px] tracking-widest flex items-center gap-2"><TrendingUp size={14}/> AI Market Analysis</h4>
                                  <DynamicChart />
                                </div>
                            )}

                            <h4 className="text-emerald-400 font-black mb-4 uppercase text-[11px] tracking-widest flex items-center gap-2"><Zap size={14}/> Core Features</h4>
                            <ul className="grid grid-cols-1 gap-3">
                              {win.features?.map((f, i) => (
                                  <li key={i} className="text-[12px] text-slate-300 flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5 group hover:border-emerald-500/30 transition-colors">
                                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-400 shrink-0"/> <span>{f}</span>
                                  </li>
                              ))}
                            </ul>
                          </div>
                        </>
                    )}
                    {/* 縮放手柄 */}
                    <div className="absolute bottom-0 right-0 w-10 h-10 cursor-nwse-resize z-[2000] flex items-end justify-end p-2 group" onMouseDown={(e) => handleResize(win.id, e)}>
                      <div className="w-4 h-4 border-r-2 border-b-2 border-white/20 group-hover:border-white/60 transition-colors rounded-br-sm" />
                    </div>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dock Bar */}
        <div className="h-20 flex justify-center items-end pb-4 z-[1000]">
          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 px-5 py-3 rounded-[2rem] flex gap-5 items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            {allProjects.map(p => {
              const isOpen = openWindows.find(w => w.id === p.id);
              return (
                  <div key={p.id} onClick={() => openWindow(p)} className="relative group cursor-pointer transition-all hover:-translate-y-4">
                    <div className={`bg-gradient-to-br ${p.gradient} p-3 rounded-2xl shadow-xl ring-1 ring-white/20`}><p.icon className="text-white" size={26} /></div>
                    {isOpen && <div className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full left-1/2 -translate-x-1/2 shadow-[0_0_8px_#fff]" />}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg text-[10px] text-white font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 shadow-2xl pointer-events-none">
                      {p.name}
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default App;