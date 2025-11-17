document.addEventListener("DOMContentLoaded", () => {
  // Pak alle + en - buttons (ondersteunt meerdere lijsten)
  const minderBtns = Array.from(document.querySelectorAll('button[aria-label="Minder personen"]'));
  const meerBtns   = Array.from(document.querySelectorAll('button[aria-label="Meer personen"]'));

  // Helper: zoek binnen dezelfde <li> een <p> dat (voornamelijk) een getal bevat.
  function findNumberP(containerEl) {
    if (!containerEl) return null;
    const ps = Array.from(containerEl.querySelectorAll('p'));
    // voorkeur: precies een getal (bijv "4" of " 4 ")
    let p = ps.find(el => /^\s*\d+\s*$/.test(el.textContent));
    if (p) return p;
    // fallback: een <p> dat een getal ergens bevat ("Aantal: 4")
    p = ps.find(el => /\d/.test(el.textContent));
    if (p) return p;
    // geen passend <p> gevonden
    return null;
  }

  // Zorg dat we knoppen per rij (li) pairen en handlers toevoegen
  function setupButton(buttonEl, valueToSet) {
    if (!buttonEl) return;
    buttonEl.addEventListener('click', (e) => {
      e.preventDefault();

      const li = buttonEl.closest('li');
      if (!li) return;

      let pNum = findNumberP(li);

      // Als er geen bestaand p is, maak er één en zet 'm bovenaan in de li
      if (!pNum) {
        pNum = document.createElement('p');
        // Je kunt hier kiezen waar je 'm wilt plaatsen. We voegen 'm als eerste child toe.
        li.insertBefore(pNum, li.firstChild);
      }

      // Zet de waarde (als string)
      pNum.textContent = String(valueToSet);
    });
  }

  // Voor alle gevonden minder-knoppen: zet handler die 3 zet
  minderBtns.forEach(btn => setupButton(btn, 3));
  // Voor alle gevonden meer-knoppen: zet handler die 5 zet
  meerBtns.forEach(btn => setupButton(btn, 5));

  // Optioneel debugbericht als er geen knoppen zijn
  if (minderBtns.length === 0 && meerBtns.length === 0) {
    console.warn("Geen 'Minder personen' of 'Meer personen' knoppen gevonden.");
  }
});
