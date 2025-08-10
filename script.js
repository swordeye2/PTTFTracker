function onScanSuccess(decodedText, decodedResult) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            if (data[decodedText]) {
                let person = data[decodedText];
                document.getElementById("id-name").textContent = person.name;
                document.getElementById("id-role").textContent = person.role;
                document.getElementById("id-photo").src = person.photo;
                document.getElementById("id-card").classList.remove("hidden");
            } else {
                alert("No record found for QR: " + decodedText);
            }
        });
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 }
);
html5QrcodeScanner.render(onScanSuccess);