# Dziennik ciśnienia

Domowy dziennik pomiarów ciśnienia tętniczego i tętna, prowadzony według zalecenia lekarza.
Aplikacja notuje pomiary i pokazuje je w czytelnej formie — nie ocenia stanu zdrowia.

## Pomiary

**Pomiar**:
Jeden zapisany wynik z ciśnieniomierza: ciśnienie skurczowe i rozkurczowe, opcjonalnie tętno,
z datą, godziną i porą. Każdy wpis to osobny pomiar, także gdy dwa wykonano minutę po sobie.
_Unikaj_: odczyt, wpis, rekord, seria

**Ciśnienie skurczowe**:
Wyższa z dwóch wartości ciśnienia (mmHg).
_Unikaj_: SYS, górne (poza etykietami w UI)

**Ciśnienie rozkurczowe**:
Niższa z dwóch wartości ciśnienia (mmHg).
_Unikaj_: DIA, dolne (poza etykietami w UI)

**Tętno**:
Liczba uderzeń serca na minutę, podawana przez ciśnieniomierz razem z pomiarem.
_Unikaj_: puls, HRV (zmienność rytmu serca to inna wielkość, której aplikacja nie notuje)

## Rytm dnia

**Zalecenie**:
Polecenie lekarza: dwa pomiary dziennie (poranny i wieczorny) oraz pomiar dodatkowy przy objawach.

**Pora**:
Miejsce pomiaru w rytmie dnia, deklarowane przez użytkownika — nie przedział godzin.
Pomiar o 12:51 może być poranny, jeśli to on zastąpił poranny.
_Unikaj_: slot, typ pomiaru

**Pomiar poranny** / **Pomiar wieczorny**:
Dwa pomiary wynikające z zalecenia, wykonywane każdego dnia.

**Pomiar dodatkowy**:
Pomiar poza rytmem, wykonany z powodu objawu (np. bólu głowy).
Nie wchodzi do średnich, bo odzwierciedla stan wyjątkowy, a nie typowy.
_Unikaj_: trzeci pomiar, pomiar extra

**Dzień**:
Dzień kalendarzowy wynikający z daty pomiaru (od północy do północy).

## Dane

**Dziennik**:
Komplet pomiarów prowadzony w aplikacji na telefonie — jedyne miejsce, w którym pomiary
się wpisuje, i jedyne źródło prawdy.

**Kopia zapasowa**:
Plik CSV wyeksportowany z dziennika. Służy do odtworzenia danych i do przenoszenia ich
gdzie indziej (analiza, wydruk); inne narzędzia tylko ją czytają.
_Unikaj_: synchronizacja, baza

## Podsumowania

**Średnia**:
Średnia arytmetyczna z pomiarów porannych i wieczornych z pełnych dni kalendarzowych
(np. dziś i 6 poprzednich dni); pomiary dodatkowe są pomijane.

**Dzień z kompletem**:
Dzień, w którym jest co najmniej jeden pomiar poranny i co najmniej jeden wieczorny.
_Unikaj_: pełny dzień, dzień zaliczony

**Raport dla lekarza**:
Wydruk dziennika z wybranego zakresu dat: średnie, przebieg, tabela dzienna i pomiary
dodatkowe z powodem. Przedstawia dane bez kategorii i bez oceny.
_Unikaj_: wydruk, zestawienie, PDF

**Kategoria**:
Informacyjna klasa wyniku według progów gabinetowych, wyznaczana po wyższej z dwóch
wartości ciśnienia. Nie jest diagnozą.
_Unikaj_: diagnoza, ocena, norma
