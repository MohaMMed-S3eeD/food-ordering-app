import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-green-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
          🎉 ADMIN DASHBOARD 🎉
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            مرحباً في لوحة الإدارة
          </h2>
          <p className="text-gray-600 text-lg">
            تم تسجيل الدخول بنجاح كمدير للنظام
          </p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-medium">
              ✅ الـ middleware بيشتغل صح
            </p>
            <p className="text-green-800 font-medium">
              ✅ صفحة الإدارة محملة بنجاح
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
