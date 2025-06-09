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

function initializeBooks() {
    
    const knjigeString = localStorage.getItem('knjige')

    if (knjigeString) {
        knjige = JSON.parse(knjigeString).map (k => 
            new Knjige (k.id, k.naziv, k.datum, k.slika, k.opis, k.recenzija))
    }
    else {
        knjige = [
            new Knjige (
                1,
                "Most na Zepi",
                "01.10.1925.",
                "https://www.scribd.com/doc/142854212/Most-na-%C5%BDepi-Ivo-Andri%C4%87",
                "Pripovetka o izgradnji kamenog mosta na nabujaloj reci Žepi.",
                4.17
            ),

            new Knjige (
                2,
                "Proces",
                "26.04.1925.",
                "https://files.libcom.org/files/The%20Trial%20-%20Franz%20Kafka.pdf ",
                "Roman o Josef K., bankarskom činovniku koji je iznenada uhapšen i suđen u neuhvatljivom, apsurdnom pravnom sistemu, pri čemu mu priroda optužbe ostaje nepoznata.",            
                3.95
            ),               
            
            new Knjige (
                3,
                "1984",
                "08.06.1949.",
                "https://images.app.goo.gl/jPfKNR1GSDA1Tf1T7",
                "Distopijski roman o totalitarnom režimu koji nadgleda svaki aspekt ljudskog života, prateći život Vinstona Smita koji pokušava da zadrži svoju slobodu mišljenja.",
                4.19
            )
        ]
        localStorage.setItem("knjige", JSON.stringify(knjige))
    }
    createBooksRow(knjige)
}

function createBooksRow (knjige) {
    let table = document.querySelector("#book-list")
    table.innerHTML = ''

    for (let i = 0; i < knjige.length; i++) {
        let tr = document.createElement("tr")

        let id = document.createElement("td")
        id.textContent = i + 1

        let naziv = document.createElement("td")
        naziv.textContent = knjige[i].naziv

        let obrisi = document.createElement("td")
        let obrisiBtn = document.createElement("button")
        obrisiBtn.textContent = "Obrisi"
        obrisiBtn.addEventListener('click', () => deleteBook(i))

        obrisi.appendChild(obrisiBtn)
        tr.append(id, naziv, obrisi)
        table.appendChild(tr)
        
    }
}

function deleteBook(i) {
    knjige.splice(i, 1)
    localStorage.setItem('knjige', JSON.stringify(knjige))
    createBooksRow(knjige)
}

function initializeAddBooks() {
    let subbmitBtn = document.querySelector("#submitBtn")

    subbmitBtn.addEventListener('click', function(){
        const forma = document.querySelector("#forma")
        const formData = new FormData(forma)
        const naziv = formData.get("naziv")
        const tip = tip.get("opis")
        const slika = slika.get("slika")

        const id = calculateMaxId()

        let novaKnjiga = new Knjige(id, naziv, tip, slika)
        knjige.push(novaKnjiga)

        localStorage.setItem('knjige', JSON.stringify(knjige))
        createBooksRow(knjige)
    })
}

function calculateMaxId() {
    let maxId = 0
    for (let i = 0; i < knjige.length; i++) {
        if (knjige[i].id > maxId) {
        maxId = knjige[i].id
        }
    }
    return maxId + 1        
}


document.addEventListener('DOMContentLoaded', initializeBooks)