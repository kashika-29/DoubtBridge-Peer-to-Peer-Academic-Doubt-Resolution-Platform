class MockCookieStore {
  constructor() {
    this._map = new Map();
    this._setCookies = [];
  }

  get(name) {
    const val = this._map.get(name);
    return val !== undefined ? { name, value: val } : undefined;
  }

  getAll() {
    return Array.from(this._map.entries()).map(([name, value]) => ({ name, value }));
  }

  set(name, value, options = {}) {
    this._map.set(name, value);
    this._setCookies.push({ name, value, options });
  }

  delete(name) {
    this._map.delete(name);
    this._setCookies.push({ name, value: '', options: { maxAge: 0 } });
  }

  has(name) {
    return this._map.has(name);
  }

  clear() {
    this._map.clear();
    this._setCookies = [];
  }
}

export const globalMockCookieStore = new MockCookieStore();

export async function cookies() {
  return globalMockCookieStore;
}

export async function headers() {
  return new Headers();
}

