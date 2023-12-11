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
5.	Peržiūrėti pasirinktos interneto kavinės kompiuterių sąrašą
6.	Peržiūrėti pasirinkto kompiuterio rezervacijų sąrašą

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
pav. 1 Sistemos CafeGame diegimo diagrama
</p>

## 3.	Naudotojo sąsajos architektūra

Čia bus pateikta keletos langų wireframe ir realizacijos:
![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/6c5e646c-ba3e-4f08-8ebf-e9648af42a8d)
<p align="center">
pav. 2. Prisijungimo lango wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/8c7435c4-8994-4dd5-98b1-12ce9d1678c5)
<p align="center">
pav. 3. Prisijungimo lango realizacija
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/10b4b883-98fe-432b-a709-6d4be8553a6a)
<p align="center">
pav. 4. Registracijos lango wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/8cb54eae-c2ec-4cd4-a027-65a480b5aab5)
<p align="center">
pav. 5. Registracijos lango realizacija
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/b49c5a82-8fa9-4ab2-a51e-cfbd6e6f1ab2)
<p align="center">
pav. 6.  Administratoriaus Internet Cafe valdymo lango wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/75e99273-0f55-48b3-b59a-d709d1de4946)
<p align="center">
pav. 7.  Administratoriaus Internet Cafe valdymo lango realizacija
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/d4d35cff-97f0-4cc4-a198-9ac975b54f15)
<p align="center">
pav. 8.  Administratoriaus Internet Cafe redagavimo lango wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/235e70d3-5aa7-4d5b-8f8d-76c44081d656)
<p align="center">
pav. 9.  Administratoriaus Internet Cafe redagavimo lango realizacija
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/44805d6f-595d-473e-83c7-f09f6fac51f0)
<p align="center">
pav. 10.  Administratoriaus Internet Cafe kūrimo lango wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/3b068ac8-19f9-4545-844c-186b26e384f7)
<p align="center">
pav. 11.  Administratoriaus Internet Cafe kūrimo lango realizacija
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/4801ab58-b115-424d-b267-1a358434a3c5)
<p align="center">
pav. 12.  Administratoriaus Internet Cafe trynimo lango wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/e7f7d03f-8da7-49e0-89c1-b6beae2dfb27)
<p align="center">
pav. 13.  Administratoriaus Internet Cafe trynimo lango realizacija
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/8d0e2d66-ad50-435a-a641-a58bfbc1cce9)
<p align="center">
pav. 14.  Internet Cafes sąrašas, kurį mato visi naudotojai wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/b72ef3a2-bcca-4dba-9b13-795d039cb7b1)
<p align="center">
pav. 15.  Internet Cafes sąrašas, kurį mato visi naudotojai realizacija
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/7b246fcf-549a-44f3-9b28-521ac8afa568)
<p align="center">
pav. 16.  Rezervacijų sąrašas, kurį mato visi naudotojai wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/3f03c6be-e924-4190-8877-51a4ddb2ed21)
<p align="center">
pav. 17.  Rezervacijų sąrašas, kurį mato visi naudotojai realizacija
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/eb87fd22-fb9e-4dca-b814-f83fd287e355)
<p align="center">
pav. 18.  Naudotojo rezervacijų sąrašas, kurį mato visi naudotojai wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/ebf6758e-6288-4115-854b-785e6fd54240)
<p align="center">
pav. 19.  Naudotojo rezervacijų sąrašas, kurį mato visi naudotojai realizacija
</p>

[L0_Ataskaita_Deividas_Davidavičius.docx](https://github.com/DeividasDavidavicius/CafeGame/files/13635411/L0_Ataskaita_Deividas_Davidavicius.docx)




