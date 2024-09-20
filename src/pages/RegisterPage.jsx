import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext"; // استيراد سياق المصادقة
import { Link } from "react-router-dom"; // استيراد الروابط للتنقل بين الصفحات

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    name: "", // تخزين اسم المستخدم
    email: "", // تخزين البريد الإلكتروني
    password1: "", // تخزين كلمة المرور
    password2: "", // تأكيد كلمة المرور
  });

  const { handleRegister } = useAuth(); // استدعاء دالة التسجيل من سياق المصادقة

  // دالة لتحديث الحقول عند تغيير المدخلات
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form
          onSubmit={(e) => {
            handleRegister(e, credentials); // استدعاء دالة التسجيل عند إرسال النموذج
          }}
        >
          <div className="field--wrapper">
            <label>الاسم:</label>
            <input
              required
              type="text"
              name="name"
              value={credentials.name}
              placeholder="أدخل اسمك..."
              onChange={handleInputChange} // تحديث اسم المستخدم عند تغييره
            />
          </div>

          <div className="field--wrapper">
            <label>البريد الإلكتروني:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="أدخل بريدك الإلكتروني..."
              value={credentials.email}
              onChange={handleInputChange} // تحديث البريد الإلكتروني عند تغييره
            />
          </div>

          <div className="field--wrapper">
            <label>كلمة المرور:</label>
            <input
              required
              type="password"
              name="password1"
              placeholder="أدخل كلمة المرور..."
              value={credentials.password1}
              onChange={handleInputChange} // تحديث كلمة المرور عند تغييرها
            />
          </div>

          <div className="field--wrapper">
            <label>تأكيد كلمة المرور:</label>
            <input
              required
              type="password"
              name="password2"
              placeholder="أعد إدخال كلمة المرور..."
              value={credentials.password2}
              onChange={handleInputChange} // تحديث تأكيد كلمة المرور عند تغييرها
            />
          </div>

          <div className="field--wrapper">
            <input
              className="btn btn--lg btn--main"
              type="submit"
              value="تسجيل"
            />
          </div>
        </form>

        <p>
          هل لديك حساب بالفعل؟ سجل الدخول <Link to="/login">هنا</Link>{" "}
          {/* رابط لصفحة تسجيل الدخول */}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
