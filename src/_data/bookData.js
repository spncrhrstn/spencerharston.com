import fs from "fs";

const booksFile = "src/_data/books.json";
const books = JSON.parse(fs.readFileSync(booksFile, "utf-8"));

// sort the books
books.read.sort((a, b) => new Date(b.dateRead) - new Date(a.dateRead));
books.dnf.sort((a, b) => a.title.localeCompare(b.title));
books.tbr.sort((a, b) => a.title.localeCompare(b.title));

export default books;
