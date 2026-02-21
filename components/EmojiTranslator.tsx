'use client'

import { useState, useEffect } from 'react'
import { ArrowRightLeft, Sparkles, MessageSquare, Ghost, Copy, Check, Info, Lock, Unlock } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Bảng mã 256 Emoji đại diện cho 256 giá trị byte (0-255)
const EMOJI_MAP = [
  "😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","🥰","😗","😙","😚","☺️","🙂","🤗","🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","🥱","😴","😌","😛","😜","😝","🤤","😒","😓","😔","😕","🙃","🤑","😲","☹️","🙁","😖","😞","😟","😤","😢","😭","😦","😧","😨","😩","🤯","😬","😰","😱","🥵","🥶","😳","🤪","😵","🥴","😠","😡","🤬","😷","🤒","🤕","🤢","🤮","🤧","😇","🥳","🥺","🤠","🤡","🤥","🤫","🤭","🧐","🤓","😈","👿","👹","👺","💀","👻","👽","🤖","💩","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🙈","🙉","🙊","💋","💌","💘","💝","💖","💗","💓","💞","💕","💟","❣️","💔","❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💯","💢","💥","💫","💦","💨","🕳️","💣","💬","👁️‍🗨️","🗨️","🗯️","💭","💤","👋","🤚","🖐️","✋","🖖","👌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦵","🦿","🦶","👂","🦻","👃","🧠","🦷","🦴","👀","👁️","👅","👄","👶","🧒","👦","👧","🧑","👱","👨","🧔","👩","🧓","👴","👵","🙍","🙎","🙅","🙆","💁","🙋","🧏","🙇","🤦","🤷","👮","🕵️","💂","👷","🤴","👸","👳","👲","🧕","🤵","👰","🤰","🤱","👼","🎅","🤶","🦸","🦹","🧙","🧚","🧛","🧜","🧝","🧞","🧟","💆","💇","🚶","🏃","🕺","💃","🕴️","👯","🧖","🧗"
];

// Hàm mã hóa văn bản thành Emoji
const encodeToEmoji = (text: string): string => {
  try {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    return Array.from(bytes)
      .map(byte => EMOJI_MAP[byte] || "❓")
      .join("");
  } catch (e) {
    return "Lỗi mã hóa!";
  }
};

// Hàm giải mã Emoji thành văn bản
const decodeFromEmoji = (emojiStr: string): string => {
  try {
    const bytes: number[] = [];
    const emojiToByte = new Map(EMOJI_MAP.map((e, i) => [e, i]));
    
    // Sắp xếp emoji theo độ dài giảm dần để khớp các emoji phức tạp trước (tránh khớp nhầm phần đầu)
    const sortedEmojis = [...EMOJI_MAP].sort((a, b) => b.length - a.length);
    // Tạo pattern regex từ các emoji trong map
    const pattern = sortedEmojis.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(pattern, 'g');
    
    let match;
    while ((match = regex.exec(emojiStr)) !== null) {
      const byte = emojiToByte.get(match[0]);
      if (byte !== undefined) {
        bytes.push(byte);
      }
    }

    if (bytes.length === 0) return "";

    const decoder = new TextDecoder('utf-8', { fatal: false });
    const decoded = decoder.decode(new Uint8Array(bytes));
    
    // Kiểm tra nếu kết quả chứa ký tự lỗi, có thể do chuỗi emoji bị thiếu
    if (decoded.includes('\uFFFD')) {
      return decoded.replace(/\uFFFD/g, '') + " (⚠️ Cảnh báo: Chuỗi emoji có thể bị thiếu hoặc sai định dạng)";
    }
    
    return decoded;
  } catch (e) {
    return "Không thể giải mã chuỗi này!";
  }
};

type Mode = 'encode' | 'decode'

export default function EmojiTranslator() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<Mode>('encode')
  const [copied, setCopied] = useState(false)

  // Tính toán kết quả trực tiếp trong quá trình render (Deriving state)
  const output = input.trim() 
    ? (mode === 'encode' ? encodeToEmoji(input) : decodeFromEmoji(input))
    : ''

  const toggleMode = () => {
    setMode(prev => prev === 'encode' ? 'decode' : 'encode')
    setInput(output) 
  }

  const copyToClipboard = () => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(output)
  } else {
    const el = document.createElement('textarea')
    el.value = output
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  setCopied(true)
  setTimeout(() => setCopied(false), 2000)
}

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-4 tracking-tight">
          Mật mã <span className="text-orange-500 italic">Tình Bạn</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Hệ thống mã hóa Emoji chính xác 100%. Bảo mật tuyệt đối giữa những người bạn.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              {mode === 'encode' ? <Unlock size={14} /> : <Lock size={14} />}
              {mode === 'encode' ? 'Văn bản gốc' : 'Mật mã Emoji'}
            </label>
          </div>
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? "Nhập lời nhắn bí mật..." : "Dán mật mã emoji vào đây..."}
              className="w-full h-64 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none text-lg"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex md:flex-col items-center justify-center gap-4 py-4">
          <button
            onClick={toggleMode}
            className="p-4 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full transition-all shadow-sm active:scale-90"
            title="Đổi chế độ"
          >
            <ArrowRightLeft className={cn("transition-transform duration-500", mode === 'decode' && "rotate-180")} />
          </button>
          <div className="hidden md:block w-px h-12 bg-slate-200" />
          <div className="p-3 bg-slate-100 text-slate-400 rounded-full">
            <Sparkles size={20} />
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              {mode === 'encode' ? <Lock size={14} /> : <Unlock size={14} />}
              Kết quả giải mã
            </label>
            {output && (
              <button 
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1 text-xs font-medium"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Đã chép' : 'Sao chép'}
              </button>
            )}
          </div>
          <div className={cn(
            "w-full h-64 p-6 bg-slate-50 border border-slate-100 rounded-3xl overflow-auto text-lg flex items-center justify-center text-center transition-colors",
            mode === 'encode' ? "bg-orange-50/30 border-orange-100" : "bg-green-50/30 border-green-100",
            !output && "text-slate-300 italic"
          )}>
            <motion.div
              key={output}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "break-all",
                mode === 'encode' ? "text-3xl leading-relaxed" : "text-xl font-medium text-slate-800"
              )}
            >
              {output || "Kết quả sẽ xuất hiện tự động..."}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-20 p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tại sao lại là thuật toán này?</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Khác với AI (vốn mang tính xác suất), thuật toán này sử dụng <strong>Bảng mã 256 Emoji</strong> cố định. 
              Mỗi ký tự bạn nhập vào được chuyển thành một byte dữ liệu, và mỗi byte đó tương ứng với một Emoji duy nhất trong hệ thống.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-slate-500">
              <li className="flex items-center gap-2">✅ Khôi phục 100% văn bản gốc</li>
              <li className="flex items-center gap-2">✅ Không cần kết nối mạng</li>
              <li className="flex items-center gap-2">✅ Tốc độ dịch tức thời</li>
              <li className="flex items-center gap-2">✅ Bảo mật nội bộ nhóm bạn</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <footer className="mt-20 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Ngôn ngữ Tình Bạn • Developed by Phạm Gia Huy</p>
      </footer>
    </div>
  )
}
