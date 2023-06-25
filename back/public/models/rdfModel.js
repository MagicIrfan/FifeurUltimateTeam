const $rdf = require("rdflib");
const path = require("path");
const fs = require("fs");

class RDFModel {
    constructor() {
        // Chemin vers le fichier RDF
        this.filePath = path.join(__dirname, '../files/footFinal2.rdf');
        this.store = $rdf.graph();
        // Lire le contenu du fichier RDF
        this.rdfContent = fs.readFileSync(this.filePath, 'utf-8');
        this.mimeType = 'application/rdf+xml';
    }

    parse(url) {
        $rdf.parse(this.rdfContent, this.store, url, this.mimeType);
    }

    SPARQLQuery(query, res, onLoad) {
        console.log(query);
        const SPARQLquery = $rdf.SPARQLToQuery(query, false, this.store);
        const uniqueResults =[];
        this.store.query(SPARQLquery, (result) => {
            onLoad(result,uniqueResults);
        }, null, () => {
            const distinctResults = [];
            uniqueResults.forEach((result) => {
                // Vérifier si le résultat existe déjà dans le tableau distinctResults
                if (!distinctResults.some((r) => JSON.stringify(r) === JSON.stringify(result))) {
                    distinctResults.push(result); // Ajouter le résultat au tableau distinctResults
                }
            });
            res.json(distinctResults);
        });
    }
}

const rdfModel = new RDFModel();

module.exports = rdfModel;