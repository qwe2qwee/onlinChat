# OnlineChat - تطبيق دردشة في الوقت الفعلي

تطبيق دردشة حديث مبني بـ React و Appwrite يتيح للمستخدمين التواصل في الوقت الفعلي.

## المميزات

- **مصادقة المستخدمين** - تسجيل الدخول والتسجيل الآمن
- **رسائل في الوقت الفعلي** - تحديث فوري للرسائل بدون الحاجة لتحديث الصفحة
- **حذف الرسائل** - يمكن للمستخدم حذف رسائله الخاصة فقط
- **واجهة مستخدم عربية** - دعم كامل للغة العربية
- **حماية المسارات** - الوصول لغرفة الدردشة للمستخدمين المسجلين فقط

## التقنيات المستخدمة

| التقنية | الوصف |
|---------|-------|
| [React 18](https://react.dev/) | مكتبة JavaScript لبناء واجهات المستخدم |
| [Vite](https://vitejs.dev/) | أداة بناء سريعة للمشاريع الحديثة |
| [Appwrite](https://appwrite.io/) | Backend as a Service للمصادقة وقاعدة البيانات |
| [React Router](https://reactrouter.com/) | التنقل بين الصفحات |
| [React Feather](https://feathericons.com/) | أيقونات جميلة ومفتوحة المصدر |
| [date-fns](https://date-fns.org/) | معالجة التواريخ |

## هيكل المشروع

```
onlinChat/
├── src/
│   ├── components/
│   │   ├── Header.jsx         # شريط الترويسة
│   │   └── PrivateRoutes.jsx  # حماية المسارات
│   ├── pages/
│   │   ├── LoginPage.jsx      # صفحة تسجيل الدخول
│   │   ├── RegisterPage.jsx   # صفحة التسجيل
│   │   ├── Room.jsx           # غرفة الدردشة
│   │   └── calculateTimeAgo.jsx # حساب الوقت المنقضي
│   ├── utils/
│   │   └── AuthContext.jsx    # سياق المصادقة
│   ├── App.jsx                # المكون الرئيسي
│   └── main.jsx               # نقطة الدخول
├── appwriteConfig.js          # إعدادات Appwrite
├── package.json
└── vite.config.js
```

## المتطلبات

- [Node.js](https://nodejs.org/) (v18 أو أحدث)
- [npm](https://www.npmjs.com/) أو [yarn](https://yarnpkg.com/)
- حساب [Appwrite](https://appwrite.io/)

## التثبيت

1. **استنساخ المشروع**
   ```bash
   git clone <repository-url>
   cd onlinChat
   ```

2. **تثبيت الحزم**
   ```bash
   npm install
   ```

3. **إعداد متغيرات البيئة**

   أنشئ ملف `.env` في المجلد الرئيسي:
   ```env
   VITE_API_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_PROJECT_ID=your_project_id
   VITE_DATABASE_ID=your_database_id
   VITE_COLLECTION_ID_MESSAGES=your_collection_id
   ```

4. **إعداد Appwrite**

   - أنشئ مشروع جديد في Appwrite
   - أنشئ قاعدة بيانات جديدة
   - أنشئ Collection للرسائل بالحقول التالية:
     - `user_id` (String)
     - `username` (String)
     - `body` (String)
   - فعّل الصلاحيات المناسبة للقراءة والكتابة

5. **تشغيل المشروع**
   ```bash
   npm run dev
   ```

   افتح المتصفح على `http://localhost:5173`

## الأوامر المتاحة

| الأمر | الوصف |
|-------|-------|
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء المشروع للإنتاج |
| `npm run preview` | معاينة نسخة الإنتاج |
| `npm run lint` | فحص الكود باستخدام ESLint |

## صفحات التطبيق

| المسار | الصفحة | الوصف |
|--------|--------|-------|
| `/` | Room | غرفة الدردشة الرئيسية (محمية) |
| `/login` | LoginPage | صفحة تسجيل الدخول |
| `/register` | RegisterPage | صفحة إنشاء حساب جديد |

## المساهمة

نرحب بمساهماتكم! يرجى:

1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الرخصة

هذا المشروع مفتوح المصدر ومتاح تحت رخصة MIT.

---

<div dir="rtl">

صنع بـ ❤️ باستخدام React و Appwrite

</div>
