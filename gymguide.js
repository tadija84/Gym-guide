document.getElementById("registrujSe").addEventListener("click", klikNaLink);
document.getElementById("loginLink").addEventListener("click", klikNaLink);
document.getElementById("linkZaboravljenaSifra").addEventListener("click", klikNaLink);
//document.getElementById("linkPromenaSifre").addEventListener("click", klikNaLink);
document.getElementById("pokaziProgramZaDanas").addEventListener("click", prikazPrograma)
document.getElementById("promenaSifre").addEventListener("submit", promeniSifru);
document.getElementById("urediProfil").addEventListener("click", urediMojProfil);
document.getElementById("zaboravljenaSifra").addEventListener("submit", zaboravljenaSifra);
document.getElementById("register").addEventListener("submit", dodajKorisnika);
document.getElementById("login").addEventListener("submit", proveriKorisnika);
document.getElementById("logoutLink").addEventListener("click", izlogujGa);
document.getElementById("pocetna").addEventListener("click", prikaziMojProfil);
//document.getElementById("linkPromenaSifre").addEventListener("click", idiNaPromenuSifre);// style.display = id == 'linkPromenaSifre' ? 'block' : 'none';
document.getElementById("pokaziProgramZaSedmicu").addEventListener("click", prikazProgramaZaSedmicu);
document.getElementById("izmeniProfil").addEventListener("submit", promenaPodataka);
function klikNaLink(event) {
    event.preventDefault();
    var id = event.target.id;
    document.getElementById("register").style.display = id == 'registrujSe' ? 'block' : 'none';
    document.getElementById("login").style.display = id == 'loginLink' ? 'block' : 'none';
    document.getElementById("zaboravljenaSifra").style.display = id == 'linkZaboravljenaSifra' ? 'block' : 'none';

}
function prikaziMojProfil(event) {
    //event.preventDefault();
    document.getElementById("mojProfil").style.display = 'block';
    document.getElementById("izmeniProfil").style.display = "none";
    document.getElementById("login").style.display = 'none';
    document.getElementById("programZaSedmicu").style.display = 'none';
    document.getElementById("program").style.display = 'none';
    document.getElementById("promenaSifre").style.display = "none";
    document.getElementById("register").style.display = "none";
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var tezineKorisnika = preporuceniModulTreninga();
    var vezbeZaIspis = podelaMisicaNaGrupe();
    console.log(korisnik);
    console.log(vezbeZaIspis);
    document.getElementById("imeUlogovanogKorisnika").innerHTML = ime;
    document.getElementById("polUlogovanogKorisnika").innerHTML = korisnik.pol;
    document.getElementById("visinaUlogovanogKorisnika").innerHTML = korisnik.visina;
    document.getElementById("tezinaUlogovanogKorisnika").innerHTML = korisnik.tezina;
    document.getElementById("idealnaTezinaUlogovanogKorisnika").innerHTML = tezineKorisnika[0];
    document.getElementById("razlikaTezinaUlogovanogKorisnika").innerHTML = tezineKorisnika[1];
    document.getElementById("godineUlogovanogKorisnika").innerHTML = korisnik.godine;
    document.getElementById("procenatMastiUlogovanogKorisnika").innerHTML = korisnik.procenatMasti;
    document.getElementById("modulUlogovanogKorisnika").innerHTML = korisnik.modulTreninga;
    document.getElementById("treningaNedeljno").innerHTML = korisnik.brojTreningaNedeljno;
}

window.onload = function () {
    var ulogovan = localStorage.getItem('ulogovaniKorisnik');
    if (ulogovan !== null) {
        prikaziMojProfil(ulogovan);
    }
}
function idiNaPromenuSifre(event) {
    document.getElementById("promenaSifre").style.display = "block";
    // document.getElementById("izmeniProfil").style.display = "none";
    document.getElementById("program").style.display = "none";
}

function zaboravljenaSifra(event) {
    var user = document.getElementById("user2").value;
    var userIzBaze = proveraImena(user);
    if (userIzBaze !== false) {

        var odgovor = prompt(userIzBaze.secquestion);
        if (odgovor === userIzBaze.answer) {
            alert("pass je:" + userIzBaze.pass);
        } else {
            alert("Pogrešan odgovor");
        }

    } else {
        alert('User ne postoji');
    }
}


function dodajKorisnika(event) {
    event.preventDefault();
    var user = document.getElementById("user1").value;
    var pass = document.getElementById("pass1").value;
    if (proveraImena(user) !== false) {
        alert('Već postoji korisnik');
        return;
    }
    var confirmpass = document.getElementById("confirmpass").value;
    var secquestion = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;
    var selektovan = document.getElementById("question");
    var vreme = vremeNaPocetkuNedelje();


    var podaciOKorisniku = {
        user: user,
        pass: pass,
        confirmpass: confirmpass,
        answer: answer,
        secquestion: selektovan.options[selektovan.selectedIndex].innerHTML,
        vreme: vreme
    }
    var korisniciIzStoragea = sviKorisnici();
    korisniciIzStoragea.push(podaciOKorisniku);
    localStorage.setItem('korisnik', JSON.stringify(korisniciIzStoragea));
    ulogujGa(user);
}

function sviKorisnici() {
    var korisnici = localStorage.getItem('korisnik');
    if (korisnici === null) {
        return [];
    } else {
        return JSON.parse(korisnici);
    }
}

function urediMojProfil(event) {
    document.getElementById("izmeniProfil").style.display = "block";
    document.getElementById("program").style.display = "none";
    document.getElementById("mojProfil").style.background = 'url("pozadina-2.jpg")';
    document.getElementById("mojProfil").style.backgroundSize = "cover";
    document.getElementById("mojProfil").style.backgroundAttachment = "fixed";
    //document.getElementById("promenaSifre").style.display = "none";
}
function proveriKorisnika(event) {
    //  event.preventDefault();
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var korisnik = proveraImena(user);
    if (korisnik === false) {
        alert('ne postoji korisnik');
    } else {
        if (korisnik.pass === pass) {
            ulogujGa(user);
        } else {
            alert('Pogrešna šifra');
        }
    }
}

function ulogujGa(ime) {
    // document.getElementById("ulogovan").style.display = 'block';
    //document.getElementById("ulogovan").style.background = 'lightblue';
    // document.getElementById("imeUlogovanogKorisnika").innerHTML = ime;
    localStorage.setItem('ulogovaniKorisnik', ime);
    prikaziMojProfil();
}
function stranicaZaLogout() {
    document.getElementById("logoutPage").style.display = "block";
    document.getElementById("logoutPage").style.background = 'url("pozadina-3.jpg")';
    document.getElementById("logoutPage").style.backgroundSize = "cover";
    document.getElementById("logoutPage").style.backgroundAttachment = "fixed";
    document.getElementById("izmeniProfil").style.display = "none";
    document.getElementById("programZaSedmicu").style.display = "none";
    document.getElementById("promenaSifre").style.display = "none";
    document.getElementById("program").style.display = "none";
    izlogujGa();
}
function izlogujGa() {
    localStorage.removeItem('ulogovaniKorisnik');
    location.reload();
}

function proveraImena(user) {
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var korisnik = korisnici[index];
        if (user == korisnik.user) {
            return korisnik;
        }
    }
    return false;
}

function promeniSifru(event) {
    event.preventDefault();

    var stara = document.getElementById("staraSifra").value;
    var nova = document.getElementById("novaSifra").value;
    var potvrda = document.getElementById("potvrdaSifre").value;
    var user = proveraImena(localStorage.getItem('ulogovaniKorisnik'));
    if (stara == user.pass) {
        if (nova == potvrda) {
            var korisnici = sviKorisnici();
            for (var index = 0; index < korisnici.length; index++) {
                var korisnik = korisnici[index];
                if (user.user == korisnik.user) {
                    korisnici[index].pass = nova;
                }
            }
            localStorage.setItem('korisnik', JSON.stringify(korisnici));
            alert("vasa nova sifra je" + nova);
            prikaziMojProfil();
        } else {
            alert('šifre se ne podudaraju');
        }
    } else {
        alert('pogrešna šifra');
    }

}








function prikazTabelePrethodnihTreninga() { }

function prikazVezbi() { } // moguce ubacivanje drugih vezbi za iste grupe misica
function preporucenaDijeta() { }// opciono
function preporuceniRecepti() { } //video sam u nekoj aplikaciji
function randomMotivacioniCitati() { }//Npr: Bol je samo iluzija
function imamUpalu() { var upalaMisica; }//u slucaju upale smanjiti intezitet
function upisUTabelu() { }//korisnik upisuje uu tabelu sta je radio
function prekidTreninga() { }//ako je mali prekid nastaviti treninge sa neznatno manjim intezitetom
//u suprotnom, krenuti od nule
function preracunavanjeOptimalnogTreninga() { }//U slucaju da imamo posla sa sirovinom koja dize 150 iz bendza
function moguManje() { }
function moguVise() { }



function prikazPrograma(event) {
    document.getElementById("program").style.display = "block";
    document.getElementById("mojProfil").style.background = 'url("pozaadina-4.jpg")';
    document.getElementById("mojProfil").style.backgroundSize = "cover";
    document.getElementById("mojProfil").style.backgroundAttachment = "fixed";
    document.getElementById("izmeniProfil").style.display = "none";
    document.getElementById("programZaSedmicu").style.display = "none";
    document.getElementById("promenaSifre").style.display = "none";
    var vezbe = podelaMisicaNaGrupe();
    var trening = racunanjeOptimalnogTreninga();
    var brojSerijaVezbe = trening.serije;
    var brojPonavljanjaUSeriji = trening.ponavljanja;
    var opterecenje = racunanjeOpterecenja();
    var danUProgramu = programZaDan();
    var duzinaNiza = vezbe.length;
    var daLiDanasImamTrening = daLiDanasVezbam();
    var povecavanjePonavljanja = trening.povecavanjePonavljanja;
    var povecavanjeSerija= trening.povecavanjeSerija;
    var daLiDanasImamTrening = daLiDanasVezbam();
    var daLiPovecati=daLiJeVremeZaPovecavanje();
    if (daLiPovecati=true){
       if (brojSerijaVezbe<6){ 
           brojSerijaVezbe+=povecavanjeSerija;}
        if (brojPonavljanja<15){
            brojPonavljanja+=povecavanjePonavljanja;}
    }
    var tabela = "";
    if (daLiDanasImamTrening == "yes") {
        tabela = "<table>";
        tabela += "<thead><tr><th>Vezba</th><th>Broj serija</th><th>Ponavljanje</th><th>Tezina</th></tr></thead>";
        q = vezbe[danUProgramu].length;
        for (var z = 0; z < q; z++) {
            var x = Math.floor(Math.random() * vezbe[danUProgramu][z].length);
            var y = Math.floor(Math.random() * vezbe[danUProgramu][z].length);
            tabela += "<tr><td>" + vezbe[danUProgramu][z][x] + "</td><td>" + brojSerijaVezbe + "</td><td>" + brojPonavljanjaUSeriji + "</td><td>" + opterecenje + "</td><td><input type='button' value='Mogu vise' id='moguVise1' onclick='povecavanje()'></td><td><input type='button' value='Mogu manje' id='moguManje1' onclick='smanjivanje()'></td></tr>";
            tabela += "<tr><td>" + vezbe[danUProgramu][z][y] + "</td><td>" + brojSerijaVezbe + "</td><td>" + brojPonavljanjaUSeriji + "</td><td>" + opterecenje + "</td>+<td><input type='button' value='Mogu vise' id='moguVise1' onclick='povecavanje()'></td><td><input type='button' value='Mogu manje' id='moguManje1' onclick='smanjivanje()'></td></tr>";
        }
        tabela += "</table>";
    }
    else {
        tabela = "Danas je dan za odmor.";
    }
    document.getElementById("tabelaNaDan").innerHTML = tabela;
    terminusPovecavanja();
    console.log(trening);
}




function stampa() {
    window.print();
}

function prikazProgramaZaSedmicu(event) {
    document.getElementById("programZaSedmicu").style.display = "block";
    document.getElementById("mojProfil").style.background = 'url("pozadina.jpg")';
    document.getElementById("mojProfil").style.backgroundSize = "cover";
    document.getElementById("mojProfil").style.backgroundAttachment = "fixed";
    document.getElementById("program").style.display = "none";
    document.getElementById("izmeniProfil").style.display = "none";
    document.getElementById("promenaSifre").style.display = "none";
    var daniUNedelji = ["ponedeljak", "utorak", "sreda", "cetvrtak", "petak", "subota", "nedelja"];
    var trening = racunanjeOptimalnogTreninga();
    var brojSerijaVezbe = trening.serije;
    var brojPonavljanjaUSeriji = trening.ponavljanja;
   
    var opterecenje = racunanjeOpterecenja();

    var tabela = "";
    tabela = "<table>";
    tabela += "<thead><tr><th>Dan i program</th></thead>";
    for (var j = 0; j <= 6; j++) {
        tabela += "<tr><th>" + daniUNedelji[j] + "</th></tr>";
        tabela += "<thead><tr><th>Vezba</th><th>Broj serija</th><th>Ponavljanje</th><th>Tezina</th></tr></thead>";
        var danUProgramu = izborProgramaZaNedelju(j);
        console.log(danUProgramu);
        var vezbe = podelaMisicaNaGrupe();
        console.log(vezbe.length, "dugo");
        if (danUProgramu == "odmor") {
            tabela += "<tr><td>danas je dan za odmor</td></tr>";
        } else {
            q = vezbe[danUProgramu].length;
            for (var z = 0; z < q; z++) {
                var x = Math.floor(Math.random() * vezbe[danUProgramu][z].length);
                var y = Math.floor(Math.random() * vezbe[danUProgramu][z].length);
                tabela += "<tr><td>" + vezbe[danUProgramu][z][x] + "</td><td>" + brojSerijaVezbe + "</td><td>" + brojPonavljanjaUSeriji + "</td><td>" + opterecenje + "</td></tr>";
                tabela += "<tr><td>" + vezbe[danUProgramu][z][y] + "</td><td>" + brojSerijaVezbe + "</td><td>" + brojPonavljanjaUSeriji + "</td><td>" + opterecenje + "</td></tr>";
            }
        }
    }
    tabela += "</table>";
    document.getElementById("tabelaZaSedmicu").innerHTML = tabela;
}

function promenaPodataka(event) {
    var user = proveraImena(localStorage.getItem('ulogovaniKorisnik'));
    var korisnici = sviKorisnici();
    var tezina = document.getElementById("tezina").value;
    var visina = document.getElementById("visina").value;
    var godine = document.getElementById("godine").value;
    var procenatMasti = document.getElementById("procenatMasti").value;
    var pol = odredjivanjePola();
    var modulTreninga = odredjivanjeModulaTreninga();
    var brojTreningaNedeljno = odabirBrojaTreningaNedeljno();
    for (var index = 0; index < korisnici.length; index++) {
        var korisnik = korisnici[index];
        if (user.user == korisnik.user) {
            if (visina != "") { korisnici[index].visina = visina; }
            if (pol != "") { korisnici[index].pol = pol; }
            if (tezina != "") { korisnici[index].tezina = tezina; }
            if (godine != "") { korisnici[index].godine = godine; }
            if (procenatMasti != "") { korisnici[index].procenatMasti = procenatMasti; }
            if (modulTreninga != "") { korisnici[index].modulTreninga = modulTreninga; }
            if (brojTreningaNedeljno != "") { korisnici[index].brojTreningaNedeljno = brojTreningaNedeljno; }
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
}
function odredjivanjePola() {
    var polovi = document.getElementsByName("gender");
    if (polovi[0].checked) {
        var odabraniPol = polovi[0].value;
    }
    else if (polovi[1].checked) {
        var odabraniPol = polovi[1].value;
    }
    else {
        var odabraniPol = "";
    }
    return odabraniPol;
}
function odredjivanjeModulaTreninga() {
    var moduli = document.getElementsByName("modul");
    if (moduli[0].checked) {
        var odabraniModul = moduli[0].value;
    }
    else if (moduli[1].checked) {
        var odabraniModul = moduli[1].value;
    }
    else if (moduli[2].checked) {
        var odabraniModul = moduli[2].value;
    }
    else if (moduli[3].checked) {
        var odabraniModul = moduli[3].value;
    }
    else { var odabraniModul = ""; }
    return odabraniModul;
}
function odabirBrojaTreningaNedeljno() {
    var brojevi = document.getElementsByName("brojTreninga");
    if (brojevi[0].checked) {
        var odabraniBroj = brojevi[0].value;
    } else if (brojevi[1].checked) {
        var odabraniBroj = brojevi[1].value;
    } else if (brojevi[2].checked) {
        var odabraniBroj = brojevi[2].value;
    } else if (brojevi[3].checked) {
        var odabraniBroj = brojevi[3].value;
    } else if (brojevi[4].checked) {
        var odabraniBroj = brojevi[4].value;
    } else if (brojevi[5].checked) {
        var odabraniBroj = brojevi[5].value;
    } else if (brojevi[6].checked) {
        var odabraniBroj = brojevi[6].value;
    } else {
        var odabraniBroj = "";
    }
    return odabraniBroj;
}
function racunanjeOptimalnogTreninga() {
    var trening;
    var ponavljanja;
    var serije;
    var tezina;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var terminus = terminusPovecavanja();
   
    if (korisnik.modulTreninga == 'masa') {
        trening = { serije: 3, ponavljanja: 6, povecavanjeSerija: 1, povecavanjePonavljanja: 1, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'definicija') {
        trening = { serije: 5, ponavljanja: 9, povecavanjeSerija: 0, povecavanjePonavljanja: 2, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'snaga') {
        trening = { serije: 2, ponavljanja: 3, povecavanjeSerija: 1, povecavanjePonavljanja: 1, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'kardio') {
        trening = { serije: 2, ponavljanja: 1, povecavanjeSerija: 1, povecavanjePonavljanja: 1, terminusPovecavanja: terminus, };
    }
    //postaviti maksimalan broj serija na 6 i maksimalan broj ponavljanja na 15.
    return trening;
}
function brojSerija() {
    var serije;
    var ponavljanja;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    if (korisnik.modulTreninga == 'masa') {
        serije = 4;

    }
    else if (korisnik.modulTreninga == 'definicija') {
        serije = 5;

    }
    else if (korisnik.modulTreninga == 'snaga') {
        serije = 2;

    }
    else if (korisnik.modulTreninga == 'kardio') {
        serije = 2

    }
    return serije;
}
function brojPonavljanja() {
    var serije;
    var ponavljanja;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    if (korisnik.modulTreninga == 'masa') {

        ponavljanja = 8;
    }
    else if (korisnik.modulTreninga == 'definicija') {

        ponavljanja = 10;
    }
    else if (korisnik.modulTreninga == 'snaga') {

        ponavljanja = 3;
    }
    else if (korisnik.modulTreninga == 'kardio') {

        ponavljanja = 1;
    }
    return ponavljanja;
}
function racunanjeOpterecenja() {
    var intezitet;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    intezitet = Math.round(korisnik.tezina / 2);
    return intezitet;
}





function vezbeZaTrening() {
    var vezbeZaGrudi = ["bench press", "kosi bench press", "obrnuto kosi bench press", "sklekovi", "dizanje bucica sa obe ruke", "razvlacenje"];
    var vezbeZaBiceps = ["dizanje jednorucnog tega", "dizanje dvorucnog tega sa Skotove klupe", "dizanje dvorucnog tega iz stojeceg polozaja", "povlacenje sa kross masine"];
    var vezbeZaTriceps = ["dizanje dvorucnog tega iz lezeceg polozaja", "dizanje bucice iz lezeceg polozaja", "povlacenje na cross masini", "dizanje jednorucnog tega iz stojeceg polozaja"];
    var vezbeZaLedja = ["povlacenje na lat masini na grudi", "veslanje", "dizanje jednorucnog tega iz naklona", "dizanje dvorucnog tega iz naklona", "dizanje tela iz lezeceg polozaja unazad"];
    var vezbeZaRamena = ["letenje", "potisak iz sedeceg polozaja na gore", "dizanje tega iz sedeceg polozaja na gore", "dizanje jednorucnih tegova ispred sebe", "povlacenje na lat masini iza glave"];
    var vezbeZaNoge1 = ["cucanj", "potisak napred", "potisak nogama"];
    var vezbeZaNoge2 = ["iskorak", "potisak nazad", "listovi"];
    var vezbe = [vezbeZaGrudi, vezbeZaBiceps, vezbeZaTriceps, vezbeZaLedja, vezbeZaRamena, vezbeZaNoge1, vezbeZaNoge2];

    return vezbe;
}
function vremeNaPocetkuNedelje() {
    var d = new Date();
    var vreme = d.getTime();
    var dan = danasnjiDan();
    if (dan !== 1) {
        var novoVreme = vreme - (dan * 86400000);
    } else {
        novoVreme = vreme;
    }
    return novoVreme;
}
function resetovanje() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var d = new Date();
    var trenutno = d.getTime();
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var korisnik = korisnici[index];
        if (ime.user == korisnik.user) {
            korisnici[index].vreme = trenutno;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));

}
function daLiJeVremeZaPovecavanje() {
    var povecati = false;
    var d = new Date();
    var vreme = d.getTime();
    var terminusKorisnika = terminusPovecavanja();
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var pocetnoVreme = korisnik.vreme;
    var protekloVreme = vreme - pocetnoVreme;
    if (terminusKorisnika > protekloVreme) {
        povecati = true;
        resetovanje();
    }
    return povecati;
}
function terminusPovecavanja() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var godine = korisnik.godine;
    var povecavanje;
    if (godine < 16) {
        var izraz = 1209600000;

    }
    if (godine >= 16 || godine < 35) {
        var izraz = 604800000;

    }
    if (godine >= 35) {
        var izraz = 1209600000;

    }
    return izraz;
}
function preporuceniModulTreninga() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var visina = korisnik.visina;
    var tezina = korisnik.tezina;
    var procenatMasti = korisnik.procenatMasti;
    var idealnaTezina = visina - 100;
    var razlikaUTezini = tezina - idealnaTezina;
    return tezineZaProfil = [idealnaTezina, razlikaUTezini];
}





function podelaMisicaNaGrupe() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var vezbe = vezbeZaTrening();
    var brojDana = korisnik.brojTreningaNedeljno;
    if (brojDana == 1) {
        var vezbeZaDan = [
            vezbe[0], vezbe[1], vezbe[2], vezbe[3], vezbe[4], vezbe[5], vezbe[6]
        ];
    }
    else if (brojDana == 2) {
        var vezbeZaDan = [[vezbe[0], vezbe[1], vezbe[2]], [vezbe[3], vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 3) {
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 4) {
        var vezbeZaDan = [[vezbe[0], vezbe[1], vezbe[2]], [vezbe[3], vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 5) {
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 6) {
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]]];
    }
    else if (brojDana == 7) {
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]]];
    }
    return vezbeZaDan;
}
function daniKojimaSeVezba() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var daniUNedelji = [1, 2, 3, 4, 5, 6, 7];
    var brojDana = korisnik.brojTreningaNedeljno;
    if (brojDana == 1) {
        var daniKojimaSeVezba = [daniUNedelji[5]];
    }
    else if (brojDana == 2) {
        var daniKojimaSeVezba = [daniUNedelji[2], daniUNedelji[5]];
    }
    else if (brojDana == 3) {
        var daniKojimaSeVezba = [daniUNedelji[1], daniUNedelji[3], daniUNedelji[5]];
    }
    else if (brojDana == 4) {
        var daniKojimaSeVezba = [daniUNedelji[0], daniUNedelji[1], daniUNedelji[4], daniUNedelji[5]];
    }
    else if (brojDana == 5) {
        var daniKojimaSeVezba = [daniUNedelji[0], daniUNedelji[1], daniUNedelji[3], daniUNedelji[4], daniUNedelji[5]];
    }
    else if (brojDana == 6) {
        var daniKojimaSeVezba = [daniUNedelji[0], daniUNedelji[1], daniUNedelji[2], daniUNedelji[3], daniUNedelji[4], daniUNedelji[5]];
    }
    else if (brojDana == 7) {
        var daniKojimaSeVezba = [daniUNedelji[0], daniUNedelji[1], daniUNedelji[2], daniUNedelji[3], daniUNedelji[4], daniUNedelji[5], daniUNedelji[6]];
    }
    return daniKojimaSeVezba;
}

function danasnjiDan() {
    var d = new Date();
    var dan = d.getDay();
    return dan;
}
function daLiDanasVezbam() {
    var dan = danasnjiDan();

    var daniZaVezbu = daniKojimaSeVezba();
    var odgovor;
    for (i = 0; i < daniZaVezbu.length; i++) {
        if (dan == daniZaVezbu[i]) {
            return odgovor = "yes";
        }
    }
    return odgovor = "no";
}
function programZaDan() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var brojDana = korisnik.brojTreningaNedeljno;
    var danDanas = danasnjiDan() - 1;
    if (brojDana == 1) {
        var opcije = ['', '', '', '', '', 1, ''];
    }
    else if (brojDana == 2) {
        var opcije = ['', '', 0, '', '', 1, '', ''];
    }
    else if (brojDana == 3) {
        var opcije = ['', 0, '', 1, '', 2, '', ''];
    }
    else if (brojDana == 4) {
        var opcije = [0, 1, '', '', 0, 1, ''];
    }
    else if (brojDana == 5) {
        var opcije = [0, 1, '', 2, 0, 1, '', ''];
    }
    else if (brojDana == 6) {
        var opcije = [0, 1, 2, 0, 1, 2, ''];
    }
    else if (brojDana == 7) {
        var opcije = [0, 1, 2, 0, 1, 2, 0];
    }
    var programKojiPrimenjujemo = opcije[danDanas];
    return programKojiPrimenjujemo;
}
function izborProgramaZaNedelju(x) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var brojDana = korisnik.brojTreningaNedeljno;
    var danDanas = x;
    if (brojDana == 1) {
        var opcije = ['odmor', 'odmor', 'odmor', 'odmor', 'odmor', 1, 'odmor'];
    }
    else if (brojDana == 2) {
        var opcije = ['odmor', 'odmor', 0, 'odmor', 'odmor', 1, 'odmor', 'odmor'];
    }
    else if (brojDana == 3) {
        var opcije = ['odmor', 0, 'odmor', 1, 'odmor', 2, 'odmor', 'odmor'];
    }
    else if (brojDana == 4) {
        var opcije = [0, 1, 'odmor', 'odmor', 0, 1, 'odmor'];
    }
    else if (brojDana == 5) {
        var opcije = [0, 1, 'odmor', 2, 0, 1, 'odmor', 'odmor'];
    }
    else if (brojDana == 6) {
        var opcije = [0, 1, 2, 0, 1, 2, 'odmor'];
    }
    else if (brojDana == 7) {
        var opcije = [0, 1, 2, 0, 1, 2, 0];
    }
    var programKojiPrimenjujemo = opcije[danDanas];
    return programKojiPrimenjujemo;
}
function povecavanjeOpterecenja() {

}//postepeno povecavanje opterecenja, broja ponavljanja, broja serija, tezine itd

//postaviti linkove ka korisnim sajtovima
//postaviti linkove sa informacijama o povredama
//insistirati na oprezu pri vezbanju