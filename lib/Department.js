class Department {
    constructor(id, name) {
     if (!name) {
        throw new Error("Expected name argument! Cannot initiate without one arguments.");
      } 
      this.id = id;
      this.name = name;
     
    }
    getName() {
      return this.name;
    }
    getId() {
      return this.id;
    }
   
  }
  module.exports = Department;
  