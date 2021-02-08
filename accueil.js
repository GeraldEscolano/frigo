window.onload=voir
function voir(){
     const url = 
"http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits"
     let fetchOptions={method : "GET"}
         fetch(url,fetchOptions)
         .then((response)=>{
             return response.json()
         })
         .then((dataJSON)=>{
             let contenu=dataJSON
             let code="";
             for (let c of contenu){
             code=code+
             "<tr><td>"+c.id+"</td>"+
             "<td>"+c.nom+"</td>"+
             "<td>"+c.qte+"</td>"+
             '<td> <form class="plus"> <input type="hidden" name="id" value="'+c.id+' /> <input type="hidden" name ="nom" value='+c.nom+ '/> <input type="hidden" name ="qte" value='+c.qte+  '/> <input id="moins" type="submit" value="-" /> <input id="plus" type="submit" value="+" /> </form></td> </tr>'
             }

            for(f of document.getElementsByClassName("plus")) {
                f.addEventListener("submit",plus)
                
            }
             
             document.getElementById("liste").innerHTML = code
         })
         .catch((error)=>{
             console.log(error)
         })

}

document.getElementById("ajouter").addEventListener("click",ajouter)
function ajouter(){
     const url = 
"http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits"
     let produit={
     nom : document.getElementById("Produit").value,
     qte : quantite=document.getElementById("Quantite").value
   }
     let myHeaders = new Headers();
     myHeaders.append("Content-Type","application/json");
     const fetchOptions={
         method:'POST',
         headers:myHeaders,
         body:JSON.stringify(produit)
     }
     fetch(url,fetchOptions)
     .then((response)=>{
         return response.json()
     })
     .then((dataJSON)=>{
      console.log(dataJSON)
	  document.getElementById("confirm").innerHTML="Le produit a bien été ajouté."
	  setTimeout(function(){ document.getElementById("confirm").innerHTML=""; }, 3000);
     })
     .catch((error)=>{
         console.log(error)
     })
}

function plus(event) {
    event.preventDefault()
const url =
"http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/13/produits"
     let produit = {
     id :event.target.id.value,
     nom :event.target.nom.value,
     qte : Number(event.target.qte.value) + 1

}
     let myHeaders = new Headers();
     myHeaders.append("Content-Type","application/json");
     const fetchOptions={
         method:'PUT',
         headers:myHeaders,
         body:JSON.stringify(produit)
     }
     fetch(url,fetchOptions)
     .then((response)=>{
         return response.json()
     })
     .then((dataJSON)=>{
        voir()
      console.log(dataJSON)
     })
     .catch((error)=>{
         console.log(error)
     })
}