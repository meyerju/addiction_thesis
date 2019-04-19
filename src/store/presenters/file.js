
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

    const presentClicks = (file) => {
        return [
            { label: file.file_details[0].action_type.name, value:file.file_details[0].name},
            { label: file.file_details[1].action_type.name, value:file.file_details[1].name}
        ]
    };

    return {
        present,
        presentClicks
    };
})();