# Sistem de Logare pentru AI Agents Romania

Documentație pentru sistemul avansat de logare implementat în backend-ul aplicației AI Agents Romania.

## Configurare

Sistemul de logare este implementat folosind [Winston](https://github.com/winstonjs/winston) și extinderea [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file) pentru rotarea automată a fișierelor de log.

### Nivele de Log

Sistemul utilizează următoarele nivele de log (în ordine descrescătoare a severității):

1. `error`: Erori care necesită intervenție imediată
2. `warn`: Avertismente care nu blochează funcționarea, dar ar trebui investigate
3. `info`: Informații generale despre funcționarea aplicației
4. `http`: Loguri specifice pentru cereri HTTP
5. `verbose`: Detalii suplimentare care pot fi utile în depanare
6. `debug`: Informații de debugging detaliate
7. `silly`: Informații extrem de detaliate, de obicei utilizate temporar

Nivelul de log implicit este configurat în funcție de mediul de execuție:
- În producție: `info` (și nivele mai severe)
- În development: `debug` (și nivele mai severe)

Nivelul poate fi configurat explicit prin variabila de mediu `LOG_LEVEL`.

### Formate și Destinații

Logurile sunt trimise către multiple destinații:

1. **Consolă**: Format colorat, ușor de citit pentru dezvoltare
2. **Fișiere zilnice rotative**:
   - `application-YYYY-MM-DD.log`: Toate logurile
   - `error-YYYY-MM-DD.log`: Doar erorile
   - `exceptions-YYYY-MM-DD.log`: Excepții negestionate
   - `rejections-YYYY-MM-DD.log`: Promisiuni respinse negestionate

Fișierele sunt rotite zilnic și păstrate pentru perioade configurabile (14 zile pentru loguri generale, 30 de zile pentru erori).

## Utilizare

### Utilizare de bază

```typescript
import logger from '../utils/logger';

// Loguri de bază
logger.error('Mesaj de eroare');
logger.warn('Avertisment');
logger.info('Informație');
logger.debug('Detalii pentru debugging');

// Loguri cu metadate
logger.info('Operație completată', { userId: '123', duration: 350 });
```

### Contextual Logging

Poți crea un logger cu context predefinit pentru a menține consistența:

```typescript
import { createLoggerWithContext } from '../utils/logger';

// Pentru un modul sau serviciu
const serviceLogger = createLoggerWithContext({ service: 'payment-processor' });

serviceLogger.info('Procesare plată inițiată', { orderId: '12345' });
// Va loga cu metadatele: { service: 'payment-processor', orderId: '12345' }
```

### Middleware-uri

#### Request Logger

Middleware-ul `requestLogger` este activat automat în configurația Express. Acesta:

1. Generează un ID unic pentru fiecare cerere
2. Adaugă metode de logare în obiectul cererii
3. Loghează automat informații despre cerere și răspuns

Exemplu de utilizare în rute/controllere:

```typescript
app.get('/api/resource', (req, res) => {
  // req.logger este deja disponibil
  req.logger.info('Procesare cerere pentru resurse', { resourceId: '123' });
  
  // Codul tău pentru procesarea cererii
  
  res.json({ status: 'success' });
});
```

#### Performance Logger

Middleware-ul `performanceLogger` poate fi folosit pentru a măsura și loga performanța diferitelor componente:

```typescript
import { performanceLogger } from '../utils/logger';

// Adaugă-l pentru o rută specifică
app.get('/api/complex-operation', 
  performanceLogger('complex-operation'),
  (req, res) => {
    // Operația ta
    res.json({ result: 'success' });
  }
);
```

## Configurații Avansate

Pentru a modifica configurația sistemului de logare, editează fișierul `utils/logger.ts`. Opțiuni comune care pot fi ajustate:

- Format timestamp
- Format loguri
- Dimensiunea maximă a fișierelor
- Perioada de păstrare a fișierelor
- Metadate implicite

## Integrarea cu Servicii Externe

Sistemul poate fi extins pentru a trimite loguri către servicii externe precum:

- Elasticsearch/Kibana
- Loggly
- Papertrail
- CloudWatch

Pentru a adăuga integrări, instalează transportul Winston corespunzător și adaugă-l în configurația din `utils/logger.ts`.

## Best Practices

1. **Folosește nivelul corect**: Alege nivelul de log adecvat pentru fiecare mesaj
2. **Structurează metadatele**: Folosește obiecte structurate pentru metadate în loc de a le include în mesaj
3. **Evită PII**: Nu loga date personale identificabile (PII) sau informații sensibile
4. **Consistență**: Folosește un stil consistent pentru mesajele de log
5. **Context**: Include întotdeauna suficient context pentru a înțelege logul fără a fi necesare detalii suplimentare

## Troubleshooting

Dacă întâmpini probleme cu sistemul de logare:

1. Verifică permisiunile directorului `logs/`
2. Verifică nivelul de log configurat
3. Asigură-te că Winston și extensiile sunt instalate corect
4. Verifică spațiul disponibil pe disc