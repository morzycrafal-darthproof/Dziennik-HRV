# Dziennik ciśnienia — kontekst projektu

Aplikacja do zapisywania domowych pomiarów ciśnienia krwi i tętna.
Repo: `morzycrafal-darthproof/Dziennik-HRV` · hosting: GitHub Pages
(`https://morzycrafal-darthproof.github.io/Dziennik-HRV/`)

## Założenia

- Typowy scenariusz: **dwa pomiary dziennie** (rano, wieczór) plus okazjonalny trzeci
  („dodatkowy"). Ten rytm ma być widoczny w UI, nie ukryty w polu tekstowym.
- Obsługa głównie z telefonu (Pixel 9 Pro XL, Android, Chrome), zainstalowana jako PWA.
- Interfejs po polsku. Nazwy zmiennych i funkcji w kodzie również po polsku.
- Aplikacja tylko **notuje** pomiary — nie stawia diagnoz i nie doradza medycznie.
  Klasyfikacja kolorystyczna jest informacyjna i tak jest opisana w stopce.

## Stos technologiczny

Celowo bez frameworków i bez kroku budowania — jeden plik HTML z wbudowanym CSS i JS,
żeby dało się edytować bezpośrednio na GitHubie i żeby PWA działała offline.

| Plik | Rola |
|------|------|
| `index.html` | całość: struktura, style, logika |
| `manifest.json` | manifest PWA (`display: standalone`, motyw `#123a33`) |
| `sw.js` | service worker, cache `cisnienie-v1`, strategia cache-first |
| `icon-192.png`, `icon-512.png` | ikona: linia EKG na ciemnej zieleni, półprzezroczyste serce w tle |

Wszystkie pliki leżą w **korzeniu repo** — Pages serwuje branch `main`, folder `/ (root)`.

## Model danych

Pomiary w `localStorage` pod kluczem `pomiary-cisnienia-v1`, jako tablica JSON
posortowana malejąco po `data + godzina`:

```js
{
  id: "1733160000000-a3f9k",   // timestamp + losowy sufiks
  data: "2026-10-18",          // ISO
  godzina: "08:15",
  skurczowe: 128,              // górne, int
  rozkurczowe: 82,             // dolne, int
  tetno: 64,                   // int albo null
  pora: "rano",                // "rano" | "wieczór" | "dodatkowy"
  notatka: ""                  // string, może być pusty
}
```

Brak backendu i brak synchronizacji — dane nie opuszczają przeglądarki. Jedyna kopia
zapasowa to eksport CSV (średnik jako separator, BOM na początku, żeby Excel nie rozwalił
polskich znaków). Import pomija duplikaty, czyli wpisy z identycznymi `data + godzina + skurczowe +
rozkurczowe + tetno` (dwa różne pomiary w tej samej minucie są zachowywane).

## Kluczowe elementy logiki w `index.html`

- Układ: cztery strony (`<main class="strona">`) przełączane dolnym paskiem `#nawigacja` —
  **Pomiar** (stan, „Dziś”, przypomnienie o kopii, formularz; strona startowa), **Historia**
  (wykres, lista), **Raport**, **Kopia**. `pokazStrone()` przełącza; z innych stron systemowe
  „wstecz” wraca do Pomiaru (`history.pushState`/`popstate`).

- `KATEGORIE` + `kategoria(s, r)` — klasyfikacja wg wyższej z dwóch wartości, od „niskie"
  po „nadciśnienie 3°"; każda kategoria ma kolor używany w kafelku stanu i na paskach
  przy wpisach historii.
- `rysujStan()` — ostatni pomiar, plakietka kategorii, średnie z 7 dni.
- `rysujWykres()` — wykres SVG rysowany ręcznie, bez bibliotek: ostatnie 30 pomiarów,
  dwie linie (górne/dolne) plus przerywane linie odniesienia 120 i 80. Ukrywa się przy
  mniej niż dwóch pomiarach.
- `rysujListe()` — historia pogrupowana po dniach, z „Dzisiaj"/„Wczoraj" i polskimi
  nazwami dni.
- `terazDoPol()` — podstawia bieżącą datę i godzinę, ustawia porę na „rano" przed 14:00,
  w przeciwnym razie „wieczór".
- `pomiaryZOkresu()` + `srednie()` — średnie liczone tylko z pomiarów porannych i wieczornych
  (dodatkowe są pomijane); wspólne dla karty stanu i raportu.
- `rysujRaport()` — raport dla lekarza: widok A4 do druku / zapisu jako PDF (`window.print()`),
  zakres dat, podsumowanie, średnie tygodniowe, wykres z osią czasu, tabela dzienna,
  pomiary dodatkowe z powodem. Bez kategorii i kolorów ocen.
- Walidacja przed zapisem: zakresy wartości oraz sprawdzenie, czy dolna wartość nie jest
  większa od górnej (częsta pomyłka przy zamianie pól).

## Konwencje, których warto się trzymać

- Zero zależności zewnętrznych. Żadnego CDN-u, żadnego npm — ma działać offline.
- Zmienne CSS w `:root` (`--zielen`, `--atrament`, `--bursztyn`, `--czerwien` itd.);
  kolory nie są wpisywane na sztywno poza paletą kategorii w JS.
- Po każdej zmianie w `index.html` **podbij numer cache** w `sw.js`
  (`cisnienie-v1` → `cisnienie-v2`), inaczej użytkownicy dostaną starą wersję z cache.
- Zmiana kształtu danych w `localStorage` wymaga migracji albo nowego klucza —
  nie wolno osierocić istniejących pomiarów.

## Co można dorobić

- Wersja desktopowa w Pythonie (tkinter + matplotlib), analogicznie do równoległego
  projektu dziennika kosztów auta.
- Filtr zakresu dat na wykresie (7 / 30 / 90 dni).
- Oddzielne średnie dla pomiarów porannych i wieczornych — bywają istotnie różne.
- Przypomnienia o pomiarze (Notification API, wymaga zgody użytkownika).
