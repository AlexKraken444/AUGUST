import test from 'node:test';
import assert from 'node:assert/strict';
import { clockAt } from '../lib/clock.mjs';

test('August continues across months and years', () => {
  for (const [y,m,d,expected] of [[2026,7,1,1],[2026,7,31,31],[2026,8,1,32],[2026,10,9,101],[2026,10,10,102],[2027,0,1,154],[2027,7,1,366],[2028,7,1,732]]) {
    assert.equal(clockAt(new Date(y,m,d,12)).day,expected);
  }
});
test('last millisecond and next midnight', () => {
  const last = clockAt(new Date(2026,10,9,23,59,59,999));
  assert.deepEqual([last.day,last.hours,last.minutes,last.seconds,last.milliseconds],[101,0,0,0,1]);
  const next = clockAt(new Date(2026,10,10));
  assert.equal(next.day,102); assert.equal(next.progress,0);
});
test('DST does not change calendar day numbering or local midnight', () => {
  process.env.TZ = 'America/New_York';
  const spring = clockAt(new Date(2027,2,14));
  const autumn = clockAt(new Date(2026,10,1));
  assert.equal(spring.hours,23); assert.equal(autumn.hours,25);
  assert.equal(clockAt(new Date(2027,2,15)).day - spring.day,1);
});
