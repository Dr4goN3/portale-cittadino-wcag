# Portale Cittadino WCAG

Prototipo di interfaccia web accessibile sviluppato come caso di studio per la tesi:  
**"Progettazione e sviluppo di un'interfaccia web accessibile secondo le linee guida WCAG 2.2: principi, tecniche e verifica dell'usabilità"**

## Contesto

Il progetto simula uno **Sportello Demografico** comunale e riproduce un flusso realistico di interazione:

1. **Home** — lista di servizi disponibili con stato di disponibilità
2. **Dettaglio servizio** — scheda informativa con costi, tempi e documenti necessari
3. **Contatto** — form reattivo con validazione accessibile, error summary e messaggio di conferma

L'accessibilità è stata integrata fin dalla progettazione (*accessibility-by-design*), con conformità target **WCAG 2.2 Level AA**. Le principali tecniche adottate:

- Semantica HTML nativa e uso limitato di ARIA
- Skip link, focus visibile e ordine di navigazione da tastiera
- Error summary con focus programmato in caso di errori di validazione
- Messaggi di stato annunciati via `role="status"` / `aria-live="polite"` senza spostamento del focus
- Contrasto rispettoso dei criteri 1.4.3 e 1.4.11
- Reflow a 320 px (WCAG 1.4.10)
- Internazionalizzazione italiano/inglese con ngx-translate

## Stack tecnico

| | |
|---|---|
| Framework | Angular 20.3.0 (standalone components, lazy routing) |
| Stili | SCSS con design token (variabili, mixin, tipografia) |
| i18n | ngx-translate v17 |
| Node | ≥ 18 |

## Prerequisiti

- **Node.js** ≥ 18 — [nodejs.org](https://nodejs.org)
- **npm** ≥ 9 (incluso con Node)
- **Angular CLI** (opzionale, ma consigliato)

```bash
npm install -g @angular/cli
```

### Verifica Node e npm

Controlla se Node è già installato:

```bash
node -v
npm -v
```

### Gestione versioni con nvm (consigliato)

[nvm](https://github.com/nvm-sh/nvm) permette di installare e passare tra versioni di Node senza conflitti.

**Installazione nvm** (macOS / Linux):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Riapri il terminale, poi:

```bash
# Verifica che nvm sia attivo
nvm --version

# Installa Node 20 LTS
nvm install 20

# Usalo nel progetto
nvm use 20

# Imposta come default
nvm alias default 20
```

**Windows:** usa [nvm-windows](https://github.com/coreybutler/nvm-windows) — scarica l'installer dalla pagina Releases.

> Se non vuoi usare nvm, puoi scaricare l'installer direttamente da [nodejs.org](https://nodejs.org) (scegli la versione LTS).

## Avvio in sviluppo

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il server di sviluppo
npm start
```

L'applicazione sarà disponibile su `http://localhost:4200/`.  
Il server si ricarica automaticamente ad ogni modifica ai sorgenti.

## Build di produzione

```bash
npm run build
```

Gli artefatti vengono generati nella cartella `dist/portale-cittadino-wcag/`.

## Test unitari

```bash
npm test
```

## Struttura del progetto

```
src/
├── app/
│   ├── core/               # Header, Footer, SkipLink
│   ├── features/
│   │   ├── home/           # Pagina lista servizi
│   │   ├── service-detail/ # Pagina dettaglio servizio
│   │   └── contact/        # Form di contatto
│   └── shared/
│       ├── components/     # Breadcrumb, StatusMessage
│       └── validators/     # Validatori custom (telefono, whitespace)
├── styles/                 # _variables.scss, _mixins.scss, _typography.scss
└── public/assets/i18n/     # en.json, it.json
```
