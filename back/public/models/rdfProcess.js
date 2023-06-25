const RDFmodel = require("../models/rdfModel");

exports.RDFProcess = (res,url,query,onLoad = (result,arrayResults) => {
    const player = {};
    for (const key in result) {
        if (result.hasOwnProperty(key)) {
            const value = result[key].value;
            player[key] = value;
        }
    }
    arrayResults.push(player);
}) => {
    RDFmodel.parse(url);
    RDFmodel.SPARQLQuery(query,res,onLoad);
}