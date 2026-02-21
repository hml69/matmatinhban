'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { CreditCard, ExternalLink, Heart, Coffee, Copy, Check } from 'lucide-react'

export default function DonatePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
  } else {
    // Fallback for HTTP / non-secure contexts
    const el = document.createElement('textarea')
    el.value = text
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  setCopiedField(field)
  setTimeout(() => setCopiedField(null), 2000)
}

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex p-4 bg-orange-100 text-orange-600 rounded-3xl mb-6">
          <Heart size={32} fill="currentColor" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
          Ủng hộ tác giả
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Nếu bạn thấy ứng dụng này thú vị, hãy mời mình một ly cà phê để mình có thêm động lực phát triển nhé!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bank Transfer */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <CreditCard size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Chuyển khoản ngân hàng</h2>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-square w-full max-w-[240px] mx-auto bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
              <Image 
                src="https://img.vietqr.io/image/BIDV-8892063216-qr_only.png"
                alt="BIDV QR Code"
                fill
                className="object-contain p-4"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3 bg-slate-50 p-6 rounded-3xl">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Chủ tài khoản</span>
                <button 
                  onClick={() => handleCopy('PHAM GIA HUY', 'name')}
                  className="flex items-center gap-2 font-bold text-slate-900 hover:text-orange-500 transition-colors group"
                >
                  PHAM GIA HUY
                  {copiedField === 'name' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-slate-300 group-hover:text-orange-500 transition-colors" />}
                </button>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Số tài khoản</span>
                <button 
                  onClick={() => handleCopy('8892063216', 'account')}
                  className="flex items-center gap-2 font-bold text-slate-900 font-mono hover:text-orange-500 transition-colors group"
                >
                  8892063216
                  {copiedField === 'account' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-slate-300 group-hover:text-orange-500 transition-colors" />}
                </button>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Ngân hàng</span>
                <span className="font-bold text-slate-900">BIDV</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PayPal */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Coffee size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">PayPal Me</h2>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
              <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.067 8.478c.492.88.556 2.014.307 3.292-.472 2.405-2.024 4.447-4.628 4.447h-1.587c-.579 0-1.085.383-1.239.941l-1.359 4.82c-.047.171-.208.285-.386.285h-3.204a.4.4 0 0 1-.383-.508l2.751-9.754a1.28 1.28 0 0 1 1.239-.941h2.285c1.1 0 1.84-.513 2.137-1.48.305-1 .064-1.798-.684-2.32-.49-.342-1.177-.514-2.043-.514H9.746a1.28 1.28 0 0 0-1.239.941L5.756 17.44a.4.4 0 0 1-.383.508H2.169a.4.4 0 0 1-.383-.508L5.751 3.508A1.28 1.28 0 0 1 6.99 2.567h6.257c1.55 0 2.856.31 3.824.916 1.307.818 2.12 2.147 2.996 4.995z"/>
              </svg>
            </div>
            
            <p className="text-slate-500">
              Dành cho bạn bè quốc tế hoặc nếu bạn muốn ủng hộ qua cổng thanh toán PayPal.
            </p>

            <a 
              href="https://www.paypal.me/phamgiahuy2008" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-3xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
            >
              Mở PayPal
              <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center"
      >
        <p className="text-slate-400 text-sm italic">
          &quot;Sự ủng hộ của bạn là nguồn động lực lớn nhất để mình tiếp tục sáng tạo.&quot;
        </p>
      </motion.div>
    </div>
  )
}
