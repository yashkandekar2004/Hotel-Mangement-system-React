const API_BASE_URL = 'http://localhost:5000';

class ApiService {
  // ─── Token Helpers ─────────────────────────────────────────────────────────
  static getToken() {
    return localStorage.getItem('hotel_token');
  }

  static setToken(token) {
    localStorage.setItem('hotel_token', token);
  }

  static removeToken() {
    localStorage.removeItem('hotel_token');
    localStorage.removeItem('hotel_user');
  }

  static saveUser(user) {
    localStorage.setItem('hotel_user', JSON.stringify(user));
  }

  static getCurrentUser() {
    const user = localStorage.getItem('hotel_user');
    return user ? JSON.parse(user) : null;
  }

  // ─── Base Request ──────────────────────────────────────────────────────────
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Throw the backend error message so UI can display it
      throw new Error(data.error || `Request failed (${response.status})`);
    }

    return data;
  }

  // ─── Auth APIs ─────────────────────────────────────────────────────────────
  static async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    this.saveUser(data.user);
    return data.user;
  }

  static async register(name, email, password) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    this.setToken(data.token);
    this.saveUser(data.user);
    return data.user;
  }

  static async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.removeToken();
    }
  }

  // ─── Room APIs ─────────────────────────────────────────────────────────────
  static async getRooms() {
    return this.request('/hotel/rooms');
  }

  static async addRoom(roomData) {
    return this.request('/hotel/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    });
  }

  static async updateRoom(id, roomData) {
    return this.request(`/hotel/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(roomData),
    });
  }

  static async deleteRoom(id) {
    return this.request(`/hotel/rooms/${id}`, { method: 'DELETE' });
  }

  // ─── Booking APIs ──────────────────────────────────────────────────────────
  static async getBookings() {
    return this.request('/hotel/bookings');
  }

  static async addBooking(bookingData) {
    return this.request('/hotel/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  static async updateBooking(id, bookingData) {
    return this.request(`/hotel/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData),
    });
  }

  static async deleteBooking(id) {
    return this.request(`/hotel/bookings/${id}`, { method: 'DELETE' });
  }

  // ─── Food Order APIs ───────────────────────────────────────────────────────
  static async getFoodOrders() {
    return this.request('/hotel/food-orders');
  }

  static async addFoodOrder(orderData) {
    return this.request('/hotel/food-orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  static async updateFoodOrder(id, orderData) {
    return this.request(`/hotel/food-orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  static async deleteFoodOrder(id) {
    return this.request(`/hotel/food-orders/${id}`, { method: 'DELETE' });
  }
}

export default ApiService;