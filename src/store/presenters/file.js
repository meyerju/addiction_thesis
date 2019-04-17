
export default (() => {

    const presentDateAsString = (elementDate) => {
        const date = new Date(elementDate);
        if (!date) {
            return "";
        }
        return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()
    };

    const present = (file) => {
        return [
            { label: "Name", value:file.name},
            { label: "Uploaded", value:presentDateAsString(file.upload_date)}
        ]
    };

    return {
        present,
    };
})();