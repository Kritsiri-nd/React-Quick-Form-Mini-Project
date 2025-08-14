import { useState } from "react";
import movies from "../constants/MoviesData";

function MoviesFormSurvey() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    movie: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState("");
  // เช็คอีเมล
  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  // เช็คว่ากรอกครบทุกช่องไหม
  function validate() {
    const event = {};
    if (!form.name.trim()) event.name = "โปรดใส่ชื่อของคุณ";
    if (!form.email.trim()) event.email = "โปรดใส่อีเมลของคุณ";
    else if (!isEmailValid(form.email)) event.email = "รูปแบบอีเมลไม่ถูกต้อง";
    if (!form.movie) event.movie = "กรุณาเลือกหนังที่คุณชอบ";
    setErrors(event);
    return Object.keys(event).length === 0;
  }
  // อัปเดตค่าในฟอร์ม
  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  // Submit ฟอร์ม
  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    setPage("summary");
  }
  // Reset ค่าในฟอร์ม
  function handleReset() {
    setForm({ name: "", email: "", movie: "", comment: "" });
    setErrors({});
  }
  // กลับไปหน้าแบบฟอร์ม
  function handleBackToForm() {
    handleReset();
    setPage("");
  }

  if (page === "summary") {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-lg font-semibold">สรุปคำตอบ</h1>

        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-start gap-3">
            <span className="font-lg font-bold text-slate-500">ชื่อ</span>
            <span className="font-lg  text-slate-500">{form.name}</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-lg font-bold text-slate-500">อีเมล</span>
            <span className="font-lg  text-slate-500">{form.email}</span>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-lg font-bold text-slate-500">ภาพยนตร์</span>
            <span className="font-lg  text-slate-500">{form.movie}</span>
          </div>

          {form.comment && (
            <div className="flex items-start gap-3">
              <span className="font-lg font-bold text-slate-500">
                ความคิดเห็น
              </span>
              <span className="font-lg  text-slate-500">{form.comment}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleBackToForm}
          className="mt-6 rounded-xl bg-indigo-600 px-4 py-2 text-white"
        >
          ทำแบบสำรวจใหม่
        </button>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header>
        <h1 className="mb-1 text-lg font-semibold">แบบสำรวจความชอบภาพยนต์</h1>
        <p className="mb-6 text-sm text-slate-500">
          กรอกข้อมูลให้ครบถ้วนแล้วกดส่งแบบสำรวจ
        </p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          {/* กรอกชื่อ */}
          <label
            htmlFor="name"
            className="mb-2 block text-lg font-medium text-slate-700"
          >
            ชื่อ
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="ชื่อของคุณ"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl  px-3 py-2 border border-slate-200"
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-rose-600">
              {errors.name}
            </p>
          )}
          {/* กรอกEmail */}
          <label
            htmlFor="email"
            className="mb-2 block text-lg font-medium text-slate-700"
          >
            อีเมล
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl  px-3 py-2 border border-slate-200"
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-rose-600">
              {errors.email}
            </p>
          )}
          {/* เลือกหนังที่ชอบ */}
          <label
            htmlFor="movie"
            className="mb-2 block text-lg font-medium text-slate-700"
          >
            เลือกหนังที่คุณชอบ
          </label>
          {movies.map((movie) => {
            const value = `${movie.title} (${movie.year}) — ${movie.director}`;
            return (
              <label
                key={movie.title}
                className="flex items-center gap-2 mb-2 rounded-lg border border-slate-200 p-2"
              >
                <input
                  type="radio"
                  name="movie"
                  value={value}
                  checked={form.movie === value}
                  onChange={handleChange}
                />
                <span className="text-lg text-slate-700">{value}</span>
              </label>
            );
          })}
          {errors.movie && (
            <p className="mt-2 text-sm text-rose-600">{errors.movie}</p>
          )}
          {/* ช่องแสดงความคิดเห็น */}
          <label
            htmlFor="comment"
            className="mb-2 block text-lg font-medium text-slate-700"
          >
            แสดงความคิดเห็น
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="แสงดความคิดเห็นตรงนี้"
            value={form.comment}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none"
          ></textarea>
          {/* ปุ่ม Submit และ ปุ่ม Reset */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-white"
              onSubmit={handleSubmit}
            >
              ส่งแบบสำรวจ
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2"
              onClick={handleReset}
            >
              รีเซ็ต
            </button>
          </div>
        </form>
      </main>
    </section>
  );
}
export default MoviesFormSurvey;
