# CafeGame

Ataskaita: [Galutine_Ataskaita_Deividas_Davidavičius.docx](https://github.com/DeividasDavidavicius/CafeGame/files/13636626/Galutine_Ataskaita_Deividas_Davidavicius.docx)


## 1.	Problem Description
### 1.1.	System Purpose
The project's goal is to develop a system where people can book computers for specific time periods in different internet cafes.

The platform consists of two main parts:
• A web application used by registered users, administrators, and guests.
• An application programming interface (API).

A guest will be able to:
• View the list of all internet cafes.
• See the list of computers available in each cafe.
• Check the reservation list for each computer to know when they are occupied.
• Register as a new user.

A registered user will be able to:
• Create a reservation for a specific computer.
• View, edit (change duration), and cancel their reservations.
• An administrator will have full management capabilities, including:

Managing internet cafes, computers, and reservations (create, delete, update, and view).

### 1.2.	Functional Requirements
#### An unregistered system user will be able to:
1.	View the platform's landing page
2.	Log in to the web application
3.	Register on the web application
4.	View the list of all internet cafes
5.	View the list of computers in a selected internet cafe
6.	View the reservation list for a selected computer

#### A registered system user will be able to:
1.	Log out of the web application
2.	Reserve a computer in an internet cafe
3.	Cancel, edit, and view their reservations
4.	Perform all functions of an unregistered user

#### An administrator will be able to:
1.	Add, edit, and delete internet cafes
2.	Add, edit, and delete computers in internet cafes
3.	Edit and delete other users’ computer reservations
4.	Perform all functions of a registered user

## 2.	System Architecture
The system consists of the following components:

-	Client-side (Front-End) – Developed using React
-	Server-side (Back-End) – Developed using .NET 6
-	Database – PostgreSQL

The API and database are hosted on a DigitalOcean server, while the web application is hosted on a Vercel server. The web application is accessible via the HTTP protocol. The operation of this system (e.g., data manipulation with the database) requires the CafeGame API, which is accessible through the application programming interface. The CafeGame API handles data exchange with the database, utilizing EF Core (Entity Framework Core) ORM.

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/19fe1ffa-ca1f-44ae-b2a9-490d91cbe3a2)
<p align="center">
Figure 1. CafeGame System Deployment Diagram
</p>

## 3.	User Interface Architecture

This section presents wireframes and implementations of several system windows.

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/6c5e646c-ba3e-4f08-8ebf-e9648af42a8d)
<p align="center"> pav. 2. Login page wireframe </p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/8c7435c4-8994-4dd5-98b1-12ce9d1678c5)
<p align="center"> pav. 3. Login page implementation </p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/10b4b883-98fe-432b-a709-6d4be8553a6a)
<p align="center"> pav. 4. Registration page wireframe </p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/8cb54eae-c2ec-4cd4-a027-65a480b5aab5)
<p align="center">
pav. 5. Registration page implementation
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/b49c5a82-8fa9-4ab2-a51e-cfbd6e6f1ab2)
<p align="center">
pav. 6.  Administrator's management panel wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/75e99273-0f55-48b3-b59a-d709d1de4946)
<p align="center">
pav. 7.  Administrator's management panel implementation
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/d4d35cff-97f0-4cc4-a198-9ac975b54f15)
<p align="center">
pav. 8.  Administrator's internet cafe editing page wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/235e70d3-5aa7-4d5b-8f8d-76c44081d656)
<p align="center">
pav. 9.  Administrator's internet cafe editing page implementation
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/44805d6f-595d-473e-83c7-f09f6fac51f0)
<p align="center">
pav. 10. Administrator's internet cafe creation page wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/3b068ac8-19f9-4545-844c-186b26e384f7)
<p align="center">
pav. 11.  Administrator's internet cafe creation page implementation
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/4801ab58-b115-424d-b267-1a358434a3c5)
<p align="center">
pav. 12.  Administrator's internet cafe deletion page wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/e7f7d03f-8da7-49e0-89c1-b6beae2dfb27)
<p align="center">
pav. 13.  Administrator's Internet cafe deletion page implementation
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/8d0e2d66-ad50-435a-a641-a58bfbc1cce9)
<p align="center">
pav. 14.  All internet cafe list wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/b72ef3a2-bcca-4dba-9b13-795d039cb7b1)
<p align="center">
pav. 15.  All internet cafe list implementation
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/7b246fcf-549a-44f3-9b28-521ac8afa568)
<p align="center">
pav. 16.  All reservations list wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/3f03c6be-e924-4190-8877-51a4ddb2ed21)
<p align="center">
pav. 17.  All reservations list implementation
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/eb87fd22-fb9e-4dca-b814-f83fd287e355)
<p align="center">
pav. 18.  User's reservation list wireframe
</p>

![image](https://github.com/DeividasDavidavicius/CafeGame/assets/101116531/ebf6758e-6288-4115-854b-785e6fd54240)
<p align="center">
pav. 19.  User's reservation list implementation
</p>

[L0_Ataskaita_Deividas_Davidavičius.docx](https://github.com/DeividasDavidavicius/CafeGame/files/13635411/L0_Ataskaita_Deividas_Davidavicius.docx)




