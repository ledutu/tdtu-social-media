async function generateId(model) {
    // data = await model.find({}).;

    // return data;
}

function dateFormat(date) {
    newDate = new Date(data);
    const result = newDate.getHours() + ":" + newDate.getMinutes() +
        " " + newDate.getDate() + "/" + newDate.getMonth() + "/" + newDate.getFullYear();

    return result;
}

module.exports = {
    generateId,
    dateFormat
}