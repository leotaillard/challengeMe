/*
Auteur: Léo Taillard
*/
$(document).ready(function() {

	$("#sendButton").click(getMedia);
	
});


function getMedia(){
	// on récupère les variables nécessaires à la requête
	var media = $("#media option:selected").val();
	var q = $("#search").val();
	
	// test pour le différent média. il ne faut pas que le search soit vide
	if (media == "photo" && q != "") {
		//fonction de récup des photos
		getPhoto(q);
		
	}else if (media == "video" && q != "") {
		//fonction de récup des vidéos
		getVideo(q);		
	}
	else {
		alert("veuillez remplir le champs de recherche !")
	}

}

function getPhoto(q){
	// on récupère les variables nécessaires à la requête
	var WS_FLICKR = "http://api.flickr.com/services/feeds/photos_public.gne"

	$.getJSON(WS_FLICKR+"?jsoncallback=?",
		{
		tags: q,
		format:"json"
		},
		function(data) {
			// on vide la div results
			$("#results").empty();

			$(data.items).each(function(index, e) {
				//création du html
				var newDiv = $("<div/>", {class:"image"});
				var newA = $("<a/>",{href:e.link, target:"_blanck"});
				var newImg =$("<img/>",{src:e.media.m, alt:e.title, title:e.title});
				
				newA.append(newImg);
				newDiv.append(newA);
				$("#results").append(newDiv);

			})
			



		});
}

function getVideo(q){
	// on récupère les variables nécessaires à la requête
	var serverUrl = "http://localhost:8888/TechWebMM39/proxy.php";
	var reqYoutube = serverUrl + "?q="+q;
	
	$.ajax( {
	            type: "GET",
	            url: reqYoutube,
	            dataType: "xml",
	            error: function() {alert("fail")},
	            success: function(xml) {
					// on vide la div results
					$("#results").empty();
					
	            	$(xml).find("entry").each( function(index){
	            		//création des variable utiles pour l'affichage des vidéos                             
						var title = $(this).find('title').text();
						var url = $(this).find('content').attr("src");
						
						//construction du HTML
						var newDiv = $("<div/>", {class:"video"});
						var newObject = $("<object />",{type:'application/x-shockwave-flash'});
						newObject.attr("data", url);
						var newParam = $("<param/>",{value:url, name:title});
						
						newObject.append(newParam);
						newDiv.append(newObject);
						$("#results").append(newDiv);
						
	            	} );
	            }
	        }
	      ); 
}
//
//
//E) Questions écrites : 
//Question 1:
//Le model est la couche de notre mvc qui permet de communiquer avec la base de données. C'est la seule qui a accès à la bd. le controller etla vue ne peuvent pas accèder directement à la bd, et doivent communiquer avec le model pour interroger la bd. Un des avantages est que le client ne pourra accèder directement à la bd et devra passer par vc, ce qui ameliore la sécurité en ne laissant pas l'utilisateur avoir un accès direct. On peut ainsi regarder pour le sql injection en anniliant tout les caractères qui pourrait servir a faire une requete avec une fonction php. avant d'interroger la bd, on l'effectuera. Un controller peut très bien servir pour intérroger un webservice ou un fichier xml contenant notre bd.
//
//Question 2: 
//Ajax permet de communiquer avec le serveur pour effectuer des requêtes. il fonctionne de manière asynchrone,c'est à dire que le navigateur continue d'executer le js alors que notre requête pour le serveur est lancée. Il n'attends pas que leserveur nous renvoie quelque chose et donc le client/utilisateur peut continuer de faire des manips. Un principal souci est que l'on nepeut pas retourné une variable avec $.ajax ! par exemple sur le code suivant : 
//
//function get(){
//
//	var serverUrl = "...";
//	var q = $("..").val("..");
//	var req = serverUrl + "?q="+q;
//
//	var exemple = null;
//	
//	$.ajax( {
//	            type: "GET",
//	            url: req,
//	            error: function() {alert("fail")},
//	            success: function(data) {
//	            
//	            	exemple = data;
//	            
//	            } );
//	            }
//	        }
//	      ); 
//	return exemple;
//}
//
//La variable "exemple" retournée sera nulle, car la requête ajax se fait de manière asynchrone.