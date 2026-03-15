import { formatCreatedDate } from './date';

describe('formatCreatedDate', () => {
  it('should format date in en-GB short format', () => {
    const date = new Date('2025-03-14T12:00:00.000Z');
    expect(formatCreatedDate(date)).toMatch(/\d{2}\s\w{3}\s2025/);
  });

  it('should accept Date instance', () => {
    const date = new Date(2025, 0, 15); // 15 Jan 2025
    const result = formatCreatedDate(date);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
