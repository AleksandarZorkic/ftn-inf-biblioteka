"use strict"

class Knjige {
    constructor(id, naziv, datum, slika, opis, recenzija) {
        this.id = id
        this.naziv = naziv
        this.datum = datum
        this.slika = slika
        this.opis = opis
        this.recenzija = recenzija
    }
}

let knjige = []
let iznajmljene = []

function initializeRentedBooks() {
  const data = localStorage.getItem('iznajmljene');
  if (data) {
    iznajmljene = JSON.parse(data)
      .map(k => new Knjige(k.id, k.naziv, k.datum, k.slika, k.opis, k.recenzija));
  } else {
    iznajmljene = [];
  }
}

function createRentedRow (knjige) {
    const table = document.querySelector("#rented-list")
    table.innerHTML = ''

    for (let i = 0; i < knjige.length; i++) {
        const tr = document.createElement("tr")

        const id = document.createElement("td")
        id.textContent = i + 1

        const naziv = document.createElement("td")
        naziv.textContent = knjige[i].naziv

        const vrati = document.createElement("td")
        const vratiBtn = document.createElement("button")
        vratiBtn.textContent = "Vrati"
        vratiBtn.addEventListener('click', () => returnBook(knjige[i].id))

        vrati.appendChild(vratiBtn)
        tr.append(id, naziv, vrati)
        table.appendChild(tr)
    }
}

function returnBook(id) {
    iznajmljene = iznajmljene.filter(k => k.id !== id)

    localStorage.setItem('iznajmljene', JSON.stringify(iznajmljene))

    createRentedRow(iznajmljene)

    createBooksRow(knjige.filter(k => !iznajmljene.some(r => r.id === k.id)))
}

document.addEventListener('DOMContentLoaded', () => {
    initializeBooks();
    initializeRentedBooks();
    createRentedRow(iznajmljene);
    createBooksRow(knjige.filter(k => !iznajmljene.some(r => r.id === k.id)));
})