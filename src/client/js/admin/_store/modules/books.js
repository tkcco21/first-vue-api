import axios from 'axios';

export default {
  namespaced: true,
  state: {
    loggedIn: false,
    bookList: [],
    targetBook: {
      id: null,
      title: '',
      itemUrl: '',
      imageUrl: '',
      description: '',
      completedYear: null,
      completedMonth: null,
    },
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    completedDate: state => Object.keys(state.bookList),
  },
  mutations: {
    invalidate(state, payload) {
      state.errorMessage = payload.message;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    resetForm(state) {
      state.targetBook = Object.assign({}, {
        id: null,
        title: '',
        itemUrl: '',
        imageUrl: '',
        description: '',
        completedYear: null,
        completedMonth: null,
      });
    },
    updateValue(state, { value, name }) {
      state.targetBook[name] = value;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    doneGetAllBooks(state, { bookList }) {
      state.bookList = bookList;
    },
    doneGetBook(state, payload) {
      state.targetBook = Object.assign({}, payload);
    },
    doneAddBook(state) {
      state.doneMessage = '新しい本を追加しました';
    },
    doneEditBook(state, payload) {
      state.doneMessage = '本の情報を更新しました';
      state.targetBook = Object.assign({}, payload);
    },
  },
  actions: {
    invalidate({ commit }, message) {
      commit('invalidate', { message });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    resetForm({ commit }) {
      commit('resetForm');
    },
    updateValue({ commit }, input) {
      commit('updateValue', input);
    },
    getAllBooks({ commit }) {
      axios.get('/api/books').then(({ data }) => {
        commit('doneGetAllBooks', { bookList: data });
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
    getBook({ commit }, { id }) {
      axios.get(`/api/books/${id}`).then(({ data }) => {
        commit('doneGetBook', data);
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
    addBook({ commit }, book) {
      axios.post('/api/books', book).then(({ data }) => {
        commit('doneAddBook', data);
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
    editBook({ commit }, book) {
      axios.patch(`/api/books/${book.id}`, book).then(({ data }) => {
        commit('doneEditBook', data);
      }).catch((err) => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
  },
};