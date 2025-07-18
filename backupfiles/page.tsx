'use client';

import { useState } from "react";
import BoomerangVideo from './components/BoomerangVideo';

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    spotify: "",
    guests: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
    setForm({ name: '', email: '', date: '', spotify: '', guests: '' });
  } else {
    alert('Something went wrong. Please try again!');
  }
};

  return (
    <main className="relative w-full h-screen overflow-y-auto">
      <BoomerangVideo />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/70 z-10 px-6 py-10 flex flex-col items-center justify-start">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md text-center mb-6 leading-tight">
          Lofty Appreciation Party<br />Summer '25
        </h1>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg space-y-4 text-white">
          <p className="text-center text-sm font-light">
            📍 Somewhere in the Bangkok Bay retail and office complex...
          </p>

          <div className="text-sm text-center">
            <label className="block mb-2 font-semibold">🗓️ When can you come?</label>
            <div className="flex flex-wrap gap-4 justify-center text-center">
              {["July 31", "Aug 1", "Aug 2"].map(date => (
                <label key={date} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="date"
                    value={date}
                    checked={form.date === date}
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
            placeholder="Email Address (for party updates)"
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

          <p className="text-xs text-center mt-2">
            🍻 Please bring your own alcohol or cannabis!<br />
            ✨ Sparkling NA drinks & protein shakes provided.
          </p>

          <p className="text-center text-sm font-bold pt-2">Long Live Lofty 🦄</p>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 mt-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition"
          >
            Submit RSVP
          </button>
        </div>
      </div>
    </main>
  );
}
