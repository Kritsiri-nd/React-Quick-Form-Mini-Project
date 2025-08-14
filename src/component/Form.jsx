import { useState } from "react";
import movies from "./MoviesData";
function MoviesFormSurvey() {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header >
        <h1 className="mb-1 text-lg font-semibold">แบบสำรวจความชอบภาพยนต์</h1>
        <p className="mb-6 text-sm text-slate-500">กรอกข้อมูลให้ครบถ้วนแล้วกดส่งแบบสำรวจ</p>
      </header>
      <main>
        <form>
          {/* กรอกชื่อ */}
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 text-lg">ชื่อ</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="ชื่อของคุณ"
            required
          />
          {/* กรอกEmail */}
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">อีเมล</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
          {/* เลือกหนังที่ชอบ */}
          <label htmlFor="movie" className="mb-2 block text-sm font-medium text-slate-700">เลือกหนังที่คุณชอบ</label>
          {movies.map((movie) => {
            const value = `${movie.title} (${movie.year}) — ${movie.director}`;
            return (
              <label
                key={movie.title}
                className="flex items-center gap-2 mb-2 cursor-pointer rounded-lg border border-slate-200 p-2 hover:border-slate-300"
              >
                <input type="radio" name="movie" value={value} required />
                <span className="text-sm text-slate-700">{value}</span>
              </label>
            );
          })}
          {/* ช่องแสดงความคิดเห็น */}
          <label htmlFor="comment" className="mb-2 block text-sm font-medium text-slate-700">แสดงความคิดเห็น</label>
          <textarea
            id="comment"
            name="comment"
            placeholder="แสงดความคิดเห็นตรงนี้"
          ></textarea>
          {/* ปุ่ม Submit และ ปุ่ม Reset */}
          <div className="mt-6 flex items-center gap-3">
            <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2 text-white">ส่งแบบสำรวจ</button>
            <button type="button" className="rounded-xl border border-slate-300 bg-white px-4 py-2">รีเซ็ต</button>
          </div>
        </form>
      </main>
    </section>
  );
}
export default MoviesFormSurvey;
