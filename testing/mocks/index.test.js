const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require("assert");

(async () => {
  // variables created inside this block are only valid during its execution
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/invalid-header.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/five-lines-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/three-lines-valid.csv";
    const expected = [
      {
        id: 1,
        name: "mark",
        profession: "developer",
        age: 130,
      },
      {
        id: 2,
        name: "joseph",
        profession: "developer",
        age: 85,
      },
      {
        id: 3,
        name: "tania",
        profession: "developer",
        age: 56,
      },
    ];
    const result = await File.csvToJSON(filePath);
    await assert.deepEqual(result, expected);
  }

  console.log("All good!");
})();
