import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext"; // استيراد سياق المصادقة
import { useNavigate } from "react-router"; // استيراد التنقل بين الصفحات
import { Link } from "react-router-dom"; // استيراد الروابط
import "../index.css"; // استيراد أنماط CSS

const LoginPage = () => {
  const { user, handleUserLogin } = useAuth(); // الحصول على المستخدم ودالة تسجيل الدخول من سياق المصادقة
  const [credentials, setCredentials] = useState({ email: "", password: "" }); // تخزين بيانات تسجيل الدخول

  const navigate = useNavigate(); // استخدام الدالة للتنقل

  // استخدام تأثير useEffect للتحقق من تسجيل الدخول وتوجيه المستخدم إذا كان مسجلاً
  useEffect(() => {
    if (user) {
      navigate("/"); // إذا كان المستخدم مسجلاً، يتم توجيهه إلى الصفحة الرئيسية
    }
  }, [user]);

  // دالة للتعامل مع تغيير الحقول في النموذج
  const handleInputChange = (e) => {
    const { name, value } = e.target; // الحصول على اسم وقيمة الحقل الذي تم تغييره
    setCredentials({ ...credentials, [name]: value }); // تحديث بيانات تسجيل الدخول
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form
          onSubmit={(e) => {
            handleUserLogin(e, credentials); // عند الضغط على تسجيل الدخول، يتم استدعاء دالة تسجيل الدخول
          }}
        >
          <div className="field--wrapper">
            <label>البريد الإلكتروني:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="أدخل بريدك الإلكتروني..."
              value={credentials.email} // قيمة الحقل هي البريد الإلكتروني الذي تم إدخاله
              onChange={handleInputChange} // يتم استدعاء الدالة عند تغيير البريد الإلكتروني
            />
          </div>

          <div className="field--wrapper">
            <label>كلمة المرور:</label>
            <input
              required
              type="password"
              name="password"
              placeholder="أدخل كلمة المرور..."
              value={credentials.password} // قيمة الحقل هي كلمة المرور التي تم إدخالها
              onChange={handleInputChange} // يتم استدعاء الدالة عند تغيير كلمة المرور
            />
          </div>

          <div className="field--wrapper">
            <input
              type="submit"
              value="تسجيل الدخول"
              className="btn btn--lg btn--main" // زر تسجيل الدخول
            />
          </div>
        </form>

        <p>
          ليس لديك حساب؟ سجل <Link to="/register">هنا</Link>{" "}
          {/* رابط إلى صفحة التسجيل */}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
