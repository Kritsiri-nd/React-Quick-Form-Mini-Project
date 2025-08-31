import { useState } from "react";
import movies from "../constants/MoviesData";

// Pure validate function
function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
}
function validate(form) {
  const errs = {};
  if (!form.name?.trim()) errs.name = "โปรดใส่ชื่อของคุณ";
  if (!form.email?.trim()) errs.email = "โปรดใส่อีเมลของคุณ";
  else if (!isEmailValid(form.email)) errs.email = "รูปแบบอีเมลไม่ถูกต้อง";
  if (!form.movie) errs.movie = "กรุณาเลือกหนังที่คุณชอบ";
  return errs;
}

//  FormField
function FormField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  as = "input",
  type = "text",
  placeholder = "",
}) {
  const Tag = as;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-2 block text-lg font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </label>

      <Tag
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...(as === "input" ? { type } : {})}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className="w-full rounded-xl border border-slate-200 px-3 py-2"
      />

      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="font-lg font-bold text-slate-500">{label}</span>
      <span className="font-lg text-slate-500">{value}</span>
    </div>
  );
}

function MoviesFormSurvey() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    movie: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setPage("summary");
  };

  const handleReset = () => {
    setForm({ name: "", email: "", movie: "", comment: "" });
    setErrors({});
  };

  const handleBackToForm = () => {
    handleReset();
    setPage("");
  };

  if (page === "summary") {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-lg font-semibold">สรุปคำตอบ</h1>

        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <SummaryRow label="ชื่อ" value={form.name} />
          <SummaryRow label="อีเมล" value={form.email} />
          <SummaryRow label="ภาพยนตร์" value={form.movie} />
          {form.comment && (
            <SummaryRow label="ความคิดเห็น" value={form.comment} />
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

  const movieOptions = movies.map((m) => {
    const v = `${m.title} (${m.year}) — ${m.director}`;
    return { value: v, label: v };
  });

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header>
        <h1 className="mb-1 text-lg font-semibold">
          “แบบสำรวจความชอบภาพยนตร์”
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          กรอกข้อมูลให้ครบถ้วนแล้วกดส่งแบบสำรวจ
        </p>
      </header>

      <main>
        <form onSubmit={handleSubmit} noValidate>
          {/* กรอกชื่อ */}
          <FormField
            id="name"
            name="name"
            label="ชื่อ"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder="ชื่อของคุณ"
          />

          {/* กรอกEmail */}
          <FormField
            id="email"
            name="email"
            label="อีเมล"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            required
            type="email"
            placeholder="you@example.com"
          />

          {/* เลือกหนังที่ชอบ */}
          <fieldset
            className="mt-6"
            aria-describedby={errors.movie ? "movie-error" : undefined}
          >
            <legend className="mb-2 block text-lg font-medium text-slate-700">
              เลือกหนังที่คุณชอบ
            </legend>

            {movieOptions.map((opt, idx) => (
              <label
                key={opt.value}
                className="mb-2 flex items-center gap-2 rounded-lg border border-slate-200 p-2"
              >
                <input
                  type="radio"
                  name="movie"
                  value={opt.value}
                  checked={form.movie === opt.value}
                  onChange={handleChange}
                  required={idx === 0}
                  aria-invalid={Boolean(errors.movie) && idx === 0}
                />
                <span className="text-lg text-slate-700">{opt.label}</span>
              </label>
            ))}

            {errors.movie && (
              <p id="movie-error" className="mt-2 text-sm text-rose-600">
                {errors.movie}
              </p>
            )}
          </fieldset>

          {/* ช่องแสดงความคิดเห็น */}
          <FormField
            id="comment"
            name="comment"
            label="แสดงความคิดเห็น"
            value={form.comment}
            onChange={handleChange}
            error={null}
            as="textarea"
            placeholder="แสดงความคิดเห็นตรงนี้"
          />

          {/* ปุ่ม Submit และ ปุ่ม Reset */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-white"
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
