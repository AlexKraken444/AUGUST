'use client';

import { useEffect, useRef, useState } from 'react';
import { clockAt } from '../lib/clock.mjs';

const pad = (number, size = 2) => String(number).padStart(size, '0');

export default function Home() {
  const [day, setDay] = useState(null);
  const [date, setDate] = useState('');
  const [night, setNight] = useState(false);
  const clock = useRef(null);
  const progress = useRef(null);
  const lastDay = useRef(null);

  useEffect(() => {
    let frame;
    function tick() {
      const now = new Date();
      const time = clockAt(now);
      if (lastDay.current !== time.day) {
        lastDay.current = time.day;
        setDay(time.day);
        setDate(now.toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit', year: 'numeric'}));
      }
      if (clock.current) clock.current.textContent = `${pad(time.hours)} : ${pad(time.minutes)} : ${pad(time.seconds)} . ${pad(time.milliseconds, 3)}`;
      if (progress.current) progress.current.style.transform = `scaleX(${time.progress})`;
      frame = requestAnimationFrame(tick);
    }
    function resume() {
      cancelAnimationFrame(frame);
      if (!document.hidden) tick();
    }
    tick();
    document.addEventListener('visibilitychange', resume);
    return () => {cancelAnimationFrame(frame); document.removeEventListener('visibilitychange', resume);};
  }, []);

  return (
    <main className={night ? 'poster night' : 'poster'}>
      <div className="paper" aria-hidden="true" />
      <header>
        <a className="wordmark" href="/" aria-label="AUGUST, главная">AUGUST<span className="brand-dot" /></a>
        <span className="header-note">ЛЕТО ПРОДОЛЖАЕТСЯ</span>
        <button className="theme" onClick={() => setNight(!night)} aria-label={night ? 'Включить светлую тему' : 'Включить темную тему'} aria-pressed={night}>
          <span className="theme-icon" aria-hidden="true" />{night ? 'Ночью' : 'Днем'}
        </button>
      </header>

      <section className="center" aria-label="Бесконечный август">
        <div className="eyebrow"><span />НЕ СПЕШИ. ЕЩЕ ЛЕТО.<span /></div>
        <div className="day-wrap">
          <span className="side-note left-note">С 01.08.2026</span>
          <h1 aria-live="polite" aria-atomic="true">
            <span key={day} className="day" style={{'--digits': String(day ?? 101).length}}>{day ?? <span className="loading-day">...</span>}</span>
            <span className="month">августа</span>
          </h1>
          <span className="side-note right-note">БЕЗ ПОСЛЕДНЕГО ДНЯ</span>
        </div>
        <p className="caption">Пусть сентябрь немного подождет.</p>
      </section>

      <div className="landscape" aria-hidden="true">
        <div className="sun" />
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none"><path d="M-20 132 C170 128 245 78 420 103 S700 160 880 106 S1180 64 1460 120" /><path className="second-line" d="M-20 148 C230 110 330 157 560 128 S880 70 1080 120 S1290 151 1460 131" /></svg>
      </div>

      <footer>
        <div className="footer-note">Обычный календарь<time>{date || 'Определяем дату'}</time></div>
        <div className="countdown"><p>ДО СЛЕДУЮЩЕГО ДНЯ АВГУСТА</p><div ref={clock} className="clock" role="timer" aria-label="Часы, минуты, секунды и миллисекунды до местной полуночи">00 : 00 : 00 . 000</div><div className="units" aria-hidden="true">ЧАСЫ / МИНУТЫ / СЕКУНДЫ / МС</div></div>
        <div className="footer-note local"><span className="live-dot" />По твоему времени<span>Где бы ты ни был</span></div>
      </footer>
      <div className="day-track" aria-hidden="true"><div ref={progress} /></div>
    </main>
  );
}
