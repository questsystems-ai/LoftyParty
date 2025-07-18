'use client';

import { useState } from "react";
import BoomerangVideo from './components/BoomerangVideo';

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dates: [] as string[],
    spotify: "",
    guests: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (name === 'dates') {
      setForm(prev => ({
        ...prev,
        dates: checked
          ? [...prev.dates, value]
          : prev.dates.filter(d => d !== value),
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('RSVP submitted! 🎉');
      setForm({ name: '', email: '', dates: [], spotify: '', guests: '' });
    } else {
      alert('Something went wrong. Please try again!');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-x-hidden">
      <BoomerangVideo />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-white text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md leading-tight">
          Lofty Office Party<br />Summer '25
        </h1>
        <div className="mt-4 animate-bounce opacity-70">⬇️</div>
      </div>

      <div className="relative z-20 mt-[100vh] text-white flex flex-col items-center justify-start min-h-screen px-6 py-12 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          src="/card-bg.mp4"
        />

        <div className="relative z-10 w-full max-w-md bg-white/10 p-6 rounded-2xl shadow-xl space-y-4 backdrop-blur-md">
          <p className="text-center text-base font-light">
            📍 Somewhere in the Bangkok Bay retail and office complex
          </p>
          <div className="text-base text-center">
            <label className="block mb-2 font-semibold">🗓️ When can you come?</label>
            <div className="flex flex-wrap gap-4 justify-center">
              {["July 31", "Aug 1", "Aug 2"].map(date => (
                <label key={date} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="dates"
                    value={date}
                    checked={form.dates.includes(date)}
                    onChange={handleChange}
                    className="accent-pink-500"
                  />
                  <span>{date}</span>
                </label>
              ))}
            </div>
          </div>
          <input
            className="w-full p-2 rounded-md text-black placeholder:text-gray-500"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 rounded-md text-black placeholder:text-gray-500"
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 rounded-md text-black placeholder:text-gray-500"
            name="spotify"
            placeholder="Party Playlist Spotify Link"
            value={form.spotify}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 rounded-md text-black placeholder:text-gray-500"
            name="guests"
            placeholder="Number of Guests"
            type="number"
            value={form.guests}
            onChange={handleChange}
          />
          <p className="text-sm text-center mt-2">
            🍻 Please bring your own alcohol or cannabis!<br />
            ✨ Sparkling NA drinks & protein shakes provided.
          </p>
          <p className="text-center text-base font-bold pt-2 animate-pulse">Long Live Lofty 🦄</p>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 mt-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition"
          >
            Submit RSVP
          </button>
        </div>
      </div>
    </div>
  );
}
