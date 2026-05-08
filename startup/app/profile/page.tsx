"use client";

import React from "react";
import {
  User,
  Heart,
  ShoppingCart,
  CircleHelp,
  Gift,
  MapPin,
  LogOut,
} from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] p-10">
      <div className="max-w-7xl mx-auto flex gap-10">
        {/* Sidebar */}
        <div className="w-[260px]">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-bold text-[#1d2240] text-lg">Сарнай</h3>

              <p className="text-xs text-orange-500 mt-1">0 оноо</p>
            </div>
          </div>

          {/* Menu */}
          <div className="border-t pt-6 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-[#eceaf7] text-[#1d2240] font-medium">
              <User size={18} />
              Хувийн мэдээлэл
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full hover:bg-white transition">
              <Heart size={18} />
              Хадгалсан бараа
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full hover:bg-white transition">
              <ShoppingCart size={18} />
              Миний захиалга
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full hover:bg-white transition">
              <CircleHelp size={18} />
              Тусламж
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full hover:bg-white transition">
              <Gift size={18} />
              Бэлгийн карт
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full hover:bg-white transition">
              <MapPin size={18} />
              Хүргэлтийн хаяг
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full hover:bg-white transition text-red-500">
              <LogOut size={18} />
              Гарах
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-4">
            Нүүр хуудас {" > "}{" "}
            <span className="text-[#1d2240] font-medium">Хувийн мэдээлэл</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black italic text-[#1d2240] mb-10">
            Хувийн мэдээлэл
          </h1>

          {/* Form */}
          <div className="grid grid-cols-2 gap-8">
            {/* Овог */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[#1d2240]">
                Овог<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="Овог"
                className="w-full h-14 rounded-full border border-gray-300 bg-white px-6 outline-none focus:border-orange-500"
              />
            </div>

            {/* Утас */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[#1d2240]">
                Утасны дугаар<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                defaultValue="90210005"
                className="w-full h-14 rounded-full border border-gray-300 bg-white px-6 outline-none focus:border-orange-500"
              />
            </div>

            {/* Нэр */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[#1d2240]">
                Нэр<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                defaultValue="Сарнай"
                className="w-full h-14 rounded-full border border-gray-300 bg-white px-6 outline-none focus:border-orange-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-[#1d2240]">
                Имэйл<span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full h-14 rounded-full border border-gray-300 bg-white px-6 outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            <button className="h-14 rounded-full bg-orange-500 hover:bg-orange-600 transition text-white font-semibold">
              Хадгалах
            </button>

            <button className="h-14 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition text-[#1d2240] font-semibold">
              Нууц үг солих
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
