import { collection } from '../../db/index.js';

export async function relevance(req, res){
    try {
        console.log(req.body);
        let data = {};

        let options = { projection: { _id: 0, relevance: 1 }, };
        options.projection[req.body.filter] = 1;


        let result = await collection.trends.find({}, options).toArray();
        

        for (let i = 0; i < result.length; i++) {
            if(typeof(result[i].relevance) == "number") {
                if(data[result[i][req.body.filter]] == undefined) {
                    data[result[i][req.body.filter]] = 0;
                }
                data[result[i][req.body.filter]] += parseInt(result[i].relevance);
            }
        }

        // sorting ??
        if(req.body.sort){
            let sortedDataArray = Object.entries(data);
            if(req.body.sort == "desc"){
                sortedDataArray.sort((a, b) => b[1] - a[1]);
            }
            else{
                sortedDataArray.sort((a, b) => a[1] - b[1]);
            }
            return res.send(JSON.stringify({ status: "success", data: Object.fromEntries(sortedDataArray) }));
        }

        res.send(JSON.stringify({ status: "success", data: data }));
    } catch (error) {
        console.log(`API ERROR (/api/dashboard/relevance): ${error}`);
        res.status(500).send(JSON.stringify({error: 'Internal Server Error'}));
    }
}