exports.definition = {
	
	config: {
		"columns":{
			"id":"",
			"descripcion":"TEXT",
			"titulo":"TEXT",
			"Fecha":"TEXT",
			"imagen":"TEXT",
			
		},
		"adapter":{
			"type":"sql",
			"collection_name":"noticias",
			
						
		}
		
	},
	
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
						
			// extended functions go here

		}); // end extend
		
		return Model;
	},
	
	
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			
			// extended functions go here			
			
		}); // end extend
		
		return Collection;
	}
	
	
		
};

	

