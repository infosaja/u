<script>
const rangeSlider = document.getElementById('rangeSlider');
const rangeLabels = document.querySelectorAll('.range-labels span');
const rangePrices = document.querySelectorAll('.range-prices span');
const countrySelect = document.getElementById('country');
const timeSelect = document.getElementById('time');
const islandGroup = document.getElementById('island-group');
const islandSelect = document.getElementById('island');

const IDR_TO_MYR_EXCHANGE_RATE = 0.025; // Misalkan 1 IDR = 0.025 MYR
const DISCOUNT_RATE = 0.4; // Diskon 20%

countrySelect.addEventListener('change', updateIslandOptions);
updateIslandOptions(); // Menampilkan opsi pulau saat halaman dimuat

rangeSlider.addEventListener('input', function() {
  const value = parseInt(this.value);
  const selectedCountry = countrySelect.value;
  const selectedTime = timeSelect.value;
  
  rangeLabels.forEach((label, index) => {
    if (index === value - 1) {
      label.style.fontWeight = 'bold';
      rangePrices[index].classList.add('show');
      if (selectedCountry === 'id') {
        let price = getPriceByTime(index + 1, selectedTime);
        price *= (1 - DISCOUNT_RATE); // Terapkan diskon
        rangePrices[index].textContent = 'IDR ' + formatIDRHarga(price);
      } else if (selectedCountry === 'my') {
        let price = getPriceByTime(index + 1, selectedTime) * IDR_TO_MYR_EXCHANGE_RATE;
        price *= (1 - DISCOUNT_RATE); // Terapkan diskon
        rangePrices[index].textContent = 'MYR ' + price.toFixed(2);
      }
    } else {
      label.style.fontWeight = 'normal';
      rangePrices[index].classList.remove('show');
    }
  });
});

timeSelect.addEventListener('change', updatePrices);

function updatePrices() {
  const selectedCountry = countrySelect.value;
  const selectedTime = timeSelect.value;
  rangePrices.forEach((price, index) => {
    if (selectedCountry === 'id') {
      let harga = getPriceByTime(index + 1, selectedTime);
      harga *= (1 - DISCOUNT_RATE); // Terapkan diskon
      price.textContent = 'IDR ' + formatIDRHarga(harga);
    } else if (selectedCountry === 'my') {
      let harga = getPriceByTime(index + 1, selectedTime) * IDR_TO_MYR_EXCHANGE_RATE;
      harga *= (1 - DISCOUNT_RATE); // Terapkan diskon
      price.textContent = 'MYR ' + harga.toFixed(2);
    }
  });
}

function updateIslandOptions() {
  const selectedCountry = countrySelect.value;
  islandSelect.innerHTML = ''; // Kosongkan opsi pulau
  
  if (selectedCountry === 'id') {
    islandGroup.style.display = 'block'; // Tampilkan opsi pulau untuk Indonesia
    // Tambahkan opsi pulau untuk Indonesia
    addIslandOption('Papua', 'papua');
    addIslandOption('Kalimantan', 'kalimantan');
    addIslandOption('Sumatera', 'sumatera');
    addIslandOption('Sulawesi', 'sulawesi');
    addIslandOption('Jawa', 'jawa');
    addIslandOption('Timor', 'timor');
    addIslandOption('Halmahera', 'halmahera');
    addIslandOption('Pulau Seram', 'seram');
    addIslandOption('Sumbawa', 'sumbawa');
    addIslandOption('Flores', 'flores');
  } else if (selectedCountry === 'my') {
    islandGroup.style.display = 'block'; // Tampilkan opsi pulau untuk Malaysia
    // Tambahkan opsi pulau untuk Malaysia
    addIslandOption('Manukan', 'manukan');
    addIslandOption('Redang', 'redang');
    addIslandOption('Perhentian', 'perhentian');
    addIslandOption('Sapi', 'sapi');
    addIslandOption('Mamutik', 'mamutik');
    addIslandOption('Beras Basah', 'berasbasah');
    addIslandOption('Bohey Dulang Island', 'boheydulang');
  } else {
    islandGroup.style.display = 'none'; // Sembunyikan opsi pulau jika negara tidak dipilih
  }
}

function addIslandOption(name, value) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = name;
  islandSelect.appendChild(option);
}

function getPriceByTime(days, time) {
  let price = 0;
  switch (time) {
    case 'day':
      price = days * 25000;
      break;
    case 'week':
      price = days * 7 * 20000;
      break;
    case 'month':
      price = days * 30 * 18000;
      break;
    default:
      break;
  }
  return price;
}

function formatIDRHarga(harga) {
  return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

updatePrices(); // Memperbarui harga saat halaman dimuat
</script>
