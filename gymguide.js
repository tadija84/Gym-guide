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
document.getElementById("logoutLink").addEventListener("click", stranicaZaLogout);
document.getElementById("pocetna").addEventListener("click", prikaziMojProfil);
document.getElementById("zaDa").addEventListener("click", izlogujGa);
document.getElementById("zaNe").addEventListener("click", prikaziMojProfil);
//document.getElementById("linkPromenaSifre").addEventListener("click", idiNaPromenuSifre);// style.display = id == 'linkPromenaSifre' ? 'block' : 'none';
document.getElementById("pokaziProgramZaSedmicu").addEventListener("click", prikazProgramaZaSedmicu);
document.getElementById("izmeniProfil").addEventListener("submit", promenaPodataka);
document.getElementById("prikazStatistike").addEventListener("click", prikaziStatistiku);
function klikNaLink(event) {
    event.preventDefault();
    var id = event.target.id;
    document.getElementById("register").style.display = id == 'registrujSe' ? 'block' : 'none';
    document.getElementById("login").style.display = id == 'loginLink' ? 'block' : 'none';
    document.getElementById("zaboravljenaSifra").style.display = id == 'linkZaboravljenaSifra' ? 'block' : 'none';

}
function prikaziMojProfil() {
    //event.preventDefault();

    document.body.style.backgroundImage = "url('pozadina-1.jpg')";

    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.getElementById("mojProfil").style.display = 'block';
    document.getElementById("home").style.display = 'block';
    hideDivs([ "izmeniProfil", "login", "program", "statistika", "programZaSedmicu","daLiSiSiguran", "register", "promenaSifre", "logout" ]);

    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var tezineKorisnika = preporuceniModulTreninga();
    var vezbeZaIspis = podelaMisicaNaGrupe();
    console.log(korisnik);

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
    var odradjeniTreninzi = [];
    var podaciOKorisniku = {
        user: user,
        pass: pass,
        confirmpass: confirmpass,
        answer: answer,
        secquestion: selektovan.options[selektovan.selectedIndex].innerHTML,
        vreme: vreme,
        odradjeniTreninzi: odradjeniTreninzi
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
    //document.getElementById("sadrzajPromenePodataka").style.display = "block";
    document.body.style.backgroundImage = "url('pozadina-2.jpg')";
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    //document.getElementById("promenaSifre").style.display = "none";*/  
    hideDivs([ "home", "program", "statistika", "programZaSedmicu","ispisOsnovnihPodataka", "register", "promenaSifre","logout" ]);
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
    localStorage.setItem('ulogovaniKorisnik', ime);
    prikaziMojProfil();
}
function stranicaZaLogout() {
    document.getElementById("logoutPage").style.display = "block";
    document.getElementById("daLiSiSiguran").style.display = "block";
    document.body.style.background = 'url("pozadina-3.jpg")';
    document.getElementById("logoutPage").style.backgroundSize = "cover";
    document.getElementById("logoutPage").style.backgroundAttachment = "fixed";
    hideDivs(["home", "izmeniProfil", "statistika", "programZaSedmicu", "register", "promenaSifre", "program"]);
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

function hideDivs(divs){
    for(var i=0;i<divs.length;i++){
        document.getElementById(divs[i]).style.display='none';
    }
}







function prikazVezbi() { } // moguce ubacivanje drugih vezbi za iste grupe misica
function preporucenaDijeta() { }// opciono
function preporuceniRecepti() { } //video sam u nekoj aplikaciji
function randomMotivacioniCitati() { }//Npr: Bol je samo iluzija
function imamUpalu() { var upalaMisica; }//u slucaju upale smanjiti intezitet
function upisUTabelu() { }//korisnik upisuje uu tabelu sta je radio
function prekidTreninga() { }//ako je mali prekid nastaviti treninge sa neznatno manjim intezitetom
//u suprotnom, krenuti od nule
function preracunavanjeOptimalnogTreninga() { }//U slucaju da imamo posla sa sirovinom koja dize 150 iz bendza



function prikazPrograma(event) {
    document.getElementById("program").style.display = "block";
    document.body.style.background = 'url("pozaadina-4.jpg")';
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    hideDivs([ "home","izmeniProfil", "login",  "statistika", "programZaSedmicu","daLiSiSiguran", "register", "promenaSifre","logout" ]);

    var datum = new Date();

    var danUSedmici = datum.getDay();
    if (danUSedmici == 0) {
        danUSedmici = 7
    }
    var udaljenostDoNedelje = 7 - danUSedmici;
    var daLiDanasImamTrening = daLiDanasVezbam(datum);
    console.log("da li vebam", daLiDanasImamTrening, datum);
    var tabela = "<table>";
    if (daLiDanasImamTrening == "no") {
        return document.getElementById("tabelaNaDan").innerHTML = "Danas je dan za odmor.";
    }
    tabela += danasnjaTabela(udaljenostDoNedelje);
    tabela += "</table>";
    document.getElementById("tabelaNaDan").innerHTML = tabela;
}

function racunanjePrograma(datum, udaljenostDoNedelje, n) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var korisnici = sviKorisnici();
    var vezbe = podelaMisicaNaGrupe();
    var trening = racunanjeOptimalnogTreninga();
    var brojSerijaVezbe = trening.serije;
    var brojPonavljanjaUSeriji = trening.ponavljanja;
    var opterecenje = racunanjeOpterecenja();
    var danUProgramu = programZaDan(datum);
    //var daLiDanasImamTrening = daLiDanasVezbam(datum);
    var povecavanjePonavljanja = trening.povecavanjePonavljanja;
    var povecavanjeSerija = trening.povecavanjeSerija;
    var daLiPovecati = daLiJeVremeZaPovecavanje();
    var odradjeniTreninzi = korisnik.odradjeniTreninzi;
    var zadnjiTrening;
    var brojTreningaKorisnika;
    zadnjiTrening = odradjeniTreninzi[odradjeniTreninzi.length - 1];
    if (zadnjiTrening !== undefined) {
        brojTreningaKorisnika = zadnjiTrening[1];
    } else {
        brojTreningaKorisnika = 0;
        zadnjiTrening = [];
    }
    var tabela = "";
    if (daLiPovecati == true) {
        if (brojSerijaVezbe < 6) {
            brojSerijaVezbe += povecavanjeSerija;
        }
        if (brojPonavljanjaUSeriji < 15) {
            brojPonavljanjaUSeriji += povecavanjePonavljanja;
        }
    }
    if (danUProgramu == "x") {
        tabela = "<td>Danas je dan za odmor.</td>";
    }
    else {
        //(daLiDanasImamTrening == "yes") { }
        var podaciZaStatistiku = [];
        podaciZaStatistiku.push(n);
        brojTreningaKorisnika += 1;
        podaciZaStatistiku.push(brojTreningaKorisnika);
        var w = 1;
        var q = vezbe[danUProgramu].length;
        for (var z = 0; z < q; z++) {

            var x = izborNasumicnogBroja(vezbe[danUProgramu][z].length);
            var y = izborNasumicnogBroja(vezbe[danUProgramu][z].length);
            while (y === x) {
                y = izborNasumicnogBroja(vezbe[danUProgramu][z].length);
            }
            var tezina1 = racunanjeOpterecenja(vezbe[danUProgramu][z][x]);
            var tezina2 = racunanjeOpterecenja(vezbe[danUProgramu][z][y]);
            podaciZaStatistiku.push(vezbe[danUProgramu][z][x]);
            podaciZaStatistiku.push(brojSerijaVezbe);
            podaciZaStatistiku.push(brojPonavljanjaUSeriji);
            podaciZaStatistiku.push(tezina1);
            podaciZaStatistiku.push(vezbe[danUProgramu][z][y]);
            podaciZaStatistiku.push(brojSerijaVezbe);
            podaciZaStatistiku.push(brojPonavljanjaUSeriji);
            podaciZaStatistiku.push(tezina2);
        }
        odradjeniTreninzi.push(podaciZaStatistiku);
    }

    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi = odradjeniTreninzi;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    terminusPovecavanja();
}
function stampa() {
    window.print();
}

function prikazProgramaZaSedmicu(event) {
    document.getElementById("programZaSedmicu").style.display = "block";
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.background = 'url("pozadina.jpg")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    hideDivs([ "izmeniProfil", "login", "program", "statistika", "daLiSiSiguran", "register", "promenaSifre","logout" ]);

    racunanjeProgramaZaSedmicu();
    var daniUNedelji = ["ponedeljak", "utorak", "sreda", "cetvrtak", "petak", "subota", "nedelja"];
    var ime = koJeUlogovan();
    var korisnik = proveraImena(ime);
    var datum = new Date();
    var danUSedmici = datum.getDay();
    if (danUSedmici == 0) {
        danUSedmici = 7
    }
    var brojDana = parseInt(korisnik.brojTreningaNedeljno);
    var udaljenostDoNedelje = 7 - danUSedmici;
    datum.setDate(datum.getDate() + udaljenostDoNedelje - 6);
    var tabela = "<table>";
    tabela += "<thead><tr><th colspan='6'>Dan i program</th></thead>";
    var www = 0;
    for (var i = 7; i > 0; i--) {
        datum.setDate(datum.getDate() + 1);
        var prethodniTreninzi = korisnik.odradjeniTreninzi;
        var d = datum.getDate();
        var m = datum.getMonth() + 1;
        var god = datum.getFullYear();
        var n = d.toString() + "." + m.toString() + "." + god.toString() + ".";
        tabela += "<tr><th colspan='6'>" + n + "</th></tr>";
        tabela += "<tr><th colspan='6'>" + daniUNedelji[www] + "</th></tr>";
         tabela += "<thead><tr><th>Vezba</th><th>Broj serija</th><th>Ponavljanje</th><th>Tezina</th></tr></thead>";
       var t = 0;
        var s = 200;
        var danUProgramu = izborProgramaZaNedelju(www);
        if (danUProgramu !== "odmor") {
            var zadnjiTrening = prethodniTreninzi[prethodniTreninzi.length - brojDana + www];
var zaProslediti=prethodniTreninzi.length - brojDana + www;
            if (zadnjiTrening !== undefined) {              
                var duzinaNizaNaDan = zadnjiTrening.length - 2;
                var brojVezbi = (duzinaNizaNaDan) / 4;
                var y = 2;
                for (var z = 0; z < brojVezbi; z++) {
                    tabela += "<tr>";
                    for (var w = 0; w < 4; w++) {
                        tabela += "<td >" + zadnjiTrening[y] + "</td>";
                        y++;
                    }
                    t++;
                    s++;
                    tabela += "<td><input type='button' value='&#x25B2;' id=" + t + " onclick=' var y=" + y + ";var privremeno=" + zadnjiTrening[y - 1] + "; var zaProslediti="+zaProslediti+"; povecavanjeTezineUSedmicnojTabeli(privremeno,y,zaProslediti)'></td><td><input type='button' id=" + s + " value='&#x25BC;'  onclick='var y=" + y + "; var privremeno=" + zadnjiTrening[y - 1] + ";var smanjiZa=" + zaProslediti + ";smanjivanjeTezineUSedmicnojTabeli(privremeno,y,smanjiZa)'></td>";
                    tabela += "</tr>";
                }
            }      
        } else {
            tabela += "<tr><td>Dan za odmor</td></tr>";
        }
        www++;
        udaljenostDoNedelje--;
    }
    tabela += "</table>";
    document.getElementById("tabelaZaSedmicu").innerHTML = tabela;
}
function racunanjeProgramaZaSedmicu() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var odradjeniTreninzi = korisnik.odradjeniTreninzi;
    var zadnjiTrening = odradjeniTreninzi[odradjeniTreninzi.length - 1];
    var datum = new Date();
    var dan = datum.getDate();
    var mesec = datum.getMonth() + 1;
    var godina = datum.getFullYear();
    var sad = dan.toString() + "." + mesec.toString() + "." + godina.toString() + ".";
    if (zadnjiTrening == undefined) {
        zadnjiTrening = [];
    }
    var danUSedmici = datum.getDay();
    if (danUSedmici == 0) {
        danUSedmici = 7;
    }
    //iz nekog cudnog razloga mi vraca datum ranije nego sto bi trebalo
    var udaljenostDoNedelje = 7 - danUSedmici;
    datum.setDate(datum.getDate() + udaljenostDoNedelje - 6);
    var j = 7;
    for (var i = 1; i <= 7; i++) {
        var d = datum.getDate();
        var m = datum.getMonth() + 1;
        var god = datum.getFullYear();
        var n = d.toString() + "." + m.toString() + "." + god.toString() + ".";
        for (var l = 0; l < odradjeniTreninzi.length; l++) {
            if (n == odradjeniTreninzi[l][0]) {
                var kontrolniDatum = n;
            }
        } if (kontrolniDatum == n) {
            continue;
        }
        racunanjePrograma(datum, j, n);
        j--;
        datum.setDate(datum.getDate() + 1);
    }
}

function izborNasumicnogBroja(x) {
    var broj = Math.floor(Math.random() * x);
    return broj
}

function prikaziStatistiku() {
    document.getElementById("statistika").style.display = "block";
    document.body.style.backgroundColor = "#f3f3f3";
    document.body.style.background = 'url("pozadina8.jpg")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    hideDivs(["home", "izmeniProfil", "logout", "programZaSedmicu", "register", "promenaSifre", "program"]);
    var ime = koJeUlogovan();;
    var korisnik = proveraImena(ime);
    var prethodniTreninzi = korisnik.odradjeniTreninzi;
    var tabela = "<table>";
    for (var i = 0; i < prethodniTreninzi.length; i++) {
        tabela += "<tr>";
        tabela += "<th colspan='4'>" + prethodniTreninzi[i][0] + "</th></tr>";
        var n = (prethodniTreninzi[i].length - 2) / 4;
        var y = 2;
        for (var z = 1; z <= n; z++) {
            tabela += "<tr>";
            for (var w = 0; w <= 3; w++) {
                tabela += "<td >" + prethodniTreninzi[i][y] + "</td>";;
                y++;
            }
            tabela += "</tr>";
        }
    }
    tabela += "</table>";
    document.getElementById("podaciOPrethodnimTreninzima").innerHTML = tabela;
    return tabela;
}
function koJeUlogovan() {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    return ime;
}
function danasnjaTabela(udaljenostDoNedelje) {
    racunanjeProgramaZaSedmicu();
    var ime = koJeUlogovan();
    var korisnik = proveraImena(ime);
    var brojDana = korisnik.brojTreningaNedeljno;
    var prethodniTreninzi = korisnik.odradjeniTreninzi;
    var datum = new Date();
    var d = datum.getDate();
    var m = datum.getMonth() + 1;
    var god = datum.getFullYear();
    var n = d.toString() + "." + m.toString() + "." + god.toString() + ".";
    for (var redniBrojTreninga = 0; redniBrojTreninga < prethodniTreninzi.length; redniBrojTreninga++) {
        console.log(n);
        if (n == prethodniTreninzi[redniBrojTreninga][0]) {



            var zadnjiTrening = prethodniTreninzi[redniBrojTreninga];
            var tabela = "";
            tabela += "<tr><th colspan='6'>" + zadnjiTrening[0] + "</th></tr>";
            var n = (zadnjiTrening.length - 2) / 4;
            var y = 2;
            var t = 0;
            var s = 200;

            for (var z = 0; z < n; z++) {
                tabela += "<tr>";
                for (var w = 0; w < 4; w++) {
                    tabela += "<td >" + zadnjiTrening[y] + "</td>";

                    y++;
                }
                console.log("y bude",y)
                t++;
                s++;
                tabela += "<td><input type='button' class='strelice' value='&#x25B2;' id=" + t + " onclick=' var y=" + y + "; var redniBrojTreninga="+redniBrojTreninga+"; var privremeno=" + zadnjiTrening[y-1]+ "; povecavanjeTezine(privremeno,y,redniBrojTreninga)'></td><td><input type='button' id=" + s + " value='&#x25BC;' class='strelice'  onclick='var y=" + y + ";  var redniBrojTreninga="+redniBrojTreninga+";var privremeno=" + zadnjiTrening[y - 1] + ";smanjivanjeTezine(privremeno,y,redniBrojTreninga)'></td>";
                tabela += "</tr>";
            }
        }
    }
    return tabela;
}

function promenaPodataka(event) {
    var user = proveraImena(localStorage.getItem('ulogovaniKorisnik'));
    var korisnici = sviKorisnici();
    var tezina = document.getElementById("tezina").value;
    var modulTreninga = odredjivanjeModulaTreninga();
    var visina = document.getElementById("visina").value;
    var godine = document.getElementById("godine").value;
    var procenatMasti = document.getElementById("procenatMasti").value;
    var pol = odredjivanjePola();
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
    racunanjeProgramaZaSedmicu();
    location.reload();
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
    var trening = {};
    var ponavljanja;
    var serije;
    var tezina;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var terminus = terminusPovecavanja();

    if (korisnik.modulTreninga == 'masa') {
        trening = { serije: 3, ponavljanja: 6, povecavanjeSerija: 1, povecavanjePonavljanja: 1, povecavanjeOpterecenja: 2.5, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'definicija') {
        trening = { serije: 5, ponavljanja: 9, povecavanjeSerija: 0, povecavanjePonavljanja: 2, povecavanjeOpterecenja: 2.5, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'snaga') {
        trening = { serije: 2, ponavljanja: 3, povecavanjeSerija: 1, povecavanjePonavljanja: 1, povecavanjeOpterecenja: 2.5, terminusPovecavanja: terminus, };
    }
    else if (korisnik.modulTreninga == 'kardio') {
        trening = { serije: 2, ponavljanja: 1, povecavanjeSerija: 1, povecavanjePonavljanja: 1, povecavanjeOpterecenja: 2.5, terminusPovecavanja: terminus, };
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
function racunanjeOpterecenja(x) {
    var intezitet;
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var odradjeniTreninzi = korisnik.odradjeniTreninzi;
    var daLiPovecati = daLiJeVremeZaPovecavanje();
    var povecanje = 0;
    if (daLiPovecati == true) {
        povecanje = 2.5;
    }
    intezitet = Math.round(korisnik.tezina / 2);
    if (korisnik.pol == "female") {
        intezitet *= 0.7;
    }
    var korisnici = sviKorisnici();
    for (var index = odradjeniTreninzi.length - 1; index > 0; index--) {
        for (var z = odradjeniTreninzi[index].length; z > 0; z--) {
            if (odradjeniTreninzi[index][z] == x) {

                intezitet = odradjeniTreninzi[index][z + 3];

                if (intezitet < 150) {
                    intezitet += povecanje;
                }


                return intezitet;
            }
        }
    }

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
    var kardio = ["trcanje", "nordijsko skijanje", "voznja bicikle"];
    var vezbe = [vezbeZaGrudi, vezbeZaBiceps, vezbeZaTriceps, vezbeZaLedja, vezbeZaRamena, vezbeZaNoge1, vezbeZaNoge2, kardio];

    return vezbe;
}
function vremeNaPocetkuNedelje() {
    var d = new Date();
    var vreme = d.getTime();
    var dan = d.getDay();
    if (dan == 0) {
        dan = 7;
    }
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
        if (korisnik.user == ime.user) {
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
    if (terminusKorisnika < protekloVreme) {
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
        var vezbeZaDan = [[vezbe[0], vezbe[1]], [vezbe[2], vezbe[3]], [vezbe[4], vezbe[5], vezbe[6]], [vezbe[7]]];
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

function danasnjiDan(datum) {
    var d = new Date(datum);
    var dan = d.getDay();
    return dan;
}
function daLiDanasVezbam(datum) {
    var dan = danasnjiDan(datum);
    if (dan == 0) {
        dan = 7;
    }
    var daniZaVezbu = daniKojimaSeVezba();
    var odgovor;
    for (i = 0; i < daniZaVezbu.length; i++) {
        if (dan == daniZaVezbu[i]) {
            console.log("datum", daniZaVezbu[i]);
            return odgovor = "yes";
        }
    }
    return odgovor = "no";
}
function programZaDan(datum) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var brojDana = parseInt(korisnik.brojTreningaNedeljno);
    var dan = danasnjiDan(datum);

    if (dan == 0) {
        dan = 7
    }

    var danDanas = dan - 1;

    if (brojDana == 1) {
        var opcije = ['x', 'x', 'x', 'x', 'x', 1, 'x'];
    }
    else if (brojDana == 2) {
        var opcije = ['x', 'x', 0, 'x', 'x', 1, 'x', 'x'];
    }
    else if (brojDana == 3) {
        var opcije = ['x', 0, 'x', 1, 'x', 2, 'x', 'x'];
    }
    else if (brojDana == 4) {
        var opcije = [0, 1, 'x', 'x', 0, 1, 'x'];
    }
    else if (brojDana == 5) {
        var opcije = [0, 1, 'x', 2, 0, 1, 'x', 'x'];
    }
    else if (brojDana == 6) {
        var opcije = [0, 1, 2, 0, 1, 2, 'x'];
    }
    else if (brojDana == 7) {

        var opcije = [0, 1, 2, 0, 1, 2, 3];
    }
    var programKojiPrimenjujemo = opcije[danDanas];


    return programKojiPrimenjujemo;

}
function izborProgramaZaNedelju(x) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var brojDana = korisnik.brojTreningaNedeljno;

    console.log("dandanas", x)
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
    var programKojiPrimenjujemo = opcije[x];
    console.log("programkojiprimenj", programKojiPrimenjujemo)
    return programKojiPrimenjujemo;
}
function povecavanjeTezine(tezina, y,redniBrojTreninga) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var prethodniTreninzi = korisnik.odradjeniTreninzi;
    tezina += 2.5;

    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi[redniBrojTreninga][y - 1] = tezina;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    prikazPrograma();

}
function smanjivanjeTezine(tezina, y,redniBrojTreninga) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var prethodniTreninzi = korisnik.odradjeniTreninzi;
    tezina -= 2.5;

    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi[redniBrojTreninga][y - 1] = tezina;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    prikazPrograma();
}
function povecavanjeTezineUSedmicnojTabeli(tezina, y,n) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var prethodniTreninzi = korisnik.odradjeniTreninzi;
    var zadnjiTrening = prethodniTreninzi[smanjiZa];
    var smanjiZa;


    tezina += 2.5;
    console.log("smanjiza", smanjiZa)
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi[n][y - 1] = tezina;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    prikazProgramaZaSedmicu();
}
function smanjivanjeTezineUSedmicnojTabeli(tezina, y, smanjiZa) {
    var ime = localStorage.getItem('ulogovaniKorisnik');
    var korisnik = proveraImena(ime);
    var prethodniTreninzi = korisnik.odradjeniTreninzi;
    var zadnjiTrening = prethodniTreninzi[smanjiZa];
    tezina -= 2.5;
    ;
    var korisnici = sviKorisnici();
    for (var index = 0; index < korisnici.length; index++) {
        var user = korisnici[index];
        if (korisnik.user == user.user) {
            korisnici[index].odradjeniTreninzi[smanjiZa][y - 1] = tezina;
        }
    }
    localStorage.setItem('korisnik', JSON.stringify(korisnici));
    prikazProgramaZaSedmicu();
}
//postepeno povecavanje opterecenja, broja ponavljanja, broja serija, tezine itd

//postaviti linkove ka korisnim sajtovima
//postaviti linkove sa informacijama o povredama
//insistirati na oprezu pri vezbanju