// window.onload=voir
function voir(){
     const url = 
"http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/20/produits"
     let fetchOptions={method : "GET"}
         fetch(url,fetchOptions)
         .then((response)=>{
             return response.json()
         })
         .then((dataJSON)=>{
             let contenu=dataJSON
             for (let c of contenu){
             code=code+
             "<td>"+c.id+"</td>"+
             "<td>"+c.nom+"</td>"+
             "<td>"+c.qte+"</td>"+
             "<td>"+ "ACTION"+"</td>"
             }
             
             document.getElementById("liste").innerHTML=code
         })
         .catch((error)=>{
             console.log(error)♦
         })

}

document.getElementById("ajouter").addEventListener("click",ajouter)
function ajouter(){
     const url = 
"http://webmmi.iut-tlse3.fr/~jean-marie.pecatte/frigos/20/produits"
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
	  document.getElementById("messageConfirm").innerHTML="Le produit a bien été ajouté."
	  setTimeout(function(){ document.getElementById("messageConfirm").innerHTML=""; }, 3000);
     })
     .catch((error)=>{
         console.log(error)
     })
}