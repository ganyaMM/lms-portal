
// const products = [];

module.exports = class product{
    constructor(firstname, email, categoryname, liner, hours, Language, myfile, message, id){
        this.firstname = firstname;
        this.email = email;
        this.categoryname = categoryname;
        this.liner = liner; 
        this.hours = hours;
        this.Language = Language;
        this.myfile = myfile;
        this.message = message;
        this._id = id; 
    }

    // save() {
    //     products.push(this);
    // }

    // static getAll() {
    //     return products;
    // }
}

