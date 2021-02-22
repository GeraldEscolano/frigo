window.onload = voir
function voir() {
    const url =
        "http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits"
    let fetchOptions = { method: "GET" }
    fetch(url, fetchOptions)
        .then((response) => {
            return response.json()
        })
        .then((dataJSON) => {
            let contenu = dataJSON
            let code = "";
            for (let c of contenu) {
            code=code
            +"<td>"+c.id+"</td><td>"+c.nom

            +'<td>'+c.qte+'</td> <td><form class="plus"><input name="id" type="hidden" value="'+c.id+'"/><input name="qte" type="hidden" value="'
            +c.qte+'"/><input name="nom" type="hidden" value="'+c.nom+'"/><input id="plus" type="submit" value="+"/></form>'

            +'<form class="moins"><input name="id" type="hidden" value="'+c.id+'"/><input name="qte" type="hidden" value="'
            +c.qte+'"/><input name="nom" type="hidden" value="'+c.nom+'"/><input id="moins" type="submit" value="-"/></form></td></tr>';
            } 
            document.getElementById("liste").innerHTML = code

            for (f of document.getElementsByClassName("plus")) {
                f.addEventListener("submit", plus)
            }
            for (f of document.getElementsByClassName("moins")) {
                f.addEventListener("submit", moins)
            }
          
        })
        .catch((error) => {
            console.log(error)
        })

}

document.getElementById("ajouter").addEventListener("click", ajouter)
function ajouter() {
    const url =
        "http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits"
    let produit = {
        nom: document.getElementById("Produit").value,
        qte: quantite = document.getElementById("Quantite").value
    }
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(produit)
    }
    fetch(url, fetchOptions)
        .then((response) => {
            return response.json()
        })
        .then((dataJSON) => {
            console.log(dataJSON)
            document.getElementById("confirm").innerHTML = "Le produit a bien été ajouté."
            setTimeout(function () {window.location.reload(); document.getElementById("confirm"); }, 500);
        })
        .catch((error) => {
            console.log(error)
        })
}

function plus(event) {
    event.preventDefault()
    const url =
        "http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits"
    let produit = {
        id: event.target.id.value,
        nom: event.target.nom.value,
        qte: Number(event.target.qte.value) + 1

    }
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(produit)
    }
    fetch(url, fetchOptions)
        .then((response) => {
            return response.json()
        })
        .then((dataJSON) => {
            voir()
            console.log(dataJSON)
        })
        .catch((error) => {
            console.log(error)
        })

    function moins(event) {
        event.preventDefault()
        const url =
            "http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits"
        let produit = {
            id: event.target.id.value,
            nom: event.target.nom.value,
            qte: Number(event.target.qte.value) - 1

        }
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const fetchOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(produit)
        }
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json()
            })
            .then((dataJSON) => {
                voir()
                console.log(dataJSON)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}