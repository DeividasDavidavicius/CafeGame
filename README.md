# CafeGame
## 1.	Sprendžiamo uždavinio aprašymas
### 1.1.	Sistemos paskirtis
Projekto tikslas – sukurti sistemą, kurioje žmonės galėtų užsirezervuoti kompiuterius tam tikram laikotarpiui skirtingose interneto kavinėse.
Veikimo principas – pačią kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis registruoti naudotojai, administratoriai ir svečiai ir aplikacijų programavimo sąsaja.
Svečias galės peržiūrėti visų internetinių kavinių sąrašą, kavinėse esančių kompiuterių sąrašą bei kiekvieno kompiuterio rezervacijų sąrašą, kad pamatytu, kuriais laikais kompiuteriai bus užimti. Taip pat svečias galės užsiregistruoti. Registruotas naudotojas galės sukurti rezervaciją tam tikram kompiuteriui, taip pat galės peržiūrėti savo rezervacijų sąrašą, jas redaguoti (pakeisti trukmę) ir atšaukti. Administratorius galės valdyti interneto kavinių, kompiuterių ir rezervacijų įrašus, juos kurti, trinti, atnaujinti ir peržiūrėti.

### 1.2.	Funkciniai reikalavimai
#### Neregistruotas sistemos naudotojas galės:
1.	Peržiūrėti platformos reprezentacinį puslapį
2.	Prisijungti prie internetinės aplikacijos
3.	Registruotis prie internetinės aplikacijos
4.	Peržiūrėti visų interneto kavinių sąrašą
5.	Peržiūrėti pasirinktos interneto kavinės informaciją ir kavinės kompiuterių sąrašą
6.	Peržiūrėti pasirinkto kompiuterio informaciją ir rezervacijų sąrašą

#### Registruotas sistemos naudotojas galės:
1.	Atsijungti nuo internetinės aplikacijos
2.	Rezervuoti tam tikrą interneto kavinės kompiuterį
3.	Atšaukti, redaguoti, peržiūrėti savo rezervacijas
4.	Atlikti visas neregistruoto naudotojo funkcijas

#### Administratorius galės:
1.	Pridėti, redaguoti, ištrinti interneto kavines
2.	Pridėti, redaguoti, ištrinti interneto kavinės kompiuterius
3.	Redaguoti, ištrinti kitų vartotojų kompiuterių rezervacijas
4.	Atlikti visas registruoto naudotojo funkcijas

## 2.	Sistemos architektūra
Sistemos sudedamosios dalys:

•	Kliento pusė (ang. Front-End) – naudojant Angular;
•	Serverio pusė (angl. Back-End) – naudojant .NET 7. Duomenų bazė – MS SQL.

2.1 pav. pavaizduota kuriamos sistemos diegimo diagrama. Sistemos talpinimui yra naudojamas DigitalOcean serveris. Kiekviena sistemos dalis yra diegiama tame pačiame serveryje. Internetinė aplikacija yra pasiekiama per HTTP protokolą. Šios sistemos veikimui (pvz., duomenų manipuliavimui su duomenų baze) yra reikalingas CafeGame API, kuris pasiekiamas per aplikacijų programavimo sąsają. Pats CafeGame API vykdo duomenų mainus su duomenų baze. Tam yra naudojamas EF Core (Entity Framework Core) ORM.

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/c2862b04-d354-4fd7-859b-46646f385480)

<p align="center">
2.1 pav. Sistemos CafeGame diegimo diagrama
</p>
