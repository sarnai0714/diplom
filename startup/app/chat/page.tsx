"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  MoreVertical,
  MessageSquare,
  Search,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ChatPage = () => {
  const { user } = useAuth();

  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const API_BASE = "http://127.0.0.1:8000/api";

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/rooms/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setRooms(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Fetch messages
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        const token = localStorage.getItem("access");

        try {
          const res = await fetch(
            `${API_BASE}/messages/?room=${selectedChat.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (res.ok) {
            const data = await res.json();
            setMessages(data);
          }
        } catch (err) {
          console.error(err);
        }
      };

      fetchMessages();

      const interval = setInterval(fetchMessages, 3000);

      return () => clearInterval(interval);
    }
  }, [selectedChat]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !selectedChat) return;

    const token = localStorage.getItem("access");

    try {
      const res = await fetch(`${API_BASE}/messages/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: selectedChat.id,
          text: message,
        }),
      });

      if (res.ok) {
        const newMessage = await res.json();

        setMessages((prev) => [...prev, newMessage]);

        setMessage("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-[100dvh] flex overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* SIDEBAR */}
      <aside
        className={`
        fixed md:relative z-30
        w-full md:w-[380px]
        h-full
        backdrop-blur-xl bg-white/80
        border-r border-white/20
        shadow-2xl
        transition-all duration-300

        ${
          selectedChat
            ? "translate-x-[-100%] md:translate-x-0"
            : "translate-x-0"
        }
      `}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800">
                Messages
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Хөрөнгө оруулагчидтай холбогдоорой
              </p>
            </div>

            <button className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all">
              <Plus size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-5">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Хайх..."
              className="w-full bg-white/70 border border-white/40 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none shadow-md focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Room list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 h-[calc(100%-120px)]">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            rooms.map((room: any) => (
              <div
                key={room.id}
                onClick={() => setSelectedChat(room)}
                className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02]
                ${
                  selectedChat?.id === room.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
                    : "bg-white/60 hover:bg-white hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-bold
                    ${
                      selectedChat?.id === room.id
                        ? "bg-white/20 text-white"
                        : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
                    }`}
                  >
                    {room.investor_name?.[0] || "I"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold truncate text-sm md:text-base">
                        {room.investor_name}
                      </h3>

                      <span
                        className={`text-[10px]
                        ${
                          selectedChat?.id === room.id
                            ? "text-blue-100"
                            : "text-slate-400"
                        }`}
                      >
                        12:45 PM
                      </span>
                    </div>

                    <p
                      className={`truncate text-xs md:text-sm mt-1
                      ${
                        selectedChat?.id === room.id
                          ? "text-blue-50"
                          : "text-slate-500"
                      }`}
                    >
                      {room.startup_name}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* MAIN CHAT */}
      <main
        className={`
        flex-1 flex flex-col relative overflow-hidden
        ${!selectedChat ? "hidden md:flex" : "flex"}
      `}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-300/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-300/20 blur-3xl rounded-full"></div>

        {selectedChat ? (
          <>
            {/* HEADER */}
            <header className="h-[72px] md:h-[78px] px-4 md:px-8 border-b border-white/20 flex items-center justify-between bg-white/60 backdrop-blur-xl sticky top-0 z-20 shadow-sm">
              <div className="flex items-center gap-3 md:gap-4">
                {/* Mobile back */}
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden w-10 h-10 rounded-xl hover:bg-white/70 flex items-center justify-center"
                >
                  <ArrowLeft size={20} />
                </button>

                {/* Avatar */}
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">
                  {selectedChat.investor_name?.[0]}
                </div>

                {/* Info */}
                <div>
                  <h2 className="font-bold text-sm md:text-lg text-slate-800">
                    {selectedChat.investor_name}
                  </h2>

                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>

                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 md:gap-3">
                <button className="w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-white/70 flex items-center justify-center transition-all">
                  <Search size={18} className="text-slate-500" />
                </button>

                <button className="w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-white/70 flex items-center justify-center transition-all">
                  <MoreVertical size={18} className="text-slate-500" />
                </button>
              </div>
            </header>

            {/* MESSAGES */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5 relative z-10"
            >
              {messages.map((msg: any) => {
                const isMe = msg.sender_name === user?.username;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMe && (
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[10px] md:text-xs font-bold text-slate-500">
                        {msg.sender_name?.[0]}
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] md:max-w-[70%] px-4 md:px-5 py-3 rounded-[24px] transition-all duration-300
                      ${
                        isMe
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md shadow-xl"
                          : "bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm"
                      }`}
                    >
                      <p className="text-sm md:text-[15px] leading-relaxed break-words">
                        {msg.text}
                      </p>

                      <span
                        className={`text-[10px] mt-2 block opacity-60
                        ${isMe ? "text-right" : "text-left"}`}
                      >
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* INPUT */}
            <footer className="p-3 md:p-6 relative z-10">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[24px] md:rounded-[28px] p-2 shadow-2xl"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Мессеж бичих..."
                  className="flex-1 bg-transparent px-3 md:px-4 py-2 md:py-3 outline-none text-sm md:text-base text-slate-700 placeholder:text-slate-400"
                />

                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl text-white hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50"
                >
                  <Send size={18} fill="currentColor" />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center p-10 relative z-10">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-[40px] shadow-2xl flex items-center justify-center mb-8 text-blue-600 animate-pulse">
              <MessageSquare size={48} strokeWidth={1.5} />
            </div>

            <h2 className="text-3xl font-black text-slate-800 mb-3">
              Таны шууд зурвасууд
            </h2>

            <p className="text-slate-500 max-w-md leading-relaxed text-lg">
              Хөрөнгө оруулагчаа сонгож бизнес төслийнхөө талаар яриагаа
              эхлүүлээрэй.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
