const util = require("./util");
const mongoose = require("mongoose");

util.connectMongoose(async () => {
  const personSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        get: capitalizeFirstLetter,
      },
      lastName: {
        type: String,
        get: capitalizeFirstLetter,
      },
      age: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );
  personSchema.virtual("fullName").get(function () {
    console.log(this.age);
    console.log(this.firstName);
    return `${this.firstName} ${this.lastName}`;
  });
  personSchema.virtual("birthYear").get(function () {
    console.log(this.age);
    return parseInt(new Date().getFullYear()) - this.age;
  });
  function capitalizeFirstLetter(v) {
    v = v.toLowerCase();
    return v.charAt(0).toUpperCase() + v.substring(1);
  }
  const Person = mongoose.model("Person", personSchema);

  // creating the document
  await Person.create({ firstName: "BENJAMIN", lastName: "sisko", age: 10 });

  const normalDoc = await Person.findOne().sort({ createdAt: -1 });
  const leanDoc = await Person.findOne().lean();

  const comparison = {
    normalDoc: {
      fullName: normalDoc.fullName, // 'Benjamin Sisko'
      birthYear: normalDoc.birthYear, // 2012
      firstName: normalDoc.firstName, // 'Benjamin', because of `capitalizeFirstLetter()`
      lastName: normalDoc.lastName, // 'Sisko', because of `capitalizeFirstLetter()`
    },
    leanDoc: {
      fullName: leanDoc.fullName, // undefined
      birthYear: leanDoc.birthYear, // undefined
      firstName: leanDoc.firstName, // 'benjamin'
      lastName: leanDoc.lastName, // 'sisko'
    },
  };
  console.log(comparison);
});
