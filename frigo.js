window.onload = voir()
window.onload = affiche_tri()
window.onload = affiche_ajoute()
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
                code = code
                    + "<td>" + c.id + "</td><td>" + c.nom

                    + '<td>' + c.qte + '</td> <td><form class="plus"><input name="id" type="hidden" value="' + c.id + '"/><input name="qte" type="hidden" value="'
                    + c.qte + '"/><input name="nom" type="hidden" value="' + c.nom + '"/><span><button id="plus" type="submit" >'
                    +'<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z" /></svg></button></form>'

                    + '<form class="moins"><input name="id" type="hidden" value="' + c.id + '"/><input name="qte" type="hidden" value="'
                    + c.qte + '"/><input name="nom" type="hidden" value="' + c.nom + '"/>'
                    +'<button id="moins" type="submit"> <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M0 0v2h8v-2h-8z" transform="translate(0 3)" /></svg></button></form>'

                    + '<form class="del"> <input name="id" type="hidden" value="' + c.id + '"/><input name="qte" type="hidden" value="'
                    + c.qte + '"/><input name="nom" type="hidden" value="' + c.nom + '"/>'
                    +'<button id="del" type="submit" > <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M3 0c-.55 0-1 .45-1 1h-1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1h-1c0-.55-.45-1-1-1h-1zm-2 3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19v-4.81h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1z" /></svg></button></form> </span> </td></tr>';
            }
            document.getElementById("liste").innerHTML = code

            for (p of document.getElementsByClassName("plus")) {
                p.addEventListener("submit", plus)
            }
            for (m of document.getElementsByClassName("moins")) {
                m.addEventListener("submit", moins)
            }
            for (d of document.getElementsByClassName("del")) {
                d.addEventListener("submit", del)
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

    if(produit.qte <= 0 || produit.nom=="") { throw new Error("La quantité est forcément un entier positif"); }

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

            document.getElementById("confirm").innerHTML = "Le produit: " + produit.nom + ", a bien été ajouté."
            setTimeout(function () { window.location.reload(); document.getElementById("confirm"); }, 1000);
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
}

function moins(event) {
    event.preventDefault()
    const url =
        "http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits"
    let produit = {
        id: event.target.id.value,
        nom: event.target.nom.value,
        qte: Number(event.target.qte.value) - 1

    }
    if (produit.qte == 0){ throw new Error("La quantité est forcément un entier positif");  }
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
function del(event) {
    event.preventDefault()

    let produit = {
        id: event.target.id.value,
        nom: event.target.nom.value,
        qte: event.target.qte.value
    }

    const url =
        "http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits" + "/" + produit.id

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
        method: 'DELETE',
        headers: myHeaders,
    }
    fetch(url, fetchOptions)
        .then((response) => {
            document.getElementById("confirm_del").innerHTML = "Le produit: " + produit.nom + ", a bien été supprimé."
            setTimeout(function () { window.location.reload(); document.getElementById("confirm_del"); }, 1000);
            return response.json()
        })
        .catch((error) => {
            console.log(error)
        })
}

function trier_table() {
    var input = document.getElementById("recherche");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("table_produits");
    var tr = table.getElementsByTagName("tr");
  
    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        var txtValue = td.textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  function affiche_ajoute(){
    var produit = document.getElementById("produit");
    var quantite= document.getElementById("quantite");
    var ajoute= document.getElementById("ajouter");

    if(produit.style.display == "" && quantite.style.display=="" && ajoute.style.display==""){
        produit.style.display = "none";
        quantite.style.display = "none";
        ajoute.style.display = "none";
        return false;
    }else{
        produit.style.display = "";
        quantite.style.display = "";
        ajoute.style.display = "";
        return true;
    }
  }

  function affiche_tri(){
    var r = document.getElementById("recherche");
    if(r.style.display == "" ){
        r.style.display = "none";
        return false;
    }else{
        r.style.display = "";
        return true;
    }
  }