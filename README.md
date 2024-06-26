# Azil za životinje - Web Aplikacija

Ovo je projekt web stranice azila za životinje, razvijen pomoću Reacta za frontend i Expressa za backend.

## Sadržaj

- [Opis Projekta](#opis-projekta)
- [Tehnologije](#tehnologije)
- [Postavljanje Projekta](#postavljanje-projekta)

## Opis Projekta

Cilj ovog projekta je stvoriti web stranicu koja omogućava korisnicima pregled dostupnih životinja za udomljavanje, kao i pružanje informacija o azilu. Admini mogu dodavati, uređivati i brisati informacije o životinjama.

## Tehnologije

- **Frontend:** React
- **Backend:** Express
- **Baza podataka:** MongoDB
- **Stilski okvir:** CSS

## Postavljanje Projekta

Slijedite ove korake za postavljanje i pokretanje projekta lokalno:

### Kloniranje Repozitorija

```sh
git clone https://github.com/isucic/Azil-za-zivotinje-v2.git
```

### Instalacija

#### Backend

1. Idite u direktorij `server`:
   ```sh
   cd server
   ```
2. Instalirajte potrebne pakete:
   ```sh
   npm install
   ```

#### Frontend

1. Idite u direktorij `react-app`:
   ```sh
   cd ../react-app
   ```
2. Instalirajte potrebne pakete:
   ```sh
   npm install
   ```

### Pokretanje Projekta

#### Backend

1. Vratite se u direktorij `server` (ako već niste):
   ```sh
   cd server
   ```
2. Pokrenite server:
   ```sh
   npm run start
   ```

#### Frontend

1. Idite u direktorij `react-app`:
   ```sh
   cd ../react-app
   ```
2. Pokrenite server:
   ```sh
   npm run dev
   ```

### Konfiguracija

Provjerite datoteku `config.js` u `server` direktoriju za konfiguraciju baze podataka i drugih postavki.
