# ✨ Mật mã Tình Bạn (Emoji Cipher)

Một ứng dụng web thú vị giúp bạn mã hóa văn bản thành chuỗi Emoji và giải mã ngược lại với độ chính xác tuyệt đối 100%. Đây là cách hoàn hảo để gửi những tin nhắn "bí mật" cho bạn bè mà không ai có thể hiểu được nếu không có bộ giải mã này.

![Logo](https://picsum.photos/800/200?text=Mat+Ma+Tinh+Ban)

## 🚀 Tính năng nổi bật

- **Mã hóa chính xác 100%**: Sử dụng thuật toán mã hóa byte-to-emoji cố định, đảm bảo văn bản giải mã khớp hoàn toàn với bản gốc (bao gồm cả tiếng Việt có dấu).
- **Tốc độ tức thì**: Việc chuyển đổi diễn ra ngay khi bạn gõ phím, không cần chờ đợi phản hồi từ máy chủ.
- **Giao diện hiện đại**: Thiết kế tối giản, tinh tế với hiệu ứng chuyển động mượt mà từ thư viện `motion`.
- **Hỗ trợ PWA (Progressive Web App)**: Có thể cài đặt trực tiếp vào màn hình chính trên điện thoại (iOS/Android) và máy tính như một ứng dụng thực thụ.
- **Trang Donate tích hợp**: Hỗ trợ tác giả qua PayPal và ngân hàng BIDV (kèm mã QR và nút copy tiện lợi).
- **Responsive**: Hiển thị hoàn hảo trên mọi kích thước màn hình.

## 🛠️ Công nghệ sử dụng

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PWA**: Service Workers & Web Manifest

## 📖 Cách thức hoạt động

Ứng dụng không sử dụng AI để dịch thuật (nhằm tránh sai sót và sáng tạo quá mức). Thay vào đó, nó sử dụng một **Bảng mã 256 Emoji** cố định:
1. Văn bản gốc được chuyển thành mảng các byte (UTF-8).
2. Mỗi giá trị byte (0-255) sẽ tương ứng với một Emoji duy nhất trong bảng mã.
3. Khi giải mã, hệ thống sẽ khớp các Emoji và chuyển ngược lại thành byte để khôi phục văn bản.

## 📦 Cài đặt và Chạy thử

Nếu bạn muốn chạy dự án này trên môi trường local:

1. **Clone dự án**:
   ```bash
   git clone <url-cua-ban>
   cd mat-ma-tinh-ban
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Chạy môi trường phát triển**:
   ```bash
   npm run dev
   ```

4. **Truy cập**: Mở trình duyệt và vào `http://localhost:3000`

## 📂 Cấu trúc thư mục

- `/app`: Chứa các route chính (Trang chủ, Donate, Layout).
- `/components`: Các thành phần UI tái sử dụng (EmojiTranslator, Navigation, InstallPrompt).
- `/public`: Chứa manifest, service worker và các tài sản tĩnh.
- `/lib`: Các hàm tiện ích.

## ❤️ Ủng hộ tác giả

Nếu bạn yêu thích dự án này, hãy ủng hộ mình tại trang **Donate** trong ứng dụng:
- **PayPal**: `paypal.me/phamgiahuy2008`
- **BIDV**: `8892063216` (PHAM GIA HUY)

---
Crafted with ❤️ by **Pham Gia Huy**
