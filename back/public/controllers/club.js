const {RDFProcess} = require("../models/rdfProcess");

exports.getAllClubs = (req,res) => {
    RDFProcess(res,`${req.protocol}://${req.get('host')}`,`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX foot: <http://www.semanticweb.org/gaeta/ontologies/2023/foot#>
        SELECT ?nomClub
        WHERE {
            ?club rdf:type foot:Club.
            ?club rdfs:label ?nomClub.
        }    
    `);
}