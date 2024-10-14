class SecondaryRepository {
    constructor() {
      this.data = [
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" },
      ];
    }
    getItemById(id) {
      return this.data.find((item) => item.id === id);
    }
  
    removeItemById(id) {
      return this.data.splice(id, 1)[0]; 
    }
  }
  
  module.exports = SecondaryRepository;