const url = require("url");
const querystring = require("querystring");
const {RDFProcess} = require("../models/rdfProcess");

exports.getPlayer = (req,res) => {
    const parsedUrl = url.parse(req.url);
    const queryParams = querystring.parse(parsedUrl.query);
    RDFProcess(res,`${req.protocol}://${req.get('host')}`,
        `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX foot: <http://www.semanticweb.org/gaeta/ontologies/2023/foot#>

        SELECT ?statDefense ?statDribble ?statEndurance ?statPasse ?initialesPoste ?nomPoste ?nomJoueur
               ?aliasJoueur ?logoPays ?logoJoueur ?logoClub ?nomPays ?nomClub ?statGeneral ?descPiedFort ?gestesTechniques ?mauvaisPied ?age
               WHERE {
                                ?individu rdf:type foot:Player.
                                ?individu foot:PersonHasClub ?club.
                                ?individu foot:HasNationality ?nationalite.
                                ?individu foot:PlayerHasPost ?poste.
                                ?individu foot:statDefense ?statDefense.
                                ?individu foot:statDribble ?statDribble.
                                ?individu foot:statEndurance ?statEndurance.
                                ?individu foot:statPasse ?statPasse.
                                ?individu foot:statTir ?statTir.
                                ?individu foot:statVitesse ?statVitesse.
                                ?individu foot:playerHasStrongFoot ?piedFort.
                                ?poste foot:initiales ?initialesPoste.
                                ?poste rdfs:label ?nomPoste.
                                ?individu rdfs:label ?nomJoueur.
                                ?individu foot:alias ?aliasJoueur.
                                ?nationalite foot:URLImage ?logoPays.
                                ?nationalite rdfs:label ?nomPays.
                                ?individu foot:URLImage ?logoJoueur.
                                ?club foot:URLImage ?logoClub.
                                ?club rdfs:label ?nomClub.
                                ?individu foot:statGeneral ?statGeneral.
                                ?piedFort rdfs:label ?descPiedFort.
                                ?individu foot:mauvaisPied ?mauvaisPied.
                                ?individu foot:gestesTechniques ?gestesTechniques.
                                ?individu foot:age ?age.
                                ${queryParams.club ? `?club rdfs:label "${queryParams.club}".` : ""}
                                ${queryParams.country ? `?nationalite rdfs:label "${queryParams.country}".` : ""}
                                ${queryParams.post ? `?poste foot:initiales "${queryParams.post}".` : ""}
        }
        `
,(result, arrayResults) => {
        const player = {};
        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                const value = result[key].value;
                player[key] = value;
            }
        }
        const diff = Math.abs(parseInt(player["?statDefense"]) - (queryParams["defense-check"] !== "on" ? parseInt(player["?statDefense"]) : parseInt(queryParams.defense))) +
                Math.abs(parseInt(player["?statDribble"]) - (queryParams["dribble-check"] !== "on" ? parseInt(player["?statDribble"]) : parseInt(queryParams.dribble))) +
                Math.abs(parseInt(player["?statEndurance"]) - (queryParams["physical-check"] !== "on" ? parseInt(player["?statEndurance"]) : parseInt(queryParams.physical))) +
                Math.abs(parseInt(player["?statPasse"]) - (queryParams["passing-check"] !== "on" ? parseInt(player["?statPasse"]) : parseInt(queryParams.passing))) +
                Math.abs(parseInt(player["?statTir"]) - (queryParams["shoot-check"] !== "on" ? parseInt(player["?statTir"]) : parseInt(queryParams.shoot))) +
                Math.abs(parseInt(player["?statVitesse"]) - (queryParams["pace-check"] !== "on" ? parseInt(player["?statVitesse"]) : parseInt(queryParams.pace)));
        player.diff = diff;
        arrayResults.push(player);
        arrayResults.sort((a, b) => a.diff - b.diff);
    });
}