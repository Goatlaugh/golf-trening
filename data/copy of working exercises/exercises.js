const data = {

// ✅ OPPVARMING
oppvarming: [
{navn:"Bekkentilt", tid:"Tid: 2 min", fokus:["Beveg bekken frem/tilbake","Stabil overkropp"], bilde:"images/gifs/bekkentilt.gif"},

{navn:"Sidebøy rygg", tid:"Tid: 2 min", fokus:["Bøy side til side","Unngå rotasjon"], bilde:"images/gifs/sideboy.gif"},

{navn:"Hofte/rygg separasjon", tid:"Tid: 2 min", fokus:["Roter motsatt vei","Øk mobilitet"], bilde:"images/gifs/hofte.gif"},

{navn:"Skulderrotasjon", tid:"Tid: 2 min", fokus:["Rolig rotasjon","Stabil kjerne"], bilde:"images/gifs/skulder.gif"},

{navn:"Rotasjon mot pinne", tid:"Tid: 2 min", fokus:["Hold vinkler stabile","Kontrollert rotasjon"], bilde:"images/gifs/rotasjon.gif"},

{navn:"Utoverrotasjon skulder", tid:"Tid: 2 min", fokus:["Aktiver bakside skulder","Kontrollert bevegelse"], bilde:"images/gifs/utover.gif"},

{navn:"Helikopter", tid:"Tid: 2 min", fokus:["Dynamisk rotasjon","Aktiver overkropp"], bilde:"images/gifs/helikopter.gif"}
],

// ✅ RANGE
range: [

{navn:"Grep", tid:"Tid: 1 min",
fokus:["Riktig grep","Stabil base"],
sjekkpunkter:[
"Ut i fingrene (der hvor bæreposen ligger)",
"V og V (venstre og høyre hand) mot venstre armhule/skulder",
"2 til 3 knokler vises på venstre hand",
"Ingen luft mellom grep og lillefinger"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/hvordan-ta-grepet",
bilde:"images/exercises/grep.jpg"
},

{navn:"Halvsving - L til L og Y til L", tid:"Tid: 3 min",
fokus:["Riktig posisjon","God balanse"],
fremgang:[
"Tren svingen med å starte med små bevegelser og øke svinglengden.",
"Steg 1: Sving 'Y' til 'Y'",
"Steg 2: Sving 'L' til 'Y'",
"Steg 3: 'L' til 'L'"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/halvsving-l-til-l.-y-til-l",
bilde:"images/exercises/halvsving.jpg"
},

{navn:"Sving tauet", tid:"Tid: 3 min",
fokus:["Riktig tempo","God sekvens"],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/sving-tauet",
bilde:"images/exercises/tau.jpg"
},

{navn:"Fleetwood - paraplyfinish", tid:"Tid: 2 min",
fokus:["Stabil finish","God balanse"],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/fleetwood-paraplyfinish",
bilde:"images/exercises/finish.jpg"
},

{navn:"Svinge på en fot", tid:"Tid: 5 min",
fokus:["Bedre balanse","Svingretning"],
fremgang:[
"Denne øvelsen passer for de som ønsker å endre svingretningen enten mer mot høyre eller venstre.",
"Venstre svingretning: Ved å legge ballen bak i oppstillingen tvinger man seg til å tilte mer bakover i ryggsøylen. Denne bevegelsen er som regel utfordrende for en som svinger mye venstre.",
"Høyre svingretning: Ved å legge ballen bak i oppstillingen tvinger man seg til å tilte mindre bakover i ryggsøylen. Denne bevegelsen er som regel utfordrende for en som svinger mye høyre."
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/svingretningovelse?redirect=new",
bilde:"images/exercises/enfot.jpg"
},

{navn:"Take-away med bøtte / ballong", tid:"Tid: 10 min",
fokus:["Riktig start","Rett køllebane"],
fremgang:[
"Plasser bøtta mellom underarmene og utfør en take-away",
"Dette er med på å skape:",
"1. Køllebladet holder seg nøytralt",
"2. Køllebladet er på utsiden av hendene i take-away",
"3. Kropp og armer koblet sammen"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/take-away-med-botte-ballong?redirect=new",
bilde:"images/exercises/takeaway.jpg"
},

{navn:"Pegg mot pinne i baksving", tid:"Tid: 10 min",
fokus:["Riktig baksving","God topp-posisjon"],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/pegg-mot-pinne-i-baksving?redirect=new",
bilde:"images/exercises/baksving.jpg"
},

{navn:"Sving over håndkle", tid:"Tid: 15 min",
fokus:["Treff ball først","Riktig lavpunkt"],
fremgang:[
"I denne øvelsen legger utøveren en handduk ca. to køllehoder før ballen",
"Deretter er oppgaven å slå baller, uten at køllehodet treffer handduken",
"Utføres dette riktig vil utøveren slå ned på ballen, noe som er en forutsetning for et godt balltreff uten pegg"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/sving-over-handduken",
bilde:"images/exercises/handkle.jpg"
},

{navn:"Planken - svingspor", tid:"Tid: 10 min",
fokus:["Riktig spor","Stabil køllebane"],
fremgang:[
"Sett opp en siktepinne som indikerer siktet",
"Sett deretter opp en 'planke' enten i retning venstre eller høyre for mål som krever at man enten svinger 'innenfra og ut' eller 'utenfra og inn'",
"Plasser køllebladet ved ballen og legg planken ca. 1-2cm på utsiden av køllebladet",
"Oppgaven er enkel: Slå ballen uten å treffe 'planken'"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/planken-lange-slag-med-svingspor",
bilde:"images/exercises/planke.jpg"
},

{navn:"Sving over pegg", tid:"Tid: 10 min",
fokus:["Kontroll på køllebane","Presist treff"],
fremgang:[
"Å slå opp på ballen med driver kan legge til rette for å optimalisere lengden med driver (i kombinasjon med dynamisk loft og balltreff)",
"Sett en pegg 4-5cm etter ballen, hvor intensjonen skal være å slå ballen, samtidig som køllen svinger over peggen"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/sving-over-peggen",
bilde:"images/exercises/pegg.jpg"
}

],

// ✅ CHIPPING
chipping: [

{navn:"Chip/pitch med rangebøtte", tid:"Tid: 5 min",
fokus:["Treff landingspunkt","Kontroller lengde"],
fremgang:[
"En øvelse for å koble hender og kropp sammen i chip/pitch-slaget",
"Plasser en rangebøtte/ballong mellom underarmene og slå chipper samtidig som bøtten holder seg mellom underarmene"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/chip-pitch-med-rangebotte",
bilde:"images/exercises/rangebøtte.jpg"
},

{navn:"Chippe med åpent blad", tid:"Tid: 5 min",
fokus:["Åpent blad","Myk landing"],
fremgang:[
"Et åpent blad skaper mer effektiv bounce/såle på køllen",
"Denne er til hjelp da den hindrer køllen og grave seg ned hvis man duffer",
"Tre referanser å se etter:",
"1. Skaftvinkel fremover",
"2. Åpent blad i oppstillingen",
"3. Åpent blad i baksvingen (køllen peker rett opp)"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/chippe-med-apent-blad",
bilde:"images/exercises/apent.jpg"
},

{navn:"Planken - Chipping", tid:"Tid: 5 min",
fokus:["Rett svingspor","Stabil kølle"],
fremgang:[
"Det som kjennetegner en god chippeteknikk er at svingen går i relativt rett linje (skapes gjennom et bratt svingplan)",
"Plasser en pappeske/planke slik at den sikter i riktig retning",
"Denne øvelsen sikrer at svingen går relativt rett, i motsetning til en sving med mye bue",
"Den sikrer også sikte og et nøytralt svingspor",
"NB: Det kan være lurt å benytte noe som ikke oppleves skummelt å treffe",
"Derfor er pappeske ofte foretrukket over en planke"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/planken-chipping",
bilde:"images/exercises/planke_chip.jpg"
},

{navn:"Chippe crosshanded", tid:"Tid: 5 min",
fokus:["Rolige hender","Stabil stroke"],
fremgang:[
"Denne øvelsen kan benyttes på to ulike måter",
"1. GOBBS-øvelse: Ta et crosshanded grep (bytt posisjon på hendene) og kjenn hvordan oppstillingen forandrer seg",
"Deretter skal du ta et normalt grep, men prøve å bevare samme oppstilling",
"Dette er en kanon øvelse for utøvere som har stor høyretilt i ryggsøylen (høyre skulder veldig lav)",
"2. Teknikkøvelse: Hvorfor ikke teste å slå crosshanded? Matt Fitzpatrick fra PGA-touren sverger til dette!"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/chippe-crosshanded",
bilde:"images/exercises/cross.jpg"
},

{navn:"Puttechippen", tid:"Tid: 5 min",
fokus:["Enkel bevegelse","Minimal håndledd"],
fremgang:[
"Å stå og slå som man putter i chipping kan være en god måte å løse det på",
"Tettere på ballen",
"Skaftet mer oppreist (upright). Det kan være hensiktsmessig å ta et puttegrep og noe lengre ned på grepet (MÅ ikke)",
"Ballposisjonen under eller før ballen",
"Dette gir gode forutsetninger for stabilitet i både retning og balltreff"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/puttechippen",
bilde:"images/exercises/puttechip.jpg"
},

{navn:"Chippeløype - ABC", tid:"Tid: 15 min",
fokus:["Treff soner","Spill realistisk"],
fremgang:[
"Øvelsen er delt opp i tre steg. Når man klarer et steg går man videre",
"Steg A: Tre på rad inn i valgt sone fra samme sted. Ballen kan plasseres fint i gresset",
"Steg B: Tre på rad inn i sone, men man slår aldri to baller fra samme sted. Bytt for hvert slag (uavhengig om man treffer eller ikke)",
"Steg C: Tre 'up and down' fra ulike steder. Ruller utslagssted, uavhengig om man klarer 'up and down'",
"Fullfører du ABC går du til neste nivå som gir mindre radius på sirklene"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/chippeloype-block-random-practice",
bilde:"images/exercises/abc.jpg"
}

],

// ✅ BUNKER
bunker: [

{navn:"Streken - Bunker", tid:"Tid: 15 min",
fokus:["Treff sanden samme sted","Konsistent kontakt"],
fremgang:[
"Lag en strek i sanden hvor man ønsker å treffe sanden",
"Hensikten med øvelsen er å treffe sanden akkurat der streken er",
"Ved å trene på å treffe streken vil utøverne bli bedre på å treffe riktig sted og ta riktig mengde sand når de slår bunkerslag",
"Tips til differensiering/variasjon i øvelsen:",
"Legg ballen ca. 5 cm etter streken – Fortsett å slå streken",
"Denne øvelsen kan bygges inn som første steg til Iphone",
"Kan brukes til å trene lange slag. Streken gir et klart svar på hvor i sanden køllen treffer"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/streken",
bilde:"images/exercises/streken.jpg"
},

{navn:"iPhone drill", tid:"Tid: 20 min",
fokus:["Stabil kropp","Kontrollert køllebane"],
fremgang:[
"Tegn en firkant med størrelse av en IPhone i sanden",
"Steg 1: Her skal utøverne prøve å slå bort sanden inne i iPhone. Inngangen i sanden skal være der Iphone starter",
"Steg 2: Legg en golfball midt inni Iphone gjør akkurat samme som i steg en og opplev at ballen flyr ut av bunkeren"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/iphone-mobilen",
bilde:"images/exercises/iphone.jpg"
}

],

// ✅ PUTTING
putting: [

{navn:"Pegg til pegg", tid:"Tid: 10 min",
fokus:["Kontroller tempo","Treff riktig linje"],
fremgang:[
"Hensikten med øvelsen er å skape en god rytme i puttebevegelsen",
"Å ha like lang baksving som nedsving er på ingen måte en fasit i golf, men kan være en god start for en nybegynner",
"I øvelsen skal baksvingen og nedsvingen gå til samme peggfarge slik illustrasjonen viser",
"Dette er en fin øvelse for golferen som 'hugger' på ballen når de putter"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/pegg-til-pegg",
bilde:"images/exercises/pegg_putting.jpg"
},

{navn:"Sko Leken", tid:"Tid: 30 min",
fokus:["Stabil stroke","Presisjon på kort hold"],
fremgang:[
"Starter en fot fra hullet og markerer området med en pegg.",
"En må sette to putter.",
"Klarer en det så beveger en seg en fot lengre vekk fra hullet",
"Regel:",
"2 treff → gå bak en fot",
"1 treff → samme sted",
"0 treff → nærmere med en fot"
],
video:"https://ovelsesbank.golfforbundet.no/ovelser/alle-ovelser/foten",
bilde:"images/exercises/skole.jpg"
}

],

};
